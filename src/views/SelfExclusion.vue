<script setup lang="ts">
import SelfExclusionForm from "../components/SelfExclusionForm.vue";
</script>

<template>
  <div class="flex flex-col">
    <HeaderLinks />
    <div class="grow p-4 w-full md:max-w-md mx-auto">
      <h1 class="text-xl font-bold py-2 dark:text-slate-200">Self exclusion</h1>
      <p class="mb-4 dark:text-slate-400">
        This self-exclusion page provides you with the option to take a break
        from gambling activities. By utilizing this feature, you can restrict
        your access to our platform, preventing yourself from placing bets and
        engaging in gambling activities.
      </p>
      <SelfExclusionForm />
    </div>
    <Footer />
  </div>
</template>
