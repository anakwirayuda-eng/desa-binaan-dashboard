# Deepthink Triage

Generated: 2026-04-06
Context: Dashboard Desa Binaan FKK ITS x Kota Mojokerto

## Why Triage First

Masukan "deepthink" tidak boleh dimasukkan mentah-mentah karena dashboard ini bukan hanya presentasi visual, tetapi akan berkembang menjadi:

1. dashboard analisis puskesmas,
2. proposal implementation plan,
3. peta kurikulum blok Community Medicine (CM) koas,
4. proyeksi kerja mahasiswa FKK ITS di lapangan,
5. narasi akademik yang harus selaras dengan SKDI 2012 dan pelengkap standar kurikulum lain yang relevan.

Artinya, setiap saran harus disaring berdasarkan:

- akurasi data,
- integritas narasi akademik,
- kecocokan dengan alur presentasi,
- relevansi terhadap implementasi CM koas,
- cost vs impact untuk waktu pengerjaan.

## Triage Buckets

### A. Implement Now

Ini adalah item yang aman, low-risk, dan memperbaiki kebenaran atau usability tanpa mengubah arsitektur narasi utama.

1. `0` menjadi `null` untuk data Kranggan di chart komparatif.
Alasan:
`0` menyesatkan karena terbaca sebagai performa buruk, padahal kasusnya adalah data belum tersedia.

2. Hardening aksesibilitas kartu puskesmas.
Alasan:
Kartu yang bisa diklik seharusnya keyboard-accessible dan terbaca screen reader.

3. Resize chart saat tab puskesmas berpindah.
Alasan:
Ini mencegah glitch render saat canvas berada dalam container yang sebelumnya tersembunyi.

4. Optimasi navbar active-state.
Alasan:
Masalah ini teknis dan tidak mengubah isi presentasi, jadi layak diprioritaskan.

5. Sticky first column pada tabel scoring.
Alasan:
Ini membantu pembacaan di HP tanpa mengubah data atau narasi.

6. Print stylesheet.
Alasan:
High-value untuk birokrasi, dosen, dan reviewer yang hampir pasti ingin print atau save as PDF.

### B. Adapt After CM / SKDI Sections Exist

Ini item yang bagus, tetapi tidak boleh dipasang sebelum section baru tentang implementation plan, kurikulum, dan proyeksi mahasiswa masuk.

1. "Closing the loop" COM-B dan MINDSPACE ke Mentikan.
Keputusan:
Jangan ditaruh hanya sebagai paragraf kosmetik di kartu rekomendasi.

Harus dipecah menjadi:
- diagnosis masalah perilaku,
- tuas intervensi,
- bentuk kegiatan mahasiswa CM koas,
- output lapangan,
- indikator evaluasi.

2. Narasi "Mentikan sebagai kanvas sempurna".
Keputusan:
Boleh dipakai, tetapi harus diikat ke feasibility akademik.

Artinya nanti perlu menjawab:
- kompetensi apa yang bisa dicapai mahasiswa,
- aktivitas apa yang realistis dalam blok CM,
- deliverable apa yang bisa selesai dalam durasi koas,
- bagaimana hubungannya dengan masalah SDoH dan inovasi digital.

3. Penguatan storytelling rekomendasi akhir.
Keputusan:
Perlu menunggu tiga section baru:
- `Implementation Plan`
- `Kurikulum & Mapping Kompetensi`
- `Proyeksi Kerja Mahasiswa`

Setelah itu baru hasil rekomendasi Mentikan akan terasa legitimate, bukan sekadar pilihan visual.

4. Revisi scoring matrix.
Keputusan:
Saat implementation plan masuk, bobot penilaian mungkin perlu ditambah atau displit.

Kandidat kriteria tambahan:
- kelayakan sebagai wahana pembelajaran CM,
- kesiapan mitra lokal,
- peluang output yang bisa diselesaikan mahasiswa,
- potensi kesinambungan pasca-rotasi.

### C. Optional / Nice To Have

Ini bagus untuk polish, tapi bukan fondasi.

1. Number counter animation.
Nilai:
Bagus untuk efek presentasi.
Catatan:
Jangan didahulukan dibanding print mode, accessibility, dan section akademik.

