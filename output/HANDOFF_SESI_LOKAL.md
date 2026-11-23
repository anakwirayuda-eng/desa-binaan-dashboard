# Serah-terima — Pohon Penelitian & Peta Jalan FKK ITS

*Ditulis 23 November 2026 untuk melanjutkan pekerjaan di sesi lain (lokal). Diperbarui 23 November 2026 malam oleh sesi lokal: §5.6 Tekdok setara, lalu **revisi terpadu** dari riset sumber primer, red team, peta hibah 2027–2030, dan inventaris dosen. Baca seluruhnya sebelum mengubah apa pun.*

## 1. Apa proyek ini

Menyusun **Pohon Penelitian dan Peta Jalan Penelitian FKK ITS 2026–2030** untuk tiga prodi (Sarjana Kedokteran, Pendidikan Profesi Dokter, Teknologi Kedokteran), sebagai bahan RIP fakultas dan bukti akreditasi. Akreditor sudah pasti: **LAM-PTKes** untuk Kedokteran dan Profesi (butir 5.5 penelitian, 5.6 PkM), **BAN-PT** untuk Teknologi Kedokteran (IAPS 5.1). Statusnya **draf kerja, belum diajukan ke Dekanat**.

- Branch kerja: `claude/fkk-its-research-tree-voquex` · PR #1 (draft) ke `main`.
- Sumber kebenaran isi: **`output/POHON_PENELITIAN_FKK_ITS.md`**. PDF, PPT, dan galeri adalah turunannya.
- ⚠ **Repositori ini PUBLIK**, sedangkan §4 dokumen memuat penilaian kapasitas per orang. Keputusan menjadikannya privat atau memisahkan naskah kerja dari naskah edaran ada di tangan pengguna (§10 butir 1g). Jangan menambah data pribadi atau dokumen internal mentah ke repo.

## 2. Berkas

| Berkas | Isi | Dibangun dengan |
|---|---|---|
| `output/POHON_PENELITIAN_FKK_ITS.md` | Dokumen kerja lengkap (§0–§12, termasuk §5.4a evaluasi edisi 1, §5.7 pembiayaan, §8.6 tata kelola bertahap) | ditulis langsung |
| `output/POHON_PENELITIAN_FKK_ITS.pdf` | Versi cetak A4, ±62 halaman, tujuh gambar | `tools/pohon/build_pdf.py` + `html_to_pdf.js` |
| `output/PAPARAN_POHON_PENELITIAN_FKK_ITS.pptx` | 21 slide + catatan pembicara untuk tim kecil & tahap 1 | `tools/pohon/build_ppt.js` (isi slide ditulis di skrip ini) |
| `output/INSTRUMEN_AGENDA_PENELITIAN_FKK_ITS.xlsx` | Instrumen isian agenda penelitian; 42 nama, 9 tab termasuk REKAP PLATFORM, 2.060 rumus | `output/build_instrumen_agenda.py` |
| `output/BENTUK_POHON_GALERI.html` | Galeri: enam pola, padanan prodi, usulan pohon, matriks dua arah, tulang ikan dan lajur bergerbang Tekdok, poster A3, lajur, aturan ukuran | `tools/pohon/build_galeri.py` |
| `output/figures/fig_*.png` | Tujuh gambar dari galeri (dipakai PDF & PPT) | `tools/pohon/galeri_figs.js` |
| `tools/pohon/README.md` | Cara membangun ulang semuanya | — |

**Di luar repo** (folder kerja `D:\Dev\Rancangan Induk Penelitian FKK ITS`): `hibah/Peta_Hibah_FKK_ITS_2027-2030.xlsx` + `hibah/build_peta_hibah_fkk.py` + `hibah/data/*.json` (276 hibah, akses per dosen; dibangun dari berkas Peta Hibah Dosen 2027 di Downloads); `riset_eksternal/` (laporan riset Codex/GPT-6.2 Astra, red team Antigravity/Gemini, prompt); `data/` (audit Roadmap FKK 2023–2025, roster publik). Galeri juga terbit sebagai halaman privat: <https://claude.ai/artifact/WZfZV3hCcnhfuYw9ufwf3i> — **belum memuat revisi 23 November**.

## 3. Keputusan rancangan yang sudah diambil

