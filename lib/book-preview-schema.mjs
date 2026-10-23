import { z } from 'zod';

const text = z.string().trim().min(1);
const id = z.string().regex(/^[a-z][a-z0-9-]*$/);
export const bookPreviewSchema = z.object({
  version: z.literal(1),
  heading: text, introduction: text, edition: text, note: text,
  defaultFolio: z.number().int().positive(),
  webTextOmissions: z.array(z.object({folio:z.number().int().positive(),text}).passthrough()).optional(),
  source: z.object({
    path: z.string().regex(/^\.\.\/hackriculture-print\/output\/pdf\/[a-z0-9/-]+\.pdf$/),
    sha256: z.string().regex(/^[a-f0-9]{64}$/),
    interiorPages: z.number().int().positive(),
    trimWidthMm: z.literal(185), trimHeightMm: z.literal(240),
  }).passthrough(),
  groups: z.array(z.object({
    id, title: text, description: text,
    spreads: z.array(z.object({id, title: text, pages: z.array(z.number().int().positive()).min(1).max(2)}).passthrough()).min(1),
  }).passthrough()).min(1),
}).passthrough().superRefine((value, ctx) => {
  const spreads = value.groups.flatMap(group => group.spreads);
  const pages = spreads.flatMap(spread => spread.pages);
  if (new Set(value.groups.map(group => group.id)).size !== value.groups.length || new Set(spreads.map(spread => spread.id)).size !== spreads.length)
    ctx.addIssue({code:'custom', message:'Preview groups and spread IDs must be unique'});
  if (new Set(pages).size !== pages.length || pages.some(page => page > value.source.interiorPages))
    ctx.addIssue({code:'custom', message:'Preview folios must be unique and within the source book'});
  if (!pages.includes(value.defaultFolio)) ctx.addIssue({code:'custom', message:'Default folio must be included'});
  for (const omission of value.webTextOmissions ?? []) {
    if (!pages.includes(omission.folio)) ctx.addIssue({code:'custom', message:'A web text omission must refer to a selected folio'});
  }
  for (const spread of spreads) {
    if (spread.pages.length === 2 && (spread.pages[0] % 2 !== 0 || spread.pages[1] !== spread.pages[0] + 1))
      ctx.addIssue({code:'custom', message:`${spread.id} must retain the physical even/odd facing-page order`});
  }
});
