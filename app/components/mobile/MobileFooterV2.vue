<script setup>
import { useBetslipDataLayer } from "@/composables/useBetslipDataLayer";
import { useModalTypes } from "@/composables/useModalTypes";
import { useLoginStore } from "@/stores/login";
import { useModalStore } from "@/stores/modal";
import { storeToRefs } from "pinia";
import { RouterLink, useRoute, useRouter } from "vue-router";
import { useBetslipStore } from "@/stores/sports-betslip.js";
import userIcon from "@/assets/icons/user.svg";
import casinoIcon from "@/assets/icons/casino.svg";
import promosIcon from "@/assets/icons/promos.svg";
import betsIcon from "@/assets/icons/bets.svg";
// SUPPORT FAB DISABLED — restore later
// import supportIcon from "@/assets/icons/support.svg";

const router = useRouter();
const route = useRoute();

const { msisdn, token } = storeToRefs(useLoginStore());
const { betslipLength } = storeToRefs(useBetslipStore());
const { verifyBetslip } = useBetslipStore();
// customerSupportModal is unused while the support FAB is disabled.
const { betslip } = useModalTypes();
const { openModal } = useModalStore();
const { addViewBetslipDataLayer } = useBetslipDataLayer();

// SUPPORT FAB DISABLED — restore later
// function openSupport() {
//   openModal(customerSupportModal);
// }

function openBetslip() {
  verifyBetslip();
  openModal(betslip);
  addViewBetslipDataLayer();
}

function goToProfile() {
  if (!token.value && !msisdn.value) {
    router.push({ name: "login" });
    return;
  }
  router.push({ name: "profile" });
}

function isActive(routeName) {
  return route.name === routeName;
}
</script>

