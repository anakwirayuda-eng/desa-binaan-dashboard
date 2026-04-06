/**
 * Desa Binaan Dashboard — Curated Data v2
 * =========================================
 * Data gabungan dari: parsing PDF + triangulasi AI + web research + White Paper
 */

const DASHBOARD_DATA = {

    // ─── KONTEKS NASIONAL ───
    nasional: {
        jumlah_puskesmas_nasional: 10431,
        jumlah_puskesmas_jatim: 968,
        jumlah_puskesmas_mojokerto_kota: 5,
        penduduk_kota_mojokerto: 139853,
        luas_kota_mojokerto_km2: 16.47,
        provinsi: "Jawa Timur",
        kabkota: "Kota Mojokerto",
        tahun_data: "2024/2025",
        konteks_desa_binaan: "Desa Binaan merupakan program kemitraan antara perguruan tinggi dengan desa/kelurahan untuk pemberdayaan masyarakat melalui pendekatan multidisiplin — menggabungkan Kedokteran Komunitas, Kesehatan Masyarakat, Health Informatics, dan Frugal Innovation."
    },

    // ─── WHITE PAPER CONTENT ───
    whitePaper: {
        title: "The Fostered Village: Architecting Sustainable Community Development",
        subtitle: "A Global Analysis of Models, Mechanisms, and Future Trajectories",
        author: "FKK ITS",

        fondasi: {
            paradigmShift: {
                title: "Paradigm Shift: Village sebagai Unit Pertumbuhan",
                description: "Diskursus pembangunan global bergeser — dari urbanisasi top-down menuju fokus baru pada komunitas rural sebagai unit fundamental pertumbuhan. Konsep 'Fostered Village' menawarkan jalan baru.",
                from: { label: "Transactional Aid", desc: "Short-term, top-down, sering menciptakan ketergantungan" },
                to: { label: "Relational Partnership", desc: "Komitmen jangka panjang, mentorship, menjembatani kebutuhan lokal dengan jaringan global" },
                goal: "Sinergi antara sumber daya eksternal (exogenous) dan agency internal (endogenous) — menciptakan komunitas yang empowered, bukan adopted."
            },
            twoModels: {
                title: "Dua Logika Pembangunan",
                deficit: {
                    label: "The Deficit Model",
                    logic: "Dimulai dengan mengkatalogkan kekurangan — kemiskinan, penyakit, ketiadaan infrastruktur.",
                    impact: "Menciptakan siklus 'clienthood' di mana kesejahteraan bergantung pada fostering external (NGO, korporasi)."
                },
                asset: {
                    label: "The Asset Model",
                    logic: "Dimulai dengan inventarisasi kekuatan dan kapasitas komunitas yang sudah ada.",
                    assets: ["Individuals: skills", "Associations: social trust", "Institutions: schools, government", "Physical Assets: land, water", "Connections: local economy"]
                }
            }
        },

        framework: {
            comB: {
                title: "COM-B Model",
                description: "Kerangka diagnostik untuk memahami perilaku kesehatan masyarakat.",
                components: [
                    { name: "Capability", desc: "Pengetahuan dan keterampilan (fisik & psikologis)", color: "#3b82f6" },
                    { name: "Opportunity", desc: "Faktor lingkungan yang memungkinkan perilaku (fisik & sosial)", color: "#10b981" },
                    { name: "Motivation", desc: "Proses mental reflektif dan otomatis yang mengarahkan perilaku", color: "#f59e0b" }
                ]
            },
            mindspace: {
                title: "MINDSPACE: Tactical Levers for Behavior Change",
                levers: [
                    { letter: "M", name: "Messenger", desc: "Kita dipengaruhi oleh siapa yang menyampaikan informasi" },
                    { letter: "I", name: "Incentives", desc: "Loss aversion sering lebih kuat dari reward" },
                    { letter: "N", name: "Norms", desc: "Kita sangat dipengaruhi oleh apa yang dilakukan orang lain" },
                    { letter: "D", name: "Defaults", desc: "Kita mengikuti opsi yang sudah di-set untuk mengurangi beban kognitif" },
                    { letter: "S", name: "Salience", desc: "Perhatian kita tertarik ke hal yang baru dan relevan" },
                    { letter: "P", name: "Priming", desc: "Perilaku dipengaruhi oleh petunjuk bawah sadar" },
                    { letter: "A", name: "Affect", desc: "Emosi membentuk keputusan secara kuat" },
                    { letter: "C", name: "Commitments", desc: "Kita berusaha konsisten dengan janji publik" },
                    { letter: "E", name: "Ego", desc: "Kita bertindak sesuai dengan self-image kita" }
                ]
            },
            reAim: {
                title: "RE-AIM: Mengukur yang Bermakna",
                description: "Framework evaluasi untuk dampak nyata, bukan vanity metrics (brosur dibagikan, workshop dihadiri).",
                dimensions: [
                    { name: "Reach", desc: "Siapa yang terjangkau? (Dan siapa yang tidak?)" },
                    { name: "Effectiveness", desc: "Apa dampak terhadap health outcomes?" },
                    { name: "Adoption", desc: "Setting/staf mana yang mau mengimplementasi?" },
                    { name: "Implementation", desc: "Apakah program dijalankan sesuai desain? (Fidelity)" },
                    { name: "Maintenance", desc: "Apakah efek perilaku bertahan jangka panjang?" }
                ]
            }
        },

        blueprint: {
            title: "Adapt-Align-Author: Governance Model",
            subtitle: "Inspired by World Bank's WDR 2025",
            steps: [
                { name: "ADAPT", desc: "Tinggalkan proyek 'plug-and-play'. Adaptasi teknologi dan standar global sesuai basis aset dan konteks lokal.", example: "UGM's waste banks: mengubah defisit menjadi aset pertanian" },
                { name: "ALIGN", desc: "Pastikan produk desa memiliki jalur jelas ke pasar terstandar. Peran fostering: menyelaraskan produksi lokal dengan permintaan pasar.", example: "Kimia Farma menjamin pembelian minyak atsiri" },
                { name: "AUTHOR", desc: "Tujuan akhir: empowerment. Bantu komunitas menulis aturan keterlibatan mereka sendiri, memaksa pasar menyesuaikan diri.", example: "Suku Baduy menciptakan standar wisata baru (Saba Budaya)" }
            ]
        },

        competencies: {
            title: "8 CPL: Kompetensi Dokter Modern",
            subtitle: "Clerkship dirancang membangun learning outcomes yang mendefinisikan dokter holistik, profesional, dan tech-adaptive.",
            items: [
                { code: "CPL-1", name: "Attitude & Professionalism", desc: "Etika, integritas, dan kepedulian sosial" },
                { code: "CPL-4", name: "Effective Communication", desc: "Komunikasi verbal/non-verbal dengan pasien dan stakeholder" },
                { code: "CPL-5", name: "Clinical Procedures", desc: "Prosedur klinis berbasis patient safety" },
                { code: "CPL-6", name: "Holistic Management", desc: "Manajemen kesehatan individu dan komunitas secara komprehensif" },
                { code: "CPL-7", name: "Health Systems Navigation", desc: "Bekerja efektif dalam SKN dan kerangka kesehatan global" },
                { code: "CPL-8", name: "Technological Innovation", desc: "Kolaborasi inovasi teknologi untuk problem-solving kesehatan" },
                { code: "CPL-9", name: "Knowledge Integration", desc: "Menghubungkan sains biomedis, humanistik, klinis, dan kesmas" },
                { code: "CPL-11", name: "Digital Technology", desc: "Analisis penggunaan teknologi digital dalam kedokteran preventif" }
            ]
        },

        caseStudies: [
            { name: "Kimia Farma × Desa Semen", type: "Industrial Foster", desc: "BUMN menjadi guaranteed off-taker minyak atsiri — solving market access." },
            { name: "Suku Baduy (Saba Budaya)", type: "Cultural Authorship", desc: "Menulis standar wisata sendiri — memaksa pasar menyesuaikan." },
            { name: "UGM Waste Banks", type: "Academic Adaptation", desc: "Mengubah limbah (defisit) menjadi aset pertanian via bank sampah." },
            { name: "Millennium Villages (UN)", type: "Global Scale", desc: "Investasi terintegrasi di 80 desa, 10 negara — bukti skalabilitas." }
        ]
    },

    // ─── 5 PUSKESMAS (enriched with web data) ───
    puskesmas: [
        {
            id: "blooto",
            nama: "Puskesmas Blooto",
            kategori: "PONED 24 Jam",
            alamat: "Jl. Raya Cinde No. 3, Kel. Prajuritkulon",
            kecamatan: "Kec. Prajuritkulon",
            telepon: "(0321) 392624",
            website: null,
            kelurahan: ["Blooto", "Surodinawan", "Prajuritkulon"],
            jumlah_kelurahan: 3,
            jumlah_penduduk: 25281,
            total_sdm: 87,
            luas_wilayah_km2: 4.82,
            akreditasi: "—",
            tahun_profil: 2025,
            warna: "#3b82f6",
            gradient: "linear-gradient(135deg, #1e3a5f, #3b82f6)",
            icon: "🏥",
            motto: null,
            layanan: ["Poli Umum", "Poli KIA", "Poli Gigi", "PONED 24 Jam", "Laboratorium", "Farmasi", "UGD"],
            pustu: [],
            highlights: [
                "Satu-satunya dengan layanan PONED 24 jam",
                "SDM terbesar: 87 orang",
                "Fokus kegawatdaruratan kebidanan & neonatal"
            ],
            inovasi: [
                { nama: "Vila Bu Camat", desc: "Edukasi kesehatan gigi anak balita via kunjungan rumah" },
                { nama: "GENTALA", desc: "Gerakan Tuntaskan Stunting Melalui Layanan Terintegrasi Bersama" },
                { nama: "Pelayanan PONED 24 Jam", desc: "Emergensi obstetri dan neonatal" }
            ],
            top_penyakit: [
                { nama: "Hipertensi Esensial", jumlah: 4210 },
                { nama: "ISPA / Common Cold", jumlah: 3850 },
                { nama: "Diabetes Mellitus", jumlah: 1420 },
                { nama: "Myalgia", jumlah: 1180 },
                { nama: "Gastritis", jumlah: 980 },
                { nama: "Dermatitis", jumlah: 720 },
                { nama: "Diare", jumlah: 650 },
                { nama: "Cephalgia", jumlah: 580 },
                { nama: "Asma Bronkial", jumlah: 440 },
                { nama: "Konjungtivitis", jumlah: 320 }
            ],
            sdm_detail: { dokter_umum: 4, dokter_gigi: 2, perawat: 22, bidan: 18, farmasi: 4, kesling: 3, gizi: 3, analis: 3, lainnya: 28 },
            indicators: { spm: 97, imunisasi_idl: 100, obat_esensial: 100, kunjungan_rj: 38200, nd_balita: 62.1, sanitasi_dasar: 88 },
            swot: {
                s: ["PONED 24 jam operasional penuh", "SDM paling besar: 87 orang", "Fasilitas sudah mapan"],
                w: ["N/D balita belum optimal (62.1%)", "Layanan persalinan sempat terganggu pasca-kebakaran 2023"],
                o: ["Model pilot ILP untuk emergensi", "Potensi trauma center mini"],
                t: ["Beban kerja 24 jam tinggi", "Referral load dari PKM lain"]
            }
        },
        {
            id: "mentikan",
            nama: "Puskesmas Mentikan",
            kategori: "Non-Rawat Inap",
            alamat: "Jl. Prapanca 55, Kel. Mentikan",
            kecamatan: "Kec. Prajuritkulon",
            telepon: null,
            website: null,
            kelurahan: ["Mentikan", "Kauman", "Miji", "Pulorejo"],
            jumlah_kelurahan: 4,
            jumlah_penduduk: 26888,
            total_sdm: 61,
            luas_wilayah_km2: 4.95,
            akreditasi: "—",
            tahun_profil: 2024,
            warna: "#ef4444",
            gradient: "linear-gradient(135deg, #7f1d1d, #ef4444)",
            icon: "🔴",
            motto: "Kompak, Semangat, Service Excellent (We Care…)",
            layanan: ["Poli Umum", "Poli Lansia", "Poli Gigi", "Poli KIA-KB", "Poli Kulit & Kelamin", "Unit Gizi", "Unit Sanitasi", "Laboratorium"],
            pustu: ["PUSTU Miji", "PUSTU Cakar Ayam", "PUSTU Pulorejo"],
            highlights: [
                "Contact rate tertinggi: 55.150 kunjungan/tahun",
                "Kekurangan 11 tenaga strategis (ABK)",
                "3 Puskesmas Pembantu aktif",
                "🎯 Target utama Desa Binaan FKK ITS"
            ],
            inovasi: [
                { nama: "KLENTING EMAS", desc: "Kolaborasi Penanganan Stunting Puskesmas" },
                { nama: "Sultan Mentikan", desc: "Konsultasi kesehatan online" },
                { nama: "E-Surat Sehat", desc: "Penerbitan surat keterangan sehat online" },
                { nama: "Daftar Online H-1", desc: "Registrasi pasien sehari sebelumnya" }
            ],
            top_penyakit: [
                { nama: "Hipertensi Esensial", jumlah: 5120 },
                { nama: "ISPA / Common Cold", jumlah: 4680 },
                { nama: "Diabetes Mellitus", jumlah: 1890 },
                { nama: "Myalgia", jumlah: 1350 },
                { nama: "Gastritis", jumlah: 1100 },
                { nama: "Dermatitis", jumlah: 890 },
                { nama: "Diare", jumlah: 780 },
                { nama: "Cephalgia", jumlah: 650 },
                { nama: "Asma Bronkial", jumlah: 520 },
                { nama: "Faringitis Akut", jumlah: 410 }
            ],
            sdm_detail: { dokter_umum: 3, dokter_gigi: 1, perawat: 16, bidan: 12, farmasi: 3, kesling: 2, gizi: 2, analis: 2, lainnya: 20 },
            indicators: { spm: 96, imunisasi_idl: 100, obat_esensial: 100, kunjungan_rj: 55150, nd_balita: 58.3, sanitasi_dasar: 82 },
            swot: {
                s: ["Contact rate 2× populasi — kepercayaan sangat tinggi", "SPM tetap 96% meski understaffed", "3 PUSTU memperluas jangkauan"],
                w: ["Kekurangan 11 tenaga (dokter, IT, rekam medis, sopir ambulans)", "Diskrepansi data SIHA (HIV): data PKM ≠ Dinas", "Poskestren partisipasi rendah"],
                o: ["Kanvas sempurna frugal innovation & health informatics", "Potensi telemedicine/triase AI untuk urai antrean", "Program kedokteran komunitas untuk stigma TBC/HIV"],
                t: ["Overcrowded facility → risiko burnout staf", "Stigma TBC/HIV parah hambat tracing", "Gadget saat makan → N/D balita rendah"]
            }
        },
        {
            id: "wates",
            nama: "Puskesmas Wates",
            kategori: "Non-Rawat Inap",
            alamat: "Kel. Wates, Kec. Magersari",
            kecamatan: "Kec. Magersari",
            telepon: null,
            website: null,
            kelurahan: ["Wates"],
            jumlah_kelurahan: 1,
            jumlah_penduduk: 20379,
            total_sdm: 57,
            luas_wilayah_km2: 1.32,
            akreditasi: "Paripurna (2019, re-akreditasi 2023)",
            tahun_profil: 2025,
            warna: "#10b981",
            gradient: "linear-gradient(135deg, #064e3b, #10b981)",
            icon: "🏅",
            motto: null,
            layanan: ["Poli Umum", "Poli Gigi", "Poli KIA-KB", "Laboratorium", "Farmasi", "Kesehatan Kerja", "Kesehatan Olahraga"],
            pustu: [],
            highlights: [
                "Akreditasi Paripurna — tertinggi nasional (sejak 2019)",
                "Hanya 1 kelurahan tapi densitas sangat tinggi",
                "Fokus unik: kesehatan kerja & olahraga",
                "Sebelumnya akreditasi Madya (2016)"
            ],
            inovasi: [
                { nama: "Skrining Pekerja", desc: "Skrining kesehatan rutin pada pekerja dan buruh" },
                { nama: "Kesehatan Olahraga", desc: "Program pembinaan kesehatan melalui olahraga komunitas" }
            ],
            top_penyakit: [
                { nama: "Hipertensi Esensial", jumlah: 3890 },
                { nama: "ISPA / Common Cold", jumlah: 3540 },
                { nama: "Diabetes Mellitus", jumlah: 1280 },
                { nama: "Myalgia", jumlah: 1050 },
                { nama: "Gastritis", jumlah: 870 },
                { nama: "Dermatitis", jumlah: 640 },
                { nama: "Diare", jumlah: 560 },
                { nama: "Cephalgia", jumlah: 480 },
                { nama: "Asma Bronkial", jumlah: 380 },
                { nama: "ISK", jumlah: 290 }
            ],
            sdm_detail: { dokter_umum: 3, dokter_gigi: 1, perawat: 14, bidan: 11, farmasi: 3, kesling: 2, gizi: 2, analis: 2, lainnya: 19 },
            indicators: { spm: 99, imunisasi_idl: 100, obat_esensial: 100, kunjungan_rj: 28400, nd_balita: 65.8, sanitasi_dasar: 94 },
            swot: {
                s: ["Akreditasi Paripurna — benchmark nasional", "Densitas manajemen tinggi (1 kelurahan)", "Program kesehatan kerja unik di Mojokerto"],
                w: ["Coverage terbatas (1 kelurahan saja)", "SDM relatif kecil (57 orang)"],
                o: ["Model akreditasi untuk PKM lain di kota", "Potensi sebagai research site kolaborasi PT"],
                t: ["Urbanisasi area → perubahan demografi cepat", "Ketergantungan pada 1 wilayah kerja"]
            }
        },
        {
            id: "gedongan",
            nama: "Puskesmas Gedongan",
            kategori: "Non-Rawat Inap",
            alamat: "Jl. Sawunggaling, Mergelo, Kel. Balongsari",
            kecamatan: "Kec. Magersari",
            telepon: null,
            website: null,
            kelurahan: ["Magersari", "Gedongan", "Balongsari", "Kedundung", "Jagalan", "Purwotengah"],
            jumlah_kelurahan: 6,
            jumlah_penduduk: 22127,
            total_sdm: 67,
            luas_wilayah_km2: 3.80,
            akreditasi: "—",
            tahun_profil: 2024,
            warna: "#f59e0b",
            gradient: "linear-gradient(135deg, #78350f, #f59e0b)",
            icon: "💡",
            motto: null,
            layanan: ["Poli Umum", "Poli Gigi", "Poli KIA-KB", "Poli Lansia", "Poli TB", "Poli PKPR", "Konseling HIV/IMS", "Gawat Darurat", "Laboratorium", "Farmasi", "Kesehatan Tradisional", "Perawatan Luka Modern"],
            pustu: [],
            highlights: [
                "Cakupan terluas: 6 kelurahan",
                "Ekosistem inovasi akar rumput paling kuat",
                "Direlokasi 2021 ke Jl. Sawunggaling (gedung baru)",
                "Pushbot Gedongan: chatbot pendaftaran online (+100% usage)"
            ],
            inovasi: [
                { nama: "Pushbot Gedongan", desc: "Chatbot pendaftaran pasien daring — peningkatan 100%" },
                { nama: "Gas Kopling", desc: "Petugas Kurir Obat Pelayanan Farmasi Keliling" },
                { nama: "Ceker Pedas Sedikit Manis", desc: "Cegah Komplikasi DM via edukasi, skrining, perawatan luka modern" },
                { nama: "Corong Lansia", desc: "Cek Kondisi Rutin & Rawat Orang Lanjut Usia (proaktif ke rumah)" },
                { nama: "Pergi ke Bu Tyas", desc: "Kesehatan gigi bumil & catin untuk cegah stunting" },
                { nama: "Si Bebi Loli", desc: "Dental Outing Class untuk anak usia dini" },
                { nama: "Tebu Lik Ita", desc: "Temukan Ibu Hamil Milik Kita — BPJS bayi baru lahir" },
                { nama: "Casing Apikk", desc: "Cegah Stunting Dengan ASI Eksklusif via pendampingan nakes & kader" }
            ],
            top_penyakit: [
                { nama: "Hipertensi Esensial", jumlah: 3680 },
                { nama: "ISPA / Common Cold", jumlah: 3320 },
                { nama: "Diabetes Mellitus", jumlah: 1350 },
                { nama: "Myalgia", jumlah: 1080 },
                { nama: "Gastritis", jumlah: 920 },
                { nama: "Dermatitis", jumlah: 710 },
                { nama: "Diare", jumlah: 630 },
                { nama: "Cephalgia", jumlah: 540 },
                { nama: "Asma Bronkial", jumlah: 420 },
                { nama: "Konjungtivitis", jumlah: 300 }
            ],
            sdm_detail: { dokter_umum: 4, dokter_gigi: 2, perawat: 18, bidan: 14, farmasi: 3, kesling: 3, gizi: 2, analis: 2, lainnya: 19 },
            indicators: { spm: 98, imunisasi_idl: 100, obat_esensial: 100, kunjungan_rj: 32100, nd_balita: 53.7, sanitasi_dasar: 86 },
            swot: {
                s: ["8 inovasi akar rumput yang sangat kreatif", "6 kelurahan — jangkauan terluas", "Kader posyandu sangat aktif", "Chatbot & antar obat keliling = digital pioneer"],
                w: ["N/D balita terendah (53.7%)", "Koordinasi investigasi kontak TBC dgn RS lemah", "Kepatuhan cuci tangan petugas menurun"],
                o: ["Digitalisasi inovasi manual → scalable platform", "Integrasi chatbot + rekam medis elektronik", "Platform edukasi digital untuk 8 inovasi"],
                t: ["Fragmentasi 6 kelurahan → koordinasi sulit", "Penyebaran SDM tipis di wilayah luas"]
            }
        },
        {
            id: "kranggan",
            nama: "Puskesmas Kranggan",
            kategori: "Non-Rawat Inap (Baru)",
            alamat: "Kel. Kranggan, Kec. Prajuritkulon",
            kecamatan: "Kec. Prajuritkulon",
            telepon: null,
            website: null,
            kelurahan: ["Meri", "Kranggan"],
            jumlah_kelurahan: 2,
            jumlah_penduduk: null,
            total_sdm: null,
            luas_wilayah_km2: null,
            akreditasi: "Proses Registrasi",
            tahun_profil: 2024,
            warna: "#8b5cf6",
            gradient: "linear-gradient(135deg, #3b0764, #8b5cf6)",
            icon: "🆕",
            motto: null,
            layanan: [],
            pustu: [],
            highlights: [
                "Ditetapkan SK Walikota No. 188.45/1141/2017",
                "Izin Operasional: SK No. 188.45/1140/2017",
                "Dibuka fisik: 16 April 2021",
                "Data profil lengkap belum tersedia (draf 14 halaman)"
            ],
            inovasi: [],
            top_penyakit: [],
            sdm_detail: null,
            indicators: { spm: null, imunisasi_idl: null, obat_esensial: null, kunjungan_rj: null, nd_balita: null, sanitasi_dasar: null },
            swot: {
                s: ["Kesempatan membangun dari nol dengan standar terbaru", "SK Walikota dan izin operasional sudah terbit"],
                w: ["Belum memiliki data profil lengkap", "SDM belum terdata resmi"],
                o: ["Clean slate — langsung terapkan ILP penuh", "Pilot project data-driven PKM dari awal"],
                t: ["Kurang pengalaman operasional", "Risiko under-resourced di tahun-tahun awal"]
            }
        }
    ],

    // ─── ANALISIS KOMPARATIF ───
    perbandingan: {
        labels: ["Blooto", "Mentikan", "Wates", "Gedongan", "Kranggan"],
        penduduk: [25281, 26888, 20379, 22127, null],
        sdm: [87, 61, 57, 67, null],
        kelurahan: [3, 4, 1, 6, 2],
        kunjungan: [38200, 55150, 28400, 32100, null],
        spm: [97, 96, 99, 98, null],
        nd_balita: [62.1, 58.3, 65.8, 53.7, null],
        rasio_sdm_per_1000: [3.44, 2.27, 2.80, 3.03, null],
        rasio_kunjungan_per_penduduk: [1.51, 2.05, 1.39, 1.45, null]
    },

    radar: {
        labels: ["SPM (%)", "N/D Balita (%)", "Sanitasi (%)", "SDM Rasio", "Kunjungan Rasio", "Imunisasi (%)"],
        datasets: {
            blooto: [97, 62.1, 88, 69, 76, 100],
            mentikan: [96, 58.3, 82, 45, 100, 100],
            wates: [99, 65.8, 94, 56, 70, 100],
            gedongan: [98, 53.7, 86, 61, 73, 100]
        }
    },

    scoring: {
        legend: {
            subtitle: "Skor tidak dimaksudkan sebagai klaim mutlak kualitas puskesmas, tetapi sebagai alat bantu memilih lokasi intervensi dan wahana belajar yang paling feasible untuk blok CM koas.",
            formula: "Skor total = jumlah dari (skor 1-10 x bobot kriteria). Semakin tinggi angka, semakin kuat argumen bahwa lokasi tersebut penting dan realistis untuk dijadikan target Desa Binaan.",
            bands: [
                { label: "1-3", meaning: "Rendah", desc: "Masih lemah, belum mendesak, atau belum feasible untuk dijalankan dalam satu rotasi." },
                { label: "4-6", meaning: "Sedang", desc: "Ada kebutuhan, tetapi manfaat atau kesiapan implementasinya belum paling kuat." },
                { label: "7-8", meaning: "Tinggi", desc: "Masalah atau peluangnya jelas dan cukup layak dijadikan fokus kerja mahasiswa." },
                { label: "9-10", meaning: "Sangat Tinggi", desc: "Paling prioritas, paling relevan, atau paling menjanjikan untuk intervensi berbasis CM." }
            ]
        },
        criteria: [
            {
                nama: "Kompleksitas SDoH",
                bobot: 25,
                desc: "Menilai seberapa kompleks determinan sosial, perilaku, stigma, dan konteks keluarga yang memengaruhi masalah kesehatan di wilayah kerja.",
                low: "Skor rendah berarti masalah sosial-perilaku relatif lebih sempit atau lebih mudah dikelola.",
                high: "Skor tinggi berarti isu kesehatan sangat dipengaruhi pola asuh, kepadatan, stigma, akses, atau kerentanan sosial yang berlapis."
            },
            {
                nama: "Kebutuhan Frugal Innovation",
                bobot: 25,
                desc: "Menilai seberapa besar kebutuhan akan solusi sederhana, murah, cepat, dan adaptif untuk menutup gap layanan atau proses.",
                low: "Skor rendah berarti sistem relatif stabil dan tidak terlalu membutuhkan intervensi frugal jangka pendek.",
                high: "Skor tinggi berarti ada bottleneck jelas yang bisa dibantu oleh redesign alur, tools ringan, atau inovasi praktis."
            },
            {
                nama: "Readiness Intervensi",
                bobot: 20,
                desc: "Menilai seberapa siap lokasi menerima intervensi mahasiswa dalam satu siklus kerja terstruktur.",
                low: "Skor rendah berarti data, aktor, atau ruang implementasi belum cukup siap untuk rotasi CM.",
                high: "Skor tinggi berarti ada mitra, target, dan ruang uji intervensi yang cukup matang untuk dieksekusi."
            },
            {
                nama: "Potensi Health Informatics",
                bobot: 15,
                desc: "Menilai peluang penggunaan data, dashboard, reminder, triase, atau alur informasi sederhana untuk memperbaiki layanan.",
                low: "Skor rendah berarti kebutuhan digital tidak terlalu menonjol atau manfaat tambahannya kecil.",
                high: "Skor tinggi berarti masalah layanan sangat mungkin terbantu dengan perbaikan alur data atau tools digital ringan."
            },
            {
                nama: "Coverage & Skala",
                bobot: 15,
                desc: "Menilai seberapa besar jangkauan populasi dan potensi dampak pembelajaran maupun intervensi terhadap wilayah kerja.",
                low: "Skor rendah berarti cakupan wilayah sempit atau dampak pembelajaran relatif terbatas.",
                high: "Skor tinggi berarti cakupan luas, populasi besar, atau ada jejaring layanan yang membuat dampaknya lebih besar."
            }
        ],
        scores: {
            blooto: [7, 5, 7, 5, 7],
            mentikan: [9, 10, 8, 10, 8],
            wates: [5, 4, 9, 4, 3],
            gedongan: [8, 8, 7, 8, 9],
            kranggan: [4, 6, 3, 5, 4]
        },
        breakdown: {
            blooto: [
                "Kasus emergensi maternal-neonatal memberi tekanan sosial dan layanan, tetapi sistem internal relatif lebih mapan dibanding Mentikan atau Gedongan.",
                "Butuh inovasi proses, namun urgensinya tidak setinggi lokasi dengan gap SDM atau bottleneck alur yang lebih berat.",
                "Struktur layanan dan SDM besar membuat lokasi ini cukup siap untuk intervensi terbatas.",
                "Potensi digital ada, tetapi bukan bottleneck paling dominan dibanding kebutuhan layanan klinis langsung.",
                "Tiga kelurahan dan fungsi PONED memberi dampak wilayah yang cukup luas."
            ],
            mentikan: [
                "Beban kunjungan tinggi, isu perilaku keluarga, gap tenaga, dan tantangan stigma membuat kompleksitas sosialnya paling berat.",
                "Kekurangan tenaga strategis dan kebutuhan perbaikan alur sangat cocok untuk solusi frugal yang sederhana namun berdampak.",
                "Ada masalah nyata, data cukup jelas, dan ruang kerja lapangan nyata melalui puskesmas inti dan tiga PUSTU.",
                "Telemedicine, triase ringan, reminder, dan perbaikan alur informasi sangat relevan dengan profil masalah Mentikan.",
                "Empat kelurahan, tiga PUSTU, dan utilisasi tinggi membuat pembelajaran dan dampak intervensinya cukup besar."
            ],
            wates: [
                "Wilayah hanya satu kelurahan dan sistem relatif lebih stabil, sehingga kompleksitas sosialnya lebih rendah.",
                "Kebutuhan inovasi frugal ada, tetapi tidak seakut lokasi dengan gap SDM dan beban kunjungan yang lebih berat.",
                "Akreditasi kuat dan sistem cukup rapi membuat lokasi sangat siap secara implementasi.",
                "Potensi informatics tidak serendah nol, namun bukan kebutuhan utama pada fase awal koas.",
                "Cakupan wilayah paling sempit sehingga skala dampak dan variasi pembelajarannya terbatas."
            ],
            gedongan: [
                "Enam kelurahan, variasi masalah, dan capaian N/D rendah membuat kompleksitas sosial-keluaragaannya tinggi.",
                "Banyak inovasi lokal menunjukkan kebutuhan dan ruang untuk penguatan solusi praktis masih besar.",
                "Jejaring kader dan inovasi aktif membuat lokasi ini cukup siap untuk menerima intervensi mahasiswa.",
                "Chatbot dan layanan inovatif menunjukkan peluang penguatan digital yang lebih matang daripada banyak lokasi lain.",
                "Jangkauan enam kelurahan memberi skala dampak pembelajaran dan implementasi yang paling luas."
            ],
            kranggan: [
                "Masih baru dan data lapangan belum lengkap, sehingga kompleksitas sebenarnya belum dapat dibaca penuh.",
                "Secara konseptual ruang inovasi ada, tetapi kebutuhan spesifiknya belum cukup terpetakan.",
                "Kesiapan intervensi dibatasi oleh data dan profil operasional yang masih tipis.",
                "Potensi digital ada karena ini unit yang relatif baru, tetapi use case prioritasnya belum jelas.",
                "Dua kelurahan memberi skala sedang, namun belum cukup kuat untuk jadi lokasi utama tanpa data tambahan."
            ]
        }
    },

    penyakit_kolektif: [
        { nama: "Hipertensi Esensial", total: 16900 },
        { nama: "ISPA / Common Cold", total: 15390 },
        { nama: "Diabetes Mellitus", total: 5940 },
        { nama: "Myalgia", total: 4660 },
        { nama: "Gastritis", total: 3870 },
        { nama: "Dermatitis", total: 2960 },
        { nama: "Diare", total: 2620 },
        { nama: "Cephalgia", total: 2250 },
        { nama: "Asma Bronkial", total: 1760 },
        { nama: "Lainnya", total: 1320 }
    ],

    swot_kolektif: {
        s: ["Capaian SPM mayoritas 95–100%", "Obat esensial & vaksin IDL 100% tersedia", "Kader posyandu sangat aktif di semua wilayah", "Utilisasi layanan tinggi di semua unit"],
        w: ["N/D Balita sering tidak tercapai (pola asuh & gadget)", "Sistem informasi (GAYATRI/SIHA) sering error", "Kurang tenaga strategis: Dokter, IT, Rekam Medis", "Poskestren partisipasi rendah"],
        o: ["Implementasi penuh ILP untuk skrining posyandu", "Platform digital untuk edukasi kesehatan", "Integrasi Satu Sehat untuk rekonsiliasi data", "Kolaborasi FKK ITS untuk inovasi"],
        t: ["Stigma TBC & HIV menghambat tracing", "Peningkatan PTM (Diabetes, Hipertensi) usia produktif", "Gaya hidup (merokok, MPASI buruk, gadget)", "Kawasan Tanpa Rokok belum efektif"]
    }
,

    communityMedicine: {
        target: {
            puskesmas: "Puskesmas Mentikan",
            lokasi: "Jl. Prapanca 55, Kel. Mentikan",
            durasi_rotasi: "4 minggu efektif",
            pendekatan: "community diagnosis -> co-design -> pilot -> evaluation -> handover"
        },

        implementationPlan: {
            subtitle: "Rencana kerja blok Community Medicine (CM) koas difokuskan ke intervensi kecil yang bisa selesai, diukur, dan diserahterimakan ke Puskesmas Mentikan dalam satu siklus rotasi.",
            assumptions: [
                "Asumsi 1 tim koas CM bekerja selama 4 minggu efektif dengan supervisi dosen pembimbing dan preseptor puskesmas.",
                "Masalah prioritas awal: N/D balita rendah, beban kunjungan tinggi, gap edukasi keluarga, dan kebutuhan penguatan alur data sederhana.",
                "Output wajib harus feasible dipakai staf puskesmas, kader, atau PUSTU tanpa ketergantungan pada sistem yang terlalu kompleks."
            ],
            workstreams: [
                { title: "Diagnostik Komunitas", desc: "Memetakan masalah prioritas, aktor lokal, dan wilayah mikro sasaran." },
                { title: "Desain Perubahan Perilaku", desc: "Menerjemahkan COM-B dan MINDSPACE menjadi intervensi lapangan yang konkret." },
                { title: "Penguatan Alur Pelayanan", desc: "Menyederhanakan touchpoint edukasi, reminder, pencatatan, atau triase ringan." },
                { title: "Evaluasi dan Handover", desc: "Mengukur hasil proses, menutup loop umpan balik, dan menyerahkan toolkit ke puskesmas." }
            ],
            weeks: [
                {
                    minggu: "Minggu 1",
                    tema: "Orientasi, kontrak kerja, dan diagnosis komunitas",
                    fokus: "Menyamakan masalah prioritas bersama puskesmas, kelurahan, kader, dan sasaran keluarga.",
                    kegiatan: [
                        "Audiensi awal dengan kepala puskesmas, PJ program, kelurahan, dan kader wilayah sasaran.",
                        "Review data rutin: SPM, N/D balita, kunjungan, family folder, dan capaian program prioritas.",
                        "Rapid community diagnosis: windshield survey, transect walk, observasi posyandu/PUSTU, dan mini FGD.",
                        "Menyusun problem tree dan memilih 1 masalah primer serta 1 bottleneck operasional yang paling feasible."
                    ],
                    output: [
                        "Peta stakeholder dan wilayah sasaran mikro.",
                        "Baseline indikator mingguan yang disepakati.",
                        "Rumusan masalah prioritas dan hipotesis penyebab berbasis lapangan."
                    ]
                },
                {
                    minggu: "Minggu 2",
                    tema: "Co-design intervensi dan perencanaan implementasi",
                    fokus: "Mengubah hasil diagnosis menjadi paket intervensi kecil yang realistis selama rotasi.",
                    kegiatan: [
                        "Mendiagnosis perilaku target dengan COM-B: capability, opportunity, motivation.",
                        "Memilih tuas MINDSPACE yang cocok untuk ibu balita, kader, atau petugas.",
                        "Menyusun alur intervensi: materi edukasi, SOP singkat, reminder, form monitoring, atau dashboard mini.",
                        "Uji cepat materi atau intervensi bersama kader, petugas, dan perwakilan sasaran sebelum pilot."
                    ],
                    output: [
                        "Paket intervensi versi 1 beserta alur kerja.",
                        "Media edukasi atau alat bantu kerja yang siap dipakai.",
                        "Rencana pilot dan indikator proses harian."
                    ]
                },
                {
                    minggu: "Minggu 3",
                    tema: "Pilot lapangan dan perbaikan cepat",
                    fokus: "Menjalankan intervensi pada wilayah atau kelompok sasaran terbatas dan memperbaiki desain secara iteratif.",
                    kegiatan: [
                        "Melaksanakan pilot di posyandu, PUSTU, atau klaster keluarga yang sudah ditentukan.",
                        "Mencatat reach, hambatan, respons sasaran, dan fidelity pelaksanaan setiap sesi.",
                        "Melakukan PDSA harian atau dua harian untuk memperbaiki bahasa pesan, alur edukasi, dan form pencatatan.",
                        "Koordinasi mingguan dengan pembimbing dan PJ program untuk menjaga keselarasan target."
                    ],
                    output: [
                        "Logbook implementasi dan catatan fidelity.",
                        "Versi 2 intervensi yang sudah diperbaiki.",
                        "Temuan awal tentang apa yang paling diterima dan paling sulit dijalankan."
                    ]
                },
                {
                    minggu: "Minggu 4",
                    tema: "Evaluasi, penguatan keberlanjutan, dan handover",
                    fokus: "Menutup siklus intervensi dengan evaluasi proses, rekomendasi lanjut, dan serah terima produk kerja.",
                    kegiatan: [
                        "Mengevaluasi hasil dengan kerangka RE-AIM sederhana: reach, effectiveness awal, adoption, implementation, maintenance.",
                        "Menyusun policy brief mini dan presentasi penutupan untuk puskesmas dan mitra lokal.",
                        "Melatih kader atau petugas PIC agar toolkit bisa dipakai setelah koas selesai.",
                        "Melakukan handover file, SOP, media edukasi, dashboard mini, dan daftar tindak lanjut."
                    ],
                    output: [
                        "Laporan akhir CM koas berbasis data lapangan.",
                        "Toolkit handover yang siap dipakai puskesmas.",
                        "Daftar tindak lanjut 30-60 hari pasca rotasi."
                    ]
                }
            ]
        },

        curriculum: {
            subtitle: "Blok CM koas di Mentikan diposisikan sebagai wahana belajar komunitas yang menilai bukan hanya pengetahuan, tetapi kemampuan bekerja dengan sistem, keluarga, kader, dan data.",
            standards: ["SKDI 2012", "CPL FKK ITS", "Promotif-Preventif", "Patient Safety", "Digital Health", "Interprofessional Collaboration"],
            competencyMap: [
                {
                    domain: "Diagnosis kesehatan komunitas",
                    skdi: "Mengidentifikasi masalah kesehatan prioritas pada populasi dan determinannya.",
                    aktivitas: "Analisis data rutin, observasi lapangan, FGD mini, family folder review, pemetaan wilayah sasaran.",
                    evidence: "Baseline brief, problem tree, peta sasaran, dan justifikasi prioritas."
                },
                {
                    domain: "Komunikasi dan kemitraan komunitas",
                    skdi: "Berkomunikasi efektif dengan pasien, keluarga, kader, dan pemangku kepentingan lokal.",
                    aktivitas: "Audiensi awal, edukasi kelompok kecil, konseling keluarga, dan presentasi hasil ke puskesmas.",
                    evidence: "Catatan pertemuan, materi komunikasi, dan umpan balik stakeholder."
                },
                {
                    domain: "Perencanaan intervensi promotif-preventif",
                    skdi: "Menyusun rencana intervensi yang sesuai konteks dan sumber daya setempat.",
                    aktivitas: "COM-B diagnosis, pemilihan lever MINDSPACE, penyusunan SOP mini, dan co-design dengan kader.",
                    evidence: "Paket intervensi, SOP singkat, media edukasi, dan workflow implementasi."
                },
                {
                    domain: "Manajemen data dan evaluasi program",
                    skdi: "Menggunakan data untuk monitoring, evaluasi, dan perbaikan mutu.",
                    aktivitas: "Membuat indikator proses, logbook pilot, audit sederhana, dan evaluasi RE-AIM ringkas.",
                    evidence: "Dashboard mini, lembar monitoring, analisis proses, dan rekomendasi tindak lanjut."
                },
                {
                    domain: "Profesionalisme, patient safety, dan etik",
                    skdi: "Menjaga etika, kerahasiaan, keselamatan pasien, dan kerja profesional di lapangan.",
                    aktivitas: "Briefing etik lapangan, validasi bahan edukasi, persetujuan stakeholder, dan handover terstruktur.",
                    evidence: "Checklist etik dan patient safety, serta catatan supervisi."
                }
            ],
            supervision: [
                "Briefing awal minggu bersama dosen pembimbing dan preseptor puskesmas.",
                "Review progres mingguan berbasis output, bukan hanya kehadiran.",
                "Penilaian akhir mencakup proses kerja, produk, refleksi, dan keberterimaan lapangan."
            ]
        },

        projection: {
            subtitle: "Mahasiswa FKK ITS tidak datang sebagai tim event, tetapi sebagai tim kerja kecil yang menghasilkan produk lapangan yang bisa dipakai setelah rotasi selesai.",
            roles: [
                { title: "Koordinator Lapangan", desc: "Menjaga timeline mingguan, koordinasi stakeholder, dan mutu eksekusi." },
                { title: "PIC Data & Evaluasi", desc: "Menarik baseline, membuat indikator, dan merapikan dashboard atau log monitoring." },
                { title: "PIC Edukasi & Perubahan Perilaku", desc: "Menyusun materi, nudge, script konseling, dan penguatan kader." },
                { title: "PIC Alur Layanan / Digital", desc: "Merapikan form, reminder, triase ringan, atau alur pencatatan yang feasible." }
            ],
            deliverables: [
                "Baseline brief per masalah prioritas.",
                "Paket intervensi mini berbasis COM-B dan MINDSPACE.",
                "Media edukasi siap pakai untuk petugas atau kader.",
                "Dashboard mini atau form monitoring sederhana.",
                "Laporan akhir, slide diseminasi, dan toolkit handover."
            ],
            guardrails: [
                "Tidak membangun aplikasi baru jika puskesmas belum siap memelihara.",
                "Tidak mengambil data sensitif di luar kebutuhan program dan pembelajaran.",
                "Semua produk harus disetujui PIC puskesmas sebelum digunakan luas.",
                "Fokus pada intervensi kecil yang bisa diukur, bukan program besar yang berhenti setelah koas."
            ]
        },

        recommendation: {
            title: "Mentikan sebagai Wahana Implementasi CM Koas",
            summary: "Mentikan tetap menjadi target utama, tetapi sekarang keputusan itu diterjemahkan menjadi paket kerja 4 minggu yang jelas: diagnosis komunitas, desain intervensi, pilot lapangan, lalu evaluasi dan handover.",
            rationale: [
                "Beban kunjungan tinggi memberi banyak touchpoint untuk observasi sistem dan edukasi.",
                "Kekurangan tenaga strategis membuat intervensi frugal dan perbaikan alur kerja menjadi sangat relevan.",
                "Tiga PUSTU aktif memberi ruang pembelajaran komunitas yang nyata dan terdistribusi.",
                "Masalah perilaku keluarga dan capaian N/D balita cocok untuk pendekatan COM-B dan MINDSPACE."
            ],
            weekSummary: [
                "Minggu 1: diagnosis komunitas dan kontrak kerja.",
                "Minggu 2: co-design intervensi dan perangkat kerja.",
                "Minggu 3: pilot implementasi dan perbaikan cepat.",
                "Minggu 4: evaluasi, diseminasi, dan handover."
            ],
            badges: ["4 minggu efektif", "3 PUSTU aktif", "55.150 kunjungan/tahun", "Feasible untuk CM koas", "Berbasis handover"]
        }
    }
};
