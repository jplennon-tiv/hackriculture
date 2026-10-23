// Only selected public folios can be resolved by the reader's deep links.
export function findPreviewPage(frames, folio) {
  const frame = frames.findIndex(item => item.pages.some(page => page.folio === folio));
  return frame < 0 ? null : {frame, side: frames[frame].pages.findIndex(page => page.folio === folio)};
}
export function previewAsset(folio, variant = 'read') {
  return `/images/book/preview/page-${String(folio).padStart(3, '0')}-${variant}.webp`;
}
// Bump when replacing the public render set so open previews discard failed/stale image requests.
export function previewImageUrl(folio, variant = 'read') {
  return `${previewAsset(folio, variant)}?v=20261023-clean-title`;
}
