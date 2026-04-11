import { Component, computed, signal, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PageComponent } from './page/page.component';
import { Pendahuluan } from './components/pendahuluan/pendahuluan';
import { GambaranUmum } from './components/gambaran-umum/gambaran-umum';
import { RencanaPembangunan } from './components/rencana-pembangunan/rencana-pembangunan';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, FormsModule, PageComponent, Pendahuluan, GambaranUmum, RencanaPembangunan],
    templateUrl: './app.html',
    styleUrl: './app.css',
    encapsulation: ViewEncapsulation.None
})
export class App {
    hideNav = false;
    billableHours = signal(2750);

    // Constants
    readonly pricePerHour = 250000;
    readonly unitTotalHPP = 5000;
    readonly marketingCostValue = 35000000;
    readonly operationalCostValue = 30000000;
    readonly softwareCostValue = 45000000;
    readonly salaryCostValue = 404000000;
    readonly initialCapital = 50000000 + 100000000 + 254000000 + 36000000 + 6500000 + 7500000 + 4950000;

    // Computed Values
    totalRevenue = computed(() => this.billableHours() * this.pricePerHour);
    totalCOGS = computed(() => this.billableHours() * this.unitTotalHPP);
    monthlyFixedCostTotal = computed(() => this.marketingCostValue + this.operationalCostValue + this.softwareCostValue + this.salaryCostValue);
    totalMonthlyExpense = computed(() => this.totalCOGS() + this.monthlyFixedCostTotal());
    monthlyNetProfit = computed(() => this.totalRevenue() - this.totalMonthlyExpense());

    roiProjection = computed(() => {
        const monthly = this.monthlyNetProfit();
        const initial = this.initialCapital;
        let cumulative = -initial;
        const projection = [];

        for (let i = 1; i <= 12; i++) {
            cumulative += monthly;
            const isBEP = cumulative >= 0 && (cumulative - monthly) < 0;
            projection.push({
                month: `Bulan ${i}`,
                revenue: monthly,
                cumulative: cumulative,
                isBEP: isBEP
            });
        }
        return projection;
    });

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
        { title: "Kekuatan Layanan", list: ["Metodologi Agile yang transparan dan adaptif (Beck et al., 2001).", "Tech-stack modern (React/Go) yang anti-usang.", "Standar kode internasional dengan code review ketat."] },
        { title: "Tantangan Utama", list: ["Siklus penutupan klien B2B (sales cycle) yang relatif panjang.", "Ketatnya persaingan dengan Software House skala enterprise."] },
        { title: "Peluang (Opportunity)", list: ["Kebijakan digitalisasi UMKM/Korporat dari pemerintah.", "Banyaknya bisnis konvensional yang beralih ke e-commerce & aplikasi custom."] },
        { title: "Strategi Harga", content: "Menggunakan skema Billable Hours (Jam Kerja) senilai Rp 250.000/jam atau paket Retainer bulanan (Osterwalder & Pigneur, 2010)." }
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
        { title: "Menjadi IT Consulting Multinasional", desc: "Membangun perusahaan konsultasi teknologi informasi yang berdaya saing global dengan berkantor pusat di Bandung, melalui penerapan standar internasional dalam arsitektur perangkat lunak, metodologi Agile, serta kolaborasi lintas negara guna melayani klien B2B di tingkat nasional maupun regional Asia Tenggara." },
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

    // 5 Year Projection Logic
    yearlyCashFlow = computed(() => {
        let currentRev = this.totalRevenue() * 12;
        let currentCOGS = this.totalCOGS() * 12;
        let currentOpex = this.monthlyFixedCostTotal() * 12;

        let cumulativeCF = 0;
        const projection = [];

        for (let year = 1; year <= 5; year++) {
            if (year > 1) {
                currentRev *= 1.15; // 15% revenue growth year over year
                currentCOGS *= 1.15;
                currentOpex *= 1.08; // 8% opex inflation
            }

            const grossProfit = currentRev - currentCOGS;
            const ebitda = grossProfit - currentOpex;

            // Depreciation: Hardware (254M/4thn=63.5M), Renovasi (100M/10thn=10M) -> Total 73.5 Juta/Tahun
            const depreciation = 73500000;

            const ebit = ebitda - depreciation;
            // Tax: UMKM rate assumption (11% of EBIT if profitable)
            const tax = ebit > 0 ? ebit * 0.11 : 0;
            const netIncome = ebit - tax;

            const operatingCF = netIncome + depreciation;

            // CAPEX: Year 1 Full (Sewa+Renovasi+Hardware+Lisensi+Branding+Legalitas+Lain-Lain = 454M)
            // Year 2-5: Hanya Sewa Kantor (50M) + Lisensi Software (36M) = 86M
            const capex = year === 1 ? -this.initialCapital : -86000000;

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
    });

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

    downloadPDF() {
        window.print();
    }
}
