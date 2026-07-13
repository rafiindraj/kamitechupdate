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
 * Excluded pages are marked with the `.page-excluded` class (via the
 * host binding in PageComponent); PdfService strips those nodes from the
 * cloned DOM before export, so no page-range string is needed.
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

  // ─── Helpers ────────────────────────────────────────────────────────

  private bump(): void {
    this._revision.update(v => v + 1);
  }
}
