<script setup>
import { useShareToSocials } from "@/composables/useShareToSocials";
import { ref } from "vue";
import CopyShareLink from "./CopyShareLink.vue";
import SocialsIcons from "./SocialsIcons.vue";

const props = defineProps({
  shareUrl: {
    type: String,
    required: true,
  },
  shareText: {
    type: String,
    required: true,
  },
});

const { facebook, twitter, whatsapp, telegram, generateShareLink } =
  useShareToSocials();

const socials = ref([
  {
    name: twitter,
    icon: twitter,
  },
  {
    name: telegram,
    icon: telegram,
  },
  {
    name: facebook,
    icon: facebook,
  },
  {
    name: whatsapp,
    icon: whatsapp,
  },
]);

const share = (platform) => {
  const shareLink = generateShareLink(
    platform,
    props.shareUrl,
    props.shareText
  );
  window.open(shareLink, "_blank");
};
</script>

<template>
  <div class="flex justify-between p-2 md:p-4">
    <div
      v-for="social in socials"
      :key="social.name"
      class="cursor-pointer flex flex-col items-center"
      @click="share(social.name)"
    >
      <SocialsIcons :icon="social.icon" />
      <span class="text-gray-600 dark:text-slate-400 text-xs font-medium capitalize mt-2">{{
        social.name
      }}</span>
    </div>
    <CopyShareLink :share-url="shareUrl" />
  </div>
</template>
