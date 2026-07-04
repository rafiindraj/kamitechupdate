import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { PageComponent } from '../../../page/page.component';
import { TenagaKerjaItem } from '../../../models/financial.model';

@Component({
  selector: 'app-aspek-sdm',
  standalone: true,
  imports: [PageComponent],
  templateUrl: './aspek-sdm.html',
  styles: [`:host { display: flex; flex-direction: column; gap: 3rem; } @media print { :host { gap: 0; } }`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AspekSdmComponent {
  readonly tenagaKerja = input.required<readonly TenagaKerjaItem[]>();
  readonly salaryCostValue = input.required<number>();
}


