# BANDA High-Velocity Retheme — Design

**Date:** 2026-08-04
**Scope:** Colour tokens only. `app/assets/css/style.css` layers 1–3. No component markup, no typography, no density changes.

## Goal

Retheme the app from **Naibet Core** (charcoal / purple / green, "Modern Corporate Precision") to **BANDA High-Velocity** (coffee / gold, "aggressive, prestigious, energetic") as specified by the rewritten `DESIGN.md`, without touching component markup.

## Decisions taken

| Question | Decision |
|---|---|
| Scope | Colour tokens only — layers 1–3 of `style.css`. Typography (Poppins), density rules, and component specs from the new `DESIGN.md` are explicitly **not** in this change. |
| Primary action colour | Follow the spec literally: **gold CTAs**. `--primary`, `--bet`, and selected-odds all become BANDA Gold. Green is demoted to win / odds-up status only. |
| Light theme | Derived from the coffee/gold ramps per the spec's prose. Both themes stay fully supported. |
| Green ramp | Retuned toward true emerald. Cooler against warm coffee, reads as status rather than brand, stops competing with gold. |

## Why this works without touching components

`style.css` contains **zero literal colours below layer 2** (verified: `grep -nE '#[0-9a-fA-F]{3,8}' app/assets/css/style.css` returns nothing after line 300). Layer 3 remaps Tailwind's stock ramps onto the project palette, so ~2,000 legacy `bg-gray-800` / `text-purple-500` / `border-amber-400` class usages resolve through layer 1 and follow the retheme for free.

Legacy class usage counts across `app/components`, `app/pages`, `app/layouts`:

| Family | Uses | Follows |
|---|---|---|
| gray / slate / zinc / neutral / stone | 1,651 | Coffee ramp |
| red | 266 | Red ramp (unchanged) |
| amber | 55 | Gold ramp |
| purple | 39 | Gold ramp (repointed) |
| blue | 24 | Tertiary gray |
| yellow | 24 | Gold ramp |

## Layer 1 — palette

Six ramps, keeping the existing `--palette-{family}-{50..950}` shape.

**Two families are renamed**, because a variable called `slate` holding brown values is a trap for the next person: `--palette-slate-*` → `--palette-coffee-*`, and `--palette-purple-*` → `--palette-gold-*`. This means updating every reference in layers 2 and 3 (a mechanical find-and-replace; layer 3 holds ~60 such lines across the `gray`/`zinc`/`neutral`/`stone`/`purple`/`violet`/`fuchsia` remap blocks). The *Tailwind-facing* names in layer 3 do not change — `--color-gray-800` still exists, it just points at `--palette-coffee-800` — so no component class breaks.

The purple → gold rename is a **merge, not a collision**: `--palette-gold-*` already exists (the old amber ramp), and the spec folds it into BANDA Gold. So the 74 former `--palette-purple-*` references and the 57 former `--palette-gold-*` references end up pointing at one ramp. Layer 1 finishes with **five** ramps instead of six — coffee, gold, green, red, tertiary.

The `green`, `red`, and `tertiary` family names are unchanged; only their values move.

### Coffee (neutral) — replaces Charcoal Slate

Built from the spec's Material-3 surface tokens.

```
--palette-coffee-50:  #fdf8f3
--palette-coffee-100: #f1dfd1   /* on-surface */
--palette-coffee-200: #dbc2ad   /* on-surface-variant */
--palette-coffee-300: #a28d7a   /* outline */
--palette-coffee-400: #544434   /* outline-variant */
--palette-coffee-500: #3d3329   /* surface-container-highest */
--palette-coffee-600: #32281f   /* surface-container-high */
--palette-coffee-700: #271e15   /* surface-container */
--palette-coffee-800: #231a11   /* surface-container-low */
--palette-coffee-900: #1a120a   /* surface / background */
--palette-coffee-950: #140d06   /* surface-container-lowest */
```

The 50 step is interpolated — the spec ships no light-theme surface, and the light theme needs a warm off-white above `#f1dfd1`.

Interpolated steps in this ramp: **50 only.** Every other step is a verbatim spec token.

### Gold (brand) — replaces Naibet Purple

