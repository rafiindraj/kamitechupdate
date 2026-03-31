const fs = require('fs');
const path = require('path');

const appHtmlPath = path.join(__dirname, 'src', 'app', 'app.html');
const appHtml = fs.readFileSync(appHtmlPath, 'utf8');
const lines = appHtml.split('\n');

const bab1Html = lines.slice(535, 741).join('\n');
const bab2Html = lines.slice(742, 1351).join('\n');
const bab3Html = lines.slice(1352, 2444).join('\n');

const newAppHtmlLines = [
    ...lines.slice(0, 535),
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
    ...lines.slice(2444)
];

// Ensure directories exist
fs.mkdirSync(path.join(__dirname, 'src', 'app', 'components', 'pendahuluan'), { recursive: true });
fs.mkdirSync(path.join(__dirname, 'src', 'app', 'components', 'gambaran-umum'), { recursive: true });
fs.mkdirSync(path.join(__dirname, 'src', 'app', 'components', 'rencana-pembangunan'), { recursive: true });

fs.writeFileSync(path.join(__dirname, 'src', 'app', 'components', 'pendahuluan', 'pendahuluan.html'), bab1Html);
fs.writeFileSync(path.join(__dirname, 'src', 'app', 'components', 'gambaran-umum', 'gambaran-umum.html'), bab2Html);
fs.writeFileSync(path.join(__dirname, 'src', 'app', 'components', 'rencana-pembangunan', 'rencana-pembangunan.html'), bab3Html);

fs.writeFileSync(appHtmlPath, newAppHtmlLines.join('\n'));

console.log('Extraction complete!');
