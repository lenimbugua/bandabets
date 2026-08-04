import { defineStore } from "pinia";
import API from "../services/API";

export const useSearchStore = defineStore("search-store", {
  state: () => ({
    error: null,
    pending: false,
    responseOK: false,
    searchTerm: null,

    competitionIsPending: false,

    matches: [],
    competition: "",
  }),

  actions: {
    setSearchTerm(payload) {
      this.searchTerm = payload;
    },
    async performSearch(searchTerm) {
      if (!searchTerm) {
        return;
      }
      try {
        this.searchTerm = searchTerm;
        this.pending = true;

        this.error = null;
        this.responseOK = false;
        this.matches = null;

        const response = await API().get(
          "/sportsbook/api/v2/search?filter=" + searchTerm
        );
        this.matches = response.data.data.matches;
        this.pending = false;
        this.responseOK = true;
      } catch (err) {
        this.responseOK = false;
        this.error = err.response;
        this.pending = false;
      }
    },

    async fetchCompetitionMatches(competition, index) {
      try {
        // this.resetToDefaults();
        this.competition = competition;
        //   this.setSortBy(sortByLeague);
        this.competitionIsPending = true;
        this.error = {
          hasError: false,
          message: "",
          field: "",
        };
        this.responseOK = false;
        const response = await API().get(
          "/sportsbook/api/v2/search?filter=" + this.searchTerm,
          {
            params: { competition: this.competition },
          }
        );

        if (response?.data?.data?.competitions[0]) {
          this.competitions[index] = response.data.data.competitions[0];
        }
        this.competitionIsPending = false;
        this.pending = false;
        this.responseOK = true;
      } catch (err) {
        console.log(err);
        this.competitionIsPending = false;
        this.pending = false;
      }
    },
    toggleOutcomes(index) {
      const competition = this.competitions[index];
      if (!competition) {
        return;
      }

      if (competition["isOpened"]) {
        competition.isOpened = !competition.isOpened;
      } else {
        competition["isOpened"] = false;
      }
      this.competitions[index] = competition;
    },
  },
});
