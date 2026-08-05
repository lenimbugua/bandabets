import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";

const phase2PlaceholderFile = fileURLToPath(
  new URL("./app/components/PhaseTwoPlaceholder.vue", import.meta.url),
);

// Route names that carried `meta: { requiresAuth: true }` in the deleted
// baseline router (`git show 81ae85f:src/router/index.js`), sourced by
// grepping every uncommented `requiresAuth: true` and reading the enclosing
// route object's `name`. app/middleware/auth.global.js checks
// `to.matched.some(r => r.meta?.requiresAuth)` on every navigation — it's
// generic and needs no per-route wiring beyond this meta flag being set. Of
// the 13 names found, 11 are registered as routes in Phase 1 (10 here, plus
// "my-bets" which has its own real stub page — see app/pages/my-bets.vue).
// "virtual-league" and "bet-placed" are NOT registered as routes anywhere in
// Phase 1 (neither here nor as a real page) — see docs/PHASE-2-NOTES.md for
// that gap; there is nothing to attach `requiresAuth` to until Phase 2
// creates those pages.
// "profile", "deposit", "withdraw", "self-exclusion" and "join-affiliate"
// now set requiresAuth directly in their own definePageMeta (Batch C) —
// same for "bet-details" and "my-bets"/"bet-placed" (Batch E). Kept here
// only for the not-yet-ported virtual-game names.
const phase2RequiresAuthNames = new Set([
  "pari-league",
  "pari-turbo",
  "pari-virtual-jackpot",
  "playon",
]);

// Phase 1 route-name scaffold. DELETE EACH ENTRY as Phase 2 ports the real
// page for that name — this list should shrink to empty over time.
//
// These route names are referenced by RouterLink/router.push calls in the
// shared chrome (Footer's legalLinks, TheDepositBar, HeaderLinks, ...) and
// in views not yet converted to Nuxt pages. vue-router 4 THROWS
// "No match for {name: ...}" when resolving an unmatched name — not just a
// console warning — which was aborting SSR for every page that mounts that
// chrome (i.e. all of them, via app/layouts/default.vue and auth.vue).
// Registering name + a real path here is enough to satisfy resolve()
// without porting the real view yet. Paths are sourced from the deleted
// src/router/index.js (`git show 81ae85f:src/router/index.js`), not
// invented, so Phase 2 can swap in the real page without changing URLs.
const phase2Placeholders = [
  { name: "aviator", path: "/aviator" },
  // "games" has no entry in the old router at all (nearest analog was
  // "play-casino-games" at /casino/:name, which is what this mirrors) —
  // a judgment call, not a sourced path. Flagged in task-10-report.md.
  { name: "games", path: "/casino/:name" },
  // Batch D: three routes commented out in the baseline router
  // (git show 81ae85f:src/router/index.js — leaderboard 343-353,
  // share-happiness 506-516, welcome-gift 745-757 under a "FREEBET
  // DISABLED" banner). These are new URLs, not indexed ones being
  // restored, so they stay placeholders pending a product decision —
  // see docs/superpowers/plans/2026-08-04-nuxt-migration-phase-2.md §8.2.
  { name: "leaderboard", path: "/leaderboard" },
  { name: "pari-league", path: "/virtual-games/nai-league" },
  { name: "pari-turbo", path: "/virtual-games/nai-turbo" },
  { name: "pari-virtual-jackpot", path: "/virtual-games/nai-virtual-jackpot" },
  { name: "playon", path: "/virtual-games/playon" },
  { name: "share-happiness", path: "/share-happiness" },
  { name: "welcome-gift", path: "/welcome-gift" },
];

// The four real stub pages (their own .vue files under app/pages/, created
// in an earlier triage round because the shared chrome references these
// names directly) are placeholders too and must never be indexed either.
const phase2RealStubPaths = ["/login", "/signup", "/casino-home", "/my-bets"];

const NOINDEX_HEADERS = { "X-Robots-Tag": "noindex, nofollow" };

