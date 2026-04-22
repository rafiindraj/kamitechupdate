import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { PageComponent } from '../../../page/page.component';

@Component({
  selector: 'app-aspek-sdm',
  standalone: true,
  imports: [PageComponent],
  templateUrl: './aspek-sdm.html',
  styles: [`:host { display: flex; flex-direction: column; gap: 3rem; } @media print { :host { gap: 0; } }`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AspekSdm {
  @Input() tenagaKerja!: any[];
  @Input() salaryCostValue!: number;
}
