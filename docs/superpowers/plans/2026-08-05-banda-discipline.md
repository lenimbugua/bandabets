# BANDA Discipline Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Tighten the BANDA design system — canonical semantic tokens with a deprecated fence, a sportsbook domain-token layer (odds/live/intent), a complete purple-family purge, honest typography docs, and gradient/glass/animation discipline.

**Architecture:** All token work happens inside the four-layer system in `app/assets/css/style.css` (palette → semantics → bindings → utilities); component sweeps are mechanical class replacements chosen to be colour-identical by construction, except the deliberate odds/CTA changes each task calls out. Spec: `docs/superpowers/specs/2026-08-05-banda-discipline-design.md`.

**Tech Stack:** Nuxt 4 (Vue 3, `<script setup>`, JS only), Tailwind CSS 4 (CSS-first config), pnpm.

## Global Constraints

- Branch: `design/banda-discipline` (already created; verify with `git branch --show-current` before starting).
- JavaScript only — no TypeScript anywhere.
- No literal colour value below Layer 2 of `app/assets/css/style.css` (hex/oklch allowed only in the palette block and the pre-existing light-theme semantic literals).
- The dark theme block is `:root` (starting line ~147) and the light theme block is `[data-theme="light"]` — every semantic token change is made in BOTH blocks.
- No test framework exists. Verification for every task = `pnpm build` succeeds (exit 0) plus the task's grep checks.
- Deprecated aliases must keep their current resolved values exactly — rendering of untouched components must not change.
- Every commit message ends with: `Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>`
- Line numbers in this plan were taken at branch creation (commit `e583126`); earlier tasks shift later line numbers — always match on the quoted strings, not the line number.

---

### Task 1: Canonical text/surface/action tokens + deprecated fence

**Files:**
- Modify: `app/assets/css/style.css` (Layer 2 both theme blocks; Layer 3 `@theme inline`)

**Interfaces:**
- Produces: CSS vars `--text-primary/-secondary/-tertiary/-disabled`, `--surface-0`…`--surface-4`, `--primary-hover`, `--primary-active`; Tailwind utilities `bg-surface-0`…`bg-surface-4`, `text-text-primary` etc., `bg-primary-hover`. Task 2's `--odds-*` tokens reference `--surface-1/2/3`, `--text-primary`, `--text-disabled`.

- [ ] **Step 1: Add canonical tokens to the dark block**

In the `:root` semantics block, insert immediately after the `--betslip-label` line (end of the Betslip orb group):

```css

  /* Text hierarchy — the four canonical text levels. The spec's table used
     coffee-500/400 for disabled, but those are near-black surface fills;
     the ramp's real mid-tones (450/550/650) carry text, per the layer-1
     comments. */
  --text-primary: var(--palette-coffee-100);
  --text-secondary: var(--palette-coffee-200);
  --text-tertiary: var(--palette-coffee-300);
  --text-disabled: var(--palette-coffee-650);
```

Then REPLACE the existing `/* Surfaces — tonal layers, deepest to most-raised */` group (the five `--surface-*` lines) with:

```css
  /* Surfaces — interaction-oriented hierarchy: page → container → card →
     interactive control → selected control */
  --surface-0: var(--palette-coffee-950);
  --surface-1: var(--palette-coffee-900);
  --surface-2: var(--palette-coffee-800);
  --surface-3: var(--palette-coffee-600);
  --surface-4: var(--palette-coffee-500);
```

Then insert after the `--primary-foreground` line:

```css
  --primary-hover: var(--palette-gold-400);
  --primary-active: var(--palette-gold-600);
```

- [ ] **Step 2: Build the deprecated fence in the dark block**

Replace the existing `/* Brand ramp aliases */` + `/* Gold aliases */` groups (from `--brand-bright` through `--bronze`) and the `/* Text */` group (`--text-muted-alt`, `--text-subtle`) with one fenced section placed where the brand aliases were:

