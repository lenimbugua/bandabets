<script setup>
import { storeToRefs } from "pinia";
import { onBeforeUnmount, onMounted, ref, toRefs, watch } from "vue";
import { useMatches2Store } from "../stores/matches2";
import { useSportsQueryParamsStore } from "../stores/sports-query-params";

const matchesStore = useMatches2Store();
const { getMatches } = matchesStore;
const { matches } = storeToRefs(matchesStore);
const { layout } = toRefs(useSportsQueryParamsStore());

const listEl = ref(null);
const sentinelEl = ref(null);

/* --- Infinite scroll ---
   A 1px sentinel sits after the slot content; an IntersectionObserver rooted
   on the scroll container fires when the sentinel comes within 600px of the
   viewport, and we fetch the next page. Rules that keep it sane:
   - `loadingMore` gates concurrent fetches.
   - scrollTop is never touched after a fetch: appended items simply extend
     the list below the user's position. (The old vueuse version set
     scrollTop = scrollHeight here — a no-op against the <Lazy> component
     instance it was written for, but a jump-to-bottom loop against a real
     element.)
   - After a fetch that grew the list, the sentinel is re-observed so a
     still-short page keeps filling until it overflows the container.
   - A fetch that grows nothing marks the feed exhausted; any change to the
     match list (new sport, new filter) re-arms it. */
let observer = null;
let loadingMore = false;
let exhausted = false;

function pokeObserver() {
  if (observer && sentinelEl.value) {
    observer.unobserve(sentinelEl.value);
    observer.observe(sentinelEl.value);
  }
}

async function loadMore() {
  if (loadingMore || exhausted || layout.value === "grid") return;
  loadingMore = true;
  const before = matches.value?.length ?? 0;
  try {
    await getMatches();
  } finally {
    loadingMore = false;
  }
  const after = matches.value?.length ?? 0;
  if (after > before) {
    pokeObserver();
  } else {
    exhausted = true;
  }
}

watch(
  () => matches.value?.length ?? 0,
  (now, prev) => {
    // The list was replaced or reset (sport/filter change) — start over.
    if (now < prev) {
      exhausted = false;
      pokeObserver();
    }
  },
);

watch(layout, (val) => {
  if (val !== "grid") {
    exhausted = false;
    pokeObserver();
  }
});

// --- Scroll lock: prevent browser/infinite-scroll from jumping past hero ---
const scrollLocked = ref(true);
let lockTimer = null;

function forceScrollTop() {
  if (listEl.value) listEl.value.scrollTop = 0;
}

function onScrollWhileLocked() {
  if (scrollLocked.value) forceScrollTop();
}

function unlock() {
  scrollLocked.value = false;
  if (listEl.value) listEl.value.removeEventListener("scroll", onScrollWhileLocked);
}

function lockScroll(duration = 1200) {
  // Don't lock if we should restore scroll (coming back from match-details)
  if (matchesStore.restoreScroll) return;

  scrollLocked.value = true;
  clearTimeout(lockTimer);
  forceScrollTop();

  if (listEl.value) {
    listEl.value.addEventListener("scroll", onScrollWhileLocked);
  }

  lockTimer = setTimeout(unlock, duration);
}

onMounted(() => {
  lockScroll();

  observer = new IntersectionObserver(
    (entries) => {
      if (entries.some((entry) => entry.isIntersecting)) loadMore();
    },
    { root: listEl.value, rootMargin: "600px 0px" },
  );
  if (sentinelEl.value) observer.observe(sentinelEl.value);
});

onBeforeUnmount(() => {
  clearTimeout(lockTimer);
  unlock();
  if (observer) {
    observer.disconnect();
    observer = null;
  }
});
</script>
<template>
  <!-- Plain div, NOT <Lazy>: this wraps the page's entire main content, and
       Lazy.vue's IntersectionObserver-gated slot renders nothing during SSR,
       which blanked the landing/sports pages' server HTML. -->
  <div
    ref="listEl"
    class="matches-scroll-container h-dvh w-full overflow-scroll dark:border-border-darkest scrollbar-hide"
  >
    <slot />
    <div ref="sentinelEl" class="h-px" aria-hidden="true"></div>
  </div>
</template>
