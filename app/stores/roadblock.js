import { useRoadBlocks } from "../composables/useRoadBlocks";

const ROTATION_INTERVAL = 600000; // 1 minute

const depositRoadBlock = "depositRoadBlock";
const aviatorRoadBlock = "aviatorRoadBlock";
const jetxRoadBlock = "jetxRoadBlock";

// Factory, not a module-scope literal: state() calls this on every store
// instantiation so each store instance (and, on the server, each concurrent
// request) gets its own array rather than a shared reference that a
// mutation from one user's session could leak into every other request.
// (depositRoadBlock/aviatorRoadBlock/jetxRoadBlock themselves are primitive
// strings, so placing them directly in state is fine — only the array
// wrapping them needs this treatment.)
function createRoadblockList() {
  return [depositRoadBlock, aviatorRoadBlock, jetxRoadBlock];
}

export const useRoadblockStore = defineStore("roadblock-store", {
  state: () => {
    const roadblockList = createRoadblockList();
    return {
      depositRoadBlock,
      aviatorRoadBlock,
      jetxRoadBlock,

      roadblockList,
      intervalId: null,

      roadBlockImage: null,
      roadBlockClickAction: null,
      currentIndex: 0,
      currentRoadblock: roadblockList[0],
      lastLaunchTime: null,
    };
  },

  actions: {
    setImage(imageSRC) {
      this.roadBlockImage = imageSRC;
    },
    setRoadBlockClickAction(action) {
      this.roadBlockClickAction = action;
    },

    rotate(route) {
      const { openRoadBlockModal } = useRoadBlocks();
      this.currentIndex = (this.currentIndex + 1) % this.roadblockList.length;
      this.currentRoadblock = this.roadblockList[this.currentIndex];
      this.lastLaunchTime = Date.now();
      openRoadBlockModal(route, this.currentRoadblock);
    },

    checkAndRotate(route) {
      const { openRoadBlockModal } = useRoadBlocks();
      const now = Date.now();
      if (!this.lastLaunchTime) {
        this.rotate(route); // first time
        openRoadBlockModal(route, this.roadblockList[0]);
      } else if (now - this.lastLaunchTime >= ROTATION_INTERVAL) {
        this.rotate(route);
        return;
      }
    },

    startRoadblockRotationTimer(route) {
      //   if (this.intervalId) return;

      // Run check immediately in case time has already passed
      this.checkAndRotate(route);
      this.intervalId = setInterval(() => {
        this.checkAndRotate(route);
      }, 5000); // Check every 5 seconds (adjustable)
    },

    stopRoadblockRotationTimer() {
      if (this.intervalId) {
        clearInterval(this.intervalId);
        this.intervalId = null;
        this.lastLaunchTime = null;
      }
    },

    resetRoadblockRotationTimer() {
      this.stopRoadblockRotationTimer();
      this.lastLaunchTime = null;
    },
  },
  persist: {
    pick: ["currentIndex", "currentRoadblock", "lastLaunchTime"],
  },
});
