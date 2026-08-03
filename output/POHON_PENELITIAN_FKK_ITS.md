# Rancangan Pohon Penelitian FKK ITS
### Dokumen kerja untuk penyusunan RIP & Peta Jalan Penelitian — bahan akreditasi LAM-PTKes

**Disusun:** 28 Juli 2026 · **Revisi besar:** 3 Agustus 2026 · **Status:** draf kerja, belum ditetapkan · **Untuk:** Dekanat & Unit Penelitian FKK ITS

---

## 0. Cara membaca dokumen ini (baca dulu)

Dokumen ini disusun dari riset web empat jalur: profil institusi FKK ITS, rekam jejak SDM, benchmark fakultas kedokteran dunia, dan regulasi akreditasi Indonesia. Revisi 3 Agustus 2026 menambahkan hasil **riset agentik 18 agen** (personel → verifikasi silang adversarial → benchmark → konteks) serta **struktur organisasi resmi FKK** yang dipasok pengguna.

**Batas validitas yang harus diketahui.** Sesi riset berjalan di balik *egress policy* yang memblokir akses langsung ke `its.ac.id`, seluruh domain `.ac.id`, `sinta.kemdiktisaintek.go.id`, `pddikti`, `scholar.google.com`, `researchgate.net`, `ieeexplore.ieee.org`, dan `lamptkes.org` (HTTP 403 pada CONNECT). Pada revisi 3 Agustus, kuota pencarian web juga habis (200/200) di tengah jalan. Artinya:

- Tidak satu pun halaman ITS atau PDF instrumen LAM-PTKes yang dibuka langsung. Sebagian besar fakta institusional berasal dari indeks mesin pencari.
- **Tidak ada satu pun angka bibliometrik (skor SINTA, H-index, jumlah dokumen Scopus) dalam dokumen ini.** Angka-angka itu tidak berhasil diambil, dan sengaja tidak dikarang.
- **Tidak ada satu pun angka ambang batas akreditasi, nominal hibah, atau angka prevalensi nasional.** Semuanya gagal diverifikasi pada Agustus 2026 dan sengaja dibiarkan kosong — lihat §10 Prioritas 4.

**Tiga koreksi berturut-turut sudah terjadi pada dokumen ini**, dan polanya harus dipahami sebelum membacanya:

| Draf | Kekeliruan | Penyebab |
|---|---|---|
| 1 | Menyatakan FKK tidak punya epidemiolog | Nama Dr. A.A.B. Wirayuda tidak tergali oleh riset berdomain terblokir |
| 2 | Menyebut Prof. Adhi Dharma Wibawa sebagai Wakil Dekan | Sumber daring **usang** — benar untuk 2023, salah untuk 2026 |
| 3 | Mengusulkan dr. Afia (Sp.M) memimpin riset retinopati diabetik; menganggap klaster EEG tanpa mitra klinis | Menyimpulkan peran **dari gelar**, bukan dari jejak riset; roster tidak lengkap |

Ketiganya lahir dari mekanisme yang sama: **menyimpulkan dari cuplikan mesin pencari alih-alih dari halaman sumber.** Karena itu setiap klaim personel dalam revisi ini melewati agen pemeriksa yang ditugasi *membantah*, dan hasil vonisnya — 28 dikonfirmasi, 37 diragukan, 43 tidak dapat diperiksa, 11 dibantah — tercermin pada tanda peringatan di sepanjang dokumen. **Perlakukan setiap nama tanpa tanda "terverifikasi" sebagai hipotesis kerja.**

Seluruh butir yang harus diverifikasi dikumpulkan di **§10**. Jangan salin dokumen ini ke LED sebelum §10 tuntas.

---

## 1. Ringkasan eksekutif — enam keputusan yang diusulkan

| # | Keputusan | Alasan singkat |
|---|---|---|
| **K1** | Pakai **struktur matriks**: 5 Pilar (sumbu hasil kesehatan) × 5 Platform (sumbu kapabilitas teknologi). Yang dipublikasikan hanya Pilar. | Pohon yang pilarnya "AI / Robotika / Biomaterial" tidak terbaca oleh Kemenkes, RS pendidikan, dan asesor kedokteran — mereka menilai hasil kesehatan. Pohon yang pilarnya murni penyakit menghapus satu-satunya keunggulan FKK ITS. Matriks menyelesaikan keduanya. Pola ini dipakai Imperial (14×4), Yale (8×3), Carle Illinois. |
| **K2** | **Platform memegang anggaran modal; Pilar memegang narasi.** Jangan dibalik. | Investasi alat di institut teknologi paling efisien bila mengalir ke platform yang dipakai lintas pilar (pola *core facilities* Karolinska). Pilar-lah yang berbicara ke Dinkes, RSUD, dan funder. |
| **K3** | Jadikan Desa Binaan Mojokerto **platform surveilans bertahap yang dibingkai sebagai *testbed* teknologi kedokteran pada populasi terdefinisi** — bukan kohort prospektif penuh, dan bukan sekadar lokasi pengabdian. | *Direvisi Agustus 2026.* Kohort penuh bergaya Rotterdam tidak realistis untuk fakultas berumur 3 tahun, dan kohort biasa akan selalu kalah dari HDSS Sleman UGM yang lebih dulu dan lebih besar. Yang tidak bisa ditiru bukan kohortnya, melainkan **kohort yang menempel pada pabrik teknologi medis**. Lihat §6. |
| **K4** | Terbitkan **dua pohon terpisah**: Pohon Penelitian dan Pohon PkM. | Kriteria C.7 (Penelitian) dan C.8 (PkM) LAM-PTKes menuntut peta jalan masing-masing dengan rumusan indikator yang identik. Satu pohon hanya memenuhi separuh. |
| **K5** | Bangun **mekanisme penegakan sejak hari pertama**, bukan menjelang visitasi. | Unsur ke-3 dan ke-4 indikator C.7 (evaluasi kesesuaian + tindak lanjut) adalah titik gugur paling umum. Rubrik LAM memisahkan skor 3 dari 4 hanya lewat dua hal, dan salah satunya adalah sistem TIK yang *menyebarluaskan* hasil riset ke publik. Lihat §8.5 dan §9.1a. |
| **K6** | **Tetapkan desa pembanding sejak hari pertama** platform surveilans berjalan. | Keputusan ini **gratis di tahun pertama dan mustahil diperbaiki di tahun kelima**. Tanpa area pembanding permanen, tidak satu pun klaim efektivitas intervensi Desa Binaan dapat dipertahankan secara metodologis. Butir tunggal paling berdampak dalam dokumen ini. Lihat §6.4. |

---

## 2. Akar pohon: apa yang sudah kalian punya dan tidak perlu dibuat ulang

Identitas FKK ITS sudah dinyatakan resmi, konsisten, dan berulang di banyak kanal. **Jangan merumuskan visi keilmuan baru — operasionalkan yang sudah ada.**

> **"Kedokteran pencegahan berbasis teknologi kedokteran"** · **"Kedokteran 4.0"**
> — Visi/Misi FKK ITS dan Prodi Sarjana Kedokteran

Fakta institusional pendukung (semua dari sumber terindeks, perlu verifikasi final):

- FKK adalah **fakultas ke-8 ITS**, berdiri dengan **Peraturan Rektor ITS No. 2 Tahun 2023**; FK UNAIR sebagai fakultas pembina.
- Tiga prodi: **Sarjana Kedokteran**, **Pendidikan Profesi Dokter**, **Teknologi Kedokteran**.
- Dekan 2025–2029: **Dr. Lukman Hakim, M.Kes., Sp.U(K), Ph.D** (PhD KU Leuven; uro-onkologi). Dekan pendiri: Dr. dr. Imam Susilo, Sp.PA(K).
- **Wakil Dekan: Prof. Dr. I Ketut Eddy Purnama, S.T., M.T.** — sumber: halaman resmi *Struktur Organisasi* `its.ac.id/fakultas/fkk/profil/`, dikonfirmasi pengguna 3 Agustus 2026. Guru Besar bidang **Telematika Kesehatan**, dari Departemen Teknik Komputer FTEIC. Profil lengkap di §4.1a — **ini aset kepemimpinan riset yang selama ini tidak terlihat dalam dokumen.**
- **Prof. Dr. Ir. Adhi Dharma Wibawa, S.T., M.T.** kini menjabat **Kepala Penjaminan Mutu Fakultas**, sekaligus profesor pertama yang lahir dari FKK ITS (dikukuhkan Agustus 2025; orasi *"Pemanfaatan Sinyal Otak untuk Mendukung Inovasi Neuroteknologi bagi Kemajuan Bangsa"*).

> **Catatan garis waktu — penting agar kekeliruan lama tidak terulang.** Draf kedua dokumen ini sempat menyebut Wibawa sebagai Wakil Dekan. Penelusuran verifikasi menemukan bahwa itu **benar untuk tahun 2023** — pemberitaan Agustus 2023 memang mencatat pelantikan Dr. Adhi Dharma Wibawa sebagai Wakil Dekan FKK pada masa kepemimpinan Dekan pendiri Dr. dr. Imam Susilo, Sp.PA(K). Jadi sumber lamanya tidak palsu, melainkan **usang**. Susunan yang berlaku sekarang adalah Dekan Lukman Hakim (2025–2029) dengan Wakil Dekan I Ketut Eddy Purnama. Pelajarannya: pada fakultas berumur tiga tahun yang sudah berganti satu periode kepemimpinan, sumber daring berumur 2–3 tahun bukan sekadar lemah — ia aktif menyesatkan.
- Kurikulum memuat **~20% materi teknologi kesehatan**: AI, sains data medis, genomik.
- Sinergi lintas fakultas dinyatakan Dekan sebagai *"kekuatan utama yang membedakan FKK ITS dari fakultas kedokteran lainnya."*
- Prodi Kedokteran & Profesi Dokter **sudah divisitasi LAM-PTKes 23–26 April 2025**; halaman prodi menyebut peringkat **"Baik"**.

**Ekosistem ITS yang bisa langsung ditarik ke dalam pohon** — ini yang tidak dimiliki FK manapun di Indonesia dalam kombinasi seperti ini:

| Aset | Relevansi |
|---|---|
| **PUI-AIHeS** — Pusat Unggulan Iptek *Artificial Intelligence for Healthcare and Society* (diresmikan 15 Okt 2020) | Satu-satunya PUI AI-kesehatan di Indonesia; rekam jejak nyata (deteksi parasit malaria pada apusan darah kualitas rendah) |
| **Puslit KATK** — Pusat Penelitian Kecerdasan Artifisial & Teknologi Kesehatan, DRPM ITS | Pusat riset resmi yang paling berimpitan dengan FKK |
| **Departemen Teknik Biomedik** (FTEIC) — 14 bidang riset terpublikasi | Biomodeling, biosensor, prostetik, biomaterial, AI biomedis, sistem pendukung diagnostik, rekayasa kardiovaskular |
| **Teknik Material** — implan biodegradable, pelapisan implan (Prof. Agung Purniawan) | Bahan baku Pilar 4 |
| **Lab Statistika & Sains Data Lingkungan dan Kesehatan** (Dept. Statistika) | Biostatistik dan epidemiologi kuantitatif |
| **Despro — Lab Desain Digital Terintegrasi / Health Technology Lab** | Prostesis, custom implant, 3D printing medis |
| **JMHT** — *Journal of Medicine and Health Technology*, eISSN 3046-6865, terbit sejak Mei 2024 | Kanal luaran milik sendiri; namanya saja sudah menyatakan positioning |

**Wahana klinis & komunitas yang sudah berstatus resmi:**

- **RSUD dr. Wahidin Sudiro Husodo, Kota Mojokerto** — RS Pendidikan Utama
- **RSUD RA Basoeni, Kab. Mojokerto** — RS Pendidikan Satelit
- PKS tripartit FKK ITS – Pemkot – Pemkab Mojokerto, **15 Januari 2025**; koas direncanakan mulai **2027** (2 tahun)
- **RS dr. Angka Nitisastro** — dalam persiapan, diarahkan menjadi basis *Academic Health System*
- **ITS Medical Center**, Puskesmas Keputih, program **"Bina Desa Sehat"** (Sukolilo, Medokan Semampir, Keputih) — sudah berjalan, termasuk penyuluhan resistensi antibiotik + skrining tekanan darah dan lemak darah
- **Program Desa Binaan Kota Mojokerto** — 5 puskesmas, terdokumentasi di dashboard repositori ini

---

## 3. Batang pohon: rumusan visi keilmuan

Rumusan yang diusulkan sebagai batang — satu kalimat yang harus muncul identik di seluruh dokumen turunan:

> **Kedokteran Pencegahan Presisi Berbasis Teknologi**
> *Menggeser titik intervensi ke hulu — dari mengobati penyakit yang sudah bermanifestasi menjadi mendeteksi, menstratifikasi, dan mencegahnya pada tingkat individu dan populasi, dengan teknologi yang terjangkau dan dapat di-deploy di layanan primer Indonesia.*

**Mengapa rumusan ini, dan bukan yang lain.** Identitas resmi kalian adalah *kedokteran pencegahan*, sementara volume publikasi terbesar saat ini berasal dari sisi **teknik** (EEG, biomekanika, e-nose — lihat §4.2). Rumusan di atas menyatukan keduanya di satu titik yang sama-sama sah, tanpa salah satunya menjadi pelengkap:

```
kedokteran pencegahan  ×  teknologi ITS  =  DETEKSI DINI & STRATIFIKASI RISIKO
                                             yang di-deploy pada skala populasi
```

Ini bukan kompromi retoris. *E-nose* untuk diabetes, EEG untuk skrining neuro, AI untuk citra, wearable untuk pemantauan risiko — semuanya **teknologi deteksi dini**, dan semuanya sudah ada orangnya di ITS. Desa Binaan dan jejaring puskesmas adalah tempat men-*deploy*-nya. Pencegahan menjadi klaim yang dibuktikan, bukan slogan.

**Tiga jangkar eksternal batang ini** (dipakai untuk membela pilihan tema di hadapan asesor):

| Jangkar | Titik sambung |
|---|---|
| Renstra ITS 2026–2030 (**RAISE**) | Pilar *Relevant and Impactful Research*; ITS menuju *Global Impact University* 2030; penekanan hilirisasi |
| Renstra Kemenkes 2025–2029 (PMK 12/2025) | Pilar 1 Layanan Primer · Pilar 3 Ketahanan Kesehatan · Pilar 6 Teknologi Kesehatan |
| RIRN 2017–2045 / PRN | Bidang fokus **Kesehatan–Obat**; PRN 2025 mencakup kesehatan + digitalisasi (AI) |

