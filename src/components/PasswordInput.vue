<script setup>
import { passwordConfig } from "@/composables/usePasswordConfig";
import { validatePassword } from "@/composables/usePasswordValidator";
import { storeToRefs } from "pinia";
import { computed, onBeforeUnmount, ref } from "vue";
import { useRegisterStore } from "../stores/register";

const { showPasswordDoNotMatch } = storeToRefs(useRegisterStore());

const props = defineProps({
  updateFunction: {
    type: Function,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  showValidationErrors: {
    type: Boolean,
    defalt: false,
  },
  id: {
    type: String,
    required: true,
  },
});

const password = ref("");

const showPassword = ref(false);

const inputType = ref("password");

props.updateFunction("");

onBeforeUnmount(() => {
  props.updateFunction("");
});

function shouldhighlightError() {
  if (showPasswordDoNotMatch.value && props.id === "confirmPassword") {
    return true;
  }
  return false;
}

function viewPassword() {
  showPassword.value = !showPassword.value;
  if (showPassword.value) {
    inputType.value = "text";
  } else {
    inputType.value = "password";
  }
}

const validation = computed(() =>
  validatePassword(password.value, passwordConfig)
);
</script>

<template>
  <div class="relative">
    <label
      :for="id"
      class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
    >{{ label }}</label>
    <input
      :id="id"
      v-model="password"
      :type="inputType"
      :class="[
        shouldhighlightError()
          ? 'border-red-500 focus:ring-red-500/40'
          : 'border-gray-200 dark:border-white/10 focus:ring-brand-bright/40 focus:border-brand-bright',
      ]"
      class="w-full h-11 px-3.5 pr-10 rounded-xl bg-white dark:bg-white/5 border text-gray-900 dark:text-white text-sm placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 transition-colors"
      placeholder="Enter password"
      required
      autocomplete="current-password"
      @input="updateFunction(password)"
    />
    <button
      v-if="password"
      type="button"
      class="absolute right-3 top-[2.35rem] text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors cursor-pointer"
      :aria-label="showPassword ? 'Hide password' : 'Show password'"
      @click="viewPassword"
    >
      <EyeSVG :show="showPassword" />
    </button>
  </div>

  <ul
    v-if="passwordConfig.enabled && showValidationErrors"
    class="mt-2 space-y-0.5 text-xs"
  >
    <li
      v-if="!validation.errors.minLength"
      class="text-red-500"
    >
      Minimum {{ passwordConfig.minLength }} characters
    </li>

    <li
      v-if="passwordConfig.rules.uppercase && !validation.errors.uppercase"
      class="text-red-500"
    >
      Uppercase letter
    </li>

    <li
      v-if="passwordConfig.rules.lowercase && !validation.errors.lowercase"
      class="text-red-500"
    >
      Lowercase letter
    </li>

    <li
      v-if="passwordConfig.rules.number && !validation.errors.number"
      class="text-red-500"
    >
      Number
    </li>

    <li
      v-if="passwordConfig.rules.special && !validation.errors.special"
      class="text-red-500"
    >
      Special character
    </li>
  </ul>
</template>
