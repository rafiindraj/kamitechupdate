import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './page.component.html',
  host: {
    '[id]': 'pageId',
    'class': 'page-container'
  }
})
export class PageComponent {
  @Input() pageId: string = '';
  @Input() watermarkOpacity: string = '0.02';
  @Input() contentClass: string = 'flex flex-col text-justify font-sans text-[16px] text-on-surface';
  @Input() footerText: string = '';
  @Input() footerTextClass: string = 'font-sans text-on-surface-variant';
  @Input() pageNum: string = '';
  @Input() pageNumClass: string = 'font-sans font-bold text-outline';
}
