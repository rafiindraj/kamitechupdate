import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { PageComponent } from '../../../page/page.component';
import { MarketAnalysisItem } from '../../../models/financial.model';

@Component({
  selector: 'app-aspek-lingkungan',
  standalone: true,
  imports: [PageComponent],
  templateUrl: './aspek-lingkungan.html',
  styles: [`:host { display: flex; flex-direction: column; gap: 3rem; } @media print { :host { gap: 0; } }`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AspekLingkunganComponent {
  readonly marketAnalysis = input.required<readonly MarketAnalysisItem[]>();
  readonly keys = input.required<readonly string[]>();
}


