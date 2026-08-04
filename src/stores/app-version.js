import { defineStore } from "pinia";

const LS_RELOAD_TS = "app_reload_ts";
const LS_RELOAD_COUNT = "app_reload_count";
const LS_RELOAD_VERSION = "app_reload_target";

export const useAppVersionStore = defineStore("app-version-store", {
  state: () => ({
    updating: false,
  }),

  actions: {
    /**
     * Cache-busting reload that forces WebView to fetch fresh assets.
     * Appends a unique query param so the WebView HTTP cache is bypassed.
     */
    safeReload() {
      const url = new URL(window.location.href);
      url.searchParams.set("_v", Date.now());
      window.location.replace(url.toString());
    },

    /**
     * Check if we're allowed to reload:
     * - At least 10s since last reload (prevents rapid loops)
     * - Max 2 reload attempts per version (prevents infinite loops when cache can't be busted)
     */
    canReload(targetVersion) {
      const lastTs = Number(localStorage.getItem(LS_RELOAD_TS) || 0);
      const count = Number(localStorage.getItem(LS_RELOAD_COUNT) || 0);
      const lastTarget = localStorage.getItem(LS_RELOAD_VERSION);

      // If targeting a different version, reset the counter
      if (lastTarget !== targetVersion) return true;

      // Max 2 attempts for the same version — if still doesn't match, cache is stuck
      if (count >= 2) return false;

      // Cooldown: at least 10s between reloads
      if (lastTs && Date.now() - lastTs < 10000) return false;

      return true;
    },

    markReload(targetVersion) {
      const lastTarget = localStorage.getItem(LS_RELOAD_VERSION);
      const count = Number(localStorage.getItem(LS_RELOAD_COUNT) || 0);

      localStorage.setItem(LS_RELOAD_TS, String(Date.now()));
      localStorage.setItem(LS_RELOAD_VERSION, targetVersion);

      // Reset counter if targeting a new version, otherwise increment
      localStorage.setItem(
        LS_RELOAD_COUNT,
        String(lastTarget === targetVersion ? count + 1 : 1),
      );
    },

    async clearAppCaches() {
      try {
        // Unregister all service workers so they don't serve stale assets
        if (navigator.serviceWorker) {
          const registrations =
            await navigator.serviceWorker.getRegistrations();
          await Promise.all(registrations.map((r) => r.unregister()));
        }
        // Clear all Cache Storage entries
        if (window.caches) {
          const keys = await caches.keys();
          await Promise.all(keys.map((k) => caches.delete(k)));
        }
      } catch (e) {
        console.warn("Cache cleanup skipped", e);
      }
    },

    async checkVersion() {
      try {
        const res = await fetch(`/version.json?_t=${Date.now()}`, {
          cache: "no-store",
        });

        if (!res.ok) return;

        const { version: latest } = await res.json();
        if (!latest) return;

        const current = import.meta.env.VITE_APP_VERSION;
        if (!current) return;

        if (latest === current) {
          // Version matches — clear any reload tracking
          localStorage.removeItem(LS_RELOAD_TS);
          localStorage.removeItem(LS_RELOAD_COUNT);
          localStorage.removeItem(LS_RELOAD_VERSION);
          return;
        }

        // Version mismatch — attempt cache-busting reload
        if (!this.canReload(latest)) return;

        this.updating = true;
        this.markReload(latest);
        await this.clearAppCaches();
        this.safeReload();
      } catch (e) {
        console.warn("Version check failed", e);
      }
    },
  },
  persist: false,
});
