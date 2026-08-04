<script setup>
import CasinoSidebar from "@/components/CasinoSidebar.vue";
import CollectAllModals from "@/components/CollectAllModals.vue";
import SiakaSplashLoader from "@/components/SiakaSplashLoader.vue";
import { useAppMode } from "@/composables/useAppMode";
import { useModalTypes } from "@/composables/useModalTypes";
import { usePropellarAds } from "@/composables/usePropellarAds";
import { useThemeSwitch } from "@/composables/useThemeSwitch";
import { useModalStore } from "@/stores/modal";
import { useRoadblockStore } from "@/stores/roadblock";
import { onBeforeMount, onBeforeUnmount, onMounted } from "vue";
import { useAppVersionStore } from "./stores/app-version";

const appVersionStore = useAppVersionStore();

const { openModal } = useModalStore();
const {  stopRoadblockRotationTimer } =
  useRoadblockStore();
const { notification } = useModalTypes();
const { initPropellerAds } = usePropellarAds();
const { switchToDark } = useThemeSwitch();
const { currentMode } = useAppMode();

// 🔹 Init non-reactive things early
initPropellerAds();
onBeforeMount(() => switchToDark());

onMounted(() => {
  // Roadblocks disabled
  // setTimeout(() => {
  //   startRoadblockRotationTimer(route);
  // }, 500);

  // 🔹 Fire-and-forget version check (SAFE)
  appVersionStore.checkVersion();

  // 🔹 Modal logic independent
  const nav = performance.getEntriesByType("navigation")[0];
  const isReload = nav?.type === "reload";

  if (!isReload) {
    openModal(notification);
  }
});

onBeforeUnmount(() => {
  stopRoadblockRotationTimer();
});
</script>

<template>
  <div class="bg-white dark:bg-background">
    <SiakaSplashLoader />
    <div :class="currentMode === 'casino' ? 'lg:flex' : ''">
      <CasinoSidebar v-if="currentMode === 'casino'" />
      <div class="flex-1 min-w-0">
        <router-view />
      </div>
    </div>
    <OddsBar class="xl:hidden" />
    <CollectAllModals />
  </div>
</template>
