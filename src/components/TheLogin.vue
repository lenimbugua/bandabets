<script setup>
import { useRouter } from "vue-router";
import { useLoginStore } from "../stores/login";
import { useRegisterStore } from "../stores/register";
import { useModalStore } from "@/stores/modal";
import MobileInput from "./MobileInput.vue";
import { onBeforeUnmount } from "vue";
import { storeToRefs } from "pinia";
import { useProfileStore } from "../stores/profile";

import { useGoogleDataLayers } from "../composables/useGoogleDataLayers";

const { pushDataLayerToGoogle } = useGoogleDataLayers();
const { getProfileInfo } = useProfileStore();

const { closeModal } = useModalStore();
const { login, resetError, setAfterLoginAction } = useLoginStore();
const { error, pending, responseOK, afterLoginAction, profileSid } =
  storeToRefs(useLoginStore());
const { msisdn, password } = storeToRefs(useRegisterStore());
const { updatePassword } = useRegisterStore();

const router = useRouter();
function goHome() {
  router.push({ name: "home" });
}
async function authenticate() {
  const body = {
    username: msisdn.value,
    password: password.value,
  };

  await login(body, router);

  if (responseOK.value) {
    getProfileInfo();
    closeModal();
    successfulLoginData();
  } else {
    unsuccessfulLoginData();
  }

  if (router.currentRoute.value.name === "login") {
    if (responseOK.value) {
      goHome();
    }
  } else if (afterLoginAction.value) {
    if (responseOK.value) {
      await afterLoginAction.value();
      setAfterLoginAction(null);
    }
  }
}
onBeforeUnmount(() => {
  resetError();
});

function successfulLoginData() {
  window.dataLayer = window.dataLayer || [];
  const loginMethod = "msisdn";
  pushDataLayerToGoogle({
    event: "login",
    method: loginMethod,
    msisdn: msisdn.value,
    user_id: profileSid.value,
  });
}

function unsuccessfulLoginData() {
  pushDataLayerToGoogle({
    event: "login_failed",
    error_message: error.value,
  });
}
</script>
<template>
  <form class="space-y-5" @submit.prevent="authenticate">
    <MobileInput />
    <PasswordInput
      :id="'password'"
      :update-function="updatePassword"
      :label="'Password'"
    />

    <div class="flex items-center justify-between">
      <label class="flex items-center gap-2 cursor-pointer">
        <input
          id="accept-Terms-and-Conditions"
          class="h-4 w-4 rounded border-gray-300 dark:border-white/20 text-brand-bright focus:ring-brand-bright/40"
          type="checkbox"
        />
        <span class="text-sm text-gray-600 dark:text-gray-400">Keep me logged in</span>
      </label>
      <RouterLink
        :to="{ name: 'forgot-password' }"
        class="text-sm font-medium text-brand-bright hover:text-brand-bright/80 transition-colors"
        @click="closeModal"
      >Forgot password?</RouterLink>
    </div>

    <div v-if="error" class="rounded-lg bg-red-50 dark:bg-red-500/10 px-3 py-2 text-sm text-red-600 dark:text-red-400">
      {{ error }}
    </div>

    <button
      id="login-button"
      class="w-full h-11 rounded-xl bg-brand-bright hover:bg-brand-bright/90 text-primary-foreground text-sm font-semibold transition-colors cursor-pointer"
    >
      <TheButtonSpin v-if="pending" />
      <span v-else>Login</span>
    </button>

    <p class="text-center text-sm text-gray-500 dark:text-gray-400">
      Don't have an account?
      <RouterLink
        class="font-medium text-brand-bright hover:text-brand-bright/80 transition-colors"
        :to="{ name: 'signup' }"
        @click="closeModal"
      >Sign Up</RouterLink>
    </p>
  </form>
</template>
