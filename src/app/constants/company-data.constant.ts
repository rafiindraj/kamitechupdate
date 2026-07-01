/**
 * Static company data constants.
 *
 * Extracted from App component to follow Single Responsibility Principle.
 * The component should only handle UI logic and state — not store
 * dozens of static data arrays.
 *
 * All arrays are typed with their respective interfaces and marked
 * as readonly for immutability.
 */

import { TeamMember } from '../models/team-member.model';
import { ServiceItem } from '../models/service-item.model';
import {
  OpexDetailItem,
  TenagaKerjaItem,
  MarketAnalysisItem,
  GoalItem,
} from '../models/financial.model';

// ─── Company Goals (Pendahuluan) ───────────────────────────────────────────

export const COMPANY_GOALS: readonly string[] = [
  "Membantu perusahaan skala menengah bertransformasi secara digital dengan efisien (Osterwalder & Pigneur, 2010).",
  "Mengembangkan arsitektur perangkat lunak yang aman, scalable, dan modern (Sommerville, 2015).",
  "Mencapai target billable hours yang stabil melalui skema retainer bulanan.",
  "Menciptakan ekosistem kerja bagi talenta IT lokal terbaik di Bandung."
];

// ─── Service Offerings ─────────────────────────────────────────────────────

export const SERVICES_ITEMS: readonly ServiceItem[] = [
  { name: "Custom Web Development", tag: "Core Service", desc: "Pembuatan aplikasi full-stack (React, Node.js) yang dirancang khusus untuk memenuhi logika bisnis kompleks.", color: "bg-white", textColor: "" },
  { name: "Cloud Migration & DevOps", tag: "Infrastructure", desc: "Penyusunan arsitektur AWS/GCP dan implementasi CI/CD untuk memastikan aplikasi berjalan tanpa down-time.", color: "bg-white", textColor: "" },
  { name: "Cybersecurity & IT Audit", tag: "Security", desc: "Layanan Penetration Testing dan audit kerentanan sistem untuk mengamankan data sensitif perusahaan.", color: "bg-[#E0F2FE]/40", textColor: "" },
  { name: "Tech Consultancy", tag: "Partnership", desc: "Dedikasi tim engineer secara bulanan (retainer) untuk maintenance dan pengembangan fitur berkelanjutan.", color: "bg-[#0F172A]", textColor: "text-white" }
];

// ─── Market Analysis ───────────────────────────────────────────────────────

export const MARKET_ANALYSIS: readonly MarketAnalysisItem[] = [
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
    content: "Fokus pada skema Retainer bulanan untuk stabilitas operasional dengan pricing kompetitif (Rp 525.000/billable hour) yang didukung oleh efisiensi biaya overhead di Bandung (30-40% lebih rendah dari Jakarta)."
  }
];

// ─── Development Steps ─────────────────────────────────────────────────────

export const DEV_STEPS: readonly string[] = [
  "<strong class='text-[#38BDF8] block mb-0.5'>Requirement Gathering & Prototyping:</strong> Diskusi intensif dengan klien untuk memetakan alur bisnis. Hasilnya berupa wireframe (Figma) dan dokumen spesifikasi (PRD) (Sommerville, 2015).",
  "<strong class='text-[#38BDF8] block mb-0.5'>Sprint Development (Agile):</strong> Pembuatan kode (frontend & backend) dalam sprint mingguan (Beck et al., 2001). Progres dapat dipantau klien via staging server (Ries, 2011).",
  "<strong class='text-[#38BDF8] block mb-0.5'>QA Testing & Security Audit:</strong> Uji coba fungsionalitas menyeluruh (Automated & Manual testing) untuk memastikan tidak ada bug sebelum rilis (Sommerville, 2015).",
  "<strong class='text-[#38BDF8] block mb-0.5'>Deployment & Maintenance:</strong> Migrasi sistem ke Cloud Server production (AWS/GCP), disertai dukungan monitoring server 24/7."
];

// ─── Team Members ──────────────────────────────────────────────────────────

