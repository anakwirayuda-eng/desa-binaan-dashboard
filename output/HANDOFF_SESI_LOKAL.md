# Serah-terima — Pohon Penelitian & Peta Jalan FKK ITS

*Ditulis 23 November 2026 untuk melanjutkan pekerjaan di sesi lain (lokal). Diperbarui 23 November 2026 malam oleh sesi lokal (§5.6 Tekdok setara). Baca seluruhnya sebelum mengubah apa pun.*

## 1. Apa proyek ini

Menyusun **Pohon Penelitian dan Peta Jalan Penelitian FKK ITS 2026–2030** untuk tiga prodi (Sarjana Kedokteran, Pendidikan Profesi Dokter, Teknologi Kedokteran), sebagai bahan RIP fakultas dan bukti akreditasi (LAM-PTKes kriteria C.7/C.8). Statusnya **draf kerja, belum diajukan ke Dekanat**.

- Branch kerja: `claude/fkk-its-research-tree-voquex` · PR #1 (draft) ke `main`.
- Sumber kebenaran isi: **`output/POHON_PENELITIAN_FKK_ITS.md`**. PDF, PPT, dan galeri adalah turunannya.

## 2. Berkas

| Berkas | Isi | Dibangun dengan |
|---|---|---|
| `output/POHON_PENELITIAN_FKK_ITS.md` | Dokumen kerja lengkap (§0–§12) | ditulis langsung |
| `output/POHON_PENELITIAN_FKK_ITS.pdf` | Versi cetak A4, 50 halaman, enam gambar | `tools/pohon/build_pdf.py` + `html_to_pdf.js` |
| `output/PAPARAN_POHON_PENELITIAN_FKK_ITS.pptx` | 17 slide + catatan pembicara untuk tim kecil & tahap 1 | `tools/pohon/build_ppt.js` (isi slide ditulis di skrip ini) |
| `output/INSTRUMEN_AGENDA_PENELITIAN_FKK_ITS.xlsx` | Instrumen isian agenda penelitian untuk semua dosen | `output/build_instrumen_agenda.py` |
| `output/BENTUK_POHON_GALERI.html` | Galeri bentuk pohon: enam pola, padanan prodi, usulan pohon, matriks dua arah + tulang ikan Tekdok, poster A3, lajur, aturan ukuran | `tools/pohon/build_galeri.py` |
| `output/figures/fig_*.png` | Enam gambar dari galeri (dipakai PDF & PPT) | `tools/pohon/galeri_figs.js` |
| `tools/pohon/README.md` | Cara membangun ulang semuanya | — |

Galeri juga terbit sebagai halaman privat milik pengguna: <https://claude.ai/artifact/WZfZV3hCcnhfuYw9ufwf3i>. **Halaman terbit itu belum memuat bagian §5.6**; berkas HTML di repo sudah.

## 3. Keputusan rancangan yang sudah diambil

- **Matriks 5 Pilar × 5 Platform** + Wahana W0–W4. **K1 direvisi (disetujui pengguna 23 Nov):** platform ikut dipublikasikan; matriks dibaca dua arah — baris = peta jalan Prodi Kedokteran & Profesi, kolom = peta jalan Prodi Teknologi Kedokteran (TKT 1–9, W0→W4), tulang ikan Tekdok per platform berkepala sama "2030 Kedokteran Pencegahan 4.0" (§5.6). Kode tetap: topik `1.1–5.4`, platform `T1–T5`, wahana `W0–W4`. Dipakai identik di dokumen, instrumen, galeri, PPT.
- **Pohon fakultas adalah induk RIP Prodi Kedokteran & Profesi Dokter 2026–2030** (draf milik prodi, dipasok pengguna). Tujuh topik prodi dipadankan: PTM→P1, PM→P3, RNA+KSR→P2, topik ke-7→P5, Basic Science→akar ilmu, Digital Health→platform T3+T5; P4 tanpa topik prodi (dipimpin Tekdok lewat T4). Angka luaran dari tabel RIP prodi: 197 (2023–2025), 50 (2026). Detail di §5.5.
- **Nama batang diusulkan *Kedokteran Pencegahan 4.0*** (sama dengan RIP prodi). **Periode sama dengan RIP prodi**: 2023–2025 · 2026–2028 · 2029–2030.
- **Bentuk visual**: pohon (apa) + matriks (siapa dengan siapa) + lajur (kapan) di tingkat fakultas, dalam satu poster A3; tulang ikan tetap di tingkat prodi. Batang tiga pilin = tiga prodi. Aturan ukuran: 3 tingkat di gambar, ≤4 ranting per pilar, ranting tanpa tim digambar sebagai tunas.
- **Milestone (§12)**: pengajuan dua tahap — tahap 1 kerangka + surat edaran pengisian (±7–9 Des 2026, titik putus 11 Des), tahap 2 draf final (±3–5 Feb 2027), SK sebelum libur 8–12 Mar 2027.

