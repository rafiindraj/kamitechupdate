import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { PageComponent } from '../../page/page.component';

import { AspekPasar } from './aspek-pasar/aspek-pasar';
import { AspekTeknis } from './aspek-teknis/aspek-teknis';
import { AspekSdm } from './aspek-sdm/aspek-sdm';
import { AspekKeuangan } from './aspek-keuangan/aspek-keuangan';
import { AspekHukumLingkungan } from './aspek-hukum-lingkungan/aspek-hukum-lingkungan';
import { AspekRisiko } from './aspek-risiko/aspek-risiko';
import { AspekLingkungan } from './aspek-lingkungan/aspek-lingkungan';
import { AspekEkonomi } from './aspek-ekonomi/aspek-ekonomi';

// Models
import { ServiceItem } from '../../models/service-item.model';
import {
  OpexDetailItem,
  TenagaKerjaItem,
  MarketAnalysisItem,
  RoiProjectionItem,
  CashFlowTableRow,
  IntegratedFinancialYear,
  InvestmentMetrics,
  InvestorReturnItem,
  InvestorReturnSummary,
} from '../../models/financial.model';

// Shared utilities (DRY — single source of truth)
import { formatCurrency, formatCurrencyShort } from '../../utils/currency.util';

@Component({
  selector: 'app-rencana-pembangunan',
  standalone: true,
  imports: [

    AspekPasar,
    AspekTeknis,
    AspekSdm,
    AspekEkonomi,
    AspekLingkungan,
    AspekKeuangan,
    AspekHukumLingkungan,
    AspekRisiko
  ],
  templateUrl: './rencana-pembangunan.html',
  styles: [`:host { display: flex; flex-direction: column; gap: 3rem; } @media print { :host { gap: 0; } }`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RencanaPembangunan {
  @Input() servicesItems!: readonly ServiceItem[];
  @Input() devSteps!: readonly string[];
  @Input() tenagaKerja!: readonly TenagaKerjaItem[];
  @Input() initialCapital!: number;
  @Input() opexGajiDetail!: readonly OpexDetailItem[];
  @Input() opexOperasionalDetail!: readonly OpexDetailItem[];
  @Input() opexSoftwareDetail!: readonly OpexDetailItem[];
  @Input() opexMarketingDetail!: readonly OpexDetailItem[];
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
  @Input() roiProjection!: readonly RoiProjectionItem[];
  @Input() cashFlowTableData!: readonly CashFlowTableRow[];
  @Input() founderOwnership!: number;
  @Input() investorOwnership!: number;
  @Input() dividendPayoutRatio!: number;
  @Input() discountRate!: number;
  @Input() exitMultiple!: number;
  @Input() investorReturns!: readonly InvestorReturnItem[];
  @Input() investorReturnSummary!: InvestorReturnSummary;
  @Input() investmentMetrics!: InvestmentMetrics;
  @Input() integratedFinancialStatements!: readonly IntegratedFinancialYear[];
  @Input() marketAnalysis!: readonly MarketAnalysisItem[];
  @Input() keys!: readonly string[];
  @Input() isFcfPositive: boolean = true;

  onHoursChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target) {
      this.billableHoursChange.emit(parseInt(target.value, 10));
    }
  }

  // Delegate to shared utility (eliminates duplication)
  formatCurrency = formatCurrency;
  formatCurrencyShort = formatCurrencyShort;
}
