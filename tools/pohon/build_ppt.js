// Paparan Pohon Penelitian FKK ITS — review tim kecil & pengajuan tahap 1 ke Dekanat.
// Usage: node build_ppt.js <figdir> <out.pptx>   (figdir = output/figures, from galeri_figs.js)
const path = require("path");
const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");
const fa = require("react-icons/fa");
const fs = require("fs");
const JSZip = require("jszip");

// Write THEME's colour scheme into ppt/theme/theme1.xml (pptxgenjs cannot write theme colours itself;
// until this runs, scheme colours resolve to Office's stock palette).
async function applyTheme(file, theme) {
  const zip = await JSZip.loadAsync(fs.readFileSync(file));
  const part = "ppt/theme/theme1.xml";
  const xml = await zip.file(part).async("string");
  const esc = (t) => t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const order = ["dk1", "lt1", "dk2", "lt2", "accent1", "accent2", "accent3", "accent4", "accent5", "accent6", "hlink", "folHlink"];
  const scheme = `<a:clrScheme name="${esc(theme.name)}">` +
    order.map((k) => `<a:${k}><a:srgbClr val="${theme.colors[k]}"/></a:${k}>`).join("") + "</a:clrScheme>";
  if (!/<a:clrScheme[\s\S]*?<\/a:clrScheme>/.test(xml)) throw new Error("clrScheme not found in " + part);
  const out = xml.replace(/<a:clrScheme[\s\S]*?<\/a:clrScheme>/, scheme)
                 .replace(/<a:fontScheme name="[^"]*"/, `<a:fontScheme name="${esc(theme.name)}"`);
  zip.file(part, out);
  fs.writeFileSync(file, await zip.generateAsync({ type: "nodebuffer", compression: "DEFLATE" }));
}

const FIG = process.argv[2];
const OUT = process.argv[3];

const THEME = {
  name: "FKK ITS Pohon Penelitian",
  headFontFace: "Cambria",
  bodyFontFace: "Calibri",
  colors: {
    dk1: "16211B", lt1: "FFFFFF", dk2: "1D4F91", lt2: "EEF2EF",
    accent1: "AE3F57", accent2: "9E5F12", accent3: "2F7A43", accent4: "2A63A3", accent5: "6C4CA0", accent6: "6B5641",
    hlink: "1D4F91", folHlink: "6C4CA0",
  },
};
const HEX = { ink: "16211B", blue: "1D4F91", white: "FFFFFF", bark: "6B5641" };

async function icon(Comp, hex, size = 256) {
  const svg = ReactDOMServer.renderToStaticMarkup(React.createElement(Comp, { color: "#" + hex, size: String(size) }));
  const buf = await sharp(Buffer.from(svg)).png().toBuffer();
  return "image/png;base64," + buf.toString("base64");
}

