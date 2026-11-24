const { chromium } = require('playwright');
(async () => {
  const [src, out, label] = process.argv.slice(2);
  const footer = label || 'Rancangan Pohon Penelitian FKK ITS · draf kerja, bukan dokumen resmi';
  const b = await chromium.launch();
  const p = await b.newPage();
  await p.goto('file://' + src, { waitUntil: 'networkidle' });
  await p.pdf({
    path: out,
    format: 'A4',
    printBackground: true,
    displayHeaderFooter: true,
    headerTemplate: '<div></div>',
    footerTemplate: '<div style="width:100%;font-family:Inter,sans-serif;font-size:7.5pt;color:#55645B;padding:0 17mm;display:flex;justify-content:space-between;"><span>' + footer + '</span><span><span class="pageNumber"></span> / <span class="totalPages"></span></span></div>',
    margin: { top: '20mm', bottom: '20mm', left: '17mm', right: '17mm' },
    preferCSSPageSize: false,
  });
  await b.close();
  console.log('pdf ok');
})();
