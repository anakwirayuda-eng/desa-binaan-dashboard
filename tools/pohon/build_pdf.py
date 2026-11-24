"""Render output/POHON_PENELITIAN_FKK_ITS.md to a print-ready HTML file (then PDF via Chromium)."""
import re
import sys
import html
import markdown

SRC, OUT_HTML, FIGDIR = sys.argv[1], sys.argv[2], sys.argv[3]
md = open(SRC, encoding="utf-8").read()

# --- split off the title block (goes on the cover) ---
lines = md.split("\n")
assert lines[0].startswith("# ")
title = lines[0][2:].strip()
subtitle = lines[1].lstrip("#").strip()
meta = lines[3].strip()
body_md = "\n".join(lines[5:])  # skip title, subtitle, blank, meta, blank

# --- insert figures into §5.5 ---
def fig(name, caption):
    return (f'\n<figure class="fig"><img src="{FIGDIR}/fig_{name}.png" alt="{html.escape(caption)}">'
            f'<figcaption>{caption}</figcaption></figure>\n')

IS_PKM = "Pengabdian kepada Masyarakat" in title
IS_EDARAN = "Naskah edaran" in subtitle
EYEBROW = ("FKK ITS · Naskah edaran untuk konsultasi" if IS_EDARAN else
           "FKK ITS · Dokumen kerja Peta Jalan PkM" if IS_PKM else "FKK ITS · Dokumen kerja RIP &amp; Peta Jalan Penelitian")
COVER_NOTE = ("Naskah konsultasi untuk dosen ketiga prodi, tanpa penilaian per orang. Belum disahkan; isi akhirnya ditetapkan dengan SK Dekan setelah pengisian instrumen dan uji publik." if IS_EDARAN else
              "Draf kerja kerangka Peta Jalan PkM, dokumen kembar Pohon Penelitian FKK ITS. Bukan dokumen resmi FKK ITS. Kegiatan dan angka harus dikonfirmasi dengan data prodi dan mitra (§12)." if IS_PKM else
              "Draf kerja hasil riset web dan dokumen internal yang dipasok pengguna. Bukan dokumen resmi FKK ITS. Seluruh butir §10 harus diselesaikan sebelum materi ini dipakai dalam LED atau dokumen akreditasi.")

# Figures belong to the research-tree document only; other documents (e.g. the PkM roadmap) skip this.
if "*Sumber angka: Tabel 3–14 RIP prodi" in body_md:
    anchor1 = "*Sumber angka: Tabel 3–14 RIP prodi"
    i = body_md.index(anchor1)
    j = body_md.index("\n", i)
    body_md = body_md[:j + 1] + fig("padanan", "Gambar 1. Padanan tujuh topik RIP Prodi Kedokteran &amp; Profesi Dokter ke pohon fakultas. Garis putus-putus: sebagian subtopik.") + body_md[j + 1:]

    anchor2 = "**Yang belum terlihat:** peta jalan Prodi Teknologi Kedokteran"
    k = body_md.index(anchor2)
    figs = (fig("pohon", "Gambar 2. Usulan pohon fakultas: batang Kedokteran Pencegahan 4.0 dari tiga prodi, lima cabang pilar, akar ilmu dasar dan platform T1–T5, tanah wahana W0–W4. Lingkaran di depan topik diisi setelah rekap isian dosen.")
            + fig("lajur", "Gambar 3. Peta jalan lajur dengan periode yang sama dengan RIP prodi. Angka luaran dari RIP Prodi Kedokteran &amp; Profesi Dokter; target periode berikutnya disusun Unit Penelitian.")
            + fig("poster", "Gambar 4. Maket poster A3: pohon, matriks, dan lajur dalam satu lembar; label biru menunjukkan tab instrumen sumber angkanya."))
    body_md = body_md[:k] + figs + "\n" + body_md[k:]

    # --- §5.6: matrix read two ways + Tekdok fishbone skeleton ---
    anchor3 = "**Aturan hitung: satu proyek, satu identitas.**"
    k = body_md.index(anchor3)
    body_md = body_md[:k] + fig("duaarah", "Gambar 5. Matriks dibaca dua arah. Per baris: lembar pandang Prodi Sarjana Kedokteran dan Profesi Dokter. Per kolom: peta jalan Prodi Teknologi Kedokteran. Isi sel = kode topik §5.1; sel bergaris putus belum punya topik. A, B, C = tiga contoh jalur tiga prodi.") + "\n" + body_md[k:]

    anchor4 = "**Usul: bawa keduanya ke Kaprodi"
    anchor4 = "Usul: bawa keduanya ke Kaprodi"
    k = body_md.index(anchor4)
    body_md = (body_md[:k]
               + fig("ikan_tekdok", "Gambar 6. Pilihan A — kerangka kosong tulang ikan Prodi Teknologi Kedokteran: kepala sama dengan tulang ikan prodi kedokteran, dengan sublabel hasil keilmuan Tekdok; tiap tulang platform dibagi tiga ruas periode untuk judul, TKT, dan wahana.")
               + fig("gerbang_tekdok", "Gambar 7. Pilihan B — kerangka kosong lajur bergerbang: lima lajur platform melintasi tiga periode dengan dua gerbang uji, bermuara pada tujuan 2030 yang sama.")
               + "\n" + body_md[k:])

# Python-Markdown needs a blank line before a list that follows a paragraph; "1a." items become sub-paragraphs.
_out, _prev = [], ""
_li = re.compile(r"^\s*([-*+]|\d+[.)])\s")
for _ln in body_md.split("\n"):
    m_sub = re.match(r"^(\d+[a-z])\.\s(.*)$", _ln)
    if m_sub:
        _out += ["", "    **" + m_sub.group(1) + ".** " + m_sub.group(2)]
        _prev = _ln
        continue
    if _li.match(_ln) and _prev.strip() and not _li.match(_prev) and not _prev.lstrip().startswith("|") and not _prev.startswith("    "):
        _out.append("")
    _out.append(_ln)
    _prev = _ln
