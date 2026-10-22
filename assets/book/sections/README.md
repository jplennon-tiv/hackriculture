# Book section illustrations

Prepared 22 October 2026 for the local book page. These are decorative companions
to the existing section copy, not diagnostic advice.

## Potato inspection illustration — 22 October

John requested that the illustration beside Vegetable Troubles match the new
potato sample. The existing beet-and-magnifier illustration was used as the edit
target and style reference; the replacement retains the magnifier, green/amber
palette and transparent background.

- Mode: built-in ImageGen edit, no CLI fallback.
- Input: `assets/book/sections/troubles-inspection-v1.png`.
- Saved original: `assets/book/sections/potato-inspection-v1.png`.
- Website: `public/images/book/sections/potato-inspection-v1.webp`, 480 × 360,
  WebP quality 88 with original alpha preserved.
- Shared owner: `website/book-launch.json`,
  `book.contents[troubles].preview.illustration`.

Exact prompt:

> Use case: precise-object-edit. Asset: replacement illustration beside Vegetable Troubles on The Vegetable Guru website. Input image is the edit target and exact style reference. Change the beet plant to a recognisable potato plant being inspected. Potato foliage must have green branching stems and compound leaves with pairs of oval pointed green leaflets and a larger terminal leaflet, not broad beet leaves or red stems. Keep the brass-rimmed magnifying glass with its short amber wooden handle on the right, inspecting one potato leaflet with a few brown spots; show the spotted leaflet clearly through its lens. Retain the small patch of crumbly dark brown soil at the base; two modest tan potato tubers peeking from the side of the soil may reinforce identity, with no giant cutaway. Preserve the current bold gardening-book drawing style: simplified organic shapes, crisp curved edges, saturated leafy greens, warm earth and amber tones, broad glossy highlights and smooth clean shading. Compact balanced 4:3 composition, whole plant and tool visible, modest transparent margin, readable at 200px wide. This is a section emblem, not a scientific diagnosis chart. No human hands or faces, no other tools, no red stems, no beetroot, no text, labels, frame, watermark, white rectangle, checkerboard, photorealism or watercolour texture. Preserve a genuinely transparent background around and between objects.


## Original contents-summary artwork

| Website asset | Source |
| --- | --- |
| `public/images/book/sections/growing-v1.webp` | `../hackriculture-print/docs/assets/vegetable-guru-stock/assets/h1-roots-beetroot-hero-style-v2.png` |
| `public/images/book/sections/techniques-v1.webp` | `../hackriculture-print/docs/assets/vegetable-guru-stock/assets/h5-growing-start-hero-style-v2.png` |
| `public/images/book/sections/troubles-v1.webp` | New original: `assets/book/sections/troubles-v1.png` |

Paths are relative to the website root. Existing book art is unchanged. The web
derivatives are RGBA images fitted into a transparent 360 × 270 canvas, Lanczos
downsampling, WebP quality 88, method 6. All three retain transparency.

The contents pages themselves reuse existing proof images for folios 4 and 5,
selected through `lib/book-preview.ts`; the enlarged images are 1800 px wide.
Their text has not been regenerated or redrawn.

## Preview-panel redraws — 22 October

John requested different artwork for the larger Troubles preview and a simple
cultivation subject in place of its neighbouring greenhouse icon. Both were
created with the built-in image-generation tool. The contents-summary artwork
and existing calendar assets remain unchanged.

| Subject | Saved original | Website derivative |
| --- | --- | --- |
| Inspecting a spotted beet leaf | `assets/book/sections/troubles-inspection-v1.png` | `public/images/book/sections/troubles-inspection-v1.webp` |
| Hand cultivator working soil | `assets/book/sections/cultivation-v1.png` | `public/images/book/sections/cultivation-v1.webp` |

Both derivatives are 480 × 360 px with transparency, Lanczos downsampling,
WebP quality 88 and method 6. Their metadata is in shared
`website/book-launch.json`, under `book.contents[].preview.illustration` for
`troubles` and `techniques`. No copy, selected proof pages or other metadata
changed. The exact preceding bytes were saved in
`../hackriculture-data/backups/admin/2026-10-22T17-06-23.655Z-0e611fbd-afad-4bb0-9100-c8da50749574/transaction.json`.

