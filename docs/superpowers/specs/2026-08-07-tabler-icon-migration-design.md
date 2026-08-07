# Tabler Icon System Migration — Design Spec

**Date:** 2026-08-07
**Status:** Approved (pending spec review)

## Problem

The app currently mixes three icon languages: `@heroicons/vue` (38 distinct icons across ~98 import sites, split between 24/outline, 24/solid, 20/solid, and 16/solid variants), `lucide-vue-next` (19 distinct icons in 11 files), and hand-rolled SFC icons. Heroicons' outline and solid sets have different visual weights, and Lucide's 2px rounded stroke differs from both. The result reads as visually inconsistent — the opposite of the BANDA High-Velocity ("Modern Corporate with High-Density") direction, whose elevation system is built on hairline borders and micro-shadows.

Heroicons (~300 icons) also lacks sports/casino/wallet coverage, which is why Lucide and custom SFCs crept in. Tabler (~5,900 icons, including sports balls, cards, dice, coins, wallet, trophy) removes the reason to mix sets.

## Decision

Adopt **Tabler Icons** as the single UI icon set, delivered through the **`@nuxt/icon`** module, and migrate all Heroicons and Lucide usages to it in one sweep. Remove both old dependencies afterward.

## Design

### 1. Delivery mechanism

- Add the `@nuxt/icon` module to `nuxt.config.js` and `@iconify-json/tabler` as a dev dependency.
- Bundle the Tabler collection locally (server bundle) so icons resolve at build/SSR time with **zero runtime calls to the Iconify CDN** — the app runs as an SSR Node server in GKE and must not depend on external icon fetches.
- Usage everywhere: `<Icon name="tabler:wallet" class="size-5" />`. The `<Icon>` component is auto-registered by the module — no imports, matching the project's auto-import convention.

### 2. Visual standard

- **Outline style only** as the default.
- A global customize hook in the icon configuration rewrites Tabler's default `stroke-width="2"` to **`1.5`**, so icons sit on the same visual weight as the design system's hairline borders. (Exact config surface — module option vs. app config — to be confirmed against the installed `@nuxt/icon` version during implementation.)
- **Filled variants** (`tabler:*-filled`) are reserved exclusively for active/selected states (e.g. the mobile footer nav's current tab).
- **Sizing** via Tailwind classes on the component: `size-4` inline with text, `size-5` for buttons/nav, `size-6` maximum.
- **Color** always via `currentColor`: semantic text tokens (`text-muted-foreground`, `text-primary`) drive icon color; never hard-code icon colors.

### 3. Migration

- Build one mapping table from the 38 distinct Heroicons + 19 distinct Lucide icons to Tabler equivalents (e.g. `XMarkIcon` → `tabler:x`, `ChevronDownIcon` → `tabler:chevron-down`, `Wallet` → `tabler:wallet`).
- Solid Heroicons usages (~26 `20/solid`, ~22 `24/solid`, 1 `16/solid`) migrate to **outline** by default. Solid was mostly an artifact of Heroicons' 20px set being solid-only, not a deliberate state signal. Only usages that genuinely encode an active/selected state keep a `-filled` Tabler variant.
- Sweep all ~100 affected files: remove the icon imports, replace component tags with `<Icon name="tabler:...">`, preserving each usage's existing classes and event bindings.

### 4. Cleanup

- Remove `@heroicons/vue` and `lucide-vue-next` from `package.json` once a repo-wide grep confirms zero remaining imports.

### Non-goals

- The two components in `app/components/icons/` (`AppIcons.vue`, `HomeIcon.vue`) and the ~131 components containing inline SVGs (logos, sport glyphs, decorative art) are **out of scope**. They are not part of the mixed-icon-language problem this migration fixes.
- No changes to the design-token layers in `app/assets/css/style.css`.

## Verification

No test framework is configured, so verification is:

1. `pnpm build` passes.
2. `grep -r "@heroicons/vue\|lucide-vue-next" app/` returns nothing.
3. Dev-server visual pass over high-traffic screens (home, sports listing, betslip, mobile footer nav, profile): every icon renders. The main failure mode is a wrong Tabler icon name, which renders as an empty box, so the visual pass explicitly checks for missing glyphs.

## Failure modes considered

- **Wrong icon name in mapping** → blank icon. Caught by the visual pass; mapping table is reviewed against the Tabler catalog during implementation.
- **CDN dependency accidentally left on** → icons break in restricted prod egress. Prevented by bundling `@iconify-json/tabler` locally and verifying no `api.iconify.design` requests in the network panel during the visual pass.
- **Stroke override not applying** → icons render at 2px and look heavier than borders. Checked visually; the customize-hook API is confirmed against module docs during implementation.
