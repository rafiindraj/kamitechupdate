import { Component, computed, signal, ViewEncapsulation, ViewChild, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

// Components
import { PageComponent } from './page/page.component';
import { Pendahuluan } from './components/pendahuluan/pendahuluan';
import { GambaranUmum } from './components/gambaran-umum/gambaran-umum';
import { RencanaPembangunan } from './components/rencana-pembangunan/rencana-pembangunan';
import { LoadingComponent } from './components/loading/loading.component';

// Services
import { FinancialModel } from './services/financial.service';
import { PdfService } from './services/pdf.service';
import { LoadingService } from './services/loading.service';
import { PageSelectionService } from './services/page-selection.service';

// Constants
import { PRINT_OPTIMIZER_CSS } from './constants/web.constant';
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
import { formatCurrency, formatCurrencyShort } from './utils/currency.util';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, FormsModule, PageComponent, Pendahuluan, GambaranUmum, RencanaPembangunan, LoadingComponent],
    templateUrl: './app.html',
    styleUrls: ['./app.css'],
    encapsulation: ViewEncapsulation.None
})
export class App implements OnInit, OnDestroy {
    // ─── UI State ──────────────────────────────────────────────────────
    hideNav = false;
    isGenerating = false;
    readyToDownloadUrl: string | null = null;

    // ─── Reactive State ────────────────────────────────────────────────
    billableHours = signal(2050);

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
            return {
                label, isBold, isHeader, isHighlight,
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
            getRow('Free Cash Flow (FCF)', 'fcf', true, true, true),
            getRow('Kumulatif FCF', 'cumulative', true, false, true)
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

    // ─── ViewChild & Subscriptions ─────────────────────────────────────
    @ViewChild('pdfContent', { static: false }) pdfContent!: ElementRef;
    private loadingSub?: Subscription;

    readonly pageSelection: PageSelectionService;

    constructor(
        private readonly pdfService: PdfService,
        private readonly loading: LoadingService,
        pageSelection: PageSelectionService
    ) {
        this.pageSelection = pageSelection;
        this.loadingSub = this.loading.isLoading$.subscribe((v) => {
            this.isGenerating = v;
        });
    }

    ngOnInit(): void {
        // Register cover page (not wrapped in <app-page>)
        this.pageSelection.registerPage('cover', 'cover');
    }

    ngOnDestroy(): void {
        this.loadingSub?.unsubscribe();
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
        this.pdfService.generateAndDownload(this.pdfContent);
    }
}