// vue-router path syntax (":name", optional "?", regex-fused segments like
// ":matchSlug(.*)-:id") isn't valid Nitro/radix3 routeRules-key syntax.
// Convert each phase2Placeholders path to one or more radix3-safe patterns:
// static segments pass through untouched; any segment containing ":" or "("
// becomes a same-position "*" (a single-segment wildcard, not "**", so
// pattern DEPTH is preserved — this is what keeps match-details'
// /sports/*/*/*/* from ever matching the 4-segment country route
// /sports/[sport]/[country]/[league]). A trailing "?" (vue-router's
// optional-param marker, e.g. share-bets' ":code?") has no radix3
// equivalent, so it's expanded into two patterns: with and without that
// segment.
function toNitroPatterns(routerPath) {
  const segments = routerPath.split("/").filter(Boolean);
  const isWildcardSegment = (s) => /[:()]/.test(s);
  const last = segments.at(-1) || "";
  if (last.endsWith("?")) {
    const base = segments.slice(0, -1).map((s) => (isWildcardSegment(s) ? "*" : s));
    return [`/${base.join("/")}`, `/${[...base, "*"].join("/")}`];
  }
  return [`/${segments.map((s) => (isWildcardSegment(s) ? "*" : s)).join("/")}`];
}

// Every scaffold route (placeholders + the four real stub pages), keyed to
// { headers: { "X-Robots-Tag": "noindex, nofollow" } } — generated from the
// same phase2Placeholders/phase2RealStubPaths source of truth used by the
// pages:extend hook below, so the route list and the noindex list can't
// drift apart. An HTTP header (unlike useSeoHead's <meta name="robots">,
// which lives in a <script setup> that never executes server-side for
// mode:"client" pages — Nuxt's pageToClientOnly returns ServerPlaceholder
// on the server) is JS-independent and reaches crawlers regardless.
//
// "match-details" no longer appears in phase2Placeholders at all (Batch E
// shipped the real page — see the pages:extend rewrite below) and
// server/middleware/phase2-match-details-noindex.js, which used to give it
// a hand-written regex-based noindex header instead of a routeRules entry
// (because Nitro's routeRules matcher doesn't respect segment-count depth
// for dynamic patterns and would have wrongly noindexed
// /sports/football and /sports/live/football too), has been deleted.
// match-details is now fully indexable via the "/sports/**": { ssr: true }
// routeRule below, same as every other real /sports/ route.
const phase2NoindexRouteRules = {};
for (const { path } of phase2Placeholders) {
  for (const pattern of toNitroPatterns(path)) {
    phase2NoindexRouteRules[pattern] = { headers: NOINDEX_HEADERS };
  }
}
for (const path of phase2RealStubPaths) {
  phase2NoindexRouteRules[path] = { ssr: false, headers: NOINDEX_HEADERS };
}

