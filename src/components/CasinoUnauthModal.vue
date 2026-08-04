<script setup>
import { storeToRefs } from "pinia";
import { computed } from "vue";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
} from "@headlessui/vue";

import { useModalStore } from "@/stores/modal";

import { useModalTypes } from "@/composables/useModalTypes";

const { showModal, modalType } = storeToRefs(useModalStore());

const { openModal, closeModal, setAfterCloseFunction } = useModalStore();

const { login, casinoUnauthModal } = useModalTypes();

const isOpen = computed(() => {
  return modalType.value === casinoUnauthModal && showModal.value;
});
function close() {
  setAfterCloseFunction(null);
  closeModal();
}
</script>
<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" class="relative z-10">
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

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
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
              class="flex items-center w-full h-[75vh] max-w-2xl transform overflow-hidden bg-white/75 dark:bg-background/90 backdrop-blur-sm p-12 text-left shadow-xl transition-all"
            >
              <div class="w-full flex gap-4">
                <button
                  type="button"
                  class="inline-flex w-1/2 justify-center rounded-xl border border-transparent bg-brand-bright font-bold uppercase px-4 py-3 text-sm text-primary-foreground hover:bg-brand-bright/90 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand-bright/40 focus-visible:ring-offset-2 transition-colors"
                  @click="openModal(login)"
                >
                  Login
                </button>
                <button
                  type="button"
                  class="inline-flex w-1/2 justify-center rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 px-4 py-3 text-sm font-semibold text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-white/10 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand-bright/40 focus-visible:ring-offset-2 transition-colors"
                  @click="close"
                >
                  Free Play
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
