import { Component, input, output } from '@angular/core';

import { AspekPasarComponent } from './aspek-pasar/aspek-pasar';
import { AspekTeknisComponent } from './aspek-teknis/aspek-teknis';
import { AspekSdmComponent } from './aspek-sdm/aspek-sdm';
import { AspekKeuanganComponent } from './aspek-keuangan/aspek-keuangan';
import { AspekHukumLingkunganComponent } from './aspek-hukum-lingkungan/aspek-hukum-lingkungan';
import { AspekRisikoComponent } from './aspek-risiko/aspek-risiko';
import { AspekLingkunganComponent } from './aspek-lingkungan/aspek-lingkungan';
import { AspekEkonomiComponent } from './aspek-ekonomi/aspek-ekonomi';

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
import { formatCurrency, formatCurrencyShort, formatCurrencyNCF } from '../../utils/currency.util';

@Component({
  selector: 'app-rencana-pembangunan',
  standalone: true,
  imports: [
    AspekPasarComponent,
    AspekTeknisComponent,
    AspekSdmComponent,
    AspekEkonomiComponent,
    AspekLingkunganComponent,
    AspekKeuanganComponent,
    AspekHukumLingkunganComponent,
    AspekRisikoComponent
  ],
  templateUrl: './rencana-pembangunan.html',
  styles: [`:host { display: flex; flex-direction: column; gap: 3rem; } @media print { :host { gap: 0; } }`],
})
export class RencanaPembangunanComponent {
  readonly servicesItems = input.required<readonly ServiceItem[]>();
  readonly devSteps = input.required<readonly string[]>();
  readonly tenagaKerja = input.required<readonly TenagaKerjaItem[]>();
  readonly initialCapital = input.required<number>();
  readonly opexGajiDetail = input.required<readonly OpexDetailItem[]>();
  readonly opexOperasionalDetail = input.required<readonly OpexDetailItem[]>();
  readonly opexSoftwareDetail = input.required<readonly OpexDetailItem[]>();
  readonly opexMarketingDetail = input.required<readonly OpexDetailItem[]>();
  readonly salaryCostValue = input.required<number>();
  readonly operationalCostValue = input.required<number>();
  readonly softwareCostValue = input.required<number>();
  readonly marketingCostValue = input.required<number>();
  readonly monthlyFixedCostTotal = input.required<number>();
  readonly billableHours = input.required<number>();
  readonly billableHoursChange = output<number>();
  readonly totalRevenue = input.required<number>();
  readonly totalCOGS = input.required<number>();
  readonly totalMonthlyExpense = input.required<number>();
  readonly monthlyNetProfit = input.required<number>();
  readonly roiProjection = input.required<readonly RoiProjectionItem[]>();
  readonly cashFlowTableData = input.required<readonly CashFlowTableRow[]>();
  readonly founderOwnership = input.required<number>();
  readonly investorOwnership = input.required<number>();
  readonly dividendPayoutRatio = input.required<number>();
  readonly discountRate = input.required<number>();
  readonly exitMultiple = input.required<number>();
  readonly investorReturns = input.required<readonly InvestorReturnItem[]>();
  readonly investorReturnSummary = input.required<InvestorReturnSummary>();
  readonly investmentMetrics = input.required<InvestmentMetrics>();
  readonly integratedFinancialStatements = input.required<readonly IntegratedFinancialYear[]>();
  readonly marketAnalysis = input.required<readonly MarketAnalysisItem[]>();
  readonly keys = input.required<readonly string[]>();
  readonly isFcfPositive = input<boolean>(true);

  onHoursChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target) {
      this.billableHoursChange.emit(parseInt(target.value, 10));
    }
  }

  // Delegate to shared utility (eliminates duplication)
  formatCurrency = formatCurrency;
  formatCurrencyShort = formatCurrencyShort;
  formatCurrencyNCF = formatCurrencyNCF;
}

