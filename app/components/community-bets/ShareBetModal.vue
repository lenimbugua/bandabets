<script setup>
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { XMarkIcon } from "@heroicons/vue/24/outline";

import { useModalTypes } from "@/composables/useModalTypes";
import { useShareToSocials } from "@/composables/useShareToSocials";
import { useModalStore } from "@/stores/modal";
import { storeToRefs } from "pinia";
import { computed, ref } from "vue";

const { shareBet } = useModalTypes();
const { betText, shareBetUrl } = useShareToSocials();

const { showModal, modalType } = storeToRefs(useModalStore());
const { closeModal } = useModalStore();
const closeButtonRef = ref(null); // Element to initially focus

const showShareBetModal = computed(() => {
  return modalType.value === shareBet && showModal.value;
});
</script>

<template>
  <TransitionRoot appear :show="showShareBetModal" as="template">
    <Dialog
      as="div"
      class="relative z-50"
      :initial-focus="closeButtonRef"
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
        <div class="fixed inset-0 bg-black/50" />
      </TransitionChild>
      <div class="fixed z-50 bottom-0 right-0 left-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center text-center">
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
              class="w-full max-w-4xl bg-white dark:bg-background transform overflow-hidden text-left align-middle shadow-xl transition-all"
            >
              <div
                class="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-white/5"
              >
                <DialogTitle
                  class="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wide"
                >
                  Share With Friends
                </DialogTitle>
                <button ref="closeButtonRef" class="p-1 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors cursor-pointer outline-hidden" aria-label="Close" @click="closeModal">
                  <XMarkIcon class="w-5 h-5" />
                </button>
              </div>
              <div class="bg-white dark:bg-background p-4 pb-20">
                <ShareToSocials
                  :share-url="shareBetUrl"
                  :share-text="betText"
                />
                <CopyCode />
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
