import math, html, sys
OUT = sys.argv[1]
E = html.escape

# ---------------------------------------------------------------- tree data (from POHON_PENELITIAN_FKK_ITS.md §5.1–5.3)
PILAR = [
  ("p1", "P1 · Deteksi Dini PTM", ["Skrining PTM berbasis sensor", "Risiko kardiometabolik AI", "Deteksi dini komplikasi", "Perubahan perilaku digital", "Skrining & deteksi dini kanker"]),
  ("p2", "P2 · Ibu, Anak & 1000 HPK", ["Pemantauan pertumbuhan", "Keselamatan maternal-neonatal", "Skrining tumbuh kembang", "Gizi & pangan lokal"]),
  ("p3", "P3 · Infeksi, AMR & Ketahanan", ["Surveilans AMR komunitas", "Diagnostik cepat infeksi", "Surveilans sindromik digital", "Lingkungan & vektor"]),
  ("p4", "P4 · Trauma & Restorasi Fungsi", ["Implan ortopedi", "Prostesis & ortosis", "Rehabilitasi & asistif", "Nyeri & perioperatif"]),
  ("p5", "P5 · Sistem Kes. & Pendidikan", ["Implementasi layanan primer", "Pendidikan berbasis teknologi", "Etika & hukum AI kesehatan", "Ekonomi kesehatan & HTA"]),
]
TAGS = ["RIP prodi: Penyakit Tidak Menular", "RIP prodi: Anak + Reproduksi", "RIP prodi: Penyakit Menular",
        "belum ada topik prodi · dipimpin T4", "RIP prodi: Med. Ed. & Sosial"]
PLATFORM = [("T1", "Biosinyal & neuroteknologi"), ("T2", "Biosensor & diagnostik"), ("T3", "AI, citra & sains data"),
            ("T4", "Biomaterial & biomekanika"), ("T5", "Telematika kesehatan")]
WAHANA = [("W0–W1", "Laboratorium"), ("W2", "ITS Medical Center"), ("W3", "RSUD pendidikan"), ("W4", "Desa Binaan")]
PRODI = [("s1", "Sarjana Kedokteran"), ("s2", "Pendidikan Profesi Dokter"), ("s3", "Teknologi Kedokteran")]

def f(v): return f"{v:.1f}".rstrip("0").rstrip(".")

# ---------------------------------------------------------------- recommended tree
def tree_svg():
    W, H, CX = 1040, 810, 520
    o = []
    o.append(f'<svg viewBox="0 0 {W} {H}" role="img" aria-label="Usulan pohon penelitian FKK ITS: akar tunggang ilmu kedokteran dasar dan lima akar platform teknologi T1 sampai T5, batang Kedokteran Pencegahan 4.0 dari tiga prodi yang dipilin menjadi satu visi, lima cabang pilar dengan empat topik masing-masing, tumbuh di atas wahana translasi W0 sampai W4.">')
    BL = [(20, 304), (130, 154), (387, 6), (645, 154), (755, 304)]  # blob top-left
    BW, BH = 265, 140
    anchors = [(BL[0][0]+BW-40, BL[0][1]+BH-8), (BL[1][0]+BW-70, BL[1][1]+BH-2), (BL[2][0]+BW/2, BL[2][1]+BH-2),
               (BL[3][0]+70, BL[3][1]+BH-2), (BL[4][0]+40, BL[4][1]+BH-8)]
    FORK = (CX, 478)
    # branches (drawn first)
    for i, (key, _, _) in enumerate(PILAR):
        ax, ay = anchors[i]
        c1 = (CX + (ax-CX)*0.15, FORK[1]-60)
        c2 = (ax - (ax-CX)*0.25, ay + 60) if i in (0, 4) else (ax - (ax-CX)*0.1, ay + 90)
        d = f"M{f(FORK[0])},{f(FORK[1])} C{f(c1[0])},{f(c1[1])} {f(c2[0])},{f(c2[1])} {f(ax)},{f(ay)}"
        o.append(f'<path d="{d}" class="branch" stroke-width="11"/>')
        o.append(f'<path d="{d}" class="branch-hi" stroke-width="3"/>')
        # one leaf mid-branch
        t = 0.55
        bx = (1-t)**3*FORK[0] + 3*(1-t)**2*t*c1[0] + 3*(1-t)*t*t*c2[0] + t**3*ax
        by = (1-t)**3*FORK[1] + 3*(1-t)**2*t*c1[1] + 3*(1-t)*t*t*c2[1] + t**3*ay
        side = -1 if ax < CX else 1
        if i == 2: side = 1
        ang = -60 if side < 0 else 60
        if i == 2: ang = 50
        o.append(f'<g transform="translate({f(bx)},{f(by)}) rotate({ang})"><path d="M0,0 C8,-10 26,-10 34,0 C26,10 8,10 0,0 Z" class="{key}-leaf"/><line x1="2" y1="0" x2="30" y2="0" class="{key}-vein"/></g>')
    # canopy blobs
    for i, (key, title, topics) in enumerate(PILAR):
        x, y = BL[i]
        o.append(f'<rect x="{x}" y="{y}" width="{BW}" height="{BH + 19 * max(0, len(topics) - 4)}" rx="24" class="{key}-blob"/>')
        o.append(f'<text x="{x+18}" y="{y+27}" class="blob-title {key}-text">{E(title)}</text>')
        o.append(f'<text x="{x+18}" y="{y+45}" class="blob-tag mono">{E(TAGS[i])}</text>')
        for j, name in enumerate(topics):
            ty = y + 67 + j*19
            o.append(f'<circle cx="{x+23}" cy="{ty-4}" r="4.2" class="{key}-bud"/>')
            o.append(f'<text x="{x+34}" y="{ty}" class="blob-line"><tspan class="mono {key}-text">{i+1}.{j+1}</tspan> {E(name)}</text>')
    # soil band (wahana)
    gy, gh = 600, 34
    o.append(f'<rect x="30" y="{gy}" width="{W-60}" height="{gh}" rx="6" class="soil"/>')
    segw = (W-60)/4
    for k, (code, name) in enumerate(WAHANA):
        sx = 30 + k*segw
        if k: o.append(f'<line x1="{f(sx)}" y1="{gy+6}" x2="{f(sx)}" y2="{gy+gh-6}" class="soil-sep"/>')
        o.append(f'<text x="{f(sx+segw/2)}" y="{gy+22}" text-anchor="middle" class="soil-text"><tspan class="mono strong">{code}</tspan> {E(name)}</text>')
    o.append(f'<text x="30" y="{gy-10}" class="zone-label">TANAH · WAHANA TRANSLASI</text>')
    # roots
    tips = [(95, 704), (245, 714), (375, 722), (700, 714), (910, 704)]
    for k, (tx, ty) in enumerate(tips):
        sx = CX + (tx-CX)*0.06
        d = f"M{f(sx)},{gy+gh} C{f(sx + (tx-sx)*0.2)},{gy+gh+40} {f(tx - (tx-sx)*0.25)},{ty-30} {tx},{ty}"
        o.append(f'<path d="{d}" class="root" stroke-width="5"/>')
        o.append(f'<circle cx="{tx}" cy="{ty}" r="3" class="root-tip"/>')
        code, name = PLATFORM[k]
        o.append(f'<text x="{tx}" y="{ty+22}" text-anchor="middle" class="root-code mono">{code}</text>')
        o.append(f'<text x="{tx}" y="{ty+38}" text-anchor="middle" class="root-name">{E(name)}</text>')
        if code in ("T3", "T5"):
            o.append(f'<text x="{tx}" y="{ty+54}" text-anchor="middle" class="root-dh">Digital Health</text>')
    o.append(f'<path d="M{CX},{gy+gh} C{CX-4},{gy+gh+40} {CX+4},{gy+gh+80} {CX},{752}" class="root" stroke-width="9"/>')
    o.append(f'<circle cx="{CX}" cy="752" r="4" class="root-tip"/>')
    o.append(f'<text x="{CX}" y="776" text-anchor="middle" class="root-code">Ilmu kedokteran dasar</text>')
    o.append(f'<text x="{CX}" y="793" text-anchor="middle" class="root-name">akar tunggang · Basic Science</text>')
    o.append(f'<text x="30" y="664" class="zone-label">AKAR · PLATFORM &amp; ILMU DASAR</text>')
    # braided trunk: three strands, depth-sorted segments
    y0, y1 = gy+2, FORK[1]-6
    turns, A0 = 1.5, 13
    k = 2*math.pi*turns/(y0-y1)
    segs = []
    step = 3
    ys = [y0 - n*step for n in range(int((y0-y1)/step)+1)]
    def pos(s, yy):
        th = k*(y0-yy) + s*2*math.pi/3
        flare = 20*max(0, (yy-(y0-26))/26)**2
        taper = 1 - 0.35*((y0-yy)/(y0-y1))
        return CX + (A0*taper + flare)*math.sin(th), math.cos(th)
    for s in range(3):
        for n in range(len(ys)-1):
            xa, za = pos(s, ys[n]); xb, zb = pos(s, ys[n+1])
            segs.append(((za+zb)/2, s, xa, ys[n], xb, ys[n+1]))
    # fork cap under strands
    o.append(f'<ellipse cx="{CX}" cy="{FORK[1]+2}" rx="20" ry="10" class="bark"/>')
    segs.sort(key=lambda t: t[0])
    for z, s, xa, ya, xb, yb in segs:
        o.append(f'<line x1="{f(xa)}" y1="{f(ya)}" x2="{f(xb)}" y2="{f(yb)}" class="strand-gap" stroke-width="17"/>')
        o.append(f'<line x1="{f(xa)}" y1="{f(ya)}" x2="{f(xb)}" y2="{f(yb)}" class="strand {PRODI[s][0]}" stroke-width="12"/>')
    # trunk labels
    o.append('<text x="60" y="507" class="zone-label">BATANG · VISI KEILMUAN</text>')
    o.append('<text x="60" y="536" class="visi">Kedokteran Pencegahan 4.0</text>')
    o.append('<text x="60" y="558" class="visi-sub">presisi, berbasis teknologi kedokteran</text>')
    o.append('<line x1="352" y1="532" x2="488" y2="532" class="leader"/>')
    o.append('<text x="640" y="507" class="zone-label">BATANG · TIGA PRODI DIPILIN</text>')
    for n, (key, name) in enumerate(PRODI):
        yy = 530 + n*22
        o.append(f'<rect x="640" y="{yy-10}" width="22" height="10" rx="5" class="{key}-sw"/>')
        o.append(f'<text x="672" y="{yy}" class="legend-text">{E(name)}</text>')
    o.append('<line x1="552" y1="532" x2="628" y2="532" class="leader"/>')
    o.append('</svg>')
    return "\n".join(o)

