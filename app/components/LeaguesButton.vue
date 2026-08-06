<template>
  <RouterLink
    :to="{ name: 'countries' }"
    class="group py-1 flex items-center rounded-md focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary"
  >
    <div class="flex h-9 items-center cursor-pointer">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-4.5 w-4.5 shrink-0 text-foreground"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M5 22V3h16l-2 5l2 5H7v9zm2-11h11.05l-1.2-3l1.2-3H7zm0 0V5z"
        />
      </svg>
      <span
        class="ml-1 block truncate capitalize text-[0.95rem] font-bold text-foreground"
        >Countries</span
      >
      <!-- the chevron is the affordance: this chip navigates away rather than
           toggling something in place -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="ml-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="m9 18l6-6l-6-6"
        />
      </svg>
    </div>
  </RouterLink>
</template>
