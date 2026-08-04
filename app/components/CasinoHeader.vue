<script setup>
import { useModalTypes } from "@/composables/useModalTypes";
import { useCasinoStore } from "@/stores/casino";
import { useLoginStore } from "@/stores/login";
import { useModalStore } from "@/stores/modal";
import { storeToRefs } from "pinia";
import { computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const { setAfterLoginAction } = useLoginStore();
const { isAuthenticated } = storeToRefs(useLoginStore());
const { deposit, login } = useModalTypes();
const { openModal } = useModalStore();

const casinoStore = useCasinoStore();
const { gameNameToLaunch, gameProviderToLaunch } = storeToRefs(casinoStore);

onMounted(() => {
  const urlSlug = route.params.name;
  if (urlSlug && gameNameToLaunch.value) {
    const storeSlug = gameNameToLaunch.value.toLowerCase().replace(/\s+/g, "-");
    if (storeSlug !== urlSlug.toLowerCase()) {
      casinoStore.setLaunchGameMeta(null, null);
    }
  }
});

function formatSlugToName(slug) {
  if (!slug) return "Casino Game";
  return String(slug)
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

const gameName = computed(() => {
  if (gameNameToLaunch.value) return gameNameToLaunch.value;
  return formatSlugToName(route.params.name);
});

const providerName = computed(() => gameProviderToLaunch.value || "");

function handleDeposit() {
  if (!isAuthenticated.value) {
    setAfterLoginAction(openModal(deposit));
    openModal(login);
    return;
  }
  openModal(deposit);
}

function goBack() {
  if (window.history.length > 1) {
    router.go(-1);
  } else {
    router.push({ name: "casino-home" });
  }
}

function goToCasinoHome() {
  router.push({ name: "casino-home" });
}
</script>

<template>
  <header class="sticky top-0 z-50 bg-card border-b border-border-subtle">
    <div class="mx-auto max-w-[1680px] flex items-center gap-2 px-3 h-12">
      <!-- Left cluster: back + casino home -->
      <div class="flex items-center gap-1.5 shrink-0">
        <button
          type="button"
          aria-label="Go back"
          class="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-surface-interactive text-foreground hover:bg-surface-active transition-colors"
          @click="goBack"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <button
          type="button"
          aria-label="Casino lobby"
          class="hidden sm:inline-flex items-center gap-1.5 px-3 h-9 rounded-lg bg-surface-interactive text-foreground hover:bg-surface-active transition-colors text-xs font-semibold"
          @click="goToCasinoHome"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4">
            <path d="M3 12l9-9 9 9" />
            <path d="M5 10v10a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V10" />
          </svg>
          <span>Lobby</span>
        </button>

        <button
          type="button"
          aria-label="Casino lobby"
          class="inline-flex sm:hidden items-center justify-center w-9 h-9 rounded-lg bg-surface-interactive text-foreground hover:bg-surface-active transition-colors"
          @click="goToCasinoHome"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4">
            <path d="M3 12l9-9 9 9" />
            <path d="M5 10v10a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V10" />
          </svg>
        </button>
      </div>

      <!-- Center: game info -->
      <div class="flex-1 min-w-0 flex flex-col items-center text-center">
        <span class="text-sm font-bold text-foreground truncate max-w-full leading-tight">
          {{ gameName }}
        </span>
        <span
          v-if="providerName"
          class="text-[10px] font-semibold tracking-wider uppercase text-muted-foreground truncate max-w-full leading-tight"
        >
          {{ providerName }}
        </span>
      </div>

      <!-- Right: deposit -->
      <button
        type="button"
        class="shrink-0 inline-flex items-center gap-1.5 px-3 h-9 rounded-lg bg-primary text-primary-foreground hover:opacity-90 active:scale-95 transition-all text-xs font-bold"
        @click="handleDeposit"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
        <span>Deposit</span>
      </button>
    </div>
  </header>
</template>