export default defineNuxtConfig({
  compatibilityDate: "2026-08-04",
  devtools: { enabled: true },

  hooks: {
    "pages:extend"(pages) {
      // Batch E: match-details' real path
      // (/sports/:sport/:country/:league/:matchSlug(.*)-:id) fuses two
      // params into one path segment, which file-based routing cannot
      // express. app/pages/match-details.vue is a stand-in filename —
      // Nuxt auto-discovers it at the default path "/match-details";
      // rewrite that in place. See plan §9.
      const matchDetailsPage = pages.find((p) => p.path === "/match-details");
      if (matchDetailsPage) {
        matchDetailsPage.path =
          "/sports/:sport/:country/:league/:matchSlug(.*)-:id";
        matchDetailsPage.name = "match-details";
      }

      for (const { name, path } of phase2Placeholders) {
        pages.push({
          name,
          path,
          file: phase2PlaceholderFile,
          // Client-only: these are placeholders, never meant to be
          // server-rendered or indexed. Precise per-route rendering mode,
          // so it isn't at the mercy of the "/sports/**": { ssr: true }
          // routeRule below (match-details and countries both live under
          // /sports/**).
          mode: "client",
          meta: {
            robots: "noindex,nofollow",
            ...(phase2RequiresAuthNames.has(name) && { requiresAuth: true }),
          },
        });
      }
    },
  },

  modules: [
    "@pinia/nuxt",
    "pinia-plugin-persistedstate/nuxt",
    "@vueuse/nuxt",
    "@nuxt/eslint",
  ],

  pinia: {
    storesDirs: ["./app/stores/**"],
  },

  // pinia-plugin-persistedstate/nuxt defaults to cookie storage for any
  // store that doesn't set an explicit `persist.storage`. Only login.js
  // (session token) should use cookies so the server can read it; every
  // other persisted store (betslip, theme, nav state, ...) must stay on
  // localStorage as it did under plain Vite, or its state would ride along
  // on every HTTP request. login.js overrides this default explicitly.
  piniaPluginPersistedstate: {
    storage: "localStorage",
  },

  css: ["~/assets/css/style.css"],

  routeRules: {
    "/": { ssr: true },
    "/leagues": { ssr: true },
    "/promotions": { ssr: true },
    "/sports/**": { ssr: true },

    // --- Batch A: legal trio — indexable, SSR (not build-time prerendered) --
    // Live, already-indexed URLs. Removed from phase2Placeholders above, so
    // they no longer get a generated noindex routeRule; these three must
    // stay fully indexable.
    //
    // DEVIATION FROM PLAN: the plan specifies `{ prerender: true }`. That is
    // not usable today — `pnpm build` fails prerendering ANY route in this
    // app (verified against the already-shipped, unrelated `/promotions`
    // page, not just these three new pages): Nitro's build-time prerender
    // crawl throws "Cannot read properties of undefined (reading 'state')"
    // out of @pinia/nuxt's `app:rendered` hook (`nuxtApp.$pinia` is
    // undefined at that point, specifically inside the separate
    // `.nuxt/prerender/` bundle Nitro builds for the crawl) — reproducible
    // with a single prerender route, so it isn't a concurrency race either.
    // This is a pre-existing incompatibility between this repo's pinia
    // (^4.0.2) / @pinia/nuxt (1.0.1) / nitropack (2.13.4) versions and
    // Nitro's prerender crawler, not something Batch A introduced — no
    // routeRules anywhere in this codebase used `prerender: true` before.
    // `ssr: true` (identical to `/`, `/leagues`, `/promotions`, `/sports/**`
    // above) produces the same fully server-rendered, indexable HTML per
    // request and is sufficient to satisfy the urgent requirement (real
    // <title>, canonical, no noindex). Revisit `prerender: true` once the
    // upstream bug is fixed or the pinia/nitro versions are updated.
    "/terms-and-conditions": { ssr: true },
    "/privacy-policy": { ssr: true },
    "/responsible-gambling": { ssr: true },

    // --- Batch B: auth — permanent noindex, ssr:false ------------------------
    // change-password / forgot-password / reset-password / verify-account
    // just left phase2Placeholders (removed above), so they no longer get a
    // generated noindex routeRule. useSeoHead({robots:"noindex,nofollow"})
    // inside these pages is NOT a substitute — under ssr:false Nuxt's
    // pageToClientOnly returns ServerPlaceholder and <script setup> never
    // runs server-side, so no <meta name="robots"> reaches a crawler.
    // These four permanent rules are the only thing that actually keeps
    // them out of the index — mirrors what phase2RealStubPaths already does
    // for /login and /signup (untouched, still real: not scaffolding).
    "/change-password": { ssr: false, headers: NOINDEX_HEADERS },
    "/forgot-password": { ssr: false, headers: NOINDEX_HEADERS },
    "/reset-password": { ssr: false, headers: NOINDEX_HEADERS },
    "/verify-account": { ssr: false, headers: NOINDEX_HEADERS },

    // --- Batch C: account — permanent noindex, ssr:false --------------------
    // profile / deposit / sort-deposit / withdraw / self-exclusion / bonus /
    // join-affiliate just left phase2Placeholders (removed above, except
    // "bonus" which was never registered there at all — it 404'd in Phase 1
    // with no generated noindex routeRule of any kind). All seven are
    // private account pages; useSeoHead's robots meta does NOT reach
    // crawlers under ssr:false (pageToClientOnly / ServerPlaceholder), so
    // these permanent header rules are the only real guard.
    "/profile": { ssr: false, headers: NOINDEX_HEADERS },
    "/profile/exclude": { ssr: false, headers: NOINDEX_HEADERS },
    "/deposit": { ssr: false, headers: NOINDEX_HEADERS },
    "/sort-deposit": { ssr: false, headers: NOINDEX_HEADERS },
    "/withdraw": { ssr: false, headers: NOINDEX_HEADERS },
    "/bonus": { ssr: false, headers: NOINDEX_HEADERS },
    "/join-affiliate": { ssr: false, headers: NOINDEX_HEADERS },

    // --- Batch D: static tail ------------------------------------------------
    // /promotion-details/:name and /sports/soccer/countries just left
    // phase2Placeholders above and become indexable — countries already
    // falls under "/sports/**": { ssr: true } below; promotion-details gets
    // the app's default ssr:true with no explicit rule needed.
    // /share-feedback ships client-only (mode: "client" in the plan) and
    // stays permanently noindex for the same reason as the Batch B/C
    // pages: useSeoHead's robots meta never reaches the server under
    // ssr:false.
    "/share-feedback": { ssr: false, headers: NOINDEX_HEADERS },

    // --- Batch E: match & bet -------------------------------------------------
    // match-details just left phase2Placeholders above and is deliberately
    // given NO entry here: it's the app's most SEO-valuable dynamic page
    // and falls under "/sports/**": { ssr: true } below like every other
    // real /sports/ route. server/middleware/phase2-match-details-noindex.js
    // (which used to force-noindex this URL shape) has been deleted.
    //
    // bet-details and bet-placed are private, ssr:false pages — permanent
    // noindex, same reasoning as every other Batch B/C/D private page.
    // bet-placed was never registered anywhere in Phase 1 (no placeholder,
    // no real stub, no routeRule) — this is a brand new entry, not a
    // removal.
    "/bet-details": { ssr: false, headers: NOINDEX_HEADERS },
    "/bet-placed": { ssr: false, headers: NOINDEX_HEADERS },
    // share-bets just left phase2Placeholders above. It's PUBLIC (the
    // baseline carried no robots directive on it at all — confirmed no
    // noindex, so it must end up indexable), but BookedBets.vue's setup
    // runs two SSR-unsafe operations (loadSharedBetslip()+openModal() and
    // fetchBethub(), both flagged in plan §9), so it stays ssr:false
    // WITHOUT a noindex header — absence of a noindex directive is enough
    // for it to be indexable; nothing here tells crawlers to skip it.
    "/share-bets": { ssr: false },
    "/share-bets/**": { ssr: false },

    // Every Phase-2 placeholder path (scaffold + the four real stub pages)
    // generated above: ssr:false where applicable plus an X-Robots-Tag
    // noindex header on all of them. See phase2NoindexRouteRules.
    ...phase2NoindexRouteRules,

    // --- Batch 0.2: restore the baseline redirects -------------------------
    // Restored from the deleted baseline router
    // (`git show 81ae85f:src/router/index.js:566-612`). The baseline
    // comment there said the authoritative 301s lived in
    // docker/config/app/nginx/conf.d/default.conf; `docker/` no longer
    // exists in this repo, so these routeRules are now the ONLY surviving
    // copy of this redirect layer. Real 301s (the baseline's own were
    // client-side 200s via vue-router `redirect`).
    //
    // Old pari-* / siaka-* virtual-game paths -> the "nai-*" names this app
    // actually uses.
    "/virtual-games/pari-league": {
      redirect: { to: "/virtual-games/nai-league", statusCode: 301 },
    },
    "/virtual-games/pari-turbo": {
      redirect: { to: "/virtual-games/nai-turbo", statusCode: 301 },
    },
    "/virtual-games/pari-virtual-jackpot": {
      redirect: { to: "/virtual-games/nai-virtual-jackpot", statusCode: 301 },
    },
    "/virtual-games/siaka-league": {
      redirect: { to: "/virtual-games/nai-league", statusCode: 301 },
    },
    "/virtual-games/siaka-turbo": {
      redirect: { to: "/virtual-games/nai-turbo", statusCode: 301 },
    },
    "/virtual-games/siaka-virtual-jackpot": {
      redirect: { to: "/virtual-games/nai-virtual-jackpot", statusCode: 301 },
    },
    // The old site had a sports lobby at /sports; this app has /sports/:sport.
    "/sports": { redirect: { to: "/sports/soccer", statusCode: 301 } },
    // Aviator has its own dedicated page.
    "/crash-games/aviator": { redirect: { to: "/aviator", statusCode: 301 } },
    // NOTE: "/crash-games/:name" -> "/crash/:name" is a function-shaped
    // redirect (needs the dynamic :name segment) and cannot be expressed as
    // a static routeRules value — see server/routes/crash-games/[name].js.
    //
    // Old lobbies. This app has a single casino lobby at /casino-home; the
    // /casino/:name and /crash/:name game routes are unaffected.
    "/casino": { redirect: { to: "/casino-home", statusCode: 301 } },
    "/crash": { redirect: { to: "/casino-home", statusCode: 301 } },
    // Retired features, kept resolving because the URLs are still indexed:
    // instant games were pulled, and the freebet/welcome-gift pages are
    // disabled.
    "/instant": { redirect: { to: "/casino-home", statusCode: 301 } },
    "/instant/live": { redirect: { to: "/casino-home", statusCode: 301 } },
    "/welcome-promotions": { redirect: { to: "/promotions", statusCode: 301 } },
    "/freebet": { redirect: { to: "/promotions", statusCode: 301 } },
    // The previous bandabets.com served every page under a /ke country prefix.
    // Strip it so indexed URLs and bookmarks keep resolving after the
    // cutover. Only the bare "/ke" path is handled here as a static
    // routeRule; "/ke/:pathMatch(.*)*" (preserving query + hash) is a
    // function-shaped redirect deferred to Batch G per the Phase 2 plan
    // (§4, 0.2) — a catch-all Nitro handler at this stage could swallow
    // paths that later batches haven't ported yet.
    "/ke": { redirect: { to: "/", statusCode: 301 } },
  },

  app: {
    head: {
      htmlAttrs: { lang: "en", class: "scroll-smooth scrollbar-hide" },
      bodyAttrs: { "data-theme": "dark" },
      title: "Bandabets Kenya – Bet on All Sports & Top Odds",
      meta: [
        { charset: "UTF-8" },
        {
          name: "viewport",
          content:
            "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
        },
        {
          name: "description",
          content:
            "Bet from as low as KSh 10 and win big with Bandabets! Enjoy on sports bets, thrilling casino games, huge jackpots, and virtual sports action.",
        },
        {
          name: "keywords",
          content:
            "bet, betting, online betting, online sports betting, sports betting",
        },
        { name: "application-name", content: "Bandabets" },
        { property: "og:site_name", content: "Bandabets Kenya" },
        { property: "og:locale", content: "en_KE" },
        { property: "fb:pages", content: "524814560726004" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:site", content: "@Bandabets" },
        {
          name: "theme-color",
          content: "#1a120a",
          media: "(prefers-color-scheme: dark)",
        },
        {
          name: "theme-color",
          content: "#fdf8f3",
          media: "(prefers-color-scheme: light)",
        },
        { name: "msapplication-TileColor", content: "#1a120a" },
      ],
      link: [
        { rel: "icon", href: "/favicon.ico", sizes: "any" },
        // Vector first — modern browsers prefer it and it stays crisp on
        // hi-dpi tab strips; the PNG/ICO entries below are the fallback.
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
        { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
        { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" },
        { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" },
        { rel: "manifest", href: "/site.webmanifest" },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Montserrat:wght@600;700&family=Great+Vibes&display=swap",
        },
        { rel: "preconnect", href: "https://imagedelivery.net", crossorigin: "" },
        { rel: "preconnect", href: "https://storage.googleapis.com", crossorigin: "" },
      ],
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },

  runtimeConfig: {
    public: {
      appVersion: "",
      matchesUrl: "",
      instantUrl: "",
      authUrl: "",
      betUrl: "",
      casinoUrl: "",
      cmsUrl: "",
      virtualUrl: "",
      virtualLeaguesUrl: "",
      kironLiteUrl: "",
      affiliateUrl: "",
      affiliateApiUrl: "",
      geniusGameTrackerUrl: "",
      onesignalAppId: "",
      depositTax: "",
      withdrawTax: "",
      aviatorGameId: "",
      aviatrixGameId: "",
      footballxGameId: "",
      hakiLeagueGameId: "",
      hakiTurboGameId: "",
      kironJackpotGameId: "",
      jetxGameId: "",
      virtualGameId: "",
      crashRoyaleGameId: "",
      virtualSpinGameId: "",
      maestroGameId: "",
      paybillNo: "",
      tenantCode: "",
      propellerAid: "",
      propellerTid: "",
      livePollInterval: "",
      ussdActivateAccount: "",
    },
  },
});
