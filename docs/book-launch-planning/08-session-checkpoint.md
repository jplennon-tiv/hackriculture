# Saved session — 21 October 2026

John's latest response: “Much better.” He then asked to save everything so work
can resume tomorrow. Stop implementation here and wait for his next direction.
This checkpoint does not schedule a reminder or authorise publication.

## Resume

Work in `/Users/johnlennon/Documents/web_site/hackriculture`. Read AGENTS.md,
README.md, SHARED-DATA.md and docs/GUIDE-EDITING.md first; use the shared-data skill
for JSON work. Preserve the existing working tree, including earlier unrelated
edits. Nothing has been committed, reset, pushed or deployed as part of this save.

Preview: <http://127.0.0.1:5175/>. If it is not running, inspect the port before
starting `npm run dev -- --host 127.0.0.1 --port 5175 --strictPort`.
The old port 5185 design studies are not the current application.

## Current accepted direction

- Harvest & Ink, compact newspaper layout. Homepage and book page lead the launch;
  videos, About John and all growing guides use the same style.
- Bold red edge-to-edge “A new book from John Lennon” announcement; joined
  pale-gold launch notification panel; paperback mock-up and wording.
- YouTube channel links and icon, expanded video sidebar, and Explore videos
  below the three featured videos. Hackriculture covers food, DIY and home energy
  as well as gardening.
- A 59-page reader uses real proof pages, with the selected first section and
  later samples. The original production PDFs remain in the print project.
- Self-sufficiency calendar: all twelve months, current UK month first and current
  weekly slot highlighted. Unnumbered month headings/navigation. 193 jobs covering
  all 44 canonical crop records; at least two jobs per slot, up to six in the
  current content and no schema maximum. Seasonal cabbage types have separate
  sowing and planting reminders.
- 63 matching activity illustrations (13 added in the last pass), used by every
  task. Homepage widget has a compact heading, two to four desktop columns and
  full practical notes, with all current-week jobs shown. John’s other panels
  remain. Narrow screens use one column.

The new calendar prose retains its existing `draft-for-john` data status; John's
positive design feedback was not used to rewrite approval metadata.

## Authority and files

Crop advice comes from `hackriculture-data/vegetables/<key>/<key>.json`, read
through `lib/records.mjs`. Website guide prose is not a calendar authority; guide
links are further reading. John's local manuscript and transcripts support the
original research, with external equipment guidance for home-maintenance details.
Do not repeat research or regenerate the approved guides merely to resume.

The calendar is owned by `hackriculture-data/website/calendar.json` and shared by
both views. Build/startup verifies 205 exact source-field signatures and blocks
on changed/missing fields for review; it does not silently rewrite advice.
The original 120 tasks were verified unchanged during the 73-task expansion.

- [Calendar implementation, evidence and transaction receipts](07-self-sufficiency-calendar.md)
- [Prelaunch implementation and email account](05-prelaunch-implementation.md)
- [Book reader](06-book-preview.md)
- [Artwork originals, prompts and saved generation paths](../../assets/calendar/README.md)
- [Research evidence](../../../hackriculture-resources/summaries/self-sufficiency-calendar/expansion-notes.md)
- [Latest homepage screenshot](../prelaunch-designs/screenshots/calendar-expanded-home.png)
- [Latest calendar screenshot](../prelaunch-designs/screenshots/calendar-expanded-desktop.png)

## Verification at the stopping point

Production build exported 52 routes with zero skipped. TypeScript and all 17
focused calendar/static-export tests passed. Every task/image is included in the
standalone export. Desktop, 390px and 320px layouts were reviewed without
horizontal overflow; current-week navigation and the six-job May week were
checked. The current standalone output is `dist/client/`.

No additional build is needed for this documentation-only checkpoint. Before
publishing or after implementation changes, run the relevant checks again:

```sh
npm run build
npx tsc --noEmit
node --test tests/calendar.test.mjs tests/rendered-html.test.mjs
```

## Outstanding release work

Follow John's next instruction. The printed proof still needs review; the print
handover owns publication facts. “Coming soon” remains correct: no live purchase
link, final release date or publication approval has been recorded here.

The EmailOctopus account and double opt-in test were successfully confirmed
earlier. Recent local previews showed the embed's loading-error fallback. This
is documented in the prelaunch handover and remains undiagnosed; check it before
launch. No new test sign-up, campaign or subscriber message was sent.

John handles building/upload unless he instructs otherwise. Keep the sibling
projects in place; do not regenerate the print proofs or activate book sales
simply because this checkpoint is being resumed.

## Recovery snapshot

A separate dated checkpoint is saved under
`/Users/johnlennon/Documents/web_site/checkpoints/hackriculture-2026-10-21-191853/`. Its `README.txt` records the exact archive path,
coverage, exclusions and verification. It captures the website source, artwork,
current standalone build, shared-data working files and backups, and the calendar
research/YouTube transcript library. Dependencies, Git internals and rebuildable
caches are excluded. Existing files and Git history remain untouched.

Restore into a new directory first, compare with the live sibling projects, and
recover only the intended files. Do not extract over newer work blindly.
