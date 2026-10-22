# Carrots in 3 Minutes

Hackriculture pilot: **2:25.9**, **1080 × 1920**, **30 fps**, portrait **9:16**.

## Watch

- `out/Carrots-in-3-Minutes.mp4` — final H.264 MP4 with generated narration and burned-in captions.
- `out/Carrots-in-3-Minutes.srt` — separate subtitle file.
- `out/Carrots-in-3-Minutes-cover.png` — portrait cover frame.

## Review and edit

Open Remotion Studio at `http://localhost:3123/CarrotsIn3Minutes` while the local preview server is running.

Using Node.js 20 or later (Node 24 used for rendering):

```sh
npm install
npm run dev
npm run check
npm run render
```

- `docs/NARRATION.md`: readable script with scene start times.
- `docs/SOURCE-NOTES.md`: dataset structure, joins, source inconsistencies and editorial decisions.
- `hackriculture-data/provenance/website-pilot/carrot-source.json`: extracted carrot record, applicable shared trouble conditions, source file fingerprints.
- `data/script.json`: editable editorial script before audio timing.
- `src/timeline.json`: scene text and measured timing used by the composition.
- `src/scenes/`: one component for each scene.
- `src/Artwork.tsx`: original vector illustrations and frame-driven animation.
- `src/Scene.tsx`: scene layout and typography.
- `src/captions.json`: timed caption pages in Remotion's Caption format.
- `data/word-captions.json`: provider word timings in Caption format.
- `public/audio/`: the generated narration, saved locally for reliable future renders.

To change on-screen text, edit `src/timeline.json`. To change narration, edit `data/script.json`, regenerate affected audio and timestamps, and update the timeline and captions together. `data/speech.json` retains the provider's original durations and word timings. The composition duration in `src/Root.tsx` must equal the sum of scene durations. Do not change the script alone and expect the existing audio to change.

## Production choices

A practical UK growing guide using the supplied structured data, with specific conflicts checked against current RHS guidance. British-English narration was requested from HeyGen's public Reassuring Rupert voice; this is a generated pilot voice, not the creator's own voice. Eleven animated scenes cover soil, timing, direct sowing, germination, thinning, watering, carrot fly, harvest and storage. Original drawings and the existing Hackriculture logo are the visual assets. There is no music bed.

No upload or publication has been performed. The original source files and website files were not edited.
