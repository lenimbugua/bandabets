# Emerald Pitch Brand Re-theme — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the navy+green theme with the "Emerald Pitch" green-led palette across both themes, and re-tokenize ~99 hardcoded-color files so future re-themes are a one-file edit.

**Architecture:** Swap the central CSS-variable values in `src/style.css` (token *architecture* unchanged), then sweep brand-color literals in components/views/composables to the semantic Tailwind token utilities they should have used (Approach B). No layout/typography/structure changes — color only.

**Tech Stack:** Vue 3 + Vite, Tailwind CSS v4 (`@theme inline` + CSS vars in `src/style.css`), pnpm. No test framework — verification is `pnpm run build`, `npx eslint src/`, a brand-signature grep gate, and a manual contrast/visual QA matrix.

**Source spec:** `docs/superpowers/specs/2026-05-18-emerald-pitch-rebrand-design.md` (read §4–§9 before starting). All token values below are copied from that spec; the spec remains the source of truth if anything conflicts.

---

## Conventions for every task

- **No test runner exists.** The "failing test" for token tasks is `pnpm run build` succeeding + visual check; for sweep tasks it is the per-batch **brand-signature grep returning 0**.
- **Brand-signature grep** (used as the gate everywhere). Save as `/tmp/brandgrep.sh` in Task 0:
  ```bash
  # usage: brandgrep.sh <path-or-file...>
  grep -rnE 'oklch\([0-9.]+% [0-9.]+ (2[5-9][0-9]|14[0-2])\)|#0b1120|#1a2744|#1e2d4a|#f97316|\[#[0-9a-fA-F]{3,8}\]|(bg|text|border|from|to|via|ring|fill|stroke)-(navy|emerald)-|(bg|text|border|from|to|via|ring)-green-[0-9]' "$@" --include='*.vue' --include='*.js' --include='*.css' 2>/dev/null | grep -v 'src/style.css' | grep -v 'src/assets/'
  ```
- **Commit after every task** (frequent commits). Conventional-commit messages, end with the Co-Authored-By trailer used in this repo's history.
- Run `pnpm run build` (drops console/debugger via esbuild; a build failure = real error) and `npx eslint src/` before each commit.

---

### Task 0: Branch + tooling setup

**Files:**
- Create: `/tmp/brandgrep.sh`

- [ ] **Step 1: Create a feature branch off devel**

```bash
cd /Users/leonardmbugua/Desktop/parimaster
git checkout devel && git pull --ff-only 2>/dev/null; git checkout -b feat/emerald-pitch-rebrand
```

- [ ] **Step 2: Write the brand-signature grep helper**

Write `/tmp/brandgrep.sh` with the script from the Conventions section, then:

```bash
chmod +x /tmp/brandgrep.sh
```

- [ ] **Step 3: Snapshot the baseline count**

Run: `/tmp/brandgrep.sh src | wc -l`
Expected: a non-zero number (~hundreds of line-matches across 99 files). Record it; it must reach **0** by Task 16.

- [ ] **Step 4: Verify the app builds before any change**

Run: `pnpm install && pnpm run build`
Expected: build completes with no error (establishes a known-good baseline).

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "chore: start emerald-pitch rebrand branch

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 1: Dark theme token values (`:root`)

**Files:**
- Modify: `src/style.css` (the `:root { … }` block, lines ~99–171)

- [ ] **Step 1: Replace every value in `:root`**

In `src/style.css`, inside `:root`, set these (keep the variable names, comments may be updated to the new color names; `--radius` and the `--swiper-*`/`--viewport-height` block are NOT changed here):

```css
  --background: #0E1411;
  --foreground: #EAEFE8;
  --card: #1C2620;
  --card-foreground: #EAEFE8;
  --popover: #1C2620;
  --popover-foreground: #EAEFE8;
  --primary: #21C063;
  --primary-foreground: #06210F;
  --secondary: #178A4B;
  --secondary-foreground: #EAEFE8;
  --muted: #1C2620;
  --muted-foreground: #8B998E;
  --accent: #21C063;
  --accent-foreground: #06210F;
  --destructive: #F0524D;
  --destructive-foreground: #FFF5F4;
  --border: #243029;
  --input: #1C2620;
  --ring: #21C063;
  --radius: 0.75rem;
  --gold: #FFB22C;
  --gold-foreground: #2A1A00;
  --emerald: #2FD673;
  --dark-card: #1C2620;
  --success: #2FD673;
  --warning: #FFB22C;
  --surface-deepest: #0A0F0C;
  --surface-sunken: #0E1411;
  --surface-elevated: #1C2620;
  --surface-interactive: #243029;
  --surface-active: #2E3C32;
  --brand-bright: #21C063;
  --brand-dark: #137A40;
  --brand-selected: #1C9E52;
  --brand-mid: #21C063;
  --brand-forest: #0E5A30;
  --brand-teal: #178A4B;
  --gold-bright: #FFC04D;
  --gold-deep: #E0860A;
  --gold-muted: #D99A3A;
  --bronze: #B97A3C;
  --border-subtle: #1C2620;
  --border-strong: #2E3C32;
  --border-darkest: #0A0F0C;
  --text-muted-alt: #6E7C72;
  --text-subtle: #B7C2B8;
```

