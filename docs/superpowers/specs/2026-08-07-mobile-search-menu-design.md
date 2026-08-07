# Mobile Header: Menu Button Beside Search — Design Spec

**Date:** 2026-08-07
**Status:** Approved (option selected via preview mockup)

## Problem

On mobile, `HeaderLinks.vue` has a hamburger menu (raw inline SVG) crowding Row 1 next to the logo, while Row 2's full-width search pill (also a raw inline SVG glyph) sits alone. The user wants the menu trigger flexed with the search bar using the design system's Tabler icons.

## Decision

In `app/components/HeaderLinks.vue`, **mobile section only** (`lg:hidden` block):

1. **Row 1** — remove the hamburger button entirely. Row 1 becomes logo + auth cluster.
2. **Row 2** — wrap the search pill and a new menu button in a flex row (`mt-2 flex items-center gap-2`). The search pill loses its own `mt-2` and `w-full` (becomes `flex-1 min-w-0`); everything else about it stays.
3. **New menu button** — square button matching the pill's surface (`w-11 h-11 rounded-full bg-surface-elevated hover:bg-accent`), containing `<Icon name="tabler:layout-grid" class="w-5 h-5 text-foreground" />`, `aria-label="Open navigation menu"`, wired to the existing `openModal(drawer)` (already destructured in the script — no script changes).
4. **Icon consistency** — the search pill's raw inline SVG glyph is replaced with `<Icon name="tabler:search" class="w-5 h-5 shrink-0 text-muted-foreground" />`.

Mockup (selected by user):

```
Row 1:  [LOGO]                    [Login] [Join]
Row 2:  [🔍 Sport Team, League...  Search] [⊞]
         ⊞ = tabler:layout-grid → opens nav drawer
```

## Non-goals

- Desktop section of HeaderLinks.vue unchanged.
- `TransparentHeader.vue` / `MobileHeaderV2.vue` (currently unreferenced by any layout) untouched.
- The drawer itself (TheDrawer.vue) unchanged.

## Verification

No test framework: `pnpm build` exits 0; dev-server SSR of `/` shows `tabler:layout-grid` and `tabler:search` in the header markup and no `<svg` remaining inside the mobile header block; one menu trigger total on mobile (hamburger gone).
