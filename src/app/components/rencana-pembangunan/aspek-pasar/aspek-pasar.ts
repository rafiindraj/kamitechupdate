import { Component, ChangeDetectionStrategy } from '@angular/core';
import { PageComponent } from '../../../page/page.component';

@Component({
  selector: 'app-aspek-pasar',
  standalone: true,
  imports: [PageComponent],
  templateUrl: './aspek-pasar.html',
  styles: [`:host { display: flex; flex-direction: column; gap: 3rem; } @media print { :host { gap: 0; } }`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AspekPasarComponent {
}
