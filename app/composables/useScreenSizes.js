import { effectScope } from "vue";
import { useMediaQuery } from "@vueuse/core";

// Cache key for the refs stashed on the current Nuxt app instance (see
// below). A Symbol avoids any chance of colliding with a real NuxtApp
// property.
const SCREEN_SIZES_KEY = Symbol("screen-sizes");

export function useScreenSizes() {
  // These MUST be created lazily, inside this function, and memoised on the
  // current Nuxt app instance rather than at module scope OR fresh on every
  // call:
  //  1. Module scope is out: those refs are created once per server process
  //     (at import time) and shared across every concurrent SSR request — a
  //     request-isolation bug. useNuxtApp() also throws "nuxt instance
  //     unavailable" if called at module scope, so a bare module-scope call
  //     isn't even viable here.
  //  2. Fresh-per-call is also out: useMediaQuery() registers a watchEffect
  //     plus a matchMedia listener. Callers outside component setup (e.g.
  //     the Pinia actions below) have no owning effect scope to clean those
  //     up, so calling this on every invocation leaks listeners on every
  //     click. Memoising on nuxtApp bounds it to one set of refs per
  //     request (SSR) / per app instance (client) — the closest in-Nuxt
  //     equivalent of the old module singleton, without sharing state
  //     across concurrent requests.
  //  3. The SSR width (see app/plugins/ssr-width.js) is provided via
  //     `app.provide()` on the per-request Vue app instance. VueUse reads it
  //     through Vue's injection context (`useSSRWidth()` -> `injectLocal`),
  //     which only exists during component setup. Because creation is still
  //     lazy, the first real call — always app/layouts/default.vue's setup,
  //     since the layout renders before any page/action can run — happens
  //     inside that injection context and sees the provided width. Later
  //     calls (including from actions) just reuse the cached refs.
  const nuxtApp = useNuxtApp();

  if (!nuxtApp[SCREEN_SIZES_KEY]) {
    // useMediaQuery() registers a watchEffect (plus, client-side, a
    // matchMedia listener) that Vue expects an active EffectScope to own
    // so it can be torn down. The first call here can happen outside any
    // component's setup (see point 3 above — usually it IS inside
    // default.vue's setup, but callers aren't required to guarantee
    // that), which means there is no such scope by default. A detached
    // effectScope(true) ("detached" so it isn't itself absorbed into
    // whatever scope happens to be active at call time) gives these refs
    // an explicit owner without changing the memoisation above: it's
    // created and run once, on first access, and the resulting refs are
    // cached on nuxtApp exactly as before.
    const scope = effectScope(true);
    nuxtApp[SCREEN_SIZES_KEY] = scope.run(() => ({
      isSmallScreen: useMediaQuery("(min-width: 100px)"), // Phones and above
      isMediumScreen: useMediaQuery("(min-width: 768px)"), // Tablets and above
      isLargeScreen: useMediaQuery("(min-width: 1024px)"), // Desktops and above
      isPreferredDark: useMediaQuery("(prefers-color-scheme: dark)"),
    }));
  }

  return nuxtApp[SCREEN_SIZES_KEY];
}
