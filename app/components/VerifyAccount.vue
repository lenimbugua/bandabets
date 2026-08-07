<script setup>
import { storeToRefs } from "pinia";
import { onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import { useGoogleDataLayers } from "../composables/useGoogleDataLayers";
import { usePropellarAds } from "../composables/usePropellarAds";
import { useLoginStore } from "../stores/login";
import { useRegisterStore } from "../stores/register";
import MobileInput from "./MobileInput.vue";

const { public: config } = useRuntimeConfig();
const ussdActivate = config.ussdActivateAccount;

const { pushDataLayerToGoogle } = useGoogleDataLayers();

const { activateProfile, resetError } = useRegisterStore();

const { error, responseOK, pending, msisdn, otp } = storeToRefs(
  useRegisterStore()
);

const { token, profileSid } = storeToRefs(useLoginStore());

const router = useRouter();

// Hoisted to setup scope (was previously called inside submit()).
// usePropellarAds() calls useRuntimeConfig() in its body, which throws
// "nuxt instance unavailable" outside a valid Nuxt context — setup is a
// valid context, an async click-handler is not.
const { trackPropellerConversion } = usePropellarAds();

function successfulVerifyDataLayer() {
  const signUpMethod = "msisdn";

  pushDataLayerToGoogle({
    event: "sign_up",
    sign_up_method: signUpMethod,
    user_id: profileSid.value,
  });
}

function unsuccessfulVerifyDataLayer() {
  pushDataLayerToGoogle({
    event: "sign_up_failed",
    error_message: error.value,
  });
}

async function submit() {
  const body = {
    otp: otp.value,
    msisdn: msisdn.value,
  };

  await activateProfile(body);
  if (responseOK.value) {
    successfulVerifyDataLayer();

    if (typeof window.gtag === "function") {
      window.gtag("event", "conversion", {
        send_to: "AW-16789345990/VjbrCNvQgoIaEMat5MU-",
      });
    }

    trackPropellerConversion();

    // FREEBET DISABLED — the welcome-gift route is commented out, so verified
    // users go straight home instead. Restore later.
    // if (token.value) {
    //   router.push({ name: "welcome-gift" });
    //   return;
    // }
    if (token.value) {
      router.push({ name: "home" });
      return;
    }
    router.push({ name: "login" });
  } else {
    unsuccessfulVerifyDataLayer();
  }
}

onBeforeUnmount(() => {
  resetError();
});
</script>
<template>
  <div>
    <!-- Success banner -->
    <div class="rounded-xl bg-success/8 dark:bg-success/10 border border-success/20 dark:border-success/20 p-4 mb-6">
      <div class="flex items-start gap-3">
        <Icon name="tabler:circle-check" class="h-6 w-6 text-success dark:text-success shrink-0 mt-0.5" />
        <div>
          <p class="text-sm font-semibold text-success dark:text-success">
            Verification code sent
          </p>
          <p class="mt-1 text-xs text-success/80 dark:text-success/80">
            Missed your OTP? Dial
            <span class="font-bold">{{ ussdActivate }}</span>
            to activate your account instantly.
          </p>
        </div>
      </div>
    </div>

    <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
      Activate account
    </h2>
    <p class="mt-1.5 text-sm text-gray-500 dark:text-gray-400">
      Enter the OTP sent to your phone
    </p>

    <form class="mt-6 space-y-5" autocomplete="off" @submit.prevent="submit">
      <MobileInput />
      <OtpInput />

      <div v-if="error" class="rounded-lg bg-red-50 dark:bg-red-500/10 px-3 py-2 text-sm text-red-600 dark:text-red-400">
        {{ error }}
      </div>

      <button
        class="w-full h-11 rounded-xl bg-brand-bright hover:bg-brand-bright/90 text-primary-foreground text-sm font-semibold transition-colors cursor-pointer"
      >
        <TheButtonSpin v-if="pending" />
        <span v-else>Continue</span>
      </button>
    </form>
  </div>
</template>
