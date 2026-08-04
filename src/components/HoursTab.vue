<script setup>
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import { ChevronDownIcon } from "@heroicons/vue/20/solid";
import { useMatchesStore } from "../stores/matches";
import { ref } from "vue";
const { fetchHourMatches } = useMatchesStore();

function fetchMatchesByDate(hour) {
  fetchHourMatches(hour);
}

const hours = ref([3, 6, 9, 12]);

</script>

<template>
  <Menu as="div" class="relative inline-block text-left">
    <div>
      <MenuButton
        class="inline-flex w-full justify-center items-center text-md font-bold focus:outline-hidden"
      >
        HRS
        <ChevronDownIcon
          class="-mr-1 h-5 w-5 fill-current"
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
        class="absolute -right-3 mt-2 w-20 origin-top-right divide-y divide-gray-100 rounded-md bg-white dark:bg-surface-interactive shadow-lg ring-1 ring-black/5 focus:outline-hidden"
      >
        <div class="px-1 py-1">
          <MenuItem v-for="hour in hours" :key="hour" v-slot="{ active }">
            <button
              :class="[
                active
                  ? 'bg-surface-deepest text-white'
                  : 'text-gray-900 dark:text-gray-300',
                'group flex w-full items-center rounded-md px-2 py-2 text-sm',
              ]"
              @click="fetchMatchesByDate(hour)"
            >
              {{ hour }} HRS
            </button>
          </MenuItem>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>