---

## 4. Analisis SDM: apa yang benar-benar bisa dikerjakan

Ini bagian yang paling menentukan bentuk pohon. Pohon yang tidak berakar pada rekam jejak nyata akan gugur di unsur ke-2 indikator C.7 ("dosen melaksanakan penelitian sesuai peta jalan").

### 4.1 Peta SDM terverifikasi

**Kepemimpinan fakultas** (sumber: halaman resmi *Struktur Organisasi*, `its.ac.id/fakultas/fkk/profil/`, dikonfirmasi pengguna 3 Agustus 2026):

| Jabatan | Nama |
|---|---|
| Dekan | dr. Lukman Hakim, M.Kes., Sp.U(K), Ph.D |
| Wakil Dekan | Prof. Dr. I Ketut Eddy Purnama, S.T., M.T. |
| Kepala Sub Bagian | Endah Mayasari, S.T. |
| Penjaminan Mutu Fakultas | Prof. Dr. Ir. Adhi Dharma Wibawa, S.T., M.T. |
| Penjaminan Mutu Prodi Kedokteran | dr. Ratri Dwi Indriani, Sp.An, FIP, FIPP |
| Penjaminan Mutu Prodi Teknologi Kedokteran | Yuri Pamungkas, S.Tr.T., M.T. |
| Kaprodi Kedokteran | dr. Endah Indriastuti, Sp.PK |
| Kaprodi Pendidikan Profesi Dokter | dr. Rahmah Yasinta Rangkuti, Sp.A, M.Biomed |
| Kaprodi Teknologi Kedokteran | Dr. Shoffi Izza Sabilla, S.Kom |

### 4.1a Prof. Dr. I Ketut Eddy Purnama — aset yang selama ini tidak terlihat

Riset mendalam Agustus 2026 mengungkap bahwa Wakil Dekan FKK ITS **bukan administrator yang kebetulan berlatar teknik**. Bidang keilmuan guru besarnya adalah **Telematika Kesehatan** (*Health Telematics*), dan seluruh portofolio risetnya bertumpu pada kesehatan.

| Aspek | Temuan |
|---|---|
| *Homebase* | Departemen Teknik Komputer, FTEIC ITS |
| Bidang guru besar | **Telematika Kesehatan** — orasi pengukuhan *"Telematika Kesehatan untuk mewujudkan layanan kesehatan yang cerdas, paripurna dan memuaskan bagi masyarakat"* (2 November 2023) |
| Ruang lingkup yang ia definisikan sendiri | Akuisisi data, penyimpanan, transmisi, pengolahan, analisis data, *telemedicine*, *blockchain*, kecerdasan artifisial, rehabilitasi medik, *gaming*, IoT, dan robotika dalam layanan kesehatan |
| Bidang riset teknis | Analisis citra medis, analisis citra mikroskopik, *computer vision* |
| Objek riset nyata (2022–2025) | MRI otak (klasifikasi abnormalitas, segmentasi hipokampus) · MRI jantung (segmentasi *cine cardiac*, cincin miokardium) · CT paru COVID-19 (segmentasi + visualisasi 3D) · USG trombosis vena dalam · **mikroskopi sputum untuk basil tuberkulosis** · rekonstruksi kraniofasial 3D dari tengkorak · segmentasi pembuluh darah retina |
| Venue | *Journal of Imaging Informatics in Medicine* (Springer) · *Array* (Elsevier) · *IET Image Processing* · IEEE Access · beberapa prosiding IEEE |
| Jabatan lain | Mantan Dekan FTEIC (periode berakhir sebelum 2025); disebut **Kepala Pusat Studi KATD** DRPM ITS sejak Januari 2025 — **konflik data, lihat catatan di bawah** |

**Apa artinya bagi pohon ini — tiga konsekuensi:**

1. **Platform T3 (AI Medis & Pencitraan) dan T5 (Informatika Kesehatan) kini punya pemimpin bergelar guru besar**, dan kebetulan orang itu adalah Wakil Dekan. Sebelumnya kedua platform ini praktis tanpa penambat senior. Ini mengubah T3/T5 dari aspirasi menjadi kapasitas.
2. **"Telematika Kesehatan" adalah rumusan yang lebih tepat untuk T5 daripada "Informatika Kesehatan"** — dan menggunakan istilah guru besar sendiri berarti pohon ini berdiri di atas bidang keilmuan yang sudah diakui secara formal pada tingkat pengukuhan profesor, bukan istilah yang dikarang penyusun RIP.
3. **Kolaborator tetapnya berulang**: Eko Mulyanto Yuniarno dan Prof. Mauridhi Hery Purnomo muncul di hampir semua makalahnya, dan pada beberapa makalah ada klinisi (mis. radiolog Anggraini Dwi Sensusiati, kardiolog Johanes Nugroho) serta mitra luar negeri (UMCG/Twente Belanda, Kumamoto Jepang). Artinya **model kolaborasi insinyur–klinisi–mitra internasional sudah berjalan di sekitar Wakil Dekan** — tinggal ditarik ke dalam kerangka FKK.

> **Konflik data yang harus diselesaikan:** dokumen ini (§2) mencatat Prof. Adhi Dharma Wibawa sebagai Kepala Pusat Studi KATD, sementara riset Agustus 2026 menemukan Prof. I Ketut Eddy Purnama dilantik pada kursi itu Januari 2025. Keduanya bersumber cuplikan, keduanya plausibel, dan keduanya tidak dapat dibuka karena `its.ac.id` diblokir. **Jangan cantumkan salah satunya di LED sebelum dikonfirmasi ke DRPM ITS.** Nomor urut "Guru Besar ITS ke-188" juga tidak lolos verifikasi silang — jangan dikutip.

---

**Prodi Sarjana Kedokteran** — situs mengklaim 27 dosen; 12 terverifikasi individual (peran lab dari struktur organisasi resmi):

| Nama | Keahlian tersirat / peran struktural |
|---|---|
| dr. Endah Indriastuti, Sp.PK | **Patologi Klinik** — kunci untuk validasi biomarker; **Kaprodi Kedokteran** |
| dr. Muhammad Nazhif Haykal, M.Biomed | Biomedik; Koordinator Lab **Patologi Klinik** |
| dr. Rizka Nurul Hidayah, M.Biomed | Biomedik; Koordinator Lab **Histologi & Patologi Anatomi** — catatan: M.Biomed adalah gelar magister umum, bukan Sp.PA; peran koordinasi lab tidak serta-merta berarti spesialis Patologi Anatomi bersertifikat (lihat §4.3) |
| dr. Fatimah Nur Fitriani/Fitriyani, M.Biomed | Biomedik; Koordinator Lab **Fisiologi** — ejaan nama berbeda antar sumber, perlu dikonfirmasi |
| dr. Gumilar Fardhani Ami Putra, M.Biomed | Biomedik; Koordinator Lab **Anatomi** |
| dr. Dwinka Syafira Eljatin, M.Ked.Trop | **Kedokteran Tropis**; Koordinator Lab **Farmakologi** |
| dr. Abdurrahman, Sp.An-TI, M.Ked.Klin | Anestesiologi & Terapi Intensif |
| dr. Lely Nurhayati, M.H., C.M.C | **Hukum Kesehatan / medikolegal** — aset langka |
| dr. Edwin Nugroho Njoto, Sp.PD, MIPH, MHM | **Penanggung Jawab KKM Ilmu Kesehatan Masyarakat–Kedokteran Pencegahan (IKM-KP)** — bukan Interna seperti tersirat di draf sebelumnya (Interna kini dipegang dr. Atina Irani Wira Putri, lihat di bawah). **Temuan penting:** ini menempatkan Njoto tepat di jantung batang pohon "kedokteran pencegahan" (§3) — bukan sekadar penunjang |
| **Dr. Anak Agung Bagus Wirayuda, dr., B.Med., M.D., M.Sc.** (Lektor) | **Epidemiologi & Statistika Medis** — M.Sc. Epidemiology and Medical Statistics; Ph.D. Sultan Qaboos University. Riset: determinan wabah dengue (Oman), *systematic review* penyakit tular-vektor kawasan MENA, pemodelan angka harapan hidup & determinan sosial kesehatan negara OIC, model skoring prognostik nyeri punggung bawah di layanan primer Indonesia (*J Prev Med Public Health*, 2025) |
| Ira Resmi Melani, S.Ked | — |

**Prodi Pendidikan Profesi Dokter** — struktur resmi mengungkap **13 KKM (Kelompok Kerja Medis) + IKM-KP**, naik dari 7 yang sempat terverifikasi di draf sebelumnya:

| KKM | Nama |
|---|---|
| Interna | dr. Atina Irani Wira Putri, Sp.PD |
| Pediatri | dr. Rahmah Yasinta Rangkuti, Sp.A, M.Biomed — **Kaprodi Profesi Dokter** |
| THT | dr. Tri Hedianto, Sp.THT-BKL — juga Koordinator Lab **Keterampilan Klinik** (Prodi Kedokteran) |
| Mata | dr. Afia Nuzila Fadhlina, Sp.M, M.Ked.Klin |
| Neurologi & Rehabilitasi Medik | dr. Riva Satya Radiansyah, Sp.N |
| Psikiatri | dr. Zain Budi Syulthoni, Sp.KJ |
| Dermato-Venereologi | dr. Desiana Widityaning Sari, Sp.DV, M.Ked.Klin |
| Forensik | dr. Anwar Djunaidi, Sp.F |
| Radiologi | dr. Erna Furaidah, Sp.Rad |
| Bedah | dr. Ivor Wiguna Hartanto Wilopo, Sp.B, FINACS |
| Obstetri & Ginekologi | dr. Sonny Fadli, M.Ked.Klin, Sp.OG |
| Kegawatdaruratan Anestesi | dr. Ratri Dwi Indriani, Sp.An, FIP, FIPP — juga **Penjaminan Mutu Prodi Kedokteran** |
| IKM-KP | dr. Edwin Nugroho Njoto, MIPH, MHM, Sp.PD |

**Prodi Teknologi Kedokteran** — 10 dari 11 terverifikasi, plus peran struktural baru. **Di sinilah mesin riset fakultas saat ini:**

| Nama | Bidang terpublikasi / peran struktural |
|---|---|
| **Prof. Dr. Ir. Adhi Dharma Wibawa** — profesor pertama FKK (Agustus 2025), Kepala Penjaminan Mutu Fakultas | Pemrosesan sinyal biomedis (EEG/EMG/ECG), AI; PhD Biomedical Engineering **Univ. Groningen**; Kepala Pusat Studi KATD |
| **Dr. Shoffi Izza Sabilla, S.Kom., M.Kom.** — **Kaprodi Teknologi Kedokteran** | ***Electronic nose***, machine learning, deep NN, IoT |
| **Achmad Syaifudin, Ph.D** | Biomekanika ortopedi, *bone plate*, desain stent & FEM |
| **Djoko Kuswanto, S.T., M.Biotech.** — Kepala Lab **Teknologi Kesehatan** | Desain produk medis, **3D printing**, prostesis & *custom implant*; pendiri Rumah Prostesis Indonesia |
| **Dr. Eng. Dhany Arifianto** | **Audiologi & akustik** |
| **Yuri Pamungkas, S.Tr.T., M.T.** — Penjaminan Mutu Prodi Teknologi Kedokteran | Pemrosesan sinyal EEG, AI kedokteran, neuroteknologi |
| Hamdan Dwi Rizqi, S.Si., M.Si. | Biokimia |
| Fahmi Mubarok, Ph.D | Material & manufaktur |
| Nadya Paramitha Jafari, S.Ds., M.T. | Desain produk medis |
| Dr. Shoffi / Gusfatul Mukhairiq, S.T., M.T. | — |

**Belum terpetakan:** Endah Mayasari (Kepala Sub Bagian — administratif, kemungkinan besar bukan dosen riset).

### 4.1b Kapasitas riset klinisi — hasil penelusuran, termasuk dua koreksi

Riset Agustus 2026 menelusuri jejak publikasi tiap klinisi, lalu setiap klaim diadu ulang oleh agen pemeriksa yang bertugas **membantah**, bukan mengonfirmasi. Hasilnya mengoreksi dua dugaan yang tampak masuk akal tetapi salah — dan menaikkan dua nama yang semula dianggap sekadar potensi.

| Klinisi | Kapasitas riset terbukti | Penilaian |
|---|---|---|
| **dr. Riva Satya Radiansyah, Sp.N** | **Sudah menjadi rekan penulis Yuri Pamungkas** pada *systematic review* AI untuk zona epileptogenik (*Journal of Robotics and Control*, 2025) — yaitu artikel yang dokumen ini kutip sebagai milik klaster EEG. Juga penulis pertama meta-analisis magnesium–nimodipin pada perdarahan subaraknoid (*J Yeungnam Med Sci*, 2025). Minat: stroke, nyeri neuropatik, rTMS, AI dalam neurologi. Banyak menulis *systematic review* dan meta-analisis. | **Terkuat.** Jembatan klinis untuk klaster EEG **bukan sesuatu yang perlu dibangun — sudah ada dan tinggal diformalkan** |
| **dr. Zain Budi Syulthoni, Sp.KJ** | **Juga sudah menjadi rekan penulis Yuri Pamungkas** (EECSI 2024, *hybrid* CNN-RNN untuk identifikasi pascastroke). Dua sumbu: psikiatri berbasis sinyal EEG, dan epidemiologi perilaku (analisis data SDKI untuk perilaku berisiko HIV pada remaja) | **Kuat.** Menguasai alur EEG + *deep learning*, sekaligus berwenang menegakkan diagnosis baku emas sebagai label model |
| **dr. Atina Irani Wira Putri, Sp.PD** | Paling aktif meneliti di antara klinisi baru; satu-satunya dengan luaran terindeks internasional sebagai penulis pertama. Tiga sumbu: komplikasi berat diabetes (*necrotizing fasciitis*, IJSCR/Elsevier), **tuberkulosis paru** (2 dari 4 publikasi), aritmia terkait obat | **Kuat.** Pasangan paling tajam untuk *e-nose*: **TB berbasis napas** dan infeksi luka diabetik — dua-duanya ia punya otoritas klinis dan akses kasus |
| **dr. Edwin Nugroho Njoto, Sp.PD, MIPH, MHM** | Epidemiologi lapangan sungguhan: determinan kusta subklinis pada kontak serumah dengan penanda serologis (PeerJ, 2026) — desain kedokteran pencegahan murni. Juga telaah sistem layanan paliatif Indonesia. MIPH + MHM dari beasiswa Australia Awards | **Kuat.** Orang yang paling tepat memikul pilar "kedokteran pencegahan", dan buktinya riset, bukan gelar |
| **dr. Afia Nuzila Fadhlina, Sp.M, M.Ked.Klin** | Riset orisinal **eksperimental** (bukan laporan kasus): studi hewan terkontrol 16 kelinci, ekspresi SOD-1 imunohistokimia, morfometri **endotel kornea** via mikroskopi spekular. Juga ko-penulis artikel pencegahan TB komunitas | **Peneliti sungguhan** — kompetensi desain terkontrol & kuantifikasi citra mikroskopik lebih dalam dari yang terlihat |
| **dr. Tri Hedianto, Sp.THT-BKL** | Tidak ditemukan satu pun publikasi riset THT. Jejak yang ada: modul ajar, bab buku, artikel pengabdian, dan **komunikasi kesehatan publik** (pembicara TEDxITS 2024, YouTube Health Accelerator 2023) | **Klinisi–pengajar–komunikator, bukan peneliti aktif.** Jangan diposisikan sebagai pemimpin riset |

