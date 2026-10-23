# Self-sufficiency calendar — local implementation, 21 October 2026

## Current homepage experiment — 22 October 2026

The weekly calendar now replaces the “A Self Sufficient Life” introduction card
under the five sidebar videos. The old full-width calendar is removed. The
introduction-video copy and media remain stored for a possible return to that
layout; no shared JSON, advice, images or main-calendar layout changed.

`CalendarWidget` in `components/site/self-sufficiency-calendar.tsx` displays the
current UK week with one complete illustrated job at a time. `CalendarSlides`
rotates every four seconds, wraps through the set and resets on a week change.
The bottom strip has one clickable segment per job, previous/next and pause/play.
The current segment fills during automatic playback. Hover, an off-screen widget
or a hidden browser tab suspends rotation; manual selection or keyboard focus
holds the advice until Play is pressed. Reduced-motion preferences start paused.
Inactive slides are hidden and inert, and share a grid cell to reserve the tallest
job's height without truncating advice. The full-calendar link targets this week.
The widget heading reads “Jobs for early [month]” for weeks 1–2, “Jobs for mid
[month]” for week 3, and “Jobs for late [month]” for week 4+. These simplified
labels apply only to the homepage widget; main-calendar dates and wording stay
unchanged.

Validation: production build, TypeScript and 21 relevant calendar, launch and
static-export tests passed. Chrome checks covered automatic advance, manual
selection, both wrap directions, pause persistence, steady height, loaded artwork
and a 390px phone viewport without horizontal overflow. This is a local design
experiment for John's review; nothing has been deployed.

John requested an annual graphical calendar, weekly tasks, automatic current-month prominence and a current-week homepage summary. His follow-up also authorised importing the two previously excluded maintenance-video transcripts.

## Review

