import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile, access } from 'node:fs/promises';
import { readRecord, readCollection } from '../../hackriculture-data/lib/records.mjs';
import { checkCalendarSources, calendarSourceSignature } from '../lib/calendar-sources.mjs';
import { ukCalendarDate, monthWeeks, rollingMonths, monthYear } from '../lib/calendar-date.mjs';
import { calendarSchema } from '../lib/calendar-schema.mjs';
import { isCalendarReadingSource } from '../lib/calendar-reading.mjs';
const data = JSON.parse(await readFile(new URL('../../hackriculture-data/website/calendar.json', import.meta.url), 'utf8'));

test('UK date uses summer time, including rollover when UTC is still yesterday', () => {
  assert.deepEqual(ukCalendarDate(new Date('2026-06-30T23:30:00Z')), { year: 2026, month: 7, day: 1, week: 1, key: '2026-7-1' });
  assert.equal(ukCalendarDate(new Date('2026-12-31T23:30:00Z')).year, 2026);
  assert.equal(ukCalendarDate(new Date('2027-01-01T00:00:00Z')).year, 2027);
});

test('four weekly slots include every day, with Week 4+ covering the whole month end', () => {
  for (const year of [2026, 2028, 2100]) for (let month = 1; month <= 12; month++) {
    const slots = monthWeeks(month, year);
    const days = new Date(Date.UTC(year, month, 0)).getUTCDate();
    assert.equal(slots.length, 4);
    assert.deepEqual(slots.at(-1), { number: 4, start: 22, end: days });
    assert.equal(slots.flatMap(slot => Array.from({ length: slot.end - slot.start + 1 }, (_, i) => slot.start + i)).join(','), Array.from({ length: days }, (_, i) => i + 1).join(','));
    for (let day = 1; day <= days; day++) {
      const date = ukCalendarDate(new Date(Date.UTC(year, month - 1, day, 12)));
      const slot = slots[date.week - 1];
      assert.ok(day >= slot.start && day <= slot.end);
      assert.ok(data.months.find(m => m.number === month).weeks.find(w => w.number === date.week).tasks.length >= 2);
    }
  }
  assert.equal(monthWeeks(2, 2026).length, 4);
  assert.deepEqual(monthWeeks(2, 2028).at(-1), { number: 4, start: 22, end: 29 });
  assert.equal(monthWeeks(2, 2100).length, 4);
});

test('week and month change at UK midnight, independently of the build date', () => {
  assert.equal(ukCalendarDate(new Date('2026-10-21T22:59:59Z')).week, 3);
  assert.equal(ukCalendarDate(new Date('2026-10-21T23:00:00Z')).week, 4);
  assert.equal(ukCalendarDate(new Date('2026-10-29T00:00:00Z')).week, 4);
  assert.equal(ukCalendarDate(new Date('2026-10-31T23:59:59Z')).week, 4);
  assert.equal(ukCalendarDate(new Date('2026-10-31T23:59:59Z')).month, 10);
  assert.equal(ukCalendarDate(new Date('2026-11-01T00:00:00Z')).month, 11);
  assert.equal(ukCalendarDate(new Date('2026-10-25T00:30:00Z')).day, 25);
  assert.equal(ukCalendarDate(new Date('2026-10-25T01:30:00Z')).day, 25);
});

test('rolling year starts with the current month and keeps all twelve months once', () => {
  for (let current = 1; current <= 12; current++) {
    const order = rollingMonths(current);
    assert.equal(order[0], current);
    assert.equal(new Set(order).size, 12);
  }
  assert.deepEqual(rollingMonths(10), [10,11,12,1,2,3,4,5,6,7,8,9]);
  assert.equal(monthYear(2, { year: 2027, month: 10 }), 2028);
  assert.equal(monthYear(12, { year: 2027, month: 10 }), 2027);
  assert.throws(() => ukCalendarDate(new Date('invalid')));
  assert.throws(() => rollingMonths(0));
  assert.throws(() => monthWeeks(13, 2026));
});

test('calendar preserves unknown editorial fields and rejects incomplete or dangling data', () => {
  assert.equal(calendarSchema.parse({ ...data, editorialNote: 'Preserve me' }).editorialNote, 'Preserve me');
  for (const mutate of [
    draft => draft.months[0].weeks[0].tasks.splice(1),
    draft => draft.months.pop(),
    draft => draft.months[0].weeks.pop(),
    draft => draft.months[0].weeks[3].number = 5,
    draft => draft.months[1].number = 1,
    draft => draft.months[0].weeks[0].tasks[0].sources.push('missing-source'),
    draft => draft.months[0].weeks[0].tasks[0].link = 'missing-source',
    draft => draft.months[0].weeks[0].tasks[0].id = draft.months[1].weeks[0].tasks[0].id,
  ]) { const draft = structuredClone(data); mutate(draft); assert.equal(calendarSchema.safeParse(draft).success, false); }
});

