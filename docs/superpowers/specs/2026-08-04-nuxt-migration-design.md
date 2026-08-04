# Nuxt 4 SSR Migration — Design

**Date:** 2026-08-04
**Project:** Siakabet UI (Naibet Kenya) — Vue 3 + Vite SPA → Nuxt 4 SSR
**Status:** Approved design, pending implementation plan

---

## 1. Goal

Move the application to Nuxt 4 with server-side rendering, so that the SEO work
the app already performs actually reaches crawlers.

Today `src/router/index.js` builds titles, descriptions, canonicals, Open Graph
tags and JSON-LD schemas in a `router.afterEach` hook. All of it runs in the
browser after the bundle boots. A crawler fetching a URL receives
`<div id="app"></div>` and nothing else. Server rendering is the only change
that fixes this; every other benefit of the migration is secondary.

**Explicit non-goal:** deployment. Docker, Nginx, Helm and GitLab CI have been
removed from the repository and are owned by the infrastructure team. This
migration produces application source plus a handoff note (§9), not a deploy
pipeline.

## 2. Current State

Measured on 2026-08-04, at baseline commit `81ae85f`.

| Aspect | Measurement |
|---|---|
| Size | 564 files, ~64,600 LOC under `src/` |
| Components | 372 (`src/components/`) |
| Views | 80 (`src/views/`) |
| Stores | 46 Pinia stores, 28 with `persist` |
| Composables | 59, auto-imported via `unplugin-auto-import` |
| Routes | 43 live named routes in one 1,078-line file |
| Design system | `src/style.css`, 44KB, four-layer token architecture |
| Browser globals | 33 files, 82 references to `window`/`document`/`localStorage` |
| Env vars | 33 `VITE_*` keys |

Two facts shape the whole migration:

1. **All 43 routes are eagerly imported.** The router statically imports every
   view at the top of the file, so first paint downloads the entire application.
2. **Browser-global usage is low and well-contained.** 82 references across 33
   files, nearly all inside event handlers or `onMounted` — code paths SSR never
   executes. The SSR-safety work is far smaller than the file count suggests.

## 3. Decisions

Four decisions were settled during brainstorming and are treated as fixed.

| Decision | Choice | Rationale |
|---|---|---|
| Rendering | SSR, per-route | The only option that delivers the SEO goal |
| Session | Token in a cookie | Server must know auth state to render correctly on first paint |
| Safety net | `git init`, migrate in place on a branch | Repo had no version control; 564-file change needs a revert path |
| Sequencing | Phased, walking skeleton first | Prove SSR end-to-end on 6 routes before porting the other 37 |

### 3.1 Why a cookie and not localStorage

`login.js` persists `["token", "profileSid", "msisdn"]` and exposes
`isAuthenticated` as a getter over `token`. The server cannot read localStorage,
so retaining it means every page renders logged-out and then swaps after
hydration — a visible header flash on every navigation, for the majority of
traffic on a betting site. That is a UX regression against the current SPA,
where the splash loader hides the boot.

Cookie storage is supported natively by `pinia-plugin-persistedstate`. The
cookie must remain JS-readable, so its XSS exposure is equivalent to
localStorage — this is not a security downgrade, and it is not a security
upgrade either. An httpOnly cookie with a server-side API proxy would be a
genuine improvement, and was explicitly deferred as a separate project.

## 4. Target Architecture

Nuxt 4.5.1, JavaScript only. No TypeScript is introduced; `components.json`
records `"typescript": false` and that holds.

Nuxt 4's default `srcDir` is `app/`, which maps onto the existing tree almost
one-to-one:

| Today | Nuxt 4 |
|---|---|
| `src/App.vue` | `app/app.vue` + `app/layouts/` |
| `src/views/` | `app/pages/` (file-based routing) |
| `src/components/` | `app/components/` — auto-registered natively |
| `src/composables/` | `app/composables/` — auto-imported natively |
| `src/stores/` | `app/stores/` via `@pinia/nuxt` |
| `src/plugins/` | `app/plugins/*.client.js` |
| `src/style.css` | `app/assets/css/style.css` — content unchanged |
| `src/services/`, `src/lib/`, `src/utilities/` | unchanged paths under `app/` |
| `src/router/index.js` | deleted — split into pages + `definePageMeta` |
| `vite.config.js` | `nuxt.config.js` |
| `index.html` | `nuxt.config.js` `app.head` |

### 4.1 Dependencies

Three build dependencies are **deleted, not ported**, because Nuxt provides them
natively:

- `@unhead/vue` — `useHead` is a Nuxt built-in
- `unplugin-auto-import` — Nuxt auto-imports Vue APIs and `composables/`
- `unplugin-vue-components` — Nuxt auto-registers `components/`

`vue-router` stops being declared; Nuxt manages its own version.

Tailwind 4 stays on **`@tailwindcss/vite`**, added to `nuxt.config`'s
`vite.plugins`. The `@nuxtjs/tailwindcss` module is a Tailwind 3 module and
would break the CSS-first configuration. This is what keeps `style.css`
byte-identical.

