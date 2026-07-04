import { Component, computed, signal, ViewEncapsulation, ElementRef, OnInit, inject, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Components
import { PageComponent } from './page/page.component';
import { PendahuluanComponent } from './components/pendahuluan/pendahuluan';
import { GambaranUmumComponent } from './components/gambaran-umum/gambaran-umum';
import { RencanaPembangunanComponent } from './components/rencana-pembangunan/rencana-pembangunan';
import { LoadingComponent } from './components/loading/loading.component';

// Services
import { FinancialModel } from './services/financial.service';
import { PdfService } from './services/pdf.service';
import { LoadingService } from './services/loading.service';
import { PageSelectionService } from './services/page-selection.service';

// Constants
import {
    COMPANY_GOALS,
    SERVICES_ITEMS,
    MARKET_ANALYSIS,
    DEV_STEPS,
    TEAM_MEMBERS,
    TENAGA_KERJA,
    OPEX_GAJI_DETAIL,
    OPEX_OPERASIONAL_DETAIL,
    OPEX_SOFTWARE_DETAIL,
    OPEX_MARKETING_DETAIL,
    GOALS_ARRAY,
    SECTION_KEYS,
    FINANCIAL_DEFAULTS,
} from './constants/company-data.constant';

// Models
import { CashFlowTableRow, YearlyCashFlowItem } from './models/financial.model';

// Utilities
import { formatCurrency, formatCurrencyShort, formatCurrencyNCF } from './utils/currency.util';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, FormsModule, PageComponent, PendahuluanComponent, GambaranUmumComponent, RencanaPembangunanComponent, LoadingComponent],
    templateUrl: './app.html',
    styleUrls: ['./app.css'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
    private readonly pdfService = inject(PdfService);
    private readonly loading = inject(LoadingService);
    readonly pageSelection = inject(PageSelectionService);

    // ─── UI State ──────────────────────────────────────────────────────
    hideNav = false;
    readonly isGenerating = this.loading.isLoading;
    readyToDownloadUrl: string | null = null;

    // ─── Reactive State ────────────────────────────────────────────────
    billableHours = signal(1375);

    // ─── Static Data (delegated to constants) ──────────────────────────
    readonly goals = COMPANY_GOALS;
    readonly servicesItems = SERVICES_ITEMS;
    readonly marketAnalysis = MARKET_ANALYSIS;
    readonly devSteps = DEV_STEPS;
    readonly teamMembers = TEAM_MEMBERS;
    readonly tenagaKerja = TENAGA_KERJA;
    readonly opexGajiDetail = OPEX_GAJI_DETAIL;
    readonly opexOperasionalDetail = OPEX_OPERASIONAL_DETAIL;
    readonly opexSoftwareDetail = OPEX_SOFTWARE_DETAIL;
    readonly opexMarketingDetail = OPEX_MARKETING_DETAIL;
    readonly goalsArray = GOALS_ARRAY;
    readonly keys = SECTION_KEYS;

    // ─── Financial Constants (exposed for template binding) ────────────
    readonly pricePerHour = FINANCIAL_DEFAULTS.pricePerHour;
    readonly unitTotalHPP = FINANCIAL_DEFAULTS.unitTotalHPP;
    readonly marketingCostValue = FINANCIAL_DEFAULTS.marketingCostValue;
    readonly operationalCostValue = FINANCIAL_DEFAULTS.operationalCostValue;
    readonly softwareCostValue = FINANCIAL_DEFAULTS.softwareCostValue;
    readonly salaryCostValue = FINANCIAL_DEFAULTS.salaryCostValue;
    readonly initialCapital = FINANCIAL_DEFAULTS.initialCapital;
    readonly founderOwnership = FINANCIAL_DEFAULTS.founderOwnership;
    readonly investorOwnership = FINANCIAL_DEFAULTS.investorOwnership;
    readonly dividendPayoutRatio = FINANCIAL_DEFAULTS.dividendPayoutRatio;
    readonly discountRate = FINANCIAL_DEFAULTS.discountRate;
    readonly exitMultiple = FINANCIAL_DEFAULTS.exitMultiple;

    // ─── Financial Model ───────────────────────────────────────────────
    private readonly financialModel = new FinancialModel(FINANCIAL_DEFAULTS);

    // ─── Computed Values (delegated to FinancialModel) ─────────────────
    totalRevenue = computed(() => this.financialModel.totalRevenue(this.billableHours()));
    totalCOGS = computed(() => this.financialModel.totalCOGS(this.billableHours()));
    monthlyFixedCostTotal = computed(() => this.financialModel.monthlyFixedCostTotal());
    totalMonthlyExpense = computed(() => this.financialModel.totalMonthlyExpense(this.billableHours()));
    monthlyNetProfit = computed(() => this.financialModel.monthlyNetProfit(this.billableHours()));
    roiProjection = computed(() => this.financialModel.roiProjection(this.billableHours()));
    yearlyCashFlow = computed(() => this.financialModel.yearlyCashFlow(this.billableHours()));
    investorReturns = computed(() => this.financialModel.investorReturns(this.billableHours()));
    investorReturnSummary = computed(() => this.financialModel.investorReturnSummary(this.billableHours()));
    investmentMetrics = computed(() => this.financialModel.investmentMetrics(this.billableHours()));
    integratedFinancialStatements = computed(() => this.financialModel.integratedFinancialStatements(this.billableHours()));

    cashFlowTableData = computed((): CashFlowTableRow[] => {
        const data = this.yearlyCashFlow();
        const getRow = (label: string, key: keyof YearlyCashFlowItem, isBold = false, isHeader = false, isHighlight = false): CashFlowTableRow => {
            let y0 = 0;
            if (key === 'capex' || key === 'fcf' || key === 'cashFlowAfterDividend' || key === 'cumulative') {
                y0 = -this.initialCapital;
            }
            return {
                label, isBold, isHeader, isHighlight,
                y0,
                y1: data[0][key] as number,
                y2: data[1][key] as number,
                y3: data[2][key] as number,
                y4: data[3][key] as number,
                y5: data[4][key] as number
            };
        };

        return [
            getRow('Pendapatan Kotor', 'revenue', true, true),
            getRow('HPP / COGS', 'cogs'),
            getRow('Laba Kotor (Gross Profit)', 'grossProfit', true),
            getRow('Biaya Operasional Tetap', 'opex'),
            getRow('EBITDA', 'ebitda', true, true),
            getRow('Depresiasi Aset', 'depreciation'),
            getRow('Laba Operasi (EBIT)', 'ebit', true),
            getRow('Pajak Badan (PPh 11% / 22%)', 'tax'),
            getRow('Laba Bersih (Net Income)', 'netIncome', true, false, true),
            getRow('Arus Kas Operasi', 'operatingCF', true, true),
            getRow('Belanja Modal (CAPEX)', 'capex'),
            getRow('Net Cash Flow (NCF)', 'fcf', true, true, true),
            getRow('Pembagian Dividen (30%)', 'dividend'),
            getRow('Arus Kas setelah Dividen', 'cashFlowAfterDividend', true, false, true),
            getRow('Kumulatif NCF', 'cumulative', true, false, true)
        ];
    });

    isFcfPositive = computed(() => {
        const data = this.yearlyCashFlow();
        if (data.length === 0) return false;
        const lastYear = data[data.length - 1];
        return lastYear.cumulative >= 0 && lastYear.fcf >= 0;
    });

    // ─── Shared Utility Delegates (for template binding) ───────────────
    formatCurrency = formatCurrency;
    formatCurrencyShort = formatCurrencyShort;
    formatCurrencyNCF = formatCurrencyNCF;

    // ─── ViewChild & Subscriptions ─────────────────────────────────────
    readonly pdfContent = viewChild<ElementRef>('pdfContent');

    ngOnInit(): void {
        // Register cover page (not wrapped in <app-page>)
        this.pageSelection.registerPage('cover', 'cover');
    }

    // ─── Event Handlers ────────────────────────────────────────────────

    onHoursChange(event: Event | number): void {
        if (typeof event === 'number') {
            this.billableHours.set(event);
        } else {
            const target = event.target as HTMLInputElement;
            if (target) {
                this.billableHours.set(parseInt(target.value, 10));
            }
        }
    }

    scrollTo(id: string): void {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }

    /**
     * Delegates PDF generation entirely to PdfService (SRP).
     */
    downloadPDF(): void {
        const element = this.pdfContent();
        if (element) {
            this.pdfService.generateAndDownload(element);
        }
    }
}

