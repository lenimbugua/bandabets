<script setup>
import {
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { storeToRefs } from "pinia";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

import { useModalTypes } from "@/composables/useModalTypes";
import { useModalStore } from "@/stores/modal";
import { useLoginStore } from "@/stores/login";
import { useDefaultSport } from "@/composables/useDefaultSport";

import TheLogo from "./TheLogo.vue";
import ExploreContent from "./ExploreContent.vue";

const router = useRouter();
const { drawer } = useModalTypes();
const { showModal, modalType } = storeToRefs(useModalStore());
const { closeModal } = useModalStore();
const { initDefaultSport } = useDefaultSport();
const loginStore = useLoginStore();
const { isAuthenticated } = storeToRefs(loginStore);

function handleLogout() {
  loginStore.logout();
  closeModal();
  router.push({ name: "home" });
}

const closeButtonRef = ref(null);

const showDrawer = computed(() => {
  return modalType.value === drawer && showModal.value;
});

function goHome() {
  closeModal();
  initDefaultSport();
  router.push({ name: "home" });
}
</script>

<template>
  <TransitionRoot as="template" :show="showDrawer">
    <Dialog
      as="div"
      class="relative z-70"
      :initial-focus="closeButtonRef"
      @close="closeModal"
    >
      <!-- Backdrop -->
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/40 backdrop-blur-sm" />
      </TransitionChild>

      <!-- Panel from left -->
      <div class="fixed inset-0 z-70 flex justify-start">
        <TransitionChild
          as="template"
          enter="transition ease-out duration-300 transform"
          enter-from="-translate-x-full"
          enter-to="translate-x-0"
          leave="transition ease-in duration-200 transform"
          leave-from="translate-x-0"
          leave-to="-translate-x-full"
        >
          <DialogPanel class="relative w-full max-w-xs bg-white dark:bg-background h-full flex flex-col shadow-2xl">
            <!-- Header -->
            <div class="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-white/5">
              <div class="cursor-pointer" @click="goHome">
                <TheLogo />
              </div>
              <button
                ref="closeButtonRef"
                class="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 outline-hidden"
                aria-label="Close"
                @click="closeModal"
              >
                <Icon name="tabler:x" class="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            <!-- Shared tabs + content -->
            <ExploreContent />

            <!-- Footer: logout only — the theme switcher lives at the top of
                 the drawer content (ExploreContent) now -->
            <div
              v-if="isAuthenticated"
              class="border-t border-gray-200/60 dark:border-white/6 px-4 py-3 flex items-center justify-end gap-3"
            >
              <button
                class="flex items-center gap-1.5 text-[0.7rem] font-medium text-red-500/80 hover:text-red-600 dark:text-red-400/70 dark:hover:text-red-400 transition-colors"
                @click="handleLogout"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-3.5 h-3.5">
                  <path fill-rule="evenodd" d="M3 4.25A2.25 2.25 0 0 1 5.25 2h5.5A2.25 2.25 0 0 1 13 4.25v2a.75.75 0 0 1-1.5 0v-2a.75.75 0 0 0-.75-.75h-5.5a.75.75 0 0 0-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 0 0 .75-.75v-2a.75.75 0 0 1 1.5 0v2A2.25 2.25 0 0 1 10.75 18h-5.5A2.25 2.25 0 0 1 3 15.75V4.25Z" clip-rule="evenodd" />
                  <path fill-rule="evenodd" d="M19 10a.75.75 0 0 0-.75-.75H8.704l1.048-.943a.75.75 0 1 0-1.004-1.114l-2.5 2.25a.75.75 0 0 0 0 1.114l2.5 2.25a.75.75 0 1 0 1.004-1.114l-1.048-.943h9.546A.75.75 0 0 0 19 10Z" clip-rule="evenodd" />
                </svg>
                <span>Logout</span>
              </button>
            </div>
          </DialogPanel>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
