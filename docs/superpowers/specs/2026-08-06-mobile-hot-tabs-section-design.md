# Mobile Hot Tabs Section — Design

**Date:** 2026-08-06
**Status:** Approved
**Scope:** Section 4 of the mobile landing restructure. New `app/components/mobile/HotTabsSection.vue` in the landing hero after `QuickAccessBar`; the standalone `TopGames` strip moves inside it as the third tab. Additive `wide` variant on `TheButton2`. Desktop `HotSection` untouched. No color/token changes.

## Structure (per reference)

1. **Tab row:** Live · Codes · Top Games — inline SVG icon + bold label, active in `text-brand-bright`, inactive `text-foreground`, horizontal scroll.
2. **Chips row** (swaps with tab): pill chips with count badge. Active = `bg-brand-bright text-primary-foreground` with dark count bubble; inactive = elevated gray pill with muted count bubble.
   - Live → competitions from `getPreviewLiveMatches` (`previewMatches`), count = live match count, first selected by default.
   - Codes → bethub category pills (`useBookedBetsStore.fetchBethub`).
   - Top Games → casino category pills (`categoriesWithGames`).
3. **Cards row:** horizontal scroll-snap cards:
   - **Live:** league header; crest-placeholder circles (team initial — API has no crest imagery) + team names; center score + match clock/status; 1/X/2 odds via `TheButton2 variant="wide"` wired to betslip with `live=1`; card body opens match details.
   - **Codes:** category header, up to 3 selections, picks + total odds, Load button via `useLoadCode` (same flow as desktop HotSection).
   - **Top Games:** game artwork tiles launching via `useCasino().launchCasino` (same data as `TopGames`).

## TheButton2 `wide` variant

New optional `variant` prop (default `"stacked"`). `wide` lays the outcome label left and odds value right in one row, larger value type. No change to any existing usage or to the match-detail branch.

## Out of scope

Live section further down the page, footer, authenticated states.
