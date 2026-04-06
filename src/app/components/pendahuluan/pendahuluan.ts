import { Component, ChangeDetectionStrategy } from '@angular/core';
import { PageComponent } from '../../page/page.component';

@Component({
  selector: 'app-pendahuluan',
  standalone: true,
  imports: [PageComponent],
  templateUrl: './pendahuluan.html',
  styles: [`:host { display: flex; flex-direction: column; gap: 3rem; } @media print { :host { gap: 0; } }`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Pendahuluan {}
