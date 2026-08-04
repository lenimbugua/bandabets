<script setup>
import MobileFooterV2 from "../components/mobile/MobileFooterV2.vue";
import Goback from "../components/Goback.vue";
</script>

<template>
  <h1 class="sr-only">Sort Your Deposit | Naibet</h1>
  <div class="h-dvh flex flex-col">
    <div>
      <HeaderLinks />
      <div class="flex justify-between items-center dark:text-white py-2">
        <Goback />
        <div></div>
      </div>
    </div>
    <div class="grow max-w-3xl px-1 my-4 md:mx-auto">
      <SortYourDeposit />
    </div>
    <MobileFooterV2 />
    <Footer />
  </div>
</template>
