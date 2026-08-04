import { defineStore } from "pinia";
import API, { cmsBaseURL } from "../services/API";

export const usePromoStore = defineStore("promo-store", {
  state: () => ({
    error: null,
    promotions: [],
    selectedPromo: null,
    pending: false,
  }),

  actions: {
    async fetchPromotions() {
      const endPoint = "/site/promotions/list";

      try {
        this.error = null;
        this.responseOK = false;
        this.pending = true;
        const response = await API(cmsBaseURL).get(endPoint);
        this.promotions = response.data;
        console.log(this.promotions);
        this.responseOK = true;
      } catch (err) {
        this.responseOK = false;
        this.error = err.response.data.statusMessage;
        this.pending = false;
      } finally {
        this.pending = false;
      }
    },
    selectPromo(promoName) {
      this.selectedPromo = promoName;
    },
  },
  persist: false,
});
