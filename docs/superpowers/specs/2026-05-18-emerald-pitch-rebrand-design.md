# Emerald Pitch — Brand Color Re-theme

**Date:** 2026-05-18
**Status:** Design approved, pending spec review
**Scope:** Color only. No layout, typography, spacing, or component-structure changes.

## 1. Goal

Replace the current "Deep Navy + Green + White" theme with a new green-led brand
palette — **"Emerald Pitch"** — across both the dark (default) and light themes,
applying a disciplined 60:30:10 distribution, and converting hardcoded colors
throughout the codebase to semantic tokens so future re-themes are a one-file edit.

## 2. Approach — B: Semantic re-tokenization (approved)

Two strategies were considered:

- **A — Mechanical color swap:** replace each hardcoded color with a new
  hardcoded color. Fast, but leaves the app un-themeable; the next rebrand
  repeats the same work.
- **B — Semantic re-tokenization (chosen):** change the central CSS variable
  values in `src/style.css`, then convert hardcoded colors in components to the
  semantic token/utility they should have used (`bg-[#0b1120]` →
  `bg-surface-sunken`, raw green → `text-primary`, gold → amber token). Re-themes
  the app **and** makes the next theme change a single-file edit.

The existing token architecture in `src/style.css` (`@theme inline` + `:root` /
`[data-theme="light"]` CSS variables, 5 surface levels, 6 brand steps) is kept
**as-is structurally**. Only the *values* change, plus new light-theme overrides
for tokens that currently inherit from `:root` (gold/emerald/success/warning).

## 3. The palette

Anchor colors (user-approved):

| Anchor            | Hex       | Role                                    |
|-------------------|-----------|-----------------------------------------|
| Forest-charcoal   | `#0E1411` | Dark background (the 60%)               |
| Slate-green       | `#1C2620` | Dark surfaces / cards (the 30%)         |
| Emerald           | `#21C063` | Brand accent / primary (the 10%)        |
| Warm off-white    | `#EAEFE8` | Dark-theme ink (text)                   |
| Amber             | `#FFB22C` | Live / odds-boost / VIP / premium       |
| Red               | `#F0524D` | Loss / error / destructive              |
| Win green         | `#2FD673` | Bet won / positive / payout             |
| Deep green        | `#138A4B` | Light-theme primary                     |

**60:30:10 discipline:** emerald is the only *decorative* hot color, so it is
structurally limited to ~10% (CTAs, selected odds, active nav, brand). Amber and
red are *functional status only* (used <2%, like an error red is) and therefore
do not break the rule.

Intermediate ramp steps are derived within the same hue families. Values are
expressed as **hex** in `src/style.css` (valid in CSS / Tailwind v4; the file
already mixes `oklch`/`hsl`/hex). Hex is chosen over `oklch` to match the
approved swatches exactly and avoid conversion drift.

## 4. Token mapping — DARK theme (`:root`)

