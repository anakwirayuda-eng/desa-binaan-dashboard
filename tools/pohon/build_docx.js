// Word edition of the FKK ITS research and community-service master plan.
// Usage (docx is installed globally):
//   NODE_PATH="$(npm root -g)" node tools/pohon/build_docx.js <figdir> <figdocdir> <roster.json> <out.docx>
const fs = require("fs");
const path = require("path");
const D = require("docx");
const {
  Document, Packer, Paragraph, TextRun, ImageRun, Table, TableRow, TableCell, WidthType, BorderStyle,
  ShadingType, AlignmentType, HeadingLevel, PageBreak, TableOfContents, Header, Footer, PageNumber,
  NumberFormat, LevelFormat, TabStopType, SimpleField, VerticalAlign, TableLayoutType,
} = D;

const [FIG, FIGD, ROSTER, OUT] = process.argv.slice(2);
const roster = JSON.parse(fs.readFileSync(ROSTER, "utf8"));

// ------------------------------------------------------------------ style tokens
const C = { ink: "16211B", muted: "5B655F", blue: "1D4F91", blue2: "3F72B8", pale: "F2F4F2", band: "EEF3F9", line: "C9CFCB", acc: "AE3F57" };
const BODY = "Calibri", HEAD = "Cambria";
const CW = 9071; // content width in DXA (A4, 2.5 cm side margins)

// ------------------------------------------------------------------ inline markup
// **bold**, _italic_, [isi: ...] placeholder (highlighted)
function runs(text, base = {}) {
  const out = [];
  const re = /(\*\*[^*]+\*\*|_[^_]+_|\[isi:[^\]]*\])/g;
  let last = 0, m;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(new TextRun({ text: text.slice(last, m.index), ...base }));
    const t = m[0];
    if (t.startsWith("**")) out.push(new TextRun({ text: t.slice(2, -2), bold: true, ...base }));
    else if (t.startsWith("_")) out.push(new TextRun({ text: t.slice(1, -1), italics: true, ...base }));
    else out.push(new TextRun({ text: t, highlight: "yellow", ...base }));
    last = m.index + t.length;
  }
  if (last < text.length) out.push(new TextRun({ text: text.slice(last), ...base }));
  return out;
}

const body = [];
const add = (...x) => body.push(...x);
const P = (t, o = {}) => new Paragraph({ children: runs(t, o.run || {}), spacing: { after: 120, line: 288 }, alignment: o.align || AlignmentType.JUSTIFIED, ...(o.p || {}) });
const p = (t, o) => add(P(t, o));
const TOCJ = { h: [], fig: [], tab: [] };
const H1 = (t) => { TOCJ.h.push([1, t]); add(new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun(t)], pageBreakBefore: true })); };
const H2 = (t) => { TOCJ.h.push([2, t]); add(new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun(t)] })); };
const H3 = (t) => add(new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun(t)] }));
let listInst = 0;
const bullets = (items, lvl = 0) => items.forEach((t) => add(new Paragraph({ numbering: { reference: "bul", level: lvl }, children: runs(t), spacing: { after: 60, line: 276 } })));
const numbers = (items) => { listInst += 1; const inst = listInst; items.forEach((t) => add(new Paragraph({ numbering: { reference: "num", level: 0, instance: inst }, children: runs(t), spacing: { after: 60, line: 276 } }))); };

// captions with SEQ fields (cached value shown until Word updates fields)
let nFig = 0, nTab = 0;
function caption(kind, text) {
  const n = kind === "Gambar" ? ++nFig : ++nTab;
  (kind === "Gambar" ? TOCJ.fig : TOCJ.tab).push([n, text.replace(/\*\*|_/g, "")]);
  return new Paragraph({
    style: "Caption", keepNext: kind === "Tabel",
    children: [new TextRun({ text: kind + " " }), new SimpleField(`SEQ ${kind} \\* ARABIC`, String(n)), new TextRun({ text: ". " }), ...runs(text)],
  });
}
function pngSize(file) {
  const b = fs.readFileSync(file);
  return { w: b.readUInt32BE(16), h: b.readUInt32BE(20), data: b };
}
function fig(file, text0, widthPx = 600, note0) {
  const parts = text0.split(/(?<=\.)\s+(?=[A-Z0-9])/);
  const text = parts[0];
  const rest = parts.slice(1).join(" ");
  const note = [rest, note0].filter(Boolean).join(" ");
  const { w, h, data } = pngSize(file);
  const height = Math.round((widthPx * h) / w);
  add(new Paragraph({ alignment: AlignmentType.CENTER, keepNext: true, spacing: { before: 120, after: 60 },
    children: [new ImageRun({ type: "png", data, transformation: { width: widthPx, height }, altText: { title: text.replace(/\*\*|_/g, ""), description: text.replace(/\*\*|_/g, ""), name: path.basename(file) } })] }));
  add(caption("Gambar", text));
  if (note) add(new Paragraph({ children: runs(note, { size: 17, color: C.muted }), spacing: { after: 160 }, alignment: AlignmentType.LEFT }));
}

// tables -------------------------------------------------------------
const border = { style: BorderStyle.SINGLE, size: 4, color: C.line };
const borders = { top: border, bottom: border, left: border, right: border };
function cell(content, w, o = {}) {
  const paras = (Array.isArray(content) ? content : [content]).map((t) => new Paragraph({
    children: runs(String(t), { size: o.size || 18, bold: o.bold, color: o.color }),
    spacing: { after: 30, line: 252 }, alignment: o.align || AlignmentType.LEFT,
  }));
  return new TableCell({ children: paras, width: { size: w, type: WidthType.DXA }, borders, verticalAlign: o.valign || VerticalAlign.TOP,
    shading: o.fill ? { fill: o.fill, type: ShadingType.CLEAR, color: "auto" } : undefined,
    margins: { top: 60, bottom: 60, left: 100, right: 100 }, columnSpan: o.span });
}
function table(cap, head, rows, pct, o = {}) {
  const ws = pct.map((x) => Math.round((CW * x) / 100));
  ws[ws.length - 1] = CW - ws.slice(0, -1).reduce((a, b) => a + b, 0);
  if (cap) add(caption("Tabel", cap));
  const trs = [];
  if (head) trs.push(new TableRow({ tableHeader: true, cantSplit: true, children: head.map((h, i) => cell(h, ws[i], { bold: true, color: "FFFFFF", fill: C.blue, size: 18 })) }));
  rows.forEach((r, ri) => {
    trs.push(new TableRow({ cantSplit: true, children: r.map((c, i) => cell(c, ws[i], { fill: o.band !== false && ri % 2 === 1 ? C.band : (o.firstCol && i === 0 ? C.pale : undefined), bold: o.firstCol && i === 0, size: o.size })) }));
  });
  add(new Table({ width: { size: CW, type: WidthType.DXA }, columnWidths: ws, rows: trs, layout: TableLayoutType.FIXED }));
  if (o.note) add(new Paragraph({ children: runs(o.note, { size: 17, color: C.muted }), spacing: { before: 60, after: 160 } }));
  else add(new Paragraph({ children: [], spacing: { after: 100 } }));
}
// callout box (single-cell table with accent left border)
function box(title, lines, accent = C.blue) {
  const kids = [];
  if (title) kids.push(new Paragraph({ children: [new TextRun({ text: title, bold: true, color: accent, size: 21 })], spacing: { after: 80 } }));
  lines.forEach((l) => {
    if (typeof l === "string") kids.push(new Paragraph({ children: runs(l, { size: 20 }), spacing: { after: 70, line: 270 } }));
    else kids.push(new Paragraph({ numbering: { reference: "bul", level: 0 }, children: runs(l.b, { size: 20 }), spacing: { after: 50, line: 264 } }));
  });
  const b0 = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
  add(new Table({ width: { size: CW, type: WidthType.DXA }, columnWidths: [CW], rows: [new TableRow({ children: [new TableCell({
    children: kids, width: { size: CW, type: WidthType.DXA }, shading: { fill: C.pale, type: ShadingType.CLEAR, color: "auto" },
    borders: { top: b0, bottom: b0, right: b0, left: { style: BorderStyle.SINGLE, size: 24, color: accent } },
    margins: { top: 140, bottom: 120, left: 220, right: 200 } })] })] }));
  add(new Paragraph({ children: [], spacing: { after: 120 } }));
}
const F = (n) => path.join(FIG, n);
const FD = (n) => path.join(FIGD, n);

