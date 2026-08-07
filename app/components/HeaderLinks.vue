<script setup>
import ThemeSwitch from "./ThemeSwitch.vue";
import { useLoginStore } from "../stores/login";
import HeaderProfile from "./HeaderProfile.vue";
import { useModalStore } from "@/stores/modal";
import { useModalTypes } from "@/composables/useModalTypes";
import { storeToRefs } from "pinia";
import TopModeSwitch from "./TopModeSwitch.vue";
import HeaderNavLinks from "./HeaderNavLinks.vue";
import { useAppMode } from "@/composables/useAppMode";

const { token } = storeToRefs(useLoginStore());
const { drawer, search } = useModalTypes();
const { openModal } = useModalStore();
const { currentMode } = useAppMode();
</script>

<template>
  <header
    class="sticky top-0 z-60 backdrop-blur-xl bg-surface-coffee/95 border-b border-border/50"
  >
    <!-- ========== DESKTOP ========== -->
    <div
      class="hidden lg:flex max-w-420 mx-auto px-4 h-16 items-center justify-between gap-3"
    >
      <!-- Left: Logo (hidden in casino mode — sidebar carries it) + mode switch -->
      <div class="flex items-center gap-3 shrink-0">
        <TheLogo v-if="currentMode !== 'casino'" />
        <TopModeSwitch class="hidden sm:inline-flex shrink-0" />
      </div>

      <!-- Centre: Main nav (Home / Sports / Aviator / …) -->
      <HeaderNavLinks />

      <!-- Right: Auth + Theme -->
      <div class="flex items-center gap-2 shrink-0 pl-4">
        <template v-if="!token">
          <RouterLink
            :to="{ name: 'login' }"
            class="text-sm font-bold text-brand-bright bg-brand-bright/5 hover:bg-brand-bright/10 border border-brand-bright/40 px-4 py-1.5 rounded-lg transition-colors duration-150"
          >
            Login
          </RouterLink>
          <RouterLink
            :to="{ name: 'signup' }"
            class="text-sm font-extrabold uppercase tracking-wide text-bet-foreground bg-bet hover:bg-bet-hover px-4 py-1.5 rounded-lg shadow-sm transition-colors duration-150"
          >
            Join Now
          </RouterLink>
        </template>

        <template v-if="token">
          <HeaderProfile />
        </template>

        <div class="w-px h-5 bg-border/50"></div>
        <ThemeSwitch />
      </div>
    </div>

    <!-- ========== MOBILE ========== -->
    <div class="lg:hidden px-3 pt-1 pb-2.5">
      <!-- Row 1: Logo | Auth -->
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-1.5">
          <TheLogo />
        </div>

        <div class="flex items-center gap-2.5">
          <template v-if="!token">
            <RouterLink
              :to="{ name: 'login' }"
              class="text-sm font-bold text-foreground px-1.5 py-1.5 transition-colors duration-150 hover:text-selected"
            >
              Log In
            </RouterLink>
            <RouterLink
              :to="{ name: 'signup' }"
              class="text-sm font-bold text-bet-foreground bg-bet hover:bg-bet-hover rounded-full px-4 py-2 shadow-sm transition-colors duration-150"
            >
              Join Now
            </RouterLink>
          </template>

          <template v-if="token">
            <HeaderProfile />
          </template>
        </div>
      </div>

      <!-- Row 2: Search bar (opens SearchModal) + menu -->
      <div class="mt-2 flex items-center gap-2">
        <button
          type="button"
          aria-label="Search sport teams, football leagues and games"
          class="flex flex-1 min-w-0 items-center gap-2.5 rounded-full bg-surface-elevated px-4 py-2.5 text-left transition-colors duration-150 hover:bg-accent"
          @click="openModal(search)"
        >
          <Icon name="tabler:search" class="w-5 h-5 shrink-0 text-muted-foreground" />
          <span class="flex-1 truncate text-sm text-muted-foreground">
            Sport Team, Football League, Games
          </span>
          <span class="shrink-0 text-sm font-bold text-selected">Search</span>
        </button>
        <button
          type="button"
          aria-label="Open navigation menu"
          class="flex items-center justify-center w-11 h-11 shrink-0 rounded-full bg-surface-elevated text-foreground transition-colors duration-150 hover:bg-accent"
          @click="openModal(drawer)"
        >
          <Icon name="tabler:layout-grid" class="w-5 h-5" />
        </button>
      </div>
    </div>


  </header>
</template>