# ---------------------------------------------------------------- gallery thumbnails (240x140)
def thumb(kind):
    s = ['<svg viewBox="0 0 240 140" role="img" aria-label="{}" class="thumb">']
    if kind == "pohon":
        s[0] = s[0].format("Sketsa pohon ilustratif: akar, batang, tajuk, dan buah")
        s += ['<path d="M120,112 L120,70" class="th-stroke" stroke-width="9" stroke-linecap="round"/>',
              '<circle cx="120" cy="50" r="30" class="th-soft"/>', '<circle cx="90" cy="60" r="20" class="th-soft"/>', '<circle cx="150" cy="60" r="20" class="th-soft"/>',
              '<circle cx="104" cy="44" r="5" class="th-accent"/>', '<circle cx="138" cy="40" r="5" class="th-accent"/>', '<circle cx="150" cy="66" r="5" class="th-accent"/>', '<circle cx="92" cy="66" r="5" class="th-accent"/>',
              '<line x1="40" y1="112" x2="200" y2="112" class="th-line"/>',
              '<path d="M120,112 C110,122 96,126 84,130 M120,112 C130,122 144,126 156,130 M120,112 L120,132" class="th-stroke" stroke-width="2.5" fill="none" stroke-linecap="round"/>']
    elif kind == "ikan":
        s[0] = s[0].format("Sketsa tulang ikan: ekor tahun 2023 di kiri, kepala tujuan 2030 di kanan, tulang topik di atas dan bawah")
        s += ['<line x1="34" y1="70" x2="196" y2="70" class="th-line" stroke-width="2.4"/>',
              '<path d="M16,50 L36,70 L16,90 Z" class="th-soft th-edge"/>', '<path d="M196,50 L228,70 L196,90 Z" class="th-accent"/>']
        for x in (70, 120, 170):
            s += [f'<line x1="{x}" y1="70" x2="{x-18}" y2="34" class="th-line"/>', f'<line x1="{x}" y1="70" x2="{x-18}" y2="106" class="th-line"/>',
                  f'<rect x="{x-40}" y="14" width="44" height="18" rx="3" class="th-soft th-edge"/>', f'<rect x="{x-40}" y="108" width="44" height="18" rx="3" class="th-soft th-edge"/>']
    elif kind == "matriks":
        s[0] = s[0].format("Sketsa matriks lima pilar kali lima platform dengan sebagian sel terisi")
        fill = {(0,1),(0,2),(1,2),(1,4),(2,1),(2,4),(3,3),(3,0),(4,4),(0,0)}
        for r in range(5):
            s += [f'<text x="34" y="{28+r*22}" text-anchor="end" class="th-text">P{r+1}</text>']
            for c in range(5):
                cls = "th-accent" if (r,c) in fill else "th-faint"
                s += [f'<rect x="{42+c*36}" y="{16+r*22}" width="32" height="18" rx="3" class="{cls}"/>']
        for c in range(5):
            s += [f'<text x="{58+c*36}" y="136" text-anchor="middle" class="th-text">T{c+1}</text>']
    elif kind == "radial":
        s[0] = s[0].format("Sketsa lingkaran konsentris: visi di pusat, pilar di cincin tengah, topik di cincin luar")
        cx, cy = 120, 70
        s += [f'<circle cx="{cx}" cy="{cy}" r="62" class="th-faint"/>', f'<circle cx="{cx}" cy="{cy}" r="42" class="th-soft th-edge"/>', f'<circle cx="{cx}" cy="{cy}" r="18" class="th-accent"/>']
        for n in range(5):
            a = -math.pi/2 + n*2*math.pi/5
            s += [f'<line x1="{f(cx+18*math.cos(a))}" y1="{f(cy+18*math.sin(a))}" x2="{f(cx+62*math.cos(a))}" y2="{f(cy+62*math.sin(a))}" class="th-line"/>']
        for n in range(20):
            a = -math.pi/2 + (n+0.5)*2*math.pi/20
            s += [f'<circle cx="{f(cx+52*math.cos(a))}" cy="{f(cy+52*math.sin(a))}" r="3" class="th-dot"/>']
    elif kind == "rumah":
        s[0] = s[0].format("Sketsa rumah pilar: atap visi, lima tiang pilar, fondasi sumber daya")
        s += ['<path d="M30,44 L120,10 L210,44 Z" class="th-accent"/>']
        for n in range(5):
            s += [f'<rect x="{42+n*34}" y="50" width="18" height="58" rx="2" class="th-soft th-edge"/>']
        s += ['<rect x="26" y="112" width="188" height="16" rx="3" class="th-faint th-edge"/>']
    elif kind == "lajur":
        s[0] = s[0].format("Sketsa peta jalan lajur: lima lajur pilar melintasi tiga tahap waktu dengan tonggak")
        for n, (x, w) in enumerate([(30, 80), (110, 80), (190, 44)]):
            s += [f'<path d="M{x},10 L{x+w-8},10 L{x+w},20 L{x+w-8},30 L{x},30 L{x+8},20 Z" class="{"th-accent" if n==0 else "th-soft th-edge"}"/>']
        for r in range(5):
            y = 40 + r*19
            s += [f'<text x="24" y="{y+11}" text-anchor="end" class="th-text">P{r+1}</text>', f'<rect x="30" y="{y}" width="204" height="14" rx="3" class="th-faint"/>']
        for (x, r) in [(70, 0), (150, 0), (96, 1), (204, 1), (60, 2), (130, 3), (210, 3), (170, 4)]:
            y = 47 + r*19
            s += [f'<path d="M{x},{y-6} L{x+6},{y} L{x},{y+6} L{x-6},{y} Z" class="th-dot"/>']
    s.append('</svg>')
    return "\n".join(s)

GALLERY = [
  ("pohon", "Pohon ilustratif", "Akar untuk sumber daya, batang untuk visi, cabang untuk tema, buah untuk luaran.",
   "Poster, sampul RIP, sosialisasi ke dosen dan mahasiswa. Paling cepat dipahami asesor.",
   "Cepat penuh teks. Tidak memuat waktu dan tidak memperlihatkan kerja lintas prodi.", "use", "Dipakai · identitas"),
  ("ikan", "Tulang ikan", "Ekor tahun awal, kepala tujuan 2030, tulang untuk topik dan subtopik.",
   "Peta jalan satu prodi atau satu topik. Prodi Kedokteran & Profesi Dokter sudah memakainya; Teknologi Kedokteran memakai kerangka yang sama per platform.",
   "Aslinya alat analisis sebab-akibat. Tahun tidak terbaca dari posisi tulang, dan daftar judul cepat memanjang.", "use", "Dipakai · tingkat prodi"),
  ("matriks", "Matriks Pilar × Platform", "Baris pilar, kolom platform, isi sel jumlah topik.",
   "Tata kelola: melihat integrasi dan sel kosong yang menjadi peta rekrutmen.",
   "Pembaca awam tidak membacanya sebagai pohon.", "use", "Dipakai · tata kelola"),
  ("radial", "Lingkaran konsentris", "Visi di pusat, pilar di cincin tengah, topik di cincin luar.",
   "Sampul dan slide pembuka. Paparan prodi memakai roda SDG untuk ini.",
   "Teks melengkung sulit dibaca dan sulit dicetak kecil.", "opt", "Opsional · sampul"),
  ("rumah", "Rumah pilar", "Atap untuk visi, tiang untuk pilar, fondasi untuk SDM dan fasilitas.",
   "Dokumen Renstra yang memang memakai istilah pilar.",
   "Dua metafora sekaligus, pohon dan rumah, membingungkan pembaca.", "no", "Tidak dipakai"),
  ("lajur", "Peta jalan lajur", "Baris pilar, kolom tahap waktu, tonggak di setiap sel.",
   "Menjawab kapan. Bagian inilah yang membuat pohon menjadi peta jalan.",
   "Tanpa pohon, alasan memilih topik tidak terlihat.", "use", "Dipakai · waktu"),
]

def gallery_html():
    cards = []
    for kind, name, what, good, risk, v, verdict in GALLERY:
        cards.append(f'''<article class="card">
  <div class="thumb-wrap">{thumb(kind)}</div>
  <div class="card-head"><h3>{E(name)}</h3><span class="pill pill-{v}">{E(verdict)}</span></div>
  <p class="card-what">{E(what)}</p>
  <dl class="card-dl"><dt>Cocok untuk</dt><dd>{E(good)}</dd><dt>Hati-hati</dt><dd>{E(risk)}</dd></dl>
</article>''')
    return "\n".join(cards)


