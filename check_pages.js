const fs = require('fs');
const html = fs.readFileSync('src/app/components/rencana-pembangunan/aspek-keuangan/aspek-keuangan.html', 'utf8');

const regex = /<!-- PAGE (.*?):[\s\S]*?<app-page.*?pageId="([^"]+)".*?pageNum="(\d+)"/g;
let match;
while ((match = regex.exec(html)) !== null) {
    console.log(`Comment: PAGE ${match[1].trim().padEnd(2)} | pageId: ${match[2].padEnd(20)} | pageNum: ${match[3]}`);
}
