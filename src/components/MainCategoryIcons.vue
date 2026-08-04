<script setup>
import { UserPlusIcon } from "@heroicons/vue/20/solid";
import { GiftIcon } from "@heroicons/vue/24/outline";
import { SparklesIcon } from "@heroicons/vue/24/solid";

const props = defineProps({
  icon: {
    type: String,
    required: true,
  },
});

function showIcon(name) {
  return name === props.icon;
}
</script>
<template>
  <!-- sports -->
  <div v-if="showIcon('sport')" class="flex items-center min-w-10 py-2">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-4 w-4 mx-auto"
      viewBox="0 0 14.143 8.492"
    >
      <g
        id="Icon_material-round-sports"
        data-name="Icon material-round-sports"
        transform="translate(-3 -9)"
      >
        <path
          id="Path_88"
          data-name="Path 88"
          d="M16.436,9H9.527a4.528,4.528,0,0,0-3.083,1.223A1.773,1.773,0,1,0,5.2,12.479a3.458,3.458,0,0,0-.071.552,4.243,4.243,0,1,0,8.436-.4.7.7,0,0,1,.7-.8h1.952c.615-.007.926-.325.926-.714V9.707A.709.709,0,0,0,16.436,9ZM4.768,11.121a.354.354,0,1,1,.354-.354A.35.35,0,0,1,4.768,11.121Zm4.6,4.243a2.121,2.121,0,1,1,2.121-2.121A2.119,2.119,0,0,1,9.364,15.364Z"
          transform="translate(0)"
          fill="#fff"
        />
        <path
          id="Path_89"
          data-name="Path 89"
          d="M16.329,16.414A1.414,1.414,0,1,1,14.914,15,1.414,1.414,0,0,1,16.329,16.414Z"
          transform="translate(-5.55 -3.171)"
          fill="#fff"
        />
      </g>
    </svg>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="12"
      viewBox="0 0 48 12"
    >
      <text
        id="SPORTS"
        transform="translate(24 9)"
        fill="#fff"
        font-size="11"
        font-family="Helvetica"
        letter-spacing="0.022em"
      >
        <tspan x="-23.123" y="0">SPORTS</tspan>
      </text>
    </svg>
  </div>

  <!-- live -->
  <div
    v-if="showIcon('live')"
    class="flex items-center min-w-10 py-2 pl-1.5 first-line:"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-4 w-4 flex mx-auto mr-1.5"
      viewBox="0 0 12.889 9.492"
    >
      <g
        id="Icon_ion-tv-outline"
        data-name="Icon ion-tv-outline"
        transform="translate(-1.75 -6.25)"
      >
        <path
          id="Path_82"
          data-name="Path 82"
          d="M3.1,6.75H13.286a.853.853,0,0,1,.853.853v5.512a.853.853,0,0,1-.853.853H3.1a.853.853,0,0,1-.853-.853V7.6A.853.853,0,0,1,3.1,6.75Z"
          fill="none"
          stroke="#fff"
          stroke-linejoin="round"
          stroke-width="1"
        />
        <path
          id="Path_83"
          data-name="Path 83"
          d="M9,29.25h6.794"
          transform="translate(-4.202 -14.008)"
          stroke="#fff"
          stroke-linecap="round"
          stroke-miterlimit="10"
          stroke-width="1"
        />
      </g>
    </svg>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="11"
      class="flex mx-auto mt-0.5"
      viewBox="0 0 26 11"
    >
      <text
        id="LIVE"
        transform="translate(13 8)"
        fill="#fff"
        font-size="11"
        font-family="Helvetica"
        letter-spacing="0.022em"
      >
        <tspan x="-12.287" y="0">LIVE</tspan>
      </text>
    </svg>
  </div>

  <!-- crash -->
  <!-- <div v-if="showIcon('crash')" class="flex min-w-10 items-center py-1.5">
    <div class="relative flex h-5 items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        class="text-black"
        viewBox="0 0 512 512"
      >
        <path
          fill="currentColor"
          d="M461.5 31.85c-5 1.2-10.4 3.4-16.4 6.4c-12 6-26.7 15.3-42.1 26.1c-26.7 18.7-55.5 41.75-75 59.95l39.8 19.9l19.9 39.8c18.2-19.5 41.2-48.3 59.9-75c10.8-15.35 20.1-30.05 26.2-42.15c3-6 5.2-11.3 6.3-16.3c1.2-5 1.9-10.9-2.9-15.7c-4.8-4.56-10-4.25-15.7-3m-14.8 33.4c4.9 4.71 5.6 12.1 3.8 18.7s-6.1 13.3-12.9 20.15l-42.2 42.2l-29.6-29.7L408 74.45c6.8-6.8 13.5-11.06 20.1-12.9c6.1-1.71 14.3-.44 18.6 3.7M183.2 109.5l-21.3 21.2l45.6 5v-26.2zm129.9 25.2l-43.5 21.8l-153 200.1l13.7 13.8l97.5-97.5l11.3 11.3c-32.5 32.5-65 65.1-97.5 97.6l13.8 13.6l200.1-153l21.8-43.5l-21.4-42.8zm-256.59.4l7.4 22.2l120.99 83.5l64.5-84.3zm38.1 62.8l-13.1 13.2l24.39 24.3l17.6-17.5zm260.89 64.7l-84.3 64.5l83.5 121l22.2 7.3zm-190.9 4.8l-110.99 9.1l-22.6 22.6l82.39 35.4zm212.1 41.2l4.6 41.5l17.1-17.2v-24.3zm-132.1 38.8l-67 51.2l35.3 82.4l22.6-22.6zm-138.7 21.2l-13.09 13.1l37.49 37.4l13.1-13zm188.2 19.9l-17.5 17.6l24.3 24.3l13.2-13.1z"
        ></path>
      </svg>
    </div>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="w-10 text-black fill-current"
      viewBox="0 0 48 12"
    >
      <text
        id="AVIATOR"
        transform="translate(24 9)"
        font-size="11"
        font-family="Helvetica"
        letter-spacing="0.022em"
      >
        <tspan x="-23.961" y="0">CRASH</tspan>
      </text>
    </svg>
  </div> -->

  <!-- crash -->
  <div v-if="showIcon('crash')" class="flex min-w-10 items-center py-1.5">
    <div class="relative flex h-5 items-center">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="SVG">
          <path
            id="Others-Inactive"
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M15.1838 15.1961C15.3082 16.1509 15.2029 17.2526 14.8446 18.0922C14.4469 18.9206 13.9176 19.5298 12.9682 20L11.6592 16.8764C12.4774 16.564 13.0802 16.3131 13.4676 16.1239C13.8551 15.9346 14.4253 15.6441 15.1838 15.1961ZM7.34286 16.4242C7.63776 16.6994 7.91449 16.6364 7.91449 16.966C7.91449 17.2081 7.58771 18.0861 7.10235 18.3781C6.09242 18.8286 5.09881 19.2581 4.06442 19.648C4.30572 19.1227 4.51422 18.6675 4.69051 18.2804L4.8167 18.0029C5.07706 17.429 5.25276 17.0338 5.34636 16.809C5.47742 16.4208 6.1008 16.0156 6.75509 15.8717C6.94899 15.8232 7.04796 16.149 7.34286 16.4242ZM19.919 4.12689C19.9744 4.5969 20.4727 8.15268 18.1111 11.4082C16.5741 13.4791 14.2502 15.0583 11.1394 16.1458L7.77416 12.787C8.81403 9.85261 10.273 7.64209 12.151 6.15543C13.9085 4.79297 16.5625 3.60121 19.919 4.12689ZM8.78496 8.69116C8.3185 9.42961 8.02358 10.0124 7.83384 10.3989C7.64409 10.7854 7.39196 11.3792 7.07328 12.2007L4 10.9156C4.4192 10.0185 5.07946 9.38971 6.05671 8.98809C6.80625 8.67414 7.79874 8.59044 8.78496 8.69116ZM14.1555 7.69665C13.0374 7.69665 12.1305 8.60133 12.1305 9.71797C12.1305 10.8346 13.0374 11.7393 14.1555 11.7393C15.2735 11.7393 16.1804 10.8346 16.1804 9.71797C16.1804 8.60133 15.2735 7.69665 14.1555 7.69665ZM14.1555 8.24423C14.9714 8.24423 15.6328 8.90405 15.6328 9.71797C15.6328 10.5319 14.9714 11.1917 14.1555 11.1917C13.3395 11.1917 12.6781 10.5319 12.6781 9.71797C12.6781 8.90405 13.3395 8.24423 14.1555 8.24423Z"
            fill="white"
          ></path>
          <path
            id="Vector 1"
            d="M7.48407 15.2404C7.46379 14.7769 6.32545 15.291 5.7715 15.8958L4.99983 17.5005L3.49963 20.0005C4.64135 19.5635 7.49985 18.5005 8.16484 17.5323C8.53625 16.9915 8.71879 16.9275 8.69343 16.3482C8.08877 15.7943 7.50943 15.8197 7.48407 15.2404Z"
            fill="yellow"
          ></path>
        </g>
      </svg>
    </div>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="w-10 text-white fill-current"
      viewBox="0 0 48 12"
    >
      <text
        id="AVIATOR"
        transform="translate(24 9)"
        font-size="11"
        font-family="Helvetica"
        letter-spacing="0.022em"
      >
        <tspan x="-23.961" y="0">CRASH</tspan>
      </text>
    </svg>
  </div>

  <!-- virtuals -->
  <div
    v-if="showIcon('virtuals')"
    class="flex items-center min-w-10 justify-center py-2"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-4 w-4 flex mx-auto"
      viewBox="0 0 6.598 8.207"
    >
      <g
        id="Icon_core-screen-smartphone"
        data-name="Icon core-screen-smartphone"
        transform="translate(-7.313 -1.125)"
      >
        <path
          id="Path_84"
          data-name="Path 84"
          d="M7.312,1.672V8.785a.623.623,0,0,0,.677.547h5.244a.623.623,0,0,0,.677-.547V1.672a.623.623,0,0,0-.677-.547H7.989a.623.623,0,0,0-.677.547Zm5.921,7.113H7.989V1.672h5.244Z"
          transform="translate(0)"
          fill="white"
        />
        <path
          id="Path_85"
          data-name="Path 85"
          d="M15.188,5.625h2.03v.547h-2.03Zm.677,5.335h.677v.547h-.677Z"
          transform="translate(-5.507 -3.406)"
          fill="white"
        />
      </g>
    </svg>

    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="45"
      height="12"
      class="flex mx-auto mt-0.5"
      viewBox="0 0 56 12"
    >
      <text
        id="VIRTUALS"
        transform="translate(28 9)"
        fill="white"
        font-size="11"
        font-family="Helvetica"
        letter-spacing="0.022em"
      >
        <tspan x="-27.646" y="0">VIRTUALS</tspan>
      </text>
    </svg>
  </div>

  <!-- casino -->
  <div v-if="showIcon('casino')" class="flex min-w-10 items-center py-2">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-4 w-4 flex mx-auto"
      viewBox="0 0 9 9"
    >
      <g
        id="Icon_core-casino"
        data-name="Icon core-casino"
        transform="translate(-1.125 -1.125)"
      >
        <path
          id="Path_86"
          data-name="Path 86"
          d="M10.111,5.842,9.17,1.6a.6.6,0,0,0-.716-.456L4.207,2.08a.6.6,0,0,0-.456.716l.394,1.779H1.725a.6.6,0,0,0-.6.6v4.35a.6.6,0,0,0,.6.6h4.35a.6.6,0,0,0,.6-.6V7.218l2.98-.66a.6.6,0,0,0,.456-.716ZM6.075,9.525H1.725V5.175H4.278l.414,1.868a.6.6,0,0,0,.716.456l.667-.148V9.525Zm3.45-3.553-4.247.941L4.337,2.666l4.247-.941.941,4.247Z"
          transform="translate(0 0)"
          fill="#fff"
        />
        <path
          id="Path_87"
          data-name="Path 87"
          d="M5.625,10.824h.75v.75h-.75Zm0,2.4h.75v.75h-.75Zm2.4,0h.75v.75h-.75Zm-1.2-1.2h.75v.75h-.75ZM8.352,8.172l.732-.162.162.732L8.514,8.9ZM11.215,10l.732-.162.162.732-.732.162ZM9.784,9.083l.732-.162.162.732-.732.162Z"
          transform="translate(-3.3 -5.049)"
          fill="#fff"
        />
      </g>
    </svg>

    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="12"
      class="flex mx-auto mt-0.5"
      viewBox="0 0 44 12"
    >
      <text
        id="CASINO"
        transform="translate(22 9)"
        fill="#fff"
        font-size="11"
        font-family="Helvetica"
        letter-spacing="0.022em"
      >
        <tspan x="-21.692" y="0">CASINO</tspan>
      </text>
    </svg>
  </div>
  <!-- soccer -->
  <div v-if="showIcon('soccer')" class="flex min-w-10 items-center py-2">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-4 w-4 flex mx-auto"
      viewBox="0 0 128 128"
    >
      <path
        fill="#C8C8C8"
        d="M63.95 4.06c-35.52-.5-61.9 29.92-60.13 62.45c2.09 38.31 29.48 57.56 61.52 57.34c33.66-.23 59.2-24.09 58.5-60.13c-.69-35.98-27.15-59.19-59.89-59.66"
      />
      <path
        fill="#FFF"
        d="M35.86 15.21C11 29.46-4.78 69.85 21.7 100.41c3.24 3.74 8.39 6.35 12.3 8.13c26.7 12.07 59.01-6.49 71.51-20.64c9.92-11.23 13.57-18.68 12.39-34.01c-.91-11.92-6.01-23.43-16.58-31.94c-23.9-19.28-49.67-15.8-65.46-6.74"
      />
      <path
        fill="#171717"
        d="M60.9 39.79c-.09-.05-9.34-5.36-16.52-8.02c-7.48-2.77-13-4.26-13.06-4.27l1.03-3.86c.23.06 5.75 1.54 13.42 4.39c7.5 2.78 16.74 8.08 17.13 8.31zm16.267-10.436L82.61 9.932l3.852 1.079l-5.442 19.422zM117.6 54.52c-.05-.02-5.37-2.04-11.31-3.65c-4.47-1.21-10.23-2.44-10.29-2.45l.83-3.91c.24.05 5.92 1.26 10.5 2.5c6.15 1.66 11.47 3.69 11.7 3.77zM86.13 93.76c0-.06-.5-6.16-1.7-12.4c-1.19-6.16-3.46-11.96-3.48-12.01l3.72-1.47c.1.25 2.43 6.19 3.69 12.73c1.24 6.47 1.74 12.58 1.76 12.84zm19.89 5.56l-2.64-3.01c.04-.03 3.88-3.43 8.62-9.83c4.38-5.92 6.4-11.1 6.42-11.16l3.73 1.43c-.09.23-2.24 5.75-6.94 12.1c-5.01 6.78-9.02 10.32-9.19 10.47M32.847 78.88L55.99 58.223l2.664 2.984L35.51 81.864zM12.91 73.35c-.06-.39-1.38-9.64-1.38-18.1c0-8.44.96-16.25 1.01-16.58l3.97.5c-.01.08-.97 7.9-.97 16.08c0 8.16 1.33 17.44 1.34 17.53zm58.39 40.3c-.25-.03-6.35-.8-16.9-3.9c-6.72-1.98-14.4-6.04-14.73-6.21l1.88-3.53c.08.04 7.65 4.05 13.98 5.91c10.2 3 16.2 3.76 16.26 3.77z"
      />
      <path
        fill="#474C4F"
        d="M53.37 32.72c-.31.78.1 28.63.73 29.46s28.63 10.34 29.88 10.03s16.19-23.82 16.19-24.76s-18.38-23.61-19.32-23.82s-27.06 8.04-27.48 9.09m63.99 3.42s-4.12 13.71-4.12 14.76c0 1.04 2.51 6.79 3.66 13.89s-.52 17.76.21 18.18s4.35.21 4.35.21s3.49-10.97 2.02-25.07c-1.47-14.11-6.12-21.97-6.12-21.97M87.64 90.7c-.84.08-22.88 19.01-22.78 19.54c.1.52 8.63 13.09 8.63 13.09s10.72-.85 20.54-6.17s13.55-10.05 13.55-10.05s1.36-12.64.84-12.74c-.51-.12-19.73-3.77-20.78-3.67M14.09 67.09c-.57.47-3.87 7.73-4.81 11.81c-.94 4.07-1.46 7.94-1.46 7.94s2.51 7.26 6.27 12.64c4.66 6.66 10.72 11.36 10.72 11.36s19.78-6.03 19.89-6.87s-2.3-8.15-3.97-14.21s-1.98-12.85-2.61-13.27s-7-2.4-12.01-4.39s-11.39-5.53-12.02-5.01m-6.2-25.21s5.47 4.73 6.31 4.73s6.14-7.02 11.49-11.28c7.21-5.75 10.76-7.63 10.87-8.36c.1-.73 3.24-18.18 3.24-18.18s-11.6 4.39-20.06 14.1S7.89 41.88 7.89 41.88M67.05 4.13s6.67 3.43 9.1 5.12s6.01 5.27 7.07 5.38c1.05.11 15.56.12 15.56.12s-6.58-4.5-13.87-7.08c-8.77-3.11-17.86-3.54-17.86-3.54"
      />
    </svg>

    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="52"
      height="12"
      class="flex mx-auto mt-0.5"
      viewBox="0 0 44 12"
    >
      <text
        id="SOCCER"
        transform="translate(22 9)"
        fill="#fff"
        font-size="11"
        font-family="Helvetica"
        letter-spacing="0.022em"
      >
        <tspan x="-21.692" y="0">SOCCER</tspan>
      </text>
    </svg>
  </div>
  <!-- aviator -->
  <div v-if="showIcon('aviator')" class="flex min-w-10 items-center py-2">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-4 w-4 flex mx-auto text-white"
      viewBox="0 0 24 24"
    >
      <path
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.5"
        d="M2.75 20.75h18.5M18.575 6.299a1.783 1.783 0 0 1 1.783 3.089L11.31 14.61a4 4 0 0 1-1.377.49l-2.604.422a3.04 3.04 0 0 1-2.725-.948L2.91 12.723a.607.607 0 0 1 .145-.936l.391-.226a1.52 1.52 0 0 1 1.56.025l1.816 1.128c.19.118.43.122.624.01l3.6-2.078l-4.404-5.12a.607.607 0 0 1 .156-.922l.378-.218c.326-.188.73-.18 1.047.02l6.506 4.113z"
      />
    </svg>

    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="52"
      height="12"
      class="flex mx-auto mt-0.5"
      viewBox="0 0 44 12"
    >
      <text
        id="AVIATOR"
        transform="translate(22 9)"
        fill="#fff"
        font-size="11"
        font-family="Helvetica"
        letter-spacing="0.022em"
      >
        <tspan x="-21.692" y="0">AVIATOR</tspan>
      </text>
    </svg>
  </div>

  <!-- Popular -->
  <div v-if="showIcon('popular')" class="flex min-w-10 items-center py-2">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-4 w-4 flex mx-auto"
      viewBox="0 0 9 9"
    >
      <g
        id="Icon_core-casino"
        data-name="Icon core-casino"
        transform="translate(-1.125 -1.125)"
      >
        <path
          id="Path_86"
          data-name="Path 86"
          d="M10.111,5.842,9.17,1.6a.6.6,0,0,0-.716-.456L4.207,2.08a.6.6,0,0,0-.456.716l.394,1.779H1.725a.6.6,0,0,0-.6.6v4.35a.6.6,0,0,0,.6.6h4.35a.6.6,0,0,0,.6-.6V7.218l2.98-.66a.6.6,0,0,0,.456-.716ZM6.075,9.525H1.725V5.175H4.278l.414,1.868a.6.6,0,0,0,.716.456l.667-.148V9.525Zm3.45-3.553-4.247.941L4.337,2.666l4.247-.941.941,4.247Z"
          transform="translate(0 0)"
          fill="#fff"
        />
        <path
          id="Path_87"
          data-name="Path 87"
          d="M5.625,10.824h.75v.75h-.75Zm0,2.4h.75v.75h-.75Zm2.4,0h.75v.75h-.75Zm-1.2-1.2h.75v.75h-.75ZM8.352,8.172l.732-.162.162.732L8.514,8.9ZM11.215,10l.732-.162.162.732-.732.162ZM9.784,9.083l.732-.162.162.732-.732.162Z"
          transform="translate(-3.3 -5.049)"
          fill="#fff"
        />
      </g>
    </svg>

    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="52"
      height="12"
      class="flex mx-auto"
      viewBox="0 0 44 12"
    >
      <text
        id="POPULAR"
        transform="translate(22 9)"
        fill="#000"
        font-size="9"
        font-family="Helvetica"
        letter-spacing="0.022em"
      >
        <tspan x="-21.692" y="0">POPULAR</tspan>
      </text>
    </svg>
  </div>
  <!-- End Popular -->

  <!-- New -->
  <div
    v-if="showIcon('new')"
    class="flex min-w-10 items-center text-white py-2"
  >
    <SparklesIcon class="h-4 w-4 flex mx-auto" />
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="52"
      height="12"
      class="flex mx-auto"
      viewBox="0 0 44 12"
    >
      <text
        id="POPULAR"
        transform="translate(22 9)"
        fill="#000"
        font-size="9"
        font-family="Helvetica"
        letter-spacing="0.022em"
      >
        <tspan x="-21.692" y="0">NEW</tspan>
      </text>
    </svg>
  </div>
  <!-- End New -->

  <!-- Promotions -->
  <div
    v-if="showIcon('promotions')"
    class="flex justify-between items-center space-x-1 py-2"
  >
    <GiftIcon class="h-4 w-4 text-white" />
    <span
      class="flex text-[0.5rem] tracking-widest text-white font-black uppercase"
    >
      Promotions</span
    >
  </div>
  <!-- End Promotions -->

  <!-- Promotions -->
  <div
    v-if="showIcon('affiliate')"
    class="flex justify-between items-center space-x-1 py-2"
  >
    <UserPlusIcon class="h-4 w-" />
    <span
      class="flex text-[0.5rem] tracking-widest text-black font-black uppercase"
    >
      Affiliate</span
    >
  </div>
  <!-- End Promotions -->
</template>
