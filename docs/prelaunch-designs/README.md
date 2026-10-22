# Hackriculture prelaunch design concepts

Prepared 19 October 2026; revised 20 October after John's feedback. John has selected the **Terracotta Feature layout with the Harvest & Ink palette**. This is the approved visual direction for the local pre-launch rebuild: a large golden book feature, dark olive text and buttons, a pale gold launch form, and a compact video column. Earlier colours and layouts remain available for reference.

## Paperback presentation and video topics — 21 October 2026

The homepage topic strip now follows the three videos under “More from
youtube.com/@hackriculture”. Its label is “Explore videos”, visible on phones as
well as desktop. Category destinations are unchanged.

The shared home/book feature presents the original cover on a CSS paperback
mockup, with thin page edges, a cover crease, perspective and shadow. The source
cover image is unchanged. `featureText` now says “illustrated paperback to keep
by your side”, exactly as John requested. This was the only shared JSON change;
its exact-byte backup/receipt is in shared `backups/admin/2026-10-21T15-14-42-982Z-c1caafea-e2b6-4f8e-951d-3d8fb1264e7e/`.

Build (51 routes), TypeScript and nine launch/rendered-page checks passed. The
exported copy and topic order were also checked. Home and book desktop previews
and 390px/320px homepage layouts were reviewed; no horizontal overflow occurred.
Screenshots: `screenshots/paperback-feature-desktop.png`,
`screenshots/paperback-feature-mobile.png`, `screenshots/explore-videos-below-desktop.png`.

## Linking the book and launch form — 21 October 2026

