<script setup>
import { useModalTypes } from "@/composables/useModalTypes";
import { useModalStore } from "@/stores/modal";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { XMarkIcon } from "@heroicons/vue/24/outline";
import { storeToRefs } from "pinia";
import { computed, ref } from "vue";
import InviteFriends from "./InviteFriends.vue";

const { festiveModal } = useModalTypes();

const { showModal, modalType } = storeToRefs(useModalStore());
const { closeModal } = useModalStore();
const closeButtonRef = ref(null); // Element to initially focus

const showShareBetModal = computed(() => {
  return modalType.value === festiveModal && showModal.value;
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
              class="w-full max-w-md transform overflow-hidden rounded-t-lg text-left align-middle shadow-xl transition-all"
            >
              <div
                class="flex w-full justify-between bg-white dark:bg-card border-b dark:border-gray-900"
              >
                <button class="p-2 py-1 outline-hidden" aria-label="Close" @click="closeModal">
                  <XMarkIcon
                    class="w-5 h-5 dark:text-slate-300 stroke-width-2 cursor-pointer"
                  />
                </button>
                <DialogTitle
                  class="flex text-gray-600 dark:text-slate-300 grow items-center justify-center py-3 px-1 text-left uppercase text-sm font-bold border-x dark:border-gray-900"
                >
                  Invite Friends
                </DialogTitle>
                <button ref="closeButtonRef" class="p-2 py-1 outline-hidden" aria-label="Close" @click="closeModal">
                  <XMarkIcon
                    class="w-5 h-5 dark:text-slate-300 stroke-width-2 cursor-pointer"
                  />
                </button>
              </div>
              <div class="bg-white dark:bg-background">
                <InviteFriends />
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