body_md = "\n".join(_out)
body_md = re.sub(r"~~(.+?)~~", r"<del>\1</del>", body_md)

conv = markdown.Markdown(extensions=["tables", "fenced_code", "toc", "sane_lists"],
                         extension_configs={"toc": {"permalink": False}})
body = conv.convert(body_md)

# table of contents: h2 only
toc_items = []
for tok in conv.toc_tokens:
    if tok["level"] == 2:
        toc_items.append(f'<li><a href="#{tok["id"]}">{tok["name"]}</a></li>')
    for ch in tok.get("children", []):
        if ch["level"] == 2:
            toc_items.append(f'<li><a href="#{ch["id"]}">{ch["name"]}</a></li>')

meta_html = markdown.markdown(meta)

CSS = """
@page { size: A4; margin: 20mm 17mm 20mm 17mm; }
:root { --ink:#16211B; --muted:#55645B; --line:#CCD6CF; --accent:#1D4F91; --soft:#EEF2F7; --tint:#F3F6F4; }
html { font-family: 'Inter', 'DejaVu Sans', sans-serif; font-size: 9.6pt; color: var(--ink); line-height: 1.5; }
body { margin: 0; }
h1, h2, h3, h4 { font-family: 'Inter Display', 'Inter', sans-serif; line-height: 1.2; break-after: avoid; }
h2 { font-size: 17pt; font-weight: 700; margin: 0 0 10pt; padding-top: 2pt; break-before: page; }
h3 { font-size: 12.5pt; font-weight: 650; margin: 16pt 0 6pt; }
h4 { font-size: 11pt; font-weight: 650; margin: 14pt 0 5pt; }
p { margin: 0 0 7pt; orphans: 3; widows: 3; }
a { color: var(--accent); text-decoration: none; }
strong { font-weight: 650; }
ul, ol { margin: 0 0 8pt; padding-left: 16pt; }
li { margin-bottom: 2.5pt; }
hr { display: none; }
blockquote { margin: 8pt 0 10pt; padding: 7pt 11pt; background: var(--tint); border-radius: 5pt; color: var(--ink); }
blockquote p:last-child { margin-bottom: 0; }
code { font-family: 'JetBrains Mono', 'DejaVu Sans Mono', monospace; font-size: 8.4pt; background: var(--tint); padding: 0 2pt; border-radius: 2pt; }
pre { font-family: 'JetBrains Mono', monospace; font-size: 8pt; background: var(--tint); padding: 8pt 10pt; border-radius: 5pt; white-space: pre-wrap; break-inside: avoid; }
pre code { background: none; padding: 0; }
table { width: 100%; border-collapse: collapse; margin: 6pt 0 11pt; font-size: 8.3pt; line-height: 1.38; }
thead { display: table-header-group; }
th { text-align: left; font-weight: 650; background: var(--soft); color: var(--ink); }
th, td { border: 0.6pt solid var(--line); padding: 4pt 5pt; vertical-align: top; }
tr { break-inside: avoid; }
figure.fig { margin: 10pt 0 14pt; break-inside: avoid; }
figure.fig img { width: 100%; border: 0.6pt solid var(--line); border-radius: 5pt; }
figure.fig figcaption { font-size: 8.4pt; color: var(--muted); margin-top: 4pt; }
.cover { height: 252mm; display: flex; flex-direction: column; break-after: page; }
.cover .eyebrow { font-family: 'JetBrains Mono', monospace; font-size: 8.5pt; letter-spacing: .08em; text-transform: uppercase; color: var(--muted); }
.cover h1 { font-size: 30pt; font-weight: 750; margin: 8pt 0 6pt; letter-spacing: -.01em; }
.cover .sub { font-size: 12.5pt; color: var(--muted); margin-bottom: 14pt; max-width: 150mm; }
.cover .meta { font-size: 9pt; color: var(--ink); max-width: 165mm; }
.cover { overflow: hidden; }
.cover .img { flex: 1 1 0; min-height: 0; display: flex; align-items: center; justify-content: center; margin: 10pt 0; }
.cover .img img { max-width: 100%; max-height: 100%; object-fit: contain; }
.cover .note { font-size: 8.5pt; color: var(--muted); border-top: 0.6pt solid var(--line); padding-top: 6pt; }
.toc h2 { break-before: avoid; }
.toc ol { list-style: none; padding: 0; columns: 1; font-size: 10.5pt; }
.toc li { padding: 4pt 0; border-bottom: 0.6pt solid var(--line); }
.toc a { color: var(--ink); }
.toc { break-after: page; }
"""

page = f"""<!doctype html><html lang="id"><head><meta charset="utf-8"><title>{html.escape(title)}</title>
<style>{CSS}</style></head><body>
<section class="cover">
  <div class="eyebrow">{EYEBROW}</div>
  <h1>{html.escape(title)}</h1>
  <div class="sub">{html.escape(subtitle)}</div>
  <div class="meta">{meta_html}</div>
  <div class="img"><img src="{FIGDIR}/fig_pohon.png" alt="Usulan pohon penelitian FKK ITS"></div>
  <div class="note">{COVER_NOTE}</div>
</section>
<section class="toc"><h2>Isi</h2><ol>{''.join(toc_items)}</ol></section>
{body}
</body></html>"""
open(OUT_HTML, "w", encoding="utf-8").write(page)
print("html ok", len(page), "toc", len(toc_items))
