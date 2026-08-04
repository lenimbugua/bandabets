<script setup lang="ts">
import { useModalTypes } from "@/composables/useModalTypes";
import { useModalStore } from "@/stores/modal";
import { useOneCut } from "../composables/useOneCut";
import formatStuff from "../utilities/format-stuff";
import OneCutIcon from "./OneCutIcon.vue";
const { openModal } = useModalStore();

const { oneCutModal } = useModalTypes();

const { formattedNumber } = formatStuff();
const { buildLegsMessage, oneCutAmout, isOneCutQualified, oneCutRatio } =
  useOneCut();
</script>

<template>
  <div
    class="w-full text-[0.65rem] font-black px-2 py-1 bg-linear-to-r from-red-700 via-red-700 via-50% to-red-700"
    @click="openModal(oneCutModal)"
  >
    <div class="flex items-center justify-between">
      <div class="flex text-xs items-center font-bold text-red-100">
        <div>One Cut Win</div>
        <div class="text-white">
          <OneCutIcon />
        </div>
        <div class="text-base">{{ oneCutRatio() }}</div>
      </div>
      <div class="text-xs text-amber-500">{{ buildLegsMessage() }}</div>
      <div v-if="isOneCutQualified()" class="flex items-center space-x-1">
        <div class="font-black text-red-300">
          {{ formattedNumber(oneCutAmout()) }}
          <!-- {{ possibleWin.toFixed(2) }} -->
        </div>
        <span class="text-amber-400">KES</span>
      </div>
    </div>
  </div>
</template>
