# Phase 2 Notes

Things found during Phase 1 (Vue 3 + Vite SPA → Nuxt 4 SSR migration) that
Phase 2 needs to know about. These are not Phase 1 bugs to fix now — they are
context that will otherwise be lost.

## a. CRITICAL TRAP — `server/middleware/phase2-match-details-noindex.js` does not self-clean

The Phase-1 placeholder scaffold has two halves:

- `phase2Placeholders` in `nuxt.config.js` — a route-name array. Deleting an
  entry from it removes the route registration AND its generated
  `routeRules` noindex header. **Self-cleaning.**
- `server/middleware/phase2-match-details-noindex.js` — a Nitro global
  middleware that noindexes the match-details URL shape
  (`/sports/:sport/:country/:league/:matchSlug-:id`, 5 path segments) by
  **regex on the request path**, not by checking the placeholder array.

It exists because Nitro's `routeRules` matcher (radix3) can't safely express
"exactly 5 segments starting with `/sports/`" without also swallowing the
real, working `/sports/football` and `/sports/live/football` routes (verified
directly against radix3@1.1.2 — see the file's header comment for the root
cause). The regex workaround is precise but has no link back to the
placeholder list.

**Consequence:** when Phase 2 ships the real match-details page at that same
URL shape, deleting the `match-details` entry from `phase2Placeholders` will
NOT stop this middleware from firing. It will keep silently noindexing the
real, live page. There is no error, no warning — it just never gets crawled.

A large removal banner has been added inside the middleware file itself
(top of `server/middleware/phase2-match-details-noindex.js`). Phase 2 must
delete or gate this file when the real page ships.

## b. `pages:extend` scaffold — 28 placeholder routes, one path inferred

`nuxt.config.js`'s `pages:extend` hook registers 28 placeholder route names —
all 28 entries of the `phase2Placeholders` array, `match-details` among them,
not an addition to it — against `app/components/PhaseTwoPlaceholder.vue`, so
`vue-router`'s `resolve()` for `RouterLink`/`router.push()` calls throughout
the shared chrome doesn't throw. As Phase 2 ports each real page, delete its
entry from the array — the list should shrink to empty over time.

Counting the 4 real stub pages too (`app/pages/login.vue`, `signup.vue`,
`casino-home.vue`, `my-bets.vue` — placeholders in substance even though
they're real `.vue` files, per `docs/PHASE-2-NOTES.md`'s own framing and
`phase2RealStubPaths` in `nuxt.config.js`), Phase 1 ships **32** total
placeholder routes. `docs/INFRA-HANDOFF.md`'s verification table curled 12
of those 32 — see that file's note on the claim's actual scope.

All paths were sourced from the deleted `src/router/index.js`
(`git show 81ae85f:src/router/index.js`) with **one exception**: the `games`
route (`/casino/:name`) had no entry in the old router at all. The nearest
analog was `play-casino-games` at `/casino/:name`, which is what the
placeholder mirrors — a judgment call, not a sourced path. **Phase 2 must
confirm the intended URL for `games` before porting it.**

## c. Spec §5.2 routes needing special handling

- **match-details** — the old router fused the slug and numeric ID into one
  path segment: `:matchSlug(.*)-:id`. This regex-in-path syntax is preserved
  as-is in the `pages:extend` placeholder registration; the real Nuxt page
  (whenever ported) will need the same fused-segment approach since Nuxt's
  file-based routing has no native equivalent for it — it must be registered
  the same way, via a hook or a catch-all page with manual parsing.
- **`/share-bets/:code?`** — vue-router's optional-param syntax (`:code?`)
  has no Nuxt filename equivalent. Phase 2 must split this into two page
  files (e.g. `app/pages/share-bets/index.vue` and
  `app/pages/share-bets/[code].vue`) rather than one dynamic file.

## d. Pre-existing bugs found but NOT fixed (predate the migration, need a product decision)

- **`app/stores/casino.js` calls a function that has never existed.**
  `app/stores/casino.js:85` (inside `getAllCasinos()`) destructures
  `const { getGames } = useCasino();` but `useCasino()`
  (`app/composables/useCasino.js`) has never returned a `getGames` key —
  verified absent at baseline commit `81ae85f`, before any Phase 1 changes.
  `getGames` is therefore permanently `undefined`, and calling it in
  `getAllCasinos()` throws a `TypeError`. Either this is dead code that
  should be removed, or casino category loading is silently broken in
  production and needs a real implementation. Needs a product decision.
