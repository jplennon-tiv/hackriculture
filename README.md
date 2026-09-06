# Hackriculture

A React 19 and TypeScript site for Hackriculture, built with Vite/Vinext. All editorial data is local JSON. No database, CMS, shop, analytics or YouTube API key is required.

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

- `data/site.json`: identity, channel links, photographs and topic names.
- `data/videos.json`: verified YouTube titles, URLs, thumbnails, durations, topics and optional short summaries. Array order sets homepage order; the first six appear there.
- `app/page.tsx`: homepage.
- `app/videos/page.tsx`: video catalogue, grouped by topic.
- `app/about/page.tsx`: About page.
- `app/globals.css`: visual tokens and responsive styling.
- `components/site`: shared header, footer, follow panel and typed video cards.

Add a video by copying a record and setting its actual YouTube ID, title, URL, thumbnail, duration and category (`growing`, `food`, `home`). There is no automatic sync: update the JSON and rebuild. This catalogue contains a curated 29-video snapshot from the channel, checked on 6 September 2026. No upload dates or view counts are invented.

Videos open on YouTube. No embedded players, tracking scripts or video cookies are loaded by this application. The channel avatar, YouTube thumbnails and any remotely referenced photographs do make third-party image requests.

The lightbulb-and-leaf logo is the current YouTube channel avatar, referenced directly at its published 160px size. Replace it with the original high-resolution asset if needed. The obsolete website wordmark is not used.

## Hosting

The checked-in `.openai/hosting.json` identifies the private review Site and has no database or object-storage bindings. The default build emits a Cloudflare-compatible Worker. This does not change hackriculture.com or its DNS. The UI components and JSON are independent of database services; the current routing/layout use the Next-compatible Vinext APIs.

## Validation

Production build and TypeScript checks are run before delivery. Browser interaction and visual QA are not included in this first pass.
