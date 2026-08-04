<script setup>
import { watch, ref, nextTick } from "vue";

const categoryIcons = {
  all: {
    viewBox: "0 0 20 20",
    paths: [
      {
        d: "M9.293 2.293a1 1 0 0 1 1.414 0l7 7A1 1 0 0 1 17 11h-1v6a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6H3a1 1 0 0 1-.707-1.707l7-7Z",
        "fill-rule": "evenodd",
        "clip-rule": "evenodd",
      },
    ],
  },
  top: {
    viewBox: "0 0 20 20",
    paths: [
      {
        d: "M10 1c-1.828 0-3.623.149-5.371.435a.75.75 0 0 0-.629.74v.387c0 2.725 1.01 5.215 2.678 7.115a.75.75 0 0 0 .564.238h.052a18.7 18.7 0 0 0 2.206-.126V12.5A2.5 2.5 0 0 0 7 15H6a.75.75 0 0 0 0 1.5h8A.75.75 0 0 0 14 15h-1a2.5 2.5 0 0 0-2.5-2.5v-2.711c.739.083 1.476.126 2.206.126h.052a.75.75 0 0 0 .564-.238C14.99 7.837 16 5.347 16 2.622v-.388a.75.75 0 0 0-.629-.74A33.7 33.7 0 0 0 10 1ZM5.937 9.396C4.726 7.834 3.942 5.91 3.773 3.834A32.2 32.2 0 0 1 10 3.195c2.15 0 4.234.225 6.227.64-.17 2.075-.953 3.999-2.164 5.561A17.2 17.2 0 0 1 10 9.736a17.2 17.2 0 0 1-4.063-.34Z",
        "fill-rule": "evenodd",
        "clip-rule": "evenodd",
      },
    ],
  },
  crash: {
    viewBox: "0 0 24 24",
    paths: [
      {
        d: "M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 0 1 .75.75c0 5.056-2.383 9.555-6.084 12.436A6.75 6.75 0 0 1 9.75 22.5a.75.75 0 0 1-.75-.75v-4.131A15.838 15.838 0 0 1 6.382 15H2.25a.75.75 0 0 1-.75-.75 6.75 6.75 0 0 1 7.815-6.666ZM15 6.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z",
      },
    ],
  },
  slots: {
    viewBox: "0 0 20 20",
    paths: [
      {
        d: "M4.5 2A2.5 2.5 0 0 0 2 4.5v3.879a2.5 2.5 0 0 0 .732 1.767l7.5 7.5a2.5 2.5 0 0 0 3.536 0l3.878-3.878a2.5 2.5 0 0 0 0-3.536l-7.5-7.5A2.5 2.5 0 0 0 8.38 2H4.5ZM5 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z",
        "fill-rule": "evenodd",
        "clip-rule": "evenodd",
      },
    ],
  },
  live: {
    viewBox: "0 0 20 20",
    paths: [
      {
        d: "M1 4.75C1 3.784 1.784 3 2.75 3h14.5c.966 0 1.75.784 1.75 1.75v10.515a1.75 1.75 0 0 1-1.75 1.75h-1.5c-.078 0-.155-.005-.23-.015H4.48c-.075.01-.152.015-.23.015h-1.5A1.75 1.75 0 0 1 1 15.265V4.75Zm3 8.65v1.6h2.4l-.6-1.6H4Zm4.6 1.6-.6-1.6h-2l.6 1.6h2Zm.6 0h2l.6-1.6h-2l-.6 1.6Zm4.6 0h2.4v-1.6H14.4l-.6 1.6ZM10 5.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9ZM7.5 10a2.5 2.5 0 1 1 5 0 2.5 2.5 0 0 1-5 0Z",
      },
    ],
  },
  table: {
    viewBox: "0 0 20 20",
    paths: [
      {
        d: "M1 6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H4a3 3 0 0 1-3-3V6Zm4 1.5a2 2 0 1 1 4 0 2 2 0 0 1-4 0Zm2 3a4 4 0 0 0-3.665 2.395.75.75 0 0 0 .416 1.005A8.47 8.47 0 0 0 7 15.5a8.47 8.47 0 0 0 3.249-.6.75.75 0 0 0 .416-1.005A4 4 0 0 0 7 10.5Zm5-3.75a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1-.75-.75Zm0 6.5a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1-.75-.75Zm.75-4a.75.75 0 0 0 0 1.5h2.5a.75.75 0 0 0 0-1.5h-2.5Z",
        "fill-rule": "evenodd",
        "clip-rule": "evenodd",
      },
    ],
  },
  virtuals: {
    viewBox: "0 0 24 24",
    paths: [
      {
        d: "M7.97 16L5 19c-1.5 1.5-4 .5-4-1.5V8a4 4 0 0 1 4-4h14a4 4 0 0 1 4 4v9.5c0 2-2.5 3-4 1.5L16.03 16zm.53-8v2H6.5v2H8.5v2h2v-2h2v-2h-2V8zm7 0a1 1 0 1 0 0 2a1 1 0 0 0 0-2m2 3a1 1 0 1 0 0 2a1 1 0 0 0 0-2",
      },
    ],
  },
  roulette: {
    viewBox: "0 0 20 20",
    paths: [
      {
        d: "M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-13a.75.75 0 0 0-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 0 0 0-1.5h-3.25V5Z",
        "fill-rule": "evenodd",
        "clip-rule": "evenodd",
      },
    ],
  },
  baccarat: {
    viewBox: "0 0 20 20",
    paths: [
      {
        d: "M6.5 3c-1.051 0-2.093.04-3.125.117A1.49 1.49 0 0 0 2 4.607V10.5h-.5a.5.5 0 0 0-.5.5v2a2.5 2.5 0 0 0 2.5 2.5h1.382a.5.5 0 0 0 .447-.276l.97-1.94a.25.25 0 0 1 .447 0l.97 1.94a.5.5 0 0 0 .447.276H13.5a2.5 2.5 0 0 0 2.5-2.5v-2a.5.5 0 0 0-.5-.5H15V4.607a1.49 1.49 0 0 0-1.375-1.49A44.1 44.1 0 0 0 10.5 3H6.5Z",
      },
    ],
  },
  jackpot: {
    viewBox: "0 0 20 20",
    paths: [
      {
        d: "M10 1a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 10 1ZM5.05 3.05a.75.75 0 0 1 1.06 0l1.062 1.06a.75.75 0 1 1-1.06 1.061l-1.06-1.06a.75.75 0 0 1 0-1.06ZM14.95 3.05a.75.75 0 0 1 0 1.06l-1.06 1.062a.75.75 0 0 1-1.062-1.06l1.061-1.06a.75.75 0 0 1 1.06 0ZM3 8a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5h-1.5A.75.75 0 0 1 3 8Zm11 0a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5h-1.5A.75.75 0 0 1 14 8Zm-6.828 2.828a.75.75 0 0 1 0 1.061L6.11 12.95a.75.75 0 0 1-1.06-1.06l1.06-1.06a.75.75 0 0 1 1.06 0Zm5.656 0a.75.75 0 0 1 1.06 0l1.061 1.06a.75.75 0 0 1-1.06 1.061l-1.06-1.06a.75.75 0 0 1 0-1.06ZM10 14a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 10 14Z",
        "fill-rule": "evenodd",
        "clip-rule": "evenodd",
      },
    ],
  },
  new: {
    viewBox: "0 0 20 20",
    paths: [
      {
        d: "M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z",
      },
    ],
  },
  other: {
    viewBox: "0 0 20 20",
    paths: [
      {
        d: "M3.505 2.365A41.37 41.37 0 0 1 9 2c1.863 0 3.697.124 5.495.365 1.247.167 2.18 1.108 2.435 2.268a4.45 4.45 0 0 0-.577-.069 43.1 43.1 0 0 0-4.856-.058c-1.648.07-3.31.245-4.942.508a7 7 0 0 1 .577-2.649ZM4.462 4.86c1.56-.247 3.15-.412 4.73-.477a42.2 42.2 0 0 1 4.742.056c.856.074 1.502.793 1.561 1.647a33.8 33.8 0 0 0-5.498-.233c-1.869.051-3.728.24-5.561.558a2.15 2.15 0 0 1 .026-1.551ZM1.065 8.26C2.985 7.823 5.21 7.542 7.5 7.472a45 45 0 0 1 5.001.074c2.29.18 4.514.532 6.434.964a.75.75 0 0 1 .565.75v5.49a.75.75 0 0 1-.565.75c-1.92.432-4.145.783-6.434.964a45 45 0 0 1-5.001.074C5.21 16.458 2.985 16.176 1.065 15.74a.75.75 0 0 1-.565-.75V9.01a.75.75 0 0 1 .565-.75Z",
      },
    ],
  },
  wheel: {
    viewBox: "0 0 20 20",
    paths: [
      {
        d: "M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM6.75 9.25a.75.75 0 0 0 0 1.5h4.59l-2.1 3.634a.75.75 0 1 0 1.3.75L12.39 12H15.25a.75.75 0 0 0 0-1.5h-4.59l2.1-3.634a.75.75 0 1 0-1.3-.75L9.61 9.25H6.75Z",
        "fill-rule": "evenodd",
        "clip-rule": "evenodd",
      },
    ],
  },
  instants: {
    viewBox: "0 0 20 20",
    paths: [
      {
        d: "M11.3 1.046A1 1 0 0 1 12 2v5h4a1 1 0 0 1 .82 1.573l-7 10A1 1 0 0 1 8 18v-5H4a1 1 0 0 1-.82-1.573l7-10a1 1 0 0 1 1.12-.38Z",
      },
    ],
  },
  video_virtual: {
    viewBox: "0 0 20 20",
    paths: [
      {
        d: "M1 4.75C1 3.784 1.784 3 2.75 3h14.5c.966 0 1.75.784 1.75 1.75v10.5A1.75 1.75 0 0 1 17.25 16H2.75A1.75 1.75 0 0 1 1 14.25V4.75ZM7.5 7.25a.75.75 0 0 0-1.173.621v4.258a.75.75 0 0 0 1.173.621l3.606-2.129a.75.75 0 0 0 0-1.242L7.5 7.25Z",
      },
    ],
  },
};