<template>
  <!-- SUPPORT FAB DISABLED — restore later. Support is still reachable from
       the SUPPORT nav pill, the footer and the profile menu.
  <button
    type="button"
    aria-label="Open support"
    class="support-fab fixed right-0 top-[calc(66%+1rem)] z-50 xl:hidden inline-flex items-center justify-center w-12 h-12 rounded-full bg-gold text-gold-foreground border border-gold-deep shadow-lg hover:bg-gold-bright transition-colors"
    @click="openSupport"
  >
    <img :src="supportIcon" alt="" class="w-7 h-7 object-contain" />
  </button>
  -->

  <nav
    class="fixed bottom-0 left-0 right-0 z-50 xl:hidden bg-white/80 dark:bg-card/80 backdrop-blur-xl border-t border-gray-200/80 dark:border-white/8 footer-nav h-[calc(56px+env(safe-area-inset-bottom,0))]"
  >
    <!-- Tab bar -->
    <div class="grid grid-cols-5 items-end h-14 pb-[env(safe-area-inset-bottom,0)]">
      <!-- Promos -->
      <RouterLink :to="{ name: 'promotions' }" class="flex flex-col items-center gap-0.5">
        <div class="relative">
          <img :src="promosIcon" alt="Promos" class="w-[1.4rem] h-[1.4rem] object-contain" />
          <span
            v-if="isActive('promotions')"
            class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-brand-bright"
          ></span>
        </div>
        <span
          class="text-[0.6rem] font-semibold"
          :class="isActive('promotions') ? 'text-brand-bright' : 'text-gray-500 dark:text-gray-500'"
        >
          Promos
        </span>
      </RouterLink>

      <!-- Casino -->
      <RouterLink :to="{ name: 'casino-home' }" class="flex flex-col items-center gap-0.5">
        <div class="relative">
          <img :src="casinoIcon" alt="Casino" class="w-[1.4rem] h-[1.4rem] object-contain" />
          <span class="absolute -top-0.5 -right-1.5 w-1.5 h-1.5 rounded-full bg-red-500 ring-2 ring-white dark:ring-card"></span>
          <span
            v-if="isActive('casino-home')"
            class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-brand-bright"
          ></span>
        </div>
        <span
          class="text-[0.6rem] font-semibold"
          :class="isActive('casino-home') ? 'text-brand-bright' : 'text-gray-500 dark:text-gray-500'"
        >
          Casino
        </span>
      </RouterLink>

      <!-- Betslip — Glassmorphism orb -->
      <div class="flex flex-col items-center" @click="openBetslip">
        <div class="relative -mt-6 cursor-pointer" data-fly-target="betslip">
          <!-- Soft glow behind orb -->
          <div
            :class="[
              'absolute inset-0 rounded-full blur-xl transition-opacity duration-700',
              betslipLength > 0 ? 'bg-bet/50 opacity-100' : 'bg-bet/30 opacity-100',
            ]"
          ></div>
          <div
            :class="[
              'absolute inset-1 rounded-full blur-md transition-opacity duration-700',
              betslipLength > 0 ? 'bg-bet-bright/40 opacity-100 animate-pulse' : 'opacity-0',
            ]"
          ></div>

          <!-- Glass orb -->
          <div
            :class="[
              'relative w-13 h-13 rounded-full flex items-center justify-center transition-all duration-300',
              'backdrop-blur-2xl border shadow-lg',
              betslipLength > 0
                ? 'bg-bet-bright border-bet-deep shadow-bet-deep/40'
                : 'bg-bet border-bet-deep shadow-bet-deep/30',
            ]"
          >
            <!-- Ticket icon when empty -->
            <svg
              v-if="betslipLength === 0"
              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
              class="w-5 h-5 text-bet-foreground"
            >
              <path fill-rule="evenodd" d="M1.5 6.375c0-1.036.84-1.875 1.875-1.875h17.25c1.035 0 1.875.84 1.875 1.875v3.026a.75.75 0 0 1-.375.65 2.249 2.249 0 0 0 0 3.898.75.75 0 0 1 .375.65v3.026c0 1.035-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 0 1 1.5 17.625v-3.026a.75.75 0 0 1 .374-.65 2.249 2.249 0 0 0 0-3.898.75.75 0 0 1-.374-.65V6.375Zm15-1.125a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-1.5 0V6a.75.75 0 0 1 .75-.75Zm.75 4.5a.75.75 0 0 0-1.5 0v.75a.75.75 0 0 0 1.5 0v-.75Zm-.75 3a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-1.5 0v-.75a.75.75 0 0 1 .75-.75Zm.75 4.5a.75.75 0 0 0-1.5 0V18a.75.75 0 0 0 1.5 0v-.75ZM6 12a.75.75 0 0 1 .75-.75H12a.75.75 0 0 1 0 1.5H6.75A.75.75 0 0 1 6 12Zm.75 2.25a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z" clip-rule="evenodd" />
            </svg>
            <!-- Count when active -->
            <span
              v-else
              class="text-base font-black text-bet-foreground"
            >{{ betslipLength }}</span>
          </div>
        </div>
        <span
          class="text-[0.6rem] font-semibold mt-0.5"
          :class="betslipLength > 0 ? 'text-gold-bright' : 'text-gray-500 dark:text-gray-500'"
        >Betslip</span>
      </div>

      <!-- My Bets -->
      <RouterLink :to="{ name: 'my-bets' }" class="flex flex-col items-center gap-0.5">
        <div class="relative">
          <img :src="betsIcon" alt="My Bets" class="w-[1.4rem] h-[1.4rem] object-contain" />
          <span
            v-if="isActive('my-bets')"
            class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-brand-bright"
          ></span>
        </div>
        <span
          class="text-[0.6rem] font-semibold"
          :class="isActive('my-bets') ? 'text-brand-bright' : 'text-gray-500 dark:text-gray-500'"
        >
          My Bets
        </span>
      </RouterLink>

      <!-- Profile -->
      <div class="flex flex-col items-center gap-0.5 cursor-pointer" @click="goToProfile">
        <div class="relative">
          <img :src="userIcon" alt="Profile" class="w-[1.4rem] h-[1.4rem] object-contain" />
          <span
            v-if="isActive('profile')"
            class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-brand-bright"
          ></span>
        </div>
        <span
          class="text-[0.6rem] font-semibold"
          :class="isActive('profile') ? 'text-brand-bright' : 'text-gray-500 dark:text-gray-500'"
        >
          Profile
        </span>
      </div>
    </div>
  </nav>
</template>

<style scoped>
[data-theme="light"] .footer-nav {
  box-shadow: 0 -1px 3px oklch(0% 0 0 / 0.05), 0 -4px 12px oklch(0% 0 0 / 0.03);
}

@keyframes support-fab-bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.support-fab {
  animation: support-fab-bounce 2.4s ease-in-out infinite;
}

.support-fab:hover {
  animation-play-state: paused;
}

@media (prefers-reduced-motion: reduce) {
  .support-fab {
    animation: none;
  }
}
</style>
