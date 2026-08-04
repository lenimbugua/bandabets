<script setup>
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/vue/24/outline";
import { storeToRefs } from "pinia";
import { computed, nextTick, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

import CasinoGameCard from "../components/casino/CasinoGameCard.vue";
import CasinoGameCarousel from "../components/casino/CasinoGameCarousel.vue";
import TheBanner from "../components/TheBanner.vue";
import CategoryPills from "../components/mobile/CategoryPills.vue";
import MobileFooterV2 from "../components/mobile/MobileFooterV2.vue";

import { useHead } from "@unhead/vue";
import { useCasino } from "../composables/useCasino";
import { useCasinoStore } from "../stores/casino";

const { launchCasino } = useCasino();
const casinoStore = useCasinoStore();
const { categoriesWithGames, categoriesLoading } = storeToRefs(casinoStore);

onMounted(() => {
  casinoStore.fetchCategoriesWithGames();
});

const route = useRoute();
const router = useRouter();

const searchTerm = ref("");
const selectedCategory = ref("all");
const searchInputRef = ref(null);

// Map API category name to routeName for game launching
function getRouteName(categoryName) {
  const lower = categoryName.toLowerCase();
  if (lower.includes("crash")) return "crash-games";
  if (lower.includes("virtual")) return "virtuals-games";
  return "casino";
}

// Map category name to display icon
function getCategoryIcon(name) {
  const lower = name.toLowerCase();
  if (lower.includes("crash")) return "crash";
  if (lower.includes("slot")) return "slots";
  if (lower.includes("live")) return "live";
  if (lower.includes("table")) return "table";
  if (lower.includes("virtual")) return "virtuals";
  if (lower.includes("roulette")) return "roulette";
  if (lower.includes("baccarat")) return "baccarat";
  return "other";
}

// Map category to pill slug for navigation
function getCategorySlug(cat) {
  const slug = cat.name.toLowerCase().replace(/\s+/g, "_");
  const mapped = {
    crash_game: "crash",
    slots: "slots",
    live_casino: "live",
    table_games: "table",
    virtuals: "virtuals",
    roulette: "roulette",
    baccarat: "baccarat",
    top_games: "top",
    popular_games: "top",
    other: "other",
  };
  return mapped[slug] || slug;
}

// All games flattened, deduplicated & sorted by priority
const masterGames = computed(() => {
  const map = new Map();
  categoriesWithGames.value.forEach((cat) => {
    const routeName = getRouteName(cat.name);
    cat.games.forEach((g) => {
      if (!map.has(g.id)) map.set(g.id, { ...g, routeName });
    });
  });
  return Array.from(map.values()).sort(
    (a, b) => (b.priority ?? 0) - (a.priority ?? 0)
  );
});

// Dynamic categories from API with games sorted by priority
const sortedCategories = computed(() => {
  return categoriesWithGames.value.map((cat) => {
    const routeName = getRouteName(cat.name);
    const sortedGames = [...cat.games]
      .sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0))
      .map((g) => ({ ...g, routeName }));
    return {
      ...cat,
      games: sortedGames,
      icon: getCategoryIcon(cat.name),
      slug: getCategorySlug(cat),
    };
  });
});

// Search results (live as you type)
const searchResults = computed(() => {
  if (!searchTerm.value.trim()) return [];
  const term = searchTerm.value.toLowerCase();
  return masterGames.value.filter(
    (g) =>
      g.gameName.toLowerCase().includes(term) ||
      (g.providerName && g.providerName.toLowerCase().includes(term))
  );
});

const isSearching = computed(() => searchTerm.value.trim().length > 0);

// Dynamic category pills from API
const categoryPills = computed(() => {
  const pills = [{ id: "all", name: "All" }];
  categoriesWithGames.value.forEach((cat) => {
    const slug = cat.name.toLowerCase().replace(/\s+/g, "_");
    const mapped = {
      crash_game: "crash",
      slots: "slots",
      live_casino: "live",
      table_games: "table",
      virtuals: "virtuals",
      roulette: "roulette",
      baccarat: "baccarat",
      top_games: "top",
      popular_games: "top",
      other: "other",
    };
    const id = mapped[slug] || slug;
    pills.push({ id, name: cat.name, apiId: cat.id });
  });
  return pills;
});

// React to category query param changes (including initial navigation)
watch(
  () => route.query.category,
  (cat) => {
    selectedCategory.value = cat || "all";
  },
  { immediate: true }
);

