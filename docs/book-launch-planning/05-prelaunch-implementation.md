# Prelaunch implementation — 20 October 2026

## Current state

John's selected Terracotta Feature layout and Harvest & Ink palette are built in
the real local website, at `/` and `/book/`. Preview with
`npm run dev -- --host 127.0.0.1 --port 5175 --strictPort`, then open
<http://127.0.0.1:5175/> or <http://127.0.0.1:5175/book/>. Port 5185 contains the
earlier static design studies, not the application.

The gold book feature leads the homepage, with compact videos beside it and a
pale-gold launch form beneath it. Food, DIY and home energy remain part of the
identity. Existing growing guides remain available through navigation; the front
page has no crop-guide grid. Shared navigation and footer use the new design.

The book page adds a content overview, two enlargable sample spreads, practical
use notes, format details, John’s introduction, buying questions and launch
notifications. The sample reader supports Escape, focus restoration, scrolling
on phones and links to the original page images. Samples are public first-proof
JPGs, not a link to the production PDF.

Availability remains “Coming soon”. There is no invented release date, price,
ISBN or active purchase link. The physical proof is awaiting review; the print
[handover](../../../hackriculture-print/docs/handover/START-HERE.md) owns
publication facts. The live domain has not been uploaded or changed.

## EmailOctopus

The account belongs to `john@hackriculture.com`. John completed its password,
terms, activation and sign-in himself. No credentials or API keys are stored in
the website. The official public embed runs once per page and submits directly
to EmailOctopus. It loads external form and reCAPTCHA resources; Google's original
badge is visible, with a short explanation of email use under “Privacy”.

| Setting | Value |
| --- | --- |
| Audience | `5d4c895e-ccc7-11f1-a8b5-69422779ee23` |
| Form | The Vegetable Guru — launch notifications |
| Public form ID | `ec0d61ae-ccc7-11f1-81d0-dd2405fa9b5a` |
| Public script | `https://eomail5.com/form/ec0d61ae-ccc7-11f1-81d0-dd2405fa9b5a.js` |
| Subscriber tag | `vegetable-guru-launch` |
| Sender | John at Hackriculture — `john@hackriculture.com` |
| Double opt-in | Enabled on the audience |
| Confirmation subject | Confirm your Vegetable Guru launch notification |
| Confirmation button | Yes, notify me at launch |
| Success page | You’re on the launch list. |

The form asks only for email and book-launch consent. Its success text asks the
visitor to check their inbox and confirm. The scope is a book-launch notification,
not general newsletter enrolment. Keep this promise when choosing recipients:
use Subscribed contacts with the `vegetable-guru-launch` tag.

On 22 October, John requested removal of the duplicate consent checkbox. It is
now disabled in EmailOctopus itself: the clearly labelled “Email me at launch”
button and existing email confirmation express the requested opt-in. Double
opt-in, the subscriber tag, success copy and bot protection were not changed.

John authorised one real test sign-up. The homepage accepted it, John received
the email and clicked the confirmation button, and the account showed
`john@hackriculture.com` as **Subscribed**, with the correct tag. That test contact
has been retained. No campaign or automation was created or sent. Campaign
unsubscribe behaviour has not been tested by sending a campaign.

Form and confirmation styling match the site's colours. Provider branding remains
visible. No paid upgrade was selected. Domain-level sender authentication was not
configured or independently verified during this work. It can be reviewed before
the launch campaign using EmailOctopus's [domain verification instructions](https://help.emailoctopus.com/article/160-verifying-a-new-domain).

