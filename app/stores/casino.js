import { defineStore, storeToRefs } from "pinia";
import API, { casinoBaseURL } from "../services/API";
import { useLoginStore } from "./login";

import { useScreenSizes } from "../composables/useScreenSizes";

import { useCasino } from "@/composables/useCasino";

function getAuthHeaders() {
  const { profileSid, token } = storeToRefs(useLoginStore());
  const headers = {};
  if (token.value) {
    headers.Authorization = `Bearer ${token.value}`;
  }
  if (profileSid.value) {
    headers["X-PROFILE-SID"] = profileSid.value;
  }
  return { headers, profileSid };
}

const { initialCategories, providers, categories, getGames, meta } =
  useCasino();

// Soft-gaming tenant. Drives the sg-* casino endpoints.
const tenantCode = import.meta.env.VITE_TENANT_CODE;

const HIDDEN_GAMES = ["pari league", "pari jackpot", "haki league", "haki jackpot"];
function filterHiddenGames(games) {
  if (!games) return [];
  return games.filter((g) => !HIDDEN_GAMES.includes(g.gameName?.toLowerCase()));
}

function normalizeGame(game) {
  return {
    ...game,
    imgUrl: game.image ?? game.imgUrl ?? null,
    imgFullUrl: game.image ?? game.imgFullUrl ?? null,
  };
}

export const useCasinoStore = defineStore("casino-store", {
  state: () => ({
    error: null,
    pending: false,
    categoryIsPending: false,
    responseOK: false,

    casinosGames: [],

    casinoCategories: categories,
    initialCategories: initialCategories,
    providers: providers,

    categoriesWithGames: [],
    categoriesLoading: false,

    activeCategoryGames: [],
    activeCategoryLoading: false,

    selectedCategory: null,

    launchData: null,
    gameIdToLaunch: null,
    gameNameToLaunch: null,
    gameProviderToLaunch: null,
    gameImageToLaunch: null,

    meta: meta,
    isDemo: 0,

    searchTerm: "",
  }),

  getters: {
    searchByName: (state) =>
      state.casinosGames.filter((game) =>
        game.gameName.toLowerCase().includes(state.searchTerm.toLowerCase())
      ),
  },

  actions: {
    setSearchTerm(term) {
      this.searchTerm = term;
    },
    async getAllCasinos() {
      if (this.selectedCategory.cat_binomen) {
        this.casinosGames = getGames(this.selectedCategory.cat_binomen);
        return;
      }
      if (this.selectedCategory.p_binomen) {
        this.casinosGames = getGames(this.selectedCategory.p_binomen);
        return;
      }
    },

    async getCategories() {
      try {
        this.error = null;
        this.responseOK = false;
        const { headers } = getAuthHeaders();
        const response = await API(casinoBaseURL).get(
          "/api/v1/games/categories",
          { headers }
        );
        this.casinoCategories = response.data.data.categories;
        this.responseOK = true;
      } catch (err) {
        console.log(err);
        this.responseOK = false;
        // this.error = err.response.data.statusMessage;
        this.pending = false;
      }
    },

    async fetchCategoriesWithGames() {
      try {
        this.categoriesLoading = true;
        const { headers } = getAuthHeaders();
        const response = await API(casinoBaseURL).get(
          `/api/v1/sg-categories/tenant/${tenantCode}`,
          { headers }
        );
        const payload = Array.isArray(response.data)
          ? response.data
          : response.data?.data ?? [];
        this.categoriesWithGames = payload.map((category) => ({
          ...category,
          games: filterHiddenGames(category.games).map(normalizeGame),
        }));
      } catch (err) {
        console.log(err);
      } finally {
        this.categoriesLoading = false;
      }
    },

    async fetchProviders() {
      try {
        const { headers } = getAuthHeaders();
        const response = await API(casinoBaseURL).get(
          `/api/v1/sg-games/providers?tenantCode=${tenantCode}`,
          { headers }
        );
        // Endpoint returns a bare array of { providerName }. Tolerate a
        // { data: [...] } envelope too in case the gateway wraps it.
        const payload = response.data;
        this.providers = Array.isArray(payload) ? payload : payload?.data ?? [];
      } catch (err) {
        console.log(err);
      }
    },

    async fetchCategoryBySlug(slug) {
      try {
        this.activeCategoryLoading = true;
        this.activeCategoryGames = [];
        const { headers } = getAuthHeaders();
        const response = await API(casinoBaseURL).get(
          `/api/v1/categories/${slug}/games`,
          { headers }
        );
        const games = response.data?.games ?? [];
        this.activeCategoryGames = filterHiddenGames(games).map(normalizeGame);
      } catch (err) {
        console.log(err);
        this.activeCategoryGames = [];
      } finally {
        this.activeCategoryLoading = false;
      }
    },

    async fetchGamesByCategory(id) {
      let endPoint = "/api/v1/games";
      if (id) {
        endPoint = `/api/v1/games/${id}`;
      }
      try {
        this.error = null;
        this.responseOK = false;
        const { headers } = getAuthHeaders();
        const response = await API(casinoBaseURL).get(endPoint, { headers });
        this.casinosGames = response.data;
        this.responseOK = true;
      } catch (err) {
        this.responseOK = false;
        this.error = err.response.data.statusMessage;
        this.pending = false;
      }
    },

    async fetchActiveCategoryGames(categoryId) {
      try {
        this.activeCategoryLoading = true;
        this.activeCategoryGames = [];
        const { headers } = getAuthHeaders();
        const response = await API(casinoBaseURL).get(
          `/api/v1/games/${categoryId}`,
          { headers }
        );
        this.activeCategoryGames = filterHiddenGames(response.data.data ?? response.data);
      } catch (err) {
        console.log(err);
        this.activeCategoryGames = [];
      } finally {
        this.activeCategoryLoading = false;
      }
    },

    async launchGame() {
      const { isMediumScreen, isLargeScreen } = useScreenSizes();
      const isMobile = isMediumScreen.value || isLargeScreen.value ? "0" : "1";
      try {
        this.error = null;
        this.responseOK = false;
        this.pending = true;
        const { headers, profileSid } = getAuthHeaders();
        const profileId = profileSid.value ? profileSid.value : "";
        const response = await API(casinoBaseURL).get(
          `/api/v1/sg-games/launch?gameId=${this.gameIdToLaunch}&profileSid=${profileId}&isMobile=${isMobile}&isDemo=${this.isDemo}`,
          { headers }
        );
        this.pending = false;
        this.launchData = response.data;
        this.responseOK = Boolean(response.data?.launchBody);
      } catch (err) {
        this.responseOK = false;
        this.pending = false;
        this.error =
          err.response?.data?.errorMessage ??
          err.response?.data?.error_message ??
          err.response?.data?.statusMessage ??
          err.message;
      }
    },

    setLaunchGameId(gameId) {
      this.gameIdToLaunch = gameId;
    },
    setLaunchGameMeta(name, provider, image) {
      this.gameNameToLaunch = name || null;
      this.gameProviderToLaunch = provider || null;
      this.gameImageToLaunch = image || null;
    },

    setSelectedCategory(category) {
      this.selectedCategory = category;
    },
    setCategoryIsPending(isPending) {
      this.categoryIsPending = isPending;
    },
    setPending(isPending) {
      this.pending = isPending;
    },
    setIsDemo(isDemo) {
      this.isDemo = isDemo;
    },
  },
  persist: {
    pick: [
      "launchData",
      "gameNameToLaunch",
      "gameProviderToLaunch",
      "gameImageToLaunch",
    ],
  },
});
