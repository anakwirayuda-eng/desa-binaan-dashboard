# Alat pembangun — Pohon Penelitian FKK ITS

Semua berkas di `output/` dapat dibangun ulang dari sumbernya dengan skrip di folder ini.
Sumber kebenaran isi adalah **`output/POHON_PENELITIAN_FKK_ITS.md`**; PDF dan PPT turunannya.

## Persiapan (sekali)

```bash
# Python 3.10+ (di Windows jalankan dengan `python -X utf8`)
python3 -m pip install markdown openpyxl
# Node 18+ (dari folder ini)
cd tools/pohon
npm install
npx playwright install chromium
```

LibreOffice diperlukan hanya untuk menghitung ulang rumus instrumen (langkah 1, opsional).

## Urutan membangun ulang

Jalankan dari akar repo.

| # | Hasil | Perintah |
|---|---|---|
| 1 | Instrumen isian dosen (`.xlsx`) | `python3 output/build_instrumen_agenda.py output/INSTRUMEN_AGENDA_PENELITIAN_FKK_ITS.xlsx` — tambahkan `--test` untuk data uji. Setelah itu buka sekali di Excel/LibreOffice lalu simpan, agar nilai rumus tersimpan |
| 2 | Halaman galeri bentuk pohon (`.html`) | `python3 tools/pohon/build_galeri.py output/BENTUK_POHON_GALERI.html` |
| 3 | Tujuh gambar (`output/figures/*.png`) | `node tools/pohon/galeri_figs.js output/BENTUK_POHON_GALERI.html output/figures` |
| 4 | PDF dokumen | `python3 tools/pohon/build_pdf.py output/POHON_PENELITIAN_FKK_ITS.md doc.tmp.html "$PWD/output/figures"` lalu `node tools/pohon/html_to_pdf.js "$PWD/doc.tmp.html" output/POHON_PENELITIAN_FKK_ITS.pdf` |
| 4c | PDF naskah edaran | sama seperti 4b dengan `output/NASKAH_EDARAN_POHON_PENELITIAN_FKK_ITS.md` dan label footer "Naskah edaran Pohon Penelitian FKK ITS · draf konsultasi, belum disahkan" |
| 4b | PDF Peta Jalan PkM | `python3 tools/pohon/build_pdf.py output/PETA_JALAN_PKM_FKK_ITS.md pkm.tmp.html "$PWD/output/figures"` lalu `node tools/pohon/html_to_pdf.js "$PWD/pkm.tmp.html" output/PETA_JALAN_PKM_FKK_ITS.pdf "Rancangan Peta Jalan PkM FKK ITS · draf kerja, bukan dokumen resmi"` |
| 5 | Paparan PPT | `node tools/pohon/build_ppt.js output/figures output/PAPARAN_POHON_PENELITIAN_FKK_ITS.pptx` |

Catatan:
- Langkah 2–3 hanya perlu diulang bila isi galeri berubah. Halaman galeri yang terbit (privat) ada di <https://claude.ai/artifact/WZfZV3hCcnhfuYw9ufwf3i>; berkas HTML di repo adalah sumbernya.
- Isi PPT ditulis langsung di `build_ppt.js` (teks, tabel, angka). Bila angka di dokumen berubah, ubah juga di sana.
- Huruf PDF: Inter dan JetBrains Mono bila terpasang; bila tidak, peramban memakai huruf pengganti.
- Huruf PPT: Cambria (judul) dan Calibri (isi), tersedia di semua Office.
- Instrumen kini punya tab REKAP PLATFORM dan kolom kebutuhan mitra (AB). Uji ulang dengan `--test` lalu hitung ulang di LibreOffice; target nol galat (2.386 rumus per 24 November 2026, setelah kolom ID proyek, jenis kegiatan, anak tangga PkM, tag sekunder, dan mata kuliah ditambahkan). Simpan ulang lewat LibreOffice headless (`soffice --headless --calc --convert-to xlsx:"Calc MS Excel 2007 XML"`) agar nilai rumus tersimpan; validasi data dan format bersyarat tetap terjaga.
- Peta hibah FKK ITS 2027–2030 dibangun terpisah di folder kerja lokal (bukan repo ini), karena memuat data turunan pihak ketiga dan daftar dosen.
