const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, 'src', 'app', 'app.html');
const content = fs.readFileSync(targetFile, 'utf8');

function extractBetween(str, startMarker, endMarker) {
    const startIdx = str.indexOf(startMarker);
    if (startIdx === -1) return '';
    const endIdx = str.indexOf(endMarker, startIdx + startMarker.length);
    if (endIdx === -1) return str.substring(startIdx);
    return str.substring(startIdx, endIdx);
}

// Extract specific blocks based on existing structure markers
const profilLayanan = extractBetween(content, '<!-- Col 1: Profil Layanan IT -->', '<!-- Col 2: Kondisi Ekosistem Digital -->');
const ekosistemDigital = extractBetween(content, '<!-- Col 2: Kondisi Ekosistem Digital -->', '</div>\r\n        </app-page>');
const salesMarketing = extractBetween(content, '<!-- PAGE 12: BAB III - LAYANAN & EKOSISTEM (Part 2) -->', '</app-page>');
const contentSalesMarketing = extractBetween(salesMarketing, '<h4', '</div>\r\n        </app-page>');

const aspekPasarOpts = extractBetween(content, '<!-- A. Aspek Pasar dan Pemilihan Solusi -->', '<!-- B. Infrastruktur Cloud -->');
const cloudHardware = extractBetween(content, '<!-- B. Infrastruktur Cloud -->', '<!-- C. Hukum -->');
const hukum = extractBetween(content, '<!-- C. Hukum -->', '</div>\r\n        </app-page>');
const contentHukum = extractBetween(hukum, '<h4', '</div>\r\n        </app-page>');

const aspekSosial = extractBetween(content, '<!-- D. Aspek Sosial -->', '<!-- E. Aspek Teknis (SOP Dev) -->');
const sopDev = extractBetween(content, '<!-- E. Aspek Teknis (SOP Dev) -->', '</div>\r\n        </app-page>');

const tenagaKerja = extractBetween(content, '<!-- F. Tenaga Kerja -->', '</div>\r\n        </app-page>');

const keuangan = extractBetween(content, '<!-- PAGE 16: BAB V - FINANCIAL PART 1 (CAPEX - Kantor & Hardware) -->', '<!-- PAGE 23: PENUTUP -->');

// Build New Narasi
const ekonomiNew = `
                <div>
                    <h4 class="font-bold text-primary text-[18px] mt-4 mb-3 font-sans tracking-wide uppercase border-b border-outline-variant pb-1">
                        D.2. Dampak Ekonomi Pembangunan</h4>
                    <div class="text-[16px] text-on-surface-variant text-justify font-sans">
                        <p class="indent-8 leading-[1.15] mb-0">
                            Secara ekonomi makro, kehadiran PT KamiTech Solusi Digital diharapkan dapat mengakselerasi roda ekonomi digital daerah. Dengan memfasilitasi transformasi digital bagi UMKM dan korporasi, klien akan mengalami peningkatan efisiensi operasional dan kapabilitas daya saing bisnis. Dari sisi ketenagakerjaan, KamiTech berkomitmen membuka lapangan pekerjaan <em>high-value</em> bagi talenta lokal di bidang teknologi informasi, sehingga secara langsung menekan angka pengangguran terdidik serta meningkatkan kualitas SDM melalui transfer pengetahuan (<em>knowledge transfer</em>) berstandar industri modern. Di samping itu, dengan memproyeksikan target profitabilitas yang stabil berkelanjutan pada tahun-tahun mendatang, perusahaan juga akan berkontribusi secara nyata pada Pendapatan Asli Daerah (PAD) melalui kepatuhan pembayaran Pajak Penghasilan (PPh) Badan, PPn, maupun Pajak Jasa Konsultasi.
                        </p>
                    </div>
                </div>
`;

