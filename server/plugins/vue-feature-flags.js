// ROOT CAUSE (prod-500-report.md has the full trace): pinia@4.0.2's shipped
// `dist/pinia.js` guards its devtools wiring with:
//
//   (process.env.NODE_ENV !== "production" || __VUE_PROD_DEVTOOLS__) && ...
//
// `__VUE_PROD_DEVTOOLS__` is a Vue "feature flag" meant to be replaced by a
// bundler's `define` at build time (Vite/webpack do this for anything that
// passes through their bundler — see https://vuejs.org/guide/best-practices/
// production-deployment.html#feature-flags). Nitro externalizes `pinia`
// instead of inlining it: `.output/server/node_modules/pinia/dist/pinia.js`
// ships as the RAW, un-bundled npm file, so no `define` step ever touches
// it. When `NODE_ENV=production`, the left side of that `||` is `false`, so
// JS must evaluate `__VUE_PROD_DEVTOOLS__` — an identifier nothing in the
// Node process has ever declared — and throws `ReferenceError:
// __VUE_PROD_DEVTOOLS__ is not defined` out of `createPinia()`. That throw
// happens inside `applyPlugins()`'s plugin loop, which swallows the error
// into `nuxtApp.payload.error` and lets rendering continue rather than
// aborting — so the pinia plugin's `setup()` never finishes, `nuxtApp.$pinia`
// is never provided, and the *unrelated-looking* crash surfaces later, in
// @pinia/nuxt's own `app:rendered` hook, as "Cannot read properties of
// undefined (reading 'state')". Only reproduces under NODE_ENV=production
// because that's the only condition under which the `||` doesn't
// short-circuit before touching the undefined global.
//
// Fix: declare the flag as a real global before any request-handling code
// runs, exactly as Vue's docs prescribe for non-bundler consumption. A Nitro
// server plugin runs once at server startup, before the HTTP listener
// accepts any request and long before `pinia` is ever dynamically imported
// per-request — so this is process-wide, one-time setup, not per-request
// state (no cross-request/user leak risk). Values match what Nuxt's own
// Vite `define` would have supplied for a bundled build.
export default defineNitroPlugin(() => {
  globalThis.__VUE_PROD_DEVTOOLS__ ??= false;
  globalThis.__VUE_OPTIONS_API__ ??= true;
  globalThis.__VUE_PROD_HYDRATION_MISMATCH_DETAILS__ ??= false;
});