```css
  /* ────────────────────────────────────────────────────────────────────
     DEPRECATED — do not use in new code. Kept only so existing
     components keep rendering identically; each points at its canonical
     replacement. Migrating the ~149 consumer files off these is a
     future PR.
     ──────────────────────────────────────────────────────────────────── */
  --surface-deepest: var(--surface-0);
  --surface-sunken: var(--surface-1);
  --surface-elevated: var(--surface-2);
  --surface-interactive: var(--surface-3);
  --surface-active: var(--surface-4);

  --brand-bright: var(--primary);              /* → primary */
  --brand-dark: var(--palette-gold-800);       /* → gold ramp via amber-800 */
  /* Not the selected-odds token despite the name — real selected odds use
     bg-primary/text-primary-foreground. Its nine consumers are brand
     buttons, seven of which put near-white text on it, so it must stay
     dark: gold-500 would be 2.11:1, gold-800 is 8.86:1. */
  --brand-selected: var(--palette-gold-800);
  --brand-mid: var(--palette-gold-600);
  --brand-forest: var(--surface-0);            /* → surface-0 */
  --brand-teal: var(--palette-coffee-700);

  --gold-bright: var(--bet-bright);            /* → bet-bright */
  --gold-deep: var(--bet-deep);                /* → bet-deep */
  --gold-muted: var(--bet-hover);              /* → bet-hover */
  --bronze: var(--palette-gold-800);

  --text-muted-alt: var(--text-tertiary);      /* → text-tertiary */
  --text-subtle: var(--text-secondary);        /* → text-secondary */
```

The alias-to-token redirections above are value-identical in the dark theme (`--brand-bright` = gold-500 = `--primary`; `--gold-bright` = gold-300 = `--bet-bright`; `--gold-deep` = gold-700 = `--bet-deep`; `--gold-muted` = gold-400 = `--bet-hover`; `--text-muted-alt` = coffee-300 = `--text-tertiary`; `--text-subtle` = coffee-200 = `--text-secondary`). Do not "simplify" further.

- [ ] **Step 3: Mirror in the light block**

In `[data-theme="light"]`, insert after `--betslip-label`:

```css

  /* Text hierarchy — mid-tone steps; see the dark block note */
  --text-primary: var(--palette-coffee-900);
  --text-secondary: var(--palette-coffee-650);
  --text-tertiary: var(--palette-coffee-550);
  --text-disabled: var(--palette-coffee-450);
```

Insert after light `--primary-foreground`:

```css
  --primary-hover: var(--palette-gold-800);
  --primary-active: var(--palette-gold-900);
```

Replace the light surface group with:

```css
  --surface-0: #e8ddd2;
  --surface-1: #f3ede7;
  --surface-2: var(--palette-white);
  --surface-3: #f3ede7;
  --surface-4: #e8ddd2;
```

Replace the light brand/gold alias groups and text group with the fence (same banner comment as dark), with these values — NOTE the light values differ from dark and several CANNOT alias to canonical tokens without changing rendering, so they keep direct palette refs:

```css
  --surface-deepest: var(--surface-0);
  --surface-sunken: var(--surface-1);
  --surface-elevated: var(--surface-2);
  --surface-interactive: var(--surface-3);
  --surface-active: var(--surface-4);

  --brand-bright: var(--primary);              /* gold-700 in light = primary */
  --brand-dark: var(--palette-gold-900);
  --brand-selected: var(--palette-gold-800);
  --brand-mid: var(--palette-gold-700);
  --brand-forest: var(--palette-coffee-950);
  --brand-teal: var(--palette-coffee-700);

  /* gold-700, not gold-600: `text-gold-bright` is inline emphasis text in 61
     places and gold-600 is only 2.84:1 on the light background. gold-700 is
     6.04:1. Light theme uses gold-700 for anything that carries text. */
  --gold-bright: var(--palette-gold-700);
  --gold-deep: var(--palette-gold-800);
  --gold-muted: var(--palette-gold-700);
  --bronze: var(--palette-gold-800);

  /* Rendering-identical values, so these stay palette refs (the canonical
     text tokens land on different steps in light) */
  --text-muted-alt: var(--palette-coffee-400);
  --text-subtle: var(--palette-coffee-500);
```

Note `--brand-forest` stays `coffee-950` in light (the light `--surface-0` is `#e8ddd2`, so aliasing would change it).

- [ ] **Step 4: Add Layer-3 bindings**

In `@theme inline`, after the existing `/* Surface hierarchy */` group (keep the five old bindings), add:

```css
  --color-surface-0: var(--surface-0);
  --color-surface-1: var(--surface-1);
  --color-surface-2: var(--surface-2);
  --color-surface-3: var(--surface-3);
  --color-surface-4: var(--surface-4);
```

After `--color-primary-foreground`, add:

```css
  --color-primary-hover: var(--primary-hover);
  --color-primary-active: var(--primary-active);
```

After the existing `/* Text variants */` group, add:

```css
  --color-text-primary: var(--text-primary);
  --color-text-secondary: var(--text-secondary);
  --color-text-tertiary: var(--text-tertiary);
  --color-text-disabled: var(--text-disabled);
```

- [ ] **Step 5: Verify build**

Run: `pnpm build`
Expected: exit 0.