CROSS_L = [("Basic Science", "34", "8"), ("Penyakit Tidak Menular", "61", "18"), ("Kesehatan Seksual & Reproduksi", "16", "7"),
           ("Kesehatan Remaja, Neonatus & Anak", "19", "3"), ("Penyakit Menular", "36", "8"),
           ("Ked. Pencegahan, Med. Ed. & Sosial", "31", "6"), ("Digital Health", None, None)]
CROSS_R = [("ilmu", "Akar ilmu · Kedokteran Dasar", "Basic Science menjadi akar tunggang"),
           ("p1", "P1 · Deteksi Dini & Pengendalian PTM", "+ kanker serviks & payudara → 1.5"),
           ("p2", "P2 · Ibu, Anak & 1000 HPK", "remaja–anak dan kesehatan reproduksi bergabung"),
           ("p3", "P3 · Infeksi, AMR & Ketahanan", ""),
           ("p4", "P4 · Trauma & Restorasi Fungsi", "+ forensik & disabilitas · dipimpin Teknologi Kedokteran"),
           ("p5", "P5 · Sistem Kesehatan & Pendidikan", ""),
           ("plat", "Platform T1–T5", "Digital Health = T3 + T5")]
LINKS = [(0, 0, False, ""), (1, 1, False, ""), (2, 2, False, ""), (2, 1, True, ""), (3, 2, False, ""),
         (4, 3, False, ""), (5, 5, False, ""), (5, 4, True, ""), (6, 6, False, "")]

def cross_svg():
    W, H = 1000, 610
    LX, LW, RX, RW, Y0, BH, GAP = 20, 300, 640, 340, 58, 58, 12
    o = [f'<svg viewBox="0 0 {W} {H}" role="img" aria-label="Padanan tujuh topik RIP Prodi Kedokteran dan Profesi Dokter ke pohon fakultas: Basic Science ke akar ilmu, Penyakit Tidak Menular ke P1, Kesehatan Seksual dan Reproduksi serta Kesehatan Remaja Neonatus dan Anak ke P2, Penyakit Menular ke P3, topik ketujuh ke P5, Digital Health ke platform teknologi. P4 belum punya topik prodi.">']
    o.append('<defs><marker id="ah3" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 Z" class="arrowhead"/></marker></defs>')
    o.append(f'<text x="{LX}" y="30" class="zone-label">RIP PRODI KEDOKTERAN &amp; PROFESI DOKTER</text>')
    o.append(f'<text x="{LX}" y="46" class="cw-sub">penempatan luaran 2023–2025 · 2026</text>')
    o.append(f'<text x="{(LX+LW+RX)/2}" y="30" text-anchor="middle" class="zone-label">MASUK KE</text>')
    o.append(f'<text x="{RX}" y="30" class="zone-label">POHON FAKULTAS</text>')
    cy = lambda i: Y0 + i*(BH+GAP) + BH/2
    for i, (a, b, dashed, lab) in enumerate(LINKS):
        x1, y1, x2, y2 = LX+LW+4, cy(a), RX-6, cy(b)
        mx = (x1+x2)/2
        o.append(f'<path d="M{x1},{f(y1)} C{f(mx)},{f(y1)} {f(mx)},{f(y2)} {x2},{f(y2)}" class="cw-link{" cw-dash" if dashed else ""}" marker-end="url(#ah3)"/>')
        if lab:
            o.append(f'<text x="{f(mx)}" y="{f((y1+y2)/2 - 6)}" text-anchor="middle" class="cw-lab">{E(lab)}</text>')
    for i, (name, a, b) in enumerate(CROSS_L):
        y = Y0 + i*(BH+GAP)
        o.append(f'<rect x="{LX}" y="{y}" width="{LW}" height="{BH}" rx="8" class="cw-left"/>')
        o.append(f'<text x="{LX+14}" y="{y+24}" class="cw-name">{E(name)}</text>')
        if a:
            o.append(f'<text x="{LX+14}" y="{y+44}" class="cw-num mono">{a} · {b} luaran</text>')
        else:
            o.append(f'<text x="{LX+14}" y="{y+44}" class="cw-num mono">dipetakan per tahun dan TKT</text>')
    for i, (key, name, sub) in enumerate(CROSS_R):
        y = Y0 + i*(BH+GAP)
        cls = {"ilmu": "cw-root", "plat": "cw-root"}.get(key, f"{key}-blob")
        extra = " cw-dashbox" if key == "p4" else ""
        o.append(f'<rect x="{RX}" y="{y}" width="{RW}" height="{BH}" rx="8" class="{cls}{extra}"/>')
        tcls = f"{key}-text" if key.startswith("p") else ""
        o.append(f'<text x="{RX+14}" y="{y+24}" class="cw-name strong {tcls}">{E(name)}</text>')
        if sub:
            o.append(f'<text x="{RX+14}" y="{y+44}" class="cw-num">{E(sub)}</text>')
    ly = H - 30
    o.append(f'<line x1="{LX}" y1="{ly}" x2="{LX+40}" y2="{ly}" class="cw-link"/>')
    o.append(f'<text x="{LX+50}" y="{ly+4}" class="cw-num">padanan utama</text>')
    o.append(f'<line x1="{LX+180}" y1="{ly}" x2="{LX+220}" y2="{ly}" class="cw-link cw-dash"/>')
    o.append(f'<text x="{LX+230}" y="{ly+4}" class="cw-num">sebagian subtopik</text>')
    o.append('</svg>')
    return "\n".join(o)

# ---------------------------------------------------------------- A3 poster wireframe
def poster_svg():
    W, H = 1000, 707
    o = [f'<svg viewBox="0 0 {W} {H}" role="img" aria-label="Tata letak satu lembar A3 mendatar: judul di atas, pohon di kiri, matriks pilar kali platform di kanan atas, peta jalan tiga tahap di kanan bawah, rantai acuan di bawah. Tiap bidang diisi dari tab instrumen isian dosen.">']
    o.append(f'<rect x="4" y="4" width="{W-8}" height="{H-8}" rx="10" class="paper"/>')
    # header
    o.append('<text x="30" y="46" class="ps-title">Pohon Penelitian &amp; Peta Jalan FKK ITS 2026–2030</text>')
    o.append('<text x="30" y="68" class="ps-sub">Kedokteran Pencegahan 4.0 · tiga prodi, satu pohon</text>')
    o.append(f'<text x="{W-30}" y="46" text-anchor="end" class="ps-meta">Ditetapkan dengan SK Dekan</text>')
    o.append(f'<text x="{W-30}" y="66" text-anchor="end" class="ps-meta mono">No. … / 2027</text>')
    o.append(f'<line x1="30" y1="84" x2="{W-30}" y2="84" class="ps-rule"/>')
    # panels
    def panel(x, y, w, h, label, src):
        o.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="8" class="ps-panel"/>')
        o.append(f'<text x="{x+14}" y="{y+22}" class="zone-label">{E(label)}</text>')
        if src:
            tw = 8 + len(src)*6.3
            o.append(f'<rect x="{x+w-14-tw}" y="{y+9}" width="{f(tw)}" height="19" rx="9.5" class="src-pill"/>')
            o.append(f'<text x="{f(x+w-14-tw/2)}" y="{y+22.5}" text-anchor="middle" class="src-text mono">{E(src)}</text>')
    panel(30, 100, 400, 500, "POHON · APA YANG DITELITI", "tab AGENDA")
    panel(446, 100, 524, 238, "MATRIKS · SIAPA DENGAN SIAPA", "tab REKAP MATRIKS")
    panel(446, 352, 524, 248, "LAJUR · KAPAN", "tab PETA JALAN")
    # mini tree
    cx = 230
    o.append(f'<rect x="50" y="520" width="360" height="18" rx="4" class="soil"/>')
    o.append(f'<text x="230" y="533" text-anchor="middle" class="mini-text">W0 → W4</text>')
    for k in range(5):
        tx = 70 + k*80
        o.append(f'<path d="M{cx},538 C{cx},556 {tx},552 {tx},572" class="root" stroke-width="3"/>')
        o.append(f'<text x="{tx}" y="588" text-anchor="middle" class="mini-text mono">T{k+1}</text>')
    o.append(f'<path d="M{cx},520 L{cx},400" class="branch" stroke-width="16"/>')
    for n, key in enumerate(["s1", "s2", "s3"]):
        o.append(f'<line x1="{cx-6+n*6}" y1="518" x2="{cx-6+n*6}" y2="404" class="strand {key}" stroke-width="4"/>')
    pos = [(108, 330), (160, 210), (230, 160), (300, 210), (352, 330)]
    for n, (px, py) in enumerate(pos):
        o.append(f'<path d="M{cx},404 Q{cx + (px-cx)*0.2},{py+40} {px},{py+26}" class="branch" stroke-width="6"/>')
        o.append(f'<rect x="{px-46}" y="{py-26}" width="92" height="52" rx="14" class="p{n+1}-blob"/>')
        o.append(f'<text x="{px}" y="{py-6}" text-anchor="middle" class="mini-title p{n+1}-text">P{n+1}</text>')
        for j in range(4):
            o.append(f'<circle cx="{px-27+j*18}" cy="{py+10}" r="4.5" class="p{n+1}-bud"/>')
    # mini matrix
    gx, gy = 520, 140
    for c in range(5):
        o.append(f'<text x="{gx+30+c*76}" y="{gy}" text-anchor="middle" class="mini-text mono">T{c+1}</text>')
    for r in range(5):
        o.append(f'<text x="{gx-12}" y="{gy+26+r*36}" text-anchor="end" class="mini-text mono p{r+1}-text">P{r+1}</text>')
        for c in range(5):
            o.append(f'<rect x="{gx+c*76}" y="{gy+10+r*36}" width="62" height="28" rx="4" class="cell"/>')
            o.append(f'<text x="{gx+31+c*76}" y="{gy+29+r*36}" text-anchor="middle" class="cell-text mono">n</text>')
    # mini lanes
    lx, ly = 520, 392
    for n, (lab, w) in enumerate([("2023–25", 160), ("2026–28", 160), ("2029–30", 92)]):
        x0 = lx + [0, 166, 332][n]
        o.append(f'<path d="M{x0},{ly} L{x0+w-10},{ly} L{x0+w},{ly+12} L{x0+w-10},{ly+24} L{x0},{ly+24} L{x0+10},{ly+12} Z" class="chev{0 if n else 1}"/>')
        o.append(f'<text x="{x0+w/2+4}" y="{ly+16}" text-anchor="middle" class="mini-text strong">{lab}</text>')
    for r in range(5):
        y = ly + 36 + r*30
        o.append(f'<text x="{lx-12}" y="{y+15}" text-anchor="end" class="mini-text mono p{r+1}-text">P{r+1}</text>')
        o.append(f'<rect x="{lx}" y="{y}" width="424" height="22" rx="4" class="lane"/>')
    for (x, r) in [(560, 0), (700, 0), (610, 1), (820, 2), (650, 3), (880, 3), (740, 4)]:
        y = ly + 47 + r*30
        o.append(f'<path d="M{x},{y-7} L{x+7},{y} L{x},{y+7} L{x-7},{y} Z" class="ms"/>')
    # footer chain
    o.append('<text x="30" y="628" class="zone-label">RANTAI ACUAN YANG DITELUSURI ASESOR</text>')
    chain = ["Renstra ITS 2026–2030", "RIP & peta jalan FKK", "RIP tiap prodi", "Agenda tiap dosen"]
    bw, gap, x = 196, 34, 30
    for n, lab in enumerate(chain):
        o.append(f'<rect x="{x}" y="640" width="{bw}" height="34" rx="6" class="chain{1 if n==3 else 0}"/>')
        o.append(f'<text x="{x+bw/2}" y="662" text-anchor="middle" class="chain-text">{E(lab)}</text>')
        if n < 3:
            o.append(f'<line x1="{x+bw+4}" y1="657" x2="{x+bw+gap-8}" y2="657" class="arrow" marker-end="url(#ah)"/>')
        x += bw + gap
    o.append(f'<text x="{W-30}" y="628" text-anchor="end" class="ps-meta">Rekap per tanggal … · n dosen</text>')
    o.insert(1, '<defs><marker id="ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 Z" class="arrowhead"/></marker></defs>')
    o.append('</svg>')
    return "\n".join(o)