- **`useSeoHead`'s `isParamPage` regex has a dead alternative.**
  `app/composables/useSeoHead.js:16`:
  `/\butm_|^page=|[?&]sort=|[?&]session=/.test("?" + q)` — the tested string
  is always prefixed with `"?"` before the regex runs, so `^page=` (anchored
  to the start of string) can never match; it would need `^page=` to be
  `[?&]page=` or similar. Paginated URLs are consequently never marked
  noindex, and never were — the identical dead branch existed in the old
  Vue Router `afterEach` hook before migration. Not a regression, but still
  broken.
- **`scripts/generate-sitemap.js` is broken and will throw on first run.**
  It still does `import { routes } from "../src/router/index.js"`, but that
  file was deleted when the six SEO routes were converted to Nuxt pages
  (commit `b4bd43c`). Anyone running this script gets an immediate module
  resolution error. Needs to be rewritten against Nuxt's page/route list
  (e.g. via `nuxi` or by reading `app/pages/` directly) before it's usable
  again.
- **Circular ES-module import, pre-existing at baseline.**
  `app/composables/useCasino.js:1` imports `useCasinoStore` from
  `app/stores/casino.js`, and `app/stores/casino.js:6` imports `useCasino`
  back from `app/composables/useCasino.js`. This worked under Vite's SPA
  bundling and continues to work under Nuxt/Nitro, but it's fragile —
  module-evaluation order changes (e.g. from future refactors, different
  bundler settings, or SSR-specific module boundaries) could break it in
  ways that are hard to debug. Untangling it is out of Phase 1 scope but
  should be cleaned up opportunistically in Phase 2.

## e. SSR screen-size cache — implicit ordering contract

`useScreenSizes()` memoises its `isSmallScreen`/`isMediumScreen`/
`isLargeScreen` refs on the per-request `nuxtApp` instance (so repeated calls
within one SSR request don't re-run VueUse's `useMediaQuery` setup). This
memoisation is only correct if the **first** call per request happens inside
a component's `setup()` — today that is always `app/layouts/default.vue`,
which mounts on every route — because only inside `setup()` can VueUse read
the SSR width injected by `app/plugins/ssr-width.js` (`provideSSRWidth(390,
nuxtApp.vueApp)`).

