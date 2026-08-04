<script setup>
import MobileFooterV2 from "../components/mobile/MobileFooterV2.vue";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/vue"; // 👈 IMPORTANT
import { ref, toRefs } from "vue";
import AllGames2 from "../components/AllGames2.vue";

import { useGamesStore } from "../stores/games";

import { useGamesMenus } from "../composables/useGamesMenus";

const { fetchGames } = useGamesStore();

const { pending, games } = toRefs(useGamesStore());

const { crash, casino } = useGamesMenus();

const tabs = ref([
  {
    name: crash,
    icon: "🚀",
  },
  {
    name: casino,
    icon: "🎲",
  },
]);

fetchGames(crash);

// const { categories, games } = useCrash();
</script>

<template>
  <h1 class="sr-only">Crash Games – Instant Win Casino Games | Naibet</h1>
  <TheDepositBar class="md:hidden" />
  <HeaderLinks />
  <div class="w-full h-full max-w-[1680px] sm:px-3 mx-auto overflow-scroll">
    <div class="flex w-full px-3 lg:px-0 lg:pt-3">
      <div class="w-full">
        <!-- mobile categories -->
        <div class="md:hidden w-full overflow-x-scroll">
          <MainCategories class="py-2 mb-2" />
        </div>

        <div class="max-w-[1100px] mx-auto rounded-md">
          <TabGroup>
            <!-- Tabs -->
            <TabList aria-label="Game categories" class="flex space-x-1 rounded-xl bg-surface-active p-1 mb-3">
              <Tab v-for="category in tabs" :key="category" as="template">
                <template #default="{ selected }">
                  <button
                    :class="[
                      'w-full rounded-lg py-2.5 text-sm font-medium leading-5 capitalize',
                      'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-hidden ',
                      selected
                        ? 'bg-primary text-red-50 shadow-sm'
                        : 'text-red-50 hover:bg-white/12 hover:text-white',
                    ]"
                    @click="fetchGames(category.name)"
                  >
                    {{ category.icon }}
                    {{ category.name }}
                  </button>
                </template>
              </Tab>
            </TabList>

            <!-- Panels -->
            <TabPanels class="mt-2">
              <!-- Crash Games -->
              <TabPanel>
                <div class="py-3">
                  <div>
                    <CasinoAnimate v-if="pending" />

                    <TheCrash2 v-else :games="games" />
                  </div>
                </div>
              </TabPanel>

              <!-- All Games -->
              <TabPanel>
                <CasinoAnimate v-if="pending" />
                <AllGames2 v-else :games="games" />
              </TabPanel>
            </TabPanels>
          </TabGroup>
        </div>
      </div>
    </div>
  </div>
  <MobileFooterV2 />
  <Footer />
</template>
