import { defineStore } from "pinia";

const defaultSportId = 10;

export const useLiveSportsNavigationStore = defineStore(
  "live-sports-navigation-store",
  {
    state: () => ({
      selectedSportId: "",
    }),

    actions: {
      setSelectedSportId(id) {
        this.selectedSportId = id;
      },
      resetSelectedSportId() {
        this.selectedSportId = defaultSportId;
      },
    },

    persist: true,
  }
);