2. Kiosk / presentation mode dengan tombol `P`.
Nilai:
Berguna saat pitching live.
Catatan:
Tidak wajib untuk versi akademik atau versi cetak.

3. Efek visual tambahan di radar chart.
Nilai:
Boleh, selama tidak mengganggu keterbacaan.
Catatan:
Chart bukan sumber keputusan utama; tabel scoring dan narasi metodologis tetap harus lebih kuat.

### D. Reject or Reframe

Ini bagian yang sebaiknya tidak diadopsi apa adanya.

1. Jangan mengubah dashboard menjadi terlalu "pitch deck" sampai kesan akademik hilang.
Dashboard ini harus tetap terasa credible untuk Dinkes, kampus, dan evaluasi pembelajaran.

2. Jangan terlalu mengandalkan radar chart untuk membuktikan rekomendasi.
Radar chart sebaiknya hanya visual summary. Keputusan final harus tetap bertumpu pada:
- scoring matrix,
- analisis SWOT,
- feasibility implementasi,
- mapping kompetensi mahasiswa.

3. Jangan menambah gimmick sebelum arsitektur konten lengkap.
Jika implementation plan dan kurikulum belum masuk, animasi tambahan hanya akan memperindah permukaan tanpa memperkuat argumen inti.

## Recommended New Sections

Masukan deepthink paling tepat dialirkan ke struktur dashboard yang diperluas seperti ini:

### 1. Implementation Plan

Isi minimum:
- tujuan intervensi,
- fase kegiatan,
- timeline,
- siapa mengerjakan apa,
- output per fase,
- indikator keberhasilan.

### 2. Kurikulum CM Koas

Isi minimum:
- keterkaitan dengan blok Community Medicine,
- kompetensi yang dilatih,
- bentuk aktivitas lapangan,
- metode supervisi,
- bentuk asesmen atau evidence of work.

### 3. Proyeksi Kerja Mahasiswa FKK ITS

Isi minimum:
- tugas individu / tim,
- deliverable mingguan,
- produk edukasi / sistem / pemetaan / intervensi,
- outcome yang realistis selama rotasi.

### 4. Framework to Action

Ini adalah tempat yang tepat untuk memasukkan COM-B dan MINDSPACE secara praktis, misalnya:

- `Problem`: N/D balita rendah
- `COM-B diagnosis`: capability, opportunity, motivation mana yang bermasalah
- `MINDSPACE lever`: defaults, salience, messenger, commitment, dll.
- `Student task`: observasi, FGD, edukasi, redesign alur, micro-intervention
- `Expected output`: alat bantu edukasi, SOP ringan, dashboard mini, materi kader, dsb.

## Recommended Execution Order

1. Stabilize current dashboard accuracy and UX.
2. Add implementation-plan architecture.
3. Add CM curriculum and competency mapping.
4. Add student work projection and deliverables.
5. Revisit final recommendation narrative.
6. Add optional presentation polish only after the above is solid.

## Current Local State

Beberapa perubahan low-risk sudah mulai dilandaskan di kode lokal:

- `Kranggan` pada data komparatif sudah digeser ke `null` untuk field yang memang belum tersedia.
- kartu puskesmas mulai digeser ke pola yang lebih accessible.
- chart komparatif mulai diarahkan agar lebih jujur untuk missing data.

Namun saran-saran yang menyentuh narasi besar, section baru, print mode, dan gimmick presentasi belum dilanjutkan sebagai keputusan final. Itu sebaiknya mengikuti triage ini.

## Next Best Step

Langkah terbaik berikutnya bukan menambah animasi, tetapi:

1. finalkan struktur section baru untuk `Implementation Plan`, `Kurikulum CM`, dan `Proyeksi Mahasiswa`,
2. tentukan kriteria evaluasi yang relevan dengan SKDI 2012 dan kebutuhan blok CM,
3. baru setelah itu pilih item deepthink mana yang masuk ke layer presentasi, mana yang masuk ke layer substansi.

## UI Polish Triage

Masukan UI/UX generasi baru berguna, tetapi harus dibedakan antara:

