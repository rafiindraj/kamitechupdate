const fs = require('fs');
let html = fs.readFileSync('src/app/components/rencana-pembangunan/aspek-keuangan/aspek-keuangan.html', 'utf8');

let pageCounter = 1;
let pageNumCounter = 59;

// We will split the HTML by <app-page to isolate each page, but wait, the comment is before <app-page
// A safer way is to use replace with a function that replaces the comment, pageId, and pageNum at once.

const regex = /<!-- PAGE [\s\S]*?-->[\s\S]*?<app-page\s+pageId="([^"]+)"\s*pageNum="(\d+)"/g;

html = html.replace(regex, (match, oldId, oldNum) => {
    // Extract the title from the comment
    const commentMatch = match.match(/<!-- PAGE (.*?):\s*(.*?) -->/);
    let title = commentMatch ? commentMatch[2].trim() : "BAB V - ASPEK KEUANGAN";
    
    // We want the new comment to be simply sequential
    const newComment = `<!-- PAGE ${pageCounter}: ${title} -->`;
    
    // We want the new pageId to be sequential
    const newId = pageCounter === 1 ? 'bab3-keuangan' : `bab3-keuangan.${pageCounter}`;
    
    // We want the new pageNum to be sequential
    const newNum = pageNumCounter;
    
    // Reconstruct the matched string
    // Replace the old comment
    let newMatch = match.replace(/<!-- PAGE [\s\S]*?-->/, newComment);
    
    // Replace the pageId and pageNum
    newMatch = newMatch.replace(`pageId="${oldId}"`, `pageId="${newId}"`);
    newMatch = newMatch.replace(`pageNum="${oldNum}"`, `pageNum="${newNum}"`);
    
    pageCounter++;
    pageNumCounter++;
    
    return newMatch;
});

fs.writeFileSync('src/app/components/rencana-pembangunan/aspek-keuangan/aspek-keuangan.html', html);
console.log('Pages synced!');
