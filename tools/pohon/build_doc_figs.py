"""Charts and diagrams for the Word edition of the research tree document.

Usage: python -X utf8 tools/pohon/build_doc_figs.py output/figures_doc
All numbers are copied from the working documents (see captions in the Word file).
"""
import sys, os, textwrap
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib import font_manager
from matplotlib.patches import FancyBboxPatch, FancyArrowPatch, Rectangle, Polygon
import numpy as np

OUT = sys.argv[1]
os.makedirs(OUT, exist_ok=True)
FONTDIR = os.path.expandvars(r"%LOCALAPPDATA%\Microsoft\Windows\Fonts")
for w in ("400", "500", "600", "700"):
    fp = os.path.join(FONTDIR, f"Inter-{w}.ttf")
    if os.path.exists(fp):
        font_manager.fontManager.addfont(fp)
plt.rcParams.update({
    "font.family": "Inter", "font.size": 8.5, "axes.edgecolor": "#C9CFCB", "axes.linewidth": 0.6,
    "axes.labelcolor": "#16211B", "xtick.color": "#5B655F", "ytick.color": "#16211B",
    "savefig.dpi": 300, "savefig.bbox": "tight", "savefig.pad_inches": 0.06,
})
INK, MUTED, LINE, PALE, WHITE = "#16211B", "#5B655F", "#C9CFCB", "#F2F4F2", "#FFFFFF"
BLUE = ["#DCE6F3", "#AFC6E6", "#7CA2D6", "#3F72B8", "#1D4F91"]
ACC = "#AE3F57"
GRAY = "#B9BFBB"
W_IN = 6.3


def save(fig, name):
    fig.savefig(os.path.join(OUT, name + ".png"), facecolor=WHITE)
    plt.close(fig)


def clean(ax, grid_x=True):
    for s in ("top", "right", "left"):
        ax.spines[s].set_visible(False)
    ax.tick_params(axis="y", length=0)
    ax.tick_params(axis="x", length=0, labelsize=7.5)
    if grid_x:
        ax.xaxis.grid(True, color="#E6EAE7", linewidth=0.6)
        ax.set_axisbelow(True)


def box(ax, x, y, w, h, text, fc=PALE, ec=LINE, tc=INK, size=8, bold=False, wrap=None, r=0.02, lw=0.8, ls="-", align="center"):
    ax.add_patch(FancyBboxPatch((x, y), w, h, boxstyle=f"round,pad=0,rounding_size={r}", fc=fc, ec=ec, lw=lw, ls=ls))
    if wrap:
        text = "\n".join(textwrap.fill(t, wrap) for t in text.split("\n"))
    ha = {"center": "center", "left": "left"}[align]
    tx = x + w / 2 if align == "center" else x + 0.012
    ax.text(tx, y + h / 2, text, ha=ha, va="center", color=tc, fontsize=size, fontweight="bold" if bold else "normal", linespacing=1.25)


def arrow(ax, x1, y1, x2, y2, color=MUTED, lw=1.0, rad=0.0, style="-|>"):
    ax.add_patch(FancyArrowPatch((x1, y1), (x2, y2), arrowstyle=style, mutation_scale=9, color=color, lw=lw,
                                 connectionstyle=f"arc3,rad={rad}", shrinkA=0, shrinkB=0))


def canvas(h, xlim=(0, 1), ylim=(0, 1)):
    fig, ax = plt.subplots(figsize=(W_IN, h))
    ax.set_xlim(*xlim); ax.set_ylim(*ylim); ax.axis("off")
    return fig, ax


# 1 ---------------------------------------------------------------- lecturers by programme and rank
def fig_dosen():
    prodi = ["Teknologi Kedokteran", "Pendidikan Profesi Dokter", "S1 Kedokteran"]
    cats = ["Calon dosen", "Belum ada jabatan fungsional", "Asisten Ahli", "Lektor", "Lektor Kepala", "Guru Besar"]
    data = {"S1 Kedokteran": [1, 8, 6, 1, 0, 0], "Pendidikan Profesi Dokter": [0, 5, 7, 0, 0, 0], "Teknologi Kedokteran": [0, 2, 3, 4, 2, 1]}
    colors = [GRAY] + BLUE[0:1] + BLUE[1:]
    fig, ax = plt.subplots(figsize=(W_IN, 2.15))
    for i, p in enumerate(prodi):
        left = 0
        for k, v in enumerate(data[p]):
            if v:
                ax.barh(i, v, left=left, height=0.56, color=colors[k], edgecolor=WHITE, linewidth=1.6)
                tc = WHITE if k >= 4 else INK
                ax.text(left + v / 2, i, str(v), ha="center", va="center", fontsize=7.5, color=tc, fontweight="600")
                left += v
        ax.text(left + 0.25, i, f"{left} dosen", va="center", fontsize=7.5, color=MUTED)
    ax.set_yticks(range(3)); ax.set_yticklabels(prodi, fontsize=8)
    ax.set_xlim(0, 19); ax.set_xticks([0, 4, 8, 12, 16])
    clean(ax)
    handles = [Rectangle((0, 0), 1, 1, fc=c, ec=WHITE) for c in colors]
    ax.legend(handles, cats, ncol=3, frameon=False, fontsize=7.2, loc="upper center", bbox_to_anchor=(0.45, 1.36), handlelength=1.2, columnspacing=1.2)
    save(fig, "d_dosen")


