<script setup>
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useRegisterStore } from "../stores/register";
const { msisdn } = storeToRefs(useRegisterStore());
const { updateMsisdn } = useRegisterStore();
const mobile = ref(msisdn);
</script>

<template>
  <div>
    <label
      for="msisdn"
      class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
    >Mobile Phone</label>
    <input
      id="msisdn"
      v-model="mobile"
      autocomplete="tel"
      type="tel"
      class="w-full h-11 px-3.5 rounded-xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white text-sm placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-bright/40 focus:border-brand-bright transition-colors"
      placeholder="07XXXXXXXX"
      required
      @input="updateMsisdn(mobile)"
    />
  </div>
</template>
