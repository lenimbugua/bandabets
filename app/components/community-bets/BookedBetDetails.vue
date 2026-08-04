<script setup>
import { useShareBetStore } from "@/stores/sharebet";

import { storeToRefs } from "pinia";

const { sharedBetslip } = storeToRefs(useShareBetStore());
</script>
<template>
  <div class="py-2">
    <BookedSelection
      v-for="(item, index) in sharedBetslip"
      :key="index"
      :selection="item"
      :index
    />
  </div>
</template>
