import { useLoginStore } from "../stores/login.js";
import { storeToRefs } from "pinia";
import { useModalStore } from "../stores/modal";
import { useCasinoStore } from "@/stores/casino";

export function useLaunchCasinoGame() {
  const { setAfterLoginAction } = useLoginStore();
  const { launchGame, setIsDemo } = useCasinoStore();
  const { isAuthenticated } = storeToRefs(useLoginStore());
  const { setAfterCloseFunction } = useModalStore();

  function afterLoginAction() {
    setIsDemo(0);
    launchGame();
  }

  function afterLoginModalClose() {
    if (isAuthenticated.value) {
      return;
    }
    setIsDemo(1);
  }

  async function initGame() {
    if (!isAuthenticated.value) {
      setIsDemo(1);
      setAfterLoginAction(afterLoginAction);
      setAfterCloseFunction(afterLoginModalClose);
      await launchGame();
      return;
    }
    setIsDemo(0);
    await launchGame();
  }
  return {
    initGame,
  };
}
