import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { PageComponent } from '../../../page/page.component';

// Models
import { OpexDetailItem, RoiProjectionItem, CashFlowTableRow } from '../../../models/financial.model';

// Shared utilities (DRY — single source of truth)
import { formatCurrencyShort } from '../../../utils/currency.util';

@Component({
  selector: 'app-aspek-keuangan',
  standalone: true,
  imports: [PageComponent],
  templateUrl: './aspek-keuangan.html',
  styles: [`:host { display: flex; flex-direction: column; gap: 3rem; } @media print { :host { gap: 0; } }`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AspekKeuangan {
  @Input() initialCapital!: number;
  @Input() opexGajiDetail!: readonly OpexDetailItem[];
  @Input() salaryCostValue!: number;
  @Input() opexOperasionalDetail!: readonly OpexDetailItem[];
  @Input() operationalCostValue!: number;
  @Input() opexSoftwareDetail!: readonly OpexDetailItem[];
  @Input() softwareCostValue!: number;
  @Input() opexMarketingDetail!: readonly OpexDetailItem[];
  @Input() marketingCostValue!: number;
  @Input() monthlyFixedCostTotal!: number;
  @Input() billableHours!: number;
  @Output() billableHoursChange = new EventEmitter<number>();
  @Input() totalRevenue!: number;
  @Input() totalCOGS!: number;
  @Input() totalMonthlyExpense!: number;
  @Input() monthlyNetProfit!: number;
  @Input() roiProjection!: readonly RoiProjectionItem[];
  @Input() cashFlowTableData!: readonly CashFlowTableRow[];

  onHoursChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target) {
      this.billableHoursChange.emit(parseInt(target.value, 10));
    }
  }

  // Delegate to shared utility (eliminates duplication)
  formatCurrencyShort = formatCurrencyShort;
}
