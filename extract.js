const fs = require('fs');
const path = require('path');

const appHtmlPath = path.join(__dirname, 'src', 'app', 'app.html');
const appHtml = fs.readFileSync(appHtmlPath, 'utf8');
const lines = appHtml.split('\n');

// Find boundaries based on HTML comments
function findLineIndices(prefix) {
    const start = lines.findIndex(line => line.includes(`<!-- PAGE `) && line.includes(prefix[0]));
    // The end of a section is just before the next "<!-- PAGE " or similar, wait, better find the exact end block.
    // Bab I: PAGE 01 to PAGE 03
    // Bab II: PAGE 04 to PAGE 10
    // Bab III: PAGE 11 to PAGE 24
    let end = -1;
    for (let i = start; i < lines.length; i++) {
        if (lines[i].includes(`<!-- PAGE `) && lines[i].includes(prefix[1])) {
            end = i - 1;
            break;
        }
    }
    // if it's the last section, end is just the end of the <main> block, which is lines.length - some value
    if (end === -1) {
       for(let i = start; i < lines.length; i++) {
           if(lines[i].includes(`</main>`)) {
               end = i - 1;
               break;
           }
       }
    }
    return { start, end };
}

const bab1Range = findLineIndices(['BAB I', 'PAGE 04']);
const bab1Html = lines.slice(bab1Range.start, bab1Range.end + 1).join('\n');

const bab2Range = findLineIndices(['BAB II', 'PAGE 11']);
const bab2Html = lines.slice(bab2Range.start, bab2Range.end + 1).join('\n');

const bab3Range = findLineIndices(['BAB III', 'PAGE 25']); // Wait, is there a PAGE 25? Let's check where Bab 3 ends
// Actually, BAB III ends right before `</main>`, let's just find `</main>`
let bab3End = -1;
let bab3Start = lines.findIndex(line => line.includes(`<!-- PAGE 11:`));
for(let i = bab3Start; i < lines.length; i++) {
    if(lines[i].includes(`</main>`)) {
        bab3End = i - 1;
        break;
    }
}
const bab3Html = lines.slice(bab3Start, bab3End + 1).join('\n');

// Now, remove these sections from app.html and replace with component tags
const newAppHtmlLines = [
    ...lines.slice(0, bab1Range.start),
    '        <!-- BAB I: PENDAHULUAN -->',
    '        <app-pendahuluan></app-pendahuluan>',
    '',
    '        <!-- BAB II: GAMBARAN UMUM -->',
    '        <app-gambaran-umum',
    '            [initialCapital]="initialCapital"',
    '            [goalsArray]="goalsArray"',
    '        ></app-gambaran-umum>',
    '',
    '        <!-- BAB III: RENCANA PEMBANGUNAN -->',
    '        <app-rencana-pembangunan',
    '            [servicesItems]="servicesItems"',
    '            [devSteps]="devSteps"',
    '            [tenagaKerja]="tenagaKerja"',
    '            [initialCapital]="initialCapital"',
    '            [opexGajiDetail]="opexGajiDetail"',
    '            [opexOperasionalDetail]="opexOperasionalDetail"',
    '            [opexSoftwareDetail]="opexSoftwareDetail"',
    '            [opexMarketingDetail]="opexMarketingDetail"',
    '            [salaryCostValue]="salaryCostValue"',
    '            [operationalCostValue]="operationalCostValue"',
    '            [softwareCostValue]="softwareCostValue"',
    '            [marketingCostValue]="marketingCostValue"',
    '            [monthlyFixedCostTotal]="monthlyFixedCostTotal()"',
    '            [billableHours]="billableHours()"',
    '            (billableHoursChange)="onHoursChange($event)"',
    '            [totalRevenue]="totalRevenue()"',
    '            [totalCOGS]="totalCOGS()"',
    '            [totalMonthlyExpense]="totalMonthlyExpense()"',
    '            [monthlyNetProfit]="monthlyNetProfit()"',
    '            [roiProjection]="roiProjection()"',
    '            [cashFlowTableData]="cashFlowTableData()"',
    '            [marketAnalysis]="marketAnalysis"',
    '            [keys]="keys"',
    '        ></app-rencana-pembangunan>',
    ...lines.slice(bab3End + 1)
];

fs.writeFileSync(path.join(__dirname, 'src', 'app', 'components', 'pendahuluan', 'pendahuluan.html'), bab1Html);

fs.mkdirSync(path.join(__dirname, 'src', 'app', 'components', 'gambaran-umum'), { recursive: true });
fs.writeFileSync(path.join(__dirname, 'src', 'app', 'components', 'gambaran-umum', 'gambaran-umum.html'), bab2Html);

fs.writeFileSync(path.join(__dirname, 'src', 'app', 'components', 'rencana-pembangunan', 'rencana-pembangunan.html'), bab3Html);

fs.writeFileSync(appHtmlPath, newAppHtmlLines.join('\n'));

console.log('Extraction complete!');