[Compare the two connection ideas](http://127.0.0.1:5185/docs/prelaunch-designs/connections.html).
The updated homepage has “From the YouTube channel” and “More from
youtube.com/@hackriculture”, with links to John's channel. At John's request,
the official red-and-white YouTube icon now follows the latter address, inside
the same link. Its original artwork, proportions and transparent clear space are
retained. The full wordmark is omitted under YouTube's current
[channel-promotion guidance](https://brand.youtube/promoting-your-channel/).
The address and icon wrap together after the domain on phones. The icon update
passed the build, TypeScript and nine launch/rendered-page checks; desktop, 390px
and 320px layouts were inspected, with no horizontal overflow at either phone size.
Five videos now fill the sidebar, with the
compost and salad-sowing videos added from the existing catalogue. The three lower
videos remain distinct. Both desktop columns stretch to the same height.

John selected the **joined panel**, with “Be first to hear” in dark ink on the
same pale-gold background as the sign-up section. This is now the default on the
plain homepage and in production builds. The red announcement at the top of the
book remains. `HomeBookLaunch` retains development-only comparisons through
`?launch=arrow` and `?launch=joined`. The book page's sign-up layout and provider
settings are unchanged.

The eight-video selection is validated by `lib/book-launch-schema.mjs`. Its guarded
exact-byte backup and receipt are in shared `backups/admin/2026-10-21T14-48-35-583Z-3e048850-08b9-410d-9e6e-a7301fe591af/`.
Only `website/book-launch.json` changed, at `home.videoIds`. No gardening records,
catalogue entries, approved prose or other shared data were edited.

Validation: production build exported 51 routes; TypeScript and the 14 relevant
book-launch, preview and rendered-HTML checks passed. Desktop columns aligned at
1280 and 1024 CSS pixels; both options fit 390 and 320 pixel screens without
horizontal overflow. The comparison's desktop/phone controls and screenshots
were checked. The known EmailOctopus embed loading issue remains visible and is
still recorded in the implementation handover. Nothing was deployed.

## Homepage announcement studies — 21 October 2026

John requested removal of the two-part edition line beneath the homepage nav and
stronger emphasis on “A new book from John Lennon / Coming soon”. The edition
line is removed from the homepage; it remains on the book page.

[Compare the three new treatments](http://127.0.0.1:5185/docs/prelaunch-designs/announcements.html):
red ribbon, full-width announcement band and burgundy publisher’s stamp. The
gallery includes desktop/phone screenshots and links to the actual homepage on
port 5175 using `?announcement=ribbon`, `band` or `stamp`. This selector works only
in development. John selected **“Bold from edge to edge”**, the full-width red
announcement band, on 21 October. It is now the default on the plain homepage
and in the production build.

`components/site/book-announcement.tsx` owns the local comparison behaviour;
scoped styling is appended to `app/harvest.css`. The existing `BookFeature`
component opts into the announcement only on the homepage. No shared JSON,
book-preview assets, launch settings or other page content changed.

Validation: production build exported 51 routes, TypeScript passed, and all 14
relevant launch, preview and rendered-page checks passed. All three treatments
were reviewed at desktop, 390 px and 320 px widths with no horizontal overflow.
Gallery desktop/phone controls and image loading were checked. Screenshots are
under `screenshots/announcement-*`. Nothing was deployed.

## Selected direction: Harvest & Ink

Open [the selected design](http://127.0.0.1:5185/docs/prelaunch-designs/concept.html?design=clay&palette=harvest) or [the colour gallery](http://127.0.0.1:5185/docs/prelaunch-designs/colours.html#harvest), which now defaults to Harvest & Ink. Desktop and phone views remain available. The alternatives are retained for reference:

- **Forest & Cream:** deep green with cream and gold details, connecting to the cover's foliage.
- **Petrol & Parchment:** blue-green and parchment, giving the wider channel an editorial identity.
- **Harvest & Ink:** golden yellow with dark olive text, the brightest launch treatment.
- **Plum & Oat:** deep plum and warm oat accents, picking up the cover's beetroot tones.

The colour variations use `concept.html?design=clay&palette=forest` (or `petrol`, `harvest`, `plum`). Omitting `palette` retains the original Terracotta Feature. New CSS is scoped to that layout and changes colours only; dimensions, wording, images and interactions remain the same. The original layout gallery now links to this colour comparison.

Open [the comparison gallery](index.html) through a local web server. The current preview is [available on port 5185](http://127.0.0.1:5185/docs/prelaunch-designs/index.html). The gallery switches between concepts and desktop or phone width. Each concept also opens on its own. This is a design study outside the application routes and public export.

## Earlier choice: three launch variations

John clarified that Hackriculture covers more than gardening. The front page should prioritise the book and videos; the crop-guide grid should be removed, with growing guides retained as background site content. These three variants implement that brief:

| Variation | Book treatment | Wider channel |
| --- | --- | --- |
| A · Harvest Gold | A warm gold book column and pale gold launch form; closest to the accepted arrangement. | A broader “Grow it. Make it. Work it out.” introduction and a row of garden, preserving and solar videos. |
| B · Terracotta Feature | The book becomes the lead feature in terracotta, with its launch form immediately below. Strongest emphasis on the release. | A compact video column and a short introduction to the wider home, food, DIY and energy subjects. |
| C · Ink & Lemon | A yellow book banner across the top, with a contrasting dark action and launch form in the sidebar. | A video-led front page, followed by stories from the kitchen and workshop. |

All three omit “What’s growing on your plot?” and the front-page crop grid. Navigation and footer links retain access to the existing growing guides. Six selected videos per variation cover gardening, preserving, DIY solar, home maintenance and repairs. Titles, URLs, durations and local thumbnails were checked against `hackriculture-data/website/videos.json`; this was a local catalogue check, not a fresh channel audit. No new video uploads or publication dates are implied.

The masthead, introduction and author section use the wider identity: **self-sufficiency in an urban setting**, including growing, food, DIY and home energy. The book is presented as the gardening part of that broader work. Forms remain demonstrations with no submission endpoint or storage. John selected variation B's layout and subsequently chose Harvest & Ink as its palette.

Open [the current comparison](http://127.0.0.1:5185/docs/prelaunch-designs/index.html#gold), or individual previews: [Harvest Gold](http://127.0.0.1:5185/docs/prelaunch-designs/concept.html?design=gold), [Terracotta Feature](http://127.0.0.1:5185/docs/prelaunch-designs/concept.html?design=clay), [Ink & Lemon](http://127.0.0.1:5185/docs/prelaunch-designs/concept.html?design=ink).

## Earlier newspaper study

John found the first three concepts too spacious and requested a more newspaper-like website with more information on screen. He supplied three specific FleexStudio references:

- [Gardening & Landscaping](https://dribbble.com/shots/25748368-Gardening-Landscaping-website): a compact split introduction, pronounced green panels and grouped image/text features.
- [Gardening, Lawn, and Landscaping](https://dribbble.com/shots/25759682-Gardening-Lawn-and-Landscaping-Website): photography alongside concise headings and compact rows of visual content.
- [GrowBase](https://dribbble.com/shots/27672218-GrowBase-Soil-Organic-Compost-Website-Design): clear content modules, stronger colour and detailed explanations alongside imagery.

All three were inspected visually in the browser. The new fourth concept combines those qualities with John's explicit newspaper preference: a masthead, ruled columns, restrained serif headlines, short story summaries and a browsable crop index. The site brand remains Hackriculture; “Gazette” is the design-study name.

The [first newspaper study](http://127.0.0.1:5185/docs/prelaunch-designs/concept.html?design=newspaper) remains available as a comparison. Its gardening-only language and crop grid are superseded in the three current variants.

The opening desktop grid places the garden introduction and photograph beside the book and launch-notification form, with three video stories directly beneath the introduction. Six free crop-guide links follow. Two enlargable book spreads and John's introduction share the next row. This brings the useful content much closer together without shrinking the main text to fit. On phones, the book and form follow the introduction, videos become compact horizontal stories, and crop links form two columns.

The revision uses existing assets and proposed promotional copy only. No approved guide text, shared data, application routes or live site content was changed. The selected source pages' graphics, sales claims and testimonials were not copied. Fresh garden/book photographs can replace the current images after the physical proof is reviewed.

## The three earlier directions

| Direction | Visual approach | Best fit and tradeoff |
| --- | --- | --- |
| The Gardener’s Journal | Warm paper, dark ink, restrained terracotta, large serif typography, fine rules and a prominent book cover. | Earlier recommendation, superseded by John's request for a denser page. Gives the book a quiet introduction. |
| From the Plot | Large garden photography, forest green, soft sage, warm highlights, flowing editorial sections and an early book introduction. | Strongest connection with John and the channel. Would benefit most from fresh, high-resolution garden and physical-book photography. |
| The Growing Companion | Bold sans-serif headings, precise grids, botanical illustrations and controlled blocks of harvest colour. | Strongest visual connection between the free guide collection and the book. More graphic and energetic, with a denser visual character. |

Each concept contains the introduction, book sample, growing-guide collection, real YouTube links, John’s story and launch-notification form. Navigation moves between these sections. Full-size sample images open from the sample viewer. The illustrated concept also switches between a crop guide and a planning spread.

The email form deliberately shows a demonstration message and clears the field. It makes no request and stores no email address. Connecting the chosen email service, confirmation process, sender details and final privacy text is a later implementation step. No service account or live mailing list has been created.

## Reference study

The [supplied Dribbble search](https://dribbble.com/search/gardening-web-site) was reviewed visually in the browser, including these three examples:

- [Gardening Website Design by Jaber Hossain for Zayancy](https://dribbble.com/shots/27055439-Gardening-Website-Design): restrained plant colour, strong serif hierarchy, simple navigation and deliberate image placement.
- [Gardening Company Website Guides Page by tubik](https://dribbble.com/shots/15394191-Gardening-Company-Website-Guides-Page): generous editorial typography, botanical imagery and a clear visual hierarchy.
- [Simply Rooted Kitchen Garden by Pixiei Studio](https://dribbble.com/shots/27629026-Simply-Rooted-Kitchen-Garden-Gardening-Landscaping-Website): earthy colour, real garden imagery and a sequence that builds trust before the main invitation.

These informed layout principles. No reference artwork, page code, testimonials or commercial claims were copied into the concepts. The three layouts were made for Hackriculture’s author, free-guide and book-launch needs.

## Artwork and content

The channel logo, botanical guide artwork, photographs and verified video thumbnail files are read from the existing website’s `public/images/` directory. Their originals remain unchanged. The five JPG files in this folder’s `assets/` directory are exact copies of existing print-review images, used only to make the concepts locally viewable:

- `book-cover.jpg` comes from `hackriculture-print/docs/publication/bookvault-print-ready/cover-front.jpg`.
- `beetroot-left.jpg` and `beetroot-right.jpg` come from `pages/trim-012.jpg` and `pages/trim-013.jpg` in the same print-review directory.
- `rotation-left.jpg` and `rotation-right.jpg` come from `pages/trim-148.jpg` and `pages/trim-149.jpg`.

The samples and cover remain first-proof material. Public extracts and final publication artwork await John’s physical-proof review. Prototype promotional wording and video captions are proposed design copy; approved guide prose and shared JSON were not edited.

## Verification

The four colour studies were checked at 1152px and 390px browser widths, with identical book-feature dimensions across palettes, no horizontal page overflow and no broken desktop images. Desktop and phone screenshots were inspected and saved as `screenshots/palette-{forest,petrol,harvest,plum}-{desktop,mobile}.png`. Key book text, buttons, form and navigation colour pairs measured at least 5.63:1 contrast. All five gallery choices, including original terracotta, and the phone-width control worked. JavaScript syntax, the production build (49 routes), TypeScript and all 11 relevant Node checks passed. These remain local design studies; shared JSON and application pages were not changed.

The three current launch variants were checked at 1152px, 768px, 390px and 320px browser widths, with no horizontal page overflow. Desktop and phone screenshots were inspected and saved as `screenshots/launch-{gold,clay,ink}-{desktop,mobile}.png`. The original crop-grid section is absent from all three. Video cards use local assets and actual catalogue destinations. The six featured video entries per variant cover the wider channel (Ink & Lemon has one large feature plus five smaller stories).

Mobile menu open/close, both book sample dialogs, the demonstration email form and its privacy explanation were checked. The form cleared the synthetic address and stated that no details had been submitted or saved. The production build exported 49 routes; TypeScript and the 11 guide-projection, guide-export and rendered-HTML checks passed. Shared JSON and application pages were not changed.

The 20 October newspaper revision was checked at 1152px, 768px, 390px and 320px browser widths (the content area is slightly narrower where the scrollbar is present). The 320px header overflow was corrected and rechecked. No horizontal page overflow remained in those checks, and all images loaded. Desktop, tablet and phone screenshots were inspected, including the lower sample/author area.

Mobile navigation opened and closed correctly. Both crop and planning dialogs worked; the crop dialog was also checked within the gallery's phone frame. A synthetic email submission displayed the demonstration message and cleared the field. The new gallery selection and mobile controls worked. The production build again exported 49 routes; TypeScript and all 11 relevant guide-projection, guide-export and rendered-HTML tests passed. Screenshots for this revision are `newspaper-desktop.png`, `newspaper-mobile.png` and `newspaper-details.png`.

Earlier checks for the original three studies:

- All three concepts checked at 1152px, 390px and 320px effective browser widths, with no horizontal page overflow or broken images in those checks. The editorial concept was also inspected at 1024px.
- Desktop and phone screenshots inspected; full-page captures and first-screen previews saved in [screenshots](screenshots/).
- Gallery concept and device controls tested; mobile navigation, crop/planning sample selection, the sample dialog and its full-size page links checked. The sample dialog also checked within the gallery’s phone preview.
- Form submitted locally with a synthetic address: the demonstration message appeared and the field cleared. No collection request exists in the prototype.
- JavaScript syntax checked. Website production build passed with 49 routes and all 44 approved guides; TypeScript passed; 11 relevant guide-projection, guide-export and rendered-HTML tests passed.

The layout and colour decisions are settled. The next phase is to carry the Terracotta Feature layout and Harvest & Ink palette across the local homepage and dedicated book page, connect the launch form once its provider is selected, and preserve existing guide routes. John handles deployment; nothing has been published.