# 2 ---------------------------------------------------------------- RIP placements per topic
def fig_penempatan():
    topik = ["Penyakit Tidak Menular", "Penyakit Menular", "Ilmu kedokteran dasar", "Kedokteran Pencegahan,\nPendidikan & Sosial",
             "Kes. Remaja, Neonatus & Anak", "Kes. Seksual & Reproduksi"]
    a = [61, 36, 34, 31, 19, 16]
    b = [18, 8, 8, 6, 3, 7]
    y = np.arange(len(topik))[::-1]
    fig, ax = plt.subplots(figsize=(W_IN, 2.9))
    h = 0.36
    ax.barh(y + h / 2, a, height=h, color=BLUE[4], edgecolor=WHITE, linewidth=1.2, label="2023–2025")
    ax.barh(y - h / 2, b, height=h, color=BLUE[1], edgecolor=WHITE, linewidth=1.2, label="2026")
    for yy, v in zip(y, a):
        ax.text(v + 0.8, yy + h / 2, str(v), va="center", fontsize=7.5, color=INK)
    for yy, v in zip(y, b):
        ax.text(v + 0.8, yy - h / 2, str(v), va="center", fontsize=7.5, color=MUTED)
    ax.set_yticks(y); ax.set_yticklabels(topik, fontsize=8)
    ax.set_xlim(0, 70)
    clean(ax)
    ax.legend(frameon=False, fontsize=7.5, loc="lower right", handlelength=1.2)
    save(fig, "d_penempatan")


# 3 ---------------------------------------------------------------- grant ladder
def fig_hibah():
    t = ["Riset awal (TKT 1–3)", "Riset terapan (TKT 4–6)", "Hilirisasi (TKT 7–9)", "PkM di wilayah binaan", "SDM & mobilitas", "Insentif & ekosistem"]
    tot = [63, 29, 22, 19, 84, 50]
    hi = [25, 25, 12, 13, 6, 9]
    y = np.arange(len(t))[::-1]
    fig, ax = plt.subplots(figsize=(W_IN, 2.6))
    ax.barh(y, hi, height=0.56, color=BLUE[4], edgecolor=WHITE, linewidth=1.6, label="Relevansi tinggi")
    ax.barh(y, [a - b for a, b in zip(tot, hi)], left=hi, height=0.56, color=BLUE[1], edgecolor=WHITE, linewidth=1.6, label="Relevansi sedang")
    for yy, a, b in zip(y, tot, hi):
        ax.text(a + 1, yy, f"{a}  ({b} tinggi)", va="center", fontsize=7.5, color=INK)
    ax.set_yticks(y); ax.set_yticklabels(t, fontsize=8)
    ax.set_xlim(0, 100)
    clean(ax)
    ax.legend(frameon=False, fontsize=7.5, loc="lower right", handlelength=1.2)
    save(fig, "d_hibah_tangga")


