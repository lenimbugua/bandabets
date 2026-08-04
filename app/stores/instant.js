import { defineStore } from "pinia";
import API from "../services/API";

import { useModalStore } from "@/stores/modal";

import { instantBaseURL } from "../services/API";

import englishFlag from "@/assets/img/england.png";
import italianFlag from "@/assets/img/italy.png";
import kenyanFlag from "@/assets/img/kenya.png";
import spanishFlag from "@/assets/img/spain.png";
const competitions = [
  {
    name: "english",
    flag: englishFlag,
    id: "41303",
  },
  {
    name: "spanish",
    flag: spanishFlag,
    id: "41309",
  },
  {
    name: "kenyan",
    flag: kenyanFlag,
    id: "13367",
  },
  {
    name: "italian",
    flag: italianFlag,
    id: "41307",
  },
];

const defaultMarket = {
  market_id: "Match_Result",
  market_name: "1X2",
};

export const useInstantStore = defineStore("instant-store", {
  state: () => ({
    outcomesCount: 3,
    competitions,
    competitionIsLoading: false,
    error: null,
    responseOK: false,
    pending: false,
    matches: [],
    markets: [],
    selectedCompetition: competitions[0],
    selectedMarket: defaultMarket,

    liveMatches: [],
    meta: null,
    kickOffs: [],

    viewToDisplay: "instantHome",

    count: 0,
    endedTime: 90,
    halfTime: 45,
    timeToShowWonModal: 100,
    resetCountTime: 120,

    won: 0,
  }),

  getters: {
    hasKickOff: (state) => {
      for (const obj of state.kickOffs) {
        if (
          obj.competition_id === state.meta.competition_id &&
          obj.eBlockId === state.meta.eBlockId
        ) {
          return true;
        }
      }
      return false;
    },
    selections: (state) => {
      return state.liveMatches.filter((item) => item.selections.length > 0);
    },
  },

  actions: {
    async fetchInstantMatches(url) {
      this.viewToDisplay = "instantHome";
      try {
        this.pending = true;

        this.error = null;
        this.responseOK = false;
        this.matches = [];

        const urlPart1 = `/sportbook/v1/matches?profile_id=1&competition_id=${this.selectedCompetition.id}`;

        const fullUrl = urlPart1 + url;

        const response = await API(instantBaseURL).get(fullUrl);
        this.matches = response.data.data.matches;
        this.markets = response.data.data.markets;
        this.meta = response.data.data.meta;

        this.error = null;
        this.responseOK = true;
        this.pending = false;

        // this.countries = response.data.data.countries;
      } catch (err) {
        this.responseOK = false;
        console.log(err);
        this.pending = false;
      }
    },

    async fetchInstantLive() {
      try {
        this.pending = true;

        this.error = null;
        this.responseOK = false;
        this.liveMatches = [];

        const url = `/sportbook/v1/result?profile_id=1&competition_id=${this.selectedCompetition.id}&skip=0`;

        const response = await API(instantBaseURL).get(url);
        this.liveMatches = response.data.data.matches;
        this.meta = response.data.data.meta;
        this.won = response.data.data.won;

        this.error = null;
        this.responseOK = true;
        this.pending = false;

        // this.countries = response.data.data.countries;
      } catch (err) {
        this.responseOK = false;
        console.log(err);
        this.pending = false;
      }
    },
    setSelectedCompetition(payload) {
      this.selectedCompetition = payload;
    },
    setSelectedMarket(payload) {
      this.selectedMarket = payload;
    },
    resetSelectedMarket() {
      this.selectedMarket = defaultMarket;
    },
    setCompetitionIsLoading(payload) {
      this.competitionIsLoading = payload;
    },
    closeModal() {
      this.showModal = false;
      this.modalType = null;
    },

    addToKickOffs(payload) {
      this.kickOffs = [...this.kickOffs, ...payload];

      const uniqueObjects = [];
      const seenObjects = new Set();

      this.kickOffs.forEach((bet) => {
        const objectKey = `${bet.competition_id}-${bet.eBlockId}`;

        if (!seenObjects.has(objectKey)) {
          uniqueObjects.push({
            competition_id: bet.competition_id,
            eBlockId: bet.eBlockId,
          });
          seenObjects.add(objectKey);
        }
      });
      this.kickOffs = uniqueObjects;
    },

    setViewToDisplay(payload) {
      this.viewToDisplay = payload;
    },
    increaseCount() {
      this.count++;
    },
    resetCounter() {
      this.count = 0;
    },
    skipToResults() {
      this.count = this.endedTime;
    },
    resetLiveData() {
      const { closeModal } = useModalStore();

      closeModal();
      this.liveMatches = [];
      this.kickOffs = [];
      this.viewToDisplay = "instantHome";
      this.won = 0;
      this.count = 0;

      const url = `&market_id=Match_Result&skip=0`;
      this.fetchInstantMatches(url);
    },
  },
});