- **Matriks 5 Pilar × 5 Platform** + Wahana W0–W4; kode `1.1–5.4`, `T1–T5`, `W0–W4`, `T0`, `9.9` dipakai identik di semua turunan. **K1 (disetujui pengguna):** platform dipublikasikan; matriks dibaca dua arah; **satu proyek, satu identitas** di register fakultas (cakupan tema · prodi pemimpin · kontribusi terverifikasi; NPD/NPM per homebase; luaran dideduplikasi).
- **Tiga lembar pandang prodi** dari satu register: Sarjana dan Profesi membaca baris (lembar berbeda), Tekdok membaca kolom dengan pertanyaan keilmuan per platform dan TKT per produk/versi.
- **Usulan yang menunggu keputusan Dekanat** (ditulis di dokumen sebagai usulan): K2 satu pagu dua jenis belanja (platform modal, pilar operasional); dua status platform (matang T1/T3/T4, inkubasi T2/T5, ditinjau 2028); ketua dan wakil lintas prodi per pilar/platform, satu orang maksimal satu peran; norma kredit berimbang; K6 wilayah pembanding sebagai giliran bertahap; bentuk visual Tekdok dipilih Kaprodi Tekdok (tulang ikan atau lajur bergerbang).
- **Pohon fakultas adalah induk RIP Prodi Kedokteran & Profesi** (padanan tujuh topik, §5.5); nama batang *Kedokteran Pencegahan 4.0*; periode 2023–2025 · 2026–2028 · 2029–2030.
- **Milestone (§12)**: tahap 1 ±7–9 Des 2026 (titik putus 11 Des), tahap 2 ±3–5 Feb 2027, SK sebelum 8–12 Mar 2027; tujuh risiko dan pencegahannya sudah masuk jadwal.

## 4. Pekerjaan terbuka (urut prioritas)

1. **Keputusan pengguna soal repositori publik** (§10 butir 1g) sebelum dokumen beredar lebih luas.
2. **Tenggat dekat:** putuskan pernyataan minat **PUI-PT 2027 (15 Des 2026)** — cek dulu apakah pusat riset yang dimaksud pernah didanai; FAIMER 17 Des; AMEE 15 Jan (§5.7).
3. **Data Kaprodi Tekdok** (§10 butir 1e) dan konfirmasi *homebase* (§10 butir 11: rekap SRG Jan 2026 mencatat empat dosen di Teknik Biomedik FTEIC dan dua di Teknik Mesin FTIRS). Siapkan draf pra-isi tabel T1–T5 dari data publik untuk dikoreksi Kaprodi.
4. **Evaluasi per proyek Roadmap FKK 2023–2025** (lima status) oleh Unit Penelitian + Kaprodi, ≤ 8 Jan 2027 (§5.4a).
5. **Tiga pengajar baru** di kalender Gasal 2026/27 ditambahkan Kaprodi ke DAFTAR DOSEN instrumen (nama sengaja tidak ditulis di repo publik; ada di inventaris lokal).
6. **Peta hibah:** unggah ke Google Sheets dan bagikan ke dosen; dosen memperbarui jabatan (jabatan Kedokteran/Profesi diisi awal "Tenaga Pengajar" per surat formasi Sep 2024).
7. **Halaman galeri terbit** diperbarui dari `output/BENTUK_POHON_GALERI.html` bila pengguna setuju.
8. **Keputusan ranting onkologi** setelah rekap instrumen Januari 2027 (§5.5).
9. **Tindakan pengguna:** unggah instrumen ke Google Sheets, isi tiga sel kuning PETUNJUK, bagikan; jadwalkan bilateral 23–27 Nov dan review tim kecil 30 Nov–4 Des.

## 5. Aturan kerja yang wajib dijaga

- **Jangan mengarang** nama, angka bibliometrik, ambang akreditasi, nominal hibah, prevalensi, atau target angka. Yang belum terverifikasi ditandai dan dimasukkan ke §10. Keluaran agen AI lain (Codex, Antigravity) diperlakukan sebagai bahan: klaim penting diperiksa ulang ke sumber primer sebelum masuk dokumen (9 klaim kunci sudah diperiksa 23 Nov: 7 terkonfirmasi, 2 dikoreksi).
- Informasi tentang orang: hanya informasi profesional yang dipublikasikan atau dipasok pengguna. Repo publik: jangan menulis NIP/NIDN/kontak, dan pertimbangkan nama dari dokumen internal sebelum menambahkannya.
- **Berkas internal mentah** (docx/pptx RIP prodi, SK, kalender, panduan, draf indikator) ada di komputer pengguna dan **tidak** dimasukkan ke repo; repo hanya memuat ringkasan dan angka yang dikutip dengan sumbernya.
- Setelah mengubah dokumen `.md`, bangun ulang PDF; bila angka atau keputusan berubah, perbarui juga `build_ppt.js` lalu bangun ulang PPT. Jangkar gambar di `build_pdf.py` bergantung pada kalimat tertentu di §5.5–§5.6.
- Instrumen dan peta hibah: setelah mengubah generator, bangun ulang dan pastikan nol galat rumus (rekalkulasi LibreOffice), uji instrumen dengan `--test`.
- Bekerja di **satu sesi pada satu waktu** dan selalu `git pull` sebelum mulai.
- Lingkungan lokal: prasyarat sudah terpasang (`tools/pohon/node_modules`, Chromium Playwright 1.63, LibreOffice). Di Windows jalankan Python dengan `python -X utf8`. Tulis `doc.tmp.html` di luar repo. LibreOffice merender butir bernomor slide penutup sebagai "1." semua; PowerPoint menomori benar.
- Bahasa: Indonesia; tulisan untuk pimpinan fakultas — lugas, kalimat pendek, tanpa jargon teknis yang tidak perlu.
