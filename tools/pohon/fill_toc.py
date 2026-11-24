"""Pre-fill the TOC / list-of-figures / list-of-tables fields of the Word edition with page numbers.

Word still refreshes the fields on open (updateFields is set); the cached entries make the lists
visible in viewers that do not recompute fields (LibreOffice, Google Docs, previews).
Usage: python -X utf8 fill_toc.py <in.docx> <rendered.pdf> <toc.json> <out.docx>
"""
import sys, json, re, zipfile, shutil, html
import fitz

src, pdf, tj, out = sys.argv[1:5]
T = json.load(open(tj, encoding="utf-8"))
doc = fitz.open(pdf)
texts = [re.sub(r"\s+", " ", doc[i].get_text()) for i in range(doc.page_count)]
start = next(i for i, t in enumerate(texts) if "Ringkasan Eksekutif" in t and "Dokumen ini adalah" in t)


def page_of(needle, after):
    for i in range(max(start, after), doc.page_count):
        if needle in texts[i]:
            return i
    return None


def entries(items, fmt):
    res, cur = [], start
    for it in items:
        label, needle = fmt(it)
        pg = page_of(needle, cur)
        if pg is None:
            print("NOT FOUND:", needle[:60])
            res.append((label, ""))
            continue
        cur = pg
        res.append((label, str(pg - start + 1)))
    return res


heads = entries(T["h"], lambda h: ((h[0], h[1]), h[1][:38]))
figs = entries(T["fig"], lambda f: ((0, f"Gambar {f[0]}. {f[1]}"), f"Gambar {f[0]}. {f[1][:22]}"))
tabs = entries(T["tab"], lambda t: ((0, f"Tabel {t[0]}. {t[1]}"), f"Tabel {t[0]}. {t[1][:22]}"))


def para(style, text, pg):
    e = html.escape(text, quote=False)
    return (f'<w:p><w:pPr><w:pStyle w:val="{style}"/></w:pPr><w:r><w:t xml:space="preserve">{e}</w:t></w:r>'
            f'<w:r><w:tab/></w:r><w:r><w:t>{pg}</w:t></w:r></w:p>')


tmp = out + ".tmp"
shutil.copy(src, tmp)
zin = zipfile.ZipFile(tmp)
x = zin.read("word/document.xml").decode("utf-8")
x = re.sub(r"<w:highlightCs[^>]*/>", "", x)  # docx-js emits this non-schema element; Word expects only w:highlight
END = '<w:p><w:r><w:fldChar w:fldCharType="end"/></w:r></w:p>'
for alias, items, style in (("Daftar Isi", heads, None), ("Daftar Gambar", figs, "TableofFigures"), ("Daftar Tabel", tabs, "TableofFigures")):
    i = x.index(f'<w:alias w:val="{alias}"/>')
    j = x.index(END, i)
    body = "".join(para(style or f"TOC{lab[0]}", lab[1], pg) for lab, pg in items)
    x = x[:j] + body + x[j:]
zout = zipfile.ZipFile(out, "w", zipfile.ZIP_DEFLATED)
for item in zin.infolist():
    if item.filename.endswith("/"):
        continue
    data = x.encode("utf-8") if item.filename == "word/document.xml" else zin.read(item.filename)
    zout.writestr(item, data)
zout.close(); zin.close()
import os; os.remove(tmp)
print("toc filled:", len(heads), "headings,", len(figs), "figures,", len(tabs), "tables")