**Dua koreksi atas dugaan saya sendiri — dicatat terbuka karena polanya penting:**

> **Koreksi 1 — dr. Afia bukan untuk retinopati diabetik.** Dugaan awal saya: Sp.M + AI pencitraan = skrining retinopati diabetik. Riset membantahnya: kepakaran Afia yang terbukti adalah **segmen anterior (kornea, katarak fakoemulsifikasi, stres oksidatif)**, bukan retina; tidak ditemukan jejak *fellowship* vitreoretina. Menempatkannya memimpin riset retinopati berarti **mengulang persis pola kesalahan yang sudah dua kali menjerat proyek ini: menyimpulkan peran dari gelar, bukan dari jejak riset.**
> **Irisan yang jauh lebih kuat dan lebih jujur:** analisis citra **mikroskopi spekular endotel kornea berbasis AI** — persis metode yang sudah ia kuasai dan publikasikan, dan persis jenis pekerjaan yang dikuasai Prof. I Ketut Eddy Purnama (§4.1a). Ini pasangan yang nyata, bukan yang dipaksakan.

> **Koreksi 2 — jalur audiologi belum internal.** Dugaan awal saya: Dhany Arifianto (akustik) + dr. Tri Hedianto (Sp.THT) = riset audiologi. Riset membantahnya dari dua sisi: (a) Tri Hedianto tidak punya rekam jejak riset THT; (b) program audiometri portabel Lab Vibrastik Teknik Fisika ITS (didanai LPDP) **sudah berjalan dengan mitra klinis dari luar** — Sp.THT-KL dari UNAIR/RSUD Dr. Soetomo. Jadi jalur translasi audiologi ITS saat ini **bergantung pada klinisi eksternal**. Tri Hedianto adalah satu-satunya Sp.THT-KL internal FKK, sehingga secara struktural dialah kandidat untuk **meng-internalkan** kemitraan itu — tetapi itu potensi struktural, bukan kapasitas riset terbukti, dan harus ditulis apa adanya.

### 4.1c Sumbu Kedokteran Dasar / Profesi / Translasi (khusus Prodi Kedokteran & Profesi Dokter)

Ini sumbu **kedua** yang melengkapi matriks Pilar × Platform (§5), dan berlaku **hanya** untuk kedua prodi kedokteran (bukan Teknologi Kedokteran). Matriks menjawab *"riset apa, dengan alat apa"*; sumbu ini menjawab *"siapa yang mengerjakan, dan di tahap pipeline pendidikan mana posisi formalnya."* Keduanya berpotongan — satu nama muncul di kedua sumbu — bukan saling menggantikan.

Diagram interaktifnya tersedia sebagai artefak visual (lihat pesan pengiriman); ringkasan teksnya di bawah.

> **Prinsip penetapan — supaya tidak mengulang kesalahan lama.** Penempatan **hanya** berdasarkan (a) jabatan resmi terverifikasi (Koordinator Lab / Penanggung Jawab KKM) dan (b) jejak riset yang benar-benar terdokumentasi. **Bukan** disimpulkan dari gelar. Nama tanpa dua hal itu masuk kategori residual yang dinyatakan terbuka, bukan dipaksakan ke salah satu cabang.

> **Ketiga tier bernilai institusional SETARA.** Urutan Dasar → Profesi → Translasi adalah **tahap pipeline pendidikan kedokteran** (preklinik → kepaniteraan → jembatan lintas-rumpun yang sudah terbukti), **bukan tangga prestise atau kenaikan pangkat.** Ini harus dinyatakan eksplisit di dokumen agar tidak memicu sensitivitas internal — seorang Koordinator Lab Anatomi tidak "lebih rendah" dari klinisi di cabang Translasi; mereka mengisi fungsi berbeda pada pipeline yang sama.

**Cabang 1 — Kedokteran Dasar** (7 orang): ilmu biomedik & paraklinik tahap preklinik. Jangkar = jabatan Koordinator Laboratorium.
dr. Endah Indriastuti Sp.PK (**Kaprodi Kedokteran**, Patologi Klinik) · dr. M. Nazhif Haykal (Koord. Lab Patologi Klinik) · dr. Rizka Nurul Hidayah (Koord. Lab Histologi & PA — *bukan* Sp.PA) · dr. Fatimah N. Fitriani (Koord. Lab Fisiologi — ejaan belum pasti) · dr. Gumilar F.A. Putra (Koord. Lab Anatomi) · dr. Dwinka Syafira Eljatin (Koord. Lab Farmakologi — latar tropis ≠ lab) · dr. Tri Hedianto Sp.THT-BKL (Koord. Lab Keterampilan Klinik — klinisi-komunikator, bukan peneliti aktif)

**Cabang 2 — Kedokteran Profesi** (9 orang): ilmu klinis tahap kepaniteraan (koas). Jangkar = Penanggung Jawab KKM.
dr. Atina Irani Wira Putri Sp.PD (KKM Interna, **paling aktif meneliti**; jembatan *diusulkan* → e-nose Sabilla) · dr. Afia Nuzila Fadhlina Sp.M (KKM Mata; jembatan *diusulkan* → citra kornea I K.E. Purnama; **kornea, bukan retina**) · dr. Rahmah Yasinta Rangkuti Sp.A (**Kaprodi Profesi**, KKM Pediatri) · dr. Ratri Dwi Indriani Sp.An (KKM Anestesi + Penjaminan Mutu Prodi) · dr. Erna Furaidah Sp.Rad · dr. Ivor Wiguna H.W. Sp.B · dr. Sonny Fadli Sp.OG · dr. Desiana Widityaning Sari Sp.DV · dr. Anwar Djunaidi Sp.F

**Cabang 3 — Kedokteran Translasi** (4 orang): riset **terverifikasi** (bukan potensi) yang menjembatani ke teknologi atau ke populasi/kebijakan. **Dua tingkat kekuatan bukti dibedakan tegas:**
- **dr. Zain Budi Syulthoni Sp.KJ** — kolaborasi **empiris** (studi EEG CNN-RNN) dengan Yuri Pamungkas. *Bukti terkuat.*
- **dr. Riva Satya Radiansyah Sp.N** — kolaborasi berupa **telaah sistematis** (bukan riset empiris primer) dengan Yuri Pamungkas. Bukti nyata tetapi berbeda jenis dari Zain.
- **dr. Edwin Nugroho Njoto Sp.PD, MIPH, MHM** — jalur **populasi/kebijakan** (IKM-KP, epidemiologi lapangan kusta subklinis).
- **Dr. A.A.B. Wirayuda M.Sc.** — jalur **populasi/kebijakan** (penambat metodologi). ⚠ **Konflik kepentingan yang harus dikelola:** ia pengusul trunk pohon ini sekaligus pemohon dokumen. Penempatan dirinya di tier paling dekat dengan trunk **wajib diratifikasi pihak independen** (Wakil Dekan / Kepala Penjaminan Mutu), bukan ditetapkan sendiri.

**Kategori residual — Belum Terklasifikasi** (3 orang, dinyatakan terbuka): dr. Abdurrahman Sp.An-TI (risiko tabrakan identitas — nama umum tanpa marga, verifikasi via NIDN/ORCID) · dr. Lely Nurhayati M.H., C.M.C (tanpa jejak publikasi; gelar C.M.C jangan diterjemahkan) · Ira Resmi Melani S.Ked (status dosen vs staf belum jelas).

> **Dua koreksi faktual yang ditangkap verifikasi silang, dicatat agar tidak terulang:** (1) dr. Endah Indriastuti adalah **Kaprodi**, bukan Koordinator Lab Patologi Klinik — jabatan koordinator itu milik dr. Nazhif Haykal; jabatan Kaprodi adalah peran kepemimpinan, **bukan** bukti produktivitas riset. (2) Jangan mengklaim matriks Pilar × Platform "sudah mengusulkan" pasangan tertentu (mis. Erna Furaidah × I K.E. Purnama) kecuali benar-benar tertulis di §5 — kalau tidak, itu inferensi baru yang menyamar sebagai rujukan.

**Rekap terkait matriks (§5):** dari 4 nama cabang Translasi, tiga sudah muncul di matriks sebagai penambat klinis platform — Zain & Riva di **T1 (Biosinyal/Neuroteknologi)**, Njoto di **T5 (Telematika Kesehatan)**, Wirayuda lintas-pilar. Ini bukti dua sumbu itu konsisten, bukan bertabrakan: cabang = tahap pipeline orangnya; sel matriks = tema/alat risetnya.

### 4.2 Klaster publikasi yang sudah nyata

| Klaster | Bukti |
|---|---|
| **EEG & neuroteknologi** — klaster paling produktif | Beberapa artikel 2025 di *Journal of Robotics and Control* dan *ETASR*; "Transforming EEG into Scalable Neurotechnology" (2025) |
| **Biomekanika implan** | *Topology optimization and biomechanical evaluation of bone plates for tibial bone fractures* — **Virtual and Physical Prototyping** (Taylor & Francis), 2024; review fiksasi fraktur ekstremitas bawah, Elsevier 2025 |
| **3D printing medis** | *Application of 3D Printing Technology for Medical Purposes: A State of the Art* — **JMHT 2(1) 2025** — penulis: **Eljatin, Njoto, Pamungkas, Kuswanto** |
| **E-nose & ML** | Klasifikasi aroma, autentikasi daging, dan **deteksi diabetes berbasis e-nose (2017)** |
| **AI diagnostik citra** | CNN + SMOTE untuk deteksi pneumonia anak pada X-ray; *systematic review* AI untuk zona epileptogenik |

> **Paper JMHT 2025 itu adalah bukti konsep pohon ini.** Satu tim berisi dokter klinis + teknolog + desainer, terbit di jurnal milik fakultas sendiri. Model kolaborasi yang harus direplikasi, bukan ditemukan.

**Klaster keenam yang baru ketahuan — dan mengubah premis dokumen ini:**

| Klaster | Bukti |
|---|---|
| **EEG × klinisi — sudah berjalan, bukan aspirasi** | Yuri Pamungkas × **dr. Riva Satya Radiansyah (Sp.N)** pada *systematic review* AI zona epileptogenik (*J Robotics and Control*, 2025); Yuri Pamungkas × **dr. Zain Budi Syulthoni (Sp.KJ)** pada CNN-RNN identifikasi pascastroke (EECSI 2024) |

Draf-draf sebelumnya menyatakan klaster EEG "tidak punya pasangan klinis" dan menjadikannya kesenjangan. **Pernyataan itu salah.** Kolaborasi insinyur–klinisi yang selama ini dicari-cari sudah terjadi di dalam fakultas, hanya belum pernah tercatat karena nama kedua klinisi itu tidak ada dalam roster yang berhasil dijangkau riset terdahulu. Konsekuensinya untuk pohon: **T1 (Biosinyal & Neuroteknologi) bukan platform yang perlu dibangunkan mitra — ia platform paling matang yang dimiliki fakultas ini**, dan seharusnya diberi posisi yang sepadan.

### 4.3 Kesenjangan SDM — dan ini harus dinyatakan terbuka

| Kesenjangan | Dampak pada pohon | Mitigasi |
|---|---|---|
| ~~Tidak ada epidemiolog~~ — **TERKOREKSI.** Kapasitas epidemiologi & biostatistik **sudah ada di dalam**: Dr. Anak Agung Bagus Wirayuda (M.Sc. Epidemiology & Medical Statistics, Ph.D.) | Bukan kesenjangan. Justru ini **penambat metodologis** untuk seluruh pilar dan prasyarat kohort (§6) | Perkuat, bukan rekrut: beri peran Penanggung Jawab Metodologi lintas pilar; tambah 1–2 epidemiolog/biostatistisi yunior sebagai kaderisasi agar tidak bergantung pada satu orang |
| **Biostatistisi klinis tambahan** untuk menopang volume | Desain studi & *sample size* untuk uji diagnostik pada banyak pilar sekaligus | Dept. Statistika ITS (Lab Statistika & Sains Data Lingkungan dan Kesehatan) — mitra internal, tersedia sekarang |
| **Mikrobiologi klinik** tidak terverifikasi; **Patologi Anatomi** ada koordinator lab (dr. Rizka Nurul Hidayah, M.Biomed) tapi belum jelas berstatus spesialis Sp.PA | Pilar 3 (AMR) dan validasi biomarker terhambat | Manfaatkan Sp.PK yang ada + jejaring lab RSUD; konfirmasi status Sp.PA Rizka Nurul Hidayah; rekrut menengah bila belum |
| **Farmakologi klinik** tidak terverifikasi | Membatasi riset intervensi | Rekrut jangka menengah |
| Mayoritas dosen Kedokteran masih **M.Biomed (S2)** | Kapasitas memimpin riset mandiri terbatas | Program studi lanjut S3 terarah ke cabang pohon; jadikan mereka *co-PI* pada proyek yang dipimpin platform |
| **Afiliasi ganda** (Dhany↔T. Fisika, Syaifudin & Fahmi↔T. Mesin, Kuswanto↔Despro, **I Ketut Eddy Purnama↔T. Komputer**) | Berisiko pada perhitungan rasio dosen & *homebase* akreditasi | Perjelas status *homebase* resmi sebelum LED disusun — **ini isu administratif mendesak** |
| **Sebagian nama di roster Teknologi Kedokteran tidak punya unsur kedokteran sama sekali** — verifikasi menemukan keahlian Fahmi Mubarok seluruhnya pada pelapisan SiC, tribologi, dan *bearing* turbin angin lepas pantai | Mencantumkan mereka sebagai aset riset kedokteran akan terbaca sebagai penggelembungan oleh asesor yang memeriksa rekam jejak | Pisahkan tegas "dosen di prodi" dari "peneliti bidang kesehatan"; libatkan lewat proyek bersama yang jelas keluarannya medis, bukan lewat penempatan di bagan |
| **Ketergantungan pada satu nama di beberapa platform** — T1 pada Pamungkas, T4 pada Kuswanto & Syaifudin | Satu kepindahan atau cuti studi mematikan satu platform penuh | Wajibkan setiap platform punya dua nama dengan luaran terbukti sebelum ditetapkan sebagai unit anggaran |

