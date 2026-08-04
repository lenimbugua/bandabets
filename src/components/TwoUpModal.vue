<script setup>
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { XMarkIcon } from "@heroicons/vue/24/outline";
import { storeToRefs } from "pinia";
import { computed } from "vue";

import { useModalStore } from "@/stores/modal";

import { useModalTypes } from "@/composables/useModalTypes";
import EarlyPayoutBadge from "./EarlyPayoutBadge.vue";
import EarlyWinIcon from "./EarlyWinIcon.vue";
import TwoUpIcon from "./TwoUpIcon.vue";
import TwoUpPromo from "./TwoUpPromo.vue";

const { twoUpModal } = useModalTypes();

const { showModal, modalType } = storeToRefs(useModalStore());

const showDialog = computed(() => {
  return modalType.value === twoUpModal && showModal.value;
});
const { closeModal } = useModalStore();
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
              class="w-full max-w-md transform bg-white dark:bg-background text-left align-middle shadow-xl transition-all overflow-hidden"
            >
              <div
                class="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-white/5"
              >
                <DialogTitle class="flex items-center gap-1">
                  <EarlyWinIcon />
                  <EarlyPayoutBadge />
                  <TwoUpIcon />
                </DialogTitle>
                <button class="p-1 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors cursor-pointer outline-hidden" aria-label="Close" @click="closeModal">
                  <XMarkIcon class="w-5 h-5" />
                </button>
              </div>
              <div class="max-h-[85vh] overflow-y-scroll scrollbar-hide">
                <TwoUpPromo />
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
