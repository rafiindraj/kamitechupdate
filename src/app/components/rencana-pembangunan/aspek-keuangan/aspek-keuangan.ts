import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
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
import { formatCurrencyShort } from '../../../utils/currency.util';

@Component({
  selector: 'app-aspek-keuangan',
  standalone: true,
  imports: [PageComponent, DecimalPipe],
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
  @Input() founderOwnership!: number;
  @Input() investorOwnership!: number;
  @Input() dividendPayoutRatio!: number;
  @Input() discountRate!: number;
  @Input() exitMultiple!: number;
  @Input() investorReturns!: readonly InvestorReturnItem[];
  @Input() investorReturnSummary!: InvestorReturnSummary;
  @Input() investmentMetrics!: InvestmentMetrics;
  @Input() integratedFinancialStatements!: readonly IntegratedFinancialYear[];

  onHoursChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target) {
      this.billableHoursChange.emit(parseInt(target.value, 10));
    }
  }

  get pvTableData() {
    const r1 = 0.12;
    const r2 = 0.80;
    
    return this.integratedFinancialStatements.map((item) => {
      const year = item.year;
      const fcf = item.operatingCF + item.investingCF;
      const pv1 = fcf / Math.pow(1 + r1, year);
      const pv2 = fcf / Math.pow(1 + r2, year);
      return { year, fcf, pv1, pv2, r1, r2 };
    });
  }

  get totalPV1() {
    return this.pvTableData.reduce((acc, curr) => acc + curr.pv1, 0);
  }

  get totalFCF() {
    return this.pvTableData.reduce((acc, curr) => acc + curr.fcf, 0);
  }

  get totalPV2() {
    return this.pvTableData.reduce((acc, curr) => acc + curr.pv2, 0);
  }

  get totalNPV1() {
    return this.totalPV1 - this.initialCapital;
  }

  get totalNPV2() {
    return this.totalPV2 - this.initialCapital;
  }

  get manualIrr() {
    return 0.12 + (this.totalNPV1 / (this.totalNPV1 - this.totalNPV2)) * 0.68;
  }

  get dynamicPaybackData() {
    const rate = this.discountRate;
    let cumulativePv = -this.initialCapital;
    
    const data = [{
      year: 0,
      fcf: -this.initialCapital,
      pv: -this.initialCapital,
      cumulativePv: cumulativePv,
      isBEP: false
    }];

    this.integratedFinancialStatements.forEach((item) => {
      const year = item.year;
      const fcf = item.operatingCF + item.investingCF;
      const pv = fcf / Math.pow(1 + rate, year);
      const previousCumulative = cumulativePv;
      cumulativePv += pv;
      const isBEP = previousCumulative < 0 && cumulativePv >= 0;
      data.push({ year, fcf, pv, cumulativePv, isBEP });
    });

    return data;
  }

  get dppCalculation() {
    const data = this.dynamicPaybackData;
    const bepRowIndex = data.findIndex((r) => r.cumulativePv >= 0 && r.year > 0);
    
    if (bepRowIndex <= 0) {
      return null;
    }

    const tStarRow = data[bepRowIndex - 1];
    const tStarPlus1Row = data[bepRowIndex];
    
    const tStar = tStarRow.year;
    const npvTStar = tStarRow.cumulativePv;
    const npvTStarPlus1 = tStarPlus1Row.cumulativePv;
    
    const denominator = npvTStar - npvTStarPlus1;
    const dpp = tStar + (npvTStar / denominator);
    
    return {
      tStar,
      npvTStar,
      npvTStarPlus1,
      denominator,
      dpp
    };
  }

  get Math() {
    return Math;
  }

  // Delegate to shared utility (eliminates duplication)
  formatCurrencyShort = formatCurrencyShort;
}
