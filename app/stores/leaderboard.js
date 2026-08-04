import API, { affiliateBaseURL } from "../services/API";

// Factory, not a module-scope literal: state() calls this on every store
// instantiation so each store instance (and, on the server, each concurrent
// request) gets its own array rather than a shared reference that a
// mutation from one user's session could leak into every other request.
function createCategories() {
  return ["sport", "casino"];
}

export const useLeaderboardStore = defineStore("leaderboard-store", {
  state: () => {
    const categories = createCategories();
    return {
      pending: false,
      leaderboard: [],
      prizes: [],
      games: [],
      eligibleGames: [],
      responseOK: false,
      categories,
      selected: categories[0],
    };
  },

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
