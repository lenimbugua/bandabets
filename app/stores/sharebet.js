import { useBetslip } from "@/composables/useBetslip";
import { useToast } from "@/composables/useToast";
import { useModalStore } from "@/stores/modal";
import { defineStore, storeToRefs } from "pinia";
import API, { betBaseURL } from "../services/API";
import { useLoginStore } from "./login";
import { useBetslipStore } from "./sports-betslip";

const { fireErrorToast, fireSuccessToast, positionTopRight } = useToast();

import { useTimestamp } from "@vueuse/core";

const timestamp = useTimestamp({ offset: 0 });

// const data = {
//   status: "ok",
//   message: "success",
//   data: [
//     {
//       parentMatchId: 12483014,
//       homeTeam: "Leeds United",
//       awayTeam: "West Ham",
//       startTime: "2025-10-24 22:00:00",
//       status: 1,
//       sportId: 10,
//       sportName: "soccer",
//       competitionId: 36,
//       competitionName: "England Premier League",
//       countryName: "England",
//       isBetBuilder: false,
//       selections: [
//         {
//           parentMatchId: 12483014,
//           homeTeam: "Leeds United",
//           awayTeam: "West Ham",
//           oddType: "1X2",
//           startTime: "2025-10-24 22:00:00",
//           oddValue: 1.82,
//           prevOddValue: 2.17,
//           outcomeId: 1,
//           outcomeName: "Home",
//           subTypeId: 2,
//           specifiers: null,
//           status: 1,
//           sportId: 10,
//           sportName: "soccer",
//           competitionId: 36,
//           competitionName: "England Premier League",
//           countryName: "England",
//           multiBetMarketName: null,
//           multiBetOutcomeName: null,
//           isBetBuilder: false,
//           totalOddsForBet: null,
//         },
//       ],
//     },
//     {
//       parentMatchId: 12536416,
//       homeTeam: "Paris FC",
//       awayTeam: "FC Nantes",
//       startTime: "2025-10-24 21:45:00",
//       status: 1,
//       sportId: 10,
//       sportName: "soccer",
//       competitionId: 56,
//       competitionName: "France Ligue 1",
//       countryName: "France",
//       isBetBuilder: true,
//       selections: [
//         {
//           parentMatchId: 12536416,
//           homeTeam: "Paris FC",
//           awayTeam: "FC Nantes",
//           oddType: "Both Teams To Score (GG / NG)",
//           startTime: "2025-10-24 21:45:00",
//           oddValue: 1.75,
//           prevOddValue: 1.0,
//           outcomeId: 39,
//           outcomeName: "Yes",
//           subTypeId: 7079,
//           specifiers: null,
//           status: 1,
//           sportId: 10,
//           sportName: "soccer",
//           competitionId: 56,
//           competitionName: "France Ligue 1",
//           countryName: "France",
//           multiBetMarketName: "BothTeamsToScore",
//           multiBetOutcomeName: "BothTeamsToScore_True",
//           isBetBuilder: true,
//           totalOddsForBet: null,
//         },
//         {
//           parentMatchId: 12536416,
//           homeTeam: "Paris FC",
//           awayTeam: "FC Nantes",
//           oddType: "Half-time Both Teams To Score Yes/No",
//           startTime: "2025-10-24 21:45:00",
//           oddValue: 1.23,
//           prevOddValue: 1.0,
//           outcomeId: 40,
//           outcomeName: "No",
//           subTypeId: 10459,
//           specifiers: null,
//           status: 1,
//           sportId: 10,
//           sportName: "soccer",
//           competitionId: 56,
//           competitionName: "France Ligue 1",
//           countryName: "France",
//           multiBetMarketName: "HalfTimeBothTeamsToScore",
//           multiBetOutcomeName: "HalfTimeBothTeamsToScore_False",
//           isBetBuilder: true,
//           totalOddsForBet: null,
//         },
//         {
//           parentMatchId: 12536416,
//           homeTeam: "Paris FC",
//           awayTeam: "FC Nantes",
//           oddType: "Home Team Total Cards Over/Under ",
//           startTime: "2025-10-24 21:45:00",
//           oddValue: 1.87,
//           prevOddValue: 1.74,
//           outcomeId: 30,
//           outcomeName: "Over",
//           subTypeId: 13649,
//           specifiers: "1.5",
//           status: 1,
//           sportId: 10,
//           sportName: "soccer",
//           competitionId: 56,
//           competitionName: "France Ligue 1",
//           countryName: "France",
//           multiBetMarketName: "HomeTeamTotalCardsOverUnder",
//           multiBetOutcomeName: "HomeTeamTotalCardsOverUnder_Over_1.5",
//           isBetBuilder: true,
//           totalOddsForBet: null,
//         },
//         {
//           parentMatchId: 12536416,
//           homeTeam: "Paris FC",
//           awayTeam: "FC Nantes",
//           oddType: "Home Team Total Goals Over/Under",
//           startTime: "2025-10-24 21:45:00",
//           oddValue: 1.56,
//           prevOddValue: 1.0,
//           outcomeId: 30,
//           outcomeName: "Over",
//           subTypeId: 9498,
//           specifiers: "1.5",
//           status: 1,
//           sportId: 10,
//           sportName: "soccer",
//           competitionId: 56,
//           competitionName: "France Ligue 1",
//           countryName: "France",
//           multiBetMarketName: "HomeTeamTotalGoalsOverUnder",
//           multiBetOutcomeName: "HomeTeamTotalGoalsOverUnder_Over_1.5",
//           isBetBuilder: true,
//           totalOddsForBet: null,
//         },
//         {
//           parentMatchId: 12536416,
//           homeTeam: "Paris FC",
//           awayTeam: "FC Nantes",
//           oddType: "Total Cards Over/Under ",
//           startTime: "2025-10-24 21:45:00",
//           oddValue: 1.71,
//           prevOddValue: 1.56,
//           outcomeId: 30,
//           outcomeName: "Over",
//           subTypeId: 15064,
//           specifiers: "3.5",
//           status: 1,
//           sportId: 10,
//           sportName: "soccer",
//           competitionId: 56,
//           competitionName: "France Ligue 1",
//           countryName: "France",
//           multiBetMarketName: "TotalCardsOverUnder",
//           multiBetOutcomeName: "TotalCardsOverUnder_Over_3.5",
//           isBetBuilder: true,
//           totalOddsForBet: null,
//         },
//       ],
//     },
//   ],
// };

