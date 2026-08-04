<script setup>
import { useIconNames } from "../../composables/useIconNames";
const { betBuilderIcon, solarDocumentTextBroken, statsIcon } = useIconNames();
defineProps({
  iconName: {
    type: String,
    required: true,
  },
  iconCss: {
    type: String,
    required: true,
  },
});
</script>
<template>
  <!-- Markets — stacked layers icon -->
  <div v-if="iconName === solarDocumentTextBroken">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      :class="iconCss"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M12 2L2 7l10 5 10-5-10-5Z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  </div>
  <!-- Bet Builder — puzzle piece icon -->
  <div v-if="iconName === betBuilderIcon">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      :class="iconCss"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M19.439 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.706.706.706 1.005s-.235.534-.706 1.005l-1.568 1.568c-.23.23-.338.556-.289.878.049.322-.033.667-.296.93l-1.568 1.568c-.47.47-.706.706-1.005.706s-.534-.235-1.005-.706l-1.568-1.568c-.23-.23-.556-.338-.878-.289-.322.049-.667-.033-.93-.296l-1.568-1.568c-.47-.47-.706-.706-.706-1.005s.235-.534.706-1.005l1.568-1.568c.23-.23.338-.556.289-.878-.049-.322.033-.667.296-.93l1.568-1.568c.47-.47.706-.706 1.005-.706s.534.235 1.005.706l1.568 1.568c.263.263.608.345.93.296Z" />
      <path d="M8.293 4.293a1 1 0 0 1 1.414 0l2 2a1 1 0 0 1 0 1.414l-2 2a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 0-1.414l2-2Z" />
      <path d="M4.293 12.293a1 1 0 0 1 1.414 0l2 2a1 1 0 0 1 0 1.414l-2 2a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 0-1.414l2-2Z" />
    </svg>
  </div>
  <!-- Stats — outlined bar chart icon -->
  <div v-if="iconName === statsIcon">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      :class="iconCss"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M3 3v18h18" />
      <path d="M7 16v-3" />
      <path d="M11 16V8" />
      <path d="M15 16v-5" />
      <path d="M19 16V5" />
    </svg>
  </div>
</template>
