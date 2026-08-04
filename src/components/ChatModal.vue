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
import { computed, ref } from "vue";

const { chat } = useModalTypes();

const { showModal, modalType } = storeToRefs(useModalStore());
const { closeModal } = useModalStore();
const closeButtonRef = ref(null); // Element to initially focus

const showBetslip = computed(() => {
  return modalType.value === chat && showModal.value;
});
</script>
<template>
  <TransitionRoot appear :show="showBetslip" as="template">
    <Dialog
      as="div"
      class="relative z-200"
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
      <div class="fixed z-200 bottom-0 right-0 left-0 overflow-y-auto">
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
                  <slot name="title" />
                </DialogTitle>
                <button ref="closeButtonRef" class="p-1 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors cursor-pointer outline-hidden" aria-label="Close chat" @click="closeModal">
                  <XMarkIcon class="w-5 h-5" />
                </button>
              </div>
              <!-- TAWK DISABLED — restore later
              <div class="bg-white dark:bg-background h-160">
                <iframe
                  frameborder="0"
                  allowfullscreen=""
                  webkitallowfullscreen=""
                  mozallowfullscreen=""
                  class="w-full h-full z-999"
                  src="https://tawk.to/chat/67386bf82480f5b4f59eef63/1icq6bhh5"
                ></iframe>
              </div>
              -->
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
