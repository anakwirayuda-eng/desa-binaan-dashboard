// Render the four diagrams of the gallery page to PNG (used by the PDF and the PPT).
// Usage: node galeri_figs.js <path/to/BENTUK_POHON_GALERI.html> <outdir>
const path = require('path');
const { chromium } = require('playwright');
(async () => {
  const [src, outdir] = process.argv.slice(2);
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1180, height: 900 }, deviceScaleFactor: 2, colorScheme: 'light' });
  await p.goto('file://' + path.resolve(src));
  await p.waitForTimeout(1200);
  const names = ['padanan', 'pohon', 'poster', 'lajur'];
  const svgs = await p.locator('.scroll svg').all();
  if (svgs.length !== names.length) throw new Error('expected 4 diagrams, found ' + svgs.length);
  for (let i = 0; i < svgs.length; i++) {
    await svgs[i].screenshot({ path: path.join(outdir, 'fig_' + names[i] + '.png') });
  }
  await b.close();
  console.log('figures written to', outdir);
})();