# ---------------------------------------------------------------- swimlane roadmap
def lajur_svg():
    W = 1040
    LX = 220
    cols = [(LX, 300, "2023–2025", "Bukti konsep · capaian"), (LX+306, 300, "2026–2028", "Pengembangan & validasi"), (LX+612, 196, "2029–2030", "Hilirisasi & penerapan")]
    lanes = [("p1", "P1 Deteksi Dini PTM", "61 penempatan luaran", "Penyakit Tidak Menular", "18 luaran di 2026", "+ isian dosen"),
             ("p2", "P2 Ibu, Anak & 1000 HPK", "35 penempatan luaran", "anak 19 + reproduksi 16", "10 luaran di 2026", "+ isian dosen"),
             ("p3", "P3 Infeksi, AMR & Ketahanan", "36 penempatan luaran", "Penyakit Menular", "8 luaran di 2026", "+ isian dosen"),
             ("p4", "P4 Trauma & Restorasi", "belum ada topik prodi", "", "dipimpin Teknologi Kedokteran", "+ isian dosen"),
             ("p5", "P5 Sistem Kes. & Pendidikan", "31 penempatan luaran", "pencegahan & pendidikan", "6 luaran di 2026", "+ isian dosen"),
             ("ilmu", "Akar ilmu dasar", "34 penempatan luaran", "Basic Science", "8 luaran di 2026", "+ isian dosen"),
             ("plat", "Platform T1–T5", "T1, T3, T4 matang", "T2, T5 rintisan", "gerbang 1 lab → gerbang 2 W3", "TKT dicatat per produk")]
    ry, rh, lh = 76, 112, 50
    H = ry + rh + 16 + len(lanes)*lh + 20
    o = [f'<svg viewBox="0 0 {W} {H}" role="img" aria-label="Peta jalan lajur dengan tiga periode yang sama dengan RIP prodi: 2023 sampai 2025, 2026 sampai 2028, 2029 sampai 2030. Baris tonggak bersama, lalu lajur lima pilar, akar ilmu dasar, dan platform, berisi jumlah luaran dari RIP Prodi Kedokteran dan Profesi Dokter.">']
    for n, (x, w, yr, t) in enumerate(cols):
        o.append(f'<path d="M{x},12 L{x+w-14},12 L{x+w},37 L{x+w-14},62 L{x},62 L{x+14},37 Z" class="chev{1 if n==1 else 0}"/>')
        o.append(f'<text x="{x+26}" y="33" class="lj-phase mono">{yr}</text>')
        o.append(f'<text x="{x+26}" y="51" class="lj-year">{E(t)}</text>')
    ms = [["FKK berdiri (Peraturan Rektor 2/2023)", "Roadmap FKK 2023–2025, edisi 1", "197 penempatan luaran dosen", "T1, T3, T4 platform matang"],
          ["SK peta jalan edisi 2 (awal 2027)", "Koas masuk RSUD 2027: W3 aktif", "Sensus dasar Desa Binaan + pembanding", "T2 & T5 menjadi platform matang"],
          ["Paket bukti izin edar", "disetujui mitra produsen", "Bukti dipakai Dinkes", "Evaluasi, lalu edisi 3"]]
    o.append(f'<text x="{LX-14}" y="{ry+26}" text-anchor="end" class="lj-lane strong">Tonggak bersama</text>')
    o.append(f'<text x="{LX-14}" y="{ry+44}" text-anchor="end" class="lj-small">ketiga prodi</text>')
    for n, (x, w, _, _) in enumerate(cols):
        o.append(f'<rect x="{x}" y="{ry}" width="{w}" height="{rh}" rx="6" class="ms-cell"/>')
        for j, line in enumerate(ms[n]):
            yy = ry + 26 + j*22
            o.append(f'<path d="M{x+16},{yy-9} L{x+21},{yy-4} L{x+16},{yy+1} L{x+11},{yy-4} Z" class="ms"/>')
            o.append(f'<text x="{x+30}" y="{yy}" class="lj-text">{E(line)}</text>')
    for r, (key, label, a1, a2, b1, b2) in enumerate(lanes):
        y = ry + rh + 16 + r*lh
        tcls = f"{key}-text" if key.startswith("p") else ""
        o.append(f'<text x="{LX-14}" y="{y+25}" text-anchor="end" class="lj-lane {tcls}">{E(label)}</text>')
        for c, (x, w, _, _) in enumerate(cols):
            o.append(f'<rect x="{x}" y="{y}" width="{w}" height="{lh-8}" rx="6" class="{"lane-data" if c == 0 else "lane-empty"}"/>')
        for c, (t1, t2) in enumerate([(a1, a2), (b1, b2)]):
            x = cols[c][0]
            o.append(f'<text x="{x+14}" y="{y+18}" class="lj-text strong">{E(t1)}</text>')
            if t2:
                o.append(f'<text x="{x+14}" y="{y+34}" class="lj-small">{E(t2)}</text>')
        x = cols[2][0]
        o.append(f'<text x="{x+14}" y="{y+26}" class="lj-placeholder">{"target TKT 6–7" if key == "plat" else "target ditetapkan bersama SK"}</text>')
    o.append('</svg>')
    return "\n".join(o)

# ---------------------------------------------------------------- matrix read two ways (§5.6)
# Cell content = topics of §5.1 whose "Platform utama" lists that platform.
CELLS = {
  (0, 0): "1.1", (0, 1): "1.1, 1.3, 1.5", (0, 2): "1.2, 1.3, 1.5", (0, 4): "1.2, 1.4",
  (1, 0): "2.3", (1, 1): "2.2, 2.4", (1, 2): "2.1", (1, 4): "2.1, 2.2",
  (2, 1): "3.2", (2, 2): "3.2, 3.3", (2, 4): "3.1, 3.3, 3.4",
  (3, 0): "4.3", (3, 3): "4.1, 4.2, 4.3", (3, 4): "4.4",
  (4, 2): "5.2", (4, 4): "5.1, 5.2, 5.4",
}
PILAR_SHORT = ["P1 Deteksi Dini PTM", "P2 Ibu, Anak & 1000 HPK", "P3 Infeksi & AMR", "P4 Trauma & Restorasi", "P5 Sistem & Pendidikan"]
JALUR = [("A", 3, 0, "EEG", "P4 × T1 · neurorehabilitasi", "W0 → W3 → W4"),
         ("B", 0, 1, "E-nose diabetes", "P1 × T2 · skrining napas", "W0 → W3 → W4"),
         ("C", 3, 3, "Bone plate & prostesis", "P4 × T4 · implan & prostesis", "W0 → W3")]

