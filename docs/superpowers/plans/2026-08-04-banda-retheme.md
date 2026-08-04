# BANDA High-Velocity Retheme Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Retheme the app from Naibet Core (charcoal/purple/green) to BANDA High-Velocity (coffee/gold) by editing colour tokens only, with no changes to component markup.

**Architecture:** All colour lives in `app/assets/css/style.css`, organised in four layers: 1 palette (the only hexes), 2 semantics (role tokens, declared twice — `:root` is dark, `[data-theme="light"]` is light), 3 bindings (`@theme` blocks exposing 1–2 as Tailwind utilities, including remaps of Tailwind's stock ramps onto the project palette), 4 utilities. Because layers 3–4 contain zero literal colours, rewriting layer 1 and re-mapping layer 2 retheme roughly 2,000 existing utility-class usages across the app for free. Layer 1 goes from six ramps to five: `slate`→`coffee`, `purple` merges into a rebuilt `gold`, `green` retunes to emerald, `tertiary` becomes neutral gray, `red` is untouched.

**Tech Stack:** Nuxt 4, Tailwind CSS 4 (CSS-first config, no `tailwind.config.js`), pnpm.

**Spec:** `docs/superpowers/specs/2026-08-04-banda-retheme-design.md`

## Global Constraints

- **Only** `app/assets/css/style.css` and `CLAUDE.md` may be modified. No `.vue` file is touched by this plan.
- No literal colour may appear below layer 2 of `style.css`. Layers 3 and 4 reference `var(--palette-*)` or `var(--semantic)` only.
- There is no test framework in this repo. Verification is `pnpm build`, `grep` assertions with stated expected output, and a scripted WCAG contrast check.
- Dark theme is `:root` and is the default. Light theme is `[data-theme="light"]`. Both must remain fully functional.
- `#fa9602` (gold-500) is **2.23:1 on white** and must never be used as light-theme text. Light theme uses gold-700 `#8a5100` for text/borders; gold-500 is a fill only, carrying gold-900 `#4a2800` text.
- Ramp direction is unchanged: `50` is lightest, `950` is darkest.
- Every step of every ramp must be defined — Tailwind's remap blocks reference all eleven steps of `coffee`, `gold`, `green`, `red`, and steps 50–900 of `tertiary` (`tertiary` has no `950`; do not add one, and do not reference one).
- Commit after each task. Do not squash tasks together.

## File Structure

| File | Change | Responsibility |
|---|---|---|
| `app/assets/css/style.css` lines 22–107 | Rewrite | Layer 1 palette — the five ramps |
| `app/assets/css/style.css` lines 111–213 | Modify | Layer 2 dark theme semantics |
| `app/assets/css/style.css` lines 216–295 | Rewrite | Layer 2 light theme semantics |
| `app/assets/css/style.css` lines 299–749 | Mechanical edit | Layer 3 — rename `--palette-slate-*`→`--palette-coffee-*`, `--palette-purple-*`→`--palette-gold-*` on right-hand sides only |
| `app/assets/css/style.css` lines 750–1263 | Mechanical edit | Layer 4 — same rename, 5 references (lines 814, 815, 825, 837, 838, 845, 846) |
| `CLAUDE.md` "Design System" section | Rewrite | Documentation now describes BANDA, not Naibet Core |

Line numbers are from the pre-change file and will drift as you work. Locate blocks by their comment headers (`LAYER 1 — PALETTE`, `── Light theme ──`, etc.), not by line number.

---

### Task 1: Rebuild layer 1 and repoint every reference

Rewrite all five palette ramps and mechanically rename the two families whose identity changed, so that layers 2–4 keep resolving. After this task the app already renders coffee-and-gold, because `--primary` currently points at `--palette-purple-500`, which becomes `--palette-gold-500`. Layer 2 roles are still wrong in places — Task 2 fixes that.

**Files:**
- Modify: `app/assets/css/style.css` (layer 1 body; then whole-file rename of two variable families)

**Interfaces:**
- Consumes: nothing.
- Produces: the five ramps `--palette-coffee-{50,100,200,300,400,500,600,700,800,900,950}`, `--palette-gold-{50…950}`, `--palette-green-{50…950}`, `--palette-red-{50…950}` (unchanged values), `--palette-tertiary-{50…900}`, plus `--palette-white` / `--palette-black` (unchanged). Tasks 2 and 3 consume these names.

- [ ] **Step 1: Record the baseline so you can prove the rename was total**

```bash
cd /Users/leonardmbugua/Desktop/bandabet
grep -c 'palette-slate' app/assets/css/style.css    # expect 99
grep -c 'palette-purple' app/assets/css/style.css   # expect 74
grep -c 'palette-gold' app/assets/css/style.css     # expect 57
```

Write the three numbers down. If they differ from 99 / 74 / 57 the file has already been modified — stop and ask before continuing.

- [ ] **Step 2: Replace the Charcoal Slate ramp with Coffee**

In layer 1, replace the whole `/* Charcoal Slate … */` block (the eleven `--palette-slate-*` declarations and their comment) with:

```css
  /* Coffee — the structural neutral. Values are the BANDA spec's
     Material-3 surface tokens; only the 50 step is interpolated, to give
     the light theme a warm off-white above on-surface. */
  --palette-coffee-50:  #fdf8f3;
  --palette-coffee-100: #f1dfd1;   /* on-surface */
  --palette-coffee-200: #dbc2ad;   /* on-surface-variant */
  --palette-coffee-300: #a28d7a;   /* outline */
  --palette-coffee-400: #544434;   /* outline-variant */
  --palette-coffee-500: #3d3329;   /* surface-container-highest */
  --palette-coffee-600: #32281f;   /* surface-container-high */
  --palette-coffee-700: #271e15;   /* surface-container */
  --palette-coffee-800: #231a11;   /* surface-container-low */
  --palette-coffee-900: #1a120a;   /* surface / background */
  --palette-coffee-950: #140d06;   /* surface-container-lowest */
```

- [ ] **Step 3: Replace the Naibet Purple and Gold ramps with one BANDA Gold ramp**

Delete the entire `/* Naibet Purple … */` block (eleven `--palette-purple-*` declarations). Then replace the `/* Gold … */` block with:

```css
  /* BANDA Gold — brand, primary action, jackpots, selected odds.
     Eight of eleven steps are verbatim spec tokens; 50, 200 and 600 are
     interpolated to keep the ramp evenly spaced. */
  --palette-gold-50:  #fff8ee;
  --palette-gold-100: #ffdcbd;   /* primary-fixed */
  --palette-gold-200: #ffcb9a;
  --palette-gold-300: #ffbc77;   /* primary */
  --palette-gold-400: #ffb86f;   /* surface-tint / primary-fixed-dim */
  --palette-gold-500: #fa9602;   /* BANDA Gold — primary-container */
  --palette-gold-600: #d97e00;
  --palette-gold-700: #8a5100;   /* inverse-primary */
  --palette-gold-800: #693c00;   /* on-primary-fixed-variant */
  --palette-gold-900: #4a2800;   /* on-primary */
  --palette-gold-950: #2c1600;   /* on-primary-fixed */
```

Keep this block in the position the purple block occupied (second ramp), so layer 1 reads neutral-then-brand. Delete the now-duplicate old gold block entirely.

- [ ] **Step 4: Retune the green ramp to emerald**

Replace the eleven `--palette-green-*` declarations with:

```css
  /* Emerald — win / odds-up status only. No longer a brand or CTA colour;
     cooled from the old Action Green so it separates from gold on coffee. */
  --palette-green-50:  #ecfdf5;
  --palette-green-100: #d1fae5;
  --palette-green-200: #a7f3d0;
  --palette-green-300: #34d399;
  --palette-green-400: #10b981;   /* the win / odds-up colour */
  --palette-green-500: #059669;
  --palette-green-600: #048c60;
  --palette-green-700: #047857;
  --palette-green-800: #065f46;   /* light-theme text-legible variant */
  --palette-green-900: #064e3b;
  --palette-green-950: #022c22;
```

- [ ] **Step 5: Turn the tertiary ramp neutral gray**

Replace the ten `--palette-tertiary-*` declarations with (note: 50–900, there is no 950):

```css
  /* Tertiary — informational neutral gray, per the spec's tertiary tokens.
     A chromatic tertiary would fight the coffee/gold pairing. */
  --palette-tertiary-50:  #f4f4f4;
  --palette-tertiary-100: #e2e2e2;   /* tertiary-fixed */
  --palette-tertiary-200: #c9c9c9;   /* tertiary */
  --palette-tertiary-300: #adaeae;   /* tertiary-container */
  --palette-tertiary-400: #8a8c8c;
  --palette-tertiary-500: #6b6d6d;
  --palette-tertiary-600: #545656;
  --palette-tertiary-700: #454747;   /* on-tertiary-fixed-variant */
  --palette-tertiary-800: #404242;   /* on-tertiary-container */
  --palette-tertiary-900: #2f3131;   /* on-tertiary */
```

Leave the red ramp and the `/* Absolutes */` block untouched.

- [ ] **Step 6: Update the layer 1 header comment**

The block comment above the ramps still names the old system. Replace its ramp inventory line so it reads:

```css
   Five ramps: Coffee (neutral), BANDA Gold (brand/primary), Emerald
   (win/up), Signal Red (live/loss), Tertiary Gray (informational).
```

- [ ] **Step 7: Rename the two families across the whole file**

This rewrites the right-hand sides in layers 2, 3 and 4. Tailwind-facing names (`--color-gray-800`, `--color-purple-500`) are deliberately **not** renamed — only `--palette-*`.

```bash
cd /Users/leonardmbugua/Desktop/bandabet
sed -i '' 's/--palette-slate-/--palette-coffee-/g; s/--palette-purple-/--palette-gold-/g' app/assets/css/style.css
```

- [ ] **Step 8: Verify the rename was total and nothing dangles**

```bash
cd /Users/leonardmbugua/Desktop/bandabet
grep -c 'palette-slate\|palette-purple' app/assets/css/style.css   # expect 0
grep -c 'palette-coffee' app/assets/css/style.css                  # expect 99
grep -c 'palette-gold' app/assets/css/style.css                    # expect 120
# 120 = 57 existing gold occurrences (its 11 declarations are rewritten in
# place, not added to) + 63 renamed purple references. The purple family had
# 74 occurrences, but Step 3 deletes its 11 declaration lines outright, so
# only its 63 var() references survive to be renamed.
grep -c '^\s*--palette-gold-[0-9]*:' app/assets/css/style.css      # expect 11 — one gold ramp, no duplicate declarations
```

Then confirm every referenced palette variable is actually declared — this catches a step referenced by layer 3 but missing from a rewritten ramp:

```bash
cd /Users/leonardmbugua/Desktop/bandabet
node -e '
const fs=require("fs");
const css=fs.readFileSync("app/assets/css/style.css","utf8");
const declared=new Set([...css.matchAll(/^\s*(--palette-[a-z0-9-]+):/gm)].map(m=>m[1]));
const used=new Set([...css.matchAll(/var\((--palette-[a-z0-9-]+)\)/g)].map(m=>m[1]));
const missing=[...used].filter(v=>!declared.has(v));
console.log(missing.length? "MISSING: "+missing.join(", ") : "OK — all "+used.size+" referenced palette vars are declared");
'
```

Expected: a line starting `OK —`. The count it reports is 66 before the rename and will be equal or lower after (merging purple into gold collapses any step referenced by both) — the count is informational, the pass condition is simply that it does not print `MISSING`. If it does, add the named steps to the relevant ramp before continuing.

- [ ] **Step 9: Verify no literal colour leaked below layer 2**

Anchor on the layer 3 header comment rather than a line number — line numbers drift as you edit.

```bash
cd /Users/leonardmbugua/Desktop/bandabet
awk '/LAYER 3 — BINDINGS/{on=1} on && /#[0-9a-fA-F]{3,8}\b/ {print NR": "$0}' app/assets/css/style.css
```

Expected: no output.

- [ ] **Step 10: Build**

```bash
cd /Users/leonardmbugua/Desktop/bandabet && pnpm build
```

Expected: completes without error, writes `.output/`.

- [ ] **Step 11: Commit**

```bash
cd /Users/leonardmbugua/Desktop/bandabet
git add app/assets/css/style.css
git commit -m "feat(theme): rebuild layer 1 palette as BANDA coffee/gold

Five ramps replace six: slate->coffee, purple merges into a rebuilt
gold, green retunes to emerald, tertiary goes neutral gray, red is
unchanged (its values already match the spec's error tokens).

Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>"
```

---

### Task 2: Reassign layer 2 dark-theme roles

Layer 1 alone leaves several roles semantically wrong: `--bet` and `--secondary` still point at green, the surface ladder still uses the old three-step spacing, and the brand aliases carry Naibet-era names. This task makes the dark theme match the spec, including the gold CTA flip.

**Files:**
- Modify: `app/assets/css/style.css`, the `:root` block under `LAYER 2 — SEMANTICS` (starts at the comment `/* ── Dark theme (default) ── */`)

**Interfaces:**
- Consumes: the five ramps from Task 1.
- Produces: dark-theme values for every semantic token. Task 3 mirrors this token list for light; the *set* of token names must stay identical between the two blocks.

- [ ] **Step 1: Rewrite the Base, Primary, Secondary and Tertiary roles**

Replace those four groups with:

```css
  /* Base */
  --background: var(--palette-coffee-900);
  --foreground: var(--palette-coffee-100);

  --card: var(--palette-coffee-800);
  --card-foreground: var(--palette-coffee-100);

  --popover: var(--palette-coffee-700);
  --popover-foreground: var(--palette-coffee-100);

  /* Primary — BANDA Gold. Carries gold-900 text, never white: white on
     this gold is 2.1:1. */
  --primary: var(--palette-gold-500);
  --primary-foreground: var(--palette-gold-900);

  /* Secondary — the spec's warm peach. */
  --secondary: #edbca6;
  --secondary-foreground: #47291a;

  /* Tertiary — informational */
  --tertiary: var(--palette-tertiary-300);
  --tertiary-foreground: var(--palette-tertiary-900);
```

`--secondary` and `--secondary-foreground` are the spec's `secondary` / `on-secondary` tokens and have no ramp of their own; literal hexes are correct here because this is layer 2 — but if a later change needs more than two steps of peach, promote it to a layer 1 ramp rather than adding more literals here.

- [ ] **Step 2: Rewrite the muted, accent and status roles**

```css
  --muted: var(--palette-coffee-700);
  --muted-foreground: var(--palette-coffee-300);

  /* Accent — the quiet interactive surface (hover rows, tinted panels).
     One tonal step above card so it reads as a lift, not a colour. */
  --accent: var(--palette-coffee-600);
  --accent-foreground: var(--foreground);

  --destructive: var(--palette-red-200);
  --destructive-foreground: var(--palette-red-950);

  --success: var(--palette-green-400);
  --warning: var(--palette-gold-400);

  --border: var(--palette-coffee-400);
  --input: var(--palette-coffee-800);
  --ring: var(--palette-gold-500);

  --gold: var(--palette-gold-500);
  --gold-foreground: var(--palette-gold-900);
  --emerald: var(--palette-green-400);
  --dark-card: var(--palette-coffee-800);
```

- [ ] **Step 3: Flip the bet/CTA roles to gold**

This is the change that moves Place Bet, Join Now and the betslip orb off green. Replace the `/* Bet — … */` group with:

```css
  /* Bet — the conversion CTAs (Join Now, Place Bet, betslip orb) and
     selected odds cells. BANDA Gold with gold-900 text: 5.9:1, AA at any
     size, and identical in both themes so the CTA never shifts hue.
     bright/deep are the lift and the edge, for glows, borders and shadows. */
  --bet: var(--palette-gold-500);
  --bet-foreground: var(--palette-gold-900);
  --bet-hover: var(--palette-gold-400);
  --bet-bright: var(--palette-gold-300);
  --bet-deep: var(--palette-gold-700);
```

- [ ] **Step 4: Rewrite the surface ladder and the brand/gold aliases**

```css
  /* Surfaces — tonal layers, deepest to most-raised */
  --surface-deepest: var(--palette-coffee-950);
  --surface-sunken: var(--palette-coffee-900);
  --surface-elevated: var(--palette-coffee-800);
  --surface-interactive: var(--palette-coffee-600);
  --surface-active: var(--palette-coffee-500);

  /* Brand ramp aliases */
  --brand-bright: var(--palette-gold-500);
  --brand-dark: var(--palette-gold-800);
  --brand-selected: var(--palette-gold-500);
  --brand-mid: var(--palette-gold-600);
  --brand-forest: var(--palette-coffee-950);
  --brand-teal: var(--palette-coffee-700);

  /* Gold aliases */
  --gold-bright: var(--palette-gold-300);
  --gold-deep: var(--palette-gold-700);
  --gold-muted: var(--palette-gold-400);
  --bronze: var(--palette-gold-800);

  /* Borders */
  --border-subtle: var(--palette-coffee-700);
  --border-strong: var(--palette-coffee-300);
  --border-darkest: var(--palette-coffee-950);

  /* Text */
  --text-muted-alt: var(--palette-coffee-300);
  --text-subtle: var(--palette-coffee-200);
```

Leave `--radius`, the `--elevation-*` group and `--focus-glow` in this block unchanged — dark already uses a black umbra, which is correct for coffee-black.

- [ ] **Step 5: Verify the dark block references only the new ramps**

```bash
cd /Users/leonardmbugua/Desktop/bandabet
awk '/── Dark theme/,/^}/' app/assets/css/style.css | grep -oE 'palette-[a-z]+' | sort -u
```

Expected exactly: `palette-coffee`, `palette-gold`, `palette-green`, `palette-red`, `palette-tertiary`. Anything else (notably `palette-white`) means a role still carries a Naibet-era value — white text on gold is the specific thing this check exists to catch.

- [ ] **Step 6: Build**

```bash
cd /Users/leonardmbugua/Desktop/bandabet && pnpm build
```

Expected: completes without error.

- [ ] **Step 7: Commit**

```bash
cd /Users/leonardmbugua/Desktop/bandabet
git add app/assets/css/style.css
git commit -m "feat(theme): reassign dark-theme roles to BANDA

Flips the conversion CTAs (Place Bet, Join Now, betslip orb) and
selected odds from Action Green to BANDA Gold per the spec; green is
now win/odds-up status only. Surface ladder maps onto the spec's
tonal container scale.

Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>"
```

---

### Task 3: Derive the light theme

The spec ships no light tokens, so this block is derived from the same ramps: white surfaces, coffee text, gold darkened to gold-700 wherever it carries text.

**Files:**
- Modify: `app/assets/css/style.css`, the `[data-theme="light"]` block

**Interfaces:**
- Consumes: the ramps from Task 1 and the token *names* fixed by Task 2.
- Produces: nothing consumed by later tasks; Task 4 verifies it.

- [ ] **Step 1: Rewrite the light block**

Replace the entire body of `[data-theme="light"] { … }` with:

```css
  --background: #faf7f4;
  --foreground: var(--palette-coffee-900);

  --card: var(--palette-white);
  --card-foreground: var(--palette-coffee-900);

  --popover: var(--palette-white);
  --popover-foreground: var(--palette-coffee-900);

  /* Gold-500 is 2.2:1 on white — unusable as text. Light uses gold-700
     for anything that carries or outlines text. */
  --primary: var(--palette-gold-700);
  --primary-foreground: var(--palette-white);

  --secondary: #edbca6;
  --secondary-foreground: #47291a;

  --tertiary: var(--palette-tertiary-800);
  --tertiary-foreground: var(--palette-white);

  --muted: #f3ede7;
  --muted-foreground: var(--palette-coffee-400);

  --accent: #f7ede2;
  --accent-foreground: var(--foreground);

  --destructive: var(--palette-red-600);
  --destructive-foreground: var(--palette-white);

  /* Text-legible variants — the dark-theme status colours are too light
     to read on off-white */
  --success: var(--palette-green-800);
  --warning: var(--palette-gold-700);

  --border: var(--palette-coffee-200);
  --input: var(--palette-white);
  --ring: var(--palette-gold-700);

  --gold: var(--palette-gold-700);
  --gold-foreground: var(--palette-white);
  --emerald: var(--palette-green-800);
  --dark-card: #f3ede7;

  /* Bet — same gold fill and same dark text in both themes so the CTA
     never shifts hue; only the hover deepens rather than lifts. */
  --bet: var(--palette-gold-500);
  --bet-foreground: var(--palette-gold-900);
  --bet-hover: var(--palette-gold-600);
  --bet-bright: var(--palette-gold-600);
  --bet-deep: var(--palette-gold-800);

  --surface-deepest: #e8ddd2;
  --surface-sunken: #f3ede7;
  --surface-elevated: var(--palette-white);
  --surface-interactive: #f3ede7;
  --surface-active: #e8ddd2;

  --brand-bright: var(--palette-gold-700);
  --brand-dark: var(--palette-gold-900);
  --brand-selected: var(--palette-gold-500);
  --brand-mid: var(--palette-gold-700);
  --brand-forest: var(--palette-coffee-950);
  --brand-teal: var(--palette-coffee-700);

  --gold-bright: var(--palette-gold-600);
  --gold-deep: var(--palette-gold-800);
  --gold-muted: var(--palette-gold-700);
  --bronze: var(--palette-gold-800);

  --border-subtle: #f0e7dd;
  --border-strong: var(--palette-coffee-300);
  --border-darkest: var(--palette-coffee-400);

  --text-muted-alt: var(--palette-coffee-400);
  --text-subtle: var(--palette-coffee-500);

  /* Elevation — light uses a coffee umbra so shadows stay in-family */
  --elevation-umbra: 45 19 6;
  --elevation-alpha-1: 0.05;
  --elevation-alpha-2: 0.10;
  --elevation-alpha-3: 0.14;
```

`--brand-selected` stays gold-500 in light because it is a *fill* behind gold-900 text (selected odds cells), not a text colour.

- [ ] **Step 2: Verify both themes declare the same token set**

A token defined in dark but missing in light silently inherits the dark value and produces an unreadable element. This check must pass:

```bash
cd /Users/leonardmbugua/Desktop/bandabet
node -e '
const fs=require("fs");
const css=fs.readFileSync("app/assets/css/style.css","utf8");
const grab=(re)=>{const m=css.match(re); return new Set([...m[0].matchAll(/^\s*(--[a-z0-9-]+):/gm)].map(x=>x[1]));};
const dark=grab(/── Dark theme[\s\S]*?\n}/);
const light=grab(/\[data-theme="light"\][\s\S]*?\n}/);
const onlyDark=[...dark].filter(t=>!light.has(t));
const onlyLight=[...light].filter(t=>!dark.has(t));
console.log("dark:",dark.size,"light:",light.size);
console.log(onlyDark.length? "ONLY IN DARK: "+onlyDark.join(", ") : "no dark-only tokens");
console.log(onlyLight.length? "ONLY IN LIGHT: "+onlyLight.join(", ") : "no light-only tokens");
'
```

Expected: `--radius` and `--focus-glow` are the only acceptable dark-only entries (they are theme-independent and deliberately declared once). Any other dark-only token is a bug — add it to the light block. There must be no light-only tokens.

- [ ] **Step 3: Build**

```bash
cd /Users/leonardmbugua/Desktop/bandabet && pnpm build
```

Expected: completes without error.

- [ ] **Step 4: Commit**

```bash
cd /Users/leonardmbugua/Desktop/bandabet
git add app/assets/css/style.css
git commit -m "feat(theme): derive BANDA light theme

White surfaces on warm off-white, coffee text, gold-700 wherever gold
carries or outlines text. The bet CTA keeps the gold-500 fill and
gold-900 text used in dark, so the conversion path never shifts hue
between themes.

Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>"
```

---

### Task 4: Verify contrast, verify visually, update the docs

**Files:**
- Modify: `CLAUDE.md` (the "Design System" section)
- Read only: `app/assets/css/style.css`

**Interfaces:**
- Consumes: everything from Tasks 1–3.
- Produces: the final deliverable.

- [ ] **Step 1: Run the contrast check**

```bash
cd /Users/leonardmbugua/Desktop/bandabet
node -e '
const L=h=>{const c=h.replace("#","").match(/../g).map(x=>parseInt(x,16)/255).map(v=>v<=0.03928?v/12.92:((v+0.055)/1.055)**2.4);return 0.2126*c[0]+0.7152*c[1]+0.0722*c[2]};
const R=(a,b)=>{const[x,y]=[L(a),L(b)].sort((p,q)=>q-p);return (x+0.05)/(y+0.05)};
const cases=[
["#f1dfd1","#1a120a","dark body text",4.5],
["#a28d7a","#231a11","dark muted on card",4.5],
["#ffbc77","#1a120a","dark gold text",4.5],
["#fa9602","#4a2800","bet CTA fill+text",4.5],
["#10b981","#1a120a","dark win",4.5],
["#ffb4ab","#1a120a","dark loss/live",4.5],
["#edbca6","#47291a","secondary",4.5],
["#1a120a","#faf7f4","light body text",4.5],
["#8a5100","#ffffff","light gold text",4.5],
["#065f46","#ffffff","light win",4.5],
["#544434","#faf7f4","light muted",4.5],
];
let fail=0;
for(const[a,b,n,min]of cases){const r=R(a,b);const ok=r>=min;if(!ok)fail++;console.log((ok?"PASS":"FAIL"),r.toFixed(2).padStart(6),n)}
console.log(fail? fail+" FAILURES":"all pairs meet AA");
'
```

Expected: `all pairs meet AA`. If any pair fails, darken (light theme) or lighten (dark theme) the *foreground* token by one ramp step and re-run — do not change the ramp values themselves, they are spec tokens.

- [ ] **Step 2: Confirm gold-500 is not used as light-theme text**

```bash
cd /Users/leonardmbugua/Desktop/bandabet
awk '/\[data-theme="light"\]/,/^}/' app/assets/css/style.css | grep -nE 'gold-500'
```

Expected: exactly two hits — `--bet:` and `--brand-selected:`. Both are fills carrying gold-900 text. A hit on `--primary`, `--warning`, `--gold`, or any `*-foreground` token is a contrast bug.

- [ ] **Step 3: Start the dev server**

```bash
cd /Users/leonardmbugua/Desktop/bandabet && pnpm dev
```

Runs on port 5079.

- [ ] **Step 4: Visual pass, dark theme**

Visit and confirm each: `/` (home), a sports league page, the betslip with a selection added, and a casino page.

Confirm specifically:
- Backgrounds are coffee-black, not charcoal-blue.
- Place Bet / Join Now / the betslip orb are **gold with dark text**, not green.
- A selected odds cell is gold with dark text.
- Green appears only on win/up indicators; red on Live badges and losses.
- No purple anywhere. Any purple left is a hardcoded literal in a component — note the file, do not fix it (out of scope).

- [ ] **Step 5: Visual pass, light theme**

Toggle the theme switch and repeat Step 4's four pages. Confirm text is readable everywhere, cards are white on warm off-white, and the CTA is still the same gold as in dark.

- [ ] **Step 6: Note the known residue**

The spec lists five component files with off-token hexes that will not have followed the retheme. Check whether they now look wrong, in this order of likelihood: `app/components/ThePopular.vue:176` (`#504b5c` purple-gray border), `app/components/promos/ui/PromoCta.vue:29` (`#eafbef` green-tinted text on a now-gold CTA), `app/components/promos/ui/PromoStat.vue:44` (`#c08442`), `app/components/DarkBorderDivider.vue:13-14`, `app/components/HotSection.vue:910`.

Record what you observe in the commit message or hand-off note. **Do not fix them** — this plan does not touch `.vue` files.

- [ ] **Step 7: Update CLAUDE.md**

In the "Design System" section, replace the Naibet Core description with BANDA. The specific edits:

- The opening line: the design system is specified by `DESIGN.md` (**BANDA High-Velocity** — "Modern Corporate with High-Density"), not Naibet Core / "Modern Corporate Precision".
- Layer 1's ramp list: "Five ramps: Coffee (neutral), BANDA Gold (brand/primary), Emerald (win/up), Signal Red (live/loss), Tertiary Gray (informational)."
- Layer 3's sentence about Tailwind remapping: keep it, but change "the Naibet palette" to "the BANDA palette" and note that `bg-purple-*` and `bg-amber-*` both resolve to gold, and `bg-gray-*` to coffee.
- Add one line after the "To retheme the app, edit layer 1 only" paragraph: "Gold-500 `#fa9602` is 2.2:1 on white and must never be light-theme text — see the contrast rules in `docs/superpowers/specs/2026-08-04-banda-retheme-design.md`."
- Leave the Type, Shape and Elevation bullets alone. `DESIGN.md` now specifies Poppins and a high-density grid, but neither is implemented; the existing bullets still describe what the code does. Add a single line at the end of the section: "`DESIGN.md`'s typography (Poppins) and high-density layout rules are **not yet implemented** — only the colour half of the BANDA spec has landed."

- [ ] **Step 8: Commit**

```bash
cd /Users/leonardmbugua/Desktop/bandabet
git add CLAUDE.md
git commit -m "docs: describe the BANDA design system in CLAUDE.md

Colour half of DESIGN.md is implemented; typography and density are
flagged as not yet done.

Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>"
```

---

## Out of scope

Named here so nobody mistakes them for oversights:

- **Typography.** `DESIGN.md` specifies Poppins across six type roles. The app still loads Inter + Montserrat in `nuxt.config.js:349`.
- **Density.** 8px gutters, 8px/4px betting-cell padding, 32px table rows, the 12-column desktop grid. These require component markup changes.
- **The five off-token component hexes** listed in Task 4 Step 6.
- **SVG icon fills.** Sixteen further component files hold hexes in icon and logo markup; these are intentionally left alone.
