<script setup>
import { onMounted, onBeforeUnmount } from "vue";
import { useRegisterStore } from "../stores/register";
import { storeToRefs } from "pinia";

const { otpPending, responseOK, countdownSeconds, resendOTP, msisdn } =
  storeToRefs(useRegisterStore());

const { resendOtp, resetError, decreaseCount, resetCount } = useRegisterStore();
let intervalId = null;

const startCountdown = () => {
  if (intervalId) {
    clearInterval(intervalId);
  }

  intervalId = setInterval(() => {
    decreaseCount();

    if (countdownSeconds.value === 0) {
      clearInterval(intervalId);
    }
  }, 1000);
};

onMounted(() => {
  resetCount();
  startCountdown();
});

onBeforeUnmount(() => {
  clearInterval(intervalId);
  resetCount();
  resetError();
});

async function resend() {
  if (!resendOTP.value) return;
  resetError();
  if (!msisdn.value) {
    return;
  }
  await resendOtp({ msisdn: msisdn.value });
  if (responseOK.value) {
    resetCount();
    startCountdown();
  }
}
</script>
<template>
  <button
    type="button"
    class="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer"
    :class="[
      resendOTP
        ? 'bg-brand-bright/10 text-brand-bright hover:bg-brand-bright/20'
        : 'bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400 cursor-not-allowed'
    ]"
    @click="resend"
  >
    <span v-if="otpPending">Sending...</span>
    <span v-else-if="!resendOTP">Resend in {{ countdownSeconds }}s</span>
    <span v-else>Resend OTP</span>
  </button>
</template>
