<script setup>
import { onBeforeUnmount } from "vue";
import { useRegisterStore } from "../stores/register";
import { useRouter } from "vue-router";
import MobileInput from "./MobileInput.vue";
import { storeToRefs } from "pinia";

const router = useRouter();
const { pending, error, responseOK, msisdn } = storeToRefs(useRegisterStore());

const { forgotPassword, resetError } = useRegisterStore();

onBeforeUnmount(() => {
  resetError();
});

async function requestOtp() {
  const body = {
    msisdn: msisdn.value,
  };

  await forgotPassword(body);
  if (responseOK.value) {
    router.push({ name: "reset-password" });
  }
}
</script>
<template>
  <div>
    <h3 class="text-2xl font-bold text-gray-900 dark:text-white">
      Forgot password
    </h3>
    <p class="mt-1.5 text-sm text-gray-500 dark:text-gray-400">
      Enter your phone number to reset your password
    </p>

    <form class="mt-6 space-y-5" @submit.prevent="requestOtp">
      <MobileInput />

      <div v-if="error" class="rounded-lg bg-red-50 dark:bg-red-500/10 px-3 py-2 text-sm text-red-600 dark:text-red-400">
        {{ error }}
      </div>

      <button
        type="submit"
        class="w-full h-11 rounded-xl bg-brand-bright hover:bg-brand-bright/90 text-primary-foreground text-sm font-semibold transition-colors cursor-pointer"
      >
        <TheButtonSpin v-if="pending" />
        <span v-else>Send OTP</span>
      </button>

      <div class="flex items-center justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
        <RouterLink class="font-medium text-brand-bright hover:text-brand-bright/80 transition-colors" :to="{ name: 'signup' }">Register</RouterLink>
        <span class="text-gray-300 dark:text-gray-600">|</span>
        <RouterLink class="font-medium text-brand-bright hover:text-brand-bright/80 transition-colors" :to="{ name: 'login' }">Login</RouterLink>
      </div>
    </form>
  </div>
</template>
