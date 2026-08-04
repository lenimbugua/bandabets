import { useModalTypes } from "@/composables/useModalTypes";
import { defineStore } from "pinia";

const { betslip } = useModalTypes();

export const useModalStore = defineStore("modal-store", {
  state: () => ({
    showModal: false,
    modalType: null,
    afterCloseFunction: null,
  }),

  getters: {
    showSportsBetslip: (state) => {
      return state.modalType === betslip && state.showModal;
    },
  },

  actions: {
    openModal(content) {
      this.modalType = content;
      this.showModal = true;
    },

    setAfterCloseFunction(afterCloseFunction) {
      this.afterCloseFunction = afterCloseFunction;
    },
    closeModal() {
      this.showModal = false;
      this.modalType = null;
      if (this.afterCloseFunction) {
        this.afterCloseFunction();
      }
    },
  },
});
