<script setup>
import { useLaunchCasinoGame } from "../composables/useLaunchCasinoGame";

const { initGame } = useLaunchCasinoGame();
</script>

<template>
  <div class="error-container">
    <div class="error-content">
      <!-- Icon -->
      <div class="error-icon-wrap">
        <div class="error-icon-bg" />
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="error-icon">
          <path fill-rule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clip-rule="evenodd" />
        </svg>
      </div>

      <!-- Text -->
      <h2 class="error-title">Failed to launch game</h2>
      <p class="error-desc">Something went wrong while loading. Please try again or go back.</p>

      <!-- Actions -->
      <div class="error-actions">
        <button class="error-btn error-btn--secondary" @click="$router.go(-1)">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-3.5 h-3.5">
            <path fill-rule="evenodd" d="M14 8a.75.75 0 0 1-.75.75H4.56l3.22 3.22a.75.75 0 1 1-1.06 1.06l-4.5-4.5a.75.75 0 0 1 0-1.06l4.5-4.5a.75.75 0 0 1 1.06 1.06L4.56 7.25h8.69A.75.75 0 0 1 14 8Z" clip-rule="evenodd" />
          </svg>
          Go back
        </button>
        <button class="error-btn error-btn--primary" @click="initGame">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-3.5 h-3.5">
            <path fill-rule="evenodd" d="M13.836 2.477a.75.75 0 0 1 .75.75v3.182a.75.75 0 0 1-.75.75h-3.182a.75.75 0 0 1 0-1.5h1.37l-.84-.841a4.5 4.5 0 0 0-7.08.932.75.75 0 0 1-1.3-.75 6 6 0 0 1 9.44-1.242l.842.84V3.227a.75.75 0 0 1 .75-.75Zm-.911 7.5A.75.75 0 0 1 13.199 11a6 6 0 0 1-9.44 1.241l-.84-.84v1.371a.75.75 0 0 1-1.5 0V9.591a.75.75 0 0 1 .75-.75H5.35a.75.75 0 0 1 0 1.5H3.98l.841.841a4.5 4.5 0 0 0 7.08-.932.75.75 0 0 1 1.025-.273Z" clip-rule="evenodd" />
          </svg>
          Try again
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ── Light mode (default) ── */
.error-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  min-height: 60vh;
  padding: 24px;
}

.error-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 320px;
}

.error-icon-wrap {
  position: relative;
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.error-icon-bg {
  position: absolute;
  inset: 0;
  border-radius: 16px;
  background: color-mix(in oklch, var(--destructive) 10%, transparent);
  border: 1px solid color-mix(in oklch, var(--destructive) 15%, transparent);
}

.error-icon {
  position: relative;
  width: 32px;
  height: 32px;
  color: var(--destructive);
}

.error-title {
  font-size: 1.0625rem;
  font-weight: 700;
  color: var(--foreground);
  margin-bottom: 8px;
}

.error-desc {
  font-size: 0.8125rem;
  color: oklch(0% 0 0 / 0.45);
  line-height: 1.5;
  margin-bottom: 24px;
}

.error-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.error-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 18px;
  border-radius: 10px;
  font-size: 0.8125rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  border: none;
}

.error-btn--secondary {
  background: oklch(0% 0 0 / 0.04);
  color: oklch(0% 0 0 / 0.6);
  border: 1px solid oklch(0% 0 0 / 0.1);
}

.error-btn--secondary:hover {
  background: oklch(0% 0 0 / 0.08);
  color: oklch(0% 0 0 / 0.85);
}

.error-btn--primary {
  background: var(--primary);
  color: var(--primary-foreground);
}

.error-btn--primary:hover {
  background: var(--brand-bright);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px color-mix(in oklch, var(--primary) 30%, transparent);
}

/* ── Dark mode ── */
[data-theme="dark"] .error-icon-bg {
  background: color-mix(in oklch, var(--destructive) 8%, transparent);
  border-color: color-mix(in oklch, var(--destructive) 12%, transparent);
}
[data-theme="dark"] .error-icon {
  color: var(--destructive);
}
[data-theme="dark"] .error-title {
  color: white;
}
[data-theme="dark"] .error-desc {
  color: oklch(100% 0 0 / 0.4);
}
[data-theme="dark"] .error-btn--secondary {
  background: oklch(100% 0 0 / 0.06);
  color: oklch(100% 0 0 / 0.7);
  border-color: oklch(100% 0 0 / 0.08);
}
[data-theme="dark"] .error-btn--secondary:hover {
  background: oklch(100% 0 0 / 0.1);
  color: white;
}
</style>
