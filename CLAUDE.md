# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Naibet UI — a Vue 3 sports betting and casino web application for the Kenyan market, running on **Nuxt 4 with SSR**. Managed with pnpm; infrastructure (Docker/Nginx/GKE/GitLab CI) is owned by another team — see `docs/INFRA-HANDOFF.md` for what changed for them.

## Commands

- **Install dependencies:** `pnpm install`
- **Dev server:** `pnpm dev` (runs on port 5079)
- **Production build:** `pnpm build` (outputs to `.output/`)
- **Preview build:** `pnpm preview`
- **Start production server:** `node .output/server/index.mjs` (port 3000, `PORT` overrides)
- **Lint:** `npx eslint app/ server/`

No test framework is configured.

## Architecture

### Tech Stack
- **Nuxt 4** (Vue 3 Composition API with `<script setup>`) + **Vue Router** (file-based, via Nuxt pages) + **Pinia 4** via `@pinia/nuxt` (with persisted state via `pinia-plugin-persistedstate/nuxt`)
- Nuxt provides auto-imports natively: Vue APIs (`ref`, `computed`, `watch`, …), Nuxt composables (`useRuntimeConfig`, `useHead`, …), and everything under `app/composables/**` and `app/stores/**` are available globally without imports. The old `unplugin-auto-import`, `unplugin-vue-components`, and `@unhead/vue` packages are gone — Nuxt's built-in component auto-registration and `useHead`/`useSeoMeta` replace them.
- **Tailwind CSS 4** (CSS-first config in `app/assets/css/style.css`, no `tailwind.config.js`) with dark mode via a `@custom-variant` on `[data-theme="dark"]` (no TypeScript anywhere in the app)

### Path Alias
`@` maps to `./app` (Nuxt's `srcDir`, configured implicitly by Nuxt 4's `app/` convention — see `nuxt.config.js`). The legacy `src/` tree is Phase 2+ leftovers, not part of the build; nothing under `app/` may import from it.

### Key Directories

- **`app/pages/`** — File-based routing. Nuxt maps file paths to routes automatically (e.g. `app/pages/sports/[sport].vue` → `/sports/:sport`, `app/pages/sports/[sport]/[country]/[league].vue` → `/sports/:sport/:country/:league`). Dynamic route names not covered by real page files (Phase 2 backlog) are registered via the `pages:extend` hook in `nuxt.config.js`, which maps them onto `app/components/PhaseTwoPlaceholder.vue`.
- **`app/layouts/`** — Layout wrappers applied via `definePageMeta({ layout: ... })` or Nuxt's default-layout convention (`default.vue`), replacing the old route-wrapper components (`WithSibarAndBetslip`, `CasinoLayout`, `CrashIndex`, `TheAuth`).
- **`app/stores/`** — Pinia stores (46 stores), loaded via `@pinia/nuxt`'s `storesDirs`. Major ones: `login.js`, `sports-betslip.js`, `sports.js`, `casino.js`, `matches.js`, `live-matches.js`, `modal.js`. Persisted stores default to `localStorage`; `login.js` explicitly overrides to a cookie so the server can read the session.
- **`app/composables/`** — Reusable composition functions (60 files), auto-imported by Nuxt. Key ones: `useBetslip.js`, `useTax.js`, `useThemeSwitch.js`, `useModalTypes.js`, `useMixpanel.js`, `useSeoHead.js` (per-page SEO/JSON-LD).
- **`app/services/API.js`** — Axios factory that creates instances from `useRuntimeConfig().public`-sourced base URLs (was `import.meta.env.VITE_*`). Multiple backend services: matches, auth, bet, casino, virtual, affiliate, CMS, kiron-lite.
- **`app/middleware/`** — Nuxt route middleware (e.g. `tracking.global.js`). Distinct from `server/middleware/`, which runs on every server request (Nitro).
- **`server/`** — Nitro server code: `server/routes/version.json.js` (health check) and `server/middleware/phase2-match-details-noindex.js` (see `docs/PHASE-2-NOTES.md` for a critical caveat about that file).
- **`app/components/`** — Feature-organized Vue SFCs (auto-registered by Nuxt, no manual imports needed), with subfolders for major feature areas: `affiliate/`, `bonus/`, `cashout/`, `casino/`, `community-bets/`, `festive/`, `freebet/`, `games-links/`, `haki-league/`, `icons/`, `leaderboard/`, `live/`, `logos/`, `mobile/`, `new-league/`, `profile/`, `promo-strip/`, `promos/`, plus flat top-level components. There is no generic shadcn-vue `ui/` primitives folder or `components.json` in this repo — verified absent even at the pre-migration baseline.
- **`nuxt.config.js`** — `runtimeConfig.public` replaces `import.meta.env.VITE_*` (all keys renamed `VITE_*` → `NUXT_PUBLIC_*`, read at server start, not build time); `routeRules` sets per-route SSR/prerender behavior and noindex headers for unported Phase 2 pages.

