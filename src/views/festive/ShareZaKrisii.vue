<script setup lang="ts">
import HeaderLinks from "../../components/HeaderLinks.vue";
import { useAffiliateV2Store } from "../../stores/affiliate-v2";
import FestiveTabs from "./FestiveTabs.vue";
import HowToWin from "./HowToWin.vue";
import ShareButton from "./ShareButton.vue";
const { initAffiliate } = useAffiliateV2Store();
initAffiliate();
</script>

<template>
  <h1 class="sr-only">Share za Krisii na Mabeste – Referral Promo | Naibet</h1>
  <HeaderLinks />
  <div
    class="min-h-dvh max-w-4xl mx-auto bg-white dark:bg-background text-white font-sans selection:bg-gold-bright selection:text-primary-foreground relative overflow-hidden"
  >
    <section
      class="relative z-10 container mx-auto px-2 mt-2 lg:mt-4 mb-16 text-center"
    >
      <div class="relative mb-2">
        <div
          class="backdrop-blur-lg rounded-2xl px-4 border border-red-500 shadow-2xl overflow-clip mb-2"
          style="position: relative; padding-top: 24.242424242424242%"
        >
          <iframe
            src="https://customer-94675ubg5swbpb8a.cloudflarestream.com/0763ff7194b78f73b4391a63edd0127f/iframe?muted=true&preload=true&loop=true&autoplay=true&controls=false&poster=https%3A%2F%2Fcustomer-94675ubg5swbpb8a.cloudflarestream.com%2F0763ff7194b78f73b4391a63edd0127f%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600"
            loading="lazy"
            class="backdrop-blur-lg rounded-2xl overflow-clip"
            style="
              border: none;
              position: absolute;
              top: 0;
              left: 0;
              height: 100%;
              width: 100%;
            "
            allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
            allowfullscreen="true"
          ></iframe>
        </div>
      </div>

      <HowToWin />
      <FestiveTabs />
    </section>

    <ShareButton />
  </div>
  <MobileFooterV2 />
</template>
