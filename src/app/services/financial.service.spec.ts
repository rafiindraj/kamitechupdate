import { describe, it, expect } from 'vitest';
import { FinancialModel } from './financial.service';

describe('FinancialModel', () => {
    const cfg = {
        pricePerHour: 350000,
        unitTotalHPP: 5000,
        marketingCostValue: 35000000,
        operationalCostValue: 30000000,
        softwareCostValue: 45000000,
        salaryCostValue: 404000000,
        initialCapital: 1500000000,
        founderOwnership: 0.60,
        investorOwnership: 0.40,
        dividendPayoutRatio: 0.30,
        dividendStartYear: 2,
        discountRate: 0.12,
        exitMultiple: 5
    };

    it('calculates totalRevenue correctly', () => {
        const model = new FinancialModel(cfg);
        const rev = model.totalRevenue(2050);
        expect(rev).toBe(2050 * cfg.pricePerHour);
    });

    it('produces a 5-year cashflow array of length 5', () => {
        const model = new FinancialModel(cfg);
        const cf = model.yearlyCashFlow(2050);
        expect(Array.isArray(cf)).toBe(true);
        expect(cf.length).toBe(5);
    });

    it('applies 11% corporate tax below Rp4.8B annual pre-tax profit', () => {
        const model = new FinancialModel({
            ...cfg,
            pricePerHour: 406125,
            unitTotalHPP: 0,
            marketingCostValue: 0,
            operationalCostValue: 0,
            softwareCostValue: 0,
            salaryCostValue: 0
        });
        const firstYear = model.yearlyCashFlow(999)[0];

        expect(firstYear.ebit).toBe(4_795_126_500);
        expect(-firstYear.tax).toBeCloseTo(firstYear.ebit * 0.11);
    });

    it('applies 22% corporate tax at Rp4.8B annual pre-tax profit', () => {
        const model = new FinancialModel({
            ...cfg,
            pricePerHour: 406125,
            unitTotalHPP: 0,
            marketingCostValue: 0,
            operationalCostValue: 0,
            softwareCostValue: 0,
            salaryCostValue: 0
        });
        const firstYear = model.yearlyCashFlow(1000)[0];

        expect(firstYear.ebit).toBe(4_800_000_000);
        expect(-firstYear.tax).toBeCloseTo(firstYear.ebit * 0.22);
    });

    it('allocates dividends from year two using the configured ownership split', () => {
        const model = new FinancialModel(cfg);
        const returns = model.investorReturns(2050);

        expect(returns[0].dividend).toBe(0);
        expect(returns[1].dividend).toBeCloseTo(returns[1].netIncome * cfg.dividendPayoutRatio);
        expect(returns[1].founderDividend).toBeCloseTo(returns[1].dividend * cfg.founderOwnership);
        expect(returns[1].investorDividend).toBeCloseTo(returns[1].dividend * cfg.investorOwnership);
    });

    it('produces positive discounted investment metrics for the base scenario', () => {
        const model = new FinancialModel(cfg);
        const metrics = model.investmentMetrics(2050);

        expect(metrics.npv).toBeGreaterThan(0);
        expect(metrics.irr).not.toBeNull();
        expect(metrics.irr!).toBeGreaterThan(cfg.discountRate);
        expect(metrics.discountedPaybackYears).not.toBeNull();
        expect(metrics.discountedPaybackYears!).toBeLessThan(5);
    });

    it('keeps the projected balance sheet balanced every year', () => {
        const model = new FinancialModel(cfg);
        const statements = model.integratedFinancialStatements(2050);

        for (const statement of statements) {
            expect(statement.totalAssets).toBeCloseTo(statement.liabilities + statement.totalEquity);
        }
    });

    it('roiProjection returns 12 months', () => {
        const model = new FinancialModel(cfg);
        const proj = model.roiProjection(2050);
        expect(proj.length).toBe(12);
    });
});
