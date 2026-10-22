"""Create web-sized copies from project-owned PNG originals. Requires Pillow.
Run with a guide slug to update just that guide; omit it to process all guides.
"""
import argparse, json
from pathlib import Path
from PIL import Image
root = Path(__file__).resolve().parents[1]
parser = argparse.ArgumentParser()
parser.add_argument('slug', nargs='?')
args = parser.parse_args()
guides = root.parent/'hackriculture-data/website/guides'
folders = sorted(guides.iterdir())
if args.slug: folders = [guides/args.slug]
for folder in folders:
    if not folder.is_dir(): continue
    path = folder/'presentation.json'
    data = json.loads(path.read_text())
    original = root/'assets/guides/originals'/f'{folder.name}.png'
    with Image.open(original) as image:
        for suffix, size, quality in [('botanical',1000,84),('thumb',360,80)]:
            scaled = image.convert('RGBA')
            scaled.thumbnail((size,size), Image.Resampling.LANCZOS)
            target = root/'public/images/guides'/f'{folder.name}-{suffix}.webp'
            scaled.save(target, 'WEBP', quality=quality, method=2)
            if suffix == 'botanical':
                data['hero'].update(src='/images/guides/'+target.name,width=scaled.width,height=scaled.height)
            else: data['thumbnail']='/images/guides/'+target.name
    path.write_text(json.dumps(data,indent=2,ensure_ascii=False)+'\n')
    print(folder.name)