// ====================================================================== CONTENT
// ---------------------------------------------------------------------- Ringkasan eksekutif
TOCJ.h.push([1, "Ringkasan Eksekutif"]);
add(new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Ringkasan Eksekutif")] }));
p("Dokumen ini adalah Rencana Induk Penelitian dan Pengabdian kepada Masyarakat (PkM) Fakultas Kedokteran dan Kesehatan (FKK) ITS untuk periode 2026–2030. Ia menggantikan Roadmap Penelitian dan PkM FKK 2023–2025 dan menjadi acuan bersama bagi tiga program studi: Sarjana Kedokteran, Pendidikan Profesi Dokter, dan Teknologi Kedokteran. Isinya menjawab tiga pertanyaan yang selalu diajukan pimpinan, mitra, dan asesor: **apa** yang diteliti fakultas, **siapa** mengerjakannya bersama siapa, dan **kapan** hasilnya dapat diharapkan.");
p("Visi keilmuan fakultas dirumuskan sebagai **Kedokteran Pencegahan 4.0**: menggeser titik intervensi ke hulu dengan teknologi yang terjangkau dan dapat dipakai di layanan primer Indonesia. Rumusan ini sama dengan payung yang sudah dipakai Rencana Induk Penelitian (RIP) Prodi Kedokteran dan Profesi Dokter, dan sejalan dengan misi penelitian dalam draf Renstra Prodi Kedokteran 2026–2030.");
box("Pokok-pokok rancangan", [
  { b: "**Satu pohon untuk tiga prodi.** Lima pilar masalah kesehatan (cabang), lima platform teknologi (akar), dan lima jenjang wahana uji dari laboratorium sampai desa (tanah)." },
  { b: "**Matriks dibaca dua arah.** Per baris, pilar menjadi peta jalan Prodi Sarjana Kedokteran dan Profesi Dokter. Per kolom, platform menjadi peta jalan Prodi Teknologi Kedokteran, dengan kemajuan diukur sebagai tingkat kesiapterapan teknologi (TKT) per produk." },
  { b: "**Satu proyek, satu identitas.** Setiap proyek tercatat sekali di register fakultas dan dihitung sekali, meskipun tampil di peta jalan lebih dari satu prodi." },
  { b: "**Dua peta jalan dengan pohon yang sama:** penelitian dan PkM. PkM diukur dari perubahan pada mitra melalui lima anak tangga kedalaman." },
  { b: "**Program unggulan:** Platform Surveilans Desa Binaan Kota Mojokerto, dibangun bertahap sebagai tempat uji teknologi kedokteran pada populasi terdefinisi, dengan wilayah pembanding sejak awal." },
  { b: "**Tata kelola bertahap:** koordinator lintas prodi mulai dari beberapa sel percontohan, evaluasi kesesuaian tahunan dengan Berita Acara Dekan, dan revisi peta jalan bernomor versi." },
]);
table("Angka kunci", ["Aspek", "Kondisi saat penyusunan (November 2026)"], [
  ["Program studi", "3 prodi; Sarjana Kedokteran dan Profesi Dokter terakreditasi Baik (LAM-PTKes, Mei 2025); Teknologi Kedokteran terakreditasi Baik (BAN-PT, Maret 2026–2031)"],
  ["Dosen", "41 dosen menurut daftar fakultas 2026 (15 Kedokteran, 12 Profesi Dokter, 12 Teknologi Kedokteran, ditambah Dekan dan Wakil Dekan) dan 2 calon dosen yang sudah aktif mengajar"],
  ["Pohon penelitian", "5 pilar, 21 topik, 5 platform teknologi, 5 jenjang wahana uji"],
  ["Garis dasar luaran", "197 penempatan luaran dosen 2023–2025 dan 50 pada 2026 dalam tujuh topik RIP prodi (satu judul dapat tercatat di beberapa topik)"],
  ["Peluang pendanaan", "267 skema hibah yang relevan untuk 2027–2030, 90 di antaranya berelevansi tinggi"],
  ["Tonggak terdekat", "Kerangka disetujui sebagai dasar pengisian (±7–9 Desember 2026); draf final ke Dekanat (±3–4 Februari 2027); SK Dekan sebelum libur awal Maret 2027"],
], [26, 74], { firstCol: true });
H3("Keputusan yang dimohon pada tahap konsultasi");
numbers([
  "Kerangka pohon disetujui sebagai dasar pengisian agenda penelitian dan PkM oleh seluruh dosen.",
  "Matriks dibaca dua arah: platform T1–T5 menjadi peta jalan Prodi Teknologi Kedokteran.",
  "Surat edaran pengisian instrumen agenda dosen diterbitkan, dengan batas Jumat, 8 Januari 2027.",
  "Model koordinator lintas prodi disetujui: lima koordinator pilar dan lima koordinator platform, dimulai dari sel percontohan; nama diusulkan Januari 2027 bersama SK.",
  "Draf Peta Jalan PkM dipakai sebagai bahan uji publik bersama peta jalan penelitian.",
]);

// ---------------------------------------------------------------------- BAB 1
H1("1. Pendahuluan");
H2("1.1 Latar belakang");
p("FKK ITS berdiri pada 2023 sebagai fakultas yang secara sengaja mempertemukan ilmu kedokteran dengan kekuatan rekayasa ITS. Dalam tiga tahun pertama, fakultas menjalankan tiga program studi, membangun jejaring dengan rumah sakit dan pemerintah daerah, dan menerbitkan Roadmap Penelitian dan PkM 2023–2025 sebagai edisi pertama. Mahasiswa kedokteran angkatan pertama akan memasuki kepaniteraan klinik di RSUD jejaring pada 2027, sehingga wahana riset klinis fakultas akan aktif penuh pada periode rencana ini.");
p("Tiga alasan membuat edisi kedua perlu disusun sekarang. **Pertama**, edisi pertama berakhir pada 2025 dan belum memuat garis dasar, target tahunan, dan realisasi, sehingga perlu dievaluasi dan dilanjutkan dengan struktur yang dapat dipantau. **Kedua**, Renstra ITS dan Renstra FKK 2026–2030 serta RIP tiap prodi sedang disusun pada siklus yang sama; ketiganya membutuhkan induk penelitian fakultas yang dapat dirujuk. **Ketiga**, kedua lembaga akreditasi yang menilai prodi FKK menanyakan hal yang sama: apakah ada peta jalan yang memayungi penelitian dosen dan mahasiswa, apakah kegiatan berjalan sesuai peta jalan, apakah kesesuaiannya dievaluasi, dan apakah hasil evaluasi dipakai untuk perbaikan.");
p("Untuk peringkat Unggul, instrumen LAM-PTKes yang berlaku menuntut butir penelitian (5.5) dan PkM (5.6) berpredikat _memenuhi_, bukan _memenuhi sebagian_. Prodi Teknologi Kedokteran dinilai BAN-PT melalui instrumen IAPS 5.1 dengan unsur relevansi yang sejalan. Dokumen ini dirancang agar satu pohon fakultas dapat dinarasikan untuk ketiga prodi tanpa membuat tiga dokumen yang saling lepas.");
H2("1.2 Dasar dan acuan");
p("Penyusunan rencana induk ini merujuk pada peraturan dan dokumen perencanaan berikut.");
bullets([
  "Undang-Undang Nomor 12 Tahun 2012 tentang Pendidikan Tinggi; Undang-Undang Nomor 17 Tahun 2023 tentang Kesehatan; Undang-Undang Nomor 27 Tahun 2022 tentang Pelindungan Data Pribadi.",
  "Peraturan Pemerintah Nomor 54 Tahun 2015 tentang Statuta ITS.",
  "Permendiktisaintek Nomor 39 Tahun 2025 sebagaimana diubah dengan Permendiktisaintek Nomor 10 Tahun 2026 tentang penjaminan mutu pendidikan tinggi.",
  "Peraturan BAN-PT Nomor 5 Tahun 2025 dan Nomor 36 Tahun 2025 (instrumen IAPS 5.1); instrumen akreditasi LAM-PTKes delapan kriteria yang berlaku sejak 1 Januari 2025.",
  "Peraturan Presiden Nomor 12 Tahun 2025 tentang RPJMN 2025–2029; Peraturan Menteri Kesehatan Nomor 12 Tahun 2025 tentang Renstra Kementerian Kesehatan 2025–2029; Rencana Induk Riset Nasional.",
  "Renstra ITS 2026–2030, Peta Jalan Penelitian ITS 2025–2029, Renstra FKK 2026–2030, serta Renstra dan RIP ketiga prodi FKK.",
  "Ketentuan alat kesehatan yang relevan bagi hilirisasi: Permenkes Nomor 5 Tahun 2026, Permenkes Nomor 11 Tahun 2025, KMK Nomor 951 Tahun 2026, dan Permenperin Nomor 35 Tahun 2025.",
]);
fig(FD("d_rantai.png"), "Rantai acuan dari perencanaan nasional sampai agenda dosen. Asesor menelusuri rantai ini dari atas ke bawah.", 560);
H2("1.3 Tujuan");
numbers([
  "Menetapkan visi keilmuan dan arsitektur pohon penelitian yang menjadi induk penelitian dan PkM ketiga prodi.",
  "Menyusun peta jalan penelitian dan PkM 2026–2030 dengan tonggak per periode yang dapat diperiksa.",
  "Menetapkan cara pencatatan, pembiayaan, dan tata kelola agar setiap proyek dosen dan tugas akhir mahasiswa dapat ditelusuri ke pohon.",
  "Menyediakan bukti yang dibutuhkan untuk butir relevansi penelitian dan PkM pada akreditasi LAM-PTKes dan BAN-PT.",
]);
H2("1.4 Ruang lingkup");
p("Rencana induk ini mencakup penelitian dan PkM yang dipimpin atau melibatkan dosen dan mahasiswa ketiga prodi FKK. Periode rencana dibaca dalam tiga babak yang sama dengan RIP prodi: **2023–2025** sebagai garis dasar (capaian edisi pertama), **2026–2028** sebagai pengembangan dan validasi, dan **2029–2030** sebagai hilirisasi dan penerapan. Rincian anggaran tahunan tidak dimuat di sini; dokumen ini memberi kerangka bagi Rencana Kerja dan Anggaran tahunan fakultas.");
H2("1.5 Proses penyusunan");
p("Rancangan ini disusun dari bahan yang dapat ditelusuri: Roadmap FKK 2023–2025 dan hasil telaahnya, draf RIP Prodi Kedokteran dan Profesi Dokter 2026–2030, draf Renstra Prodi Kedokteran 2026–2030, daftar dosen fakultas 2026 yang dicocokkan dengan PDDikti, teks instrumen akreditasi yang berlaku, data puskesmas Desa Binaan, serta pembandingan dengan fakultas kedokteran dan pusat riset di dalam dan luar negeri. Rancangan telah melalui telaah kritis independen terhadap logika, kelayakan, dan konsistensinya.");
p("Isi akhirnya ditentukan melalui konsultasi: setiap dosen mengisi agenda penelitian dan PkM melalui instrumen bersama, Kaprodi menelaah peta jalan prodinya, dan pemangku kepentingan (Dinas Kesehatan, RSUD jejaring, dan mitra) diundang dalam uji publik sebelum penetapan.");

// ---------------------------------------------------------------------- BAB 2
H1("2. Evaluasi Edisi Pertama dan Kondisi Saat Ini");
H2("2.1 Roadmap Penelitian dan PkM 2023–2025");
p("Edisi pertama (kata pengantar bertanggal 11 September 2023) memakai dua orientasi yang saling terkait, **Kedokteran Pencegahan** dan **Teknologi Kedokteran**, dengan Teknologi Kedokteran disebut sebagai tema unggulan. Pohonnya memuat delapan cabang: Teknologi Kedokteran, Penyakit Menular, Penyakit Tidak Menular, Kesehatan Seksual dan Reproduktif, Kesehatan Remaja, Neonatus dan Anak, Kebijakan Kesehatan dan Pendidikan Kedokteran, Kesehatan Lingkungan, serta Pencegahan Cedera. Peta jalan PkM-nya bergerak dari dua desa atau komunitas binaan (2023) ke tingkat kecamatan (2024) dan tingkat kota atau kabupaten (2025).");
p("Edisi pertama belum memuat SK penetapan, penanggung jawab per proyek, garis dasar, target tahunan, dan realisasi capaian. Ukuran yang eksplisit hanya tiga: target dua desa binaan pada 2023, perpindahan tingkat kesiapterapan satu proyek dari TRL 3–4 ke 5–7, dan tahap keluaran seperti purwarupa atau pengujian. Edisi kedua tidak membongkarnya: kedua orientasi menjadi batang dan sumbu platform, dan delapan cabang dipadankan ke pohon baru (Tabel 2). Yang berubah adalah arsitekturnya. Edisi pertama mencampur disiplin, penyakit, populasi, metode, dan keluaran pada satu tingkat; edisi kedua memisahkan masalah kesehatan (pilar), kemampuan teknologi (platform), dan tempat uji (wahana).");
H2("2.2 Metode dan hasil evaluasi");
p("Karena arsip realisasi edisi pertama belum lengkap, evaluasi dilakukan per proyek dengan menelusuri laporan dan luarannya, lalu memberi satu dari lima status: **selesai**, **berlanjut**, **dihentikan atau ditunda** (dengan alasan), **baru**, atau **belum diketahui**. Status \"belum diketahui\" sah dan lebih jujur daripada menyimpulkan capaian dari judul rencana. Hasil evaluasi dituangkan dalam tabel evaluasi dan Berita Acara bertanda tangan Dekan, sehingga lingkar perbaikan antara edisi pertama dan kedua terbukti.");
table("Padanan cabang edisi pertama ke pohon edisi kedua dan status evaluasinya", ["Cabang edisi pertama", "Padanan di edisi kedua", "Status evaluasi", "Bukti dan keputusan"], [
  ["Teknologi Kedokteran", "Platform T1–T5 (akar pohon)", "[isi]", "[isi]"],
  ["Penyakit Tidak Menular", "Pilar P1; kanker di topik 1.5", "[isi]", "[isi]"],
  ["Penyakit Menular", "Pilar P3", "[isi]", "[isi]"],
  ["Kesehatan Seksual dan Reproduktif", "Pilar P2; kanker serviks dan payudara di topik 1.5", "[isi]", "[isi]"],
  ["Kesehatan Remaja, Neonatus dan Anak", "Pilar P2", "[isi]", "[isi]"],
  ["Kebijakan Kesehatan dan Pendidikan Kedokteran", "Pilar P5", "[isi]", "[isi]"],
  ["Kesehatan Lingkungan", "Pilar P3, topik 3.4", "[isi]", "[isi]"],
  ["Pencegahan Cedera", "Pilar P4", "[isi]", "[isi]"],
], [26, 28, 16, 30], { firstCol: true, note: "Status diisi Unit Penelitian bersama ketiga Kaprodi paling lambat 8 Januari 2027. Satu cabang dapat memuat beberapa proyek; tabel rinci per proyek dilampirkan pada Berita Acara evaluasi." });
H2("2.3 Sumber daya peneliti");
p("Menurut daftar dosen fakultas 2026, FKK memiliki 41 dosen: 15 di Prodi Kedokteran, 12 di Prodi Pendidikan Profesi Dokter, 12 di Prodi Teknologi Kedokteran, serta Dekan dan Wakil Dekan. Dua calon dosen sudah aktif mengajar. Sebagian besar dosen prodi kedokteran berada di awal jenjang jabatan fungsional, sedangkan Prodi Teknologi Kedokteran sudah memiliki guru besar, lektor kepala, dan lektor (Gambar 2).");
fig(FD("d_dosen.png"), "Komposisi dosen per prodi menurut jabatan fungsional. Dekan dan Wakil Dekan (keduanya bergelar doktor) dan satu calon dosen yang homebase-nya belum ditetapkan tidak termasuk.", 560,
  "Sumber: daftar dosen dan tenaga kependidikan FKK ITS 2026; jabatan fungsional dari PDDikti semester gasal 2026/2027, diakses 24 November 2026. Data diverifikasi ulang melalui instrumen agenda dosen.");
table("Kualifikasi pendidikan tertinggi dosen per prodi", ["Prodi", "Doktor (S3)", "Spesialis-2", "Spesialis-1", "Magister (S2)", "Jumlah"], [
  ["Sarjana Kedokteran", "1", "—", "3", "12", "16"],
  ["Pendidikan Profesi Dokter", "—", "2", "6", "4", "12"],
  ["Teknologi Kedokteran", "5", "—", "—", "7", "12"],
  ["Pimpinan fakultas dan calon dosen", "2", "—", "—", "1", "3"],
], [34, 13, 13, 13, 14, 13], { firstCol: true, note: "Sumber: PDDikti semester gasal 2026/2027. PDDikti mencatat pendidikan spesialis terpisah dari magister; beberapa gelar terbaru belum tercatat, sehingga angka ini dikoreksi lewat instrumen agenda dosen." });
H3("Klaster keahlian yang sudah berjalan");
p("Analisis luaran dan profil dosen menunjukkan tiga klaster yang sudah menghasilkan publikasi bersama antara dosen rekayasa dan klinisi: **biosinyal dan neuroteknologi** (EEG untuk neurorehabilitasi, kesehatan jiwa, dan skrining kognitif), **biomaterial dan biomekanika** (implan ortopedi dengan publikasi pada jurnal kuartil pertama 2024, prostesis cetak tiga dimensi), serta **kecerdasan artifisial dan pencitraan medis**, yang diperkuat Pusat Unggulan Iptek _Artificial Intelligence for Healthcare and Society_ (PUI-AIHeS) ITS. Dua klaster lain sedang tumbuh: **biosensor dan diagnostik non-invasif** (hidung elektronik untuk diabetes) serta **telematika kesehatan dan sains implementasi**, dengan dashboard data puskesmas Desa Binaan sebagai purwarupa.");
p("Di sisi klinis, fakultas memiliki dosen spesialis penyakit dalam, anak, obstetri dan ginekologi, bedah, anestesiologi dan manajemen nyeri, neurologi, psikiatri, radiologi, patologi klinik, patologi anatomi, mata, telinga-hidung-tenggorok, dermatologi dan venereologi, serta forensik. Kepakaran ini menjadi modal validasi klinis di RSUD jejaring. Di sisi kesehatan masyarakat, fakultas memiliki keahlian epidemiologi dan statistik kedokteran tingkat doktor serta kesehatan masyarakat dan manajemen layanan.");
H3("Kesenjangan yang dinyatakan terbuka");
bullets([
  "Jumlah doktor dan guru besar di prodi kedokteran masih sedikit; kepemimpinan riset banyak bertumpu pada sedikit orang.",
  "Mikrobiologi klinik dan epidemiologi lapangan perlu diperkuat untuk pilar infeksi dan program surveilans.",
  "Patologi anatomi saat ini bertumpu pada satu dosen spesialis tetap, padahal topik onkologi (1.5) membutuhkannya.",
  "Beberapa topik (misalnya skrining pendengaran neonatal dan kesehatan mata) membutuhkan mitra klinis atau metodologi dari luar fakultas.",
]);
H2("2.4 Capaian riset prodi sebagai garis dasar");
p("RIP Prodi Kedokteran dan Profesi Dokter 2026–2030 sudah memetakan judul dosen ke tujuh topik. Pada 2023–2025 tercatat 197 penempatan luaran dan pada 2026 tercatat 50. Angka ini adalah **penempatan per topik**, bukan jumlah luaran unik, karena satu judul dapat tercatat di lebih dari satu topik. Jumlah unik dihitung setelah deduplikasi berdasarkan judul, DOI, dan tahun.");
fig(FD("d_penempatan.png"), "Penempatan luaran dosen Prodi Kedokteran dan Profesi Dokter per topik RIP prodi, 2023–2025 dan 2026. Topik _Digital Health_ dipetakan per tahun dan TKT sehingga tidak dihitung di sini.", 560,
  "Sumber: RIP Prodi Kedokteran dan Profesi Dokter 2026–2030 (draf), Tabel 3–14 dan 17.");
p("Dua temuan dari data ini memengaruhi rancangan pohon. **Onkologi dan skrining kanker** adalah subtopik terbesar (23 penempatan di topik penyakit tidak menular dan 13 di kesehatan reproduksi), sehingga diberi topik tersendiri, 1.5. **Periode 2026–2028 masih tipis**: seluruh 50 penempatan berasal dari 2026, dan satu subtopik (kesiapsiagaan bencana) masih kosong. Instrumen agenda dosen adalah cara tercepat mengisinya.");
H2("2.5 Posisi strategis");
table("Analisis posisi penelitian dan PkM fakultas", ["Kekuatan", "Kelemahan"], [
  ["Distingsi kedokteran berbasis teknologi di dalam institut teknologi; klaster rekayasa medis yang sudah produktif; akses ke laboratorium dan pusat riset ITS; Desa Binaan dengan lima puskesmas dan dashboard data", "Fakultas muda tanpa lulusan dokter; sedikit doktor di prodi kedokteran; riset kolaborasi dengan industri belum ada; arsip realisasi edisi pertama belum lengkap"],
], [50, 50], { band: false });
table(null, ["Peluang", "Tantangan"], [
  ["UU 17/2023 dan sistem kesehatan akademik; pasar alat kesehatan dalam negeri dan kebijakan TKDN; skema hibah hilirisasi dan PkM nasional; kepaniteraan klinik mulai 2027 membuka wahana riset klinis", "Persaingan dengan fakultas kedokteran yang lebih mapan; tuntutan akreditasi yang makin ketat; kepatuhan pelindungan data pribadi; beban mengajar tinggi pada fase pembukaan kepaniteraan"],
], [50, 50], { band: false });

// ---------------------------------------------------------------------- BAB 3
H1("3. Visi Keilmuan dan Arsitektur Pohon");
H2("3.1 Batang pohon: Kedokteran Pencegahan 4.0");
p("Visi keilmuan fakultas dirumuskan sebagai **Kedokteran Pencegahan 4.0**, dengan makna: _menggeser titik intervensi ke hulu, dari mengobati penyakit yang sudah bermanifestasi menjadi mendeteksi, menstratifikasi, dan mencegahnya pada tingkat individu dan populasi, dengan teknologi yang terjangkau dan dapat dipakai di layanan primer Indonesia_. Frasa yang sama dipakai di dokumen fakultas, RIP prodi, dan bagan peta jalan prodi, sehingga rantai turunan mudah ditelusuri.");
p("Rumusan ini menyatukan identitas resmi fakultas, yaitu kedokteran pencegahan, dengan kekuatan riset terbesarnya, yaitu rekayasa medis. Hidung elektronik untuk diabetes, EEG untuk skrining saraf, kecerdasan artifisial untuk citra, dan alat pemantau risiko adalah teknologi deteksi dini yang sudah ada orangnya di ITS. Desa Binaan dan jejaring puskesmas menjadi tempat menerapkannya.");
table("Tiga tingkat pencegahan dalam batang pohon", ["Tingkat", "Makna", "Contoh di pohon"], [
  ["Primer", "Mencegah penyakit muncul", "Perubahan perilaku terdigitalisasi (1.4), gizi dan pangan lokal (2.4), literasi antibiotik (3.1), kesehatan lingkungan (3.4)"],
  ["Sekunder", "Menemukan penyakit sedini mungkin", "Skrining PTM berbasis sensor (1.1), skrining kanker (1.5), skrining tumbuh kembang (2.3), diagnostik cepat infeksi (3.2)"],
  ["Tersier", "Mencegah kecacatan dan memulihkan fungsi", "Implan dan fiksasi fraktur (4.1), prostesis dan ortosis (4.2), rehabilitasi dan teknologi asistif (4.3)"],
], [14, 30, 56], { firstCol: true });
H2("3.2 Tiga sumbu pohon");
p("Pohon disusun dari tiga sumbu yang saling bebas. **Pilar** menjawab masalah kesehatan apa yang diselesaikan. **Platform** menjawab teknologi apa yang dimatangkan. **Wahana** menjawab di mana hasil diuji. Setiap proyek memiliki satu koordinat utama (pilar, platform) dan boleh menambah tag sekunder.");
fig(FD("d_tigasumbu.png"), "Tiga sumbu pohon penelitian: pilar, platform, dan wahana.", 590);
fig(F("fig_pohon.png"), "Pohon penelitian FKK ITS. Batang Kedokteran Pencegahan 4.0 dipilin dari tiga prodi; lima pilar menjadi cabang; platform teknologi dan ilmu kedokteran dasar menjadi akar; wahana translasi menjadi tanah.", 600);
H2("3.3 Lima pilar dan 21 topik");
p("Jumlah pilar sengaja dibatasi lima. Pembandingan internasional menunjukkan jumlah tema mengikuti besarnya anggaran, bukan ambisi: konsorsium riset besar dapat menampung belasan tema, sedangkan fakultas seukuran FKK lazimnya memilih tiga sampai lima. Setiap pilar memiliki empat topik, kecuali P1 yang memiliki lima sejak onkologi diberi topik tersendiri. Pada evaluasi Januari 2027, topik P1 yang belum berisi tim dapat digabung.");
const pillarNotes = [
  ["P1 Deteksi Dini dan Pengendalian Penyakit Tidak Menular", "Hipertensi dan diabetes melitus menempati peringkat satu dan tiga pada daftar penyakit empat dari lima puskesmas Desa Binaan Kota Mojokerto yang datanya tersedia. Renstra Kementerian Kesehatan 2025–2029 menempatkan penyakit tidak menular sebagai beban utama. Pilar ini juga menampung klaster onkologi."],
  ["P2 Kesehatan Ibu, Anak, dan 1000 Hari Pertama Kehidupan", "Renstra Kementerian Kesehatan 2025–2029 menargetkan prevalensi stunting turun dari 18,8% (2025) menjadi 14,2% (2029); kematian ibu dan bayi termasuk isu prioritas riset kesehatan. Fakultas memiliki dosen obstetri dan pediatri, dan wilayah binaan memiliki puskesmas PONED."],
  ["P3 Penyakit Infeksi, Resistensi Antimikroba, dan Ketahanan Kesehatan", "Program Bina Desa Sehat FKK sudah menjalankan penyuluhan resistensi antibiotik bagi kader. Tuberkulosis termasuk prioritas nasional, dan fakultas memiliki kepakaran kedokteran tropis serta patologi klinik."],
  ["P4 Trauma, Disabilitas, dan Restorasi Fungsi", "Pilar dengan daya saing internasional tertinggi saat ini, dengan publikasi implan pada jurnal kuartil pertama dan program prostesis yang sudah berjalan. Pilar ini dipimpin Prodi Teknologi Kedokteran dan ditopang bedah, anestesi dan nyeri, radiologi, serta laboratorium material ITS."],
  ["P5 Sistem Kesehatan Primer, Pendidikan Kedokteran, dan Tata Kelola Teknologi Kesehatan", "Pendidikan kedokteran berbasis teknologi dan tata kelola kecerdasan artifisial dalam layanan kesehatan adalah ceruk yang sangat sesuai bagi fakultas kedokteran di dalam institut teknologi. Indikator akreditasi juga menghargai mata kuliah yang dikembangkan dari hasil penelitian."],
];
table("Dasar pemilihan lima pilar", ["Pilar", "Dasar pemilihan"], pillarNotes, [30, 70], { firstCol: true });
table("Topik penelitian per pilar", ["Topik", "Subtopik indikatif", "Platform utama"], [
  ["1.1 Skrining PTM non-invasif berbasis sensor", "Analisis napas untuk diabetes; pemantauan tekanan darah dan aritmia; pemeriksaan lipid di tempat layanan", "T2, T1"],
  ["1.2 Stratifikasi risiko kardiometabolik berbasis AI", "Model risiko dari data rutin puskesmas; kalibrasi pada populasi Jawa Timur", "T3, T5"],
  ["1.3 Deteksi dini komplikasi", "Kaki diabetik berbasis citra; skrining nefropati; retinopati bila tersedia mitra pakar retina", "T3, T2"],
  ["1.4 Perubahan perilaku terdigitalisasi", "Intervensi berbasis kerangka COM-B dan MINDSPACE; kepatuhan terapi hipertensi", "T5"],
  ["1.5 Skrining dan deteksi dini kanker", "Skrining kanker serviks dan payudara di layanan primer; AI citra radiologi dan patologi; jalur rujukan", "T3, T2"],
  ["2.1 Teknologi pemantauan pertumbuhan", "Antropometri digital di posyandu; prediksi risiko stunting", "T3, T5"],
  ["2.2 Keselamatan maternal dan neonatal", "Sistem rujukan PONED ke RSUD; deteksi dini preeklamsia", "T5, T2"],
  ["2.3 Skrining tumbuh kembang dan neurodevelopmental", "Skrining pendengaran neonatal; EEG perkembangan anak", "T1"],
  ["2.4 Gizi dan keamanan pangan lokal", "Kolaborasi dengan pusat riset pangan dan bioteknologi ITS", "T2"],
  ["3.1 Surveilans AMR dan penggunaan antibiotik komunitas", "Swamedikasi antibiotik; literasi kader; peresepan di layanan primer", "T5"],
  ["3.2 Diagnostik cepat penyakit infeksi", "Deteksi TB dan DBD berbasis sensor atau AI; skrining napas untuk infeksi paru", "T2, T3"],
  ["3.3 Surveilans sindromik digital dan kesiapsiagaan", "Integrasi SATUSEHAT; deteksi anomali kunjungan puskesmas", "T5, T3"],
  ["3.4 Kesehatan lingkungan dan vektor", "Kolaborasi Teknik Lingkungan ITS; sanitasi dasar", "T5"],
  ["4.1 Implan ortopedi dan fiksasi fraktur", "Optimasi topologi bone plate; implan biodegradable; material lokal", "T4"],
  ["4.2 Prostesis dan ortosis terjangkau", "Prostesis cetak tiga dimensi; implan khusus pasien dari data citra", "T4"],
  ["4.3 Rehabilitasi dan teknologi asistif", "Neurorehabilitasi berbasis EEG/EMG; alat bantu dengar", "T1, T4"],
  ["4.4 Manajemen nyeri dan perioperatif", "Nyeri kronik; protokol perioperatif berbasis data", "T5"],
  ["5.1 Riset implementasi layanan primer", "Evaluasi Integrasi Layanan Primer dan Desa Binaan dengan kerangka RE-AIM", "T5"],
  ["5.2 Pendidikan kedokteran berbasis teknologi", "Simulasi dan realitas virtual; asesmen capaian pembelajaran; evaluasi rotasi komunitas", "T5, T3"],
  ["5.3 Etika, hukum, dan tata kelola AI kesehatan", "Tanggung jawab hukum AI diagnostik; persetujuan penggunaan data; regulasi alat kesehatan digital", "—"],
  ["5.4 Ekonomi kesehatan dan HTA teknologi frugal", "Analisis biaya-manfaat inovasi; kesiapan adopsi puskesmas", "T5"],
], [33, 52, 15], { size: 17 });
p("Selain 21 topik di atas, tersedia empat kode khusus: **0.0** untuk program lintas pilar seperti Platform Surveilans Desa Binaan; **x.9** untuk topik baru di dalam pilar; **9.9** untuk topik di luar kelima pilar; dan **T0** untuk proyek tanpa platform teknologi. Persentase topik di luar pohon adalah angka evaluasi kesesuaian sekaligus bahan revisi pohon, bukan kesalahan pengisi.");
H2("3.4 Lima platform teknologi");
p("Platform adalah kemampuan teknologi yang dipakai lintas pilar. Setiap platform memiliki pertanyaan keilmuannya sendiri, sehingga kemajuannya sah dinilai sebagai kemajuan disiplin sebelum ada hasil kesehatan jangka panjang. Inilah yang membuat kolom platform menjadi agenda ilmiah Prodi Teknologi Kedokteran, bukan daftar jasa teknis bagi pilar.");
table("Lima platform teknologi dan pertanyaan keilmuannya", ["Kode", "Platform", "Pertanyaan keilmuan dan bukti", "Pilar terkait", "Status"], [
  ["T1", "Biosinyal, Neuroteknologi, dan Akustik Medis", "Apakah pengukuran biosinyal konsisten pada kondisi penggunaan yang dituju? Bukti: keterulangan pengukuran", "P1, P2, P4", "Matang"],
  ["T2", "Biosensor dan Diagnostik Non-Invasif", "Apakah hasil sensor sesuai metode pembanding? Bukti: protokol dan laporan pengujian", "P1, P2, P3", "Rintisan"],
  ["T3", "AI Medis, Pencitraan, dan Sains Data Kesehatan", "Apakah model mempertahankan kinerjanya pada data berbeda? Bukti: versi model dan hasil validasi", "P1, P2, P3, P5", "Matang"],
  ["T4", "Biomaterial, Biomekanika, dan Manufaktur Medis", "Apakah hasil uji memenuhi persyaratan desain? Bukti: spesifikasi terkontrol dan laporan uji", "P4", "Matang"],
  ["T5", "Telematika Kesehatan dan Sains Implementasi", "Apakah pertukaran data berjalan konsisten dalam alur kerja mitra? Bukti: spesifikasi antarmuka, laporan uji, konfirmasi pengguna", "P1–P5", "Rintisan"],
], [8, 26, 40, 13, 13], { firstCol: true });
table("Status platform", ["Status", "Platform", "Hak", "Syarat dan peninjauan"], [
  ["Matang", "T1, T3, T4", "Mengusulkan belanja modal bersama setiap tahun", "Minimal dua dosen dengan luaran terbukti; ditinjau tiap tahun"],
  ["Rintisan", "T2, T5", "Mengusulkan belanja modal awal berbasis kasus pakai", "Diusulkan bersama satu dosen Teknologi Kedokteran dan satu dosen Kedokteran atau Profesi untuk satu sel prioritas; naik status bila dosen kedua memiliki luaran; ditinjau pada evaluasi 2028"],
], [14, 14, 30, 42], { firstCol: true });
table("Dosen dengan keahlian terkait platform (usulan awal, dikonfirmasi melalui instrumen)", ["Platform", "Keahlian rekayasa", "Pendamping klinis", "Mitra di ITS"], [
  ["T1", "Prof. Dr. Ir. Adhi Dharma Wibawa; Yuri Pamungkas, M.T.; Dr. Dhany Arifianto", "dr. Riva Satya Radiansyah, Sp.N; dr. Zain Budi Syulthoni, Sp.KJ", "Teknik Biomedik, Teknik Fisika"],
  ["T2", "Dr. Shoffi Izza Sabilla", "dr. Endah Indriastuti, Sp.PK; dr. Zulistian Nurul Hidayati, Sp.PD", "Teknik Instrumentasi, Teknik Biomedik, Kimia"],
  ["T3", "Prof. Dr. I Ketut Eddy Purnama; Yuri Pamungkas, M.T.", "dr. Erna Furaidah, Sp.Rad; dr. Afia Nuzila Fadhlina, Sp.M", "PUI-AIHeS, Statistika, Teknik Informatika"],
  ["T4", "Achmad Syaifudin, Ph.D.; Djoko Kuswanto, M.Biotech.; Fahmi Mubarok, Ph.D.", "dr. Ivor Wiguna Hartanto Wilopo, Sp.B", "Teknik Material, Teknik Mesin, Desain Produk"],
  ["T5", "Prof. Dr. I Ketut Eddy Purnama", "dr. Edwin Nugroho Njoto, MIPH, MHM; dr. Lely Nurhayati, M.H.", "Sistem Informasi, Teknik Informatika"],
], [12, 33, 31, 24], { firstCol: true, size: 17, note: "Daftar ini bukan penugasan. Koordinator platform ditetapkan bersama SK setelah pengisian instrumen (Bab 8)." });
H2("3.5 Wahana translasi");
p("Wahana bukan pilar, melainkan tempat kelima pilar diuji. Proyek yang berpindah dari laboratorium ke layanan dan masyarakat adalah bukti translasi; lintasan kembali ke laboratorium, misalnya untuk memperbaiki desain setelah uji klinis, tetap sah.");
table("Lima jenjang wahana translasi", ["Kode", "Wahana", "Lokasi", "Peran utama"], [
  ["W0–W1", "Laboratorium", "Laboratorium FKK dan ITS (biomedik, material, desain produk, statistika, anatomi)", "Rancang bangun, uji bangku, uji praklinik"],
  ["W2", "Klinik kampus", "ITS Medical Center dan klinik mitra", "Uji kebergunaan dan studi awal pada manusia"],
  ["W3", "RSUD pendidikan", "RSUD dr. Wahidin Sudiro Husodo (rumah sakit pendidikan utama) dan RSUD R.A. Basoeni (satelit)", "Validasi klinis; aktif penuh saat kepaniteraan dimulai 2027"],
  ["W4", "Masyarakat", "Desa Binaan Kota Mojokerto (lima puskesmas) dan Bina Desa Sehat Surabaya", "Penerapan, surveilans populasi, PkM"],
], [10, 16, 44, 30], { firstCol: true });
H2("3.6 Matriks pilar–platform dibaca dua arah");
p("Lima pilar dan lima platform membentuk 25 sel. Integrasi lintas prodi terjadi di sel, bukan di bagan organisasi: setiap proyek wajib memiliki koordinat, dan proyek yang memakai platform membuka jalan kerja bersama. Proyek baru dihitung lintas prodi bila anggotanya memang berasal dari prodi lain menurut homebase. Sel kosong dibaca sebagai peta rekrutmen, agenda kemitraan, atau sel yang sengaja ditunda.");
fig(F("fig_duaarah.png"), "Satu matriks, dua peta jalan. Per baris, pilar dibaca oleh Prodi Sarjana Kedokteran dan Profesi Dokter; per kolom, platform dibaca oleh Prodi Teknologi Kedokteran. Isi sel adalah kode topik; huruf A, B, C menandai contoh jalur kerja tiga prodi.", 600);
table("Dua cara membaca matriks", ["Aspek", "Dibaca per baris (pilar)", "Dibaca per kolom (platform)"], [
  ["Pemilik peta jalan", "Prodi Sarjana Kedokteran dan Prodi Pendidikan Profesi Dokter", "Prodi Teknologi Kedokteran"],
  ["Pertanyaan pokok", "Masalah kesehatan apa yang diselesaikan?", "Teknologi apa yang dimatangkan, dan apakah ia memenuhi persyaratannya?"],
  ["Ukuran kemajuan", "Luaran per topik; wahana yang dicapai", "TKT per produk dan versi; hasil verifikasi dan validasi"],
  ["Luaran khas", "Publikasi klinis dan populasi, bahan pedoman praktik dan kebijakan", "Purwarupa, HKI, publikasi rekayasa, langkah izin edar"],
  ["Bentuk visual", "Tulang ikan per topik (sudah ada di RIP prodi)", "Tulang ikan atau lajur bergerbang per platform (dipilih prodi)"],
], [20, 40, 40], { firstCol: true });
H3("Aturan hitung: satu proyek, satu identitas");
p("Satu proyek memiliki satu identitas di register fakultas. Ia boleh tampil di peta jalan lebih dari satu prodi, tetapi fakultas menghitung setiap proyek dan setiap luaran unik sekali. Register memisahkan tiga lapis informasi:");
table("Tiga lapis informasi dalam register proyek", ["Lapis", "Isi", "Dipakai untuk"], [
  ["Cakupan tema", "Koordinat utama (pilar, platform) dan tag sekunder", "Peta jalan dan matriks"],
  ["Prodi pemimpin", "Prodi homebase ketua proyek", "Rekap per prodi tanpa penggandaan"],
  ["Kontribusi terverifikasi", "Peran tiap anggota dan mitra dengan bukti (tugas akhir, laporan uji, artikel, surat tugas)", "Pengakuan lintas prodi dan dasar kredit kepenulisan"],
], [22, 46, 32], { firstCol: true });
p("Hitungan kuantitatif akreditasi memakai dosen tetap ber-homebase di prodi yang dinilai. Luaran dideduplikasi berdasarkan judul, DOI, atau nomor kekayaan intelektual sebelum dijumlah, dan subtotal baris serta kolom tidak dijumlahkan.");
H3("Kesetaraan yang dapat diperiksa");
p("Sebuah kolom matriks layak disebut peta jalan prodi bila prodi itu (1) menetapkan pertanyaan ilmiahnya sendiri, (2) memimpin sebagian pekerjaan, (3) menilai hasilnya pada waktu yang ditetapkan, dan (4) dapat mengubah prioritas setelah evaluasi. Rancangan ini memenuhi keempatnya melalui pertanyaan keilmuan per platform, koordinator platform dari Prodi Teknologi Kedokteran, tonggak per periode, dan hak Kaprodi Teknologi Kedokteran menyunting rumusan platform serta memilih bentuk visual peta jalannya.");

// ---------------------------------------------------------------------- BAB 4
H1("4. Peta Jalan Penelitian 2026–2030");
H2("4.1 Tiga periode");
p("Peta jalan dibaca dalam tiga periode yang sama dengan RIP prodi. Periode 2023–2025 adalah capaian dan menjadi garis dasar. Periode 2026–2028 berfokus pada pengembangan dan validasi, dengan wahana RSUD aktif sejak kepaniteraan dimulai. Periode 2029–2030 berfokus pada hilirisasi, penerapan, dan evaluasi menyeluruh yang menghasilkan edisi ketiga.");
fig(F("fig_lajur.png"), "Peta jalan lajur tiga periode. Angka 2023–2025 adalah penempatan luaran per topik dari RIP prodi; kolom 2026–2028 dilengkapi dari agenda dosen; target 2029–2030 ditetapkan bersama SK.", 600);
H2("4.2 Peta jalan per pilar");
table("Peta jalan per pilar", ["Pilar", "2023–2025 (garis dasar)", "2026–2028 (pengembangan dan validasi)", "2029–2030 (hilirisasi dan penerapan)"], [
  ["P1 Penyakit tidak menular", "61 penempatan luaran; klaster onkologi terbesar", "Validasi skrining napas untuk diabetes di RSUD dan Desa Binaan; model risiko hipertensi dari data puskesmas; intervensi kepatuhan terapi; skrining kanker serviks dan payudara bersama puskesmas", "Alat skrining tervalidasi dipakai puskesmas; model risiko terintegrasi dengan sistem data layanan primer; [isi: target luaran]"],
  ["P2 Ibu, anak, 1000 HPK", "35 penempatan luaran (anak 19, reproduksi 16)", "Prediksi risiko stunting dari data posyandu; evaluasi program penanganan stunting daerah; analisis rujukan maternal PONED ke RSUD", "Rekomendasi program diadopsi pemerintah daerah; alat pemantauan pertumbuhan dipakai posyandu; [isi: target luaran]"],
  ["P3 Infeksi dan AMR", "36 penempatan luaran", "Survei swamedikasi antibiotik; pola resistensi di RSUD; skrining TB berbasis napas dan citra sputum; surveilans sindromik lintas puskesmas", "Surveilans sindromik berjalan rutin; alat diagnostik cepat masuk uji lapangan; [isi: target luaran]"],
  ["P4 Trauma dan restorasi", "Belum ada topik prodi; klaster rekayasa medis paling produktif", "Bone plate dari material lokal; prostesis cetak tiga dimensi untuk amputasi; neurorehabilitasi pascastroke; registri implan di RSUD", "Paket bukti izin edar disetujui mitra produsen untuk minimal satu produk; [isi: target luaran]"],
  ["P5 Sistem dan pendidikan", "31 penempatan luaran", "Evaluasi rotasi kedokteran komunitas; kesiapan adopsi teknologi digital di puskesmas; tata kelola AI kesehatan; analisis biaya-manfaat inovasi", "Mata kuliah dan modul dikembangkan dari hasil riset; laporan profil kesehatan desa tahunan; [isi: target luaran]"],
  ["Akar ilmu dasar", "34 penempatan luaran", "Mekanisme dan biomarker yang menopang topik pilar", "[isi: target luaran]"],
], [16, 20, 36, 28], { firstCol: true, size: 17 });
H2("4.3 Peta jalan Prodi Teknologi Kedokteran");
p("Dibaca per kolom, kelima platform menjadi lima topik peta jalan Prodi Teknologi Kedokteran. Kemajuannya dicatat sebagai TKT per produk dan versi, melewati dua gerbang: **gerbang 1** berupa uji laboratorium dan telaah etik, dan **gerbang 2** berupa validasi di RSUD atau Desa Binaan serta perlindungan kekayaan intelektual.");
table("Peta jalan per platform", ["Platform", "Rekam jejak (garis dasar)", "Contoh produk 2026–2028", "Arah 2029–2030"], [
  ["T1 Biosinyal", "Klaster EEG paling produktif (2024–2025) dengan publikasi bersama klinisi", "Neurorehabilitasi EEG/EMG; skrining kognitif lansia di posyandu; EEG untuk skrining gangguan jiwa", "Uji lapangan di puskesmas; paket bukti untuk mitra produsen"],
  ["T2 Biosensor", "Hidung elektronik untuk diabetes dan klasifikasi aroma", "Validasi skrining napas diabetes; skrining TB berbasis napas", "Naik status menjadi platform matang; uji lapangan"],
  ["T3 AI dan citra", "Klasifikasi pneumonia anak; analisis citra medis dan mikroskopi", "Analisis citra endotel kornea; deteksi basil TB pada apusan sputum; model risiko dari data rutin", "Model tervalidasi pada data berbeda; perangkat lunak medis menuju TKT 9"],
  ["T4 Biomaterial", "Bone plate (jurnal kuartil pertama, 2024); cetak tiga dimensi; prostesis", "Optimasi bone plate; prostesis untuk amputasi diabetik; implan kranial khusus pasien; simulasi stent", "Paket bukti izin edar disetujui mitra produsen"],
  ["T5 Telematika", "Dashboard data puskesmas Desa Binaan sebagai purwarupa", "Surveilans sindromik; arsitektur interoperabilitas data desa yang siap SATUSEHAT", "Sistem dipakai Dinas Kesehatan; naik status menjadi platform matang"],
], [15, 27, 33, 25], { firstCol: true, size: 17 });
p("Kaprodi Teknologi Kedokteran memilih bentuk gambar peta jalannya. Dua kerangka disiapkan dan sengaja dibiarkan kosong agar diisi prodi dari data agendanya sendiri.");
fig(F("fig_gerbang_tekdok.png"), "Pilihan bentuk peta jalan Prodi Teknologi Kedokteran: lajur bergerbang per platform. Sel diisi judul, TKT, wahana, dan bukti.", 600);
fig(F("fig_ikan_tekdok.png"), "Pilihan bentuk peta jalan Prodi Teknologi Kedokteran: tulang ikan dengan kepala yang sama dengan tulang ikan prodi kedokteran.", 600);
H2("4.4 Padanan dengan RIP Prodi Kedokteran dan Profesi Dokter");
p("RIP Prodi Kedokteran dan Profesi Dokter tidak perlu mengubah tujuh topiknya. Tabel padanan berikut sudah cukup sebagai bukti turunan dari fakultas ke prodi. Dua topik prodi menjadi sumbu di tingkat fakultas: _Basic Science_ menjadi akar ilmu dasar, dan _Digital Health_ menjadi platform T3 dan T5.");
fig(F("fig_padanan.png"), "Padanan tujuh topik RIP Prodi Kedokteran dan Profesi Dokter ke pohon fakultas.", 580);
H2("4.5 Portofolio proyek awal");
p("Portofolio berikut disusun dari kapasitas yang sudah ada dan menjadi bahan awal pengisian agenda dosen. Tingkat kesiapan: **siap** (dapat dimulai dengan tim internal), **perlu mitra** (membutuhkan mitra di ITS atau RSUD), dan **perlu persiapan** (membutuhkan rekrutmen atau mitra eksternal). Portofolio ini bukan penugasan.");
table("Portofolio proyek awal 2026–2028", ["Proyek", "Koordinat", "Kesiapan"], [
  ["Validasi hidung elektronik untuk skrining diabetes pada populasi Desa Binaan", "P1 × T2", "Siap"],
  ["Model prediksi risiko hipertensi dari data kunjungan puskesmas", "P1 × T3", "Siap"],
  ["Intervensi perubahan perilaku untuk penyakit tidak menular", "P1 × T5", "Siap"],
  ["Deteksi kaki diabetik berbasis citra di layanan primer", "P1 × T3", "Perlu mitra"],
  ["Skrining kanker serviks dan payudara bersama puskesmas", "P1 × T3", "Perlu mitra"],
  ["Prediksi risiko stunting dari data posyandu", "P2 × T3", "Siap"],
  ["Evaluasi program penanganan stunting daerah dengan kerangka RE-AIM", "P2 × T5", "Siap"],
  ["Analisis sistem rujukan maternal PONED ke RSUD", "P2 × T5", "Perlu mitra"],
  ["Skrining pendengaran neonatal berbasis akustik terjangkau", "P2 × T1", "Perlu persiapan"],
  ["Survei penggunaan dan swamedikasi antibiotik di komunitas", "P3 × T5", "Siap"],
  ["Pola resistensi antimikroba di RSUD pendidikan", "P3 × T2", "Perlu mitra"],
  ["Skrining TB berbasis analisis napas", "P3 × T2", "Perlu mitra"],
  ["Deteksi otomatis basil TB pada apusan sputum", "P3 × T3", "Siap"],
  ["Epidemiologi dan pemodelan risiko DBD di Kota Mojokerto", "P3 × T3", "Siap"],
  ["Optimasi topologi bone plate dengan material lokal", "P4 × T4", "Siap"],
  ["Prostesis cetak tiga dimensi untuk amputasi diabetik", "P4 × T4", "Siap"],
  ["Neurorehabilitasi pascastroke berbasis EEG/EMG", "P4 × T1", "Siap"],
  ["Registri implan dan luaran fraktur di RSUD pendidikan", "P4 × T4", "Perlu mitra"],
  ["Analisis citra endotel kornea berbasis AI", "P4 × T3", "Siap"],
  ["Skrining kognitif lansia berbasis EEG di posyandu lansia", "P1 × T1", "Siap"],
  ["EEG untuk skrining gangguan jiwa di layanan primer", "P5 × T1", "Siap"],
  ["Evaluasi rotasi kedokteran komunitas terhadap capaian pembelajaran", "P5 × T5", "Siap"],
  ["Kesiapan adopsi teknologi kesehatan digital oleh tenaga puskesmas", "P5 × T5", "Siap"],
  ["Tanggung jawab hukum dan tata kelola AI diagnostik", "P5 × T0", "Perlu mitra"],
  ["Arsitektur interoperabilitas dan tata kelola data kesehatan desa", "P5 × T5", "Siap"],
  ["Protokol sensus dasar Platform Surveilans Desa Binaan", "0.0 × T5", "Siap"],
], [68, 16, 16], { size: 17 });
H2("4.6 Sasaran kinerja");
p("Pohon tidak membuat sasaran angka sendiri. Sasaran diambil dari indikator kinerja Renstra, lalu pohon menunjukkan di sel mana sasaran itu akan dicapai. Tabel berikut memuat sasaran draf Renstra Prodi Kedokteran 2026–2030; sasaran Prodi Pendidikan Profesi Dokter dan Teknologi Kedokteran dilengkapi dari Renstra masing-masing.");
table("Sasaran indikator kinerja penelitian dan PkM (draf Renstra Prodi Kedokteran 2026–2030)", ["Indikator", "Garis dasar", "2026", "2027", "2028", "2029", "2030"], [
  ["Rasio publikasi internasional terindeks Scopus per dosen", "0,15", "0,20", "0,25", "0,30", "0,45", "[isi]"],
  ["Publikasi bereputasi internasional dari seluruh publikasi", "20%", "22,5%", "25%", "30%", "40%", "[isi]"],
  ["HKI didaftarkan per tahun", "38", "38", "38", "40", "40", "42"],
  ["Hasil riset dengan produk sebagai luaran", "11", "11", "12", "13", "14", "15"],
  ["Rasio luaran kerja sama perguruan tinggi dengan industri", "0,30", "0,50", "0,525", "0,55", "0,575", "0,60"],
  ["Kerja sama internasional per tahun", "3", "3", "4", "4", "5", "5"],
  ["Kegiatan PkM per tahun", "[isi]", "2", "3", "4", "5", "6"],
  ["Keterlibatan dalam SDG sesuai keunggulan", "[isi]", "80%", "82%", "85%", "88%", "90%"],
], [40, 10, 10, 10, 10, 10, 10], { size: 17, note: "Garis dasar draf Renstra masih memerlukan verifikasi: sebagian angka adalah angka fakultas, dan baseline publikasi masih memakai jumlah judul penelitian." });
table("Indikator khas pohon", ["Indikator", "Cara menghitung", "Sumber", "Sasaran"], [
  ["Kesesuaian dengan pohon", "Proyek yang dinilai sesuai dibagi proyek yang sudah ditelaah; cakupan telaah dilaporkan", "Evaluasi kesesuaian tahunan", "[isi]"],
  ["Proyek lintas prodi", "Proyek dengan anggota dari prodi lain menurut homebase dibagi proyek berketua", "Instrumen agenda dosen", "[isi]"],
  ["Keterlibatan mahasiswa (PPDM)", "Judul penelitian dosen yang melibatkan mahasiswa dibagi seluruh judul, tiga tahun terakhir", "Register proyek", "[isi]"],
  ["Proporsi riset pencegahan", "Proporsi portofolio pada kategori deteksi, skrining, dan pencegahan menurut klasifikasi riset kesehatan HRCS", "Register proyek", "[isi]"],
  ["Mata kuliah dari hasil riset (NMKI)", "Jumlah mata kuliah atau blok yang dikembangkan dari hasil penelitian atau PkM", "Kurikulum prodi", "[isi]"],
], [24, 42, 20, 14], { firstCol: true, size: 17 });
H2("4.7 Dari purwarupa ke izin edar");
p("Untuk produk alat kesehatan, tonggak hilirisasi ditulis sebagai kejadian yang dapat dibuktikan. Pada lajur 2029–2030, yang dicantumkan adalah tahap yang sepenuhnya dapat diperiksa, misalnya \"mitra produsen menyetujui spesifikasi dan paket bukti untuk pengajuan\". Izin terbit, produk tayang di katalog, dan pemakaian di layanan baru dicatat pada tanggal buktinya.");
fig(FD("d_izinedar.png"), "Tonggak dari purwarupa ke izin edar. Dasar: Permenkes 5/2026, Permenkes 11/2025, KMK 951/2026, dan Permenperin 35/2025.", 590);

// ---------------------------------------------------------------------- BAB 5
H1("5. Peta Jalan Pengabdian kepada Masyarakat 2026–2030");
H2("5.1 Lima prinsip");
table("Prinsip Peta Jalan PkM", ["Prinsip", "Penjelasan"], [
  ["Satu pohon, dua peta jalan", "PkM memakai batang, pilar, platform, dan wahana yang sama dengan penelitian. PkM adalah cabang penerapan dan dicatat di instrumen yang sama dengan jenis kegiatan \"PkM\"."],
  ["Dua wahana binaan inti", "Desa Binaan Kota Mojokerto (lima puskesmas) menjadi binaan berkelanjutan fakultas; Bina Desa Sehat di sekitar kampus menjadi binaan kampus. Kegiatan lain dicatat sebagai PkM tematik."],
  ["Tangga kedalaman", "Lima anak tangga: pengenalan, pelatihan, penerapan, penggunaan mandiri oleh mitra, serta dampak dan replikasi."],
  ["Diukur dari perubahan pada mitra", "Setiap program memiliki satu ukuran manfaat yang disepakati mitra dan satu ukuran keberlanjutan, bukan sekadar jumlah kegiatan."],
  ["Riset dan PkM saling mengisi", "Kebutuhan yang ditemukan saat PkM menjadi topik riset dan tugas akhir; hasil riset yang sudah teruji kembali ke masyarakat sebagai PkM."],
], [26, 74], { firstCol: true });
H2("5.2 Pohon PkM per pilar");
table("Ranting PkM per pilar", ["Pilar", "Ranting PkM (usulan)", "Sudah berjalan", "Mitra utama"], [
  ["P1", "Skrining dan pendampingan hipertensi–diabetes berbasis kader; kepatuhan terapi; deteksi dini kanker serviks dan payudara bersama puskesmas", "Skrining tekanan darah dan lemak darah dalam Bina Desa Sehat", "Puskesmas, kader, Dinas Kesehatan Kota Mojokerto"],
  ["P2", "Pendampingan 1000 HPK dan pencegahan stunting; kesehatan remaja dan reproduksi; skrining tumbuh kembang", "Kegiatan kesehatan anak dan reproduksi dalam RIP PkM prodi", "Posyandu, PONED puskesmas, sekolah"],
  ["P3", "Literasi antibiotik; penemuan kasus TB berbasis komunitas; kesiapsiagaan dan dukungan psikososial bencana", "Penyuluhan resistensi antibiotik bagi kader di Keputih dan Medokan Semampir", "Puskesmas, kader, BPBD"],
  ["P4", "Prostesis dan alat bantu terjangkau; pertolongan pertama dan bantuan hidup dasar awam; rehabilitasi berbasis masyarakat", "Program pemberian prostesis tangan; pelatihan bantuan hidup dasar", "Komunitas penyandang disabilitas, sekolah, RSUD"],
  ["P5", "Penguatan layanan primer; literasi kesehatan digital; pelatihan kader dan tenaga puskesmas; laporan profil kesehatan desa tahunan", "Rotasi kedokteran komunitas", "Dinas Kesehatan, puskesmas, pemerintah kota"],
], [8, 40, 28, 24], { firstCol: true, size: 17 });
H2("5.3 Wahana dan mitra");
table("Wahana PkM", ["Wahana", "Lokasi", "Status", "Peran"], [
  ["Binaan berkelanjutan", "Desa Binaan Kota Mojokerto, lima puskesmas", "Perjanjian kerja sama tripartit FKK ITS, Pemerintah Kota dan Kabupaten Mojokerto (15 Januari 2025); dashboard data puskesmas tersedia", "Program jangka panjang semua pilar; tempat anak tangga 4–5 dibuktikan"],
  ["Binaan kampus", "Bina Desa Sehat: Sukolilo, Medokan Semampir, Keputih", "Berjalan", "Program dekat kampus; wahana mahasiswa tahap awal"],
  ["Rumah sakit", "RSUD dr. Wahidin Sudiro Husodo dan RSUD R.A. Basoeni", "Kepaniteraan mulai 2027", "Promosi kesehatan, rujukan balik, pelatihan tenaga kesehatan"],
  ["Klinik kampus", "ITS Medical Center, Puskesmas Keputih", "Berjalan", "Uji kebergunaan produk sebelum dibawa ke masyarakat"],
], [17, 27, 30, 26], { firstCol: true, size: 17 });
p("Sebuah wilayah disebut binaan bila memenuhi lima syarat: ada perjanjian atau surat kesediaan mitra, penanggung jawab dari kedua pihak, rencana minimal tiga tahun, satu ukuran manfaat yang disepakati, dan jadwal evaluasi bersama. Tanpa kelimanya, kegiatan dicatat sebagai PkM tematik.");
H2("5.4 Peran tiga prodi");
table("Peran prodi dalam PkM", ["Aspek", "Sarjana Kedokteran", "Pendidikan Profesi Dokter", "Teknologi Kedokteran"], [
  ["Bentuk khas", "Edukasi, skrining, survei kebutuhan, pendampingan kader", "Layanan, kunjungan rumah, rujukan, pelatihan tenaga kesehatan", "Teknologi tepat guna: pemasangan, pelatihan, pemeliharaan, uji kebergunaan"],
  ["Jalur mahasiswa", "Blok kedokteran komunitas, organisasi mahasiswa, KKN tematik", "Kepaniteraan kedokteran komunitas (mulai 2027)", "Proyek layanan berbasis rekayasa, KKN, tugas akhir terapan"],
  ["Anak tangga khas", "1–3", "3–4", "3–5"],
  ["Luaran khas", "Modul edukasi, data skrining, artikel PkM", "Protokol layanan, alur rujukan, materi pelatihan", "Produk terpasang, panduan penggunaan, HKI, laporan kebergunaan"],
], [16, 28, 28, 28], { firstCol: true, size: 17 });
H2("5.5 Tangga kedalaman PkM");
fig(FD("d_tangga_pkm.png"), "Tangga kedalaman PkM. Setiap program mencatat anak tangga saat ini dan target; perpindahan anak tangga lebih bernilai daripada jumlah kegiatan pada anak tangga yang sama.", 580);
table("Bukti minimum per anak tangga", ["Anak tangga", "Bukti minimum", "Contoh ukuran manfaat"], [
  ["1 Pengenalan", "Daftar hadir, materi, dokumentasi", "Jumlah peserta; pengetahuan sebelum dan sesudah"],
  ["2 Pelatihan", "Modul, hasil uji keterampilan", "Proporsi peserta lulus uji keterampilan"],
  ["3 Penerapan", "Berita acara serah terima, catatan pelaksanaan", "Cakupan skrining; jumlah produk terpasang dan dipakai"],
  ["4 Penggunaan mandiri", "Surat atau laporan mitra; data rutin puskesmas", "Program berjalan minimal enam bulan setelah pendampingan berakhir"],
  ["5 Dampak dan replikasi", "Data perbandingan; surat adopsi atau kebijakan daerah", "Perubahan indikator kesehatan wilayah; jumlah wilayah yang mengadopsi"],
], [22, 38, 40], { firstCol: true, size: 17 });
H2("5.6 Peta jalan PkM tiga periode");
table("Peta jalan PkM", ["Lajur", "2023–2025 (capaian)", "2026–2028 (konsolidasi dan keberlanjutan)", "2029–2030 (pengembangan dan pengakuan)"], [
  ["Tonggak bersama", "Edisi pertama; Bina Desa Sehat berjalan; perjanjian tripartit Mojokerto (Januari 2025)", "SK Peta Jalan PkM edisi kedua; evaluasi edisi pertama; register PkM; evaluasi kesesuaian tahunan", "Evaluasi menyeluruh dan edisi ketiga; program binaan masuk dokumen perencanaan daerah"],
  ["Desa Binaan Kota Mojokerto", "Data lima puskesmas terkumpul di dashboard", "Wilayah prioritas dipilih bersama Dinas Kesehatan; laporan profil kesehatan desa tahunan pertama; program P1 dan P2 mencapai anak tangga 3–4", "Program utama di anak tangga 4–5; replikasi ke wilayah lain bila terbukti"],
  ["Bina Desa Sehat", "Penyuluhan AMR; skrining tekanan darah dan lemak darah", "Naik ke anak tangga 3: kader menjalankan skrining rutin", "Penggunaan mandiri oleh kader dan puskesmas"],
  ["PkM berbasis produk", "Terinisiasi", "Produk yang lolos uji kebergunaan dibawa ke masyarakat; pelatihan penggunaan dan pemeliharaan", "Penerapan rutin; panduan dan HKI; bahan pengajuan izin edar bila relevan"],
  ["Mahasiswa", "Terlibat per kegiatan", "Pelibatan terstruktur melalui blok komunitas, kepaniteraan, KKN, tugas akhir terapan", "Tim lapangan lintas prodi menjadi pola tetap"],
], [18, 24, 32, 26], { firstCol: true, size: 17, note: "Angka target (jumlah kegiatan, peserta, wilayah) disusun Unit PkM dari data realisasi 2023–2026: [isi]." });
H2("5.7 Siklus riset dan PkM");
fig(FD("d_siklus_pkm.png"), "Siklus riset dan PkM. Arah riset tidak lagi searah dari laboratorium ke desa: kebutuhan mitra menjadi bank topik riset dan tugas akhir.", 600);
table("Pasangan riset dan PkM yang sudah terlihat", ["Riset", "Turunan PkM", "Anak tangga"], [
  ["Intervensi perubahan perilaku untuk penyakit tidak menular", "Pendampingan kepatuhan terapi hipertensi", "3–4"],
  ["Evaluasi program penanganan stunting", "Rekomendasi perbaikan program untuk pemerintah kota", "5"],
  ["Survei swamedikasi antibiotik", "Materi dan pelatihan kader literasi antibiotik", "2–3"],
  ["Prostesis cetak tiga dimensi", "Pemasangan dan pelatihan penggunaan prostesis", "3–4"],
  ["Sensus dasar Desa Binaan", "Laporan profil kesehatan desa tahunan untuk Dinas Kesehatan", "3–5"],
], [40, 46, 14], { size: 17 });

// ---------------------------------------------------------------------- BAB 6
H1("6. Program Unggulan: Platform Surveilans Desa Binaan");
H2("6.1 Mengapa bukan kohort penuh");
p("Kohort prospektif penuh, dengan pemeriksaan klinis berulang, biobank, dan luaran insidens, menuntut prasyarat yang belum dimiliki fakultas berumur tiga tahun: departemen epidemiologi yang matang, pembiayaan jangka panjang, dan konsorsium. Pembanding domestik terdekat, seperti HDSS Sleman dan Studi Kohort PTM Bogor, sudah lebih dulu dan lebih besar. Kohort konvensional di Mojokerto akan selalu terbaca sebagai versi kecil dari yang sudah ada.");
H2("6.2 Bentuk yang diusulkan");
p("Platform dibingkai sebagai **tempat uji teknologi kedokteran pada populasi terdefinisi**. Populasi yang terenumerasi penuh, memberi persetujuan, dan tercatat lokasinya adalah substrat yang dibutuhkan untuk memvalidasi sensor, algoritma skrining, dan alat diagnostik di tempat layanan pada kondisi nyata. Yang tidak mudah ditiru bukan kohortnya, melainkan kohort yang menempel pada pengembangan teknologi kedokteran di institut teknologi.");
H2("6.3 Penahapan");
fig(FD("d_surveilans.png"), "Penahapan Platform Surveilans Desa Binaan, jalur data paralel, dan prasyarat sebelum pengumpulan data.", 600);
p("Modul faktor risiko diadaptasi dari Survei Kesehatan Indonesia atau WHO STEPS agar hasilnya sebanding dengan data nasional. Pada tahap awal, kesebandingan lebih berharga daripada orisinalitas instrumen.");
H2("6.4 Keputusan yang perlu diambil sejak awal");
numbers([
  "**Tetapkan wilayah pembanding sejak hari pertama**, dikemas sebagai giliran bertahap: semua wilayah menerima layanan baku Dinas Kesehatan dan laporan profil kesehatan desa tahunan, lalu paket program baru diberikan bergiliran. Tanpa pembanding, efek program tidak dapat diklaim. Giliran bertahap baru dapat mengestimasi efek bila protokol, urutan alokasi, pengukuran berulang, dan telaah statistiknya disiapkan lebih dulu.",
  "**Anggarkan tiga ronde pembaruan sebelum menyetujui sensus dasar.** Banyak kohort universitas berhenti di antara data dasar dan pembaruan pertama. Bila tiga ronde belum terbiayai, skala sensus dasar dikecilkan.",
  "**Jadikan kurikulum sebagai tenaga lapangan**, melalui penugasan terstruktur di blok kedokteran komunitas, dengan supervisi mutu data yang wajib.",
  "**Rancang persetujuan peserta seluas yang diizinkan regulasi** dan disetujui komite etik, termasuk tindak lanjut jangka panjang dan berbagi data yang terkendali.",
  "**Tulis tata kelola data sebelum mengumpulkan data**: komite akses yang terpisah dari pendiri studi, kamus data, formulir permohonan baku, kebijakan publikasi, dan masa embargo yang jelas.",
  "**Pilih jalur data terbuka** setelah masa embargo, mengikuti contoh survei panel nasional yang banyak disitasi karena datanya dapat diakses.",
]);
box("Syarat hukum dan etik", [
  "Sebelum rekrutmen atau akses data: komite etik yang menelaah harus berwenang dan terdaftar sesuai ketentuan; **UU 27/2022 tentang Pelindungan Data Pribadi** berlaku karena data kesehatan termasuk data pribadi spesifik, sehingga dasar pemrosesan, tujuan, penilaian dampak, masa simpan, hak menarik persetujuan, dan transfer data harus dirancang dan didokumentasikan.",
  "Penautan dengan NIK, klaim BPJS, atau sistem informasi puskesmas memerlukan perjanjian dengan pemilik data. Tahap awal memakai data agregat.",
], C.acc);
H2("6.5 Jalur data paralel");
p("Jalur lapangan berjalan lambat tetapi khas. Karena itu rencana ini memuat jalur kedua yang lebih cepat: analisis data rutin puskesmas dan register, dimulai dari data agregat. Bila survei longitudinal terlalu berat, survei potong lintang berulang pada sampel acak komunitas dapat dipakai sebagai alternatif yang tetap sah sebagai surveilans populasi.");
H2("6.6 Keberlanjutan dan langkah pertama");
p("Platform ditambatkan pada dua hal yang tidak bergantung hibah: **kurikulum**, sehingga ronde lapangan berjalan sebagai kegiatan akademik, dan **perjanjian dengan Dinas Kesehatan dan puskesmas Kota Mojokerto**, dengan luaran yang diinginkan pemerintah daerah berupa laporan profil kesehatan desa tahunan. Platform yang melayani kebutuhan nyata mitra akan dipertahankan mitra itu.");
p("Langkah pertama yang paling praktis adalah belajar dari pengelola HDSS Sleman dan Studi Kohort PTM Bogor mengenai protokol, instrumen, struktur biaya, dan kesalahan yang perlu dihindari, dengan pendekatan sebagai mitra. Penanggung jawab metodologi platform: [isi: ditetapkan Dekan].");

// ---------------------------------------------------------------------- BAB 7
H1("7. Pembiayaan");
H2("7.1 Tangga hibah");
p("Peta jalan dibiayai melalui tangga hibah yang mengikuti tahap riset. Peta Hibah FKK ITS 2027–2030 memuat 267 skema yang relevan, 90 di antaranya berelevansi tinggi dan 90 berasal dari pemberi dana dalam negeri. Setiap skema diberi penanda pilar, platform, prodi, tahap, dan syarat ketua.");
fig(FD("d_hibah_tangga.png"), "Jumlah skema hibah relevan per tangga, 2027–2030.", 560, "Sumber: Peta Hibah FKK ITS 2027–2030, diturunkan dari Peta Hibah Dosen 2027 dan ditambah penelusuran skema internal ITS, nasional, dan internasional (November 2026).");
table("Contoh skema per tangga", ["Tangga", "Wahana khas", "Contoh skema dan syarat kunci"], [
  ["Riset awal (TKT 1–3)", "W0–W1", "Penelitian dasar BIMA; skema internal ITS; DIPI; Wellcome Discovery"],
  ["Riset terapan (TKT 4–6)", "W1–W3", "Penelitian terapan BIMA; skema riset ITS; RIIM Kompetisi (riset klinis tidak didanai); JatimPro; skema kolaborasi Jepang"],
  ["Hilirisasi (TKT 7–9)", "W3–W4", "SINERGI LPDP; RISPRO Komersial (TKT awal minimal 5); skema hilirisasi BRIN yang diusulkan industri; sandbox kesehatan Kementerian Kesehatan"],
  ["PkM", "W4", "PkM BIMA (Pemberdayaan Desa Binaan, Kemitraan, Wilayah); Abmas ITS berbasis wilayah dan produk; World Diabetes Foundation"],
  ["SDM dan mobilitas", "—", "Beasiswa S3 dosen; fellowship dan kunjungan riset; MSCA Staff Exchanges"],
  ["Insentif dan ekosistem", "—", "Insentif publikasi dan HKI ITS; Pusat Unggulan Iptek Perguruan Tinggi; hibah jurnal; AMEE Research Grant"],
], [22, 13, 65], { firstCol: true, size: 17 });
H2("7.2 Hibah per sel pohon");
fig(FD("d_hibah_sel.png"), "Jumlah hibah bertopik spesifik per sel pilar–platform. Sel bergaris merah (P3 × T1) belum memiliki hibah bertopik spesifik. Sebanyak 88 skema lain terbuka untuk semua bidang dan berlaku bagi setiap sel.", 480);
H2("7.3 Catatan perencanaan");
numbers([
  "**Platform paling matang justru paling sedikit hibah bertopik spesifik.** Sel P1, P2, dan P5 × T1 hanya memiliki satu atau dua hibah, dan P3 × T1 belum ada. Platform T1 mengandalkan hibah semua bidang, hibah AI dan neurosains, serta skema internal ITS.",
  "**Validasi klinis tidak dapat dibiayai melalui RIIM Kompetisi**, karena pedoman 2026 mengecualikan uji praklinik dan klinik untuk usulan baru. Validasi di RSUD memerlukan jalur penelitian terapan, skema internal, kemitraan industri, atau pendana kesehatan.",
  "**Hilirisasi dimulai dari mitra industri.** Skema hilirisasi BRIN diusulkan industri dan SINERGI menargetkan produk siap pasar; mencari mitra produsen adalah tonggak 2027–2028, bukan 2030.",
  "**Peluang internasional perlu dipilih cermat.** Indonesia layak mengusulkan di Horizon Europe, sedangkan beberapa pendana kesehatan Inggris dan Amerika Serikat kini tidak menerima pengusul Indonesia. Skema seperti itu sengaja tidak dimasukkan ke peta hibah.",
]);
H2("7.4 Hibah internal berjenjang");
p("Untuk menutup kesenjangan sumber daya, hibah internal fakultas diusulkan berjenjang: **dosen muda** (ketua bergelar magister, maksimal Asisten Ahli), **dosen utama** (ketua minimal Lektor, atau Asisten Ahli bergelar doktor dengan rekam jejak penulis utama), dan **kolaborasi luar negeri**. Kesesuaian dengan cabang pohon menjadi kriteria seleksi berbobot, dan pelamar tidak boleh memiliki tunggakan luaran dari hibah sebelumnya. Seluruh hibah internal berada di bawah satu pagu Unit Penelitian dengan dua jenis belanja: platform mengusulkan belanja modal bersama, dan pilar menyalurkan belanja operasional.");
H2("7.5 Tenggat terdekat");
table("Tenggat hibah yang jatuh pada masa penetapan rencana", ["Tanggal", "Skema", "Catatan"], [
  ["4 Desember 2026", "IEEE EMBS Major Project", "Teknologi kesehatan"],
  ["15 Desember 2026, 15.00 WIB", "Pusat Unggulan Iptek Perguruan Tinggi 2027, pernyataan minat", "Khusus pusat riset yang belum pernah didanai skema ini; keputusan ikut atau tidak ada pada pimpinan"],
  ["17 Desember 2026", "International FAIMER Institute", "Pengembangan pendidikan kedokteran"],
  ["15 Januari 2027", "AMEE Research Grant, pra-proposal", "Riset pendidikan kedokteran"],
  ["1 Maret 2027", "Unitaid Call for Proposals", "Lembaga Indonesia umumnya sebagai mitra konsorsium"],
  ["Desember 2026–Januari 2027 (perkiraan)", "Penelitian dan PkM BIMA tahun anggaran 2027", "Usulan langsung dicatat dengan kode pohon"],
], [26, 38, 36], { size: 17, note: "Jadwal harus dicek ulang di laman resmi pemberi dana." });

// ---------------------------------------------------------------------- BAB 8
H1("8. Tata Kelola, Pemantauan, dan Evaluasi");
H2("8.1 Struktur dan koordinator");
fig(FD("d_tatakelola.png"), "Struktur tata kelola penelitian dan PkM.", 590);
p("Fakultas menetapkan **lima koordinator pilar dan lima koordinator platform**. Pilar dikoordinasi dosen Kedokteran atau Profesi Dokter, kecuali P4 yang dikoordinasi dosen Teknologi Kedokteran. Platform dikoordinasi dosen Teknologi Kedokteran dengan pendamping klinis. Satu orang dapat merangkap paling banyak dua peran koordinasi dengan alokasi waktu tertulis. Pelaksanaan dimulai pada 2027 dari dua atau tiga sel percontohan yang timnya sudah terbukti, misalnya neurorehabilitasi (P4 × T1), skrining napas untuk diabetes (P1 × T2), dan implan (P4 × T4), lalu diperluas setelah kapasitasnya diuji. Nama koordinator diusulkan pada Januari 2027 dan ditetapkan bersama SK.");
H2("8.2 Empat pengait setiap tema");
p("Pembandingan dengan pusat riset kesehatan menunjukkan bahwa sebuah tema hanya berjalan bila memiliki empat pengait: **koordinator** dengan kewenangan tertulis, **akses anggaran** yang jelas di bawah satu pagu, **rencana rekrutmen** yang terikat pada sel kosong atau sel yang bergantung pada satu orang, dan **tanggal peninjauan** yang terjadwal, termasuk peninjauan status platform rintisan pada 2028. Pilar yang tidak berjalan dapat ditutup; kemampuan menutup tema adalah tanda tata kelola yang matang.");
H2("8.3 Norma kredit berimbang");
p("Pada proyek lintas prodi, kepemimpinan luaran dibagi menurut sifatnya: luaran rancang bangun dan algoritma dipimpin Teknologi Kedokteran, sedangkan luaran validasi klinis dan populasi dipimpin Kedokteran atau Profesi Dokter. Norma ini ditulis sejak awal proyek agar setiap prodi memperoleh kredit atas kontribusinya.");
H2("8.4 Mekanisme pelaksanaan");
bullets([
  "**Koordinat pohon wajib** pada setiap usulan hibah internal, surat tugas penelitian, dan formulir pengajuan judul tugas akhir. Usulan tanpa koordinat tidak dapat diproses.",
  "**Tugas akhir berpasangan dalam satu proyek payung:** tugas akhir Teknologi Kedokteran mengerjakan rancang bangun atau algoritma, skripsi Sarjana Kedokteran mengerjakan uji laboratorium atau survei komunitas, dan luaran ilmiah kepaniteraan mengerjakan validasi klinis. Setiap mahasiswa tetap lulus mandiri sesuai capaian pembelajaran prodinya.",
  "**Pembimbing pendamping lintas prodi** untuk skripsi yang memakai platform dan untuk tugas akhir rekayasa yang menyentuh pasien, sampel biologis, atau populasi.",
  "**Bank kebutuhan teknologi** dari puskesmas dan RSUD, dibahas setiap semester dalam forum padanan riset yang mempertemukan pemilik masalah klinis dengan pemilik purwarupa.",
  "**Komite etik dengan kerangka baku** (tujuh standar WHO 2011, pedoman CIOMS 2016, dan pedoman komisi etik nasional), terdaftar sehingga surat laik etik memuat nomor registrasi, dan menjadi gerbang sebelum kontrak penelitian diterbitkan.",
]);
H2("8.5 Instrumen agenda dosen");
p("Isi peta jalan diambil dari rencana nyata setiap dosen melalui satu instrumen bersama untuk ketiga prodi. Setiap dosen mengisi dua sampai lima proyek untuk lima tahun, sebagai ketua untuk proyek yang dipimpinnya; rekan dari prodi lain cukup dipilih sebagai anggota. Instrumen menghitung rekap secara otomatis dan sudah diuji dengan kasus tepi.");
table("Isi instrumen agenda penelitian dan PkM dosen", ["Bagian", "Isi", "Diisi oleh"], [
  ["Petunjuk", "Tujuan, langkah pengisian, definisi pilar, platform, wahana, dan TKT", "—"],
  ["Daftar dosen", "Nama dari daftar fakultas 2026 dengan isian awal prodi, jabatan, dan bidang keahlian untuk dikoreksi; status pengisian terpantau", "Setiap dosen"],
  ["Agenda", "Satu baris satu proyek (penelitian atau PkM) dengan ID otomatis: topik, platform, anggota, wahana kini dan target, TKT, tahun, luaran, keterlibatan mahasiswa, anak tangga PkM, mata kuliah terkait", "Ketua proyek"],
  ["Rekap matriks", "Respons, persentase masuk pohon, persentase lintas prodi, keterlibatan mahasiswa, dan matriks pilar–platform", "Otomatis"],
  ["Rekap prodi dan platform", "Sebaran proyek per prodi; rekap per platform untuk peta jalan Teknologi Kedokteran", "Otomatis"],
  ["Peta jalan", "Proyek aktif per tahun 2026–2030 per pilar dan prodi", "Otomatis"],
], [18, 62, 20], { firstCol: true, size: 17 });
H2("8.6 Evaluasi kesesuaian dan siklus perbaikan");
p("Evaluasi kesesuaian dilakukan setiap tahun dengan empat kategori: **sesuai**, **sesuai sebagian**, **di luar peta**, dan **belum dapat dinilai**, disertai analisis penyebab dan rekomendasi. Hasilnya diterbitkan sebagai Berita Acara dan laporan bertanda tangan Dekan, lalu diikuti revisi peta jalan bernomor versi.");
bullets([
  "Persentase kesesuaian dihitung dari proyek yang sudah ditelaah, dan cakupan telaah dilaporkan agar angka tinggi tidak lahir dari penyebut kecil.",
  "Respons isian, partisipasi pelaksana, rencana, dan capaian dilaporkan terpisah; rencana tidak dilaporkan sebagai capaian.",
  "Sampel proyek ditelusuri dari agenda, penugasan, bukti kerja mahasiswa, hasil, pemanfaatan, sampai keputusan tindak lanjut.",
  "Keputusan tindak lanjut yang sah: meneruskan uji, memperbaiki desain, mencari mitra, memperbarui pembelajaran, atau menghentikan topik dengan alasan.",
]);
fig(FD("d_ppepp.png"), "Siklus penetapan, pelaksanaan, evaluasi, pengendalian, dan peningkatan untuk peta jalan.", 600);
p("Audit mutu internal pertama dijadwalkan meskipun dokumen belum lengkap. Unit baru lazim kuat pada perencanaan dan pelaksanaan tetapi kosong pada evaluasi dan pengendalian; temuan tahun pertama justru menjadi modal, karena hanya siklus kedua yang dapat membuktikan peningkatan.");
H2("8.7 Tata kelola bertahap");
table("Penahapan perangkat tata kelola", ["Tahap", "Waktu", "Perangkat", "Tanda selesai"], [
  ["1 Wajib awal", "Desember 2026–2027", "SK pohon dan peta jalan penelitian serta PkM; instrumen agenda dosen; formulir pohon untuk tugas akhir; evaluasi edisi pertama; evaluasi kesesuaian tahunan; registrasi komite etik; audit mutu internal pertama", "Berita Acara evaluasi 2027 terbit; komite etik bernomor registrasi"],
  ["2 Operasional inti", "2027–2028", "Koordinator mulai dari sel percontohan; hibah internal berkode pohon; tugas akhir berpasangan dan forum padanan riset; sensus dasar Desa Binaan setelah syarat etik dan data terpenuhi; dashboard publik", "Minimal satu proyek lintas prodi per pilar berjalan dengan bukti peran"],
  ["3 Pengayaan", "2028–2030", "Klasifikasi riset kesehatan HRCS dan rasio translasi; klasifikasi otomatis judul tugas akhir; penautan data layanan bila dasar hukumnya tersedia", "Dipakai dalam evaluasi menyeluruh 2030"],
], [15, 15, 48, 22], { firstCol: true, size: 17 });

// ---------------------------------------------------------------------- BAB 9
H1("9. Keselarasan dengan Akreditasi");
H2("9.1 Inti yang diperiksa kedua lembaga");
p("LAM-PTKes dan BAN-PT memakai instrumen yang berbeda, tetapi intinya sama: peta jalan yang merujuk visi keilmuan, pelaksanaan oleh dosen dan mahasiswa sesuai peta jalan, evaluasi kesesuaian, pemakaian hasil evaluasi untuk perbaikan, dan integrasi hasil ke pembelajaran. Satu pohon fakultas cukup untuk ketiga prodi; yang berbeda adalah peta jalan prodi dan nomor butir dalam laporan evaluasi diri.");
fig(FD("d_unsur.png"), "Lima unsur relevansi penelitian dan PkM yang ditelusuri asesor.", 600);
H2("9.2 Pemetaan bukti");
table("Pemetaan elemen akreditasi ke bukti dan bagian dokumen", ["Elemen", "Yang diperiksa", "Bukti yang disiapkan", "Bagian"], [
  ["LAM-PTKes 5.5.1 dan 5.6.1", "Kebijakan; keterkaitan peta jalan dengan visi dan keunggulan; evaluasi kesesuaian; tindak lanjut", "SK rencana induk; pohon; Berita Acara evaluasi tahunan; revisi bernomor versi", "Bab 3, 8"],
  ["LAM-PTKes 5.5.2 dan 5.6.2", "Mekanisme pelaksanaan, pendanaan, keterlibatan mahasiswa, kolaborasi", "Register proyek; skema hibah internal; daftar mahasiswa per proyek; perjanjian mitra", "Bab 5, 7, 8"],
  ["LAM-PTKes 5.5.3 dan 5.6.3", "Integrasi hasil ke pembelajaran", "Kolom mata kuliah, blok, atau rotasi di register; daftar mata kuliah yang dikembangkan dari hasil riset dan PkM", "Bab 4, 8"],
  ["LAM-PTKes 5.5.4 dan 5.6.4", "Pengakuan atas hasil: hibah, HKI, paten, kontribusi bagi masyarakat", "Rekap hibah dan HKI; ukuran manfaat yang dikonfirmasi mitra; surat adopsi", "Bab 4, 5, 7"],
  ["BAN-PT IAPS 5.1", "Relevansi penelitian dan PkM: peta jalan, pelaksanaan, evaluasi keselarasan, pemanfaatan hasil", "Peta jalan per platform; rekap platform; Berita Acara evaluasi", "Bab 3, 4, 8"],
], [20, 28, 36, 16], { firstCol: true, size: 17 });
H2("9.3 Indikator kuantitatif yang direkap sejak sekarang");
bullets([
  "**PPDM** = judul penelitian dosen tetap yang melibatkan mahasiswa dibagi seluruh judul penelitian dosen tetap, tiga tahun terakhir.",
  "**PPkMDM** = padanan untuk PkM.",
  "**NMKI** = jumlah mata kuliah yang dikembangkan dari hasil penelitian atau PkM dosen tetap, tiga tahun terakhir.",
]);
H2("9.4 Ketentuan yang berlaku");
p("Registrasi akreditasi LAM-PTKes sejak 1 Januari 2025 memakai instrumen delapan kriteria dengan metode kualitatif; pengajuan berikutnya kedua prodi kedokteran hampir pasti memakai instrumen ini. Peraturan BAN-PT Nomor 5 Tahun 2025 memberi predikat memenuhi, memenuhi sebagian, atau tidak memenuhi per subkriteria, dan butir 5.5 serta 5.6 wajib memenuhi untuk peringkat Unggul. Karena itu dokumen ini ditulis agar dapat dinarasikan secara kualitatif dan berbasis bukti. Paket instrumen final dicocokkan dengan akun akreditasi prodi saat pengajuan.");

// ---------------------------------------------------------------------- BAB 10
H1("10. Jadwal Penetapan dan Pengelolaan Risiko");
H2("10.1 Linimasa");
p("Penetapan dibagi dua tahap. Tahap pertama meminta persetujuan kerangka sebagai dasar pengisian, bukan pengesahan. Tahap kedua mengajukan draf final yang sudah berisi agenda dosen, evaluasi edisi pertama, peta jalan prodi yang diperiksa Kaprodi, dan Peta Jalan PkM.");
fig(FD("d_linimasa.png"), "Linimasa penetapan rencana induk, November 2026–Maret 2027.", 600);
table("Tonggak penetapan", ["Waktu", "Kegiatan", "Hasil"], [
  ["30 November–4 Desember 2026", "Review tim kecil", "Daftar dosen dikoreksi; padanan topik prodi disepakati; bentuk peta jalan Teknologi Kedokteran dipilih; penanggung jawab Peta Jalan PkM ditunjuk"],
  ["±7–9 Desember 2026", "Tahap 1 ke Dekanat", "Kerangka disetujui; surat edaran pengisian terbit"],
  ["10 Desember 2026–8 Januari 2027", "Pengisian instrumen", "Sesi pengisian terpandu per prodi 14–17 Desember; sesi susulan 6–7 Januari (5 Januari libur nasional)"],
  ["11–15 Januari 2027", "Rekap dan revisi", "Matriks dan lajur berisi data nyata; peninjauan topik P1; register awal proyek"],
  ["18–22 Januari 2027", "Review peta jalan tiap prodi", "Peta jalan prodi diperiksa Kaprodi"],
  ["25–29 Januari 2027", "Uji publik", "Masukan Dinas Kesehatan, RSUD jejaring, dan mitra; berita acara uji publik"],
  ["±3–4 Februari 2027", "Tahap 2 ke Dekanat", "Draf final rencana induk, peta jalan penelitian, dan Peta Jalan PkM (5 Februari cuti bersama)"],
  ["Februari–5 Maret 2027", "Penetapan", "SK Dekan sebelum libur Nyepi–Idul Fitri (±6–15 Maret)"],
  ["Mulai 16 Maret 2027", "Peluncuran", "Formulir pohon untuk tugas akhir dan kode pohon pada hibah internal berlaku"],
], [24, 22, 54], { firstCol: true, size: 17, note: "Kalender ITS 2026/2027: batas pengisian nilai semester gasal 8 Januari 2027; masa perwalian semester genap 11 Januari–5 Februari 2027. Rapat dan tenggat dihindarkan dari tanggal tersebut." });
H2("10.2 Risiko dan pencegahannya");
table("Risiko utama dan pencegahannya", ["Risiko", "Pencegahan"], [
  ["Review tim kecil tertunda melewati 11 Desember", "Bahan satu halaman dikirim lebih dulu; pembicaraan bilateral sebelum rapat; rapat hanya untuk mengunci kesepakatan"],
  ["Pengisian instrumen rendah", "Sesi pengisian terpandu 14–17 Desember; sesi susulan 6–7 Januari; daftar isian awal per dosen"],
  ["Data administratif terlambat", "Batas semua data paling lambat 8 Januari 2027"],
  ["Peta Jalan PkM tertinggal", "Draf kerangka sudah ada; penanggung jawab ditunjuk pada review tim kecil; ikut uji publik"],
  ["Uji publik tidak kuorum atau menolak wilayah pembanding", "Konfirmasi kehadiran 6–8 Januari; manfaat bagi pemerintah daerah ditunjukkan; wilayah pembanding dikemas sebagai giliran bertahap"],
  ["SK terbit tetapi tidak dipakai", "Paket operasional hari pertama (formulir pohon, kode hibah, jadwal evaluasi) disahkan bersama SK"],
  ["Prodi tidak merasa memiliki", "RIP prodi disahkan pada siklus yang sama; koordinator lintas prodi; forum padanan riset dan hibah bersama"],
], [36, 64], { firstCol: true, size: 17 });
H2("10.3 Hal yang masih harus dilengkapi");
table("Daftar isian sebelum penetapan", ["Butir", "Penanggung jawab", "Tenggat"], [
  ["Status evaluasi setiap proyek edisi pertama", "Unit Penelitian dan ketiga Kaprodi", "8 Januari 2027"],
  ["Data Prodi Teknologi Kedokteran: judul dan luaran 2023–2026 per platform, TKT per produk", "Kaprodi Teknologi Kedokteran", "8 Januari 2027"],
  ["Rekonsiliasi angka kegiatan RIP PkM prodi dan data realisasi PkM 2023–2026", "Unit PkM dan Kaprodi", "8 Januari 2027"],
  ["Daftar mitra dan perjanjian yang berlaku", "Dekanat", "8 Januari 2027"],
  ["Sasaran angka periode 2026–2028 dari data SINTA dan Renstra prodi", "Unit Penelitian", "15 Januari 2027"],
  ["Pendamping klinis penyakit dalam untuk platform T2", "Kaprodi Pendidikan Profesi Dokter", "Januari 2027"],
  ["Status dosen yang belum tercantum di daftar fakultas", "Kaprodi dan bagian kepegawaian", "Januari 2027"],
  ["Nomor SK, tanggal penetapan, dan tanda tangan", "Dekanat", "Maret 2027"],
], [54, 28, 18], { size: 17 });

// ---------------------------------------------------------------------- BAB 11
H1("11. Penutup");
p("Rencana induk ini menempatkan FKK ITS pada posisi yang jarang dimiliki fakultas kedokteran lain: kedokteran pencegahan yang dibuktikan dengan teknologi buatan sendiri dan diuji pada populasi yang dikenal. Kekuatannya tidak terletak pada banyaknya tema, melainkan pada satu pohon yang dipakai bersama tiga prodi, satu register yang mencatat setiap proyek sekali, dan satu siklus evaluasi yang benar-benar berputar setiap tahun.");
p("Dokumen ini adalah draf untuk konsultasi. Isinya akan dilengkapi dari agenda setiap dosen, ditelaah setiap prodi, diuji di hadapan mitra, dan ditetapkan dengan SK Dekan. Setelah ditetapkan, ia diperbarui melalui evaluasi tahunan dan ditinjau menyeluruh pada 2030 untuk menghasilkan edisi ketiga.");

// ---------------------------------------------------------------------- Lampiran
H1("Lampiran A. Profil Sumber Daya Peneliti");
p("Tabel berikut memuat dosen menurut daftar fakultas 2026 ditambah calon dosen yang sudah aktif mengajar. Prodi, jabatan, dan bidang keahlian adalah isian awal dari PDDikti, daftar fakultas, dan profil publik, untuk diverifikasi setiap dosen melalui instrumen agenda.", { align: AlignmentType.LEFT });
table("Profil sumber daya peneliti", ["No", "Nama", "Prodi", "Jabatan", "Bidang keahlian"], roster.map((r, i) => [String(i + 1), r.nama, r.prodi, r.jabatan, r.bidang]), [5, 31, 18, 20, 26], { size: 16 });
H1("Lampiran B. Kode, Istilah, dan Singkatan");
table("Kode dalam pohon penelitian", ["Kode", "Arti"], [
  ["P1–P5", "Pilar: lima kelompok masalah kesehatan (cabang pohon)"],
  ["1.1–5.4", "Topik di dalam pilar; P1 memiliki topik 1.1–1.5"],
  ["x.9", "Topik baru di dalam pilar x, dijelaskan pengisi"],
  ["0.0", "Program lintas pilar, misalnya Platform Surveilans Desa Binaan"],
  ["9.9", "Topik di luar kelima pilar; dihitung terbuka sebagai bahan revisi pohon"],
  ["T1–T5", "Platform teknologi (akar pohon); T0 untuk proyek tanpa platform"],
  ["W0–W4", "Wahana translasi dari laboratorium (W0–W1) sampai masyarakat (W4)"],
], [16, 84], { firstCol: true });
table("Istilah dan singkatan", ["Istilah", "Arti"], [
  ["AMR", "Resistensi antimikroba"],
  ["BIMA", "Sistem pengelolaan hibah penelitian dan PkM Kemdiktisaintek"],
  ["HKI", "Hak kekayaan intelektual"],
  ["HRCS", "Health Research Classification System, sistem klasifikasi riset kesehatan dua sumbu"],
  ["IAPS", "Instrumen Akreditasi Program Studi BAN-PT"],
  ["NMKI", "Jumlah mata kuliah yang dikembangkan dari hasil penelitian atau PkM"],
  ["PkM", "Pengabdian kepada masyarakat"],
  ["PONED", "Puskesmas mampu pelayanan obstetri neonatal emergensi dasar"],
  ["PPDM / PPkMDM", "Persentase penelitian / PkM dosen yang melibatkan mahasiswa"],
  ["PTM", "Penyakit tidak menular"],
  ["Penempatan luaran", "Pencatatan satu judul pada satu topik; satu judul dapat ditempatkan di beberapa topik"],
  ["Sel percontohan", "Sel matriks pilar–platform yang dijalankan lebih dulu untuk menguji model koordinasi"],
  ["TKDN", "Tingkat komponen dalam negeri"],
  ["TKT", "Tingkat kesiapterapan teknologi, skala 1–9"],
], [24, 76], { firstCol: true, size: 17 });
H1("Lampiran C. Rujukan Utama");
bullets([
  "Roadmap Penelitian dan PkM FKK ITS 2023–2025 (September 2023).",
  "RIP Prodi Kedokteran dan Pendidikan Profesi Dokter FKK ITS 2026–2030 (draf).",
  "Draf Renstra Prodi Kedokteran FKK ITS 2026–2030 (Juli 2026).",
  "Renstra ITS 2026–2030 dan Peta Jalan Penelitian ITS 2025–2029.",
  "SK LAM-PTKes Nomor 0675 dan 0676 Tahun 2025 (akreditasi Prodi Sarjana Kedokteran dan Pendidikan Profesi Dokter); Sertifikat BAN-PT Nomor 6234/SK/BAN-PT/Ak/S/III/2026 (Prodi Teknologi Kedokteran).",
  "Surat Edaran LAM-PTKes 0397/2025 tentang instrumen akreditasi delapan kriteria; Buku III Panduan Laporan Evaluasi Diri Pendidikan Profesi Dokter jalur Unggul.",
  "Peraturan BAN-PT Nomor 5 Tahun 2025, Nomor 36 Tahun 2025, dan Nomor 8 Tahun 2026.",
  "Peraturan Menteri Kesehatan Nomor 12 Tahun 2025 tentang Renstra Kementerian Kesehatan 2025–2029.",
  "Undang-Undang Nomor 27 Tahun 2022 tentang Pelindungan Data Pribadi.",
  "Permenkes Nomor 5 Tahun 2026; Permenkes Nomor 11 Tahun 2025; KMK Nomor 951 Tahun 2026; Permenperin Nomor 35 Tahun 2025.",
  "Pedoman Etik Penelitian dan Pengembangan Kesehatan Nasional; WHO Standards and Operational Guidance for Ethics Review of Health-Related Research (2011); CIOMS International Ethical Guidelines (2016).",
  "Peta Hibah FKK ITS 2027–2030 (November 2026) dan Peta Hibah Dosen 2027.",
  "Data PDDikti semester gasal 2026/2027; daftar dosen dan tenaga kependidikan FKK ITS 2026; dashboard data puskesmas Desa Binaan Kota Mojokerto.",
]);

// ====================================================================== FRONT MATTER
const front = [];
const fp = (t, o = {}) => front.push(new Paragraph({ children: runs(t, o.run || {}), spacing: { after: o.after ?? 120, before: o.before || 0, line: 288 }, alignment: o.align || AlignmentType.LEFT, ...(o.p || {}) }));
// cover
const cover = [];
cover.push(new Paragraph({ spacing: { before: 200, after: 60 }, children: [new TextRun({ text: "FAKULTAS KEDOKTERAN DAN KESEHATAN", size: 20, color: C.muted, characterSpacing: 40 })] }));
cover.push(new Paragraph({ spacing: { after: 600 }, children: [new TextRun({ text: "INSTITUT TEKNOLOGI SEPULUH NOPEMBER", size: 20, color: C.muted, characterSpacing: 40 })] }));
cover.push(new Paragraph({ spacing: { after: 120, line: 240 }, children: [new TextRun({ text: "Rencana Induk Penelitian dan Pengabdian kepada Masyarakat", font: HEAD, size: 52, bold: true, color: C.blue })] }));
cover.push(new Paragraph({ spacing: { after: 240 }, children: [new TextRun({ text: "2026–2030", font: HEAD, size: 52, bold: true, color: C.ink })] }));
cover.push(new Paragraph({ spacing: { after: 300, line: 300 }, border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: C.blue, space: 12 } },
  children: [new TextRun({ text: "Pohon Penelitian serta Peta Jalan Penelitian dan PkM untuk Program Studi Sarjana Kedokteran, Pendidikan Profesi Dokter, dan Teknologi Kedokteran", size: 26, color: C.ink })] }));
{ const { w, h, data } = pngSize(F("fig_pohon.png")); const W = 520; cover.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 200, after: 300 }, children: [new ImageRun({ type: "png", data, transformation: { width: W, height: Math.round(W * h / w) }, altText: { title: "Pohon penelitian", description: "Pohon penelitian FKK ITS", name: "pohon" } })] })); }
cover.push(new Paragraph({ spacing: { after: 60 }, children: [new TextRun({ text: "Draf untuk konsultasi · versi 0.9 · November 2026", bold: true, size: 22, color: C.ink })] }));
cover.push(new Paragraph({ children: runs("Belum disahkan. Bagian bertanda [isi: …] dilengkapi sebelum penetapan.", { size: 20, color: C.muted }) }));