---

## 5. Pohon penelitian yang diusulkan

### 5.1 Sumbu 1 — Lima Pilar (dipublikasikan)

Jumlah pilar sengaja lima. Benchmark menunjukkan jumlah tema berkorelasi dengan anggaran, bukan ambisi: Oxford 15 dan UCLH 16 adalah konsorsium NIHR ~£90–120 juta. Yang seukuran fakultas baru memilih sedikit — Melbourne 3, CUHK 3, Imperial Schools 4, **Duke-NUS 5**. FK Indonesia lazimnya 4–7 bidang unggulan.

---

#### **PILAR 1 — Deteksi Dini & Pengendalian Penyakit Tidak Menular**

*Dasar pemilihan:* Hipertensi adalah penyakit peringkat **1** dan Diabetes Mellitus peringkat **3** pada data lima puskesmas Kota Mojokerto (Puskesmas Blooto: hipertensi 4.210 kasus, DM 1.420 kasus). Renstra Kemenkes 2025–2029 menargetkan kematian akibat PTM utama turun 15%.

| Topik | Subtopik indikatif | Platform utama |
|---|---|---|
| 1.1 Skrining PTM non-invasif berbasis sensor | Analisis napas (*e-nose*) untuk diabetes; wearable tekanan darah & aritmia; *point-of-care* lipid | T2, T1 |
| 1.2 Stratifikasi risiko kardiometabolik berbasis AI | Model risiko dari data rutin puskesmas/ILP; kalibrasi pada populasi Jawa Timur | T3, T5 |
| 1.3 Deteksi dini komplikasi | Retinopati & kaki diabetik berbasis citra; skrining nefropati | T3, T2 |
| 1.4 Perubahan perilaku terdigitalisasi | Intervensi berbasis COM-B & MINDSPACE; kepatuhan terapi hipertensi | T5 |

---

#### **PILAR 2 — Kesehatan Ibu, Anak & Optimalisasi 1000 HPK**

*Dasar pemilihan:* Target nasional stunting <10% pada 2029; AKI/AKB termasuk lima isu prioritas riset kesehatan. Sudah ada Sp.OG, Sp.A, PONED 24 jam di Puskesmas Blooto, dan program GENTALA (Gerakan Tuntaskan Stunting).

| Topik | Subtopik indikatif | Platform utama |
|---|---|---|
| 2.1 Teknologi pemantauan pertumbuhan | Antropometri digital di posyandu; prediksi risiko stunting berbasis ML | T3, T5 |
| 2.2 Keselamatan maternal & neonatal | Riset sistem rujukan PONED→RSUD; deteksi dini preeklampsia | T5, T2 |
| 2.3 Skrining tumbuh kembang & neurodevelopmental | **Skrining pendengaran neonatal** (audiologi); EEG perkembangan anak | T1 |
| 2.4 Gizi & keamanan pangan lokal | Kolaborasi Puslit Agri-pangan & Bioteknologi ITS | T2 |

---

#### **PILAR 3 — Penyakit Infeksi, Resistensi Antimikroba & Ketahanan Kesehatan**

*Dasar pemilihan:* Program "Bina Desa Sehat" FKK ITS **sudah menjalankan** penyuluhan resistensi antibiotik kepada kader di Keputih dan Medokan Semampir. Ada dr. Dwinka Syafira Eljatin (M.Ked.Trop) dan dr. Endah Indriastuti (Sp.PK). TBC termasuk isu prioritas nasional. Selaras Pilar 3 Transformasi Kesehatan.

| Topik | Subtopik indikatif | Platform utama |
|---|---|---|
| 3.1 Surveilans AMR & penggunaan antibiotik komunitas | Pola swamedikasi antibiotik; literasi kader; peresepan di layanan primer | T5 |
| 3.2 Diagnostik cepat penyakit infeksi | Deteksi TB & DBD berbasis sensor/AI; skrining napas untuk infeksi paru | T2, T3 |
| 3.3 Surveilans sindromik digital & kesiapsiagaan | Integrasi SATUSEHAT; deteksi anomali dari data kunjungan puskesmas | T5, T3 |
| 3.4 Kesehatan lingkungan & vektor | Kolaborasi Teknik Lingkungan ITS; sanitasi dasar (data Mojokerto tersedia) | T5 |

---

#### **PILAR 4 — Trauma, Disabilitas & Restorasi Fungsi**

*Dasar pemilihan:* **Ini pilar dengan daya saing internasional tertinggi saat ini.** Rekam jejak sudah terbit di jurnal Q1 (*Virtual and Physical Prototyping*, Taylor & Francis 2024). Ada Syaifudin, Kuswanto, Fahmi Mubarok, Sp.B, Sp.An subspesialis nyeri (FIPP), Sp.Rad, dan audiologi. Ditopang Teknik Material ITS (implan biodegradable) dan Despro.

| Topik | Subtopik indikatif | Platform utama |
|---|---|---|
| 4.1 Implan ortopedi & fiksasi fraktur | Optimasi topologi *bone plate*; implan biodegradable; material SS316L lokal | T4 |
| 4.2 Prostesis & ortosis terjangkau | Prostesis 3D print (lanjutan "Gerakan Seribu Tangan Palsu"); *custom implant* dari data pasien | T4 |
| 4.3 Rehabilitasi & teknologi asistif | Neurorehabilitasi berbasis EEG/EMG; alat bantu dengar; teknologi *welfare* | T1, T4 |
| 4.4 Manajemen nyeri & perioperatif | Nyeri kronik (kompetensi FIPP); protokol perioperatif berbasis data | T5 |

---

#### **PILAR 5 — Sistem Kesehatan Primer, Pendidikan Kedokteran & Tata Kelola Teknologi Kesehatan**

*Dasar pemilihan:* FK Indonesia lazim menjadikan pendidikan kedokteran sebagai bidang unggulan, dan indikator akreditasi **NMKI** menghargai mata kuliah yang dikembangkan dari hasil penelitian. Ada dr. Lely Nurhayati (M.H., hukum kesehatan) dan dr. Edwin Njoto (MHM) — kombinasi langka. **Etika & regulasi AI dalam layanan kesehatan adalah ceruk yang hampir kosong di Indonesia dan sangat pas untuk FK di dalam institut teknologi.**

| Topik | Subtopik indikatif | Platform utama |
|---|---|---|
| 5.1 Riset implementasi layanan primer | Evaluasi ILP & Desa Binaan dengan RE-AIM; *community diagnosis* berbasis data | T5 |
| 5.2 Pendidikan kedokteran berbasis teknologi | Simulasi & VR; asesmen CPL; evaluasi rotasi Community Medicine | T5, T3 |
| 5.3 Etika, hukum & tata kelola AI kesehatan | Tanggung jawab hukum AI diagnostik; persetujuan data; regulasi alkes digital | — |
| 5.4 Ekonomi kesehatan & HTA teknologi frugal | Analisis biaya-manfaat inovasi FKK; kesiapan adopsi puskesmas | T5 |

---

### 5.2 Sumbu 2 — Lima Platform Teknologi (internal, unit anggaran)

| Kode | Platform | Penanggung jawab keahlian — **rekayasa** | Penambat **klinis** (baru, §4.1b) | Mitra ITS |
|---|---|---|---|---|
| **T1** | Biosinyal, Neuroteknologi & Akustik Medis | Prof. Adhi Dharma Wibawa, Yuri Pamungkas, Dr. Eng. Dhany Arifianto | **dr. Riva Satya Radiansyah (Sp.N)**, **dr. Zain Budi Syulthoni (Sp.KJ)** — keduanya sudah menulis bersama Pamungkas | Teknik Biomedik, Teknik Fisika |
| **T2** | Biosensor & Diagnostik Non-Invasif | Dr. Shoffi Izza Sabilla | dr. Endah Indriastuti (Sp.PK), **dr. Atina Irani Wira Putri (Sp.PD — TB & komplikasi DM)** | Teknik Instrumentasi, Teknik Biomedik, Kimia |
| **T3** | AI Medis, Pencitraan & Sains Data Kesehatan | **Prof. Dr. I Ketut Eddy Purnama** (guru besar, §4.1a), Yuri Pamungkas | dr. Erna Furaidah (Sp.Rad), **dr. Afia Nuzila Fadhlina (Sp.M — morfometri citra)** | **PUI-AIHeS**, **Puslit KATK**, Statistika, Teknik Informatika |
| **T4** | Biomaterial, Biomekanika & Manufaktur Medis | Achmad Syaifudin Ph.D, Djoko Kuswanto | dr. Ivor Wiguna H.W. (Sp.B) | Teknik Material (Prof. Agung Purniawan), Teknik Mesin, Despro |
| **T5** | **Telematika Kesehatan**, Interoperabilitas & Sains Implementasi | **Prof. Dr. I Ketut Eddy Purnama** (bidang guru besarnya persis ini) | dr. Edwin Njoto (MIPH, MHM), dr. Lely Nurhayati (M.H.) | Sistem Informasi, Teknik Informatika, Pusat Kajian PDPM |

**Dua perubahan dari draf sebelumnya:**

1. **Kolom penambat klinis ditambahkan.** Draf lama hanya mencantumkan sisi rekayasa, sehingga platform tampak sebagai unit teknik murni — persis kelemahan yang membuat pohon FK berbasis teknologi gagal dibaca asesor kedokteran. Setiap platform kini wajib punya nama klinis, dan **semuanya sudah terisi dari SDM internal**.
2. **T5 diganti namanya menjadi "Telematika Kesehatan"** — istilah resmi bidang guru besar Wakil Dekan. Ini membuat platform berdiri di atas bidang keilmuan yang sudah diakui pada tingkat pengukuhan profesor, bukan istilah yang dikarang penyusun RIP.

**Aturan tata kelola:** setiap kelompok riset dan setiap judul penelitian memiliki **koordinat (Pilar, Platform)** — bukan satu kotak. Matriks 5×5 menghasilkan 25 sel; tidak semua harus terisi. Sel kosong adalah peta rekrutmen. Syarat penetapan sebagai unit anggaran: **dua nama dengan luaran terbukti per platform** (§4.3) — hari ini T1, T3, dan T4 memenuhinya; T2 dan T5 belum.

### 5.3 Lapis ketiga — Wahana Translasi

Bukan pilar, melainkan lahan tempat kelima pilar diuji. Inilah yang membuat kata "pencegahan" dapat dibuktikan:

```
T0–T1  Laboratorium ITS (Biomedik, Material, Despro, Statistika, Anatomi FKK)
T2     ITS Medical Center · Klinik mitra
T3     RSUD dr. Wahidin Sudiro Husodo (RSPU) · RSUD RA Basoeni (satelit)
T4     Desa Binaan Kota Mojokerto (5 puskesmas) · Bina Desa Sehat Sukolilo/Keputih
```

---

## 6. Rekomendasi tunggal terpenting: Platform Surveilans Desa Binaan

> **Revisi mendasar, Agustus 2026.** Draf sebelumnya mengusulkan "Kohort Sehat Mojokerto" sebagai kohort prospektif penuh bergaya Rotterdam. Benchmark terhadap Rotterdam Study, Framingham, UK Biobank, HDSS Agincourt & Matlab, HDSS Sleman (UGM), Studi Kohort PTM Bogor, dan IFLS **membantah kelayakan bentuk itu untuk fakultas berumur tiga tahun** — dan memberi bentuk pengganti yang justru lebih kuat. Rekomendasinya tetap: bangun aset longitudinal di Desa Binaan. Yang berubah adalah **bentuk, penahapan, dan cara menuliskannya di RIP.**

### 6.1 Mengapa bentuk lama ditolak

Kohort prospektif penuh — ronde pemeriksaan klinis berulang, biobank, luaran insidens — menuntut prasyarat yang tidak dimiliki FKK ITS: Erasmus MC sudah punya departemen epidemiologi matang saat memulai 1990; Framingham disokong pemerintah federal AS; UK Biobank butuh konsorsium nasional. Pembanding domestik terdekat, **HDSS Sleman**, dijalankan FK-KMK UGM yang berumur lebih dari 75 tahun dengan bangku epidemiologi dan biostatistik tebal. Menjanjikan kohort penuh di RIP adalah janji yang akan terlihat gagal pada reakreditasi berikutnya.

**Dan ada masalah pembeda.** UGM (Sleman, Purworejo) serta Badan Kebijakan Pembangunan Kesehatan (Kohort PTM Bogor) sudah lebih dulu dan lebih besar. Kohort 5.000 jiwa yang dibingkai sebagai "Rotterdam versi Mojokerto" akan selalu terbaca sebagai versi kecil dari sesuatu yang sudah ada.

### 6.2 Bentuk yang diusulkan — dan pembedanya

**Bingkai ulang sebagai: TESTBED TEKNOLOGI KEDOKTERAN PADA POPULASI TERDEFINISI.**

Populasi yang terenumerasi penuh, ter-*consent*, dan ter-*geotag* adalah substrat yang persis dibutuhkan untuk **memvalidasi sensor, algoritma skrining berbasis AI, dan alat *point-of-care* pada kondisi dunia nyata** — dan ITS punya fakultas teknik yang tidak dimiliki FK konvensional. Inilah yang tidak bisa ditiru: bukan kohortnya, melainkan kohort **yang menempel pada pabrik teknologi medis**.

Ini juga menjawab pertanyaan "apa bedanya dengan Sleman" dengan jawaban yang jujur dan kuat, alih-alih klaim "kami juga punya kohort".

