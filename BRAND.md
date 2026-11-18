# NanoClaw brand kit v1.3.1

The NanoClaw design system (Nov 17, 2026) for an agent applying the brand. Paths are relative to this folder.
Values here are generated from the design system's sources; `tokens.json` and `tokens.css` hold the same values in code form.
`design-system.html` is the full visual reference (self-contained; open it in a browser).
**This file is the source of truth for applying the brand.** Where `README.md`, `USAGE.md` or the design system page says something different, follow this file.

## Rules an agent must follow

1. Use the files in `assets/` as they are. Never redraw, retrace, recolour, stretch, rotate or add effects (glow, gradient, shadow) to the mascot, the lockup or the wordmark.
2. **On light:** `assets/logo/nanoclaw-logo-light.svg`: the whole wordmark navy `#080037`, no rim. **On dark:** `assets/logo/nanoclaw-logo-dark.svg`: white "Nano", mint `#56EDD6` "Claw", pale `#D6FCF7` rim around the mascot.
3. **Size picks the mark:** full lockup at 32px tall and up; **wordmark only** (`assets/wordmark/`) under 32px tall; a square spot gets the app icon (`assets/app-icon/`).
4. Keep clear space: ½ × mascot height around the lockup; the wordmark's cap height around the wordmark alone.
5. One mint, `#56EDD6`; one near-black, `#0C1213`. Don't introduce other mints, teals or near-blacks. Use the semantic tokens, not raw ramp values, for UI.
6. Mint text on light is `#0B7566` (mint-700), never `#56EDD6`: that fails contrast on white. A mint fill always takes a `#0C1213` label.
7. Never put the logo on a navy background; never make the whole wordmark mint; never set "NanoClaw" in a font in place of the wordmark.
8. Inter for headings and body, JetBrains Mono for code. No other fonts.
9. Write **NanoClaw**: one word, capital N and C. Lowercase `nanoclaw` only in code, URLs and repo names.
10. Use a one-colour variant only when the medium allows one ink; otherwise full colour.

## Logo

The lockup is the mascot (a shrimp with a waving claw: mint fill, soft shading, thick navy outline) to the left of the wordmark "NanoClaw".

| | Light backgrounds | Dark backgrounds |
|---|---|---|
| File | `assets/logo/nanoclaw-logo-light.svg` / `.png` (1111×307) | `assets/logo/nanoclaw-logo-dark.svg` / `.png` (1112×307) |
| "Nano" | navy `#080037` | white `#FFFFFF` |
| "Claw" | navy `#080037` | mint `#56EDD6` |
| Rim around mascot | none | `#D6FCF7` (keeps the navy outline and antennae visible) |

These two files are also the GitHub README pair (`nanoclaw-logo-light` / `nanoclaw-logo-dark`, transparent background); in a README use `<picture>` with `prefers-color-scheme`.

**Proportions:** h = mascot height. The wordmark's cap height is 40% of h, centred on the mascot's body; gap between them 0.6 × cap height (about 0.24h). Scale the lockup as one piece; never change the ratio.

**Clear space:** ½h on every side of the lockup.

**Minimum sizes**

| Mark | Minimum | Below that |
|---|---|---|
| Lockup | 32px tall on screen; 25mm wide in print | use the wordmark alone |
| Mascot alone | 48px tall (≥ 96px for heroes and empty states) | use the app icon |
| Wordmark alone | 64px wide (about 9px tall); 56px still reads, at 48px the "a" and "o" fill in | use the app icon |

**Which mark**

| Space for the mark | Use | For example |
|---|---|---|
| 32px tall and up | Full lockup | Site header, README, slides, print |
| Under 32px tall, or the mascot would be under about 24px | Wordmark only | Footers, small navs, inline mentions, email signatures |
| A square spot | App icon | Favicons, avatars, home screens |

**Wordmark only:** same colours as the lockup, no rim (the rim belongs to the mascot). Light = `assets/wordmark/nanoclaw-wordmark-light.svg` (all navy); dark = `assets/wordmark/nanoclaw-wordmark-dark.svg` (white + mint). One-colour: `-navy`, `-black`, `-white`, `-mint`. Clear space = its cap height. Transparent, tight to the ink.

**Do**
- Use the original colours: on dark white "Nano", mint "Claw" and the pale rim; on light the all-navy wordmark, no rim.
- Use the production vector (SVG) wherever the tool takes one.

