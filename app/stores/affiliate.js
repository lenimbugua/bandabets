import { useToast } from "@/composables/useToast";
import { useProfileStore } from "@/stores/profile";
import { defineStore, storeToRefs } from "pinia";
import API, { affiliateBaseURL } from "../services/API";
import { useLoginStore } from "./login";

const { fireErrorToast, fireSuccessToast, positionTopRight } = useToast();

export const useAffiliateStore = defineStore("affiliate-store", {
  state: () => ({
    responseOK: false,
    affiliateUrl: null,
    pending: false,
    earnings: null,
    withdrawPending: false,
  }),

  actions: {
    async fetchAffiliateUrl() {
      this.responseOK = false;
      this.pending = true;
      this.affiliateUrl = null;
      const { profileSid, token } = storeToRefs(useLoginStore());

      try {
        const response = await API(affiliateBaseURL).post(
          `/api/referral/code`,
          { profileSid: profileSid.value },
          {
            headers: {
              "Content-Type": "application/json", // Explicitly set content-type
              Authorization: `Bearer ${token.value}`,
            },
          }
        );

        this.responseOK = true;
        // Fix: backend may return hakibets.com — replace with naibet.com
        const rawUrl = response.data.referral_url || "";
        this.affiliateUrl = rawUrl.replace(/hakibets\.com/g, "naibet.com");
      } catch (err) {
        console.error("Error fetching affiliate code:", err); // Better error logging
      } finally {
        this.pending = false;
      }
    },
    async fetchAffiliateEarnings() {
      this.responseOK = false;
      this.pending = true;
      this.earnings = null;
      const { profileSid, token } = storeToRefs(useLoginStore());

      try {
        const response = await API(affiliateBaseURL).post(
          `/api/referral/earnings`,
          { profileSid: profileSid.value },
          {
            headers: {
              "Content-Type": "application/json", // Explicitly set content-type
              Authorization: `Bearer ${token.value}`,
            },
          }
        );

        this.responseOK = true;
        this.earnings = response.data;
      } catch (err) {
        console.error("Error fetching affiliate code:", err); // Better error logging
      } finally {
        this.pending = false;
      }
    },
    async withdrawAffiliateEarnings() {
      this.responseOK = false;
      this.withdrawPending = true;
      const { profileSid, token } = storeToRefs(useLoginStore());

      try {
        const response = await API(affiliateBaseURL).post(
          `/api/referral/withdraw`,
          { profileSid: profileSid.value },
          {
            headers: {
              "Content-Type": "application/json", // Explicitly set content-type
              Authorization: `Bearer ${token.value}`,
            },
          }
        );
        if (response?.data?.status_code != 200) {
          fireErrorToast(response?.data?.status_desc, positionTopRight);
        } else {
          const { getProfileInfo } = useProfileStore();
          fireSuccessToast(response?.data?.status_desc, positionTopRight);
          await getProfileInfo();
          this.responseOK = true;
        }
      } catch (err) {
        fireErrorToast("Something went wrong", positionTopRight);
      } finally {
        this.withdrawPending = false;
      }
    },
    reset() {
      this.responseOK = false;
      this.affiliateUrl = null;
      this.pending = false;
      this.earnings = null;
      this.withdrawPending = false;
    },
  },
  persist: {
    pick: ["affiliateUrl"],
  },
});
