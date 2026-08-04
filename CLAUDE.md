# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Siakabet UI — a Vue 3 sports betting and casino web application for the Kenyan market. Built with Vite, managed with pnpm, deployed via Docker/Nginx to GKE (Google Kubernetes Engine) through GitLab CI.

## Commands

- **Install dependencies:** `pnpm install`
- **Dev server:** `pnpm dev` (runs on port 5079)
- **Production build:** `pnpm run build`
- **Preview build:** `pnpm preview`
- **Lint:** `npx eslint src/`

No test framework is configured.

## Architecture

### Tech Stack
- **Vue 3** (Composition API with `<script setup>`) + **Vue Router** + **Pinia** (with persisted state)
- **Vite** with auto-imports (`unplugin-auto-import`): Vue APIs (`ref`, `computed`, `watch`, etc.), `axios`, `storeToRefs`, and all composables from `./composables/**` are available globally without imports
- **unplugin-vue-components**: components are auto-registered (no manual imports needed in templates)
- **Tailwind CSS 4** (CSS-first config in `src/style.css`, no `tailwind.config.js`) with dark mode via a `@custom-variant` on `[data-theme="dark"]`, plus shadcn-vue (JS variant, no TypeScript)
- **@unhead/vue** for dynamic SEO meta/head management per route

### Path Alias
`@` maps to `./src` (configured in `vite.config.js`)

### Key Directories

- **`src/stores/`** — Pinia stores (~50 stores). Major ones: `login.js`, `betslip.js`, `sports.js`, `casino.js`, `matches.js`, `live-matches.js`, `modal.js`. Many use `pinia-plugin-persistedstate`.
- **`src/composables/`** — Reusable composition functions (~60+). Auto-imported by Vite, so they're usable anywhere without explicit imports. Key ones: `useBetslip.js`, `useTax.js`, `useThemeSwitch.js`, `useModalTypes.js`, `useMixpanel.js`.
- **`src/services/API.js`** — Axios factory that creates instances from env-configured base URLs. Multiple backend services: matches, auth, bet, casino, virtual, affiliate, CMS, kiron-lite.
- **`src/router/index.js`** — All routes defined in a single file. Uses `meta.requiresAuth` for auth gating (redirects to login modal, not a page). Route `afterEach` handles dynamic SEO meta and JSON-LD schemas.
- **`src/views/`** — Page-level components. Some routes use layout wrappers (`WithSibarAndBetslip`, `CasinoLayout`, `CrashIndex`, `TheAuth`).
- **`src/components/ui/`** — shadcn-vue components (button, toast). Added via `npx shadcn-vue@latest add <component>`.

### Design System

The whole visual system lives in **`src/style.css`**, specified by `DESIGN.md` (Naibet Core — "Modern Corporate Precision"). It is organised in four layers, and the rule is that **no literal colour may appear below layer 2**:

1. **Palette** — `--palette-{family}-{50..950}` in `:root`. Six ramps: Charcoal Slate (neutral), Naibet Purple (brand), Action Green (success/bet), Signal Red, Gold (jackpots), Tertiary Slate-Blue (informational). This is the only block containing hex values.
2. **Semantics** — role tokens (`--primary`, `--card`, `--surface-elevated`, `--border-strong`…) declared twice: `:root` is the dark theme (the default), `[data-theme="light"]` is the light theme. Both reference layer 1.
3. **Bindings** — `@theme` / `@theme inline` expose layers 1–2 as Tailwind utilities. Tailwind's stock ramps are **remapped onto the Naibet palette**, so legacy `bg-gray-800`, `text-blue-600`, `border-amber-400` etc. resolve to design-system colours automatically. There is no off-system Tailwind colour.
4. **Utilities** — composite classes (`elevation-1/2/3`, `accent-bar`, `badge-tint-*`, `bg-gradient-*`, `card-hover-lift`) built from the layers above.

**To retheme the app, edit layer 1 only.** Everything downstream — components, gradients, glows, datepicker, toasts, logos, keyframes — resolves through it. Editing layer 2 changes what a role *means* per theme (e.g. which purple step is `--primary` in dark).

Other conventions:
- **Type:** Montserrat (`font-display`, applied to `h1`–`h6` in base) for headings, Inter (`font-sans`) for body and data. Both loaded in `index.html`. Scale utilities: `text-display-lg`, `text-headline-lg`, `text-headline-md`, `text-body-lg`, `text-body-md`, `text-label-md`, `text-label-sm` — display/headline sizes are fluid via `clamp()`, so one class serves mobile and desktop.
- **Shape:** 4px soft base. `rounded-sm` 4px (standard: buttons, inputs, cards), `rounded-lg`/`rounded-xl` 8px (modals, large sections), `rounded-full` for status chips. The upper radius scale is deliberately compressed.
- **Elevation:** tonal layers plus micro-shadows, never heavy blur. Level 1 = hairline border, no shadow; Level 2 = hover; Level 3 = modals. Tailwind's `shadow-sm`…`shadow-2xl` are folded onto this scale, and shadow colour/opacity swap per theme via `--elevation-umbra` and `--elevation-alpha-*`.
- Prefer semantic tokens (`bg-card`, `text-muted-foreground`, `border-border`) over palette classes in new components.

### Environment Variables
All prefixed with `VITE_`. The `.env` file is committed (not gitignored) and contains real dev/prod API URLs. For Docker production builds, `.env.production` uses placeholder constants that get replaced at runtime by `docker/config/app/entrypoint.sh` via `sed`.

Key env vars: `VITE_MATCHES_URL`, `VITE_AUTH_URL`, `VITE_BET_URL`, `VITE_CASINO_URL`, `VITE_VIRTUAL_URL`, `VITE_APP_VERSION`.

### Deployment
- **GitLab CI** (`.gitlab-ci.yml`): two stages — `build-and-push` (Docker image to GCP Artifact Registry) and `deploy` (Helm to GKE)
- **Branches:** `main` → production, `devel` → development
- **Docker** (`docker/Dockerfile`): multi-stage build (Node + pnpm → Nginx Alpine). `APP_VERSION` passed as build arg.
- **Helm chart** lives in `siakabet-ui/` directory

### Conventions
- JavaScript only (no TypeScript) — `components.json` confirms `"typescript": false`
- ESLint with `vue3-recommended` + Prettier
- `vue/multi-word-component-names` rule is disabled
- Production builds drop `console` and `debugger` statements via esbuild
- Custom Vite plugin serves `/version.json` for app version checking
- Mixpanel analytics integrated as a Vue plugin
