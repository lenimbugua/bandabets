<script setup>
import { storeToRefs } from "pinia";
import { toRefs } from "vue";
import { useRegister } from "../../composables/useRegister";
import { useToast } from "../../composables/useToast";
import { useFreebetStore } from "../../stores/freebet";
import { useUtmStore } from "../../stores/utm";

const { referralCode } = toRefs(useUtmStore());

const { updateReferralCode } = useUtmStore();

const { fireErrorToast } = useToast();
const { freeBetPayload, error } = storeToRefs(useFreebetStore());

const {
  submit,
  pending,
  resetError,
  onBeforeUnmount,
  updatePassword,
  termsAndConditions,
  updateConfirmPassword,
  showPasswordDoNotMatch,
} = useRegister();

function handleFreeBetSubmit() {
  if (!freeBetPayload.value) {
    fireErrorToast("Please select odds to bet on");
    return;
  }
  submit();
}

onBeforeUnmount(() => {
  resetError();
});
</script>
<template>
  <div class="max-w-lg mx-auto">
    <!-- <SetupWizard :step="1" /> -->
    <div class="">
      <h3 class="text-center font-semibold text-xl text-brand-bright">
        Create Account to Claim
      </h3>
      <form class="max-w-lg mx-auto pb-4" @submit.prevent="handleFreeBetSubmit">
        <div class="mb-6 px-0">
          <div class="mb-6">
            <FreeBetMobileInput />
          </div>
        </div>
        <div class="mb-6">
          <FreeBetPasswordInput
            :id="'password'"
            :update-function="updatePassword"
            :label="'Password'"
          />
        </div>
        <div v-if="showPasswordDoNotMatch" class="text-red-500 text-xs">
          Password and password confirmation do not match
        </div>
        <div class="mb-6">
          <FreeBetPasswordInput
            :id="'confirmPassword'"
            :update-function="updateConfirmPassword"
            :label="'Confirm Password'"
          />
        </div>
        <label
          for="referralCode"
          class="block text-sm font-semibold leading-6 text-gray-900 dark:text-gray-400"
          >Enter Referral Code (Optional)</label
        >
        <input
          id="referralCode"
          v-model="referralCode"
          type="text"
          class="mt-2 appearance-none text-slate-900 dark:text-gray-400 bg-white dark:bg-surface-deepest rounded-md block w-full px-3 h-12 shadow-xs sm:text-sm focus:outline-hidden placeholder:text-slate-400 focus:ring-1 focus:ring-ring ring-1 ring-border"
          placeholder="XXXXXX"
          @input="updateReferralCode(referralCode)"
        />
        <label class="flex items-top gap-2 mb-2"
          ><input
            v-model="termsAndConditions"
            required
            type="checkbox"
            class="mt-1 h-10 w-10"
          />
          <span class="text-xs leading-normal text-gray-500 dark:text-gray-400"
            >By clicking Register you confirm to have read in detail, understood
            and agreed to the,
            <RouterLink
              :to="{ name: 'terms-and-conditions' }"
              target="_blank"
              class="text-brand-mid"
              >Terms and Conditions</RouterLink
            >
            the
            <RouterLink
              target="_blank"
              :to="{ name: 'privacy-policy' }"
              class="text-brand-mid"
            >
              Privacy Policy,
            </RouterLink>
            and also that you are over 18 years of age.
          </span></label
        >
        <div v-if="error" class="text-red-500 text-sm py-1.5">{{ error }}</div>
        <div class="px-0">
          <button
            class="inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 text-sky-50 bg-red-500 hover:text-sky-50/80 hover:bg-red-600/80 w-full"
          >
            <TheButtonSpin v-if="pending" />
            <span v-else>Claim Now</span>
          </button>
        </div>
        <h6 class="text-gray-500 dark:text-gray-400 py-2">
          I Already have an account
          <RouterLink class="text-brand-mid" :to="{ name: 'login' }"
            >Login</RouterLink
          >
        </h6>
      </form>
    </div>
  </div>
</template>
