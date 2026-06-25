import { Component, Input, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageSelectionService } from '../services/page-selection.service';

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './page.component.html',
  host: {
    '[id]': 'pageId',
    'class': 'page-container',
    '[class.page-excluded]': '!isPageSelected()'
  }
})
export class PageComponent implements OnInit, OnDestroy {
  @Input() pageId: string = '';
  @Input() watermarkOpacity: string = '0.02';
  @Input() contentClass: string = 'flex flex-col text-justify font-sans text-[16px] text-on-surface';
  @Input() footerText: string = '';
  @Input() footerTextClass: string = 'font-sans text-on-surface-variant';
  @Input() pageNum: string = '';
  @Input() pageNumClass: string = 'font-sans font-bold text-outline';

  private readonly pageSelection = inject(PageSelectionService);

  ngOnInit(): void {
    this.pageSelection.registerPage(this.pageId, this.pageNum);
  }

  ngOnDestroy(): void {
    this.pageSelection.unregisterPage(this.pageId);
  }

  isPageSelected(): boolean {
    return this.pageSelection.isSelected(this.pageId);
  }

  toggleSelection(): void {
    this.pageSelection.togglePage(this.pageId);
  }
}
