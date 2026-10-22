# Expanded book preview — local experiment

John asked on 20 October 2026 to expand “Take a look inside” into a real book
preview: approximately the first third, plus a few pages from later in the book.
This implementation is local and ready for his review, not deployed.

## What to review

Open <http://127.0.0.1:5175/book/preview/>. The homepage and book-page feature
buttons now open this reader. The existing beetroot and rotation sample cards
link straight to their actual folios, including across a fresh page load.

- 59 selected pages in 31 selections, starting with the beetroot spread.
- Opening folios 1, 4–5, 7 and 9; then all 24 complete crop spreads at 10–57,
  ending with lettuce. This completes the spread at the one-third boundary.
- Later selections: Beetroot Troubles 104–105, Rotation & planning 148–149,
  Greenhouse growing 162–163.
- Intentional blanks and unfinished publication-details page 2 are omitted;
  this is disclosed below the reader. Printed page numbers are retained.
- Desktop facing pages, optional single-page mode, phone single-page turning,
  thumbnail contents, keyboard arrows, direct `#page=148` links and zoom.
- PDF-extracted text is available in a disclosure. It retains the source text;
  decorative headings and table extraction can be imperfect, as the UI explains.
  No-JavaScript visitors get direct links to all selected full-size page images.
- A clear return to the book and launch sign-up at the end. Reading is ungated;
  the reader itself loads no email-provider script or third-party viewer.

## Source and asset preparation

The source is the exact 168-page Bookvault first-proof interior at
`../hackriculture-print/output/pdf/bookvault-print-ready/the-vegetable-guru-interior.pdf`.
Its SHA-256 is pinned in the shared selection file. No source text, artwork,
layout, physical book file, or gardening record was edited.

`scripts/prepare-book-preview.py` reads the selected folios, checks the source
fingerprint, uses Poppler to render the native PDF, removes its 3 mm bleed and
creates 900 px reading images, 1800 px enlarged images and 200 px thumbnails.
Pillow produces WebP derivatives. The total image set is about 29.6 MiB; the
reader displays only the current page/spread and small contents thumbnails.
The 442 MiB source PDF is never copied into `public` or the exported website.

The optional authoring command needs Python with Pillow, Node and Poppler;
`PDFTOPPM`/`PDFTOTEXT` can select explicit executable paths. It is not part of
ordinary build/startup. Existing committed web assets suffice for a site build.
When a future authorised selection shrinks, the renderer removes only its own
obsolete generated page-image/text filenames, keeping excluded pages out of public.

Generated files are under `public/images/book/preview/` and
`public/book-preview-text/`. `book-preview-assets.json` beside this document is
generated provenance: source hash, selected folios and output image hashes.
It is not editable website copy. The contact sheet is
`screenshots/book-preview-contact.jpg`.

## Data ownership and recovery

Editable selection and reader copy live only in shared `website/book-preview.json`.
`lib/book-preview-schema.mjs` validates it; the server projection in
`lib/book-preview.ts` omits the private source path. Selection changes must keep
complete physical even/odd spreads, unique folios and an included default page.
Use the shared-data skill's guarded transaction for this unsupported resource.

Shared `book-launch.json` gained `samples[].previewFolio`, and its sample FAQ
now describes the expanded reader. All unrelated fields, public form settings,
guide prose and media remain intact.

Exact preceding bytes and originally-absent-file information are under shared
`backups/admin/2026-10-20T21-32-39-481Z-3190ca4d-4d39-48ea-b4f0-aff644635848/transaction.json`.
The small follow-up wording refinement has receipt
`backups/admin/2026-10-20T21-39-20-285Z-2bb8f2d6-98e8-42dd-bb14-2e08aa03b48e/transaction.json`.
Both completed under the shared lock, with current-byte checks and rollback data.

## Validation

The production build exports 51 routes. TypeScript and all 21 focused book,
preview, rendered HTML and guide checks pass. Navigation tests walk every
selected page forwards and backwards, cover both ends, resolve right-hand-page
links, reject excluded folios and confirm every selected image/text asset exists.
The static export checks prohibit the source PDF/path and third-party form script
on the reader route. All 59 rendered pages were inspected on a contact sheet;
desktop spread and zoom were inspected at reading size.

