# Expanded book preview — local experiment

John asked on 20 October 2026 to expand “Take a look inside” into a real book
preview: approximately the first third, plus a few pages from later in the book.
This implementation is local and ready for his review, not deployed.

## What to review

Open <http://127.0.0.1:5175/book/preview/>. The homepage and book-page feature
buttons open this reader at its title page. The homepage's main Aubergine preview
and four lower sample cards open image-only enlargements; the lower panel's
single browse button is in its title bar.

- 23 selected pages in 13 selections, starting with the title page.
- Opening folios 1, 4–5, 7 and 9; then five complete vegetable guides:
  Jerusalem artichoke 10–11, Beetroot 12–13, Carrot 14–15, Cabbage 36–37
  and Aubergine 68–69. John requested this shorter selection on 23 October.
- Later selections: Carrot and Parsnip Troubles 112–113, Potato Troubles 132–133,
  Rotation & planning 148–149 and Greenhouse growing 162–163.
- Intentional blanks and unfinished publication-details page 2 are omitted;
  this is disclosed below the reader. Printed page numbers are retained.
- One continuous column of large printed pages on desktop and phone, a slim
  sticky header and a contents drawer opened only on request. Direct `#page=148`
  links still work. Click a page to enlarge it; Escape or Close returns to reading.
- PDF-extracted text for the current page is linked from Contents. It retains the source text;
  decorative headings and table extraction can be imperfect, as the UI explains.
  No-JavaScript visitors can scroll the pages and get direct full-size image links.
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
Pillow produces WebP derivatives. The current image set is about 11.5 MiB; the
reader lazy-loads page images as visitors scroll.
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

## John's author note and edition details — 23 October

Replaced `home.bookAuthor.paragraphs` in shared `website/book-launch.json` with
John's three supplied paragraphs verbatim. The shared `book.format` tile now
reads “Two editions” / “Imperial edition / Metric edition”, updating the homepage
facts and the book page's availability panel together. No other fields, layout,
photograph or sample images changed.

Guarded transaction and exact preceding JSON bytes:
`../../../hackriculture-data/backups/admin/2026-10-23T14-35-18.470Z-bf3e7392-8153-46c4-b4bb-55f9af06ef7c/transaction.json`.
Build, TypeScript and 15 focused checks passed. Chrome shows all three paragraphs
and both editions without overflow. Screenshot:
`docs/prelaunch-designs/screenshots/home-author-note-two-editions.png`.

## Four homepage spreads and specified typo corrections — 23 October

Corrected only “everthing” → “everything”, “worng” → “wrong”, “There a few” →
“There are a few” and “matter such as” → “matters such as” in John's author note.
The existing Beetroot and rotation spreads now have a second row: Cabbage 36–37
and Brassica Troubles 106–107. All four use the same paper treatment and image
enlargement. The single “Browse the book preview” button moved to the title bar;
the short instruction now says “any spread”. No other author wording changed.

The new Troubles spread is also in the full reader, bringing it to 61 pages.
Only folios 106–107 were newly rendered from the unchanged, fingerprint-checked
proof, with 900px reading images, 1800px enlargements, thumbnails and extracted
text. Other page assets stayed unchanged. Homepage samples remain distinct from
the three book-page section previews. The sample schema accepts these local
reader WebPs alongside the existing JPGs, without loosening the cover schema.
Reader metadata now derives its page count from the selected pages.

Exact-byte data backups and transaction receipts:
- Corrections and initial added sample selections:
  `../../../hackriculture-data/backups/admin/2026-10-23T14-47-55.334Z-b7c8d64e-85e1-4548-a316-09ac64dec9f0/transaction.json`.
- John's follow-up selecting a Troubles spread, plus reader inclusion:
  `../../../hackriculture-data/backups/admin/2026-10-23T14-50-26.525Z-8264a09b-3fbd-4817-8893-d1d2c30b01ba/transaction.json`.

Build, TypeScript and 16 relevant tests passed, including physical page order,
reader navigation, distinct homepage/book-page samples and exported assets.
Chrome verified all eight homepage page images and both new 1800px enlargements.
Desktop review found no overflow and the second row fits beside the longer note.
Screenshot: `docs/prelaunch-designs/screenshots/home-four-preview-spreads.png`.

## Fuller homepage Troubles sample — 23 October

John found the Brassica spread too sparse. Replaced it with Carrot and Parsnip
Troubles 112–113: twelve illustrated problems across two fuller pages. The
homepage and reader selection now use these folios; the book page still uses
Potato Troubles 132–133. The reader remains 61 pages. Only 112–113 were rendered
from the same proof, and the superseded public 106–107 assets were removed.
The asset manifest and contact sheet reflect the new selection.

Chrome retained failed thumbnail requests while the new images were being
prepared. Local reader-image sample thumbnails now use the existing versioned
image URL helper, as enlargements already did; the render version was advanced.
Verified both 900px thumbnails and 1800px enlarged images in Chrome.
Build, TypeScript, all 16 relevant tests and whitespace checks passed.

