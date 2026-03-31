const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'app', 'components', 'rencana-pembangunan', 'rencana-pembangunan.html');
let content = fs.readFileSync(filePath, 'utf8');

const replacements = [
  'billableHours()',
  'monthlyFixedCostTotal()',
  'totalRevenue()',
  'totalCOGS()',
  'totalMonthlyExpense()',
  'monthlyNetProfit()',
  'roiProjection()',
  'cashFlowTableData()'
];

for (const rep of replacements) {
    const withoutParens = rep.replace('()', '');
    content = content.replace(new RegExp(rep.replace('()', '\\(\\)'), 'g'), withoutParens);
}

fs.writeFileSync(filePath, content);
console.log('Replacements done!');
