# Growing guide checkpoint — 9 September 2026

**14 September 2026 update:** the shared-data migration supersedes earlier source-location and local-copy instructions. Read the project README and shared-data contract before following historical notes.


## Review

Local carrot page: http://127.0.0.1:5173/growing/carrots/ . The preview process was left running; it may need restarting after the app/session closes.

Use Node 24.20.0 from nvm, then `npm run dev:guides -- --host 127.0.0.1`.
This explicitly reads the shared carrot draft from the sibling hackriculture-data folder. Ordinary `npm run dev` prepares approved content only. `npm run build` always prepares approved content, clearing the generated preview bundle first. The approved source bundle, data/guides/published.json, is empty at this checkpoint.

Page features: existing site branding, reused painterly carrot artwork, quick facts, qualified month rows (including cross-year storage checks), section navigation, full written draft, source date and a working browser-print button with print styles. Empty personal notes and media are absent. The draft has a visible review banner and noindex metadata; production filtering is the actual publication safeguard.

## Files

- app/growing/[slug]/page.tsx and guide.css: reusable page and responsive/print styles.
- components/growing/print-guide.tsx: print action.
- lib/guide-projection.mjs: validates/cleans a versioned guide; rejects draft publication, incomplete examples and unimplemented media/personal-note structures.
- lib/growing-guides.ts: reads generated content, with an additional production draft filter.
- scripts/prepare-guides.mjs: approved build/local draft selection.
- data/guides/published.json: empty reviewed bundle placeholder; not a duplicate reference dataset.
- data/generated/guides.json: ignored, recreated bundle. Do not edit by hand or publish a draft export.
- public/images/guides/carrots-painted.png: unchanged copy of video/public/art/painterly-episode/harvest.png; an illustration, not a new generated photograph.
- tests/guide-projection.test.mjs and guide-export.test.mjs: meaningful content/publication checks.
- package.json: added predev/prebuild/dev:guides scripts; retained all pre-existing changes.

## Validation

- TypeScript passed.
- Static export passed with the existing three public pages; no carrot draft page exported.
- New projection/export tests passed (5 tests). Checked client output for the draft introduction and internal review text.
- Existing rendered-page checks passed (3).
- Wider suite: 11/12 passed. Existing ui-components.test.mjs scrolling-utility assertion fails at `scrollbar-width: thin`; vendor/shadcn-tailwind-4.13.0.css has no corresponding utility definition. These files were not changed. Other three UI tests passed. The sandbox also prevented that test helper's websocket listener; report this diagnostic separately from the CSS assertion.
- Local carrot route returned HTTP 200 before handoff and after restoring the draft bundle.
- Browser screenshots, interaction testing and print visual QA were not performed: the Sites workflow reserves these for an explicit browser-test request. Responsive and print CSS is implemented but not visually verified.
- No deployment, live-site change or editorial approval.

## Next small chunk

Review the actual page with John. Resolve content/layout feedback and, if requested, perform focused mobile/desktop/print browser QA. Only then build the monthly task view or fill out the two other pilot guides. Do not assume that the three-minute video exists at a public URL.

Cross-project source of truth: ../../hackriculture-data/planning/PROJECT-NOTES.md .

## Botanical revision — 9 September 2026

John approved replacing the poster-style concept with a real page design using his supplied artwork. The guide now uses public/images/guides/carrots-botanical.png, copied without alteration from ../resources/images/vegetables/carrot.png (828 × 1208, transparency). The previous painted file is retained but no longer displayed.

Updated page.tsx/guide.css and added components/growing/guide-navigation.tsx: compact botanical hero, coloured facts, readable calendar month abbreviations, sticky desktop contents with current-section highlighting, collapsible sticky mobile contents, numbered full-text chapters and next-section links. The shared JSON and all paragraphs remain unchanged. Missing media/personal notes remain absent. No new images generated. Website layout is the reusable reference; old GPT concept was rejected.

Validation for this revision: TypeScript and production build passed; all five existing guide projection/export tests passed. Local draft route returned 200 before preview handoff. Restored draft preview after build. Browser interaction/visual testing remains unperformed. No publication. Next: John reviews the revised local carrot page; decide which, if any, supporting illustrations are useful before testing Draw Things style matching.

## Collection rollout in progress — 9 September 2026

