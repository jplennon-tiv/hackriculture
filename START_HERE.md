# Downloaded project — quick start

**Latest saved state — 21 October 2026:** read the
[session checkpoint](docs/book-launch-planning/08-session-checkpoint.md) before
continuing. It records the accepted website/calendar state, validation, recovery
snapshot and remaining release work. The setup information below remains useful.

**Current local prelaunch build (20 October 2026):** keep this checkout beside
`hackriculture-data`, `hackriculture-print` and `hackriculture-video`. Editorial
JSON lives in the shared sibling, not in a local `data/` folder. See
[README.md](README.md), [SHARED-DATA.md](SHARED-DATA.md) and the
[prelaunch handover](docs/book-launch-planning/05-prelaunch-implementation.md).

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
npm run build
```

Use Node.js 22.13 or newer. The build creates a static website in `dist/client`, including `index.html`, `about/index.html`, `videos/index.html`, JavaScript, styles and all local images. No Node.js or Cloudflare runtime is needed on your web host.

## Upload with FTP / SFTP

1. Run `npm run build` and wait for all routes to export successfully.
2. Back up your existing live website.
3. Upload **the contents of `dist/client/`** to your domain's document root (often `public_html`). Keep the `assets`, `images`, `about` and `videos` directories and all other exported files intact. Do not upload the parent `dist` folder, `dist/server`, source files or `node_modules`.
4. Check the homepage, then open and refresh `/about/` and `/videos/` directly. Check images and video links.

This configuration assumes the site is served at the domain root. The host must serve `index.html` for directories; no single-page-app fallback rule is needed. Preserve unrelated server files such as `.htaccess` when uploading.

## Edit content

Identity and videos live in `../hackriculture-data/website/site.json` and
`videos.json`; `book-launch.json` selects homepage videos and holds the book
presentation and public launch form settings. Follow the shared-data skill for
guarded edits. See README.md for component and route layout.

## Images

All site images are included locally. Photographs and video thumbnails live in `public/images/photos`; the logo lives in `public/images/icons`. The JSON content uses these local paths, so displaying images does not require access to external image hosts. Video links still open YouTube.

## Site configuration

The original Sites identity is retained in `.openai/hosting.json` so this is the complete project. It contains no credentials and declares no database or object-storage binding. There are no API keys to configure. Your existing domain is not modified by running this code locally.