**Don't**
- Drop the rim on dark (the navy outline and antennae disappear).
- Place it on a navy background (the outline melts into it).
- Recolour the mascot (fill or outline), or add glow or gradients.
- Stretch, squash, rotate or rebuild the lockup, or change the 40% ratio.
- Squeeze the mascot in at tiny sizes: under 32px tall use the wordmark alone.
- Make the wordmark all mint: only "Claw" is mint, and only on dark.

## Mascot

`assets/mascot/nanoclaw-mascot-shaded.svg` is the default mascot (screens, slides, digital print). `nanoclaw-mascot.svg` is the flat one (no shading tones). The `-sticker` SVGs add a white sticker border, for stickers and busy backgrounds. PNGs at 512px tall are included for tools that can't take SVG. The mascot has no name: call it "the NanoClaw mascot".

Mascot colours (artwork only, not UI colours): mint `#56EDD6`, navy outline `#080037`, shadow `#44BBAC`, light `#89EDD6`, shine `#F0FFFC`.

## App icon and favicon

The mascot's bust cropped to fill a pale `#D6FCF7` rounded tile (corner radius 22%). Same vector at every size; reads on dark and light tabs.

| File | Size | Used for |
|---|---|---|
| `assets/app-icon/favicon.svg` | vector | Browser tab where SVG favicons work |
| `assets/app-icon/favicon.ico` | 16, 32, 48 | Fallback, bookmarks, Windows, crawlers asking for `/favicon.ico` |
| `assets/app-icon/favicon-16x16.png` | 16 | PNG tab icon |
| `assets/app-icon/favicon-32x32.png` | 32 | PNG tab icon on high-DPI screens |
| `assets/app-icon/favicon-48x48.png` | 48 | Google Search results, Windows taskbar |
| `assets/app-icon/apple-touch-icon.png` | 180 | iOS/iPadOS home screen |
| `assets/app-icon/icon-192.png` | 192 | Android home screen, web app manifest |
| `assets/app-icon/icon-512.png` | 512 | Manifest install icon, store listings, avatars |

```html
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/favicon.ico" sizes="16x16 32x32 48x48">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
```

## Logo variants

Full colour by default; monochrome only when the medium allows one ink. The full-colour mascot is never recoloured: a one-colour job uses the one-colour artwork, not a tinted copy. The kit holds the lockup of each variant (SVG + 512px PNG).

| Variant | Inks | Use when | Files |
|---|---|---|---|
| Full colour | Full colour, shaded | The default, everywhere it can be: screens, digital print, stickers. | `assets/logo/`, `assets/mascot/`, `assets/app-icon/` |
| Flat | Navy, mint, white shine | Embroidery, screen print, vinyl, small sizes: no shadow or light tones. | `assets/variants/flat/nanoclaw-lockup-flat-light.svg`, `assets/variants/flat/nanoclaw-lockup-flat-light-512.png` |
| Two-colour spot | Navy + mint, no tints | Two-ink print: the shine prints in mint, the wordmark in navy. | `assets/variants/two-colour-spot/nanoclaw-lockup-two-colour-spot.svg`, `assets/variants/two-colour-spot/nanoclaw-lockup-two-colour-spot-512.png` |
| One colour, navy | 1 ink: #080037 | One ink on a light ground: stamps, letterpress, single-colour merch. | `assets/variants/one-colour-navy/nanoclaw-lockup-one-colour-navy.svg`, `assets/variants/one-colour-navy/nanoclaw-lockup-one-colour-navy-512.png` |
| One colour, black | 1 ink: #000000 | Black-only print: forms, receipts, fax, laser printers. | `assets/variants/one-colour-black/nanoclaw-lockup-one-colour-black.svg`, `assets/variants/one-colour-black/nanoclaw-lockup-one-colour-black-512.png` |
| One colour, reversed | 1 ink: white | White ink on a dark ground: dark tees, foil, white vinyl on glass. | `assets/variants/one-colour-reversed/nanoclaw-lockup-one-colour-reversed.svg`, `assets/variants/one-colour-reversed/nanoclaw-lockup-one-colour-reversed-512.png` |
| One colour, mint | 1 ink: #56EDD6 | Mint ink on near-black: dark merch, glow-style signage. | `assets/variants/one-colour-mint/nanoclaw-lockup-one-colour-mint.svg`, `assets/variants/one-colour-mint/nanoclaw-lockup-one-colour-mint-512.png` |
| Greyscale | Luminance-matched greys | Newspaper, mono print and photocopies, where colour isn't available but tones are. | `assets/variants/greyscale/nanoclaw-lockup-greyscale.svg`, `assets/variants/greyscale/nanoclaw-lockup-greyscale-512.png` |
| Outline | Navy lines, white fill | Laser engraving, colouring pages, line-art merch. | `assets/variants/outline/nanoclaw-lockup-outline.svg`, `assets/variants/outline/nanoclaw-lockup-outline-512.png` |

