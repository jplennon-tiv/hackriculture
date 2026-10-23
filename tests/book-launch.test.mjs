import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { bookLaunchSchema } from '../lib/book-launch-schema.mjs';

const content = JSON.parse(await readFile(new URL('../../hackriculture-data/website/book-launch.json', import.meta.url), 'utf8'));

test('launch content validates and refers to real catalogue videos', async () => {
  bookLaunchSchema.parse(content);
  const videos = JSON.parse(await readFile(new URL('../../hackriculture-data/website/videos.json', import.meta.url), 'utf8'));
  for (const id of content.home.videoIds) assert.ok(videos.some(video => video.id === id));
  for (const photo of content.book.channelStory.photographs) {
    const bytes=await readFile(new URL('../public'+photo.src,import.meta.url));
    assert.ok(bytes.length>0);
  }
});

test('the book story exports the chosen companion copy with static photographs', async () => {
  const html=await readFile(new URL('../dist/client/book/index.html',import.meta.url),'utf8');
  const panel=html.match(/<aside\b[^>]*aria-labelledby="book-channel-story-title"[\s\S]*?<\/aside>/)?.[0];
  assert.ok(panel);
  const chosen=content.book.channelStory.variants.find(item=>item.id===content.book.channelStory.defaultVariant);
  assert.equal(chosen.id,'companion');
  assert.ok(panel.includes(chosen.paragraphs[0]));
  for(const photo of content.book.channelStory.photographs) assert.ok(panel.includes(photo.src));
  assert.equal((panel.match(/<img\b/g)||[]).length,2);
  assert.doesNotMatch(panel,/<a\b|<button\b|h-channel-story-play|h-format|Follow the launch/);
});

test('signup configuration cannot load arbitrary scripts or mismatched forms', () => {
  for (const scriptUrl of ['https://example.com/form.js', 'https://eomail5.com/form/00000000-0000-0000-0000-000000000000.js']) {
    assert.equal(bookLaunchSchema.safeParse({...content, signup:{...content.signup,scriptUrl}}).success, false);
  }
});

test('sample pages accept local proof renders while rejecting other image destinations', () => {
  const draft=structuredClone(content);
  for(const src of ['/images/book/beetroot-left.jpg','/images/book/preview/page-106-read.webp']) {
    draft.samples[0].pages[0].src=src;
    assert.equal(bookLaunchSchema.safeParse(draft).success,true);
  }
  for(const src of ['https://example.com/page.webp','/images/book/preview/../../private.webp','/images/book/preview/page-106-large.webp']) {
    draft.samples[0].pages[0].src=src;
    assert.equal(bookLaunchSchema.safeParse(draft).success,false);
  }
});

test('both launch pages export truthful prelaunch content and readable sample actions', async () => {
  for (const route of ['index.html', 'book/index.html']) {
    const html = await readFile(new URL('../dist/client/' + route, import.meta.url), 'utf8');
    assert.match(html, /Coming soon/);
    assert.match(html, /id="launch"/);
    assert.match(html, /<summary>Privacy<\/summary>/);
    assert.match(html, /href="https:\/\/emailoctopus.com\/legal\/privacy"/);
    assert.match(html, /Please enable JavaScript/);
    assert.match(html, route === 'index.html' ? /Enlarge Beetroot · Pages 12–13/ : /Enlarge Carrot · Pages 14–15/);
    assert.match(html, /href="\/book\/preview\//);
    assert.doesNotMatch(html, /Buy now|Pre-order now|Sign-up opens soon/);
    assert.equal((html.match(/<h1\b/g) || []).length, 1);
  }
});
