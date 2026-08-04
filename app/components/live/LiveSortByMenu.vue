<script setup>
import { useNewLiveStore } from "@/stores/new-live";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import { ChevronDownIcon } from "@heroicons/vue/20/solid";
import { ref } from "vue";

const { setSortBy, getLiveMatches } = useNewLiveStore();

const menus = ref([
  { name: "Highlights", value: "" },
  { name: "Top Leagues", value: "top_league" },
  { name: "Ending Soon", value: "ending_soon" },
  { name: "Just Started", value: "start_date" },
]);

const getMatches = (sortBy) => {
  setSortBy(sortBy);
  getLiveMatches();
};
</script>

<template>
  <div class="text-right">
    <Menu as="div" class="relative inline-block text-left z-25">
      <div>
        <MenuButton
          class="sort-btn inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-[0.65rem] font-semibold transition-all duration-150 cursor-pointer focus:outline-hidden"
        >
          <span class="text-gray-600 dark:text-white/55">Sort by</span>
          <ChevronDownIcon
            class="h-3.5 w-3.5 text-gray-400 dark:text-white/35"
            aria-hidden="true"
          />
        </MenuButton>
      </div>

      <transition
        enter-active-class="transition duration-100 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-75 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <MenuItems
          class="sort-dropdown absolute right-0 mt-1.5 w-36 origin-top-right rounded-xl overflow-hidden focus:outline-hidden"
        >
          <div class="py-1">
            <MenuItem v-for="menu in menus" :key="menu.name" v-slot="{ active }">
              <button
                :class="[
                  active
                    ? 'bg-gray-100 dark:bg-white/8 text-gray-900 dark:text-white'
                    : 'text-gray-600 dark:text-white/60',
                ]"
                class="flex w-full items-center px-3 py-2 text-[0.65rem] font-medium transition-colors"
                @click="getMatches(menu.value)"
              >
                {{ menu.name }}
              </button>
            </MenuItem>
          </div>
        </MenuItems>
      </transition>
    </Menu>
  </div>
</template>

<style scoped>
.sort-btn {
  background: oklch(96% 0.005 258 / 0.6);
}
[data-theme="dark"] .sort-btn {
  background: oklch(26% 0.04 258 / 0.5);
}
.sort-btn:hover {
  background: oklch(93% 0.005 258 / 0.7);
}
[data-theme="dark"] .sort-btn:hover {
  background: oklch(29% 0.04 258 / 0.6);
}

.sort-dropdown {
  background: white;
  box-shadow:
    0 4px 16px oklch(0% 0 0 / 0.08),
    0 1px 3px oklch(0% 0 0 / 0.06);
}
[data-theme="dark"] .sort-dropdown {
  background: var(--card);
  box-shadow:
    0 4px 16px oklch(0% 0 0 / 0.3),
    0 1px 3px oklch(0% 0 0 / 0.2);
}
</style>
