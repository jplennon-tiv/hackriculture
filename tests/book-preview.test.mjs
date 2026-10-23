import assert from 'node:assert/strict';
import {readFile, access, readdir} from 'node:fs/promises';
import test from 'node:test';
import {bookPreviewSchema} from '../lib/book-preview-schema.mjs';
import {findPreviewPage, previewAsset} from '../lib/book-preview-navigation.mjs';

const config = JSON.parse(await readFile(new URL('../../hackriculture-data/website/book-preview.json', import.meta.url)));
const frames = config.groups.flatMap(group => group.spreads.map(spread => ({...spread,pages:spread.pages.map(folio=>({folio}))})));

test('the selected proof pages retain five complete vegetable guides and the later reference samples', () => {
  bookPreviewSchema.parse(config);
  const growing = config.groups.find(group=>group.id==='growing').spreads;
  assert.equal(growing.length,5);
  assert.deepEqual(growing.flatMap(spread=>spread.pages),[10,11,12,13,14,15,36,37,68,69]);
  assert.deepEqual(config.groups.find(group=>group.id==='later').spreads.flatMap(spread=>spread.pages),[112,113,132,133,148,149,162,163]);
  assert.equal(frames.flatMap(frame=>frame.pages).length,23);
  const reversed=structuredClone(config);reversed.groups[1].spreads[0].pages=[11,10];
  assert.equal(bookPreviewSchema.safeParse(reversed).success,false);
  const duplicate=structuredClone(config);duplicate.groups[1].spreads[0].pages=[12,13];
  assert.equal(bookPreviewSchema.safeParse(duplicate).success,false);
});

test('the scrolling reader includes every selected page in order without duplicate turn controls', async () => {
  const html=await readFile(new URL('../dist/client/book/preview/index.html',import.meta.url),'utf8');
  const rendered=[...html.matchAll(/data-folio="(\d+)"/g)].map(match=>Number(match[1]));
  assert.deepEqual(rendered,frames.flatMap(frame=>frame.pages.map(page=>page.folio)));
  assert.ok(html.includes(`id="page=${config.defaultFolio}"`));
  assert.match(html,/Pages 16–35 are.*not included in this sample/);
  assert.doesNotMatch(html,/h-reader-mode|h-reader-turn|h-reader-bottom|h-reader-zoom-tools/);
  assert.match(html,/aria-label="Close enlarged page"/);
});

test('deep links resolve either page of a spread and cannot expose omitted pages', () => {
  for(const frame of frames) for(const page of frame.pages) {
    const result=findPreviewPage(frames,page.folio);
    assert.equal(frames[result.frame].pages[result.side].folio,page.folio);
  }
  for(const page of [0,2,3,6,8,16,17,35,38,57,58,103,104,105,106,107,108,131,134,168,999]) assert.equal(findPreviewPage(frames,page),null);
});

test('homepage and three book sections use included, different spreads with working jump targets', async () => {
  const launch=JSON.parse(await readFile(new URL('../../hackriculture-data/website/book-launch.json',import.meta.url)));
  for(const sample of launch.samples) {
    assert.ok(findPreviewPage(frames,sample.previewFolio));
    assert.ok(findPreviewPage(frames,sample.previewFolio+1));
    for(const page of sample.pages) await access(new URL('../dist/client'+page.src,import.meta.url));
  }
  const homeFolios=new Set(launch.samples.flatMap(sample=>[sample.previewFolio,sample.previewFolio+1]));
  const featured=frames.find(frame=>frame.id===launch.home.featurePreview.spreadId);
  assert.ok(featured,'Homepage feature must reference an included spread');
  const home=await readFile(new URL('../dist/client/index.html',import.meta.url),'utf8');
  for(const page of featured.pages) {
    assert.ok(home.includes(previewAsset(page.folio)));
    homeFolios.add(page.folio);
  }
  const html=await readFile(new URL('../dist/client/book/index.html',import.meta.url),'utf8');
  for(const part of launch.book.contents) {
    const spread=frames.find(frame=>frame.id===part.preview.spreadId);
    assert.ok(spread, `Missing preview spread for ${part.id}`);
    assert.equal(spread.pages.length,2);
    assert.ok(spread.pages.every(page=>!homeFolios.has(page.folio)));
    assert.ok(html.includes(`href="#sample-${part.id}"`));
    assert.ok(html.includes(`id="sample-${part.id}"`));
    for(const page of spread.pages) assert.ok(html.includes(previewAsset(page.folio)));
    await access(new URL('../public'+part.preview.illustration.src,import.meta.url));
  }
  const panels=html.slice(html.indexOf('id="samples"'),html.indexOf('class="h-faqs"'));
  assert.equal((panels.match(/aria-haspopup="dialog"/g)||[]).length,3);
  assert.equal((panels.match(/href="\/book\/preview\/"/g)||[]).length,1);
});

test('the static export includes only selected preview assets and an ungated fallback', async () => {
  const output=new URL('../dist/client/',import.meta.url);
  const pages=frames.flatMap(frame=>frame.pages);
  for(const {folio} of pages) {
    for(const variant of ['read','large','thumb']) await access(new URL(previewAsset(folio,variant).slice(1),output));
    const text=await readFile(new URL(`book-preview-text/page-${String(folio).padStart(3,'0')}.txt`,output),'utf8');
    assert.ok(text.trim().length>50);
    for (const omission of config.webTextOmissions ?? []) {
      if (omission.folio === folio) assert.ok(!text.includes(omission.text), 'Omitted proof text leaked into the public text version');
    }
  }
  const files=await readdir(new URL('images/book/preview/',output));
  assert.equal(files.length,pages.length*3);
  assert.ok(files.every(name=>/\.webp$/.test(name)));
  const texts=await readdir(new URL('book-preview-text/',output));
  assert.deepEqual(texts.sort(),pages.map(({folio})=>`page-${String(folio).padStart(3,'0')}.txt`).sort());
  const html=await readFile(new URL('book/preview/index.html',output),'utf8');
  assert.match(html,/<noscript>/);
  assert.match(html,/No sign-up needed/);
  assert.match(html,/href="\/book\/#launch"/);
  assert.equal((html.match(/<h1\b/g)||[]).length,1);
  assert.doesNotMatch(html,/hackriculture-print|the-vegetable-guru-interior\.pdf|eomail5\.com/);
});
