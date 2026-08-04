import { useModalStore } from "@/stores/modal";
import { useModalTypes } from "@/composables/useModalTypes";

export function useSupport() {
  const { customerSupportModal } = useModalTypes();
  const { openModal, closeModal } = useModalStore();

  function openSupportModal() {
    openModal(customerSupportModal);
  }

  function openTawkChat() {
    if (window.Tawk_API) {
      window.Tawk_API.showWidget();
      window.Tawk_API.maximize();
    }
    closeModal();
  }

  return {
    openSupportModal,
    openTawkChat,
  };
}
