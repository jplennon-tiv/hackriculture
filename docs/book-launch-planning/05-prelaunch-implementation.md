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
to EmailOctopus. It loads external form and reCAPTCHA resources; the site includes
the associated disclosure and a short explanation of email use.

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
