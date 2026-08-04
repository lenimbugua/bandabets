<script setup>
import { useRoute } from "vue-router";
import TheLogo from "./TheLogo.vue";
import TopModeSwitch from "./TopModeSwitch.vue";

const route = useRoute();

const links = [
  {
    label: "Home",
    slug: null,
    iconPath: "M11.47 3.84a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.06l-8.69-8.69a2.25 2.25 0 0 0-3.18 0l-8.69 8.69a.75.75 0 1 0 1.06 1.06l8.69-8.69Z M12 5.43l8.16 8.16c.03.03.05.06.07.09v6.2c0 .46-.38.84-.84.84H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V20a.75.75 0 0 1-.75.75H4.61a.84.84 0 0 1-.84-.84v-6.2c.02-.03.04-.06.07-.09L12 5.43Z",
  },
  {
    label: "Live",
    slug: "live",
    iconPath: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm-2 14.5v-9l6 4.5-6 4.5Z",
  },
  {
    label: "Slots",
    slug: "slots",
    iconPath: "M4 5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5Zm3 3v8h2V8H7Zm4 0v8h2V8h-2Zm4 0v8h2V8h-2Z",
  },
  {
    label: "Crash",
    slug: "crash",
    iconPath: "M9.32 7.58C12.2 3.88 16.7 1.5 21.75 1.5a.75.75 0 0 1 .75.75c0 5.06-2.38 9.56-6.08 12.44A6.75 6.75 0 0 1 9.75 22.5a.75.75 0 0 1-.75-.75v-4.13c-1-.5-1.93-1.16-2.62-1.62H2.25a.75.75 0 0 1-.75-.75 6.75 6.75 0 0 1 7.82-6.67ZM15 6.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z",
  },
  {
    label: "Virtual",
    slug: "virtuals",
    iconPath: "M7 4a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2v-2a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2h2a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm1.5 5a1 1 0 1 1 0 2 1 1 0 0 1 0-2Zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z",
  },
  {
    label: "Top Games",
    slug: "top",
    iconPath: "M11.48 3.5a.56.56 0 0 1 1.04 0l2.13 5.11a.56.56 0 0 0 .47.34l5.52.45c.5.04.7.66.32.99l-4.2 3.6a.56.56 0 0 0-.18.56l1.28 5.38a.56.56 0 0 1-.84.61l-4.72-2.88a.56.56 0 0 0-.59 0l-4.72 2.88a.56.56 0 0 1-.84-.61l1.28-5.38a.56.56 0 0 0-.18-.56l-4.2-3.6a.56.56 0 0 1 .32-.99l5.52-.45a.56.56 0 0 0 .47-.34L11.48 3.5Z",
  },
  {
    label: "Table",
    slug: "table",
    iconPath: "M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5Zm2 6h6V5H5v6Zm8 0h6V5h-6v6ZM5 19h6v-6H5v6Zm8 0h6v-6h-6v6Z",
  },
  {
    label: "New",
    slug: "new",
    iconPath: "M9.4 7.2 8 4l-1.4 3.2L3.4 8.6 6.6 10 8 13.2l1.4-3.2L12.6 8.6 9.4 7.2Zm9 2.6L16.8 6l-1.6 3.8L11.4 11.4l3.8 1.6 1.6 3.8 1.6-3.8 3.8-1.6-3.8-1.6Zm-6 8.6L10.8 14l-1.6 3.4-3.4 1.6 3.4 1.6 1.6 3.4 1.6-3.4 3.4-1.6-3.4-1.6Z",
  },
  {
    label: "Other",
    slug: "other",
    iconPath: "M8 7a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm0 10a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm12-10a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm0 10a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z",
  },
];

function isActive(slug) {
  if (route.name !== "casino-home") return false;
  const q = route.query.category;
  if (slug === null) return !q || q === "all";
  return q === slug;
}

function targetFor(slug) {
  return { name: "casino-home", query: { category: slug ?? "all" } };
}
</script>

<template>
  <aside
    aria-label="Casino categories"
    class="hidden lg:flex sticky top-0 h-screen w-56 shrink-0 flex-col bg-card border-r border-border px-3 pb-4 z-30"
  >
    <!-- Logo — header band height -->
    <div class="h-16 flex items-center shrink-0">
      <TheLogo />
    </div>

    <!-- Mode switch (Casino / Sports) -->
    <div class="flex items-center justify-center shrink-0 mb-2">
      <TopModeSwitch />
    </div>

    <ul class="flex flex-col gap-1 mt-2">
      <li v-for="link in links" :key="link.label">
        <RouterLink
          :to="targetFor(link.slug)"
          class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors"
          :class="isActive(link.slug)
            ? 'text-foreground font-bold bg-primary/15'
            : 'text-muted-foreground hover:text-foreground hover:bg-surface-interactive font-medium'"
        >
          <svg
            viewBox="0 0 24 24"
            class="w-5 h-5 shrink-0"
            :class="isActive(link.slug) ? '' : 'text-primary'"
            fill="currentColor"
            aria-hidden="true"
          >
            <path :d="link.iconPath" />
          </svg>
          <span>{{ link.label }}</span>
        </RouterLink>
      </li>
    </ul>
  </aside>
</template>