- [ ] **Step 6: Commit**

```bash
git add app/assets/css/style.css
git commit -m "Add canonical text/surface/action tokens; fence legacy aliases as deprecated

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 2: Intent, odds, and live domain tokens

**Files:**
- Modify: `app/assets/css/style.css` (both theme blocks + `@theme inline`)

**Interfaces:**
- Consumes: `--surface-1/2/3`, `--text-primary`, `--text-disabled` (Task 1), `--bet`, `--bet-foreground`, `--emerald`, `--success`, `--warning`, `--destructive` (existing).
- Produces: CSS vars `--success-surface/-border/-text` (same for warning/danger), `--odds-bg/-fg/-hover-bg/-selected-bg/-selected-fg/-up/-down/-suspended-bg/-suspended-fg`, `--live/-bg/-border`; utilities `bg-odds-selected`, `text-odds-selected-fg`, `text-odds-up`, `text-odds-down`, `text-live`, `bg-live-bg`, `border-live-border`, `bg-success-surface` etc., and `text-gold-650`/`bg-gold-650` (used by Task 3).

- [ ] **Step 1: Add the tokens to the dark block**

In `:root`, insert immediately before the `/* Shape — Soft 4px base */` line:

```css
  /* Intent — status surface/border/text triplets, so status components
     stop inventing their own tints */
  --success-surface: color-mix(in srgb, var(--success) 12%, transparent);
  --success-border: color-mix(in srgb, var(--success) 35%, transparent);
  --success-text: var(--success);
  --warning-surface: color-mix(in srgb, var(--warning) 12%, transparent);
  --warning-border: color-mix(in srgb, var(--warning) 35%, transparent);
  --warning-text: var(--warning);
  --danger-surface: color-mix(in srgb, var(--destructive) 12%, transparent);
  --danger-border: color-mix(in srgb, var(--destructive) 35%, transparent);
  --danger-text: var(--destructive);

  /* Domain — odds cell states. Selected = the bet CTA gold; up/down are
     the status colours, shown as a brief flash, never a resting state. */
  --odds-bg: var(--surface-2);
  --odds-fg: var(--text-primary);
  --odds-hover-bg: var(--surface-3);
  --odds-selected-bg: var(--bet);
  --odds-selected-fg: var(--bet-foreground);
  --odds-up: var(--emerald);
  --odds-down: var(--palette-red-400);
  --odds-suspended-bg: var(--surface-1);
  --odds-suspended-fg: var(--text-disabled);

  /* Domain — live indicator */
  --live: var(--palette-red-500);
  --live-bg: color-mix(in srgb, var(--live) 12%, transparent);
  --live-border: color-mix(in srgb, var(--live) 35%, transparent);
```

- [ ] **Step 2: Mirror in the light block**

Insert the same three groups before the light block's `/* Elevation — light uses a coffee umbra... */` comment, with one difference:

```css
  --odds-down: var(--palette-red-600);
```

(everything else identical — the referenced vars already theme-switch, and this file's convention is to declare per theme anyway).

- [ ] **Step 3: Add bindings**

In `@theme inline`, after the Task 1 text-hierarchy bindings, add:

```css

  /* Intent triplets */
  --color-success-surface: var(--success-surface);
  --color-success-border: var(--success-border);
  --color-success-text: var(--success-text);
  --color-warning-surface: var(--warning-surface);
  --color-warning-border: var(--warning-border);
  --color-warning-text: var(--warning-text);
  --color-danger-surface: var(--danger-surface);
  --color-danger-border: var(--danger-border);
  --color-danger-text: var(--danger-text);

  /* Domain — odds and live */
  --color-odds-bg: var(--odds-bg);
  --color-odds-fg: var(--odds-fg);
  --color-odds-hover-bg: var(--odds-hover-bg);
  --color-odds-selected: var(--odds-selected-bg);
  --color-odds-selected-fg: var(--odds-selected-fg);
  --color-odds-up: var(--odds-up);
  --color-odds-down: var(--odds-down);
  --color-odds-suspended-bg: var(--odds-suspended-bg);
  --color-odds-suspended-fg: var(--odds-suspended-fg);
  --color-live: var(--live);
  --color-live-bg: var(--live-bg);
  --color-live-border: var(--live-border);
```

In the `@theme` block (palette remaps), directly after the `--color-orange-950` line, add:

```css

  /* Gold mid-tone — direct ramp access for the .1475-luminance step that
     sits between gold-600 and gold-700 (see layer 1) */
  --color-gold-650: var(--palette-gold-650);