## 4. Pekerjaan terbuka (urut prioritas)

1. **Data yang diminta dari Kaprodi Tekdok** (§10 butir 1a, 1e): daftar dosen ber-homebase Tekdok; judul & luaran 2023–2026 per platform; TKT saat ini; peta jalan Tekdok bila ada; lembaga akreditornya. Dengan data ini tabel T1–T5 dan tulang ikan §5.6 bisa diisi.
2. **Bahan Oktober 2026 di folder lokal `D:\Dev\Rancangan Induk Penelitian FKK ITS`** belum dipakai dokumen ini (menunggu keputusan pengguna): audit Roadmap FKK 2023–2025 (`data/audit_rip_lama.md`; PDF aslinya ada di komputer pengguna) dan peta transisi 25 rumpun lama — menjawab §10 butir 1b; roster Tekdok 14 record dengan bukti publik (`data/dosen_teknologi_kedokteran.json`, `catatan_medtech.md`); pemetaan 45 nama. Data personel di sana memuat **dr. Fira Soraya, Sp.PA** — kandidat kuat "dr. Fira" (PIC KSR), bukan dr. Fatimah; tetap konfirmasi ke pengguna (§10 butir 1d).
3. **Halaman galeri terbit** perlu diperbarui dari `output/BENTUK_POHON_GALERI.html` bila pengguna ingin bagian §5.6 tampil di sana.
4. **Keputusan ranting onkologi** setelah rekap instrumen (Januari 2027): ranting P1 yang paling sedikit timnya diganti "Skrining & deteksi dini kanker" (§5.5).
5. **Tindakan pengguna**: unggah instrumen ke Google Drive → buka sebagai Google Sheets → isi tiga sel kuning di PETUNJUK → bagikan dengan akses Editor; jadwalkan review tim kecil 30 Nov–4 Des.

## 5. Aturan kerja yang wajib dijaga

- **Jangan mengarang** nama, angka bibliometrik, ambang akreditasi, nominal hibah, prevalensi, atau target angka. Yang belum terverifikasi ditandai dan dimasukkan ke §10.
- Informasi tentang orang: hanya informasi profesional yang dipublikasikan atau dipasok pengguna.
- **Berkas internal mentah** (docx/pptx RIP prodi, panduan, draf indikator) ada di komputer pengguna dan **tidak** dimasukkan ke repo; repo hanya memuat ringkasan dan angka yang dikutip dengan sumber tabelnya.
- Setelah mengubah dokumen `.md`, bangun ulang PDF; bila angka atau keputusan berubah, perbarui juga `build_ppt.js` lalu bangun ulang PPT (lihat `tools/pohon/README.md`).
- Instrumen: setelah mengubah generator, bangun ulang dan pastikan nol galat rumus (rekalkulasi LibreOffice), uji dengan `--test`.
- Bekerja di **satu sesi pada satu waktu** dan selalu `git pull` sebelum mulai. Sesi cloud sebelumnya hanya memantau PR #1 (cek berkala) dan tidak mendorong perubahan tanpa permintaan.
- Lingkungan lokal: prasyarat sudah terpasang (`tools/pohon/node_modules`, Chromium Playwright 1.63). Di Windows jalankan Python dengan `python -X utf8` (skrip galeri menulis tanpa encoding eksplisit). Tulis `doc.tmp.html` di luar repo. LibreOffice merender butir bernomor slide penutup sebagai "1." semua; PowerPoint menomori benar.
- Bahasa: Indonesia; tulisan untuk pimpinan fakultas — lugas, kalimat pendek, tanpa jargon teknis yang tidak perlu.
