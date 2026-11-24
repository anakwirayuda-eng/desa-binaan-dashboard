"""Build the FKK ITS research-agenda instrument (one workbook, three prodi).

Usage: python3 output/build_instrumen_agenda.py output/INSTRUMEN_AGENDA_PENELITIAN_FKK_ITS.xlsx [--test]
Requires openpyxl. After building, recalculate cached values (e.g. LibreOffice) before sharing.
--test fills sample rows so recalc can verify the recap formulas.
"""
import re
import sys

from openpyxl import Workbook
from openpyxl.formatting.rule import CellIsRule, ColorScaleRule, FormulaRule
from openpyxl.styles import Alignment, Border, Font, PatternFill, Side
from openpyxl.utils import get_column_letter
from openpyxl.worksheet.datavalidation import DataValidation

OUT = sys.argv[1]
TEST = "--test" in sys.argv

FONT = "Arial"
TEAL = "1F4E5A"
C_REQ = "FFF2CC"   # wajib diisi
C_OPT = "DDEBF7"   # opsional
C_AUTO = "EDEDED"  # otomatis
C_EX = "F2F2F2"    # baris contoh

F_BASE = Font(name=FONT, size=10)
F_BOLD = Font(name=FONT, size=10, bold=True)
F_HEAD = Font(name=FONT, size=10, bold=True, color="FFFFFF")
F_TITLE = Font(name=FONT, size=14, bold=True, color=TEAL)
F_SUB = Font(name=FONT, size=10, italic=True, color="595959")
F_AUTO = Font(name=FONT, size=10, color="404040")
F_EX = Font(name=FONT, size=10, italic=True, color="808080")
THIN = Side(style="thin", color="BFBFBF")
BOX = Border(left=THIN, right=THIN, top=THIN, bottom=THIN)
WRAP = Alignment(wrap_text=True, vertical="top")
CENTER = Alignment(horizontal="center", vertical="center", wrap_text=True)


def fill(hex_):
    return PatternFill("solid", start_color=hex_, end_color=hex_)


def style_range(ws, ref, font=None, fill_=None, align=None, border=None, fmt=None):
    for row in ws[ref]:
        for c in row:
            if font: c.font = font
            if fill_: c.fill = fill_
            if align: c.alignment = align
            if border: c.border = border
            if fmt: c.number_format = fmt


def header(ws, row, labels, start_col=1, height=48):
    for i, lab in enumerate(labels):
        c = ws.cell(row=row, column=start_col + i, value=lab)
        c.font, c.fill, c.alignment, c.border = F_HEAD, fill(TEAL), CENTER, BOX
    ws.row_dimensions[row].height = height


def title(ws, text, sub):
    ws["A1"] = text
    ws["A1"].font = F_TITLE
    ws["A2"] = sub
    ws["A2"].font = F_SUB


def dv_list(ws, formula, ref, prompt=None, error=None, strict=True):
    dv = DataValidation(type="list", formula1=formula, allow_blank=True,
                        showErrorMessage=strict, showInputMessage=bool(prompt))
    if prompt:
        dv.promptTitle, dv.prompt = "Petunjuk", prompt[:250]
    if error:
        dv.errorTitle, dv.error = "Isian tidak sesuai", error[:250]
    if not strict:
        dv.errorStyle = "warning"
    ws.add_data_validation(dv)
    dv.add(ref)


# ---------------------------------------------------------------- reference data
PRODI = ["S1 Kedokteran", "Pendidikan Profesi Dokter", "Teknologi Kedokteran"]
NO_HB = "(isi homebase di DAFTAR DOSEN)"

PILAR = [
    ("P1", "Deteksi Dini & Pengendalian Penyakit Tidak Menular"),
    ("P2", "Kesehatan Ibu, Anak & Optimalisasi 1000 HPK"),
    ("P3", "Penyakit Infeksi, Resistensi Antimikroba & Ketahanan Kesehatan"),
    ("P4", "Trauma, Disabilitas & Restorasi Fungsi"),
    ("P5", "Sistem Kesehatan Primer, Pendidikan Kedokteran & Tata Kelola Teknologi Kesehatan"),
    ("Lintas pilar", "Platform Surveilans Desa Binaan dan riset yang melayani semua pilar"),
    ("Di luar pohon", "Topik yang belum tertampung di kelima pilar — bahan revisi pohon"),
]

TOPIK = [
    "0.0 Lintas pilar — Platform Surveilans Desa Binaan",
    "1.1 Skrining PTM non-invasif berbasis sensor",
    "1.2 Stratifikasi risiko kardiometabolik berbasis AI",
    "1.3 Deteksi dini komplikasi PTM",
    "1.4 Perubahan perilaku terdigitalisasi",
    "1.5 Skrining & deteksi dini kanker",
    "1.9 Pilar 1 — topik baru (jelaskan di Catatan)",
    "2.1 Teknologi pemantauan pertumbuhan",
    "2.2 Keselamatan maternal & neonatal",
    "2.3 Skrining tumbuh kembang & neurodevelopmental",
    "2.4 Gizi & keamanan pangan lokal",
    "2.9 Pilar 2 — topik baru (jelaskan di Catatan)",
    "3.1 Surveilans AMR & penggunaan antibiotik komunitas",
    "3.2 Diagnostik cepat penyakit infeksi",
    "3.3 Surveilans sindromik digital & kesiapsiagaan",
    "3.4 Kesehatan lingkungan & vektor",
    "3.9 Pilar 3 — topik baru (jelaskan di Catatan)",
    "4.1 Implan ortopedi & fiksasi fraktur",
    "4.2 Prostesis & ortosis terjangkau",
    "4.3 Rehabilitasi & teknologi asistif",
    "4.4 Manajemen nyeri & perioperatif",
    "4.9 Pilar 4 — topik baru (jelaskan di Catatan)",
    "5.1 Riset implementasi layanan primer",
    "5.2 Pendidikan kedokteran berbasis teknologi",
    "5.3 Etika, hukum & tata kelola AI kesehatan",
    "5.4 Ekonomi kesehatan & HTA teknologi frugal",
    "5.9 Pilar 5 — topik baru (jelaskan di Catatan)",
    "9.9 Di luar kelima pilar (jelaskan di Catatan)",
]

PLATFORM = [
    ("T1", "T1 Biosinyal, Neuroteknologi & Akustik Medis", "Biosinyal & Neuroteknologi",
     "EEG/EMG/ECG, antarmuka otak-komputer, akustik & audiologi"),
    ("T2", "T2 Biosensor & Diagnostik Non-Invasif", "Biosensor & Diagnostik",
     "Electronic nose, sensor point-of-care, wearable, diagnostik cepat"),
    ("T3", "T3 AI Medis, Pencitraan & Sains Data Kesehatan", "AI, Citra & Sains Data",
     "Analisis citra medis & mikroskopik, model prediksi/risiko, biostatistik"),
    ("T4", "T4 Biomaterial, Biomekanika & Manufaktur Medis", "Biomaterial & Biomekanika",
     "Implan, prostesis, 3D printing, FEM, desain produk medis"),
    ("T5", "T5 Telematika Kesehatan, Interoperabilitas & Sains Implementasi", "Telematika & Implementasi",
     "Telemedisin, interoperabilitas data (SATUSEHAT), sistem informasi, riset implementasi"),
    ("T0", "T0 Tanpa platform teknologi", "Tanpa platform",
     "Riset klinis/sosial/kebijakan/pendidikan yang tidak memakai platform teknologi"),
]

WAHANA = [
    ("W0", "W0 Lab — riset dasar, mekanisme, kajian & pemodelan",
     "Laboratorium ITS/FKK atau kerja meja: riset dasar, mekanisme, kajian pustaka, analisis & pemodelan"),
    ("W1", "W1 Lab — purwarupa & uji praklinik",
     "Laboratorium ITS (Biomedik, Material, Despro, Statistika) & lab FKK: purwarupa, uji praklinik/in silico"),
    ("W2", "W2 ITS Medical Center / klinik mitra — studi pilot",
     "ITS Medical Center & klinik mitra: uji awal pada manusia, studi pilot"),
    ("W3", "W3 RSUD pendidikan — validasi klinis",
     "RSUD dr. Wahidin Sudiro Husodo (RS Pendidikan Utama) & RSUD RA Basoeni (satelit): validasi pada pasien"),
    ("W4", "W4 Desa Binaan / populasi — implementasi & dampak",
     "Desa Binaan Kota Mojokerto (5 puskesmas) & Bina Desa Sehat: data populasi, implementasi, dampak"),
]

TKT = [1, 2, 3, 4, 5, 6, 7, 8, 9, "Tidak relevan"]
TAHUN_MULAI = list(range(2022, 2031))
TAHUN_SELESAI = list(range(2023, 2034))
STATUS = ["Rencana", "Proposal diajukan", "Berjalan", "Selesai"]
YATIDAK = ["Ya", "Tidak"]
LUARAN = [
    "Artikel jurnal internasional bereputasi",
    "Artikel jurnal nasional terakreditasi",
    "Prosiding seminar",
    "HKI / paten",
    "Purwarupa / produk",
    "Rekomendasi kebijakan",
    "Bahan ajar / mata kuliah baru",
    "Dataset / registri",
    "Buku / bab buku",
]
DANA = [
    "Internal FKK / ITS",
    "Hibah nasional",
    "Hibah internasional",
    "Kerja sama Pemda / RS / industri",
    "Mandiri",
    "Belum ada",
]
KESIAPAN = [
    "A — bisa dimulai dengan SDM internal",
    "B — perlu mitra internal ITS / RSUD",
    "C — perlu rekrutmen / mitra eksternal",
]
STATUS_PEG = ["Aktif", "Tugas belajar", "Cuti / lainnya"]