| Variable | Old (navy/green) | New (Emerald Pitch) |
|---|---|---|
| `--background` | navy-900 | `#0E1411` |
| `--foreground` | white | `#EAEFE8` |
| `--card` | navy-800 | `#1C2620` |
| `--card-foreground` | white | `#EAEFE8` |
| `--popover` | navy-800 | `#1C2620` |
| `--popover-foreground` | white | `#EAEFE8` |
| `--primary` | green-500 | `#21C063` |
| `--primary-foreground` | green-950 | `#06210F` |
| `--secondary` | green-500 | `#178A4B` |
| `--secondary-foreground` | dark green | `#EAEFE8` |
| `--muted` | navy-700 | `#1C2620` |
| `--muted-foreground` | navy-400 | `#8B998E` |
| `--accent` | green-500 | `#21C063` |
| `--accent-foreground` | green-950 | `#06210F` |
| `--destructive` | red-400 | `#F0524D` |
| `--destructive-foreground` | white | `#FFF5F4` |
| `--border` | navy-800 | `#243029` |
| `--input` | navy-800 | `#1C2620` |
| `--ring` | green-400 | `#21C063` |
| `--radius` | 0.75rem | **unchanged** |
| `--gold` | hsl gold | `#FFB22C` |
| `--gold-foreground` | navy-950 | `#2A1A00` |
| `--emerald` | green-400 | `#2FD673` |
| `--dark-card` | navy-800 | `#1C2620` |
| `--success` | green-400 | `#2FD673` |
| `--warning` | yellow-400 | `#FFB22C` |
| `--surface-deepest` | navy-950 | `#0A0F0C` |
| `--surface-sunken` | navy-900 | `#0E1411` |
| `--surface-elevated` | navy-800 | `#1C2620` |
| `--surface-interactive` | navy-700 | `#243029` |
| `--surface-active` | navy-600 | `#2E3C32` |
| `--brand-bright` | green-500 | `#21C063` |
| `--brand-dark` | green-800 | `#137A40` |
| `--brand-selected` | green-600 | `#1C9E52` |
| `--brand-mid` | green-500 | `#21C063` |
| `--brand-forest` | green-900 | `#0E5A30` |
| `--brand-teal` | green-700 | `#178A4B` |
| `--gold-bright` | hsl 41 100% 50% | `#FFC04D` |
| `--gold-deep` | hsl 51 100% 50% | `#E0860A` |
| `--gold-muted` | hsl 40 80% 55% | `#D99A3A` |
| `--bronze` | hsl 30 59% 51% | `#B97A3C` |
| `--border-subtle` | navy-800 | `#1C2620` |
| `--border-strong` | navy-700 | `#2E3C32` |
| `--border-darkest` | navy-950 | `#0A0F0C` |
| `--text-muted-alt` | navy-500 | `#6E7C72` |
| `--text-subtle` | navy-300 | `#B7C2B8` |

## 5. Token mapping — LIGHT theme (`[data-theme="light"]`)

| Variable | New (Emerald Pitch light) |
|---|---|
| `--background` | `#F3F5EF` |
| `--foreground` | `#15211B` |
| `--card` | `#FFFFFF` |
| `--card-foreground` | `#15211B` |
| `--popover` | `#FFFFFF` |
| `--popover-foreground` | `#15211B` |
| `--primary` | `#138A4B` |
| `--primary-foreground` | `#FFFFFF` |
| `--secondary` | `#0E5A30` |
| `--secondary-foreground` | `#FFFFFF` |
| `--muted` | `#EBEFE4` |
| `--muted-foreground` | `#5E6B61` |
| `--accent` | `#138A4B` |
| `--accent-foreground` | `#FFFFFF` |
| `--destructive` | `#C8403B` |
| `--destructive-foreground` | `#FFFFFF` |
| `--border` | `#DDE3D3` |
| `--input` | `#EBEFE4` |
| `--ring` | `#138A4B` |
| `--dark-card` | `#EBEFE4` |
| `--gold` *(new override)* | `#E0860A` |
| `--gold-foreground` *(new override)* | `#FFFFFF` |
| `--emerald` *(new override)* | `#0E7A40` |
| `--success` *(new override)* | `#0E7A40` |
| `--warning` *(new override)* | `#E0860A` |
| `--surface-deepest` | `#DDE3D3` |
| `--surface-sunken` | `#EBEFE4` |
| `--surface-elevated` | `#FFFFFF` |
| `--surface-interactive` | `#E2E7DA` |
| `--surface-active` | `#D5DCC9` |
| `--brand-bright` | `#138A4B` |
| `--brand-dark` | `#0B4426` |
| `--brand-selected` | `#117A42` |
| `--brand-mid` | `#138A4B` |
| `--brand-forest` | `#0B4426` |
| `--brand-teal` | `#0F6B3A` |
| `--gold-bright` | `#E0860A` |
| `--gold-deep` | `#B96A06` |
| `--gold-muted` | `#C98A2E` |
| `--bronze` | `#9A6330` |
| `--border-subtle` | `#E2E7DA` |
| `--border-strong` | `#C7D0BC` |
| `--border-darkest` | `#AFBAA3` |
| `--text-muted-alt` | `#5E6B61` |
| `--text-subtle` | `#2D3A30` |

