// Build slides/nanoclaw-slides.potx: the NanoClaw PowerPoint template.
// Run from the repository root:  node slides/pptx/build-potx.js
// Needs pptxgenjs and sharp:     npm install pptxgenjs sharp
// The template mirrors slides/layouts/: same themes, type scale and placement, measured on the
// same 1920 × 1080 grid (1px = 1/144 inch on PowerPoint's 13.33 × 7.5 inch widescreen slide).
const fs = require("fs");
const path = require("path");
const pptxgen = require("pptxgenjs");
const sharp = require("sharp");
const JSZip = require(require.resolve("jszip", { paths: [path.dirname(require.resolve("pptxgenjs"))] }));

const root = path.resolve(__dirname, "..", "..");
const OUT = path.join(root, "slides", "nanoclaw-slides.potx");
const px = (n) => n / 144; // canvas px → inches
const pt = (n) => n / 2; // canvas px → points

// Colours from tokens.css (dark, light) and deck.css (mint). Hex without "#".
const T = {
  dark: { bg: "0C1213", surface: "131B1D", surface2: "1A2426", border: "263234", borderStrong: "5B6E6B", text: "EAF4F2", muted: "93A9A6", accentText: "56EDD6", accentTint: "12302C", ok: "56EDD6", warn: "F5B84B", warnTint: "2A2214", risk: "FF6B6B", riskTint: "2C1617", ctx: "5B6E6B" },
  light: { bg: "F6FAF9", surface: "FFFFFF", surface2: "EAF4F2", border: "CCDBDA", borderStrong: "768B8A", text: "0C1213", muted: "5B6E6B", accentText: "0B7566", accentTint: "E9FCF7", ok: "0B7566", warn: "9A6200", warnTint: "FFF4E2", risk: "C93434", riskTint: "FEF0EF", ctx: "93A9A6" },
  mint: { bg: "56EDD6", surface: "FFFFFF", surface2: "E9FCF7", border: "0C1213", borderStrong: "0C1213", text: "0C1213", muted: "263234", accentText: "0C1213", accentTint: "E9FCF7", ok: "0B7566", warn: "9A6200", warnTint: "FFF4E2", risk: "C93434", riskTint: "FEF0EF", ctx: "263234" },
};
const MINT = "56EDD6";
const NEAR_BLACK = "0C1213";
const SANS = "Inter";
const MONO = "JetBrains Mono";

const THEME = {
  name: "NanoClaw",
  headFontFace: SANS,
  bodyFontFace: SANS,
  colors: {
    dk1: NEAR_BLACK, lt1: "FFFFFF", dk2: "131B1D", lt2: "F6FAF9",
    accent1: MINT, accent2: "0B7566", accent3: "F5B84B", accent4: "9A6200", accent5: "FF6B6B", accent6: "5B6E6B",
    hlink: "0B7566", folHlink: "5B6E6B",
  },
};

// ---------- Icons: Lucide SVGs from slides/icons, rasterised in the colour each slide needs ----------
const iconCache = new Map();
async function icon(name, color) {
  const key = `${name}:${color}`;
  if (!iconCache.has(key)) {
    let svg = fs.readFileSync(path.join(root, "slides", "icons", `${name}.svg`), "utf8");
    svg = svg.replace(/currentColor/g, `#${color}`).replace(/width="24"/, 'width="256"').replace(/height="24"/, 'height="256"');
    const png = await sharp(Buffer.from(svg)).png().toBuffer();
    iconCache.set(key, "image/png;base64," + png.toString("base64"));
  }
  return iconCache.get(key);
}
const assetPath = (p) => path.join(root, "assets", p);