# Starting roster: names only, from the draft research tree (§2, §4.1).
# No homebase, field or commentary is pre-filled: lecturers enter their own.
ROSTER = [
    # Official FKK list of lecturers 2026 (Daftar Dosen dan Tendik FKK ITS 2026, received 24 Nov 2026).
    # Names only; NIP/NPP and staff (tendik) are deliberately not copied.
    "dr. Lukman Hakim, M.Kes., Sp.U(K)., Ph.D.",
    "Prof. Dr. I Ketut Eddy Purnama, S.T., M.T.",
    "Dr. Shoffi Izza Sabilla, S.Kom.",
    "dr. Rahmah Yasinta Rangkuti, M.Biomed, SpA",
    "dr. Endah Indriastuti, Sp.PK",
    "Djoko Kuswanto, S.T., M.Biotech.",
    "Prof. Dr. Ir. Adhi Dharma Wibawa, S.T., M.T.",
    "Yuri Pamungkas, S.Tr.T, M.T.",
    "Achmad Syaifudin, S.T., M.Eng., Ph.D",
    "Dr. Dhany Arifianto, S.T., M.Eng.",
    "Fahmi Mubarok, S.T., M.Sc., Ph.D.",
    "dr. Putri Alief Siswanto, M.T.",
    "Nadya Paramitha Jafari, S.Ds., M.MT",
    "Gusfatul Mukhairiq, S.T., M.T.",
    "Alfandino Rasyid, S.Tr.T., M.Tr.T",
    "Rifa'atul Izza Asyari, S.T., M.Sc., Ph.D.",
    "dr. Muhammad Nazhif Haykal, M.Biomed",
    "dr. Rizka Nurul Hidayah, M.Biomed",
    "dr. Fatimah Nur Fitriani, M.Biomed",
    "dr. Ahmad Ridhoi, M.Biomed",
    "dr. Edwin Nugroho Njoto, MIPH., MHM.",
    "dr. Anak Agung Bagus Wirayuda, B.Med., M.D., M.Sc.",
    "dr. Anwar Djunaidi, Sp.F.",
    "dr. Gumilar Fardhani Ami Putra, M. Biomed.",
    "dr. Dwinka Syafira Eljatin, M.Ked.Trop.",
    "dr. Fira Soraya, Sp.P.A.",
    "dr. Lely Nurhayati, M.H., C.M.C.",
    "dr. Dyahati Wahyurini, M.Biomed.",
    "dr. Noer Halimatus Syakdiyah, S.Ked., M.Imun.",
    "dr. Iffa Halimah Hasna, S.Ked., M.Biomed.",
    "dr. Sonny Fadli, M.Ked.Klin., SpOG",
    "dr. Tri Hedianto, Sp.THT-KL",
    "dr. Desiana Widityaning Sari, Sp.DV, M.Ked.Klin",
    "dr. Zain Budi Syulthoni, Sp.KJ",
    "dr. Riva Satya Radiansyah, Sp.N",
    "dr. Ratri Dwi Indriani, Sp.An.FIP.FIPP",
    "dr. Afia Nuzila Fadhlina, Sp.M., M.Ked.Klin.",
    "dr. Erna Furaidah, Sp.Rad",
    "dr. Ivor Wiguna Hartanto Wilopo, Sp.B., FINACS",
    "dr. Zulistian Nurul Hidayati, Sp.P.D.",
    "dr. Jovian Philip Swatan, Sp.N., M.Sc.",
    # Calon dosen already teaching (confirmed by the user 24 Nov 2026), not yet on the faculty list.
    "dr. Alfian Nurfaizi, M.D., MDHDS, CHIA",
    "dr. Faizal Mahdi",
]


PREFILL = {  # name -> (homebase, jabatan, bidang)
    "dr. Alfian Nurfaizi, M.D., MDHDS, CHIA": ["S1 Kedokteran", "Calon dosen (aktif mengajar)", "Digital health; kesehatan maternal (BEmONC)"],
    "dr. Faizal Mahdi": ["", "Calon dosen (aktif mengajar)", ""],
  #: draft from PDDikti Gasal 2026, faculty list 2026, public profiles
    "dr. Lukman Hakim, M.Kes., Sp.U(K)., Ph.D.": ["", "Dekan", "Uro-oncology; Functional and Reconstructive; Urology Stem Cells"],
    "Prof. Dr. I Ketut Eddy Purnama, S.T., M.T.": ["", "Guru Besar · Wakil Dekan", "Data Mining; Medical Image Processing; Intelligent System"],
    "Dr. Shoffi Izza Sabilla, S.Kom.": ["Teknologi Kedokteran", "Lektor · Kaprodi Teknologi Kedokteran", "Biomedical Signal Processing; Internet of Things; Medical Application"],
    "dr. Rahmah Yasinta Rangkuti, M.Biomed, SpA": ["Pendidikan Profesi Dokter", "Asisten Ahli · Kaprodi Profesi Dokter", "Ilmu Kesehatan Anak"],
    "dr. Endah Indriastuti, Sp.PK": ["S1 Kedokteran", "Asisten Ahli · Kaprodi Kedokteran", "Patologi Klinik"],
    "Djoko Kuswanto, S.T., M.Biotech.": ["Teknologi Kedokteran", "Lektor · Kepala Lab Teknologi Kesehatan", "Digital Design; 3D Printing; Prosthesis Technology"],
    "Prof. Dr. Ir. Adhi Dharma Wibawa, S.T., M.T.": ["Teknologi Kedokteran", "Guru Besar", "Biomedical Signal Processing; Text Mining; Artificial Intelligence"],
    "Yuri Pamungkas, S.Tr.T, M.T.": ["Teknologi Kedokteran", "Lektor", "Artificial Intelligence; EEG Research; IoT Research"],
    "Achmad Syaifudin, S.T., M.Eng., Ph.D": ["Teknologi Kedokteran", "Lektor Kepala", "Solid Mechanics; Medical Mechanics; Sport Biomechanics"],
    "Dr. Dhany Arifianto, S.T., M.Eng.": ["Teknologi Kedokteran", "Lektor Kepala", "Acoustical Signal Processing; Auditory Neuroscience; Vibration Analysis"],
    "Fahmi Mubarok, S.T., M.Sc., Ph.D.": ["Teknologi Kedokteran", "Lektor", "Biomaterial; coating; keramik"],
    "dr. Putri Alief Siswanto, M.T.": ["Teknologi Kedokteran", "Asisten Ahli", "Artificial Neural Network; IQ Research; Predictive Biomedicine"],
    "Nadya Paramitha Jafari, S.Ds., M.MT": ["Teknologi Kedokteran", "Asisten Ahli", "Digital Design; User Experience; Medical Technology"],
    "Gusfatul Mukhairiq, S.T., M.T.": ["Teknologi Kedokteran", "Asisten Ahli", ""],
    "Alfandino Rasyid, S.Tr.T., M.Tr.T": ["Teknologi Kedokteran", "Tenaga Pengajar (belum ada jabatan fungsional)", ""],
    "Rifa'atul Izza Asyari, S.T., M.Sc., Ph.D.": ["Teknologi Kedokteran", "Tenaga Pengajar (belum ada jabatan fungsional)", ""],
    "dr. Muhammad Nazhif Haykal, M.Biomed": ["S1 Kedokteran", "Asisten Ahli", "Biologi Sel dan Molekuler; Biomedical engineering"],
    "dr. Rizka Nurul Hidayah, M.Biomed": ["S1 Kedokteran", "Tenaga Pengajar (belum ada jabatan fungsional)", "Histologi"],
    "dr. Fatimah Nur Fitriani, M.Biomed": ["S1 Kedokteran", "Tenaga Pengajar (belum ada jabatan fungsional)", "Biokimia"],
    "dr. Ahmad Ridhoi, M.Biomed": ["S1 Kedokteran", "Tenaga Pengajar (belum ada jabatan fungsional)", "Mikrobiologi"],
    "dr. Edwin Nugroho Njoto, MIPH., MHM.": ["S1 Kedokteran", "Asisten Ahli", "Ilmu Kesehatan Masyarakat / Ilmu Kedokteran Komunitas / Ilmu Kedokteran Pencegahan"],
    "dr. Anak Agung Bagus Wirayuda, B.Med., M.D., M.Sc.": ["S1 Kedokteran", "Lektor", "Ilmu Kesehatan Masyarakat / Ilmu Kedokteran Komunitas / Ilmu Kedokteran Pencegahan"],
    "dr. Anwar Djunaidi, Sp.F.": ["S1 Kedokteran", "Asisten Ahli", "Ilmu Kedokteran Forensik dan Medikolegal"],
    "dr. Gumilar Fardhani Ami Putra, M. Biomed.": ["S1 Kedokteran", "Tenaga Pengajar (belum ada jabatan fungsional)", "Anatomi"],
    "dr. Dwinka Syafira Eljatin, M.Ked.Trop.": ["S1 Kedokteran", "Asisten Ahli", "Parasitologi"],
    "dr. Fira Soraya, Sp.P.A.": ["S1 Kedokteran", "Asisten Ahli", "Patologi Anatomi"],
    "dr. Lely Nurhayati, M.H., C.M.C.": ["S1 Kedokteran", "Tenaga Pengajar (belum ada jabatan fungsional)", "Humaniora (Medikolegal)"],
    "dr. Dyahati Wahyurini, M.Biomed.": ["S1 Kedokteran", "Tenaga Pengajar (belum ada jabatan fungsional)", "Biomedik"],
    "dr. Noer Halimatus Syakdiyah, S.Ked., M.Imun.": ["S1 Kedokteran", "Tenaga Pengajar (belum ada jabatan fungsional)", "Imunologi"],
    "dr. Iffa Halimah Hasna, S.Ked., M.Biomed.": ["S1 Kedokteran", "Tenaga Pengajar (belum ada jabatan fungsional)", "Biomedik (inferensi gelar M.Biomed)"],
    "dr. Sonny Fadli, M.Ked.Klin., SpOG": ["Pendidikan Profesi Dokter", "Asisten Ahli", "Ilmu Kebidanan dan Penyakit Kandungan"],
    "dr. Tri Hedianto, Sp.THT-KL": ["Pendidikan Profesi Dokter", "Tenaga Pengajar (belum ada jabatan fungsional)", "Ilmu Penyakit Telinga, Hidung, Tenggorok"],
    "dr. Desiana Widityaning Sari, Sp.DV, M.Ked.Klin": ["Pendidikan Profesi Dokter", "Asisten Ahli", "Ilmu Kesehatan Kulit dan Kelamin"],
    "dr. Zain Budi Syulthoni, Sp.KJ": ["Pendidikan Profesi Dokter", "Asisten Ahli", "Ilmu Kesehatan Jiwa"],
    "dr. Riva Satya Radiansyah, Sp.N": ["Pendidikan Profesi Dokter", "Tenaga Pengajar (belum ada jabatan fungsional)", "Ilmu Penyakit Saraf"],
    "dr. Ratri Dwi Indriani, Sp.An.FIP.FIPP": ["Pendidikan Profesi Dokter", "Asisten Ahli", "Ilmu Anestesi"],
    "dr. Afia Nuzila Fadhlina, Sp.M., M.Ked.Klin.": ["Pendidikan Profesi Dokter", "Asisten Ahli", "Ilmu Kesehatan Mata"],
    "dr. Erna Furaidah, Sp.Rad": ["Pendidikan Profesi Dokter", "Tenaga Pengajar (belum ada jabatan fungsional)", "Radiologi"],
    "dr. Ivor Wiguna Hartanto Wilopo, Sp.B., FINACS": ["Pendidikan Profesi Dokter", "Asisten Ahli", "Ilmu Bedah"],
    "dr. Zulistian Nurul Hidayati, Sp.P.D.": ["Pendidikan Profesi Dokter", "Tenaga Pengajar (belum ada jabatan fungsional)", "Penyakit Dalam"],
    "dr. Jovian Philip Swatan, Sp.N., M.Sc.": ["Pendidikan Profesi Dokter", "Tenaga Pengajar (belum ada jabatan fungsional)", "Neurologi"],
}

