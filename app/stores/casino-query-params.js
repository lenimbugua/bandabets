
import { useScreenSizes } from "../composables/useScreenSizes";

export const useCasinoQueryParamsStore = defineStore(
  "casino-query-params-store",
  {
    // useScreenSizes() must be called here, inside the state factory, not at
    // module scope: a module-scope call runs once at import time (before
    // useNuxtApp() has a Nuxt instance to attach to, and before
    // app/plugins/ssr-width.js has run), and on the server it would be
    // shared/stale across every request. The state factory runs per store
    // instance (per request on the server), so it's a valid place to call it.
    state: () => {
      const { isSmallScreen } = useScreenSizes();

      return {
        category_id: "",
        provider_id: "",
        filter: "",
        page: "1",
        resource: "games",
        mode: "1",
        platform: isSmallScreen.value ? "mobile" : "desktop",
      };
    },

    getters: {
      getParams: (state) => {
        return {
          category_id: state.category_id,
          provider_id: state.provider_id,
          filter: state.filter,
          page: state.page,
          resource: state.resource,
          mode: state.mode,
          platform: state.platform,
        };
      },
    },

    actions: {
      /** ---! Start set params section ---! */
      resetToDefaults() {
        const { isSmallScreen } = useScreenSizes();

        this.category_id = "";
        this.provider_id = "";
        this.filter = "";
        this.page = 1;
        this.resource = "games";
        this.mode = 1;
        this.platform = isSmallScreen.value ? "mobile" : "desktop";
      },

      setCategoryId(categoryId) {
        this.category_id = categoryId;
      },
      setProviderId(providerId) {
        this.provider_id = providerId;
      },
    },
  }
);