### 6.3 Penahapan — bentuk minimum yang layak

| Tahap | Isi | Luaran yang dijanjikan |
|---|---|---|
| **Tahap 0** (bulan 0–12) | **Sensus dasar, bukan kohort.** Enumerasi lengkap 1–2 desa binaan: register rumah tangga bernomor, register individu bernomor, *geotag* tiap rumah tangga. Dua instrumen saja: roster demografi + modul faktor risiko pendek. Skala ±1.000–2.000 rumah tangga (±4.000–8.000 jiwa) | Naskah **prevalensi** & pengelompokan faktor risiko (12–18 bulan) |
| **Tahap 1** (tahun 2–5) | **Ronde pembaruan tahunan**: hanya mencatat kelahiran, kematian, pindah masuk, pindah keluar + autopsi verbal untuk sebab kematian. Studi tersarang mulai ditumpangkan | **Validasi alat skrining** & studi tersarang |
| **Tahap 2** (tahun 7–10) | Kohort matang | Insidens & etiologi |

**Adopsi instrumen, jangan bikin sendiri.** Modul faktor risiko harus sengaja diadaptasi dari **SKI/Riskesdas atau WHO STEPS** agar hasilnya sebanding dengan data nasional. Pada tahap ini kesebandingan jauh lebih berharga daripada orisinalitas.

### 6.4 Enam keputusan yang gratis sekarang dan mustahil diperbaiki nanti

1. **Tetapkan desa pembanding sejak hari pertama.** Pelajaran Matlab: membagi wilayah menjadi area intervensi dan area pembanding secara permanen membuat setiap program baru otomatis punya kontrol. Jika FKK ITS memberi intervensi ke **semua** desa binaan sekaligus — dorongan yang sulit ditolak karena terasa lebih adil — maka tidak satu pun klaim efektivitas dapat dipertahankan secara metodologis. **Ini butir tunggal paling berdampak dalam seluruh dokumen.**
2. **Anggarkan tiga ronde pembaruan SEBELUM menyetujui sensus dasar.** Kendala pengikat sesungguhnya bukan rekrutmen, melainkan **ronde kedua**: mayoritas kohort universitas mati di antara data dasar dan pembaruan pertama karena tidak ada yang menganggarkan lanjutannya. Jika tiga ronde tidak terbiayai, **kecilkan sensus dasarnya**.
3. **Jadikan kurikulum sebagai tenaga lapangan.** Biaya terbesar HDSS adalah pencacah. FKK ITS punya mahasiswa yang wajib menjalani blok IKM/kedokteran komunitas. Rancang ronde pembaruan sebagai penugasan akademik terstruktur dan dinilai, selesai dalam satu periode blok — maka platform tetap berjalan pada tahun anggaran kering. Konsekuensinya: **supervisi mutu data wajib**, karena data mahasiswa tanpa supervisi tidak layak publikasi.
4. **Susun cakupan *informed consent* untuk seumur hidup studi.** Rotterdam Study tidak dapat membuka datanya sampai hari ini karena batasan *consent* yang ditulis pada 1990. *Consent* FKK ITS harus mencakup sejak awal: tindak lanjut jangka panjang tanpa batas waktu, penautan ke rekam medis dan data Puskesmas/BPJS, penyimpanan spesimen untuk penggunaan masa depan yang belum ditentukan, dan berbagi data dengan peneliti luar termasuk luar negeri.
5. **Tulis tata kelola data sebelum mengumpulkan data.** Adopsi kerangka UK Biobank pada skala desa: komite akses yang terpisah dari pendiri studi, kamus data terbuka, formulir aplikasi baku, tarif pemulihan biaya, kebijakan publikasi, dan — yang paling sering gagal — **aturan tegas bahwa pendiri tidak punya jendela eksklusif di luar embargo**. Data yang dikuasai satu-dua orang sampai basi adalah penyebab utama kohort universitas mati muda.
6. **Pilih jalur data terbuka, bukan tertutup.** Bandingkan Rotterdam (tertutup, reputasi dari institusi yang sudah mapan) dengan **IFLS** (dibuka bebas, menjadi salah satu sumber data Indonesia paling banyak disitasi dunia). FKK ITS tidak punya modal reputasi Erasmus MC, jadi jalur Rotterdam tidak tersedia. Jalur IFLS tersedia dan murah.

### 6.5 Jalur kedua yang berjalan paralel — dan lebih cepat berbuah

**Kohort berbasis register.** Model Karolinska membuktikan epidemiologi kelas dunia bisa dijalankan tanpa mengumpulkan data primer sama sekali, dengan menautkan register. Indonesia punya bahan setara yang belum digarap: **NIK, klaim BPJS Kesehatan, register Puskesmas/SIMPUS**. Biaya per subjek mendekati nol, ukuran sampel bisa ratusan ribu, luaran cepat — dan ini **jauh lebih cocok dengan identitas "berbasis teknologi"** daripada kerja lapangan konvensional, serta tidak menuntut bangku epidemiologi lapangan yang tebal.

RIP sebaiknya memuat **dua jalur paralel**: jalur lapangan (Desa Binaan — lambat tapi khas) dan jalur data (register/BPJS — cepat dan murah), agar fakultas punya luaran sambil menunggu platform lapangan matang.

*Alternatif lebih ringan bila kohort tertutup terlalu berat:* **potong lintang berulang** model REACT (Imperial) — sampel acak komunitas berulang kali alih-alih melacak orang yang sama. Tidak menderita atrisi, tidak butuh sistem pelacakan migran (biaya terbesar panel Indonesia), lebih tahan pergantian staf, dan tetap sah disebut surveilans populasi. Kelemahannya (tidak bisa menghitung insidens individual) tidak mengikat pada 3–5 tahun pertama.

### 6.6 Keberlanjutan

Jejaring INDEPTH — jejaring HDSS internasional bereputasi tinggi — tetap bisa berhenti ketika pendanaan donor mengering. Karena itu tambatkan platform ini pada dua hal yang **tidak bergantung hibah**: **(a) kurikulum**, sehingga ronde lapangan berjalan sebagai kegiatan akademik wajib; dan **(b) nota kesepahaman dengan Dinkes dan Puskesmas Kota Mojokerto**, dengan syarat platform menghasilkan sesuatu yang memang diinginkan pemerintah daerah — misalnya **laporan profil kesehatan desa tahunan**. Platform yang melayani kebutuhan nyata mitra lokal akan dipertahankan mitra tersebut; platform yang hanya melayani publikasi akan ditinggalkan saat hibah habis.

### 6.7 Kepemimpinan dan langkah pertama

**Prasyarat metodologisnya sudah terpenuhi.** Penanggung jawab desain tersedia di dalam fakultas: Dr. Anak Agung Bagus Wirayuda (M.Sc. Epidemiology & Medical Statistics, Ph.D.), yang rekam jejaknya persis pada jenis pekerjaan ini — pemodelan determinan tingkat populasi, epidemiologi penyakit tular-vektor, dan pengembangan model prognostik di layanan primer Indonesia. Platform ini sebaiknya berada di bawah kepemimpinan metodologisnya sejak protokol, dengan **dr. Edwin Njoto (IKM-KP, MIPH, MHM)** sebagai penambat kedua dari sisi kesehatan masyarakat dan sistem layanan.

Prasyarat administratif: **KEPK ber-nomor registrasi KEPPKN** (lihat §8.5), tata kelola data & *consent*, dan PKS dengan Dinkes Kota Mojokerto.

> **Langkah paling praktis, bisa dilakukan minggu ini, dan tidak butuh akses internet:** hubungi **FK-KMK UGM** mengenai HDSS Sleman dan pengalaman Purworejo, serta **Badan Kebijakan Pembangunan Kesehatan** (eks Balitbangkes) mengenai Studi Kohort PTM Bogor. Mereka punya protokol, instrumen, struktur biaya nyata, dan — yang paling berharga — daftar kesalahan yang sudah mereka bayar mahal. Satu percakapan dengan pengelola HDSS Sleman kemungkinan bernilai lebih daripada seluruh riset daring tentang Rotterdam dan Framingham, karena konteks sumber daya, regulasi etik, dan struktur pemerintahan desanya sama persis. **Dekati sebagai mitra, bukan pesaing.**

---

## 7. Portofolio penelitian yang layak dimulai berdasarkan SDM yang ada

Tabel ini menjawab langsung pertanyaan "penelitian apa yang bisa dibuat berdasarkan kesediaan SDM". Tingkat kesiapan:
**[A]** dapat dimulai sekarang dengan SDM internal · **[B]** perlu mitra internal ITS atau RSUD · **[C]** perlu rekrutmen atau mitra eksternal

| # | Usulan penelitian | Koordinat | Kesiapan | Basis SDM/aset |
|---|---|---|---|---|
| 1 | Validasi *e-nose* napas untuk skrining diabetes pada populasi Desa Binaan | P1 × T2 | **A** | Sabilla sudah publikasi e-nose diabetes; DM 1.420 kasus di Blooto |
| 2 | Model prediksi risiko hipertensi dari data kunjungan puskesmas rutin | P1 × T3 | **A** | Statistika ITS + data 5 puskesmas di repositori ini |
| 3 | Wearable pemantauan tekanan darah & kepatuhan terapi hipertensi | P1 × T2/T5 | **B** | T. Instrumentasi + Edwin Njoto (Sp.PD) |
| 4 | Deteksi kaki diabetik berbasis citra di layanan primer | P1 × T3 | **B** | PUI-AIHeS + dr. Atina (Sp.PD, publikasi komplikasi berat DM). *Retinopati sengaja dikeluarkan — lihat Koreksi 1 §4.1b* |
| 5 | Intervensi perubahan perilaku berbasis COM-B/MINDSPACE untuk PTM | P1 × T5 | **A** | Kerangka sudah dipakai di *white paper* Desa Binaan |
| 6 | Prediksi risiko stunting berbasis ML dari data posyandu | P2 × T3 | **A** | Statistika ITS + program GENTALA |
| 7 | Evaluasi RE-AIM program GENTALA sebagai riset implementasi | P2 × T5 | **A** | Kerangka RE-AIM sudah ada di dashboard ini |
| 8 | Skrining pendengaran neonatal berbasis akustik terjangkau | P2 × T1 | **C** | Dhany Arifianto + PONED Blooto. **Turun dari B:** mitra klinis audiologi ITS saat ini eksternal (UNAIR); butuh internalisasi lebih dulu — lihat Koreksi 2 §4.1b |
| 9 | Analisis sistem rujukan maternal PONED → RSUD Wahidin | P2 × T5 | **B** | Sp.OG + PKS RSUD; data PONED Blooto tersedia |
| 10 | Survei penggunaan & swamedikasi antibiotik di komunitas | P3 × T5 | **A** | Program Bina Desa Sehat AMR sudah berjalan; M.Ked.Trop |
| 11 | Pola resistensi antimikroba di RSUD pendidikan | P3 × T2 | **B** | Sp.PK + lab RSUD |
| 12 | Skrining TB berbasis analisis napas (*breathprint*) | P3 × T2 | **A** | **Naik dari B.** Sabilla (e-nose) + dr. Atina (Sp.PD — 2 dari 4 publikasinya TB paru) + dr. Eljatin (M.Ked.Trop). Otoritas klinis & akses kasus sudah internal |
| 13 | Surveilans sindromik digital lintas puskesmas Kota Mojokerto | P3 × T5 | **B** | Dashboard repositori ini sebagai purwarupa; SATUSEHAT |
| 14 | Optimasi topologi *bone plate* dengan material lokal (SS316L) | P4 × T4 | **A** | Syaifudin — sudah terbit di jurnal Q1 |
| 15 | Registri implan & luaran fraktur di RSUD pendidikan | P4 × T4 | **B** | Sp.B + Syaifudin + RSUD |
| 16 | Prostesis tangan/kaki 3D print untuk amputasi diabetik | P4 × T4 | **A** | Kuswanto — "Gerakan Seribu Tangan Palsu" sudah berjalan |
| 17 | *Custom cranial implant* dari data citra pasien | P4 × T4/T3 | **B** | Kuswanto (preseden implan tempurung kepala) + Sp.Rad |
| 18 | Neurorehabilitasi pascastroke berbasis EEG/EMG | P4 × T1 | **A** | Wibawa & Pamungkas + **dr. Riva (Sp.N)** & **dr. Zain (Sp.KJ)** — ketiganya sudah pernah menulis bersama |
| 19 | Desain & simulasi stent berbasis FEM | P4 × T4 | **A** | Riset berjalan Syaifudin |
| 20 | Skrining kognitif lansia berbasis EEG di posyandu lansia | P1/P4 × T1 | **A** | **Naik dari B.** Pamungkas + dr. Riva (Sp.N) + wahana Desa Binaan |
| 21 | Tanggung jawab hukum & tata kelola AI diagnostik di Indonesia | P5 × — | **B** | Lely Nurhayati (M.H.) — ceruk hampir kosong, tetapi **tidak ditemukan jejak publikasi**; butuh mitra metodologi. *Perluasan 'C.M.C = mediator' tidak berdasar — lihat §10* |
| 22 | HTA & analisis biaya-manfaat inovasi alkes frugal FKK ITS | P5 × T5 | **B** | Edwin Njoto (MHM) + Teknik Industri ITS |
| 23 | Evaluasi rotasi Community Medicine terhadap capaian CPL | P5 × T5 | **A** | Data kurikulum & CPL sudah terdokumentasi di repositori ini |
| 24 | Kesiapan adopsi teknologi kesehatan digital oleh nakes puskesmas | P5 × T5 | **A** | Jejaring 5 puskesmas + Sistem Informasi ITS |
| 25 | **Protokol sensus dasar Platform Surveilans Desa Binaan** (Tahap 0, §6.3) | lintas pilar | **A** | Wirayuda (PJ metodologi) + Njoto (IKM-KP). *Judul direvisi dari "Kohort Sehat Mojokerto" mengikuti §6* |
| 26 | Model prognostik untuk transisi penyakit di layanan primer (replikasi & perluasan model nyeri punggung bawah ke PTM) | P1/P5 × T3 | **A** | Wirayuda — model prognostik layanan primer sudah terbit 2025 |
| 27 | Epidemiologi & pemodelan risiko DBD di Kota Mojokerto | P3 × T3/T5 | **A** | Wirayuda — determinan wabah dengue (Oman) & *review* penyakit tular-vektor MENA |
| 28 | Analisis determinan sosial kesehatan & disparitas angka harapan hidup Jawa Timur | P1/P5 × T3 | **A** | Wirayuda — pemodelan angka harapan hidup & determinan sosial negara OIC |
| 29 | **Analisis citra mikroskopi spekular endotel kornea berbasis AI** | P4/P1 × T3 | **A** | **Baru.** dr. Afia (Sp.M — sudah publikasi morfometri endotel kornea) × Prof. I Ketut Eddy Purnama (analisis citra mikroskopik). Irisan metode yang sudah dikuasai kedua pihak, bukan yang dipaksakan |
| 30 | **Deteksi otomatis basil TB pada apusan sputum** | P3 × T3 | **A** | **Baru.** Prof. I Ketut Eddy Purnama sudah meneliti mikroskopi sputum TB + dr. Atina (Sp.PD, TB) + dr. Endah Indriastuti (Sp.PK, lab) |
| 31 | **EEG untuk skrining gangguan jiwa di layanan primer** (depresi/ansietas) | P1/P5 × T1 | **A** | **Baru.** dr. Zain (Sp.KJ) sudah menguasai alur EEG + *deep learning*, dan berwenang menegakkan diagnosis baku emas sebagai label model |
| 32 | **Kohort berbasis register: penautan data BPJS/SIMPUS Kota Mojokerto** | lintas pilar × T5 | **B** | **Baru — jalur cepat §6.5.** Wirayuda + Njoto (MHM) + Prof. I Ketut Eddy Purnama (telematika kesehatan). Butuh izin akses data, bukan rekrutmen |
| 33 | **Arsitektur interoperabilitas & tata kelola data kesehatan desa** (SATUSEHAT-ready) | P5 × T5 | **A** | **Baru.** Prof. I Ketut Eddy Purnama — bidang guru besarnya persis ini; dashboard repositori ini sebagai purwarupa |
| 34 | Pemodelan risiko kusta subklinis pada kontak serumah | P3 × T3 | **B** | **Baru.** Njoto sudah publikasi determinan kusta subklinis (PeerJ 2026) + Wirayuda (pemodelan); butuh wilayah endemik mitra |