def sort_key(name):
    core = re.sub(r"^((Prof|Dr|dr|Ir|Eng)\.\s*)+", "", name)
    return core.lower()


ROSTER.sort(key=sort_key)

USULAN = [
    (1, "Validasi e-nose napas untuk skrining diabetes pada populasi Desa Binaan", "P1 × T2", "A"),
    (2, "Model prediksi risiko hipertensi dari data kunjungan puskesmas rutin", "P1 × T3", "A"),
    (3, "Wearable pemantauan tekanan darah & kepatuhan terapi hipertensi", "P1 × T2/T5", "B"),
    (4, "Deteksi kaki diabetik berbasis citra di layanan primer", "P1 × T3", "B"),
    (5, "Intervensi perubahan perilaku berbasis COM-B/MINDSPACE untuk PTM", "P1 × T5", "A"),
    (6, "Prediksi risiko stunting berbasis machine learning dari data posyandu", "P2 × T3", "A"),
    (7, "Evaluasi RE-AIM program GENTALA sebagai riset implementasi", "P2 × T5", "A"),
    (8, "Skrining pendengaran neonatal berbasis akustik terjangkau", "P2 × T1", "C"),
    (9, "Analisis sistem rujukan maternal PONED → RSUD Wahidin", "P2 × T5", "B"),
    (10, "Survei penggunaan & swamedikasi antibiotik di komunitas", "P3 × T5", "A"),
    (11, "Pola resistensi antimikroba di RSUD pendidikan", "P3 × T2", "B"),
    (12, "Skrining TB berbasis analisis napas (breathprint)", "P3 × T2", "A"),
    (13, "Surveilans sindromik digital lintas puskesmas Kota Mojokerto", "P3 × T5", "B"),
    (14, "Optimasi topologi bone plate dengan material lokal (SS316L)", "P4 × T4", "A"),
    (15, "Registri implan & luaran fraktur di RSUD pendidikan", "P4 × T4", "B"),
    (16, "Prostesis tangan/kaki 3D print untuk amputasi diabetik", "P4 × T4", "A"),
    (17, "Custom cranial implant dari data citra pasien", "P4 × T4/T3", "B"),
    (18, "Neurorehabilitasi pascastroke berbasis EEG/EMG", "P4 × T1", "A"),
    (19, "Desain & simulasi stent berbasis FEM", "P4 × T4", "A"),
    (20, "Skrining kognitif lansia berbasis EEG di posyandu lansia", "P1/P4 × T1", "A"),
    (21, "Tanggung jawab hukum & tata kelola AI diagnostik di Indonesia", "P5 × T0", "B"),
    (22, "HTA & analisis biaya-manfaat inovasi alat kesehatan frugal", "P5 × T5", "B"),
    (23, "Evaluasi rotasi Community Medicine terhadap capaian CPL", "P5 × T5", "A"),
    (24, "Kesiapan adopsi teknologi kesehatan digital oleh nakes puskesmas", "P5 × T5", "A"),
    (25, "Protokol sensus dasar Platform Surveilans Desa Binaan (dengan desa pembanding)", "Lintas pilar", "A"),
    (26, "Model prognostik transisi penyakit di layanan primer (perluasan ke PTM)", "P1/P5 × T3", "A"),
    (27, "Epidemiologi & pemodelan risiko DBD di Kota Mojokerto", "P3 × T3/T5", "A"),
    (28, "Determinan sosial kesehatan & disparitas angka harapan hidup Jawa Timur", "P1/P5 × T3", "A"),
    (29, "Analisis citra mikroskopi spekular endotel kornea berbasis AI", "P4/P1 × T3", "A"),
    (30, "Deteksi otomatis basil TB pada apusan sputum", "P3 × T3", "A"),
    (31, "EEG untuk skrining gangguan jiwa di layanan primer (depresi/ansietas)", "P1/P5 × T1", "A"),
    (32, "Kohort berbasis register: penautan data BPJS/SIMPUS Kota Mojokerto", "Lintas pilar × T5", "B"),
    (33, "Arsitektur interoperabilitas & tata kelola data kesehatan desa (siap SATUSEHAT)", "P5 × T5", "A"),
    (34, "Pemodelan risiko kusta subklinis pada kontak serumah", "P3 × T3", "B"),
]

wb = Workbook()

# ---------------------------------------------------------------- REF
ref = wb.active
ref.title = "REF"
ref_lists = {
    "A": ("Prodi", PRODI),
    "B": ("Cabang pohon (topik)", TOPIK),
    "C": ("Platform", [p[1] for p in PLATFORM]),
    "D": ("Wahana", [w[1] for w in WAHANA]),
    "E": ("TKT", TKT),
    "F": ("Tahun mulai", TAHUN_MULAI),
    "G": ("Tahun selesai", TAHUN_SELESAI),
    "H": ("Status topik", STATUS),
    "I": ("Ya/Tidak", YATIDAK),
    "J": ("Luaran", LUARAN),
    "K": ("Sumber dana", DANA),
    "L": ("Kesiapan", KESIAPAN),
    "M": ("Status kepegawaian", STATUS_PEG),
}
RANGE = {}
for col, (lab, items) in ref_lists.items():
    ref[f"{col}1"] = lab
    ref[f"{col}1"].font = F_BOLD
    for i, v in enumerate(items, start=2):
        ref[f"{col}{i}"] = v
        ref[f"{col}{i}"].font = F_BASE
    RANGE[lab] = f"=REF!${col}$2:${col}${len(items) + 1}"
    ref.column_dimensions[col].width = 34
ref["O1"] = "Daftar pilihan untuk menu tarik-turun. Jangan diubah tanpa menyesuaikan tab REKAP."
ref["O1"].font = F_SUB
ref.sheet_state = "visible"

# ---------------------------------------------------------------- DAFTAR DOSEN
D_FIRST, D_LAST = 6, 105
A_FIRST, A_LAST = 6, 305
dd = wb.create_sheet("DAFTAR DOSEN", 0)
title(dd, "DAFTAR DOSEN FKK ITS — profil singkat & pemantauan isian",
      "Langkah 1: cari nama Anda, lengkapi kolom kuning. Nama belum ada? Tulis di baris kosong paling bawah. "
      "Kolom abu-abu terisi otomatis dari tab AGENDA.")
dd["A3"] = "Daftar awal: nama dari Daftar Dosen FKK ITS 2026 (fakultas); prodi, jabatan, dan bidang keahlian sudah diisi awal dari PDDikti dan profil publik — mohon dikoreksi bila keliru. Dosen yang belum tercantum dapat menambahkan namanya di baris kosong."
dd["A3"].font = F_SUB
dd_cols = [
    ("No", 8, None),
    ("Nama dosen\n(daftar awal — jangan diubah, dipakai sebagai kunci)", 40, C_REQ),
    ("Koreksi ejaan nama & gelar\n(isi hanya bila kolom B keliru)", 32, C_OPT),
    ("NIDN / NIDK / NUPTK", 16, C_REQ),
    ("Prodi homebase ▼\n(pra-isi — mohon koreksi)", 24, C_REQ),
    ("Bidang keahlian utama\n(pra-isi — mohon koreksi)", 34, C_REQ),
    ("ID SINTA / ORCID\n(opsional)", 18, C_OPT),
    ("Status kepegawaian ▼", 16, C_REQ),
    ("Topik sebagai ketua\n(otomatis)", 12, C_AUTO),
    ("Topik sebagai anggota\n(otomatis)", 12, C_AUTO),
    ("Status isian agenda\n(otomatis)", 22, C_AUTO),
    ("Profil\n(otomatis)", 14, C_AUTO),
    ("Jabatan fungsional · struktural\n(pra-isi — mohon koreksi)", 30, C_OPT),
]
header(dd, 4, [c[0] for c in dd_cols])
for i, (_, w, _) in enumerate(dd_cols, start=1):
    dd.column_dimensions[get_column_letter(i)].width = w

ex = ["CONTOH", "(CONTOH) dr. Nama Dosen, Sp.X", "", "0000000000", "S1 Kedokteran",
      "Epidemiologi klinis", "", "Aktif", 1, 0, "Kurang (min. 2 topik)", "OK", "Asisten Ahli"]
for i, v in enumerate(ex, start=1):
    c = dd.cell(row=5, column=i, value=v)
    c.font, c.fill, c.border, c.alignment = F_EX, fill(C_EX), BOX, WRAP

AG = "AGENDA"
for r in range(D_FIRST, D_LAST + 1):
    n = r - D_FIRST
    dd.cell(row=r, column=1, value=n + 1)
    if n < len(ROSTER):
        dd.cell(row=r, column=2, value=ROSTER[n])
        hb_, jab_, bid_ = PREFILL.get(ROSTER[n], ("", "", ""))
        if hb_ and not TEST:
            dd.cell(row=r, column=5, value=hb_)
        if bid_ and not TEST:
            dd.cell(row=r, column=6, value=bid_)
        if jab_:
            dd.cell(row=r, column=13, value=jab_)
    dd.cell(row=r, column=9, value=f'=IF(B{r}="","",COUNTIF({AG}!$B${A_FIRST}:$B${A_LAST},B{r}))')
    dd.cell(row=r, column=10, value=f'=IF(B{r}="","",COUNTIF({AG}!$H${A_FIRST}:$J${A_LAST},B{r}))')
    dd.cell(row=r, column=11, value=(
        f'=IF(B{r}="","",IF(I{r}+J{r}=0,"Belum mengisi",IF(I{r}+J{r}<2,"Kurang (min. 2 topik)",'
        f'IF(I{r}+J{r}>5,"Lebih dari 5 — fokuskan","Lengkap"))))'))
    dd.cell(row=r, column=12, value=f'=IF(B{r}="","",IF(OR(D{r}="",E{r}="",F{r}="",H{r}=""),"Lengkapi profil","OK"))')
    for ci, (_, _, col) in enumerate(dd_cols, start=1):
        c = dd.cell(row=r, column=ci)
        c.border, c.alignment = BOX, WRAP
        c.font = F_AUTO if col == C_AUTO else F_BASE
        if col:
            c.fill = fill(col)