Verified safe as of Phase 1's end: two global middlewares now exist —
`tracking.global.js` (added in Task 10) and `auth.global.js` (added for
spec §6.4's auth guard, this fix round) — and neither touches the casino,
kiron, haki-league, or casino-query-params stores (the ones most likely to
indirectly call `useScreenSizes()`) before the layout mounts. The correct
guard condition going forward is therefore "no `app/middleware/` entry
reaches those stores before `app/layouts/default.vue`'s `setup()` runs",
not "no `app/middleware/` exists" — that condition is now false and was
restated here rather than left to silently go stale.

**Risk for Phase 2:** any future global middleware or Nitro/Nuxt plugin that
touches those stores (or otherwise calls `useScreenSizes()`) before the
layout's `setup()` runs would populate the per-request cache outside the
SSR-width injection context. The refs would then evaluate against no
`matchMedia` and no injected width, silently breaking server-rendered markup
for the entire request (see note f below for what "silently breaking"
usually means for this layout specifically). There's no runtime guard against
this today — it relies on nothing new being added upstream of the layout.

## f. Responsive layout is JS-driven, not CSS-driven

`app/layouts/default.vue` renders its entire `<slot />` inside three mutually
exclusive `v-if`/`v-else-if` branches keyed on `isLargeScreen` /
`isMediumScreen` / `isSmallScreen` from `useScreenSizes()` (backed by
VueUse's `useMediaQuery`), not CSS media queries. `app/plugins/ssr-width.js`
seeds a deterministic 390px viewport on the server (mobile-first, matching
this market), so the server always renders the small-screen branch.

Consequence: desktop users get the mobile markup from SSR, then a
client-side branch swap to the desktop markup after hydration and
`matchMedia` resolves — visible as a layout shift on first paint for
non-mobile visitors. Fixing this properly means moving the responsive logic
to CSS (so all three "branches" — or a single CSS-responsive layout — render
identically regardless of server-assumed viewport). That's a template
rewrite, deliberately out of Phase 1 scope.

## g. `src/` must be fully emptied by end of Phase 2

67 files remain under `src/views/` (the entire remaining `src/` tree —
nothing else is left there) as of end of Phase 1. These are the unported
views for routes not yet in Phase 1's six SEO pages or the placeholder
scaffold. Phase 2's job is to port each one into `app/pages/` (or
`app/components/`, as appropriate) and delete it from `src/`; by the end of
Phase 2, `src/` should not exist.

**Rule, violated once already during Phase 1 (required a fix round):**
nothing under `app/` may ever import from `src/`. `src/` is legacy,
unbuilt-from-here scaffolding, not a live dependency. Verified clean as of
this task: no `app/` file imports from `src/`.

## h. Auth guard ported (spec §6.4) — 13 baseline route names, 2 not yet real routes

`app/middleware/auth.global.js` ports the old router's `beforeEach` auth
check (`git show 81ae85f:src/router/index.js`, guard around line 942):
routes whose meta carries `requiresAuth: true` open the login modal and
stash an after-login callback instead of redirecting, exactly as before.
`import.meta.server` returns early — see the file's header comment for why
that's correct rather than a shortcut.

Grepping the baseline router for uncommented `requiresAuth: true` found
**13** route names, not the 12 originally estimated for this task: `profile`,
`my-bets`, `bet-details`, `join-affiliate`, `deposit`, `withdraw`,
`pari-league`, `pari-turbo`, `pari-virtual-jackpot`, `self-exclusion`,
`virtual-league`, `playon`, `bet-placed`. 11 of the 13 are wired with
`requiresAuth: true` in Phase 1 (10 via `phase2RequiresAuthNames` in
`nuxt.config.js`'s `pages:extend` hook, plus `my-bets` via its own
`definePageMeta`). **`virtual-league` and `bet-placed` are not registered as
routes anywhere in Phase 1** — neither in `phase2Placeholders` nor as a real
stub page, so there's nothing in the codebase today to attach `requiresAuth`
meta to. The guard itself is generic (checks `to.matched`/`meta` on
whatever route is being visited), so it needs no further change — Phase 2
must simply set `requiresAuth: true` in each page's meta when it creates
`virtual-league` and `bet-placed` (or registers them as placeholders first).

## i. `sportMetaMap` and `scrollBehavior` — dropped when `src/router/index.js` was deleted, recorded here rather than silently lost

Both lived in the baseline router (`git show 81ae85f:src/router/index.js`)
and had no home to move to when the router file was deleted. Neither was
restored in Phase 1 — recorded here as a deliberate, known gap rather than
a silent loss:

- **`sportMetaMap`** (baseline lines ~794–910) — a per-sport-key
  title/description lookup (soccer, basketball, tennis, …, 23 sports) used
  by the old `afterEach` hook to override the default SEO title/description
  on `/sports/:sport` and `/sports/live/:sport` routes. Phase 1's six SEO
  routes include `/sports/football` and `/sports/live/football`, but their
  titles/descriptions are set directly in each page's `useSeoHead()` call
  (see `app/pages/sports/[sport].vue` and `app/pages/sports/live/[sport].vue`)
  rather than through a shared map — correct for the one sport Phase 1
  ships, but any *other* sport routed through those same dynamic pages today
  would fall back to the site default title/description instead of a
  sport-specific one. Not restored now because doing it faithfully means
  porting all 23 entries and wiring them into both dynamic pages' SEO
  logic — real work, not a one-line fix, and out of scope for this fix
  round. Phase 2 should port `sportMetaMap` (verbatim content is in the
  baseline commit) into a composable (e.g. `useSportMeta.js`) and call it
  from both sport pages' `useSeoHead()`.
- **`scrollBehavior`** (baseline lines ~920–937) — restored `savedPosition`
  on back/forward, suppressed auto-scroll on the home/sports routes
  (including when arriving from `match-details`, to let that component
  handle scroll restoration itself), and scrolled to top everywhere else.
  Nuxt's file-based router config has a direct equivalent
  (`app/router.options.js` exporting a `scrollBehavior` function, same
  vue-router signature) but it was not added in Phase 1 — no page in the
  six-route SEO set exercises the home/sports special case in a way that's
  currently observable (there's no `match-details` page yet to navigate
  *from*), so the gap is inert today. Phase 2 must add
  `app/router.options.js` with this logic before/while porting
  `match-details`, or scroll position will silently misbehave (default
  vue-router behaviour is no scroll restoration at all) the moment that
  route exists.
