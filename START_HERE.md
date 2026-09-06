# Downloaded project — quick start

This ZIP contains the complete source of the private Hackriculture review site, including configuration, package-lock.json, JSON content, reusable components, local assets and documentation. It excludes node_modules, Git history, caches and generated build output.

## Run locally (macOS or Linux)

Use Node.js 22.13 or newer. In the extracted hackriculture directory:

```sh
npm ci
npm run dev
```

Open the local address printed by Vite.

## Production build

```sh
npx vinext build
npm run start
```

Use `npx vinext build` on macOS: the original `npm run build` wrapper expects GNU timeout, which macOS does not ship. Both invoke the same Vinext build. This project uses React, TypeScript, Vite and the Next-compatible Vinext routing layer; it is not a plain Vite SPA. The build targets a Cloudflare-compatible Worker.

## Edit content

Edit `data/site.json` for identity, links and photographs, and `data/videos.json` for videos. The first six records appear on the homepage. See README.md for the component and route layout.

## Images

Local images are included. As in the published site, the current YouTube logo and video thumbnails load from YouTube/Google image URLs. The homepage tomato photograph loads from hackriculture.com. Their exact URLs are preserved in the JSON; an internet connection is required for those images. Download your original image assets and replace those JSON URLs with local public/images paths if you want to host all imagery yourself.

## Site configuration

The original Sites identity is retained in `.openai/hosting.json` so this is the complete project. It contains no credentials and declares no database or object-storage binding. There are no API keys to configure. Your existing domain is not modified by running this code locally.
