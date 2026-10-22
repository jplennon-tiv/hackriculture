# Hackriculture website instructions

Use the shared [hackriculture-data skill](../hackriculture-data/.agents/skills/hackriculture-data/SKILL.md)
for JSON reads, edits, schema maintenance and recovery in this and future
sessions. Read it before the work, directly from this link if it is not listed
automatically. The local skill folder links to that single maintained source.

Read README.md, SHARED-DATA.md and docs/GUIDE-EDITING.md before editing. All editable content/presentation JSON lives in ../hackriculture-data/website/. Master gardening records live in shared vegetables/<key>/<key>.json and troubles/<key>/<key>.json, read through lib/records.mjs and maintained by print admin. Never add local data copies, regenerate approved prose or overwrite existing user edits.

The 44 guide paragraphs and editorial scope remain approved. Measurement facts with masterPath resolve from the current master at build/startup. Generated public data is in ../hackriculture-data/generated/website/; never edit it. Rebuild after shared data changes. Keep the four folders as siblings for local builds; exported dist/client remains standalone.

This checkout has pre-existing uncommitted changes. Preserve them. Keep media and visual design unchanged for data work. John handles build/upload; do not deploy without his instruction. For validation, run the build, TypeScript and relevant Node tests. See the shared contract for backups, historical snapshots and exact checks.
