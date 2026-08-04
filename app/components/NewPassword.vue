<script setup>
import { storeToRefs } from "pinia";
import { onBeforeUnmount, ref } from "vue";
import { useRouter } from "vue-router";
import { useRegisterStore } from "../stores/register";
import MobileInput from "./MobileInput.vue";
import OtpInput from "./OtpInput.vue";
const router = useRouter();

const {
  error,
  responseOK,
  pending,
  otp,
  msisdn,
  password,
  confirmPassword,
  showPasswordDoNotMatch,
  passwordMatch,
} = storeToRefs(useRegisterStore());
const { resetPassword, resetError, updateConfirmPassword, updatePassword } =
  useRegisterStore();
const mobile = ref(msisdn.value);

async function reset() {
  if (!passwordMatch.value) {
    return;
  }
  const body = {
    msisdn: mobile.value,
    password: password.value,
    confirmPassword: confirmPassword.value,
    otp: otp.value,
  };
  await resetPassword(body);
  if (responseOK.value) {
    router.push({ name: "login" });
  }
}

onBeforeUnmount(() => {
  resetError();
});
</script>
<template>
  <form class="space-y-5 max-w-sm mx-auto" @submit.prevent="reset">
    <MobileInput />
    <OtpInput />

    <PasswordInput
      :id="'password'"
      :update-function="updatePassword"
      :label="'New Password'"
    />

    <div>
      <PasswordInput
        :id="'confirmPassword'"
        :update-function="updateConfirmPassword"
        :label="'Confirm Password'"
      />
      <div v-if="showPasswordDoNotMatch" class="mt-1 text-xs text-red-500">
        Password and password confirmation do not match
      </div>
    </div>

    <div v-if="error" class="rounded-lg bg-red-50 dark:bg-red-500/10 px-3 py-2 text-sm text-red-600 dark:text-red-400">
      {{ error }}
    </div>

    <button
      type="submit"
      class="w-full h-11 rounded-xl bg-brand-bright hover:bg-brand-bright/90 text-primary-foreground text-sm font-semibold transition-colors cursor-pointer"
    >
      <TheButtonSpin v-if="pending" />
      <span v-else>Reset Password</span>
    </button>
  </form>
</template>