- [ ] **Step 2: Build**

Run: `pnpm run build`
Expected: PASS (no error).

- [ ] **Step 3: Visual smoke check**

Run: `pnpm dev`, open `http://localhost:5079`, confirm dark theme is now green-on-charcoal (no crash, no missing-variable fallback). Stop dev.

- [ ] **Step 4: Commit**

```bash
git add src/style.css && git commit -m "feat(theme): apply Emerald Pitch dark token values

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 2: Light theme token values (`[data-theme="light"]`)

**Files:**
- Modify: `src/style.css` (the `[data-theme="light"] { … }` block, lines ~174–238)

- [ ] **Step 1: Replace every value, and ADD the four new overrides**

In the `[data-theme="light"]` block set the values below. Note `--gold`, `--gold-foreground`, `--emerald`, `--success`, `--warning` are **new lines added** to this block (they previously inherited from `:root`):

```css
  --background: #F3F5EF;
  --foreground: #15211B;
  --card: #FFFFFF;
  --card-foreground: #15211B;
  --popover: #FFFFFF;
  --popover-foreground: #15211B;
  --primary: #138A4B;
  --primary-foreground: #FFFFFF;
  --secondary: #0E5A30;
  --secondary-foreground: #FFFFFF;
  --muted: #EBEFE4;
  --muted-foreground: #5E6B61;
  --accent: #138A4B;
  --accent-foreground: #FFFFFF;
  --destructive: #C8403B;
  --destructive-foreground: #FFFFFF;
  --border: #DDE3D3;
  --input: #EBEFE4;
  --ring: #138A4B;
  --dark-card: #EBEFE4;
  --gold: #E0860A;            /* new override */
  --gold-foreground: #FFFFFF; /* new override */
  --emerald: #0E7A40;         /* new override */
  --success: #0E7A40;         /* new override */
  --warning: #E0860A;         /* new override */
  --surface-deepest: #DDE3D3;
  --surface-sunken: #EBEFE4;
  --surface-elevated: #FFFFFF;
  --surface-interactive: #E2E7DA;
  --surface-active: #D5DCC9;
  --brand-bright: #138A4B;
  --brand-dark: #0B4426;
  --brand-selected: #117A42;
  --brand-mid: #138A4B;
  --brand-forest: #0B4426;
  --brand-teal: #0F6B3A;
  --gold-bright: #E0860A;
  --gold-deep: #B96A06;
  --gold-muted: #C98A2E;
  --bronze: #9A6330;
  --border-subtle: #E2E7DA;
  --border-strong: #C7D0BC;
  --border-darkest: #AFBAA3;
  --text-muted-alt: #5E6B61;
  --text-subtle: #2D3A30;
```

- [ ] **Step 2: Build** — Run: `pnpm run build` → Expected: PASS.

- [ ] **Step 3: Visual smoke check** — `pnpm dev`, toggle to light theme, confirm cream bg / deep-green primary, no missing-variable issues. Stop dev.

- [ ] **Step 4: Commit**

```bash
git add src/style.css && git commit -m "feat(theme): apply Emerald Pitch light token values + new overrides

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 3: `src/style.css` utilities, gradients & keyframes

**Files:**
- Modify: `src/style.css` (`@layer base` border fallback; `shadow-premium`/`-hover`; `text-gradient-gold`; `text-gradient-emerald`; `bg-gradient-gold`; `bg-gradient-emerald`; `bg-gradient-card`; `shadow-glow-green`; `shadow-glow-gold`; `highlight` & `border-glow` keyframes; the `[data-theme="light"] .bg-gradient-card / .shadow-glow-green / .shadow-glow-gold` overrides; `.glass-card` dark/light)

