<script setup>
const steps = [
  {
    title: "Share your link",
    description: "Copy your link or send directly via social media.",
  },
  {
    title: "Friends register & bet",
    description: "Using your link, they register and start playing.",
  },
  {
    title: "You earn on every play",
    description: "Earn money every time your referrals play on Bandabets.",
  },
  {
    title: "Get paid weekly",
    description: "Receive up to KES 300,000 in your account every week.",
  },
];
</script>

<template>
  <div class="bg-card rounded-xl p-5 space-y-4">
    <h3 class="text-lg font-bold text-foreground">How It Works</h3>

    <div class="space-y-3">
      <div
        v-for="(step, index) in steps"
        :key="index"
        class="flex items-start gap-3"
      >
        <span
          class="w-7 h-7 shrink-0 rounded-lg bg-brand-bright/10 text-brand-bright text-xs font-bold flex items-center justify-center mt-0.5"
        >
          {{ index + 1 }}
        </span>
        <div>
          <h4 class="text-sm font-medium text-foreground">{{ step.title }}</h4>
          <p class="text-xs text-muted-foreground mt-0.5 leading-relaxed">
            {{ step.description }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
