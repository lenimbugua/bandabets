<script setup>
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/vue";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/vue/20/solid";

import { useMatchesStore } from "../stores/matches";
import { computed } from "vue";
import { storeToRefs } from "pinia";

const { markets } = storeToRefs(useMatchesStore());

const selectedMarket = computed(() => markets.value[0]);
</script>

<template>
  <div
    v-if="selectedMarket"
    class="flex w-full justify-center items-center py-1.5"
  >
    <div class="w-full">
      <Listbox v-model="selectedMarket">
        <div class="relative">
          <ListboxButton
            :class="['bg-gray-300 dark:bg-surface-active']"
            class="relative flex px-2 items-center w-full cursor-default rounded-md text-left shadow-md focus:outline-hidden text-sm"
          >
            <span
              :class="['text-gray-700', 'dark:text-gray-50']"
              class="block truncate font-medium pr-2 py-1"
              >{{ selectedMarket.oddType }}</span
            >
            <span
              class="pointer-events-none absolute inset-y-0 right-0 flex items-center"
            >
              <ChevronUpDownIcon
                :class="['text-muted-foreground', 'dark:text-muted-foreground']"
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
              :class="['bg-gray-100 dark:bg-background', 'ring-white/5']"
              class="absolute max-h-60 w-full overflow-auto rounded-md py-1 text-base shadow-lg ring-1 focus:outline-hidden sm:text-sm"
            >
              <ListboxOption
                v-for="market in markets"
                v-slot="{ active, selected }"
                :key="market.subTypeId"
                :value="market.subTypeId"
                as="template"
              >
                <li
                  class="relative cursor-pointer select-none pl-10 py-2"
                  :class="[
                    active
                      ? 'bg-gray-300 dark:bg-surface-active text-red-900 dark:text-red-500'
                      : 'text-gray-900 dark:text-gray-100',
                  ]"
                >
                  <span
                    class="block truncate"
                    :class="[selected ? 'font-medium' : 'font-normal']"
                    >{{ market.oddType }}</span
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