John approved the template for now and requested the FULL vegetable collection in batches. Website guide content is now local to data/guides/<slug>/content.json, with per-page presentation.json for artwork/category/colour/template selection. This supersedes the earlier shared-draft runtime selection and published.json bundle described above. Both dev and build now depend only on this website checkout. Keep cross-project advice corrections in shared notes; never overwrite edited website copy automatically.

Implemented /growing category index, header/footer guide links, growing-first home CTA and introductory copy. Carrots, outdoor tomatoes and French beans are local draft pages; tomato/bean full copy replaces the earlier structural examples only in the website. Source scope, crop type distinctions and conditional calendars retained. No editorial approval inferred from layout approval. Imported two additional botanical PNGs from resources (1254 square). resources is a cloning source only. No paid generation or publishing.

Next: validate new collection integration, then extend the next batch. docs/GUIDE-ROLLOUT.json tracks all source records. Full collection remains unfinished; do not describe three pages as the entire rollout.

## Second content batch — 9 September 2026

Added beetroot, radishes and parsnips. Six website drafts now available. Each has an independent content/presentation pair and copied botanical PNG. Root-crop dimensions checked from the PNG header. Radish salad/winter types have distinct instructions and calendar windows; parsnip depth/spacing reconciled to current RHS guidance. Source links appear on each page. Candidate source snippets are not copied indiscriminately; historical chemical/peat advice and fixed harvest/storage promises excluded. Parsnip supplied art has stylised foliage/colour: retain for now, revisit in requested graphics pass.

Index includes category jump navigation and noindex in draft preview. Export regression now checks every local draft rather than carrots alone. Next suggested batch: peas, broad beans, runner beans. Remaining queue is recorded in GUIDE-ROLLOUT.json; counts refer to source records, because some combined records will require scope decisions.

Validation at six-guide checkpoint: TypeScript and final production build passed. Eight projection/export/rendered-page tests passed; export checks all local drafts. Restored draft preview; collection and six detail routes each returned HTTP 200. No browser visual/interaction QA or deployment. Six of 44 source records drafted, 38 queued. Next batch is peas, broad beans and runner beans.

## Full series complete locally — 9 September 2026

All 44 source records now have independent website content/presentation files and locally owned artwork. John approved the original six; their approval is recorded and they now export normally. The other 38 were authored in this session under his request to complete the series and remain labelled draft. No publication requested or performed.

The collection covers eight browsing groups with category navigation. Combined records retain an explicit scope (broccoli types, onions/shallots, peppers/chillies, courgettes/marrows, squashes/pumpkins and salsify/scorzonera). Main UK methods and season conditions are described; specialist variants, named variety trials, personal notes and playable videos remain later enrichment. Mushrooms use a named edible-kit route and a kit-specific calendar introduction, not an outdoor sowing plan.

Artwork: untouched cloned originals moved into assets/guides/originals, outside public output. Web-sized WebP heroes plus small lazy-loaded thumbnails are selected in presentation.json. The optional Python/Pillow script scripts/prepare-guide-art.py can update a single slug; no authoring tool or sibling folder is needed for normal site builds. See docs/GUIDE-EDITING.md. All 44 images inspected together in a contact sheet; stylised parsnip foliage, similar chicory/endive imagery and shared courgette/squash imagery can be revisited in the future graphics pass. No generative image calls.

Final checks: 44 content files validated; all source keys covered exactly once; TypeScript and production build passed; ten guide-projection, export and rendered-route checks passed. The production export includes the approved six detail pages and excludes new draft copy/pages. Restored full draft preview and collection plus 44 guide routes returned HTTP 200. Browser navigation/visual/mobile/print QA has not been performed. No claim that the prior unrelated scrollbar utility test was fixed; it was not rerun.

Next work is review/enrichment/graphics or explicit publication, not another missing-crop batch. docs/GUIDE-ROLLOUT.json contains the complete ledger, with 6 approved, 38 draft-ready and 0 queued source records.

## All guides approved and active — 9 September 2026

John explicitly approved every guide and requested removing draft status. All 44 content files now have approved status and recorded approval. Normal dev/build includes the full collection; no need for draft preview. Draft banners and noindex metadata are absent from all 44 exported guides and the collection index. Production build and ten checks passed. Ready-to-upload output: dist/client. John will build/upload manually; no deployment performed. Earlier draft counts in this historical log are superseded.
