<script setup>
import { FlagIcon } from "@heroicons/vue/24/outline";
import { storeToRefs } from "pinia";
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/vue/20/solid";

import { useMatchesStore } from "../stores/matches";

const { competitions, meta } = storeToRefs(useMatchesStore());
</script>
<template>
  <div class="max-w-sm">
    <Listbox>
      <div class="mt-1">
        <ListboxButton
          class="relative w-full cursor-default rounded-md border dark:border-border bg-white dark:bg-surface-deepest py-1 pl-3 pr-10 text-left shadow-md focus:outline-hidden focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
        >
          <span class="block truncate text-gray-950 dark:text-gray-50"
            >Leagues</span
          >
          <span
            class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
          >
            <ChevronUpDownIcon
              class="h-5 w-5 text-gray-950 dark:text-gray-400"
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
            class="absolute mt-1 max-w-96 h-96 overflow-auto rounded-md bg-white dark:bg-background py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-hidden sm:text-sm"
          >
            <BaseEmptyState
              v-if="!competitions || !competitions.length"
              :icon="FlagIcon"
              title="No leagues"
              description="No competitions available"
              size="sm"
              compact
            />
            <ListboxOption
              v-slot="{ active, selected }"
              value="All"
              as="template"
            >
              <li
                :class="[
                  active
                    ? 'bg-amber-100 text-amber-900 dark:text-white'
                    : 'text-gray-900 dark:text-white',
                  'relative cursor-default select-none py-2 pl-10 pr-4',
                ]"
              >
                <span
                  :class="[
                    selected ? 'font-medium' : 'font-normal',
                    'block truncate',
                  ]"
                  >All ({{ meta.total }})</span
                >
                <span
                  v-if="selected"
                  class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"
                >
                  <CheckIcon class="h-5 w-5" aria-hidden="true" />
                </span>
              </li>
            </ListboxOption>
            <ListboxOption
              v-for="competition in competitions"
              v-slot="{ active, selected }"
              :key="competition.name"
              :value="competition"
              as="template"
            >
              <li
                :class="[
                  active
                    ? 'bg-amber-100 text-amber-900'
                    : 'text-gray-900 dark:text-white',
                  'relative cursor-default select-none py-2 pl-10 pr-4',
                ]"
              >
                <span
                  :class="[
                    selected ? 'font-medium' : 'font-normal',
                    'block truncate',
                  ]"
                  >{{ competition.competitionName }} ({{
                    competition.matchCount
                  }})</span
                >
                <span
                  v-if="selected"
                  class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"
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
</template>
