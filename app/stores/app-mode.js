
export const useAppModeStore = defineStore("app-mode", {
  state: () => ({
    lastMode: "sports", // "casino" | "sports"
  }),
  actions: {
    setLastMode(mode) {
      if (mode !== "casino" && mode !== "sports") return;
      this.lastMode = mode;
    },
  },
  persist: { key: "siakabet:appMode" },
});
