import { defineStore } from "pinia";
import { usePopular } from "../composables/usePopular";
const { games, newGames } = usePopular();
export const usePopularStore = defineStore("popular-store", {
  state: () => ({
    games: games,
    newGames: newGames,
  }),

  actions: {
    reset() {
      this.games = games;
    },
    getGamesByProvider(providerId) {
      if (providerId == "all") {
        this.games = games;
        return;
      }
      this.games = games.filter((game) => game.provider_id === providerId);
    },

    getGamesByCategory(categoryId) {
      if (categoryId == "all") {
        this.games = games;
        return;
      }
      this.games = games.filter((game) => game.category_id === categoryId);
    },
  },
});