```

- [ ] **Step 4: Verify build**

Run: `pnpm build`
Expected: exit 0.

- [ ] **Step 5: Commit**

```bash
git add app/assets/css/style.css
git commit -m "Add intent triplets and odds/live domain tokens

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 3: Purple-family class replacement sweep

**Files:**
- Modify: 16 components + 2 composables listed below.

**Interfaces:**
- Consumes: `text-gold-650`/`bg-gold-650`/`border-gold-650` utilities (Task 2).
- Produces: an `app/components` + `app/composables` tree with zero purple/violet/indigo/fuchsia classes, unblocking Task 4's remap deletion.

Replacement rule — colour-identical by construction (each side resolves to the same palette var under the current remaps):

| old step (purple/violet/indigo/fuchsia) | new class stem | shared palette var |
|---|---|---|
| `-50` | `amber-50` | gold-50 |
| `-100` | `amber-100` | gold-100 |
| `-300` | `amber-300` | gold-300 |
| `-400` | `amber-400` | gold-400 |
| `-500` | `gold-650` | gold-650 |
| `-600` | `amber-700` | gold-700 |
| `-700` | `amber-700` | gold-700 |
| `-800` | `amber-800` | gold-800 |
| `-900` | `amber-900` | gold-900 |
| `-950` | `amber-950` | gold-950 |

Opacity modifiers carry over unchanged (`bg-purple-500/10` → `bg-gold-650/10`). Variant prefixes (`dark:`, `focus-visible:`, `from-`/`via-`/`to-`) carry over unchanged.

- [ ] **Step 1: Apply the replacements file by file**

1. `app/components/TheLeagues.vue` (line 21): `focus-visible:border-indigo-500` → `focus-visible:border-gold-650`
2. `app/components/CasinoIcons.vue` (417): `bg-purple-500` → `bg-gold-650`
3. `app/components/AviatorContent.vue`: `text-indigo-700` → `text-amber-700` (lines 33, 47, 116, 149); `border-indigo-500` → `border-gold-650` (64, 76, 88, 100). **Also:** line 64's div contains committed keyboard-mash garbage rendered on the page (`x1xd1xxzzzzzzzzzZ C\`AZASZ\`\`\`…K566 BUJJ N <Noframes>JMMMJ</Noframes>…`) — delete that stray text so the div's content matches the pattern of the parallel divs at 76/88/100, and note the cleanup in the commit message.
4. `app/components/BetBuilderCompetition.vue` (71): `from-purple-950` → `from-amber-950`
5. `app/components/FreebetContent.vue`: (79) `from-purple-600` → `from-amber-700`; (98) `text-purple-600` → `text-amber-700`; (118, 158) `bg-purple-100` → `bg-amber-100` and `dark:bg-purple-900` → `dark:bg-amber-900`; (118, 161) `text-purple-600` → `text-amber-700` and `dark:text-purple-300` → `dark:text-amber-300`
6. `app/components/SportsIcons.vue`: (39) `text-fuchsia-400` → `text-amber-400`; (335) `text-purple-500` → `text-gold-650`; (456, 489) `text-violet-400` → `text-amber-400`
7. `app/components/DepositBonusTable.vue` (17–18): `bg-purple-50` → `bg-amber-50`; `dark:bg-purple-500/10` → `dark:bg-gold-650/10`; `text-purple-500` → `text-gold-650`
8. `app/components/bonus/MissionsSection.vue` (48): `text-purple-600 dark:text-purple-400 bg-purple-500/15 dark:bg-purple-400/20 border-purple-500/25 dark:border-purple-400/30` → `text-amber-700 dark:text-amber-400 bg-gold-650/15 dark:bg-amber-400/20 border-gold-650/25 dark:border-amber-400/30`
9. `app/components/promo-strip/JoinAffiliate.vue`: (4) `to-violet-500` → `to-gold-650`; (26) `text-fuchsia-700` → `text-amber-700`
10. `app/components/promo-strip/RandomWinner.vue` (54, 64): `via-fuchsia-900` → `via-amber-900`
11. `app/components/promo-strip/HakiLeaguePromoStrip.vue`: (13, 16) `text-fuchsia-600` → `text-amber-700`; (21) `from-indigo-500` → `from-gold-650` and `to-fuchsia-500` → `to-gold-650`
12. `app/components/profile/ProfileLinks.vue` (71–72): `bg-purple-50` → `bg-amber-50`; `dark:bg-purple-500/10` → `dark:bg-gold-650/10`; `text-purple-500` → `text-gold-650`
13. `app/components/promos/ShareKrisii.vue` (replace-all per pattern): `dark:shadow-purple-900/50` → `dark:shadow-amber-900/50` (4×); `dark:border-purple-700` → `dark:border-amber-700` (7×); `dark:border-purple-800` → `dark:border-amber-800` (1×, line 109); `dark:bg-purple-800/50` → `dark:bg-amber-800/50` (1×, line 135)
14. `app/components/promo-strip/JoinAffiliateKES30.vue`: (3) `from-violet-500` → `from-gold-650` and `to-violet-500` → `to-gold-650`; (25) `text-fuchsia-700` → `text-amber-700`
15. `app/components/profile/ProfileIcons.vue` (60): `text-purple-500` → `text-gold-650`
16. `app/components/promo-strip/DownloadAppStrip.vue`: (21) delete the entire commented-out line (`<!-- <span class="text-fuchsia-600 font-black text-xs">KES.30</span> -->`); (29) `from-indigo-500` → `from-gold-650` and `to-fuchsia-500` → `to-gold-650`
17. `app/composables/usePromos.js`: (89, 98, 117) `to-purple-800` → `to-amber-800`; (137) `from-fuchsia-700` → `from-amber-700`
18. `app/composables/useSports.js`: (47) `text-violet-600 dark:text-violet-400` → `text-amber-700 dark:text-amber-400`; (159) `text-purple-600 dark:text-purple-400` → `text-amber-700 dark:text-amber-400`

