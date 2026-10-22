import assert from 'node:assert/strict';
import {readFile, access, readdir} from 'node:fs/promises';
import test from 'node:test';
import {bookPreviewSchema} from '../lib/book-preview-schema.mjs';
import {findPreviewPage, movePreview, previewAsset} from '../lib/book-preview-navigation.mjs';

const config = JSON.parse(await readFile(new URL('../../hackriculture-data/website/book-preview.json', import.meta.url)));
const frames = config.groups.flatMap(group => group.spreads.map(spread => ({...spread,pages:spread.pages.map(folio=>({folio}))})));

test('the selected proof pages retain whole facing spreads and stop after the first 24 crops', () => {
  bookPreviewSchema.parse(config);
  const growing = config.groups.find(group=>group.id==='growing').spreads;
  assert.equal(growing.length,24);
  assert.deepEqual(growing.flatMap(spread=>spread.pages),Array.from({length:48},(_,index)=>index+10));
  assert.deepEqual(config.groups.find(group=>group.id==='later').spreads.flatMap(spread=>spread.pages),[104,105,148,149,162,163]);
  assert.equal(frames.flatMap(frame=>frame.pages).length,59);
  const reversed=structuredClone(config);reversed.groups[1].spreads[0].pages=[11,10];
  assert.equal(bookPreviewSchema.safeParse(reversed).success,false);
  const duplicate=structuredClone(config);duplicate.groups[1].spreads[0].pages=[12,13];
  assert.equal(bookPreviewSchema.safeParse(duplicate).success,false);
});

test('single-page navigation visits every selected folio in both directions and respects boundaries', () => {
  const expected=frames.flatMap(frame=>frame.pages.map(page=>page.folio));
  let position={frame:0,side:0};const visited=[];
  for(let i=0;i<expected.length;i++) {
    visited.push(frames[position.frame].pages[position.side].folio);
    position=movePreview(frames,position,true,1);
  }
  assert.deepEqual(visited,expected);
  assert.deepEqual(movePreview(frames,position,true,1),position);
  const reverse=[];
  for(let i=0;i<expected.length;i++) {
    reverse.push(frames[position.frame].pages[position.side].folio);
    position=movePreview(frames,position,true,-1);
  }
  assert.deepEqual(reverse,expected.toReversed());
  assert.deepEqual(position,{frame:0,side:0});
  assert.deepEqual(movePreview(frames,position,true,-1),position);
});

test('deep links resolve either page of a spread and cannot expose omitted pages', () => {
  for(const frame of frames) for(const page of frame.pages) {
    const result=findPreviewPage(frames,page.folio);
    assert.equal(frames[result.frame].pages[result.side].folio,page.folio);
  }
  for(const page of [0,2,3,6,8,58,103,106,168,999]) assert.equal(findPreviewPage(frames,page),null);
  const lastCrop=findPreviewPage(frames,57);
  assert.deepEqual(movePreview(frames,lastCrop,false,1),findPreviewPage(frames,104));
});

test('homepage and book-page sample cards point to included real folios', async () => {
  const launch=JSON.parse(await readFile(new URL('../../hackriculture-data/website/book-launch.json',import.meta.url)));
  for(const sample of launch.samples) assert.ok(findPreviewPage(frames,sample.previewFolio));
});

test('the static export includes only selected preview assets and an ungated fallback', async () => {
  const output=new URL('../dist/client/',import.meta.url);
  const pages=frames.flatMap(frame=>frame.pages);
  for(const {folio} of pages) {
    for(const variant of ['read','large','thumb']) await access(new URL(previewAsset(folio,variant).slice(1),output));
    const text=await readFile(new URL(`book-preview-text/page-${String(folio).padStart(3,'0')}.txt`,output),'utf8');
    assert.ok(text.trim().length>50);
  }
  const files=await readdir(new URL('images/book/preview/',output));
  assert.equal(files.length,pages.length*3);
  assert.ok(files.every(name=>/\.webp$/.test(name)));
  const html=await readFile(new URL('book/preview/index.html',output),'utf8');
  assert.match(html,/<noscript>/);
  assert.match(html,/No sign-up needed/);
  assert.match(html,/href="\/book\/#launch"/);
  assert.equal((html.match(/<h1\b/g)||[]).length,1);
  assert.doesNotMatch(html,/hackriculture-print|the-vegetable-guru-interior\.pdf|eomail5\.com/);
});
