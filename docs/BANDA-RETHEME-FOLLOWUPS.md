# BANDA retheme — known residuals

Everything below was found during the retheme, judged deliberately, and left
undone. None of it blocks the colour work; all of it is real. Recorded here so
it is not rediscovered from scratch.

Related: `docs/superpowers/specs/2026-08-04-banda-retheme-design.md`,
`docs/superpowers/plans/2026-08-04-banda-retheme.md`.

## Not done, ranked by what a user would notice

### 1. Nobody has looked at the running app

The plan's visual pass never ran — the browser tooling was unavailable in the
session that did the work. Every contrast claim in this retheme comes from
static analysis of resolved `var()` chains. That analysis found three Critical
defect classes, which is direct evidence the visual pass is worth doing rather
than a formality. **Do this before merging to production.** Check home, a
sports league page, the betslip with a selection, and casino — in both themes.

### 2. `CompetitionsLayout.vue:42,70` — 4.35:1 in dark

`bg-brand-mid text-primary-foreground` on a badge. 0.15 short of AA. Every
alternative token either matches 4.35 or breaks the light theme (2.04–2.87).
Closing it needs a new layer-2 foreground token, which was outside the
colour-token scope.

### 3. Dark-theme purple-remap icons — 2.44:1

Layer 3 points `*-purple-500` at a mid gold to keep light theme legible
(2.09 → 7.10). Dark theme moved the other way: 3.60 → 2.44. Affects four icon
sites (`SportsIcons.vue:335`, `DepositBonusTable.vue:18`,
`FreebetContent.vue:98`, `promo-strip/HakiLeaguePromoStrip.vue:13`) and one
text span (`HakiLeaguePromoStrip.vue:16`, 2.87:1).

Note dark theme was *already* sub-AA here before the retheme (3.60 and 2.68),
so this is a small slip, not a new break. A warm gold readable on coffee is
unreadable on white and vice versa — no single ramp step satisfies both. The
real fix is `dark:` variants at those five call sites.

### 4. Five components with off-token hex literals

Never followed the retheme because they bypass the token system:

| File | Literal | Assessment |
|---|---|---|
| `ThePopular.vue:176` | `#504b5c` | Near-black divider on a white card in light theme. Looked equally wrong before the retheme — not caused by it. |
| `promos/ui/PromoStat.vue:47` | `color-mix(--brand-teal 60%, #6ad0ff)` | Now mixes a near-black brown with sky blue into a muddy navy. The `#c08442` on line 44 is *more* in-family than before. |
| `promos/ui/PromoCta.vue:29` | `#eafbef` | **Safe.** Sits on `--brand-forest` (coffee-950) at 16.8:1. Reads as faintly mint-tinted white. |
| `HotSection.vue:910` | `#4a4e51` | Cool-gray fill inside a soccer-ball SVG. Invisible-grade. |
| `DarkBorderDivider.vue:13-14` | `#09070d` / `#E5E7EB` | See below — the hex is not the real bug. |

Sixteen further files hold hexes in SVG icon and logo fills. Those are
intentionally off-system and should stay that way.

### 5. `DarkBorderDivider.vue` tracks the wrong theme signal

Line 10 calls bare `useDark()`, which defaults to vueuse's
`html` / `class` / `dark` convention — not this app's `body[data-theme]`. It
therefore follows the OS preference, so on a light-OS machine it paints the
light divider even while the app is in dark theme. One usage site
(`DesktopEventCard.vue:110`). Pre-existing logic bug, unrelated to colour,
worth its own ticket.

### 6. `pink` is the one Tailwind family with no remap block

Seven usages render stock Tailwind pink: `useSports.js:194` (Darts icon),
three gradient hovers in `useMainCategories.js`, `FreebetContent.vue:79`. It
clashes harder with coffee/gold than it did with purple. `CLAUDE.md`'s claim
that there is no off-system Tailwind colour is not quite true until this is
remapped.

### 7. Dead markup

`RoadBlockModal.vue:125-138` is inside an HTML comment and never renders. Its
colour class was corrected anyway. Either delete the block or revive it.

### 8. Utility-layer collisions

`badge-tint-primary` / `badge-tint-gold` and `text-gradient-gold` /
`text-gradient-primary` are now pixel-identical, since `--primary` and
`--gold` both resolve to gold-500. Zero component usage today, so no live
impact, but the utility layer no longer distinguishes brand from jackpot.

## Deliberately out of scope

The colour half of `DESIGN.md` is implemented. Two halves are not:

- **Typography.** The spec calls for Poppins across six type roles. The app
  still loads Inter + Montserrat (`nuxt.config.js:349`).
- **Density.** 8px gutters, 8px/4px betting-cell padding, 32px table rows, the
  12-column desktop grid. All require component markup changes.