- [ ] **Step 2: Verify the tree is clean**

Run: `grep -rniE "purple|violet|indigo|fuchsia" app/components app/pages app/layouts app/composables app/stores server/`
Expected: no output.

- [ ] **Step 3: Verify build**

Run: `pnpm build`
Expected: exit 0.

- [ ] **Step 4: Commit**

```bash
git add -A app/components app/composables
git commit -m "Replace all purple-family utility classes with their gold equivalents

Colour-identical by construction: every replacement lands on the same
palette var the old remap resolved to. Also removes stray committed
keyboard input rendered on the Aviator page.

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 4: Delete the purple remaps from style.css

**Files:**
- Modify: `app/assets/css/style.css`

**Interfaces:**
- Consumes: a purple-free component tree (Task 3) — this task MUST run after Task 3 or legacy classes would silently lose their colour.

- [ ] **Step 1: Delete the remap blocks**

In the `@theme` block delete, including their leading comments:
- the `/* BANDA Gold → purple / violet / fuchsia. ... */` comment and all 33 `--color-purple-*`, `--color-violet-*`, `--color-fuchsia-*` lines
- the `/* BANDA Gold → indigo. ... */` comment and all 11 `--color-indigo-*` lines

- [ ] **Step 2: Scrub remaining purple references from comments**

- Layer-1 `--palette-gold-650` comment (lines ~72–79): replace the whole comment with:
  ```css
  /* Gold mid-tone, same reason as coffee-450/550/650. Luminance-matched to
     the pre-BANDA brand's 500 step (L .1475) so components that carried the
     old brand colour keep their value structure; step 600 needs no new
     token because gold-700 is already within .016 of the old 600 step.
     Exposed as gold-650 in layer 3. */
  ```
- Layer-3 header comment (~line 372–373): change `` Tailwind's stock ramps are remapped onto the BANDA palette so that legacy `bg-gray-800` / `text-purple-500` usage stays inside the design system. `` → `` Tailwind's stock ramps are remapped onto the BANDA palette so that legacy `bg-gray-800` / `text-emerald-500` usage stays inside the design system. ``
- Blue/sky/cyan group comment (~694–697): delete the sentence `NOTE: indigo is *not* in this group — it is remapped onto gold below, with purple / violet / fuchsia.`
- `accent-bar` comment (~888): `/* Active list item — 4px left-accent bar in Primary Purple */` → `/* Active list item — 4px left-accent bar in BANDA Gold */`

- [ ] **Step 3: Verify the purge is total**

Run: `grep -rniE "purple|violet|indigo|fuchsia" app/ server/`
Expected: no output. Any hit must be individually fixed before proceeding.

- [ ] **Step 4: Verify build**

Run: `pnpm build`
Expected: exit 0.

- [ ] **Step 5: Commit**

```bash
git add app/assets/css/style.css
git commit -m "Remove the purple/violet/indigo/fuchsia Tailwind remaps

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 5: Wire odds cells and live indicators onto the domain tokens

**Files:**
- Modify: `app/components/TheButton.vue`, `app/components/TheButton2.vue`, `app/components/OddChangeArrow.vue`, `app/components/LiveMatchTwo.vue`

