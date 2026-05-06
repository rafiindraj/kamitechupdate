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
        initialCapital: 50000000 + 100000000 + 254000000 + 36000000 + 6500000 + 7500000 + 4950000
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

    it('roiProjection returns 12 months', () => {
        const model = new FinancialModel(cfg);
        const proj = model.roiProjection(2050);
        expect(proj.length).toBe(12);
    });
});
