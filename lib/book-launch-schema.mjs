import { z } from 'zod';

const text = z.string().trim().min(1);
const image = z.object({
  src: z.string().regex(/^\/images\/book\/[a-z0-9-]+\.jpg$/),
  alt: text,
  width: z.number().int().positive(),
  height: z.number().int().positive(),
}).passthrough();
const sampleImage = image.extend({
  src: z.string().regex(/^\/images\/book\/(?:[a-z0-9-]+\.jpg|preview\/page-\d{3}-read\.webp)$/),
});
const copy = z.object({ heading: text, text }).passthrough();
export const bookLaunchSchema = z.object({
  version: z.literal(1),
  title: text, subtitle: text, author: text, description: text,
  cover: image,
  availability: z.object({ state: z.literal('prelaunch'), label: text, text }).passthrough(),
  featureText: text,
  facts: z.array(z.object({ value: text, label: text }).passthrough()).min(1),
  home: z.object({
    featurePreview: z.object({spreadId:z.string().regex(/^[a-z][a-z0-9-]*$/)}).passthrough(),
    videoIds: z.array(z.string().regex(/^[A-Za-z0-9_-]{11}$/)).length(8),
    broad: copy.extend({video: z.object({
      title: text,
      image: z.string().regex(/^\/images\/photos\/video-[A-Za-z0-9_-]{11}\.jpg$/),
      duration: z.string().regex(/^\d+:\d{2}$/),
    }).passthrough()}),
    authorHeading: text,
    authorParagraphs: z.array(text).min(1),
    bookAuthor: z.object({heading: text, paragraphs: z.array(text).min(1)}).passthrough(),
  }).passthrough(),
  book: z.object({
    intro: copy,
    channelStory: z.object({
      defaultVariant: z.string().regex(/^[a-z][a-z0-9-]*$/),
      variants: z.array(z.object({
        id: z.string().regex(/^[a-z][a-z0-9-]*$/), label: text,
        paragraphs: z.array(text).min(1).max(3),
      }).passthrough()).min(1),
      photographs: z.array(image.extend({
        sourceVideoId:z.string().regex(/^[A-Za-z0-9_-]{11}$/),
        timeSeconds:z.number().int().nonnegative(),
      })).length(2),
    }).passthrough().superRefine((story,ctx) => {
      if (new Set(story.variants.map(item=>item.id)).size !== story.variants.length || !story.variants.some(item=>item.id===story.defaultVariant))
        ctx.addIssue({code:'custom',message:'Story choices need unique IDs and an included default'});
      if (new Set(story.photographs.map(item=>item.sourceVideoId)).size !== story.photographs.length)
        ctx.addIssue({code:'custom',message:'Story photographs must come from distinct videos'});
    }),
    previewIntroduction: text,
    contents: z.array(z.object({
      id: z.enum(['growing', 'troubles', 'techniques']),
      heading: text, text, subjects: z.array(text).min(1),
      preview: z.object({
        spreadId: z.string().regex(/^[a-z][a-z0-9-]*$/),
        lead: text,
        paragraphs: z.array(text).min(1),
        illustration: z.object({
          src: z.string().regex(/^\/images\/(?:calendar|book\/sections)\/[a-z0-9-]+\.webp$/),
          alt: text, width: z.number().int().positive(), height: z.number().int().positive(),
        }).passthrough(),
      }).passthrough(),
    }).passthrough()).length(3),
    steps: z.array(copy).length(3),
    audience: copy,
    format: z.array(z.object({ label: text, value: text }).passthrough()).min(1),
    faqs: z.array(z.object({
      question: text, answer: text,
      link: z.object({text, href:z.string().regex(/^\/(?!\/)[a-z0-9/#?=&-]*$/)}).passthrough().optional(),
    }).passthrough().superRefine((faq,ctx) => {
      if (faq.link && faq.answer.split(faq.link.text).length !== 2)
        ctx.addIssue({code:'custom',message:'FAQ link text must appear exactly once in its answer',path:['link','text']});
    })).min(1),
  }).passthrough(),
  samples: z.array(z.object({
    id: z.string().regex(/^[a-z][a-z0-9-]*$/),
    previewFolio: z.number().int().positive(),
    heading: text, caption: text, description: text,
    pages: z.array(sampleImage).length(2),
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
  if (value.book.contents.map(part => part.id).join(',') !== 'growing,troubles,techniques') ctx.addIssue({code:'custom', message:'The three book sections must retain their stable order', path:['book','contents']});
  if (new Set(value.book.contents.map(part => part.preview.spreadId)).size !== 3) ctx.addIssue({code:'custom', message:'Each book section needs a different preview spread', path:['book','contents']});
});
