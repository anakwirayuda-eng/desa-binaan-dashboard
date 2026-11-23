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
| 5 | Paparan PPT | `node tools/pohon/build_ppt.js output/figures output/PAPARAN_POHON_PENELITIAN_FKK_ITS.pptx` |

Catatan:
- Langkah 2–3 hanya perlu diulang bila isi galeri berubah. Halaman galeri yang terbit (privat) ada di <https://claude.ai/artifact/WZfZV3hCcnhfuYw9ufwf3i>; berkas HTML di repo adalah sumbernya.
- Isi PPT ditulis langsung di `build_ppt.js` (teks, tabel, angka). Bila angka di dokumen berubah, ubah juga di sana.
- Huruf PDF: Inter dan JetBrains Mono bila terpasang; bila tidak, peramban memakai huruf pengganti.
- Huruf PPT: Cambria (judul) dan Calibri (isi), tersedia di semua Office.
- Instrumen kini punya tab REKAP PLATFORM dan kolom kebutuhan mitra (AB). Uji ulang dengan `--test` lalu hitung ulang di LibreOffice; target nol galat (2.060 rumus per 23 November 2026).
- Peta hibah FKK ITS 2027–2030 dibangun terpisah di folder kerja lokal (bukan repo ini), karena memuat data turunan pihak ketiga dan daftar dosen.
