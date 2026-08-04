// import { useSportsQueryParamsStore } from "@/stores/sports-query-params";
import { defineStore } from "pinia";
import API from "../services/API";
import { useCompetionsStore } from "./competitions";

export const useCountriesStore = defineStore("countries-store", {
  state: () => ({
    error: null,
    pending: false,
    responseOK: false,
    countries: [],
    token: null,
    selectedCountry: null,
    selectedCompetitions: [],
    selectedCompetition: null,
    selectedSport: null,
  }),

  actions: {
    async fetchCountries() {
      try {
        this.pending = true;

        this.error = null;
        this.responseOK = false;
        this.countries = null;

        const url = `/sportsbook/api/v2/countries?resource=trending`;

        const response = await API().get(url);
        this.pending = false;

        this.error = null;
        this.responseOK = false;
        this.countries = response.data.data.countries;
        this.openFirstCompetitionsOnMount(this.countries);

        console.log(this.selectedCountry);
        this.getCompetitionsByCountry(this.selectedCountry);
      } catch (err) {
        console.log(err);
        this.responseOK = false;
        this.error = err.response.data.statusMessage;
        this.pending = false;
      }
    },

    async fetchChangeEventCountries() {
      try {
        this.pending = true;

        this.error = null;
        this.responseOK = false;
        this.countries = null;
        // const { sport } = storeToRefs(useSportsQueryParamsStore());

        const url = `/sportsbook/api/v1/countries-by-sport?resource=trending&sport=${this.selectedSport}`;

        const response = await API().get(url);
        this.pending = false;

        this.error = null;
        this.responseOK = false;
        this.countries = response.data.data.countries;
        this.getCompetitionsByCountry(this.selectedCountry);
      } catch (err) {
        console.log(err);
        this.responseOK = false;
        this.error = err.response.data.statusMessage;
        this.pending = false;
      }
    },

    fetchGame(competition) {
      const { fetchCompetions, selectCompetitions } = useCompetionsStore();

      selectCompetitions([competition.competitionId]);
      //   this.setSelectedCompetition(competition.competitionName);
      fetchCompetions();
    },

    // fetchGame(competition) {
    //   const { getMatches, emptyMatches } = useMatches2Store();
    //   const { setCompetition, setMatchId, setResource } =
    //     useSportsQueryParamsStore();
    //   setMatchId("");
    //   setResource("");
    //   setCompetition(competition.competitionId);
    //   emptyMatches();
    //   getMatches();
    // },

    getCompetitionsByCountry(countryName, selectCompetition = false) {
      if (!countryName) {
        this.setSelectedCompetitions([]);
        return;
      }
      const country = this.countries.find(
        (c) => c?.countryName?.toLowerCase() === countryName?.toLowerCase()
      );
      if (!country) {
        this.setSelectedCompetitions([]);
        return;
      }
      this.selectCountry(country.countryName);
      if (selectCompetition) {
        this.setSelectedCompetition(country.competitions[0].competitionName);
      }
      this.setSelectedCompetitions(country.competitions);
      this.fetchGame(country.competitions[0]);
    },

    selectCountry(country) {
      this.selectedCountry = country;
    },

    selectSport(sportId) {
      this.selectedSport = sportId;
    },

    setSelectedCompetitions(competitions) {
      this.selectedCompetitions = competitions;
    },
    setSelectedCompetition(competition) {
      this.selectedCompetition = competition;
    },

    resetError() {
      this.error = null;
    },

    openFirstCompetitionsOnMount(competitions) {
      competitions.forEach((competition, index) => {
        if (index < 4) {
          competition.isOpened = true;
        }
      });
    },
  },
  pick: true,
});
