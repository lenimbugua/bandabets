# Mobile Header Restructure (Unauthenticated) — Design

**Date:** 2026-08-05
**Status:** Approved
**Scope:** Mobile (`lg:hidden`) block of `app/components/HeaderLinks.vue` only. Desktop block untouched. No color/token changes — reuse existing semantic classes. First section of a section-by-section mobile landing-page restructure toward the reference design.

## Goal

Match the reference header: hamburger + logo on the left, plain "Log In" text link and pill "Join Now" button on the right, with a full-width rounded search bar underneath.

## Row 1 — top bar

- Left: hamburger button + `TheLogo` — unchanged.
- Right, unauthenticated:
  - "Log In" — plain bold text link (no border/background box), label changed from "Login" to "Log In". Still routes to `login`.
  - "Join Now" — pill shape (`rounded-full`), keeps current `bg-bet` / `text-bet-foreground` colors, title case (no uppercase transform).
- Authenticated state (`HeaderProfile`) left exactly as-is.
- `TopModeSwitch` removed from the mobile row — the upcoming tabs row (All Sports / Casino / Slots / Virtuals / Promotions) takes over mode switching. It previously only showed at 640–1024px. Desktop block keeps it.

## Row 2 — search bar (new)

- Full-width tap target styled as a `rounded-full` field on `bg-surface-elevated`: magnifier icon left, muted placeholder text "Sport Team, Football League, Games" (`text-muted-foreground`), and a "Search" label pinned right in `text-brand-bright`.
- Tapping anywhere calls `openModal(search)` — the existing globally-mounted `SearchModal` (via `CollectAllModals`) handles input and results. No new search logic.
- `HeaderLinks` is shared, so the search row appears on all mobile pages, matching the reference app's behavior.

## Out of scope

- Category tabs row, banners, quick links, and all sections below the header (later sections).
- Authenticated header state.
- Any palette/semantic token edits.
