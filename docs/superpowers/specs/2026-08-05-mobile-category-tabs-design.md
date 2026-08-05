# Mobile Category Tabs Row — Design

**Date:** 2026-08-05
**Status:** Approved
**Scope:** Section 2 of the mobile landing restructure. Restyle `app/components/mobile/CategoryPills.vue` in place (shared under-header nav on landing, casino-home, promotions, live) and add a header-tabs list to `app/composables/useMainNav.js`. No color/token changes; desktop nav untouched.

## Tab set

All Sports · Casino · Slots · Virtuals · Promotions

- All Sports → home (active on home, sports, country, countries, match-details, live)
- Casino → `casino-home?category=all` (active on casino-home/casino-game unless another tab claims the query)
- Slots → `casino-home?category=slots` (claims `slots`)
- Virtuals → `casino-home?category=virtuals` (claims `virtuals`)
- Promotions → promotions (active on promotions, promotion-details)

Exported as `headerTabCategories` plus a `useHeaderTabs()` composable in `useMainNav.js`, with its own claimed-query-category list so `mainNavCategories` (still used by the desktop header nav) keeps its exact behavior.

## Visual

Flat text tabs replacing the icon pills: bold labels, horizontal scroll, active tab in `text-brand-bright` with a rounded 2px underline pinned to the bar's bottom edge; inactive tabs plain `text-foreground`. Icons and the sticky MENU button are removed — hamburger drawer and the quick-access icon row cover that navigation. Bar keeps `bg-surface-elevated border-b border-border` and its existing sticky prop/offsets.

## Dropped from the row

Home, Aviator, Live, Support — covered by the bottom nav, the quick-access icon row, and the drawer respectively.

## Known follow-up

The sticky `top-22 md:top-14` offsets on non-landing pages were tuned for the old single-row header; the new taller header (search row) likely needs these re-measured in a browser polish pass.