Exact-byte backups for the two changed shared JSON files and transaction receipt:
`../../../hackriculture-data/backups/admin/2026-10-23T15-00-07.647Z-70ebd35a-54cb-46e1-a5a1-35181dcc8004/transaction.json`.
Screenshot: `docs/prelaunch-designs/screenshots/home-fuller-troubles-spread.png`.

## Main book panel page counts and Aubergine — 23 October

Replaced the two guide-title counts with four page figures, verified against the
current 168-page production proof: 168 total pages, 88 vegetable-guide pages
(10–97), 45 Troubles pages (100–144) and 18 Growing Techniques pages (146–163).
The section figures count actual advice pages, excluding divider, blank and
how-to-use pages. Shared `facts` supplies both main book feature panels.

The homepage now fills the space beneath these figures with the Aubergine spread
(68–69), keeping the paperback cover alongside it and the title-page preview
button below. It uses the existing image-only enlargement with 1800px images.
On phones, the spread spans the panel below the copy and cover. The selected
reader grows from 61 to 63 pages, adding Aubergine among the later selections.
Only those two folios were rendered; existing book assets and PDF are unchanged.

New shared `home.featurePreview.spreadId` selects this spread without duplicating
image metadata. Schema, source contract, skill reference, asset manifest, contact
sheet and selection tests are updated. The four lower homepage samples remain.
Exact-byte data backup/receipt:
`../../../hackriculture-data/backups/admin/2026-10-23T15-06-47.123Z-f5899155-fe0c-4f70-af1b-a926dbcba085/transaction.json`.

Production build, TypeScript, 16 relevant tests and whitespace checks passed.
Chrome verified desktop fit, 390px layout without horizontal overflow, and both
1800px enlarged Aubergine pages. Temporary phone sizing was reset.
Screenshot: `docs/prelaunch-designs/screenshots/home-book-counts-aubergine.png`.

Follow-up: moved the main homepage's “Take a look inside” button to the bottom
right of the gold panel, retaining its title-page destination. The Aubergine
preview stays on the left. Build, TypeScript and all 16 relevant checks passed;
Chrome confirmed the button sits inside the panel's bottom-right padding.

## Cleaner scrolling reader — 23 October

John asked for fewer controls and a reading experience closer to Amazon's
paperback preview. Inspected the live Read sample view of his
[DIY Home Insulation book](https://www.amazon.co.uk/dp/B0CSWCG4K1) in Chrome:
a continuous page column with the additional tools hidden behind a small header.

The local reader now follows that pattern. The normal website masthead/footer
are hidden only on this route. A slim sticky header provides Back to book,
the current folio and Contents. Large original page images scroll in order on a
quiet paper-coloured background. The contents list lives in a modal side drawer;
it includes a link to the current page's extracted text. Clicking a page opens
its existing high-resolution image with one Close button. Native scrolling,
keyboard page scrolling, Escape, deep links and browser history remain usable.

Removed the spread/single switch, persistent thumbnail sidebar, repeated turn
buttons, progress bar, per-page enlargement captions, zoom percentages and
fit-width controls. Brief gap notices explain omitted folios, and the launch
link appears once at the end. All 63 selected pages and their assets are retained;
no shared JSON or source PDF changed. The old page-turn navigation helper was
removed and its test replaced with exported continuous-reading order checks.

Build, TypeScript and 16 relevant tests passed. Chrome checks covered desktop and
390px layouts, Contents jumps, a deep-link reload, image enlargement, Escape,
returning to the book page and restored site navigation. Temporary viewport
sizing was reset. Screenshots: `screenshots/book-reader-clean-desktop.png` and
`screenshots/book-reader-clean-mobile.png`.

Contents jumps use immediate scrolling rather than the site's smooth scrolling.
Deep-linked folios are restored after browser/router layout restoration, including
back/forward and cached page returns; this avoids landing above the selected page.
Reader exit links use ordinary navigation. Browser testing confirmed return to
the selected folio after leaving for the book page.

## Five complete vegetable guides — 23 October

John clarified that the shorter reader should include five complete guides
(ten printed pages). Retained Jerusalem artichoke, Beetroot, Carrot, Cabbage
and Aubergine, preserving all existing homepage/book-page spread enlargements.
Opening pages and the four Troubles/Techniques spreads remain unchanged: the
reader now contains 23 pages. Updated the shared selection, reader copy, sample
FAQ and page metadata; refreshed the asset manifest and contact sheet using the
existing renders. Removed all 160 image/text derivatives for the 40 excluded
folios from public output. No source PDF, page artwork or gardening advice changed.

Exact preceding JSON bytes and guarded transaction receipt:
`../../../hackriculture-data/backups/admin/2026-10-23T15-50-48.903Z-b2b90b8d-cd77-4c38-ba5b-842835c6f662/transaction.json`.

Build, TypeScript and all 16 focused tests passed, including exact reader folio
order, existing homepage/book-page samples and absence of excluded image/text
assets from the static export. Chrome confirms the five-guide contents and
23-page count. Screenshot: `screenshots/book-reader-five-guides.png`.