export const useShareBetStore = defineStore("share-bet-store", {
  state: () => ({
    stake: 50,
    showModal: false,
    pending: false,
    loadSlipIsPending: false,
    viewSlipIsPending: false,
    bookingCode: null,
    responseOK: false,
    sharedBetslip: [],
    totalOdds: 0,
    possibleWin: 0,
  }),

  getters: {
    betslipLength: (state) => state.sharedBetslip.length,
  },

  actions: {
    setBookingCode(payload) {
      this.bookingCode = payload;
    },
    calculatePossibleWin() {
      const { calculateTotalOdds, calculatePotentialWin } = useBetslip();
      this.totalOdds = calculateTotalOdds(this.sharedBetslip);
      this.possibleWin = calculatePotentialWin(this.sharedBetslip, this.stake);
    },
    setStake(payload) {
      this.stake = payload;
      this.calculatePossibleWin();
    },
    async shareBetslip(betslip) {
      try {
        this.pending = true;
        const { token, profileSid } = storeToRefs(useLoginStore());
        const { extractMultiBetSlip } = useBetslipStore();

        //filter out betbuilders
        betslip = betslip.filter((item) => {
          return !item.isBetBuilder;
        });

        const slip = [];
        betslip.forEach((item) => {
          slip.push({
            parentMatchId: item.parentMatchId,
            oddValue: item.oddValue,
            outcomeId: item.outcomeId,
            outcomeName: item.outcomeName,
            subTypeId: item.subTypeId,
            specifiers: item.specifiers,
          });
        });

        const payload = {
          src: "share",
          userAgent: "safari",
          betId: null,
          profileSid: profileSid.value,
          slip,
          multiBetSlip: extractMultiBetSlip(),
        };

        const response = await API(betBaseURL).post(
          "/api/v2/bet/share",
          payload,
          {
            headers: {
              Authorization: `Bearer ${token.value}`,
              "X-PROFILE-SID": profileSid.value,
            },
          }
        );

        this.bookingCode = response.data.data.bookingCode;
      } catch (err) {
        console.log(err);
      } finally {
        this.pending = false;
      }
    },
    async shareBet(betId) {
      this.pending = true;

      try {
        const { token, profileSid } = storeToRefs(useLoginStore());

        const payload = {
          src: "share",
          userAgent: "",
          betId,
          profileSid: profileSid.value,
        };

        const response = await API(betBaseURL).post(
          `/api/v2/bet/share`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token.value}`,
              "X-PROFILE-SID": profileSid.value,
            },
          }
        );

        this.bookingCode = response.data.data.bookingCode;
        this.responseOK = true;
        this.pending = false;
      } catch (err) {
        this.pending = false;

        this.responseOK = false;
        if (err.status === 422) {
          fireErrorToast(err.response.data.message, positionTopRight);
        }
      }
    },
    async loadSharedBetslip(bookingCode) {
      this.bookingCode = bookingCode;
      this.pending = true;
      try {
        const { token, profileSid } = storeToRefs(useLoginStore());

        const response = await API(betBaseURL).get(
          `/api/v2/bet/share/slip?bookingCode=${bookingCode}`,
          {
            headers: {
              Authorization: `Bearer ${token.value}`,
              "X-PROFILE-SID": profileSid.value,
            },
          }
        );

        console.log(response);

        this.populateBetslip(response.data.data);

        this.responseOK = true;
      } catch (err) {
        this.responseOK = false;
        if (err.status === 422) {
          fireErrorToast(err.response.data.message, positionTopRight);
        }
      } finally {
        this.pending = false;
      }
    },
    async rebet(betId) {
      try {
        const { token, profileSid } = storeToRefs(useLoginStore());

        this.pending = true;

        const response = await API(betBaseURL).get(
          `/api/v3/bets/rebet?profileSid=${profileSid.value}&betId=${betId}`,
          {
            headers: {
              Authorization: `Bearer ${token.value}`,
              "X-PROFILE-SID": profileSid.value,
            },
          }
        );
        this.populateBetslip(response.data.data);
        this.responseOK = true;
      } catch (err) {
        this.responseOK = false;
        if (err.status === 422) {
          fireErrorToast(err.response.data.message, positionTopRight);
        }
      } finally {
        this.pending = false;
      }
    },
    setViewSlipIsPending(payload) {
      this.viewSlipIsPending = payload;
    },
    setLoadSlipIsPending(payload) {
      this.loadSlipIsPending = payload;
    },

    deleteAnItemFromBetslip(customId) {
      let betslip = this.sharedBetslip;
      betslip = betslip.filter((item) => {
        return item.customId !== customId;
      });
      // hide all betslips when betslip becomes empty by reseting back to default
      if (!betslip.length) {
        const { closeModal } = useModalStore();
        closeModal();
      }
      // mutate the betslip
      this.sharedBetslip = betslip;
      this.calculatePossibleWin();
    },
    populateBetslip(payload) {
      this.sharedBetslip = [];
      payload.forEach((item, index) => {
        if (!item.isBetBuilder) {
          console.log(item);
          const payload1 = this.constructPayload(item.selections[0], index);
          this.sharedBetslip.push(payload1);
        } else {
          this.sharedBetslip.push(item);
        }
      });
      this.calculatePossibleWin();
    },

    constructPayload(item, index) {
      let outcomeName = item.outcomeName;
      if (item.specifiers) {
        outcomeName = item.outcomeName + " " + item.specifiers;
      }
      const payload = {
        live: 0,
        customId: this.formCustomId(
          item.parentMatchId,
          item.subTypeId,
          item.outcomeName,
          index
        ),
        seasonId: item.homeTeam,
        homeTeam: item.homeTeam,
        awayTeam: item.awayTeam,
        oddType: item.oddType,
        startTime: item.startTime,
        oddValue: item.oddValue,
        outcomeId: item.outcomeId,
        subTypeId: item.subTypeId,
        specifiers: item.specifiers,
        status: item.status,
        sportId: item.sportId,
        prevOddValue: item.prevOddValue,
        outcomeName: outcomeName,
        competitionId: item.competitionId,
        parentMatchId: item.parentMatchId,
        competitionName: item.competitionName,
        countryName: item.countryName,
        sportName: item.sportName,
        timestamp: timestamp.value,
        clickIsToSelectOutcome: true,
      };

      return payload;
    },

    loadBetslip() {
      const {
        addAnItemToBetslip,
        setBetslipBookingCode,
        addBetbuilderToBetslip,
      } = useBetslipStore();

      this.sharedBetslip.forEach((item) => {
        console.log(item);
        if (item.isBetBuilder) {
          addBetbuilderToBetslip(item, item.oddValue);
        } else {
          addAnItemToBetslip(item);
        }
      });
      setBetslipBookingCode(this.bookingCode);
      let message = "Betslip loaded successful!";
      fireSuccessToast(message, positionTopRight);
    },
    formCustomId(parent_match_id, sub_type_id, outcome_name, index) {
      return `${parent_match_id}${sub_type_id}${outcome_name}${index}`;
    },
  },
  persist: {
    pick: ["bookingCode"],
  },
});
