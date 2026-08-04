<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useAppMode } from "@/composables/useAppMode";
import { casinoCategoryIconPaths as icons } from "@/composables/useCasinoCategoryIcons";

const route = useRoute();
const { currentMode } = useAppMode();

const links = [
  { label: "Home", slug: null, iconPath: icons.home },
  { label: "Live", slug: "live", iconPath: icons.live },
  { label: "Slots", slug: "slots", iconPath: icons.slots },
  { label: "Crash", slug: "crash", iconPath: icons.crash },
  { label: "Virtual", slug: "virtuals", iconPath: icons.virtuals },
  { label: "Top Games", slug: "top", iconPath: icons.top },
  { label: "Table", slug: "table", iconPath: icons.table },
  { label: "New", slug: "new", iconPath: icons.new },
  { label: "Other", slug: "other", iconPath: icons.other },
];

const visible = computed(() => currentMode.value === "casino");

function isActive(slug) {
  if (route.name !== "casino-home") return false;
  const q = route.query.category;
  if (slug === null) return !q || q === "all";
  return q === slug;
}

function targetFor(slug) {
  return { name: "casino-home", query: { category: slug ?? "all" } };
}
</script>

<template>
  <!-- Mobile / tablet only: pill-based navigation.
       The desktop sidebar variant lives in <CasinoSidebar /> mounted at
       App.vue level (outside any backdrop-filter ancestor) so that
       position:sticky works against the viewport, not a containing block. -->
  <nav
    v-if="visible"
    aria-label="Casino categories"
    class="lg:hidden bg-background/90 backdrop-blur-xl px-3 py-2.5"
  >
    <ul
      class="flex items-center gap-2 overflow-x-auto scrollbar-hide"
    >
      <li v-for="link in links" :key="link.label">
        <RouterLink
          :to="targetFor(link.slug)"
          class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all"
          :class="isActive(link.slug)
            ? 'bg-brand-bright text-primary-foreground font-bold'
            : 'bg-white dark:bg-white/8 text-gray-600 dark:text-white/50 border border-gray-200 dark:border-white/10 hover:text-gray-800 dark:hover:text-white/75 hover:border-gray-300 dark:hover:border-white/20'"
        >
          <svg
            viewBox="0 0 24 24"
            class="w-4 h-4 shrink-0"
            :class="isActive(link.slug) ? 'text-gray-900 dark:text-gray-900' : 'text-gray-600 dark:text-white/50'"
            fill="currentColor"
            aria-hidden="true"
          >
            <path :d="link.iconPath" />
          </svg>
          <span>{{ link.label }}</span>
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>
