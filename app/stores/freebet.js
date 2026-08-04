import { defineStore } from "pinia";
import API, { betBaseURL } from "../services/API";
import { useLoginStore } from "./login";
import { FREEBET_AMOUNT } from "../composables/useDefinedConstants";

export const useFreebetStore = defineStore("freebet-store", {
  state: () => ({
    stake: FREEBET_AMOUNT,
    possibleWin: 0,
    totalOdds: 0,
    betslip: null,
    freebet: null,
    pending: false,
    responseOK: false,
    error: null,
    freeBetPayload: null,
    createPending: false,
    createError: null,
    createSuccess: false,
    redeemedFreebets: null,
    redeemedPending: false,
  }),

  actions: {
    async fetchFreebet() {
      try {
        this.pending = true;

        this.error = null;
        this.responseOK = false;
        this.freebet = null;

        const response = await API().get("/sportsbook/api/v1/free-bet");
        this.pending = false;

        this.error = null;
        this.responseOK = true;
        this.freebet = response?.data?.data?.freeBet;
      } catch (err) {
        this.responseOK = false;
        this.error = err?.response?.data?.statusMessage;
        this.pending = false;
      }
    },

    calculatePossibleWin() {
      const stake = this.stake;
      let totalWin = stake * this.totalOdds - stake;
      if (totalWin < 0) {
        totalWin = 0;
      }

      const possibleWin = Math.round((totalWin + Number.EPSILON) * 100) / 100;
      this.possibleWin = possibleWin;
    },

    addAnItemToBetslip(payload) {
      //   const { addToCartDataLayer, removeFromCartDataLayer } =
      //   useBetslipDataLayer();

      if (payload.clickIsToSelectOutcome) {
        this.betslip = payload;
        this.freeBetPayload = {
          betAmount: this.stake,
          possibleWin: this.possibleWin,
          src: "bet",
          sportsbook: "sportsbook",
          profileSid: "",
          view: "home",
          userAgent: "",
          resource: "bet",
          totalOdds: parseFloat(payload.oddValue),
          slip: {
            live: payload.live,
            homeTeam: payload.homeTeam,
            awayTeam: payload.awayTeam,
            oddType: payload.oddType,
            startTime: payload.startTime,
            oddValue: payload.oddValue,
            outcomeId: payload.outcomeId,
            subTypeId: payload.subTypeId,
            specifiers: payload.specifiers,
            status: payload.status,
            sportId: payload.sportId,
            prevOddValue: payload.prevOddValue,
            outcomeName: payload.outcomeName,
            competitionId: payload.competitionId,
            parentMatchId: payload.parentMatchId,
            timestamp: payload.timestamp,
          },
        };

        this.totalOdds = parseFloat(payload.oddValue);

        // addToCartDataLayer(payload, betslip.length - 1);
      } else {
        this.betslip = null;
        this.payload = null;
        this.totalOdds = 0;
      }
      this.calculatePossibleWin();
    },

    clearFreebet() {
      this.betslip = null;
      this.freeBetPayload = null;
      this.totalOdds = 0;
    },

    async createSportsbookFreebet() {
      if (!this.freeBetPayload) return;

      const { token, profileSid } = useLoginStore();

      const payload = {
        freeBetType: "SPORTBOOK",
        freeBetRequest: {
          betAmount: this.stake,
          possibleWin: this.possibleWin,
          src: "bet",
          sportsbook: "sportsbook",
          profileSid: profileSid,
          view: "home",
          userAgent: navigator.userAgent,
          resource: "bet",
          totalOdds: this.totalOdds,
          slip: this.freeBetPayload.slip,
        },
      };

      try {
        this.createPending = true;
        this.createError = null;
        this.createSuccess = false;

        const response = await API(betBaseURL).post(
          "/api/v1/free-bets/create",
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "X-PROFILE-SID": profileSid,
            },
          }
        );

        this.createPending = false;

        if (response?.data?.status === "error") {
          this.createError =
            response?.data?.message || "Something went wrong";
          return;
        }

        this.createSuccess = true;
        this.clearFreebet();
      } catch (err) {
        this.createPending = false;
        this.createError =
          err?.response?.data?.message || "Failed to create free bet";
      }
    },

    async createCrashFreebet() {
      const { token, profileSid } = useLoginStore();

      const payload = {
        freeBetType: "CRASH",
        crashFreeBet: {
          profileSid: profileSid,
        },
      };

      try {
        this.createPending = true;
        this.createError = null;
        this.createSuccess = false;

        const response = await API(betBaseURL).post(
          "/api/v1/free-bets/create",
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "X-PROFILE-SID": profileSid,
            },
          }
        );

        this.createPending = false;

        if (response?.data?.status === "error") {
          this.createError =
            response?.data?.message || "Something went wrong";
          return;
        }

        this.createSuccess = true;
      } catch (err) {
        this.createPending = false;
        this.createError =
          err?.response?.data?.message || "Failed to create free bet";
      }
    },

    async fetchRedeemedFreebets() {
      const { token, profileSid } = useLoginStore();

      try {
        this.redeemedPending = true;

        const response = await API(betBaseURL).get(
          "/api/v1/free-bets/redeemed",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "X-PROFILE-SID": profileSid,
            },
          }
        );

        this.redeemedPending = false;
        const data = response?.data?.data;
        this.redeemedFreebets = data?.redeemed ?? false;
      } catch (err) {
        this.redeemedPending = false;
      }
    },
  },
});
