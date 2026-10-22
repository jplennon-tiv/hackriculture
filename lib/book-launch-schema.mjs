import { z } from 'zod';

const text = z.string().trim().min(1);
const image = z.object({
  src: z.string().regex(/^\/images\/book\/[a-z0-9-]+\.jpg$/),
  alt: text,
  width: z.number().int().positive(),
  height: z.number().int().positive(),
}).passthrough();
const copy = z.object({ heading: text, text }).passthrough();
export const bookLaunchSchema = z.object({
  version: z.literal(1),
  title: text, subtitle: text, author: text, description: text,
  cover: image,
  availability: z.object({ state: z.literal('prelaunch'), label: text, text }).passthrough(),
  featureText: text,
  facts: z.array(z.object({ value: text, label: text }).passthrough()).min(1),
  home: z.object({
    videoIds: z.array(z.string().regex(/^[A-Za-z0-9_-]{11}$/)).length(8),
    broad: copy,
    authorHeading: text,
    authorParagraphs: z.array(text).min(1),
  }).passthrough(),
  book: z.object({
    intro: copy,
    contents: z.array(z.object({ heading: text, text, subjects: z.array(text).min(1) }).passthrough()).length(3),
    steps: z.array(copy).length(3),
    audience: copy,
    format: z.array(z.object({ label: text, value: text }).passthrough()).min(1),
    faqs: z.array(z.object({ question: text, answer: text }).passthrough()).min(1),
  }).passthrough(),
  samples: z.array(z.object({
    id: z.string().regex(/^[a-z][a-z0-9-]*$/),
    previewFolio: z.number().int().positive(),
    heading: text, caption: text, description: text,
    pages: z.array(image).length(2),
  }).passthrough()).min(1),
  sampleNote: text,
  signup: z.object({
    state: z.literal('emailoctopus'), heading: text, text, note: text, buttonLabel: text,
    formId: z.string().uuid(),
    scriptUrl: z.string().regex(/^https:\/\/eomail5\.com\/form\/[0-9a-f-]{36}\.js$/),
    privacy: text,
  }).passthrough(),
}).passthrough().superRefine((value, ctx) => {
  if (!value.signup.scriptUrl.endsWith('/' + value.signup.formId + '.js')) ctx.addIssue({ code:'custom', message:'EmailOctopus script must match its public form ID', path:['signup','scriptUrl'] });
  if (new Set(value.home.videoIds).size !== value.home.videoIds.length) ctx.addIssue({ code:'custom', message:'Featured videos must be distinct', path:['home','videoIds'] });
  if (new Set(value.samples.map(sample=>sample.id)).size !== value.samples.length) ctx.addIssue({ code:'custom', message:'Sample IDs must be distinct', path:['samples'] });
});