- [ ] **Step 1: Apply the §7 utility/keyframe replacements**

Make exactly these edits (old → new):

- `@layer base` rule: `border-color: var(--color-gray-200, currentcolor);` → `border-color: var(--border);`
- `@utility shadow-premium` / `shadow-premium-hover`: replace each `oklch(50% 0.04 258 / X)` with `rgb(0 0 0 / X)` (keep the existing alpha values; only the color changes).
- `@utility text-gradient-gold`: `linear-gradient(135deg, hsl(38 90% 55%), hsl(45 95% 65%))` → `linear-gradient(135deg, #FFB22C, #FFC04D)`
- `@utility text-gradient-emerald`: `linear-gradient(135deg, oklch(70% 0.19 142), oklch(78% 0.16 142))` → `linear-gradient(135deg, #21C063, #2FD673)`
- `@utility bg-gradient-gold`: `linear-gradient(135deg, hsl(38 90% 55%), hsl(30 85% 45%))` → `linear-gradient(135deg, #FFB22C, #E0860A)`
- `@utility bg-gradient-emerald`: `linear-gradient(135deg, oklch(70% 0.19 142), oklch(60% 0.19 142))` → `linear-gradient(135deg, #21C063, #1C9E52)`
- `@utility bg-gradient-card`: `linear-gradient(145deg, oklch(25% 0.05 258), oklch(19% 0.055 258))` → `linear-gradient(145deg, var(--surface-elevated), var(--surface-sunken))`
- `@utility shadow-glow-green`: `box-shadow: 0 0 20px oklch(70% 0.19 142 / 0.3);` → `box-shadow: 0 0 20px rgb(33 192 99 / 0.3);`
- `@utility shadow-glow-gold`: `box-shadow: 0 4px 20px hsl(38 90% 55% / 0.3);` → `box-shadow: 0 4px 20px rgb(255 178 44 / 0.3);`
- `@keyframes highlight`: replace `oklch(70% 0.19 142 / 0.5)` → `rgb(33 192 99 / 0.5)` and `oklch(70% 0.19 142 / 0.6)` → `rgb(33 192 99 / 0.6)`
- `@keyframes border-glow`: `oklch(70% 0.19 142 / 0.4)` → `rgb(33 192 99 / 0.4)`; `hsla(38, 90%, 55%, 0.4)` → `rgb(255 178 44 / 0.4)`
- `[data-theme="light"] .bg-gradient-card`: `linear-gradient(145deg, white, oklch(97% 0.005 248))` → `linear-gradient(145deg, var(--surface-elevated), var(--surface-sunken))`; its `border`/`box-shadow` `oklch(... 255/257 ...)` → `rgb(0 0 0 / 0.06)` keeping alphas
- `[data-theme="light"] .shadow-glow-green`: `oklch(60% 0.19 142 / 0.35)` → `rgb(19 138 75 / 0.35)`
- `[data-theme="light"] .shadow-glow-gold`: `hsla(38, 95%, 46%, 0.35)` → `rgb(224 134 10 / 0.35)`
- `[data-theme="dark"] .glass-card`: `oklch(25% 0.05 258 / 0.6)` → `rgb(28 38 32 / 0.6)`; border `oklch(33% 0.045 257 / 0.4)` → `rgb(46 60 50 / 0.4)`
- `[data-theme="light"] .glass-card`: `oklch(99% 0.002 248 / 0.88)` → `rgb(255 255 255 / 0.88)`; border `oklch(80% 0.02 255 / 0.5)` → `rgb(199 208 188 / 0.5)`; box-shadow `oklch(...)` → `rgb(0 0 0 / 0.08)` / `rgb(0 0 0 / 0.04)`
- `.card-hover-lift:hover` dark/light box-shadow `oklch(...)` colored parts → `rgb(33 192 99 / 0.15)` (dark) and `rgb(0 0 0 / 0.18)` (light), keeping the existing black rgba parts.

- [ ] **Step 2: Build** — Run: `pnpm run build` → Expected: PASS.

- [ ] **Step 3: Verify no old brand oklch/hsl remain in these utilities**

Run: `grep -nE 'oklch\([0-9.]+% [0-9.]+ (2[5-9][0-9]|14[0-2])\)|hsl\(38 90%|hsl\(45 95%|hsla\(38' src/style.css`
Expected: only matches inside the `:root`/`[data-theme]` token blocks if any (utilities/keyframes section returns none for the gold/old-green signatures).

