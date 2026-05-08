import { Component, computed, signal, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { PageComponent } from './page/page.component';
import { Pendahuluan } from './components/pendahuluan/pendahuluan';
import { GambaranUmum } from './components/gambaran-umum/gambaran-umum';
import { RencanaPembangunan } from './components/rencana-pembangunan/rencana-pembangunan';
import { FinancialModel } from './services/financial.service';
import { ApiService } from './services/api.service';
import { API_ENDPOINTS } from './constants/endpoint';
import { PRINT_OPTIMIZER_CSS } from './constants/web.constant';
import { PdfPayload } from './models/pdf-payload.model';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, FormsModule, PageComponent, Pendahuluan, GambaranUmum, RencanaPembangunan, HttpClientModule],
    templateUrl: './app.html',
    styleUrls: ['./app.css'],
    encapsulation: ViewEncapsulation.None
})
export class App {
    hideNav = false;
    billableHours = signal(2050);

    // Constants (moved to model instance below)
    readonly pricePerHour = 350000;
    readonly unitTotalHPP = 5000;
    readonly marketingCostValue = 35000000;
    readonly operationalCostValue = 30000000;
    readonly softwareCostValue = 45000000;
    readonly salaryCostValue = 404000000;
    readonly initialCapital = 50000000 + 100000000 + 254000000 + 36000000 + 6500000 + 7500000 + 4950000;

    private financialModel = new FinancialModel({
        pricePerHour: this.pricePerHour,
        unitTotalHPP: this.unitTotalHPP,
        marketingCostValue: this.marketingCostValue,
        operationalCostValue: this.operationalCostValue,
        softwareCostValue: this.softwareCostValue,
        salaryCostValue: this.salaryCostValue,
        initialCapital: this.initialCapital
    });

    // Computed Values — now delegated to FinancialModel
    totalRevenue = computed(() => this.financialModel.totalRevenue(this.billableHours()));
    totalCOGS = computed(() => this.financialModel.totalCOGS(this.billableHours()));
    monthlyFixedCostTotal = computed(() => this.financialModel.monthlyFixedCostTotal());
    totalMonthlyExpense = computed(() => this.financialModel.totalMonthlyExpense(this.billableHours()));
    monthlyNetProfit = computed(() => this.financialModel.monthlyNetProfit(this.billableHours()));

    roiProjection = computed(() => this.financialModel.roiProjection(this.billableHours()));

    // Data
    goals = [
        "Membantu perusahaan skala menengah bertransformasi secara digital dengan efisien (Osterwalder & Pigneur, 2010).",
        "Mengembangkan arsitektur perangkat lunak yang aman, scalable, dan modern (Sommerville, 2015).",
        "Mencapai target billable hours yang stabil melalui skema retainer bulanan.",
        "Menciptakan ekosistem kerja bagi talenta IT lokal terbaik di Bandung."
    ];

    servicesItems = [
        { name: "Custom Web Development", tag: "Core Service", desc: "Pembuatan aplikasi full-stack (React, Node.js) yang dirancang khusus untuk memenuhi logika bisnis kompleks.", color: "bg-white", textColor: "" },
        { name: "Cloud Migration & DevOps", tag: "Infrastructure", desc: "Penyusunan arsitektur AWS/GCP dan implementasi CI/CD untuk memastikan aplikasi berjalan tanpa down-time.", color: "bg-white", textColor: "" },
        { name: "Cybersecurity & IT Audit", tag: "Security", desc: "Layanan Penetration Testing dan audit kerentanan sistem untuk mengamankan data sensitif perusahaan.", color: "bg-[#E0F2FE]/40", textColor: "" },
        { name: "Tech Consultancy", tag: "Partnership", desc: "Dedikasi tim engineer secara bulanan (retainer) untuk maintenance dan pengembangan fitur berkelanjutan.", color: "bg-[#0F172A]", textColor: "text-white" }
    ];