# 4 ---------------------------------------------------------------- grants per tree cell (heatmap)
def fig_heat():
    M = np.array([[2, 6, 6, 5, 12], [1, 7, 5, 6, 9], [0, 10, 4, 6, 6], [5, 6, 6, 14, 6], [1, 2, 9, 5, 15]])
    rows = ["P1 Deteksi dini PTM", "P2 Ibu, anak & 1000 HPK", "P3 Infeksi & AMR", "P4 Trauma & restorasi", "P5 Sistem & pendidikan"]
    cols = ["T1\nBiosinyal", "T2\nBiosensor", "T3\nAI & citra", "T4\nBiomaterial", "T5\nTelematika"]
    from matplotlib.colors import LinearSegmentedColormap
    cmap = LinearSegmentedColormap.from_list("b", ["#F4F7FB", BLUE[1], BLUE[3], BLUE[4]])
    fig, ax = plt.subplots(figsize=(W_IN * 0.78, 2.7))
    ax.imshow(M, cmap=cmap, vmin=0, vmax=16, aspect="auto")
    for i in range(5):
        for j in range(5):
            v = M[i, j]
            ax.text(j, i, str(v), ha="center", va="center", fontsize=8.5, fontweight="600", color=WHITE if v >= 10 else INK)
    ax.add_patch(Rectangle((-0.46, 1.54), 0.92, 0.92, fill=False, ec=ACC, lw=1.8, zorder=6))
    ax.set_xticks(range(5)); ax.set_xticklabels(cols, fontsize=7.5)
    ax.set_yticks(range(5)); ax.set_yticklabels(rows, fontsize=8)
    ax.xaxis.tick_top()
    ax.set_xlim(-0.5, 4.49)
    ax.set_xticks(np.arange(-0.5, 5, 1), minor=True); ax.set_yticks(np.arange(-0.5, 5, 1), minor=True)
    ax.grid(which="minor", color=WHITE, linewidth=2)
    ax.tick_params(which="both", length=0)
    for s in ax.spines.values():
        s.set_visible(False)
    save(fig, "d_hibah_sel")


# 5 ---------------------------------------------------------------- PkM depth ladder
def fig_tangga():
    fig, ax = canvas(2.55, (0, 10), (0, 5.4))
    steps = [("1", "Pengenalan", "penyuluhan, sosialisasi"), ("2", "Pelatihan", "kader, guru, tenaga kesehatan"),
             ("3", "Penerapan", "program/produk dijalankan bersama mitra"), ("4", "Penggunaan mandiri", "mitra menjalankan sendiri ≥ 6 bulan"),
             ("5", "Dampak & replikasi", "perubahan terukur, ditiru, masuk kebijakan")]
    for i, (n, t, d) in enumerate(steps):
        x, h = 0.2 + i * 1.95, 1.0 + i * 0.75
        fc = BLUE[0] if i < 3 else BLUE[4]
        tc = INK if i < 3 else WHITE
        ax.add_patch(Rectangle((x, 0.3), 1.85, h, fc=fc, ec=WHITE, lw=1.5))
        ax.text(x + 0.12, 0.3 + h - 0.22, n, fontsize=13, fontweight="700", color=tc, va="top")
        ax.text(x + 0.12, 0.3 + h - 0.78, t, fontsize=8, fontweight="600", color=tc, va="top")
        ax.text(x + 0.12, 0.3 + h - 1.08, textwrap.fill(d, 22), fontsize=6.6, color=tc, va="top", linespacing=1.2)
    ax.plot([0.2, 5.95], [0.12, 0.12], color=INK, lw=0.8)
    ax.text(3.07, -0.12, "target edisi 2026–2028: anak tangga 3", ha="center", va="top", fontsize=7, color=INK)
    ax.plot([6.05, 9.9], [0.12, 0.12], color=ACC, lw=0.8)
    ax.text(7.97, -0.12, "hanya diklaim dengan bukti dari mitra", ha="center", va="top", fontsize=7, color=ACC)
    ax.set_ylim(-0.5, 5.4)
    save(fig, "d_tangga_pkm")


# 6 ---------------------------------------------------------------- research <-> community service cycle
def cycle(name, nodes, h=3.0, r=0.36, bw=0.27, bh=0.15, center_text=None, wrap=24):
    fig, ax = canvas(h, (-0.75, 0.75), (-0.56, 0.56))
    n = len(nodes)
    ang = [np.pi / 2 - 2 * np.pi * k / n for k in range(n)]
    pts = [(r * 1.42 * np.cos(a), r * np.sin(a)) for a in ang]
    for k in range(n):
        a0, a1 = ang[k] - 0.33, ang[k] - 2 * np.pi / n + 0.33
        x1, y1 = r * 1.42 * np.cos(a0), r * np.sin(a0)
        x2, y2 = r * 1.42 * np.cos(a1), r * np.sin(a1)
        arrow(ax, x1, y1, x2, y2, color=BLUE[3], lw=1.1, rad=-0.25)
    for (x, y), (t, d) in zip(pts, nodes):
        ax.add_patch(FancyBboxPatch((x - bw / 2, y - bh / 2), bw, bh, boxstyle="round,pad=0,rounding_size=0.02", fc=WHITE, ec=BLUE[3], lw=0.9))
        ax.text(x, y + 0.028, t, ha="center", va="center", fontsize=7.6, fontweight="600", color=INK)
        ax.text(x, y - 0.03, textwrap.fill(d, wrap), ha="center", va="center", fontsize=6.4, color=MUTED, linespacing=1.15)
    if center_text:
        ax.text(0, 0, center_text, ha="center", va="center", fontsize=8, color=BLUE[4], fontweight="600", linespacing=1.3)
    save(fig, name)


