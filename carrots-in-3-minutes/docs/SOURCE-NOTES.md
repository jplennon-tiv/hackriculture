# Carrots in 3 Minutes: source and editorial notes

The pilot uses the supplied files in `/Users/johnlennon/Documents/3_minute_videos`. Originals were not edited. A carrot-specific snapshot, with SHA-256 fingerprints, is in `hackriculture-data/provenance/website-pilot/carrot-source.json`.

## How the files work

- `vegetables.json`: 44 crop records keyed by stable identifiers such as `carrot`. Fields combine long text, optional `short_text`, importance `rank`, nested varieties, cultivation measurements, calendar ranges and structured harvest times. Larger ranks appear to mark editorial priority; they are not confidence scores.
- `vegetable_groups.json`: eight display-name groups. Its members are crop display names, whereas trouble records use identifiers. Carrot's `category` joins to `Root Crops`, and `name` matches `Carrot` in that list.
- `troubles.json`: 14 shared trouble groups. The carrot's `troubles_detail` points to `carrot_and_parsnip_troubles`. Each group includes a symptom lookup and named conditions with description, prevention, treatment and ranking. Group-level applicability establishes the shared crop scope; condition-level `applies_to` narrows it. Twelve conditions in this shared group apply to carrots.
- Calendar values such as `--04/--06` are inclusive annual month ranges, not full dates. Empty arrays represent unavailable/not-applicable calendar tracks. Nullable harvest values must be read from `by_variety` when the default is absent.
- Image values are relative asset references. The supplied folder contains JSON only, so its carrot and pest image paths do not resolve to supplied media. The pilot uses original animated SVG illustrations instead.

## Editorial decisions

The source data is the core information; its prose has been rewritten as original short narration. The local Hackriculture website's `data/site.json` supplied Cornwall/UK context, and its existing logo supplied the branding. YouTube's channel page could not be fetched directly.

1. Prioritised practical sowing, care and harvest facts, especially higher-ranked soil preparation, thinning, carrot fly and storage. Omitted the long cultivar list, cooking section and low-ranked disorders to keep the episode short.
2. The crop's embedded “Old Seed / Poor Germination” paragraph is about parsnips. The authoritative shared condition explicitly restricts it to `parsnip`, so it is excluded. The carrot's approximately 17-day germination value becomes an approximate two-to-three-week expectation, weather dependent.
3. The data says both to maintain moisture and to withhold watering for two weeks after sowing. The pilot uses moist seed-depth soil without waterlogging, not a fixed two-week ban. Established plants are watered during prolonged dry spells; pots need more frequent checks.
4. Used April–June as a straightforward beginner window from the source's most-popular range. March under cover is mentioned. This is not presented as the only possible sowing season. Local weather and variety qualify the calendar.
5. Source drill depth 1.3 cm is shown as 1–1.3 cm; narration rounds it to about 1 cm. Source row spacing 15 cm is broadened to RHS's 15–30 cm. Plant spacing remains the source's 5–8 cm (RHS: 5–7.5 cm).
6. Source early/maincrop times of 12/16 weeks form the typical 12–16-week range. Baby roots at around eight weeks are explicitly separate and approximate. Size is the readiness test.
7. Fine insect mesh covering the entire crop is the prevention message. No historical pesticide products are included. A low perimeter barrier is not represented as equivalent protection.
8. Fresh manure is excluded; well-rotted compost is not categorically rejected. Storage uses sand rather than the source's peat option. No guaranteed storage-until-March claim is made.

Verification source (accessed 6 September 2026): Royal Horticultural Society, [How to Grow Carrots](https://www.rhs.org.uk/vegetables/carrots/grow-your-own). This was used to resolve spacing, sowing technique, watering and mesh details; the supplied dataset remains the main script source.

## Media and delivery

Original vector animation built in Remotion 4.0.521. Existing Hackriculture logo copied from this workspace. Narration generated with HeyGen's public “Reassuring Rupert” voice, requesting `en-GB`; it is not a clone of the channel creator. The intro uses speed 1.04 and other scenes 1.14. Provider word timestamps drive JSON captions and the SRT export. No stock footage or music is used.

Full-HD portrait: 1080 × 1920, 30 fps, 4,377 frames, 145.9 seconds. Eleven scenes. On-screen metric instructions, burned-in captions, separate SRT. All title, diagram and caption content stays clear of the right-side interaction area and bottom region reserved for typical Shorts controls.
