import { defineStore } from "pinia";

export const useSportsStore = defineStore("sports-store", {
  state: () => ({
    selectedSport: "soccer",
    viewToDisplay: "sport",
  }),

  actions: {
    setSelectedSport(content) {
      this.selectedSport = content;
    },
    resetSelectedSport() {
      this.selectedSport = "Soccer";
    },
    setViewToDisplay(content) {
      this.viewToDisplay = content;
    },
  },
});