# 7 ---------------------------------------------------------------- governance structure
def fig_tatakelola():
    fig, ax = canvas(3.45, (0, 10), (0, 7))
    box(ax, 3.9, 6.15, 2.2, 0.6, "Dekan", fc=BLUE[4], ec=BLUE[4], tc=WHITE, bold=True, size=8.5)
    row = [("Unit Penelitian", "satu pagu riset"), ("Unit PkM", "program binaan"), ("Gugus Penjaminan Mutu", "evaluasi & audit"), ("Komite Etik Penelitian", "telaah etik & data")]
    for i, (t, d) in enumerate(row):
        x = 0.15 + i * 2.48
        box(ax, x, 4.75, 2.3, 0.78, f"{t}\n{d}", fc=PALE, ec=LINE, size=7.6)
        arrow(ax, 5.0, 6.15, x + 1.15, 5.53, color=LINE, lw=0.8)
    box(ax, 0.15, 2.95, 4.2, 1.15, "5 koordinator pilar (P1–P5)\nmasalah kesehatan · dosen Kedokteran/Profesi;\nP4 oleh dosen Teknologi Kedokteran", fc=WHITE, ec=BLUE[3], size=7.4)
    box(ax, 5.65, 2.95, 4.2, 1.15, "5 koordinator platform (T1–T5)\nbidang teknologi · dosen Teknologi Kedokteran\ndengan pendamping klinis", fc=WHITE, ec=BLUE[3], size=7.4)
    # small 5x5 grid
    gx, gy, c = 4.55, 2.95, 0.21
    for i in range(5):
        for j in range(5):
            on = (i, j) in [(1, 0), (3, 1), (1, 3)]
            ax.add_patch(Rectangle((gx + j * c, gy + i * c), c - 0.03, c - 0.03, fc=ACC if on else BLUE[0], ec="none"))
    ax.text(gx + 0.52, gy - 0.18, "sel percontohan", ha="center", va="top", fontsize=6.6, color=ACC)
    arrow(ax, 1.3, 4.75, 2.25, 4.1, color=LINE); arrow(ax, 1.3, 4.75, 7.75, 4.1, color=LINE, rad=-0.08)
    box(ax, 1.4, 0.75, 7.2, 1.0, "Tim proyek lintas prodi\ndosen tiga prodi · mahasiswa (skripsi, tugas akhir, kepaniteraan) · mitra RSUD, puskesmas, industri", fc=PALE, ec=LINE, size=7.4)
    arrow(ax, 2.25, 2.95, 3.5, 1.75, color=BLUE[3]); arrow(ax, 7.75, 2.95, 6.5, 1.75, color=BLUE[3])
    ax.text(5.0, 0.35, "Belanja modal bersama diusulkan platform · belanja operasional disalurkan pilar · keduanya di bawah satu pagu", ha="center", fontsize=6.8, color=MUTED)
    save(fig, "d_tatakelola")