dd.freeze_panes = "C5"
dv_list(dd, RANGE["Prodi"], f"E{D_FIRST}:E{D_LAST}", "Pilih prodi homebase resmi Anda.",
        "Pilih salah satu dari tiga prodi FKK ITS.")
dv_list(dd, RANGE["Status kepegawaian"], f"H{D_FIRST}:H{D_LAST}")
k_rng = f"K{D_FIRST}:K{D_LAST}"
dd.conditional_formatting.add(k_rng, CellIsRule(operator="equal", formula=['"Belum mengisi"'],
                              fill=fill("F8CBAD")))
dd.conditional_formatting.add(k_rng, CellIsRule(operator="equal", formula=['"Lengkap"'],
                              fill=fill("C6EFCE")))
dd.conditional_formatting.add(k_rng, FormulaRule(formula=[f'OR(LEFT(K{D_FIRST},6)="Kurang",LEFT(K{D_FIRST},5)="Lebih")'],
                              fill=fill("FFEB9C")))
dd.conditional_formatting.add(f"L{D_FIRST}:L{D_LAST}", CellIsRule(operator="equal", formula=['"Lengkapi profil"'],
                              fill=fill("FFEB9C")))

# ---------------------------------------------------------------- AGENDA
ag = wb.create_sheet(AG, 1)
title(ag, "AGENDA PENELITIAN DOSEN FKK ITS 2026–2030 — satu baris = satu topik",
      "Langkah 2: isi 2–5 topik penelitian Anda (termasuk yang sedang berjalan). Satu topik diisi SATU KALI oleh "
      "ketuanya; rekan dari FKK cukup dipilih di kolom Anggota.")
ag["A3"] = ("Warna kolom: kuning = wajib · biru muda = opsional · abu-abu = otomatis, jangan diubah. "
            "Baris 5 adalah CONTOH. Periksa kolom paling kanan sampai bertuliskan OK.")
ag["A3"].font = F_SUB

# (header, width, kind)  kind: req / opt / auto
ag_cols = [
    ("No", 8, "auto"),                                                     # A
    ("Nama dosen — ketua topik ▼", 34, "req"),                             # B
    ("Prodi homebase\n(otomatis)", 20, "auto"),                            # C
    ("Judul / topik penelitian", 44, "req"),                               # D
    ("Cabang pohon ▼\n(lihat PETUNJUK)", 40, "req"),                       # E
    ("Pilar\n(otomatis)", 11, "auto"),                                     # F
    ("Platform teknologi ▼", 34, "req"),                                   # G
    ("Anggota FKK 1 ▼", 28, "opt"),                                        # H
    ("Anggota FKK 2 ▼", 28, "opt"),                                        # I
    ("Anggota FKK 3 ▼", 28, "opt"),                                        # J
    ("Lintas prodi?\n(otomatis)", 13, "auto"),                             # K
    ("Mitra di luar FKK\n(RSUD, puskesmas, Dinkes, dept. ITS, industri)", 30, "opt"),  # L
    ("Wahana saat ini ▼", 30, "req"),                                      # M
    ("Wahana target 2030 ▼", 30, "req"),                                   # N
    ("TKT saat ini ▼\n(khusus luaran teknologi)", 14, "opt"),              # O
    ("TKT target ▼", 12, "opt"),                                           # P
    ("Tahun mulai ▼", 10, "req"),                                          # Q
    ("Tahun target selesai ▼", 11, "req"),                                 # R
    ("Status ▼", 16, "req"),                                               # S
    ("Melibatkan mahasiswa? ▼", 13, "req"),                                # T
    ("Jumlah mahasiswa", 11, "opt"),                                       # U
    ("Luaran utama ▼", 30, "req"),                                         # V
    ("Sumber dana ▼", 24, "opt"),                                          # W
    ("Kesiapan ▼", 30, "opt"),                                             # X
    ("No. usulan draf\n(1–34, bila sama — tab USULAN DRAF)", 14, "opt"),  # Y
    ("Catatan / dukungan fakultas yang dibutuhkan", 34, "opt"),           # Z
    ("Cek isian\n(otomatis)", 30, "auto"),                                 # AA
    ("Butuh mitra dari prodi lain? ▼\n(opsional)", 26, "opt"),              # AB
    ("ID proyek\n(otomatis)", 12, "auto"),                                  # AC
    ("Jenis kegiatan ▼", 14, "req"),                                         # AD
    ("Anak tangga PkM ▼\n(khusus PkM)", 22, "opt"),                         # AE
    ("Tag sekunder\n(pilar/platform lain, opsional)", 20, "opt"),           # AF
    ("Mata kuliah / blok / rotasi terkait\n(opsional)", 28, "opt"),         # AG
]
KIND_FILL = {"req": C_REQ, "opt": C_OPT, "auto": C_AUTO}
header(ag, 4, [c[0] for c in ag_cols], height=60)
for i, (_, w, _) in enumerate(ag_cols, start=1):
    ag.column_dimensions[get_column_letter(i)].width = w

example = [
    "CONTOH", "(CONTOH) dr. Nama Dosen, Sp.X", "S1 Kedokteran",
    "Validasi e-nose napas untuk skrining diabetes melitus pada warga Desa Binaan Kota Mojokerto",
    TOPIK[1], "P1", PLATFORM[1][1], "(CONTOH) Nama Dosen Teknologi Kedokteran", "", "", "Ya",
    "Puskesmas mitra Desa Binaan; Dinkes Kota Mojokerto", WAHANA[1][1], WAHANA[4][1], 4, 6, 2026, 2028,
    "Rencana", "Ya", 4, LUARAN[0], DANA[0], KESIAPAN[0], 1,
    "Butuh izin akses data penderita DM di puskesmas", "OK", "Butuh validasi klinis",
    "CONTOH", "Penelitian", "", "T3 (analisis citra napas)", "Blok Endokrin–Metabolik (contoh)",
]
for i, v in enumerate(example, start=1):
    c = ag.cell(row=5, column=i, value=v)
    c.font, c.fill, c.border, c.alignment = F_EX, fill(C_EX), BOX, WRAP

DD = "'DAFTAR DOSEN'"
LK = f"{DD}!$B${D_FIRST}:$E${D_LAST}"


def hb(cell):
    return f'IFERROR(VLOOKUP({cell},{LK},4,FALSE)&"","")'


for r in range(A_FIRST, A_LAST + 1):
    ag.cell(row=r, column=1, value=r - A_FIRST + 1)
    ag.cell(row=r, column=3, value=f'=IF(B{r}="","",IF({hb(f"B{r}")}="","{NO_HB}",{hb(f"B{r}")}))')
    ag.cell(row=r, column=6, value=(
        f'=IF(E{r}="","",IF(LEFT(E{r},1)="0","Lintas pilar",IF(LEFT(E{r},1)="9","Di luar pohon","P"&LEFT(E{r},1))))'))
    cross = ",".join(f'AND({hb(f"{c}{r}")}<>"",{hb(f"{c}{r}")}<>C{r})' for c in "HIJ")
    blank_m = ",".join(f'AND({c}{r}<>"",{hb(f"{c}{r}")}="")' for c in "HIJ")
    ag.cell(row=r, column=11, value=(
        f'=IF(B{r}="","",IF(AND(H{r}="",I{r}="",J{r}=""),"Tidak",IF(LEFT(C{r},1)="(","Belum dapat dinilai",'
        f'IF(OR({cross}),"Ya",IF(OR({blank_m}),"Belum dapat dinilai","Tidak")))))'))
    ag.cell(row=r, column=29, value=f'=IF(B{r}="","","FKK-"&TEXT(A{r},"000"))')
    dup = (f'OR(AND(H{r}<>"",OR(H{r}=B{r},H{r}=I{r},H{r}=J{r})),AND(I{r}<>"",OR(I{r}=B{r},I{r}=J{r})),AND(J{r}<>"",J{r}=B{r}))')
    ag.cell(row=r, column=27, value=(
        f'=IF(B{r}="","",IF(OR(D{r}="",E{r}="",G{r}="",M{r}="",N{r}="",Q{r}="",R{r}="",S{r}="",T{r}="",V{r}="",AD{r}=""),'
        f'"Lengkapi kolom wajib (kuning)",IF(R{r}<Q{r},"Tahun selesai sebelum tahun mulai",'
        f'IF(AND(ISNUMBER(O{r}),ISNUMBER(P{r}),P{r}<O{r}),"TKT target lebih rendah dari saat ini — jelaskan (produk/versi baru?) di Catatan",'
        f'IF(AND(T{r}="Tidak",N(U{r})>0),"Mahasiswa: jawaban Tidak tetapi jumlah diisi",'
        f'IF(AND(T{r}="Ya",U{r}=""),"Mahasiswa: isi jumlah mahasiswa",'
        f'IF({dup},"Nama anggota berulang atau sama dengan ketua",'
        f'IF(AND(AD{r}="PkM",AE{r}=""),"PkM: pilih anak tangga PkM",'
        f'IF(VALUE(MID(N{r},2,1))<VALUE(MID(M{r},2,1)),"OK — catatan: wahana target lebih rendah (sah bila kembali ke lab)",'
        f'IF(F{r}="Di luar pohon","OK — di luar pohon (bahan revisi pohon)","OK"))))))))))'))
    for ci, (_, _, kind) in enumerate(ag_cols, start=1):
        c = ag.cell(row=r, column=ci)
        c.fill, c.border, c.alignment = fill(KIND_FILL[kind]), BOX, WRAP
        c.font = F_AUTO if kind == "auto" else F_BASE
        if ci in (17, 18):
            c.number_format = "0"

rng = lambda col: f"{col}{A_FIRST}:{col}{A_LAST}"
MITRA = ["Butuh validasi klinis", "Butuh pengembang sensor/alat", "Butuh AI/analisis data", "Butuh metodologi/biostatistik", "Butuh wahana Desa Binaan/puskesmas", "Tidak"]
for i_, v_ in enumerate(MITRA, start=2):
    ref.cell(row=i_, column=16, value=v_)
