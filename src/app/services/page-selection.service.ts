import { Injectable, signal, computed } from '@angular/core';

interface PageEntry {
  pageNum: string;
  selected: boolean;
  order: number;
}

/**
 * Centralized service managing which pages are selected for PDF printing.
 *
 * Default behaviour: ALL pages are selected (included in PDF).
 * Users toggle individual pages OFF to exclude them.
 * "Select All" resets every page back to selected.
 *
 * The service converts selected state into a Puppeteer-compatible
 * `pageRanges` string (e.g. "1-5, 8, 11-13") sent to the backend.
 */
@Injectable({ providedIn: 'root' })
export class PageSelectionService {
  /** Internal reactive state — triggers recomputation of derived signals */
  private readonly _revision = signal(0);

  /** Ordered registry of all pages */
  private readonly registry = new Map<string, PageEntry>();
  private orderCounter = 0;

  // ─── Derived Signals ────────────────────────────────────────────────

  readonly allSelected = computed(() => {
    this._revision();
    if (this.registry.size === 0) return true;
    for (const entry of this.registry.values()) {
      if (!entry.selected) return false;
    }
    return true;
  });

  readonly someSelected = computed(() => {
    this._revision();
    let hasSelected = false;
    let hasUnselected = false;
    for (const entry of this.registry.values()) {
      if (entry.selected) hasSelected = true;
      else hasUnselected = true;
      if (hasSelected && hasUnselected) return true;
    }
    return false;
  });

  readonly selectedCount = computed(() => {
    this._revision();
    let count = 0;
    for (const entry of this.registry.values()) {
      if (entry.selected) count++;
    }
    return count;
  });

  readonly totalCount = computed(() => {
    this._revision();
    return this.registry.size;
  });

  // ─── Registration ───────────────────────────────────────────────────

  registerPage(pageId: string, pageNum: string): void {
    if (!this.registry.has(pageId)) {
      this.registry.set(pageId, {
        pageNum,
        selected: true, // default: included
        order: this.orderCounter++,
      });
      this.bump();
    }
  }

  unregisterPage(pageId: string): void {
    this.registry.delete(pageId);
    this.bump();
  }

  // ─── Selection Control ──────────────────────────────────────────────

  isSelected(pageId: string): boolean {
    this._revision(); // subscribe to changes
    return this.registry.get(pageId)?.selected ?? true;
  }

  togglePage(pageId: string): void {
    const entry = this.registry.get(pageId);
    if (entry) {
      entry.selected = !entry.selected;
      this.bump();
    }
  }

  selectAll(): void {
    for (const entry of this.registry.values()) {
      entry.selected = true;
    }
    this.bump();
  }

  deselectAll(): void {
    for (const entry of this.registry.values()) {
      entry.selected = false;
    }
    this.bump();
  }

  // ─── Page Ranges for Backend ────────────────────────────────────────

  /**
   * Returns a Puppeteer-compatible pageRanges string containing only
   * the pages that are INCLUDED (selected).
   *
   * Returns undefined when ALL pages are selected (print everything).
   *
   * Pages are numbered sequentially by their registration order (1-based),
   * which matches the physical PDF page order.
   */
  getPageRangesString(): string | undefined {
    if (this.allSelected()) return undefined;

    const sorted = [...this.registry.values()]
      .sort((a, b) => a.order - b.order);

    // Build 1-based indices of selected pages
    const selectedIndices: number[] = [];
    sorted.forEach((entry, i) => {
      if (entry.selected) {
        selectedIndices.push(i + 1); // 1-based
      }
    });

    if (selectedIndices.length === 0) return undefined;

    // Collapse consecutive numbers into ranges: [1,2,3,5,7,8] → "1-3, 5, 7-8"
    return this.collapseToRanges(selectedIndices);
  }

  // ─── Helpers ────────────────────────────────────────────────────────

  private collapseToRanges(nums: number[]): string {
    if (nums.length === 0) return '';

    const ranges: string[] = [];
    let start = nums[0];
    let end = nums[0];

    for (let i = 1; i < nums.length; i++) {
      if (nums[i] === end + 1) {
        end = nums[i];
      } else {
        ranges.push(start === end ? `${start}` : `${start}-${end}`);
        start = nums[i];
        end = nums[i];
      }
    }
    ranges.push(start === end ? `${start}` : `${start}-${end}`);

    return ranges.join(', ');
  }

  private bump(): void {
    this._revision.update(v => v + 1);
  }
}
