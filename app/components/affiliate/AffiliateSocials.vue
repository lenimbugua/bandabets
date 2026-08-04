<script setup>
import ShareToSocials from "@/components/community-bets/ShareToSocials.vue";
import { useShareToSocials } from "@/composables/useShareToSocials";
import { useAffiliateStore } from "@/stores/affiliate";
import { storeToRefs } from "pinia";

const { affiliateText } = useShareToSocials();
const { affiliateUrl } = storeToRefs(useAffiliateStore());
</script>

<template>
  <div class="bg-card rounded-xl p-5 mt-3 space-y-3">
    <div>
      <h3 class="text-base font-semibold text-foreground">Share on Socials</h3>
      <p class="text-sm text-muted-foreground mt-0.5">
        Invite friends on your favorite social networks.
      </p>
    </div>
    <ShareToSocials :share-url="affiliateUrl" :share-text="affiliateText" />
  </div>
</template>