`@theme inline` (the `--color-*` → `var(--*)` mapping) is **unchanged** — it
already exposes every token as a Tailwind utility.

## 6. Gold → amber retirement

The gold/bronze identity is retired; everything premium becomes amber.

- `--gold*`, `--bronze` repoint to the amber ramp (table above) so dependent
  code keeps working during the sweep.
- Utilities in `src/style.css` re-pointed to amber: `text-gradient-gold`,
  `bg-gradient-gold`, `shadow-glow-gold`, `border-glow` (gold half),
  light-theme `shadow-glow-gold`.
- Component-level gold usage (VIP, jackpot, bonus, premium badges) is converted
  in the sweep to the `--gold`/`--warning` tokens (now amber).

## 7. `src/style.css` utility / keyframe / widget updates

| Block | Change |
|---|---|
| `@layer base` border fallback | `var(--color-gray-200, currentcolor)` → `var(--border)` |
| `shadow-premium` / `-hover` | navy `oklch` tints → neutral dark `rgb(0 0 0 / …)` / green-black |
| `text-gradient-gold` | gold hsl → `#FFB22C` → `#FFC04D` |
| `text-gradient-emerald` | old green oklch → `#21C063` → `#2FD673` |
| `bg-gradient-gold` | gold hsl → `#FFB22C` → `#E0860A` |
| `bg-gradient-emerald` | old green oklch → `#21C063` → `#1C9E52` |
| `bg-gradient-card` | navy oklch → `var(--surface-elevated)` → `var(--surface-sunken)` |
| `shadow-glow-green` | green oklch → emerald `rgb(33 192 99 / .3)` |
| `shadow-glow-gold` | gold hsl → amber |
| `highlight` keyframe | green oklch → emerald |
| `border-glow` keyframe | green oklch + gold hsl → emerald + amber |
| `[data-theme=light]` `bg-gradient-card` / glow / `glass-card` | navy/green/gold oklch → new tokens |
| `glass-card` dark/light | navy oklch → `var(--surface-elevated)` / token |
| `.dp__theme_dark` (datepicker) | `#0b1120`→`#0E1411`, text `#fff`→`#EAEFE8`, hover `#1a2744`→`#243029`, primary/success/marker `#f97316`→`#21C063`, highlight orange→emerald @20%, border `#1e2d4a`→`#243029`, danger `#e53935`→`#F0524D`, scrollbar/menu → surface tokens |
| `.colored-toast` (SweetAlert) | `error #fca5a5`, `warning hsl(0 70% 50%)`, `info #3fc3ee`, `question #87adbd` → derive from `--destructive` / `--warning` / `--card` tokens |
| `--swiper-pagination-bullet-inactive-color` | `#000` → `var(--muted-foreground)` |
| `pulse-animation` keyframe | white pulse — **kept** (theme-neutral) |

## 8. Component sweep methodology (Approach B)

Applies to the **~100–130 brand-color files** outside `src/style.css`. (A
file-scan during planning corrected the earlier ~50–70 estimate: 73 strict
old-brand-signature files + 31 arbitrary-hex files + dozens of one-off brand
hex literals. The broad "any color literal" set is ~346 files but is mostly
incidental neutrals/assets — explicitly **not** in scope; see §9.)

1. **Detect** in `src/` (excluding all of `src/style.css` — the sanctioned
   token source — and `src/assets/`):
   - `oklch(`, `hsl(`, `rgb(`, hex (`#xxx`/`#xxxxxx`)
   - Tailwind arbitrary values: `[#…]`, `bg-[…]`, `text-[…]`, `border-[…]`
   - Legacy named utilities used as brand: `navy-*`, `emerald-*`,
     `green-{50..950}`, brand-ish `slate-*`/`gray-*`
