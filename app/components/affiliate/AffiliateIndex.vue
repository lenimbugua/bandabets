<script setup>
import { storeToRefs } from "pinia";
import { onBeforeUnmount } from "vue";
import { useAffiliateStore } from "../../stores/affiliate";
import MobileFooterV2 from "../mobile/MobileFooterV2.vue";
import AffiliateCommission from "./AffiliateCommission.vue";
import AffiliateSwiper from "./AffiliateSwiper.vue";
import AffiliateTabs from "./AffiliateTabs.vue";
import HowToAffiliate from "./HowToAffiliate.vue";
import ShareButton from "./ShareButton.vue";

const { fetchAffiliateUrl, fetchAffiliateEarnings, reset } =
  useAffiliateStore();
const { pending, earnings } = storeToRefs(useAffiliateStore());
fetchAffiliateUrl();
fetchAffiliateEarnings();

onBeforeUnmount(() => {
  reset();
});
</script>

<template>
  <HeaderLinks />
  <BetsLoader v-if="pending" />

  <div
    v-else
    class="bg-background min-h-screen max-w-[1680px] mx-auto px-4 py-4 md:px-6 md:py-6"
  >
    <!-- Hero carousel -->
    <AffiliateSwiper />

    <div v-if="earnings" class="flex flex-col md:flex-row gap-5 md:gap-6">
      <!-- Sidebar: How it works + FAQs -->
      <aside class="md:w-80 lg:w-96 shrink-0 space-y-4 order-2 md:order-1">
        <HowToAffiliate />
        <AffiliateFAQs />
      </aside>

      <!-- Main content -->
      <main class="flex-1 space-y-4 order-1 md:order-2">
        <MyEarnings />
        <AffiliateCommission />
        <AffiliateCopyToClipboard />
        <AffiliateSocials />
        <AffiliateTabs />
      </main>
    </div>
  </div>

  <ShareButton />
  <MobileFooterV2 />
  <Footer />
</template>