**Catatan cara pakai:** butir **[A]** cukup untuk mengisi 2–3 tahun pertama roadmap. Ini penting karena jendela data akreditasi hanya **3 tahun terakhir (TS, TS-1, TS-2)** — target tahun 1–3 harus realistis dan pasti tercapai, karena justru itulah yang akan dinilai.

---

## 8. Tata kelola: agar pohon ini bukan sekadar poster

### 8.1 Empat pengait wajib per pilar

Dari benchmark NIHR, Karolinska, Duke-NUS, dan Melbourne: sebuah tema hanya nyata bila punya keempatnya. Institusi yang gagal biasanya punya (1) tanpa (2)–(4).

1. **Ketua Pilar** yang ditetapkan dengan SK, bernama.
2. **Garis anggaran sendiri.** Tema tanpa dana bukan tema.
3. **Rencana rekrutmen** yang terikat pada pilar itu (*cluster hiring*).
4. **Tanggal review** yang sudah terjadwal.

### 8.2 Siklus

**5 tahun, dengan tinjauan tengah jalan di tahun ke-3**, disinkronkan dengan RPJMN & Renstra Kemenkes 2025–2029 sehingga argumen keselarasan nasional menjadi otomatis. Nyatakan secara eksplisit dalam dokumen bahwa **pilar dapat dihapus** — kemampuan menutup tema adalah tanda tata kelola riset yang matang, dan fakultas baru paling rentan menumpuk tema tanpa pernah menutupnya.

### 8.3 Mekanisme penegakan — tiru FK UB

Unsur ke-2 indikator C.7 ("dosen dan mahasiswa melaksanakan penelitian sesuai peta jalan") paling efektif ditegakkan lewat mekanisme, bukan imbauan:

> **Formulir "Pohon Penelitian" wajib diisi dan dilampirkan saat pengajuan judul tugas akhir**, memaksa setiap mahasiswa memposisikan topiknya pada cabang pohon fakultas sejak awal.

Ini menghasilkan bukti kesesuaian secara otomatis dan berkelanjutan, bukan retrospektif menjelang visitasi. Terapkan hal setara untuk proposal hibah internal: kesesuaian dengan peta jalan sebagai kriteria seleksi.

### 8.4 Evaluasi kesesuaian — unsur yang paling sering menggugurkan

Banyak prodi punya peta jalan (unsur 1) dan penelitian yang kebetulan sesuai (unsur 2), lalu kehilangan skor karena tidak pernah melakukan **evaluasi kesesuaian formal (unsur 3)** dan tidak menutup lingkar perbaikan **(unsur 4)**.

Buat instrumen tahunan berupa matriks `Judul Penelitian × Cabang Pohon` dengan kolom *sesuai / sesuai sebagian / tidak sesuai*, persentase kesesuaian, analisis penyebab, dan rekomendasi. Terbitkan sebagai **Berita Acara + Laporan bertanda tangan Dekan**, lalu tunjukkan **revisi peta jalan bernomor versi** (v1.0 → v2.0) sebagai bukti bahwa lingkar PPEPP benar-benar berputar.

### 8.5 Mekanisme operasional — dari praktik SPMI/AMI yang terverifikasi

Butir-butir berikut diambil dari sistem penjaminan mutu dan SIM-LPPM perguruan tinggi Indonesia yang teksnya terbaca langsung (bukan dari ringkasan), sehingga rumusannya dapat disalin dengan sedikit penyesuaian.

**a. Wajibkan koordinat pohon pada setiap pengajuan.** Blueprint SIM-LPPM Indonesia yang terbaca memuat 16 modul (Proposal → RAB → Cek Similarity → Penugasan Reviewer & COI → Penilaian → *Ethical Clearance* → Kontrak → Logbook → Monev → Pencairan → Luaran → Laporan Akhir) tetapi **tidak satu pun modul pemetaan ke peta jalan**. FKK ITS harus menambahkannya dengan sengaja: dua *dropdown* wajib — **Pilar (P1–P5)** dan **Platform (T1–T5)** — sehingga setiap usulan lahir dengan koordinat matriks. Aturannya tegas: *proposal tanpa koordinat tidak dapat disimpan*, bukan sekadar tidak disarankan.

**b. Sasar jarak skor 3 → 4, bukan sekadar lulus.** Rubrik LAM yang terbaca memisahkan skor 4 dari skor 3 hanya oleh dua hal: (i) sistem berbasis TIK yang **menyebarluaskan** — bukan sekadar mendokumentasikan — proses dan hasil penelitian kepada publik, dan (ii) bukti hasil evaluasi dipakai untuk perbaikan. Untuk (i), **dashboard publik pohon penelitian sudah setengah terbangun di repositori ini** dan tinggal diarahkan.

**c. Instrumen evaluasi kesesuaian dengan lima kolom baku**, meniru daftar tilik AMI yang terverifikasi: `Pertanyaan | Indikator | Sumber Data | Metode Perhitungan | Target`. Pertanyaan bakunya sudah ada dalam praktik AMI Indonesia, verbatim: *"Apakah UPPS sudah melakukan evaluasi kesesuaian penelitian dosen dengan peta jalan?"* Isi kolom Metode Perhitungan dengan **persentase kesesuaian**, bukan "ketersediaan dokumen" seperti yang lazim — di situlah FKK ITS bisa melampaui praktik umum.

**d. Jadwalkan enam tahap AMI, bukan empat.** Alur yang terverifikasi: persiapan → pelaksanaan → temuan → laporan → **tindak lanjut → verifikasi**, ditutup Rapat Tinjauan Manajemen yang berakhir pada notulen. Dua tahap terakhir itulah yang membuktikan lingkar PPEPP berputar. Gunakan kategori temuan baku **KTS** (Ketidaksesuaian) dan **OB** (Observasi).

**e. Hindari pola gagal khas unit baru — dan ini persis profil FKK ITS.** Laporan AMI nyata yang terbaca mendiagnosis unit muda sebagai *"aktif dalam Perencanaan dan Pelaksanaan (P-P), kosong pada Evaluasi–Pengendalian–Peningkatan (E-P-P)"*, dengan akar penyebab *"belum pernah diaudit sebelumnya, sehingga tindak lanjut audit sebelumnya belum ada"*. Tindakan konkret: **jadwalkan AMI pertama sekarang meski dokumennya belum lengkap.** Temuan tahun pertama adalah aset, karena hanya siklus kedua yang bisa membuktikan peningkatan.

**f. Klausul kelompok riset yang bisa disalin apa adanya.** Standar SPMI terverifikasi: *"Lembaga penelitian membentuk kelompok riset sesuai dengan renstra penelitian"*, dengan tiga indikator bukti — (1) bukti legal formal keberadaan kelompok riset; (2) bukti aktif dalam jejaring nasional maupun internasional; (3) bukti menghasilkan produk riset yang bermanfaat menyelesaikan permasalahan masyarakat. *Jumlah anggota minimum tidak ditemukan — ambil dari Panduan Penelitian DRPM ITS, jangan dikarang.*