Version changes:

| Package | From | To | Note |
|---|---|---|---|
| `nuxt` | — | 4.5.1 | new |
| `@pinia/nuxt` | — | 1.0.1 | new |
| `pinia` | 3.0.4 | 4.0.2 | **major** — read migration guide first |
| `swiper` | 12.2.0 | 14.0.7 | **major** |
| everything else | — | latest | patch/minor only |

The two majors are the only dependency risk. Pinia 4 touches all 46 stores;
its migration guide is read before any store is moved, not assumed to be clean.

### 4.2 Auto-import equivalence

The `AutoImport` config currently registers `axios` as a global, plus
`storeToRefs` from pinia and a few `@vueuse/core` functions. Nuxt does not
auto-import `axios`. Rather than recreate that with `imports.presets`, `axios`
is imported explicitly where used — it appears in a small number of files
(`services/API.js` and stores), and an explicit import is clearer than a magic
global. `storeToRefs` and VueUse come free via `@pinia/nuxt` and `@vueuse/nuxt`.

## 5. Routing

### 5.1 Wrappers become layouts

`TheAuth` and `WithSibarAndBetslip` are currently parent routes with `children`,
both mounted at `path: "/"`. In Nuxt they become `app/layouts/auth.vue` and
`app/layouts/default.vue`, selected per page via `definePageMeta({ layout })`.
This removes the route nesting entirely and is the idiomatic mapping.

Route `meta` (`title`, `description`, `requiresAuth`, `category`, `robots`)
moves into each page's `definePageMeta()`.

### 5.2 Three routes that do not map cleanly

File-based routing cannot express these directly. Each needs an explicit
decision rather than discovery mid-port.

**Match details** — `/sports/:sport/:country/:league/:matchSlug(.*)-:id`
Two params fused in one segment with a regex. Nuxt filenames cannot encode this.
Resolved with a `pages:extend` hook in `nuxt.config.js` that rewrites the path
of the generated `match-details` route to the original pattern. The page file
still exists and owns the component; only its `path` string is patched.

**Share bets** — `/share-bets/:code?`
Nuxt has no optional-parameter filename syntax. Resolved with two files —
`app/pages/share-bets/index.vue` and `app/pages/share-bets/[code].vue` — where
the index re-exports the same component. Preferred over a `pages:extend` hack
because both URLs stay visible in the file tree.

**Instant** — `/ke/:pathMatch(.*)*`
Maps directly to `app/pages/ke/[...pathMatch].vue`. No special handling.

Note also that `/virtual-games/:name` coexists with static siblings
(`/virtual-games/nai-league`, `/virtual-games/playon`, …). Nuxt ranks static
segments above dynamic ones, so this resolves correctly without intervention.

### 5.3 Render rules

Set per route in `nuxt.config.js` `routeRules`:

| Routes | Rule | Why |
|---|---|---|
| `/terms-and-conditions`, `/privacy-policy`, `/responsible-gambling` | `prerender: true` | Static; build once |
| `/`, `/sports/:sport`, `/sports/live/:sport`, `/leagues`, `/sports/:sport/:country/:league`, `/promotions`, `/promotion-details/:name`, match details | SSR | The SEO surface |
| `/casino/*`, `/aviator`, `/crash/*`, `/virtual-games/*`, `/ke/*` | `ssr: false` | Iframe/canvas games; nothing to index |
| `/profile`, `/deposit`, `/withdraw`, `/sort-deposit`, `/my-bets`, `/bet-details`, `/bonus`, auth pages | `ssr: false` | Private; already `noindex` |

Code-splitting per page is automatic, which removes the eager-import problem
described in §2 as a side effect.

## 6. Session Under SSR

1. `login.js` switches its `persist` config from default (localStorage) to
   cookie storage, keeping the same `pick: ["token", "profileSid", "msisdn"]`.
2. A Nuxt plugin reads the cookie during SSR and seeds the store, so
   `isAuthenticated` is correct on the server and first paint matches.
3. `services/API.js` reads the token from the store rather than assuming a
   browser context, so SSR-time requests carry the `Authorization` header.
4. The `requiresAuth` guard in `router.beforeEach` becomes route middleware. It
   keeps the current behaviour — open the login modal and stash
   `setAfterLoginAction`, rather than redirect to a login page. Because the
   modal is client-side, the middleware runs client-side for auth routes, all of
   which are `ssr: false` anyway.
5. The UTM/btag/referral capture (`getUtm`, `getBtag`, `getReferralCode`) moves
   into the same middleware; it reads query params, which are available on the
   server.

## 7. SSR Hazards

Known fixes, from the 82-reference scan:

