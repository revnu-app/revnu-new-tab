# Chrome Web Store listing, Revnu

Everything to paste into the [developer dashboard](https://chrome.google.com/webstore/devconsole). Fields marked (SEO) carry keyword or link weight.

## Where the backlinks actually come from

Be realistic about what the Web Store gives you:

1. **`homepage_url` in the manifest** (already set to `https://revnu.com`) becomes the **"Website" link on the listing page**. This is the one real, crawlable link from chromewebstore.google.com to revnu.com. To make it show as a *verified publisher* link (adds a checkmark and more trust/weight), verify revnu.com in Google Search Console with the same Google account that owns the developer dashboard, then select it under **Developer Dashboard → Account → Verified publisher**.
2. **Support link**: in the dashboard under "Support", set `https://revnu.com/support` (or just revnu.com). Second crawlable link.
3. **Privacy policy URL** (required for publication anyway): host it at `https://revnu.com/privacy`, third crawlable link.
4. The **description text is not linkified**, but URLs in it are still indexed as text mentions; keep `revnu.com` in the first sentence.
5. The listing page itself ranks in Google for its title, hence the name/summary below are written so the page title becomes "Revnu - Chrome Web Store", which ranks for the brand query and funnels to revnu.com.

## Fields

**Name (SEO, becomes the listing page `<title>` and URL slug):**
```
Revnu
```

**Summary, max 132 chars (SEO, this is the meta description of the listing page):**
```
Revnu new tab: rotating Revnu wallpapers behind your search bar. AI that sells your software for you, revnu.com
```

**Category:** Workflow & Planning (alt: Art & Design)

**Language:** English

**Description (SEO, keyword surface for store search; revnu.com in the first line):**
```
Revnu (revnu.com) turns every new tab into a piece of the Revnu brand.

Open a tab, get a fresh wallpaper. The extension rotates through 24 Revnu-designed wallpapers, flat brand compositions built from the real Revnu design system (the clover, the wordmark, Puffy the mascot) plus 4K AI-crafted scenes: a frosted glass clover, a foggy clover topiary, paper-craft hills, clover hot-air balloons and more. You see every wallpaper before any repeats.

What you get:
• A clean new tab page with a clock and a fast search bar (uses your default search engine)
• 24 wallpapers in rotation, a different one on every new tab
• Dark and light designs, with the UI adapting automatically
• Everything bundled locally: no accounts, no tracking, no analytics, no data collection, works offline

About Revnu: Revnu builds AI growth agents for startups, AI that sells your software for you. Learn more at https://revnu.com

Made by the Revnu team (IT5 Inc. DBA Revnu), revnu.com
```

**Single purpose description (review field):**
```
Replaces the browser new tab page with a Revnu-branded page showing a rotating wallpaper, a clock, and a search bar that uses the browser's default search engine.
```

**Permission justifications (review field):**
- `search`, "Lets the new tab page's search bar send queries through the user's default search engine, matching the behavior of the standard new tab page."

**Privacy tab:** does NOT collect any user data, check "No" on every category. No remote code (fonts and wallpapers are bundled).

**Assets in this folder:**
| File | Slot |
|---|---|
| `screenshot-1..4-1280x800.png` | Screenshots (1280x800) |
| `promo-small-440x280.png` | Small promo tile |
| `promo-marquee-1400x560.png` | Marquee promo tile |
| `../icons/icon128.png` | Store icon |

## Publishing steps

1. `cd` to the repo and run the packaging command in the README (or upload `revnu-extension.zip` from the repo root).
2. Dashboard → New item → upload the zip.
3. Paste the fields above; upload the promo assets.
4. Set Support URL + Privacy Policy URL to revnu.com pages.
5. Verify revnu.com as publisher site (Search Console + dashboard).
6. Submit for review. A new-tab-override extension with one permission and no data collection normally clears review in 1-3 days.