ref.cell(row=1, column=16, value="Kebutuhan mitra")
dv_list(ag, f"=REF!$P$2:$P${len(MITRA) + 1}", rng("AB"), "Opsional: tandai bila topik ini butuh mitra dari prodi lain.")
JENIS_K = ["Penelitian", "PkM"]
TANGGA_PKM = ["1 Pengenalan", "2 Pelatihan", "3 Penerapan", "4 Penggunaan mandiri oleh mitra", "5 Dampak dan replikasi"]
for i_, v_ in enumerate(JENIS_K, start=2):
    ref.cell(row=i_, column=17, value=v_)
for i_, v_ in enumerate(TANGGA_PKM, start=2):
    ref.cell(row=i_, column=18, value=v_)
ref.cell(row=1, column=17, value="Jenis kegiatan")
ref.cell(row=1, column=18, value="Anak tangga PkM")
dv_list(ag, f"=REF!$Q$2:$Q${len(JENIS_K) + 1}", rng("AD"), "Penelitian atau PkM. PkM memakai pilar, platform, dan wahana yang sama (Peta Jalan PkM).")
dv_list(ag, f"=REF!$R$2:$R${len(TANGGA_PKM) + 1}", rng("AE"), "Khusus PkM: tahap kedalaman saat ini (Peta Jalan PkM §6).")
names = f"={DD}!$B${D_FIRST}:$B${D_LAST}"
dv_list(ag, names, rng("B"), "Pilih nama Anda dari daftar.",
        "Pilih nama dari daftar. Bila belum ada, tambahkan dulu di tab DAFTAR DOSEN (baris kosong paling bawah).")
for col in "HIJ":
    dv_list(ag, names, rng(col), "Pilih rekan dosen FKK yang menjadi anggota topik ini.",
            "Pilih nama dari tab DAFTAR DOSEN. Mitra dari luar FKK ditulis di kolom L.")
dv_list(ag, RANGE["Cabang pohon (topik)"], rng("E"), "Pilih cabang terdekat. Tidak cocok? Pilih x.9 atau 9.9.")
dv_list(ag, RANGE["Platform"], rng("G"), "Platform teknologi yang dipakai. Tidak memakai? Pilih T0.")
dv_list(ag, RANGE["Wahana"], rng("M"), "Di tahap mana topik ini berada sekarang.")
dv_list(ag, RANGE["Wahana"], rng("N"), "Tahap yang ingin dicapai paling lambat 2030.")
dv_list(ag, RANGE["TKT"], rng("O"), "Tingkat Kesiapterapan Teknologi 1–9. Bukan riset teknologi? Pilih 'Tidak relevan'.")
dv_list(ag, RANGE["TKT"], rng("P"))
dv_list(ag, RANGE["Tahun mulai"], rng("Q"))
dv_list(ag, RANGE["Tahun selesai"], rng("R"))
dv_list(ag, RANGE["Status topik"], rng("S"))
dv_list(ag, RANGE["Ya/Tidak"], rng("T"))
dv_list(ag, RANGE["Luaran"], rng("V"), "Luaran utama yang ditargetkan.")
dv_list(ag, RANGE["Sumber dana"], rng("W"))
dv_list(ag, RANGE["Kesiapan"], rng("X"))
dv_u = DataValidation(type="whole", operator="between", formula1="0", formula2="200", allow_blank=True)
dv_y = DataValidation(type="whole", operator="between", formula1="1", formula2="34", allow_blank=True,
                      showErrorMessage=True)
dv_y.error = "Nomor usulan draf 1–34 (lihat tab USULAN DRAF)."
ag.add_data_validation(dv_u); dv_u.add(rng("U"))
ag.add_data_validation(dv_y); dv_y.add(rng("Y"))
aa = rng("AA")
ag.conditional_formatting.add(aa, FormulaRule(formula=[f'LEFT(AA{A_FIRST},2)="OK"'], fill=fill("C6EFCE")))
ag.conditional_formatting.add(aa, FormulaRule(formula=[f'AND(AA{A_FIRST}<>"",LEFT(AA{A_FIRST},2)<>"OK")'],
                                              fill=fill("F8CBAD")))
ag.freeze_panes = "C5"

# ---------------------------------------------------------------- REKAP MATRIKS
rm = wb.create_sheet("REKAP MATRIKS", 2)
title(rm, "REKAP — matriks Pilar × Platform (terisi otomatis)",
      "Jangan diubah. Semua angka dihitung dari tab AGENDA dan DAFTAR DOSEN.")
rm.column_dimensions["A"].width = 14
rm.column_dimensions["B"].width = 52
for col in "CDEFGHI":
    rm.column_dimensions[col].width = 15

kpi = [
    ("Dosen terdaftar", f'=COUNTIF({DD}!$B${D_FIRST}:$B${D_LAST},"?*")', "0"),
    ("Dosen yang sudah mengisi (≥1 topik sebagai ketua/anggota)",
     f'=COUNTIFS({DD}!$B${D_FIRST}:$B${D_LAST},"?*",{DD}!$K${D_FIRST}:$K${D_LAST},"<>Belum mengisi")', "0"),
    ("Tingkat respons", "=IF(C4=0,0,C5/C4)", "0%"),
    ("Jumlah topik terisi", f'=COUNTIF({AG}!$B${A_FIRST}:$B${A_LAST},"?*")', "0"),
    ("Topik yang masuk pohon (dari topik berketua yang cabangnya terisi)", f'=IF(COUNTIFS({AG}!$B${A_FIRST}:$B${A_LAST},"?*",{AG}!$E${A_FIRST}:$E${A_LAST},"?*")=0,"tanpa data",1-COUNTIFS({AG}!$B${A_FIRST}:$B${A_LAST},"?*",{AG}!$F${A_FIRST}:$F${A_LAST},"Di luar pohon")/COUNTIFS({AG}!$B${A_FIRST}:$B${A_LAST},"?*",{AG}!$E${A_FIRST}:$E${A_LAST},"?*"))', "0%"),
    ("Topik lintas prodi (rencana; 'Belum dapat dinilai' tidak dihitung)", f'=IF(C7=0,"tanpa data",COUNTIFS({AG}!$B${A_FIRST}:$B${A_LAST},"?*",{AG}!$K${A_FIRST}:$K${A_LAST},"Ya")/C7)', "0%"),
    ("Topik melibatkan mahasiswa (proksi rencana PPDM)",
     f'=IF(C7=0,"tanpa data",COUNTIFS({AG}!$B${A_FIRST}:$B${A_LAST},"?*",{AG}!$T${A_FIRST}:$T${A_LAST},"Ya")/C7)', "0%"),
    ("Sel inti P1–P5 × T1–T5 yang masih kosong (peta rekrutmen/kolaborasi)", "=COUNTIF(C19:G23,0)", "0"),
    ("Topik berketua tanpa cabang pohon (belum dapat dinilai — dilaporkan terpisah)", f'=COUNTIFS({AG}!$B${A_FIRST}:$B${A_LAST},"?*",{AG}!$E${A_FIRST}:$E${A_LAST},"")', "0"),
    ("Baris tanpa ketua tetapi berisi (tidak dihitung — perlu dilengkapi)", f'=SUMPRODUCT(({AG}!$B${A_FIRST}:$B${A_LAST}="")*(({AG}!$D${A_FIRST}:$D${A_LAST}<>"")+({AG}!$E${A_FIRST}:$E${A_LAST}<>"")>0))', "0"),
    ("Kegiatan PkM (dari topik berketua)", f'=COUNTIFS({AG}!$B${A_FIRST}:$B${A_LAST},"?*",{AG}!$AD${A_FIRST}:$AD${A_LAST},"PkM")', "0"),
]
rm["A3"] = "Indikator kunci"
rm["A3"].font = F_BOLD
for i, (lab, f, fmt) in enumerate(kpi, start=4):
    rm[f"B{i}"] = lab
    rm[f"C{i}"] = f
    rm[f"B{i}"].font = F_BASE
    rm[f"B{i}"].alignment = WRAP
    rm[f"C{i}"].font = F_BOLD
    rm[f"C{i}"].number_format = fmt
    rm[f"B{i}"].border = rm[f"C{i}"].border = BOX


def matrix(ws, top, label, extra=""):
    """Pilar rows × Platform columns. `top` = row of the code header."""
    ws.cell(row=top - 1, column=1, value=label).font = F_BOLD
    ws.cell(row=top, column=1, value="Kode")
    ws.cell(row=top, column=2, value="Pilar \\ Platform")
    for j, p in enumerate(PLATFORM, start=3):
        ws.cell(row=top, column=j, value=p[0])
        ws.cell(row=top + 1, column=j, value=p[2])
    ws.cell(row=top, column=9, value="Total")
    for col in range(1, 10):
        for rr in (top, top + 1):
            c = ws.cell(row=rr, column=col)
            c.font, c.fill, c.alignment, c.border = F_HEAD, fill(TEAL), CENTER, BOX
    first = top + 2
    for i, (code, name) in enumerate(PILAR):
        r = first + i
        ws.cell(row=r, column=1, value=code).font = F_BOLD
        ws.cell(row=r, column=2, value=name).font = F_BASE
        for j in range(3, 9):
            cl = get_column_letter(j)
            ws.cell(row=r, column=j, value=(
                f'=COUNTIFS({AG}!$F${A_FIRST}:$F${A_LAST},$A{r},{AG}!$G${A_FIRST}:$G${A_LAST},{cl}${top}&"*"{extra})'))
        ws.cell(row=r, column=9, value=f"=SUM(C{r}:H{r})").font = F_BOLD
        for j in range(1, 10):
            ws.cell(row=r, column=j).border = BOX
            ws.cell(row=r, column=j).alignment = WRAP if j == 2 else CENTER
    last = first + len(PILAR) - 1
    tr = last + 1
    ws.cell(row=tr, column=2, value="Total").font = F_BOLD
    for j in range(3, 10):
        cl = get_column_letter(j)
        c = ws.cell(row=tr, column=j, value=f"=SUM({cl}{first}:{cl}{last})")
        c.font, c.border, c.alignment = F_BOLD, BOX, CENTER
    ws.conditional_formatting.add(f"C{first}:H{last}", ColorScaleRule(
        start_type="num", start_value=0, start_color="FFFFFF",
        end_type="max", end_color="5B9BAA"))
    return first, last


