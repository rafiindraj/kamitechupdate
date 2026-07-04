import { Component, ChangeDetectionStrategy, input, output, computed } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { PageComponent } from '../../../page/page.component';

// Models
import {
  CashFlowTableRow,
  IntegratedFinancialYear,
  InvestmentMetrics,
  InvestorReturnItem,
  InvestorReturnSummary,
  OpexDetailItem,
  RoiProjectionItem
} from '../../../models/financial.model';

// Shared utilities (DRY — single source of truth)
import { formatCurrencyShort, formatCurrencyNCF, formatCurrencyTruncated3 } from '../../../utils/currency.util';

@Component({
  selector: 'app-aspek-keuangan',
  standalone: true,
  imports: [PageComponent, DecimalPipe],
  templateUrl: './aspek-keuangan.html',
  styles: [`:host { display: flex; flex-direction: column; gap: 3rem; } @media print { :host { gap: 0; } }`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AspekKeuanganComponent {
  readonly initialCapital = input.required<number>();
  readonly opexGajiDetail = input.required<readonly OpexDetailItem[]>();
  readonly salaryCostValue = input.required<number>();
  readonly opexOperasionalDetail = input.required<readonly OpexDetailItem[]>();
  readonly operationalCostValue = input.required<number>();
  readonly opexSoftwareDetail = input.required<readonly OpexDetailItem[]>();
  readonly softwareCostValue = input.required<number>();
  readonly opexMarketingDetail = input.required<readonly OpexDetailItem[]>();
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

  onHoursChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target) {
      this.billableHoursChange.emit(parseInt(target.value, 10));
    }
  }

  readonly pvTableData = computed(() => {
    const r1 = 0.40;
    const r2 = 0.80;
    const factors1 = [0.7143, 0.5102, 0.3644, 0.2603, 0.1859];
    const factors2 = [0.5556, 0.3086, 0.1715, 0.0953, 0.0529];

    return this.integratedFinancialStatements().map((item) => {
      const year = item.year;
      const fcf = item.fcf;
      const factor1 = factors1[year - 1] || 0;
      const factor2 = factors2[year - 1] || 0;
      const pv1 = fcf * factor1;
      const pv2 = fcf * factor2; 
      return { year, fcf, pv1, pv2, r1, r2, factor1, factor2 };
    });
  });

  readonly totalPV1 = computed(() => {
    return this.pvTableData().reduce((acc, curr) => acc + curr.pv1, 0);
  });

  readonly totalFCF = computed(() => {
    return this.pvTableData().reduce((acc, curr) => acc + curr.fcf, 0);
  });

  readonly totalPV2 = computed(() => {
    return this.pvTableData().reduce((acc, curr) => acc + curr.pv2, 0);
  });

  readonly totalNPV1 = computed(() => {
    return this.totalPV1() - this.initialCapital();
  });

  readonly totalNPV2 = computed(() => {
    return this.totalPV2() - this.initialCapital();
  });

  readonly manualIrr = computed(() => {
    return 0.40 + (this.totalNPV1() / (this.totalNPV1() - this.totalNPV2())) * 0.40;
  });

  readonly staticPaybackData = computed(() => {
    let cumulative = -this.initialCapital();

    const data = [{
      year: 0,
      fcf: -this.initialCapital(),
      cumulative: cumulative,
      isBEP: false
    }];

    this.integratedFinancialStatements().forEach((item) => {
      const year = item.year;
      const fcf = item.fcf;
      const previousCumulative = cumulative;
      cumulative += fcf;
      const isBEP = previousCumulative < 0 && cumulative >= 0;
      data.push({ year, fcf, cumulative, isBEP });
    });

    return data;
  });

  readonly sppCalculation = computed(() => {
    const data = this.staticPaybackData();
    const bepRowIndex = data.findIndex((r) => r.cumulative >= 0 && r.year > 0);

    if (bepRowIndex <= 0) {
      return null;
    }

    const tStarRow = data[bepRowIndex - 1];
    const tStarPlus1Row = data[bepRowIndex];

    const tStar = tStarRow.year;
    const cashFlowTStar = tStarRow.cumulative;
    const denominator = tStarPlus1Row.fcf;
    const spp = tStar + (Math.abs(cashFlowTStar) / denominator);

    return {
      tStar,
      cashFlowTStar,
      denominator,
      spp
    };
  });

  readonly dynamicPaybackData = computed(() => {
    const rate = this.discountRate();
    let cumulativePv = -this.initialCapital();

    const data = [{
      year: 0,
      fcf: -this.initialCapital(),
      pv: -this.initialCapital(),
      cumulativePv: cumulativePv,
      isBEP: false
    }];

    this.integratedFinancialStatements().forEach((item) => {
      const year = item.year;
      const fcf = item.fcf;
      const pv = fcf / Math.pow(1 + rate, year);
      const previousCumulative = cumulativePv;
      cumulativePv += pv;
      const isBEP = previousCumulative < 0 && cumulativePv >= 0;
      data.push({ year, fcf, pv, cumulativePv, isBEP });
    });

    return data;
  });

  readonly dppCalculation = computed(() => {
    const data = this.dynamicPaybackData();
    const bepRowIndex = data.findIndex((r) => r.cumulativePv >= 0 && r.year > 0);

    if (bepRowIndex <= 0) {
      return null;
    }

    const tStarRow = data[bepRowIndex - 1];
    const tStarPlus1Row = data[bepRowIndex];

    const tStar = tStarRow.year;
    const npvTStar = Math.abs(tStarRow.cumulativePv);
    const pvNext = tStarPlus1Row.pv;
    const dpp = tStar + (npvTStar / pvNext);

    return {
      tStar,
      npvTStar,
      pvNext,
      dpp
    };
  });

  get Math() {
    return Math;
  }

  // Delegate to shared utility (eliminates duplication)
  formatCurrencyShort = formatCurrencyShort;
  formatCurrencyNCF = formatCurrencyNCF;
  formatCurrencyTruncated3 = formatCurrencyTruncated3;
}