def duaarah_svg():
    W, H = 1040, 560
    gx, gy, cw, ch, gap = 200, 92, 100, 52, 8
    o = [f'<svg viewBox="0 0 {W} {H}" role="img" aria-label="Matriks lima pilar kali lima platform yang dibaca dua arah. Dibaca per baris, pilar P1 sampai P5 menjadi peta jalan Prodi Kedokteran dan Profesi Dokter. Dibaca per kolom, platform T1 sampai T5 menjadi peta jalan Prodi Teknologi Kedokteran. Isi sel adalah kode topik. Tiga contoh jalur tiga prodi ditandai: A EEG di P4 kali T1, B e-nose diabetes di P1 kali T2, C bone plate dan prostesis di P4 kali T4.">']
    o.append('<defs><marker id="ah4" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 Z" class="da-head"/></marker></defs>')
    o.append(f'<text x="20" y="24" class="zone-label">SATU MATRIKS · DUA PETA JALAN</text>')
    short = ["Biosinyal", "Biosensor", "AI & citra", "Biomaterial", "Telematika"]
    for c, (code, name) in enumerate(zip([p[0] for p in PLATFORM], short)):
        x = gx + c*(cw+gap) + cw/2
        o.append(f'<text x="{f(x)}" y="58" text-anchor="middle" class="root-code mono">{code}</text>')
        o.append(f'<text x="{f(x)}" y="76" text-anchor="middle" class="da-colname">{E(name)}</text>')
    gend = gx + 5*(cw+gap) - gap
    ry = gy + 3*(ch+gap) + ch/2
    cx = gx + 1*(cw+gap) + cw/2
    o.append(f'<line x1="{gx-4}" y1="{f(ry)}" x2="{gend+26}" y2="{f(ry)}" class="da-arrow" marker-end="url(#ah4)"/>')
    o.append(f'<line x1="{f(cx)}" y1="{gy-8}" x2="{f(cx)}" y2="{gy+5*(ch+gap)+18}" class="da-arrow" marker-end="url(#ah4)"/>')
    for r in range(5):
        y = gy + r*(ch+gap)
        o.append(f'<text x="{gx-12}" y="{y+ch/2+5}" text-anchor="end" class="lj-lane p{r+1}-text">{E(PILAR_SHORT[r])}</text>')
        for c in range(5):
            x = gx + c*(cw+gap)
            txt = CELLS.get((r, c))
            if r == 3:
                cls = "da-row"
            elif c == 1:
                cls = "da-col"
            else:
                cls = "cell" if txt else "lane-empty"
            if txt is None and cls != "lane-empty":
                cls += " da-dash"
            o.append(f'<rect x="{x}" y="{y}" width="{cw}" height="{ch}" rx="6" class="{cls}"/>')
            if txt:
                o.append(f'<text x="{f(x+cw/2)}" y="{y+ch/2+5}" text-anchor="middle" class="da-cell mono">{txt}</text>')
    for letter, r, c, *_ in JALUR:
        bx = gx + c*(cw+gap) + cw - 4
        by = gy + r*(ch+gap) + 4
        o.append(f'<circle cx="{bx}" cy="{by}" r="11" class="da-badge"/>')
        o.append(f'<text x="{bx}" y="{by+4.5}" text-anchor="middle" class="da-badge-t">{letter}</text>')
    # two reading boxes below the grid
    by0 = gy + 5*(ch+gap) + 34
    boxes = [("→  PER BARIS", "Sarjana Kedokteran · Profesi Dokter", ["Pilar P1–P5 · luaran per topik", "Tulang ikan per topik (sudah ada)"]),
             ("↓  PER KOLOM", "Prodi Teknologi Kedokteran", ["Platform T1–T5 · TKT per produk · wahana", "Tulang ikan atau lajur bergerbang"])]
    for n, (k, who, lines) in enumerate(boxes):
        x = 20 + n*360
        o.append(f'<rect x="{x}" y="{by0}" width="340" height="104" rx="8" class="da-box"/>')
        o.append(f'<text x="{x+16}" y="{by0+24}" class="zone-label">{E(k)}</text>')
        o.append(f'<text x="{x+16}" y="{by0+46}" class="cw-name strong">{E(who)}</text>')
        for j, ln in enumerate(lines):
            o.append(f'<text x="{x+16}" y="{by0+68+j*18}" class="lj-text">{E(ln)}</text>')
    # three example paths, right column
    px = 790
    o.append(f'<text x="{px}" y="58" class="zone-label">CONTOH JALUR TIGA PRODI</text>')
    for n, (letter, r, c, name, coord, wah) in enumerate(JALUR):
        y = 92 + n*132
        o.append(f'<rect x="{px-10}" y="{y-6}" width="250" height="118" rx="8" class="da-box"/>')
        o.append(f'<circle cx="{px+8}" cy="{y+14}" r="11" class="da-badge"/>')
        o.append(f'<text x="{px+8}" y="{y+18.5}" text-anchor="middle" class="da-badge-t">{letter}</text>')
        o.append(f'<text x="{px+28}" y="{y+19}" class="cw-name strong">{E(name)}</text>')
        o.append(f'<text x="{px+4}" y="{y+44}" class="lj-text mono">{E(coord)}</text>')
        o.append(f'<text x="{px+4}" y="{y+64}" class="lj-text">{E(wah)}</text>')
        for (key, lab), (offx, offy) in zip([("s3", "Teknologi Kedokteran"), ("s2", "Profesi Dokter"), ("s1", "Sarjana")], ((0, 0), (0, 18), (120, 18))):
            sx = px + 4 + offx
            o.append(f'<rect x="{sx}" y="{y+76+offy}" width="16" height="9" rx="4.5" class="{key}-sw"/>')
            o.append(f'<text x="{sx+21}" y="{y+85+offy}" class="lj-small">{lab}</text>')
    o.append('</svg>')
    return "\n".join(o)

# ---------------------------------------------------------------- Tekdok fishbone skeleton (§5.6)
SERVES = {"T1": ["p1", "p2", "p4"], "T2": ["p1", "p2", "p3"], "T3": ["p1", "p2", "p3", "p5"], "T4": ["p4"], "T5": ["p1", "p2", "p3", "p4", "p5"]}

def ikan_svg():
    W, H, SY = 1040, 530, 270
    o = [f'<svg viewBox="0 0 {W} {H}" role="img" aria-label="Kerangka kosong tulang ikan Prodi Teknologi Kedokteran: ekor 2023, kepala 2030 Kedokteran Pencegahan 4.0 yang sama dengan tulang ikan prodi kedokteran, lima tulang T1 sampai T5 berselang di atas dan di bawah duri. Setiap tulang punya tiga ruas periode 2023 sampai 2025, 2026 sampai 2028, 2029 sampai 2030, masing-masing berisi tempat untuk judul, TKT, dan wahana. Label di tiap tulang menunjukkan pilar yang dilayani.">']
    o.append('<text x="20" y="20" class="zone-label">TULANG IKAN · PRODI TEKNOLOGI KEDOKTERAN · KERANGKA KOSONG</text>')
    o.append(f'<line x1="104" y1="{SY}" x2="896" y2="{SY}" class="ik-spine"/>')
    o.append(f'<path d="M36,{SY-44} L108,{SY} L36,{SY+44} Z" class="ik-tail"/>')
    o.append(f'<text x="62" y="{SY+5}" text-anchor="middle" class="ik-year mono">2023</text>')
    o.append(f'<path d="M890,{SY-64} C982,{SY-64} 1028,{SY-30} 1028,{SY} C1028,{SY+30} 982,{SY+64} 890,{SY+64} Z" class="ik-head"/>')
    o.append(f'<text x="952" y="{SY-12}" text-anchor="middle" class="ik-year mono">2030</text>')
    o.append(f'<text x="952" y="{SY+8}" text-anchor="middle" class="ik-headt">Kedokteran</text>')
    o.append(f'<text x="952" y="{SY+25}" text-anchor="middle" class="ik-headt">Pencegahan 4.0</text>')
    o.append(f'<text x="1020" y="{SY+88}" text-anchor="end" class="lj-small">hasil keilmuan Teknologi Kedokteran: teknologi teruji</text>')
    o.append(f'<text x="1020" y="{SY+104}" text-anchor="end" class="lj-small">untuk diagnosis, pencegahan, pemulihan fungsi</text>')
    bones = [("T1", 330, -1), ("T2", 465, 1), ("T3", 600, -1), ("T4", 735, 1), ("T5", 870, -1)]
    names = dict(PLATFORM)
    periods = ["2023–2025", "2026–2028", "2029–2030"]
    for code, jx, side in bones:
        y0 = SY - 198 if side < 0 else SY + 198
        x0 = jx - 120
        o.append(f'<line x1="{x0}" y1="{y0}" x2="{jx}" y2="{SY}" class="ik-bone"/>')
        ly = y0 - 32 if side < 0 else y0 + 24
        o.append(f'<text x="{x0}" y="{ly}" class="ik-code"><tspan class="mono strong">{code}</tspan> {E(names[code])}</text>')
        pills = " ".join(f'<tspan class="mono strong {p}-text">{p.upper()}</tspan>' for p in SERVES[code])
        o.append(f'<text x="{x0}" y="{ly+18}" class="lj-small">pilar terkait {pills}</text>')
        for k, t in enumerate((0.2, 0.5, 0.8)):
            px = x0 + 120*t
            py = y0 + (SY - y0)*t
            bx = px - 132
            o.append(f'<circle cx="{f(px)}" cy="{f(py)}" r="3" class="ik-joint"/>')
            o.append(f'<line x1="{f(bx+124)}" y1="{f(py)}" x2="{f(px)}" y2="{f(py)}" class="ik-rib"/>')
            o.append(f'<rect x="{f(bx)}" y="{f(py-15)}" width="124" height="30" rx="5" class="lane-empty"/>')
            o.append(f'<text x="{f(bx+8)}" y="{f(py-2)}" class="ik-per mono">{periods[k]}</text>')
            o.append(f'<text x="{f(bx+8)}" y="{f(py+11)}" class="lj-placeholder ik-ph">judul · TKT · W</text>')
    o.append('</svg>')
    return "\n".join(o)

