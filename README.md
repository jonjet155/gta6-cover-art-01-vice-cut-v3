# VICE CUT — Cover Studio

[![make.fun bounty](https://make.fun/badge/gta6-cover-art-01.svg)](https://make.fun/bounty/gta6-cover-art-01)
[![rank](https://make.fun/badge/gta6-cover-art-01/jonjet155/gta6-cover-art-01-vice-cut-v3/rank.svg)](https://make.fun/bounty/gta6-cover-art-01)
[![reward](https://make.fun/badge/gta6-cover-art-01/jonjet155/gta6-cover-art-01-vice-cut-v3/reward.svg)](https://make.fun/bounty/gta6-cover-art-01)

Turn your photo into GTA-style cover art. One big face-led hero photo, a row of
comic panels, a warm sunset grade, and a giant neon **VICE CUT** title at the
bottom — then one click to a PNG in the exact size your post needs.

## How it works

1. **Your photos** — add your own (they never leave your browser) or start from
   the seven golden-hour samples. Click a photo, then click a panel to place it.
2. **Crop & position** — click a panel, drag to pan its photo, scroll to zoom,
   or use the zoom slider. "Fill empty panels" spreads one photo across the
   cover; "One photo, all panels" makes a single-photo cover.
3. **Layout, grade & lettering** — five comic layouts (Hero Collage, Comic,
   Hero + 4, Film Strip, Four-Cut), four sunset grades (Warm Sunset, Neon
   Night, Teal Coast, Ink Mono), four caption styles, editable title, tagline
   and every panel caption.
4. **Export PNG** — 1080 × 1080, 1080 × 1350, or 1920 × 1080, exact dimensions,
   one click each.

The cover is drawn on one canvas by `app/src/cover.js`, so the live preview
and the exported PNG are the same pixels. The title is Bebas Neue, fitted to
the cover width and capped at 30% of its height, in a white → pink → purple
gradient with a neon glow and a dark outline; the tagline is Caveat script,
tucked tight underneath. Nothing is ever uploaded and the app runs fully
offline — fonts and photos are vendored under `app/`.

## Try it

```sh
node serve.ts
# open http://localhost:8080
```

## Hand it in

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
node <kit>/cli/makefun.mjs check
```

## Sample photos (free-license, via Wikimedia Commons)

| File | Subject | Source | License |
| --- | --- | --- | --- |
| `samples/hero.jpg` | Woman leaning on a red vintage coupe at golden hour | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Woman_with_curly_hair_leaning_against_her_vintage_car._Beams_of_light_shining_through_her_fingers.jpg) | CC BY 2.0 |
| `samples/driver.jpg` | Woman driver at the wheel, sunset through the windshield | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Young_woman_sits_in_a_car,_contemplating_life_as_sunset_light_filters_through_the_windshield_on_an_outdoor_road.jpg) | CC BY 2.0 |
| `samples/window.jpg` | Woman in a vintage car window, warm evening light | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Young_woman_sitting_in_vintage_car,_contemplating_life_surrounded_by_nature_at_sunset.jpg) | CC BY 2.0 |
| `samples/boat.jpg` | Speedboat at sunset, Maldives | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Speedboat_-_Rannalhi,_Maldives_-_2016.jpg) | CC0 |
| `samples/miami.jpg` | Miami skyline at dusk | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Miami_Sunset_(45863661094).jpg) | CC0 |
| `samples/palms.jpg` | Palm silhouettes against an orange sunset | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Sunset_behind_palm_trees.jpg) | CC BY-SA 4.0 |
| `samples/pier.jpg` | Wooden pier at sunset, Sidney Spit | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:A_pier_at_a_campsite_during_sunset,_Sidney_Spit_(part_of_Gulf_Islands_National_Park_Reserve),_Sidney_Island,_British_Columbia,_Canada_20.jpg) | CC BY-SA 4.0 |

All seven were downloaded in-session from Wikimedia Commons thumbnails (free
licenses above); none is a top-leaderboard entry's photo. Fonts: Bebas Neue
and Caveat, SIL Open Font License, vendored under `app/fonts/`.

## Screenshots

- `1-cover.jpg` — the exported cover, wide 1280 × 720 (`?shot=cover&size=wide`)
- `2-editor.jpg` — the studio with a photo loaded and a caption being edited
- `3-cover.jpg` — the same cover exported at square 1080 × 1080, shown as-is
- `4-cover.jpg` — the same cover exported at portrait 1080 × 1350, shown as-is
