<script setup>
import { useModalTypes } from "@/composables/useModalTypes";

import { useModalStore } from "@/stores/modal";

const { twoUpModal } = useModalTypes();

const { openModal } = useModalStore();
</script>
<template>
  <div role="button" aria-label="View early win options" tabindex="0" @click="openModal(twoUpModal)">
    <span
      class="inline-block z-[-1] bg-gold-bright text-primary-foreground px-1 py-0 text-[0.5rem] font-medium transform -skew-x-12"
    >
      <span class="inline-block z-[-1] transform skew-x-12 uppercase font-bold italic"
        >Early Win</span
      >
    </span>
  </div>
</template>
