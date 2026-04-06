# Deepthink UI Triage

Tanggal: 6 April 2026
Scope: Dashboard Desa Binaan FKK ITS x Kota Mojokerto

## Keputusan Inti

UI baru tidak memakai semua ide deepthink mentah. Yang dipilih hanya elemen yang:

- memperjelas execution plan CM koas
- aman untuk mobile
- tidak merusak aksesibilitas
- tetap ringan untuk static dashboard

## Implemented

- Hybrid panelization:
  executive overview + gantt 20 hari + forecast harian + explainable scoring + evidence gallery
- Identitas ITS yang eksplisit di navbar, hero, dan footer
- Ambient visual ringan lewat background glow statis
- Explainable scoring dengan contribution breakdown dan narasi pemenang
- Reference section berisi figur yang cocok, driver diagram, foto resmi, dan bibliografi
- Mobile-first hardening untuk card density, nav chips, section stacking, dan horizontal gantt

## Deferred

- Swimlane / RACI penuh per aktor
  Alasan: berguna untuk appendix atau fase implementasi berikutnya, tetapi terlalu padat untuk halaman utama.
- Animasi chart yang lebih sinematik
  Alasan: bisa menambah efek pitching, tetapi bukan prioritas dibanding clarity dan mobile readability.
- Gallery lapangan dengan preview gambar Mentikan penuh
  Alasan: situs resmi Puskesmas membatasi hotlinking / direct fetch untuk sebagian gambar.

## Rejected

- 3D tilt dan spotlight hover intensif
  Alasan: buruk untuk mobile, baterai, performa, dan fokus presentasi akademik.
- Noise overlay tebal dan motion aurora agresif
  Alasan: mudah terasa gimmicky dan menurunkan kontras.
- Over-stylized chart glow berlebihan
  Alasan: mengurangi keterbacaan angka saat diprint atau dipresentasikan ke birokrat / dosen.

## Prinsip Final

Dashboard ini sekarang memakai panel yang berbeda untuk fungsi yang berbeda:

- overview panel untuk keputusan cepat
- execution panel untuk feasibility kerja
- learning panel untuk SKDI / kurikulum
- evidence panel untuk kredibilitas presentasi

Ini lebih cocok untuk konteks CM koas daripada satu grid kartu yang seragam dari awal sampai akhir.

## Stress Test Triage

Sumber masukan: stress test lanjutan yang mengklaim 6 blindspots tersembunyi.

### Accepted and patched

- Gantt chart drifting
  Status: diterima.
  Tindakan: header minggu dan header hari sekarang memakai struktur dua kolom yang konsisten dengan track timeline, sehingga alignment lebih presisi.
- Chart.js legend / scriptable color context
  Status: diterima.
  Tindakan: scriptable `backgroundColor` dan `borderColor` sekarang aman ketika `context.type` bukan `data`.
- Print race condition untuk chart
  Status: diterima.
  Tindakan: `preparePrintView()` sekarang melakukan `resize()` dan `update('none')` secara sinkron, bukan bergantung pada `setTimeout`, lalu chart sementara dipindah ke light theme agar hasil print lebih terbaca.
- Safari / mobile button reset untuk kartu PKM
  Status: diterima.
  Tindakan: `.pkm-card` sekarang menetralkan style default button seperti `appearance`, `text-align`, `font`, dan `width`.
- Mobile anchor offset
  Status: diterima sebagian.
  Tindakan: offset navbar sekarang disinkronkan dinamis dari tinggi navbar aktual, jadi anchor scroll tidak bergantung pada angka statis desktop / mobile.
- Sticky scoring seam
  Status: diterima.
  Tindakan: header sticky dan kolom pertama diperkeras dengan `z-index` dan `border-right`.

### Accepted with modification

- Auto-scroll nav chips mobile
  Status: diterima dengan modifikasi ringan.
  Tindakan: link aktif di navbar mobile akan di-scroll ke tengah saat section aktif berubah.
  Catatan: saya sengaja tidak menambah progress bar atau sistem scroll state yang lebih agresif agar tidak menambah noise visual.

- Keyboard access untuk gantt shell
  Status: diterima.
  Tindakan: area gantt sekarang bisa difokus dengan keyboard agar horizontal scroll-nya lebih accessible.

- Puskesmas tabs mobile and keyboard polish
  Status: diterima.
  Tindakan: tab aktif sekarang auto-scroll ke tengah dan bisa dinavigasi dengan panah kiri / kanan serta Home / End.

### Rejected or reframed

- Replace-all `app.js` dan `style.css`
  Status: ditolak.
  Alasan: paket itu membawa banyak perubahan di luar scope bugfix dan berisiko merusak fitur yang sudah stabil.
- 3D spotlight / hover hologram engine
  Status: ditolak.
  Alasan: bertentangan dengan prinsip mobile-first, aksesibilitas, dan performa yang sudah dipilih.
- Aurora animation dan noise overlay agresif
  Status: ditolak.
  Alasan: terlalu dekoratif untuk dashboard presentasi akademik dan berisiko menurunkan keterbacaan.
- Scroll progress bar
  Status: ditunda / di-reframe.
  Alasan: tidak ada elemen HTML pendukung saat ini dan manfaatnya kecil dibanding kompleksitas tambahan.

### Regressions avoided from the proposed replacement

- Theme toggle icon logic yang sudah benar sekarang akan hilang jika file diganti mentah.
- `renderStatCards()` versi usulan membuang dukungan `decimals`, `prefix`, dan `suffix`.
- Beberapa bagian usulan mengasumsikan elemen baru seperti progress bar yang belum ada di HTML, sehingga raw replace justru bisa membuat fitur patah.

## Micro-Aesthetics Triage

Sumber masukan: batch deepthink lanjutan yang fokus ke micro-aesthetics dan presentational polish.

### Accepted and patched

- Hero gradient text
  Status: diterima.
  Tindakan: judul hero sekarang memakai gradient text yang tetap aman di dark dan light theme.
- Tooltip Chart.js yang lebih halus
  Status: diterima.
  Tindakan: tooltip default dipoles dengan background semi-transparan, radius membulat, tipografi yang lebih konsisten, dan warna yang ikut menyesuaikan tema.
- Horizontal scroll affordance
  Status: diterima.
  Tindakan: `tabs-nav`, `scoring-wrapper`, dan `gantt-shell` sekarang punya fading edge di sisi kanan serta scrollbar yang lebih rapi.
- Ambient orb motion yang sangat subtil
  Status: diterima dengan guardrail.
  Tindakan: glow background sekarang bergerak perlahan, tetapi hanya sebagai ambient motion ringan dan dimatikan untuk `prefers-reduced-motion`.

### Deferred

- Domino / staggered fade-in penuh per kartu
  Status: ditunda.
  Alasan: menarik secara visual, tetapi perlu restrukturisasi animation model agar tidak bentrok dengan section-level fade yang sudah ada.
- Scroll progress indicator
  Status: tetap ditunda.
  Alasan: masih opsional, dan nilai tambahnya belum sebesar biaya kompleksitas tambahan di navbar.
- Film noise overlay global
  Status: ditunda.
  Alasan: berpotensi menurunkan clarity teks dan hasil print jika dipasang terlalu agresif.

### Rejected

- Magnetic 3D spotlight / card hologram
  Status: ditolak.
  Alasan: tidak sejalan dengan keputusan sebelumnya soal performa, mobile UX, dan fokus akademik-eksekutif.
