# Hackriculture

**Shared-data migration, 14 September 2026:** Read [SHARED-DATA.md](SHARED-DATA.md) first. Editable data now lives in the sibling `hackriculture-data` folder; older standalone setup statements below are historical.


A React 19 and TypeScript site for Hackriculture, built with Vite/Vinext. All editorial data is shared local JSON in `../hackriculture-data/website/`. No database, CMS, shop, analytics or YouTube API key is required.

## The Vegetable Guru prelaunch website

**Resume checkpoint, 21 October 2026:** John is happy with the current local
version and asked to save it for the next session. Start with the
[saved-session handover](docs/book-launch-planning/08-session-checkpoint.md).

The local website now uses John's chosen Harvest & Ink design (20 October 2026).
The homepage and `/book/` use the Terracotta Feature layout; videos, About John,
the growing index and all 44 crop guides share its typography and palette. Read the
[current book and website handover](../hackriculture-print/docs/handover/START-HERE.md#next-session--website-sales-channel)
for the agreed direction, book assets, Bookvault title/order and unresolved launch
decisions. It owns the cross-project handover; this README points to that source.

The first physical proof has been ordered. The intended initial integration is a
book presentation with an external Bookvault purchase link; no listing or live
buy link is active yet. The prelaunch pages use a confirmed EmailOctopus sign-up
flow instead. See [implementation and handover](docs/book-launch-planning/05-prelaunch-implementation.md).
Keep the existing approved guides and videos, preserve local edits, and follow
AGENTS.md and SHARED-DATA.md. This implementation is local; John handles upload.

The [website rebuild plan](docs/book-launch-planning/04-website-rebuild-plan.md)
links the three launch-planning reports prepared on 19 October 2026. These are
proposals for review; the book handover above still owns publication status.

## Develop

Use Node 22.13+ and npm:

```sh
npm ci
npm run dev
```

```sh
npm run build
```

## Content

- `../hackriculture-data/website/site.json`: identity, channel links, photographs and topic names.
- `../hackriculture-data/website/videos.json`: verified YouTube titles, URLs, thumbnails, durations, topics and optional short summaries.
- `../hackriculture-data/website/book-launch.json`: book copy, sample-image metadata, eight selected homepage video IDs (five in the sidebar, three below) and the public EmailOctopus form settings. Validated by `lib/book-launch-schema.mjs`; edit through the shared contract's guarded transaction process.
- `app/page.tsx`: homepage.
- `app/book/page.tsx`: book overview, sample reader, buying questions and launch form.
- `app/book/preview/page.tsx`: the expanded 59-page book reader, with the first 24 crop guides and three later spreads. See [preview handover](docs/book-launch-planning/06-book-preview.md).
- `../hackriculture-data/website/book-preview.json`: proof fingerprint, selected folios and reader copy, validated by `lib/book-preview-schema.mjs`. The source PDF stays outside the public site.
- `app/calendar/page.tsx`: Self-sufficiency calendar, with all 12 months, a current-month lead and weekly task notes. The homepage uses the same tasks in its current-week widget.
- `../hackriculture-data/website/calendar.json`: seasonal editorial draft, 193 task entries covering all 44 crops and 205 signed canonical source references. Weeks have at least two jobs, with no upper limit. Build/startup checks flag changed master fields for editorial review. `lib/calendar-date.mjs` handles UK dates, month-end slots and leap years. See [calendar handover](docs/book-launch-planning/07-self-sufficiency-calendar.md).
- `app/videos/page.tsx`: video catalogue, grouped by topic.
- `app/about/page.tsx`: About page.
- `app/globals.css`: visual tokens and responsive styling.
- `app/harvest.css`: Harvest & Ink homepage, book page and shared masthead/footer.
- `app/harvest-interiors.css`: matching video, About, growing-index and crop-guide presentation; original content and media are retained.
- `components/site`: shared header, footer, follow panel and typed video cards.

Add a video by copying a record and setting its actual YouTube ID, title, URL, thumbnail, duration and category (`growing`, `food`, `home`). There is no automatic sync: update the JSON and rebuild. This catalogue contains a curated 29-video snapshot from the channel, checked on 6 September 2026. No upload dates or view counts are invented.

Videos open on YouTube; the site does not embed YouTube players. All images are served locally: photographs and video thumbnails from public/images/photos, the channel logo from public/images/icons, and approved proof samples from public/images/book. Displaying these images makes no third-party requests. The homepage and book page load EmailOctopus's public form script and its reCAPTCHA resources; these require an internet connection. No EmailOctopus API key is stored in the site.

The lightbulb-and-leaf logo is the current YouTube channel avatar, referenced directly at its published 160px size. Replace it with the original high-resolution asset if needed. The obsolete website wordmark is not used.

## Hosting

The checked-in `.openai/hosting.json` identifies the private review Site and has no database or object-storage bindings. The default build exports static HTML for all routes into `dist/client`, with directory index pages for `/about/` and `/videos/`. Upload the contents of `dist/client` to the domain root on your static web host. No server runtime is needed. See START_HERE.md for upload steps. This does not change hackriculture.com or its DNS. The UI components and JSON are independent of database services; the current routing/layout use the Next-compatible Vinext APIs.

## Validation

The 20 October prelaunch implementation passed the production build (50 routes),
TypeScript and 15 relevant Node checks. Desktop/phone review covered navigation,
sample enlargement, form rendering and overflow. A single authorised sign-up test
was received and confirmed by John, then verified as Subscribed with the launch
tag in EmailOctopus. See the handover for commands and remaining launch tasks.

The subsequent style extension also preserved rendered text, links and image
references across all 47 affected pages. All 92 shared website JSON files stayed
byte-identical. Desktop and phone checks covered guide contents, category jumps,
long crop names, calendars and video descriptions.
