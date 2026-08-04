<script setup>
import { CheckIcon, ChevronDownIcon } from "@heroicons/vue/20/solid";
import { useFormatDates } from "../composables/useFormatDates";

import { useMatches2Store } from "../stores/matches2";
import { useSportsQueryParamsStore } from "../stores/sports-query-params";

import { ref } from "vue";

const { getMatches, emptyMatches, setCalendarIsPending } = useMatches2Store();
const { setDay, setResource } = useSportsQueryParamsStore();

const { generateNextFourDays } = useFormatDates();

const nextFourDays = generateNextFourDays();
const isOpen = ref(false);

const dayOptions = [
  ...nextFourDays.map((d) => ({ label: d.day, value: d.date })),
  { label: "All", value: "" },
];

const selectedDay = ref(dayOptions[0]);

async function handleDaySelect(option) {
  selectedDay.value = option;
  isOpen.value = false;
  emptyMatches();
  setResource("");
  setDay(option.value);
  setCalendarIsPending(true);
  await getMatches();
  setCalendarIsPending(false);
}

function closePopover() {
  isOpen.value = false;
}
</script>

<template>
  <!-- relative: the desktop popover below is absolutely positioned, and without
       a positioned ancestor here it anchors to the sticky filter bar instead of
       this trigger, landing at the bar's bottom-left corner. -->
  <div class="relative flex items-center">
    <button
      class="flex items-center gap-1 px-3 py-1.5 text-xs font-medium uppercase whitespace-nowrap rounded-full transition-colors cursor-pointer bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/15 focus:outline-hidden"
      @click="isOpen = !isOpen"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        class="w-4 h-4 text-gray-600 dark:text-gray-300 shrink-0"
      >
        <path
          fill-rule="evenodd"
          d="M5.75 2a.75.75 0 0 1 .75.75V4h7V2.75a.75.75 0 0 1 1.5 0V4h.25A2.75 2.75 0 0 1 18 6.75v8.5A2.75 2.75 0 0 1 15.25 18H4.75A2.75 2.75 0 0 1 2 15.25v-8.5A2.75 2.75 0 0 1 4.75 4H5V2.75A.75.75 0 0 1 5.75 2Zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75Z"
          clip-rule="evenodd"
        />
      </svg>
      <span class="text-xs font-medium text-gray-700 dark:text-gray-200 uppercase">
        {{ selectedDay?.label?.toUpperCase() || "DATE" }}
      </span>
      <ChevronDownIcon class="w-3 h-3 text-gray-600 dark:text-gray-300 shrink-0" />
    </button>

    <!-- Mobile Drawer -->
    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 translate-y-full"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-full"
    >
      <div v-if="isOpen" class="block md:hidden fixed inset-0 z-[999]">
        <!-- Mobile backdrop -->
        <div
          class="fixed inset-0 bg-black/40 z-[999]"
          @click="closePopover"
        />

        <!-- Mobile drawer content -->
        <div class="fixed bottom-0 left-0 right-0 z-[99999] bg-white dark:bg-background text-gray-900 dark:text-white rounded-t-3xl max-h-[80vh] overflow-y-auto">
          <!-- Header -->
          <div class="border-b border-gray-200 dark:border-white/10 px-6 py-4 sticky top-0 bg-white dark:bg-background flex items-center justify-between">
            <h3 class="text-xl font-semibold">Which Day?</h3>
            <button
              class="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 transition-colors p-1"
              @click="closePopover"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>

          <!-- Options list -->
          <div class="py-2 pb-24">
            <button
              v-for="option in dayOptions"
              :key="option.value"
              class="w-full flex items-center justify-between px-6 py-3 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors text-left"
              @click="handleDaySelect(option)"
            >
              <span class="text-base font-medium">{{ option.label }}</span>
              <CheckIcon
                v-if="selectedDay?.value === option.value"
                class="w-5 h-5 text-brand-bright shrink-0"
                aria-hidden="true"
              />
            </button>
          </div>

          <!-- Footer -->
          <div class="border-t border-gray-200 dark:border-white/10 px-6 py-4 sticky bottom-0 bg-white dark:bg-background">
            <button
              class="w-full text-center text-base font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors py-2"
              @click="closePopover"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </transition>

    <!-- Desktop Popover -->
    <transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="isOpen"
        class="hidden md:block absolute top-full z-[99999] mt-2 right-0 w-64 rounded-2xl bg-white dark:bg-card text-gray-900 dark:text-white shadow-lg border border-gray-200 dark:border-white/10"
      >
        <!-- Header -->
        <div class="border-b border-gray-200 dark:border-white/10 px-6 py-4 flex items-center justify-between">
          <h3 class="text-xl font-semibold">Which Day?</h3>
          <button
            class="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 transition-colors p-1"
            @click="closePopover"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>

        <!-- Options list -->
        <div class="py-2 max-h-96 overflow-y-auto">
          <button
            v-for="option in dayOptions"
            :key="option.value"
            class="w-full flex items-center justify-between px-6 py-3 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors text-left"
            @click="handleDaySelect(option)"
          >
            <span class="text-base font-medium">{{ option.label }}</span>
            <CheckIcon
              v-if="selectedDay?.value === option.value"
              class="w-5 h-5 text-brand-bright shrink-0"
              aria-hidden="true"
            />
          </button>
        </div>

        <!-- Footer -->
        <div class="border-t border-gray-200 dark:border-white/10 px-6 py-4">
          <button
            class="w-full text-center text-base font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors py-2"
            @click="closePopover"
          >
            Cancel
          </button>
        </div>
      </div>
    </transition>

    <!-- Desktop backdrop -->
    <div
      v-if="isOpen"
      class="hidden md:block fixed inset-0 z-[999]"
      @click="closePopover"
    />
  </div>
</template>
