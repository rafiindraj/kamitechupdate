import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
hideNav = false;
  billableHours = signal(400);

  // Constants
  readonly pricePerHour = 500000; 
  readonly unitTotalHPP = 50000;
  readonly marketingCostValue = 5000000;
  readonly operationalCostValue = 10000000; 
  readonly softwareCostValue = 5000000; 
  readonly salaryCostValue = 61000000; 
  readonly initialCapital = 50000000 + 100000000 + 120000000 + 10000000 + 20000000; 

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
    { title: "Strategi Harga", content: "Menggunakan skema Billable Hours (Jam Kerja) senilai Rp 500.000/jam atau paket Retainer bulanan (Osterwalder & Pigneur, 2010)." }
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
      role: "CTO / co-Founder",
      image: "me-white.jpeg",
      desc: "Memimpin arah arsitektur teknologi, pemilihan tech-stack, dan manajemen infrastruktur Cloud. Menjaga skalabilitas sistem dan mengimplementasikan metodologi Agile pada siklus pengembangan perangkat lunak."
    },
    {
      name: "Jeff Sullivan",
      role: "Finance & Admin Strategist",
      image: "jeff-white.jpeg",
      desc: "Fokus pada manajemen kelayakan finansial, alokasi pengeluaran modal (CAPEX) & biaya operasional (OPEX), serta mengelola administrasi, manajemen risiko, dan kepatuhan hukum."
    },
    {
      name: "Jane Collei",
      role: "Business Strategy Analyst",
      image: "jane-white.jpeg",
      desc: "Bertanggung jawab menganalisis ekosistem digital dan memetakan positioning perusahaan. Mengelola strategi penetrasi pasar B2B, skema harga layanan, serta komunikasi klien (CRM)."
    }
  ];

  tenagaKerja = [
    { role: "Project Manager / Scrum Master", count: 1, salary: "Rp 20.000.000" },
    { role: "Frontend Engineer (React/Next.js)", count: 1, salary: "Rp 15.000.000" },
    { role: "Backend Engineer (Go/Node.js)", count: 1, salary: "Rp 15.000.000" },
    { role: "UI/UX Designer & QA", count: 1, salary: "Rp 11.000.000" }
  ];

  keys = ['a', 'b', 'c', 'd']; 

  onHoursChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target) {
      this.billableHours.set(parseInt(target.value, 10));
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
