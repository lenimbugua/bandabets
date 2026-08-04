<script setup>
import {
  CalendarIcon,
  GiftIcon,
  ViewfinderCircleIcon,
} from "@heroicons/vue/24/outline";

const stats = [
  {
    icon: CalendarIcon,
    label: "Period",
    value: "2026 Week 07",
    accent: false,
  },
  {
    icon: ViewfinderCircleIcon,
    label: "Min Points to Win",
    value: "5 points",
    accent: false,
  },
  {
    icon: GiftIcon,
    label: "Weekly Prize",
    value: "KES 30,000",
    accent: true,
  },
];
</script>

<template>
  <div class="max-w-5xl mx-auto px-4 -mt-6 relative z-20">
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
      <div
        v-for="(stat, i) in stats"
        :key="stat.label"
        :class="[
          'bg-card rounded-xl border p-4 flex items-center gap-3 shadow-sm dark:shadow-none',
          stat.accent
            ? 'border-red-500/50 shadow-[0_0_15px_oklch(70%_0.19_142/0.2)]'
            : 'border-border',
        ]"
        :style="{
          animation: `fade-in-up 0.4s ease-out ${0.1 * i}s forwards`,
          opacity: 0,
        }"
      >
        <div
          :class="[
            'w-10 h-10 rounded-lg flex items-center justify-center shrink-0',
            stat.accent
              ? 'bg-red-500/15 text-red-500'
              : 'bg-secondary text-muted-foreground',
          ]"
        >
          <component :is="stat.icon" class="w-5 h-5" />
        </div>
        <div>
          <p
            class="text-xs text-muted-foreground font-medium uppercase tracking-wide"
          >
            {{ stat.label }}
          </p>
          <p
            :class="[
              'text-sm font-bold',
              stat.accent ? 'text-red-500' : 'text-foreground',
            ]"
          >
            {{ stat.value }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
