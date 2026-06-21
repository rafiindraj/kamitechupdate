const fs = require('fs');

const path = 'src/app/app.html';
const content = fs.readFileSync(path, 'utf8');

function getElementWithMatchingTags(str, startSearch) {
    let startIndex = str.indexOf(startSearch);
    if (startIndex === -1) return '';

    // Find the first '<div' after startIndex
    let divStart = str.indexOf('<div', startIndex);
    if (divStart === -1) return '';

    let depth = 0;
    let i = divStart;
    while (i < str.length) {
        if (str.substring(i, i + 4) === '<div') {
            depth++;
            i += 4;
        } else if (str.substring(i, i + 6) === '</div>') {
            depth--;
            i += 6;
            if (depth === 0) {
                // Found the matching end tag!
                return str.substring(startIndex, i);
            }
        } else {
            i++;
        }
    }
    return '';
}

// 1. Profil Layanan (P11)
let profilLayanan = getElementWithMatchingTags(content, '<!-- Col 1: Profil Layanan IT -->');

// 2. Kondisi Ekosistem Digital (P11)
let ekosistemDigital = getElementWithMatchingTags(content, '<!-- Col 2: Kondisi Ekosistem Digital -->');

// 3. Sales Marketing (It's under <!-- PAGE 12 --> then C. Penempatan)
let p12Start = content.indexOf('<!-- PAGE 12: BAB III - LAYANAN & EKOSISTEM (Part 2) -->');
let salesMarketingHeader = '<h4\\n                    class="font-bold text-primary text-[18px] mb-4 font-sans tracking-wide uppercase border-b border-outline-variant pb-1">\\n                    C. Penempatan Strategi Sales & Marketing</h4>';
// But sales marketing isn't wrapped in a master div, it's just h4 and then a div inside flex-grow.
// Actually, let's just grab the whole flex-grow content of Page 12.
let p12FlexGrowStart = content.indexOf('<div class="flex flex-col flex-grow">', p12Start);
let p12ContentRaw = getElementWithMatchingTags(content, '<div class="flex flex-col flex-grow">');
// wait, we can't reliably get the full content if there are multiple <div flex-grow>
function getFlexGrowContentForPage(pageMarker) {
    let pStart = content.indexOf(pageMarker);
    let flexGrowTag = '<div class="flex flex-col flex-grow">'; // for P12
    let divStart = content.indexOf(flexGrowTag, pStart);
    if (divStart === -1) {
        flexGrowTag = '<div class="flex flex-col gap-6 flex-grow">';
        divStart = content.indexOf(flexGrowTag, pStart);
        if (divStart === -1) {
            flexGrowTag = '<div class="space-y-6 flex-grow">';
            divStart = content.indexOf(flexGrowTag, pStart);
            if (divStart === -1) {
                flexGrowTag = '<div class="space-y-4 flex-grow">';
                divStart = content.indexOf(flexGrowTag, pStart);
            }
        }
    }

    let depth = 0;
    let i = divStart;
    while (i < content.length) {
        if (content.substring(i, i + 4) === '<div') { depth++; i += 4; }
        else if (content.substring(i, i + 6) === '</div>') {
            depth--;
            i += 6;
            if (depth === 0) {
                // Return just the inner contents
                return content.substring(divStart + flexGrowTag.length, i - 6).trim();
            }
        } else { i++; }
    }
    return '';
}

let salesMarketing = getFlexGrowContentForPage('<!-- PAGE 12: BAB III');
let aspekPasarOpts = getElementWithMatchingTags(content, '<!-- A. Aspek Pasar dan Pemilihan Solusi -->');
let cloudHardware = getElementWithMatchingTags(content, '<!-- B. Infrastruktur Cloud -->');
let infraFlowchart = getElementWithMatchingTags(content, '<!-- Infographic: Cloud Architecture Flowchart -->');
let hukum = getElementWithMatchingTags(content, '<!-- C. Hukum -->');
let aspekSosial = getElementWithMatchingTags(content, '<!-- D. Aspek Sosial -->');
let sopDev = getElementWithMatchingTags(content, '<!-- E. Aspek Teknis (SOP Dev) -->');
let tenagaKerja = getElementWithMatchingTags(content, '<!-- F. Tenaga Kerja -->');