    marketAnalysis = [
        {
            title: "Kondisi Pasar & Tren (2025-2026)",
            list: [
                "Pasar IT Services Indonesia diproyeksikan mencapai USD 5,41 Miliar pada 2026 (CAGR 12%).",
                "Pergeseran model bisnis dari project-based menjadi outcome-driven managed services.",
                "Meningkatnya kebutuhan kepatuhan regulasi terhadap UU PDP No. 27/2022."
            ]
        },
        {
            title: "Analisis SWOT: Internal (S-W)",
            list: [
                "Strength: Metodologi Agile & Tech-stack modern (React/Go/Cloud-Native).",
                "Strength: Sertifikasi keamanan informasi dan ketaatan regulasi (UU PDP).",
                "Weakness: Siklus penjualan B2B yang panjang dan ketergantungan pada talenta spesifik."
            ]
        },
        {
            title: "Analisis SWOT: Eksternal (O-T)",
            list: [
                "Opportunity: Akselerasi transformasi digital UMKM dan Korporasi di Jawa Barat.",
                "Opportunity: Bandung sebagai Hub Teknologi terkuat ke-2 di Indonesia (StartupBlink, 2025).",
                "Threat: Persaingan ketat dengan vendor global dan kelangkaan talenta digital senior."
            ]
        },
        {
            title: "Strategi Kompetisi & Harga",
            content: "Fokus pada skema Retainer bulanan untuk stabilitas operasional dengan pricing kompetitif (Rp 350.000/billable hour) yang didukung oleh efisiensi biaya overhead di Bandung (30-40% lebih rendah dari Jakarta)."
        }
    ];

    devSteps = [
        "<strong class='text-[#38BDF8] block mb-0.5'>Requirement Gathering & Prototyping:</strong> Diskusi intensif dengan klien untuk memetakan alur bisnis. Hasilnya berupa wireframe (Figma) dan dokumen spesifikasi (PRD) (Sommerville, 2015).",
        "<strong class='text-[#38BDF8] block mb-0.5'>Sprint Development (Agile):</strong> Pembuatan kode (frontend & backend) dalam sprint mingguan (Beck et al., 2001). Progres dapat dipantau klien via staging server (Ries, 2011).",
        "<strong class='text-[#38BDF8] block mb-0.5'>QA Testing & Security Audit:</strong> Uji coba fungsionalitas menyeluruh (Automated & Manual testing) untuk memastikan tidak ada bug sebelum rilis (Sommerville, 2015).",
        "<strong class='text-[#38BDF8] block mb-0.5'>Deployment & Maintenance:</strong> Migrasi sistem ke Cloud Server production (AWS/GCP), disertai dukungan monitoring server 24/7."
    ];

    teamMembers = [
        {
            name: "Suci Septia Hamzah",
            role: "CEO / Founder",
            image: "sayangku-white.jpg",
            desc: "Bertanggung jawab penuh atas perumusan strategi bisnis, analisis pasar, perancangan model keuangan (financial modeling), serta penyusunan struktur organisasi PT. KamiTech Solusi Digital."
        },
        {
            name: "Rafi Indrajati",
            role: "CTO",
            image: "me-white.jpeg",
            desc: "Memimpin arah arsitektur teknologi, pemilihan tech-stack, dan manajemen infrastruktur Cloud. Menjaga skalabilitas sistem dan mengimplementasikan metodologi Agile pada siklus pengembangan perangkat lunak."
        },
        {
            name: "Jeff Sullivan",
            role: "Finance Strategist",
            image: "jeff-white.jpeg",
            desc: "Fokus pada manajemen kelayakan finansial, alokasi pengeluaran modal (CAPEX) & biaya operasional (OPEX), serta mengelola administrasi, manajemen risiko, dan kepatuhan hukum."
        },
        {
            name: "Jane Collei",
            role: "Business Analyst",
            image: "jane-white.jpeg",
            desc: "Bertanggung jawab menganalisis ekosistem digital dan memetakan positioning perusahaan. Mengelola strategi penetrasi pasar B2B, skema harga layanan, serta komunikasi klien (CRM)."
        }
    ];

    tenagaKerja = [
        { role: "CEO / CTO", count: 2, salary: "Rp 30.000.000" },
        { role: "IT Engineer (DevSecOps)", count: 4, salary: "Rp 20.000.000" },
        { role: "IT Engineer (Front End, Back End, UI/UX & QA)", count: 12, salary: "Rp 15.000.000" },
        { role: "Finance Strategist", count: 1, salary: "Rp 20.000.000" },
        { role: "Business Analyst", count: 1, salary: "Rp 20.000.000" },
        { role: "Sales & Marketing, Accounting, Logistic, Tax", count: 4, salary: "Rp 11.000.000" }
    ];