# ---------------------------------------------------------------- Tekdok stage-gate swimlane skeleton (§5.6 pilihan B)
def gerbang_svg():
    W, H = 1100, 470
    LX, TOP, LH = 230, 92, 64
    cols = [(LX, 230, "2023–2025", "rekam jejak · garis dasar"), (LX + 242, 270, "2026–2028", "pengembangan & validasi"), (LX + 524, 200, "2029–2030", "hilirisasi & penerapan")]
    o = [f'<svg viewBox="0 0 {W} {H}" role="img" aria-label="Kerangka kosong peta lajur bergerbang Prodi Teknologi Kedokteran: lima lajur T1 sampai T5 melintasi tiga periode 2023 sampai 2025, 2026 sampai 2028, 2029 sampai 2030. Gerbang 1 uji laboratorium dan telaah etik, gerbang 2 validasi di RSUD atau Desa Binaan dan kekayaan intelektual. Muara 2030 Kedokteran Pencegahan 4.0.">']
    o.append('<text x="20" y="20" class="zone-label">LAJUR BERGERBANG · PRODI TEKNOLOGI KEDOKTERAN · KERANGKA KOSONG (PILIHAN B)</text>')
    for n, (x, w, yr, t) in enumerate(cols):
        o.append(f'<path d="M{x},34 L{x+w-14},34 L{x+w},57 L{x+w-14},80 L{x},80 L{x+14},57 Z" class="chev{1 if n == 1 else 0}"/>')
        o.append(f'<text x="{x+26}" y="54" class="lj-phase mono">{yr}</text>')
        o.append(f'<text x="{x+26}" y="71" class="lj-year">{E(t)}</text>')
    names = dict(PLATFORM)
    for r, (code, _) in enumerate(PLATFORM):
        y = TOP + r * LH
        o.append(f'<text x="{LX-14}" y="{y+24}" text-anchor="end" class="lj-lane"><tspan class="mono strong">{code}</tspan> {E(names[code])}</text>')
        pills = " ".join(f'<tspan class="mono strong {p}-text">{p.upper()}</tspan>' for p in SERVES[code])
        o.append(f'<text x="{LX-14}" y="{y+41}" text-anchor="end" class="lj-small">pilar terkait {pills}</text>')
        for c, (x, w, _, _) in enumerate(cols):
            o.append(f'<rect x="{x}" y="{y}" width="{w}" height="{LH-12}" rx="6" class="lane-empty"/>')
            o.append(f'<text x="{x+12}" y="{y+22}" class="lj-placeholder">judul · TKT · W</text>')
            o.append(f'<text x="{x+12}" y="{y+39}" class="lj-small">bukti: laporan uji / TA / KI</text>')
    gy0, gy1 = TOP - 6, TOP + 5 * LH - 6
    for k, (gx, lab) in enumerate([(LX + 236, "GERBANG 1 · uji lab & telaah etik"), (LX + 518, "GERBANG 2 · validasi RSUD/Desa & KI")]):
        o.append(f'<line x1="{gx}" y1="{gy0}" x2="{gx}" y2="{gy1}" class="gate"/>')
        o.append(f'<text x="{gx}" y="{gy1+20}" text-anchor="middle" class="gate-t">{E(lab)}</text>')
    hx = LX + 524 + 200 + 14
    o.append(f'<rect x="{hx}" y="{TOP}" width="{W-hx-12}" height="{5*LH-12}" rx="10" class="ik-head"/>')
    for i, line in enumerate(["2030", "Kedokteran", "Pencegahan 4.0", "", "hasil keilmuan:", "teknologi", "teruji"]):
        if line:
            o.append(f'<text x="{(hx+W-12)/2}" y="{TOP+120+i*18}" text-anchor="middle" class="{"ik-year mono" if i == 0 else ("ik-headt" if i < 3 else "lj-small")}">{E(line)}</text>')
    o.append('</svg>')
    return "\n".join(o)

RULES = [
  ("Tiga tingkat di gambar", "Visi, pilar, topik. Subtopik dan judul penelitian tinggal di tabel dan di instrumen isian."),
  ("Lima cabang, paling banyak empat ranting", "Dua puluh ranting adalah batas atas. Pilar yang baru punya dua ranting aktif cukup digambar dua."),
  ("Ranting hidup kalau ada timnya", "Usulan: paling sedikit dua dosen tercatat di instrumen, sebagai ketua atau anggota. Ranting tanpa tim tetap digambar sebagai tunas dan menjadi peta rekrutmen."),
  ("Kode sama di semua dokumen", "1.1–5.4, T1–T5, dan W0–W4 dipakai persis sama di poster, RIP, instrumen, dan formulir skripsi/TA."),
  ("Warna dikunci", "Lima warna pilar dipakai sama di poster, slide, dan lampiran. Prodi dibedakan di batang, tidak di cabang."),
  ("Struktur lima tahun, isi setahun", "Cabang tetap sampai evaluasi 2030 yang melahirkan edisi 3. Status ranting diperbarui di setiap rekap tahunan sebagai bagian siklus PPEPP."),
]

def rules_html():
    return "\n".join(f'<li><h3>{E(t)}</h3><p>{E(d)}</p></li>' for t, d in RULES)