| File | Issue | Fix |
|---|---|---|
| `composables/useShareToSocials.js` | `window.location.origin` in the composable body — runs during setup | Move behind `import.meta.client` or make it lazy |
| `stores/app-version.js` | `localStorage` + `window.location` in actions | Guard with `import.meta.client` |
| `App.vue` | `performance.getEntriesByType` on mount | Stays; `onMounted` is client-only |
| `plugins/mixpanel.js`, `plugins/onesignal.js` | Browser SDKs | Become `app/plugins/*.client.js` |
| `composables/usePropellarAds.js` | Ad script injection, called at App setup | Move to a `.client.js` plugin |

The remaining ~28 files reference browser globals only inside event handlers,
which SSR never invokes. They are verified during their route's port, not
pre-emptively rewritten.

`useThemeSwitch` needs attention during Phase 1: it sets `data-theme` on the
document, which drives the entire design system. Rendered server-side it must
emit the correct attribute in the HTML, or every page flashes the wrong theme.

## 8. Configuration

`import.meta.env.VITE_*` is replaced by `runtimeConfig.public`. All 33 keys
(§2) move; `services/API.js` holds ~12 of them as exported base URLs.

This is an application change, not a deployment change: Nuxt reads
`NUXT_PUBLIC_*` environment variables at server start, so no build-time
substitution is needed.

Note: several keys in `.env` carry trailing whitespace before `=`
(`VITE_MATCHES_URL =`). These are normalised during the move.

The custom `versionJsonPlugin` in `vite.config.js` becomes
`server/routes/version.json.js`, returning `{ version }` from runtime config.

## 9. Infrastructure Handoff

The migration produces a note for the infrastructure team covering:

- Start command: `node .output/server/index.mjs` (was: static files via Nginx)
- Default port: 3000
- Build output: `.output/` (was: `dist/`)
- Full rename table: `VITE_FOO` → `NUXT_PUBLIC_FOO`, all 33 keys
- The build-time `sed` substitution is no longer required

Writing this note is in scope. Writing Dockerfiles, Helm charts or CI config is
not.

## 10. Phases

### Phase 1 — Walking skeleton

Scaffold Nuxt 4.5.1 → `style.css` and Tailwind 4 via `@tailwindcss/vite` →
plugins as `.client.js` → 46 stores under `@pinia/nuxt` including the pinia 3→4
bump → cookie session → `default` and `auth` layouts → **6 routes**: `/`,
`/sports/:sport`, `/sports/live/:sport`, `/leagues`,
`/sports/:sport/:country/:league`, `/promotions` → `server/routes/version.json.js`
→ handoff note.

**Done when:**

1. `curl` against the built server returns real markup — headings, odds, and the
   `application/ld+json` block — in the HTML source, not an empty root div.
2. Browser console shows zero hydration mismatch warnings on all 6 routes.
3. A logged-in session survives a hard refresh with no logged-out flash.
4. `data-theme` is correct in the server response; no theme flash.

**Scope note.** All 46 stores and all 372 components are *relocated* to `app/`
during Phase 1, because the 6 skeleton routes pull in a large share of them
transitively and moving files piecemeal would mean touching the same ones
repeatedly. Relocation means the file moves and its imports are fixed — it does
not mean every component is audited for SSR safety. SSR auditing happens per
route, when that route is ported (§7). A component that only ever renders on a
Phase 4 casino page is not made SSR-safe in Phase 1.

**The implementation plan that follows this spec covers Phase 1 only.** Phases
2+ are scoped here for sequencing, and each gets its own plan once the skeleton
is verified.

### Phase 2+ — Remaining routes, in themed batches

Ported in this order, each batch verified before the next:

1. **Match & bet flow** — match details (incl. the `pages:extend` path), bet
   details, my-bets, booked bets, bet-placed, share-bets
2. **Account** — profile, deposit, sort-deposit, withdraw, self-exclusion,
   bonus, join-affiliate
3. **Auth** — login, signup, forgot/reset/change password, verify-account
4. **Games** — casino-home, casino, crash, aviator, virtuals, kiron, playon,
   haki league, instant
5. **Static & tail** — terms, privacy, responsible gambling, promotions detail,
   share-feedback, not-found

## 11. Risks

| Risk | Mitigation |
|---|---|
| Pinia 3→4 breaks stores | Read migration guide before touching stores; 46 stores land in Phase 1 where the blast radius is visible |
| Hydration mismatches at scale | Walking skeleton proves the pattern on 6 routes first; zero-warning is a Phase 1 exit criterion |
| Theme flash (`data-theme` set client-side) | Explicit Phase 1 exit criterion |
| Match-details route regex | Resolved by design (§5.2) rather than left to discovery |
| Swiper 12→14 major | Carousels are visual; verified per route as batches land |
| Third-party SDKs assuming `window` | All moved to `.client.js` plugins in Phase 1 |

## 12. Out of Scope

- Docker, Nginx, Helm, GitLab CI — owned by infrastructure
- httpOnly cookie + server-side API proxy — deferred, separate project
- TypeScript adoption
- Redesign of any kind; `style.css` and `DESIGN.md` are load-bearing and
  unchanged
- Test infrastructure; the project has none and this migration does not add it
