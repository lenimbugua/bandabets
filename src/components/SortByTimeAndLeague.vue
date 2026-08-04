<script setup>
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/vue";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/vue/20/solid";

import { useMatchesStore } from "../stores/matches";

const { fetchSortedMatches } = useMatchesStore();

import { ref } from "vue";

function fetchSortedBy(sortBy) {
  fetchSortedMatches(sortBy);
}
const sorts = ref(["league", "time"]);

const selectedSort = ref(sorts.value[0]);
</script>

<template>
  <div class="flex w-full items-center py-1.5">
    <div class="w-full">
      <Listbox v-model="selectedSort">
        <div class="relative">
          <ListboxButton
            :class="['bg-gray-300 dark:bg-surface-active']"
            class="relative flex px-2 items-center w-full cursor-default rounded-md text-left shadow-md focus:outline-hidden text-sm"
          >
            <span
              :class="['text-gray-900', 'dark:text-gray-50']"
              class="block truncate font-medium pr-2 py-1 capitalize"
              >Sort by {{ selectedSort }}</span
            >
            <span
              class="pointer-events-none absolute inset-y-0 right-0 flex items-center"
            >
              <ChevronUpDownIcon
                :class="['text-primary-400', 'dark:text-primary-450']"
                class="h-5 w-5"
                aria-hidden="true"
              />
            </span>
          </ListboxButton>

          <transition
            leave-active-class="transition duration-100 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
          >
            <ListboxOptions
              :class="['bg-gray-200 dark:bg-background', 'ring-white/5']"
              class="absolute max-h-60 w-full overflow-auto rounded-md py-1 text-base shadow-lg ring-1 focus:outline-hidden sm:text-sm"
            >
              <ListboxOption
                v-for="sort in sorts"
                v-slot="{ active, selected }"
                :key="sort"
                :value="sort"
                as="template"
                @click="fetchSortedBy(sort)"
              >
                <li
                  class="relative cursor-pointer select-none pl-10 py-2"
                  :class="[
                    active
                      ? 'bg-gray-300 dark:bg-surface-active '
                      : 'text-gray-900 dark:text-gray-300',
                  ]"
                >
                  <span
                    class="block truncate capitalize"
                    :class="[selected ? 'font-medium' : 'font-normal']"
                    >Sort by {{ sort }}</span
                  >
                  <span
                    v-if="selected"
                    class="absolute inset-y-0 left-0 flex items-center pl-3 text-red-600"
                  >
                    <CheckIcon class="h-5 w-5" aria-hidden="true" />
                  </span>
                </li>
              </ListboxOption>
            </ListboxOptions>
          </transition>
        </div>
      </Listbox>
    </div>
  </div>
</template>