// ---------- Drawing helpers, all in canvas px ----------
function text(slide, str, o) {
  slide.addText(str, {
    x: px(o.x), y: px(o.y), w: px(o.w), h: px(o.h),
    fontFace: o.mono ? MONO : SANS, fontSize: pt(o.size || 32), bold: !!o.bold, color: o.color,
    align: o.align || "left", valign: o.valign || "top", margin: 0, isTextBox: true,
    charSpacing: o.tracking ? pt(o.size || 32) * o.tracking : undefined,
    lineSpacingMultiple: o.lh || 1.15, fit: "none", objectName: o.name,
  });
}
function box(slide, o) {
  slide.addShape(o.pill || o.radius ? "roundRect" : "rect", {
    x: px(o.x), y: px(o.y), w: px(o.w), h: px(o.h),
    fill: o.fill ? { color: o.fill } : { type: "none" },
    line: o.line ? { color: o.line, width: o.lineW || 1.5, dashType: o.dash || "solid" } : { type: "none" },
    rectRadius: o.pill ? px(o.h / 2) : o.radius ? px(o.radius) : undefined,
    objectName: o.name,
  });
}
async function ichip(slide, th, name, x, y, size = 72, kind) {
  const fill = kind === "warn" ? th.warnTint : kind === "risk" ? th.riskTint : th.surface2;
  const color = kind === "warn" ? th.warn : kind === "risk" ? th.risk : th.text;
  box(slide, { x, y, w: size, h: size, fill, radius: size * 0.22, name: `Icon tile: ${name}` });
  const s = Math.round(size * 0.55);
  slide.addImage({ data: await icon(name, color), x: px(x + (size - s) / 2), y: px(y + (size - s) / 2), w: px(s), h: px(s), altText: name.replace(/-/g, " ") });
}
async function badge(slide, th, label, x, y, kind = "ok") {
  const c = kind === "warn" ? th.warn : kind === "risk" ? th.risk : th.ok;
  const fill = kind === "warn" ? th.warnTint : kind === "risk" ? th.riskTint : th.accentTint;
  const ic = kind === "warn" ? "clock" : kind === "risk" ? "triangle-alert" : "circle-check";
  const w = 64 + label.length * 14;
  box(slide, { x, y, w, h: 44, fill, line: c, pill: true, name: `Status: ${label}` });
  slide.addImage({ data: await icon(ic, c), x: px(x + 12), y: px(y + 8), w: px(28), h: px(28), altText: kind });
  text(slide, label, { x: x + 48, y: y + 6, w: w - 56, h: 32, size: 24, bold: true, color: c, valign: "middle" });
  return w;
}

// ---------- The layouts (one slide master each in PowerPoint) ----------
function defineLayouts(pres) {
  const header = (th) => [
    { placeholder: { options: { name: "eyebrow", type: "body", x: px(192), y: px(132), w: px(1300), h: px(36), fontFace: SANS, fontSize: pt(24), bold: true, color: th.accentText, charSpacing: 1, margin: 0, valign: "middle" }, text: "EYEBROW" } },
    { placeholder: { options: { name: "title", type: "title", x: px(128), y: px(184), w: px(1664), h: px(90), fontFace: SANS, fontSize: pt(72), bold: true, color: th.text, margin: 0, valign: "top", align: "left" }, text: "Slide Title in Title Case" } },
  ];
  const footer = (th) => [
    { placeholder: { options: { name: "footer", type: "body", x: px(128), y: px(982), w: px(1450), h: px(34), fontFace: SANS, fontSize: pt(24), color: th.muted, margin: 0, valign: "top", align: "left" }, text: "Source, PR links or date" } },
  ];
  for (const [key, th, wordmark] of [["dark", T.dark, "nanoclaw-wordmark-dark-512.png"], ["light", T.light, "nanoclaw-wordmark-light-512.png"]]) {
    const name = key === "dark" ? "NanoClaw Dark" : "NanoClaw Light";
    pres.defineSlideMaster({
      title: name,
      background: { color: th.bg },
      objects: [
        { image: { path: assetPath(`wordmark/${wordmark}`), x: px(1601), y: px(60), w: px(191), h: px(28), altText: "NanoClaw" } },
        ...header(th),
        ...footer(th),
      ],
      slideNumber: { x: px(1692), y: px(982), w: px(100), h: px(34), fontFace: SANS, fontSize: pt(24), color: th.muted, align: "right", margin: 0 },
    });
  }
  pres.defineSlideMaster({
    title: "NanoClaw Cover",
    background: { color: T.dark.bg },
    objects: [
      { image: { path: assetPath("logo/nanoclaw-logo-dark.png"), x: px(128), y: px(150), w: px(521), h: px(144), altText: "NanoClaw" } },
      { placeholder: { options: { name: "eyebrow", type: "body", x: px(128), y: px(342), w: px(1664), h: px(36), fontFace: SANS, fontSize: pt(24), bold: true, color: T.dark.accentText, charSpacing: 1, margin: 0 }, text: "EYEBROW: AUDIENCE OR PERIOD" } },
      { placeholder: { options: { name: "title", type: "title", x: px(128), y: px(396), w: px(1664), h: px(136), fontFace: SANS, fontSize: pt(120), bold: true, color: T.dark.text, margin: 0, valign: "top", align: "left" }, text: "Deck Title" } },
      { placeholder: { options: { name: "footer", type: "body", x: px(128), y: px(982), w: px(1664), h: px(34), fontFace: SANS, fontSize: pt(24), color: T.dark.muted, margin: 0 }, text: "Presenter · team · Month Year" } },
    ],
  });
  pres.defineSlideMaster({
    title: "NanoClaw Statement",
    background: { color: T.mint.bg },
    objects: [
      { placeholder: { options: { name: "eyebrow", type: "body", x: px(128), y: px(300), w: px(1664), h: px(36), fontFace: SANS, fontSize: pt(24), bold: true, color: NEAR_BLACK, charSpacing: 1, margin: 0 }, text: "SECTION NAME" } },
      { placeholder: { options: { name: "title", type: "title", x: px(128), y: px(376), w: px(1500), h: px(260), fontFace: SANS, fontSize: pt(120), bold: true, color: NEAR_BLACK, margin: 0, valign: "top", align: "left" }, text: "One sentence the room should remember." } },
      { placeholder: { options: { name: "body", type: "body", x: px(128), y: px(676), w: px(1200), h: px(110), fontFace: SANS, fontSize: pt(40), color: T.mint.muted, margin: 0, valign: "top", align: "left" }, text: "A line of support: the number or the reason behind it." } },
    ],
  });
}

