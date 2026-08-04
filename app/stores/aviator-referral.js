import { useToast } from "@/composables/useToast";
import { defineStore, storeToRefs } from "pinia";
import API, { affiliateApiBaseURL } from "../services/API";
import { useLoginStore } from "./login";

const tenantCode = import.meta.env.VITE_TENANT_CODE;
const { fireErrorToast, fireSuccessToast, positionTopRight } = useToast();

export const useAviatorReferralStore = defineStore("aviator-referral-store", {
  state: () => ({
    pending: false,
    detailsPending: false,
    redeemPending: false,
    responseOK: false,
    referralCode: null,
    referralDetails: null,
    error: null,
  }),

  actions: {
    async fetchReferralCode() {
      this.pending = true;
      this.error = null;
      this.responseOK = false;

      const { profileSid } = storeToRefs(useLoginStore());

      try {
        const response = await API(affiliateApiBaseURL).post(
          "/api/aviator-referral/code",
          {
            profile_sid: profileSid.value,
            tenantCode,
          }
        );

        const data = response?.data;
        this.referralCode =
          typeof data?.referral_code === "string"
            ? data.referral_code
            : data?.data?.referral_code ?? data?.referral_code?.code ?? String(data?.referral_code ?? "");
        this.responseOK = true;
      } catch (err) {
        this.error =
          err?.response?.data?.message || "Failed to fetch referral code";
        this.responseOK = false;
      } finally {
        this.pending = false;
      }
    },

    async fetchReferralDetails() {
      this.detailsPending = true;
      this.error = null;

      const { profileSid } = storeToRefs(useLoginStore());

      try {
        const response = await API(affiliateApiBaseURL).get(
          `/api/aviator-referral/details/${profileSid.value}`
        );


        this.referralDetails = response?.data?.data ?? response?.data;
      } catch (err) {
        this.error =
          err?.response?.data?.message || "Failed to fetch referral details";
      } finally {
        this.detailsPending = false;
      }
    },

    async redeemBonus() {
      this.redeemPending = true;
      const { profileSid } = storeToRefs(useLoginStore());

      try {
        const response = await API(affiliateApiBaseURL).post(
          "/api/aviator-referral/redeem-bonus",
          { profile_sid: profileSid.value }
        );

        if (response?.data?.status_code !== 200) {
          fireErrorToast(response?.data?.status_desc || "Failed to redeem bonus", positionTopRight);
          return;
        }
        fireSuccessToast(
          response?.data?.status_desc || "Bonus redeemed!",
          positionTopRight
        );
        await this.fetchReferralDetails();
      } catch (err) {
        fireErrorToast(
          err?.response?.data?.status_desc || err?.response?.data?.message || "Failed to redeem bonus",
          positionTopRight
        );
      } finally {
        this.redeemPending = false;
      }
    },
  },

  persist: {
    pick: ["referralCode"],
  },
});
