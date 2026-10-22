import assert from 'node:assert/strict';
import { access, readFile, readdir } from 'node:fs/promises';
import test from 'node:test';
const output = new URL('../dist/client/', import.meta.url);
test('normal static export excludes all local drafts and internal review notes', async () => {
  const root = new URL('../../hackriculture-data/website/guides/', import.meta.url);
  const drafts = [];
  for (const entry of await readdir(root,{withFileTypes:true})) {
    if (!entry.isDirectory()) continue;
    const guide = JSON.parse(await readFile(new URL(`${entry.name}/content.json`,root),'utf8'));
    if (guide.status === 'draft') {
      drafts.push(guide);
      await assert.rejects(access(new URL(`growing/${guide.slug}/index.html`,output)));
    }
  }
  async function inspect(directory) {
    for (const entry of await readdir(directory,{withFileTypes:true})) {
      const file = new URL(entry.name + (entry.isDirectory() ? '/' : ''), directory);
      if (entry.isDirectory()) await inspect(file);
      else if (/\.(html|js|json)$/.test(entry.name)) {
        const content = await readFile(file,'utf8');
        for (const guide of drafts) assert(!content.includes(guide.summary), `Draft ${guide.slug} leaked to ${file}`);
        assert(!content.includes('snapshot’s blanket two-week'), `Internal review notes leaked to ${file}`);
      }
    }
  }
  await inspect(output);
});

test('approved guides are exported with their local artwork and collection links', async () => {
  const root = new URL('../../hackriculture-data/website/guides/', import.meta.url);
  const index = await readFile(new URL('growing/index.html', output),'utf8');
  for (const entry of await readdir(root,{withFileTypes:true})) {
    if (!entry.isDirectory()) continue;
    const guide = JSON.parse(await readFile(new URL(`${entry.name}/content.json`,root),'utf8'));
    if (guide.status !== 'approved') continue;
    const html = await readFile(new URL(`growing/${guide.slug}/index.html`,output),'utf8');
    const presentation = JSON.parse(await readFile(new URL(`${entry.name}/presentation.json`,root),'utf8'));
    assert(html.includes(presentation.hero.src), `Missing hero for ${guide.slug}`);
    await access(new URL(presentation.hero.src.slice(1),output));
    assert(html.includes('All growing guides'), `Missing collection navigation for ${guide.slug}`);
    assert(!html.includes('Draft for review'), `Approved guide is still marked draft: ${guide.slug}`);
    assert(index.includes(`/growing/${guide.slug}/`), `Guide absent from index: ${guide.slug}`);
    for (const section of guide.sections) assert(html.includes(`id="${section.id}"`), `Missing section ${section.id}`);
  }
});
