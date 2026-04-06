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
