#!/usr/bin/env bash
# Build the Word edition (two passes so the table of contents carries real page numbers).
# Usage: bash tools/pohon/build_docx.sh <roster.json> <workdir>
#   roster.json: [{nama, prodi, jabatan, bidang}] exported from output/build_instrumen_agenda.py (ROSTER + PREFILL)
set -euo pipefail
ROSTER="$1"; WORK="$2"
SOFFICE="${SOFFICE:-/c/Program Files/LibreOffice/program/soffice.exe}"
OUT=output/RENCANA_INDUK_PENELITIAN_PKM_FKK_ITS_2026-2030.docx
mkdir -p "$WORK" output/figures_doc
python -X utf8 tools/pohon/build_doc_figs.py output/figures_doc
node tools/pohon/doc_diagrams.js output/figures_doc
TOC_JSON="$WORK/toc.json" NODE_PATH="$(npm root -g)" node tools/pohon/build_docx.js output/figures output/figures_doc "$ROSTER" "$WORK/pass1.docx"
"$SOFFICE" --headless --convert-to pdf --outdir "$WORK" "$WORK/pass1.docx" >/dev/null
python -X utf8 tools/pohon/fill_toc.py "$WORK/pass1.docx" "$WORK/pass1.pdf" "$WORK/toc.json" "$OUT"
"$SOFFICE" --headless --convert-to pdf --outdir output "$OUT" >/dev/null
echo "built $OUT and its PDF preview"