- [Full calendar](http://127.0.0.1:5175/calendar/)
- [Homepage summary](http://127.0.0.1:5175/#calendar-summary)
- Harvest & Ink styling: full-width seasonal month panels, gold current-week highlight, all twelve months expanded. Each month has four editorial slots with at least two task entries per slot (193 entries retained).
- Current month first, followed by the next eleven, with the appropriate year. Date is read in Europe/London after hydration, refreshed every 30 seconds and when visibility changes. Static export is timeless and includes all months and notes without requiring JavaScript.
- Weeks mean days 1–7, 8–14, 15–21 and Week 4+ from the 22nd through month end. They are seasonal prompts, not Monday-to-Sunday ISO weeks or sowing deadlines. February ends on the 28th or 29th as appropriate.
- Every month shows all task notes. The month jump bar sticks to the top while scrolling; jump offsets keep month and week headings clear of it. The homepage widget links directly to the current week.

## Sources and ownership

Editable copy: [shared calendar JSON](../../../hackriculture-data/website/calendar.json). This is a **new editorial draft for John**, not a revision or reapproval of the 44 existing growing guides. [Research record](../../../hackriculture-resources/summaries/self-sufficiency-calendar/research-notes.md) contains exact authority, context, limits and decisions. Crop sources carry exact master key/path and a research fingerprint; build/startup now checks those fingerprints and requires an editorial review if a source field changes; it never rewrites calendar prose automatically.

The research followed the Gardening Research skill: canonical records via the shared reader first, then John's manuscript and local transcripts. UK timings retain frost, soil and variety conditions. Weekly allocation is editorial. Home-maintenance references supplement the relevant videos with equipment/use-dependent advice; no universal battery settings, chimney interval, roof-access procedure or insurance claim is published.

The library now has **56 transcripts**. The new [solar](../../../hackriculture-resources/local/hackriculture-youtube/skV_OpjqtOY/transcript.txt) and [chimney](../../../hackriculture-resources/local/hackriculture-youtube/zBbPG3dKJM4/transcript.txt) reading copies retain original-English automatic captions and timestamps. Limited spelling repairs and unclear phrases are recorded; author review remains pending. All 54 prior reading copies stayed byte-identical. [Catalogue](../../../hackriculture-resources/local/hackriculture-youtube/CHANNEL-CATALOGUE.md), [supplement checks](../../../hackriculture-resources/local/hackriculture-youtube/SELF-SUFFICIENCY-SUPPLEMENT-2026-10-21.json). Historical import/checkpoint files were retained.

## Files and guarded writes

- `lib/calendar-schema.mjs`: structural coverage, unique identities and source/link validation; unknown editorial fields retained.
- `lib/calendar-date.mjs`: UK day, month-relative week slots, leap years and rolling year order.
- `lib/calendar.ts`: single shared content reader.
- `components/site/self-sufficiency-calendar.tsx`: shared date hook, month cards and homepage widget.
- `app/calendar/page.tsx`, `app/harvest.css`: route and visual treatment.
- Homepage, header and footer include the new entry. Existing book content, signup settings and guide copy are retained.
- Creation receipt: `../../../hackriculture-data/backups/admin/2026-10-21T15-43-31.957Z-8e9bbcce-24b8-4be9-9831-ca5fd3e915cd/transaction.json` (previously absent).
- Transcript-source update: `../../../hackriculture-data/backups/admin/2026-10-21T15-49-09.727Z-abb0ddf5-4b3a-4826-9af2-7c6a048046b4/transaction.json` (exact preceding bytes in `0.json`).
- Shared contract and skill data map now identify this resource and the guarded unsupported-resource save route.

## Validation

Production export: 52 routes. TypeScript passes. The 24 focused checks cover UK midnight and DST, leap/century years, all daily slots, rolling December/January order, schema rejection of incomplete/dangling data, source/guide links, full calendar HTML fallback and existing guide/book exports.

Desktop browser review verified October 2026 first, 15–21 October highlighted, all 12 month IDs once, per-month/all-note controls and the homepage link to `#month-10-week-3`. Phone checks at 390px and 320px nominal widths found no horizontal overflow in either page. Screenshots are in `../prelaunch-designs/screenshots/calendar-*.png`.

Local implementation only. John handles upload; nothing has been deployed or sent to subscribers. The previously recorded EmailOctopus loading issue is outside this change.

## Illustration trial — 21 October 2026

John requested a few matching activity icons using the book's house style. Three
new transparent illustrations now accompany October tasks: supporting kale
(`job-95`), checking stored squash (`job-96`) and spreading compost (`job-98`).
The current-week homepage widget automatically shares the first two. This is a
design trial for review, not approval to illustrate the remaining tasks.

The built-in image-generation tool used the print project's Richer A carrot and
beetroot plus its no-dig sequence as style references. [Originals and full prompts](../../assets/calendar/README.md)
are retained in the website; three 360px transparent WebP files are served locally
from `public/images/calendar/`. The renderer uses 76–108px images with task titles
alongside and notes below. No empty image slots are added to other tasks.

Only optional `illustration` metadata was added to three tasks in shared
`website/calendar.json`; all other fields were verified unchanged. The schema,
shared contract and data-map reference now document those fields. Exact preceding
bytes and the completed transaction are in
`../../../hackriculture-data/backups/admin/2026-10-21T16-02-54.860Z-6cf0fbea-1ad7-4b5c-899a-22ac4affff60/`.

Validation: 52-route production export, TypeScript, and 14 calendar/static-export
checks passed. All three image files loaded; desktop and nominal 390/320px phone
views were inspected without horizontal overflow. Screenshots:
`../prelaunch-designs/screenshots/calendar-illustrations-{desktop,home,mobile}.png`.

## Complete illustration set — 21 October 2026

John approved the trial and requested the full set. All 120 task entries now have
activity illustrations: 47 new images plus the three approved originals, reused
where the same activity recurs. Gardening, harvesting, kitchen, greenhouse,
rainwater, solar and stove-care jobs share the same illustration style and colour
palette. Both the calendar and the current-week homepage widget use the same
task metadata and renderer, including when the date changes.

The built-in image-generation tool used the three approved trial images as direct
style references for every new image. [Artwork notes, prompts and contact sheet](../../assets/calendar/README.md)
record the full set. Native transparent PNGs remain in `assets/calendar/originals/`;
50 transparent 360 × 360 WebPs are served from `public/images/calendar/`, totalling
2,010,602 bytes. Existing approved derivatives were preserved. The preparation
script only resizes and encodes missing derivatives.

To keep the year overview compact, closed month cards use 56px illustrations.
Expanded/current-month cards use 76–84px and the homepage uses 100–108px. Each image
has descriptive alternative text, reserved dimensions and lazy loading.

The guarded shared-data update added 117 illustration fields and verified all
existing fields, advice and three approved image assignments unchanged. Exact
preceding bytes and the completed transaction are retained in
`../../../hackriculture-data/backups/admin/2026-10-21T17-06-51.255Z-a098287b-4590-4743-ba89-67e720f7f5a4/`.

Validation: 52 routes exported, zero skipped; TypeScript passes; all 15 focused
calendar/static-export tests pass, including coverage of every task and exported
image file. Browser checks confirmed October first, 15–21 October highlighted,
118 task images for the displayed non-leap year, expanded month notes, and the
homepage link to `#month-10-week-3`. Desktop and 390/320px calendar views and the
320px homepage fit without horizontal overflow. Screenshots:
`../prelaunch-designs/screenshots/calendar-full-set-{desktop,mobile,home,home-mobile}.png`.

This remains local; no deployment or subscriber messages were made.


## Coverage and compact homepage update — 21 October 2026

John requested unnumbered month titles, a minimum of two jobs rather than a fixed
pair, fuller crop coverage (especially cabbage), and a denser homepage widget.
Month headings and jump links now use names without the 01–12 prefixes.

The calendar has **193 entries**, retaining all original 120 tasks byte-for-byte
and adding 73. All **44 canonical crop records** now have at least one task,
compared with 20 previously. Busy weeks contain up to six jobs; the schema has no
upper limit. This is broader coverage, not a claim that every possible crop job
has been listed. Weekly slots are still editorial prompts within seasonal windows.
Cabbage sowing and planting follow the type-specific canonical calendars:
summer, winter/savoy, spring, red and Chinese cabbage are distinguished.

[Expansion evidence](../../../hackriculture-resources/summaries/self-sufficiency-calendar/expansion-notes.md)
records each new task's exact canonical key and field paths. Website guide prose
was not used; guide slugs were read only to provide the existing reading links.
All 79 previous canonical field signatures still matched before the expansion.
There are now 205 signed canonical field references. A new read-only
`check-calendar-sources.mjs` prebuild/predev check rejects changed or missing source
fields and names the tasks needing review; it never silently refreshes prose or
signatures. `dev:guides` uses the same check.

The homepage keeps its position under the book panel. A compact heading strip
sits above two to four columns of jobs, wrapping to one column on phones. All jobs
for the current week appear, with full notes, 72–76px images and a count beside the
date. Five- and six-job weeks use two balanced rows on wide screens. The existing
John panels are retained.

Thirteen matching transparent illustrations extend the approved set to 63.
[Expansion prompts](../../assets/calendar/expanded-set-plan.mjs) and
[generation paths](../../assets/calendar/expansion-generation-log.tsv) record the
built-in image-generation work. Existing assets were preserved.

Guarded calendar transaction (exact previous bytes in `0.json`):
`../../../hackriculture-data/backups/admin/2026-10-21T17-58-24.486Z-94cecf4a-b4ea-40c2-affd-2741fabf3cb9/transaction.json`.
No canonical crop records or approved guide prose were changed.

Validation: production export contains 52 routes and every task/image; TypeScript
and 17 calendar/static-export tests pass. Tests include variable-length weeks,
all 44 crop identities, canonical fingerprint mismatches, preserved advice,
month-name navigation, leap-year handling and static fallback content. Browser
review checked the four-job October widget and its highlighted-week link, expanded
May notes with the six-job planting week, and desktop/390px/320px layouts without
horizontal overflow. Previews: `../prelaunch-designs/screenshots/calendar-expanded-*.png`.
The existing EmailOctopus embed's loading fallback was visible during preview;
that previously recorded issue is unchanged by this calendar work.

Local build only; John handles publication.


## Full-month layout — 22 October 2026

John requested all months in the expanded format, a sticky month jump bar and
catch-up jobs folded into Week 4+. Four columns on desktop become two on tablets
and one on phones. The current month and week keep their gold highlight.

Shared calendar JSON now has four weekly slots per month. All 193 task objects,
illustrations and source signatures were verified unchanged; only the weekly
grouping and explanatory `weekNote` changed. Date logic and schema use the same
four slots, including February and leap years. The homepage now shows the whole
Week 4+ span and its combined tasks. Its title uses one large bold line, and the
seasonal footer was removed at John's request.

Exact preceding JSON bytes and the completed transaction:
`../../../hackriculture-data/backups/admin/2026-10-22T09-34-20.747Z-bdc3ffeb-209a-4849-bf1b-608a2270151e/transaction.json`.

Validation: production build and TypeScript pass; all 17 calendar/static-export
checks pass, including daily coverage across ordinary, leap and century years.
An exact comparison with the backup confirms that all other JSON values are
unchanged. Browser review confirmed 12 expanded months, 48 slots, all 193 notes,
no horizontal overflow at desktop/tablet/phone widths, sticky month jumps with
clear headings, February 2027 ending on the 28th, and the homepage's five-job
22–31 October summary linking to Week 4+. Screenshots are in
`../prelaunch-designs/screenshots/calendar-four-weeks-{desktop,mobile}.png`.
Local only; no deployment.

## Own-material links, DIY focus and balanced weeks — 22 October 2026

John clarified that reader links should lead only to his material, with no link
when none is suitable. Seven external task-link selections now lead to the
already-cited chimney or solar video. The public reading list also excludes
external references; those remain unchanged in shared JSON for research
provenance. `lib/calendar-reading.mjs` defines the eligible existing guide/video
links, the schema permits an omitted `link` and rejects external task links, and
the renderer leaves out the link when absent. Both calendar views share it.

Five sweeping reminders now describe doing and recording the sweep rather than
booking a service. December reads **Check the next chimney-sweeping date**, with
John's `zBbPG3dKJM4` video. The February carrot-store task no longer refers only
to a leap day. [Editorial evidence and source checks](../../../hackriculture-resources/summaries/self-sufficiency-calendar/expansion-notes.md)
record the actual transcript/canonical passages read and the conditions retained.

Thirty-nine jobs move exactly one editorial week. All 193 IDs, illustrations,
source references and fingerprints survive; all other task copy is unchanged.
Late-May storage beetroot and endive move to early June within their exact
canonical windows; the frost-dependent planting conditions remain intact.

| Month | Jobs in weeks 1, 2, 3, 4+ |
| --- | --- |
| January | 3, 3, 3, 3 |
| February | 3, 3, 3, 4 |
| March | 5, 5, 4, 5 |
| April | 5, 5, 5, 6 |
| May | 4, 4, 5, 6 |
| June | 6, 6, 5, 6 |
| July | 4, 5, 5, 5 |
| August | 3, 4, 4, 4 |
| September | 3, 3, 4, 4 |
| October | 3, 3, 3, 4 |
| November | 3, 3, 3, 4 |
| December | 3, 3, 3, 3 |

The completed transaction records all movements and copy/link changes, with
exact preceding bytes in `0.json`:
`../../../hackriculture-data/backups/admin/2026-10-22T10-08-36.764Z-68416759-3588-48e4-9c0b-84cc93399aa8/transaction.json`.

Validation: 52 exported routes (zero skipped), TypeScript, and all 18 focused
calendar/static-export tests pass. New checks cover missing links and rejection
of external public references. Browser review verified December's three jobs per
week, the exact chimney-video destination, all 193 visible notes, no external
task/reading links, no overflow at 1231px and 390px, and the four-job October
homepage widget. December's actual desktop column contents span 585–660px,
compared with the former two/three/two/five-job distribution.
Preview: `../prelaunch-designs/screenshots/calendar-balanced-december.png`.
Local only; no deployment or canonical gardening changes.
