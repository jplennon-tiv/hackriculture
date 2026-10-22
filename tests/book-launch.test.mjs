import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { bookLaunchSchema } from '../lib/book-launch-schema.mjs';

const content = JSON.parse(await readFile(new URL('../../hackriculture-data/website/book-launch.json', import.meta.url), 'utf8'));

test('launch content validates and refers to real catalogue videos', async () => {
  bookLaunchSchema.parse(content);
  const videos = JSON.parse(await readFile(new URL('../../hackriculture-data/website/videos.json', import.meta.url), 'utf8'));
  for (const id of content.home.videoIds) assert.ok(videos.some(video => video.id === id));
});

test('signup configuration cannot load arbitrary scripts or mismatched forms', () => {
  for (const scriptUrl of ['https://example.com/form.js', 'https://eomail5.com/form/00000000-0000-0000-0000-000000000000.js']) {
    assert.equal(bookLaunchSchema.safeParse({...content, signup:{...content.signup,scriptUrl}}).success, false);
  }
});

test('both launch pages export truthful prelaunch content and readable sample actions', async () => {
  for (const route of ['index.html', 'book/index.html']) {
    const html = await readFile(new URL('../dist/client/' + route, import.meta.url), 'utf8');
    assert.match(html, /Coming soon/);
    assert.match(html, /id="launch"/);
    assert.match(html, /How your email address is used/);
    assert.match(html, /Please enable JavaScript/);
    assert.match(html, /Read Beetroot/);
    assert.match(html, /href="\/book\/preview\//);
    assert.doesNotMatch(html, /Buy now|Pre-order now|Sign-up opens soon/);
    assert.equal((html.match(/<h1\b/g) || []).length, 1);
  }
});
