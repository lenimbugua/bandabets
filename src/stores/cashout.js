import { useToast } from "@/composables/useToast";
import { useBetsStore } from "@/stores/bets";
import { useModalStore } from "@/stores/modal";
import { useProfileStore } from "@/stores/profile";
import { defineStore, storeToRefs } from "pinia";
import API, { betBaseURL } from "../services/API";
import { useLoginStore } from "./login";

const { fireErrorToast, fireSuccessToast, positionTopRight } = useToast();

export const useCashoutStore = defineStore("cashout-store", {
  state: () => ({
    pending: false,
    responseOK: false,
    cashoutResponse: [],
    selectedCashout: "instant",
    betId: null,
  }),

  getters: {
    cashoutData: (state) => (betId) => {
      const item = state.cashoutResponse.find((s) => s.betId === betId);
      return item ? item.cashoutData : null;
    },
  },

  actions: {
    async getCashoutValue(betId, showError = true) {
      try {
        const { token, profileSid } = storeToRefs(useLoginStore());

        this.pending = true;

        const response = await API(betBaseURL).get(
          `/api/v2/bets/get-cashout-value?profileSid=${profileSid.value}&betId=${betId}`,
          {
            headers: {
              Authorization: `Bearer ${token.value}`,
              "X-PROFILE-SID": profileSid.value,
            },
          }
        );
        this.setCashoutData(betId, response.data.data);
        this.responseOK = true;
      } catch (err) {
        this.responseOK = false;
        if (err.status === 422) {
          let item = this.cashoutResponse.find((s) => s.betId === betId);
          if (item) {
            console.log(item);
            item.cashoutData.cashOutAllowed = false;
            this.setCashoutData(betId, item.cashoutData);
          }
        }
        if (showError) {
          if (err.status === 400) {
            fireErrorToast("Something went wrong", positionTopRight);
            return;
          }
          fireErrorToast(err.response.data.message, positionTopRight);
        }
      } finally {
        this.pending = false;
      }
    },
    async cashoutNow(betId) {
      try {
        const { token, profileSid } = storeToRefs(useLoginStore());

        this.pending = true;

        const response = await API(betBaseURL).post(
          `/api/v2/bets/cashout?profileSid=${profileSid.value}&betId=${betId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token.value}`,
              "X-PROFILE-SID": profileSid.value,
            },
          }
        );
        const { fetchBets } = useBetsStore();
        fetchBets(0);
        this.setCashoutData(betId, response.data.data);
        this.responseOK = true;
        fireSuccessToast(response.data.message, positionTopRight);
        const { closeModal } = useModalStore();
        await closeModal();
        const { getProfileInfo } = useProfileStore();
        await getProfileInfo();
      } catch (err) {
        console.log(err);
        this.responseOK = false;
        if (err.status === 422) {
          fireErrorToast(err.response?.data?.message, positionTopRight);
          return;
        }
        if (err.status === 400) {
          fireErrorToast("Something went wrong", positionTopRight);
          return;
        }
        fireErrorToast(err.response.data.message, positionTopRight);
      } finally {
        this.pending = false;
      }
    },
    async setAutoCashout(amount, betId) {
      try {
        const { token, profileSid } = storeToRefs(useLoginStore());

        this.pending = true;

        await API(betBaseURL).post(
          `/api/v2/bets/set-auto-cash-out?profileSid=${profileSid.value}&cashOutAmount=${amount}&betId=${betId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token.value}`,
              "X-PROFILE-SID": profileSid.value,
            },
          }
        );

        this.getCashoutValue(betId);

        this.responseOK = true;
        fireSuccessToast("Auto cashout set successfully", positionTopRight);
        // const { closeModal } = useModalStore();
        // await closeModal();
        // const { getProfileInfo } = useProfileStore();
        // await getProfileInfo();
      } catch (err) {
        console.log(err);
        this.responseOK = false;
        if (err.status === 422) {
          fireErrorToast(err.response?.data?.message, positionTopRight);
          return;
        }
        if (err.status === 400) {
          fireErrorToast("Something went wrong", positionTopRight);
          return;
        }
        fireErrorToast(err.response.data.message, positionTopRight);
      } finally {
        this.pending = false;
      }
    },
    async cancelAutoCashout(betId) {
      try {
        const { token, profileSid } = storeToRefs(useLoginStore());

        this.pending = true;

        const response = await API(betBaseURL).post(
          `/api/v2/bets/cancel-auto-cash-out?profileSid=${profileSid.value}&betId=${betId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token.value}`,
              "X-PROFILE-SID": profileSid.value,
            },
          }
        );
        await this.getCashoutValue(betId);
        console.log(response.data);

        this.responseOK = true;
        fireSuccessToast(
          "Auto cashout cancelled successfully",
          positionTopRight
        );

        console.log(response);
      } catch (err) {
        console.log(err);
        this.responseOK = false;
        if (err.status === 422) {
          fireErrorToast(err.response?.data?.message, positionTopRight);
          return;
        }
        if (err.status === 400) {
          fireErrorToast("Something went wrong", positionTopRight);
          return;
        }
        fireErrorToast(err.response.data.message, positionTopRight);
      } finally {
        this.pending = false;
      }
    },

    setCashoutData(betId, cashoutData) {
      let item = this.cashoutResponse.find((s) => s.betId === betId);
      if (item) {
        this.cashoutResponse = this.cashoutResponse.filter(
          (s) => s.betId !== betId
        );

        this.cashoutResponse.push({
          betId: betId,
          cashoutData: cashoutData,
        });
        return;
      }

      this.cashoutResponse.push({
        betId: betId,
        cashoutData: cashoutData,
      });
    },

    setSelectedCashout(selectedCashout) {
      this.selectedCashout = selectedCashout;
    },
    reset() {
      this.cashoutResponse = null;
    },
    setBetId(betId) {
      this.betId = betId;
    },
  },
  persist: false,
});
