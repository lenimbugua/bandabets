# Mobile Footer Nav — Design

**Date:** 2026-08-06
**Status:** Approved
**Scope:** Section 5 of the mobile landing restructure. Rebuild `app/components/mobile/MobileFooterV2.vue`. Existing tokens only.

## Tabs (flat 5, reference layout — center orb removed)

Home → `home` · Casino → `casino-home` · Promos → `promotions` · My Bonuses → `bonus` · My Bets → `my-bets`

- Inline `currentColor` SVG glyphs (house, spade, megaphone, gift, clipboard) so active state colors the icon, matching the reference.
- Active = icon + label in `text-brand-bright`; inactive = muted foreground. Route-aware via `route.name` (casino also active on `casino-game`; promos also on `promotion-details`).
- Profile leaves the footer (header profile + drawer cover it).

## Floating betslip pill (replaces the orb)

Fixed above the footer, `xl:hidden`, rendered only when `betslipLength > 0`: count in a `bg-betslip` badge + total odds in bold, on a `bg-bet` gold pill. Tap = existing `openBetslip` flow (verify + modal + data layer). Carries `data-fly-target="betslip"`; the fly animation no-ops gracefully on the first selection (pill not yet mounted) per `useFlyToBetslip`'s missing-target guard.

## Removed

Support FAB comment block and unused icon-asset imports for the retired tabs.