## Colour

**One mint `#56EDD6` (mint-400). One near-black `#0C1213` (neutral-950).** Dark is the default theme. Success uses mint, always with a check icon.

**Semantic tokens** (use these in UI; CSS names as in `tokens.css`):

| Token | Dark | Light | Use |
|---|---|---|---|
| `--nc-bg` | `#0C1213` | `#F6FAF9` | Page background |
| `--nc-surface` | `#131B1D` | `#FFFFFF` | Cards, banner, inputs, code blocks |
| `--nc-surface-2` | `#1A2426` | `#EAF4F2` | Raised or hovered surface, kbd, code headers |
| `--nc-border` | `#263234` | `#CCDBDA` | Dividers and card outlines (decorative) |
| `--nc-border-strong` | `#5B6E6B` | `#768B8A` | Input and control outlines (3:1) |
| `--nc-text` | `#EAF4F2` | `#0C1213` | Body text and headings |
| `--nc-text-muted` | `#93A9A6` | `#5B6E6B` | Secondary text, captions, inactive nav |
| `--nc-accent` | `#56EDD6` | `#56EDD6` | Mint fill: primary button, mascot, checks |
| `--nc-accent-hover` | `#7BF5E1` | `#36CBB6` | Primary button hover |
| `--nc-accent-text` | `#56EDD6` | `#0B7566` | Links, active nav label, mint text |
| `--nc-accent-tint` | `#12302C` | `#E9FCF7` | Active nav item, selected row |
| `--nc-accent-border` | `#56EDD6` | `#0B7566` | "New" badge, primary button edge on light |
| `--nc-on-accent` | `#0C1213` | `#0C1213` | Label on a mint fill |
| `--nc-focus` | `#56EDD6` | `#0B7566` | Focus ring |
| `--nc-warning` | `#F5B84B` | `#9A6200` | Warning title, icon, text |
| `--nc-warning-tint` | `#2A2214` | `#FFF4E2` | Warning callout fill |
| `--nc-danger` | `#FF6B6B` | `#C93434` | Error text, destructive button fill |
| `--nc-danger-hover` | `#FF8A8A` | `#A82A2A` | Destructive button hover |
| `--nc-danger-tint` | `#2C1617` | `#FEF0EF` | Error callout fill |
| `--nc-on-danger` | `#0C1213` | `#FFFFFF` | Label on a destructive fill |
| `--nc-success` | `#56EDD6` | `#0B7566` | Success = mint, always with a check icon |

**Ramps**
- Mint: 50 `#E9FCF7` (active tint on light) · 100 `#D0FBF2` · 200 `#A5F9E9` · 300 `#7BF5E1` · 400 `#56EDD6` (brand mint) · 500 `#36CBB6` · 600 `#18A08E` · 700 `#0B7566` (mint text on light) · 800 `#06544A` · 900 `#12302C` (active tint on dark) · 950 `#081F1B`
- Neutral: 0 `#FFFFFF` · 50 `#F6FAF9` (light bg) · 100 `#EAF4F2` (dark text) · 150 `#DEE9E8` · 200 `#CCDBDA` · 300 `#B0C2C1` · 400 `#93A9A6` (dark muted) · 500 `#768B8A` · 600 `#5B6E6B` (light muted) · 700 `#3C4B4A` · 800 `#263234` (dark border) · 850 `#1A2426` (dark surface-2) · 900 `#131B1D` (dark surface) · 950 `#0C1213` (dark bg)
- Status: amber-300 `#F5B84B` (warning on dark) · amber-950 `#2A2214` (warning tint on dark) · amber-700 `#9A6200` (warning text on light) · amber-50 `#FFF4E2` (warning tint on light) · red-300 `#FF6B6B` (error on dark) · red-950 `#2C1617` (error tint on dark) · red-700 `#C93434` (error text on light) · red-50 `#FEF0EF` (error tint on light)

