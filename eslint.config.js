import prettierConfig from "eslint-config-prettier";
// @nuxt/eslint (nuxt.config.js `modules`) generates this file via `nuxt
// prepare`/`nuxt dev`/`nuxt build`. It carries the full set of Nuxt/Vue
// auto-import globals (definePageMeta, useSeoHead, defineStore,
// storeToRefs, useRuntimeConfig, sendRedirect, defineEventHandler, ...) so
// ESLint stops flagging every auto-import as `no-undef`. It also includes
// Nuxt's own recommended Vue rule set, which we layer our project rules on
// top of below.
import { withNuxt } from "./.nuxt/eslint.config.mjs";

export default withNuxt(
  {
    // Batch G: `src/**` ignore removed now that `src/` is deleted entirely
    // (see docs/superpowers/plans/2026-08-04-nuxt-migration-phase-2.md §11).
    ignores: ["dist/**", "node_modules/**", "siakabet-ui/**", "docker/**"],
  },
  prettierConfig,
  {
    rules: {
      "vue/no-unused-vars": "error",
      "vue/multi-word-component-names": "off",
      "vue/first-attribute-linebreak": "off",
      "no-unused-vars": [
        "error",
        {
          caughtErrors: "none",
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
    },
  },
);