Browser review covers desktop and phone layouts, page turning, contents jumps,
zoom and Escape dismissal, text extraction, a later selection and the final-page
boundary. No sign-up submissions or email sends were made for this work.
Phone checks include 390 px and 320 px widths, including a direct link to a
right-hand page. No horizontal page overflow, missing images or console errors
were found. All 91 other existing shared website resources remain byte-identical.

This is a proposal for John's morning review. He can assess the size of the
sample and the reading experience before deployment. The existing print-proof,
publication metadata and Bookvault launch decisions remain with the print handover.

## Homepage open-paperback samples — 22 October 2026

The two compact homepage samples now present the existing proof images as open
paperbacks, with a shallow centre fold, layered paper edges and soft shadows.
The treatment is CSS-only; the source page images and printed content are
unchanged. The samples stack at full width on phones, and their reading links
remain below the printed pages. The book page retains its existing presentation.

The production build, TypeScript and all 15 book-launch, preview and rendered-HTML
checks pass. Browser review at 1600 px and 390 px confirmed the layout without
horizontal overflow; the Beetroot link opens the reader at pages 12–13.
Desktop and mobile screenshots are saved in `docs/prelaunch-designs/screenshots/`
as `home-open-paperbacks-desktop.png` and `home-open-paperbacks-mobile.png`.

John subsequently simplified this homepage section to one “Browse the book
preview” link. The two spreads now open an accessible enlargement dialog instead
of navigating to the reader; their headings, captions and individual reading
links are hidden on the homepage. The dialog uses the same page images, with
optional full-size text, Escape/Close dismissal and focus returned to the image.
On phones the pages stack, with scrolling contained inside the enlargement.
The extra book-overview link was removed from this section too. The production
build, TypeScript and 15 relevant Node checks passed again; desktop and phone
checks covered both spreads, enlargement, dismissal and the single preview link.
Updated screenshots use `home-samples-simple-desktop.png` and
`home-sample-enlarged-desktop.png` / `home-sample-enlarged-mobile.png`.

The preview now starts on its title page (folio 1), and both homepage reader
links explicitly target `/book/preview/#page=1`. The shared
`website/book-preview.json` change affects only `defaultFolio` (12 → 1), with
exact-byte rollback and attribution in
`backups/admin/2026-10-22T10-40-36.957Z-1d5343d1-b470-4a5b-8317-b47fdf8a6e56/transaction.json`.
The production build, TypeScript and 15 relevant checks pass. Both homepage
buttons were followed in the browser, including returning after browsing
Beetroot; each opened the title page. Screenshot: `book-preview-title-entry.png`.

## Image-only homepage enlargements — 22 October 2026

John wanted the two images in “A closer look” to enlarge as the same open-book
images, without an e-reader presentation. Their lightbox now retains the shallow
fold, paper edges and shadows from the thumbnails. The previous heading bar and
“Larger text”/“Fit pages” controls are gone; only a floating Close button remains.
Clicking or keyboard-activating the image toggles zoom, with scrolling to inspect
details. Escape closes it and focus returns to the selected thumbnail.

The lightbox uses the existing 1800 × 2335 px proof derivatives for folios 12–13
and 148–149, resolved by `previewAsset`, instead of the 875 px thumbnail originals.
No redraw, new image asset, source PDF change or shared JSON change was needed.
High-resolution images load only when the enlargement opens. The full reader
remains available through the separate “Browse the book preview” button.

Build, TypeScript and 15 launch/preview/rendered-page checks passed. Browser review
covered both high-resolution spreads, desktop fit and zoom, Escape/focus return,
and the 390 px phone's fit view, zoom, horizontal scrolling and Close button.
The homepage URL stays unchanged. Screenshots in
`docs/prelaunch-designs/screenshots/`: `home-book-image-only-desktop.png` and
`home-book-image-only-mobile-zoom.png`.

