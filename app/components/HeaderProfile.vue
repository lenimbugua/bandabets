<script setup>
import { useRouter } from "vue-router";
import { useProfileStore } from "@/stores/profile";
import { useLoginStore } from "@/stores/login";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import userIcon from "@/assets/icons/user.svg";

const router = useRouter();
const { msisdn, token } = storeToRefs(useLoginStore());

const { balance } = storeToRefs(useProfileStore());

const { getProfileInfo } = useProfileStore();

onMounted(() => {
  getProfileInfo(false);
});
function goToProfile() {

  if (!token.value && !msisdn.value) {
    router.push({ name: "login" });
    return;
  }
  router.push({ name: "profile" });
}
</script>
<template>
  <div v-if="balance" role="button" aria-label="View account balance and profile" tabindex="0" @click="goToProfile">
    <!-- Desktop -->
    <div class="hidden md:flex items-center gap-2.5 cursor-pointer group">
      <div class="flex flex-col items-end">
        <span class="text-[0.65rem] leading-none font-medium text-gray-400 dark:text-white/35 uppercase tracking-wider">Balance</span>
        <span class="text-[0.85rem] leading-tight font-bold text-gray-900 dark:text-white tabular-nums">
          {{ balance }}
        </span>
      </div>
      <div class="relative">
        <div class="w-8 h-8 rounded-full bg-gradient-to-br from-brand-bright/20 to-brand-bright/10 dark:from-brand-bright/15 dark:to-brand-bright/8 p-px group-hover:from-brand-bright/40 group-hover:to-brand-bright/25 transition-all duration-200">
          <div class="w-full h-full rounded-full bg-white dark:bg-background flex items-center justify-center">
            <img :src="userIcon" alt="Profile" class="w-5 h-5 object-contain" />
          </div>
        </div>
        <div class="absolute -bottom-px -right-px w-2.5 h-2.5 bg-brand-bright rounded-full border-2 border-white dark:border-background"></div>
      </div>
    </div>
    <!-- Mobile -->
    <div class="md:hidden mr-2 flex items-center gap-1.5">
      <div class="relative">
        <div class="w-7 h-7 rounded-full bg-gradient-to-br from-brand-bright/20 to-brand-bright/10 p-px">
          <div class="w-full h-full rounded-full bg-white dark:bg-background flex items-center justify-center">
            <img :src="userIcon" alt="Profile" class="w-4 h-4 object-contain" />
          </div>
        </div>
        <div class="absolute -bottom-px -right-px w-2 h-2 bg-brand-bright rounded-full border-[1.5px] border-white dark:border-background"></div>
      </div>
      <span class="text-xs font-bold text-gray-800 dark:text-white/80 tabular-nums">
        {{ balance }}
      </span>
    </div>
  </div>
</template>
