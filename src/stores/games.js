import { defineStore } from "pinia";
import API, { cmsBaseURL } from "../services/API";

export const useGamesStore = defineStore("games-store", {
  state: () => ({
    error: null,
    pending: false,
    games: [],
  }),

  actions: {
    async fetchGames(category) {
      try {
        this.error = null;
        this.responseOK = false;
        this.pending = true;
        const response = await API(cmsBaseURL).get(
          "/site/games/list/" + category
        );
        this.games = response.data;
        this.responseOK = true;
        this.pending = false;
      } catch (err) {
        console.log(err);
        this.responseOK = false;
        // this.error = err.response.data.statusMessage;
        this.pending = false;
      } finally {
        this.pending = false;
      }
    },
  },
  persist: false,
});