**Interfaces:**
- Consumes: `bg-odds-selected`, `text-odds-selected-fg`, `text-live` utilities and `--odds-up/-down/-selected-bg/-selected-fg` vars (Task 2); `text-primary` (existing).

**Deliberate visual changes (call these out in the commit):**
- Selected odds become BANDA-Gold-on-gold-900 (5.9:1) instead of gold with white text (2.1:1 in dark — a contrast bug) / dark-gold in the live variant. Prematch and live selected states now match.
- Odds-up arrows become emerald instead of gold; odds-down arrows use the theme red instead of literal `red`.

- [ ] **Step 1: TheButton.vue — selected state**

- Line ~148: `'bg-brand-bright/90 ring-1 ring-brand-bright/30'` → `'bg-odds-selected ring-1 ring-bet-deep/30'`
- Line ~157: `outcomeIsSelected ? 'text-white/80'` → `outcomeIsSelected ? 'text-odds-selected-fg/80'`
- Line ~168: `outcomeIsSelected ? 'text-white'` → `outcomeIsSelected ? 'text-odds-selected-fg'`
- Line ~197: `outcomeIsSelected ? 'text-white/80'` → `outcomeIsSelected ? 'text-odds-selected-fg/80'`
- Lines ~207 and ~216: `outcomeIsSelected ? 'text-white' : 'text-brand-bright'` → `outcomeIsSelected ? 'text-odds-selected-fg' : 'text-primary'` (`brand-bright` ≡ `primary` in both themes after Task 1 — no-op half)
- In the scoped `.odds-btn-selected` rule: replace the `background` and `box-shadow` values:
  ```css
  .odds-btn-selected {
    background: var(--odds-selected-bg);
    box-shadow: 0 1px 4px color-mix(in oklch, var(--odds-selected-bg) 15%, transparent);
    border: 1px solid transparent;
  }
  ```
- Leave `.odd-btn-default` / `.odds-btn` (unselected/hover) untouched — they are neutral translucent surfaces, not part of this task's scope.

- [ ] **Step 2: TheButton2.vue — selected state**

- Both variants' class bindings (~lines 141–143 and 180–182): `'bg-brand-selected/80'` → `'bg-odds-selected'`
- Both odds-value spans (~lines 167 and 208): `outcomeIsSelected ? 'text-white'` → `outcomeIsSelected ? 'text-odds-selected-fg'`
- Check the rest of the file for other `outcomeIsSelected ? 'text-white'` ternaries (outcome-name labels) and apply the same `text-odds-selected-fg` (or `/80` where the original had opacity) replacement.

- [ ] **Step 3: OddChangeArrow.vue — status colours**

Replace the scoped colour rules:

```css
.red {
  border-color: var(--odds-down) transparent transparent transparent;
}

.green {
  border-color: transparent transparent var(--odds-up) transparent;
}

.selected-up {
  border-color: transparent transparent var(--odds-selected-fg) transparent;
}

.selected-down {
  border-color: var(--odds-selected-fg) transparent transparent transparent;
}
```

Also delete the commented-out IE-era `_border-color` / `progid:DXImageTransform` lines inside `.down` and `.up` while there.

- [ ] **Step 4: LiveMatchTwo.vue — live colour**

Lines ~70, 89, 97, 151: `text-red-500` → `text-live` (four occurrences; identical resolved value, semantic rename only).

- [ ] **Step 5: Verify build**

Run: `pnpm build`
Expected: exit 0.

- [ ] **Step 6: Commit**

```bash
git add app/components/TheButton.vue app/components/TheButton2.vue app/components/OddChangeArrow.vue app/components/LiveMatchTwo.vue
git commit -m "Wire odds cells and live indicators onto the domain tokens

Selected odds are now the bet gold with gold-900 text (was white on gold,
2.1:1); odds-up arrows are emerald per the status-colour system (was
gold); live text uses the live token.

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 6: Typography — truthful docs + odds numeral treatment

**Files:**
- Modify: `DESIGN.md`, `app/assets/css/style.css`, `app/components/TheButton.vue`, `app/components/TheButton2.vue`, `app/components/TheStake.vue`, `app/components/PossibleWin.vue`

**Interfaces:**
- Produces: `--font-odds` var and `font-odds` utility.

- [ ] **Step 1: Fix DESIGN.md**

- In the frontmatter `typography:` block (lines ~51–88): `fontFamily: Poppins` → `fontFamily: Montserrat` for `h1`, `h1-mobile`, `h2`; → `fontFamily: Inter` for `odds-display`, `body-main`, `data-compact`, `label-caps`.
- Replace the `## Typography` intro paragraph (line ~127) with:

  ```markdown
  The typography system pairs **Montserrat** (headings and promotional display) with **Inter** (UI, tables, odds, and body copy). Montserrat carries the architecture; Inter carries the data, with `tabular-nums` on all numeric displays so odds and money align in columns.
  ```

