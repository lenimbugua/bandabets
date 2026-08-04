# Betslip Redesign — Design

**Date:** 2026-05-21
**Status:** Draft (awaiting user review)
**Surfaces:** Desktop sticky panel + mobile bottom-sheet modal
**Approach:** Reskin in place (option A from brainstorm)

## Goal

Reshape the Sports betslip UI to match the layout of a reference design (promotional boost banner → MULTI BET header with inline share → bet rows → total odds → bet amount stepper → boost awarded band → possible win band → REMOVE ALL + PLACE BET footer) while staying on the Emerald Pitch palette tokens. No store, composable or API changes — this is presentation only.

## Non-goals

- No changes to `useBetslipStore`, `useBetslip`, `useMultibetBonus`, `useTax`, `useOneCut` APIs or state shape.
- No new bet-placement, share, or boost behaviour — just relocation and restyling.
- No per-leg min-odds (1.30) warning surfacing — the boost composable already excludes failing legs; surfacing that per-row is out of scope.
- No `⋮` header menu (decided against in brainstorm).
- No changes to `EmptyBetslip` content (BetslipLoadCode stays) other than light styling.

## Architecture & component tree

```
SportsBetslipPanel.vue          desktop sticky shell        edit
BetslipModal.vue                mobile bottom-sheet shell   edit
└─ SportsBetslip.vue            shared inner                edit
   ├─ EmptyBetslip.vue          no-bet state                edit (light restyle)
   │  └─ BetslipLoadCode.vue                                unchanged
   ├─ MultibetBoost.vue         promo boost banner          redesign
   ├─ BetslipMultiHeader.vue    NEW                         add
   │  · "MULTI BET (N)" / "SINGLE BET" on the left
   │  · "Share" pill on the right (hosts share API)
   ├─ list
   │  ├─ BetslipMatchDetails.vue       single bet row       restructure
   │  └─ BetslipBetbuilderDetails.vue  builder row          restructure
   └─ BetControls.vue           footer stack                redesign
      ├─ TOTAL ODDS row
      ├─ BET AMOUNT (KSH) row + TheStake inline stepper    TheStake edit
      ├─ BetslipBonus.vue        Boost Awarded band         restyle
      ├─ OneCutWin.vue           1-Cut row (conditional)    restyle
      ├─ PossibleWin.vue         Possible Win band          restyle
      └─ Action bar: REMOVE ALL + PLACE BET                 restructure
```

Responsibility shifts:

- The panel/modal header keeps only the title + close. The existing "Clear All" link in those headers is removed; clearing now lives in the footer as a primary `REMOVE ALL` button.
- Share moves out of `BetControls` into a new tiny `BetslipMultiHeader` row at the top of the selections. `ShareBetslipButton` is retired as a discrete bottom button; its API call logic is reused inside `BetslipMultiHeader`.
- `TheStake` drops its quick-pill row and exposes only `− [stake] +`.
- `MultibetBoost` changes from a compact pill to a full promotional card (gift icon + two-line copy + thin progress).
- `BetslipBonus` (Boost Awarded) and `PossibleWin` become full-width tonal bands instead of inline label/value rows.

What stays the same:

- All Pinia store state, getters and actions (`useBetslipStore`).
- All composables (`useBetslip`, `useMultibetBonus`, `useTax`, `useOneCut`).
- Per-row status bars (odds boosted/dropped, deactivated).
- Sibling-replacement logic, deactivated-button swap, login fallback.
- Pinia persist keys (`betslip`, `stake`, `bookingCode`).

## Layout & token mapping

All values use Emerald Pitch tokens — no hardcoded purple/teal/navy/hex/oklch.

### Shell (panel + modal)

- Container: `bg-card border-border`, rounded `rounded-xl` (panel) / `rounded-t-2xl` (modal).
- Header band: `bg-surface-deepest text-foreground` — `BETSLIP` `text-sm font-extrabold tracking-wider`. Right side: close `×` only.
- Body: `bg-background`.

### Promo boost banner (`MultibetBoost.vue`)

- Card: `bg-gold text-gold-foreground border border-gold-deep rounded-xl p-4`.
- Line 1: `Your Multibet of {N} selections gives you a boost of {X}% (KSH {Y})` — `text-sm font-semibold`.
- Line 2: gift icon + `Add {legsToNext} more to get a {nextBoost}% boost!` — `text-base font-extrabold`.
- Sub-line: `1.3 minimum odds per game` — `text-gold-foreground/80`.
- Thin progress bar under the copy: track `bg-gold-deep/30`, fill `bg-gold-foreground`, width `min(getCurrentBoost() * 2, 100)%` (existing math).
- At max tier (30): drop the "Add more" line, show `Max boost unlocked`.
- Hidden when `betslipLength < 2`.

### `BetslipMultiHeader.vue` (new)