m1_first, _ = matrix(rm, 17, "A. Jumlah topik per sel (semua topik)")
assert m1_first == 19  # KPI row 11 depends on this
rm["A28"] = "Sel kosong di baris P1–P5 bukan kegagalan: itu peta rekrutmen atau kolaborasi yang belum terjadi."
rm["A28"].font = F_SUB
matrix(rm, 31, "B. Topik lintas prodi per sel (anggota dari prodi lain)",
       extra=f',{AG}!$K${A_FIRST}:$K${A_LAST},"Ya"')

# ---------------------------------------------------------------- REKAP PRODI
rp = wb.create_sheet("REKAP PRODI", 3)
title(rp, "REKAP — per prodi (terisi otomatis)",
      "Prodi diambil dari homebase di tab DAFTAR DOSEN. Baris terakhir menampung dosen yang belum mengisi homebase.")
rp_rows = PRODI + [NO_HB]
hdr = ["Prodi", "Dosen terdaftar", "Dosen sudah mengisi", "Respons", "Topik (sebagai ketua)"] + \
      [p[0] for p in PILAR] + ["Topik lintas prodi", "Topik melibatkan mahasiswa", "Jumlah mahasiswa terlibat"]
header(rp, 4, hdr)
rp.column_dimensions["A"].width = 30
for j in range(2, len(hdr) + 1):
    rp.column_dimensions[get_column_letter(j)].width = 13
CR = f"{AG}!$C${A_FIRST}:$C${A_LAST}"
for i, p in enumerate(rp_rows):
    r = 5 + i
    rp.cell(row=r, column=1, value=p).font = F_BOLD
    if p == NO_HB:
        reg = f'=COUNTIFS({DD}!$B${D_FIRST}:$B${D_LAST},"?*",{DD}!$E${D_FIRST}:$E${D_LAST},"")'
        done = (f'=COUNTIFS({DD}!$B${D_FIRST}:$B${D_LAST},"?*",{DD}!$E${D_FIRST}:$E${D_LAST},"",'
                f'{DD}!$K${D_FIRST}:$K${D_LAST},"<>Belum mengisi")')
    else:
        reg = f"=COUNTIFS({DD}!$E${D_FIRST}:$E${D_LAST},$A{r})"
        done = f'=COUNTIFS({DD}!$E${D_FIRST}:$E${D_LAST},$A{r},{DD}!$K${D_FIRST}:$K${D_LAST},"<>Belum mengisi")'
    vals = [reg, done, f"=IF(B{r}=0,0,C{r}/B{r})", f"=COUNTIFS({CR},$A{r})"]
    for j, (code, _) in enumerate(PILAR):
        vals.append(f'=COUNTIFS({CR},$A{r},{AG}!$F${A_FIRST}:$F${A_LAST},"{code}")')
    vals += [f'=COUNTIFS({CR},$A{r},{AG}!$K${A_FIRST}:$K${A_LAST},"Ya")',
             f'=COUNTIFS({CR},$A{r},{AG}!$T${A_FIRST}:$T${A_LAST},"Ya")',
             f'=SUMIFS({AG}!$U${A_FIRST}:$U${A_LAST},{CR},$A{r},{AG}!$T${A_FIRST}:$T${A_LAST},"Ya")']
    for j, v in enumerate(vals, start=2):
        c = rp.cell(row=r, column=j, value=v)
        c.border, c.alignment, c.font = BOX, CENTER, F_BASE
        c.number_format = "0%" if j == 4 else "0"
    rp.cell(row=r, column=1).border = BOX
tot = 5 + len(rp_rows)
rp.cell(row=tot, column=1, value="Total").font = F_BOLD
for j in range(2, len(hdr) + 1):
    cl = get_column_letter(j)
    f = f"=IF(B{tot}=0,0,C{tot}/B{tot})" if j == 4 else f"=SUM({cl}5:{cl}{tot - 1})"
    c = rp.cell(row=tot, column=j, value=f)
    c.font, c.border, c.alignment = F_BOLD, BOX, CENTER
    c.number_format = "0%" if j == 4 else "0"

top2 = tot + 3
rp.cell(row=top2 - 1, column=1,
        value="Sebaran tahap wahana — di mana tiap prodi bekerja sekarang, dan ke mana targetnya pada 2030").font = F_BOLD
hdr2 = ["Prodi"] + [f"{w[0]} saat ini" for w in WAHANA] + [f"{w[0]} target" for w in WAHANA]
header(rp, top2, hdr2)
for i, p in enumerate(rp_rows):
    r = top2 + 1 + i
    rp.cell(row=r, column=1, value=p).font = F_BOLD
    rp.cell(row=r, column=1).border = BOX
    for j, w in enumerate(WAHANA):
        for k, col in enumerate("MN"):
            c = rp.cell(row=r, column=2 + j + 5 * k, value=(
                f'=COUNTIFS({CR},$A{r},{AG}!${col}${A_FIRST}:${col}${A_LAST},"{w[0]}*")'))
            c.border, c.alignment, c.font = BOX, CENTER, F_BASE
rp.conditional_formatting.add(f"B{top2 + 1}:K{top2 + len(rp_rows)}", ColorScaleRule(
    start_type="num", start_value=0, start_color="FFFFFF", end_type="max", end_color="5B9BAA"))
rp.cell(row=top2 + len(rp_rows) + 2, column=1,
        value=("Bacaan yang diharapkan: Teknologi Kedokteran kuat di W0–W2, Profesi Dokter di W3, Kedokteran di W0 & W4. "
               "Topik yang BERPINDAH tahap antar-prodi adalah bukti integrasi.")).font = F_SUB

# ---------------------------------------------------------------- REKAP PLATFORM (peta jalan per kolom, §5.6)
rpl = wb.create_sheet("REKAP PLATFORM", 4)
title(rpl, "REKAP — per platform T1–T5 (terisi otomatis)",
      "Peta jalan Prodi Teknologi Kedokteran dibaca dari kolom platform. TKT dihitung per topik (tidak dirata-rata). Jangan diubah.")
GR = f"{AG}!$G${A_FIRST}:$G${A_LAST}"
hdr_pl = (["Platform", "Topik", "Ketua dari Teknologi Kedokteran", "Lintas prodi (rencana)", "Melibatkan mahasiswa (rencana)",
           "TKT awal 1–3", "TKT awal 4–6", "TKT awal 7–9", "TKT target 1–3", "TKT target 4–6", "TKT target 7–9"]
          + [f"{w[0]} target" for w in WAHANA]
          + ["Rencana luaran purwarupa", "Rencana luaran HKI", "Berjalan/selesai", "Kegiatan PkM"])
header(rpl, 4, hdr_pl)
rpl.column_dimensions["A"].width = 44
for j in range(2, len(hdr_pl) + 1):
    rpl.column_dimensions[get_column_letter(j)].width = 12
PTK = f"{AG}!$P${A_FIRST}:$P${A_LAST}"
for i, pl in enumerate(PLATFORM):
    r = 5 + i
    rpl.cell(row=r, column=1, value=pl[1]).font = F_BOLD
    rpl.cell(row=r, column=1).border = BOX
    key = f'"{pl[0]}*"'
    vals = [f"=COUNTIFS({GR},{key})",
            f'=COUNTIFS({GR},{key},{CR},"{PRODI[2]}")',
            f'=COUNTIFS({GR},{key},{AG}!$K${A_FIRST}:$K${A_LAST},"Ya")',
            f'=COUNTIFS({GR},{key},{AG}!$T${A_FIRST}:$T${A_LAST},"Ya")',
            f'=COUNTIFS({GR},{key},{AG}!$O${A_FIRST}:$O${A_LAST},">=1",{AG}!$O${A_FIRST}:$O${A_LAST},"<=3")',
            f'=COUNTIFS({GR},{key},{AG}!$O${A_FIRST}:$O${A_LAST},">=4",{AG}!$O${A_FIRST}:$O${A_LAST},"<=6")',
            f'=COUNTIFS({GR},{key},{AG}!$O${A_FIRST}:$O${A_LAST},">=7",{AG}!$O${A_FIRST}:$O${A_LAST},"<=9")',
            f'=COUNTIFS({GR},{key},{PTK},">=1",{PTK},"<=3")',
            f'=COUNTIFS({GR},{key},{PTK},">=4",{PTK},"<=6")',
            f'=COUNTIFS({GR},{key},{PTK},">=7",{PTK},"<=9")']
    vals += [f'=COUNTIFS({GR},{key},{AG}!$N${A_FIRST}:$N${A_LAST},"{w[0]}*")' for w in WAHANA]
    vals += [f'=COUNTIFS({GR},{key},{AG}!$V${A_FIRST}:$V${A_LAST},"Purwarupa*")',
             f'=COUNTIFS({GR},{key},{AG}!$V${A_FIRST}:$V${A_LAST},"HKI*")',
             f'=COUNTIFS({GR},{key},{AG}!$S${A_FIRST}:$S${A_LAST},"Berjalan")+COUNTIFS({GR},{key},{AG}!$S${A_FIRST}:$S${A_LAST},"Selesai")',
             f'=COUNTIFS({GR},{key},{AG}!$AD${A_FIRST}:$AD${A_LAST},"PkM")']
    for j, v in enumerate(vals, start=2):
        c = rpl.cell(row=r, column=j, value=v)
        c.border, c.alignment, c.font = BOX, CENTER, F_BASE
        c.number_format = "0"
rpl.conditional_formatting.add(f"B5:{get_column_letter(len(hdr_pl))}{4 + len(PLATFORM)}", ColorScaleRule(
    start_type="num", start_value=0, start_color="FFFFFF", end_type="max", end_color="5B9BAA"))
top3 = 6 + len(PLATFORM)
rpl.cell(row=top3 - 1, column=1, value="Kebutuhan mitra yang ditandai ketua topik (bahan forum padanan riset)").font = F_BOLD
header(rpl, top3, ["Kebutuhan"] + [p[0] for p in PLATFORM])
for i, mtr in enumerate(MITRA[:-1]):
    r = top3 + 1 + i
    rpl.cell(row=r, column=1, value=mtr).font = F_BASE
    rpl.cell(row=r, column=1).border = BOX
    for j, pl in enumerate(PLATFORM):
        c = rpl.cell(row=r, column=2 + j, value=f'=COUNTIFS({GR},"{pl[0]}*",{AG}!$AB${A_FIRST}:$AB${A_LAST},$A{r})')
        c.border, c.alignment, c.font = BOX, CENTER, F_BASE