Input 1 for Troubles: `assets/book/sections/troubles-v1.png`.
Input 1 for Techniques: `public/images/calendar/ventilate-greenhouse-v1.webp`.
Both used the book's `h5-growing-start-hero-style-v2.png` from the source table
as input 2, for style only.

Exact Troubles prompt:

> Use case: precise-object-edit. Asset: replacement illustration for the Vegetable Troubles preview panel on The Vegetable Guru website. Image 1 is the existing illustration to replace; image 2 is a style reference. Completely replace the single cabbage leaf and caterpillar subject with a small beet plant with red stems, three broad green leaves, one leaf showing a few distinct brown spots, and a simple round hand magnifying glass positioned in front of that leaf to suggest inspecting the problem. A little soil around its base is fine. No caterpillar, no cabbage, no huge exposed beetroot. This is a section emblem, not a diagnostic chart. Match the existing book drawing language exactly: bold simplified organic shapes, crisp curved edges, saturated green and warm earthy colours, broad glossy highlights, smooth clean shading; natural plant proportions. The magnifying glass has a simple brass or dark green rim and short wooden handle, with a clear lens showing the spotted leaf behind it. No human hands or faces. Compact balanced 4:3 composition, everything fully visible with a modest transparent margin, clear at 155px width. Genuinely transparent background, including space around and between objects. No white rectangle, checkerboard, paper, frame, text, labels, watermark, photorealism or watercolour texture.

Exact Techniques prompt:

> Use case: precise-object-edit. Asset: replacement illustration for the Growing Techniques preview panel on The Vegetable Guru website. Image 1 is the greenhouse illustration to replace entirely; image 2 is a style reference. Replace the entire greenhouse with a very simple cultivation subject: one three-pronged hand cultivator with a warm wooden handle and green metal head, its three short curved tines raking a small patch of crumbly brown soil. Show three shallow grooves in the soil directly behind the tines, with a few loosened clods. A single small seedling at the edge can give context, away from the tool. Tool proportions must be credible: ordinary compact hand tool, the handle approximately twice the length of the metal head; three distinct curved tines attached to one head. Show the complete tool at a gentle diagonal, no cropped handle. No hands, people, greenhouse, building, watering can, pots or extra tools. Match the book style: bold simplified shapes, crisp smooth edges, saturated natural greens, warm brown soil and amber wood, broad glossy highlights and clean restrained shading. Compact balanced 4:3 composition that reads at 155px width, modest transparent margin. Genuinely transparent background around the little patch of soil; no scenic backdrop, no white rectangle, no checkerboard, no frame, text, labels or watermark. No photorealism, fine texture or watercolour.

## Contents-summary Troubles illustration

Generated with the built-in image-generation tool, then saved in this project as
`assets/book/sections/troubles-v1.png`. No CLI or API-key fallback was used.

Input 1 (subject/edit target):
`../hackriculture-print/public/images/troubles/cleaned/brassica_troubles/cabbage_caterpillars-v1.png`.
Inputs 2 and 3 (style only): the roots and seedlings originals listed above.

Exact prompt:

> Use case: style-transfer. Create one transparent gardening illustration for the Vegetable Troubles section of The Vegetable Guru website, to display beside the two existing bright book illustrations. Image 1 is the subject/edit target: a damaged green cabbage leaf with one or two caterpillars and a few ragged holes. Images 2 and 3 are style references only: match their bold, simplified shapes, saturated green palette, crisp curved edges, broad glossy highlights, smooth clean shading and friendly gardening-book appearance. Redraw image 1 in exactly that illustrated style; keep a recognisable single cabbage leaf, short visible stem, and one clearly visible green caterpillar on its surface, with just several large bite holes. No watercolour texture, no fine intricate veins, no photorealism. Compact balanced 4:3 composition, subject fully visible with a modest transparent margin, legible at 110px wide. Transparent background including holes in leaf, no checkerboard pattern, no ground, no shadow, no text, no labels, no frame. This is a broad section illustration rather than a diagnostic scientific drawing.