# 8 ---------------------------------------------------------------- adoption timeline
def fig_linimasa():
    import datetime as dt
    d = lambda m, day: dt.date(2026 if m >= 11 else 2027, m, day)
    t0 = d(11, 23)
    X = lambda dd: (dd - t0).days
    rows = [("Bahan siap & pembicaraan awal", d(11, 23), d(11, 27), "bar"),
            ("Review tim kecil", d(11, 30), d(12, 4), "bar"),
            ("Tahap 1: kerangka & surat edaran", d(12, 7), d(12, 9), "ms"),
            ("Dosen mengisi instrumen", d(12, 10), d(1, 8), "bar"),
            ("Rekap & revisi draf", d(1, 11), d(1, 15), "bar"),
            ("Review peta jalan tiap prodi", d(1, 18), d(1, 22), "bar"),
            ("Uji publik pemangku kepentingan", d(1, 25), d(1, 29), "bar"),
            ("Tahap 2: draf final ke Dekanat", d(2, 3), d(2, 4), "ms"),
            ("Penetapan SK Dekan", d(2, 8), d(3, 5), "bar"),
            ("Peluncuran", d(3, 16), d(3, 26), "bar")]
    fig, ax = plt.subplots(figsize=(W_IN, 3.0))
    n = len(rows)
    ax.axvspan(X(d(3, 6)), X(d(3, 15)) + 1, color="#F6E9EC", lw=0)
    ax.text(X(d(3, 10)) + 0.5, n - 0.35, "libur Nyepi–\nIdul Fitri", ha="center", va="top", fontsize=6.3, color=ACC)
    for k, (lab, a, b, kind) in enumerate(rows):
        y = n - 1 - k
        if kind == "bar":
            ax.barh(y, X(b) - X(a) + 1, left=X(a), height=0.5, color=BLUE[2] if k != 3 else BLUE[3], edgecolor=WHITE)
        else:
            ax.scatter([X(a) + (X(b) - X(a)) / 2 + 0.5], [y], marker="D", s=46, color=ACC, zorder=3)
        ax.text(-1.5, y, lab, ha="right", va="center", fontsize=7.6, color=INK)
    for dd, lab in [(d(12, 14), "sesi terpandu"), (d(1, 6), "sapu bersih")]:
        ax.scatter([X(dd) + 1.5], [n - 4], marker="v", s=18, color=INK, zorder=4)
        ax.text(X(dd) + 1.5, n - 4 + 0.42, lab, ha="center", fontsize=6.2, color=INK)
    months = [(d(12, 1), "Des"), (d(1, 1), "Jan 2027"), (d(2, 1), "Feb"), (d(3, 1), "Mar")]
    ax.text(0.6, n - 0.25, "Nov", fontsize=7, color=MUTED, va="bottom")
    for dd, lab in months:
        ax.axvline(X(dd), color="#E6EAE7", lw=0.6, zorder=0)
        ax.text(X(dd) + 0.6, n - 0.25, lab, fontsize=7, color=MUTED, va="bottom")
    ax.set_xlim(0, X(d(3, 28))); ax.set_ylim(-0.6, n + 0.2)
    ax.axis("off")
    save(fig, "d_linimasa")


