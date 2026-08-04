<script setup>
import { useModalStore } from "@/stores/modal";
import { useRouter } from "vue-router";
const router = useRouter();
const { closeModal } = useModalStore();

function goToDeposit() {
  closeModal();
  router.push({ name: "deposit" });
}
</script>

<template>
  <div
    class="block cursor-pointer items-center rounded-full h-96 w-full"
    @click="goToDeposit"
  >
    <div
      class="relative block cursor-pointer items-center rounded-full h-96 w-full"
    >
      <img
        src="/popup.png"
        class="inset-0 h-full w-full absolute object-contain rounded-lg overflow-clip"
        alt="Deposit promotion"
        loading="lazy"
      />
    </div>
  </div>
</template>
