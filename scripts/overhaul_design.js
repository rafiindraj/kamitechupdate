// scripts/overhaul_design.js
const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, '../src/app/app.html');
let content = fs.readFileSync(targetFile, 'utf8');

// The split point: we only modify content AFTER the KATA PENGANTAR comment
// so the Cover page and Nav bar remaining 100% untouched.
const splitToken = '<!-- PAGE i: KATA PENGANTAR -->';
const splitIndex = content.indexOf(splitToken);

if (splitIndex === -1) {
    console.error('Split token not found in app.html');
    process.exit(1);
}

const headSection = content.substring(0, splitIndex);
let targetSection = content.substring(splitIndex);

// Define exactly what the "logo colors" are to avoid touching them in the body
// We temporarily replace the known logo snippets in the targetSection 
// with a placeholder, do the main regex replace, then put the logo snippets back.

const logoSnippet1 = `border-2 border-[#42A5F5] flex items-center justify-center rounded-xl rotate-45 shadow-[0_0_15px_rgba(66,165,245,0.2)]`;
const logoSnippet2 = `text-[#42A5F5] font-sans">K</span>`;
const companyProfileDarkBg = `bg-[#1C1B1F] rounded-3xl p-8 md:p-10 text-white`;
const companyProfileTopAccent = `bg-[#42A5F5] opacity-5 rounded-bl-full`;
const companyProfileBottomAccent = `bg-[#42A5F5] opacity-5 rounded-tr-full`;
const companyProfileSubtitle = `text-[#42A5F5] font-medium tracking-[0.2em] text-[12px] md:text-[14px] mt-1 uppercase`;
const companyProfileSocmedHeader = `text-[#42A5F5] font-bold text-[12px] uppercase`;

targetSection = targetSection.replace(logoSnippet1, '__LOGO_SNIPPET_1__');
targetSection = targetSection.replace(logoSnippet2, '__LOGO_SNIPPET_2__');
targetSection = targetSection.replace(companyProfileDarkBg, '__COMPANY_PROFILE_DARK__');
targetSection = targetSection.replace(companyProfileTopAccent, '__COMPANY_PROFILE_ACCENT_1__');
targetSection = targetSection.replace(companyProfileBottomAccent, '__COMPANY_PROFILE_ACCENT_2__');
targetSection = targetSection.replace(companyProfileSubtitle, '__COMPANY_PROFILE_SUB__');
targetSection = targetSection.replace(companyProfileSocmedHeader, '__COMPANY_PROFILE_SOC__');

// Core M3 mappings
const mappings = [
    // Backgrounds / Surfaces
    [/bg-\[\#FFFBFE\]/g, 'bg-surface'],
    [/bg-\[\#1C1B1F\]/g, 'bg-inverse-surface'],
    [/bg-\[\#42A5F5\]/g, 'bg-primary'],
    [/bg-\[\#1565C0\]/g, 'bg-primary'],
    
    [/bg-slate-50/g, 'bg-surface-container-low'],
    [/bg-slate-100/g, 'bg-surface-container'],
    [/bg-slate-800/g, 'bg-surface-container-highest'],
    
    // Text colors
    [/text-\[\#1C1B1F\]/g, 'text-on-surface'],
    [/text-\[\#FFFBFE\]/g, 'text-inverse-on-surface'],
    [/text-\[\#42A5F5\]/g, 'text-primary'],
    [/text-\[\#1565C0\]/g, 'text-primary'],
    // /text-white/g -> skipping generic white to not break icons
    
    [/text-slate-300/g, 'text-outline-variant'],
    [/text-slate-400/g, 'text-outline'],
    [/text-slate-500/g, 'text-on-surface-variant'],
    [/text-slate-600/g, 'text-on-surface-variant'],
    [/text-slate-700/g, 'text-on-surface-variant'],
    
    [/text-\[\#64748B\]/g, 'text-on-surface-variant'], 
    
    // Borders
    [/border-\[\#1C1B1F\]/g, 'border-on-surface'],
    [/border-\[\#42A5F5\]/g, 'border-primary'],
    [/border-\[\#1565C0\]/g, 'border-primary'],
    [/border-slate-100/g, 'border-outline-variant'],
    [/border-slate-200/g, 'border-outline-variant'],
    [/border-slate-300/g, 'border-outline-variant'],
    [/border-slate-400/g, 'border-outline'],
    [/border-slate-600/g, 'border-outline'],
    [/border-slate-700/g, 'border-outline'],
    [/border-slate-800/g, 'border-outline'],
];

for (const [pattern, replacement] of mappings) {
    targetSection = targetSection.replace(pattern, replacement);
}

// Restore logo strings
targetSection = targetSection.replace('__LOGO_SNIPPET_1__', logoSnippet1);
targetSection = targetSection.replace('__LOGO_SNIPPET_2__', logoSnippet2);
targetSection = targetSection.replace('__COMPANY_PROFILE_DARK__', companyProfileDarkBg);
targetSection = targetSection.replace('__COMPANY_PROFILE_ACCENT_1__', companyProfileTopAccent);
targetSection = targetSection.replace('__COMPANY_PROFILE_ACCENT_2__', companyProfileBottomAccent);
targetSection = targetSection.replace('__COMPANY_PROFILE_SUB__', companyProfileSubtitle);
targetSection = targetSection.replace('__COMPANY_PROFILE_SOC__', companyProfileSocmedHeader);

const finalContent = headSection + targetSection;

fs.writeFileSync(targetFile, finalContent, 'utf8');
console.log('Successfully completed M3 overhaul on app.html');
