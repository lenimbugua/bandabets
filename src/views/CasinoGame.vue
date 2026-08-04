<template>
  <div class="casino-game-shell">
    <h1 class="sr-only">Casino Game | Naibet</h1>

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