    // OPEX Detail Breakdowns
    opexGajiDetail = [
        { item: 'CEO / CTO', detail: '2 Orang × Rp 30.000.000', amount: 60000000 },
        { item: 'IT Engineer (DevSecOps)', detail: '4 Orang × Rp 20.000.000', amount: 80000000 },
        { item: 'IT Engineer (FE, BE, UI/UX & QA)', detail: '12 Orang × Rp 15.000.000', amount: 180000000 },
        { item: 'Finance Strategist', detail: '1 Orang × Rp 20.000.000', amount: 20000000 },
        { item: 'Business Analyst', detail: '1 Orang × Rp 20.000.000', amount: 20000000 },
        { item: 'Sales, Marketing, Accounting, Logistic, Tax', detail: '4 Orang × Rp 11.000.000', amount: 44000000 },
    ];

    opexOperasionalDetail = [
        { item: 'Listrik Kantor', amount: 5000000 },
        { item: 'Air (PDAM)', amount: 1000000 },
        { item: 'Dedicated Internet 5G', amount: 10000000 },
        { item: 'Kebersihan & Maintenance', amount: 5000000 },
        { item: 'Konsumsi & Pantry', amount: 5000000 },
        { item: 'Transportasi & Operasional Harian', amount: 4000000 },
    ];

    opexSoftwareDetail = [
        { item: 'AWS / GCP Cloud Hosting', amount: 20000000 },
        { item: 'GitHub Team + Copilot Business', amount: 8000000 },
        { item: 'Domain & SSL Renewal', amount: 1000000 },
        { item: 'Monitoring & Analytics (Datadog/NR)', amount: 6000000 },
        { item: 'SaaS Tools (Slack, Notion, Figma)', amount: 5000000 },
        { item: 'Security & Backup Services', amount: 5000000 },
    ];

    opexMarketingDetail = [
        { item: 'LinkedIn Ads & B2B Campaign', amount: 15000000 },
        { item: 'Event & Networking Sponsorship', amount: 8000000 },
        { item: 'CRM Subscription (HubSpot)', amount: 5000000 },
        { item: 'Content Marketing & SEO', amount: 4000000 },
        { item: 'Branding & Design Collateral', amount: 3000000 },
    ];

    goalsArray = [
        { title: "Menjadi IT Consulting Multinasional", desc: "Membangun perusahaan konsultan teknologi informasi yang berdaya saing global dengan berkantor pusat di Bandung, melalui penerapan standar internasional dalam arsitektur perangkat lunak, metodologi Agile, serta kolaborasi lintas negara guna melayani klien B2B di tingkat nasional maupun regional Asia Tenggara." },
        { title: "Membuka lapangan kerja digital terbesar di Kota Bandung", desc: "Menciptakan ekosistem kerja berteknologi tinggi yang menyerap talenta-talenta terbaik lulusan perguruan tinggi di Bandung, khususnya di bidang software engineering, DevSecOps, dan data analytics, sehingga mampu menekan angka pengangguran terdidik sekaligus meningkatkan kualitas SDM digital daerah secara berkelanjutan." },
        { title: "Menjadi pelopor cybersecurity awareness dan anti-fraud di Kota Bandung", desc: "Mengedukasi dan mendampingi organisasi serta masyarakat umum mengenai pentingnya keamanan siber melalui layanan penetration testing, audit IT, serta program sosialisasi kesadaran keamanan digital (security awareness), guna meminimalisir risiko kebocoran data dan tindak kejahatan siber di lingkungan bisnis maupun pemerintahan." },
        { title: "Mempercepat akselerasi transformasi digital khususnya di Jawa Barat", desc: "Berperan aktif sebagai katalisator transformasi digital bagi UMKM dan korporasi di Jawa Barat dengan menyediakan solusi teknologi yang terjangkau, scalable, dan disesuaikan dengan kebutuhan spesifik masing-masing organisasi, sehingga mendorong peningkatan efisiensi operasional dan daya saing ekonomi regional secara signifikan." }
    ];

    keys = ['a', 'b', 'c', 'd'];