rpl.cell(row=top3 + len(MITRA) + 1, column=1,
         value=("Cara baca: semua kolom adalah RENCANA dari isian, bukan capaian. TKT dihitung per topik, bukan rata-rata platform. "
                "Isi tulang ikan atau lajur bergerbang Prodi Teknologi Kedokteran (§5.6) dari tab ini.")).font = F_SUB

# ---------------------------------------------------------------- PETA JALAN
pj = wb.create_sheet("PETA JALAN", 4)
title(pj, "PETA JALAN 2026–2030 — disusun dari agenda dosen (terisi otomatis)",
      "Topik dihitung aktif pada suatu tahun bila tahun mulai ≤ tahun itu ≤ tahun target selesai.")
YEARS = [2026, 2027, 2028, 2029, 2030]
pj.column_dimensions["A"].width = 34
pj.column_dimensions["B"].width = 44
for col in "CDEFGH":
    pj.column_dimensions[col].width = 12


def year_table(top, label, rows, colref, name_lookup=None):
    pj.cell(row=top - 1, column=1, value=label).font = F_BOLD
    header(pj, top, ["Kode", "Keterangan"] + YEARS, height=24)
    for i, key in enumerate(rows):
        r = top + 1 + i
        pj.cell(row=r, column=1, value=key).font = F_BOLD
        pj.cell(row=r, column=2, value=(name_lookup or {}).get(key, "")).font = F_BASE
        for j, y in enumerate(YEARS, start=3):
            cl = get_column_letter(j)
            c = pj.cell(row=r, column=j, value=(
                f'=COUNTIFS({AG}!${colref}${A_FIRST}:${colref}${A_LAST},$A{r},'
                f'{AG}!$Q${A_FIRST}:$Q${A_LAST},"<="&{cl}${top},{AG}!$R${A_FIRST}:$R${A_LAST},">="&{cl}${top})'))
            c.border, c.alignment, c.font = BOX, CENTER, F_BASE
        pj.cell(row=r, column=1).border = pj.cell(row=r, column=2).border = BOX
        pj.cell(row=r, column=2).alignment = WRAP
    rng_ = f"C{top + 1}:G{top + len(rows)}"
    pj.conditional_formatting.add(rng_, ColorScaleRule(start_type="num", start_value=0, start_color="FFFFFF",
                                                       end_type="max", end_color="5B9BAA"))
    for j in range(3, 8):
        pj.cell(row=top, column=j).number_format = "0"
    return top + len(rows) + 1


nxt = year_table(5, "A. Topik aktif per tahun, per pilar", [p[0] for p in PILAR], "F", dict(PILAR))
nxt = year_table(nxt + 3, "B. Topik aktif per tahun, per prodi", rp_rows, "C")

top = nxt + 3
pj.cell(row=top - 1, column=1, value="C. Luaran yang ditargetkan, menurut tahun target selesai").font = F_BOLD
header(pj, top, ["Luaran", ""] + YEARS + ["> 2030"], height=24)
for i, lu in enumerate(LUARAN):
    r = top + 1 + i
    pj.cell(row=r, column=1, value=lu).font = F_BASE
    pj.cell(row=r, column=1).border = pj.cell(row=r, column=2).border = BOX
    for j, y in enumerate(YEARS, start=3):
        cl = get_column_letter(j)
        c = pj.cell(row=r, column=j, value=(
            f'=COUNTIFS({AG}!$V${A_FIRST}:$V${A_LAST},$A{r},{AG}!$R${A_FIRST}:$R${A_LAST},{cl}${top})'))
        c.border, c.alignment, c.font = BOX, CENTER, F_BASE
    c = pj.cell(row=r, column=8, value=(
        f'=COUNTIFS({AG}!$V${A_FIRST}:$V${A_LAST},$A{r},{AG}!$R${A_FIRST}:$R${A_LAST},">2030")'))
    c.border, c.alignment, c.font = BOX, CENTER, F_BASE
for j in range(3, 8):
    pj.cell(row=top, column=j).number_format = "0"

top = top + len(LUARAN) + 4
pj.cell(row=top - 1, column=1, value="D. Tonggak fakultas per periode (draf — §5.4 dokumen pohon penelitian; periode sama dengan RIP prodi)").font = F_BOLD
header(pj, top, ["Periode", "Tonggak lintas prodi (indikatif)"], height=24)
# Periods follow the RIP of Prodi Kedokteran & Profesi Dokter 2026-2030 (2023-2025 / 2026-2028 / 2029-2030).
tahap = [
    ("2023–2025 — Bukti konsep (capaian)",
     "FKK berdiri (Peraturan Rektor ITS No. 2/2023) · Roadmap Penelitian & PkM FKK 2023–2025 (edisi 1) · luaran "
     "dosen terpetakan ke tujuh topik RIP Prodi Kedokteran & Profesi Dokter · menjadi garis dasar evaluasi"),
    ("2026–2028 — Pengembangan & validasi",
     "SK peta jalan penelitian & PkM edisi 2 · platform yang sudah punya dua nama dengan luaran terbukti ditetapkan "
     "sebagai unit anggaran · sensus dasar Desa Binaan + desa pembanding · koas angkatan pertama di RSUD (2027) · "
     "formulir pohon penelitian wajib untuk skripsi/TA ketiga prodi · semua platform memenuhi syarat dua nama · "
     "validasi platform di RSUD oleh tim lintas prodi · laporan evaluasi kesesuaian tahunan"),
    ("2029–2030 — Hilirisasi & penerapan",
     "Ronde pembaruan platform surveilans · jalur register-linkage · purwarupa terpilih memasuki jalur izin edar "
     "alat kesehatan · bukti dari Desa Binaan dipakai Dinkes Kota Mojokerto · evaluasi menyeluruh → edisi 3 peta jalan"),
]
for i, (t, d) in enumerate(tahap):
    r = top + 1 + i
    pj.cell(row=r, column=1, value=t).font = F_BOLD
    c = pj.cell(row=r, column=2, value=d)
    c.font, c.alignment = F_BASE, WRAP
    pj.merge_cells(start_row=r, start_column=2, end_row=r, end_column=8)
    pj.row_dimensions[r].height = 48
    for j in range(1, 9):
        pj.cell(row=r, column=j).border = BOX
pj.cell(row=top + 5, column=1, value=(
    "Angka target per tahun (publikasi, HKI, hibah) sengaja tidak diisi di sini: disusun Unit Penelitian dari "
    "data riil, dengan target tahun 1–3 yang pasti tercapai.")).font = F_SUB

# ---------------------------------------------------------------- USULAN DRAF
ud = wb.create_sheet("USULAN DRAF", 5)
title(ud, "USULAN TOPIK DARI DRAF POHON PENELITIAN (34 butir) — rujukan, bukan penugasan",
      "Siapa pun boleh mengambil, menggabungkan, atau mengabaikan butir ini. Bila topik Anda sama, "
      "tulis nomornya di kolom Y tab AGENDA.")
header(ud, 4, ["No", "Usulan penelitian", "Koordinat (Pilar × Platform)", "Kesiapan"], height=30)
ud.column_dimensions["A"].width = 6
ud.column_dimensions["B"].width = 80
ud.column_dimensions["C"].width = 26
ud.column_dimensions["D"].width = 12
for i, (no, txt, coord, k) in enumerate(USULAN):
    r = 5 + i
    for j, v in enumerate((no, txt, coord, k), start=1):
        c = ud.cell(row=r, column=j, value=v)
        c.font, c.border = F_BASE, BOX
        c.alignment = WRAP if j == 2 else CENTER
ud.cell(row=5 + len(USULAN) + 1, column=1,
        value="Kesiapan: A = bisa dimulai dengan SDM internal · B = perlu mitra internal ITS/RSUD · "
              "C = perlu rekrutmen atau mitra eksternal.").font = F_SUB
ud.freeze_panes = "A5"

# ---------------------------------------------------------------- PETUNJUK
pt = wb.create_sheet("PETUNJUK", 0)
pt.column_dimensions["A"].width = 26
pt.column_dimensions["B"].width = 110
pt["A1"] = "INSTRUMEN AGENDA PENELITIAN DOSEN — PETA JALAN PENELITIAN FKK ITS 2026–2030"
pt["A1"].font = F_TITLE
pt["A2"] = ("Satu berkas untuk tiga prodi: S1 Kedokteran · Pendidikan Profesi Dokter · Teknologi Kedokteran. "
            "Status: draf untuk uji coba — bukan dokumen resmi sampai ditetapkan Dekanat.")
pt["A2"].font = F_SUB

rows = []


def sec(t):
    rows.append(("__SEC__", t))


def line(a, b, fill_=None):
    rows.append((a, b, fill_))


sec("Untuk apa")
line("Tujuan",
     "Memetakan rencana penelitian SELURUH dosen ketiga prodi ke satu pohon penelitian fakultas, lalu menyusun "
     "peta jalan 2026–2030 dari rencana nyata dosen — bukan dari atas. Hasilnya juga menjadi bukti akreditasi: "
     "agenda penelitian per dosen dan bahan evaluasi kesesuaian penelitian dengan peta jalan.")
line("Siapa mengisi", "Semua dosen FKK ITS dari ketiga prodi, termasuk dosen dengan afiliasi ganda.")
line("Batas waktu", "[diisi Unit Penelitian]", C_REQ)
line("Kontak", "[diisi Unit Penelitian — nama & nomor/surel]", C_REQ)
line("Penggunaan data", "[diisi Unit Penelitian/Dekanat — mis. hanya untuk penyusunan peta jalan fakultas]", C_REQ)

sec("Cara mengisi — 5 langkah (±15 menit)")
line("1. DAFTAR DOSEN",
     "Cari nama Anda. Lengkapi NIDN/NIDK, prodi homebase, bidang keahlian, dan status kepegawaian. Bila ejaan "
     "nama/gelar keliru, tulis yang benar di kolom C (kolom B jangan diubah). Nama belum ada? Tulis di baris "
     "kosong paling bawah.")
line("2. AGENDA",
     "Isi 2–5 topik penelitian Anda untuk 2026–2030, SATU BARIS PER TOPIK. Topik yang sedang berjalan juga diisi.")
line("3. Satu topik, satu baris",
     "Topik diisi SEKALI oleh ketuanya. Rekan dari FKK cukup dipilih di kolom Anggota 1–3, dan topik itu otomatis "
     "terhitung di agenda mereka. Jangan isi ulang topik yang sama.")