```
--palette-gold-50:  #fff8ee   /* interpolated */
--palette-gold-100: #ffdcbd   /* primary-fixed */
--palette-gold-200: #ffcb9a   /* interpolated */
--palette-gold-300: #ffbc77   /* primary */
--palette-gold-400: #ffb86f   /* surface-tint / primary-fixed-dim */
--palette-gold-500: #fa9602   /* BANDA Gold — primary-container */
--palette-gold-600: #d97e00   /* interpolated */
--palette-gold-700: #8a5100   /* inverse-primary */
--palette-gold-800: #693c00   /* on-primary-fixed-variant */
--palette-gold-900: #4a2800   /* on-primary */
--palette-gold-950: #2c1600   /* on-primary-fixed */
```

Interpolated steps: **50, 200, 600.** The remaining eight are verbatim spec tokens.

### Emerald (win / up) — retuned from Action Green

Status colour only. No longer a brand or CTA colour. Retuned from the yellow-leaning `#59bb54` toward true emerald so it separates cleanly from gold against a warm ground:

```
--palette-green-300: #34d399
--palette-green-400: #10b981   /* the win / odds-up colour */
--palette-green-500: #059669
--palette-green-700: #047857
--palette-green-800: #065f46   /* light-theme text-legible variant */
```

Remaining steps interpolate along the same hue.

### Red (live / loss) — unchanged

The spec's error tokens are already this ramp's exact values: `error #ffb4ab` = `red-200`, `error-container #93000a` = `red-700`, `on-error #690005`, `on-error-container #ffdad6` = `red-100`. No edit needed. Serves both the Live badge and loss/odds-down.

### Tertiary — slate-blue becomes neutral gray

Per the spec's tertiary tokens: `#e2e2e2` (tertiary-fixed), `#c9c9c9` (tertiary), `#adaeae` (tertiary-container), `#454747` (on-tertiary-fixed-variant), `#404242` (on-tertiary-container), `#2f3131` (on-tertiary), `#1a1c1c` (on-tertiary-fixed). Intermediate steps interpolated.

### Tailwind's purple utilities are repointed, not deleted

39 legacy `*-purple-*` class usages depend on layer 3's purple/violet/fuchsia remap blocks. Those blocks stay; their right-hand sides move from `--palette-purple-*` to `--palette-gold-*`, so legacy purple classes render gold rather than breaking. Amber and yellow likewise point at gold; blue points at tertiary gray.

The old separate gold ramp is folded into BANDA Gold; the `--gold` / `--gold-bright` / `--gold-deep` / `--bronze` aliases survive for jackpot surfaces.

## Layer 2 — semantic roles

### Dark theme (`:root`, the default)

| Token | Value |
|---|---|
| `--background` | coffee-900 `#1a120a` |
| `--foreground` | coffee-100 `#f1dfd1` |
| `--card`, `--surface-elevated` | coffee-800 `#231a11` |
| `--popover` | coffee-700 `#271e15` |
| `--primary` | gold-500 `#fa9602` |
| `--primary-foreground` | gold-900 `#4a2800` (spec `on-primary`) |
| `--secondary` | `#edbca6` (spec secondary) |
| `--secondary-foreground` | `#47291a` (spec `on-secondary`) |
| `--tertiary` | tertiary gray |
| `--muted` | coffee-700 |
| `--muted-foreground` | coffee-300 `#a28d7a` |
| `--accent` | coffee-600 `#32281f` — gold-tinted interactive surface |
| `--destructive` | red-200 `#ffb4ab` |
| `--success`, `--emerald` | green-400 `#10b981` |
| `--warning` | gold-400 |
| `--border` | coffee-400 `#544434` (spec `outline-variant`) |
| `--input` | coffee-800 |
| `--ring` | gold-500 |

### Bet / CTA roles — the flip

```
--bet:            gold-500 #fa9602
--bet-foreground: gold-900 #4a2800
--bet-hover:      gold-400
--bet-bright:     gold-300
--bet-deep:       gold-700
```

Place Bet, Join Now, and the betslip orb all move from green to gold. Selected odds cells likewise, matching the spec's Market Cells section — but note those cells use `--primary`/`--primary-foreground`, not `--brand-selected`. Despite its name `--brand-selected` is a brand *button* fill: seven of its nine consumers put near-white text on it, so it is gold-800 (8.86:1), not gold-500 (2.11:1).

### Surface ladder

```
--surface-deepest:     coffee-950 #140d06
--surface-sunken:      coffee-900 #1a120a
--surface-elevated:    coffee-800 #231a11
--surface-interactive: coffee-600 #32281f
--surface-active:      coffee-500 #3d3329
```

### Brand aliases

`--brand-bright` → gold-500, `--brand-mid` → gold-600, `--brand-selected` → gold-800 (dark: it carries near-white text — see above), `--brand-dark` → gold-800, `--brand-forest` → coffee-950, `--brand-teal` → coffee-700.

