"""Builds public/Robel-Mamushet-CV.pdf from public/Robel-Mamushet-CV.txt.

The text file is the single source; run this after editing it:
    pip install reportlab && python3 scripts/build-cv-pdf.py
"""
from pathlib import Path
from xml.sax.saxutils import escape

from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.platypus import Paragraph, SimpleDocTemplate, Spacer

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "public" / "Robel-Mamushet-CV.txt"
OUT = ROOT / "public" / "Robel-Mamushet-CV.pdf"

ink, muted, accent = HexColor("#111111"), HexColor("#444444"), HexColor("#0b6e4f")
name = ParagraphStyle("name", fontName="Helvetica-Bold", fontSize=20, leading=24, textColor=ink)
sub = ParagraphStyle("sub", fontName="Helvetica", fontSize=10, leading=14, textColor=muted)
head = ParagraphStyle("head", fontName="Helvetica-Bold", fontSize=10.5, leading=14, textColor=accent, spaceBefore=10, spaceAfter=3)
body = ParagraphStyle("body", fontName="Helvetica", fontSize=9.8, leading=13.5, textColor=ink)
bullet = ParagraphStyle("bullet", parent=body, leftIndent=10, bulletIndent=0, spaceAfter=1.5)


def link(text: str) -> str:
    t = escape(text)
    for word in text.split():
        if word.startswith("http"):
            t = t.replace(escape(word), f'<link href="{escape(word)}" color="#0b6e4f">{escape(word)}</link>')
    return t


lines = SRC.read_text(encoding="utf-8").splitlines()
story = [Paragraph(escape(lines[0].title()), name), Spacer(1, 2)]
i = 1
while i < len(lines) and lines[i].strip():  # header block
    story.append(Paragraph(link(lines[i]), sub))
    i += 1

for line in lines[i:]:
    s = line.strip()
    if not s:
        continue
    if s.isupper():
        story.append(Paragraph(escape(s), head))
    elif s.startswith("- "):
        story.append(Paragraph(link(s[2:]), bullet, bulletText="•"))
    else:
        story.append(Paragraph(link(s), body))

doc = SimpleDocTemplate(str(OUT), pagesize=A4, leftMargin=18 * mm, rightMargin=18 * mm, topMargin=16 * mm, bottomMargin=16 * mm,
                        title="Robel Mamushet - Backend Software Engineer CV", author="Robel Mamushet")
doc.build(story)
print(f"wrote {OUT}")
