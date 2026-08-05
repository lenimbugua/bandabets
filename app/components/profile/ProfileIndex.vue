<script setup>
import { useLoginStore } from "@/stores/login";
import { useModalStore } from "@/stores/modal";
import { storeToRefs } from "pinia";
import MobileFooterV2 from "../mobile/MobileFooterV2.vue";
import NotAuthenicated from "../NotAuthenicated.vue";

// Explicit imports are required, not stylistic. Nuxt auto-registers
// components in subdirectories with a path prefix, so these siblings register
// as ProfileUserInfo / ProfileTheAccount / ProfileDepositWithdrawLinks — the
// bare <UserInfo />, <TheAccount /> and <DepositWithdrawLinks /> tags below
// would not resolve, and Vue renders an unresolved component as nothing. That
// silently emptied three sections of the profile page.
// (<ProfileLinks /> happens to survive because Nuxt strips the redundant
// directory prefix from profile/ProfileLinks.vue, but it is imported here too
// so the whole set is explicit rather than half-relying on that quirk.)
import UserInfo from "./UserInfo.vue";
import TheAccount from "./TheAccount.vue";
import DepositWithdrawLinks from "./DepositWithdrawLinks.vue";
import ProfileLinks from "./ProfileLinks.vue";

import { useModalTypes } from "@/composables/useModalTypes";

const { drawer } = useModalTypes();
const { openModal } = useModalStore();
const { isAuthenticated } = storeToRefs(useLoginStore());
</script>

<template>
  <div class="flex flex-col min-h-dvh bg-gray-50 dark:bg-background">
    <!-- Header -->
    <div
      class="sticky top-0 z-40 bg-white/95 dark:bg-background/95 backdrop-blur-sm border-b border-gray-200/80 dark:border-white/6"
    >
      <div class="max-w-lg mx-auto flex justify-between items-center h-12 px-4">
        <div class="flex items-center gap-2">
          <button
            class="p-1 -ml-1 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition-colors lg:hidden"
            @click="openModal(drawer)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              class="w-5 h-5 text-gray-700 dark:text-gray-300"
            >
              <path
                fill-rule="evenodd"
                d="M2 4.75A.75.75 0 0 1 2.75 4h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 4.75ZM2 10a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 10Zm0 5.25a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
          <TheLogo />
        </div>
        <span class="text-sm font-semibold text-gray-800 dark:text-white/80"
          >My Account</span
        >
      </div>
    </div>

    <!-- Not authenticated -->
    <div
      v-if="!isAuthenticated"
      class="w-full justify-center items-center sm:pt-4 flex grow"
    >
      <NotAuthenicated />
    </div>

    <!-- Profile content -->
    <div v-else class="w-full max-w-lg mx-auto px-4 pt-5 pb-8 space-y-4">
      <UserInfo />

      <TheAccount />
      <DepositWithdrawLinks />
      <ProfileLinks />
    </div>

    <div class="mt-auto">
      <Footer />
      <MobileFooterV2 />
    </div>
  </div>
</template>