### Elevation

Umbra stays black (`--elevation-umbra: 0 0 0`) in dark; the light theme's slate umbra `15 23 42` becomes a coffee umbra `45 19 6` so shadows sit in-family. Alphas unchanged.

### Light theme (`[data-theme="light"]`)

Derived, since the spec ships no light tokens.

| Token | Value |
|---|---|
| `--background` | `#faf7f4` warm off-white |
| `--foreground` | coffee-900 `#1a120a` |
| `--card`, `--surface-elevated` | `#ffffff` |
| `--primary` | gold-700 `#8a5100` |
| `--primary-foreground` | `#ffffff` |
| `--bet` | gold-500 fill, `--bet-foreground` gold-900 text |
| `--bet-hover` | gold-600 (deepens rather than lifts) |
| `--success` | green-800 `#065f46` |
| `--warning`, `--gold` | gold-700 |
| `--destructive` | red-600 |
| `--border` | coffee-200 `#dbc2ad` |
| `--muted` | `#f3ede7` |
| `--muted-foreground` | coffee-400 `#544434` |

### Contrast rules — the risky part of a gold system

`#fa9602` on white is **2.23:1** and is never used as light-mode text. Measured ratios (WCAG 2.1 relative luminance):

| Pair | Ratio | Verdict |
|---|---|---|
| gold-500 on white | 2.23 | **banned** as text |
| gold-700 `#8a5100` on white | 6.45 | AA all sizes |
| gold-500 fill + gold-900 `#4a2800` text | 5.91 | AA all sizes |
| gold-300 `#ffbc77` on coffee-900 | 11.20 | AAA |
| coffee-100 on coffee-900 (body text) | 14.29 | AAA |
| coffee-300 `#a28d7a` muted on coffee-800 card | 5.40 | AA all sizes |
| emerald-400 on coffee-900 | 7.30 | AAA |
| red-200 on coffee-900 | 10.90 | AAA |
| emerald-800 on white | 7.68 | AAA |
| secondary `#edbca6` + on-secondary `#47291a` | 7.72 | AAA |

The rules that follow:

- **Light theme:** gold-700 for all text, links and borders. gold-500 appears only as a *fill* carrying gold-900 text.
- **Dark theme:** gold-300 for text on coffee. gold-500 fills carry gold-900 text.
- **CTA fill in both themes:** gold-500 background + gold-900 text, so the money buttons never shift hue between themes and never drop below 5.9:1.

`--border` coffee-400 on coffee-900 is 1.99:1 — that is intentional and correct for a hairline (WCAG's 3:1 non-text minimum applies to meaningful UI boundaries, not decorative dividers); the spec's Level 1 elevation is explicitly "a 1px inner stroke, low opacity."

## Out of scope — known residue

Five component files carry off-token hex literals that will not follow the retheme:

| File | Literal | Effect |
|---|---|---|
| `app/components/ThePopular.vue:176` | `#504b5c` | Purple-gray border, will visibly clash with coffee |
| `app/components/promos/ui/PromoStat.vue:44` | `#c08442` | Hardcoded tan background |
| `app/components/DarkBorderDivider.vue:13-14` | `#09070d` / `#E5E7EB` | Off-system divider in both themes |
| `app/components/promos/ui/PromoCta.vue:29` | `#eafbef` | Green-tinted text on a now-gold CTA |
| `app/components/HotSection.vue:910` | `#4a4e51` | SVG fill |

Sixteen further files hold hexes, all SVG icon and logo fills, which are intentionally left alone.

These are flagged, not fixed — folding them in means touching component markup, which this spec excludes. `ThePopular.vue` and `PromoCta.vue` are the two most likely to look wrong post-retheme.

## Verification

1. `pnpm build` completes clean.
2. `pnpm dev`, then visually check home, a sports league page, the betslip, and casino — in **both** themes.
3. Confirm the CTA flip landed: Place Bet, Join Now and the betslip orb are gold with dark-coffee text.
4. Confirm no purple survives anywhere in the running UI (the repointed ramp is the check — any purple left is a hardcoded literal).
5. Spot-check contrast on the gold CTA and on light-theme gold text against the ratios above.

## Follow-on work (not this change)

Typography (Poppins, the six type roles) and the high-density layout rules (8px gutters, 8px/4px cell padding, 32px table rows) from the new `DESIGN.md` remain unimplemented. `CLAUDE.md`'s Design System section still describes Naibet Core and will need updating once the visual change lands.
