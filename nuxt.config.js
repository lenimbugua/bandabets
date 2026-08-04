import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2026-08-04",
  devtools: { enabled: true },

  modules: ["@pinia/nuxt", "pinia-plugin-persistedstate/nuxt", "@vueuse/nuxt"],

  vite: {
    plugins: [tailwindcss()],
  },
});
