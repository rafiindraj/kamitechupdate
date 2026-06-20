import {
    IntegratedFinancialYear,
    InvestmentMetrics,
    InvestorReturnItem,
    InvestorReturnSummary,
    RoiProjectionItem,
    YearlyCashFlowItem
} from '../models/financial.model';

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
    readonly founderOwnership: number;
    readonly investorOwnership: number;
    readonly dividendPayoutRatio: number;
    readonly dividendStartYear: number;
    readonly discountRate: number;
    readonly exitMultiple: number;
}

/**
 * Pure calculation model for all financial projections.
 *
 * Not an Angular service — instantiated with config values.
 * All methods are pure functions of their inputs + config,
 * making them deterministic and easily testable.
 */
export class FinancialModel {
    private static readonly FULL_CORPORATE_TAX_PROFIT_THRESHOLD = 4_800_000_000;
    private static readonly REDUCED_CORPORATE_TAX_RATE = 0.11;
    private static readonly FULL_CORPORATE_TAX_RATE = 0.22;

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
            const corporateTaxRate = ebit >= FinancialModel.FULL_CORPORATE_TAX_PROFIT_THRESHOLD
                ? FinancialModel.FULL_CORPORATE_TAX_RATE
                : FinancialModel.REDUCED_CORPORATE_TAX_RATE;
            const tax = ebit > 0 ? ebit * corporateTaxRate : 0;
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

    investorReturns(hours: number): InvestorReturnItem[] {
        return this.yearlyCashFlow(hours).map((item) => {
            const dividend = item.year >= this.cfg.dividendStartYear && item.netIncome > 0
                ? item.netIncome * this.cfg.dividendPayoutRatio
                : 0;

            return {
                year: item.year,
                netIncome: item.netIncome,
                dividend,
                founderDividend: dividend * this.cfg.founderOwnership,
                investorDividend: dividend * this.cfg.investorOwnership,
                retainedEarnings: item.netIncome - dividend
            };
        });
    }

    investorReturnSummary(hours: number): InvestorReturnSummary {
        const returns = this.investorReturns(hours);
        const lastYear = returns[returns.length - 1];
        const terminalEnterpriseValue = Math.max(0, lastYear.netIncome * this.cfg.exitMultiple);
        const founderDividends = returns.reduce((total, item) => total + item.founderDividend, 0);
        const investorDividends = returns.reduce((total, item) => total + item.investorDividend, 0);
        const founderCapital = this.cfg.initialCapital * this.cfg.founderOwnership;
        const investorCapital = this.cfg.initialCapital * this.cfg.investorOwnership;
        const founderTerminalValue = terminalEnterpriseValue * this.cfg.founderOwnership;
        const investorTerminalValue = terminalEnterpriseValue * this.cfg.investorOwnership;

        return {
            founderCapital,
            investorCapital,
            founderDividends,
            investorDividends,
            terminalEnterpriseValue,
            founderTerminalValue,
            investorTerminalValue,
            investorMoic: investorCapital > 0
                ? (investorDividends + investorTerminalValue) / investorCapital
                : 0
        };
    }

    investmentMetrics(hours: number): InvestmentMetrics {
        const yearly = this.yearlyCashFlow(hours);
        const cashFlows = [
            -this.cfg.initialCapital,
            yearly[0].operatingCF,
            ...yearly.slice(1).map((item) => item.fcf)
        ];
        const npv = cashFlows.reduce(
            (total, cashFlow, period) => total + cashFlow / Math.pow(1 + this.cfg.discountRate, period),
            0
        );

        let discountedCumulative = cashFlows[0];
        let discountedPaybackYears: number | null = null;
        for (let period = 1; period < cashFlows.length; period++) {
            const discountedCashFlow = cashFlows[period] / Math.pow(1 + this.cfg.discountRate, period);
            const previousCumulative = discountedCumulative;
            discountedCumulative += discountedCashFlow;
            if (discountedCumulative >= 0 && discountedCashFlow > 0) {
                discountedPaybackYears = (period - 1) + Math.abs(previousCumulative) / discountedCashFlow;
                break;
            }
        }

        const profitabilityIndex = this.cfg.initialCapital > 0 
            ? 1 + (npv / this.cfg.initialCapital) 
            : 0;

        return {
            discountRate: this.cfg.discountRate,
            npv,
            irr: this.calculateIrr(cashFlows),
            discountedPaybackYears,
            profitabilityIndex
        };
    }

    integratedFinancialStatements(hours: number): IntegratedFinancialYear[] {
        const yearly = this.yearlyCashFlow(hours);
        const returns = this.investorReturns(hours);
        let endingCash = 0;
        let productiveAssetCost = 0;
        let accumulatedDepreciation = 0;
        let retainedEarnings = 0;

        return yearly.map((item, index) => {
            const financingCF = item.year === 1 ? this.cfg.initialCapital : 0;
            const dividends = returns[index].dividend;
            const netCashChange = item.operatingCF + item.capex + financingCF - dividends;
            endingCash += netCashChange;
            productiveAssetCost += Math.abs(item.capex);
            accumulatedDepreciation += Math.abs(item.depreciation);
            const netProductiveAssets = Math.max(0, productiveAssetCost - accumulatedDepreciation);
            retainedEarnings += item.netIncome - dividends;
            const totalAssets = endingCash + netProductiveAssets;
            const shareCapital = this.cfg.initialCapital;
            const totalEquity = shareCapital + retainedEarnings;

            return {
                year: item.year,
                revenue: item.revenue,
                cogs: item.cogs,
                opex: item.opex,
                depreciation: item.depreciation,
                tax: item.tax,
                netIncome: item.netIncome,
                operatingCF: item.operatingCF,
                investingCF: item.capex,
                financingCF,
                dividends: -dividends,
                netCashChange,
                endingCash,
                netProductiveAssets,
                totalAssets,
                liabilities: 0,
                shareCapital,
                retainedEarnings,
                totalEquity
            };
        });
    }

    private calculateIrr(cashFlows: readonly number[]): number | null {
        const npvAt = (rate: number): number => cashFlows.reduce(
            (total, cashFlow, period) => total + cashFlow / Math.pow(1 + rate, period),
            0
        );
        let lower = -0.99;
        let upper = 10;
        if (npvAt(lower) * npvAt(upper) > 0) return null;

        for (let iteration = 0; iteration < 200; iteration++) {
            const midpoint = (lower + upper) / 2;
            if (npvAt(midpoint) > 0) lower = midpoint;
            else upper = midpoint;
        }

        return (lower + upper) / 2;
    }
}