- `bg-surface-elevated border-y border-border px-3 py-2 flex items-center justify-between`.
- Left: `MULTI BET ({{ betslipLength }})` (when `length > 1`) or `SINGLE BET` (when `length === 1`) — `text-xs font-extrabold tracking-wider text-foreground`.
- Right: pill button `bg-card border border-border hover:bg-surface-interactive text-foreground rounded-md px-3 py-1.5 text-xs font-bold` with share-arrow svg + `Share` label.
- Calls existing `shareBetslip` (sharebet store). Unauthenticated falls back to login modal via the existing path.
- Hidden when `betslipLength === 0`.

### Bet row (`BetslipMatchDetails.vue` restructured)

```
[⚽][ Home – Away ................................ X ]
[    Double Chance                                  ]
[    Your Pick: 1 or X .................. 3.80     ]
```

- Sport icon: `getSportsIcon(sportBinomen)` in a `w-5 h-5` slot at the top-left.
- Teams: `text-sm font-bold text-foreground` next to the icon.
- Delete: `text-destructive` (token confirmed present in `src/style.css`).
- Market name (`oddType`): `text-xs text-muted-foreground`.
- Pick line: `Your Pick: ` muted, outcome name `font-bold text-foreground`; odds value on right `text-sm font-extrabold text-foreground` (no green pill).
- Live badge: red dot + `LIVE` (existing component / style).
- Status bars below the row stay unchanged.

### Builder row (`BetslipBetbuilderDetails.vue`)

- Same row frame. Middle slot lists the builder legs via existing `BetBuilderSelections`. `Builder` badge `bg-primary/10 text-primary` at top-left.

### Footer stack (`BetControls.vue`)

```
TOTAL ODDS:                                  96.33
BET AMOUNT (KSH):              [ − ][100.00 ][ + ]
─────────────────────────────────────────────────
BOOST AWARDED                       KSH 285.99      ← gold band, conditional
1-CUT                                KSH XX.XX      ← primary tint band, conditional
POSSIBLE WIN                        KSH 9,818.99    ← dark band, value gold-bright
[ REMOVE ALL ]              [ PLACE BET ]
```

- Rows 1 & 2: `px-3 py-2 text-sm font-semibold text-foreground`; labels uppercase muted (`text-muted-foreground`).
- Stepper: `TheStake.vue` → `inline-flex items-center gap-1 border border-border rounded-md`. Buttons `w-8 h-8 hover:bg-surface-interactive`, input centred `tabular-nums` width ~80px. Disabled when `pending` or empty.
- Boost band: `bg-gold text-gold-foreground px-3 py-2 flex justify-between text-xs font-extrabold tracking-wider`. Hidden when boost is 0.
- 1-Cut band (when eligible): `bg-primary/15 text-foreground` same proportions. Driven by existing `isOneCutQualified()`.
- Possible Win band: `bg-surface-deepest text-foreground` with amount `text-gold-bright text-lg font-extrabold`. Click target stays — tax-breakdown popover unchanged.
- Actions: `grid grid-cols-2 gap-2 p-3 bg-surface-elevated border-t border-border`:
  - `REMOVE ALL`: `bg-surface-interactive text-muted-foreground hover:text-destructive hover:bg-destructive/10 font-bold rounded-lg py-2.5`. Calls `clearBetslip`.
  - `PLACE BET`: `bg-primary text-primary-foreground font-extrabold rounded-lg py-2.5`. Becomes `REMOVE DEACTIVATED` (destructive variant) when any item has `status !== 1`, or `LOGIN TO PLACE BET` when not authenticated.

### Empty state (`EmptyBetslip.vue`)

- Layout unchanged structurally. Tokens swept: `bg-card`, `text-foreground`, `text-muted-foreground`, `border-border`. `BetslipLoadCode` retained.
- Footer renders the new actions but `PLACE BET` is disabled (existing `pending`/empty checks).

### Token substitution table

| Visual role (reference) | Token |
|---|---|
| Purple boost banner | `bg-gold` + `text-gold-foreground` |
| Dark navy header / Possible Win band | `bg-surface-deepest` + `text-foreground`; amount `text-gold-bright` |
| Light grey "MULTI BET" strip | `bg-surface-elevated border-y border-border` |
| Red delete `X` | `text-destructive` |
| Place bet (light/blue) | `bg-primary text-primary-foreground` |
| Remove All (grey) | `bg-surface-interactive text-muted-foreground` |
| Big possible-win amount (yellow) | `text-gold-bright` |

## Data flow

```
useBetslipStore   → betslip[], betslipLength, totalOdds, stake, possibleWin, pending
                  ← setStake, deleteAnItemFromBetslip, clearBetslip,
                    removeDeactivatedMatches, placeBet, verifyBetslip

useMultibetBonus  → getCurrentBoost(), getNextBoost(),
                    getLegsToNextBonus(), calculateBoostBonus(possibleWin)

useBetslip        → calculateTotalOdds, calculatePossibleWin,
                    calculatePotentialWin

useTax / useOneCut → tax popover + 1-Cut row
useLoginStore     → isAuthenticated (drives Place Bet label)
```

