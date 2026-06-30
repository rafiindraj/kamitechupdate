const fs = require('fs');

// 1. Truncate aspects-keuangan.html and append new section
let html = fs.readFileSync('src/app/components/rencana-pembangunan/aspek-keuangan/aspek-keuangan.html', 'utf8');
const lines = html.split('\n');
const index = lines.findIndex(l => l.includes('11. Ekonomi Investor'));
let cutoff = index;
for(let i = index; i > 0; i--) {
    if(lines[i].includes('<!-- PAGE')) {
        cutoff = i;
        break;
    }
}

const newPage = `<!-- PAGE 19: BAB V - ASPEK KEUANGAN (PROFITABILITY INDEX) -->
<app-page pageId="bab3-keuangan.19" pageNum="77" footerText="Dokumen Studi Kelayakan Bisnis" watermarkOpacity="0.03"
    contentClass="flex flex-col">
    <div class="flex justify-between items-center border-b border-outline-variant pb-2 mb-4 font-sans">
        <span class="text-[14px] font-sans text-on-surface-variant uppercase tracking-widest">Rencana dan Aspek
            Pembangunan</span>
        <span class="text-[14px] font-sans font-bold text-primary">KamiTech Studi Kelayakan Bisnis</span>
    </div>

    <h5
        class="font-bold text-secondary text-[16px] mb-3 font-sans tracking-wide uppercase border-b border-outline-variant pb-1">
        11. Profitability Index</h5>

    <p class="text-[14px] text-on-surface-variant text-justify font-sans leading-[1.25] mb-4">
        <strong>Profitability Index (PI)</strong> adalah rasio keuangan yang mengukur kelayakan suatu investasi dengan membandingkan nilai sekarang dari arus kas masuk (<em>Present Value Inflow</em>) terhadap investasi awal. Metrik ini menunjukkan nilai tambah yang dihasilkan dari setiap Rupiah yang diinvestasikan. Proyek dinilai layak apabila nilai indeks ini lebih besar dari 1.0.
    </p>

    <!-- Formula Box -->
    <div
        class="bg-surface-container-low border border-outline-variant rounded-xl p-4 mb-5 flex flex-col justify-center items-center shadow-sm w-[90%] mx-auto font-serif">
        <div class="flex items-center gap-3 text-on-surface mb-2">
            <span class="italic text-[16px] font-bold">Profitability Index = </span>
            <div class="flex flex-col items-center">
                <span class="italic text-[14px] font-bold">Present Value Inflow</span>
                <div class="w-full h-[1.5px] bg-on-surface my-0.5"></div>
                <span class="italic text-[14px] font-bold">Investasi Awal</span>
            </div>
        </div>
    </div>

    <div class="overflow-hidden rounded-xl border border-outline-variant shadow-sm mb-4 font-sans w-full">
        <table class="w-full text-[12px] bg-white">
            <thead class="bg-inverse-surface text-white uppercase text-[10px] font-bold tracking-wider">
                <tr>
                    <th class="p-2 text-center w-24">Tahun</th>
                    <th class="p-2 text-right">PV (rate 12%)</th>
                </tr>
            </thead>
            <tbody class="text-on-surface-variant">
                @for (row of pvTableData; track row.year) {
                <tr class="border-b border-dashed border-outline-variant hover:bg-surface-container-low transition-colors">
                    <td class="p-2 text-center font-bold">Th {{ row.year }}</td>
                    <td class="p-2 text-right">{{ formatCurrencyShort(row.pv1) }}</td>
                </tr>
                }
                <tr class="bg-surface-container-low font-bold text-primary">
                    <td class="p-2 text-center border-t border-outline-variant">TOTAL</td>
                    <td class="p-2 text-right border-t border-outline-variant">{{ formatCurrencyShort(totalPV1) }}</td>
                </tr>
            </tbody>
        </table>
    </div>

    <div
        class="mt-2 border border-outline-variant bg-surface-container-low p-4 rounded-xl shadow-sm border-l-4 border-l-primary flex flex-col justify-center font-sans">
        <p class="text-[13px] text-on-surface-variant font-sans text-justify mb-0 leading-relaxed">
            Berdasarkan simulasi tabel di atas, <em>Total Present Value Inflow</em> sebesar Rp {{ totalPV1.toLocaleString('id-ID', { maximumFractionDigits: 0 }) }} dibagi dengan investasi awal sebesar Rp {{ initialCapital.toLocaleString('id-ID', { maximumFractionDigits: 0 }) }} menghasilkan <strong>Profitability Index sebesar {{ (totalPV1 / initialCapital) | number:'1.2-2' }}</strong>. Nilai ini sangat meyakinkan dan jauh melebihi batas kelayakan (1.0).
        </p>
    </div>
</app-page>
`;

const newLines = lines.slice(0, cutoff);
newLines.push(newPage);
fs.writeFileSync('src/app/components/rencana-pembangunan/aspek-keuangan/aspek-keuangan.html', newLines.join('\n'));

// 2. Adjust aspects-lingkungan.html
let lingk = fs.readFileSync('src/app/components/rencana-pembangunan/aspek-lingkungan/aspek-lingkungan.html', 'utf8');
lingk = lingk.replace(/pageNum="81"/g, 'pageNum="78"');
lingk = lingk.replace(/pageNum="82"/g, 'pageNum="79"');
fs.writeFileSync('src/app/components/rencana-pembangunan/aspek-lingkungan/aspek-lingkungan.html', lingk);

// 3. Adjust aspects-risiko.html
let risiko = fs.readFileSync('src/app/components/rencana-pembangunan/aspek-risiko/aspek-risiko.html', 'utf8');
risiko = risiko.replace(/pageNum="83"/g, 'pageNum="80"');
fs.writeFileSync('src/app/components/rencana-pembangunan/aspek-risiko/aspek-risiko.html', risiko);

// 4. Adjust app.html
let appHtml = fs.readFileSync('src/app/app.html', 'utf8');
// Replace Daftar Isi entries
appHtml = appHtml.replace(/<span class="bg-white pl-2 text-\[16px\]">81<\/span><\/div>/g, '<span class="bg-white pl-2 text-[16px]">78</span></div>');
appHtml = appHtml.replace(/<span class="bg-white pl-2 text-\[16px\]">83<\/span><\/div>/g, '<span class="bg-white pl-2 text-[16px]">80</span></div>');
appHtml = appHtml.replace(/<span class="bg-white pl-2 font-normal text-\[16px\]">84<\/span>/g, '<span class="bg-white pl-2 font-normal text-[16px]">81</span>');
appHtml = appHtml.replace(/<span class="bg-white pl-2 font-normal text-\[16px\]">85-86<\/span>/g, '<span class="bg-white pl-2 font-normal text-[16px]">82-83</span>');
appHtml = appHtml.replace(/<span class="bg-white pl-2 font-normal text-\[16px\]">87<\/span>/g, '<span class="bg-white pl-2 font-normal text-[16px]">84</span>');

// Replace app-page attributes
appHtml = appHtml.replace(/pageNum="84"/g, 'pageNum="81"');
appHtml = appHtml.replace(/pageNum="85"/g, 'pageNum="82"');
appHtml = appHtml.replace(/pageNum="86"/g, 'pageNum="83"');
appHtml = appHtml.replace(/pageNum="87"/g, 'pageNum="84"');

fs.writeFileSync('src/app/app.html', appHtml);

console.log('Update complete!');