### Design System

The whole visual system lives in **`app/assets/css/style.css`** (moved from `src/style.css` in the migration, byte-identical), specified by `DESIGN.md` (Naibet Core — "Modern Corporate Precision"). It is organised in four layers, and the rule is that **no literal colour may appear below layer 2**:

1. **Palette** — `--palette-{family}-{50..950}` in `:root`. Six ramps: Charcoal Slate (neutral), Naibet Purple (brand), Action Green (success/bet), Signal Red, Gold (jackpots), Tertiary Slate-Blue (informational). This is the only block containing hex values.
2. **Semantics** — role tokens (`--primary`, `--card`, `--surface-elevated`, `--border-strong`…) declared twice: `:root` is the dark theme (the default), `[data-theme="light"]` is the light theme. Both reference layer 1.
3. **Bindings** — `@theme` / `@theme inline` expose layers 1–2 as Tailwind utilities. Tailwind's stock ramps are **remapped onto the Naibet palette**, so legacy `bg-gray-800`, `text-blue-600`, `border-amber-400` etc. resolve to design-system colours automatically. There is no off-system Tailwind colour.
4. **Utilities** — composite classes (`elevation-1/2/3`, `accent-bar`, `badge-tint-*`, `bg-gradient-*`, `card-hover-lift`) built from the layers above.

**To retheme the app, edit layer 1 only.** Everything downstream — components, gradients, glows, datepicker, toasts, logos, keyframes — resolves through it. Editing layer 2 changes what a role *means* per theme (e.g. which purple step is `--primary` in dark).

Other conventions:
- **Type:** Montserrat (`font-display`, applied to `h1`–`h6` in base) for headings, Inter (`font-sans`) for body and data. Both loaded via `nuxt.config.js`'s `app.head.link` (Google Fonts stylesheet + preconnects) — `index.html` was deleted in the migration. Scale utilities: `text-display-lg`, `text-headline-lg`, `text-headline-md`, `text-body-lg`, `text-body-md`, `text-label-md`, `text-label-sm` — display/headline sizes are fluid via `clamp()`, so one class serves mobile and desktop.
- **Shape:** 4px soft base. `rounded-sm` 4px (standard: buttons, inputs, cards), `rounded-lg`/`rounded-xl` 8px (modals, large sections), `rounded-full` for status chips. The upper radius scale is deliberately compressed.
- **Elevation:** tonal layers plus micro-shadows, never heavy blur. Level 1 = hairline border, no shadow; Level 2 = hover; Level 3 = modals. Tailwind's `shadow-sm`…`shadow-2xl` are folded onto this scale, and shadow colour/opacity swap per theme via `--elevation-umbra` and `--elevation-alpha-*`.
- Prefer semantic tokens (`bg-card`, `text-muted-foreground`, `border-border`) over palette classes in new components.

### Environment Variables
All prefixed with `NUXT_PUBLIC_` and exposed via `runtimeConfig.public` in `nuxt.config.js` (renamed 1:1 from the old `VITE_*` names, same values). Nuxt reads them at **server start**, not build time, so no `sed` substitution step is needed anymore. **`.env` is gitignored** (it holds real dev/prod API URLs) and has never been committed; only `.env.example` (values stripped) is tracked in git. Do not commit `.env`. See `docs/INFRA-HANDOFF.md` for the full rename table.

Key env vars: `NUXT_PUBLIC_MATCHES_URL`, `NUXT_PUBLIC_AUTH_URL`, `NUXT_PUBLIC_BET_URL`, `NUXT_PUBLIC_CASINO_URL`, `NUXT_PUBLIC_VIRTUAL_URL`, `NUXT_PUBLIC_APP_VERSION`.

### Deployment
The app now runs as a Node server, not a static bundle — see `docs/INFRA-HANDOFF.md` for the full before/after. Infrastructure (Docker/Nginx/GKE/GitLab CI/Helm) is owned by another team and out of scope for this repo's application code; that handoff doc is the interface between this codebase and their config.

### Conventions
- JavaScript only (no TypeScript) — no `typescript` dependency in `package.json`, no `.ts` files under `app/`
- ESLint with `vue3-recommended` + Prettier
- `vue/multi-word-component-names` rule is disabled
- `server/routes/version.json.js` (a Nitro server route) serves `/version.json` for app version checking
- Mixpanel analytics integrated as a `.client` Nuxt plugin
