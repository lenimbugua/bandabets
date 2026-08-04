<template>
  <RouterLink
    class="px-2.5 py-1 bg-linear-to-r from-violet-500 via-lime-500 to-violet-500 flex items-center justify-between text-foreground font-bold text-xs"
    :to="{ name: 'join-affiliate' }"
  >
    <div class="flex justify-between w-full items-center text-gray-950">
      <div class="flex space-x-1.5 items-center">
        <div class="">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-amber-500 fill-current"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M13.5 16a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0"
            />
            <path
              fill="currentColor"
              d="m14.347.66l3.18 4.456l2.097-.715L21.538 10h.962v12h-21V10h.51v-.01l.648.006zM9.397 10h10.028l-1.037-3.033l-1.522.487zM7.839 8.417L15.55 5.79l-1.604-2.25zM5.5 12h-2v2a2 2 0 0 0 2-2m10 4a3.5 3.5 0 1 0-7 0a3.5 3.5 0 0 0 7 0m5 4v-2a2 2 0 0 0-2 2zm-2-8a2 2 0 0 0 2 2v-2zm-15 8h2a2 2 0 0 0-2-2z"
            />
          </svg>
        </div>
        <span>Get</span>
        <span class="text-fuchsia-700 font-black">KES.30</span>
        <span>Per Referral</span>
      </div>
      <div>
        <button
          class="bg-white text-red-500 p-1 px-2 rounded-md flex space-x-1"
        >
          <span>Join Affiliate</span>
        </button>
      </div>
    </div>
  </RouterLink>
</template>
