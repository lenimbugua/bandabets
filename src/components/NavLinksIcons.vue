<script setup>
const props = defineProps({
  icon: {
    type: String,
    required: true,
  },
  iconCss: {
    type: String,
    required: true,
  },
});

function showIcon(name) {
  return name === props.icon;
}
</script>
<template>
  <!-- sports — soccer ball -->
  <div v-if="showIcon('sport')" class="flex items-center">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
       
      class="h-4 w-4 fill-current"
    >
      <path
        d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm200-500 54-18 16-54q-32-48-77-82.5T574-786l-54 38v56l160 112Zm-400 0 160-112v-56l-54-38q-54 17-99 51.5T210-652l16 54 54 18Zm-42 308 46-4 30-54-58-174-56-20-40 30q0 65 18 118.5T238-272Zm242 112q26 0 51-4t49-12l28-60-26-44H378l-26 44 28 60q24 8 49 12t51 4Zm-90-200h180l56-160-146-102-144 102 54 160Zm332 88q42-50 60-103.5T800-494l-40-28-56 18-58 174 30 54 46 4Z"
      ></path>
    </svg>
  </div>

  <!-- live — play circle with ping -->
  <div v-if="showIcon('live')" class="flex items-center mr-2">
    <span :class="iconCss" class="relative flex justify-center items-center">
      <span
        class="animate-ping bg-red-600 absolute inline-flex h-3 w-3 rounded-full"
      ></span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        class="text-red-600"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m-2 14.5v-9l6 4.5z"
        />
      </svg>
    </span>
  </div>

  <!-- crash — rocket -->
  <div v-if="showIcon('crash')" class="flex items-center">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      :class="iconCss"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 0 1 .75.75c0 5.056-2.383 9.555-6.084 12.436A6.75 6.75 0 0 1 9.75 22.5a.75.75 0 0 1-.75-.75v-4.131A15.838 15.838 0 0 1 6.382 15H2.25a.75.75 0 0 1-.75-.75 6.75 6.75 0 0 1 7.815-6.666ZM15 6.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z"
      />
    </svg>
  </div>

  <!-- flag — pennant banner -->
  <div v-if="showIcon('flag')" class="flex items-center">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      :class="iconCss"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M4 21V3h1v1l4.34 2.17a1 1 0 0 0 .94-.02L15.72 3a1 1 0 0 1 1.06.02L20 5v10l-3.22-1.93a1 1 0 0 0-1.06.02l-5.44 3.17a1 1 0 0 1-.94.02L5 14v7z"
      />
    </svg>
  </div>

  <!-- aviator — airplane -->
  <div v-if="showIcon('aviator')" class="flex items-center">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      :class="iconCss"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M22 16.21v-1.895L14 8.84V4.005a2 2 0 1 0-4 0V8.84L2 14.315v1.895l8-2.526v4.016l-2 1.504v1.504L12 19.7l4 1.008V19.2l-2-1.504V15.68z"
      />
    </svg>
  </div>

  <!-- virtual — game controller -->
  <div v-if="showIcon('virtual')" class="flex items-center">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      :class="iconCss"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M7.97 16L5 19c-1.5 1.5-4 .5-4-1.5V8a4 4 0 0 1 4-4h14a4 4 0 0 1 4 4v9.5c0 2-2.5 3-4 1.5L16.03 16zm.53-8v2H6.5v2H8.5v2h2v-2h2v-2h-2V8zm7 0a1 1 0 1 0 0 2a1 1 0 0 0 0-2m2 3a1 1 0 1 0 0 2a1 1 0 0 0 0-2"
      />
    </svg>
  </div>

  <!-- casino — diamond gem -->
  <div v-if="showIcon('casino')" class="flex items-center">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      :class="iconCss"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M6 2l-6 8l12 12L24 10l-6-8zm1.5 2h9l3.75 5H3.75z"
      />
      <path fill="currentColor" d="M12 21.35L1.5 10.5h21z" opacity="0.6" />
    </svg>
  </div>

  <!-- promotion — gift box -->
  <div v-if="showIcon('promotion')" class="flex items-center">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      :class="iconCss"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M20 7h-1.18C18.93 6.69 19 6.35 19 6c0-1.66-1.34-3-3-3c-1.07 0-2.02.57-2.55 1.42L12 6.88l-1.45-2.46A2.99 2.99 0 0 0 8 3C6.34 3 5 4.34 5 6c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2m-4-2c.55 0 1 .45 1 1s-.45 1-1 1h-1.82L16 5zM8 5c.55 0 1 .45 1 1s-.45 1-1 1H6.82L8 5M4 20V12h7v8zm16 0h-7v-8h7zm0-10H4V9h16z"
      />
    </svg>
  </div>

  <!-- buzz — flame/fire -->
  <div v-if="showIcon('buzz')" class="flex pr-1 items-center">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      :class="iconCss"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73c-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67M11.71 19c-1.78 0-3.22-1.4-3.22-3.14c0-1.62 1.05-2.76 2.81-3.12c1.77-.36 3.6-1.21 4.62-2.58c.39 1.29.59 2.65.59 4.04c0 2.65-2.15 4.8-4.8 4.8"
      />
    </svg>
  </div>

  <!-- sparkles — star burst -->
  <div v-if="showIcon('sparkles')" class="flex pr-1 items-center">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      :class="iconCss"
      class="h-4 w-4 flex mx-auto"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M12 .587l3.668 7.431L24 9.748l-6 5.848L19.335 24L12 20.013L4.665 24L6 15.596L0 9.748l8.332-1.73z"
      />
    </svg>
  </div>

  <!-- countries — globe -->
  <div v-if="showIcon('countries')" class="flex items-center">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      :class="iconCss"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m-1 17.93c-3.95-.49-7-3.85-7-7.93c0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41c0 2.08-.8 3.97-2.1 5.39"
      />
    </svg>
  </div>

  <!-- trophy — medal -->
  <div v-if="showIcon('trophy')" class="flex items-center">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      :class="iconCss"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M12 7a8 8 0 0 0-8 8a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.39A4 4 0 0 1 12 12a4 4 0 0 1 4 3.11a.5.5 0 0 0 .5.39h3a.5.5 0 0 0 .5-.5a8 8 0 0 0-8-8m-2-5h4l1 2h2l-1.5 3H8.5L7 4h2zm2 16a2 2 0 1 0 0 4a2 2 0 0 0 0-4m0-1a3 3 0 1 1 0 6a3 3 0 0 1 0-6"
      />
    </svg>
  </div>
</template>
