import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
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
export class AspekLingkungan {
  @Input() marketAnalysis!: readonly MarketAnalysisItem[];
  @Input() keys!: readonly string[];
}

