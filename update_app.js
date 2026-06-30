const fs = require('fs');
let html = fs.readFileSync('src/app/app.html', 'utf8');

// Update Daftar Isi texts
html = html.replace(/<span class="bg-white pl-2 text-\[16px\]">77<\/span><\/div>/g, '<span class="bg-white pl-2 text-[16px]">81</span></div>');
html = html.replace(/<span class="bg-white pl-2 text-\[16px\]">79<\/span><\/div>/g, '<span class="bg-white pl-2 text-[16px]">83</span></div>');
html = html.replace(/<span class="bg-white pl-2 font-normal text-\[16px\]">80<\/span>/g, '<span class="bg-white pl-2 font-normal text-[16px]">84</span>');
html = html.replace(/<span class="bg-white pl-2 font-normal text-\[16px\]">81-82<\/span>/g, '<span class="bg-white pl-2 font-normal text-[16px]">85-86</span>');
html = html.replace(/<span class="bg-white pl-2 font-normal text-\[16px\]">83<\/span>/g, '<span class="bg-white pl-2 font-normal text-[16px]">87</span>');

// Update app-page pageNum attributes
html = html.replace(/pageNum="80"/g, 'pageNum="84"');
html = html.replace(/pageNum="81"/g, 'pageNum="85"');
html = html.replace(/pageNum="82"/g, 'pageNum="86"');
html = html.replace(/pageNum="83"/g, 'pageNum="87"');

fs.writeFileSync('src/app/app.html', html);
console.log('Done app.html updates');
