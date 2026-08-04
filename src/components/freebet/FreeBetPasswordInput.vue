<script setup>
import { useRegisterStore } from "../../stores/register";
import { ref } from "vue";
import { storeToRefs } from "pinia";
const { showPasswordDoNotMatch } = storeToRefs(useRegisterStore());
import { onBeforeUnmount } from "vue";

const props = defineProps({
  updateFunction: {
    type: Function,
    required: true,
  },
  label: {
    type: String,
    required: true,
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
</script>

<template>
  <div class="relative">
    <label
      :for="id"
      class="block text-sm font-semibold leading-6 dark:text-slate-400"
      >{{ label }}</label
    >
    <input
      :id="id"
      v-model="password"
      :type="inputType"
      :class="[
        shouldhighlightError()
          ? 'ring-red-500'
          : 'focus:ring-ring  ring-border',
      ]"
      class="mt-2 text-extrabold text-lg appearance-none dark:text-slate-400 dark:bg-white/15 rounded-md block w-full px-3 h-12 shadow-xs sm:text-sm focus:outline-hidden placeholder:text-slate-400 ring-1"
      placeholder=".............."
      required
      autocomplete="current-password"
      @input="updateFunction(password)"
    />
    <div
      v-if="password"
      class="absolute right-2 cursor-pointer top-2/3 -translate-y-1/2"
      @click="viewPassword"
    >
      <EyeSVG :show="showPassword" />
    </div>
  </div>
</template>
