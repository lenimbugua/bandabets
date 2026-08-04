import { useBetslipDataLayer } from "@/composables/useBetslipDataLayer";
// import { useModalTypes } from "@/composables/useModalTypes";
// import { useModalStore } from "@/stores/modal";
import { defineStore, storeToRefs } from "pinia";
import API, { betBaseURL } from "../services/API";
import { useLoginStore } from "./login";
import { useMatchesStore } from "./matches";


export const useBetBuilderStore = defineStore("betbuilder-store", {
  state: () => ({
    pending: false,
    data: null,
    selections: [],
    decimalPrice: null,
    hub: null,
  }),

  getters: {
    getSelectionByParentMatchId: (state) => (parentMatchId) => {
      return state.selections.find(
        (selection) => selection.parentMatchId === parentMatchId
      );
    },
    getSelections: (state) => {
      const foundSelection = state.selections.find(
        (selection) => selection.parentMatchId === state.data.parentMatchId
      );
      return foundSelection ? foundSelection.selections : [];
    },
  },

  actions: {
    async fetchBetBuilderMatches() {
      const selections = this.getSelections;
      const { matchDetails } = storeToRefs(useMatchesStore());
      const { fetchMatchDetails } = useMatchesStore();

      if (!selections || selections.length === 0) {
        await fetchMatchDetails(matchDetails.value.parentMatchId);
        this.data = matchDetails;
        return;
      }
      try {
        // const { openModal } = useModalStore();
        // const { loader } = useModalTypes();

        this.error = null;
        this.responseOK = false;
        this.pending = true;

        const response = await API(betBaseURL).get(
          `/api/multiBet/odds?${this.createQueryParamsFromArray()}`
        );
        this.decimalPrice = response.data.decimalPrice;
        this.markDisabledWithFallbackMatching(
          matchDetails.value,
          response.data
        );
        this.responseOK = true;
      } catch (err) {
        console.log(err);
        this.responseOK = false;
      } finally {
        // const { closeModal } = useModalStore();
        // closeModal();
        this.pending = false;
      }
    },

    createQueryParamsFromArray() {
      const selections = this.getSelections;
      if (!selections || selections.length === 0) {
        return "";
      }

      // Get common values from first item
      const firstItem = selections[0];
      const sportId = firstItem.sportId;
      const fixtureId = firstItem.parentMatchId;

      // If specific legs are provided, use them; otherwise use all legs from array
      let legs;

      // Use all legs from the array
      legs = selections.map((item) => item.multiBetOutcomeName);

      // Build query parameters
      const params = new URLSearchParams();
      params.append("sportId", sportId);
      params.append("fixtureId", fixtureId);
      params.append("legs", legs.join(","));

      return params.toString();
    },
    async addAnItemToSelection(payload) {
      const { addToCartDataLayer, removeFromCartDataLayer } =
        useBetslipDataLayer();

      let selections = this.selections;

      const selection = this.getSelectionByParentMatchId(payload.parentMatchId);
      // Here click was to select an outcome. Add the selected outcome to selections
      if (payload.payload.clickIsToSelectOutcome) {
        if (!selection) {
          let newSelection = {
            parentMatchId: payload.parentMatchId,
            homeTeam: payload.homeTeam,
            awayTeam: payload.awayTeam,
            startTime: payload.startTime,
            selections: [payload.payload],
          };
          selections.push(newSelection);
        } else {
          let selectionsArray = selection.selections.filter((item) => {
            return item.customId !== payload.payload.customId;
          });
          selectionsArray.push(payload.payload);
          selections = selections.filter((item) => {
            return item.parentMatchId !== payload.parentMatchId;
          });

          let newSelection = {
            parentMatchId: payload.parentMatchId,
            homeTeam: payload.homeTeam,
            awayTeam: payload.awayTeam,
            startTime: payload.startTime,
            selections: selectionsArray,
          };

          selections.push(newSelection);
        }

        addToCartDataLayer(payload, selections.length - 1);
      } else {
        // Here click was to deselect an outcome.
        removeFromCartDataLayer(payload.customId);

        this.deleteAnItemFromSelections(
          payload.parentMatchId,
          payload.payload.customId
        );
        return;
      }
      // mutate the selection
      this.selections = selections;
      this.fetchBetBuilderMatches();
      //   this.calculatePossibleWin();
    },
    deleteAnItemFromSelections(parentMatchId, customId) {
      const { removeFromCartDataLayer } = useBetslipDataLayer();

      removeFromCartDataLayer(customId);

      let selections = this.selections;
      const selection = this.getSelectionByParentMatchId(parentMatchId);

      let selections2;
      if (selection) {
        selections2 = selection.selections.filter((item) => {
          return item.customId !== customId;
        });

        if (!selections2.length) {
          selections = selections.filter((item) => {
            return item.parentMatchId !== parentMatchId;
          });
        } else {
          selections = selections.map((item) => {
            if (item.parentMatchId === parentMatchId) {
              item.selections = selections2;
            }
            return item;
          });
        }
      }

      // hide all betslips when betslip becomes empty by reseting back to default
      if (!selections.length) {
        this.selections = [];
      }
      // mutate the betslip
      this.selections = selections;
      this.fetchBetBuilderMatches();

      //   this.calculatePossibleWin();
    },

    cleanScoreString(str) {
      return str.replace(/_+\s*_+/, "_");
    },

    // More robust version with fallback matching
    markDisabledWithFallbackMatching(matchData, betData) {
      let newData = matchData;
      if (matchData && !betData) {
        this.data = newData;
        return;
      }

      if (!matchData || !betData || !betData.marketSelections) {
        this.data = [];
        return;
      }

      const processedData = matchData;

      // Build a comprehensive lookup map from betData
      const betMap = {};
      betData.marketSelections.forEach((market) => {
        betMap[market.id] = {};
        Object.entries(market.selections).forEach(([outcomeKey, selection]) => {
          betMap[market.id][outcomeKey] = {
            compatible: selection.compatible,
            suspended: selection.suspended,
            probability: selection.probability,
            decimalPrice: selection.decimalPrice,
          };
        });
      });

      if (processedData.markets) {
        processedData.markets.forEach((market) => {
          const marketKey = market.multiBetMarketName;
          let activeOutcomes = 0;

          if (market.matchOutcomes) {
            market.matchOutcomes.forEach((outcome) => {
              const outcomeKey = outcome.multiBetOutcomeName;

              const betInfo = betMap[marketKey]?.[outcomeKey];

              if (betInfo) {
                outcome.disabled =
                  betInfo.compatible === false || betInfo.suspended === true;

                outcome.disabledReason =
                  betInfo.compatible === false
                    ? "incompatible"
                    : betInfo.suspended === true
                    ? "suspended"
                    : null;

                // Optionally update odds/probability from betData if needed
                // outcome.oddValue = betInfo.decimalPrice?.toString() || outcome.oddValue;
              } else {
                // No matching bet data found
                outcome.disabled = true;
                outcome.disabledReason = "not_found";
              }

              if (!outcome.disabled) activeOutcomes++;
            });
          }

          market.disabled = activeOutcomes === 0;
          market.disabledReason = market.disabled ? "no_active_outcomes" : null;
        });
      }
      this.data = processedData;
    },
    async fetchJengaHub() {
      this.pending = true;
      try {
        const {
          // token,
          profileSid,
        } = storeToRefs(useLoginStore());

        const response = await API(betBaseURL).post(
          `/bet/hub/api/v1/jenga/bets`,
          {},
          {
            headers: {
              //   Authorization: `Bearer ${token.value}`,
              "X-PROFILE-SID": profileSid.value,
            },
          }
        );
        this.hub = response?.data?.data;
        this.responseOK = true;
      } catch (err) {
        this.responseOK = false;
        // if (err.status === 422) {
        //   fireErrorToast(err.response.data.message, positionTopRight);
        // }
      } finally {
        this.pending = false;
      }
    },
  },
  persist: {
    pick: ["selections"],
  },
});
