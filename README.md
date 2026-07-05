# Revnu — New Tab for Chrome

**By [Revnu](https://revnu.com) — AI growth agents for startups. AI that sells your software for you.**

[revnu.com](https://revnu.com) · [Chrome extension] · Manifest V3 · No tracking, no accounts, works offline

Chrome extension that replaces the new tab page with a Revnu-branded one: a clock, a search bar wired to your default search engine, and a rotating set of Revnu wallpapers. Every new tab advances through a shuffled cycle, so you see all nine wallpapers before any repeat.

## Install

1. Open `chrome://extensions`
2. Turn on **Developer mode** (top right)
3. Click **Load unpacked** and select this folder (`revnu-chrome`)
4. Open a new tab

## Wallpapers

Nine wallpapers live in `wallpapers/`. Six are exact brand compositions rendered from the real assets in `revnu-assets` (Canopy, Moss, Undergrowth, Sprout, Terracotta, the clover, the lockup, Puffy). Three are AI-generated abstract backgrounds in the brand palette (Flux 1.1 Pro Ultra via Replicate).

| File | Look |
|---|---|
| `revnu-01-dark-bleed.png` | Undergrowth, tone-on-tone Moss clover bleed, Canopy peek top-right |
| `revnu-02-snow-banner.png` | Snow, big Canopy clover off the left, "AI that sells your software for you." |
| `revnu-03-canopy-pattern.png` | Canopy, faint white clover pattern grid |
| `revnu-04-moss-ghost.png` | Moss gradient, giant ghost REVNU wordmark off the bottom |
| `revnu-05-puffy.png` | Cloud, Puffy in the corner, "You build it. Revnu sells it." |
| `revnu-06-sprout-duo.png` | Undergrowth, Moss + Sprout clovers off the right edge |
| `revnu-07-bubbles.jpg` | AI: dark green, bubble clusters in the corners |
| `revnu-08-clay.jpg` | AI: off-white, soft clay clover shapes |
| `revnu-09-hills.jpg` | AI: emerald sky, rolling dark hills |
| `revnu-10-garden.png` | Snow, clover bouquet in the bottom-left corner, Terracotta accent clover |
| `revnu-11-halftone.png` | Undergrowth, Sprout clover halftone fading left to right |
| `revnu-12-hedge.png` | Dark sky, clover hedge along the bottom edge, single Sprout accent |
| `revnu-13-puffy-stage.png` | Cloud, Puffy (no tie) standing bottom-center |
| `revnu-14-scatter.png` | Undergrowth, faint drifting clover scatter, Canopy clover accent |
| `revnu-15-ghost-light.png` | Snow, giant Chalk ghost wordmark off the top edge |
| `revnu-17-meadow.jpg` | AI: night meadow of tiny clovers, big dark sky |
| `revnu-19-clay-sculpture.jpg` | AI 4K (GPT-Image-2): matte clay clover sculpture in a dark gallery |
| `revnu-20-puffy-spotlight.jpg` | AI 4K (GPT-Image-2): Puffy under a mint spotlight on a dark stage |
| `revnu-21-papercraft.jpg` | AI 4K (GPT-Image-2): paper-cut clover hills on off-white |
| `revnu-22-balloons.jpg` | AI 4K (GPT-Image-2): clover hot-air balloons over a misty valley |
| `revnu-23-glass.jpg` | AI 4K (GPT-Image-2): frosted emerald glass clover, mint caustics |
| `revnu-24-topiary.jpg` | AI 4K (GPT-Image-2): clover topiary in a foggy courtyard at dusk |
| `revnu-25-aerial.jpg` | AI 4K (GPT-Image-2): aerial crop field with a mowed clover pattern |
| `revnu-26-felt.jpg` | AI 4K (GPT-Image-2): stitched felt clovers on off-white wool |

To add one: drop a 2560x1440-ish image in `wallpapers/` and add a line to `WALLPAPERS` in `newtab.js` with `ui: "dark"` or `ui: "light"` (controls clock text color).

The wallpaper source compositor (HTML/CSS used to render the six brand wallpapers) is in `wallpaper-src/` if you want to tweak and re-render:

```sh
cd wallpaper-src && python3 -m http.server 8791 &
for wp in wp1 wp2 wp3 wp4 wp5 wp6 wp7 wp8 wp9 wp10 wp11 wp12; do
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new \
    --window-size=2560,1440 --hide-scrollbars --virtual-time-budget=8000 \
    --screenshot="../wallpapers/$wp.png" "http://localhost:8791/wallpapers.html#$wp"
done
```

(Serving over localhost matters: CSS `mask-image` silently drops on `file://`.)

## Notes

- Search uses `chrome.search.query`, i.e. whatever your default engine is; falls back to Google outside an extension context.
- Fonts (DM Sans / DM Mono, latin subsets) are bundled in `fonts/` — no network calls at all.

## Chrome Web Store

`revnu-extension.zip` in the repo root is the upload-ready package. Listing copy, SEO/backlink notes, promo tiles and screenshots live in `store-assets/` — see [STORE-LISTING.md](store-assets/STORE-LISTING.md). Rebuild the zip after changes with:

```sh
zip -rq revnu-extension.zip manifest.json newtab.html newtab.css newtab.js fonts.css fonts icons wallpapers assets/clover.png
```
