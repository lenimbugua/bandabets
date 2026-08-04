<script setup>
import BookedBetsFAQs from "@/components/community-bets/BookedBetsFAQs.vue";
import LoadCode from "@/components/community-bets/LoadCode.vue";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/vue";
import { ref } from "vue";

const categories = ref(["Bets Hub", "Load Code", "FAQ"]);
</script>

<template>
  <TabGroup>
    <TabList
      aria-label="Booked bets navigation"
      class="flex gap-2"
    >
      <Tab
        v-for="category in categories"
        :key="category"
        v-slot="{ selected }"
        as="template"
      >
        <button
          :class="[
            'cursor-pointer rounded-full py-1.5 px-4 text-xs font-semibold text-center transition-colors duration-150 border',
            selected
              ? 'bg-brand-bright text-primary-foreground border-brand-bright'
              : 'bg-card text-muted-foreground border-border/50 hover:text-foreground hover:border-border',
          ]"
        >
          {{ category }}
        </button>
      </Tab>
    </TabList>
    <TabPanels class="mt-4">
      <TabPanel>
        <BookedBetsCategory />
      </TabPanel>
      <TabPanel class="mb-16 md:mb-20">
        <LoadCode />
      </TabPanel>
      <TabPanel>
        <BookedBetsFAQs />
      </TabPanel>
    </TabPanels>
  </TabGroup>
</template>