Provider references: [embedding forms](https://help.emailoctopus.com/article/251-how-to-add-the-form-code-to-my-website),
[double opt-in](https://help.emailoctopus.com/article/36-how-to-edit-double-opt-in),
[form tags](https://help.emailoctopus.com/article/33-forms).

## Maintenance and recovery

- Editable book presentation and public form settings live in the single shared
  `../hackriculture-data/website/book-launch.json`. Validation is in
  `lib/book-launch-schema.mjs`; `lib/book-launch.ts` also resolves selected video
  IDs against the existing shared catalogue. Preserve unknown fields and follow
  the shared-data skill's guarded-write process.
- Components live under `components/site/`; `app/harvest.css` scopes the new page
  treatment. Existing guide prose, gardening records and video catalogue were
  not rewritten. Public sample JPGs were copied unchanged from the approved local
  design assets into `public/images/book/`.
- Initial creation receipt under shared `backups/admin/`:
  `2026-10-20T20-45-31-305Z-8174b778-fd10-4725-9619-21b751c7e05b/transaction.json`.
  It records that `website/book-launch.json` did not previously exist.
- Email integration receipt:
  `2026-10-20T20-59-40-603Z-20859b73-2409-4862-82a8-9a870438c998/transaction.json`.
  Its sibling `book-launch.json` is the exact preceding file. Both transactions
  completed under the shared lock with fingerprint checks.

## Validation

The production export contains 50 routes, including all 44 approved crop guides.
TypeScript and all 15 relevant checks passed:

```sh
npm run build
npx tsc --noEmit
node --test tests/guide-projection.test.mjs tests/guide-export.test.mjs tests/rendered-html.test.mjs tests/book-launch.test.mjs
```

Browser review covered desktop and 390px/320px layouts, mobile menu open/close,
home/book navigation, repeated form mounting, required-email validation, sample
enlargement and Escape/focus restoration, FAQ and privacy disclosure, image
loading and horizontal overflow. No page errors were observed in the checked
home/book navigation. The service test above verifies submission through to a
confirmed contact; it is separate from static build checks.

The exported `dist/client` was also served independently for a browser check:
the book form loaded, the sample dialog opened and closed, navigation reached the
retained guide index, and all 44 guide images loaded with no browser errors.

Screenshots: [homepage](screenshots/home-desktop.png),
[phone](screenshots/home-mobile.png), [book](screenshots/book-desktop.png),
[accepted test](screenshots/signup-test-accepted.png).

## Next release steps

John reviews the local pages and printed proof. Before public upload, make any
copy/asset changes arising from that review and check the form from the actual
domain after upload. John handles the build/upload; the standalone artifact is
the contents of `dist/client/`, including `book/`, all guides and local images.

Once the edition, price and retailer URL are confirmed, update the book page with
the real purchase action and delivery guidance, and test the complete retailer
journey. A filmed page-through can then use the physical proof. Prepare the launch
email separately, including its unsubscribe link, for John's approval to send.

## Style extension — videos, About and growing guides

Later on 20 October, John approved the first two pages and requested the same
style for videos, About John and growing guides, retaining existing content.
`app/harvest-interiors.css` now supplies the paper background, serif typography,
olive rules and actions, warm gold highlights and compact index layouts. Page
components gained scoped style classes; their content and data readers are intact.

The treatment includes all 44 individual guides as well as their index. Botanical
artwork, facts, calendars, chapter navigation, source links and print controls are
retained. Crop artwork is contained within its frame, avoiding the previous image
overlap. Phone contents remain collapsible; guide print styles retain their
existing layout and now hide the renamed shared masthead/footer correctly.

Before/after export comparisons confirmed identical main-page text, link
destinations and image references across the 47 affected pages. All 92 shared
website JSON files remained byte-identical. No data transaction was necessary.
The build still exports 50 routes; TypeScript and all 15 relevant checks passed.
Browser review included desktop and 390px/320px phone layouts, all 29 video cards,
all 44 index links, category jumps, guide contents, ordinary and long crop titles,
and the kit-specific mushroom calendar introduction. Video descriptions remain
visible on phones. No service settings or live website were changed in this pass.

## Expanded preview — 20 October

The two-spread sample viewer has become a dedicated reader of 59 actual book
pages. The homepage and book-page links now lead into it. See the current
[preview handover](06-book-preview.md) for selection, provenance, recovery and
validation. Existing email-list settings and launch status are unchanged.

## Follow-up: embed loading — 21 October

During the homepage announcement design review, the existing public EmailOctopus
embed reached its loading-error fallback on both the homepage and a fresh book-page
tab. The expected script element was present, but neither a form nor an iframe
was inserted after the timeout. Browser error logs were empty. The form component
and shared signup settings were not changed, and no sign-up was submitted.
The cause has not been diagnosed; check provider availability/account/form status
and the embed before launch. This does not undo John’s successful earlier test.

## Homepage introduction video — 22 October

The former “A practical sort of life.” panel now contains a larger thumbnail link
to John's “A Self Sufficient Life - My Story” video. Its sole heading, above the
thumbnail, is “A Self Sufficient Life”; there is no duplicate beside the image.
It replaces the paragraph and this panel's “Meet John” link. The separate
“A word from John” panel remains. The introduction thumbnail fills the panel's
content width on desktop and phones. The video rows above use tighter 10 px
minimum gaps and separator padding, making room for the larger introduction.

The existing `site.introVideoUrl` identifies `EgWiQnMn9qM`. Title/channel were
verified against YouTube's oEmbed response; its 8:50 duration comes from the local
channel inventory dated 8 October. The thumbnail is saved locally as
`public/images/photos/video-EgWiQnMn9qM.jpg`. Presentation metadata is in
`book-launch.json` at `home.broad.video`, validated by the launch schema. Original
copy is preserved in data. The exact-byte rollback receipt is
`hackriculture-data/backups/admin/2026-10-22T13-40-39.715Z-7cb0791c-1535-49d1-bdf6-879177013477/transaction.json`.

The production build, TypeScript and 10 relevant launch/rendered-page checks
passed. Desktop and 390 px phone review confirmed the larger image, correct
video destination, removed paragraph/link and no horizontal overflow. Screenshots:
`docs/prelaunch-designs/screenshots/home-intro-fullwidth-desktop.png` and
`home-intro-fullwidth-mobile.png`.

## Unified homepage book section — 22 October

The preview and author note now form one full-width section, headed “A closer
look at The Vegetable Guru”. The existing photograph accompanies “A word from
the author” and three draft paragraphs explaining the book's practical purpose.
John requested draft text and will refine it; it is not approved publication
copy. The book page's older author section and copy remain unchanged.

The section sits on subtly angled, layered cream paper, with a very faint real
Beetroot page behind the content and a decorative SVG spiral edge. This is a
background treatment, not a change to the paperback's binding. Four facts below
both columns reuse `book.book.format`: binding, current-proof page count, size
and measurement edition. The single preview button still opens at the title page,
and the two spreads retain their enlargement dialogs. Phones stack the content
and show the facts in two columns.

`components/site/home-book-details.tsx` owns this presentation. New copy is in
shared `website/book-launch.json` at `home.bookAuthor`; its required shape is
checked by `lib/book-launch-schema.mjs`. All earlier fields are preserved. The
guarded save and exact-byte rollback are recorded at
`hackriculture-data/backups/admin/2026-10-22T14-11-11.424Z-9438bb51-0120-46b3-8af8-40859ab0bc93/transaction.json`.

The production build, TypeScript and 15 launch/preview/rendered-page checks
passed. Desktop and 390 px phone review covered layout, legibility, all four
facts, no horizontal overflow, and opening/closing a sample dialog. Screenshots:
`docs/prelaunch-designs/screenshots/home-book-paper-desktop.png` and
`home-book-paper-mobile.png`.

## Matching paper treatment for the main launch panel — 22 October

**Rolled back at John's request on 22 October.** The top panel again uses its
previous flat red, gold and cream backgrounds without spiral binding, paper
texture, angled edges or shadow. The lower book/author section retains its
approved paper treatment. The description and screenshots below record the
discarded experiment.

The joined homepage launch panel now shares the lower book section's spiral
binding, layered paper edges, faint texture and soft shadow. Its red announcement,
gold book area and cream sign-up area retain their existing colours. The change
is presentation-only in `app/harvest.css`, reusing `spiral-binding.svg`.

Only the decorative paper layer is angled. Keeping the panel itself untransformed
preserves the embedded sign-up provider's fixed badge positioning on phones.
Decoration ignores pointer events, and the email field remains accessible.

The production build, TypeScript and 10 launch/rendered-page checks passed.
Desktop and 390/320 px phone review confirmed the three colours, readable controls
and no horizontal overflow. Screenshots: `home-launch-paper-desktop.png` and
`home-launch-paper-mobile.png` in `docs/prelaunch-designs/screenshots/`.

## Simpler launch sign-up — 22 October

The provider's “Include a consent checkbox” setting is off and was verified after
saving and reloading. This affects the existing public embed wherever it is used.
The local homepage and book page now use the shorter disclosure label “Privacy”,
retaining all existing privacy copy and contact links. The separate reCAPTCHA
paragraph was removed; CSS explicitly keeps Google's original badge visible
because EmailOctopus otherwise hides it. Spam protection remains enabled.

The public script's response uses a four-hour browser cache. `launch-form.tsx`
adds a stable `v=2026-10-22` query parameter so existing visitors receive the
updated form immediately. Change that revision only alongside a future form
deployment. No shared JSON or account credentials changed.

References checked: [ICO consent methods](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/lawful-basis/consent/how-should-we-obtain-record-and-manage-consent/)
include an explicit opt-in button; [EmailOctopus's form settings](https://help.emailoctopus.com/article/33-forms)
make the checkbox optional; [Google's badge guidance](https://developers.google.com/recaptcha/docs/faq)
requires a visible substitute notice when its badge is hidden. Privacy information
remains accessible as required by [EmailOctopus's acceptable-use policy](https://emailoctopus.com/legal/acceptable-use-policy).

Build, TypeScript and 10 launch/rendered-page tests passed. The existing privacy
assertion now checks the shorter control and retained policy link. Browser review
confirmed the checkbox was absent, the badge visible, privacy disclosure working,
and the 390 px phone layout free of horizontal overflow. No new sign-up or email
was submitted. Screenshots: `home-signup-simplified.png` and
`home-signup-simplified-mobile.png` in `docs/prelaunch-designs/screenshots/`.

## Compact launch panel — 22 October

Removed “Follow on YouTube” from the shared sign-up panel on both launch pages.
Reduced the homepage heading's padding and bottom gap, paragraph spacing, panel
bottom padding and the embed's top/branding margins. The book-page panel also
uses tighter padding and column spacing. Form controls retain their usable sizes;
privacy access, provider branding and the visible reCAPTCHA badge remain.

Build, TypeScript and 10 launch/rendered-page checks passed. Homepage desktop and
390 px phone review confirmed the removed link and no horizontal overflow.
Screenshots: `home-signup-compact.png` and `home-signup-compact-mobile.png` in
`docs/prelaunch-designs/screenshots/`. No provider setting, shared JSON or email
submission changed in this follow-up.

## Privacy beside the provider logo — 22 October

The Privacy disclosure now sits on the same line as EmailOctopus's branding on
both launch pages. `LaunchForm` places the existing React disclosure beside the
provider's footer when it loads, with a normal below-form fallback if that footer
is unavailable. Opening the disclosure gives the explanation a full-width row.
The original provider logo/link and privacy copy are retained.

Build, TypeScript and the 10 launch/rendered-page checks passed. Desktop and
320 px phone review confirmed aligned footer items, no horizontal overflow,
and keyboard opening/closing of the disclosure. Screenshots:
`home-signup-inline-privacy.png` and `home-signup-inline-privacy-mobile.png` in
`docs/prelaunch-designs/screenshots/`. No email was sent or provider setting changed.

## Coming-soon ribbon in the book preview panel — 22 October

Added a small red ribbon immediately after “A closer look at The Vegetable Guru”.
It reuses `book.availability.label`, matches the main announcement's red, and
wraps beneath the title on narrow screens. The paper background and content are
unchanged. Build, TypeScript and 10 launch/rendered-page checks passed; desktop
and 390 px phone review confirmed legibility and no horizontal overflow.
Screenshots: `home-book-coming-soon.png` and `home-book-coming-soon-mobile.png`
in `docs/prelaunch-designs/screenshots/`.

## Book menu NEW badge — 22 October

Added a small tilted red “NEW!” splash beside “The Vegetable Guru” in the shared
main navigation, including the mobile menu. It uses the book announcement red
and cream lettering, with the complete label remaining one link.

Build, TypeScript and 10 launch/rendered-page checks passed. Browser review
confirmed the badge on desktop and the 390 px mobile menu, no horizontal
overflow at 602 px or 390 px, and correct navigation to the book page with the
mobile menu closing and active state updating. Screenshots: `book-nav-new-desktop.png`
and `book-nav-new-mobile.png` in `docs/prelaunch-designs/screenshots/`.

## Illustrated contents section — 22 October

Rebuilt “Useful advice, close to hand.” with the real contents spread (folios
4–5) on the left and the three existing section summaries stacked alongside it.
The spread uses the existing paper edges, centre fold and shadows, plus the
shared image-only enlargement and zoom controls. On smaller screens the summaries
move below the spread. All original introduction, headings, descriptions and
subject lists remain sourced from shared JSON; no shared data changed.

The crop guides use the book's roots illustration; Techniques uses its seedlings
and trowel. A new transparent damaged-leaf/caterpillar illustration was generated
to match them for Troubles. Web versions are 360 × 270 px, approximately 108 KiB
combined. Sources, generation prompt and original are in `assets/book/sections/`.

Build, TypeScript and 15 launch/preview/rendered-page checks passed. Browser
review covered the desktop arrangement, 880 px layout and 390/320 px phones,
image loading, no horizontal overflow, the 1800 px contents enlargements, zoom,
Escape and Close. Screenshots: `book-contents-illustrated-desktop.png` and
`book-contents-illustrated-mobile.png` in `docs/prelaunch-designs/screenshots/`.

Follow-up: removed the contents spread's buff wrapper background and border at
John's request. The book now sits directly on the page; its paper colour, page
edges, shadows and enlargement behaviour are retained.

The three section illustrations were then enlarged: up to 145 px on desktop
(previously 110 px), 145 px in the tablet columns and 96 px beside phone copy
(previously 82 px). Desktop and 320 px browser review confirmed the fit; build,
TypeScript and 10 launch/rendered-page checks passed. Screenshot:
`book-contents-larger-illustrations.png` in `docs/prelaunch-designs/screenshots/`.
