# BANDA Discipline — Design-System Refinement

**Date:** 2026-08-05
**Branch:** `design/banda-discipline` (created from `main` after the betslip-orb work is committed)
**Status:** Approved for implementation planning

## Goal

Tighten the BANDA design system so it reads as a professional betting terminal
rather than a generic dark gaming site. The system's four-layer architecture
(palette → semantics → Tailwind bindings → utilities) in
`app/assets/css/style.css` stays. What changes: a canonical semantic
vocabulary with legacy aliases fenced off as deprecated, a new sportsbook
domain-token layer (odds states, live), a full purge of the purple family,
typography documentation brought in line with reality, and gradient/glass/
animation usage cut back to the contexts that earn them.

This implements priority tiers 1–7 of the 2026-08-05 design critique, plus a
complete purple purge (the critique's item 9 extended to class usage and the
Tailwind remap, at the user's request).

## Pre-step

Commit the in-progress betslip-orb work (`app/assets/css/style.css` +
`app/components/mobile/MobileFooterV2.vue` — the green `--betslip-*` family)
to `main` as its own commit, then branch. The new work builds on those tokens.

## 1. Token architecture (`app/assets/css/style.css`, both themes)

Every change below is made in both the `:root` (dark) and
`[data-theme="light"]` semantic blocks, and exposed through `@theme inline`
where a Tailwind utility is warranted.

### Text hierarchy

Add four canonical text tokens mapped onto the coffee ramp:

| Token | Dark | Light |
|---|---|---|
| `--text-primary` | coffee-100 | coffee-900 |
| `--text-secondary` | coffee-200 | coffee-700 |
| `--text-tertiary` | coffee-300 | coffee-500 |
| `--text-disabled` | coffee-500 | coffee-400 |

`--foreground` and `--muted-foreground` stay as-is (Tailwind bindings and
existing component usage depend on them). `--text-muted-alt` and
`--text-subtle` move to the deprecated block, aliased to the nearest new
token (`--text-tertiary` and `--text-secondary` respectively) so rendering
is unchanged.

### Surfaces

Add `--surface-0` … `--surface-4` as the canonical interaction-oriented
hierarchy, mapped onto the existing tonal tokens:

| New | Meaning | Existing token it maps to |
|---|---|---|
| `--surface-0` | Page background | `--surface-deepest` |
| `--surface-1` | Main containers | `--surface-sunken` |
| `--surface-2` | Cards / panels | `--card` |
| `--surface-3` | Interactive controls | `--surface-interactive` |
| `--surface-4` | Selected / focused controls | `--surface-active` |

The old names (`--surface-deepest`, `--surface-sunken`,
`--surface-elevated`, `--surface-interactive`, `--surface-active`) become
aliases of the numbered tokens (declaration order flips so the numbered
tokens are canonical) and are listed in the deprecated block. No visual
change.

### Action tokens

Add `--primary-hover` and `--primary-active` (gold ramp steps consistent
with the existing `--bet-hover` behaviour per theme). The `--bet-*` family
stays canonical — it is the conversion-CTA vocabulary (Place Bet, Deposit,
Join, selected odds) and only 4 files use it.

### Deprecated alias block

One fenced section per theme block, clearly commented
`/* DEPRECATED — do not use in new code. Kept so existing components render
unchanged; each points at its canonical replacement. */` containing:

- `--brand-bright`, `--brand-dark`, `--brand-selected`, `--brand-mid`,
  `--brand-forest`, `--brand-teal`
- `--gold-bright`, `--gold-deep`, `--gold-muted`, `--bronze`
- `--text-muted-alt`, `--text-subtle`
- the old surface names listed above

Values are unchanged (aliased to canonical tokens where a canonical
equivalent exists, otherwise left pointing at their current palette step).
The ~149 component files referencing these keep rendering identically.
Migrating those files is explicitly a future PR, not this branch.

### Intent tokens

For success / warning / danger, add surface/border/text triplets built with
`color-mix` (the pattern the file already uses):

```
--success-surface  --success-border  --success-text
--warning-surface  --warning-border  --warning-text
--danger-surface   --danger-border   --danger-text
```

Backed by the existing emerald / gold-amber / signal-red semantic tokens.
Components rendering bet-won banners, bonus callouts, and failed-deposit
notices stop inventing their own tints.

### Domain tokens (the sportsbook layer)

New section between semantics and bindings:

```
--odds-bg            --odds-fg             /* neutral cell: surface-2 / text-primary */
--odds-hover-bg                            /* surface-3 */
--odds-selected-bg   --odds-selected-fg    /* --bet / --bet-foreground */
--odds-up            --odds-down           /* emerald / signal red */
--odds-suspended-bg  --odds-suspended-fg   /* surface-1 / text-disabled */
--live               --live-bg             /* signal red; bg/border are   */
--live-border                              /* 12% / 35% color-mix tints  */
```

Exposed via `@theme inline` (`bg-odds-selected`, `text-odds-up`,
`bg-live-bg`, …). Odds-cell components that currently hard-code gold/green
utility classes are rewired onto these tokens — **odds cells and the live
badge only**; no broader component sweep. Odds-change feedback stays the
existing `highlight` flash (brief green/red, then return to neutral), now
driven by `--odds-up` / `--odds-down`.

## 2. Purple purge

1. Replace every `purple-*`, `violet-*`, `indigo-*`, `fuchsia-*` utility
   class in components and composables (~17 components + 2 composables,
   ~50 occurrences; largest: `ShareKrisii.vue`, `AviatorContent.vue`,
   `FreebetContent.vue`) with the semantic or gold-palette class it
   currently resolves to. Visual no-op by construction: each remapped step
   has a known gold target (e.g. `purple-500` → gold-650 → use `primary`
   or the matching gold class in context).
2. Delete the purple, violet, indigo, and fuchsia remap blocks from
   `@theme` / `@theme inline` (~44 lines) and their explanatory comments.
3. Fix the `/* Active list item — 4px left-accent bar in Primary Purple */`
   comment (line ~888) to say Gold.
4. `--palette-gold-650` exists only for luminance parity with the old
   purple-500. After the purge, if nothing references it outside the
   deleted remap blocks, delete it; if the class replacements in step 1
   need it (to stay a visual no-op), keep it with an updated comment.
5. Gray, amber, and blue remaps **stay** — removing them is part of the
   future 149-file migration, not this branch.

Acceptance: `grep -rE "(purple|violet|indigo|fuchsia)" app/` returns zero
styling references (allowing incidental matches in unrelated strings, if
any, which must be individually justified).

## 3. Typography — Option B (Inter + Montserrat)

1. Update `DESIGN.md`: replace the Poppins typography section with the
   implemented system — Montserrat (`--font-display`) for headings and
   promotional display, Inter (`--font-sans`) for UI, tables, odds, and
   body. The doc and CSS must agree.
2. Add `--font-odds`: Inter first, then a mono fallback stack
   (`ui-monospace, SFMono-Regular, Menlo, monospace`), with a `font-odds`
   utility that also sets `font-variant-numeric: tabular-nums`.
3. Apply `font-odds` in the odds-cell components (same files as the domain
   token rewiring) and the stake/balance amount displays in the betslip.
   No font files change; no new font loads.

## 4. Gradient and glass reduction

Utilities stay defined; usage is policed.

**Gradients** (~9 files using `bg-gradient-gold/emerald/primary/card`,
`text-gradient-*`): allowed on hero banners, promotional cards, and
jackpot/celebration surfaces. Removed from buttons, tabs, navigation,
forms, and data/odds surfaces — replaced with flat semantic tokens
(`--bet` for CTAs, surface tokens elsewhere). Each of the 9 files is
classified during planning; promo-strip and hero components are expected
keeps.

**Glass** (`premium-glass`, `.glass-card`; 4 files): allowed on the
floating betslip, bottom navigation, and modal/hero overlays. Removed from
ordinary cards and functional surfaces, replaced with the tonal
surface + hairline-border pattern (elevation level 1).

## 5. Animation trim

Delete keyframes verified to have zero usages outside `style.css`:
`bounceInRight`, `zoomIn`, `backInLeft`, `backInRight`, `float-slow`,
`float-slow-reverse`, `progress-fill`, `pulse-animation` — plus any
utilities/classes that exist only to invoke them.

Keep (in active use): `highlight` (odds flash, 14 files), `shimmer`
(3 files), `glow-pulse` (1), `border-glow` (1).

Add a short comment block above the keyframes documenting the duration
tiers: micro-interaction 120–180 ms, component transition 180–240 ms,
data/status 300–600 ms, celebration 600–1200 ms. No new animation tokens.

## Out of scope

- Migrating the ~149 files off deprecated aliases (future PR)
- Removing the gray / amber / blue Tailwind remaps
- Component-layer tokens (button/market/odds-cell component tokens — the
  critique's "04 COMPONENT" group)
- Poppins (rejected in favour of Option B)
- Button sizing / density changes (critique item 13)
- Deposit-screen redesign (critique item 14)

## Verification

- `pnpm build` succeeds.
- Purge grep (above) is clean.
- Dev-server spot-check in both themes: home, a sports league page with
  odds cells (select/deselect, odds-change flash), deposit, betslip, and
  the mobile bottom nav (betslip orb, glass).
- No visual regression expected anywhere except the deliberate gradient
  and glass removals; alias and remap replacements are colour-identical by
  construction.
