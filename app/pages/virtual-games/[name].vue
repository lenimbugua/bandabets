<script setup>
// Ported from src/views/CasinoGame.vue — see app/pages/casino/[name].vue
// for the full porting note (same source view backs three routes). This
// one was NEVER registered in Phase 1 at all (no placeholder, no
// routeRule) — /virtual-games/:name 404'd until now.
//
// Static-vs-dynamic ranking (plan §F.4): this file shares its parent dir
// with four static siblings (nai-league.vue, nai-turbo.vue,
// nai-virtual-jackpot.vue, playon.vue) plus index.vue. Nuxt/vue-router
// rank static routes above dynamic ones, so /virtual-games/nai-league
// resolves to nai-league.vue, never here — verified post-port in the
// batch report by hitting each static path and confirming its own
// (auth-gated) content renders, not this generic iframe shell.
const route = useRoute();

definePageMeta({
  name: "play-virtuals-games",
  layout: false,
});

useSeoHead({
  title: `Play ${route.params.name} | Bandabets Virtual Game`,
  description: `Enjoy ${route.params.name} with smooth gameplay, fair odds, and real cash prizes at Bandabets Kenya Virtual Games.`,
  robots: "noindex,nofollow",
});
</script>

<template>
  <div class="casino-game-shell">
    <h1 class="sr-only">Virtual Game | Bandabets</h1>

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