    // Helper format currency standard
    formatCurrency(value: number): string {
        if (value === 0) return '-';
        const formatted = Math.abs(Math.round(value)).toLocaleString('id-ID');
        return value < 0 ? `(${formatted})` : formatted;
    }

    // Helper format currency singkatan (M/B)
    formatCurrencyShort(value: number): string {
        if (value === 0) return '-';
        const absVal = Math.abs(value);
        let formatted = '';

        if (absVal >= 1e9) {
            formatted = (absVal / 1e9).toFixed(1).replace(/\.0$/, '') + 'B';
        } else if (absVal >= 1e6) {
            formatted = (absVal / 1e6).toFixed(1).replace(/\.0$/, '') + 'M';
        } else if (absVal >= 1e3) {
            formatted = (absVal / 1e3).toFixed(1).replace(/\.0$/, '') + 'K';
        } else {
            formatted = absVal.toString();
        }

        return value < 0 ? `-Rp ${formatted}` : `Rp ${formatted}`;
    }

    yearlyCashFlow = computed(() => this.financialModel.yearlyCashFlow(this.billableHours()));

    cashFlowTableData = computed(() => {
        const data = this.yearlyCashFlow();
        const getRow = (label: string, key: keyof typeof data[0], isBold = false, isHeader = false, isHighlight = false) => {
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
            getRow('Pajak Badan (PPh 11%)', 'tax'),
            getRow('Laba Bersih (Net Income)', 'netIncome', true, false, true),
            getRow('Arus Kas Operasi', 'operatingCF', true, true),
            getRow('Belanja Modal (CAPEX)', 'capex'),
            getRow('Free Cash Flow (FCF)', 'fcf', true, true, true),
            getRow('Kumulatif FCF', 'cumulative', true, false, true)
        ];
    });

    // Check if the 5-year projection ends with positive FCF
    isFcfPositive = computed(() => {
        const data = this.yearlyCashFlow();
        if (data.length === 0) return false;
        const lastYear = data[data.length - 1];
        return lastYear.cumulative >= 0 && lastYear.fcf >= 0;
    });

    onHoursChange(event: Event | number) {
        if (typeof event === 'number') {
            this.billableHours.set(event);
        } else {
            const target = event.target as HTMLInputElement;
            if (target) {
                this.billableHours.set(parseInt(target.value, 10));
            }
        }
    }

    scrollTo(id: string) {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }



    @ViewChild('pdfContent', { static: false }) pdfContent!: ElementRef;

    isGenerating = false;
    readyToDownloadUrl: string | null = null;
    constructor(private api: ApiService) { }

// State variable for your HTML loading spinner

        downloadPDF() {
                this.isGenerating = true;

                // 1. Helper to extract the actual compiled CSS
                const getActiveCSS = () => {
                        let cssString = '';
                        for (const element of document.styleSheets) {
                                const sheet = element
                                try {
                                        if (sheet.cssRules) {
                                                for (const element of sheet.cssRules) {
                                                        cssString += element.cssText + '\n';
                                                }
                                        }
                                } catch (e) {
                                        console.warn('Skipped a cross-origin stylesheet');
                                }
                        }
                        return cssString;
                };

                const activeCss = getActiveCSS();

                // 2. Grab the raw HTML string
                let rawHtml = this.pdfContent?.nativeElement?.innerHTML || '';

                // Scrub Angular dev attributes that bloat the payload
                rawHtml = rawHtml.replace(/ ng-reflect-[a-zA-Z0-9\-]+="[^"]*"/g, '');
                rawHtml = rawHtml.replace(/ _ng[a-zA-Z0-9\-]+=""/g, '');

                // 3. Compose final CSS using the extracted active CSS and shared optimizer CSS
                const finalCss = activeCss + '\n' + PRINT_OPTIMIZER_CSS;

                const payload: PdfPayload = {
                        css: finalCss,
                        html: rawHtml
                };

                // 4. Send to backend via ApiService and handle fallback
                this.api.post<any>(API_ENDPOINTS.pdfExport, payload).subscribe({
                        next: (res: any) => {
                                this.isGenerating = false;
                                window.location.href = res.downloadUrl;
                        },
                        error: (err) => {
                                this.isGenerating = false;
                                console.warn('Backend PDF generation failed. Falling back to native browser print.', err);
                                setTimeout(() => window.print(), 100);
                        }
                });
        }
}