// Keep canonical URL in sync with the active category
const canonicalUrl = computed(() => {
  const base = "https://naibet.com/casino-home";
  const cat = route.query.category;
  return cat ? `${base}?category=${cat}` : base;
});

useHead({
  link: [{ rel: "canonical", href: canonicalUrl }],
});

const activeGridGames = computed(() => {
  const cat = sortedCategories.value.find(
    (c) => c.slug === selectedCategory.value
  );
  return cat ? cat.games : [];
});

const activeGridLabel = computed(() => {
  const cat = sortedCategories.value.find(
    (c) => c.slug === selectedCategory.value
  );
  if (cat) return cat.name;
  const pill = categoryPills.value.find((p) => p.id === selectedCategory.value);
  return pill ? pill.name : "Games";
});

const topSlots = computed(() => {
  const slotsCategory = sortedCategories.value.find(
    (cat) => cat.slug === "slots"
  );
  return slotsCategory ? slotsCategory.games.slice(0, 8) : [];
});

// Category filter mode
function onCategorySelect(id) {
  selectedCategory.value = id;
  searchTerm.value = "";

  router.replace({
    name: "casino-home",
    query: { category: id || "all" },
  });

  nextTick(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  });
}

function playGame(game) {
  launchCasino(game.id, game.gameName, game.routeName, game.providerName);
  searchTerm.value = "";
}

function clearSearch() {
  searchTerm.value = "";
  searchInputRef.value?.focus();
}

// function playTickerGame(gameName) {
//   const allGames =
//     casinoStore.categoriesWithGames?.flatMap((c) => c.games || []) || [];
//   const game = allGames.find((g) => g.gameName === gameName);
//   if (game) {
//     launchCasino(
//       game.id,
//       game.gameName,
//       game.routeName || "casino-home",
//       game.providerName
//     );
//   } else {
//     // Fallback: search for it in casino
//     router.push({ name: "casino-home", query: { search: gameName } });
//   }
// }
</script>

