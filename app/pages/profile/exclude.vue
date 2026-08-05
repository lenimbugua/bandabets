<script setup>
// Ported from src/views/SelfExclusion.vue. Baseline route "/profile/exclude"
// (git show 81ae85f:src/router/index.js:686-696) is top-level, NOT nested
// under "/profile" — flat sibling of app/pages/profile/index.vue, which is
// exactly why this file is a sibling within the profile/ directory rather
// than profile.vue turning into a parent route.
//
// Name override is mandatory: Nuxt would derive "profile-exclude" from this
// path; the baseline (and phase2Placeholders, and every router.push caller)
// uses "self-exclusion".
//
// Dropped `lang="ts"` from the source — zero TypeScript in this project
// (components.json -> typescript: false).
import SelfExclusionForm from "@/components/SelfExclusionForm.vue";

definePageMeta({
  name: "self-exclusion",
  requiresAuth: true,
  layout: false,
});

useSeoHead({
  title: "Self Exclusion | Take a Break from Betting | Bandabets",
  description:
    "Pause your betting activity securely with Bandabets’s self-exclusion tool. Play responsibly anytime.",
  robots: "noindex,nofollow",
});
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
