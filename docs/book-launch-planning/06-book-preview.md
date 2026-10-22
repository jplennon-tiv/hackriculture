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