const risikoNew = `
                <div>
                    <h4 class="font-bold text-primary text-[18px] mb-3 font-sans tracking-wide uppercase border-b border-outline-variant pb-1">
                        H. Analisis Risiko Kelayakan</h4>
                    <div class="text-[16px] text-on-surface-variant text-justify font-sans mb-4">
                        <p class="indent-8 leading-[1.15] mb-0">
                            Dalam menjalankan industri layanan konsultasi dan pengembangan perangkat lunak, KamiTech mengidentifikasi beberapa faktor risiko fundamental yang berpotensi berdampak pada kelayakan dan sustainabilitas operasional bisnis. Pemetaan risiko strategis (<em>Strategic Risk Mapping</em>) ini diiringi dengan pedoman mitigasi teknis dan non-teknis sebagai berikut:
                        </p>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="bg-surface-container-low p-4 rounded-xl border border-outline-variant shadow-sm border-l-4 border-l-red-500">
                            <h5 class="font-bold text-on-surface text-[14px] mb-1 font-sans">1. Risiko Keamanan Siber (Cybersecurity)</h5>
                            <p class="text-[13px] leading-[1.15] mb-0 text-on-surface-variant">Ancaman kebocoran data klien (data breach) dan serangan malware pada server cloud produksi.</p>
                            <p class="text-[13px] leading-[1.15] mt-2 mb-0 text-primary font-medium">Mitigasi: Implementasi standarisasi DevSecOps, enkripsi end-to-end (AES-256), serta siklus audit keamanan rutin.</p>
                        </div>
                        <div class="bg-surface-container-low p-4 rounded-xl border border-outline-variant shadow-sm border-l-4 border-l-orange-500">
                            <h5 class="font-bold text-on-surface text-[14px] mb-1 font-sans">2. Risiko Retensi Talenta (High Turnover)</h5>
                            <p class="text-[13px] leading-[1.15] mb-0 text-on-surface-variant">Ketatnya kompetisi perekrutan software engineer handal di industri, memicu resiko pembajakan talenta kunci.</p>
                            <p class="text-[13px] leading-[1.15] mt-2 mb-0 text-primary font-medium">Mitigasi: Budaya kerja inklusif & Agile, paket kompensasi kompetitif, serta program jenjang karir (continuous learning).</p>
                        </div>
                        <div class="bg-surface-container-low p-4 rounded-xl border border-outline-variant shadow-sm border-l-4 border-l-yellow-500">
                            <h5 class="font-bold text-on-surface text-[14px] mb-1 font-sans">3. Risiko Finansial (Cash Burn Rate)</h5>
                            <p class="text-[13px] leading-[1.15] mb-0 text-on-surface-variant">Kegagalan mencapai BEP (Break-Even Point) dan kehabisan cadangan arus kas dalam tahun operasional pertama.</p>
                            <p class="text-[13px] leading-[1.15] mt-2 mb-0 text-primary font-medium">Mitigasi: Pengendalian manajemen OPEX, diversifikasi channel klien B2B, dan pencadangan dana darurat (runway) minimal 6 bulan.</p>
                        </div>
                        <div class="bg-surface-container-low p-4 rounded-xl border border-outline-variant shadow-sm border-l-4 border-l-blue-500">
                            <h5 class="font-bold text-on-surface text-[14px] mb-1 font-sans">4. Risiko Disrupsi Teknologi Cepat</h5>
                            <p class="text-[13px] leading-[1.15] mb-0 text-on-surface-variant">Perusahaan tertinggal karena munculnya framework baru, sehingga layanan menjadi kurang diminati atau tidak relevan (obsolete).</p>
                            <p class="text-[13px] leading-[1.15] mt-2 mb-0 text-primary font-medium">Mitigasi: RnD (Research & Development) berkelanjutan secara internal dan adopsi tech-stack berdesain modular.</p>
                        </div>
                    </div>
                </div>
`;

