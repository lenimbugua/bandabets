import { defineStore } from "pinia";
import API from "../services/API";

export const useTopLeaguesStore = defineStore("top-leagues-store", {
  state: () => ({
    pending: false,
    topLeagues: [],
  }),

  actions: {
    async fetchTopLeagues() {
      try {
        this.pending = true;

        const response = await API().get("/sportsbook/api/v1/top-leagues");
        this.pending = false;
        this.topLeagues = response.data;
      } catch (err) {
        this.pending = false;
        console.log(err);
      }
    },
  },
});
