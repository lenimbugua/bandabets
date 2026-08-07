<script setup>
import { useModalStore } from "@/stores/modal";

import { useModalTypes } from "@/composables/useModalTypes";

const { search } = useModalTypes();

const { openModal } = useModalStore();
</script>

<template>
  <button aria-label="Open search" class="cursor-pointer" @click="openModal(search)">
    <Icon
      name="tabler:search"
      class="w-7 h-7 dark:text-white text-gray-950"
    />
  </button>
</template>