(async () => {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_WIDE"; // 13.33 x 7.5
  pres.theme = { headFontFace: THEME.headFontFace, bodyFontFace: THEME.bodyFontFace };
  pres.title = "Pohon Penelitian & Peta Jalan FKK ITS 2026–2030";
  pres.subject = "Kerangka untuk review tim kecil dan pengajuan tahap 1";
  pres.author = "Draf kerja";
  const C = pres.SchemeColor;
  const P = [C.accent1, C.accent2, C.accent3, C.accent4, C.accent5];

  // ---------------- layouts ----------------
  pres.defineSlideMaster({
    title: "DARK",
    background: { color: C.text1 },
    objects: [
      { placeholder: { options: { name: "title", type: "title", x: 0.8, y: 2.0, w: 11.7, h: 1.9, fontSize: 40, bold: true, color: C.background1, valign: "bottom", align: "left", margin: 0 }, text: "" } },
      { placeholder: { options: { name: "body", type: "body", x: 0.8, y: 4.1, w: 11.0, h: 2.1, fontSize: 18, color: C.background2, valign: "top", margin: 0 }, text: "" } },
    ],
  });
  pres.defineSlideMaster({
    title: "CONTENT",
    background: { color: C.background1 },
    margin: [0.5, 0.6, 0.7, 0.6],
    objects: [
      { placeholder: { options: { name: "title", type: "title", x: 0.6, y: 0.35, w: 12.1, h: 0.85, fontSize: 34, bold: true, color: C.text1, valign: "middle", align: "left", margin: 0 }, text: "" } },
      { text: { text: "Pohon Penelitian FKK ITS · draf kerja, 24 November 2026 · bukan dokumen resmi", options: { x: 0.6, y: 6.95, w: 9.0, h: 0.3, fontSize: 10, color: C.text1, transparency: 45, margin: 0, isTextBox: true } } },
    ],
    slideNumber: { x: 12.1, y: 6.95, w: 0.6, h: 0.3, fontSize: 10, color: C.text1, align: "right" },
  });

  const icTree = await icon(fa.FaTree, HEX.white);
  const icGrid = await icon(fa.FaTh, HEX.white);
  const icStream = await icon(fa.FaStream, HEX.white);
  const icWarn = await icon(fa.FaExclamationTriangle, HEX.blue);
  const icUsers = await icon(fa.FaUsers, HEX.white);
  const icList = await icon(fa.FaListAlt, HEX.white);
  const icChart = await icon(fa.FaChartBar, HEX.white);

  const buds = (slide, x, y, d = 0.22, gap = 0.12) => {
    P.forEach((c, i) => slide.addShape(pres.shapes.OVAL, { x: x + i * (d + gap), y, w: d, h: d, fill: { color: c }, line: { color: c }, objectName: `bud-${i + 1}` }));
  };
  const muted = { color: C.text1, transparency: 35 };

  let s;
  const hdr = (t) => ({ text: t, options: { bold: true, color: C.background1, fill: { color: C.text1 } } });
  pres.addSection({ title: "Inti" });
  s = pres.addSlide({ masterName: "DARK", sectionTitle: "Inti" });
  s.addText([{ text: "Pohon Penelitian & Peta Jalan", options: { breakLine: true } }, { text: "FKK ITS 2026–2030" }], { placeholder: "title" });
  s.addText("Kerangka untuk review tim kecil dan pengajuan tahap 1 ke Dekanat · draf kerja, 24 November 2026", { placeholder: "body" });
  buds(s, 0.8, 1.45, 0.3, 0.16);
  s.addText("Kedokteran Pencegahan 4.0 · tiga prodi, satu pohon", { x: 0.8, y: 6.4, w: 8, h: 0.4, fontSize: 14, color: C.background2, margin: 0, isTextBox: true, objectName: "tagline" });
  s.addNotes("Tujuan paparan: menyetujui kerangka pohon penelitian fakultas sebagai dasar pengisian oleh seluruh dosen, dan menerbitkan surat edaran pengisian. Ini bukan pengesahan RIP; pengesahan ada di tahap 2 (awal Februari 2027).");

  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Inti" });
  s.addText("Satu pohon, tiga prodi, diisi dari bawah", { placeholder: "title" });
  const trio = [
    [icTree, "Pohon", "Apa yang diteliti", "Visi, lima pilar, dua puluh satu topik. Identitas fakultas dalam satu gambar."],
    [icGrid, "Matriks", "Siapa bekerja dengan siapa", "Lima pilar × lima platform, dibaca dua arah: baris untuk prodi kedokteran, kolom untuk Teknologi Kedokteran."],
    [icStream, "Lajur", "Kapan hasilnya keluar", "Tiga periode yang sama dengan RIP prodi: 2023–2025, 2026–2028, 2029–2030."],
  ];
  trio.forEach(([ic, h, q, d], i) => {
    const x = 0.6 + i * 4.1;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y: 1.55, w: 3.8, h: 3.2, rectRadius: 0.12, fill: { color: C.background2 }, line: { color: C.background2 }, objectName: `card-${h}` });
    s.addShape(pres.shapes.OVAL, { x: x + 0.3, y: 1.85, w: 0.75, h: 0.75, fill: { color: C.text2 }, line: { color: C.text2 }, objectName: `icon-bg-${h}` });
    s.addImage({ data: ic, x: x + 0.47, y: 2.02, w: 0.41, h: 0.41, altText: h, objectName: `icon-${h}` });
    s.addText(h, { x: x + 0.3, y: 2.8, w: 3.2, h: 0.5, fontSize: 22, bold: true, fontFace: "Cambria", color: C.text1, margin: 0, isTextBox: true });
    s.addText(q, { x: x + 0.3, y: 3.28, w: 3.2, h: 0.35, fontSize: 14, color: C.text2, bold: true, margin: 0, isTextBox: true });
    s.addText(d, { x: x + 0.3, y: 3.7, w: 3.25, h: 0.9, fontSize: 14, color: C.text1, margin: 0, valign: "top", isTextBox: true });
  });
  s.addText([
    { text: "Tulang ikan yang sudah dipakai prodi tetap dipakai di tingkat prodi. ", options: { bold: true } },
    { text: "Pohon fakultas menjadi induknya, dan isinya datang dari instrumen yang diisi sendiri oleh setiap dosen ketiga prodi." },
  ], { x: 0.6, y: 5.1, w: 12.1, h: 0.9, fontSize: 16, color: C.text1, margin: 0, valign: "top", isTextBox: true });
  s.addNotes("Satu gambar tidak sanggup menjawab tiga pertanyaan yang ditelusuri asesor. Karena itu tiga bentuk yang saling merujuk, dengan kode yang sama: 1.1–5.4 untuk topik, T1–T5 untuk platform, W0–W4 untuk wahana.");

  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Inti" });
  s.addText("Fondasinya sudah ada di prodi", { placeholder: "title" });
  const stats = [["197", "penempatan luaran dosen 2023–2025 pada tujuh topik"], ["50", "penempatan luaran 2026, tahun pertama periode 2026–2028"], ["7", "topik penelitian, masing-masing dengan PIC dan anggota"], ["1", "instrumen isian untuk ketiga prodi, siap diedarkan"]];
  stats.forEach(([n, l], i) => {
    const x = 0.6 + i * 3.08;
    s.addText(n, { x, y: 1.9, w: 2.9, h: 1.3, fontSize: 66, bold: true, fontFace: "Cambria", color: C.text2, margin: 0, isTextBox: true, objectName: `stat-${i + 1}` });
    s.addText(l, { x, y: 3.25, w: 2.75, h: 1.0, fontSize: 15, color: C.text1, margin: 0, valign: "top", isTextBox: true });
  });
  s.addText("RIP Prodi Kedokteran & Profesi Dokter 2026–2030 menyebut dirinya turunan Roadmap FKK 2023–2025. Roadmap itu sudah ditemukan dan diaudit; evaluasi per proyeknya menjadi garis dasar edisi kedua yang kita susun.", { x: 0.6, y: 4.75, w: 12.1, h: 0.8, fontSize: 16, color: C.text1, margin: 0, valign: "top", isTextBox: true });
  s.addText("Sumber: RIP Prodi Kedokteran & Profesi Dokter FKK ITS 2026–2030 (draf), Tabel 2 dan Tabel 17.", { x: 0.6, y: 6.3, w: 12.1, h: 0.3, fontSize: 11, ...muted, margin: 0, isTextBox: true });
  s.addNotes("Angka 197 dan 50 dari Tabel 17 RIP prodi: penempatan per topik, bukan jumlah luaran unik — satu judul bisa tercatat di beberapa topik. Jumlah unik dihitung setelah deduplikasi judul, DOI, dan tahun. Roadmap FKK 2023–2025 (14 halaman, 11 September 2023) sudah diaudit: dua orientasi (Kedokteran Pencegahan dan Teknologi Kedokteran), delapan cabang, tanpa garis dasar dan realisasi. Evaluasi per proyek memakai lima status: selesai, berlanjut, dihentikan, baru, belum diketahui.");
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Inti" });
  s.addText("Usulan pohon fakultas", { placeholder: "title" });
  s.addImage({ path: path.join(FIG, "fig_pohon.png"), x: 0.5, y: 1.3, w: 7.25, h: 5.65, altText: "Usulan pohon penelitian FKK ITS: batang Kedokteran Pencegahan 4.0 dari tiga prodi, lima cabang pilar, akar ilmu dasar dan platform T1–T5, tanah wahana W0–W4", objectName: "fig-pohon" });
  const notes4 = [["Batang", "Tiga prodi dipilin menjadi satu batang: Kedokteran Pencegahan 4.0. Prodi dibedakan di batang, cabang milik bersama."], ["Akar", "Ilmu kedokteran dasar sebagai akar tunggang. Platform T1–T5 sebagai akar samping; Digital Health ada di T3 dan T5."], ["Tanah", "Wahana W0–W4, dari laboratorium sampai Desa Binaan. Topik yang berpindah dari W0 ke W4 adalah bukti integrasi."]];
  notes4.forEach(([h, d], i) => {
    const y = 1.55 + i * 1.75;
    s.addText(h, { x: 8.2, y, w: 4.5, h: 0.4, fontSize: 18, bold: true, fontFace: "Cambria", color: C.text2, margin: 0, isTextBox: true });
    s.addText(d, { x: 8.2, y: y + 0.42, w: 4.5, h: 1.15, fontSize: 14, color: C.text1, margin: 0, valign: "top", isTextBox: true });
  });
  s.addNotes("Lingkaran kosong di depan tiap topik diisi setelah rekap instrumen Januari 2027: penuh bila topik punya tim minimal dua dosen, garis saja (tunas) bila belum. Tunas adalah peta rekrutmen.");

  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Inti" });
  s.addText("Satu matriks, dua peta jalan setara", { placeholder: "title" });
  s.addImage({ path: path.join(FIG, "fig_duaarah.png"), x: 1.52, y: 1.3, w: 10.29, h: 5.55, altText: "Matriks lima pilar kali lima platform dibaca dua arah: per baris peta jalan Prodi Kedokteran & Profesi Dokter, per kolom peta jalan Prodi Teknologi Kedokteran; tiga contoh jalur tiga prodi A EEG, B e-nose diabetes, C bone plate & prostesis", objectName: "fig-duaarah" });
  s.addNotes("Usulan revisi K1: platform tidak lagi internal. Matriks yang sama dibaca per baris oleh Prodi Kedokteran & Profesi Dokter (pilar, luaran per topik) dan per kolom oleh Prodi Teknologi Kedokteran (platform, TKT 1–9, wahana W0→W4). Satu judul diisi sekali dan tercatat di kedua peta jalan. Isi sel adalah kode topik draf §5.1. Tiga jalur A, B, C adalah contoh cara membaca, bukan penugasan: EEG (Wibawa, Pamungkas; dr. Riva, dr. Zain), e-nose diabetes (Dr. Shoffi; dr. Endah; pendamping Sp.PD), bone plate & prostesis (Syaifudin, Kuswanto; dr. Ivor). Struktur pohon, kode, dan instrumen tidak berubah.");

  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Inti" });
  s.addText("Peta jalan Teknologi Kedokteran: lima platform", { placeholder: "title" });
  const trows = [
    [hdr("Kode"), hdr("Topik"), hdr("Pilar terkait"), hdr("Rekam jejak"), hdr("Contoh 2026–2028 (§7)"), hdr("Status")],
    [{ text: "T1", options: { bold: true } }, "Biosinyal, neuroteknologi & akustik", "P1 P2 P4", "Klaster EEG paling produktif; dua klinisi sudah menulis bersama", "#18 neurorehab · #20 kognitif lansia · #31 EEG jiwa", "Matang"],
    [{ text: "T2", options: { bold: true } }, "Biosensor & diagnostik non-invasif", "P1 P2 P3", "E-nose diabetes & aroma — 2017, sebelum garis dasar", "#1 e-nose diabetes · #12 TB breathprint", "Inkubasi"],
    [{ text: "T3", options: { bold: true } }, "AI medis, pencitraan & sains data", "P1 P2 P3 P5", "CNN pneumonia anak; citra medis Prof. I K.E. Purnama", "#29 endotel kornea · #30 basil TB", "Matang"],
    [{ text: "T4", options: { bold: true } }, "Biomaterial, biomekanika & manufaktur", "P4", "Bone plate (Q1, 2024); 3D printing (JMHT 2025); TA ortosis & implan bahu (Jan 2026)", "#14 bone plate · #16 prostesis · #19 stent", "Matang"],
    [{ text: "T5", options: { bold: true } }, "Telematika kesehatan & implementasi", "P1–P5", "Bidang guru besar Prof. I K.E. Purnama; dashboard Desa Binaan", "#13 surveilans sindromik · #33 data desa", "Inkubasi"],
  ];
  s.addTable(trows, { x: 0.6, y: 1.35, w: 12.1, colW: [0.75, 2.75, 1.35, 3.35, 2.8, 1.1], fontSize: 12, color: C.text1, border: { type: "solid", pt: 0.75, color: C.background2 }, fill: { color: C.background1 }, valign: "middle", margin: [0.04, 0.08, 0.04, 0.08], rowH: [0.42, 0.72, 0.72, 0.72, 0.72, 0.72], objectName: "tbl-tekdok" });
  s.addText([
    { text: "Setiap platform punya pertanyaan keilmuannya sendiri; TKT dicatat per produk dan versi. ", options: { bold: true, color: C.text2 } },
    { text: "TKT, target, dan jumlah luaran diisi Prodi Teknologi Kedokteran dari draf pra-isi yang disiapkan tim; tidak dikarang di paparan ini." },
  ], { x: 0.6, y: 5.55, w: 12.1, h: 0.85, fontSize: 14, color: C.text1, margin: 0, valign: "top", isTextBox: true });
  s.addNotes("Bukti dari penelusuran publik (draf §4.2). Data yang diminta dari Kaprodi Teknologi Kedokteran: daftar dosen ber-homebase Tekdok, judul dan luaran 2023–2026 per platform, TKT saat ini per judul, dan peta jalan prodi bila sudah ada (draf §10 butir 1e).");

  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Inti" });
  s.addText("Peta jalan tiga periode", { placeholder: "title" });
  const h2 = (t) => ({ text: t, options: { bold: true, color: C.background1, fill: { color: C.text1 } } });
  const lane = (t, i) => ({ text: t, options: { bold: true, color: i === undefined ? C.text1 : P[i] } });
  const lrows = [
    [h2("Lajur"), h2("2023–2025 · bukti konsep"), h2("2026–2028 · pengembangan & validasi"), h2("2029–2030 · hilirisasi")],
    [{ text: "Tonggak bersama", options: { bold: true, fill: { color: C.background2 } } },
     { text: "FKK berdiri (2023) · Roadmap FKK edisi 1 · 197 penempatan luaran", options: { fill: { color: C.background2 } } },
     { text: "SK peta jalan edisi 2 (awal 2027) · koas di RSUD 2027 · sensus dasar Desa Binaan + pembanding · T2 & T5 memenuhi syarat", options: { fill: { color: C.background2 } } },
     { text: "Paket bukti izin edar disetujui mitra produsen · bukti dipakai Dinkes · evaluasi → edisi 3", options: { fill: { color: C.background2 } } }],
    [lane("P1 Deteksi Dini PTM", 0), "61 luaran (PTM)", "18 luaran di 2026 + isian dosen", "target: Unit Penelitian"],
    [lane("P2 Ibu, Anak & 1000 HPK", 1), "35 luaran (RNA 19 + KSR 16)", "10 luaran di 2026 + isian dosen", "target: Unit Penelitian"],
    [lane("P3 Infeksi, AMR", 2), "36 luaran (PM)", "8 luaran di 2026 + isian dosen", "target: Unit Penelitian"],
    [lane("P4 Trauma & Restorasi", 3), "belum ada topik prodi", "dikoordinasi Teknologi Kedokteran (T4) + isian dosen", "target: Unit Penelitian"],
    [lane("P5 Sistem & Pendidikan", 4), "31 luaran (topik ke-7)", "6 luaran di 2026 + isian dosen", "target: Unit Penelitian"],
    [lane("Akar ilmu dasar"), "34 luaran (Basic Science)", "8 luaran di 2026 + isian dosen", "target: Unit Penelitian"],
    [lane("Platform T1–T5 · Tekdok"), "T1, T3, T4 matang; T2, T5 rintisan", "gerbang 1 uji lab & etik → gerbang 2 validasi W3; TKT per produk", "paket bukti izin edar bersama mitra produsen"],
  ];
  s.addTable(lrows, { x: 0.6, y: 1.35, w: 12.1, colW: [2.7, 3.0, 3.9, 2.5], fontSize: 12, color: C.text1, border: { type: "solid", pt: 0.75, color: C.background2 }, fill: { color: C.background1 }, valign: "middle", margin: [0.04, 0.08, 0.04, 0.08], rowH: [0.42, 0.78, 0.46, 0.46, 0.46, 0.46, 0.46, 0.46, 0.46], objectName: "tbl-lajur" });
  s.addText("Angka = penempatan luaran per topik dari RIP Prodi Kedokteran & Profesi Dokter (Tabel 3–17); satu judul bisa di dua topik. Lajur Tekdok diisi Prodi Teknologi Kedokteran lewat tab REKAP PLATFORM. Target angka disusun Unit Penelitian dari data SINTA.", { x: 0.6, y: 6.3, w: 12.1, h: 0.5, fontSize: 11, ...muted, margin: 0, valign: "top", isTextBox: true });
  s.addNotes("Periode 2023–2025 adalah capaian, bukan rencana. Kolom 2026–2028 baru berisi satu tahun; sisanya diisi dari tab PETA JALAN instrumen. Target angka sengaja tidak dikarang di paparan ini.");
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Inti" });
  s.addText("Peta Jalan PkM: pohon yang sama, cabang penerapan", { placeholder: "title" });
  const tangga = [["1", "Pengenalan"], ["2", "Pelatihan"], ["3", "Penerapan"], ["4", "Penggunaan mandiri oleh mitra"], ["5", "Dampak & replikasi"]];
  tangga.forEach(([n, t], i) => {
    const x = 0.6 + i * 2.45, y = 1.5 + (4 - i) * 0.32;
    const h = 1.0 + i * 0.32;
    s.addShape(pres.shapes.RECTANGLE, { x, y, w: 2.3, h, fill: { color: i < 3 ? C.background2 : C.text2 }, line: { color: i < 3 ? C.background2 : C.text2 }, objectName: "tangga-" + n });
    s.addText([{ text: n, options: { bold: true, fontSize: 22, fontFace: "Cambria", breakLine: true } }, { text: t, options: { fontSize: 13 } }], { x: x + 0.12, y: y + 0.08, w: 2.06, h: h - 0.16, color: i < 3 ? C.text1 : C.background1, margin: 0, valign: "top", isTextBox: true });
  });
  s.addText("Edisi 2026–2028 menargetkan anak tangga 3; anak tangga 4–5 diklaim hanya dengan bukti dari mitra.", { x: 0.6, y: 4.0, w: 12.1, h: 0.4, fontSize: 13, italic: true, ...muted, margin: 0, isTextBox: true });
  const mk = [["M1", "Satu pohon, dua peta jalan", "Pilar, platform, dan wahana sama dengan penelitian; PkM tercatat di instrumen yang sama (kolom Jenis kegiatan)."], ["M2", "Dua wahana binaan inti", "Desa Binaan Kota Mojokerto (lima puskesmas) dan Bina Desa Sehat Surabaya; sisanya PkM tematik."], ["M4", "Diukur dari perubahan pada mitra", "Satu ukuran manfaat yang disepakati mitra dan satu ukuran keberlanjutan per program."], ["M5", "Riset ↔ PkM dua arah", "Kebutuhan dari lapangan masuk bank topik riset dan TA; hasil riset teruji kembali sebagai PkM."]];
  mk.forEach(([k, h, d], i) => {
    const x = 0.6 + i * 3.08;
    s.addText([{ text: k + "  " + h, options: { bold: true, fontSize: 14, color: C.text2, breakLine: true } }, { text: d, options: { fontSize: 12 } }], { x, y: 4.55, w: 2.9, h: 1.75, color: C.text1, margin: 0, valign: "top", isTextBox: true });
  });
  s.addNotes("Dokumen kembar Pohon Penelitian (keputusan K4): Rancangan Peta Jalan PkM FKK ITS 2026–2030, draf kerangka 24 November 2026. M3 adalah tangga lima anak tangga di atas. Peran prodi: Kedokteran memimpin anak tangga 1–3, Profesi Dokter 3–4 dalam layanan, Teknologi Kedokteran 3–5 untuk penerapan produk. Butir LAM-PTKes 5.6 dan IAPS BAN-PT untuk PkM dipetakan di §9 draf. Yang masih kosong: register PkM per program dan ukuran manfaat yang disepakati mitra.");
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Inti" });
  s.addText("Instrumen: setiap dosen mengisi sendiri", { placeholder: "title" });
  const steps = [[icUsers, "DAFTAR DOSEN", "41 dosen dari daftar resmi fakultas 2026 + 2 calon dosen yang aktif mengajar; prodi, jabatan, dan bidang keahlian diisi awal untuk dikoreksi."], [icList, "AGENDA", "Satu baris satu proyek (penelitian atau PkM), 2–5 per dosen. Diisi sekali oleh ketuanya; ID proyek otomatis; rekan lintas prodi cukup dipilih."], [icChart, "REKAP OTOMATIS", "Matriks Pilar × Platform, rekap per prodi, peta jalan per tahun, % lintas prodi, % melibatkan mahasiswa."]];
  steps.forEach(([ic, h, d], i) => {
    const x = 0.6 + i * 4.15;
    s.addShape(pres.shapes.OVAL, { x, y: 1.6, w: 0.8, h: 0.8, fill: { color: C.text2 }, line: { color: C.text2 }, objectName: `step-bg-${i + 1}` });
    s.addImage({ data: ic, x: x + 0.19, y: 1.79, w: 0.42, h: 0.42, altText: h, objectName: `step-icon-${i + 1}` });
    if (i < 2) s.addShape(pres.shapes.LINE, { x: x + 1.0, y: 2.0, w: 3.0, h: 0, line: { color: C.text2, width: 1.5, endArrowType: "triangle" }, objectName: `step-arrow-${i + 1}` });
    s.addText(h, { x, y: 2.6, w: 3.8, h: 0.45, fontSize: 18, bold: true, color: C.text1, margin: 0, isTextBox: true });
    s.addText(d, { x, y: 3.1, w: 3.75, h: 1.4, fontSize: 14, color: C.text1, margin: 0, valign: "top", isTextBox: true });
  });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.6, y: 4.85, w: 12.1, h: 1.55, rectRadius: 0.1, fill: { color: C.background2 }, line: { color: C.background2 }, objectName: "design-box" });
  s.addText([
    { text: "Dibuat untuk Google Sheets bersama. ", options: { bold: true } },
    { text: "Opsi \"di luar pohon\" sengaja disediakan karena persentasenya adalah angka evaluasi kesesuaian. Padanan tujuh topik RIP prodi ada di tab PETUNJUK. Ada tab REKAP PLATFORM untuk Tekdok dan kolom anak tangga PkM. Diuji dengan kasus tepi: 2.386 rumus, nol galat.", options: {} },
  ], { x: 0.9, y: 5.0, w: 11.5, h: 1.25, fontSize: 15, color: C.text1, margin: 0, valign: "middle", isTextBox: true });
  s.addNotes("Daftar nama memakai daftar dosen resmi fakultas 2026 (41 dosen, diterima 24 November): 15 Kedokteran, 12 Profesi Dokter, 12 Teknologi Kedokteran, ditambah Dekan dan Wakil Dekan. Kaprodi diminta mengoreksinya di review tim kecil. Batas pengisian usulan: Jumat 8 Januari 2027.");

  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Inti" });
  s.addText("Akreditasi: dua lembaga, satu inti", { placeholder: "title" });
  const arows = [
    [hdr("Prodi"), hdr("Lembaga"), hdr("Peringkat"), hdr("Berlaku"), hdr("Butir penelitian & PkM")],
    ["Sarjana Kedokteran", "LAM-PTKes", "Baik", "Mei 2025, 5 tahun", "5.5 dan 5.6 (instrumen 8 kriteria kualitatif)"],
    ["Pendidikan Profesi Dokter", "LAM-PTKes", "Baik", "Mei 2025, 5 tahun", "5.5 dan 5.6 (instrumen 8 kriteria kualitatif)"],
    ["Teknologi Kedokteran", "BAN-PT", "Baik", "31 Mar 2026–31 Mar 2031", "Relevansi penelitian & PkM, IAPS 5.1"],
  ];
  s.addTable(arows, { x: 0.6, y: 1.4, w: 12.1, colW: [2.8, 1.6, 1.3, 2.6, 3.8], fontSize: 14, color: C.text1, border: { type: "solid", pt: 0.75, color: C.background2 }, fill: { color: C.background1 }, rowH: 0.52, valign: "middle", margin: [0.04, 0.1, 0.04, 0.1], objectName: "tbl-akreditasi" });
  const core = [["1", "Peta jalan", "merujuk visi keilmuan"], ["2", "Pelaksanaan", "dosen & mahasiswa sesuai peta jalan"], ["3", "Evaluasi", "kesesuaian, dengan data"], ["4", "Perbaikan", "hasil evaluasi dipakai"], ["5", "Pembelajaran", "hasil masuk mata kuliah/rotasi"]];
  core.forEach(([n, h, d], i) => {
    const x = 0.6 + i * 2.45;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y: 3.85, w: 2.25, h: 1.45, rectRadius: 0.1, fill: { color: C.background2 }, line: { color: C.background2 }, objectName: "core-" + n });
    s.addText([{ text: n + "  " + h, options: { bold: true, fontSize: 16, color: C.text2, breakLine: true } }, { text: d, options: { fontSize: 13 } }], { x: x + 0.15, y: 3.95, w: 1.95, h: 1.25, color: C.text1, margin: 0, valign: "top", isTextBox: true });
  });
  s.addText("Untuk peringkat Unggul LAM-PTKes, butir 5.5 dan 5.6 wajib \"memenuhi\" — tidak boleh \"memenuhi sebagian\". Rumusan C.7/C.8 dan rubrik skor 0–4 di draf lama adalah riwayat.", { x: 0.6, y: 5.6, w: 12.1, h: 0.7, fontSize: 15, bold: true, color: C.text2, margin: 0, valign: "top", isTextBox: true });
  s.addNotes("Sumber: sertifikat BAN-PT 6234/SK/BAN-PT/Ak/S/III/2026; SK LAM-PTKes 0675 dan 0676 tanggal 24 Mei 2025 (nilai 248 dan 225); SE LAM-PTKes 0397/2025 (instrumen 8 kriteria sejak 1 Januari 2025); Buku III Panduan LED PSPPD Unggul; PerBAN-PT 5/2025 Pasal 1 ayat 3–4; PerBAN-PT 36/2025 (IAPS 5.1). Semua dibaca langsung dan diperiksa ulang 23 November 2026. Inti lima unsur sama di kedua lembaga, sehingga satu pohon fakultas cukup; yang berbeda adalah lembar pandang dan nomor butir di LED.");
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Inti" });
  s.addText("Tangga hibah 2027–2030", { placeholder: "title" });
  const hrows = [
    [hdr("Tangga"), hdr("Wahana"), hdr("Hibah (tinggi)"), hdr("Contoh skema")],
    ["Riset awal · TKT 1–3", "W0–W1", "63 (25)", "PDP & PFR BIMA · Frontiers, IRN, PAKERTI ITS · DIPI"],
    ["Riset terapan · TKT 4–6", "W1–W3", "29 (25)", "Terapan BIMA · SRG ITS · RIIM (tanpa riset klinis) · JatimPro"],
    ["Hilirisasi · TKT 7–9", "W3–W4", "22 (12)", "SINERGI · RISPRO Komersial (TKT ≥ 5) · PPI BRIN (diusulkan industri)"],
    ["PkM · wahana W4", "W4", "19 (13)", "PkM Desa Binaan BIMA · Abmas Wilayah & Produk ITS · Aksara Mahasiswa"],
    ["SDM & mobilitas", "—", "84 (6)", "Beasiswa S3 · fellowship · FAIMER · MSCA Staff Exchanges"],
    ["Insentif & ekosistem", "—", "50 (9)", "Insentif publikasi & HKI ITS · PUI-PT · RINJANI (JMHT) · AMEE"],
  ];
  s.addTable(hrows, { x: 0.6, y: 1.35, w: 7.9, colW: [2.2, 0.9, 1.15, 3.65], fontSize: 12, color: C.text1, border: { type: "solid", pt: 0.75, color: C.background2 }, fill: { color: C.background1 }, rowH: 0.56, valign: "middle", margin: [0.04, 0.08, 0.04, 0.08], objectName: "tbl-hibah" });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 8.8, y: 1.35, w: 3.9, h: 3.0, rectRadius: 0.1, fill: { color: C.background2 }, line: { color: C.background2 }, objectName: "hibah-facts" });
  s.addText([
    { text: "267", options: { fontSize: 40, bold: true, fontFace: "Cambria", color: C.text2, breakLine: true } },
    { text: "hibah relevan untuk FKK ITS (90 tinggi); 193 punya jendela 2027–2030, sebagian besar masih perkiraan", options: { fontSize: 13, breakLine: true } },
    { text: " ", options: { fontSize: 6, breakLine: true } },
    { text: "Validasi klinis tidak bisa lewat RIIM; hilirisasi dimulai dari mitra industri; Indonesia otomatis layak di Horizon Europe.", options: { fontSize: 13 } },
  ], { x: 9.05, y: 1.5, w: 3.45, h: 2.75, color: C.text1, margin: 0, valign: "top", isTextBox: true });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 8.8, y: 4.55, w: 3.9, h: 1.85, rectRadius: 0.1, fill: { color: C.background1 }, line: { color: C.accent1, width: 1.5 }, objectName: "hibah-deadline" });
  s.addText([
    { text: "Tenggat dekat", options: { bold: true, color: C.accent1, breakLine: true } },
    { text: "4 Des IEEE EMBS · 15 Des PUI-PT (pernyataan minat) · 17 Des FAIMER · 15 Jan AMEE · 1 Mar Unitaid · BIMA 2027 ±Des–Jan", options: { fontSize: 13 } },
  ], { x: 9.05, y: 4.7, w: 3.45, h: 1.6, fontSize: 14, color: C.text1, margin: 0, valign: "top", isTextBox: true });
  s.addText("Sumber: Peta Hibah FKK ITS 2027–2030 (turunan Peta Hibah Dosen 2027 @petahibah + riset dan audit 23–24 Nov 2026). Jadwal yang belum diumumkan adalah perkiraan.", { x: 0.6, y: 5.45, w: 7.9, h: 0.6, fontSize: 11, ...muted, margin: 0, valign: "top", isTextBox: true });
  s.addNotes("Master table dibagikan sebagai Google Sheet: setiap dosen memilih namanya dan langsung melihat hibah yang cocok dengan prodi, jabatan, pendidikan, dan sel pohonnya. Satu sel pohon (P3 × T1) belum punya hibah bertopik spesifik; T1 mengandalkan hibah semua bidang, AI/neurosains, dan skema internal ITS. Program yang dihentikan atau tidak menerima pengusul Indonesia (NIHR 2026, EDCTP3, Fleming Fund, USAID, subaward NIH) sengaja tidak dimasukkan.");
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Inti" });
  s.addText("Jadwal dua tahap", { placeholder: "title" });
  const ms = [["23–27 Nov", "Bahan siap; selaras dengan RIP prodi", false], ["30 Nov–4 Des", "Review tim kecil", false], ["7–9 Des", "Tahap 1: kerangka + surat edaran", true], ["10 Des–8 Jan", "Dosen mengisi instrumen", false], ["11–15 Jan", "Rekap & revisi v3", false], ["18–22 Jan", "Review peta jalan tiap prodi", false], ["25–29 Jan", "Uji publik stakeholders", false], ["3–4 Feb", "Tahap 2: draf final ke Dekanat", true], ["Feb–5 Mar", "SK Dekan, sebelum libur ±6–15 Mar", false]];
  const lx0 = 1.75, lx1 = 11.55, ly = 3.6;
  s.addShape(pres.shapes.LINE, { x: lx0, y: ly, w: lx1 - lx0, h: 0, line: { color: C.accent6, width: 2 }, objectName: "timeline" });
  ms.forEach(([d, t, star], i) => {
    const x = lx0 + i * ((lx1 - lx0) / (ms.length - 1));
    const r = star ? 0.36 : 0.2;
    s.addShape(pres.shapes.OVAL, { x: x - r / 2, y: ly - r / 2, w: r, h: r, fill: { color: star ? C.text2 : C.accent6 }, line: { color: star ? C.text2 : C.accent6 }, objectName: `ms-${i + 1}` });
    const up = i % 2 === 0;
    const bw = 2.3;
    s.addText([{ text: d, options: { bold: true, fontSize: 14, color: star ? C.text2 : C.text1, breakLine: true } }, { text: t, options: { fontSize: 12, color: C.text1 } }], { x: x - bw / 2, y: up ? ly - 1.45 : ly + 0.35, w: bw, h: 1.05, align: "center", valign: up ? "bottom" : "top", margin: 0, isTextBox: true, objectName: `ms-label-${i + 1}` });
  });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.6, y: 5.55, w: 12.1, h: 0.85, rectRadius: 0.1, fill: { color: C.background2 }, line: { color: C.background2 }, objectName: "cutoff-box" });
  s.addText([{ text: "Titik putus 11 Desember. ", options: { bold: true, color: C.text2 } }, { text: "Bila tahap 1 lewat tanggal ini, pengisian bergeser ke Januari, draf final jatuh di Ramadan, dan SK baru terbit setelah Idul Fitri.", options: {} }], { x: 0.9, y: 5.6, w: 11.6, h: 0.75, fontSize: 15, color: C.text1, margin: 0, valign: "middle", isTextBox: true });
  s.addNotes("Batas kalender: perkuliahan dan evaluasi gasal ITS selesai 18 Desember 2026; libur Natal–Tahun Baru; libur dan cuti bersama Nyepi–Idul Fitri ±6–15 Maret 2027 (SKB 3 Menteri 2027); 5 Januari libur nasional; 5 Februari cuti bersama; batas nilai gasal 8 Januari; FRS–perwalian 11 Januari–5 Februari. Peluncuran mulai 16 Maret. Undangan uji publik harus terkirim paling lambat 18 Desember.");

  s = pres.addSlide({ masterName: "DARK", sectionTitle: "Inti" });
  s.addText("Keputusan yang dimohon hari ini", { placeholder: "title" });
  s.addText([
    { text: "Setujui kerangka pohon sebagai dasar pengisian.", options: { bullet: { type: "number", numberStartAt: 1 }, breakLine: true } },
    { text: "Setujui matriks dibaca dua arah: platform T1–T5 menjadi peta jalan Prodi Teknologi Kedokteran.", options: { bullet: { type: "number", numberStartAt: 2 }, breakLine: true } },
    { text: "Terbitkan surat edaran pengisian instrumen, batas Jumat 8 Januari 2027.", options: { bullet: { type: "number", numberStartAt: 3 }, breakLine: true } },
    { text: "Setujui model koordinator: lima pilar + lima platform, mulai dari sel percontohan; nama diusulkan Januari bersama SK.", options: { bullet: { type: "number", numberStartAt: 4 }, breakLine: true } },
    { text: "Setujui draf Peta Jalan PkM sebagai bahan uji publik.", options: { bullet: { type: "number", numberStartAt: 5 } } },
  ], { placeholder: "body", paraSpaceAfter: 8 });
  buds(s, 0.8, 1.45, 0.3, 0.16);
  s.addNotes("Lima keputusan kecil, bukan pengesahan. Pengesahan RIP dan peta jalan (SK Dekan) ada di tahap 2. Bila disetujui hari ini, surat edaran bisa terbit sebelum 11 Desember.");


  pres.addSection({ title: "Lampiran" });
  s = pres.addSlide({ masterName: "DARK", sectionTitle: "Lampiran" });
  s.addText("Lampiran", { placeholder: "title" });
  s.addText("Rincian untuk pertanyaan: padanan topik prodi, penyelarasan, matriks, kesetaraan, bentuk peta jalan Tekdok, temuan data, poster, risiko, verifikasi.", { placeholder: "body" });
  buds(s, 0.8, 1.45, 0.3, 0.16);
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Lampiran" });
  s.addText("Tujuh topik prodi masuk ke pohon fakultas", { placeholder: "title" });
  const rows = [
    [hdr("Topik RIP prodi"), hdr("Penempatan 2023–25"), hdr("Penempatan 2026"), hdr("Di pohon fakultas")],
    ["Basic Science", "34", "8", "Akar ilmu (akar tunggang) = cabang Kedokteran Dasar"],
    ["Penyakit Tidak Menular", "61", "18", "P1 Deteksi Dini & Pengendalian PTM"],
    ["Penyakit Menular", "36", "8", "P3 Infeksi, AMR & Ketahanan"],
    ["Kesehatan Remaja, Neonatus & Anak", "19", "3", "P2 Ibu, Anak & 1000 HPK"],
    ["Kesehatan Seksual & Reproduksi", "16", "7", "P2; kanker serviks dan payudara → ranting 1.5 (P1)"],
    ["Ked. Pencegahan, Med. Ed. & Social Science", "31", "6", "P5; forensik dan disabilitas juga terbaca di P4"],
    ["Digital Health", "per tahun & TKT", "", "Platform T3 + T5, melintasi semua pilar"],
    [{ text: "(tidak ada)", options: { italic: true } }, "—", "—", "P4 Trauma & Restorasi, dipimpin Teknologi Kedokteran (T4)"],
  ];
  s.addTable(rows, { x: 0.6, y: 1.4, w: 12.1, colW: [3.9, 1.7, 1.4, 5.1], fontSize: 14, color: C.text1, border: { type: "solid", pt: 0.75, color: C.background2 }, fill: { color: C.background1 }, rowH: 0.5, valign: "middle", margin: [0.04, 0.1, 0.04, 0.1], objectName: "tbl-padanan" });
  s.addText("Prodi tidak perlu mengubah tujuh topiknya. Tabel padanan ini sudah cukup sebagai bukti turunan fakultas → prodi.", { x: 0.6, y: 6.15, w: 12.1, h: 0.5, fontSize: 15, bold: true, color: C.text2, margin: 0, isTextBox: true });
  s.addNotes("Sumber angka: Tabel 3–14 RIP prodi (draf). Kolom 2026 adalah tahun pertama periode 2026–2028. Digital Health dipetakan per tahun dan TKT, tidak per subtopik, sehingga tidak dihitung di sini.");

  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Lampiran" });
  s.addText("Tiga keputusan penyelarasan", { placeholder: "title" });
  const dec = [["1", "Nama batang sama", "Kedokteran Pencegahan 4.0 dipakai di dokumen fakultas, RIP prodi, dan kepala tulang ikan prodi. Rumusan \"presisi, berbasis teknologi\" menjadi penjelasan maknanya."], ["2", "Periode sama", "2023–2025 · 2026–2028 · 2029–2030. Tabel fakultas dan prodi bisa dibaca berdampingan; 2023–2025 menjadi garis dasar evaluasi."], ["3", "Dua topik jadi sumbu", "Basic Science menjadi akar ilmu, Digital Health menjadi platform. Di prodi keduanya tetap topik, karena Digital Health adalah penciri prodi."]];
  dec.forEach(([n, h, d], i) => {
    const x = 0.6 + i * 4.1;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y: 1.6, w: 3.8, h: 4.3, rectRadius: 0.12, fill: { color: C.background2 }, line: { color: C.background2 }, objectName: `dec-card-${n}` });
    s.addShape(pres.shapes.OVAL, { x: x + 0.3, y: 1.9, w: 0.7, h: 0.7, fill: { color: C.text2 }, line: { color: C.text2 }, objectName: `dec-num-bg-${n}` });
    s.addText(n, { x: x + 0.3, y: 1.9, w: 0.7, h: 0.7, fontSize: 22, bold: true, color: C.background1, align: "center", valign: "middle", margin: 0, isTextBox: true });
    s.addText(h, { x: x + 0.3, y: 2.8, w: 3.2, h: 0.5, fontSize: 20, bold: true, fontFace: "Cambria", color: C.text1, margin: 0, isTextBox: true });
    s.addText(d, { x: x + 0.3, y: 3.4, w: 3.25, h: 2.3, fontSize: 14, color: C.text1, margin: 0, valign: "top", isTextBox: true });
  });
  s.addNotes("Ketiganya usulan penyusun, perlu disepakati di review tim kecil. Keputusan 1 dan 2 membuat rantai turunan (Renstra ITS → RIP FKK → RIP prodi → agenda dosen) mudah ditelusuri asesor.");

  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Lampiran" });
  s.addText("Matriks: integrasi terjadi di sel", { placeholder: "title" });
  const pil = ["P1 Deteksi Dini PTM", "P2 Ibu, Anak & 1000 HPK", "P3 Infeksi, AMR", "P4 Trauma & Restorasi", "P5 Sistem & Pendidikan"];
  const plat = [["T1", "Biosinyal"], ["T2", "Biosensor"], ["T3", "AI & citra"], ["T4", "Biomaterial"], ["T5", "Telematika"]];
  const gx = 3.45, cw = 0.98, gap = 0.08, gy = 2.25, ch = 0.66;
  plat.forEach(([c, n], j) => {
    const x = gx + j * (cw + gap);
    s.addText([{ text: c, options: { bold: true, breakLine: true } }, { text: n, options: { fontSize: 11 } }], { x, y: 1.35, w: cw, h: 0.62, fontSize: 14, color: C.text1, align: "center", valign: "bottom", margin: 0, isTextBox: true });
    if (["T1", "T3", "T4"].includes(c)) {
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: x + 0.09, y: 1.99, w: cw - 0.18, h: 0.2, rectRadius: 0.1, fill: { color: C.accent3 }, line: { color: C.accent3 }, objectName: `badge-${c}` });
      s.addText("2 nama ✓", { x: x + 0.09, y: 1.99, w: cw - 0.18, h: 0.2, fontSize: 9, color: C.background1, bold: true, align: "center", valign: "middle", margin: 0, isTextBox: true });
    }
  });
  pil.forEach((n, i) => {
    const y = gy + i * (ch + gap);
    s.addText(n, { x: 0.6, y, w: 2.75, h: ch, fontSize: 14, bold: true, color: P[i], valign: "middle", margin: 0, isTextBox: true });
    plat.forEach((_, j) => s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: gx + j * (cw + gap), y, w: cw, h: ch, rectRadius: 0.06, fill: { color: C.background2 }, line: { color: C.background2 }, objectName: `cell-${i + 1}-${j + 1}` }));
  });
  s.addText("Isi sel = jumlah topik dari instrumen (Januari 2027)", { x: gx, y: gy + 5 * (ch + gap) + 0.02, w: 5.3, h: 0.3, fontSize: 11, italic: true, ...muted, margin: 0, isTextBox: true });
  const side = [["Baris = peta jalan prodi kedokteran", "S1 Kedokteran (cabang Dasar) dan Profesi Dokter (validasi klinis di RSUD)."], ["Kolom = peta jalan Tekdok", "Prodi Teknologi Kedokteran membaca per platform. Lintas prodi hanya bila timnya memang dari dua prodi."], ["Sel kosong = peta rekrutmen", "T1, T3, T4 platform matang. T2, T5 platform inkubasi: modal awal berbasis kasus pakai, ditinjau 2028."]];
  side.forEach(([h, d], i) => {
    const y = 1.5 + i * 1.65;
    s.addText(h, { x: 9.2, y, w: 3.5, h: 0.4, fontSize: 16, bold: true, color: C.text2, margin: 0, isTextBox: true });
    s.addText(d, { x: 9.2, y: y + 0.42, w: 3.5, h: 1.0, fontSize: 14, color: C.text1, margin: 0, valign: "top", isTextBox: true });
  });
  s.addNotes("Tidak perlu membentuk program integrasi tersendiri: karena setiap judul wajib punya koordinat (pilar, platform), integrasi terpaksa terjadi di sel. Badge hijau: platform yang sudah memenuhi syarat dua nama (draf §5.2).");

  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Lampiran" });
  s.addText("Kesetaraan yang bisa diperiksa", { placeholder: "title" });
  s.addText("Sebuah kolom adalah peta jalan prodi bila prodi itu…", { x: 0.6, y: 1.35, w: 6.0, h: 0.45, fontSize: 16, bold: true, color: C.text2, margin: 0, isTextBox: true });
  const tests = [["1", "menetapkan pertanyaan ilmiahnya sendiri", "Pertanyaan keilmuan per platform, divalidasi prodi"], ["2", "memimpin sebagian pekerjaan", "Ketua platform dari Tekdok, wakil klinis dari Kedokteran/Profesi"], ["3", "menilai hasil pada waktunya", "Tonggak per periode; bukti per produk dan versi"], ["4", "dapat mengubah prioritas", "Kaprodi Tekdok menyunting T1–T5 dan memilih bentuk peta jalannya"]];
  tests.forEach(([n, h, d], i) => {
    const y = 1.95 + i * 1.12;
    s.addShape(pres.shapes.OVAL, { x: 0.6, y, w: 0.55, h: 0.55, fill: { color: C.text2 }, line: { color: C.text2 }, objectName: "test-" + n });
    s.addText(n, { x: 0.6, y, w: 0.55, h: 0.55, fontSize: 18, bold: true, color: C.background1, align: "center", valign: "middle", margin: 0, isTextBox: true });
    s.addText([{ text: h, options: { bold: true, breakLine: true } }, { text: d, options: { fontSize: 13 } }], { x: 1.35, y: y - 0.05, w: 5.2, h: 0.95, fontSize: 15, color: C.text1, margin: 0, valign: "top", isTextBox: true });
  });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 7.0, y: 1.35, w: 5.7, h: 5.05, rectRadius: 0.1, fill: { color: C.background2 }, line: { color: C.background2 }, objectName: "rule-box" });
  s.addText("Satu proyek, satu identitas", { x: 7.3, y: 1.55, w: 5.2, h: 0.45, fontSize: 18, bold: true, fontFace: "Cambria", color: C.text1, margin: 0, isTextBox: true });
  s.addText([
    { text: "Cakupan tema — ", options: { bold: true } }, { text: "koordinat (pilar, platform); boleh tampil di baris dan kolom.", options: { breakLine: true } },
    { text: "Prodi pemimpin — ", options: { bold: true } }, { text: "homebase ketua; rekap per prodi tanpa menggandakan.", options: { breakLine: true } },
    { text: "Kontribusi terverifikasi — ", options: { bold: true } }, { text: "peran tiap anggota dengan bukti (TA, laporan uji, artikel).", options: { breakLine: true } },
    { text: " ", options: { breakLine: true } },
    { text: "NPD/NPM hanya dosen ber-homebase di prodi. Luaran dideduplikasi lewat judul, DOI, atau nomor KI. Subtotal baris dan kolom tidak dijumlahkan.", options: { italic: true } },
  ], { x: 7.3, y: 2.1, w: 5.2, h: 4.1, fontSize: 14, color: C.text1, margin: 0, valign: "top", paraSpaceAfter: 6, isTextBox: true });
  s.addNotes("Empat uji kesetaraan menjawab keberatan bahwa Tekdok hanya 'akar'. Aturan satu proyek satu identitas menjawab keberatan asesor soal penggelembungan: satu proyek boleh tampil di dua peta jalan, tetapi dihitung sekali, dan hitungan akreditasi memakai homebase. Pembanding terdekat: Tampere (kedokteran dan teknologi kesehatan dalam satu fakultas) dan UBC School of Biomedical Engineering (rencana 2025–2030 dengan hasil kunci dan penanggung jawab).");

  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Lampiran" });
  s.addText("Bentuk peta jalan Tekdok: dua pilihan", { placeholder: "title" });
  s.addImage({ path: path.join(FIG, "fig_ikan_tekdok.png"), x: 0.5, y: 1.45, w: 6.05, h: 3.09, altText: "Pilihan A: kerangka tulang ikan Prodi Teknologi Kedokteran", objectName: "fig-ikan-tekdok" });
  s.addImage({ path: path.join(FIG, "fig_gerbang_tekdok.png"), x: 6.8, y: 1.6, w: 6.05, h: 2.59, altText: "Pilihan B: kerangka lajur bergerbang Prodi Teknologi Kedokteran", objectName: "fig-gerbang-tekdok" });
  s.addText([{ text: "A — Tulang ikan. ", options: { bold: true } }, { text: "Seragam dengan tulang ikan prodi kedokteran; kepala 2030 yang sama, dengan sublabel hasil keilmuan Tekdok." }], { x: 0.6, y: 4.75, w: 5.9, h: 1.0, fontSize: 14, color: C.text1, margin: 0, valign: "top", isTextBox: true });
  s.addText([{ text: "B — Lajur bergerbang. ", options: { bold: true } }, { text: "Lazim di riset rekayasa; paling jelas untuk TKT dan paling mudah diperbarui dari rekap platform." }], { x: 6.9, y: 4.75, w: 5.9, h: 1.0, fontSize: 14, color: C.text1, margin: 0, valign: "top", isTextBox: true });
  s.addText("Kaprodi Teknologi Kedokteran yang memilih. Memberi pemilik peta jalan hak memilih bentuknya adalah langkah pertama kesetaraan.", { x: 0.6, y: 5.95, w: 12.1, h: 0.5, fontSize: 15, bold: true, color: C.text2, margin: 0, isTextBox: true });
  s.addNotes("Kedua kerangka sengaja kosong. Ruas atau sel diisi judul, TKT per produk, wahana, dan bukti dari draf pra-isi yang dikoreksi Kaprodi Tekdok pada review 18–22 Januari 2027. Gerbang 1: uji laboratorium dan telaah etik. Gerbang 2: validasi di RSUD/Desa Binaan dan kekayaan intelektual.");

  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Lampiran" });
  s.addText("Empat temuan dari data prodi", { placeholder: "title" });
  const finds = [["23 + 13", "Onkologi kini punya ranting", "Subtopik terbesar (23 luaran di PTM, 13 kanker serviks & payudara di KSR). Ditambahkan ranting 1.5 \"Skrining & deteksi dini kanker\" sebelum instrumen beredar."], ["0", "P4 tanpa topik prodi", "Isinya tersebar di Basic Science dan topik ke-7. P4 tetap dipertahankan: di sinilah Teknologi Kedokteran memimpin (T4)."], ["50", "Periode 2026–2028 masih tipis", "50 penempatan, semua dari 2026; satu subtopik (kesiapsiagaan bencana) masih nol. Instrumen adalah cara tercepat mengisinya."], ["7", "PIC menjadi bahan koordinator", "Tujuh PIC topik prodi menjadi bahan awal koordinator pilar; Tekdok mengoordinasi platform dan P4. Mulai dari sel percontohan."]];
  finds.forEach(([n, h, d], i) => {
    const x = 0.6 + (i % 2) * 6.15, y = 1.45 + Math.floor(i / 2) * 2.65;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w: 5.95, h: 2.45, rectRadius: 0.1, fill: { color: C.background2 }, line: { color: C.background2 }, objectName: `find-card-${i + 1}` });
    s.addText(n, { x: x + 0.3, y: y + 0.25, w: 1.9, h: 0.9, fontSize: 40, bold: true, fontFace: "Cambria", color: C.text2, margin: 0, valign: "middle", isTextBox: true });
    s.addText(h, { x: x + 2.25, y: y + 0.28, w: 3.5, h: 0.85, fontSize: 18, bold: true, color: C.text1, margin: 0, valign: "middle", isTextBox: true });
    s.addText(d, { x: x + 0.3, y: y + 1.2, w: 5.4, h: 1.15, fontSize: 14, color: C.text1, margin: 0, valign: "top", isTextBox: true });
  });
  s.addNotes("Temuan pertama paling penting: klaster riset terbesar yang nyata di FKK belum terlihat di draf pohon. Mekanisme 'ranting baru dari data' ini sekaligus contoh siklus PPEPP yang dicari asesor.");

  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Lampiran" });
  s.addText("Bentuk luas: satu poster A3", { placeholder: "title" });
  s.addImage({ path: path.join(FIG, "fig_poster.png"), x: 0.5, y: 1.3, w: 7.75, h: 5.48, altText: "Maket poster A3: pohon di kiri, matriks di kanan atas, lajur tiga periode di kanan bawah, rantai acuan di bawah", objectName: "fig-poster" });
  const pnotes = [["Satu lembar, tiga bentuk", "Pohon di kiri, matriks di kanan atas, lajur di kanan bawah."], ["Angka dari instrumen", "Label biru di tiap bidang menunjukkan tab sumbernya, jadi poster dibuat ulang setiap tahun."], ["Rantai acuan", "Renstra ITS → RIP FKK → RIP tiap prodi → agenda dosen: jalur yang ditelusuri asesor."]];
  pnotes.forEach(([h, d], i) => {
    const y = 1.55 + i * 1.7;
    s.addText(h, { x: 8.7, y, w: 4.0, h: 0.4, fontSize: 17, bold: true, color: C.text2, margin: 0, isTextBox: true });
    s.addText(d, { x: 8.7, y: y + 0.42, w: 4.0, h: 1.1, fontSize: 14, color: C.text1, margin: 0, valign: "top", isTextBox: true });
  });
  s.addNotes("Ini maket tata letak; angka 'n' di matriks diisi setelah rekap instrumen. Galeri bentuk lengkap (enam pola, aturan ukuran) tersedia sebagai halaman web terpisah.");
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Lampiran" });
  s.addText("Tujuh risiko dan pencegahannya", { placeholder: "title" });
  const risks = [
    ["Rapat tim kecil molor, lewat 11 Des", "Bahan satu halaman lebih dulu; bilateral 23–27 Nov; rapat hanya mengunci"],
    ["Pengisian instrumen sepi", "Sesi terpandu 14–17 Des, sapu bersih 6–7 Jan (5 Jan libur), daftar pra-isi"],
    ["Data administratif telat", "Batas keras semua data ≤ 8 Jan"],
    ["Peta Jalan PkM tertinggal", "Draf kerangka sudah ada; penanggung jawab ditunjuk 30 Nov–4 Des; ikut uji publik"],
    ["Uji publik gagal kuorum / isu pembanding", "Konfirmasi 6–8 Jan; manfaat bagi Pemda; K6 sebagai giliran bertahap"],
    ["SK terbit tapi tidak dipakai", "Paket operasional hari pertama disahkan bersama SK"],
    ["Prodi tidak merasa memiliki", "RIP prodi disahkan serentak; koordinator lintas prodi; forum padanan & hibah co-PI"],
  ];
  const rrows = [[hdr("Risiko (pre-mortem: Maret 2027 gagal)"), hdr("Pencegahan")]].concat(risks.map(([a, b]) => [a, b]));
  s.addTable(rrows, { x: 0.6, y: 1.35, w: 12.1, colW: [4.6, 7.5], fontSize: 13, color: C.text1, border: { type: "solid", pt: 0.75, color: C.background2 }, fill: { color: C.background1 }, rowH: 0.6, valign: "middle", margin: [0.04, 0.1, 0.04, 0.1], objectName: "tbl-risiko" });
  s.addNotes("Pre-mortem: bayangkan akhir Maret 2027 pohon gagal disahkan atau tidak dipakai dosen. Ketujuh penyebab paling mungkin sudah dipasangi pencegahan di jadwal §12. Tanggal yang paling menentukan tetap satu: pertemuan tim kecil 30 Nov–4 Des.");

  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Lampiran" });
  s.addText("Yang masih harus diverifikasi", { placeholder: "title" });
  const ver = [["Paket instrumen final", "Aturan sudah jelas (LAM-PTKes 5.5/5.6; BAN-PT IAPS 5.1). Cocokkan paket final di akun akreditasi prodi."], ["Evaluasi Roadmap FKK 2023–2025", "Sudah ditemukan dan diaudit. Evaluasi per proyek (lima status) paling lambat 8 Januari."], ["Status mitra klinis", "Roster resmi sudah ada (41 dosen). Beberapa klinisi di draf tidak tercantum: konfirmasi apakah pengajar non-tetap atau mitra RS."], ["Data Prodi Teknologi Kedokteran", "Dosen ber-homebase, judul & luaran per platform, TKT per produk; tim menyiapkan draf pra-isi."], ["Data SINTA untuk target", "Target angka periode 2026–2028 disusun Unit Penelitian dari data resmi."], ["Peredaran naskah", "Naskah edaran ringkas sudah dipisah. Dokumen kerja memuat penilaian per orang: repositorinya perlu dijadikan privat."]];
  ver.forEach(([h, d], i) => {
    const y = 1.45 + i * 0.88;
    s.addImage({ data: icWarn, x: 0.65, y: y + 0.08, w: 0.36, h: 0.36, altText: "Perlu verifikasi", objectName: `warn-${i + 1}` });
    s.addText(h, { x: 1.25, y, w: 4.6, h: 0.55, fontSize: 16, bold: true, color: C.text1, margin: 0, valign: "middle", isTextBox: true });
    s.addText(d, { x: 6.0, y, w: 6.7, h: 0.55, fontSize: 14, color: C.text1, margin: 0, valign: "middle", isTextBox: true });
  });
  s.addNotes("Akreditor ketiga prodi sudah diketahui dari sertifikat asli: LAM-PTKes untuk Kedokteran dan Profesi (Mei 2025), BAN-PT untuk Teknologi Kedokteran (Maret 2026). Daftar lengkap ada di §10 dokumen kerja. Tidak ada angka bibliometrik, ambang akreditasi, atau nominal hibah di paparan ini; semuanya sengaja dibiarkan kosong sampai diambil dari sumber resmi.");


  await pres.writeFile({ fileName: OUT });
  await applyTheme(OUT, THEME);
  console.log("pptx ok", OUT);
})().catch((e) => { console.error(e); process.exit(1); });
