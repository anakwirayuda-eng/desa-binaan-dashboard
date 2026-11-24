// Render the Word-edition diagrams (doc_diagrams.html) to PNG.
// Usage: node doc_diagrams.js <outdir>
const path = require('path');
const { chromium } = require('playwright');
(async () => {
  const [outdir] = process.argv.slice(2);
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 820, height: 900 }, deviceScaleFactor: 3, colorScheme: 'light' });
  await p.goto('file://' + path.resolve(__dirname, 'doc_diagrams.html'));
  await p.waitForTimeout(600);
  const figs = await p.locator('figure.d').all();
  for (const f of figs) {
    const id = await f.getAttribute('id');
    await f.screenshot({ path: path.join(outdir, id + '.png') });
  }
  await b.close();
  console.log('diagrams written:', figs.length);
})();