- [ ] **Step 2: Add the odds font token**

In `@theme inline`, directly after the `--font-display` declaration, add:

```css
  /* Odds and money — Inter with a metric-stable mono fallback. Pair the
     font-odds utility with tabular-nums on every numeric display. */
  --font-odds: "Inter", ui-monospace, SFMono-Regular, Menlo, monospace;
```

(Tailwind 4 derives the `font-odds` utility from this automatically.)

- [ ] **Step 3: Apply to odds and money displays**

- `TheButton.vue`: add `font-odds` to the three odds-value spans' static class lists (the ones already containing `tabular-nums`, lines ~169, ~208, ~217).
- `TheButton2.vue`: add `font-odds` to its odds-value spans; add `tabular-nums` there too if missing.
- `TheStake.vue`: line ~56 balance span — class becomes `font-bold text-gray-700 dark:text-white/60 font-odds tabular-nums`; line ~105 stake input — append `font-odds tabular-nums` to its class list.
- `PossibleWin.vue`: line ~35 amount span — append `font-odds tabular-nums`.

- [ ] **Step 4: Verify build**

Run: `pnpm build`
Expected: exit 0. Also `grep -c "Poppins" DESIGN.md` → expected `0`.

- [ ] **Step 5: Commit**

```bash
git add DESIGN.md app/assets/css/style.css app/components/TheButton.vue app/components/TheButton2.vue app/components/TheStake.vue app/components/PossibleWin.vue
git commit -m "Document the real Inter+Montserrat type system; add font-odds numeral treatment

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 7: Gradient and glass discipline

**Files:**
- Modify: `app/components/bonus/BottomNav.vue`, `app/components/bonus/BonusTabs.vue`, `app/components/bonus/DailyRewards.vue`, `app/components/bonus/MissionsSection.vue`, `app/components/bonus/BonusCard.vue`, `app/components/bonus/ReferralSection.vue`, `app/components/bonus/PromoBanner.vue`, `app/pages/bonus.vue`, `app/components/BetBuilder.vue`

**Rule applied:** gradients survive only on promotional/celebration surfaces and decorative icon tiles; every button, tab, nav item, card body, and data surface goes flat. Glass survives only on hero overlays and promotional overlays. `bg-gradient-gold` buttons become the standard CTA (`bg-bet text-bet-foreground`) — text shifts from cream to gold-900, the intended CTA standard.

**Explicit keeps (do not touch):** `MultibetBoostPromo.vue:131` (promo card), `BonusHeader.vue` lines 72/93/171 (hero decorative orbs) and line 106 `glass-card` (hero overlay), `PromoBanner.vue:51` (decorative icon tile), `bonus.vue:251` `glass-card` (promotional overlay panel), the three `text-gradient-*` utilities (defined, currently unused, allowed for promo use).

- [ ] **Step 1: Flatten navigation and tabs**

- `BottomNav.vue` (~28): `'bg-gradient-gold text-accent-foreground shadow-glow-gold -mt-4 px-5 py-2'` → `'bg-bet text-bet-foreground shadow-glow-gold -mt-4 px-5 py-2'`
- `BonusTabs.vue` (~18 and ~32): `dark:bg-gradient-card` → `dark:bg-card` (leave the rest of each string unchanged)

- [ ] **Step 2: Flatten card bodies**

Replace `bg-gradient-card` → `bg-card` in:
- `DailyRewards.vue` ~27
- `MissionsSection.vue` ~74
- `BonusCard.vue` ~58
- `ReferralSection.vue` ~32

- [ ] **Step 3: Flatten buttons and the progress bar**

Replace `bg-gradient-gold` → `bg-bet` and, on the same element, `text-accent-foreground` → `text-bet-foreground` in:
- `DailyRewards.vue` ~97
- `MissionsSection.vue` ~129
- `BonusCard.vue` ~202
- `ReferralSection.vue` ~107 (icon button: replace `bg-gradient-gold` → `bg-bet`; if its inner icon uses `text-accent-foreground`, change to `text-bet-foreground`) and ~137
- `PromoBanner.vue` ~67
- `app/pages/bonus.vue` ~253

And in `BonusCard.vue` ~191 (bonus progress fill): `bg-gradient-emerald` → `bg-success`.

- [ ] **Step 4: De-glass the BetBuilder tab bar**

`BetBuilder.vue` ~132: replace `bg-white/90 dark:bg-[oklch(13%_0.04_258/0.88)] premium-glass` with `bg-card` (also removes an off-system arbitrary oklch value; keep the rest of the class list).

- [ ] **Step 5: Verify build + audit**

Run: `pnpm build`
Expected: exit 0.
Run: `grep -rn "bg-gradient-gold\|bg-gradient-card\|bg-gradient-emerald\|premium-glass" app/components app/pages`
Expected: only the explicit keeps listed above (MultibetBoostPromo:131, BonusHeader:72/93/171, PromoBanner:51 — and zero `premium-glass`).

- [ ] **Step 6: Commit**

```bash
git add app/components/bonus app/components/BetBuilder.vue app/pages/bonus.vue
git commit -m "Restrict gradients and glass to promotional surfaces

