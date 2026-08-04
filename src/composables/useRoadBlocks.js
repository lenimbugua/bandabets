import { useModalTypes } from "@/composables/useModalTypes";
import { useModalStore } from "@/stores/modal";
import { useRoadblockStore } from "@/stores/roadblock";
import { storeToRefs } from "pinia";

export function useRoadBlocks() {
  const { roadblock } = useModalTypes();

  const { showModal, modalType } = storeToRefs(useModalStore());

  const depositRoadBlock = "depositRoadBlock";
  const aviatorRoadBlock = "aviatorRoadBlock";
  const jetxRoadBlock = "jetxRoadBlock";

  const homeRoute = "home";
  //   const liveRoute = "live";
  const sportsRoute = "sports";

  const roadBlockRoutes = [homeRoute, sportsRoute];

  function getRoadBlockImage(roadBlock) {
    switch (roadBlock) {
      case depositRoadBlock:
        return "/roadblocks/deposit_rb.png";
      case aviatorRoadBlock:
        return "/roadblocks/aviator_rb.png";
      case jetxRoadBlock:
        return "/roadblocks/jetx_rb.png";
    }
  }

  function hideRoadBlock(route) {
    if (showModal.value && modalType.value != roadblock) {
      return true;
    }
    if (!roadBlockRoutes.includes(route.name)) {
      return true;
    }
    return false;
  }

  function openRoadBlockModal(route, roadBlockType) {
    const { setImage } = useRoadblockStore();
    if (hideRoadBlock(route)) {
      return;
    }
    setImage(getRoadBlockImage(roadBlockType));
    const { openModal } = useModalStore();
    const { roadblock } = useModalTypes();
    openModal(roadblock);
  }

  return {
    jetxRoadBlock,
    depositRoadBlock,
    aviatorRoadBlock,
    hideRoadBlock,
    openRoadBlockModal,
    getRoadBlockImage,
  };
}
