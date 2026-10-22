import { readFile, writeFile, mkdir, rename, readdir } from 'node:fs/promises';
import { projectGuide } from '../lib/guide-projection.mjs';
import {readCollection} from '../../hackriculture-data/lib/records.mjs';
const args = process.argv.slice(2);
if (args.some(a => a !== '--drafts')) throw Error('Usage: prepare-guides.mjs [--drafts]');
const draftPreview = args.includes('--drafts');
if (draftPreview && process.env.NODE_ENV === 'production') throw Error('Draft preparation is for local development only');
// All authored data is shared; this script emits only a disposable public projection.
const root = new URL('../../hackriculture-data/website/guides/', import.meta.url);
const folders = (await readdir(root, {withFileTypes:true})).filter(entry => entry.isDirectory()).sort((a,b) => a.name.localeCompare(b.name));
const master = readCollection('vegetables');
const guides = [];
for (const folder of folders) {
  const input = JSON.parse(await readFile(new URL(`${folder.name}/content.json`, root), 'utf8'));
  if (!Object.hasOwn(master, input.sourceKey)) throw Error(`Unknown master crop: ${input.sourceKey}`);
  if (input.slug !== folder.name) throw Error('Guide folder must match its slug');
  if (!draftPreview && input.status !== 'approved') continue;
  const guide = projectGuide(input, {allowDrafts:draftPreview, masterRecord:master[input.sourceKey]});
  const presentation = JSON.parse(await readFile(new URL(`${folder.name}/presentation.json`, root), 'utf8'));
  if (presentation.template !== 'botanical-v1' || !/^#[0-9a-f]{6}$/i.test(presentation.accent) || typeof presentation.category !== 'string' || !presentation.category.trim()) throw Error('Invalid guide presentation');
  const hero = presentation.hero;
  if (!hero || !/^\/images\/[a-zA-Z0-9_/-]+\.(png|webp|jpg|jpeg)$/.test(hero.src) || typeof hero.alt !== 'string' || !hero.alt.trim() || !Number.isInteger(hero.width) || hero.width <= 0 || !Number.isInteger(hero.height) || hero.height <= 0) throw Error('Invalid local guide artwork');
  await readFile(new URL(`../public${hero.src}`, import.meta.url));
  if (presentation.thumbnail) {
    if (!/^\/images\/[a-zA-Z0-9_/-]+\.webp$/.test(presentation.thumbnail)) throw Error('Invalid guide thumbnail');
    await readFile(new URL(`../public${presentation.thumbnail}`, import.meta.url));
  }
  if (presentation.calendarIntro !== undefined && (typeof presentation.calendarIntro !== 'string' || !presentation.calendarIntro.trim())) throw Error('Invalid calendar introduction');
  guides.push({...guide, presentation});
}
if (new Set(guides.map(g => g.slug)).size !== guides.length) throw Error('Duplicate guide slug');
const directory = new URL('../../hackriculture-data/generated/website/', import.meta.url);
await mkdir(directory, {recursive:true});
await writeFile(new URL('guides.json.partial', directory), JSON.stringify({draftPreview, guides}, null, 2) + '\n');
await rename(new URL('guides.json.partial', directory), new URL('guides.json', directory));
console.log(`Prepared ${guides.length} guides (${guides.filter(g => g.isDraft).length} drafts, ${guides.filter(g => !g.isDraft).length} approved).`);