**Contrast-safe pairings** (WCAG 2.2 AA; text 4.5:1, outlines and focus 3:1; ratios computed from the tokens):

| Pairing | Tokens | Min | Dark | Light |
|---|---|---|---|---|
| Body text | `text` on `bg` | 4.5:1 | 16.84 | 17.96 |
| Body text on surface | `text` on `surface` | 4.5:1 | 15.57 | 18.89 |
| Body text on surface-2 | `text` on `surface-2` | 4.5:1 | 14.14 | 16.84 |
| Muted text | `text-muted` on `bg` | 4.5:1 | 7.62 | 5.13 |
| Muted on surface | `text-muted` on `surface` | 4.5:1 | 7.04 | 5.40 |
| Muted on surface-2 | `text-muted` on `surface-2` | 4.5:1 | 6.39 | 4.82 |
| Link / accent text | `accent-text` on `bg` | 4.5:1 | 13.03 | 5.32 |
| Accent text on surface | `accent-text` on `surface` | 4.5:1 | 12.04 | 5.60 |
| Active nav label | `accent-text` on `accent-tint` | 4.5:1 | 9.75 | 5.26 |
| Primary button label | `on-accent` on `accent` | 4.5:1 | 13.03 | 13.03 |
| Primary hover label | `on-accent` on `accent-hover` | 4.5:1 | 14.39 | 9.33 |
| Warning text | `warning` on `bg` | 4.5:1 | 10.65 | 4.84 |
| Warning on its tint | `warning` on `warning-tint` | 4.5:1 | 8.85 | 4.68 |
| Text on warning tint | `text` on `warning-tint` | 4.5:1 | 14.00 | 17.35 |
| Error text | `danger` on `bg` | 4.5:1 | 6.81 | 4.96 |
| Error on its tint | `danger` on `danger-tint` | 4.5:1 | 6.13 | 4.70 |
| Text on error tint | `text` on `danger-tint` | 4.5:1 | 15.17 | 17.03 |
| Destructive label | `on-danger` on `danger` | 4.5:1 | 6.81 | 5.22 |
| Destructive hover label | `on-danger` on `danger-hover` | 4.5:1 | 8.33 | 6.93 |
| Input outline | `border-strong` on `surface` | 3:1 | 3.23 | 3.60 |
| Focus ring | `focus` on `bg` | 3:1 | 13.03 | 5.32 |
| Primary button edge | `accent-border` on `bg` | 3:1 | 13.03 | 5.32 |

## Typography

- **Inter** (Rasmus Andersson) for headings and body. Weights: 800 display, 700 H1/H2, 600 H3/H4, 400 body, 500 UI labels, 600 emphasis. Tight tracking on headings (see scale). Tabular figures via `font-feature-settings: "tnum"`. Fallback `system-ui`.
- **JetBrains Mono** (JetBrains) for code: 400, 500 for emphasis. Fallback `ui-monospace`, SF Mono, Menlo, Consolas.
- Where they come from: nanoclaw.dev loads both from Google Fonts; docs.nanoclaw.dev (Mintlify) uses Inter 600 headings / 400 body. Both are SIL OFL 1.1: load from Google Fonts or self-host `assets/fonts/Inter-latin.woff2` and `assets/fonts/JetBrainsMono-latin.woff2` (Latin subsets, variable; `@font-face` rules are in `tokens.css`). Licences: `assets/fonts/OFL-Inter.txt`, `assets/fonts/OFL-JetBrainsMono.txt`.
- The wordmark is custom lettering (vector paths), not a font. Headings never copy its colours.

| Style | Font | Size/line (px) | Weight | Tracking |
|---|---|---|---|---|
| Display | Inter | 48/56 | 800 | -0.025em |
| H1 | Inter | 36/44 | 700 | -0.02em |
| H2 | Inter | 24/32 | 700 | -0.015em |
| H3 | Inter | 20/28 | 600 | -0.01em |
| H4 | Inter | 17/24 | 600 | 0 |
| Body L | Inter | 18/30 | 400 | 0 |
| Body | Inter | 16/26 | 400 | 0 |
| Small | Inter | 14/22 | 400 | 0 |
| Label | Inter | 12/16 | 600 | 0.04em |
| Code | JetBrains Mono | 14/22 | 400 | 0 |

