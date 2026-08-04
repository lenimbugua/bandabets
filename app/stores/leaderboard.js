import { defineStore } from "pinia";
import API, { affiliateBaseURL } from "../services/API";

const categories = ["sport", "casino"];
const selected = categories[0];

export const useLeaderboardStore = defineStore("leaderboard-store", {
  state: () => ({
    pending: false,
    leaderboard: [],
    prizes: [],
    games: [],
    eligibleGames: [],
    responseOK: false,
    categories: categories,
    selected: selected,
  }),

  getters: {
    isSelected: (state) => {
      return (tab) => state.selected === tab;
    },
  },

  actions: {
    async fetchLeaderboard() {
      try {
        this.pending = true;

        this.responseOK = false;

        const response = await API(affiliateBaseURL).get(
          `/api/leaderboard/${this.selected}`
        );
        this.pending = false;

        this.leaderboard = response.data.data.leaderboard;
        console.log(this.leaderboard);
        this.prizes = response.data.data.leaderboard;
        this.games = response.data.data.games;
        this.responseOK = true;
      } catch (err) {
        this.responseOK = false;
        // this.error = err?.response?.data?.statusMessage;
        console.log(err);
        this.pending = false;
      } finally {
        this.pending = false;
      }
    },
    async fetchEligibleGames() {
      try {
        const response = await API(affiliateBaseURL).get(
          `/api/leaderboard/sport/eligible-games`
        );
        this.eligibleGames = response.data.data;
      } catch (err) {
        console.log(err);
        this.eligibleGames = [];
      }
    },
    setSelected(tab) {
      this.selected = tab;
      this.fetchLeaderboard();
      this.fetchEligibleGames();
    },
  },
});