line("4. Pilih cabang pohon",
     "Pilih cabang terdekat; kolom Pilar terisi sendiri. Bila tidak ada yang cocok, pilih 'x.9 topik baru' atau "
     "'9.9 Di luar kelima pilar' dan jelaskan di Catatan. Jujur lebih berguna: topik di luar pohon menjadi bahan "
     "revisi pohon, bukan penilaian terhadap Anda.")
line("5. Periksa", "Kolom 'Cek isian' (paling kanan) harus bertuliskan OK. Bila merah, ikuti pesannya.")

sec("Arti warna")
line("Kuning", "Wajib diisi.", C_REQ)
line("Biru muda", "Opsional, tetapi sangat membantu.", C_OPT)
line("Abu-abu", "Terisi otomatis — jangan diubah.", C_AUTO)
line("Baris CONTOH", "Baris 5 di tab DAFTAR DOSEN dan AGENDA menunjukkan contoh pengisian; tidak ikut dihitung.", C_EX)

sec("Lima Pilar (sumbu hasil kesehatan) dan cabangnya")
pilar_topik = {
    **{f"P{k}": [t for t in TOPIK if t.startswith(f"{k}.")] for k in range(1, 6)},
}
for code, name in PILAR[:5]:
    line(f"{code} — {name}", " · ".join(pilar_topik[code]))
line("0.0 Lintas pilar", "Platform Surveilans Desa Binaan dan riset yang melayani semua pilar.")
line("9.9 Di luar pohon", "Topik yang belum tertampung — ditinjau saat revisi pohon.")

sec("Padanan dengan tujuh topik RIP Prodi Kedokteran & Profesi Dokter")
line("Penyakit Tidak Menular", "→ Pilar 1. Onkologi & skrining kanker: pilih '1.5 Skrining & deteksi dini kanker'.")
line("Penyakit Menular", "→ Pilar 3.")
line("Kesehatan Remaja, Neonatus & Anak", "→ Pilar 2.")
line("Kesehatan Seksual & Reproduksi", "→ Pilar 2. Kanker serviks dan payudara: pilih ranting 1.5 di Pilar 1.")
line("Ked. Pencegahan, Med. Education & Social Science", "→ Pilar 5. Forensik, disabilitas, dan trauma: Pilar 4.")
line("Basic Science", "→ Pilih pilar tempat temuan itu akan dipakai (penyakit sasarannya); Platform boleh T0.")
line("Digital Health", "→ Pilih pilar sesuai penyakit sasarannya, lalu Platform T3 (AI & citra) atau T5 (telematika).")

sec("Lima Platform (sumbu kapabilitas teknologi)")
for code, full, _, scope in PLATFORM:
    line(full, scope)

sec("Tahap wahana (tempat topik diuji)")
for code, full, desc in WAHANA:
    line(full, desc)
line("Mengapa penting",
     "Topik yang berpindah tahap — misalnya alat yang dikembangkan di lab Teknologi Kedokteran (W1) lalu divalidasi "
     "bersama klinisi di RSUD (W3) atau di Desa Binaan (W4) — adalah bukti paling kuat bahwa ketiga prodi bekerja "
     "dalam satu pohon.")

sec("TKT — Tingkat Kesiapterapan Teknologi (khusus luaran teknologi)")
line("TKT 1–3", "Riset dasar: prinsip dasar teramati, konsep teknologi dirumuskan, bukti konsep.")
line("TKT 4–6", "Pengembangan: validasi komponen di lab, validasi di lingkungan relevan, demonstrasi purwarupa.")
line("TKT 7–9", "Penerapan: demonstrasi di lingkungan sebenarnya, sistem lengkap teruji, terbukti dalam operasi.")
line("Tidak relevan", "Untuk riset klinis, epidemiologi, kebijakan, atau pendidikan yang tidak menghasilkan teknologi.")

sec("Pilihan lain")
line("Kesiapan", "A = bisa dimulai dengan SDM internal · B = perlu mitra internal ITS/RSUD · C = perlu rekrutmen/mitra eksternal.")
line("Status", "Rencana · Proposal diajukan · Berjalan · Selesai")

sec("Tab rekap (otomatis)")
line("REKAP MATRIKS", "Indikator kunci (respons, % lintas prodi, % melibatkan mahasiswa) dan matriks Pilar × Platform.")
line("REKAP PRODI", "Partisipasi dan sebaran topik per prodi, termasuk sebaran tahap wahana.")
line("REKAP PLATFORM", "Rekap per platform T1–T5 untuk peta jalan Prodi Teknologi Kedokteran: topik, ketua dari Tekdok, sebaran TKT dan wahana, luaran teknologi, kebutuhan mitra.")
line("PETA JALAN", "Topik aktif per tahun 2026–2030, luaran per tahun, dan tonggak fakultas per tahap.")
line("USULAN DRAF", "34 usulan topik dari draf pohon penelitian — rujukan, bukan penugasan.")

r = 4
for item in rows:
    if item[0] == "__SEC__":
        r += 1
        c = pt.cell(row=r, column=1, value=item[1])
        c.font, c.fill = F_HEAD, fill(TEAL)
        pt.cell(row=r, column=2).fill = fill(TEAL)
    else:
        a, b, f_ = item
        ca = pt.cell(row=r, column=1, value=a)
        cb = pt.cell(row=r, column=2, value=b)
        ca.font, cb.font = F_BOLD, F_BASE
        ca.alignment, cb.alignment = WRAP, WRAP
        ca.border = cb.border = BOX
        if f_:
            cb.fill = fill(f_)
    r += 1

# ---------------------------------------------------------------- test rows
if TEST:
    hbs = {ROSTER[0]: PRODI[0], ROSTER[1]: PRODI[2], ROSTER[2]: PRODI[1], ROSTER[3]: PRODI[2]}
    for i, nm in enumerate(ROSTER):
        rr = D_FIRST + i
        if nm in hbs:
            dd.cell(row=rr, column=5, value=hbs[nm])
            dd.cell(row=rr, column=4, value="0000000000")
            dd.cell(row=rr, column=6, value="uji")
            dd.cell(row=rr, column=8, value="Aktif")
    samples = [
        # ketua, topik idx, platform idx, anggota, Wnow, Wtgt, start, end, mhs, luaran, tktnow, tkttgt
        (ROSTER[0], 1, 1, [ROSTER[1]], 1, 4, 2026, 2028, "Ya", 0, 4, 6),
        (ROSTER[1], 17, 3, [], 1, 3, 2025, 2027, "Tidak", 4, 3, 5),
        (ROSTER[2], len(TOPIK) - 1, 5, [ROSTER[0], ROSTER[3]], 0, 0, 2026, 2026, "Ya", 1, "Tidak relevan", "Tidak relevan"),
        (ROSTER[4], 12, 2, [ROSTER[1]], 3, 1, 2027, 2026, "Ya", 0, 5, 4),   # homebase blank + two errors
    ]
    for i, (k, ti, pi, mem, wn, wt, s, e, mh, lu, tn, tt) in enumerate(samples):
        rr = A_FIRST + i
        ag.cell(row=rr, column=2, value=k)
        ag.cell(row=rr, column=4, value=f"uji {i + 1}")
        ag.cell(row=rr, column=5, value=TOPIK[ti])
        ag.cell(row=rr, column=7, value=PLATFORM[pi][1])
        for j, m in enumerate(mem):
            ag.cell(row=rr, column=8 + j, value=m)
        ag.cell(row=rr, column=13, value=WAHANA[wn][1])
        ag.cell(row=rr, column=14, value=WAHANA[wt][1])
        ag.cell(row=rr, column=15, value=tn)
        ag.cell(row=rr, column=16, value=tt)
        ag.cell(row=rr, column=17, value=s)
        ag.cell(row=rr, column=18, value=e)
        ag.cell(row=rr, column=19, value="Rencana")
        ag.cell(row=rr, column=20, value=mh)
        ag.cell(row=rr, column=21, value=3 if mh == "Ya" else None)
        ag.cell(row=rr, column=22, value=LUARAN[lu])
        ag.cell(row=rr, column=30, value="PkM" if i == 2 else "Penelitian")
        if i == 2:
            ag.cell(row=rr, column=31, value="3 Penerapan")
    # edge cases from the 24 Nov audit
    e0 = A_FIRST + len(samples)
    ag.cell(row=e0, column=5, value=TOPIK[1]); ag.cell(row=e0, column=7, value=PLATFORM[0][1])      # no ketua
    ag.cell(row=e0 + 1, column=2, value=ROSTER[0]); ag.cell(row=e0 + 1, column=4, value="uji tepi")
    ag.cell(row=e0 + 1, column=5, value=TOPIK[1]); ag.cell(row=e0 + 1, column=7, value=PLATFORM[1][1])
    ag.cell(row=e0 + 1, column=8, value=ROSTER[5])                                                  # member without homebase
    ag.cell(row=e0 + 1, column=9, value=ROSTER[5])                                                  # duplicated member
    for col, v in ((13, WAHANA[3][1]), (14, WAHANA[1][1]), (15, 6), (16, 4), (17, 2026), (18, 2027), (19, "Rencana"),
                   (20, "Tidak"), (21, 3), (22, LUARAN[0]), (30, "Penelitian")):
        ag.cell(row=e0 + 1, column=col, value=v)

# sheet order: PETUNJUK, DAFTAR DOSEN, AGENDA, REKAP MATRIKS, REKAP PRODI, PETA JALAN, USULAN DRAF, REF
order = ["PETUNJUK", "DAFTAR DOSEN", AG, "REKAP MATRIKS", "REKAP PRODI", "REKAP PLATFORM", "PETA JALAN", "USULAN DRAF", "REF"]
wb._sheets = [wb[n] for n in order]
for ws in wb.worksheets:
    ws.sheet_view.zoomScale = 90
    ws.page_setup.orientation = 'landscape'
    ws.page_setup.paperSize = ws.PAPERSIZE_A4
    ws.page_setup.fitToWidth = 1
    ws.page_setup.fitToHeight = 0
    ws.sheet_properties.pageSetUpPr.fitToPage = True
    ws.print_options.gridLines = False
wb[AG].sheet_properties.pageSetUpPr.fitToPage = False
for n, rows_ in (("DAFTAR DOSEN", "4:4"), (AG, "4:4")):
    wb[n].print_title_rows = rows_
wb["DAFTAR DOSEN"].sheet_properties.tabColor = "F4B183"
wb[AG].sheet_properties.tabColor = "F4B183"
wb["REF"].sheet_properties.tabColor = "A6A6A6"
wb.active = 0
wb.save(OUT)
print("saved", OUT, "roster", len(ROSTER))
