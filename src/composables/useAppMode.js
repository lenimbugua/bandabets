import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useAppModeStore } from "@/stores/app-mode";

const SPORTS_HOME = { name: "sports", params: { sport: "soccer" } };
const CASINO_HOME = { name: "casino-home" };

export function useAppMode() {
  const route = useRoute();
  const router = useRouter();
  const store = useAppModeStore();
  const { lastMode } = storeToRefs(store);

  const category = computed(() => route.meta?.category ?? "cross-cutting");

  const currentMode = computed(() => {
    if (category.value === "sports") return "sports";
    if (category.value === "casino") return "casino";
    return lastMode.value; // cross-cutting or unknown
  });

  const showSwitch = computed(() => category.value !== "auth");

  function switchTo(mode) {
    if (mode !== "casino" && mode !== "sports") return;
    store.setLastMode(mode);
    router.push(mode === "casino" ? CASINO_HOME : SPORTS_HOME);
  }

  return { currentMode, showSwitch, switchTo };
}