- [ ] **Step 4: Commit**

```bash
git add src/style.css && git commit -m "feat(theme): re-point style.css gradients/keyframes/glass to Emerald Pitch

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 4: `src/style.css` third-party widget overrides

**Files:**
- Modify: `src/style.css` (`.dp__theme_dark` datepicker block; `.colored-toast` SweetAlert rules; `--swiper-pagination-bullet-inactive-color`)

- [ ] **Step 1: Re-map the datepicker `.dp__theme_dark` variables**

```css
  --dp-background-color: #0E1411;
  --dp-text-color: #EAEFE8;
  --dp-hover-color: #243029;
  --dp-hover-text-color: #EAEFE8;
  --dp-hover-icon-color: #8B998E;
  --dp-primary-color: #21C063;
  --dp-primary-disabled-color: #137A40;
  --dp-primary-text-color: #06210F;
  --dp-secondary-color: #6E7C72;
  --dp-border-color: #243029;
  --dp-menu-border-color: #243029;
  --dp-border-color-hover: #2E3C32;
  --dp-border-color-focus: #8B998E;
  --dp-disabled-color: #2E3C32;
  --dp-disabled-color-text: #6E7C72;
  --dp-scroll-bar-background: #0A0F0C;
  --dp-scroll-bar-color: #243029;
  --dp-success-color: #21C063;
  --dp-success-color-disabled: #137A40;
  --dp-icon-color: #8B998E;
  --dp-danger-color: #F0524D;
  --dp-marker-color: #FFB22C;
  --dp-tooltip-color: #1C2620;
  --dp-highlight-color: rgb(33 192 99 / 20%);
```
(The `--dp-range-*` lines that reference `var(--dp-hover-color, …)` keep their `var()` form; only update their literal fallbacks `#1a2744`→`#243029`, `#fff`→`#EAEFE8`.)

- [ ] **Step 2: Re-map the SweetAlert `.colored-toast` rules**

- `.colored-toast.swal2-icon-success` → already uses `var(--card)`/`var(--card-foreground)` — leave.
- `.colored-toast.swal2-icon-error { background-color: #fca5a5 … }` → `background-color: var(--destructive); color: var(--destructive-foreground);`
- `.colored-toast.swal2-icon-warning { … color: hsl(0 70% 50%) }` → `color: var(--destructive);` (keep `background-color: var(--card)`)
- `.colored-toast.swal2-icon-info { background-color: #3fc3ee; color: red }` → `background-color: var(--card); color: var(--card-foreground);`
- `.colored-toast.swal2-icon-question { background-color: #87adbd }` → `background-color: var(--card);`

- [ ] **Step 3: Swiper inactive bullet**

`--swiper-pagination-bullet-inactive-color: #000;` → `--swiper-pagination-bullet-inactive-color: var(--muted-foreground);`

- [ ] **Step 4: Build + grep** — Run: `pnpm run build` (PASS) then
`grep -nE '#0b1120|#1a2744|#1e2d4a|#f97316|#fca5a5|#3fc3ee|#87adbd' src/style.css`
Expected: no matches.

- [ ] **Step 5: Commit**

```bash
git add src/style.css && git commit -m "feat(theme): re-theme datepicker, SweetAlert toasts, swiper to Emerald Pitch

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 5: Author the sweep mapping reference (used by Tasks 6–15)

**Files:**
- Create: `docs/superpowers/plans/emerald-pitch-sweep-mapping.md`

- [ ] **Step 1: Write the deterministic old→new lookup**

Create the file with this exact content (every sweep task applies it; replacements are *role-aware* — pick the row matching how the color is used):

```markdown
# Emerald Pitch Sweep Mapping (apply with role judgement)

Replace the OLD signature with the NEW Tailwind utility / token. Never
introduce a new hex — if no row fits, add a semantic token to src/style.css
instead.