Sizes at a 16px root. Prose column 640–720px. On phones Display drops to 36/42 and H1 to 30/36.

**Spacing** (4px base): 0-5 = 2px, 1 = 4px, 2 = 8px, 3 = 12px, 4 = 16px, 5 = 20px, 6 = 24px, 8 = 32px, 10 = 40px, 12 = 48px, 16 = 64px, 24 = 96px.
**Radii:** xs 4px (kbd, tags), sm 6px (inline code), md 8px (inputs, nav items), lg 10px (cards, callouts, code), xl 16px (dialogs, hero panels), pill 999px (buttons, badges). Borders before shadows; a shadow only for overlays.
**Motion** (tokens in `tokens.css`): `--nc-duration-fast` 120ms (hover and press), `--nc-duration-base` 200ms (small enters), `--nc-duration-slow` 320ms (panels). Easing is `--nc-ease-standard`, `cubic-bezier(0.2, 0, 0, 1)`; exits use `--nc-ease-exit`, `cubic-bezier(0.3, 0, 1, 1)`, a little faster. With `prefers-reduced-motion: reduce` the three durations are 0ms. The mascot waves once, on first view of a hero or an empty state; it never loops.

## Voice and tone

NanoClaw sounds like a friend who runs a home server. They know how it works, they’ll tell you when they don’t know, and they’re glad you asked. When setup succeeds, “Your agent’s up. Say hi. 👋” is plenty. When setup fails, tell the reader what happened and help them take the next step.

### Make it easy to follow

Use everyday words and short sentences. Assume the reader is capable and may be seeing NanoClaw for the first time. When a technical term matters, use it and explain it where it first appears. Readers who learn the word *container* here will recognize it when they open Docker.

- **Make ownership concrete.** Say “your agent,” “your machine,” or “your fork” when it helps someone understand what they control. Be just as clear about what goes elsewhere. “If you use a hosted model, its provider receives the content your agent sends in a request.”
- **Explain how it works.** “The credential gateway adds the API key when it forwards the request” tells the reader something they can use. A claim like “bank-grade security” leaves them guessing.
- **Give the next useful action.** An error message should say what failed. If the cause is uncertain, give the reader a way to check it. Save the fix for when you know what needs fixing.
- **Use numbers you can verify.** Check timings, version numbers, and contributor counts against the code, measurement, or release you’re describing.
- **Link where the detail lives.** Keep the install command in Quick Start. Link to the installation guide for what the wizard does at each step. Give the link a name that tells readers what they’ll find.

### Match the moment

| Where you’re writing | How NanoClaw sounds |
|---|---|
| README, website, onboarding | Warm and direct. Show what someone can do with their agent and give them a place to start. |
| Guides, reference docs, CLI help | Practical and precise. Use the names people see on screen. Give an example they can try. |
| Errors, warnings, privacy, security | Calm and literal. Explain what happened or what will happen, who or what it affects, and what the reader can do. |
| Release notes | Specific and appreciative. Name a change someone will notice. Credit the people who made it happen. |
| Social, Discord, stickers, merch | Conversational and playful. There’s room for a shrimp joke if you have a good one. |

The subject takes priority over the channel. A security advisory deserves the same care in Discord as it does in `SECURITY.md`.

### Write steps people can follow

