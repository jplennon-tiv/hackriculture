import { z } from 'zod';
import { isCalendarReadingSource } from './calendar-reading.mjs';
const text = z.string().trim().min(1);
const id = z.string().regex(/^[a-z][a-z0-9-]*$/);
const href = z.string().refine(value => /^\/growing\/[a-z0-9-]+\/$/.test(value) || /^https:\/\//.test(value), 'Use a growing guide or HTTPS source');
const source = z.object({ id, title: text, href, tier: z.enum(['master', 'john', 'external']), location: text }).passthrough();
const illustration = z.object({
  src: z.string().regex(/^\/images\/calendar\/[a-z0-9-]+\.webp$/),
  alt: text,
  width: z.number().int().positive(), height: z.number().int().positive(),
}).passthrough();
const task = z.object({ id, title: text, text, category: z.enum(['grow', 'harvest', 'home']), sources: z.array(id).min(1), link: id.optional(), illustration: illustration.optional() }).passthrough();
export const calendarSchema = z.object({
  version: z.literal(1), title: text, description: text, introduction: text, timingNote: text, weekNote: text,
  reviewedOn: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), editorialStatus: z.literal('draft-for-john'),
  categories: z.array(z.object({ id: z.enum(['grow', 'harvest', 'home']), label: text }).passthrough()).length(3),
  sources: z.array(source).min(1),
  months: z.array(z.object({
    number: z.number().int().min(1).max(12), name: text, season: z.enum(['winter', 'spring', 'summer', 'autumn']), focus: text,
    weeks: z.array(z.object({ number: z.number().int().min(1).max(4), tasks: z.array(task).min(2) }).passthrough()).length(4),
  }).passthrough()).length(12),
}).passthrough().superRefine((value, ctx) => {
  const fail = message => ctx.addIssue({ code: 'custom', message });
  if (new Set(value.categories.map(c => c.id)).size !== 3) fail('Categories must be distinct');
  if (new Set(value.sources.map(s => s.id)).size !== value.sources.length) fail('Source IDs must be unique');
  if (new Set(value.months.map(m => m.number)).size !== 12) fail('Every month must appear once');
  const sources = new Set(value.sources.map(s => s.id)), tasks = new Set();
  for (const month of value.months) {
    if (new Set(month.weeks.map(w => w.number)).size !== 4) fail(`All four weekly slots required for ${month.name}`);
    for (const week of month.weeks) for (const task of week.tasks) {
      if (tasks.has(task.id)) fail(`Duplicate task ${task.id}`);
      tasks.add(task.id);
      if (task.link !== undefined) {
        if (!task.sources.includes(task.link)) fail(`Task link must belong to its sources: ${task.id}`);
        if (!isCalendarReadingSource(value.sources.find(source => source.id === task.link))) fail(`Task links must lead to John's material: ${task.id}`);
      }
      for (const ref of task.sources) if (!sources.has(ref)) fail(`Unknown source ${ref}`);
    }
  }
});
