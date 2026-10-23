#!/usr/bin/env python3
"""Render only the authorised sample folios from the exact first-proof PDF.

Authoring only: requires Poppler and Pillow, plus PyMuPDF for web text omissions.
The ordinary site build needs neither
the PDF nor these tools. Source copy, artwork, and book files are never modified.
"""
import hashlib
import argparse
import json
import os
import re
from pathlib import Path
import shutil
import subprocess
import tempfile

from PIL import Image, ImageDraw

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--folios', type=int, nargs='+', help='Rerender only these selected folios')
parser.add_argument('--report-output', type=Path, help='Stage the generated asset report for a guarded JSON save')
args = parser.parse_args()

ROOT = Path(__file__).resolve().parents[1]
CONFIG = ROOT.parent / 'hackriculture-data/website/book-preview.json'
config = json.loads(CONFIG.read_text())
subprocess.run(['node', '--input-type=module', '-e',
    "import fs from 'node:fs'; import {bookPreviewSchema} from './lib/book-preview-schema.mjs'; "
    "bookPreviewSchema.parse(JSON.parse(fs.readFileSync('../hackriculture-data/website/book-preview.json','utf8')));"],
    cwd=ROOT, check=True)
source = (ROOT / config['source']['path']).resolve()
digest = hashlib.file_digest(source.open('rb'), 'sha256').hexdigest()
if digest != config['source']['sha256']:
    raise SystemExit('Source PDF changed. Review the current proof and selection before rendering.')
folios = sorted(page for group in config['groups'] for spread in group['spreads'] for page in spread['pages'])
render_folios = sorted(set(args.folios or folios))
if not set(render_folios).issubset(folios):
    raise SystemExit('Only selected preview folios may be rendered.')
pdftoppm = os.environ.get('PDFTOPPM') or shutil.which('pdftoppm')
pdftotext = os.environ.get('PDFTOTEXT') or shutil.which('pdftotext')
if not pdftoppm or not pdftotext:
    raise SystemExit('Set PDFTOPPM and PDFTOTEXT to your Poppler executables.')
images = ROOT / 'public/images/book/preview'
texts = ROOT / 'public/book-preview-text'
images.mkdir(parents=True, exist_ok=True)
texts.mkdir(parents=True, exist_ok=True)
ranges = []
for page in render_folios:
    if ranges and page == ranges[-1][1] + 1:
        ranges[-1][1] = page
    else:
        ranges.append([page, page])
assets = []
contact = Image.new('RGB', (1400, ((len(folios) + 7) // 8) * 246), '#dedbd0')
draw = ImageDraw.Draw(contact)
with tempfile.TemporaryDirectory(prefix='hackriculture-preview-') as work:
    scratch = Path(work)
    render_source = source
    omissions = [item for item in config.get('webTextOmissions', []) if item['folio'] in render_folios]
    if omissions:
        import fitz
        with fitz.open(source) as document:
            for item in omissions:
                native_page = document[item['folio'] - 1]
                matches = native_page.search_for(item['text'])
                if len(matches) != 1:
                    raise SystemExit(f'Expected exactly one omission match on page {item["folio"]}.')
                native_page.add_redact_annot(matches[0], fill=False)
                # Remove only the selected text; retain all page art and background.
                native_page.apply_redactions(images=0, graphics=0)
                if item['text'] in native_page.get_text():
                    raise SystemExit('The requested proof text was not removed.')
            render_source = scratch / 'web-preview.pdf'
            document.save(render_source)
    subprocess.run([pdftotext, '-layout', str(render_source), str(scratch / 'source.txt')], check=True)
    page_text = (scratch / 'source.txt').read_text().split('\f')
    for first, last in ranges:
        subprocess.run([pdftoppm, '-f', str(first), '-l', str(last), '-scale-to-x', '1859',
                        '-scale-to-y', '-1', '-png', str(render_source), str(scratch / 'page')], check=True)
        for folio in range(first, last + 1):
            raster = scratch / f'page-{folio:03}.png'
            with Image.open(raster) as raw:
                # Production media is 191 x 246 mm, with exactly 3 mm bleed.
                width, height = raw.size
                page = raw.convert('RGB').crop((round(width*3/191), round(height*3/246),
                                               round(width*188/191), round(height*243/246)))
                for suffix, size, quality in [('large', (1800,2335), 90), ('read', (900,1168), 88), ('thumb', (200,259), 78)]:
                    filename = f'page-{folio:03}-{suffix}.webp'
                    page.resize(size, Image.Resampling.LANCZOS).save(images / filename, 'WEBP', quality=quality, method=6)
            (texts / f'page-{folio:03}.txt').write_text(page_text[folio-1].strip()+'\n')
            raster.unlink()
        print(f'Rendered printed pages {first}–{last}', flush=True)
# A smaller future selection must not leave previously sampled pages public.
for directory, pattern in [(images, r'page-(\d{3})-(?:read|large|thumb)\.webp'), (texts, r'page-(\d{3})\.txt')]:
    for path in directory.iterdir():
        match = re.fullmatch(pattern, path.name)
        if match and int(match[1]) not in folios:
            path.unlink()
evidence = ROOT / 'docs/book-launch-planning'
for index, folio in enumerate(folios):
    for suffix in ('large', 'read', 'thumb'):
        filename = f'page-{folio:03}-{suffix}.webp'
        asset = images / filename
        assets.append({'path':f'/images/book/preview/{filename}', 'bytes':asset.stat().st_size,
                       'sha256':hashlib.sha256(asset.read_bytes()).hexdigest()})
    with Image.open(images / f'page-{folio:03}-read.webp') as page:
        contact.paste(page.resize((165,214), Image.Resampling.LANCZOS), ((index%8)*175+5,(index//8)*246+5))
    draw.text(((index%8)*175+8,(index//8)*246+223), f'Printed page {folio}', fill='#30372d')
contact.save(evidence / 'screenshots/book-preview-contact.jpg', quality=90)
report = {'sourceSha256':digest, 'folios':folios, 'pageCount':len(folios), 'assets':assets,
          'imageBytes':sum(asset['bytes'] for asset in assets), 'trim':'3 mm bleed removed; native printed layout retained',
          'webTextOmissions':config.get('webTextOmissions', [])}
(args.report_output or evidence / 'book-preview-assets.json').write_text(json.dumps(report, indent=2)+'\n')
print(f'Prepared {len(folios)} pages, {report["imageBytes"]/1024/1024:.1f} MiB of web images. No source PDF copied into public.')
