# Print-to-PDF Executive Audit

Tanggal audit: 6 April 2026  
Workspace: `D:\Dev\Desa Binaan`

## Tujuan

Memisahkan dua kebutuhan yang berbeda:

- `Executive PDF`: ringkas, mudah dibaca pimpinan, fokus pada keputusan dan rencana kerja.
- `Appendix Mode`: detail teknis untuk dosen pembimbing, reviewer, dan mitra implementasi.

## Temuan sebelum patch

- Print mode masih membawa terlalu banyak detail operasional ke PDF.
- Forecast harian 20 hari, deep dive tiap puskesmas, toolkit visual, rubrik scoring panjang, dan bibliografi ikut memperpanjang output cetak.
- Belum ada cara eksplisit untuk membuka detail teknis tanpa membuat halaman utama terasa padat.

## Keputusan desain

### Yang dipertahankan di PDF eksekutif

- Ringkasan eksekutif print-only
- Kinerja komparatif utama
- Blueprint aksi
- Implementation plan mingguan
- Gantt 20 hari
- Kurikulum dan proyeksi kerja dalam versi ringkas
- Scoring matrix inti dan narasi keputusan

### Yang dikeluarkan dari PDF eksekutif

- Deep dive detail per puskesmas
- Forecast harian penuh
- Toolkit visual, foto referensi, bibliografi panjang
- Contribution breakdown detail dan rubric scoring penuh
- Appendix teknis

### Yang dipindah ke Appendix Mode

- RACI matrix
- Swimlane 4 minggu antar aktor
- Asumsi operasional terelaborasi
- Detail metodologi pemilihan lokasi, perancangan rotasi, scoring, dan evaluasi

## Implementasi

- Menambah toolbar ringan untuk `Appendix Mode` dan `Cetak PDF Eksekutif`
- Menambah blok `executive-print-only` untuk ringkasan print
- Menambah section appendix terpisah di akhir halaman
- Menambahkan data appendix dan executive summary ke `app/js/data.js`
- Menambahkan renderer appendix + toggle mode ke `app/js/app.js`
- Menambahkan CSS print untuk menyembunyikan panel berat secara default

## Verifikasi

- `node --check app/js/app.js` -> lolos
- `node --check app/js/data.js` -> lolos
- Render headless PDF lama: `output/executive-audit-current.pdf` -> `2,443,773` bytes
- Render headless PDF lokal setelah patch: `output/executive-audit-local.pdf` -> `1,042,248` bytes

Catatan: ukuran file bukan satu-satunya indikator kualitas, tetapi penurunan ini konsisten dengan berkurangnya panel berat pada versi eksekutif.
