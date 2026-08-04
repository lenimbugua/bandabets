<script setup>
import { toRefs } from "vue";
import { useRegister } from "../composables/useRegister";
import { useUtmStore } from "../stores/utm";
import MobileInput from "./MobileInput.vue";
import PasswordInput from "./PasswordInput.vue";

const { referralCode } = toRefs(useUtmStore());
const { updateReferralCode } = useUtmStore();
const {
  error,
  submit,
  pending,
  resetError,
  onBeforeUnmount,
  updatePassword,
  termsAndConditions,
  updateConfirmPassword,
  showPasswordDoNotMatch,
} = useRegister();

onBeforeUnmount(() => {
  resetError();
});
</script>
<template>
  <div>
    <h3 class="text-2xl font-bold text-gray-900 dark:text-white">
      Create your account
    </h3>
    <p class="mt-1.5 text-sm text-gray-500 dark:text-gray-400">
      Get started in just a few steps
    </p>

    <form class="mt-6 space-y-5" @submit.prevent="submit">
        <MobileInput />

        <PasswordInput
          :id="'password'"
          :update-function="updatePassword"
          :label="'Password'"
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

        <div>
          <label
            for="referralCode"
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
          >Referral Code (Optional)</label>
          <input
            id="referralCode"
            v-model="referralCode"
            type="text"
            class="w-full h-11 px-3.5 rounded-xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white text-sm placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-bright/40 focus:border-brand-bright transition-colors"
            placeholder="XXXXXX"
            @input="updateReferralCode(referralCode)"
          />
        </div>

        <label class="flex items-start gap-2.5 cursor-pointer">
          <input
            v-model="termsAndConditions"
            required
            type="checkbox"
            class="mt-0.5 h-4 w-4 rounded border-gray-300 dark:border-white/20 text-brand-bright focus:ring-brand-bright/40 shrink-0"
          />
          <span class="text-xs leading-relaxed text-gray-600 dark:text-gray-400">
            By clicking Register you confirm that you have read, understood and agreed to the
            <RouterLink
              :to="{ name: 'terms-and-conditions' }"
              target="_blank"
              class="text-brand-bright hover:text-brand-bright/80"
            >Terms and Conditions</RouterLink>,
            the
            <RouterLink
              target="_blank"
              :to="{ name: 'privacy-policy' }"
              class="text-brand-bright hover:text-brand-bright/80"
            >Privacy Policy</RouterLink>,
            and that you are over 18 years of age.
          </span>
        </label>

        <div v-if="error" class="rounded-lg bg-red-50 dark:bg-red-500/10 px-3 py-2 text-sm text-red-600 dark:text-red-400">
          {{ error }}
        </div>

        <button
          class="w-full h-11 rounded-xl bg-brand-bright hover:bg-brand-bright/90 text-primary-foreground text-sm font-semibold transition-colors cursor-pointer"
        >
          <TheButtonSpin v-if="pending" />
          <span v-else>Sign Up</span>
        </button>

        <p class="text-center text-sm text-gray-500 dark:text-gray-400">
          Already have an account?
          <RouterLink class="font-medium text-brand-bright hover:text-brand-bright/80 transition-colors" :to="{ name: 'login' }">Login</RouterLink>
        </p>
    </form>
  </div>
</template>
