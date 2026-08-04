<script setup>
import { useInfiniteScroll } from "@vueuse/core";
import { onMounted, onBeforeUnmount, ref, toRefs } from "vue";
import { useMatches2Store } from "../stores/matches2";
import { useSportsQueryParamsStore } from "../stores/sports-query-params";

const matchesStore = useMatches2Store();
const { getMatches } = matchesStore;
const { layout } = toRefs(useSportsQueryParamsStore());

const listEl = ref(null);

useInfiniteScroll(
  listEl,
  async () => {
    if (layout.value === "grid") return;
    await getMatches();
    const scrollContainer = listEl.value;

    if (scrollContainer) {
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  },
  {
    distance: 600,
  },
);

// --- Scroll lock: prevent browser/infinite-scroll from jumping past hero ---
const scrollLocked = ref(true);
let lockTimer = null;

function getEl() {
  return listEl.value?.$el || listEl.value;
}

function forceScrollTop() {
  const el = getEl();
  if (el) el.scrollTop = 0;
}

function onScrollWhileLocked() {
  if (scrollLocked.value) forceScrollTop();
}

function unlock() {
  scrollLocked.value = false;
  const el = getEl();
  if (el) el.removeEventListener("scroll", onScrollWhileLocked);
}

function lockScroll(duration = 1200) {
  // Don't lock if we should restore scroll (coming back from match-details)
  if (matchesStore.restoreScroll) return;

  scrollLocked.value = true;
  clearTimeout(lockTimer);
  forceScrollTop();

  const el = getEl();
  if (el) {
    el.addEventListener("scroll", onScrollWhileLocked);
  }

  lockTimer = setTimeout(unlock, duration);
}

onMounted(() => {
  lockScroll();
});

onBeforeUnmount(() => {
  clearTimeout(lockTimer);
  unlock();
});
</script>
<template>
  <Lazy
    ref="listEl"
    class="matches-scroll-container h-dvh w-full overflow-scroll dark:border-border-darkest scrollbar-hide"
  >
    <slot />
  </Lazy>
</template>