John then requested the same behaviour on the book page. Both `/book/` sample
images now reuse `BookSampleEnlargement`, including the open-paperback treatment,
high-resolution images, image-click zoom and Close/Escape behaviour. The existing
headings, captions, descriptions and separate reader links remain. Build,
TypeScript and the 15 focused checks passed; both sample images were opened on
the book page and confirmed to leave its URL unchanged. Screenshot:
`docs/prelaunch-designs/screenshots/book-page-image-enlargement.png`.

John subsequently removed the two “Read from these pages” links beneath the
book-page images. Their headings, captions, descriptions and image enlargements
remain; “Open the book preview” is the section's single reader link.
# Three section previews on the book page — 22 October

The former two-image “Open the book” panel is now three illustrated panels with
the spread on the left, right, then left. The sections use Carrot (14–15),
Beetroot Troubles (104–105) and Greenhouse growing (162–163). The homepage retains
Beetroot (12–13) and rotation (148–149). All images reuse existing selected proof
derivatives; no PDF or image generation was needed.

`components/site/book-section-previews.tsx` owns the layout, while shared
`website/book-launch.json` owns the new explanation and illustration metadata:
`book.previewIntroduction`, `book.contents[].id` and `book.contents[].preview`.
`lib/book-preview.ts` resolves the named spreads for this component and the
contents-page mock-up. The upper contents summaries link to `#sample-growing`,
`#sample-troubles` and `#sample-techniques`. Each spread opens in the existing
image-only enlargement; a single full-reader button remains below all three.

The new copy describes the actual proof pages and is available for John's
refinement. No approved guide prose or existing launch/homepage copy changed.
The exact-byte rollback receipt is
`../hackriculture-data/backups/admin/2026-10-22T16-18-11.329Z-90dceeba-3a03-4371-b271-7d7e93dd3e5b/transaction.json`.

Build, TypeScript and 15 launch/preview/rendered-page tests passed. The updated
preview test checks real selected spreads, no homepage overlap, jump targets,
local illustration files and one full-reader button. Browser review verified
left/right/left placement, all three links and 1800 px enlargements, phone zoom
and Escape, with no horizontal overflow at phone widths. Screenshots are
`book-three-previews-desktop.png`, `book-three-previews-techniques.png` and
`book-three-previews-mobile.png` in `docs/prelaunch-designs/screenshots/`.

## Replacement section illustrations — 22 October

The Troubles preview now has a new spotted beet leaf and magnifying glass,
distinct from the cabbage-and-caterpillar contents icon. Techniques now shows a
three-pronged hand cultivator working soil beside a seedling. Both were created
with built-in ImageGen using the established book illustrations as references.
Original PNGs, web derivatives, exact prompts and provenance are recorded in
`assets/book/sections/README.md`.

Only the two preview illustration records changed in shared
`website/book-launch.json`. The contents icons, actual book spreads and all copy
remain unchanged. Rollback receipt:
`../hackriculture-data/backups/admin/2026-10-22T17-06-23.655Z-0e611fbd-afad-4bb0-9100-c8da50749574/transaction.json`.

Build, TypeScript and all 15 launch/preview/rendered-page checks passed. Both new
images load at the correct proportions on desktop and a 390 px phone, without
horizontal overflow. Screenshot:
`docs/prelaunch-designs/screenshots/book-preview-replacement-art.png`.

John subsequently requested larger illustrations beside the text in all three
preview panels. Their desktop width is now 200 px (previously 155 px), scaling to
160/195/140 px at the existing responsive breakpoints. A 44% width cap preserves
space for text on narrow screens. This is a CSS-only change; artwork, copy and
shared JSON are unchanged. Build, TypeScript and 15 relevant tests passed;
desktop and 390 px phone review confirmed correct proportions and no overflow.
Screenshot: `docs/prelaunch-designs/screenshots/book-preview-larger-illustrations.png`.

## Potato sample and shorter book page — 22 October

The contents summary and first preview panel are now headed “Vegetable growing
guides”. The Troubles sample uses the fuller Potato spread on printed pages
132–133, replacing Beetroot Troubles 104–105 in both the book page and the full
reader. The explanation now describes those potato pages. The 59-page total,
first 24 crop guides, homepage samples and illustration beside the Troubles
text remain unchanged.

