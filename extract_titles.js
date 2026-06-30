const fs = require('fs');
const html = fs.readFileSync('src/app/components/rencana-pembangunan/aspek-keuangan/aspek-keuangan.html', 'utf8');

const regex = /<app-page[\s\S]*?pageId="([^"]+)"[\s\S]*?pageNum="([^"]+)"[\s\S]*?<h[456][^>]*>([\s\S]*?)<\/h[456]>/g;
let match;
while ((match = regex.exec(html)) !== null) {
    const title = match[3].replace(/<[^>]+>/g, '').trim().replace(/\s+/g, ' ');
    console.log(`[${match[1]}] (p.${match[2]}): ${title}`);
}
