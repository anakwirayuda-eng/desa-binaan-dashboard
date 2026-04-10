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
        jumlah_puskesmas_mojokerto_kota: 6,
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
            indicators: { spm: 97, pantau_balita: 100.51, imunisasi_idl: 100, obat_esensial: 100, kunjungan_rj: 38200, nd_balita: 62.1, sanitasi_dasar: 88 },
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
            indicators: { spm: 96, pantau_balita: 100.0, imunisasi_idl: 100, obat_esensial: 100, kunjungan_rj: 55150, nd_balita: 58.3, sanitasi_dasar: 82 },
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
            indicators: { spm: 99, pantau_balita: 100.8, imunisasi_idl: 100, obat_esensial: 100, kunjungan_rj: 28400, nd_balita: 65.8, sanitasi_dasar: 94 },
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
            indicators: { spm: 98, pantau_balita: 90.69, imunisasi_idl: 100, obat_esensial: 100, kunjungan_rj: 32100, nd_balita: 53.7, sanitasi_dasar: 86 },
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
            kategori: "Perkotaan Non Rawat Inap",
            alamat: "Jl. Raya Meri, Kel. Meri, Kec. Kranggan",
            kecamatan: "Kec. Kranggan",
            telepon: null,
            website: "https://puskesmaskranggan.mojokertokota.go.id/",
            kelurahan: ["Meri", "Kranggan"],
            jumlah_kelurahan: 2,
            jumlah_penduduk: 22826,
            total_sdm: 65,
            luas_wilayah_km2: 3.2056,
            akreditasi: "Terakreditasi",
            tahun_profil: 2024,
            warna: "#8b5cf6",
            gradient: "linear-gradient(135deg, #3b0764, #8b5cf6)",
            icon: "🆕",
            motto: "Keselamatan dan Kepuasan Anda adalah Keselamatan Kami",
            layanan: [],
            pustu: [],
            jejaring: {
                pustu: 3,
                poskesdes: 2,
                posyandu_balita: 22,
                posyandu_lansia: 10,
                bps: 4,
                dpm: 2
            },
            highlights: [
                "Wilayah kerja 2 kelurahan: Kranggan dan Meri",
                "Didukung 3 pustu, 2 poskesdes, 22 posyandu balita, dan 10 posyandu lansia",
                "Kunjungan rawat jalan 2024: 40.874",
                "SDM 2024 terhitung 65 orang"
            ],
            inovasi: [
                {
                    nama: "Si Momo Nekat",
                    desc: "Inovasi edukasi emotional demonstration dengan boneka tangan untuk meningkatkan capaian D/S posyandu balita pada lokus stunting."
                }
            ],
            top_penyakit: [],
            sdm_detail: {
                dokter_umum: 3,
                dokter_gigi: 2,
                perawat: 10,
                bidan: 11,
                kesmas: 2,
                kesling: 1,
                gizi: 1,
                analis: 1,
                farmasi: 4,
                lainnya: 30
            },
            indicators: { spm: null, pantau_balita: 99.36, imunisasi_idl: null, obat_esensial: null, kunjungan_rj: 40874, nd_balita: null, sanitasi_dasar: null },
            swot: {
                s: ["Wilayah kerja fokus hanya 2 kelurahan", "Sudah terakreditasi dan memiliki jejaring 3 pustu"],
                w: ["Sebagian indikator program detail belum mudah diakses publik", "Data historis komparatif belum selengkap 4 puskesmas lain"],
                o: ["Lokus stunting dan posyandu memberi ruang intervensi CM yang jelas", "Skala wilayah relatif ringkas untuk pilot cepat dan terukur"],
                t: ["Ketimpangan data publik dapat memperlambat monitoring", "Beban layanan rutin tetap bisa mengurangi ruang inovasi bila koordinasi lemah"]
            }
        }
    ],

    // ─── ANALISIS KOMPARATIF ───
    perbandingan: {
        labels: ["Blooto", "Mentikan", "Wates", "Gedongan", "Kranggan"],
        penduduk: [25281, 26888, 20379, 22127, 22826],
        sdm: [87, 61, 57, 67, 65],
        kelurahan: [3, 4, 1, 6, 2],
        kunjungan: [38200, 55150, 28400, 32100, 40874],
        pantau_balita: [100.51, 100.0, 100.8, 90.69, 99.36],
        spm: [97, 96, 99, 98, null],
        nd_balita: [62.1, 58.3, 65.8, 53.7, null],
        rasio_sdm_per_1000: [3.44, 2.27, 2.80, 3.03, 2.85],
        rasio_kunjungan_per_penduduk: [1.51, 2.05, 1.39, 1.45, 1.79]
    },

    indikatorGlosarium: {
        title: "Legenda & Definisi Indikator",
        note: "Pada chart komparatif ini, indikator hijau memakai data resmi Profil Kesehatan Kota Mojokerto 2024 tentang balita yang dipantau pertumbuhan dan perkembangannya. Nilai Kranggan untuk N/D balita sengaja dibiarkan kosong karena angka 2024 yang benar-benar sebanding belum ditemukan di sumber publik resmi. Nilai pemantauan balita dapat sedikit melebihi 100% pada laporan resmi karena dinamika denominator administrasi sasaran.",
        items: [
            {
                code: "Pantau Balita",
                label: "Balita dipantau pertumbuhan & perkembangan",
                desc: "Persentase sasaran balita yang dipantau pertumbuhan dan perkembangannya pada periode pelaporan."
            },
            {
                code: "N/D Balita",
                label: "Balita naik berat badan di antara yang ditimbang",
                desc: "N = jumlah balita yang naik berat badan; D = jumlah balita yang ditimbang pada periode pemantauan posyandu."
            },
            {
                code: "SPM",
                label: "Standar Pelayanan Minimal",
                desc: "Indikator pelayanan dasar yang wajib dipenuhi sesuai domain layanan yang diukur; tidak selalu identik dengan indikator balita pada chart ini."
            },
            {
                code: "Kunjungan RJ",
                label: "Kunjungan rawat jalan",
                desc: "Jumlah kunjungan rawat jalan puskesmas selama tahun pelaporan."
            },
            {
                code: "Rasio Kunjungan",
                label: "Kunjungan per penduduk",
                desc: "Jumlah kunjungan rawat jalan dibagi jumlah penduduk wilayah kerja puskesmas."
            }
        ]
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
        },
        decisionGuide: [
            {
                title: "Cara membaca total skor",
                desc: "Total skor adalah penjumlahan bobot tertimbang per kriteria. Nilai lebih tinggi berarti lokasi lebih penting sekaligus lebih feasible untuk rotasi CM yang singkat."
            },
            {
                title: "Apa yang membedakan pemenang",
                desc: "Puskesmas yang menang bukan hanya yang paling bermasalah, tetapi yang paling jelas punya masalah prioritas, ruang uji intervensi, dan peluang handover yang realistis."
            },
            {
                title: "Batas interpretasi",
                desc: "Matrix ini membantu keputusan implementasi, bukan ranking kualitas institusi. Skor tetap harus dibaca bersama data lapangan, kesiapan mitra, dan konteks operasional."
            }
        ],
        winnerNarrative: {
            mentikan: "Mentikan unggul karena kombinasi kompleksitas sosial-perilaku, kebutuhan inovasi frugal, dan peluang perbaikan alur data paling kuat dalam satu rotasi koas.",
            gedongan: "Gedongan menjadi alternatif terkuat kedua karena skala cakupan besar dan ruang inovasi juga tinggi, tetapi urgensi frugal redesign dan data-touchpoint Mentikan masih lebih tajam.",
            wates: "Wates sangat siap secara operasional, namun justru karena sistemnya lebih stabil, ruang pembelajaran untuk intervensi frugal dan redesign layanan relatif lebih sempit."
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
            wilayah_kerja: "4 kelurahan, 3 PUSTU, dan titik layanan keluarga balita",
            lokasi: "Jl. Prapanca No. 55, Kel. Mentikan",
            durasi_rotasi: "4 minggu efektif / 20 hari kerja",
            pendekatan: "diagnosis komunitas -> desain bersama -> pilot -> evaluasi -> handover"
        },

        epidemiologyBridge: "Grafik 10 besar penyakit dipakai sebagai konteks beban layanan kota. Namun target CM koas 20 hari tidak otomatis mengikuti penyakit dengan volume tertinggi; fokus dipilih pada masalah yang paling mungkin diubah cepat di Mentikan, yaitu perilaku keluarga balita dan bottleneck alur layanan yang bisa diperbaiki serta di-handover.",

        implementationPlan: {
            subtitle: "Rencana kerja blok Community Medicine (CM) koas difokuskan ke intervensi kecil yang bisa selesai, diukur, disupervisi, lalu diserahterimakan di wilayah kerja Puskesmas Mentikan dalam satu siklus rotasi.",
            assumptions: [
                "Asumsi 1 tim koas CM bekerja selama 4 minggu efektif dengan supervisi dosen pembimbing dan preseptor puskesmas.",
                "Masalah prioritas awal: N/D balita rendah, beban kunjungan tinggi, gap edukasi keluarga, dan kebutuhan penguatan alur data sederhana.",
                "Output wajib harus feasible dipakai staf puskesmas, kader, atau PUSTU tanpa ketergantungan pada sistem yang terlalu kompleks."
            ],
            operatingModel: {
                title: "Model Operasi Rotasi",
                narrative: "Rotasi dijalankan sebagai siklus kerja 4 minggu: minggu 1 diagnosis, minggu 2 desain bersama, minggu 3 pilot dan perbaikan cepat, lalu minggu 4 evaluasi serta handover. Fokusnya bukan membuat proyek besar, tetapi menyelesaikan paket kerja kecil yang benar-benar bisa dipakai lokal.",
                badges: ["20 hari kerja", "1 target masalah utama", "1 bottleneck operasional", "perbaikan cepat mingguan", "Handover wajib"],
                bullets: [
                    "Setiap minggu ditutup dengan checkpoint supervisi dan keputusan go / adjust / stop.",
                    "Setiap hari memiliki output minimum agar rotasi tidak berubah menjadi observasi pasif.",
                    "Ritme kerja dirancang agar cocok untuk pitching, audit, dan handover ke puskesmas."
                ]
            },
            decisionSnapshot: {
                title: "Decision Snapshot sebelum Masuk ke Timeline",
                summary: "Sebelum melihat rincian 20 hari, ada tiga keputusan kunci yang menjelaskan kenapa timeline ini dimulai dari Mentikan dan bukan dari semua masalah kota sekaligus.",
                items: [
                    {
                        label: "Lokasi terpilih",
                        value: "Mentikan dipilih sebagai wahana implementasi awal karena kombinasi kebutuhan inovasi sederhana, kepadatan titik layanan, dan ruang serah terima paling kuat."
                    },
                    {
                        label: "Fokus 20 hari",
                        value: "Intervensi diarahkan ke perilaku keluarga balita dan bottleneck layanan yang paling realistis diperbaiki dalam satu rotasi pendek."
                    },
                    {
                        label: "Unit kerja",
                        value: "Program berjalan di wilayah kerja Mentikan: 4 kelurahan, 3 PUSTU, dan titik layanan keluarga sasaran, bukan hanya satu ruangan di puskesmas."
                    }
                ]
            },
            workstreams: [
                { title: "Diagnostik Komunitas", desc: "Memetakan masalah prioritas, aktor lokal, wilayah mikro sasaran, dan bottleneck layanan yang paling feasible." },
                { title: "Desain Perubahan Perilaku", desc: "Menerjemahkan COM-B dan MINDSPACE menjadi paket intervensi, script, reminder, dan media lapangan." },
                { title: "Penguatan Alur Pelayanan", desc: "Menyederhanakan titik edukasi, reminder, pencatatan, triase ringan, atau dashboard mini yang realistis." },
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
                        "Diagnosis cepat komunitas: observasi wilayah, penelusuran jalur layanan, observasi posyandu/PUSTU, dan FGD singkat.",
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
                    tema: "Desain bersama intervensi dan perencanaan implementasi",
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
                        "Melakukan siklus perbaikan cepat harian atau dua harian untuk memperbaiki bahasa pesan, alur edukasi, dan form pencatatan.",
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
                        "Menyusun brief kebijakan mini dan presentasi penutupan untuk puskesmas dan mitra lokal.",
                        "Melatih kader atau petugas PIC agar toolkit bisa dipakai setelah koas selesai.",
                        "Melakukan handover file, SOP, media edukasi, dashboard mini, dan daftar tindak lanjut."
                    ],
                    output: [
                        "Laporan akhir CM koas berbasis data lapangan.",
                        "Toolkit handover yang siap dipakai puskesmas.",
                        "Daftar tindak lanjut 30-60 hari pasca rotasi."
                    ]
                }
            ],
            ganttNote: "Gantt chart ini adalah prakiraan kerja ideal untuk 20 hari. Ia berfungsi sebagai alat kontrol ritme, bukan kalender kaku; penyesuaian lapangan tetap dimungkinkan selama milestone mingguan tercapai.",
            gantt: {
                dayLabels: ["D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9", "D10", "D11", "D12", "D13", "D14", "D15", "D16", "D17", "D18", "D19", "D20"],
                weekBands: [
                    { label: "Minggu 1", focus: "Diagnosis", start: 1, end: 5 },
                    { label: "Minggu 2", focus: "Desain bersama", start: 6, end: 10 },
                    { label: "Minggu 3", focus: "Pilot + perbaikan cepat", start: 11, end: 15 },
                    { label: "Minggu 4", focus: "Evaluasi + Handover", start: 16, end: 20 }
                ],
                tracks: [
                    {
                        title: "Governance dan stakeholder",
                        owner: "Koordinator Lapangan",
                        tone: "blue",
                        detail: "Menjaga kontrak kerja, sinkronisasi PIC, supervisi, dan forum handover.",
                        blocks: [
                            { label: "Kick-off dan kontrak", start: 1, end: 2 },
                            { label: "Review mingguan", shortLabel: "Review", start: 5, end: 5 },
                            { label: "Mid-pilot review", shortLabel: "Mid-review", start: 15, end: 15 },
                            { label: "Diseminasi dan handover", start: 19, end: 20 }
                        ]
                    },
                    {
                        title: "Baseline dan diagnosis komunitas",
                        owner: "PIC Data dan Evaluasi",
                        tone: "cyan",
                        detail: "Menyusun baseline, memetakan wilayah, dan memilih prioritas masalah.",
                        blocks: [
                            { label: "Audit data rutin", start: 1, end: 3 },
                            { label: "Observasi wilayah", start: 3, end: 4 },
                            { label: "Problem tree", start: 4, end: 5 }
                        ]
                    },
                    {
                        title: "Desain COM-B dan MINDSPACE",
                        owner: "PIC Edukasi dan Perubahan Perilaku",
                        tone: "purple",
                        detail: "Menerjemahkan diagnosis menjadi target perilaku, pesan, dan nudge yang dapat diuji.",
                        blocks: [
                            { label: "Diagnosis perilaku", start: 6, end: 7 },
                            { label: "Sprint desain", start: 8, end: 9 },
                            { label: "User testing", shortLabel: "Uji awal", start: 10, end: 10 }
                        ]
                    },
                    {
                        title: "Tooling dan alur layanan",
                        owner: "PIC Alur Layanan / Digital",
                        tone: "amber",
                        detail: "Merancang form, script, SOP mini, reminder, dan dashboard ringkas yang feasible.",
                        blocks: [
                            { label: "Draft SOP + media", start: 7, end: 9 },
                            { label: "Finalisasi paket pilot", shortLabel: "Paket final", start: 10, end: 10 },
                            { label: "Perbaikan alat", start: 12, end: 17 }
                        ]
                    },
                    {
                        title: "Pilot lapangan dan perbaikan cepat",
                        owner: "Semua PIC",
                        tone: "red",
                        detail: "Menjalankan intervensi terbatas sambil mengecek reach, fidelity, dan hambatan lapangan.",
                        blocks: [
                            { label: "Pilot gelombang 1", start: 11, end: 12 },
                            { label: "Perbaikan cepat 1", start: 12, end: 13 },
                            { label: "Pilot gelombang 2", start: 13, end: 14 },
                            { label: "Perbaikan cepat 2", start: 14, end: 15 }
                        ]
                    },
                    {
                        title: "Evaluasi, pelatihan, dan handover",
                        owner: "Koordinator + PIC Data",
                        tone: "green",
                        detail: "Menyimpulkan hasil, menyiapkan laporan, melatih PIC lokal, dan menutup loop rotasi.",
                        blocks: [
                            { label: "Review hasil cepat", start: 16, end: 17 },
                            { label: "Toolkit final", start: 17, end: 18 },
                            { label: "Training PIC", shortLabel: "Latih PIC", start: 18, end: 19 },
                            { label: "Final handover", shortLabel: "Handover", start: 20, end: 20 }
                        ]
                    }
                ],
                milestones: [
                    { day: 5, label: "Masalah prioritas dan baseline disepakati", tone: "blue" },
                    { day: 10, label: "Paket pilot siap pakai", tone: "purple" },
                    { day: 15, label: "Versi 2 intervensi selesai", tone: "red" },
                    { day: 20, label: "Toolkit dan tindak lanjut diserahterimakan", tone: "green" }
                ]
            },
            dailyForecastNote: "Breakdown harian ini dipakai sebagai prakiraan kerja minimum. Jika agenda lokal berubah, yang dijaga adalah output harian, bukan jam detailnya.",
            dailyForecast: [
                {
                    week: "Minggu 1",
                    theme: "Diagnosis komunitas dan kontrak kerja",
                    days: [
                        {
                            day: "Senin",
                            label: "Hari 1",
                            am: "Audiensi pembuka dengan Kapus, preseptor, PJ program, dan konfirmasi sasaran rotasi.",
                            pm: "Tarik dokumen baseline, peta wilayah, daftar kader, family folder, dan kalender kegiatan.",
                            owner: "Koordinator + PIC Data",
                            output: "Kontrak kerja, daftar data awal, dan agenda 4 minggu.",
                            checkpoint: "PIC puskesmas dan mekanisme komunikasi disepakati."
                        },
                        {
                            day: "Selasa",
                            label: "Hari 2",
                            am: "Audit data SPM, N/D balita, kunjungan, imunisasi, dan isu prioritas lokal.",
                            pm: "Susun baseline board dan shortlist indikator proses yang akan dipantau harian.",
                            owner: "PIC Data dan Evaluasi",
                            output: "Baseline dashboard versi 0.",
                            checkpoint: "Indikator inti tidak lebih dari 5 agar mudah dipantau."
                        },
                        {
                            day: "Rabu",
                            label: "Hari 3",
                            am: "Observasi cepat wilayah Mentikan - PUSTU - kantong sasaran.",
                            pm: "Catat hambatan akses, titik edukasi, dan titik layanan yang paling ramai.",
                            owner: "Koordinator + PIC Alur",
                            output: "Peta mikro dan daftar titik layanan prioritas.",
                            checkpoint: "Minimal 1 lokasi ramai dan 1 lokasi komunitas terpilih."
                        },
                        {
                            day: "Kamis",
                            label: "Hari 4",
                            am: "Observasi posyandu / PUSTU / konseling keluarga dan mini interview dengan kader.",
                            pm: "Sintesis masalah perilaku keluarga, bottleneck staf, dan peluang nudges sederhana.",
                            owner: "PIC Edukasi + PIC Alur",
                            output: "Problem list lapangan dan hambatan nyata.",
                            checkpoint: "Temuan diarahkan ke 1 masalah utama dan 1 bottleneck operasional."
                        },
                        {
                            day: "Jumat",
                            label: "Hari 5",
                            am: "FGD singkat dan problem tree bersama pembimbing, PJ program, dan kader inti.",
                            pm: "Pilih prioritas masalah dan rumuskan aim statement rotasi.",
                            owner: "Semua PIC",
                            output: "Aim statement, problem tree, dan milestone Minggu 2.",
                            checkpoint: "Masalah prioritas dan target perilaku telah dikunci."
                        }
                    ]
                },
                {
                    week: "Minggu 2",
                    theme: "Desain bersama dan finalisasi perangkat pilot",
                    days: [
                        {
                            day: "Senin",
                            label: "Hari 6",
                            am: "Diagnosis COM-B untuk keluarga sasaran, kader, dan petugas titik layanan.",
                            pm: "Pilih 1-2 target perilaku inti yang paling realistis diubah dalam 2 minggu.",
                            owner: "PIC Edukasi dan Perubahan Perilaku",
                            output: "Matriks COM-B prioritas.",
                            checkpoint: "Capability, opportunity, motivation sudah dipetakan."
                        },
                        {
                            day: "Selasa",
                            label: "Hari 7",
                            am: "Pilih lever MINDSPACE yang paling cocok: salience, messenger, prompt, defaults, commitment.",
                            pm: "Sketch alur pesan, script kader, dan trigger follow-up.",
                            owner: "PIC Edukasi + Koordinator",
                            output: "Brief intervensi versi 1.",
                            checkpoint: "Setiap intervensi terhubung langsung dengan hambatan perilaku."
                        },
                        {
                            day: "Rabu",
                            label: "Hari 8",
                            am: "Buat media edukasi, form log, SOP mini, dan template dashboard sederhana.",
                            pm: "Rapikan peran siapa melakukan apa pada hari pilot.",
                            owner: "PIC Alur Layanan / Digital",
                            output: "Draft paket pilot.",
                            checkpoint: "Semua alat cukup sederhana untuk dipakai tanpa pelatihan panjang."
                        },
                        {
                            day: "Kamis",
                            label: "Hari 9",
                            am: "User testing cepat dengan kader, ibu sasaran, atau petugas layanan.",
                            pm: "Perbaiki bahasa pesan, urutan alur, dan beban pencatatan.",
                            owner: "PIC Edukasi + PIC Alur",
                            output: "Revisi paket pilot.",
                            checkpoint: "Minimal ada umpan balik dari pengguna nyata."
                        },
                        {
                            day: "Jumat",
                            label: "Hari 10",
                            am: "Training singkat PIC lapangan dan simulasi jalannya intervensi.",
                            pm: "Finalisasi protokol pilot dan checklist mutu pelaksanaan.",
                            owner: "Koordinator + Semua PIC",
                            output: "Paket pilot final dan checklist implementasi.",
                            checkpoint: "Minggu 3 siap masuk lapangan tanpa desain yang masih menggantung."
                        }
                    ]
                },
                {
                    week: "Minggu 3",
                    theme: "Pilot, monitoring, dan perbaikan cepat",
                    days: [
                        {
                            day: "Senin",
                            label: "Hari 11",
                            am: "Laksanakan pilot gelombang 1 di titik layanan prioritas pertama.",
                            pm: "Catat reach, hambatan, durasi, dan penerimaan sasaran.",
                            owner: "Semua PIC",
                            output: "Log implementasi hari pertama.",
                            checkpoint: "Setiap deviasi dicatat, bukan diingat saja."
                        },
                        {
                            day: "Selasa",
                            label: "Hari 12",
                            am: "Analisis cepat hasil hari 11 dan lakukan perbaikan cepat mini.",
                            pm: "Perbaiki script, form, layout media, atau alur petugas.",
                            owner: "PIC Data + PIC Edukasi",
                            output: "Intervensi versi 1.1.",
                            checkpoint: "Perubahan harus kecil dan langsung diuji lagi."
                        },
                        {
                            day: "Rabu",
                            label: "Hari 13",
                            am: "Pilot gelombang 2 di lokasi / kelompok kedua.",
                            pm: "Lakukan follow-up keluarga sasaran dan cek keterpakaian alat bantu.",
                            owner: "Semua PIC",
                            output: "Data reach dan fidelity gelombang 2.",
                            checkpoint: "Bandingkan hasil antar titik layanan, bukan hanya total output."
                        },
                        {
                            day: "Kamis",
                            label: "Hari 14",
                            am: "Perbaikan cepat kedua berdasarkan hambatan lapangan terbaru.",
                            pm: "Rapikan toolkit agar siap dipakai ulang oleh puskesmas.",
                            owner: "PIC Alur + PIC Edukasi",
                            output: "Intervensi versi 2.",
                            checkpoint: "Perubahan fokus pada penyederhanaan, bukan penambahan fitur."
                        },
                        {
                            day: "Jumat",
                            label: "Hari 15",
                            am: "Review mingguan dengan dosen, preseptor, dan PIC program.",
                            pm: "Putuskan intervensi mana yang diteruskan, disederhanakan, atau dihentikan.",
                            owner: "Koordinator",
                            output: "Keputusan mid-pilot dan rencana evaluasi akhir.",
                            checkpoint: "Ada keputusan eksplisit go / adjust / stop."
                        }
                    ]
                },
                {
                    week: "Minggu 4",
                    theme: "Evaluasi, diseminasi, dan handover",
                    days: [
                        {
                            day: "Senin",
                            label: "Hari 16",
                            am: "Evaluasi cepat dengan RE-AIM ringkas dan audit data hasil pilot.",
                            pm: "Analisis reach, acceptance, adoption awal, dan implementation gap.",
                            owner: "PIC Data dan Evaluasi",
                            output: "Tabel evaluasi proses.",
                            checkpoint: "Evaluasi fokus pada keputusan praktis, bukan statistik berlebihan."
                        },
                        {
                            day: "Selasa",
                            label: "Hari 17",
                            am: "Rapikan dashboard mini, logbook, dan lampiran bukti kerja.",
                            pm: "Tulis ringkasan temuan, insight perilaku, dan bottleneck sistem.",
                            owner: "PIC Data + Koordinator",
                            output: "Draft laporan akhir dan dashboard handover.",
                            checkpoint: "Semua angka yang ditulis harus punya sumber dan definisi."
                        },
                        {
                            day: "Rabu",
                            label: "Hari 18",
                            am: "Finalisasi media edukasi, SOP mini, lembar reminder, dan toolkit lokal.",
                            pm: "Susun tindak lanjut 30-60 hari dan siapa penanggung jawabnya.",
                            owner: "PIC Edukasi + PIC Alur",
                            output: "Toolkit handover final.",
                            checkpoint: "Produk akhir harus bisa dipakai tanpa kehadiran tim koas."
                        },
                        {
                            day: "Kamis",
                            label: "Hari 19",
                            am: "Latih PIC puskesmas / kader untuk memakai toolkit dan monitoring sederhana.",
                            pm: "Simulasi presentasi diseminasi serta revisi brief kebijakan mini.",
                            owner: "Koordinator + Semua PIC",
                            output: "PIC lokal terlatih dan slide final siap.",
                            checkpoint: "Ada pihak lokal yang siap menjadi champion."
                        },
                        {
                            day: "Jumat",
                            label: "Hari 20",
                            am: "Presentasi akhir ke puskesmas, mitra lokal, dan pembimbing.",
                            pm: "Serah terima file, toolkit, rekomendasi, dan daftar tindak lanjut.",
                            owner: "Semua PIC",
                            output: "Handover resmi dan penutupan rotasi.",
                            checkpoint: "Seluruh file dan keputusan tindak lanjut terdokumentasi."
                        }
                    ]
                }
            ]
        },

        curriculum: {
            subtitle: "Blok CM koas di Mentikan diposisikan sebagai wahana belajar komunitas yang menilai bukan hanya pengetahuan, tetapi kemampuan bekerja dengan sistem, keluarga, kader, dan data.",
            standards: ["SKDI 2012", "SPPDI", "CPL FKK ITS", "Patient Safety", "Quality Improvement", "Digital Health", "Interprofessional Collaboration"],
            referenceStandards: [
                {
                    title: "SKDI 2012",
                    why: "Menjaga agar kegiatan tetap berakar pada kompetensi dokter Indonesia, terutama community diagnosis, komunikasi, promotif-preventif, dan profesionalisme.",
                    application: "Dipakai untuk memetakan domain kompetensi dan evidence yang harus dibawa pulang mahasiswa."
                },
                {
                    title: "SPPDI / Standar pendidikan profesi",
                    why: "Membantu memastikan rotasi bukan sekadar aktivitas lapangan, tetapi pengalaman belajar klinik komunitas yang terstruktur dan disupervisi.",
                    application: "Dipakai untuk menata target belajar, penilaian berbasis evidence, dan supervisi mingguan."
                },
                {
                    title: "WHO Patient Safety Curriculum",
                    why: "Menjaga intervensi lapangan tetap aman, etis, dan tidak menambah risiko pada alur layanan primer.",
                    application: "Dipakai pada briefing etik, validasi materi, dan handover yang aman."
                },
                {
                    title: "IHI Model for Improvement",
                    why: "Memberi disiplin improvement yang ringan namun operasional lewat PDSA singkat.",
                    application: "Dipakai untuk pilot mingguan, perbaikan cepat, dan evaluasi proses."
                }
            ],
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
                { title: "Koordinator Lapangan", desc: "Menjaga timeline mingguan, koordinasi stakeholder, mutu eksekusi, dan keputusan go / adjust / stop." },
                { title: "PIC Data dan Evaluasi", desc: "Menarik baseline, mengelola logbook, menghitung indikator, dan menyusun dashboard handover." },
                { title: "PIC Edukasi dan Perubahan Perilaku", desc: "Menyusun materi, nudge, script konseling, dan user testing bersama kader atau keluarga." },
                { title: "PIC Alur Layanan / Digital", desc: "Merapikan form, reminder, triase ringan, dan alur pencatatan yang feasible di puskesmas." }
            ],
            deliverables: [
                "Ringkasan baseline per masalah prioritas.",
                "Paket intervensi mini dan alur kerja singkat.",
                "Media edukasi siap pakai untuk petugas atau kader.",
                "Dashboard mini atau form monitoring sederhana.",
                "Laporan akhir, slide diseminasi, dan paket serah terima."
            ],
            guardrails: [
                "Tidak membangun aplikasi baru jika puskesmas belum siap memelihara.",
                "Tidak mengambil data sensitif di luar kebutuhan program dan pembelajaran.",
                "Semua produk harus disetujui PIC puskesmas sebelum digunakan luas.",
                "Fokus pada intervensi kecil yang bisa diukur, bukan program besar yang berhenti setelah koas."
            ],
            dailyLoad: [
                {
                    title: "Output minimum per hari",
                    desc: "Setiap hari harus berakhir dengan artefak nyata: catatan stakeholder, baseline, media revisi, log pilot, atau keputusan tindak lanjut."
                },
                {
                    title: "Output minimum per minggu",
                    desc: "Setiap minggu wajib punya checkpoint formal agar koas tidak tenggelam di observasi tanpa keputusan."
                },
                {
                    title: "Produk akhir per rotasi",
                    desc: "Rotasi ditutup dengan toolkit, policy brief mini, dan pihak lokal yang siap melanjutkan."
                }
            ]
        },

        rpsObe: {
            title: "RPS OBE Ringkas Blok CM Koas",
            subtitle: "Panel ini menunjukkan bahwa aktivitas CM di Mentikan terhubung langsung dengan CPL FKK ITS, CPMK blok, dan Rencana Asesmen dan Evaluasi (RAE), sehingga jalur akademik dan jalur operasional tetap koheren.",
            identity: [
                "Wilayah kerja Puskesmas Mentikan",
                "4 minggu efektif / 20 hari kerja",
                "Diagnosis komunitas -> desain bersama -> pilot -> handover",
                "Supervisi dosen pembimbing dan preseptor puskesmas"
            ],
            cplSelected: [
                {
                    code: "CPL 1",
                    area: "Profesionalitas yang luhur",
                    outcome: "Menunjukkan etika, integritas, kepedulian sosial, dan tanggung jawab profesional selama kerja lapangan."
                },
                {
                    code: "CPL 4",
                    area: "Komunikasi efektif",
                    outcome: "Berkomunikasi efektif dengan staf puskesmas, kader, keluarga, dan pemangku kepentingan lokal."
                },
                {
                    code: "CPL 6",
                    area: "Pengelolaan masalah kesehatan",
                    outcome: "Mendiagnosis masalah kesehatan komunitas dan menyusun prioritas intervensi promotif-preventif."
                },
                {
                    code: "CPL 7",
                    area: "Pengelolaan masalah kesehatan / sistem",
                    outcome: "Bekerja kolaboratif dalam sistem layanan primer dan pemberdayaan masyarakat."
                },
                {
                    code: "CPL 11",
                    area: "Landasan ilmiah ilmu kedokteran",
                    outcome: "Menggunakan data lapangan dan penalaran ilmiah untuk menjelaskan masalah serta memilih intervensi."
                },
                {
                    code: "CPL 12",
                    area: "Pengelolaan informasi / digital health",
                    outcome: "Mengelola data, logbook, monitoring sederhana, dan produk digital ringan secara aman dan relevan."
                }
            ],
            cpmk: [
                {
                    code: "CPMK 1",
                    text: "Memvalidasi satu masalah prioritas komunitas dan satu bottleneck layanan berdasarkan data dan observasi lapangan."
                },
                {
                    code: "CPMK 2",
                    text: "Merancang intervensi mikro promotif-preventif berbasis perilaku dan konteks lokal yang feasible dalam satu rotasi."
                },
                {
                    code: "CPMK 3",
                    text: "Berkomunikasi, bernegosiasi, dan bekerja kolaboratif dengan staf puskesmas, kader, keluarga, dan pembimbing."
                },
                {
                    code: "CPMK 4",
                    text: "Menjalankan pilot, monitoring, evaluasi proses, dan perbaikan cepat secara etis serta aman."
                },
                {
                    code: "CPMK 5",
                    text: "Menghasilkan output akhir berupa toolkit, logbook, dashboard ringkas, dan handover yang dapat dipakai lokal."
                }
            ],
            rae: [
                {
                    component: "Profesionalisme, disiplin, dan etik lapangan",
                    weight: "10%",
                    evidence: "Checklist pembimbing, catatan supervisi, dan kepatuhan pada kerahasiaan data.",
                    cpmk: "CPMK 3-4"
                },
                {
                    component: "Diagnosis komunitas dan baseline brief",
                    weight: "20%",
                    evidence: "Baseline brief, problem tree, peta sasaran, dan justifikasi prioritas.",
                    cpmk: "CPMK 1"
                },
                {
                    component: "Paket intervensi dan rancangan implementasi",
                    weight: "20%",
                    evidence: "Brief COM-B, pilihan lever MINDSPACE, SOP mini, media edukasi, dan alur kerja.",
                    cpmk: "CPMK 2-3"
                },
                {
                    component: "Pilot, monitoring, dan logbook",
                    weight: "20%",
                    evidence: "Log harian, checklist fidelity, analisis hambatan, dan keputusan lanjut / sesuaikan / hentikan.",
                    cpmk: "CPMK 4"
                },
                {
                    component: "Presentasi akhir, dashboard ringkas, dan handover",
                    weight: "20%",
                    evidence: "Slide diseminasi, dashboard mini, toolkit handover, dan daftar tindak lanjut.",
                    cpmk: "CPMK 5"
                },
                {
                    component: "Refleksi individu dan pembelajaran tim",
                    weight: "10%",
                    evidence: "Refleksi singkat berbasis eviden lapangan dan umpan balik pembimbing.",
                    cpmk: "CPMK 3-5"
                }
            ],
            alignment: [
                {
                    phase: "Minggu 1 - diagnosis komunitas",
                    activity: "Audiensi awal, audit data, observasi wilayah, observasi PUSTU / posyandu, FGD mini, dan problem tree.",
                    cpmk: "CPMK 1 dan CPMK 3",
                    rae: "Diagnosis komunitas 20% + profesionalisme 10%"
                },
                {
                    phase: "Minggu 2 - desain bersama",
                    activity: "Diagnosis COM-B, pemilihan tuas MINDSPACE, penyusunan SOP mini, media edukasi, dan uji cepat.",
                    cpmk: "CPMK 2 dan CPMK 3",
                    rae: "Paket intervensi 20%"
                },
                {
                    phase: "Minggu 3 - pilot dan perbaikan cepat",
                    activity: "Pelaksanaan pilot terbatas, monitoring reach dan fidelity, review hambatan, dan revisi cepat.",
                    cpmk: "CPMK 4",
                    rae: "Pilot, monitoring, dan logbook 20%"
                },
                {
                    phase: "Minggu 4 - evaluasi dan handover",
                    activity: "Rapid review RE-AIM, dashboard ringkas, pelatihan PIC lokal, diseminasi, dan serah terima toolkit.",
                    cpmk: "CPMK 5",
                    rae: "Presentasi akhir dan handover 20% + refleksi 10%"
                }
            ],
            note: "RAE pada panel ini dimaknai sebagai Rencana Asesmen dan Evaluasi blok CM koas, agar dosen, reviewer, dan mitra lapangan dapat melihat hubungan langsung antara capaian belajar, aktivitas, dan evidence yang dikumpulkan."
        },

        visualToolkit: {
            subtitle: "Untuk pitch ke eksekutif dan kebutuhan supervisi akademik, panel terbaik adalah hybrid panelization: ringkasan eksekutif, timeline operasional, decision matrix explainable, lalu evidence gallery dan bibliografi.",
            panelPrinciples: [
                {
                    title: "Executive Panel",
                    desc: "Dipakai untuk menjawab cepat: kenapa Mentikan, apa targetnya, dan berapa lama rotasinya."
                },
                {
                    title: "Operational Panel",
                    desc: "Dipakai untuk menunjukkan apakah rencana benar-benar feasible hari demi hari, bukan hanya indah di slide."
                },
                {
                    title: "Learning Panel",
                    desc: "Dipakai untuk menghubungkan aktivitas lapangan dengan SKDI, supervisi, dan evidence pembelajaran."
                },
                {
                    title: "Evidence Panel",
                    desc: "Dipakai untuk memperlihatkan sumber resmi, foto referensi, dan daftar pustaka agar presentasi terasa kredibel."
                }
            ],
            recommendedFigures: [
                {
                    title: "Gantt 20 Hari",
                    use: "Terbaik untuk menunjukkan ritme kerja, milestone, dan feasibility rotasi.",
                    fit: "Cocok untuk dosen, kapus, dan eksekutif yang ingin tahu apakah rencana realistis."
                },
                {
                    title: "Driver Diagram Mentikan",
                    use: "Menjembatani masalah prioritas, driver perilaku, dan intervensi yang benar-benar dikerjakan.",
                    fit: "Cocok untuk menutup gap antara teori COM-B / MINDSPACE dan aksi lapangan."
                },
                {
                    title: "Decision Matrix Breakdown",
                    use: "Menjelaskan mengapa Mentikan unggul dan bagaimana bobot tiap kriteria bekerja.",
                    fit: "Cocok untuk menjawab kritik bahwa scoring terlalu subjektif."
                },
                {
                    title: "Photo and Evidence Wall",
                    use: "Memberi rasa tempat, mitra, dan aktivitas nyata dari sumber resmi.",
                    fit: "Cocok untuk pitch ke pemda, dekanat, dan pihak non-teknis."
                },
                {
                    title: "Swimlane / RACI",
                    use: "Bagus jika nanti ingin memecah tugas antara koas, puskesmas, kader, dan dosen lebih rinci.",
                    fit: "Lebih cocok sebagai appendix lanjutan, bukan panel utama halaman ini."
                }
            ],
            driverDiagram: {
                aim: "Menaikkan kualitas touchpoint edukasi dan tindak lanjut keluarga balita di Mentikan dalam 4 minggu rotasi.",
                drivers: [
                    {
                        title: "Capability keluarga",
                        actions: ["Script konseling 3 menit", "Leaflet red-flag dan reminder kunjungan"]
                    },
                    {
                        title: "Opportunity di layanan",
                        actions: ["Touchpoint edukasi di PUSTU / posyandu", "Form singkat follow-up keluarga"]
                    },
                    {
                        title: "Motivation dan nudges",
                        actions: ["Messenger kader / petugas", "Prompt dan komitmen ulang saat kontrol"]
                    },
                    {
                        title: "Data dan monitoring",
                        actions: ["Dashboard mini mingguan", "Checklist fidelity dan log hambatan"]
                    }
                ]
            },
            photoReferences: [
                {
                    title: "Logo ITS resmi",
                    source: "ITS Brand Guidelines",
                    note: "Gunakan untuk navbar, cover, lampiran, dan slide penutup agar identitas institusi konsisten.",
                    url: "https://www.its.ac.id/en/about/brand-guidelines/",
                    image: "assets/its-logo.svg",
                    credit: "its.ac.id"
                },
                {
                    title: "Visual kampus ITS",
                    source: "ITS official image",
                    note: "Konteks institusional untuk mempertegas asal pengampu program dan positioning akademik.",
                    url: "https://www.its.ac.id/wp-content/uploads/2026/02/97-1-1024x398.png",
                    image: "assets/its-campus.png",
                    credit: "its.ac.id"
                },
                {
                    title: "Banner resmi Kota Mojokerto",
                    source: "Portal Pemerintah Kota Mojokerto",
                    note: "Visual kota yang relevan untuk konteks kemitraan dengan pemda dan Dinkes.",
                    url: "https://web.mojokertokota.go.id/",
                    image: "assets/mojokerto-city-banner.jpg",
                    credit: "web.mojokertokota.go.id"
                },
                {
                    title: "Kepadatan kawasan perkotaan Mojokerto",
                    source: "Portal Pemerintah Kota Mojokerto",
                    note: "Memberi konteks kawasan padat yang membuat edukasi keluarga, posyandu, dan pustu perlu dibaca secara dekat.",
                    url: "https://web.mojokertokota.go.id/",
                    image: "assets/mojokerto_hero.png",
                    credit: "web.mojokertokota.go.id"
                },
                {
                    title: "Aktivitas Mentikan / inovasi lapangan",
                    source: "Puskesmas Mentikan Kota Mojokerto",
                    note: "Referensi visual lapangan dan inovasi stunting. Tautan resmi tersedia, tetapi preview gambar situs sering membatasi hotlinking.",
                    url: "https://puskesmasmentikan.mojokertokota.go.id/kegiatan/paus-danil-tue-sep-14-2021-000000-gmt0700",
                    image: null,
                    credit: "puskesmasmentikan.mojokertokota.go.id"
                }
            ],
            bibliography: [
                {
                    title: "Profil Kesehatan Kota Mojokerto Tahun 2024",
                    org: "Satikomo / Pemerintah Kota Mojokerto",
                    year: "2026 metadata",
                    url: "https://satikomo.mojokertokota.go.id/dataset/data/profil-kesehatan-kota-mojokerto-tahun-2024",
                    type: "Data kota",
                    note: "Sumber utama konteks capaian kesehatan tingkat kota."
                },
                {
                    title: "Profil Perkembangan Kependudukan Kota Mojokerto Tahun 2024",
                    org: "Dispendukcapil Kota Mojokerto",
                    year: "2025 upload",
                    url: "https://dispenduk.mojokertokota.go.id/public/doc/gisa/2025-06-17_11-58-18_Profil%20Perkembangan%20Kependudukan%20Kota%20Mojokerto%20Tahun%202024.pdf",
                    type: "Data kependudukan",
                    note: "Dipakai untuk konteks SDoH, kepadatan, dan demografi."
                },
                {
                    title: "Beranda / Profil Puskesmas Mentikan Kota Mojokerto",
                    org: "Puskesmas Mentikan Kota Mojokerto",
                    year: "akses 2026",
                    url: "https://puskesmasmentikan.mojokertokota.go.id/",
                    type: "Sumber operasional",
                    note: "Profil layanan, alamat, kontak, dan konteks aktivitas lapangan."
                },
                {
                    title: "Klenting Mas / Kegiatan Puskesmas Mentikan",
                    org: "Puskesmas Mentikan Kota Mojokerto",
                    year: "2021-2024 arsip situs",
                    url: "https://puskesmasmentikan.mojokertokota.go.id/kegiatan/paus-danil-tue-sep-14-2021-000000-gmt0700",
                    type: "Contoh inovasi",
                    note: "Menunjukkan contoh inovasi lokal yang relevan dengan isu stunting."
                },
                {
                    title: "Peraturan Konsil Kedokteran Indonesia No. 11 Tahun 2012",
                    org: "Konsil Kedokteran Indonesia / peraturan.go.id",
                    year: "2012",
                    url: "https://peraturan.go.id/id/peraturan-kki-no-11-tahun-2012",
                    type: "Acuan kompetensi",
                    note: "Landasan utama pemetaan kompetensi dokter Indonesia."
                },
                {
                    title: "Standar Pendidikan Profesi Dokter Indonesia",
                    org: "LAM-PTKes",
                    year: "2013",
                    url: "https://lamptkes.org/unduhan/Final_SPPDI,_21_Maret_2013_1555037477.pdf",
                    type: "Acuan kurikulum",
                    note: "Melengkapi kerangka pengalaman belajar profesi dan supervisi."
                },
                {
                    title: "Patient Safety Curriculum Guide for Medical Schools",
                    org: "World Health Organization",
                    year: "2009",
                    url: "https://www.who.int/publications/i/item/9789241501958",
                    type: "Patient safety",
                    note: "Rujukan untuk keselamatan pasien, etik, dan budaya aman."
                },
                {
                    title: "What is RE-AIM?",
                    org: "RE-AIM",
                    year: "akses 2026",
                    url: "https://re-aim.org/learn/what-is-re-aim/",
                    type: "Implementation evaluation",
                    note: "Kerangka evaluasi ringkas untuk reach, adoption, implementation, dan maintenance."
                },
                {
                    title: "MINDSPACE: Influencing Behaviour Through Public Policy",
                    org: "Institute for Government",
                    year: "2010",
                    url: "https://www.instituteforgovernment.org.uk/sites/default/files/publications/MINDSPACE.pdf",
                    type: "Behavioural insights",
                    note: "Rujukan pemilihan nudges dan desain perubahan perilaku."
                },
                {
                    title: "How to Improve",
                    org: "Institute for Healthcare Improvement",
                    year: "akses 2026",
                    url: "https://www.ihi.org/resources/Pages/HowtoImprove/default.aspx",
                    type: "Quality improvement",
                    note: "Rujukan PDSA dan disiplin perbaikan cepat yang ringan."
                },
                {
                    title: "Brand Guidelines",
                    org: "Institut Teknologi Sepuluh Nopember",
                    year: "akses 2026",
                    url: "https://www.its.ac.id/en/about/brand-guidelines/",
                    type: "Identitas institusi",
                    note: "Acuan penggunaan lambang dan visual ITS."
                },
                {
                    title: "WFME Global Standards for Basic Medical Education",
                    org: "World Federation for Medical Education",
                    year: "akses 2026",
                    url: "https://wfme.org/standards/bme/",
                    type: "Acuan mutu pendidikan",
                    note: "Rujukan global untuk mutu pengalaman belajar dan outcome-based education."
                }
            ],
            deepthinkTriage: {
                accepted: [
                    "Hybrid panelization: executive summary + gantt + daily cards + evidence gallery.",
                    "Ambient visual ringan, bukan efek 3D berat.",
                    "Explainable scoring dengan breakdown bobot dan narasi keputusan."
                ],
                deferred: [
                    "Swimlane RACI detail penuh per aktor.",
                    "Animasi chart yang lebih sinematik jika nanti dibutuhkan untuk pitching formal."
                ],
                rejected: [
                    "3D tilt dan spotlight intensif karena buruk untuk mobile, baterai, dan aksesibilitas.",
                    "Noise overlay tebal dan motion agresif yang berisiko membuat dashboard terasa gimmicky."
                ]
            }
        },

        executivePrint: {
            subtitle: "Versi cetak eksekutif disaring untuk menjawab pertanyaan pimpinan secara cepat: mengapa Mentikan, apa paket kerjanya, berapa lama rotasinya, dan produk apa yang pulang dari CM koas.",
            cards: [
                { label: "Target Implementasi", value: "Puskesmas Mentikan" },
                { label: "Durasi Rotasi", value: "4 minggu / 20 hari" },
                { label: "Fokus Masalah", value: "Perilaku keluarga balita + bottleneck layanan" },
                { label: "Output Akhir", value: "Toolkit handover + dashboard mini + brief" }
            ],
            included: [
                "Konteks singkat, komparatif utama, dan alasan pemilihan Mentikan.",
                "Implementation plan mingguan, gantt 20 hari, dan milestone supervisi.",
                "Ringkasan kurikulum CM koas, proyeksi peran mahasiswa, dan guardrails.",
                "Scoring matrix inti serta narasi keputusan yang explainable."
            ],
            deferred: [
                "Deep dive penuh per puskesmas dan forecast harian 20 hari.",
                "Toolkit visual, referensi foto, bibliografi panjang, dan deepthink triage.",
                "Rubrik scoring detail per kriteria dan breakdown contribution penuh.",
                "Lampiran teknis: RACI, swimlane aktor, asumsi operasional, dan detail metodologi."
            ]
        },

        appendix: {
            subtitle: "Appendix Mode membuka layer teknis untuk pembimbing, reviewer, dan mitra operasional yang perlu melihat pembagian peran, asumsi kerja, dan cara berpikir di balik dashboard ini.",
            intro: "Lampiran ini sengaja dipisahkan dari narasi utama agar presentasi tetap cepat dan mudah diikuti. Saat diperlukan, ia menjelaskan siapa mengerjakan apa, asumsi apa yang dipakai, dan bagaimana keputusan skor serta timeline dibentuk.",
            summary: [
                "RACI matrix untuk membedakan penanggung jawab, pihak yang harus di-approve, dan siapa yang wajib diajak konsultasi.",
                "Swimlane 4 minggu untuk menunjukkan ritme kerja koas, puskesmas, preseptor, dan kader tanpa harus membuka breakdown harian penuh.",
                "Asumsi operasional agar reviewer tahu batasan yang sedang diterima dashboard ini.",
                "Metodologi pemilihan lokasi, penyusunan plan, scoring, dan evaluasi agar keputusan terasa audit-able."
            ],
            raciLegend: [
                { code: "R", label: "Responsible", desc: "Pelaksana utama pekerjaan." },
                { code: "A", label: "Accountable", desc: "Pihak yang mengesahkan keputusan akhir." },
                { code: "C", label: "Consulted", desc: "Pihak yang wajib dimintai masukan." },
                { code: "I", label: "Informed", desc: "Pihak yang harus diberi update." }
            ],
            raciActors: [
                { id: "coord", label: "Koordinator", short: "Koas Coord" },
                { id: "data", label: "PIC Data", short: "PIC Data" },
                { id: "edu", label: "PIC Edukasi", short: "PIC Edu" },
                { id: "flow", label: "PIC Alur", short: "PIC Alur" },
                { id: "preceptor", label: "Preseptor", short: "Preseptor" },
                { id: "program", label: "PJ Program", short: "PJ Program" },
                { id: "kader", label: "Kader / Champion", short: "Kader" }
            ],
            raciRows: [
                {
                    phase: "Minggu 1",
                    task: "Kick-off, kontrak kerja, dan penetapan PIC lapangan",
                    note: "Menetapkan ritme supervisi dan jalur komunikasi 4 minggu.",
                    cells: { coord: "A/R", data: "I", edu: "I", flow: "I", preceptor: "C", program: "C", kader: "I" }
                },
                {
                    phase: "Minggu 1",
                    task: "Baseline audit, diagnosis komunitas, dan problem tree",
                    note: "Menarik data awal dan memilih masalah prioritas yang feasible.",
                    cells: { coord: "C", data: "A/R", edu: "C", flow: "C", preceptor: "C", program: "C", kader: "C" }
                },
                {
                    phase: "Minggu 2",
                    task: "COM-B diagnosis, MINDSPACE design, dan draft pilot kit",
                    note: "Mengubah diagnosis menjadi paket intervensi versi 1.",
                    cells: { coord: "C", data: "C", edu: "A/R", flow: "R", preceptor: "C", program: "C", kader: "C" }
                },
                {
                    phase: "Minggu 2",
                    task: "Persetujuan alur, SOP mini, dan checklist fidelity",
                    note: "Membekukan desain sebelum masuk pilot lapangan.",
                    cells: { coord: "R", data: "C", edu: "C", flow: "R", preceptor: "A", program: "C", kader: "I" }
                },
                {
                    phase: "Minggu 3",
                    task: "Pilot gelombang 1-2 dan pencatatan log implementasi",
                    note: "Menjaga reach, fidelity, dan hambatan tercatat setiap hari.",
                    cells: { coord: "A", data: "R", edu: "R", flow: "R", preceptor: "C", program: "I", kader: "R" }
                },
                {
                    phase: "Minggu 3",
                    task: "Review go / adjust / stop dan PDSA cepat",
                    note: "Menyederhanakan intervensi berdasarkan realitas lapangan.",
                    cells: { coord: "A/R", data: "R", edu: "R", flow: "R", preceptor: "C", program: "C", kader: "C" }
                },
                {
                    phase: "Minggu 4",
                    task: "Rapid evaluation RE-AIM, dashboard handover, dan brief",
                    note: "Merangkum pembelajaran, hasil proses, dan keputusan tindak lanjut.",
                    cells: { coord: "A", data: "R", edu: "C", flow: "C", preceptor: "C", program: "C", kader: "I" }
                },
                {
                    phase: "Minggu 4",
                    task: "Training PIC lokal dan serah terima toolkit",
                    note: "Memastikan ada pihak lokal yang siap melanjutkan pasca-koas.",
                    cells: { coord: "R", data: "C", edu: "R", flow: "R", preceptor: "A", program: "C", kader: "R" }
                }
            ],
            swimlane: {
                note: "Swimlane ini merangkum ritme mingguan antar aktor. Ia bukan jadwal jam-ke-jam, tetapi peta koordinasi agar reviewer cepat melihat siapa paling aktif pada fase tertentu.",
                weeks: ["Minggu 1", "Minggu 2", "Minggu 3", "Minggu 4"],
                lanes: [
                    {
                        actor: "Koordinator Lapangan",
                        desc: "Stakeholder sync, ritme supervisi, dan decision gate.",
                        tone: "blue",
                        blocks: [
                            { label: "Kick-off + kontrak", start: 1, end: 1 },
                            { label: "Weekly review", start: 2, end: 2 },
                            { label: "Go / adjust / stop", start: 3, end: 3 },
                            { label: "Diseminasi + handover", start: 4, end: 4 }
                        ]
                    },
                    {
                        actor: "PIC Data dan Evaluasi",
                        desc: "Baseline, indikator, logbook, dan evaluasi proses.",
                        tone: "cyan",
                        blocks: [
                            { label: "Audit baseline", start: 1, end: 1 },
                            { label: "Freeze indikator", start: 2, end: 2 },
                            { label: "Log + rapid review", start: 3, end: 3 },
                            { label: "Dashboard handover", start: 4, end: 4 }
                        ]
                    },
                    {
                        actor: "PIC Edukasi dan Perubahan Perilaku",
                        desc: "Diagnosis perilaku, script, nudge, dan training.",
                        tone: "purple",
                        blocks: [
                            { label: "Insight perilaku", start: 1, end: 1 },
                            { label: "Co-design pesan", start: 2, end: 2 },
                            { label: "PDSA bahasa pesan", start: 3, end: 3 },
                            { label: "Training champion", start: 4, end: 4 }
                        ]
                    },
                    {
                        actor: "PIC Alur Layanan / Digital",
                        desc: "SOP mini, form, touchpoint, dan simplifikasi workflow.",
                        tone: "amber",
                        blocks: [
                            { label: "Touchpoint mapping", start: 1, end: 1 },
                            { label: "SOP + form draft", start: 2, end: 2 },
                            { label: "Perbaikan alat", start: 3, end: 3 },
                            { label: "Freeze toolkit", start: 4, end: 4 }
                        ]
                    },
                    {
                        actor: "Preseptor / PJ Program",
                        desc: "Alignment klinis-operasional dan approval perubahan utama.",
                        tone: "green",
                        blocks: [
                            { label: "Scope alignment", start: 1, end: 1 },
                            { label: "Pilot approval", start: 2, end: 2 },
                            { label: "Mid-pilot review", start: 3, end: 3 },
                            { label: "Handover sign-off", start: 4, end: 4 }
                        ]
                    },
                    {
                        actor: "Kader / Champion Lokal",
                        desc: "Sumber insight lapangan, user testing, dan sustainment awal.",
                        tone: "red",
                        blocks: [
                            { label: "Masukan lapangan", start: 1, end: 1 },
                            { label: "User testing", start: 2, end: 2 },
                            { label: "Pilot support", start: 3, end: 3 },
                            { label: "Champion lanjutan", start: 4, end: 4 }
                        ]
                    }
                ]
            },
            assumptions: [
                {
                    title: "Asumsi operasional rotasi",
                    why: "Menjaga agar timeline 20 hari tidak dibaca sebagai janji absolut, melainkan prakiraan kerja minimum.",
                    points: [
                        "Satu tim koas bekerja 4 minggu efektif dengan pembagian PIC internal yang stabil.",
                        "Akses ke Kapus, preseptor, PJ program, dan minimal satu champion lokal tersedia sejak minggu pertama.",
                        "Agenda luar kampus atau kegiatan seremonial tidak mendominasi hari kerja inti rotasi."
                    ]
                },
                {
                    title: "Asumsi data dan evidensi",
                    why: "Membatasi dashboard agar hanya memakai indikator yang bisa dijelaskan definisinya.",
                    points: [
                        "Data rutin puskesmas cukup untuk membangun baseline sederhana, meski tidak selalu sempurna.",
                        "Keputusan tidak bertumpu pada satu angka tunggal, tetapi pada kombinasi data rutin, observasi, dan diskusi lapangan.",
                        "Setiap angka di output akhir harus punya sumber, definisi, dan tanggal rujukan yang jelas."
                    ]
                },
                {
                    title: "Asumsi intervensi dan handover",
                    why: "Mencegah proyek berubah menjadi intervensi besar yang berhenti ketika koas selesai.",
                    points: [
                        "Intervensi dipilih yang ringan, murah, dan dapat dipakai ulang oleh petugas atau kader.",
                        "Toolkit akhir tidak bergantung pada aplikasi baru atau sistem digital kompleks.",
                        "Pihak lokal yang menerima handover disiapkan sebelum minggu terakhir agar sustainment lebih realistis."
                    ]
                }
            ],
            methodology: [
                {
                    title: "Pemilihan target puskesmas",
                    summary: "Target lokasi ditentukan lewat kombinasi scoring matrix, feasibility lapangan, dan peluang belajar CM koas.",
                    steps: [
                        "Bandingkan lima puskesmas dengan bobot kriteria yang eksplisit.",
                        "Baca skor bersama narasi kontekstual dan keterbatasan data tiap lokasi.",
                        "Pilih target yang paling kuat untuk intervensi kecil yang bisa selesai dalam 20 hari."
                    ]
                },
                {
                    title: "Perancangan plan 20 hari",
                    summary: "Timeline tidak dimulai dari estetika gantt, tetapi dari deliverable minimum yang wajib pulang dari rotasi.",
                    steps: [
                        "Tetapkan milestone mingguan dan output harian minimum.",
                        "Turunkan milestone menjadi workstream, PIC, dan checkpoint supervisi.",
                        "Padatkan menjadi gantt agar ritme kerja mudah diaudit oleh dosen dan puskesmas."
                    ]
                },
                {
                    title: "Scoring matrix explainable",
                    summary: "Matrix dipakai untuk pengambilan keputusan, bukan untuk memberi label baik-buruk pada institusi.",
                    steps: [
                        "Tetapkan definisi skor rendah dan tinggi untuk setiap kriteria.",
                        "Hitung skor tertimbang dengan bobot yang sudah diumumkan di halaman utama.",
                        "Lengkapi angka dengan breakdown naratif agar reviewer bisa menelusuri alasan skor."
                    ]
                },
                {
                    title: "Monitoring, evaluasi, dan handover",
                    summary: "Evaluasi memakai pendekatan ringan: cukup untuk pengambilan keputusan, tidak berlebihan secara statistik.",
                    steps: [
                        "Pantau reach, fidelity, hambatan, dan penerimaan sasaran selama pilot.",
                        "Gunakan rapid review dan PDSA untuk memperbaiki desain sebelum minggu 4.",
                        "Tutup rotasi dengan dashboard mini, toolkit, brief, dan penanggung jawab lokal yang jelas."
                    ]
                }
            ]
        },

        recommendation: {
            title: "Mentikan sebagai Wahana Implementasi CM Koas",
            summary: "Mentikan tetap menjadi target utama, tetapi keputusan itu kini diterjemahkan menjadi paket kerja yang operasional, mudah diaudit, dan mudah dipitch: timeline 20 hari, breakdown harian, toolkit handover, serta matrix scoring yang transparan.",
            rationale: [
                "Beban kunjungan tinggi memberi banyak titik layanan untuk observasi sistem dan edukasi.",
                "Kekurangan tenaga strategis membuat intervensi sederhana dan perbaikan alur kerja menjadi sangat relevan.",
                "Tiga PUSTU aktif memberi ruang pembelajaran komunitas yang nyata dan terdistribusi.",
                "Masalah perilaku keluarga dan capaian N/D balita cocok untuk pendekatan COM-B dan MINDSPACE."
            ],
            weekSummary: [
                "Minggu 1: diagnosis komunitas dan kontrak kerja.",
                "Minggu 2: desain bersama intervensi dan perangkat kerja.",
                "Minggu 3: pilot implementasi dan perbaikan cepat.",
                "Minggu 4: evaluasi, diseminasi, dan handover."
            ],
            badges: ["20 hari kerja", "3 PUSTU aktif", "55.150 kunjungan/tahun", "Layak untuk CM koas", "Berbasis handover"],
            closingLoop: "Mentikan adalah kanvas implementasi yang kuat: isu perilaku keluarga bisa dibedah dengan COM-B, nudges pelayanan bisa diturunkan lewat MINDSPACE, lalu hasil pilot ditutup dengan evaluasi RE-AIM dan handover terstruktur."
        },

        meetingReadiness: {
            summary: "Untuk rapat pimpinan FKK dan showcase ke Kadinkes, dashboard ini sudah cukup kuat sebagai alat presentasi. Namun persetujuan lapangan biasanya tidak ditentukan oleh tampilan dashboard saja, melainkan oleh kejelasan keputusan yang diminta, prasyarat operasional, dan bukti bahwa tim koas siap disupervisi dan diserahterimakan dengan aman.",
            fkkDecisions: [
                "Setujui Mentikan sebagai wahana implementasi awal blok kedokteran komunitas (CM) koas.",
                "Tetapkan dosen pembimbing / koordinator akademik yang menjadi penanggung jawab keputusan tiap minggu.",
                "Pastikan format logbook, penilaian, dan output akhir CM koas diakui sebagai evidence resmi pembelajaran.",
                "Setujui bahwa model intervensi bersifat frugal: toolkit, alur, dan dashboard mini, bukan pembangunan sistem besar."
            ],
            dinkesDecisions: [
                "Konfirmasi dukungan Dinkes untuk penempatan awal di Mentikan dan akses koordinasi dengan kepala puskesmas / PJ program.",
                "Sepakati bahwa data yang dipakai bersifat operasional-terbatas dan tidak melampaui kebutuhan program serta pendidikan.",
                "Tetapkan kanal komunikasi jika perlu penyesuaian lokasi, jadwal, atau isu etik selama rotasi.",
                "Pastikan hasil akhir boleh diserahterimakan ke Puskesmas sebagai toolkit kerja lokal."
            ],
            prerequisites: [
                "Nama PIC puskesmas, preseptor, dan champion lokal harus jelas sebelum minggu pertama.",
                "Masalah prioritas harus dikunci cepat agar rotasi tidak melebar jadi terlalu banyak program.",
                "Format data baseline minimum harus disepakati sebelum hari kedua atau ketiga.",
                "Template handover, supervisi mingguan, dan batasan etik harus dibawa sejak rapat awal."
            ],
            evidenceToBring: [
                "Executive PDF versi ringkas dan print-ready.",
                "Lampiran appendix untuk dosen/reviewer bila ditanya lebih teknis.",
                "Contoh deliverable konkret: dashboard mini, SOP mini, media edukasi, dan checklist fidelity.",
                "Skema supervisi mingguan dan siapa yang accountable di FKK maupun puskesmas."
            ],
            innovationReasons: [
                "Inovasinya bukan gimmick UI, tetapi kemampuan menerjemahkan teori global menjadi paket kerja koas yang executable.",
                "Ada benang merah dari fondasi konseptual, pemilihan lokasi, rencana kerja, evaluasi, hingga handover.",
                "Dashboard ini memadukan kebutuhan akademik, operasional puskesmas, dan bahasa eksekutif dalam satu artefak.",
                "Explainable scoring dan appendix mode membuatnya lebih mudah diaudit daripada slide presentasi biasa."
            ],
            stillNeeded: [
                "Satu halaman keputusan rapat: siapa menyetujui apa hari ini.",
                "Nama orang/role nyata yang akan menjadi PIC FKK, preseptor, dan liaison Dinkes.",
                "Skenario cadangan jika lokasi, jadwal, atau data awal berubah.",
                "Output leave-behind yang benar-benar siap ditunjukkan saat meeting, bukan hanya direncanakan."
            ],
            assurances: [
                "Tegaskan bahwa koas bekerja dengan data operasional minimum, anonim, dan tunduk pada etika rekam medis, privasi pasien, serta prinsip SatuSehat yang relevan.",
                "Nyatakan sejak awal bahwa program ini tidak membebani anggaran puskesmas: transport, cetak media, dan kebutuhan mahasiswa tidak memakai BOK atau anggaran layanan rutin.",
                "Tekankan model zero-disruption: koas tidak datang untuk membuat proyek besar, tetapi membantu alur edukasi, monitoring, dan handover dengan gangguan seminimal mungkin.",
                "Pastikan ada kalimat eksplisit bahwa semua output akan ditinggalkan dalam bentuk yang bisa dipakai lokal: SOP mini, media edukasi, logbook, checklist, dan dashboard handover."
            ],
            pitchPlaybook: [
                "Rapat FKK: mulai dari keselamatan pembelajaran, guardrails, CPL/SKDI, sistem supervisi mingguan, lalu buka appendix bila ada pertanyaan detail operasional.",
                "Rapat Dinkes: lompat cepat ke scoring Mentikan, implementation plan 20 hari, zero-cost, zero-disruption, dan apa yang benar-benar ditinggalkan ke puskesmas setelah rotasi selesai.",
                "Gunakan light mode saat proyektor ruang rapat kurang kontras, terutama ketika menampilkan Gantt, readiness pack, dan executive print narrative.",
                "Bawa contoh fisik kecil ke meja rapat: mockup leaflet, logbook, checklist, atau SOP mini, agar janji frugal innovation terasa konkret dan tidak berhenti di layar."
            ],
            todayAsk: [
                "Setujui Mentikan sebagai lokasi tahap awal blok kedokteran komunitas (CM) koas dengan fokus masalah yang sudah dipersempit.",
                "Tetapkan PIC akademik FKK, penghubung Dinkes, dan preseptor / PJ program yang menjadi jalur keputusan mingguan.",
                "Sepakati batas data, mekanisme supervisi, serta bentuk handover yang diterima puskesmas di akhir rotasi.",
                "Izinkan tim menyiapkan deliverable fisik sebelum turun lapangan agar rapat berikutnya membahas eksekusi, bukan konsep ulang."
            ]
        }
    }
};
