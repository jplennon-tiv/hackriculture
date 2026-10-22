import content from '@shared/website/book-preview.json';
import { bookPreviewSchema } from './book-preview-schema.mjs';
import { previewAsset } from './book-preview-navigation.mjs';

const checked = bookPreviewSchema.parse(content);
// Only the selected public pages reach the client, never the source PDF or its path.
export const preview = {
  heading: checked.heading, introduction: checked.introduction,
  edition: checked.edition, note: checked.note, defaultFolio: checked.defaultFolio,
  groups: checked.groups.map(group => ({id:group.id, title:group.title, description:group.description})),
  frames: checked.groups.flatMap(group => group.spreads.map(spread => ({
    id:spread.id, title:spread.title, group:group.id,
    pages:spread.pages.map(folio => ({
      folio, src:previewAsset(folio), large:previewAsset(folio, 'large'), thumb:previewAsset(folio, 'thumb'),
      text:`/book-preview-text/page-${String(folio).padStart(3, '0')}.txt`,
      width:900, height:1168,
    })),
  }))),
};
export type BookPreview = typeof preview;
export const previewPageCount = preview.frames.reduce((total, frame) => total + frame.pages.length, 0);

export function getPreviewSpread(id: string) {
  const frame = preview.frames.find(item => item.id === id);
  if (!frame || frame.pages.length !== 2) throw new Error(`Missing two-page book preview: ${id}`);
  return {
    caption: `${frame.title} · Pages ${frame.pages[0].folio}–${frame.pages[1].folio}`,
    previewFolio: frame.pages[0].folio,
    pages: frame.pages.map(page => ({
      src: page.src, alt: `${frame.title}, page ${page.folio}`,
      width: page.width, height: page.height,
    })),
  };
}