- `MultibetBoost` reads `betslipLength`, `getCurrentBoost`, `getNextBoost`, `getLegsToNextBonus`, `calculateBoostBonus(possibleWin)`.
- `BetslipMultiHeader` reads `betslipLength`; calls `shareBetslip` via the existing share store.
- `BetControls` keeps current store wiring: `setStake`, `placeBet`, `removeDeactivatedMatches`, `clearBetslip`. `REMOVE ALL` calls `clearBetslip` — same action the panel/modal header used to invoke.
- `TheStake` still emits `setStake(payload)`; only template simplifies.
- `BetslipMatchDetails` and `BetslipBetbuilderDetails` keep their `item / index / deleteAnItemFromBetslip` contract.

## State-dependent UI rules

| Condition | Visible effect |
|---|---|
| `betslipLength === 0` | `EmptyBetslip` renders; promo banner + multi header hidden; footer keeps `BET AMOUNT` row + disabled `PLACE BET`. |
| `betslipLength === 1` | Banner hidden (boost requires ≥ 3 with min odds); header label `SINGLE BET`. |
| `betslipLength >= 2` but below boost floor | Banner shows "Add {legs} more to get {next}% boost!"; Boost Awarded band hidden. |
| At a boost tier | Banner shows current boost; Boost Awarded band visible with `calculateBoostBonus(possibleWin)`. |
| At max tier (30) | Banner shows `Max boost unlocked`; Boost Awarded band visible. |
| Any item `status !== 1` | Per-row red status bar; bottom `PLACE BET` swaps to `REMOVE DEACTIVATED`. `REMOVE ALL` stays. |
| Item `deviation !== 0` and `status === 1` | Per-row tonal band: `bg-primary/10 text-primary` (boost), `bg-destructive/10 text-destructive` (drop). |
| `pending === true` | `PLACE BET` shows inline spinner; `REMOVE ALL` disabled; stepper disabled. |
| `isAuthenticated === false` | `PLACE BET` becomes `LOGIN TO PLACE BET`; clicking opens login then queues `placeBet` via existing `setAfterLoginAction`. |
| Possible Win clicked | Existing tax-breakdown popover unchanged. |
| 1-Cut row | Gated on `isOneCutQualified()`. |
| Share clicked while unauthenticated | Existing `showNoBetError` → login flow preserved. |

## Error handling

- `placeBet` errors continue through current channels (`fieldErrors`, `nonFieldErrors`, `betPlaceError`, `setBetPlaceMessage`). No new error surface.
- `shareBetslip` network failures surface via existing toast/modal; `BetslipMultiHeader` only delegates.
- Stepper boundaries stay in `TheStake` (current floor `1`, current ceiling logic).

## Edge / regression checklist

1. Both surfaces render the new inner correctly (mobile bottom-sheet + desktop sticky panel).
2. Pinia persist keys (`betslip`, `stake`, `bookingCode`) unchanged; refresh restores state.
3. Builder rows still display via `BetBuilderSelections`; delete keyed by `customId`.
4. Deactivated path: `PLACE BET` ↔ `REMOVE DEACTIVATED` swap works; `REMOVE ALL` still functions.
5. Boost transitions when adding the 3rd / 5th / 10th leg update banner copy and Boost Awarded band atomically (driven by computed).
6. Login fallback: `LOGIN TO PLACE BET` queues `placeBet` after login.
7. Light + dark mode both readable (surface tokens already define both).
8. No raw colors in touched files — grep for `oklch(`, `#`, `rgb(`, `rgba(` in the diff returns nothing in JS/Vue templates; only `color-mix(in oklch, var(--token) …)` allowed where a real tint is needed.

## Files touched (anticipated)

- `src/components/SportsBetslipPanel.vue` — header simplified, Clear All removed.
- `src/components/BetslipModal.vue` — header simplified, Clear All removed.
- `src/components/SportsBetslip.vue` — slot in `BetslipMultiHeader`.
- `src/components/MultibetBoost.vue` — full redesign per layout.
- `src/components/BetslipMultiHeader.vue` — NEW.
- `src/components/BetslipMatchDetails.vue` — row restructure.
- `src/components/BetslipBetbuilderDetails.vue` — row restructure.
- `src/components/BetControls.vue` — footer stack restructure.
- `src/components/TheStake.vue` — drop quick-pill row, inline stepper only.
- `src/components/BetslipBonus.vue` — restyle to gold band.
- `src/components/PossibleWin.vue` — restyle to dark band; amount in `text-gold-bright`.
- `src/components/OneCutWin.vue` — restyle to primary tint band.
- `src/components/EmptyBetslip.vue` — token sweep + plug new footer.
- `src/components/ShareBetslipButton.vue` — retired as standalone button (logic inlined into `BetslipMultiHeader`).

## Out of scope (explicit)

- Booking-code load while a slip is in progress (no `⋮` menu).
- Per-leg min-odds warning UI.
- Tax-toggle preference.
- New analytics events.

## Tokens confirmed in `src/style.css`

`--destructive`, `--destructive-foreground`, `--gold`, `--gold-bright`, `--gold-deep`, `--gold-foreground`, `--primary`, `--primary-foreground`, `--surface-elevated`, `--surface-interactive`, `--surface-deepest`, `--card`, `--border`, `--foreground`, `--muted-foreground` are all defined for both `:root` (dark) and `[data-theme="light"]`. No new tokens needed.
