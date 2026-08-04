<template>
  <div v-for="i in 4" :key="i" class="flex justify-center gap-2">
    <div class="flex items-center gap-1">
      <div class="relative h-5 w-5">
        <img
          class="absolute h-full w-full inset-0 object-cover rounded-sm"
          src="https://storage.livescore.com/images/team/medium/enet/9825.png"
          alt="ARS team logo"
          loading="lazy"
        />
      </div>
      <div class="text-[0.9rem]">ARS</div>
    </div>
    <div>2</div>
    <div>-</div>
    <div>8</div>
    <div class="flex items-center gap-1">
      <div class="text-[0.9rem]">MUN</div>
      <div class="relative h-5 w-5">
        <img
          class="absolute h-full w-full inset-0 object-cover rounded-sm"
          src="https://storage.livescore.com/images/team/medium/enet/10260.png"
          alt="MUN team logo"
          loading="lazy"
        />
      </div>
    </div>
  </div>
</template>
