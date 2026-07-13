import { Component } from '@angular/core';
import { PageComponent } from '../../../page/page.component';

@Component({
  selector: 'app-aspek-teknis',
  standalone: true,
  imports: [PageComponent],
  templateUrl: './aspek-teknis.html',
  styles: [`:host { display: flex; flex-direction: column; gap: 3rem; } @media print { :host { gap: 0; } }`],
})
export class AspekTeknisComponent {
}
