<script setup>
// Ported from src/views/CasinoGame.vue (shared, unmodified template — that
// source file had no <script> block at all, only auto-registered
// component tags: CasinoHeader, CasinoEmbedd, CasinoToggle,
// AviatorContent1, all already under app/components/). The same view backs
// three routes (plan §F.2) — this file, app/pages/crash/[name].vue and
// app/pages/virtual-games/[name].vue — each with its own definePageMeta
// name, because useCasino.js's getRoute() (`app/composables/useCasino.js:
// 167-178`) pushes by exactly one of "play-casino-games" /
// "play-crash-games" / "play-virtuals-games" depending on which category
// the game came from. Nuxt's filename-derived name ("casino-name") would
// satisfy none of them — router.push({name:...}) throws — so the name
// override here is load-bearing, not cosmetic (plan §F.1).
//
// Baseline route was top-level (not a child of WithSibarAndBetslip) ->
// layout: false. ssr:false + noindex come from routeRules in
// nuxt.config.js — this page's whole dependency graph (useCasino ->
// useCasinoStore -> useCasino, plan §F.7) needs a live Nuxt instance and
// router just to instantiate the store, so it stays client-only like every
// other Batch F game page.
const route = useRoute();

definePageMeta({
  name: "play-casino-games",
  layout: false,
});

useSeoHead({
  // Baseline meta used a literal ":name" placeholder string
  // ("Play :name | Naibet Casino Game") rather than interpolating —
  // deliberately replaced here with the actual route param.
  title: `Play ${route.params.name} | Bandabets Casino Game`,
  description: `Enjoy ${route.params.name} with smooth gameplay, fair odds, and real cash prizes at Bandabets Kenya Casino Games.`,
  robots: "noindex,nofollow",
});
</script>

<template>
  <div class="casino-game-shell">
    <h1 class="sr-only">Casino Game | Bandabets</h1>

    <!-- Top nav bar -->
    <div class="sticky top-0 z-20">
      <CasinoHeader />
    </div>

    <!-- Game iframe area -->
    <div class="casino-game-viewport">
      <CasinoEmbedd />
    </div>

    <!-- Bottom bar: toggle -->
    <div class="sticky bottom-0 z-20 casino-game-footer">
      <div class="flex items-center justify-center h-12 max-w-[1680px] mx-auto">
        <CasinoToggle />
      </div>
    </div>

    <!-- SEO content -->
    <AviatorContent1 />
  </div>
</template>

<style scoped>
.casino-game-shell {
  height: var(--viewport-height, 100dvh);
  display: flex;
  flex-direction: column;
  background: var(--background);
  overflow: hidden;
}
.casino-game-viewport {
  flex: 1;
  min-height: 0;
  overflow: hidden;
}
.casino-game-footer {
  background: var(--card);
  border-top: 1px solid var(--border);
}

/* ── Dark mode ── */
[data-theme="dark"] .casino-game-shell {
  background: var(--background);
}
[data-theme="dark"] .casino-game-footer {
  background: var(--card);
  border-top-color: var(--border);
}
</style>