## Backgrounds / surfaces (navy family → surface tokens)
- bg-navy-950 / [#0b1120] / [#0a0f1a]            → bg-surface-deepest
- bg-navy-900 / darkest app bg                    → bg-background
- bg-navy-800 / [#1a2744] / card bg               → bg-card  (or bg-surface-elevated)
- bg-navy-700 / [#1e2d4a]                         → bg-surface-interactive
- bg-navy-600                                     → bg-surface-active

## Borders
- border-navy-800 / [#1e2d4a]                     → border  (or border-subtle)
- border-navy-700                                 → border-strong
- border-navy-950                                 → border-darkest

## Text (navy/grey neutrals)
- text-white on dark / [#fff] as body text        → text-foreground
- text-navy-300 / [#cbd5e1]                        → text-subtle
- text-navy-400 / text-navy-500 / muted greys      → text-muted-foreground
- very-muted secondary text                        → text-text-muted-alt

## Brand green (emerald-* / green-400..600 / one-off greens #36C31F #57cc05)
- fill / bg brand green                            → bg-primary
- text brand green / links / active                → text-primary
- ring / focus green                               → ring-ring
- darker green-700..900 (deep accents)             → text-brand-teal / bg-brand-forest
- success / "won" green                            → text-success / bg-success

## Gold / amber / yellow (#f97316 #ffb002 #FFB002 #FEAF04, *-yellow-*, *-amber-*, gold gradients)
- premium / VIP / boost / jackpot fill             → bg-gold
- premium text / star                              → text-gold
- warning state                                    → text-warning

## Status reds (#f00 #F44336 *-red-* used for error/loss)
- error / loss / destructive bg                    → bg-destructive
- error / loss text                                → text-destructive

## Inline :style="{ color:'#xxxx' }" / JS color literals
- replace literal with var(--token), e.g.
  :style="{ color: 'var(--primary)' }"
- if dynamic, expose a CSS var and reference it.

## Pure neutrals — DO NOT TOUCH (allowed, not brand)
- #fff/#ffffff/#000/#000000/white/black for icons, dividers, pure overlays
- rgba(0,0,0,X) / rgba(255,255,255,X) shadows & scrims
- SVG/flag/illustration literal fills inside <svg> or src/assets
```

- [ ] **Step 2: Commit**

```bash
git add docs/superpowers/plans/emerald-pitch-sweep-mapping.md && git commit -m "docs: add Emerald Pitch sweep mapping reference

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Sweep tasks 6–15 — shared procedure

Each sweep task targets an explicit file list. For **every file** in the list:

1. Open it; for each brand signature, apply `emerald-pitch-sweep-mapping.md` by **role** (what the color does in that element), not by blind find/replace.
2. Convert inline `:style`/JS color literals to `var(--token)`.
3. Leave pure neutrals/asset fills (mapping "DO NOT TOUCH").

Then per task: **(a)** `npx eslint <files>` → clean; **(b)** `pnpm run build` → PASS; **(c)** `/tmp/brandgrep.sh <files…>` → **0 lines**; **(d)** commit.

---

### Task 6: Sweep — Sports core & match cards (17 files)

**Files (Modify):**
`src/components/TheMatch.vue`, `src/components/MatchTwo.vue`, `src/components/LeagueMatchCard.vue`, `src/components/ChangeEventCompetitions.vue`, `src/components/ChangeEventCountries.vue`, `src/components/ChangeEventMatches.vue`, `src/components/ChangeEventModal.vue`, `src/components/ColumnHeaderSearch.vue`, `src/components/OpenMatchStatButton.vue`, `src/components/ViewMatch.vue`, `src/components/DesktopSportsLayout.vue`, `src/components/MobileSportsLayout.vue`, `src/components/mobile/OddsBar.vue`, `src/components/mobile/SportsFilterBar.vue`, `src/components/new-league/NewLeagueThreeOrLessOutcomes.vue`, `src/views/LeaguesView.vue`, `src/views/NewLeague.vue`

- [ ] **Step 1: Apply the shared sweep procedure** to every file above using `docs/superpowers/plans/emerald-pitch-sweep-mapping.md`.
- [ ] **Step 2: Lint** — Run: `npx eslint src/components/TheMatch.vue src/components/MatchTwo.vue src/components/LeagueMatchCard.vue src/components/ChangeEventCompetitions.vue src/components/ChangeEventCountries.vue src/components/ChangeEventMatches.vue src/components/ChangeEventModal.vue src/components/ColumnHeaderSearch.vue src/components/OpenMatchStatButton.vue src/components/ViewMatch.vue src/components/DesktopSportsLayout.vue src/components/MobileSportsLayout.vue src/components/mobile/OddsBar.vue src/components/mobile/SportsFilterBar.vue src/components/new-league/NewLeagueThreeOrLessOutcomes.vue src/views/LeaguesView.vue src/views/NewLeague.vue` → Expected: no errors.
- [ ] **Step 3: Build** — Run: `pnpm run build` → Expected: PASS.
- [ ] **Step 4: Batch grep gate** — Run: `/tmp/brandgrep.sh src/components/TheMatch.vue src/components/MatchTwo.vue src/components/LeagueMatchCard.vue src/components/ChangeEventCompetitions.vue src/components/ChangeEventCountries.vue src/components/ChangeEventMatches.vue src/components/ChangeEventModal.vue src/components/ColumnHeaderSearch.vue src/components/OpenMatchStatButton.vue src/components/ViewMatch.vue src/components/DesktopSportsLayout.vue src/components/MobileSportsLayout.vue src/components/mobile/OddsBar.vue src/components/mobile/SportsFilterBar.vue src/components/new-league/NewLeagueThreeOrLessOutcomes.vue src/views/LeaguesView.vue src/views/NewLeague.vue` → Expected: **0 lines**.
- [ ] **Step 5: Visual check** — `pnpm dev`, open a league/match list in dark + light, confirm odds buttons/selected state look correct. Stop dev.
- [ ] **Step 6: Commit** — `git add -A && git commit -m "refactor(theme): re-tokenize sports & match-card components" -m "Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"`

---

### Task 7: Sweep — Live (9 files)

**Files (Modify):** `src/components/LiveBox.vue`, `src/components/LiveMatch.vue`, `src/components/LiveMatchTwo.vue`, `src/components/LiveMatchesPreviewDesktop.vue`, `src/components/LiveSportsTabs.vue`, `src/components/NewLive3.vue`, `src/views/NewLive3.vue`, `src/components/mobile/LiveMatchesPreview.vue`, `src/components/live/LiveSortByMenu.vue`

- [ ] **Step 1:** Apply shared sweep procedure to all 9 files.
- [ ] **Step 2: Lint** the 9 files → no errors.
- [ ] **Step 3: Build** → PASS.
- [ ] **Step 4: Batch grep gate** — `/tmp/brandgrep.sh` over the 9 files → **0 lines**.
- [ ] **Step 5: Visual check** — live list dark+light. Stop dev.
- [ ] **Step 6: Commit** — message `refactor(theme): re-tokenize live components` + Co-Authored-By trailer.

---

### Task 8: Sweep — Betslip & bets (9 files)

**Files (Modify):** `src/components/BetBuilderCompetition.vue`, `src/components/BetBuilderSelections.vue`, `src/components/BetBuilderSlip.vue`, `src/components/BetDetails.vue`, `src/components/BetslipBetbuilderDetails.vue`, `src/components/TheBet.vue`, `src/components/MyBets.vue`, `src/components/OneCutWin.vue`, `src/components/TheButton.vue`

- [ ] **Step 1:** Apply shared sweep procedure to all 9 files. (`TheButton.vue` is shared — verify primary/secondary/disabled variants in dark+light.)
- [ ] **Step 2: Lint** the 9 files → no errors.
- [ ] **Step 3: Build** → PASS.
- [ ] **Step 4: Batch grep gate** over the 9 files → **0 lines**.
- [ ] **Step 5: Visual check** — add a selection, open betslip, place-bet button, won/lost states, dark+light. Stop dev.
- [ ] **Step 6: Commit** — `refactor(theme): re-tokenize betslip & bet components` + trailer.

---

### Task 9: Sweep — Cashout & freebet (9 files)

**Files (Modify):** `src/components/cashout/AutoCashout.vue`, `src/components/cashout/CashoutIndex.vue`, `src/components/cashout/FullCashout.vue`, `src/components/cashout/PartialCashout.vue`, `src/components/CashoutStrip.vue`, `src/components/freebet/FreeBetMobileInput.vue`, `src/components/freebet/FreeBetPasswordInput.vue`, `src/components/freebet/FreebetSignup.vue`, `src/components/FreebetContent.vue`

- [ ] **Step 1:** Apply shared sweep procedure to all 9 files.
- [ ] **Step 2: Lint** → no errors. **Step 3: Build** → PASS.
- [ ] **Step 4: Batch grep gate** over the 9 files → **0 lines**.
- [ ] **Step 5: Visual check** — cashout strip/modal, freebet flows, dark+light.
- [ ] **Step 6: Commit** — `refactor(theme): re-tokenize cashout & freebet components` + trailer.

---

### Task 10: Sweep — Casino & games (10 files)

**Files (Modify):** `src/views/CasinoHome.vue`, `src/views/CasinoGame.vue`, `src/views/TheAviator.vue`, `src/views/VirtualsIndex.vue`, `src/components/AviatorIframe.vue`, `src/components/CasinoEmbedd.vue`, `src/components/CasinoHeader.vue`, `src/components/CasinoToggle.vue`, `src/components/casino/CasinoHeroBanner.vue`, `src/components/ErrorLaunchingGame.vue`

- [ ] **Step 1:** Apply shared sweep procedure. (Iframe wrappers: only the surrounding chrome — the embedded game iframe content is third-party and out of scope; note any iframe that can't be themed.)
- [ ] **Step 2: Lint** → no errors. **Step 3: Build** → PASS.
- [ ] **Step 4: Batch grep gate** over the 10 files → **0 lines**.
- [ ] **Step 5: Visual check** — casino home, a game launch, aviator header, dark+light.
- [ ] **Step 6: Commit** — `refactor(theme): re-tokenize casino & games components` + trailer.

---

### Task 11: Sweep — Auth, account, wallet & header (12 files)

**Files (Modify):** `src/views/TheAuth.vue`, `src/components/VerifyAccount.vue`, `src/components/SelfExclusionForm.vue`, `src/components/DepositModal.vue`, `src/components/WithdrawFunds.vue`, `src/components/MpesaPaybillDeposit.vue`, `src/components/HeaderLinks.vue`, `src/components/HeaderProfile.vue`, `src/components/PeekNav.vue`, `src/components/profile/ProfileLinks.vue`, `src/components/profile/UserInfo.vue`, `src/views/WelcomeGift.vue`

- [ ] **Step 1:** Apply shared sweep procedure to all 12 files.
- [ ] **Step 2: Lint** → no errors. **Step 3: Build** → PASS.
- [ ] **Step 4: Batch grep gate** over the 12 files → **0 lines**.
- [ ] **Step 5: Visual check** — login/register modal, deposit & withdraw modals, header/profile, dark+light.
- [ ] **Step 6: Commit** — `refactor(theme): re-tokenize auth, wallet & header components` + trailer.

---

### Task 12: Sweep — Bonus / boost / VIP (gold→amber heavy) (8 files)

**Files (Modify):** `src/components/bonus/BonusCard.vue`, `src/components/bonus/BonusHeader.vue`, `src/components/bonus/MissionsSection.vue`, `src/components/bonus/ReferralSection.vue`, `src/components/BoostBonusLevel.vue`, `src/components/BoostBonusStrip.vue`, `src/components/BoostCard.vue`, `src/components/MultibetBoostPromo.vue`

- [ ] **Step 1:** Apply shared sweep procedure. **Pay special attention to gold→amber:** every old gold/`#f97316`/`#ffb002`/`*-yellow-*` becomes `text-gold`/`bg-gold` (now amber). No raw gold hex remains.
- [ ] **Step 2: Lint** → no errors. **Step 3: Build** → PASS.
- [ ] **Step 4: Batch grep gate** over the 8 files → **0 lines**.
- [ ] **Step 5: Visual check** — bonus cards, boost strip, missions, dark+light; confirm premium reads amber not gold.
- [ ] **Step 6: Commit** — `refactor(theme): re-tokenize bonus/boost (gold→amber)` + trailer.

---

### Task 13: Sweep — Promos & promo strips (8 files)

**Files (Modify):** `src/components/promos/HakiLeagueFreebets.vue`, `src/components/promos/InviteFriendsPromo.vue`, `src/components/promos/JengaBetsPromotion.vue`, `src/components/promos/LeaderboardPromo.vue`, `src/components/promos/PromoIndex.vue`, `src/components/promo-strip/DownloadAppStrip.vue`, `src/components/promo-strip/HakiLeaguePromoStrip.vue`, `src/components/promo-strip/RandomWinner.vue`

- [ ] **Step 1:** Apply shared sweep procedure to all 8 files.
- [ ] **Step 2: Lint** → no errors. **Step 3: Build** → PASS.
- [ ] **Step 4: Batch grep gate** over the 8 files → **0 lines**.
- [ ] **Step 5: Visual check** — promo index, strips, dark+light.
- [ ] **Step 6: Commit** — `refactor(theme): re-tokenize promo components` + trailer.

---

### Task 14: Sweep — Festive event + ThePromos/HotSection (9 files)

**Files (Modify):** `src/views/festive/FestiveRewards.vue`, `src/views/festive/FestiveTabs.vue`, `src/views/festive/GrandPrize.vue`, `src/views/festive/HowToWin.vue`, `src/views/festive/InviteFriends.vue`, `src/views/festive/MyStats.vue`, `src/views/festive/RewardsTab.vue`, `src/components/ThePromos.vue`, `src/components/HotSection.vue`

- [ ] **Step 1:** Apply shared sweep procedure to all 9 files.
- [ ] **Step 2: Lint** → no errors. **Step 3: Build** → PASS.
- [ ] **Step 4: Batch grep gate** over the 9 files → **0 lines**.
- [ ] **Step 5: Visual check** — festive tabs/rewards, hot section, dark+light.
- [ ] **Step 6: Commit** — `refactor(theme): re-tokenize festive & promo sections` + trailer.

---

### Task 15: Sweep — Remaining components, views & composables (8 files)

**Files (Modify):** `src/components/InfiniteScroll.vue`, `src/components/affiliate/AffiliateReferrals.vue`, `src/components/haki-league/FooterNav.vue`, `src/views/NotFound.vue`, `src/views/home/TheCategories.vue`, `src/composables/useMainCategories.js`, `src/composables/usePromos.js`, `src/composables/useSports.js`

- [ ] **Step 1:** Apply shared sweep procedure. Composables: replace JS color string literals with `var(--token)` strings (these feed `:style`/inline styles); if a literal is passed to a charting/3rd-party API that needs a concrete value, resolve it via `getComputedStyle(document.body).getPropertyValue('--token')` and note it inline.
- [ ] **Step 2: Lint** → no errors. **Step 3: Build** → PASS.
- [ ] **Step 4: Batch grep gate** over the 8 files → **0 lines**.
- [ ] **Step 5: Commit** — `refactor(theme): re-tokenize remaining components & composables` + trailer.

---

### Task 16: Global verification & QA

**Files:** none (verification only)

- [ ] **Step 1: Global brand-signature gate**

Run: `/tmp/brandgrep.sh src | wc -l`
Expected: **0**. If non-zero, run `/tmp/brandgrep.sh src`, fix each remaining file per the mapping, rebuild, commit `fix(theme): clear remaining brand signatures`, and re-run until 0.

- [ ] **Step 2: Build & lint clean**

Run: `pnpm run build` (PASS) and `npx eslint src/` (no errors).

- [ ] **Step 3: WCAG-AA contrast check (spec §9 matrix)**

For both themes verify ≥4.5:1 (text) / ≥3:1 (UI) on these token pairs (use any contrast tool with the hex values from Tasks 1–2): foreground/background, muted-foreground/background, primary-foreground/primary, destructive-foreground/destructive, gold-foreground/gold, text-subtle/card, selected-odds text/fill. Record results; if a pair fails, adjust only that token value in `src/style.css`, rebuild, commit `fix(theme): tune <token> for AA contrast`.

- [ ] **Step 4: Visual QA matrix (spec §9), dark + light**

`pnpm dev`; walk: home, sports list, live, betslip, casino home, auth modal, bonus/VIP, account, datepicker popover, a SweetAlert toast. Confirm no navy/old-green/gold remnants, no unreadable text. Note any betting iframe that renders un-themed (out of scope, document only).

- [ ] **Step 5: Final commit & branch ready**

```bash
git add -A && git commit -m "test(theme): verification pass — brand-signature gate 0, AA, visual QA

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>" 2>/dev/null || echo "nothing to commit"
git log --oneline devel..HEAD | wc -l   # sanity: ~16+ commits on the branch
```

The branch `feat/emerald-pitch-rebrand` is now ready for PR/merge (handled by the finishing-a-development-branch skill, not this plan).

---

## Self-review notes

- **Spec coverage:** §4→T1, §5→T2, §6 gold-retirement→T1/T2 (token repoint) + T3 (gold gradients) + T12 (component gold→amber), §7→T3+T4, §8 sweep→T5 mapping + T6–T15 (all 99 files listed, none duplicated), §9 verification→T16, §10 out-of-scope honored (red retained, no layout change), §11 risks (batched + grep gate + contrast matrix), §12 order→tasks ordered foundational/high-traffic first.
- **Placeholder scan:** every file path explicit; mapping is a concrete committed artifact (T5) referenced by path, not "similar to Task N"; no TBD/TODO.
- **Consistency:** the brand-signature regex is identical in `/tmp/brandgrep.sh` (T0) and the spec §9 gate; token hex values match the spec §4/§5 tables exactly.
- **Coverage check:** 17+9+9+9+10+12+8+8+9+8 = **99** swept files + `src/style.css` (T1–T4) = full inventory.