// Combine into fresh pages
const pageHeader = (title, num) => `        <!-- PAGE ${num}: BAB III - ${title} -->
        <app-page pageId="bab3${num === 11 ? '' : '-p' + num}" pageNum="${num}" footerText="Dokumen Studi Kelayakan Bisnis" watermarkOpacity="0.03" contentClass="flex flex-col">
            <div class="flex justify-between items-center border-b border-outline-variant pb-2 mb-6 font-sans">
                <span class="text-[14px] font-sans text-on-surface-variant uppercase tracking-widest">Rencana dan Aspek Pembangunan</span>
                <span class="text-[14px] font-sans font-bold text-primary">KamiTech Studi Kelayakan Bisnis</span>
            </div>
            ${num === 11 ? `<h3 class="flex items-center gap-3 text-[18px] font-bold text-on-surface mb-6 uppercase tracking-wide">
                <span class="w-8 h-8 bg-surface border border-outline-variant flex items-center justify-center text-primary text-[18px] rounded font-sans font-bold">III</span>
                Rencana & Aspek Pembangunan KamiTech
            </h3>` : ''}
            <div class="flex flex-col flex-grow gap-6">`;

const pageFooter = `            </div>
        </app-page>
`;

let newPages = "";

// PAGE 11: A. Aspek Pasar
newPages += pageHeader("ASPEK PASAR", 11);
let newSalesMarketing = contentSalesMarketing.replace("C. Penempatan Strategi Sales & Marketing", "A.1. Strategi Sales & Marketing");
let newAspekPasarOpts = aspekPasarOpts.replace("A. Aspek Pasar dan Pemilihan Solusi", "A.2. Analisis Pasar & Pemilihan Solusi");
newPages += newSalesMarketing + '\n' + newAspekPasarOpts;
newPages += pageFooter;

// PAGE 12: B. Aspek Operasional
newPages += pageHeader("ASPEK OPERASIONAL", 12);
let newProfilLayanan = profilLayanan.replace("A. Profil Layanan IT", "B.1. Profil Layanan IT");
let newCloudHardware = cloudHardware.replace("B. Infrastruktur Cloud & Hardware", "B.2. Infrastruktur Cloud & Hardware");
let newSopDev = sopDev.replace("E. Aspek Teknis (SOP Development)", "B.3. Aspek Teknis (SOP Development)");
newPages += newProfilLayanan + '\n' + newCloudHardware + '\n' + newSopDev;
newPages += pageFooter;

// PAGE 13: C. Aspek SDM
newPages += pageHeader("ASPEK SDM", 13);
let newTenagaKerja = tenagaKerja.replace("F. Rencana Penggunaan Tenaga Kerja", "C. Rencana Penggunaan Tenaga Kerja (SDM)");
newPages += newTenagaKerja;
newPages += pageFooter;

// PAGE 14: D. Aspek Ekonomi
newPages += pageHeader("ASPEK EKONOMI", 14);
let newAspekSosial = aspekSosial.replace("D. Aspek Sosial", "D.1. Aspek Sosial");
newPages += newAspekSosial + '\n' + ekonomiNew;
newPages += pageFooter;