function getIconForCategory(id) {
  return categoryIcons[id] || categoryIcons.other;
}

const props = defineProps({
  activeCategory: { type: String, default: "all" },
  categories: { type: Array, default: () => [] },
});

const emit = defineEmits(["select"]);

const scrollContainer = ref(null);

function scrollActiveIntoView() {
  const idx = props.categories.findIndex((c) => c.id === props.activeCategory);
  if (idx >= 0 && scrollContainer.value) {
    const buttons = scrollContainer.value.querySelectorAll("button");
    if (buttons[idx]) {
      buttons[idx].scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  }
}

watch(() => props.activeCategory, () => {
  nextTick(scrollActiveIntoView);
}, { immediate: true });
</script>

<template>
  <div
    ref="scrollContainer"
    class="flex gap-1.5 overflow-x-auto scrollbar-hide py-1"
  >
    <button
      v-for="cat in categories"
      :key="cat.id"
      :class="[
        'flex flex-col items-center gap-1 px-3 py-2.5 rounded-xl transition-all duration-200 shrink-0 cursor-pointer border min-w-14',
        activeCategory === cat.id
          ? 'bg-primary/10 dark:bg-primary/15 text-primary border-primary/30 tab-active'
          : 'bg-gray-100 dark:bg-card text-gray-500 dark:text-white/70 border-transparent hover:bg-gray-200 dark:hover:bg-white/10 hover:text-gray-700 dark:hover:text-white',
      ]"
      @click="emit('select', cat.id)"
    >
      <span
        class="category-icon"
        :class="activeCategory === cat.id ? 'text-primary' : ''"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          :viewBox="getIconForCategory(cat.id).viewBox"
          fill="currentColor"
        >
          <path
            v-for="(p, i) in getIconForCategory(cat.id).paths"
            :key="i"
            v-bind="p"
          />
        </svg>
      </span>
      <span class="text-[0.6rem] font-semibold whitespace-nowrap leading-tight">{{ cat.name }}</span>
    </button>
  </div>
</template>

<style scoped>
.tab-active {
  box-shadow: 0 0 0 1px oklch(65% 0.2 145 / 0.15);
}
.category-icon :deep(svg) {
  width: 1.25rem;
  height: 1.25rem;
}
</style>
