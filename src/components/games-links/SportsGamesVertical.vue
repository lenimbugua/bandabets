<script setup>
import SecondaryNavIcons from "@/components/SecondaryNavIcons.vue";
import { useSports } from "@/composables/useSports";
import { useModalStore } from "@/stores/modal";
import { ChevronRightIcon } from "@heroicons/vue/20/solid";

const { fetchMatches, games } = useSports();

const { closeModal } = useModalStore();

function getMatches(sportId, name, icon, goToSports) {
  fetchMatches(sportId, name, icon, goToSports);
  closeModal();
}
</script>
<template>
  <div
    v-for="link in games"
    :key="link.name"
    class="text-center text-slate-500 hover:text-muted-foreground cursor-pointer"
    @click="getMatches(link.id, link.name, link.icon, true)"
  >
    <RowColorWrapper>
      <div class="p-2 flex justify-between w-full items-center">
        <div class="flex items-center space-x-2">
          <div
            :class="link.class"
            class="w-10 h-10 flex flex-col items-center rounded-lg shadow-sm hover:opacity-80"
          >
            <div
              class="relative flex items-center justify-center rounded-full h-full w-full"
            >
              <SecondaryNavIcons :icon="link.icon" />
            </div>
          </div>
          <div
            class="text-xs font-medium text-ellipsis whitespace-nowrap overflow-hidden text-slate-700 dark:text-slate-300"
          >
            {{ link.name }}
          </div>
        </div>
        <div>
          <ChevronRightIcon class="w-6 h-6 fill-current text-slate-500 dark:text-slate-400" />
        </div>
      </div>
    </RowColorWrapper>
  </div>
</template>