const ekonomiNew = `                <!-- D.2. Dampak Ekonomi Pembangunan -->
                <div>
                    <h4 class="font-bold text-primary text-[18px] mt-4 mb-3 font-sans tracking-wide uppercase border-b border-outline-variant pb-1">
                        D.2. Dampak Ekonomi Pembangunan</h4>
                    <div class="text-[16px] text-on-surface-variant text-justify font-sans">
                        <p class="indent-8 leading-[1.15] mb-0">
                            Secara ekonomi makro, kehadiran PT KamiTech Solusi Digital diharapkan dapat mengakselerasi roda ekonomi digital daerah. Dengan memfasilitasi transformasi digital bagi UMKM dan korporasi, klien akan mengalami peningkatan efisiensi operasional dan kapabilitas daya saing bisnis. Dari sisi ketenagakerjaan, KamiTech berkomitmen membuka lapangan pekerjaan <em>high-value</em> bagi talenta lokal di bidang teknologi informasi, sehingga secara langsung menekan angka pengangguran terdidik serta meningkatkan kualitas SDM melalui transfer pengetahuan (<em>knowledge transfer</em>) berstandar industri modern. Di samping itu, dengan memproyeksikan target profitabilitas yang stabil berkelanjutan pada tahun-tahun mendatang, perusahaan juga akan berkontribusi secara nyata pada Pendapatan Asli Daerah (PAD) melalui kepatuhan pembayaran Pajak Penghasilan (PPh) Badan, PPn, maupun Pajak Jasa Konsultasi.
                        </p>
                    </div>
                </div>`;

const risikoNew = `                <div>
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
                </div>`;

const pageHeader = (title, num) => `        <!-- PAGE ${num}: BAB III - ${title} -->
        <app-page pageId="bab3${num === 11 ? '' : '-p' + num}" pageNum="${num}" footerText="Dokumen Studi Kelayakan Bisnis" watermarkOpacity="0.03" contentClass="flex flex-col">
             <div class="flex justify-between items-center border-b border-outline-variant pb-2 mb-4 font-sans">
                <span class="text-[14px] font-sans text-on-surface-variant uppercase tracking-widest">Rencana dan Aspek Pembangunan</span>
                <span class="text-[14px] font-sans font-bold text-primary">KamiTech Studi Kelayakan Bisnis</span>
            </div>
${num === 11 ? `            <h3 class="flex items-center gap-3 text-[18px] font-bold text-on-surface mb-6 uppercase tracking-wide">
                <span class="w-8 h-8 bg-surface border border-outline-variant flex items-center justify-center text-primary text-[18px] rounded font-sans font-bold">III</span>
                Rencana & Aspek Pembangunan KamiTech
            </h3>` : ''}
            <div class="flex flex-col flex-grow gap-6">`;

const pageFooter = `            </div>
        </app-page>
`;

function aspectsFix(str, oldHeader, newHeader) {
    if (!str) return '';
    return str.replace(oldHeader, newHeader);
}

let newBlock = "";
newBlock += pageHeader("ASPEK PASAR", 11) + '\n' + aspectsFix(salesMarketing, 'C. Penempatan Strategi Sales & Marketing', 'A.1. Strategi Sales & Marketing') + '\n' + aspectsFix(aspekPasarOpts, 'A. Aspek Pasar dan Pemilihan Solusi', 'A.2. Analisis Pasar & Pemilihan Solusi') + '\n' + pageFooter;
newBlock += pageHeader("ASPEK OPERASIONAL", 12) + '\n' + aspectsFix(profilLayanan, 'A. Profil Layanan IT', 'B.1. Profil Layanan IT') + '\n' + aspectsFix(cloudHardware, 'B. Infrastruktur Cloud & Hardware', 'B.2. Infrastruktur Cloud & Hardware') + '\n' + infraFlowchart + '\n' + aspectsFix(sopDev, 'E. Aspek Teknis (SOP Development)', 'B.3. Aspek Teknis (SOP Development)') + '\n' + pageFooter;
newBlock += pageHeader("ASPEK SDM", 13) + '\n' + aspectsFix(tenagaKerja, 'F. Rencana Penggunaan Tenaga Kerja', 'C. Rencana Penggunaan Tenaga Kerja (SDM)') + '\n' + pageFooter;
newBlock += pageHeader("ASPEK EKONOMI", 14) + '\n' + aspectsFix(aspekSosial, 'D. Aspek Sosial', 'D.1. Aspek Sosial') + '\n' + ekonomiNew + '\n' + pageFooter;

