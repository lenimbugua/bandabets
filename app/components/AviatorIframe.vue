<script setup>
import { useAviatorStore } from "@/stores/aviator";
import { onBeforeUnmount } from "vue";
import CasinoEmbedd from "../components/CasinoEmbedd.vue";
import { useCasinoStore } from "../stores/casino";

const { setLaunchGameId, setLaunchGameMeta } = useCasinoStore();

const { public: config } = useRuntimeConfig();
setLaunchGameId(config.aviatorGameId);
setLaunchGameMeta("Aviator", "Spribe");

const { setView } = useAviatorStore();

onBeforeUnmount(() => {
  setView("");
});
</script>

<template>
  <div class="flex flex-col h-full">
    <!-- Game -->
    <div class="flex-1 min-h-0">
      <CasinoEmbedd />
    </div>
  </div>
</template>
