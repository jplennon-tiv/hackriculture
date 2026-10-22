# Calendar activity illustrations — 21 October 2026

John approved the three trial illustrations and requested the complete calendar set. The collection now contains 63 matching activity illustrations for all 193 task entries, shared by the annual calendar and the homepage's current-week widget. Recurring activities reuse the same file.

All artwork was generated with the built-in image-generation tool. The approved three images are retained unchanged and supplied as the direct style references for the other 47 in the original full set and the 13 added for expanded crop coverage. No existing book artwork was changed.

## Full-set authoring record

- [Full prompts, style references, image descriptions and task assignments](full-set-plan.mjs). Each generation uses `common` plus its individual subject prompt, all three `references`, and a transparent background. This is an artwork authoring record; the website reads its content exclusively from the shared calendar JSON.
- [Generation source paths](generation-log.tsv) record the original generated PNG for each new illustration.
- [Contact sheet of the complete collection](full-set-contact-sheet.png).
- Native transparent PNGs are retained in `originals/`; the served 360 × 360 WebP versions are in `public/images/calendar/`.
- `node scripts/prepare-calendar-art.mjs` creates missing WebPs using resizing and encoding only. It preserves existing files and checks transparency.
- Compact overview cards use 56px images; open month cards use 76–84px; the compact homepage widget now uses 72–76px. All images have reserved dimensions, descriptions and lazy loading.

The shared `website/calendar.json` owns each task's optional `illustration` metadata. The calendar and homepage use the same renderer, so the illustrated current week updates with the date. See [implementation and validation notes](../../docs/book-launch-planning/07-self-sufficiency-calendar.md).

Full-set validation: all 120 tasks mapped; all 50 transparent 360px WebPs included in the 52-route standalone export; TypeScript and 15 calendar/export tests passed. Desktop and phone views were inspected, including 320px width and the homepage's link to the highlighted week. The complete served set is 2,010,602 bytes (about 39 KB per image); native PNGs and this contact sheet are not served.

## Expanded crop coverage

Thirteen additional illustrations cover planting and harvesting cabbage, sweetcorn,
asparagus crowns, rhubarb crowns, Jerusalem and globe artichokes, mushroom kits,
celeriac, purple sprouting broccoli, cauliflower and celery. They were generated
with the built-in image tool using the same three approved style references.

- [Full expansion prompt set and alternative text](expanded-set-plan.mjs)
- [Selected generated originals and saved paths](expansion-generation-log.tsv)
- Saved PNGs: `assets/calendar/originals/`; served WebPs: `public/images/calendar/`

The first sweetcorn-block candidate had too few rows; a second generated candidate
was selected showing four short rows. No old illustration was overwritten. Every
one of the 193 calendar entries has a local image. The initial full-set contact
sheet above remains a historical record of the first 50 assets.

## Original approved trial

The three original prompts and book references follow, retained for continuity.

## House style

References: 
- /Users/johnlennon/Documents/web_site/hackriculture-print/public/images/heroes/richer-a/carrot.png
- /Users/johnlennon/Documents/web_site/hackriculture-print/public/images/heroes/richer-a/beetroot.png
- /Users/johnlennon/Documents/web_site/hackriculture-print/docs/publication/topic-pages/cultivation-dig-no-dig/assets/no-dig-sequence-v1.png

## Shared prompt

Use case: scientific-educational. Asset type: a small activity illustration for the Hackriculture Self-sufficiency calendar, matching The Vegetable Guru book. Create ONE isolated square illustration with genuine transparent background. Reference images 1 and 2 are HOUSE STYLE ONLY: bold simplified dimensional shapes, clean broad colour planes, controlled shadows, warm cream highlight slashes, rich forest and fresh green, warm orange, brown earth and wood. Reference image 3 is HOUSE STYLE and garden-tool continuity only. Do not copy its multiple panels. Match these references, with even LESS tiny detail so the illustration reads at 90–120px. A single compact composition, low three-quarter view, fills about 85% of the square, centred, complete silhouettes with clear safe margins. No background glow, no scenery, no white box, no circular badge, no text, letters, labels, arrows, logos or watermark. No black outlines, photographic texture, painterly wash or noisy soil. 

## Individual prompts

### support-winter-kale-v1

Subject: securing a mature curly KALE plant before winter. One recognisable dark green kale plant growing in a small oval of brown earth, with a sturdy tan wooden stake planted beside its upright stalk. Show TWO visible loose pale ties supporting the stalk against the stake, leaving room for growth. A small, simple pale grey garden-mesh hoop can sit behind the plant as a secondary cue to securing covers, but do not obscure the main plant or imply mesh dangling loosely on it. No human, no pot, no snow. The activity should read primarily as supporting the plant, not harvesting.

### check-stored-squash-v1

Subject: checking winter squash in storage. Show ONE small low wooden slatted storage shelf, carrying two intact winter squashes with short dry brown stems: a rounded warm orange ribbed squash and a dark forest-green round squash. Leave a clearly visible air gap BETWEEN the fruits; do not pile them. A single simple bare hand emerging from a short forest-green cuff at the right gently rests against the orange fruit's side as if checking its firmness. No person or body, no other props, no cut-open fruit, no leaves, no box walls. Clean dry undamaged fruit and open slats convey storage and inspection.

### spread-compost-v1

Subject: dressing an empty vegetable bed with mature compost. A compact small oval patch of warm-brown bare ground, partly topped with a visibly darker smooth layer of compost, with a modest mound still waiting to be spread. A complete plain tan wooden-handled garden RAKE with a forest-green metal head lies diagonally across the patch, its short tines resting on the surface where the dark compost has been spread level. This is surface dressing, not digging. No extra soil layers, seedlings, sacks, wheelbarrow or people. Use only a few large stylised earth shapes, no detailed speckling. Strong compact silhouette.

## Files and use

The trial linked three October tasks (job-95, job-96, job-98) to the images below. The approved files now also cover matching activities elsewhere in the year.

- [Supporting winter kale](../../public/images/calendar/support-winter-kale-v1.webp)
- [Checking stored squash](../../public/images/calendar/check-stored-squash-v1.webp)
- [Spreading compost](../../public/images/calendar/spread-compost-v1.webp)

All three retain transparency. 52-route production build, TypeScript and 14
calendar/static-export checks passed; desktop and phone layouts were inspected.
See [implementation notes and rollback location](../../docs/book-launch-planning/07-self-sufficiency-calendar.md#illustration-trial--21-october-2026).
