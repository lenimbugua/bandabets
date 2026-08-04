import { useToast } from "@/composables/useToast";
import { defineStore, storeToRefs } from "pinia";
import API, { affiliateBaseURL } from "../services/API";
import { useLoginStore } from "./login";

const { fireErrorToast, fireSuccessToast, positionTopRight } = useToast();

export const useAffiliateV2Store = defineStore("affiliate-v2-store", {
  state: () => ({
    responseOK: false,
    affiliateUrl: null,
    pending: false,
    earnings: null,
    promoCode: null,
    leaderBoard: [],
    prizes: [],
    withdrawPending: false,
  }),

  actions: {
    async initAffiliate() {
      this.responseOK = false;
      this.pending = true;
      this.affiliateUrl = null;
      const { profileSid, token } = storeToRefs(useLoginStore());
      try {
        const response = await API(affiliateBaseURL).post(
          `/api/referrals/init`,
          { profileSid: profileSid.value },
          {
            headers: {
              "Content-Type": "application/json", // Explicitly set content-type
              Authorization: `Bearer ${token.value}`,
            },
          }
        );

        this.promoCode = response?.data?.data?.promoCode;
        this.affiliateUrl = `${window.location.origin}/signup?referralCode=${this.promoCode}`;

        this.responseOK = true;
      } catch (err) {
        console.error("Error fetching affiliate code:", err); // Better error logging
      } finally {
        this.pending = false;
      }
    },
    async invite(msisdn) {
      this.responseOK = false;
      this.pending = true;
      const { profileSid, token } = storeToRefs(useLoginStore());
      try {
        const response = await API(affiliateBaseURL).post(
          `/api/referrals/referrals/invite`,
          { referredProfileSid: profileSid.value, msisdn },
          {
            headers: {
              "Content-Type": "application/json", // Explicitly set content-type
              Authorization: `Bearer ${token.value}`,
            },
          }
        );
        if (response?.data?.status_code === 200) {
          fireSuccessToast(response?.data?.status_desc, positionTopRight);
          this.fetchEarnings(new Date());
          this.responseOK = true;
        } else {
          fireErrorToast(response?.data?.status_desc, positionTopRight);
        }
      } catch (err) {
        console.error("Error fetching affiliate code:", err); // Better error logging
      } finally {
        this.pending = false;
      }
    },
    async fetchEarnings(date) {
      this.responseOK = false;
      this.pending = true;
      const { profileSid, token } = storeToRefs(useLoginStore());
      try {
        const response = await API(affiliateBaseURL).get(
          `/api/referrals/earnings`,
          {
            params: {
              profile_sid: profileSid.value,
              date: this.formatDate(date),
            },
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token.value}`,
            },
          }
        );

        this.earnings = response?.data?.data;
        this.responseOK = true;
      } catch (err) {
        console.error("Error fetching affiliate code:", err); // Better error logging
      } finally {
        this.pending = false;
      }
    },
    async fetchLeaderboard(date) {
      this.responseOK = false;
      this.pending = true;
      this.earnings = null;
      try {
        const response = await API(affiliateBaseURL).get(
          `/api/referrals/leaderboard`,
          {
            params: {
              date: this.formatDate(date),
            },
          }
        );
        this.leaderBoard = response?.data?.data?.leaderboard;
        this.prizes = response?.data?.data?.prizes;
        this.responseOK = true;
      } catch (err) {
        console.error("Error fetching affiliate code:", err); // Better error logging
      } finally {
        this.pending = false;
      }
    },

    formatDate(date) {
      // 1. Create a Date object
      const dateObject = new Date(date);

      // 2. Format the date
      const options = { year: "numeric", month: "2-digit", day: "2-digit" };

      // This will output 'MM/DD/YYYY' (e.g., '11/07/2025') depending on the user's locale.
      // We then manually rearrange it to the required 'YYYY-MM-DD' format.
      dateObject.toLocaleDateString("en-CA", options).split("/");
      // 'en-CA' (Canadian English) uses the 'YYYY-MM-DD' order by default,
      // which is perfect for direct use!
      const desiredFormat = dateObject.toLocaleDateString("en-CA", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });

      return desiredFormat;
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
    pick: ["affiliateUrl", "promoCode"],
  },
});