# 9 ---------------------------------------------------------------- chevrons (prototype to market; accreditation elements)
def chevrons(name, items, h=2.0, wrap=20, fill_last=False):
    fig, ax = canvas(h, (0, 10), (0, 3.2))
    n = len(items)
    w = 10 / n
    for i, (t, d) in enumerate(items):
        x = i * w
        pts = [(x, 2.2), (x + w - 0.22, 2.2), (x + w, 2.7), (x + w - 0.22, 3.2), (x, 3.2), (x + 0.22, 2.7)] if i else \
              [(x, 2.2), (x + w - 0.22, 2.2), (x + w, 2.7), (x + w - 0.22, 3.2), (x, 3.2)]
        fc = BLUE[4] if (fill_last and i == n - 1) else BLUE[i % 1 + 3] if False else BLUE[min(4, 1 + i * 3 // max(1, n - 1))]
        tc = WHITE if fc in (BLUE[3], BLUE[4]) else INK
        ax.add_patch(Polygon(pts, closed=True, fc=fc, ec=WHITE, lw=1.5))
        ax.text(x + w / 2 + 0.05, 2.7, f"{i + 1}", ha="center", va="center", fontsize=11, fontweight="700", color=tc)
        ax.text(x + 0.12, 2.0, textwrap.fill(t, wrap), ha="left", va="top", fontsize=7.6, fontweight="600", color=INK, linespacing=1.2)
        ax.text(x + 0.12, 1.32, textwrap.fill(d, wrap + 4), ha="left", va="top", fontsize=6.6, color=MUTED, linespacing=1.2)
    save(fig, name)


# 10 --------------------------------------------------------------- reference chain
def fig_rantai():
    fig, ax = canvas(3.25, (0, 10), (0, 7.2))
    box(ax, 0.2, 6.15, 9.6, 0.8, "Acuan nasional: RPJMN 2025–2029 · Renstra Kementerian Kesehatan 2025–2029 · Rencana Induk Riset Nasional · Renstra Kemdiktisaintek 2025–2029",
        fc=PALE, ec=LINE, size=7.4)
    chain = [("Renstra ITS 2026–2030\nPeta Jalan Penelitian ITS 2025–2029", PALE, INK),
             ("Renstra FKK 2026–2030", PALE, INK),
             ("Rencana Induk Penelitian & PkM FKK 2026–2030\npohon penelitian dan peta jalan (dokumen ini)", BLUE[4], WHITE)]
    y = 4.85
    for i, (t, fc, tc) in enumerate(chain):
        x = 0.2 + i * 3.27
        box(ax, x, y, 3.0, 0.95, t, fc=fc, ec=fc if fc != PALE else LINE, tc=tc, size=7.3, bold=(i == 2))
        if i:
            arrow(ax, x - 0.27, y + 0.47, x - 0.02, y + 0.47)
    arrow(ax, 5.0, 6.15, 5.0, 5.8, color=LINE)
    prod = ["Renstra & RIP Prodi\nSarjana Kedokteran", "Renstra & RIP Prodi\nPendidikan Profesi Dokter", "Renstra & RIP Prodi\nTeknologi Kedokteran"]
    for i, t in enumerate(prod):
        x = 0.2 + i * 3.27
        box(ax, x, 3.1, 3.0, 0.85, t, fc=WHITE, ec=BLUE[3], size=7.3)
        arrow(ax, 8.27, 4.85, x + 1.5, 3.95, color=BLUE[3], rad=0.0)
    box(ax, 0.2, 1.65, 9.6, 0.75, "Agenda penelitian & PkM tiap dosen (5 tahun, 2–5 proyek, setiap proyek berkode pilar–platform)", fc=PALE, ec=LINE, size=7.4)
    for i in range(3):
        arrow(ax, 1.7 + i * 3.27, 3.1, 1.7 + i * 3.27, 2.4, color=LINE)
    box(ax, 0.2, 0.25, 9.6, 0.75, "Judul penelitian, kontrak hibah, tugas akhir mahasiswa, luaran (publikasi, HKI, produk), program PkM", fc=PALE, ec=LINE, size=7.4)
    arrow(ax, 5.0, 1.65, 5.0, 1.0, color=LINE)
    save(fig, "d_rantai")


# 11 --------------------------------------------------------------- surveillance platform phasing
def fig_surveilans():
    fig, ax = canvas(2.85, (0, 10), (0, 6))
    ph = [("Tahap 0 · bulan 0–12", "Sensus dasar 1–2 desa", "register rumah tangga & individu bernomor, titik lokasi, modul faktor risiko pendek", "naskah prevalensi & sebaran faktor risiko"),
          ("Tahap 1 · tahun 2–5", "Pembaruan tahunan", "kelahiran, kematian, pindah datang/keluar; studi tersarang", "validasi alat skrining pada populasi nyata"),
          ("Tahap 2 · tahun 7–10", "Kohort matang", "ronde berulang yang terbiayai", "insidens & etiologi")]
    for i, (a, b, c, d) in enumerate(ph):
        x = 0.15 + i * 3.3
        fc = BLUE[1 + i]
        tc = WHITE if i == 2 else INK
        ax.add_patch(Polygon([(x, 4.3), (x + 3.0, 4.3), (x + 3.2, 4.9), (x + 3.0, 5.5), (x, 5.5), (x + (0.2 if i else 0), 4.9)], closed=True, fc=fc, ec=WHITE, lw=1.5))
        ax.text(x + 0.3, 5.12, a, fontsize=7, color=tc, va="center")
        ax.text(x + 0.3, 4.68, b, fontsize=8.2, fontweight="600", color=tc, va="center")
        ax.text(x + 0.05, 4.05, textwrap.fill(c, 34), fontsize=6.7, color=INK, va="top", linespacing=1.2)
        ax.text(x + 0.05, 3.15, "Luaran: " + d, fontsize=6.7, color=BLUE[4], va="top", fontweight="600")
    box(ax, 0.15, 1.6, 9.7, 0.7, "Jalur data berjalan paralel: analisis data rutin puskesmas dan register — mulai dari data agregat, penautan data individu hanya dengan dasar hukum dan perjanjian",
        fc=PALE, ec=LINE, size=7.1)
    box(ax, 0.15, 0.35, 9.7, 0.85, "Prasyarat sebelum tahap 0: komite etik berwenang · rancangan pelindungan data pribadi (UU 27/2022) · perjanjian dengan Dinkes dan puskesmas · wilayah pembanding sebagai giliran bertahap · anggaran tiga ronde",
        fc=WHITE, ec=ACC, tc=INK, size=7.1, wrap=None)
    save(fig, "d_surveilans")


if __name__ == "__main__":
    fig_dosen(); fig_penempatan(); fig_hibah(); fig_heat(); fig_linimasa()
    print("charts ok", OUT)
