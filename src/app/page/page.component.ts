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
  @Input() contentClass: string = 'flex flex-col text-justify font-serif text-[16px] text-slate-700';
  @Input() footerText: string = '';
  @Input() footerTextClass: string = 'font-sans text-[#64748B]';
  @Input() pageNum: string = '';
  @Input() pageNumClass: string = 'font-serif font-bold text-slate-400';
}
