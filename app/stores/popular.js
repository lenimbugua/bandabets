import { usePopular } from "../composables/usePopular";

export const usePopularStore = defineStore("popular-store", {
  // state() is a factory invoked when the store is instantiated (inside a
  // component/plugin setup), which is a valid context for useRuntimeConfig()
  // — unlike the previous module-scope `const { games } = usePopular();`.
  state: () => {
    const { games, newGames } = usePopular();
    return {
      games,
      newGames,
    };
  },

  actions: {
    reset() {
      const { games } = usePopular();
      this.games = games;
    },
    getGamesByProvider(providerId) {
      const { games } = usePopular();
      if (providerId == "all") {
        this.games = games;
        return;
      }
      this.games = games.filter((game) => game.provider_id === providerId);
    },

    getGamesByCategory(categoryId) {
      const { games } = usePopular();
      if (categoryId == "all") {
        this.games = games;
        return;
      }
      this.games = games.filter((game) => game.category_id === categoryId);
    },
  },
});