// approval page
fp("Lembar Pengesahan", { run: { font: HEAD, size: 32, bold: true, color: C.blue }, after: 240 });
fp("Rencana Induk Penelitian dan Pengabdian kepada Masyarakat Fakultas Kedokteran dan Kesehatan ITS 2026–2030 ditetapkan dengan Keputusan Dekan Nomor [isi: nomor SK] tanggal [isi: tanggal].", { align: AlignmentType.JUSTIFIED, after: 240 });
{
  const ws = [2000, 2900, 2600, 1571];
  const rows = [["Peran", "Nama", "Jabatan", "Tanda tangan"],
    ["Disusun oleh", "[isi: ketua tim penyusun]", "Tim Penyusun", ""],
    ["Diperiksa oleh", "Prof. Dr. Ir. Adhi Dharma Wibawa, S.T., M.T.", "Penjaminan Mutu Fakultas", ""],
    ["Disetujui oleh", "dr. Endah Indriastuti, Sp.PK", "Kaprodi Kedokteran", ""],
    ["", "dr. Rahmah Yasinta Rangkuti, M.Biomed, Sp.A", "Kaprodi Pendidikan Profesi Dokter", ""],
    ["", "Dr. Shoffi Izza Sabilla, S.Kom.", "Kaprodi Teknologi Kedokteran", ""],
    ["Ditetapkan oleh", "dr. Lukman Hakim, M.Kes., Sp.U(K), Ph.D.", "Dekan", ""]];
  front.push(new Table({ width: { size: CW, type: WidthType.DXA }, columnWidths: ws, layout: TableLayoutType.FIXED, rows: rows.map((r, ri) => new TableRow({ height: { value: ri ? 620 : 380, rule: "atLeast" }, children: r.map((c, i) => cell(c, ws[i], ri === 0 ? { bold: true, color: "FFFFFF", fill: C.blue } : { valign: VerticalAlign.CENTER })) })) }));
}
fp("", { after: 360 });
fp("Riwayat Dokumen", { run: { font: HEAD, size: 26, bold: true, color: C.blue }, after: 120 });
{
  const ws = [2200, 2200, 4671];
  const rows = [["Edisi / versi", "Tanggal", "Keterangan"],
    ["Edisi 1", "September 2023", "Roadmap Penelitian dan PkM FKK ITS 2023–2025"],
    ["Edisi 2, versi 0.9", "24 November 2026", "Draf untuk konsultasi dosen dan tahap 1 ke Dekanat"],
    ["Edisi 2, versi 1.0", "[isi]", "Ditetapkan dengan SK Dekan setelah pengisian agenda dosen dan uji publik"]];
  front.push(new Table({ width: { size: CW, type: WidthType.DXA }, columnWidths: ws, layout: TableLayoutType.FIXED, rows: rows.map((r, ri) => new TableRow({ children: r.map((c, i) => cell(c, ws[i], ri === 0 ? { bold: true, color: "FFFFFF", fill: C.blue } : {})) })) }));
}
front.push(new Paragraph({ children: [new PageBreak()] }));
// preface
fp("Kata Pengantar", { run: { font: HEAD, size: 32, bold: true, color: C.blue }, after: 240 });
fp("[isi: kata pengantar Dekan; draf berikut dapat disesuaikan]", { after: 160 });
fp("Rencana induk ini disusun untuk memberi arah bersama bagi penelitian dan pengabdian kepada masyarakat di Fakultas Kedokteran dan Kesehatan ITS selama lima tahun ke depan. Sebagai fakultas yang lahir di dalam institut teknologi, kami memilih kedokteran pencegahan yang dibuktikan dengan teknologi sebagai identitas keilmuan, dan menuangkannya dalam satu pohon penelitian yang dipakai bersama oleh ketiga program studi.", { align: AlignmentType.JUSTIFIED });
fp("Dokumen ini tidak disusun dari atas saja. Isinya akan dilengkapi oleh agenda setiap dosen, ditelaah oleh setiap program studi, dan diuji bersama mitra kami di Dinas Kesehatan, rumah sakit pendidikan, dan masyarakat Desa Binaan. Kami mengucapkan terima kasih kepada seluruh dosen, tenaga kependidikan, mahasiswa, dan mitra yang telah dan akan memberi masukan.", { align: AlignmentType.JUSTIFIED });
fp("Surabaya, [isi: tanggal]", { before: 240, after: 60 });
fp("Dekan Fakultas Kedokteran dan Kesehatan ITS", { after: 720 });
fp("dr. Lukman Hakim, M.Kes., Sp.U(K), Ph.D.", { run: { bold: true } });
front.push(new Paragraph({ children: [new PageBreak()] }));
front.push(new Paragraph({ children: [new TextRun({ text: "Daftar Isi", font: HEAD, size: 32, bold: true, color: C.blue })], spacing: { after: 200 } }));
front.push(new TableOfContents("Daftar Isi", { hyperlink: true, headingStyleRange: "1-2" }));
front.push(new Paragraph({ children: [new PageBreak()] }));
front.push(new Paragraph({ children: [new TextRun({ text: "Daftar Gambar", font: HEAD, size: 32, bold: true, color: C.blue })], spacing: { after: 200 } }));
front.push(new TableOfContents("Daftar Gambar", { hyperlink: true, captionLabelIncludingNumbers: "Gambar" }));
front.push(new Paragraph({ children: [], spacing: { after: 400 } }));
front.push(new Paragraph({ children: [new TextRun({ text: "Daftar Tabel", font: HEAD, size: 32, bold: true, color: C.blue })], spacing: { after: 200 }, pageBreakBefore: true }));
front.push(new TableOfContents("Daftar Tabel", { hyperlink: true, captionLabelIncludingNumbers: "Tabel" }));