// ---------- Sample slides, one per HTML layout ----------
async function build() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_WIDE";
  pres.title = "NanoClaw slide template";
  pres.author = "NanoClaw";
  pres.theme = { headFontFace: SANS, bodyFontFace: SANS };
  defineLayouts(pres);

  const fill = (slide, ph, str) => slide.addText(str, { placeholder: ph });

  // 1. Cover
  pres.addSection({ title: "Layouts" });
  {
    const th = T.dark;
    const s = pres.addSlide({ masterName: "NanoClaw Cover", sectionTitle: "Layouts" });
    fill(s, "eyebrow", "[EYEBROW: AUDIENCE OR PERIOD]");
    fill(s, "title", "[Deck Title]");
    fill(s, "footer", "[Presenter] · [repo or team] · [Month Year] · [What “before” and “after” mean]");
    let x = 128;
    for (const [ic, label] of [["badge-check", "[Theme one]"], ["lock", "[Theme two]"], ["wrench", "[Theme three]"], ["zap", "[Theme four]"]]) {
      const w = 84 + label.length * 17;
      box(s, { x, y: 556, w, h: 56, fill: th.surface, line: th.border, pill: true, name: `Chip: ${label}` });
      s.addImage({ data: await icon(ic, th.text), x: px(x + 18), y: px(568), w: px(32), h: px(32), altText: ic });
      text(s, label, { x: x + 62, y: 556, w: w - 70, h: 56, size: 28, bold: true, color: th.text, valign: "middle" });
      x += w + 20;
    }
    const cards = [["send", "[Metric one]", "[2]", "[9]"], ["circle-check", "[Metric two]", "[+53]", "[−59]"], ["activity", "[Metric three]", "[91%]", "[99.5%]"]];
    for (let i = 0; i < 3; i++) {
      const [ic, label, was, now] = cards[i];
      const cx = 128 + i * (539 + 24);
      box(s, { x: cx, y: 660, w: 539, h: 196, fill: th.surface, line: th.border, radius: 10, name: `Card: ${label}` });
      await ichip(s, th, ic, cx + 32, 688, 48);
      text(s, label, { x: cx + 96, y: 688, w: 420, h: 48, size: 32, bold: true, color: th.text, valign: "middle" });
      // PowerPoint's Inter runs wider than the browser's, so the after number is 64px here, not 72
      const ww = was.length * 26 + 8;
      text(s, was, { x: cx + 32, y: 760, w: ww, h: 72, size: 48, bold: true, color: th.muted, valign: "middle" });
      s.addImage({ data: await icon("arrow-right", th.borderStrong), x: px(cx + 32 + ww + 8), y: px(780), w: px(32), h: px(32), altText: "to" });
      text(s, now, { x: cx + 32 + ww + 52, y: 756, w: 539 - 64 - ww - 52, h: 80, size: 64, bold: true, color: th.text, valign: "middle" });
    }
    s.addNotes("Cover. The full lockup, because it is over 32px tall. Lead with up to four themes and three before-and-after numbers; delete any you don't need. Say what the comparison periods are in the footer.");
  }

  // 2. Statement (mint)
  {
    const s = pres.addSlide({ masterName: "NanoClaw Statement", sectionTitle: "Layouts" });
    fill(s, "eyebrow", "[SECTION NAME]");
    fill(s, "title", "[One sentence the room should remember.]");
    fill(s, "body", "[A line of support: the number or the reason behind it.]");
    s.addNotes("Statement slide, mint. Use it once per deck at most. No wordmark: the mascot's mint would vanish on mint. Keep the sentence under about 12 words.");
  }

  // 3. Stats (dark)
  {
    const th = T.dark;
    const s = pres.addSlide({ masterName: "NanoClaw Dark", sectionTitle: "Layouts" });
    await ichip(s, th, "lock", 128, 126, 48);
    fill(s, "eyebrow", "[SECTION NAME]");
    fill(s, "title", "[Three Numbers, One Story]");
    fill(s, "footer", "Source: [where the numbers come from, and when you pulled them]");
    const items = [["lock", "[9]", "[What the number counts]", "[One line of context.]"], ["badge-check", "[31]", "[What the number counts]", null], ["settings", "[12]", "[What the number counts]", "[One line of context.]"]];
    for (let i = 0; i < 3; i++) {
      const [ic, n, label, note] = items[i];
      const cx = 128 + i * (533 + 32);
      box(s, { x: cx, y: 312, w: 533, h: 356, fill: th.surface, line: th.border, radius: 10, name: `Card ${i + 1}` });
      await ichip(s, th, ic, cx + 40, 348);
      text(s, n, { x: cx + 40, y: 444, w: 450, h: 80, size: 72, bold: true, color: th.text });
      text(s, label, { x: cx + 40, y: 536, w: 450, h: 44, size: 32, bold: true, color: th.text });
      if (note) text(s, note, { x: cx + 40, y: 594, w: 450, h: 40, size: 24, color: th.muted });
      else await badge(s, th, "[Status in words]", cx + 40, 592);
    }
    text(s, "[SUPPORTING POINTS]", { x: 128, y: 740, w: 800, h: 36, size: 24, bold: true, color: th.accentText, tracking: 0.04 });
    const pts = ["message-square", "clock", "wrench"];
    for (let i = 0; i < 3; i++) {
      const cx = 128 + i * 565;
      await ichip(s, th, pts[i], cx, 796, 48);
      text(s, "[Short point, one line]", { x: cx + 68, y: 796, w: 470, h: 48, size: 28, color: th.text, valign: "middle" });
    }
    s.addNotes("Big numbers. Three cards: a number, what it counts and one line of context or a status badge. Numbers stay in the text colour; mint is for status.");
  }

  // 4. Compare (light)
  {
    const th = T.light;
    const s = pres.addSlide({ masterName: "NanoClaw Light", sectionTitle: "Layouts" });
    await ichip(s, th, "zap", 128, 126, 48);
    fill(s, "eyebrow", "[BEFORE AND AFTER]");
    fill(s, "title", "[Metrics Slide Title]");
    fill(s, "footer", "Source: [where the numbers come from, and when you pulled them]. [What “before” means.]");
    let lx = 1300;
    for (const [ic, c, label] of [["triangle-alert", th.risk, "Worse"], ["clock", th.ctx, "Before"], ["circle-check", th.ok, "Now, better"]]) {
      s.addImage({ data: await icon(ic, c), x: px(lx), y: px(236), w: px(28), h: px(28), altText: label });
      text(s, label, { x: lx + 36, y: 232, w: 160, h: 36, size: 24, color: th.muted, valign: "middle" });
      lx += 60 + label.length * 13;
    }
    const kpis = [
      ["circle-check", null, "[−59]", [["Before", 0.88, th.risk, "[+53]"], ["Now", 0.98, th.ok, "[−59]"]], "[How it was counted.]"],
      ["activity", null, "[99.5%]", [["Before", 0.91, th.ctx, "[91%]"], ["Now", 0.995, th.ok, "[99.5%]"]], "[How it was counted.]"],
      ["users", null, "[90%]", [["Before", 0.52, th.risk, "[52%]"], ["Now", 0.9, th.ok, "[90%]"]], "[How it was counted.]"],
      ["triangle-alert", "warn", "[146]", [["Goal", 0.68, th.ctx, "[100]"], ["Now", 1, th.warn, "[146]"]], "[Still behind: say so plainly.]"],
    ];
    const cw = (1664 - 3 * 24) / 4;
    for (let i = 0; i < 4; i++) {
      const [ic, kind, n, bars, cap] = kpis[i];
      const cx = 128 + i * (cw + 24);
      box(s, { x: cx, y: 312, w: cw, h: 310, fill: th.surface, line: th.border, radius: 10, name: `Metric ${i + 1}` });
      await ichip(s, th, ic, cx + 28, 340, 72, kind);
      text(s, n, { x: cx + 116, y: 340, w: cw - 130, h: 72, size: 60, bold: true, color: th.text, valign: "middle" });
      text(s, "[Metric name]", { x: cx + 28, y: 428, w: cw - 56, h: 36, size: 28, bold: true, color: th.text });
      bars.forEach(([l, f, c, v], j) => {
        const by = 476 + j * 44;
        text(s, l, { x: cx + 28, y: by, w: 84, h: 36, size: 24, color: th.muted, valign: "middle" });
        const bw = cw - 56 - 84 - 96 - 24;
        box(s, { x: cx + 124, y: by + 10, w: bw, h: 16, fill: th.border, pill: true });
        box(s, { x: cx + 124, y: by + 10, w: bw * f, h: 16, fill: c, pill: true });
        text(s, v, { x: cx + cw - 28 - 96, y: by, w: 96, h: 36, size: 24, bold: true, color: th.text, align: "right", valign: "middle" });
      });
      text(s, cap, { x: cx + 28, y: 572, w: cw - 56, h: 36, size: 24, color: th.muted });
    }
    text(s, "[A PROCESS IN FIVE STEPS]", { x: 128, y: 670, w: 800, h: 36, size: 24, bold: true, color: th.accentText, tracking: 0.04 });
    const steps = ["code", "search", "cloud", "users", "send"];
    const sw = (1664 - 4 * 52) / 5;
    for (let i = 0; i < 5; i++) {
      const cx = 128 + i * (sw + 52);
      await ichip(s, th, steps[i], cx, 722);
      text(s, `[Step ${["one", "two", "three", "four", "five"][i]}]`, { x: cx + 86, y: 722, w: sw - 86, h: 72, size: 28, bold: true, color: th.text, valign: "middle" });
      if (i < 4) s.addImage({ data: await icon("arrow-right", th.borderStrong), x: px(cx + sw + 12), y: px(744), w: px(28), h: px(28), altText: "then" });
    }
    s.addNotes("Metrics, light theme for dense data. Up to four cards, each a big number, its name, two bars and how it was counted. Bar colours carry status and the legend names them. Use the warning colour for a metric that is still behind.");
  }

  // 5. Steps + terminal (dark)
  {
    const th = T.dark;
    const s = pres.addSlide({ masterName: "NanoClaw Dark", sectionTitle: "Layouts" });
    await ichip(s, th, "badge-check", 128, 126, 48);
    fill(s, "eyebrow", "[HOW IT WORKS]");
    fill(s, "title", "[Steps Slide Title]");
    fill(s, "footer", "PRs: [#1234 short name] · [#1235 short name]");
    box(s, { x: 162, y: 348, w: 4, h: 340, fill: th.border, name: "Flow line" });
    const st = [["cloud", null, "[Step one]"], ["badge-check", null, "[Step two]"], ["search", null, "[Step three]"], ["triangle-alert", "warn", "[A step with a caveat]"]];
    for (let i = 0; i < 4; i++) {
      const y = 312 + i * 112;
      await ichip(s, th, st[i][0], 128, y, 72, st[i][1]);
      text(s, st[i][2], { x: 228, y, w: 760, h: 40, size: 32, bold: true, color: th.text });
      text(s, "[One or two lines on what happens and why it matters.]", { x: 228, y: y + 44, w: 760, h: 36, size: 24, color: th.muted });
    }
    const tx = 1052, tw = 740;
    box(s, { x: tx, y: 312, w: tw, h: 334, fill: "131B1D", line: "263234", radius: 10, name: "Terminal" });
    box(s, { x: tx + 2, y: 314, w: tw - 4, h: 72, fill: "1A2426", name: "Terminal bar" });
    text(s, "[what ran · when]", { x: tx + 40, y: 314, w: 420, h: 72, size: 24, color: "93A9A6", mono: true, valign: "middle" });
    await badge(s, T.dark, "Pass", tx + tw - 140, 328);
    const lines = [[["# real output, trimmed", "93A9A6"]], [["NANOCLAW_UPDATE_CHANNEL", MINT], ["=beta", "EAF4F2"]], [["changedFiles", MINT], [": 89", "EAF4F2"]], [["requirements", MINT], ["=", "EAF4F2"], ["0", MINT]], [["step-exit=", "EAF4F2"], ["0", MINT]]];
    s.addText(lines.flatMap((runs, i) => runs.map(([t, c], j) => ({ text: t, options: { color: c, breakLine: j === runs.length - 1 && i < lines.length - 1 } }))), {
      x: px(tx + 40), y: px(410), w: px(tw - 80), h: px(210), fontFace: MONO, fontSize: pt(24), margin: 0, valign: "top", lineSpacingMultiple: 1.3, isTextBox: true, objectName: "Terminal output",
    });
    text(s, "[Say what the output proves, in one sentence.]", { x: tx, y: 668, w: tw, h: 36, size: 24, color: th.muted });
    s.addNotes("Steps with proof. Up to four steps down the left, real terminal output on the right. The terminal stays dark on every theme. Never show made-up output.");
  }

  // 6. Numbered (light)
  {
    const th = T.light;
    const s = pres.addSlide({ masterName: "NanoClaw Light", sectionTitle: "Layouts" });
    await ichip(s, th, "rocket", 128, 126, 48);
    fill(s, "eyebrow", "[GETTING STARTED]");
    fill(s, "title", "[Three Steps to Do the Thing]");
    fill(s, "footer", " ");
    text(s, "[One line on who this is for.]", { x: 128, y: 290, w: 1664, h: 44, size: 32, color: th.muted });
    const cards = [["[Install]", "[What to do, in one or two sentences. Commands go in code.]"], ["[Connect]", "[What to do, in one or two sentences.]"], ["[Run it]", "[What the person sees when it works.]"]];
    for (let i = 0; i < 3; i++) {
      const cx = 128 + i * (533 + 32);
      box(s, { x: cx, y: 460, w: 533, h: 340, fill: th.surface, line: th.border, radius: 10, name: `Step ${i + 1}` });
      box(s, { x: cx + 40, y: 500, w: 64, h: 64, fill: MINT, pill: true, name: `Number ${i + 1}` });
      text(s, String(i + 1), { x: cx + 40, y: 500, w: 64, h: 64, size: 32, bold: true, color: NEAR_BLACK, align: "center", valign: "middle" });
      text(s, cards[i][0], { x: cx + 40, y: 588, w: 450, h: 44, size: 32, bold: true, color: th.text });
      text(s, cards[i][1], { x: cx + 40, y: 644, w: 450, h: 70, size: 24, color: th.muted, lh: 1.3 });
    }
    box(s, { x: 168, y: 730, w: 300, h: 40, fill: "1A2426", radius: 6 });
    text(s, "[command --flag]", { x: 180, y: 730, w: 280, h: 40, size: 24, color: "EAF4F2", mono: true, valign: "middle" });
    await badge(s, th, "[Done when …]", 128 + 2 * 565 + 40, 728);
    s.addNotes("Numbered steps, for a how-to or getting-started slide. Number dots are a mint fill with a near-black label. Leave the $ prompt off commands so people can copy them.");
  }

  // 7. Table (light), a native table so it stays editable
  {
    const th = T.light;
    const s = pres.addSlide({ masterName: "NanoClaw Light", sectionTitle: "Layouts" });
    await ichip(s, th, "settings", 128, 126, 48);
    fill(s, "eyebrow", "[SECTION NAME]");
    fill(s, "title", "[Table Slide Title]");
    fill(s, "footer", "[Where each change is recorded, and when you checked it]");
    const hd = (t) => ({ text: t.toUpperCase(), options: { bold: true, color: th.muted, fontSize: pt(24), border: [{ type: "none" }, { type: "none" }, { pt: 1.5, color: th.borderStrong }, { type: "none" }] } });
    const rows = [[hd("Area"), hd("When"), hd("Item"), hd("Before"), hd("Now")]];
    const groups = [["[Group one]", ["09-29", "11-07"]], ["[Group two]", ["10-03", "10-03", "11-06"]], ["[Group three]", ["10-01", "10-04"]], ["[Group four]", ["10-16"]]];
    for (const [g, dates] of groups) {
      dates.forEach((d, i) => {
        const last = i === dates.length - 1;
        const b = [{ type: "none" }, { type: "none" }, { pt: last ? 1.5 : 1, color: last ? th.borderStrong : th.border }, { type: "none" }];
        const cell = (t, o = {}) => ({ text: t, options: { border: b, ...o } });
        rows.push([
          i === 0 ? { text: g, options: { bold: true, rowspan: dates.length, valign: "top", border: [{ type: "none" }, { type: "none" }, { pt: 1.5, color: th.borderStrong }, { type: "none" }] } } : null,
          cell(d, { fontFace: MONO, color: th.muted }),
          cell("[Item]", { bold: true }),
          cell("[old state]", { color: th.muted }),
          cell("✓ [new state]", { bold: true, color: th.accentText }),
        ].filter(Boolean));
      });
    }
    s.addTable(rows, {
      x: px(128), y: px(312), w: px(1664), colW: [px(284), px(114), px(444), px(324), px(498)],
      fontFace: SANS, fontSize: pt(24), color: th.text, fill: { color: th.bg }, margin: [px(6), px(8), px(6), 0], rowH: px(46), valign: "middle", objectName: "Grouped table",
    });
    s.addNotes("Grouped table, light theme. Up to four groups and about ten rows fit. Dates are MM-DD in mono. The last column carries the check and the new state in words. Split the table over two slides rather than shrinking the text.");
  }

  // 8. Contents (dark)
  {
    const th = T.dark;
    const s = pres.addSlide({ masterName: "NanoClaw Dark", sectionTitle: "Layouts" });
    await ichip(s, th, "book-open", 128, 126, 48);
    fill(s, "eyebrow", "[CONTENTS OR BACKUP]");
    fill(s, "title", "[Contents Slide Title]");
    fill(s, "footer", " ");
    text(s, "[One line on what follows.]", { x: 128, y: 290, w: 1664, h: 44, size: 32, color: th.muted });
    const items = ["badge-check", "settings", "wrench", "link", "message-square", "users", "star"];
    for (let i = 0; i < items.length; i++) {
      const col = i < 4 ? 0 : 1, row = i < 4 ? i : i - 4;
      const cx = 128 + col * 864, y = 430 + row * 100;
      text(s, String(i + 2), { x: cx, y, w: 56, h: 72, size: 32, color: th.muted, mono: true, align: "right", valign: "middle" });
      await ichip(s, th, items[i], cx + 80, y);
      text(s, "[Slide or section title]", { x: cx + 176, y, w: 640, h: 72, size: 32, bold: true, color: th.text, valign: "middle" });
    }
    s.addNotes("Contents, or an index of backup slides. Numbers are slide numbers, in mono. Up to eight rows over two columns.");
  }

  // 9. Closing (dark)
  {
    const th = T.dark;
    const s = pres.addSlide({ masterName: "NanoClaw Dark", sectionTitle: "Layouts" });
    await ichip(s, th, "star", 128, 126, 48);
    fill(s, "eyebrow", "[WHERE WE’RE GOING]");
    fill(s, "title", "[What’s Next and How to Help]");
    fill(s, "footer", " ");
    const goals = [["[Goal 1]", "In progress", "warn"], ["[Goal 2]", "On track", "ok"], ["[Goal 3]", "Behind", "risk"]];
    for (let i = 0; i < 3; i++) {
      const cx = 128 + i * (539 + 24);
      box(s, { x: cx, y: 312, w: 539, h: 232, fill: th.surface, line: th.border, radius: 10, name: `Goal ${i + 1}` });
      box(s, { x: cx + 32, y: 342, w: 120, h: 40, line: th.accentText, pill: true });
      text(s, goals[i][0], { x: cx + 32, y: 342, w: 120, h: 40, size: 24, bold: true, color: th.accentText, align: "center", valign: "middle" });
      const bw = 64 + goals[i][1].length * 14;
      await badge(s, th, goals[i][1], cx + 539 - 32 - bw, 340, goals[i][2]);
      text(s, "[Goal name]", { x: cx + 32, y: 404, w: 475, h: 44, size: 32, bold: true, color: th.text });
      text(s, "[146] [where it stands]. Goal: [target] by [date].", { x: cx + 32, y: 458, w: 475, h: 66, size: 24, color: th.muted, lh: 1.3 });
    }
    text(s, "HOW YOU CAN HELP", { x: 128, y: 600, w: 800, h: 36, size: 24, bold: true, color: th.accentText, tracking: 0.04 });
    const asks = ["play", "git-pull-request", "wrench"];
    for (let i = 0; i < 3; i++) {
      const y = 652 + i * 96;
      await ichip(s, th, asks[i], 128, y);
      text(s, `[Ask ${["one", "two", "three"][i]}]`, { x: 224, y: y - 2, w: 900, h: 40, size: 32, bold: true, color: th.text });
      text(s, "[How, in one line.]", { x: 224, y: y + 40, w: 900, h: 34, size: 24, color: th.muted });
    }
    text(s, "Thank you.", { x: 1100, y: 760, w: 692, h: 110, size: 100, bold: true, color: th.text, align: "right", valign: "bottom" });
    text(s, "[Credits or a link]", { x: 1100, y: 880, w: 692, h: 36, size: 24, color: th.muted, align: "right" });
    s.addNotes("Closing. Up to three goals with an honest status badge, then up to three concrete asks. End on thanks.");
  }

  const tmp = OUT.replace(/\.potx$/, ".tmp.pptx");
  await pres.writeFile({ fileName: tmp });

  // Theme colours (pptxgenjs writes Office's stock palette), then mark the package as a template (.potx)
  const zip = await JSZip.loadAsync(fs.readFileSync(tmp));
  const themeFile = Object.keys(zip.files).find((f) => /^ppt\/theme\/theme\d+\.xml$/.test(f));
  let xml = await zip.file(themeFile).async("string");
  xml = xml.replace(/<a:clrScheme name="[^"]*">[\s\S]*?<\/a:clrScheme>/, () => {
    const c = THEME.colors;
    const el = (k) => `<a:${k}><a:srgbClr val="${c[k]}"/></a:${k}>`;
    return `<a:clrScheme name="NanoClaw">${["dk1", "lt1", "dk2", "lt2", "accent1", "accent2", "accent3", "accent4", "accent5", "accent6", "hlink", "folHlink"].map(el).join("")}</a:clrScheme>`;
  });
  xml = xml.replace(/<a:theme ([^>]*)name="[^"]*"/, '<a:theme $1name="NanoClaw"');
  zip.file(themeFile, xml);
  let types = await zip.file("[Content_Types].xml").async("string");
  types = types.replace("application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml", "application/vnd.openxmlformats-officedocument.presentationml.template.main+xml");
  zip.file("[Content_Types].xml", types);
  // Copy files only: folder entries in the ZIP can stop cloud services from opening it
  const out = new JSZip();
  for (const [name, entry] of Object.entries(zip.files)) {
    if (!entry.dir) out.file(name, await entry.async("nodebuffer"), { createFolders: false });
  }
  fs.writeFileSync(OUT, await out.generateAsync({ type: "nodebuffer", compression: "DEFLATE" }));
  fs.unlinkSync(tmp);
  console.log(`wrote ${path.relative(root, OUT)}`);
}

build().catch((e) => { console.error(e); process.exit(1); });