- peningkat persepsi kualitas,
- pengganggu fokus akademik,
- efek yang mahal secara performa,
- efek yang aman untuk presentasi resmi.

Status implementasi per 6 April 2026:

- sudah dihidupkan: angka tabular untuk elemen numerik utama, hero stats dengan hierarchy bento ringan, gradient chart halus, grid chart yang lebih bersih, animasi chart yang lebih tenang,
- tetap ditahan: ambient mesh background, film noise overlay, tilt 3D / spotlight, bounce animation yang teatrikal.

### 1. Ambient Mesh Background

Keputusan: `Adapt later`

Alasan:
- Secara visual bisa membuat dashboard terasa lebih premium.
- Namun fixed aurora orb dan blur besar berisiko menambah beban render di laptop presentasi dan HP.
- Aman dipertimbangkan hanya setelah struktur konten dan section CM benar-benar selesai.

Kesimpulan:
Layak sebagai polish tahap akhir, tetapi jangan menjadi prioritas sekarang.

### 2. Film Noise Overlay

Keputusan: `Reject for now`

Alasan:
- Overlay noise penuh layar dengan `z-index` sangat tinggi mudah bentrok dengan print, screenshot, dan keterbacaan chart.
- Untuk dashboard kesehatan akademik, efek ini cenderung kosmetik dan tidak menambah kejelasan data.

Kesimpulan:
Tidak cocok dimasukkan dulu. Kalau suatu hari dipakai, harus versi yang jauh lebih halus dan mudah dimatikan.

### 3. Font Angka Khusus (mis. Space Grotesk)

Keputusan: `Accept with adaptation`

Alasan:
- Ini salah satu saran visual paling aman.
- Angka yang lebih tabular memang membantu kesan data-driven dan meningkatkan keterbacaan skor.
- Dampak performanya kecil dan tidak mengganggu narasi akademik.

Kesimpulan:
Layak masuk setelah layer struktur dan scoring explainability selesai.

### 4. 3D Tilt & Spotlight pada Card

Keputusan: `Reject for official mode`

Alasan:
- Efek 3D tilt kuat sekali nuansa "startup landing page", bukan "decision-support dashboard".
- Bisa terasa gimmicky saat dipakai di sidang, forum dinas, atau rapat akademik.
- Tidak relevan untuk mobile, berpotensi mengganggu motion-sensitive users, dan menambah kompleksitas interaksi.

Kesimpulan:
Kalau mau ada hover enhancement, cukup glow halus atau border response, tanpa tilt 3D.

### 5. Bento Box Hero Stats

Keputusan: `Adapt partially`

Alasan:
- Konsep bento bisa membantu hierarki visual.
- Namun bila tidak hati-hati, justru menggeser fokus dari substansi ke dekorasi.
- Untuk dashboard ini, bento cocok hanya pada blok hero atau recap utama, bukan seluruh halaman.

Kesimpulan:
Layak dipertimbangkan pada hero stats, tapi bukan prioritas inti.

### 6. Chart Glow-Up (Gradient, bounce, elastic)

Keputusan: `Accept selectively`

Alasan:
- Gradient halus dan grid yang lebih bersih bisa memperbaiki estetika tanpa merusak makna.
- Tetapi animasi elastic/bouncing berlebihan mudah terasa seperti demo, bukan presentasi kebijakan atau akademik.
- Chart di sini harus explainable dan print-safe, jadi visual tidak boleh menang atas keterbacaan.

Kesimpulan:
- `Ya` untuk gradient yang halus dan grid yang lebih rapi.
- `Tidak` untuk animasi memantul yang terlalu teatrikal.

### Urutan Prioritas UI yang Aman

Kalau mau polish modern tanpa merusak kredibilitas dashboard, urutannya:

1. angka tabular yang lebih rapi,
2. hierarchy dan spacing yang lebih kuat,
3. gradient chart yang halus,
4. hero bento ringan,
5. ambient background yang sangat subtil.

Sedangkan yang sebaiknya tetap dihindari untuk mode resmi:

1. noise overlay penuh layar,
2. tilt 3D agresif,
3. bounce animation yang terlalu demonstratif.