// ====================================================================== DOCUMENT
const footer = (fmt) => new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ children: [PageNumber.CURRENT], size: 18, color: C.muted })] })] });
const header = new Header({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: C.line, space: 4 } },
  children: [new TextRun({ text: "Rencana Induk Penelitian dan PkM FKK ITS 2026–2030 · Draf konsultasi", size: 16, color: C.muted })] })] });
const page = { size: { width: 11906, height: 16838 }, margin: { top: 1418, bottom: 1300, left: 1418, right: 1417, header: 700, footer: 600 } };

const doc = new Document({
  creator: "FKK ITS", title: "Rencana Induk Penelitian dan PkM FKK ITS 2026–2030", description: "Pohon penelitian serta peta jalan penelitian dan PkM — draf konsultasi",
  features: { updateFields: true },
  styles: {
    default: { document: { run: { font: BODY, size: 22, color: C.ink } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true, run: { font: HEAD, size: 34, bold: true, color: C.blue }, paragraph: { spacing: { before: 0, after: 240 }, keepNext: true, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true, run: { font: HEAD, size: 27, bold: true, color: C.ink }, paragraph: { spacing: { before: 300, after: 120 }, keepNext: true, outlineLevel: 1 } },
      { id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true, run: { font: BODY, size: 23, bold: true, color: C.blue }, paragraph: { spacing: { before: 200, after: 80 }, keepNext: true, outlineLevel: 2 } },
      { id: "TOC1", name: "toc 1", basedOn: "Normal", next: "Normal", run: { font: BODY, size: 22, bold: true }, paragraph: { spacing: { before: 120, after: 40 }, tabStops: [{ type: TabStopType.RIGHT, position: 9061, leader: "dot" }] } },
      { id: "TOC2", name: "toc 2", basedOn: "Normal", next: "Normal", run: { font: BODY, size: 21 }, paragraph: { spacing: { after: 30 }, indent: { left: 360 }, tabStops: [{ type: TabStopType.RIGHT, position: 9061, leader: "dot" }] } },
      { id: "TableofFigures", name: "table of figures", basedOn: "Normal", next: "Normal", run: { font: BODY, size: 20 }, paragraph: { spacing: { after: 50 }, indent: { left: 0 }, tabStops: [{ type: TabStopType.RIGHT, position: 9061, leader: "dot" }] } },
      { id: "Caption", name: "Caption", basedOn: "Normal", next: "Normal", quickFormat: true, run: { font: BODY, size: 18, italics: false, color: C.muted }, paragraph: { spacing: { before: 60, after: 160 } } },
    ],
  },
  numbering: { config: [
    { reference: "bul", levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 400, hanging: 260 } } } },
                                  { level: 1, format: LevelFormat.BULLET, text: "–", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 800, hanging: 260 } } } }] },
    { reference: "num", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 420, hanging: 300 } } } }] },
  ] },
  sections: [
    { properties: { page }, children: cover },
    { properties: { page: { ...page, pageNumbers: { start: 1, formatType: NumberFormat.LOWER_ROMAN } } }, footers: { default: footer() }, children: front },
    { properties: { page: { ...page, pageNumbers: { start: 1, formatType: NumberFormat.DECIMAL } } }, headers: { default: header }, footers: { default: footer() }, children: body },
  ],
});
Packer.toBuffer(doc).then((buf) => { fs.writeFileSync(OUT, buf); if (process.env.TOC_JSON) fs.writeFileSync(process.env.TOC_JSON, JSON.stringify(TOCJ)); console.log("docx ok", OUT, "gambar", nFig, "tabel", nTab); });