CSS = r"""
:root{
  /* Layout: one reading column (max 1080px); diagrams sit full-width in their own horizontal scroll boxes; gallery 3 → 2 → 1 columns */
  --bg:#F3F6F4; --surface:#FFFFFF; --ink:#16211B; --muted:#55645B; --line:#CCD6CF; --accent:#1D4F91; --accent-soft:#E1E9F5;
  --p1:#AE3F57; --p1t:#F8E5E9; --p2:#9E5F12; --p2t:#F8ECDA; --p3:#2F7A43; --p3t:#E0EFE3; --p4:#2A63A3; --p4t:#DFE9F6; --p5:#6C4CA0; --p5t:#ECE6F6;
  --s1:#6B5641; --s2:#A3825F; --s3:#4E6578; --bark:#6B5641; --bark-hi:#8E7559; --root:#8A7A66; --soil:#E9E4D9; --soil-line:#CBC1AF;
  --use:#1D4F91; --use-bg:#E1E9F5; --aux:#55645B; --aux-bg:#E8EDE9; --opt:#8A5A12; --opt-bg:#F6ECDA; --no:#8E3A3A; --no-bg:#F5E3E3;
  --font-display:'Bricolage Grotesque','Segoe UI',system-ui,sans-serif; --font-body:'Inter',system-ui,-apple-system,'Segoe UI',sans-serif; --font-mono:'IBM Plex Mono',ui-monospace,'SFMono-Regular',Menlo,monospace;
}
@media (prefers-color-scheme: dark){ :root:not([data-theme="light"]){
  --bg:#111713; --surface:#18201B; --ink:#E3EAE5; --muted:#9BAAA1; --line:#2E3A33; --accent:#8FB5EC; --accent-soft:#1D2A3B;
  --p1:#E98DA0; --p1t:#38222A; --p2:#E2A85F; --p2t:#372B1B; --p3:#80C792; --p3t:#1C3123; --p4:#86B3EA; --p4t:#1B293A; --p5:#B79DE3; --p5t:#2A2240;
  --s1:#A58C70; --s2:#D2B595; --s3:#92A8BC; --bark:#A58C70; --bark-hi:#C4AA8C; --root:#8F826F; --soil:#29261F; --soil-line:#45403A;
  --use:#8FB5EC; --use-bg:#1D2A3B; --aux:#A9B7AE; --aux-bg:#232C26; --opt:#E2B067; --opt-bg:#33291A; --no:#EE9C9C; --no-bg:#3A2222; color-scheme:dark }}
:root[data-theme="dark"]{
  --bg:#111713; --surface:#18201B; --ink:#E3EAE5; --muted:#9BAAA1; --line:#2E3A33; --accent:#8FB5EC; --accent-soft:#1D2A3B;
  --p1:#E98DA0; --p1t:#38222A; --p2:#E2A85F; --p2t:#372B1B; --p3:#80C792; --p3t:#1C3123; --p4:#86B3EA; --p4t:#1B293A; --p5:#B79DE3; --p5t:#2A2240;
  --s1:#A58C70; --s2:#D2B595; --s3:#92A8BC; --bark:#A58C70; --bark-hi:#C4AA8C; --root:#8F826F; --soil:#29261F; --soil-line:#45403A;
  --use:#8FB5EC; --use-bg:#1D2A3B; --aux:#A9B7AE; --aux-bg:#232C26; --opt:#E2B067; --opt-bg:#33291A; --no:#EE9C9C; --no-bg:#3A2222; color-scheme:dark }
*{box-sizing:border-box}
body{background:var(--bg);color:var(--ink);font-family:var(--font-body);font-size:16px;line-height:1.55;margin:0}
.wrap{max-width:1080px;margin:0 auto;padding-left:max(16px,env(safe-area-inset-left,0px));padding-right:max(16px,env(safe-area-inset-right,0px));padding-block:40px 64px;display:grid;gap:56px}
h1,h2,h3{font-family:var(--font-display);text-wrap:balance;margin:0;line-height:1.15}
h1{font-size:clamp(2rem,4.6vw,3.1rem);font-weight:700;letter-spacing:-.01em}
h2{font-size:clamp(1.4rem,2.6vw,1.85rem);font-weight:650}
h3{font-size:1.06rem;font-weight:650}
p{margin:0}
.eyebrow{font-family:var(--font-mono);font-size:.78rem;letter-spacing:.08em;text-transform:uppercase;color:var(--muted)}
.hero{display:grid;gap:18px}
.lead{font-size:1.12rem;max-width:66ch;color:var(--ink)}
.trio{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;margin-top:8px}
.trio div{border-top:3px solid var(--accent);padding-top:12px;display:grid;gap:4px;min-width:0}
.trio .q{font-family:var(--font-mono);font-size:.78rem;letter-spacing:.06em;text-transform:uppercase;color:var(--accent)}
.trio strong{font-family:var(--font-display);font-size:1.15rem}
.trio span{color:var(--muted);font-size:.95rem}
section{display:grid;gap:18px}
.sec-intro{max-width:68ch;color:var(--muted)}
.grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}
.card{background:var(--surface);border:1px solid var(--line);border-radius:12px;padding:16px;display:grid;gap:10px;align-content:start;min-width:0}
.thumb-wrap{background:var(--bg);border-radius:8px;padding:8px 12px}
.thumb{display:block;width:100%;height:auto;max-height:150px}
.card-head{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:8px}
.card-what{font-size:.95rem}
.card-dl{display:grid;grid-template-columns:auto 1fr;gap:4px 12px;margin:0;font-size:.9rem}
.card-dl dt{color:var(--muted);font-weight:500}
.card-dl dd{margin:0}
.pill{font-size:.75rem;font-weight:600;padding:3px 10px;border-radius:999px;white-space:nowrap}
.pill-use{color:var(--use);background:var(--use-bg)} .pill-aux{color:var(--aux);background:var(--aux-bg)}
.pill-opt{color:var(--opt);background:var(--opt-bg)} .pill-no{color:var(--no);background:var(--no-bg)}
figure{margin:0;display:grid;gap:12px}
.scroll{overflow-x:auto;background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:16px}
.scroll svg{display:block;width:100%;min-width:760px;height:auto;color:var(--ink)}
figcaption{color:var(--muted);font-size:.95rem;max-width:72ch}
.notes{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}
.notes div{min-width:0;display:grid;gap:4px;align-content:start}
.notes .k{font-family:var(--font-mono);font-size:.78rem;letter-spacing:.06em;text-transform:uppercase;color:var(--muted)}
.rules{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px 28px;counter-reset:r}
.rules li{counter-increment:r;display:grid;grid-template-columns:2.2rem 1fr;gap:2px 10px;padding-block:12px;border-top:1px solid var(--line);min-width:0}
.rules li::before{content:counter(r);grid-row:span 2;font-family:var(--font-mono);font-size:.9rem;color:var(--accent);padding-top:2px}
.rules p{color:var(--muted);font-size:.95rem}
.foot{color:var(--muted);font-size:.88rem;border-top:1px solid var(--line);padding-top:16px;max-width:80ch}
@media (max-width:860px){.grid{grid-template-columns:repeat(2,minmax(0,1fr))}.notes{grid-template-columns:1fr}}
@media (max-width:560px){.grid,.trio,.rules{grid-template-columns:1fr}.wrap{gap:44px}}
/* svg classes */
svg text{font-family:var(--font-body);fill:var(--ink)}
.mono{font-family:var(--font-mono)} .strong{font-weight:600}
.branch{fill:none;stroke:var(--bark);stroke-linecap:round}
.branch-hi{fill:none;stroke:var(--bark-hi);stroke-linecap:round;opacity:.55}
.bark{fill:var(--bark)}
.strand-gap{stroke:var(--surface);stroke-linecap:butt}
.strand{stroke-linecap:round}
.strand.s1{stroke:var(--s1)} .strand.s2{stroke:var(--s2)} .strand.s3{stroke:var(--s3)}
.s1-sw{fill:var(--s1)} .s2-sw{fill:var(--s2)} .s3-sw{fill:var(--s3)}
.root{fill:none;stroke:var(--root);stroke-linecap:round}
.root-tip{fill:var(--root)}
.root-code{font-size:14px;font-weight:600}
.root-name{font-size:12.5px;fill:var(--muted)}
.soil{fill:var(--soil);stroke:var(--soil-line)}
.soil-sep{stroke:var(--soil-line)}
.soil-text{font-size:12.5px}
.zone-label{font-family:var(--font-mono);font-size:11.5px;letter-spacing:.08em;fill:var(--muted)}
.visi{font-family:var(--font-display);font-size:21px;font-weight:700}
.visi-sub{font-size:13px;fill:var(--muted)}
.blob-tag{font-size:10.5px;fill:var(--muted)}
.root-dh{font-size:11.5px;fill:var(--accent);font-weight:600}
.cw-sub{font-size:12px;fill:var(--muted)}
.cw-left{fill:var(--surface);stroke:var(--line)}
.cw-root{fill:var(--soil);stroke:var(--soil-line)}
.cw-dashbox{stroke-dasharray:5 4}
.cw-name{font-size:14px;font-weight:500}
.cw-num{font-size:12px;fill:var(--muted)}
.cw-link{fill:none;stroke:var(--muted);stroke-width:1.6}
.cw-dash{stroke-dasharray:5 5}
.cw-lab{font-size:11.5px;fill:var(--muted);font-style:italic}
.lane-data{fill:var(--bg);stroke:var(--line)}
.legend-text{font-size:13px}
.leader{stroke:var(--muted);stroke-dasharray:2 4}
.blob-title{font-family:var(--font-display);font-size:14.5px;font-weight:650}
.blob-line{font-size:12.5px}
.p1-blob{fill:var(--p1t);stroke:var(--p1)} .p2-blob{fill:var(--p2t);stroke:var(--p2)} .p3-blob{fill:var(--p3t);stroke:var(--p3)} .p4-blob{fill:var(--p4t);stroke:var(--p4)} .p5-blob{fill:var(--p5t);stroke:var(--p5)}
svg .p1-text{fill:var(--p1)} svg .p2-text{fill:var(--p2)} svg .p3-text{fill:var(--p3)} svg .p4-text{fill:var(--p4)} svg .p5-text{fill:var(--p5)}
.p1-bud{fill:var(--surface);stroke:var(--p1);stroke-width:1.6} .p2-bud{fill:var(--surface);stroke:var(--p2);stroke-width:1.6} .p3-bud{fill:var(--surface);stroke:var(--p3);stroke-width:1.6} .p4-bud{fill:var(--surface);stroke:var(--p4);stroke-width:1.6} .p5-bud{fill:var(--surface);stroke:var(--p5);stroke-width:1.6}
.p1-leaf{fill:var(--p1)} .p2-leaf{fill:var(--p2)} .p3-leaf{fill:var(--p3)} .p4-leaf{fill:var(--p4)} .p5-leaf{fill:var(--p5)}
[class$="-vein"]{stroke:var(--surface);stroke-width:1.2;opacity:.7}
/* thumbnails */
.th-stroke{stroke:var(--bark)} .th-line{stroke:var(--muted);stroke-width:1.4}
.th-soft{fill:var(--accent-soft)} .th-edge{stroke:var(--accent);stroke-width:1.2}
.th-accent{fill:var(--accent)} .th-faint{fill:var(--line)} .th-dot{fill:var(--accent)}
.th-text{font-family:var(--font-mono);font-size:10px;fill:var(--muted)}
/* poster */
.paper{fill:var(--bg);stroke:var(--line);stroke-width:1.5}
.ps-title{font-family:var(--font-display);font-size:24px;font-weight:700}
.ps-sub{font-size:14px;fill:var(--muted)}
.ps-meta{font-size:12.5px;fill:var(--muted)}
.ps-rule{stroke:var(--line);stroke-width:1.5}
.ps-panel{fill:var(--surface);stroke:var(--line)}
.src-pill{fill:var(--accent-soft)} .src-text{font-size:11px;fill:var(--accent)}
.mini-text{font-size:12px} .mini-title{font-family:var(--font-display);font-size:14px;font-weight:650}
.mini-note{font-size:12px;fill:var(--muted);font-style:italic}
.cell{fill:var(--bg);stroke:var(--line)} .cell-text{font-size:12px;fill:var(--muted)}
.chev0{fill:var(--accent-soft)} .chev1{fill:var(--accent-soft);stroke:var(--accent);stroke-width:1.5}
.lane{fill:var(--bg);stroke:var(--line)}
.ms{fill:var(--accent)}
.chain0{fill:var(--surface);stroke:var(--line)} .chain1{fill:var(--accent-soft);stroke:var(--accent)}
.chain-text{font-size:13px;font-weight:500}
.arrow{stroke:var(--muted);stroke-width:1.5} .arrowhead{fill:var(--muted)}
/* lajur */
.lj-phase{font-family:var(--font-display);font-size:15px;font-weight:650}
.lj-year{font-size:12px;fill:var(--muted)}
.lj-lane{font-size:13.5px;font-weight:500}
.lj-text{font-size:12.5px}
.lj-small{font-size:11.5px;fill:var(--muted)}
.lj-tag{font-size:11px;letter-spacing:.08em;font-weight:600;fill:var(--p1)}
.lj-placeholder{font-size:12px;fill:var(--muted);font-style:italic}
.ms-cell{fill:var(--accent-soft);stroke:none;opacity:.9}
.lane-empty{fill:none;stroke:var(--line);stroke-dasharray:4 4}
/* dua arah & tulang ikan Tekdok */
.da-colname{font-size:12px;fill:var(--muted)}
.da-row{fill:var(--p4t);stroke:var(--p4)} .da-col{fill:var(--accent-soft);stroke:var(--accent)}
.da-dash{stroke-dasharray:4 4}
.da-cell{font-size:12px}
.da-arrow{stroke:var(--accent);stroke-width:2.2;opacity:.75}
.da-head{fill:var(--accent)}
.da-badge{fill:var(--ink)} svg .da-badge-t{fill:var(--surface);font-size:12px;font-weight:600}
.da-box{fill:var(--surface);stroke:var(--line)}
.ik-spine{stroke:var(--s3);stroke-width:5;stroke-linecap:round}
.ik-tail{fill:var(--accent-soft);stroke:var(--s3);stroke-width:1.5}
.ik-head{fill:var(--accent-soft);stroke:var(--accent);stroke-width:1.5}
.ik-year{font-size:14px;font-weight:600}
.ik-headt{font-family:var(--font-display);font-size:13px;font-weight:650}
.ik-bone{stroke:var(--s3);stroke-width:2.2;stroke-linecap:round}
.ik-code{font-size:13px}
.ik-joint{fill:var(--s3)} .ik-rib{stroke:var(--line);stroke-width:1.2}
.ik-per{font-size:10.5px;fill:var(--muted)}
.ik-ph{font-size:11px}
.gate{stroke:var(--p1);stroke-width:2;stroke-dasharray:6 4} .gate-t{font-size:11.5px;font-weight:600;fill:var(--p1)}
@media (prefers-reduced-motion:no-preference){.card{transition:border-color .2s}.card:hover{border-color:var(--accent)}}
"""

