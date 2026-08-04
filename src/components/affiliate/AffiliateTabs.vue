<script setup>
import { TabGroup, TabPanel, TabPanels } from "@headlessui/vue";
import AffiliatePayments from "./AffiliatePayments.vue";
</script>

<template>
  <div class="bg-card rounded-xl p-5 space-y-4">
    <h3 class="text-lg font-bold text-foreground">My Revenue</h3>

    <TabGroup>
      <TabPanels>
        <TabPanel>
          <AffiliatePayments />
        </TabPanel>
      </TabPanels>
    </TabGroup>
  </div>
</template>