export const TEAM_MEMBERS: readonly TeamMember[] = [
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

// ─── Tenaga Kerja (Workforce) ──────────────────────────────────────────────

export const TENAGA_KERJA: readonly TenagaKerjaItem[] = [
  { role: "CEO / CTO", count: 2, salary: "Rp 30.000.000" },
  { role: "IT Engineer (DevSecOps)", count: 4, salary: "Rp 20.000.000" },
  { role: "IT Engineer (Front End, Back End, UI/UX & QA)", count: 12, salary: "Rp 15.000.000" },
  { role: "Finance Strategist", count: 1, salary: "Rp 20.000.000" },
  { role: "Business Analyst", count: 1, salary: "Rp 20.000.000" },
  { role: "Sales & Marketing, Accounting, Logistic, Tax", count: 4, salary: "Rp 11.000.000" }
];

// ─── OPEX Detail Breakdowns ────────────────────────────────────────────────

export const OPEX_GAJI_DETAIL: readonly OpexDetailItem[] = [
  { item: 'CEO / CTO', detail: '2 Orang × Rp 30.000.000', amount: 60000000 },
  { item: 'IT Engineer (DevSecOps)', detail: '4 Orang × Rp 20.000.000', amount: 80000000 },
  { item: 'IT Engineer (FE, BE, UI/UX & QA)', detail: '12 Orang × Rp 15.000.000', amount: 180000000 },
  { item: 'Finance Strategist', detail: '1 Orang × Rp 20.000.000', amount: 20000000 },
  { item: 'Business Analyst', detail: '1 Orang × Rp 20.000.000', amount: 20000000 },
  { item: 'Sales, Marketing, Accounting, Logistic, Tax', detail: '4 Orang × Rp 11.000.000', amount: 44000000 },
];

export const OPEX_OPERASIONAL_DETAIL: readonly OpexDetailItem[] = [
  { item: 'Listrik Kantor', amount: 5000000 },
  { item: 'Air (PDAM)', amount: 1000000 },
  { item: 'Dedicated Internet 5G', amount: 10000000 },
  { item: 'Kebersihan & Maintenance', amount: 5000000 },
  { item: 'Konsumsi & Pantry', amount: 5000000 },
  { item: 'Transportasi & Operasional Harian', amount: 4000000 },
];

export const OPEX_SOFTWARE_DETAIL: readonly OpexDetailItem[] = [
  { item: 'AWS / GCP Cloud Hosting', amount: 20000000 },
  { item: 'GitHub Team + Copilot Business', amount: 8000000 },
  { item: 'Domain & SSL Renewal', amount: 1000000 },
  { item: 'Monitoring & Analytics (Datadog/NR)', amount: 6000000 },
  { item: 'SaaS Tools (Slack, Notion, Figma)', amount: 5000000 },
  { item: 'Security & Backup Services', amount: 5000000 },
];

export const OPEX_MARKETING_DETAIL: readonly OpexDetailItem[] = [
  { item: 'LinkedIn Ads & B2B Campaign', amount: 15000000 },
  { item: 'Event & Networking Sponsorship', amount: 8000000 },
  { item: 'CRM Subscription (HubSpot)', amount: 5000000 },
  { item: 'Content Marketing & SEO', amount: 4000000 },
  { item: 'Branding & Design Collateral', amount: 3000000 },
];

// ─── Goals Array (Gambaran Umum) ───────────────────────────────────────────

export const GOALS_ARRAY: readonly GoalItem[] = [
  { title: "Menjadi IT Consulting Multinasional", desc: "Membangun perusahaan konsultan teknologi informasi yang berdaya saing global dengan berkantor pusat di Bandung, melalui penerapan standar internasional dalam arsitektur perangkat lunak, metodologi Agile, serta kolaborasi lintas negara guna melayani klien B2B di tingkat nasional maupun regional Asia Tenggara." },
  { title: "Membuka lapangan kerja digital terbesar di Kota Bandung", desc: "Menciptakan ekosistem kerja berteknologi tinggi yang menyerap talenta-talenta terbaik lulusan perguruan tinggi di Bandung, khususnya di bidang software engineering, DevSecOps, dan data analytics, sehingga mampu menekan angka pengangguran terdidik sekaligus meningkatkan kualitas SDM digital daerah secara berkelanjutan." },
  { title: "Menjadi pelopor cybersecurity awareness dan anti-fraud di Kota Bandung", desc: "Mengedukasi dan mendampingi organisasi serta masyarakat umum mengenai pentingnya keamanan siber melalui layanan penetration testing, audit IT, serta program sosialisasi kesadaran keamanan digital (security awareness), guna meminimalisir risiko kebocoran data dan tindak kejahatan siber di lingkungan bisnis maupun pemerintahan." },
  { title: "Mempercepat akselerasi transformasi digital khususnya di Jawa Barat", desc: "Berperan aktif sebagai katalisator transformasi digital bagi UMKM dan korporasi besar di Jawa Barat dengan menyediakan solusi teknologi yang terjangkau, scalable, dan disesuaikan dengan kebutuhan spesifik masing-masing organisasi, sehingga mendorong peningkatan efisiensi operasional dan daya saing ekonomi regional secara signifikan." }
];

// ─── Misc Constants ────────────────────────────────────────────────────────

export const SECTION_KEYS: readonly string[] = ['a', 'b', 'c', 'd'];

// ─── Financial Configuration Defaults ──────────────────────────────────────

export const FINANCIAL_DEFAULTS = {
  pricePerHour: 525000,
  unitTotalHPP: 5000,
  marketingCostValue: 35000000,
  operationalCostValue: 30000000,
  softwareCostValue: 45000000,
  salaryCostValue: 404000000,
  initialCapital: 3542950000,
  founderOwnership: 0.60,
  investorOwnership: 0.40,
  dividendPayoutRatio: 0.30,
  dividendStartYear: 2,
  discountRate: 0.40,
  exitMultiple: 5,
} as const;
