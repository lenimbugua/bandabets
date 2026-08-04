<script setup>
import {
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { XMarkIcon } from "@heroicons/vue/24/solid";
import { storeToRefs } from "pinia";
import { computed } from "vue";

import { useCasino } from "@/composables/useCasino";
import { useModalStore } from "@/stores/modal";
import { useRoadblockStore } from "@/stores/roadblock";

import { useModalTypes } from "@/composables/useModalTypes";

import { useRouter } from "vue-router";
const { launchCasino } = useCasino();
const jetXId = import.meta.env.VITE_JETX_GAME_ID;
const router = useRouter();

const { roadblock } = useModalTypes();

const { showModal, modalType } = storeToRefs(useModalStore());
const {
  roadBlockImage,
  currentRoadblock,
//   roadBlockClickAction,
  depositRoadBlock,
  aviatorRoadBlock,
  jetxRoadBlock,
} = storeToRefs(useRoadblockStore());

// const { setRoadBlockClickAction } = useRoadblockStore();

const showDialog = computed(() => {
  return modalType.value === roadblock && showModal.value;
});
const { closeModal } = useModalStore();

function launchJetX() {
  launchCasino(jetXId, "jetX");
}

function goToAviator() {
  router.push({ name: "aviator" });
}
function goToDeposit() {
  router.push({ name: "deposit" });
}

function getRoadBlockAction(roadBlock) {
  switch (roadBlock) {
    case depositRoadBlock.value:
      return goToDeposit();
    case aviatorRoadBlock.value:
      return goToAviator();
    case jetxRoadBlock.value:
      return launchJetX();
  }
}

const handleRoadBlockClick = () => {
 getRoadBlockAction(currentRoadblock.value);
  closeModal(roadblock);
};


</script>
<template>
  <TransitionRoot appear :show="showDialog" as="template">
    <Dialog
      as="div"
      style="z-index: 1000"
      class="relative z-50"
      @close="closeModal"
    >
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/75" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="z-50 flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="cursor-pointer w-full max-w-[18rem] md:max-w-md transform rounded-2xl bg-white dark:bg-card text-left align-middle shadow-xl transition-all"
            >
              <div class="w-full flex justify-center">
                  <button
                    ref="closeButtonRef"
                    class="focus:outline-hidden absolute -bottom-7  p-1 rounded-full bg-black/60 border border-slate-400"
                    aria-label="Close promotional offer"
                    @click="closeModal"
                  >
                    <XMarkIcon class="text-slate-400 dark:text-white w-4 h-4" />
                  </button>
              </div>
              <img
                class="cursor-pointer"
                :src="roadBlockImage"
                alt="Promotional offer"
                loading="lazy"
                @click="handleRoadBlockClick"
              />
              <!-- <div class="flex uppercase">
                <button
                  class="bg-red-600 w-1/2 text-white py-2 focus:outline-hidden"
                  @click="closeModal"
                >
                  Cancel
                </button>
                <button
                  class="bg-brand-bright w-1/2 text-lime-50 py-2"
                  @click="handleRoadBlockClick"
                >
                  Continue
                </button>
              </div> -->
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