PAGE = f"""<title>Bentuk Pohon Penelitian FKK ITS</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,650;12..96,700&family=IBM+Plex+Mono:wght@400;500;600&family=Inter:wght@400;500;600&display=swap">
<style>{CSS}</style>
<main class="wrap">
<header class="hero">
  <p class="eyebrow">FKK ITS · RIP &amp; Peta Jalan Penelitian · draf kerja 23 November 2026</p>
  <h1>Bentuk Pohon Penelitian FKK ITS</h1>
  <p class="lead">Asesor menelusuri tiga hal: apa yang diteliti, siapa bekerja dengan siapa, dan kapan hasilnya keluar. Satu gambar tidak sanggup menjawab ketiganya dengan rapi. Usulannya tiga bentuk di tingkat fakultas yang saling merujuk dan memakai kode yang sama. Tulang ikan yang sudah dipakai prodi tetap dipertahankan di tingkat prodi.</p>
  <div class="trio">
    <div><span class="q">Apa</span><strong>Pohon</strong><span>Identitas fakultas dalam satu gambar: visi, lima pilar, dua puluh satu topik.</span></div>
    <div><span class="q">Siapa dengan siapa</span><strong>Matriks</strong><span>Lima pilar × lima platform, dibaca dua arah: baris untuk prodi kedokteran, kolom untuk Teknologi Kedokteran.</span></div>
    <div><span class="q">Kapan</span><strong>Lajur</strong><span>Tiga periode 2023–2030, sama dengan RIP prodi, dengan tonggak bersama ketiga prodi.</span></div>
  </div>
</header>

<section aria-labelledby="g">
  <h2 id="g">Enam pola yang lazim</h2>
  <p class="sec-intro">Pola-pola ini sering dipakai pada dokumen RIP dan Renstra perguruan tinggi, termasuk dua yang sudah dipakai paparan Prodi Kedokteran &amp; Profesi Dokter. Labelnya menunjukkan usulan pemakaian di FKK ITS.</p>
  <div class="grid">
{gallery_html()}
  </div>
</section>

<section aria-labelledby="c">
  <h2 id="c">Dari tulang ikan prodi ke pohon fakultas</h2>
  <p class="sec-intro">RIP Prodi Kedokteran &amp; Profesi Dokter 2026–2030 sudah memetakan seluruh judul dosen ke tujuh topik. Pohon fakultas tidak menggantinya. Lima topik penyakit dan kebijakan menjadi lima pilar, Basic Science menjadi akar ilmu, dan Digital Health menjadi platform.</p>
  <figure>
    <div class="scroll">{cross_svg()}</div>
    <figcaption>Angka luaran dari Tabel 3–14 RIP prodi (draf); totalnya sama dengan Tabel 17: 197 luaran pada 2023–2025 dan 50 pada 2026. Satu judul bisa tercatat di dua topik. Onkologi &amp; skrining kanker adalah subtopik terbesar (23 luaran di PTM, ditambah 13 kanker serviks dan payudara–ovarium di KSR), karena itu ditambahkan ranting 1.5 Skrining &amp; deteksi dini kanker (24 November 2026), sebelum instrumen beredar.</figcaption>
  </figure>
</section>

<section aria-labelledby="t">
  <h2 id="t">Usulan pohon: tiga prodi, satu batang</h2>
  <p class="sec-intro">Isi pohon diambil dari draf §5.1–5.5. Bentuknya pohon diagram: tajuk berupa lima kelompok topik yang tersusun rapi sebagai pengganti daun lepas yang sulit dibaca. Baris kecil di bawah nama pilar menunjukkan topik RIP prodi yang masuk ke sana.</p>
  <figure>
    <div class="scroll">{tree_svg()}</div>
    <figcaption>Lingkaran kosong di depan tiap topik diisi setelah rekap isian dosen Januari 2027: penuh untuk ranting yang sudah punya tim, garis saja untuk tunas yang belum punya tim. Pada layar sempit, geser gambar ke samping.</figcaption>
  </figure>
  <div class="notes">
    <div><span class="k">Batang</span><p>Tiga prodi dipilin menjadi satu batang. Pesannya: satu visi fakultas, tiga prodi yang menumbuhkannya bersama. Prodi dibedakan di batang saja, sehingga cabang tetap milik bersama.</p></div>
    <div><span class="k">Akar</span><p>Ilmu kedokteran dasar menjadi akar tunggang. Platform T1–T5 menjadi akar samping karena dipakai lintas pilar; Digital Health prodi berada di T3 dan T5. Pilar berbicara ke Dinkes, RSUD, dan pemberi dana; platform memegang alat dan anggaran modal (keputusan K2).</p></div>
    <div><span class="k">Tanah</span><p>Wahana W0–W4 adalah tempat pohon diuji, dari laboratorium sampai Desa Binaan. Perpindahan sebuah topik dari W0 ke W4 adalah bukti integrasi yang paling mudah ditunjukkan.</p></div>
  </div>
</section>

<section aria-labelledby="da">
  <h2 id="da">Matriks dibaca dua arah: tiga prodi setara</h2>
  <p class="sec-intro">Matriks yang sama dibaca dari dua arah. Per baris, pilar menjadi lembar pandang Prodi Sarjana Kedokteran dan Profesi Dokter. Per kolom, platform menjadi peta jalan Prodi Teknologi Kedokteran, dengan pertanyaan keilmuannya sendiri dan TKT per produk. Satu proyek punya satu identitas di register fakultas dan dihitung sekali. Isi sel adalah kode topik dari draf §5.1.</p>
  <figure>
    <div class="scroll">{duaarah_svg()}</div>
    <figcaption>Baris P4 dan kolom T2 diwarnai sebagai contoh cara membaca. Sel bergaris putus belum punya topik dan menjadi peta rekrutmen. Huruf A, B, C menandai tiga contoh jalur tiga prodi dari draf §5.6. Contoh itu cara membaca, bukan penugasan.</figcaption>
  </figure>
  <figure>
    <div class="scroll">{ikan_svg()}</div>
    <figcaption>Pilihan A — kerangka tulang ikan untuk Prodi Teknologi Kedokteran. Kepalanya sama dengan tulang ikan prodi kedokteran, karena tujuannya satu, dengan sublabel hasil keilmuan Tekdok. Tiap tulang dibagi tiga ruas periode, sehingga tahun terbaca dari posisinya. Ruas diisi judul, TKT per produk, dan wahana; kerangka ini sengaja kosong.</figcaption>
  </figure>
  <figure>
    <div class="scroll">{gerbang_svg()}</div>
    <figcaption>Pilihan B — lajur bergerbang. Lima lajur platform melintasi tiga periode dengan dua gerbang uji. Bentuk ini lazim di manajemen riset rekayasa dan paling mudah diperbarui dari rekap platform. Kaprodi Teknologi Kedokteran memilih salah satu dari dua pilihan ini.</figcaption>
  </figure>
</section>

<section aria-labelledby="a3">
  <h2 id="a3">Bentuk luas: satu lembar A3</h2>
  <p class="sec-intro">Poster mendatar yang memuat ketiga bentuk sekaligus. Setiap bidang punya sumber data di instrumen isian dosen, sehingga poster bisa dibuat ulang setiap tahun tanpa menggambar dari nol.</p>
  <figure>
    <div class="scroll">{poster_svg()}</div>
    <figcaption>Label biru di sudut tiap bidang menunjukkan tab instrumen yang menjadi sumber angkanya. Pita bawah memperlihatkan rantai acuan dari Renstra ITS sampai agenda tiap dosen. Rantai ini yang ditelusuri asesor pada kriteria penelitian.</figcaption>
  </figure>
</section>

<section aria-labelledby="lj">
  <h2 id="lj">Peta jalan lajur</h2>
  <p class="sec-intro">Kolomnya memakai tiga periode yang sama dengan RIP prodi, sehingga tabel fakultas dan prodi bisa dibaca berdampingan. Angka di lajur berasal dari RIP Prodi Kedokteran &amp; Profesi Dokter; Prodi Teknologi Kedokteran masuk lewat isian instrumen.</p>
  <figure>
    <div class="scroll">{lajur_svg()}</div>
    <figcaption>Periode 2023–2025 adalah capaian dan menjadi garis dasar evaluasi edisi pertama. Kolom 2026–2028 baru berisi satu tahun, lalu ditambah rencana dari tab PETA JALAN instrumen. Target angka periode berikutnya disusun Unit Penelitian dari data SINTA dan tidak dikarang di sini.</figcaption>
  </figure>
</section>

<section aria-labelledby="r">
  <h2 id="r">Aturan ukuran agar tetap feasible</h2>
  <ol class="rules">
{rules_html()}
  </ol>
</section>

<p class="foot">Sumber isi: Rancangan Pohon Penelitian FKK ITS (draf kerja, PR #1, §5.1–5.6), RIP Prodi Kedokteran dan Profesi Dokter FKK ITS 2026–2030 (draf, Tabel 2–17), dan instrumen isian agenda penelitian dosen. Halaman ini bahan diskusi bentuk, bukan dokumen resmi FKK ITS.</p>
</main>
"""
open(OUT, "w").write(PAGE)
print("ok", len(PAGE))
