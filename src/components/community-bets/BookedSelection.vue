<script setup>
import { useShareBetStore } from "@/stores/sharebet.js";
import BookedBetslipDetails from "./BookedBetslipDetails.vue";

const { deleteAnItemFromBetslip } = useShareBetStore();

defineProps({
  selection: { type: Object, required: true },
  index: { type: Number, required: true },
});
</script>

<template>
  <div class="border-b border-border/30 last:border-0 pb-2 last:pb-0">
    <BookedBetslipDetails
      :delete-an-item-from-betslip="deleteAnItemFromBetslip"
      :item="selection"
      :index="index"
    />
  </div>
</template>