For installation, migration, troubleshooting, credential rotation, backup, restore, and uninstall procedures, draw on **ASD-STE100 Simplified Technical English**. Give each step one action. Put a condition before the action it affects. Use the same name for the same thing throughout. When the result might surprise a new user, explain what success looks like. These are principles we borrow from the standard. [ASD-STE100, Issue 9](https://www.asd-ste100.org/assets/files/ASD-STE100_ISSUE9.pdf)

For example, a macOS troubleshooting entry could read:

> **Setup can’t reach Docker**
>
> 1. Open Docker Desktop.
> 2. When Docker Desktop reports that the engine is running, run `docker ps`.
> 3. If the command prints a list of containers, run `bash nanoclaw.sh` again.
>
> An empty list is fine. It means Docker answered and no containers are running.

### Leave room for personality

Take the reader’s time seriously. Take yourself a little less seriously. Our mascot is a shrimp waving a claw. A dry aside, a cheerful emoji, or a small moment of delight can make the product feel welcoming. Routine instructions can be routine. “Install Docker” is a perfectly good heading.

| Moment | Example |
|---|---|
| First successful run | “Your agent’s up. Say hi. 👋” |
| Empty schedule | “Nothing scheduled. Your agent has the afternoon free.” |
| An optional integration | “Want to talk to your agent in Telegram? Run `/add-telegram` in your checkout.” |
| A release announcement | “Each agent can now have its own Slack app, so you can see who replied.” |

Let humor land on us or the situation. When the reader is stuck, the most considerate thing we can offer is a clear next step. Avoid jokes at someone’s expense, including people who use or build other projects.

### The mascot and emoji

The mascot can speak in short first-person lines on stickers, social posts, or a playful 404 page. In setup and chat, make it clear who’s speaking. Readers should be able to tell your agent’s reply from an installer message.

Emoji are welcome. Use them to help someone find a section, recognize a status, or enjoy a moment. A 🚀 beside Quick Start, a 👋 after a successful setup, and a 🦐 in a release announcement all feel at home. Use your judgment about frequency. When the meaning matters, put it in words too: **“⚠️ This removes the agent’s files.”**

### Names and mechanics

Write **NanoClaw** for the open-source project and **NanoCo** for the company. Preserve literal casing in commands, paths, repository names, and URLs. Use US English and the official spelling of names such as Claude Code, WhatsApp, and iMessage.

Follow the website’s Title Case convention for navigation, buttons, and section titles. Use sentence case in body copy. Format commands, skills, environment variables, and paths as code. Leave the `$` prompt out of copyable commands so readers can paste them directly into a terminal.

### Before publishing

Read it aloud. Would you say it this way to someone you were helping? Check the facts, make sure the reader knows who’s speaking, and see whether they can tell what to do next.

## File index

| Path | What it is | Size / format |
|---|---|---|
| `BRAND.md` | This file: read first | Markdown |
| `tokens.json` | Colours, fonts, type scale, spacing, radii, logo rules, for token pipelines (Style Dictionary etc.) | W3C design tokens |
| `tokens.css` | CSS custom properties: dark default, `[data-theme="light"]`, motion, logo colours, `@font-face`; drop into a web project | CSS |
| `design-system.html` | The full design system page v1.3.1: visual reference, components, Tailwind and Mintlify snippets | HTML, self-contained |
| `assets/app-icon/apple-touch-icon.png` | App icon / favicon (see the App icon table) | 180×180 |
| `assets/app-icon/favicon-16x16.png` | App icon / favicon (see the App icon table) | 16×16 |
| `assets/app-icon/favicon-32x32.png` | App icon / favicon (see the App icon table) | 32×32 |
| `assets/app-icon/favicon-48x48.png` | App icon / favicon (see the App icon table) | 48×48 |
| `assets/app-icon/favicon.ico` | App icon / favicon (see the App icon table) | ICO |
| `assets/app-icon/favicon.svg` | App icon / favicon (see the App icon table) | vector |
| `assets/app-icon/icon-192.png` | App icon / favicon (see the App icon table) | 192×192 |
| `assets/app-icon/icon-512.png` | App icon / favicon (see the App icon table) | 512×512 |
| `assets/fonts/Inter-latin.woff2` | Fonts and their licences | WOFF2 |
| `assets/fonts/JetBrainsMono-latin.woff2` | Fonts and their licences | WOFF2 |
| `assets/fonts/OFL-Inter.txt` | Fonts and their licences | TXT |
| `assets/fonts/OFL-JetBrainsMono.txt` | Fonts and their licences | TXT |
| `assets/logo/nanoclaw-logo-dark.png` | Lockup on dark backgrounds; README dark | 1112×307 |
| `assets/logo/nanoclaw-logo-dark.svg` | Lockup on dark backgrounds; README dark | vector |
| `assets/logo/nanoclaw-logo-light.png` | Lockup on light backgrounds; README light | 1111×307 |
| `assets/logo/nanoclaw-logo-light.svg` | Lockup on light backgrounds; README light | vector |
| `assets/mascot/nanoclaw-mascot-512.png` | Mascot, flat | 411×512 |
| `assets/mascot/nanoclaw-mascot-shaded-512.png` | Mascot, default (shaded) | 411×512 |
| `assets/mascot/nanoclaw-mascot-shaded-sticker.svg` | Mascot with sticker border, shaded | vector |
| `assets/mascot/nanoclaw-mascot-shaded.svg` | Mascot, default (shaded) | vector |
| `assets/mascot/nanoclaw-mascot-sticker.svg` | Mascot with sticker border, flat | vector |
| `assets/mascot/nanoclaw-mascot.svg` | Mascot, flat | vector |
| `assets/variants/flat/nanoclaw-lockup-flat-light-512.png` | Variant lockup (see Logo variants) | 512×141 |
| `assets/variants/flat/nanoclaw-lockup-flat-light.svg` | Variant lockup (see Logo variants) | vector |
| `assets/variants/greyscale/nanoclaw-lockup-greyscale-512.png` | Variant lockup (see Logo variants) | 512×141 |
| `assets/variants/greyscale/nanoclaw-lockup-greyscale.svg` | Variant lockup (see Logo variants) | vector |
| `assets/variants/one-colour-black/nanoclaw-lockup-one-colour-black-512.png` | Variant lockup (see Logo variants) | 512×141 |
| `assets/variants/one-colour-black/nanoclaw-lockup-one-colour-black.svg` | Variant lockup (see Logo variants) | vector |
| `assets/variants/one-colour-mint/nanoclaw-lockup-one-colour-mint-512.png` | Variant lockup (see Logo variants) | 512×141 |
| `assets/variants/one-colour-mint/nanoclaw-lockup-one-colour-mint.svg` | Variant lockup (see Logo variants) | vector |
| `assets/variants/one-colour-navy/nanoclaw-lockup-one-colour-navy-512.png` | Variant lockup (see Logo variants) | 512×141 |
| `assets/variants/one-colour-navy/nanoclaw-lockup-one-colour-navy.svg` | Variant lockup (see Logo variants) | vector |
| `assets/variants/one-colour-reversed/nanoclaw-lockup-one-colour-reversed-512.png` | Variant lockup (see Logo variants) | 512×141 |
| `assets/variants/one-colour-reversed/nanoclaw-lockup-one-colour-reversed.svg` | Variant lockup (see Logo variants) | vector |
| `assets/variants/outline/nanoclaw-lockup-outline-512.png` | Variant lockup (see Logo variants) | 512×141 |
| `assets/variants/outline/nanoclaw-lockup-outline.svg` | Variant lockup (see Logo variants) | vector |
| `assets/variants/two-colour-spot/nanoclaw-lockup-two-colour-spot-512.png` | Variant lockup (see Logo variants) | 512×141 |
| `assets/variants/two-colour-spot/nanoclaw-lockup-two-colour-spot.svg` | Variant lockup (see Logo variants) | vector |
| `assets/wordmark/nanoclaw-wordmark-black-512.png` | Wordmark, one colour black | 512×75 |
| `assets/wordmark/nanoclaw-wordmark-black.svg` | Wordmark, one colour black | vector |
| `assets/wordmark/nanoclaw-wordmark-dark-512.png` | Wordmark alone, on dark (white + mint) | 512×75 |
| `assets/wordmark/nanoclaw-wordmark-dark.svg` | Wordmark alone, on dark (white + mint) | vector |
| `assets/wordmark/nanoclaw-wordmark-light-512.png` | Wordmark alone, on light (all navy) | 512×75 |
| `assets/wordmark/nanoclaw-wordmark-light.svg` | Wordmark alone, on light (all navy) | vector |
| `assets/wordmark/nanoclaw-wordmark-mint-512.png` | Wordmark, one colour mint (dark grounds) | 512×75 |
| `assets/wordmark/nanoclaw-wordmark-mint.svg` | Wordmark, one colour mint (dark grounds) | vector |
| `assets/wordmark/nanoclaw-wordmark-navy-512.png` | Wordmark, one colour navy | 512×75 |
| `assets/wordmark/nanoclaw-wordmark-navy.svg` | Wordmark, one colour navy | vector |
| `assets/wordmark/nanoclaw-wordmark-white-512.png` | Wordmark, one colour white (dark grounds) | 512×75 |
| `assets/wordmark/nanoclaw-wordmark-white.svg` | Wordmark, one colour white (dark grounds) | vector |

**Not in this kit:** print and production files (PDF, EPS, 2048px PNGs, die-cut sticker files with CutContour, two-spot merch artwork, laser files, 3D relief STL/3MF, merch mockups) exist separately with the brand owner. Ask for them for print jobs; don't rebuild them from the SVGs.