// PAGE 15 to 21: E. Aspek Keuangan
let cleanedKeuangan = keuangan
    .replace(/pageId="bab5/g, 'pageId="bab3-keuangan')
    .replace(/BAB V - ANALISIS KELAYAKAN KEUANGAN/g, 'BAB III - ASPEK KEUANGAN')
    .replace(/<span class="w-8 h-8 bg-surface border border-outline-variant flex items-center justify-center text-primary text-\[18px\] rounded font-sans font-bold">V<\/span>/g, '')
    .replace(/Analisis Kelayakan Bisnis/g, 'Rencana dan Aspek Pembangunan')
    .replace(/Analisis Kelayakan\s+Keuangan/g, 'Rencana dan Aspek Pembangunan')
    .replace(/Analisis Aspek\s+Kelayakan\s+Keuangan/g, 'Rencana dan Aspek Pembangunan')
    .replace(/Analisis Kelayakan Keuangan/g, 'Aspek Keuangan')
    .replace(/A\. Rincian Belanja Modal \(CAPEX\)/g, 'E.1. Rincian Belanja Modal (CAPEX)')
    .replace(/B\. Rincian Biaya Tetap Bulanan \(OPEX\)/g, 'E.2. Rincian Biaya Tetap Bulanan (OPEX)')
    .replace(/C\. Proyeksi Pendapatan Bulanan & Laba Rugi/g, 'E.3. Proyeksi Pendapatan & Laba Rugi')
    .replace(/D\. Indikator Keuangan Kunci/g, 'E.4. Indikator Keuangan Kunci')
    .replace(/E\. Proyeksi ROI Kumulatif/g, 'E.5. Proyeksi ROI Kumulatif')
    .replace(/F\. Model Sustainabilitas Arus Kas/g, 'E.6. Model Sustainabilitas Arus Kas');

cleanedKeuangan = cleanedKeuangan.replace(/pageNum="(\d+)"/g, (match, p1) => {
    return `pageNum="${parseInt(p1) - 1}"`;
});
cleanedKeuangan = cleanedKeuangan.replace(/<!-- PAGE (\d+):/g, (match, p1) => {
    return `<!-- PAGE ${parseInt(p1) - 1}:`;
});

newPages += cleanedKeuangan;

// PAGE 22: F. Hukum & G. Lingkungan
newPages += pageHeader("ASPEK HUKUM & LINGKUNGAN", 22);
let newHukum = contentHukum.replace("C. Aspek Hukum & Legalitas", "F. Aspek Hukum & Legalitas");
let newEkosistem = ekosistemDigital.replace("B. Kondisi Ekosistem Digital", "G. Analisis Lingkungan Ekosistem Digital");
newPages += newHukum + '\n' + newEkosistem;
newPages += pageFooter;

// PAGE 23: H. Risiko
newPages += pageHeader("ANALISIS RISIKO", 23);
newPages += risikoNew;
newPages += pageFooter;

// Build final document
const startStr = '<!-- PAGE 11: BAB III - LAYANAN & EKOSISTEM -->';
if (!content.includes(startStr)) { console.log("START POINT NOT FOUND."); process.exit(1); }
const startIndex = content.indexOf(startStr);

const endStr = '<!-- PAGE 23: PENUTUP -->';
if (!content.includes(endStr)) { console.log("END POINT NOT FOUND."); process.exit(1); }
const endIndex = content.indexOf(endStr);

let finalContent = content.substring(0, startIndex) + newPages + '\n\n        ' + content.substring(endIndex);

// Update page numbers for Penutup, Pustaka, Glossarium
finalContent = finalContent.replace(/<!-- PAGE 23: PENUTUP -->/, '<!-- PAGE 24: PENUTUP -->');
finalContent = finalContent.replace(/pageNum="23"\s+footerText="Dokumen Studi Kelayakan Bisnis"/, 'pageNum="24" footerText="Dokumen Studi Kelayakan Bisnis"');

finalContent = finalContent.replace(/<!-- PAGE 24: DAFTAR PUSTAKA & LAMPIRAN -->/, '<!-- PAGE 25: DAFTAR PUSTAKA & LAMPIRAN -->');
finalContent = finalContent.replace(/pageNum="24"\s+footerText="Dokumen Studi Kelayakan Bisnis"/, 'pageNum="25" footerText="Dokumen Studi Kelayakan Bisnis"');

finalContent = finalContent.replace(/<!-- PAGE 25: GLOSSARIUM -->/, '<!-- PAGE 26: GLOSSARIUM -->');
finalContent = finalContent.replace(/pageNum="25"\s+footerText="Dokumen Studi Kelayakan Bisnis"/, 'pageNum="26" footerText="Dokumen Studi Kelayakan Bisnis"');

fs.writeFileSync(targetFile, finalContent, 'utf8');
console.log("SUCCESS: Document restructured.");
