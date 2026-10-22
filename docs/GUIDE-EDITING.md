# Editing a growing guide

Every page has two editable resources in ../hackriculture-data/website/guides/<slug>/:

- content.json contains the introduction, facts, calendar, section headings and paragraphs, sources and review state. The sections array controls reading order and navigation. Change only the crop you want to update.
- presentation.json selects botanical-v1, category, accent, hero image and thumbnail. Change artwork here without regenerating copy or videos. Mushrooms also has a kit-specific calendar introduction.

The shared layout is app/growing/[slug]/page.tsx and guide.css. The site-wide Harvest & Ink treatment is scoped in app/harvest-interiors.css; its guide overrides apply to screen layouts, retaining the existing print layout. Shared layout changes apply across the collection. Keeping one layout prevents 44 copies drifting apart, while each page's section order remains independently editable. Do not edit generated JSON or dist output.

## Images

Project-owned originals are in assets/guides/originals/<slug>.png, outside the public build. They are unchanged copies from John's resources library. WebP heroes and small index thumbnails are in public/images/guides. The index lazy-loads thumbnails; it does not download the 72 MB original library. No project depends on resources.

After replacing one original, run scripts/prepare-guide-art.py <slug> with Python and Pillow. It updates only that crop's web images and dimensions in presentation.json. Omitting the slug processes the collection. Pillow is an optional authoring dependency, never needed for npm build/dev; the committed WebP files are sufficient. The Codex bundled Python runtime currently provides Pillow.

To use a manually prepared local image instead, update presentation.json with its /images/... path, accurate dimensions and alternative text. Remove or replace its thumbnail field too so the index shows the new image. Decorative icons used by the shared interface are in the React components and can be changed once without rewriting any guide.

## Content and approval

John approved all 44 guides on 9 September 2026. All are active and included in normal development and production builds. John handles building and uploading manually. The optional npm run dev:guides command can include future drafts for local review. Approval is stored as status: approved plus review.approvedBy and review.approvedOn. Significant advice revisions should go through review again.

Approved website prose is kept in the shared folder. Numeric quick facts with `masterPath` are read from the live master, without a copied value. Edit those using print admin. Scoped calendars and editorial summaries remain reviewed adaptations; check consistency when changing master advice. The shared dated JSON and earlier pilot drafts are historical inputs, not runtime overwrite sources. Record general horticultural corrections in the shared project notes so the video workflow can be updated separately. Layout/image changes never regenerate videos.

## Scope

All 44 source records have pages. Combined subjects retain their own scope, including broccoli types, onions/shallots and salad crop families. These are practical starter guides, not a claim to cover every cultivar or specialist growing technique. Verified videos and John's own observations can be added in a later enrichment pass. Display categories are browsing groups, not crop-rotation families.
