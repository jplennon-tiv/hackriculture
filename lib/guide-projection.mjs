import assert from 'node:assert/strict';
import { z } from 'zod';
import { readMasterFact } from './shared-facts.mjs';
const id = z.string().regex(/^[a-z][a-z0-9_-]*$/);
const sourced = { sourceIds: z.array(id).min(1) };
const typed = { typeIds: z.array(id).optional() };
const schema = z.object({
  schemaVersion: z.literal('0.1.0'), contentVersion: z.string().min(1), sourceKey: id,
  slug: id, title: z.string().min(1), summary: z.string().min(1), scope: z.string().min(1),
  status: z.enum(['draft', 'approved']), completeness: z.literal('page-draft'),
  review: z.object({ sourceCheckedOn: z.string().nullable(), approvedBy: z.string().nullable(), approvedOn: z.string().nullable() }),
  types: z.array(z.object({ id, label: z.string().min(1), description: z.string() })),
  quickFacts: z.array(z.object({ id, label: z.string().min(1), masterPath: z.string().min(1).optional(), text: z.string().min(1).optional(), value: z.number().optional(), range: z.tuple([z.number(), z.number()]).optional(), unit: z.string().optional(), ...sourced })),
  seasonalTasks: z.array(z.object({ id, action: z.enum(['sow', 'plant', 'harvest', 'check-storage']), months: z.array(z.number().int().min(1).max(12)).min(1), environment: z.enum(['outdoors', 'indoors', 'protected', 'storage']), condition: z.string().min(1), text: z.string().min(1), ...sourced, ...typed })),
  sections: z.array(z.object({ id, title: z.string().min(1), paragraphs: z.array(z.string().min(1)).min(1), ...sourced, ...typed })).min(1),
  sources: z.array(z.object({ id, kind: z.enum(['local-reference', 'web']), title: z.string().optional(), url: z.string().url().optional(), checkedOn: z.string() })).min(1),
  // Media and personal notes need their own reviewed contract before publishing.
  personalNotes: z.array(z.unknown()).max(0),
  media: z.object({ shortVideo: z.null(), relatedVideos: z.array(z.unknown()).max(0) }),
});
const unique = (values, label) => assert.equal(new Set(values).size, values.length, `Duplicate ${label}`);
export function projectGuide(input, { allowDrafts = false, masterRecord } = {}) {
  const c = schema.parse(input);
  assert(allowDrafts || (c.status === 'approved' && c.review.approvedBy?.trim() && /^\d{4}-\d{2}-\d{2}$/.test(c.review.approvedOn || '')), 'Unapproved guide excluded from public build');
  for (const key of ['types','quickFacts','sections','sources','seasonalTasks']) unique(c[key].map(x => x.id), key);
  const sources = new Set(c.sources.map(s => s.id));
  const types = new Map(c.types.map(t => [t.id, t.label]));
  for (const item of [...c.quickFacts, ...c.sections, ...c.seasonalTasks]) {
    assert(item.sourceIds.every(s => sources.has(s)), 'Unknown source reference');
    assert((item.typeIds || []).every(t => types.has(t)), 'Unknown crop type');
  }
  const labels = item => (item.typeIds || []).map(t => types.get(t));
  const actionLabels = { sow: 'Sow', plant: 'Plant', harvest: 'Harvest', 'check-storage': 'Check stored roots' };
  return {
    slug: c.slug, title: c.title, summary: c.summary, scope: c.scope,
    contentVersion: c.contentVersion, isDraft: c.status !== 'approved',
    sourceCheckedOn: c.review.sourceCheckedOn,
    quickFacts: c.quickFacts.map(f => {
      if (f.masterPath) {
        assert(f.text === undefined && f.value === undefined && f.range === undefined, 'Shared facts must not keep a local value');
        return {id:f.id, label:f.label, text:readMasterFact(masterRecord, f.masterPath)};
      }
      assert([f.text !== undefined, f.value !== undefined, f.range !== undefined].filter(Boolean).length === 1, 'Fact needs exactly one value');
      if (f.range) assert(f.range[0] <= f.range[1], 'Reversed fact range');
      if (!f.text) assert(f.unit, 'Numeric facts need units');
      return { id:f.id, label:f.label, text:f.text || `${f.range ? f.range.join('–') : f.value} ${f.unit}` };
    }),
    seasonalTasks: c.seasonalTasks.map(t => { unique(t.months, 'months'); return { id:t.id, label:actionLabels[t.action], months:t.months, condition:t.condition, text:t.text, environment:t.environment, typeLabels:labels(t) }; }),
    sections: c.sections.map(s => ({ id:s.id, title:s.title, paragraphs:s.paragraphs, typeLabels:labels(s) })),
    sources: c.sources.filter(s => s.kind === 'web').map(s => { assert(s.title && s.url?.startsWith('https://'), 'Public source needs HTTPS URL and title'); return { title:s.title, url:s.url }; }),
  };
}
