import { useMediaQuery } from "@vueuse/core";

export function useScreenSizes() {
  // These MUST be created inside this function, not at module scope:
  //  1. Module-scope refs are created once per server process and shared
  //     across every concurrent SSR request (a request-isolation bug).
  //  2. The SSR width used below (see app/plugins/ssr-width.js) is provided
  //     via `app.provide()` on the per-request Vue app instance. VueUse reads
  //     it through Vue's injection context (`useSSRWidth()` -> `injectLocal`),
  //     which only exists during component setup. A module-scope call runs at
  //     import time, before any plugin runs and outside any component's
  //     setup, so it could never see the provided width.
  const isSmallScreen = useMediaQuery("(min-width: 100px)"); // Phones and above
  const isMediumScreen = useMediaQuery("(min-width: 768px)"); // Tablets and above
  const isLargeScreen = useMediaQuery("(min-width: 1024px)"); // Desktops and above
  const isPreferredDark = useMediaQuery("(prefers-color-scheme: dark)");

  return {
    isSmallScreen,
    isMediumScreen,
    isLargeScreen,
    isPreferredDark,
  };
}
