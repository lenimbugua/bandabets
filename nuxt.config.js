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
const phase2RequiresAuthNames = new Set([
  "bet-details",
  "deposit",
  "join-affiliate",
  "pari-league",
  "pari-turbo",
  "pari-virtual-jackpot",
  "playon",
  "profile",
  "self-exclusion",
  "withdraw",
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
  { name: "bet-details", path: "/bet-details" },
  { name: "change-password", path: "/change-password" },
  { name: "countries", path: "/sports/soccer/countries" },
  { name: "deposit", path: "/deposit" },
  { name: "forgot-password", path: "/forgot-password" },
  // "games" has no entry in the old router at all (nearest analog was
  // "play-casino-games" at /casino/:name, which is what this mirrors) —
  // a judgment call, not a sourced path. Flagged in task-10-report.md.
  { name: "games", path: "/casino/:name" },
  { name: "join-affiliate", path: "/join-affiliate" },
  { name: "leaderboard", path: "/leaderboard" },
  {
    name: "match-details",
    path: "/sports/:sport/:country/:league/:matchSlug(.*)-:id",
  },
  { name: "pari-league", path: "/virtual-games/nai-league" },
  { name: "pari-turbo", path: "/virtual-games/nai-turbo" },
  { name: "pari-virtual-jackpot", path: "/virtual-games/nai-virtual-jackpot" },
  { name: "playon", path: "/virtual-games/playon" },
  { name: "privacy-policy", path: "/privacy-policy" },
  { name: "profile", path: "/profile" },
  { name: "promotion-details", path: "/promotion-details/:name" },
  { name: "reset-password", path: "/reset-password" },
  // Not in the coordinator's enumerated 27 — found independently while
  // tracing Footer.vue's legalLinks array. Still blocks all six SEO
  // routes without it, so it's included here anyway.
  { name: "responsible-gambling", path: "/responsible-gambling" },
  { name: "self-exclusion", path: "/profile/exclude" },
  { name: "share-bets", path: "/share-bets/:code?" },
  { name: "share-feedback", path: "/share-feedback" },
  { name: "share-happiness", path: "/share-happiness" },
  { name: "sort-deposit", path: "/sort-deposit" },
  { name: "terms-and-conditions", path: "/terms-and-conditions" },
  { name: "verify-account", path: "/verify-account" },
  { name: "welcome-gift", path: "/welcome-gift" },
  { name: "withdraw", path: "/withdraw" },
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
// EXCEPTION: "match-details" is deliberately skipped here. Its path
// (/sports/:sport/:country/:league/:matchSlug(.*)-:id) is dynamic AND
// shares the /sports/ prefix with three real, currently-working SEO
// routes. Nitro's routeRules matcher (radix3's toRouteMatcher) does not
// respect segment-count depth for dynamic patterns — verified directly: a
// "/sports/*/*/*/*" routeRules entry also matched "/sports/football" and
// "/sports/live/football" when queried, which would have wrongly
// noindexed those live routes. match-details gets its header from
// server/middleware/phase2-match-details-noindex.js instead, via precise
// regex segment-counting — see that file for the full root-cause trace.
// Every OTHER dynamic placeholder path here (games, promotion-details,
// share-bets) is safe despite the same matcher looseness because nothing
// real shares their URL prefix (/casino/**, /promotion-details/**,
// /share-bets/**) — there's nothing there to accidentally noindex.
const phase2NoindexRouteRules = {};
for (const { name, path } of phase2Placeholders) {
  if (name === "match-details") continue;
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

  modules: ["@pinia/nuxt", "pinia-plugin-persistedstate/nuxt", "@vueuse/nuxt"],

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
    // Every Phase-2 placeholder path (scaffold + the four real stub pages)
    // generated above: ssr:false where applicable plus an X-Robots-Tag
    // noindex header on all of them. See phase2NoindexRouteRules.
    ...phase2NoindexRouteRules,
  },

  app: {
    head: {
      htmlAttrs: { lang: "en", class: "scroll-smooth scrollbar-hide" },
      bodyAttrs: { "data-theme": "dark" },
      title: "Naibet Kenya – Bet on All Sports & Top Odds",
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
            "Bet from as low as KSh 10 and win big with Naibet! Enjoy on sports bets, thrilling casino games, huge jackpots, and virtual sports action.",
        },
        {
          name: "keywords",
          content:
            "bet, betting, online betting, online sports betting, sports betting",
        },
        { name: "application-name", content: "Naibet" },
        { property: "og:site_name", content: "Naibet Kenya" },
        { property: "og:locale", content: "en_KE" },
        { property: "fb:pages", content: "524814560726004" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:site", content: "@NaibetKe" },
        {
          name: "theme-color",
          content: "#0a0f1a",
          media: "(prefers-color-scheme: dark)",
        },
        {
          name: "theme-color",
          content: "#f8fafc",
          media: "(prefers-color-scheme: light)",
        },
        { name: "msapplication-TileColor", content: "#121826" },
      ],
      link: [
        { rel: "icon", href: "/favicon.ico", sizes: "any" },
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
