<script setup>
import MobileFooterV2 from "../components/mobile/MobileFooterV2.vue";
import { Tab, TabGroup, TabList } from "@headlessui/vue"; // 👈 IMPORTANT
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useCasinoStore } from "../stores/casino";

const router = useRouter();

const tabs = ref([
  { name: "🚀 Crash", routeName: "crash" },
  { name: "🎲 Casino", routeName: "casino-home" },
]);

function changeTab(tab) {
  router.push({ name: tab.routeName });
}

const { pending } = storeToRefs(useCasinoStore());

const isSelected = (name) => router.currentRoute.value.name === name;
</script>

<template>
  <TheDepositBar class="md:hidden" />
  <HeaderLinks />
  <div class="w-full h-full max-w-[1100px] mx-auto sm:px-3 overflow-scroll">
    <CasinoAnimate v-if="pending" />

    <div v-else class="flex w-full px-3 lg:px-0 lg:pt-3">
      <div class="w-full">
        <!-- mobile categories -->
        <div class="md:hidden w-full overflow-x-scroll">
          <MainCategories class="" />
          <div
            class="w-full flex items-center justify-between h-full cursor-pointer py-4"
          >
            <button aria-label="Go back" class="cursor-pointer" @click="$router.go(-1)">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                class="size-6 stroke-2 text-gray-900 dark:text-white"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                />
              </svg>
            </button>
            <h1 class="font-black text-xl dark:text-gray-50 leading-none">
              CRASH GAMES
            </h1>
            <div></div>
          </div>
        </div>

        <div class="rounded-md">
          <TabGroup>
            <!-- Tabs -->
            <TabList
              aria-label="Game categories"
              class="flex space-x-1 max-w-sm mx-auto rounded-xl bg-surface-active p-1"
            >
              <Tab v-for="tab in tabs" :key="tab" as="template">
                <button
                  :class="[
                    'w-full rounded-lg py-1.5 md:py-2.5 text-sm font-medium leading-5',
                    'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-hidden ',
                    isSelected(tab.routeName)
                      ? 'bg-primary text-red-50 shadow-sm'
                      : 'text-red-50 hover:bg-white/12 hover:text-white',
                  ]"
                  @click="changeTab(tab)"
                >
                  {{ tab.name }}
                </button>
              </Tab>
            </TabList>

            <div class="py-3">
              <RouterView />
            </div>
          </TabGroup>
        </div>
      </div>
    </div>
  </div>
  <MobileFooterV2 />
  <Footer />
</template>
