import { RoiProjectionItem, YearlyCashFlowItem } from '../models/financial.model';

/**
 * Configuration for the financial model calculations.
 */
export interface FinancialConfig {
    readonly pricePerHour: number;
    readonly unitTotalHPP: number;
    readonly marketingCostValue: number;
    readonly operationalCostValue: number;
    readonly softwareCostValue: number;
    readonly salaryCostValue: number;
    readonly initialCapital: number;
}

/**
 * Pure calculation model for all financial projections.
 *
 * Not an Angular service — instantiated with config values.
 * All methods are pure functions of their inputs + config,
 * making them deterministic and easily testable.
 */
export class FinancialModel {
    private readonly cfg: FinancialConfig;

    constructor(cfg: FinancialConfig) {
        this.cfg = cfg;
    }

    totalRevenue(hours: number): number {
        return hours * this.cfg.pricePerHour;
    }

    totalCOGS(hours: number): number {
        return hours * this.cfg.unitTotalHPP;
    }

    monthlyFixedCostTotal(): number {
        return this.cfg.marketingCostValue + this.cfg.operationalCostValue + this.cfg.softwareCostValue + this.cfg.salaryCostValue;
    }

    totalMonthlyExpense(hours: number): number {
        return this.totalCOGS(hours) + this.monthlyFixedCostTotal();
    }

    monthlyNetProfit(hours: number): number {
        return this.totalRevenue(hours) - this.totalMonthlyExpense(hours);
    }

    roiProjection(hours: number): RoiProjectionItem[] {
        const monthly = this.monthlyNetProfit(hours);
        const initial = this.cfg.initialCapital;
        let cumulative = -initial;
        const projection: RoiProjectionItem[] = [];

        for (let i = 1; i <= 12; i++) {
            cumulative += monthly;
            const isBEP = cumulative >= 0 && (cumulative - monthly) < 0;
            projection.push({
                month: `Bulan ${i}`,
                revenue: monthly,
                cumulative,
                isBEP
            });
        }

        return projection;
    }

    yearlyCashFlow(hours: number): YearlyCashFlowItem[] {
        let currentRev = this.totalRevenue(hours) * 12;
        let currentCOGS = this.totalCOGS(hours) * 12;
        let currentOpex = this.monthlyFixedCostTotal() * 12;

        let cumulativeCF = 0;
        const projection: YearlyCashFlowItem[] = [];

        for (let year = 1; year <= 5; year++) {
            if (year > 1) {
                currentRev *= 1.15;
                currentCOGS *= 1.15;
                currentOpex *= 1.08;
            }

            const grossProfit = currentRev - currentCOGS;
            const ebitda = grossProfit - currentOpex;

            const depreciation = 73500000;

            const ebit = ebitda - depreciation;
            const tax = ebit > 0 ? ebit * 0.11 : 0;
            const netIncome = ebit - tax;

            const operatingCF = netIncome + depreciation;

            const capex = year === 1 ? -this.cfg.initialCapital : -86000000;

            const freeCashFlow = operatingCF + capex;
            cumulativeCF += freeCashFlow;

            projection.push({
                year,
                revenue: currentRev,
                cogs: -currentCOGS,
                grossProfit,
                opex: -currentOpex,
                ebitda,
                depreciation: -depreciation,
                ebit,
                tax: -tax,
                netIncome,
                operatingCF,
                capex,
                fcf: freeCashFlow,
                cumulative: cumulativeCF
            });
        }

        return projection;
    }
}
