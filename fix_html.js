const fs = require('fs');
let html = fs.readFileSync('src/app/components/rencana-pembangunan/aspek-keuangan/aspek-keuangan.html', 'utf8');

// The corrupted page comments look like:
//  "<!-- PAGE " + ([int]$args[0].Groups[1].Value + 2) : BAB V - ASPEK KEUANGAN (ASUMSI MODAL KERJA) -->
// Let's replace them
let pageNumber = 11;
html = html.replace(/[ \t]*"<!-- PAGE " \+ \(\[int\]\$args\[0\]\.Groups\[1\]\.Value \+ 2\) : (BAB V - ASPEK KEUANGAN.*?) -->/g, (match, p1) => {
    return '<!-- PAGE ' + (pageNumber++) + ': ' + p1 + ' -->';
});

// The corrupted pageNum attributes look like:
//  'pageNum="' + ([int]$args[0].Groups[1].Value + 2) + '"' 
let pageCount = 72;
html = html.replace(/[ \t]*'pageNum="' \+ \(\[int\]\$args\[0\]\.Groups\[1\]\.Value \+ 2\) \+ '"'[ \t]*/g, () => {
    return ' pageNum=\"' + (pageCount++) + '\" ';
});

fs.writeFileSync('src/app/components/rencana-pembangunan/aspek-keuangan/aspek-keuangan.html', html);
console.log('Fixed syntax errors.');
