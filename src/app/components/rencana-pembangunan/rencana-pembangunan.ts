import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { PageComponent } from '../../page/page.component';

@Component({
  selector: 'app-rencana-pembangunan',
  standalone: true,
  imports: [PageComponent],
  templateUrl: './rencana-pembangunan.html',
  styles: [`:host { display: flex; flex-direction: column; gap: 3rem; } @media print { :host { gap: 0; } }`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RencanaPembangunan {
  @Input() servicesItems!: any[];
  @Input() devSteps!: string[];
  @Input() tenagaKerja!: any[];
  @Input() initialCapital!: number;
  @Input() opexGajiDetail!: any[];
  @Input() opexOperasionalDetail!: any[];
  @Input() opexSoftwareDetail!: any[];
  @Input() opexMarketingDetail!: any[];
  @Input() salaryCostValue!: number;
  @Input() operationalCostValue!: number;
  @Input() softwareCostValue!: number;
  @Input() marketingCostValue!: number;
  @Input() monthlyFixedCostTotal!: number;
  @Input() billableHours!: number;
  @Output() billableHoursChange = new EventEmitter<number>();
  @Input() totalRevenue!: number;
  @Input() totalCOGS!: number;
  @Input() totalMonthlyExpense!: number;
  @Input() monthlyNetProfit!: number;
  @Input() roiProjection!: any[];
  @Input() cashFlowTableData!: any[];
  @Input() marketAnalysis!: any[];
  @Input() keys!: string[];
  @Input() isFcfPositive: boolean = true;

  onHoursChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target) {
      this.billableHoursChange.emit(parseInt(target.value, 10));
    }
  }

  formatCurrency(value: number): string {
    if (value === 0) return '-';
    const formatted = Math.abs(Math.round(value)).toLocaleString('id-ID');
    return value < 0 ? `(${formatted})` : formatted;
  }

  formatCurrencyShort(value: number): string {
    if (value === 0) return '-';
    const absVal = Math.abs(value);
    let formatted = '';

    if (absVal >= 1e9) {
      formatted = (absVal / 1e9).toFixed(1).replace(/\.0$/, '') + 'B';
    } else if (absVal >= 1e6) {
      formatted = (absVal / 1e6).toFixed(1).replace(/\.0$/, '') + 'M';
    } else if (absVal >= 1e3) {
      formatted = (absVal / 1e3).toFixed(1).replace(/\.0$/, '') + 'K';
    } else {
      formatted = absVal.toString();
    }

    return value < 0 ? `-Rp ${formatted}` : `Rp ${formatted}`;
  }
}
