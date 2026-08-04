import { useModalTypes } from "@/composables/useModalTypes";
import { useScreenSizes } from "@/composables/useScreenSizes";
import { useModalStore } from "@/stores/modal";
import { storeToRefs } from "pinia";
import { useLoginStore } from "../stores/login.js";

export function useBetslipLogin() {
  function afterLoginAction() {
    const { isLargeScreen } = useScreenSizes();
    if (isLargeScreen.value) {
      return;
    }

    const { betslip } = useModalTypes();
    const { openModal } = useModalStore();

    return openModal(betslip);
  }

  function openLogin() {
    const { isAuthenticated } = storeToRefs(useLoginStore());
    const { setAfterLoginAction } = useLoginStore();

    if (!isAuthenticated.value) {
      setAfterLoginAction(afterLoginAction);
      const { openModal, closeModal } = useModalStore();
      const { login, betslip } = useModalTypes();
      closeModal(betslip);
      openModal(login);
      return;
    }
  }

  return {
    openLogin,
  };
}
