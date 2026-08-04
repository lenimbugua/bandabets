<script setup>
import { onBeforeUnmount } from "vue";
import { useRegisterStore } from "../stores/register";
import ResendOTP from "./ResendOTP.vue";
import { ref } from "vue";
const { updateOtp } = useRegisterStore();
const otp = ref(null);

onBeforeUnmount(() => {
  updateOtp(null);
});
</script>

<template>
  <div>
    <div class="flex justify-between items-center mb-1.5">
      <label
        for="otp"
        class="block text-sm font-medium text-gray-700 dark:text-gray-300"
      >Enter OTP</label>
      <ResendOTP />
    </div>
    <input
      id="otp"
      v-model="otp"
      type="number"
      class="w-full h-11 px-3.5 rounded-xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white text-sm placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-bright/40 focus:border-brand-bright transition-colors"
      placeholder="eg. 5193"
      required
      @input="updateOtp(otp)"
    />
  </div>
</template>
