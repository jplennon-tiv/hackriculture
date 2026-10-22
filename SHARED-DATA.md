# Shared data

For current and future JSON work, read and use the
[hackriculture-data skill](../hackriculture-data/.agents/skills/hackriculture-data/SKILL.md).
Its data map distinguishes editable website copy from gardening records and
generated projections; keep its references current when their contracts change.

Read the [shared data contract](../hackriculture-data/SHARED-DATA.md) before changing data access or content. It supersedes all older instructions about local JSON, root/source mirrors or reading the 8 September reference snapshot.

Current master: `../hackriculture-data/vegetables/<key>/<key>.json` and `troubles/<key>/<key>.json`, with `records.json` manifest and root `vegetable_groups.json`. Read using shared `lib/records.mjs`; website prepare-guides does this directly. Print admin is the writer; backups are under shared `backups/admin/`. Approved website editorial resources remain in `website/` and are unchanged. Keep all four projects as siblings. Root combined gardening files are retired; never recreate them.

## Validation checkpoint — 14 September 2026

- Live master files are byte-identical to the pre-migration print source: 44 crops, 14 trouble groups and 8 display groups. Historical reference checksums and all three historical pilot draft checks passed. All 44 website guides retain identical paragraphs, summaries, scopes, seasonal tasks and approval records.
- Print: 133 tests passed, including an isolated HTTP integration test of save, vegetable/trouble image upload/delete, auth rejection, invalid-data rejection, exact preceding-byte backups and absence of local mirrors. TypeScript/Vite build passed with the existing large-chunk warning. The transfer smoke test passed: four crops in both unit systems produced eight two-page A4 PDFs, plus the trouble PDF and admin login. Output: `/var/folders/87/dktgk05x62bcp6pv24n9q4cm0000gp/T/garden-transfer-check-eB74M0`.
- Website: production build exported 49 routes; TypeScript passed. All 11 guide/projection/static-page checks passed; the full suite was 14 passed, 1 failed. The failure is the pre-existing `tests/ui-components.test.mjs` scrollbar-width:thin CSS assertion, already noted in the earlier project history. No stylesheet or component-library changes were made. A new test proves changed master measurements flow into projected facts while paragraphs stay unchanged and missing metric values cannot fall back to stale data.
- Video: TypeScript and all 13 parent tests passed; all 17 kit tests passed. `source.mjs verify` passed against the current master. No media generation, external worker calls or publication was performed.

The print server was restarted at http://127.0.0.1:5173; website development preview uses http://127.0.0.1:5175 to avoid the print port. To refresh website projections after a master edit, restart the dev command or rebuild. Normal print admin login still requires a session password selected through start.command; the verification server uses an undisclosed random session password.

Browser verification: carrot and radish website routes passed on desktop, and radish passed at 390px width with no horizontal overflow, missing images or page errors. The visible carrot depth is the master value (1.3 cm). Desktop screenshots were inspected; the existing carrot hero overlaps the facts area, which is outside this data migration's layout scope. Print admin GET reads shared data; direct Vite filesystem access to the shared backup README returned 403. Both shared verification utilities also passed when invoked from /tmp, confirming independence from shell cwd. The retired website video pilot's extracted carrot provenance was moved to `hackriculture-data/provenance/website-pilot/carrot-source.json`; its documentation now points there.

The temporary website QA server on port 5175 was stopped after verification. The print server remains running on port 5173. Start the website with `npm run dev -- --host 127.0.0.1 --port 5175 --strictPort` while print is running.