Buttons, tabs, nav, cards and progress bars go flat on semantic tokens;
CTA text standardises on bet-foreground. BetBuilder tab bar drops glass
and an off-system oklch background.

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 8: Animation trim + duration tiers

**Files:**
- Modify: `app/assets/css/style.css`

**Spec correction (documented here deliberately):** the spec listed `float-slow`, `progress-fill`, and `pulse-animation` as dead; class-name grep shows they have live consumers (`gaming-float`/`gaming-glow-pulse` in `app/pages/bonus.vue`, `animate-progress` in `BonusCard.vue`, `pulse` in `app/components/haki-league/FooterNav.vue`). They stay. Only the animate.css leftovers are actually dead.

- [ ] **Step 1: Verify the dead list is still dead**

Run: `grep -rn "anim-active\|anim-bounceInRight\|anim-zoomIn\|anim-backInLeft\|anim-backInRight\|animate-pulse-slow" app/components app/pages app/layouts app/composables`
Expected: no output. If any class has gained a consumer, keep that keyframe/class and drop it from Step 2.

- [ ] **Step 2: Delete dead keyframes and classes**

In `style.css` delete:
- `@keyframes bounceInRight`, `@keyframes zoomIn`, `@keyframes backInLeft`, `@keyframes backInRight`
- the `/* Lightweight replacements for animate.css */` comment and the `.anim-active`, `.anim-bounceInRight`, `.anim-zoomIn`, `.anim-backInLeft`, `.anim-backInRight` rules
- `@utility animate-pulse-slow` (no consumers)

Keep everything else (`highlight`, `shimmer`, `border-glow`, `progress-fill`, `float-slow`, `float-slow-reverse`, `glow-pulse`, `pulse-animation`).

- [ ] **Step 3: Add the duration-tier comment**

Replace the `KEYFRAMES` section header comment with:

```css
/* ============================================================================
   KEYFRAMES

   Duration tiers — pick the smallest that fits:
     micro-interaction   120–180 ms   (hover, press, toggle)
     component transition 180–240 ms  (panels, tabs, cards)
     data / status        300–600 ms  (odds flash, progress)
     celebration          600–1200 ms (wins, jackpots — only here may the
                                       interface visibly perform)
   ========================================================================= */
```

- [ ] **Step 4: Verify build**

Run: `pnpm build`
Expected: exit 0.

- [ ] **Step 5: Commit**

```bash
git add app/assets/css/style.css
git commit -m "Remove dead animate.css leftovers; document animation duration tiers

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 9: Final verification

**Files:** none modified (fixes, if any, amend the offending task's area and get their own commit).

- [ ] **Step 1: Full grep audit**

```bash
grep -rniE "purple|violet|indigo|fuchsia" app/ server/ DESIGN.md
grep -c "Poppins" DESIGN.md
grep -rn "premium-glass\|anim-bounceInRight\|animate-pulse-slow" app/
```
Expected: no output / `0` / no output.

- [ ] **Step 2: Production build**

Run: `pnpm build`
Expected: exit 0, no new warnings versus main.

- [ ] **Step 3: Runtime smoke test**

Start `pnpm dev` (port 5079) and verify with curl that SSR renders without error (HTTP 200, no inline Nuxt error payload) for: `/`, `/sports/football`, `/bonus`. Then visually spot-check in a browser, in BOTH themes: home, a sports page (select and deselect an odds cell — selected cell must be gold with dark-gold text; trigger or observe an odds-change arrow), the bonus page (flat cards, flat CTAs, glass only on the header overlay and bottom panel), deposit page, betslip stake/possible-win numerals, and the mobile bottom nav (green betslip orb unchanged).

- [ ] **Step 4: Wrap up**

Invoke the superpowers:finishing-a-development-branch skill to decide how the branch integrates (merge/PR).