// Extract Keuangan block properly
const keuanganStartIdx = content.indexOf('<!-- PAGE 16: BAB V - FINANCIAL PART 1');
const penutupStartIdx = content.indexOf('<!-- PAGE 23: PENUTUP -->');
let keuanganText = content.substring(keuanganStartIdx, penutupStartIdx);

keuanganText = keuanganText
    .replace(/pageId="bab5/g, 'pageId="bab3-keuangan')
    .replace(/BAB V - ANALISIS KELAYAKAN KEUANGAN/g, 'BAB III - ASPEK KEUANGAN')
    .replace('<span class="w-8 h-8 bg-surface border border-outline-variant flex items-center justify-center text-primary text-[18px] rounded font-sans font-bold">V</span>', '')
    .replace(/Analisis Kelayakan Bisnis/g, 'Rencana dan Aspek Pembangunan')
    .replace(/Analisis Kelayakan\s+Keuangan/g, 'Rencana dan Aspek Pembangunan')
    .replace(/Analisis Aspek\s+Kelayakan\s+Keuangan/g, 'Rencana dan Aspek Pembangunan')
    .replace(/A\. Rincian Belanja Modal \(CAPEX\)/g, 'E.1. Rincian Belanja Modal (CAPEX)')
    .replace(/B\. Rincian Biaya Tetap Bulanan \(OPEX\)/g, 'E.2. Rincian Biaya Tetap Bulanan (OPEX)')
    .replace(/C\. Proyeksi Pendapatan Bulanan & Laba Rugi/g, 'E.3. Proyeksi Pendapatan & Laba Rugi')
    .replace(/D\. Indikator Keuangan Kunci/g, 'E.4. Indikator Keuangan Kunci')
    .replace(/E\. Proyeksi ROI Kumulatif/g, 'E.5. Proyeksi ROI Kumulatif')
    .replace(/F\. Model Sustainabilitas Arus Kas/g, 'E.6. Model Sustainabilitas Arus Kas');

keuanganText = keuanganText.replace(/pageNum="(\d+)"/g, (match, p1) => { return `pageNum="${parseInt(p1) - 1}"`; });
keuanganText = keuanganText.replace(/<!-- PAGE (\d+):/g, (match, p1) => { return `<!-- PAGE ${parseInt(p1) - 1}:`; });

// Append P22 and P23 at end of Keuangan Text (which will be at the end before Penutup)
let appendBlock = "";
appendBlock += pageHeader("ASPEK HUKUM & LINGKUNGAN", 22) + '\n' + aspectsFix(hukum.replace('<!-- C. Hukum -->', ''), 'C. Aspek Hukum & Legalitas', 'F. Aspek Hukum & Legalitas') + '\n' + aspectsFix(ekosistemDigital, 'B. Kondisi Ekosistem Digital', 'G. Analisis Lingkungan Ekosistem Digital') + '\n' + pageFooter;
appendBlock += pageHeader("ANALISIS RISIKO", 23) + '\n' + risikoNew + '\n' + pageFooter;

let penutupText = content.substring(penutupStartIdx);
penutupText = penutupText.replace(/<!-- PAGE 23: PENUTUP -->/, '<!-- PAGE 24: PENUTUP -->')
    .replace(/pageNum="23"/, 'pageNum="24"');
penutupText = penutupText.replace(/<!-- PAGE 24: DAFTAR PUSTAKA & LAMPIRAN -->/, '<!-- PAGE 25: DAFTAR PUSTAKA & LAMPIRAN -->')
    .replace(/pageNum="24"/, 'pageNum="25"');
penutupText = penutupText.replace(/<!-- PAGE 25: GLOSSARIUM -->/, '<!-- PAGE 26: GLOSSARIUM -->')
    .replace(/pageNum="25"/, 'pageNum="26"');

const page11StartIdx = content.indexOf('<!-- PAGE 11: BAB III - LAYANAN & EKOSISTEM -->');
let allLines = content.substring(0, page11StartIdx) + newBlock + keuanganText + appendBlock + penutupText;

fs.writeFileSync(path, allLines, 'utf8');
console.log('Restructure via depth-matcher complete and perfect.');
