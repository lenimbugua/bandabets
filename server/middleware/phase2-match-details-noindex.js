// ============================================================================
// REMOVE THIS FILE WHEN PHASE 2 SHIPS THE REAL MATCH-DETAILS PAGE.
//
// Unlike the routeRules half of the Phase-1 placeholder scaffold (in
// nuxt.config.js), this middleware matches by URL SHAPE (the regex below),
// NOT by membership in the phase2Placeholders array. Deleting the
// "match-details" entry from that array does NOT stop this file from
// firing. If Phase 2 ports the real page to this same URL shape
// (/sports/:sport/:country/:league/:matchSlug-:id) and this file is still
// present, it will keep slapping X-Robots-Tag: noindex, nofollow on the
// real, live match-details page — silently, with no error — forever.
// Delete this file (or gate it behind a condition that is provably false
// once the real page exists) as part of that Phase 2 work.
// ============================================================================
//
// Nitro global middleware — exists solely because ONE Phase-1 placeholder
// route (see nuxt.config.js's phase2Placeholders) can't safely get its
// X-Robots-Tag header from `routeRules` the way the other 27 do.
//
// "match-details" registers as /sports/:sport/:country/:league/:matchSlug(.*)-:id.
// Nitro's routeRules matcher (radix3's `toRouteMatcher`, used by
// getRouteRulesForPath) treats ANY dynamic path segment as matching all
// deeper paths under that prefix, REGARDLESS of how many segments the
// pattern declares — this was verified directly against radix3@1.1.2
// (the version pinned in this repo) with a throwaway script: registering
// routeRules key "/sports/*/*/*/*" (four single-segment placeholders,
// which should in principle require exactly 5 path segments) also matched
// "/sports/football" (2 segments) and "/sports/live/football" (3
// segments) when queried via toRouteMatcher(...).matchAll(). Root cause:
// _routerNodeToTable's PLACEHOLDER branch keys the "dynamic" lookup table
// by the STATIC PREFIX up to the FIRST placeholder only, and _matchRoutes'
// recursive subPath computation collapses to "/" after the first hop for
// short remaining paths — so a routeRules entry with a dynamic segment
// under /sports/ behaves like an unintended /sports/** catch-all. That
// would have wrongly noindexed three of the six real, currently-working
// SEO routes (/sports/football, /sports/live/football,
// /sports/football/kenya/premier-league).
//
// The other 27 Phase-1 placeholder paths in nuxt.config.js are either
// fully static (no ":" or "(" in any segment — radix3 gives those an exact
// NORMAL/static node, unaffected by this) or live under a URL prefix with
// no real indexed route sharing it (e.g. /casino/**, /promotion-details/**,
// /share-bets/**), so the same looseness there is harmless — nothing real
// exists at those prefixes to accidentally noindex. match-details is the
// only one that is both dynamic AND shares its prefix (/sports/) with real
// SEO routes, so it alone gets a precise, hand-written regex check here
// instead of a routeRules entry.
export default defineEventHandler((event) => {
  const path = (event.path || "").split("?")[0];
  // Exactly 5 non-empty segments under /sports/ — the shape of
  // match-details (/sports/:sport/:country/:league/:matchSlug-:id) and
  // nothing else registered in this app. The real country page is 4
  // segments (/sports/[sport]/[country]/[league]); sports/live pages are
  // 2/3 segments — neither can match this.
  if (/^\/sports\/[^/]+\/[^/]+\/[^/]+\/[^/]+$/.test(path)) {
    setResponseHeader(event, "X-Robots-Tag", "noindex, nofollow");
  }
});