2. **Classify by role and replace with the semantic token utility:**
   - dark navy backgrounds → `bg-background` / `bg-card` / `bg-surface-*`
   - brand greens → `text-primary` / `bg-primary` / `brand-*` utilities
   - gold/yellow → `--gold` / `--warning` (amber) utilities
   - body/secondary text → `text-foreground` / `text-muted-foreground` /
     `text-subtle`
   - borders → `border` / `border-subtle` / `border-strong`
   - status → `text-destructive` / `--success` / `--warning`
3. **No matching token?** Add a new semantic token in `src/style.css` rather
   than reintroduce a one-off hex (preserve single source of truth).
4. **Dynamic/JS color literals** (inline `:style` bindings, chart configs):
   bind to a CSS variable instead of a literal.
5. **Third-party widget colors** are centralized in `src/style.css` overrides
   (section 7), not scattered in components.

The section 4–7 tables are the contract: each file edit is independent and
mechanically reviewable against them.

## 9. Verification

- `pnpm run build` succeeds; `npx eslint src/` clean.
- **Grep guard (brand-signature = 0):** after the sweep, re-run the
  *brand-signature* patterns over `src/` (excluding all of `src/style.css` and
  `src/assets/`) — expect **0** matches:
  - `oklch(... 25[0-9]|26[0-9])` (old navy hues) and `oklch(... 14[0-2])`
    (old brand-green hue)
  - old datepicker hex: `#0b1120`, `#1a2744`, `#1e2d4a`, `#f97316`
  - Tailwind brand utilities: `(bg|text|border|from|to|via|ring|fill|stroke)-(navy|emerald)-`,
    `(bg|text|border|from|to|via|ring)-green-[0-9]`
  - any arbitrary hex: `\[#[0-9a-fA-F]{3,8}\]`
  - **Explicitly allowed (not brand, out of scope):** pure neutrals
    `#fff(fff)?`/`#000(000)?`/`white`/`black`, `rgba?(0[, ]...)` shadows/overlays,
    SVG/flag/icon literal fills, vendored third-party CSS. These remain and do
    not fail the gate.
- **Contrast (WCAG AA — 4.5:1 text, 3:1 UI):** verify these pairs in both
  themes — foreground/background, muted-foreground/background,
  primary-foreground/primary, destructive-foreground/destructive,
  gold-foreground/gold, text-subtle/card, selected-odds text/fill.
- **Visual QA matrix (dark + light):** home, sports list, live, betslip,
  casino home, auth modal, bonus/VIP, account, datepicker popover, toasts,
  any betting iframes.

## 10. Out of scope / unchanged

- Semantic red is **retained** (betting requires clear loss/error states).
- `--radius`, spacing, typography, fonts, animations' timing/structure.
- No layout, routing, or component-structure changes — **color only**.
- Marketing/SEO images, favicons, and raster assets (flagged if any contain
  the old brand color, but not edited in this pass).

## 11. Risks & mitigations

| Risk | Mitigation |
|---|---|
| Contrast regressions on derived ramp steps | WCAG-AA check matrix (§9); tune ramp values, not architecture |
| Third-party widgets ignore tokens (Swiper, datepicker, SweetAlert, betting iframes) | Targeted overrides centralized in `src/style.css` (§7); iframes flagged if not themable |
| Large review surface (~100–130 files) | Section 4–7 mapping tables make each edit mechanical; sweep batched by feature area with a working app after each; brand-signature grep guard proves completeness |
| Hidden hardcoded colors in JS/inline bindings | Detection patterns (§8) include `rgb(`/`hsl(`/hex and `:style`; bind to CSS vars |
| Gold-dependent components visually regress | Gold tokens repointed to amber first (keeps app working), then swept |

## 12. Implementation order (for the plan)

1. `src/style.css` — dark `:root` token values (§4).
2. `src/style.css` — light overrides incl. new gold/emerald/success/warning (§5).
3. `src/style.css` — utilities, keyframes, datepicker, toast, swiper (§6–7).
4. Component sweep by area, high-traffic first: nav/layout → home → sports →
   live → betslip → casino → auth → bonus/VIP → account → remaining (§8).
5. Verification pass (§9): build, eslint, grep guard, contrast, visual QA.
