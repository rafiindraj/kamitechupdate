export interface FinancialConfig {
    pricePerHour: number;
    unitTotalHPP: number;
    marketingCostValue: number;
    operationalCostValue: number;
    softwareCostValue: number;
    salaryCostValue: number;
    initialCapital: number;
}

export class FinancialModel {
    private cfg: FinancialConfig;

    constructor(cfg: FinancialConfig) {
        this.cfg = cfg;
    }

    totalRevenue(hours: number) {
        return hours * this.cfg.pricePerHour;
    }

    totalCOGS(hours: number) {
        return hours * this.cfg.unitTotalHPP;
    }

    monthlyFixedCostTotal() {
        return this.cfg.marketingCostValue + this.cfg.operationalCostValue + this.cfg.softwareCostValue + this.cfg.salaryCostValue;
    }

    totalMonthlyExpense(hours: number) {
        return this.totalCOGS(hours) + this.monthlyFixedCostTotal();
    }

    monthlyNetProfit(hours: number) {
        return this.totalRevenue(hours) - this.totalMonthlyExpense(hours);
    }

    roiProjection(hours: number) {
        const monthly = this.monthlyNetProfit(hours);
        const initial = this.cfg.initialCapital;
        let cumulative = -initial;
        const projection: Array<any> = [];

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

    yearlyCashFlow(hours: number) {
        let currentRev = this.totalRevenue(hours) * 12;
        let currentCOGS = this.totalCOGS(hours) * 12;
        let currentOpex = this.monthlyFixedCostTotal() * 12;

        let cumulativeCF = 0;
        const projection: Array<any> = [];

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
