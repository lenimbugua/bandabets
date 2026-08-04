// Batch 0.2 — ported verbatim from the deleted baseline router
// (`git show 81ae85f:src/router/index.js`, lines ~920-937). Same
// vue-router `scrollBehavior(to, from, savedPosition)` signature; Nuxt
// picks this file up automatically for `@nuxt/vue-router`'s router
// options.
//
// The `from.name === "match-details"` branch exists so that page's own
// scroll-restoration logic (`app/composables/useScrollToViewedMatch.js`,
// which still reads `.matches-scroll-container` / `window.innerWidth`)
// can run instead of the router's default. This file must land before or
// with Batch E (`match-details`), which is the only route that name
// currently belongs to.
export default {
  scrollBehavior(to, from, savedPosition) {
    // 1. When user navigates back/forward using browser buttons
    if (savedPosition) {
      return savedPosition;
    }

    // 2. When navigating to homepage, only scroll-restore from
    // match-details; otherwise no scroll.
    const homeRoutes = ["home", "sports"];
    if (homeRoutes.includes(to.name)) {
      if (from.name === "match-details") {
        return false; // let component handle scroll restore
      }
      return false; // no auto-scroll on homepage
    }

    // 3. Default: scroll to top for other pages.
    return { top: 0 };
  },
};
