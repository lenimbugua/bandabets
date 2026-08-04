<script setup>
import { useRegisterStore } from "../../stores/register";
import { ref } from "vue";
import { storeToRefs } from "pinia";
const { msisdn } = storeToRefs(useRegisterStore());
const { updateMsisdn } = useRegisterStore();
const mobile = ref(msisdn);
</script>

<template>
  <label
    for="msisdn"
    class="block text-sm font-semibold leading-6 dark:text-slate-400 "
    >Mobile Phone</label
  >
  <input
    id="msisdn"
    v-model="mobile"
    autocomplete="tel"
    type="tel"
    class="mt-2 appearance-none dark:text-slate-400 dark:bg-white/15 rounded-md block w-full px-3 h-12 shadow-xs sm:text-sm focus:outline-hidden placeholder:text-slate-400 focus:ring-1 focus:ring-ring ring-1 ring-border"
    placeholder="07XXXXXXXX"
    required
    @input="updateMsisdn(mobile)"
  />
</template>
