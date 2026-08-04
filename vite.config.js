import { mkdirSync, writeFileSync } from "fs";
import { resolve } from "path";
import { fileURLToPath, URL } from "url";
import { defineConfig, loadEnv } from "vite";
import tailwindcss from "@tailwindcss/vite";
import eslintPlugin from "vite-plugin-eslint2";

import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";

import AutoImport from "unplugin-auto-import/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

// Serves /version.json in dev, writes it to dist/ on build
function versionJsonPlugin() {
  let version = "unknown";
  return {
    name: "version-json",
    configResolved(config) {
      const env = loadEnv(config.mode, process.cwd(), "VITE_");
      version = env.VITE_APP_VERSION || "unknown";
    },
    // Dev server: intercept /version.json requests
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url?.startsWith("/version.json")) {
          res.setHeader("Content-Type", "application/json");
          res.setHeader("Cache-Control", "no-store");
          res.end(JSON.stringify({ version }));
          return;
        }
        next();
      });
    },
    // Build: write version.json to dist/
    closeBundle() {
      const outDir = resolve(process.cwd(), "dist");
      mkdirSync(outDir, { recursive: true });
      writeFileSync(
        resolve(outDir, "version.json"),
        JSON.stringify({ version }),
      );
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [
    tailwindcss(),
    vue(),
    eslintPlugin(),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    AutoImport({
      imports: [
        "vue",
        {
          "@vueuse/core": [
            // named imports
            "useMouse", // import { useMouse } from '@vueuse/core',
            "useDark",
            // alias
            ["useFetch", "useMyFetch"], // import { useFetch as useMyFetch } from '@vueuse/core',
          ],
          axios: [
            // default imports
            ["default", "axios"], // import { default as axios } from 'axios',
          ],

          pinia: ["storeToRefs"],
        },
      ],
      resolvers: [ElementPlusResolver()],
      dirs: ["./composables/**"],
      vueTemplate: true,
    }),
    versionJsonPlugin(),
  ],
  esbuild: {
    drop: process.env.NODE_ENV === "production" ? ["console", "debugger"] : [],
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
