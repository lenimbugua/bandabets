
<template>
  <RouterLink
    :to="{ name: 'deposit' }"
    class="w-full block bg-brand-bright dark:bg-brand-bright hover:bg-brand-selected dark:hover:bg-brand-selected active:bg-brand-dark transition-colors"
  >
    <div class="flex items-center justify-between px-4 py-0.5">
      <!-- Left: Main message -->
      <div class="flex items-center gap-3 flex-1 min-w-0">
        <span class="font-bold text-sm text-black">
          Click to Deposit
        </span>
      </div>

      <!-- Center: Badge. A solid gold chip, not a tinted one — the old
           brand-forest/25 was a faint wash over a matching bar, so the badge
           read as a faint outline rather than a thing you could tap. -->
      <div class="shrink-0 px-2.5 py-0.5 mx-2 rounded-full bg-gold shadow-sm">
        <span class="block text-center text-[11px] font-bold text-gold-foreground">Bonus</span>
      </div>

      <!-- Right: Arrow -->
      <Icon name="tabler:chevron-right" class="w-4 h-4 text-black shrink-0" />
    </div>
  </RouterLink>
</template>