<template>
  <div class="min-h-screen">
    <h1 class="sr-only">Casino | Play 500+ Games Online | Naibet</h1>
    <div class="sticky top-0 z-60 bg-white dark:bg-background">
      <TheDepositBar class="md:hidden" />
      <HeaderLinks />
      <CategoryPills :sticky="false" />
      <!-- Casino category nav (only on casino-mode routes) -->
      <CasinoCategoryNav />
    </div>

    <div class="w-full bg-gray-50 dark:bg-background">
      <div class="max-w-[1280px] mx-auto px-3 md:px-5 pb-20">
        <!-- 2. Hero Banner -->
        <TheBanner class="mt-3" />
        <!-- Search Input -->
        <div class="relative z-30 mt-3">
          <div
            class="flex items-center bg-white dark:bg-surface-deepest rounded-xl border border-gray-300 dark:border-border-subtle focus-within:border-primary/50 transition-colors"
          >
            <MagnifyingGlassIcon
              class="w-4 h-4 ml-3.5 text-gray-600 dark:text-muted-foreground shrink-0"
            />
            <input
              ref="searchInputRef"
              v-model="searchTerm"
              type="search"
              aria-label="Search games or providers"
              placeholder="Search games or providers..."
              class="flex-1 bg-transparent py-2.5 px-3 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-muted-foreground outline-hidden"
            />
            <button
              v-if="searchTerm"
              aria-label="Clear search"
              class="mr-1.5 p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-surface-sunken transition-colors"
              @click="clearSearch"
            >
              <XMarkIcon
                class="w-4 h-4 text-gray-600 dark:text-muted-foreground"
              />
            </button>
          </div>

          <!-- Search Results Dropdown -->
          <div
            v-if="isSearching"
            class="absolute left-0 right-0 top-full bg-white dark:bg-surface-sunken border border-t-0 border-gray-200 dark:border-border-subtle rounded-b-lg shadow-2xl shadow-black/10 dark:shadow-black/60 max-h-[400px] overflow-y-auto z-40"
          >
            <div v-if="searchResults.length > 0">
              <div
                class="px-4 py-2 border-b border-gray-200 dark:border-border-subtle"
              >
                <span
                  class="text-gray-700 dark:text-muted-foreground text-xs font-medium"
                >
                  {{ searchResults.length }} results
                </span>
              </div>
              <div
                v-for="game in searchResults.slice(0, 12)"
                :key="game.id"
                role="button"
                :aria-label="'Play ' + game.gameName"
                tabindex="0"
                class="flex items-center space-x-3 px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-surface-sunken cursor-pointer transition-colors"
                @mousedown.prevent="playGame(game)"
              >
                <div
                  class="w-10 h-10 rounded-md overflow-hidden bg-gray-100 dark:bg-surface-deepest shrink-0"
                >
                  <img
                    :src="game.imgFullUrl"
                    :alt="game.gameName"
                    loading="lazy"
                    class="w-full h-full object-cover"
                  />
                </div>
                <div class="flex-1 min-w-0">
                  <p
                    class="text-gray-900 dark:text-white text-sm font-medium truncate"
                  >
                    {{ game.gameName }}
                  </p>
                  <p
                    class="text-gray-600 dark:text-muted-foreground text-xs truncate"
                  >
                    {{ game.providerName }}
                  </p>
                </div>
                <span class="text-primary text-xs font-semibold shrink-0">
                  Play
                </span>
              </div>
              <div
                v-if="searchResults.length > 12"
                class="px-4 py-2.5 text-center border-t border-gray-200 dark:border-border-subtle"
              >
                <span class="text-gray-600 dark:text-muted-foreground text-xs">
                  +{{ searchResults.length - 12 }} more results
                </span>
              </div>
            </div>
            <div v-else class="flex flex-col items-center py-8">
              <MagnifyingGlassIcon
                class="w-8 h-8 text-gray-300 dark:text-muted-foreground mb-2"
              />
              <p class="text-gray-700 dark:text-muted-foreground text-sm">
                No games found
              </p>
            </div>
          </div>
        </div>

        <!-- Click-away overlay when searching -->
        <div
          v-if="isSearching"
          class="fixed inset-0 z-20"
          @click="searchTerm = ''"
        />

        <!-- Skeleton loader -->
        <div v-if="categoriesLoading" class="space-y-6">
          <div v-for="section in 3" :key="section">
            <div class="flex items-center gap-2 mb-3 px-1">
              <div
                class="w-20 h-5 rounded-md bg-gray-200 dark:bg-surface-elevated animate-pulse"
              />
            </div>
            <div class="flex space-x-3 overflow-hidden">
              <div
                v-for="card in 6"
                :key="card"
                class="shrink-0 w-[120px] sm:w-[180px]"
              >
                <div
                  class="aspect-4/3 rounded-xl bg-gray-200 dark:bg-surface-elevated animate-pulse"
                />
                <div
                  class="mt-1.5 h-3 w-3/4 rounded bg-gray-200 dark:bg-surface-elevated animate-pulse"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- ALL: Show all carousel sections stacked -->
        <template v-else-if="selectedCategory === 'all'">
          <!-- Top Slots Section -->
          <CasinoGameCarousel
            v-if="topSlots.length > 0"
            title="Top Slots"
            icon="slots"
            :games="topSlots"
            @play="playGame"
            @see-all="onCategorySelect('slots')"
          />

          <!-- Category Carousels -->
          <CasinoGameCarousel
            v-for="cat in sortedCategories"
            :key="cat.id"
            :title="cat.name"
            :icon="cat.icon"
            :games="cat.games"
            @play="playGame"
            @see-all="onCategorySelect(cat.slug)"
          />
        </template>

        <!-- CATEGORY: Expanded full grid view -->
        <template v-else>
          <div class="mb-4">
            <!-- Back to all + section title -->
            <div class="flex items-center space-x-3 mb-4">
              <button
                aria-label="Back to all categories"
                class="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-surface-sunken hover:bg-gray-200 dark:hover:bg-surface-elevated text-gray-700 dark:text-muted-foreground hover:text-gray-900 dark:hover:text-white transition-colors"
                @click="onCategorySelect('all')"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  class="w-4 h-4"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.75 19.5 8.25 12l7.5-7.5"
                  />
                </svg>
              </button>
              <h2 class="text-gray-900 dark:text-white text-lg font-bold">
                {{ activeGridLabel }}
                <span
                  class="text-gray-600 dark:text-muted-foreground text-xs ml-2"
                  >({{ activeGridGames.length }})</span
                >
              </h2>
            </div>

            <div
              v-if="activeGridGames.length > 0"
              class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3"
            >
              <CasinoGameCard
                v-for="game in activeGridGames"
                :key="game.id"
                :game="game"
                class="w-full!"
                @play="playGame"
              />
            </div>

            <div v-else class="flex flex-col items-center py-16">
              <p class="text-gray-700 dark:text-muted-foreground font-medium">
                No games in this category
              </p>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
  <MobileFooterV2 />
  <Footer />
</template>

<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>