test('busy weeks accept more jobs while every canonical crop has a task', () => {
  const draft = structuredClone(data);
  draft.months[0].weeks[0].tasks.push({ ...draft.months[0].weeks[0].tasks[0], id: 'extra-job' });
  assert.equal(calendarSchema.safeParse(draft).success, true);
  assert.ok(data.months.some(m => m.weeks.some(w => w.tasks.length >= 5)));
  const used = new Set(data.months.flatMap(m => m.weeks.flatMap(w => w.tasks.flatMap(t => t.sources))));
  const crops = new Set(data.sources.filter(s => s.tier === 'master' && used.has(s.id)).map(s => s.masterKey));
  assert.deepEqual([...crops].sort(), Object.keys(readCollection('vegetables')).sort());
});

test('reader links use John’s material, while a researched task can have no link', () => {
  for (const month of data.months) for (const week of month.weeks) for (const task of week.tasks) {
    if (task.link) assert.ok(isCalendarReadingSource(data.sources.find(source => source.id === task.link)), task.id);
  }
  const draft = structuredClone(data);
  const task = draft.months[0].weeks[0].tasks[0];
  delete task.link;
  assert.equal(calendarSchema.safeParse(draft).success, true);
  const external = draft.sources.find(source => source.tier === 'external');
  task.sources.push(external.id);
  task.link = external.id;
  assert.equal(calendarSchema.safeParse(draft).success, false);
  assert.equal(isCalendarReadingSource({ tier: 'john', href: 'https://example.com/advice' }), false);
  assert.equal(isCalendarReadingSource({ tier: 'john', href: 'https://www.youtube.com.evil.test/watch?v=zBbPG3dKJM4' }), false);
  assert.equal(isCalendarReadingSource(undefined), false);
});

test('canonical source changes are detected without rewriting advice or signatures', () => {
  const source = { id: 'crop', tier: 'master', masterKey: 'cabbage', masterPath: 'calendar.sowing', sourceSha256: calendarSourceSignature(['--08']) };
  const fixture = { sources: [source], months: [{ weeks: [{ tasks: [{ id: 'spring-cabbage', sources: ['crop'] }] }] }] };
  const before = JSON.stringify(fixture);
  assert.deepEqual(checkCalendarSources(fixture, () => ({ calendar: { sowing: ['--08'] }, unrelated: 'new' })), []);
  assert.match(checkCalendarSources(fixture, () => ({ calendar: { sowing: ['--09'] } }))[0], /changed; review spring-cabbage/);
  assert.match(checkCalendarSources(fixture, () => ({}))[0], /missing; review spring-cabbage/);
  assert.equal(JSON.stringify(fixture), before);
  assert.match(checkCalendarSources({ ...fixture, sources: [{ ...source, sourceSha256: undefined }] }, () => ({}))[0], /missing canonical/);
});

test('all source-linked master fields and local guide destinations resolve', async () => {
  calendarSchema.parse(data);
  assert.deepEqual(checkCalendarSources(data, key => readRecord('vegetables', key)), []);
  for (const source of data.sources) {
    if (source.tier === 'master') {
      assert.notEqual(source.masterPath.split('.').reduce((value, key) => value?.[key], readRecord('vegetables', source.masterKey)), undefined, source.id);
      const slug = source.href.split('/')[2];
      await access(new URL(`../../hackriculture-data/website/guides/${slug}/content.json`, import.meta.url));
    }
  }
});

test('export includes all months and tasks without relying on JavaScript', async () => {
  const html = await readFile(new URL('../dist/client/calendar/index.html', import.meta.url), 'utf8');
  for (const month of data.months) {
    assert.ok(html.includes(`id="month-${month.number}"`));
    for (const week of month.weeks) for (const task of week.tasks) assert.ok(html.includes(task.title), task.id);
  }
  const markup = html.replace(/<!--.*?-->/g, '');
  assert.match(markup, />Week 4\+</);
  assert.ok(!markup.includes('Show all task notes'));
  assert.ok(!markup.includes('cal-month-toggle'));
  assert.ok(!html.includes('cal-month-number'));
  assert.match(html, />Jan<\/a>/);
  for (const source of data.sources.filter(source => source.tier === 'external')) {
    assert.ok(!html.includes(`href="${source.href}"`), `External research reference became a public link: ${source.id}`);
  }
  assert.ok(html.includes('href="https://www.youtube.com/watch?v=zBbPG3dKJM4"'));
  const home = await readFile(new URL('../dist/client/index.html', import.meta.url), 'utf8');
  assert.match(home, /cal-widget/);
  assert.match(home, /href="\/calendar\/"/);
});

test('every calendar task has a local illustration that is included in the standalone export', async () => {
  const html = await readFile(new URL('../dist/client/calendar/index.html', import.meta.url), 'utf8');
  for (const month of data.months) for (const week of month.weeks) for (const task of week.tasks) {
    assert.ok(task.illustration, `Missing activity image: ${task.id}`);
    assert.ok(task.illustration.alt.trim(), `Missing image description: ${task.id}`);
    const src = task.illustration.src;
    await access(new URL(`../public${src}`, import.meta.url));
    await access(new URL(`../dist/client${src}`, import.meta.url));
    assert.ok(html.includes(`src="${src}"`), `Missing exported image: ${task.id}`);
  }
});
