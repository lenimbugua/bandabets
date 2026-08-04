import { useModalStore } from "@/stores/modal";
import { useShareBetStore } from "@/stores/sharebet.js";
import { storeToRefs } from "pinia";
import { ref } from "vue";

import { useModalTypes } from "@/composables/useModalTypes";
import { useLoginStore } from "../stores/login.js";
export function useLoadCode() {
  const { setAfterLoginAction } = useLoginStore();

  const { bookedBetPreview, login, betslip, loader } = useModalTypes();

  const { isAuthenticated } = storeToRefs(useLoginStore());

  const {
    loadSharedBetslip,
    setViewSlipIsPending,
    setLoadSlipIsPending,
    loadBetslip,
  } = useShareBetStore();
  const { loadSlipIsPending, viewSlipIsPending, responseOK } = storeToRefs(
    useShareBetStore()
  );

  const isToLoadCode = "loadCode";
  const isToViewCode = "viewCode";

  const intention = ref("");

  const { openModal, closeModal } = useModalStore();

  const bookingCode = ref("");

  async function loadCode() {
    if (!isAuthenticated.value) {
      setAfterLoginAction(null);
      closeModal(betslip);
      openModal(login);
      return;
    }
    if (intention.value === isToViewCode) {
      setViewSlipIsPending(true);
    }

    if (intention.value === isToLoadCode) {
      setLoadSlipIsPending(true);
    }

    openModal(loader);
    await loadSharedBetslip(bookingCode.value);
    closeModal();

    if (responseOK.value && intention.value === isToViewCode) {
      openModal(bookedBetPreview);
    }

    if (responseOK.value && intention.value === isToLoadCode) {
      loadBetslip();
      openModal(betslip);
    }

    if (intention.value === isToViewCode) {
      setViewSlipIsPending(false);
    }

    if (intention.value === isToLoadCode) {
      setLoadSlipIsPending(false);
    }
  }

  function setBookingCode(code) {
    bookingCode.value = code;
  }
  function setIntention(intent) {
    intention.value = intent;
  }
  return {
    loadCode,
    setIntention,
    loadSlipIsPending,
    viewSlipIsPending,
    responseOK,
    isToLoadCode,
    isToViewCode,
    bookingCode,
    setBookingCode,
  };
}
