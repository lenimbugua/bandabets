import { provideSSRWidth } from "@vueuse/core";

// app/layouts/default.vue renders its ENTIRE <slot /> inside three mutually
// exclusive branches (v-if="isLargeScreen" / v-else-if="isMediumScreen" /
// v-else-if="isSmallScreen"), all driven by useMediaQuery() from
// useScreenSizes.js. On the server there is no `window.matchMedia`, so
// without this plugin all three evaluate to false, no branch matches, and
// NOTHING but the sr-only <h1> above the v-if is ever server-rendered —
// every route would ship an empty shell to crawlers.
//
// provideSSRWidth() seeds a deterministic viewport width that VueUse's
// useMediaQuery() (via useSSRWidth()/inject) uses for its first synchronous
// evaluation, on both the server (no matchMedia at all) and the client
// (avoids a hydration-mismatch flicker before real matchMedia takes over).
//
// 390px: Google indexes mobile-first, and this market (Kenyan sports
// betting) is mobile-dominant, so the server should render the mobile
// branch. Verified against useScreenSizes.js's actual queries:
//   isSmallScreen  (min-width: 100px)  -> 390 >= 100  -> true
//   isMediumScreen (min-width: 768px)  -> 390 >= 768  -> false
//   isLargeScreen  (min-width: 1024px) -> 390 >= 1024 -> false
// So the v-else-if="isSmallScreen" branch renders and crawlers get real
// mobile markup instead of an empty shell.
//
// Because the layout branches on JS state rather than CSS media queries,
// whichever branch is server-rendered is the one hydration keeps; if the
// real client viewport differs, the OTHER branch's markup gets swapped in
// client-side after hydration. That's an existing characteristic of this
// JS-driven responsive design, not something this plugin fixes.
//
// No .client/.server suffix: this must run in BOTH contexts. On the server
// it's the only source of a usable width; on the client it primes the same
// value so the first render matches the server's output before matchMedia
// (which the effect above still switches to) confirms the real viewport.
export default defineNuxtPlugin((nuxtApp) => {
  provideSSRWidth(390, nuxtApp.vueApp);
});
