// Pure navigation rules shared by the reader and its boundary/deep-link checks.
export function findPreviewPage(frames, folio) {
  const frame = frames.findIndex(item => item.pages.some(page => page.folio === folio));
  return frame < 0 ? null : {frame, side: frames[frame].pages.findIndex(page => page.folio === folio)};
}
export function movePreview(frames, position, single, direction) {
  const {frame, side} = position;
  if (single && side + direction >= 0 && side + direction < frames[frame].pages.length) return {frame, side: side + direction};
  const next = frame + direction;
  if (next < 0 || next >= frames.length) return position;
  return {frame:next, side:single && direction < 0 ? frames[next].pages.length - 1 : 0};
}
export function previewAsset(folio, variant = 'read') {
  return `/images/book/preview/page-${String(folio).padStart(3, '0')}-${variant}.webp`;
}
