import { defineStore } from "pinia";

export const useAviatorStore = defineStore("aviator-store", {
  state: () => ({
    view: "",
  }),

  actions: {
    setView(view) {
      this.view = view;
    },
    reset() {
      this.view = "";
    },
  },
});