**g. Skema hibah internal berjenjang untuk menutup kesenjangan SDM §4.3.** Tiru pola tiga skema yang terverifikasi: **Dosen Muda** (ketua S2, maksimal Asisten Ahli) untuk mayoritas dosen M.Biomed; **Dosen Utama** (ketua minimal Lektor, atau Asisten Ahli S3 dengan rekam jejak penulis pertama/*corresponding*); dan **Kolaborasi Luar Negeri**. Adopsi juga klausul penegak yang paling murah dan paling efektif: pelamar *tidak punya utang luaran wajib dari hibah periode sebelumnya*. Tambahkan syarat khas FKK: kesesuaian dengan cabang pohon sebagai kriteria seleksi berbobot.

**h. Pakai UKCRC HRCS sebagai kosakata pemetaan.** Alasannya dapat dipertahankan: strukturnya dua sumbu (*Health Categories* × *Research Activity Codes*) yang **berpadanan langsung dengan matriks Pilar × Platform**; tersedia gratis dan mesin-terbaca; dan sudah terbukti dipakai sebagai field resmi sistem informasi riset nasional Norwegia. Cara pakai: tandai setiap publikasi dan proposal dengan satu *Health Category* dan satu *Research Activity Code* di samping koordinat internal. *Catatan: NIH RCDC, GBD, WHO, dan OECD Frascati tidak dapat diverifikasi pada sesi riset ini — jangan menulis klaim komparatif antar-taksonomi sebelum keempatnya dibaca.*

**i. Turunkan "rasio riset translasi" dari sumbu Research Activity HRCS.** Karena instrumen Indonesia yang terbaca berhenti pada hitungan publikasi, indikator ini harus dikonstruksi sendiri: proporsi portofolio pada grup hilir (*Detection, Screening and Diagnosis*; *Prevention and Promotion of Well-Being*; *Management of diseases*) terhadap grup hulu (*Underpinning research*; *Aetiology*). **Bagi fakultas yang mengklaim "kedokteran pencegahan", proporsi pada grup Prevention adalah indikator identitas yang paling jujur** — dan paling sulit dibantah asesor. Tandai di dokumen bahwa ini konstruksi FKK ITS, bukan praktik yang sudah lazim di Indonesia.

**j. Pasang indikator kuantitatif lazim sebagai lantai, bukan target.** Ambang yang benar-benar dipakai SPMI Indonesia dan terbaca verbatim: rasio publikasi jurnal internasional bereputasi terhadap dosen tetap **≥10%**; jurnal nasional terakreditasi/internasional **≥50%**; seminar & media massa **≥35%**; artikel disitasi **≥17%**; dosen memperoleh rekognisi eksternal **>15%/tahun**. Empat indikator non-publikasi yang tersedia dan jarang dipakai — **rekognisi eksternal, keterlibatan peneliti asing, inkubator hasil penelitian, unit bisnis hasil penelitian** — adalah tempat FKK ITS bisa menonjol tanpa mengejar volume publikasi.

**k. Bentuk KEPK dengan kerangka baku sejak hari pertama.** Telaah mengikuti **7 Standar WHO 2011** (Nilai Sosial · Nilai Ilmiah · Pemerataan Beban dan Manfaat · Risiko · Bujukan/Eksploitasi · Kerahasiaan dan *Privacy* · Persetujuan Setelah Penjelasan) merujuk Pedoman CIOMS 2016 dan Pedoman KEPPKN. Sediakan tiga jenis surat (persetujuan, perbaikan, pembebasan) dan empat klasifikasi hasil telaah yang terbaca verbatim: *Exempted · Expedited · Full Board · Discontinuing*.

**l. Daftarkan KEPK ke KEPPKN untuk memperoleh nomor registrasi.** Surat laik etik yang lazim mencetak baris *"Nomor Registrasi Pada KEPPKN"* beserta masa berlaku. Tanpa nomor registrasi, surat yang diterbitkan tidak berformat lazim di mata jurnal dan mitra. **Ini prasyarat operasional Platform Surveilans Desa Binaan — kerjakan sebelum protokol disusun, bukan sesudah.**

**m. Jadikan *ethical clearance* gerbang penerbitan kontrak, bukan dokumen yang menyusul.** Urutan yang terverifikasi: usulan → cek similarity → penugasan reviewer + deklarasi konflik kepentingan → penilaian → **ethical clearance → kontrak/SPP** → logbook → monev → pencairan termin → luaran → laporan akhir. *Deklarasi COI reviewer adalah artefak yang paling sering terlupakan fakultas baru dan paling murah untuk diadakan.*

**n. Produksi Berita Acara Monev sebagai luaran otomatis sistem.** Template *"BERITA ACARA MONITORING DAN EVALUASI"* yang di-*generate* dari data proposal sudah menjadi praktik berjalan di LPPM Indonesia. Ini yang mengubah bukti kesesuaian dari retrospektif menjadi berkelanjutan.

**o. Bangun pengklasifikasi otomatis judul tugas akhir ke cabang pohon — sebagai proyek Pilar 5.** Sudah ada preseden Indonesia: klasifikasi judul dan abstrak skripsi ke Kelompok Bidang Keahlian dengan *decision tree*, menghasilkan probabilitas per kelompok. Bagi FKK ITS ini bernilai ganda — menjadi bukti unsur 3 yang berjalan otomatis **dan** menjadi objek penelitian pendidikan kedokteran berbasis teknologi yang dikerjakan Prodi Teknologi Kedokteran sendiri.

**p. Cantumkan klausul "masukan dari *stakeholders*" sebagai dasar formal uji publik.** Indikator SPMI terverifikasi menuntut Renstra Penelitian disusun *"dengan mempertimbangkan masukan dari stakeholders"* dan pedomannya *"disosialisasikan, mudah diakses, serta dipahami oleh semua pemangku kepentingan"*. Ini landasan untuk mengundang Dinkes Kota Mojokerto, RSUD dr. Wahidin Sudiro Husodo, dan RSUD RA Basoeni ke uji publik roadmap — **dan berita acaranya menjadi bukti dua unsur sekaligus**.

---

## 9. Persyaratan akreditasi yang harus dipenuhi

### 9.1 Teks indikator yang menjadi dasar (Kriteria C.7 — Penelitian)

Rumusan ini identik lintas instrumen turunan IAPS 4.0:

> **"Relevansi penelitian pada UPPS mencakup unsur-unsur sebagai berikut:**
> **1) memiliki peta jalan yang memayungi tema penelitian dosen dan mahasiswa serta pengembangan keilmuan program studi;**
> **2) dosen dan mahasiswa melaksanakan penelitian sesuai dengan agenda penelitian dosen yang merujuk kepada peta jalan penelitian;**
> **3) melakukan evaluasi kesesuaian penelitian dosen dan mahasiswa dengan peta jalan; dan**
> **4) menggunakan hasil evaluasi untuk perbaikan relevansi penelitian dan pengembangan keilmuan program studi."**

**Kriteria C.8 (PkM) memakai rumusan cermin** dengan penggantian "penelitian" → "PkM". Karena itu **dibutuhkan dua peta jalan, bukan satu.**

Penilaian bersifat kumulatif per unsur; tidak memiliki peta jalan berarti skor nol.

> **Status verifikasi teks ini — kuat.** Riset Agustus 2026 menemukan rumusan empat unsur di atas muncul **kata-per-kata di lima repositori sistem akreditasi/AMI perguruan tinggi Indonesia yang tidak saling terkait**. Ini satu-satunya klaim akreditasi dalam dokumen ini yang lolos korroborasi silang independen — sisanya (jumlah kriteria 9 vs 8, ambang batas peringkat, panduan asesor) **tidak berhasil diverifikasi sama sekali** karena `lamptkes.org` dan seluruh domain `.ac.id` diblokir. Angka ambang batas peringkat adalah area dengan risiko fabrikasi tertinggi: ia terdengar sangat spesifik dan sangat meyakinkan justru ketika dikarang. **Jangan mencantumkan satu pun angka ambang sebelum instrumen resminya diunduh.**

### 9.1a Rubrik bertingkat — di mana skor jatuh

Rubrik instrumen LAM kualitatif yang terbaca verbatim menunjukkan skor **4** menuntut lima elemen, dan yang membedakannya dari skor **3** hanyalah dua hal:

1. **UPPS menerapkan sistem berbasis TIK yang andal untuk *menyebarluaskan*** — bukan sekadar mendokumentasikan — proses dan hasil penelitian kepada publik.
2. **Hasil evaluasi benar-benar dipakai untuk perbaikan** (unsur 4 yang berjalan, bukan yang dinyatakan).

Elemen lain yang dituntut skor 4: tata kelola penelitian yang andal, jelas, transparan; kepatuhan kode etik; dan prosedur terdokumentasi yang mudah diakses.

**Implikasi langsung:** dashboard publik yang menampilkan setiap judul penelitian beserta cabang pohonnya bukan sekadar hal yang bagus dimiliki — ia adalah **salah satu dari dua pembeda skor 3 dan 4**, dan purwarupanya sudah ada di repositori ini.

### 9.2 Rantai kesesuaian yang ditelusuri asesor

```
Renstra/RIP Penelitian ITS
  └─ Peta Jalan Penelitian FKK (UPPS)          ← pohon penelitian ada di sini
       └─ Agenda Penelitian Dosen (5 th, 2–5 topik)
            └─ Judul penelitian (proposal, kontrak, laporan)
                 └─ Tugas akhir mahasiswa
                      └─ Luaran: publikasi, HKI, hilirisasi
```

### 9.3 Indikator kuantitatif yang perlu direkap sejak sekarang

- **PPDM = (NPM / NPD) × 100%** — NPM: judul penelitian DTPS yang melibatkan mahasiswa (3 th terakhir); NPD: total judul penelitian DTPS
- **PPkMDM = (NPkMM / NPkMD) × 100%** — padanan untuk PkM
- **NMKI** — jumlah mata kuliah yang dikembangkan dari hasil penelitian/PkM DTPS (3 th terakhir)

### 9.4 Konteks regulasi terkini

- Akreditor prodi kedokteran: **LAM-PTKes** (dikonfirmasi secara empiris — visitasi ITS April 2025). BAN-PT untuk akreditasi institusi. LAMEMBA tidak relevan.
- Rantai regulasi: Permendikbudristek 53/2023 → **Permendiktisaintek 39/2025** → **Permendiktisaintek 10/2026** (berlaku, mengubah Pasal 14–113).
- Nomenklatur status kini: *Terakreditasi Pertama* · *Terakreditasi* · *Terakreditasi Unggul*. Masa berlaku prodi 5 tahun.
- **LAM-PTKes menjalankan dua instrumen paralel**: 9 kriteria (kuantitatif, jalur "Terakreditasi") dan 8 kriteria (kualitatif, jalur "Unggul"). **Pastikan lebih dulu instrumen mana yang berlaku bagi FKK ITS** — ini menentukan seluruh gaya penulisan dokumen.
- Perpanjangan akreditasi berbantuan automasi dihentikan pada masa transisi. Konsekuensinya: **dokumen akan benar-benar dibaca asesor.**

> Karena posisi saat ini "Baik" dan target wajar berikutnya adalah Unggul, pohon ini sebaiknya dirancang agar dapat **dinarasikan secara kualitatif** — argumentatif dan berbasis bukti dampak, bukan sekadar tabel angka.

### 9.5 Daftar bukti yang harus diproduksi

**A. Kebijakan & penetapan (unsur 1)**
- [ ] Buku **"RIP dan Peta Jalan Penelitian & PkM FKK ITS 2026–2030"** — struktur: I Pendahuluan · II Landasan Pengembangan · III Potensi & Rekam Jejak SDM · IV Sasaran, Strategi & Peta Jalan · V Indikator Kinerja Tahunan · VI Penutup
- [ ] **SK Dekan/Rektor** penetapan RIP & Peta Jalan — dokumen terpisah dari bukunya
- [ ] **Peta Jalan PkM terpisah** dengan pohon PkM sendiri
- [ ] Standar Penelitian & Standar PkM (SPMI) tingkat fakultas
- [ ] Diagram pohon cetak besar (+ *fish bone* per topik unggulan bila mengikuti pola Unpad)
- [ ] Berita acara + daftar hadir + notulen **uji publik** roadmap (pola FK-KMK UGM)

**B. Penurunan ke individu (unsur 2)**
- [ ] Agenda/Roadmap Penelitian **per dosen** (5 th, 2–5 topik, menunjuk cabang pohon)
- [ ] Matriks pemetaan rekam jejak dosen yang menjadi dasar penyusunan pohon
- [ ] **Formulir "Pohon Penelitian" untuk tugas akhir mahasiswa**
- [ ] SK pembentukan kelompok riset + roadmap masing-masing
- [ ] Panduan hibah internal yang mensyaratkan kesesuaian dengan peta jalan

**C. Proses & tata kelola**
- [ ] Rencana kerja tahunan bidang penelitian · SK reviewer · dokumentasi penilaian proposal · kontrak/surat tugas · berita acara monev · laporan penelitian

**D. Evaluasi kesesuaian (unsur 3 — titik gugur)**
- [ ] Instrumen evaluasi kesesuaian `Judul × Cabang Pohon`
- [ ] Laporan Evaluasi Kesesuaian tahunan bertanda tangan (dengan % kesesuaian)
- [ ] Berita acara rapat evaluasi · laporan setara untuk PkM
- [ ] Rekap NPD, NPM, PPDM, NPkMD, NPkMM, PPkMDM, NMKI

**E. Tindak lanjut (unsur 4)**
- [ ] Dokumen RTL · **revisi peta jalan bernomor versi** · notulen tinjauan manajemen · bukti pengembangan mata kuliah dari hasil penelitian

**F. Luaran & capaian (C.9)**
- [ ] Rekap publikasi DTPS & mahasiswa **terpetakan ke cabang pohon** · rekap sitasi · HKI/paten · narasi dampak

**G. Keselarasan nasional**
- [ ] **Tabel crosswalk satu halaman**: Pilar FKK ITS → RIRN/PRN → RPJMN → Renstra Kemenkes (PMK 12/2025) → 6 Pilar Transformasi → SDG 3 → Renstra ITS RAISE
- [ ] Bukti hibah nasional pada topik sesuai pohon · PKS dengan RSUD, Dinkes, puskesmas, industri, mitra internasional

---

## 10. Yang harus diverifikasi sebelum dokumen ini dipakai

Karena `its.ac.id`, SINTA, PDDikti, dan `lamptkes.org` diblokir pada sesi riset ini, butir berikut **wajib** dikonfirmasi manual. Diurutkan menurut dampak.

**Prioritas 1 — menentukan isi pohon**
1. **Instrumen LAM-PTKes mana yang berlaku** bagi FKK ITS (9 kriteria kuantitatif vs 8 kriteria kualitatif) → unduh dari `lamptkes.org/File-Unduhan`; cek status mutakhir di Database Hasil Akreditasi LAM-PTKes
2. **Roadmap Penelitian ITS 2025–2029** (DRPM) — apakah ada slot tema kesehatan yang harus diinduki → `its.ac.id/drpm/.../Roadmap-Penelitian-2025-2029.pdf`
3. **Renstra ITS 2026–2030** — kerangka RAISE sebagai payung
4. ~~**Struktur FKK 2025**~~ — **SELESAI.** Pengguna memasok tangkapan layar halaman resmi *Struktur Organisasi* (`its.ac.id/fakultas/fkk/profil/`) pada 3 Agustus 2026. Dekanat, Kaprodi ketiga prodi, koordinator lab, dan 13 KKM Prodi Profesi Dokter sudah dipetakan ke §2 dan §4.1.
5. **Pelajaran dari kekeliruan sesi sebelumnya:** draf sebelum ini sempat menyimpulkan dari cuplikan mesin pencari (bukan halaman sumber) bahwa Prof. Adhi Dharma Wibawa adalah Wakil Dekan. Struktur resmi menunjukkan itu **keliru** — Wakil Dekan yang benar adalah **Prof. Dr. I Ketut Eddy Purnama** (juga sosok "Prof Ketut" yang sempat tidak teridentifikasi lewat pencarian web), dan Wibawa menjabat Kepala Penjaminan Mutu Fakultas. Sudah dikoreksi di §2 dan §4.1. **Yang masih perlu diverifikasi:** bidang keahlian dan status *homebase* Prof. I Ketut Eddy Purnama — belum ada satu pun data risetnya di dokumen ini, dan sebagai Wakil Dekan namanya kemungkinan besar perlu masuk struktur kepemimpinan pilar (§8.1).
6. **Roster lengkap dosen** ketiga prodi — dokumen ini kini memverifikasi ~24 nama dari ~27+ dosen Prodi Kedokteran (setelah struktur organisasi menambah 6 nama baru: Tri Hedianto, Atina Irani Wira Putri, Afia Nuzila Fadhlina, Riva Satya Radiansyah, Zain Budi Syulthoni; plus Endah Mayasari yang statusnya administratif, bukan dosen riset). **Ini bukan kesenjangan sepele:** dua ronde revisi berturut-turut mengubah kesimpulan strategis dokumen (epidemiolog Wirayuda tidak tergali di draf 1; Wakil Dekan salah nama di draf 2). Petakan sisanya sebelum pohon difinalkan.
7. **Status aktif/non-aktif setiap dosen.** Halaman web fakultas tertinggal dari kenyataan — satu nama yang terindeks (dr. Rumman Karimah) ternyata sudah mengundurkan diri dan telah dikeluarkan dari roster dokumen ini. Sebelum pohon dipakai, **cocokkan roster dengan data kepegawaian mutakhir**, bukan dengan situs. Ini kritis karena perhitungan DTPS, rasio dosen, dan indikator NPD/NPM pada akreditasi hanya menghitung dosen aktif ber-*homebase* di prodi.
8. **Ejaan nama & gelar spesialis yang perlu dikonfirmasi:** "Fatimah Nur Fitriani" vs "Fitriyani" (beda ejaan antar sumber — hanya SK kepegawaian atau PDDikti yang bisa memutuskan, bukan sumber daring); dr. Rizka Nurul Hidayah mengoordinasi Lab Histologi & Patologi Anatomi tetapi **tidak ditemukan bukti gelar Sp.PA** — perlakukan Patologi Anatomi sebagai kesenjangan sampai terbukti sebaliknya.

**Prioritas 1b — jerat yang ditemukan riset Agustus 2026 (jangan diulang)**
8a. **Konflik jabatan Kepala Pusat Studi KATD.** Dokumen ini mencatat Prof. Adhi Dharma Wibawa; riset menemukan Prof. I Ketut Eddy Purnama dilantik pada kursi itu Januari 2025. Keduanya bersumber cuplikan. **Konfirmasi ke DRPM ITS.**
8b. **Konflik atribusi publikasi nyeri punggung bawah.** Artikel model skoring prognostik (*J Prev Med Public Health*, 2025) diatribusikan ke Dr. Wirayuda di §4.1, tetapi penelusuran juga mengaitkannya ke dr. M. Nazhif Haykal. Kepenulisan bersama sangat mungkin — **baca daftar penulis lengkapnya sebelum menempatkan artikel ini di bawah nama siapa pun.**
8c. **Klaim bab buku dari penerbit bunga rampai adalah artefak pencarian.** Riset menemukan satu buku yang sama (penerbit Media Sains Indonesia) menempel ke tiga nama berbeda pada tiga penelusuran berbeda — ciri khas halaman katalog berisi puluhan kontributor sehingga nama apa pun yang dicari akan "cocok". **Verifikasi lewat daftar isi/halaman kontributor, bukan hasil pencarian.** Berlaku untuk seluruh klaim bab buku dalam dokumen ini.
8d. **Nama umum = risiko tabrakan identitas.** "dr. Abdurrahman" tanpa nama keluarga pembeda adalah entri berisiko tertinggi: setiap pencocokan berbasis nama harus dianggap tidak sah kecuali disertai NIDN, ORCID, atau halaman resmi yang benar-benar terbaca. Jerat konkret lain yang ditemukan: profil "Atina Putri" di ResearchGate berafiliasi **Institut Teknologi Bandung** — orang berbeda, dan kemiripan "Institut Teknologi" berpotensi menyesatkan.
8e. **"C.M.C" pada gelar dr. Lely Nurhayati jangan diterjemahkan.** Draf sebelumnya memuainya menjadi "Certified Mediator" lalu membangun narasi penyelesaian sengketa medis di atasnya — dua lapis dugaan bertumpuk. Dalam praktik gelar non-akademik Indonesia, C.M.C. lazim berarti *Certified Management Consultant*. **Tanyakan langsung kepada yang bersangkutan.**
8f. **Nomor urut "Guru Besar ITS ke-188"** untuk Prof. I Ketut Eddy Purnama tidak lolos korroborasi (dua cuplikan yang kemungkinan berasal dari satu halaman ITS yang sama). Jangan dicantumkan.
8g. **Sasaran Pemda adalah KOTA Mojokerto, bukan Kabupaten.** Penelusuran seluruh berkas proyek menemukan 33 penyebutan "Kota Mojokerto" dan nol "Kabupaten Mojokerto"; kelima puskesmas berada di Kecamatan Prajuritkulon dan Magersari — keduanya wilayah Kota. Periksa kembali setiap penyebutan "RSUD RA Basoeni (Kab. Mojokerto)" agar konsisten.

**Prioritas 2 — menentukan angka**
9. **Seluruh metrik SINTA/Scopus per dosen** — tidak ada satu angka pun dalam dokumen ini; ambil manual dari SINTA (filter afiliasi ITS)
10. **Daftar publikasi FKK lengkap** → `scholar.its.ac.id/en/organisations/faculty-of-medicine-and-health`
11. **Status *homebase* resmi** dosen berafiliasi ganda (Dhany, Syaifudin, Fahmi, Kuswanto) — kritis untuk rasio dosen

**Prioritas 3 — menyempurnakan benchmark**
12. **PDF roadmap FK pembanding** — FK Unsri (RIP + SK, model paling lengkap), FK UI (roadmap per klaster IMERI), FK Unair (2021–2026, **fakultas pembina**), FK UB ("Pohon Penelitian" + formulir TA), FK-KMK UGM (2026–2030). **Riset Agustus 2026 kembali gagal menemukan satu pun dokumen ini** — seluruh domain `.ac.id` diblokir dan kuota pencarian web habis. Ini tetap bahan benchmark paling berharga yang belum tergarap, dan **satu-satunya cara mendapatkannya adalah mengunduhnya sendiri dari laptop biasa.**
13. **Teks verbatim visi/misi FKK** — rekonstruksi di §2 berasal dari cuplikan mesin pencari, belum diverifikasi kata per kata
14. Nomor **PerBAN-PT** yang menjadi dasar instrumen 8 kriteria — bersumber tunggal, jangan dikutip sebelum diverifikasi

**Prioritas 4 — konteks pendukung yang seluruhnya gagal diverifikasi Agustus 2026**

Riset agentik 3 Agustus 2026 menjalankan empat penelusuran konteks; **tiga di antaranya menghasilkan nol fakta terverifikasi** karena kuota pencarian web habis (200/200) di tengah jalan dan seluruh egress non-GitHub ditolak proxy. Agen-agen itu melaporkan kegagalan secara terbuka alih-alih mengarang — itulah sebabnya butir di bawah ini kosong dan bukan terisi angka palsu.

15. **Lanskap pendanaan** — nol verifikasi. Nama skema, besaran dana, dan syarat hibah DRPM ITS, BIMA/Kemendiktisaintek, LPDP RISPRO, BRIN RIIM, dan Kemenkes semuanya tidak dapat dipastikan. Dua hipotesis yang wajib dicek, bukan diasumsikan: (a) apakah **Penelitian Dosen Pemula** benar-benar terbuka bagi dosen ITS, mengingat skema pemula secara historis dibatasi pada PT berklaster bawah — jika tertutup, jalur masuk dosen M.Biomed FKK harus dirancang lain; (b) apakah **Kedaireka/Matching Fund** masih berjalan setelah pergantian kementerian Oktober 2024.
16. **Instrumen LAM-PTKes** — 9 vs 8 kriteria, ambang batas peringkat Unggul/Baik Sekali/Baik, panduan asesor, dan contoh LED: **seluruhnya tidak ditemukan.** Lihat peringatan di §9.1.
17. **Prioritas nasional** — RIRN 2017–2045, PRN, RPJMN 2025–2029, Renstra Kemenkes (PMK 12/2025), 6 Pilar Transformasi Kesehatan: **tidak satu pun berhasil dibaca.** Klaim di §9.4 yang bersumber dari sesi terdahulu kini menjadi risiko terbuka — verifikasi ulang sebelum dipakai. Status kelembagaan PRN pasca-peleburan Kemenristek ke BRIN juga tidak diketahui: **periksa apakah PRN masih instrumen aktif dan siapa walidatanya sekarang.**
18. **Beban penyakit** — nol angka prevalensi dicantumkan, dan itu disengaja. Catatan metodologis yang tetap berguna: survei rujukan nasional untuk prevalensi PTM dan status gizi **sudah berganti nama** dari Riskesdas menjadi **SKI (Survei Kesehatan Indonesia)** — pastikan mengutip nama dan tahun yang benar.
19. **Regulasi alat kesehatan** — jalur izin edar **AKD/AKL**, TKDN, dan e-katalog tidak terverifikasi. Ini kritis untuk Pilar 4 (prostesis, implan): **peta jalan dari purwarupa kampus ke produk berizin harus ditulis di RIP**, dan saat ini fondasinya belum ada.
20. **Registri uji klinis Indonesia** — pencarian eksplisit mengembalikan **nol hasil**. Apakah Indonesia punya registri uji klinik nasional dan apakah pendaftarannya wajib: masih terbuka. Perlu ditanyakan ke KEPPKN.
21. **Prosedur perizinan pengambilan data** di Puskesmas dan Dinkes Kota Mojokerto — tidak ditemukan. Ini prasyarat operasional §6.5 (jalur register) maupun §6.3 (sensus dasar).

---

## 11. Rujukan utama

**Benchmark internasional**
Oxford MSD (7 tema) · NIHR Oxford BRC (15 tema) · NIHR Imperial BRC (14 tema × 4 *threads*) · Imperial Schools of Convergence Science (4) · UCLH BRC (16, termasuk *Healthcare Engineering and Imaging*) · Karolinska (6 SFO) · Duke-NUS (5 *Signature Research Programmes*) · NUS Medicine (10 TRP) · Melbourne MDHS (3 *Impact Areas*) · Monash (9) · CUHK (3 *Flagships*) · Yale (8 area × 3 *cross-cutting*) · Harvard & Johns Hopkins (tanpa taksonomi tema tingkat atas)

**Analog "FK di dalam institut teknologi"**
MIT IMES (9 area + 4 faset) · Harvard-MIT HST · ETH Zürich D-HEST · Technion Faculty of Medicine (MD + BSc Teknik Biomedis) · KAIST (jalur MD-AI / MD-Bio / MD-Physics) · Tsinghua Medicine (School of Biomedical Engineering setara dengan klinis) · Carle Illinois (dua daftar tema terpisah)

**Kosakata standar yang dapat dijadikan tulang punggung**
GBD Cause Hierarchy (IHME) · UKCRC HRCS (21 Health Categories × 48 Research Activity Codes) · NIH RCDC · MeSH Tree Structures · OECD Frascati/FORD · WHO PIPE & REPRISE · SDG 3

**Regulasi & instrumen Indonesia**
LAM-PTKes (instrumen 9 kriteria & 8 kriteria) · Matriks Penilaian IAPS BAN-PT · Pedoman Asesmen Lapangan IAPS 4.0 · Permendiktisaintek 39/2025 jo. 10/2026 · RIRN 2017–2045 · PRN · Renstra Kemenkes (PMK 12/2025) · 6 Pilar Transformasi Kesehatan

**Pembanding FK Indonesia**
FK Unsri · FK UI (IMERI) · FK Unair · FK UB · FK-KMK UGM · FK UNS · FK Undip · FK Unpad (*fish bone*) · FK UMSU · FKIK Unismuh
*Catatan: dokumen roadmap kesepuluh FK ini tetap belum berhasil diambil setelah dua ronde riset — lihat §10 butir 12.*

**Model kohort & surveilans populasi** *(ditambahkan 3 Agustus 2026, dasar revisi §6)*
Rotterdam Study/ERGO (Erasmus MC) · Framingham Heart Study · UK Biobank (model tata kelola akses) · **HDSS Sleman & Purworejo (FK-KMK UGM — pembanding domestik terpenting)** · Studi Kohort Faktor Risiko PTM Bogor (eks Balitbangkes) · IFLS/RAND (model data terbuka) · **Agincourt HDSS (Wits, Afrika Selatan — arsitektur sensus dasar + ronde pembaruan)** · Matlab HDSS (icddr,b — model area intervensi vs pembanding permanen) · Jejaring INDEPTH (dan pelajaran keruntuhannya) · REACT/Imperial (potong lintang berulang)

**Praktik tata kelola riset Indonesia** *(ditambahkan 3 Agustus 2026, dasar §8.5)*
Rubrik instrumen LAM kualitatif (skala 4-3-2-1) · daftar tilik AMI (5 kolom baku) · siklus PPEPP & alur AMI enam tahap · blueprint SIM-LPPM 16 modul · template Berita Acara Monev · standar SPMI kelompok riset · 7 Standar WHO 2011 & CIOMS 2016 untuk KEPK · registrasi KEPPKN
*Seluruhnya dibaca verbatim dari repositori sistem penjaminan mutu perguruan tinggi Indonesia yang terbuka, karena situs resmi LAM-PTKes tidak dapat dijangkau.*

---

## 12. Rencana penyelesaian — milestone menuju pengajuan ke Dekanat

Disusun karena dokumen ini ditunggu pimpinan. Target **bukan** "terakreditasi" (itu proses terpisah bertahun-tahun), melainkan **"draf final siap diajukan resmi ke Dekanat sebagai bahan uji publik & keputusan"** — realistis **± 2 September 2026**.

**Jalur kritis** bukan penulisan (bisa selesai 1–2 hari) dan bukan verifikasi mandiri situs terblokir (di tangan Anda, bisa dicicil). Jalur kritis adalah **rantai kelembagaan**: review tim kecil → revisi → uji publik stakeholders → revisi final. Simpul paling rentan molor adalah **uji publik** karena bergantung jadwal pihak eksternal — undang lebih awal.

| Target | Tonggak | Deliverable | Pemilik |
|---|---|---|---|
| **3 Agu** ✓ | Struktur & visual siap | Draf + taksonomi Dasar/Profesi/Translasi + grafik interaktif | Asisten + Anda — **selesai** |
| **4–8 Agu** | Verifikasi mandiri + minta roster resmi | Anda buka sendiri LAM-PTKes (9 vs 8 kriteria), SINTA, roadmap FK Unair; kirim permintaan roster & status kepegawaian ke bagian akademik. **Paralel, tidak menunggu.** | Anda |
| **5–10 Agu** | Review internal tim kecil | Urut: Wakil Dekan Prof. I K.E. Purnama (**klarifikasi COI** penempatan platform & tier Translasi) → Kepala PM Prof. Adhi Dharma Wibawa → 3 Kaprodi (konfirmasi penempatan dosen tiap prodi) | Anda mengundang |
| **11–14 Agu** | Revisi v2 · PR *ready-for-review* · kolaborator kedua | Masukan tim kecil masuk dokumen; PR #1 dibuka dari draft; tambah reviewer manusia kedua di repo sebelum diedarkan luas | Asisten + Anda |
| **19–21 Agu** | Data kepegawaian resmi & konfirmasi eksternal | Roster lengkap + status aktif; konfirmasi jabatan Kepala Pusat Studi KATD ke DRPM ITS; kontak FK-KMK UGM soal HDSS Sleman | Pihak luar |
| **24–28 Agu** | Uji publik stakeholders | Dinkes Kota Mojokerto + 2 RSUD + dosen. Berita Acara = bukti unsur C.7/C.8 sekaligus. **Undang paling lambat minggu ke-2 Agustus** | Pihak luar (undangan resmi) |
| **± 2 Sep** ★ | **Draf final siap diajukan ke Dekanat** | Konsolidasi seluruh masukan — bahan uji publik & keputusan, **bukan** pengesahan final. **Inilah tonggak yang ditunggu atasan.** | Anda mempresentasikan |
| **14–18 Sep** | Pengesahan — SK Dekan penetapan RIP & Peta Jalan | Header berubah dari "draf kerja" menjadi resmi; SK terpisah untuk Peta Jalan PkM (sesuai K4). Di luar kendali langsung | Dekan |

### Cara melaporkan ke atasan minggu ini

Dokumen ini sudah **sangat substantif** (progres nyata, bukan janji) tetapi masih draf kerja dengan celah data yang **diketahui dan terdaftar eksplisit** (§10). Lapor dengan bingkai itu — jangan terlihat "belum mulai", jangan pula mengklaim "selesai". Contoh kalimat yang bisa dipakai:

> *"Kerangka lengkap Pohon Penelitian sudah jadi — arsitektur matriks 5 Pilar × 5 Platform, plus sumbu Kedokteran Dasar/Profesi/Translasi untuk kedua prodi kedokteran, dengan 23 dosen sudah terpetakan ke perannya. Ada versi visualnya untuk dilihat cepat. Statusnya draf kerja: sebagian data institusional (angka SINTA, instrumen LAM-PTKes yang berlaku, roster kepegawaian final) sedang saya verifikasi karena harus diambil manual dari sistem resmi. Rencana: siap saya ajukan sebagai bahan uji publik awal September. Boleh saya minta waktu review tim kecil pekan depan?"*

Kalimat itu menyampaikan tiga hal sekaligus: ada hasil konkret, Anda tahu persis apa yang belum lengkap, dan ada tanggal.

---

*Dokumen ini adalah draf kerja hasil riset web, bukan dokumen resmi FKK ITS. Seluruh butir pada §10 harus diselesaikan sebelum materi ini digunakan dalam LED atau dokumen akreditasi.*
