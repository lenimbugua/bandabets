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
import { useModalStore } from "@/stores/modal";
import { useModalTypes } from "@/composables/useModalTypes";
import { useBetslipStore } from "@/stores/sports-betslip";
import { computed, ref } from "vue";

const { betslip, instantBetslip } = useModalTypes();
const { betslipLength } = storeToRefs(useBetslipStore());
const { clearBetslip } = useBetslipStore();

const { showModal, modalType } = storeToRefs(useModalStore());
const { closeModal } = useModalStore();
const closeButtonRef = ref(null); // Element to initially focus

const showBetslip = computed(() => {
  return (
    (modalType.value === betslip || modalType.value === instantBetslip) &&
    showModal.value
  );
});


</script>

<template>
  <TransitionRoot appear :show="showBetslip" as="template">
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
      <div class="fixed z-50 inset-0 flex flex-col justify-end">
        <div class="flex flex-col mt-auto sm:items-center text-center max-h-dvh">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 translate-y-8"
            enter-to="opacity-100 translate-y-0"
            leave="duration-200 ease-in"
            leave-from="opacity-100 translate-y-0"
            leave-to="opacity-0 translate-y-8"
          >
            <DialogPanel
              class="w-full max-w-4xl max-h-[92dvh] sm:max-h-[80dvh] bg-white dark:bg-background transform overflow-hidden text-left align-middle shadow-xl dark:shadow-none border-t border-gray-200 dark:border-white/6 transition-all rounded-t-2xl sm:rounded-t-xl flex flex-col"
            >
              <!-- Drag handle (mobile) -->
              <div class="flex justify-center pt-2 pb-1 sm:hidden">
                <div class="w-10 h-1 rounded-full bg-gray-300 dark:bg-white/15"></div>
              </div>
              <div
                class="flex items-center justify-between px-4 py-2.5 sm:py-3 border-b border-gray-200 dark:border-white/5 shrink-0"
              >
                <DialogTitle
                  class="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wide"
                >
                  <slot name="title"></slot>
                </DialogTitle>
                <div class="flex items-center gap-3">
                  <button
                    v-if="betslipLength > 0"
                    class="text-[0.7rem] font-semibold text-gray-400 dark:text-white/30 hover:text-red-500 dark:hover:text-red-400 transition-colors cursor-pointer"
                    @click="clearBetslip"
                  >
                    Clear All
                  </button>
                  <button ref="closeButtonRef" class="p-1 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors cursor-pointer outline-hidden" aria-label="Close betslip" @click="closeModal">
                    <XMarkIcon class="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div class="flex-1 min-h-0 overflow-y-auto">
                <slot />
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
