import { defineStore } from "pinia";

import { useScreenSizes } from "../composables/useScreenSizes";

const { isSmallScreen } = useScreenSizes();

export const useCasinoQueryParamsStore = defineStore(
  "casino-query-params-store",
  {
    state: () => ({
      category_id: "",
      provider_id: "",
      filter: "",
      page: "1",
      resource: "games",
      mode: "1",
      platform: isSmallScreen.value ? "mobile" : "desktop",
    }),

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