Only the two new folios were rendered from the fingerprint-verified first-proof
PDF, using the existing trim and 900/1800/200 px derivative settings. The old
sample derivatives and extracted text were backed up and removed from public
output. The generated asset manifest and contact sheet were refreshed. The
whole “A reference to return to.” section and its “For the plot you have.” and
“A word from John” panels have been removed from `app/book/page.tsx`; buying
questions now follow the previews directly. Their unused shared copy is retained.

Shared data and previous-asset rollback are recorded under
`../hackriculture-data/backups/admin/2026-10-22T17-16-06.713Z-abb95a76-1d39-4674-8248-702d88e303bc/`
(`transaction.json` and `website-assets/`). Build, TypeScript and all 15 focused
checks passed. Browser review confirmed the renamed headings, section removal,
1800 px potato enlargement and phone layout without overflow. Screenshot:
`docs/prelaunch-designs/screenshots/book-potato-troubles-preview.png`.

The accompanying Troubles illustration now also shows a potato plant under a
magnifying glass, replacing the beet illustration. The new original and WebP are
`assets/book/sections/potato-inspection-v1.png` and
`public/images/book/sections/potato-inspection-v1.webp`; the exact built-in
ImageGen edit prompt is recorded in `assets/book/sections/README.md`.
Only the illustration's path and alternative text changed in shared launch data.
Rollback receipt:
`../hackriculture-data/backups/admin/2026-10-22T17-22-25.953Z-b846ad02-85e0-4f25-8dfc-5538eb169aed/transaction.json`.
Build, TypeScript and 15 focused checks passed. Browser review confirmed the
transparent image loads at the established 200 × 150 desktop size. Screenshot:
`docs/prelaunch-designs/screenshots/book-potato-inspection-illustration.png`.

## Compact contents summaries — 22 October

The three contents summaries now retain just their artwork, linked headings and
three bullet points. The headings link directly to their corresponding preview
panels; the introductory sentences and separate “Explore this section” links
are no longer rendered. The book page's closing “The Vegetable Guru is on its
way.” panel was removed, leaving the launch signup as its final section.
Shared copy and the homepage remain unchanged. Build, TypeScript and 15 focused
checks passed; all three title links and the desktop/390 px phone layout were
checked in the browser. Screenshot:
`docs/prelaunch-designs/screenshots/book-simple-contents.png`.

The whole contents panel now uses a pale olive background (`--h-olive-soft`,
`#e9ecdc`), with a fine border and compact responsive padding, to distinguish it
from the white preview panels below. No copy or imagery changed. Build,
TypeScript and 15 focused checks passed; desktop and phone visual checks found
no overflow. Screenshot: `docs/prelaunch-designs/screenshots/book-olive-contents.png`.

## Chrome image refresh — 22 October

John reported missing Potato Troubles pages in Chrome at `/book/#sample-growing`.
Inspection of his tab confirmed both images had failed (`naturalWidth: 0`), even
after a normal reload; the same files returned HTTP 200, decoded in a separate
Chrome image tab, and worked in the in-app browser. Versioned image URLs restored
both pages in the affected tab. The exact cause of the original failed requests
was not captured.

`previewImageUrl` in `lib/book-preview-navigation.mjs` adds a stable render-set
version for displayed images; `previewAsset` retains the physical file path for
asset checks. The reader, sample spreads and enlarged images use the versioned
URLs. Bump that version when replacing the public render set. No image bytes or
shared JSON changed. The affected Chrome tab now loads both 900 px sample pages
and both 1800 px enlargements. Build, TypeScript and 15 relevant tests passed.
Screenshot: `docs/prelaunch-designs/screenshots/book-potato-chrome-fixed.png`.

John subsequently removed the “Open the book.” heading, “59 real pages to
explore” count and introductory paragraph above the three sample panels. The
`#samples` anchor remains, with an accessible “Book sample pages” region label;
all three panels, enlargements and the single full-preview button are retained.
Shared introductory copy remains stored but is no longer rendered here. Build,
TypeScript and 15 focused checks passed. Screenshot:
`docs/prelaunch-designs/screenshots/book-no-preview-intro.png`.
