# Nuxt 4 SSR Migration — Phase 1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Stand up a Nuxt 4 SSR walking skeleton where six SEO-critical routes render real HTML on the server, with a cookie-backed session and no hydration or theme flash.

**Architecture:** The existing `src/` tree moves wholesale to `app/`, Nuxt 4's default `srcDir`. Because Nuxt aliases `@` to `srcDir`, the 583 `@/…` imports keep resolving untouched, and relative imports survive too except in pages that gain directory depth. The 1,078-line router is deleted and replaced by file-based pages, `definePageMeta`, and `routeRules`. Session state moves from localStorage to a cookie so the server can render authenticated UI correctly on first paint.

**Tech Stack:** Nuxt 4.5.1, Vue 3.5.40, Pinia 4.0.2 (`@pinia/nuxt` 1.0.1), `pinia-plugin-persistedstate` 4.7.1, Tailwind CSS 4.3.3 via `@tailwindcss/vite`, `@vueuse/nuxt` 14.4.0, axios 1.19.0. JavaScript only.

**Spec:** `docs/superpowers/specs/2026-08-04-nuxt-migration-design.md`

## Global Constraints

- **No TypeScript.** The project is JS-only; `components.json` records `"typescript": false`. Config files are `.js`, not `.ts`.
- **`src/style.css` content is never edited.** It is a 44KB four-layer design system specified by `DESIGN.md`. It moves path only.
- **Tailwind 4 uses `@tailwindcss/vite`, never `@nuxtjs/tailwindcss`.** The latter is a Tailwind 3 module and breaks CSS-first config.
- **Delete, do not port:** `@unhead/vue`, `unplugin-auto-import`, `unplugin-vue-components`. Nuxt provides all three natively.
- **Infrastructure is out of scope.** No Dockerfile, Nginx, Helm or CI. Task 12 writes a handoff note only.
- **Every task ends with a runnable verification command and a commit.** The project has no test framework and this plan does not add one; verification is by build output, HTTP response inspection, and console warnings.
- **Work happens on branch `nuxt-migration`.** Baseline `main` @ `81ae85f` is the revert point.
- **Use `git mv` for all relocations** so history follows the files.

---

### Task 1: Nuxt scaffold, dependencies, and first boot

**Files:**
- Create: `nuxt.config.js`
- Create: `app/app.vue` (temporary placeholder, replaced in Task 8)
- Modify: `package.json`
- Delete: `vite.config.js`, `index.html`
- Modify: `.gitignore`

**Interfaces:**
- Consumes: nothing.
- Produces: a booting Nuxt app; `nuxt.config.js` exporting `defineNuxtConfig({...})` which every later task extends.

- [ ] **Step 1: Remove Vite-era dependencies**

```bash
pnpm remove @unhead/vue unplugin-auto-import unplugin-vue-components \
  @vitejs/plugin-vue vite vite-plugin-eslint2 vue-router
```

- [ ] **Step 2: Add Nuxt and modules**

```bash
pnpm add nuxt@4.5.1 pinia@4.0.2 @pinia/nuxt@1.0.1 \
  pinia-plugin-persistedstate@4.7.1 swiper@14.0.7
pnpm add -D @vueuse/nuxt@14.4.0
```

`@tailwindcss/vite`, `tailwindcss`, `@vueuse/core`, `axios` and the rest are already present and stay.

- [ ] **Step 3: Replace the `scripts` block in `package.json`**

```json
  "scripts": {
    "dev": "nuxt dev --port 5079",
    "build": "nuxt build",
    "preview": "nuxt preview",
    "postinstall": "nuxt prepare"
  },
```

- [ ] **Step 4: Create `nuxt.config.js`**

```js
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2026-08-04",
  devtools: { enabled: true },

  modules: ["@pinia/nuxt", "pinia-plugin-persistedstate/nuxt", "@vueuse/nuxt"],

  vite: {
    plugins: [tailwindcss()],
  },
});
```

- [ ] **Step 5: Create the placeholder `app/app.vue`**

```vue
<template>
  <div>Nuxt boots</div>
</template>
```

- [ ] **Step 6: Remove the Vite entrypoints**

```bash
git rm vite.config.js index.html
```

`src/main.js` is NOT deleted yet — Task 7 and Task 8 read it for the plugin and root-component wiring. It is deleted in Task 8.

- [ ] **Step 7: Add Nuxt artifacts to `.gitignore`**

Already added at baseline (`.nuxt`, `.output`, `.data`, `.nitro`, `.cache`). Verify with:

```bash
grep -E '^\.(nuxt|output)$' .gitignore
```

Expected: both lines present. If missing, append them.

- [ ] **Step 8: Verify Nuxt boots**

```bash
pnpm install && pnpm dev
```

Expected: dev server starts on port 5079 and `curl -s localhost:5079 | grep "Nuxt boots"` returns the placeholder text. Stop the server.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "build: replace Vite with Nuxt 4.5.1 scaffold

Removes @unhead/vue, unplugin-auto-import and unplugin-vue-components;
Nuxt provides all three natively."
```

---

### Task 2: Relocate the source tree to `app/`

**Files:**
- Move: `src/components/` → `app/components/` (372 files)
- Move: `src/composables/` → `app/composables/` (59 files)
- Move: `src/stores/` → `app/stores/` (46 files)
- Move: `src/services/`, `src/lib/`, `src/utilities/`, `src/plugins/` → `app/…`
- Move: `src/assets/` → `app/assets/`
- Move: `src/style.css` → `app/assets/css/style.css`
- Retain in place: `src/views/`, `src/router/`, `src/App.vue`, `src/main.js`

**Interfaces:**
- Consumes: Task 1's `nuxt.config.js`.
- Produces: all shared code under `app/`, reachable as `@/components/…`, `@/stores/…`, `@/composables/…`.

**Why the imports mostly survive:** Nuxt aliases both `@` and `~` to `srcDir` (`app/`), so all 583 `@/…` imports resolve unchanged. Relative imports also survive because directory depth is preserved: `app/components/X.vue` referencing `../stores/y` resolves to `app/stores/y`, exactly as `src/components/X.vue` did. Only files that gain depth break — that is pages, handled in Task 10.

- [ ] **Step 1: Move the shared directories**

```bash
mkdir -p app/assets/css
git mv src/components app/components
git mv src/composables app/composables
git mv src/stores app/stores
git mv src/services app/services
git mv src/lib app/lib
git mv src/utilities app/utilities
git mv src/plugins app/plugins
git mv src/assets/* app/assets/ 2>/dev/null || true
git mv src/style.css app/assets/css/style.css
```

- [ ] **Step 2: Verify nothing references the old paths**

```bash
grep -rn "from \"@/\.\./" app/ | head
grep -rn "src/" app/ --include='*.vue' --include='*.js' | grep -v "srcset" | head
```

Expected: no output from either. `srcset` is excluded because it is an HTML image attribute, not a path import.

- [ ] **Step 3: Verify nothing relied on auto-imported `axios`**

The old `AutoImport` config injected `axios` as a global. Nuxt does not. Scanned
at baseline: every axios user already imports it explicitly, so removing
`unplugin-auto-import` in Task 1 is safe. Re-confirm after the move:

```bash
for f in $(grep -rl '\baxios\b' app --include='*.js' --include='*.vue'); do
  grep -q 'import axios' "$f" || echo "MISSING IMPORT: $f"
done
echo "scan complete"
```

Expected: only `scan complete`. Any file listed needs
`import axios from "axios";` added at the top.

`storeToRefs` and the `@vueuse/core` functions the old config injected are still
auto-imported, by `@pinia/nuxt` and `@vueuse/nuxt` respectively.

- [ ] **Step 4: Verify the tree landed**

```bash
for d in components composables stores services lib utilities plugins; do
  printf "%-12s %s\n" "$d" "$(find app/$d -type f | wc -l | tr -d ' ')"
done
test -f app/assets/css/style.css && echo "style.css OK"
```

Expected: components 372, composables 59, stores 46, and `style.css OK`.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "refactor: relocate shared source tree from src/ to app/

Nuxt 4 srcDir is app/, and @ aliases to it, so all 583 @/ imports and
depth-preserving relative imports resolve unchanged."
```

---

### Task 3: Design system, document head, and server-rendered theme

**Files:**
- Modify: `nuxt.config.js`

**Interfaces:**
- Consumes: `app/assets/css/style.css` from Task 2.
- Produces: global CSS loading, `app.head` defaults, and `data-theme="dark"` present in the server response.

**Why the theme matters:** `app/composables/useThemeSwitch.js` calls VueUse `useDark({ selector: "body", attribute: "data-theme" })`, and `data-theme` drives the entire four-layer token system. Rendered server-side without it, every page paints in the wrong theme until hydration. The current `App.vue` calls `switchToDark()` on `onBeforeMount`, so dark is the effective default and the server can emit it safely.

- [ ] **Step 1: Add `css`, `app.head` and body attributes to `nuxt.config.js`**

Add these keys to the existing `defineNuxtConfig` object:

```js
  css: ["~/assets/css/style.css"],

  app: {
    head: {
      htmlAttrs: { lang: "en", class: "scroll-smooth scrollbar-hide" },
      bodyAttrs: { "data-theme": "dark" },
      title: "Naibet Kenya – Bet on All Sports & Top Odds",
      meta: [
        { charset: "UTF-8" },
        {
          name: "viewport",
          content:
            "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
        },
        {
          name: "description",
          content:
            "Bet from as low as KSh 10 and win big with Naibet! Enjoy on sports bets, thrilling casino games, huge jackpots, and virtual sports action.",
        },
        {
          name: "keywords",
          content:
            "bet, betting, online betting, online sports betting, sports betting",
        },
        { name: "application-name", content: "Naibet" },
        { property: "og:site_name", content: "Naibet Kenya" },
        { property: "og:locale", content: "en_KE" },
        { property: "fb:pages", content: "524814560726004" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:site", content: "@NaibetKe" },
        {
          name: "theme-color",
          content: "#0a0f1a",
          media: "(prefers-color-scheme: dark)",
        },
        {
          name: "theme-color",
          content: "#f8fafc",
          media: "(prefers-color-scheme: light)",
        },
        { name: "msapplication-TileColor", content: "#121826" },
      ],
      link: [
        { rel: "icon", href: "/favicon.ico", sizes: "any" },
        { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
        { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" },
        { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" },
        { rel: "manifest", href: "/site.webmanifest" },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Montserrat:wght@600;700&family=Great+Vibes&display=swap",
        },
        { rel: "preconnect", href: "https://imagedelivery.net", crossorigin: "" },
        { rel: "preconnect", href: "https://storage.googleapis.com", crossorigin: "" },
      ],
    },
  },
```

Page-level `og:title`, `og:description`, `og:image`, `og:url`, `canonical` and `robots` are deliberately omitted here — Task 9 sets them per route so they are not duplicated.

- [ ] **Step 2: Put a Tailwind-styled element in `app/app.vue` to prove CSS loads**

```vue
<template>
  <div class="bg-card text-foreground p-4">
    <h1 class="text-headline-lg">Nuxt boots</h1>
  </div>
</template>
```

`bg-card`, `text-foreground` and `text-headline-lg` are all design-system tokens from `style.css`, so they only resolve if layers 2–4 loaded correctly.

- [ ] **Step 3: Verify theme and CSS in the server response**

```bash
pnpm dev &
sleep 8
curl -s localhost:5079 | grep -o 'data-theme="dark"'
curl -s localhost:5079 | grep -oE 'text-headline-lg|bg-card'
kill %1
```

Expected: `data-theme="dark"` printed, and the token classes present in the markup.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: load design system and emit data-theme server-side

Prevents a full-page theme flash, since data-theme drives every
design-system token."
```

---

### Task 4: Runtime config, API service keys, and the version route

**Files:**
- Modify: `nuxt.config.js`
- Modify: `app/services/API.js`
- Create: `server/routes/version.json.js`
- Create: `.env.example` entries are already correct; no change

**Interfaces:**
- Consumes: Task 1's config.
- Produces: `useRuntimeConfig().public.<key>` for all 33 settings, and `API(serviceKey)` returning a configured axios instance. Exported service-key names keep their existing identifiers: `matchesBaseURL`, `instantBaseURL`, `authBaseURL`, `betBaseURL`, `casinoBaseURL`, `virtualBaseURL`, `virtualLeaguesBaseURL`, `kironLiteBaseURL`, `affiliateBaseURL`, `cmsBaseURL`, `affiliateApiBaseURL`.

**Why call sites do not change:** all 97 usages across 27 files take the form `API(authBaseURL)` — verified by scan, none treat the value as a raw string. Redefining those exports from URLs to service keys, and resolving the key inside `API()`, therefore leaves every consumer untouched.

- [ ] **Step 1: Add `runtimeConfig` to `nuxt.config.js`**

```js
  runtimeConfig: {
    public: {
      appVersion: "",
      matchesUrl: "",
      instantUrl: "",
      authUrl: "",
      betUrl: "",
      casinoUrl: "",
      cmsUrl: "",
      virtualUrl: "",
      virtualLeaguesUrl: "",
      kironLiteUrl: "",
      affiliateUrl: "",
      affiliateApiUrl: "",
      geniusGameTrackerUrl: "",
      onesignalAppId: "",
      depositTax: "",
      withdrawTax: "",
      aviatorGameId: "",
      aviatrixGameId: "",
      footballxGameId: "",
      hakiLeagueGameId: "",
      hakiTurboGameId: "",
      kironJackpotGameId: "",
      jetxGameId: "",
      virtualGameId: "",
      crashRoyaleGameId: "",
      virtualSpinGameId: "",
      maestroGameId: "",
      paybillNo: "",
      tenantCode: "",
      propellerAid: "",
      propellerTid: "",
      livePollInterval: "",
      ussdActivateAccount: "",
    },
  },
```

Each key is overridden at server start by its `NUXT_PUBLIC_` env var — `matchesUrl` ← `NUXT_PUBLIC_MATCHES_URL`, and so on.

- [ ] **Step 2: Create a local `.env` for development**

Nuxt reads `NUXT_PUBLIC_*` from `.env` in dev. Translate the existing keys:

```bash
sed -E 's/^VITE_[[:space:]]*/NUXT_PUBLIC_/; s/^([A-Z_]+)[[:space:]]*=/\1=/' .env > .env.nuxt
mv .env.nuxt .env
head -5 .env
```

Expected: keys now read `NUXT_PUBLIC_APP_VERSION=`, `NUXT_PUBLIC_MATCHES_URL=` with values intact and no stray whitespace before `=`. `.env` is gitignored, so this is a local-only change.

- [ ] **Step 3: Regenerate `.env.example` from the renamed keys**

```bash
sed -E 's/=.*/=/' .env > .env.example
```

- [ ] **Step 4: Rewrite `app/services/API.js`**

```js
import axios from "axios";

// These are runtime-config keys, not URLs. `API()` resolves them at call
// time so the server can be reconfigured without a rebuild. Every call site
// passes them straight to API(), so the identifiers are unchanged.
export const matchesBaseURL = "matchesUrl";
export const instantBaseURL = "instantUrl";
export const authBaseURL = "authUrl";
export const betBaseURL = "betUrl";
export const casinoBaseURL = "casinoUrl";
export const virtualBaseURL = "virtualUrl";
export const virtualLeaguesBaseURL = "virtualLeaguesUrl";
export const kironLiteBaseURL = "kironLiteUrl";
export const affiliateBaseURL = "affiliateUrl";
export const cmsBaseURL = "cmsUrl";
export const affiliateApiBaseURL = "affiliateApiUrl";

export default (service = matchesBaseURL) => {
  const config = useRuntimeConfig();
  const baseURL = config.public[service];

  if (!baseURL) {
    throw new Error(
      `API(): no runtime config value for "${service}". ` +
        `Set NUXT_PUBLIC_${service.replace(/[A-Z]/g, (c) => "_" + c).toUpperCase()}.`,
    );
  }

  return axios.create({ baseURL });
};
```

- [ ] **Step 5: Create `server/routes/version.json.js`**

This replaces the custom `versionJsonPlugin` that was in `vite.config.js`.

```js
export default defineEventHandler((event) => {
  const { public: config } = useRuntimeConfig(event);
  setResponseHeader(event, "cache-control", "no-store");
  return { version: config.appVersion || "unknown" };
});
```

`useRuntimeConfig(event)` must be passed the event inside a Nitro handler; the
argument-less form is for Vue-side composables only.

- [ ] **Step 6: Replace `import.meta.env.VITE_*` in composables and stores**

40 usages sit outside `API.js`, all inside composable or store function bodies where `useRuntimeConfig()` is valid. Rewrite each as `useRuntimeConfig().public.<camelKey>`. For example, in `app/composables/useCasinoUtil.js`:

```js
export function useCasinoUtil() {
  const { public: config } = useRuntimeConfig();
  const aviatrixId = config.aviatrixGameId;
  const aviatorGameId = config.aviatorGameId;
  const jetXId = config.jetxGameId;
  const maestroGameId = config.maestroGameId;
  const crashRoyalGameId = config.crashRoyaleGameId;
  // …
}
```

Find every remaining site with:

```bash
grep -rn "import.meta.env" app/ server/
```

Expected after the rewrite: no output.

- [ ] **Step 7: Verify the version route and config resolution**

```bash
pnpm dev &
sleep 8
curl -s localhost:5079/version.json
kill %1
```

Expected: `{"version":"<value of NUXT_PUBLIC_APP_VERSION>"}`.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: move 33 env vars to runtimeConfig and add version route

API() now resolves service keys at call time, so all 97 existing
API(xBaseURL) call sites are unchanged and the server is reconfigurable
without a rebuild."
```

---

### Task 5: Pinia 4 and the store layer

**Files:**
- Modify: `app/stores/*.js` (46 files, as required by the migration guide)
- Modify: `nuxt.config.js`

**Interfaces:**
- Consumes: Task 2's relocated stores, Task 4's `API()`.
- Produces: all 46 stores resolving under `@pinia/nuxt` with `defineStore` and `storeToRefs` auto-imported.

**Risk:** this is a major version bump (3.0.4 → 4.0.2) across every store. Read the guide before editing; do not assume it is a no-op.

- [ ] **Step 1: Read the Pinia 4 migration guide**

```bash
pnpm view pinia@4.0.2 repository.url
```

Open the migration guide in the Pinia docs and note every breaking change that touches: `defineStore` option syntax, getters receiving `state`, `$patch`, plugin APIs, and `storeToRefs`. Write the applicable ones into the commit message in Step 6.

- [ ] **Step 2: Point `@pinia/nuxt` at the stores directory**

Add to `nuxt.config.js`:

```js
  pinia: {
    storesDirs: ["./app/stores/**"],
  },
```

- [ ] **Step 3: Remove now-redundant imports from stores**

`defineStore` and `storeToRefs` are auto-imported by `@pinia/nuxt`. Leaving the explicit imports is harmless but noisy; removing them proves auto-import works.

```bash
grep -rln 'from "pinia"' app/stores | head
```

Remove the `import { defineStore } from "pinia";` line from each file listed.

- [ ] **Step 4: Apply any breaking changes found in Step 1**

Work store by store. If Step 1 found no applicable breaking changes, record that explicitly rather than skipping the step silently.

- [ ] **Step 5: Verify every store still parses and the app builds**

```bash
pnpm build 2>&1 | tail -20
```

Expected: build completes and reports `.output` written. Any unresolved import or Pinia API error surfaces here.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: migrate 46 Pinia stores to Pinia 4 under @pinia/nuxt

Breaking changes applied: <list from Step 1, or 'none applicable'>."
```

---

### Task 6: Cookie-backed session

**Files:**
- Modify: `app/stores/login.js:212-214` (the `persist` block)
- Modify: the other 27 persisted stores' `persist` blocks — session-critical only, see Step 3
- Create: `app/plugins/auth-ssr.js`

**Interfaces:**
- Consumes: Task 5's Pinia setup.
- Produces: `useLoginStore().token` populated during SSR; `isAuthenticated` correct on the server.

- [ ] **Step 1: Switch `login.js` to cookie storage**

Replace the `persist` block at the end of `app/stores/login.js`:

```js
  persist: {
    storage: piniaPluginPersistedstate.cookies({
      maxAge: 60 * 60 * 24 * 30,
      sameSite: "lax",
      secure: true,
      path: "/",
    }),
    pick: ["token", "profileSid", "msisdn"],
  },
```

`piniaPluginPersistedstate` is auto-imported by the `pinia-plugin-persistedstate/nuxt` module. The cookie must stay JS-readable, so `httpOnly` is deliberately not set — this matches the spec's §3.1 decision and is equivalent in exposure to the localStorage it replaces.

- [ ] **Step 2: Verify the cookie is set on login and survives refresh**

```bash
pnpm dev &
sleep 8
curl -s -c /tmp/naibet-cookies.txt localhost:5079 >/dev/null
grep -c "" /tmp/naibet-cookies.txt
kill %1
```

Expected: the cookie jar exists. Full login verification is manual and happens in Task 12, Step 3, because it needs real credentials.

- [ ] **Step 3: Leave the other 27 persisted stores on localStorage**

Only `login.js` needs to be readable by the server. Betslip, theme preferences and the rest are client concerns; moving them to cookies would add weight to every HTTP request. Confirm nothing else reads auth state at SSR time:

```bash
grep -rln "isAuthenticated" app/stores | grep -v login.js
```

For each file listed, confirm it is only read inside actions or client-side lifecycle hooks, not at store-definition time.

- [ ] **Step 4: Confirm auth headers work under SSR without changing `API.js`**

Spec §6 item 3 asked for `API.js` to read the token itself. That turns out to be
unnecessary: all 35 `Authorization` sites already build the header at the call
site from store state, e.g. `` Authorization: `Bearer ${this.token}` `` inside
`login.js`. Once the store is cookie-hydrated (Step 1), `this.token` is populated
on the server too, so those call sites work unmodified.

```bash
grep -rn "Authorization" app/ --include='*.js' --include='*.vue' | wc -l
grep -rn "Authorization" app/ --include='*.js' --include='*.vue' \
  | grep -v "this\.token" | grep -v "token" || echo "all sites read token from store state"
```

Expected: 35 sites, and the second command confirms none source the token from
`localStorage` directly. Any that do must be switched to store state.

- [ ] **Step 5: Create `app/plugins/auth-ssr.js`**

```js
export default defineNuxtPlugin(() => {
  // persistedstate rehydrates the login store from the cookie on both server
  // and client. Touch the store during plugin init so SSR-rendered markup
  // reflects the real auth state instead of a logged-out default.
  const login = useLoginStore();
  return { provide: { authReady: Boolean(login.token) } };
});
```

- [ ] **Step 6: Verify the build still passes**

```bash
pnpm build 2>&1 | tail -20
```

Expected: build completes, `.output` written.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: move session token from localStorage to a cookie

The server cannot read localStorage, so retaining it meant every page
rendered logged-out and swapped after hydration."
```

---

### Task 7: Client-only plugins

**Files:**
- Rename: `app/plugins/mixpanel.js` → `app/plugins/mixpanel.client.js`
- Rename: `app/plugins/onesignal.js` → `app/plugins/onesignal.client.js`
- Create: `app/plugins/propeller-ads.client.js`

**Interfaces:**
- Consumes: Task 4's `useRuntimeConfig`.
- Produces: `useNuxtApp().$mixpanel`, replacing the Vue 2-style `app.config.globalProperties.$mixpanel`.

- [ ] **Step 1: Rewrite `mixpanel.client.js` as a Nuxt plugin**

The existing file uses the `{ install(app) }` Vue-plugin shape and `process.env.NODE_ENV`, neither of which is right in Nuxt.

```js
import mixpanel from "mixpanel-browser";

export default defineNuxtPlugin(() => {
  mixpanel.init("855f027f4230678f61f56685e72643b4", {
    debug: import.meta.dev,
    track_pageview: true,
  });

  return { provide: { mixpanel } };
});
```

```bash
git mv app/plugins/mixpanel.js app/plugins/mixpanel.client.js
```

- [ ] **Step 2: Update `$mixpanel` consumers**

```bash
grep -rn '\$mixpanel' app/ | grep -v plugins/
```

For each hit, replace `this.$mixpanel` or the injected global with:

```js
const { $mixpanel } = useNuxtApp();
```

- [ ] **Step 3: Convert `onesignal.js` the same way**

```bash
git mv app/plugins/onesignal.js app/plugins/onesignal.client.js
```

Wrap its body in `defineNuxtPlugin(() => { … })` and read the app id from `useRuntimeConfig().public.onesignalAppId` instead of `import.meta.env.VITE_ONESIGNAL_APP_ID`.

- [ ] **Step 4: Move PropellerAds out of the root component**

`src/App.vue` calls `initPropellerAds()` during setup, which injects a script tag and would run on the server. Create `app/plugins/propeller-ads.client.js`:

```js
export default defineNuxtPlugin(() => {
  const { initPropellerAds } = usePropellarAds();
  initPropellerAds();
});
```

- [ ] **Step 5: Verify no browser SDK runs on the server**

```bash
pnpm build 2>&1 | tail -20
pnpm preview &
sleep 8
curl -s localhost:3000 >/dev/null && echo "SSR render OK — no ReferenceError"
kill %1
```

Expected: `SSR render OK`. A `window is not defined` crash here means a plugin is missing its `.client` suffix.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: convert Mixpanel, OneSignal and PropellerAds to .client plugins

These SDKs touch window at init and would crash server rendering."
```

---

### Task 8: Root component and layouts

**Files:**
- Modify: `app/app.vue`
- Create: `app/layouts/default.vue` (from `src/views/WithSibarAndBetslip.vue`)
- Create: `app/layouts/auth.vue` (from `src/views/TheAuth.vue`)
- Delete: `src/main.js`, `src/App.vue`

**Interfaces:**
- Consumes: Tasks 2–7.
- Produces: `<NuxtLayout>`/`<NuxtPage>` rendering; layouts selectable via `definePageMeta({ layout: "auth" })`.

**Why layouts:** `TheAuth` and `WithSibarAndBetslip` are currently parent routes with `children`, both mounted at `path: "/"`. Nuxt layouts express this without route nesting.

- [ ] **Step 1: Write `app/app.vue`**

Port the template from `src/App.vue`, dropping `initPropellerAds()` (now a plugin from Task 7) and `<router-view />` (now `<NuxtPage />`).

```vue
<script setup>
import CasinoSidebar from "@/components/CasinoSidebar.vue";
import CollectAllModals from "@/components/CollectAllModals.vue";
import SiakaSplashLoader from "@/components/SiakaSplashLoader.vue";
import { useAppMode } from "@/composables/useAppMode";
import { useModalTypes } from "@/composables/useModalTypes";
import { useThemeSwitch } from "@/composables/useThemeSwitch";
import { useModalStore } from "@/stores/modal";
import { useRoadblockStore } from "@/stores/roadblock";
import { useAppVersionStore } from "@/stores/app-version";

const appVersionStore = useAppVersionStore();
const { openModal } = useModalStore();
const { stopRoadblockRotationTimer } = useRoadblockStore();
const { notification } = useModalTypes();
const { switchToDark } = useThemeSwitch();
const { currentMode } = useAppMode();

onBeforeMount(() => switchToDark());

onMounted(() => {
  appVersionStore.checkVersion();

  const nav = performance.getEntriesByType("navigation")[0];
  if (nav?.type !== "reload") {
    openModal(notification);
  }
});

onBeforeUnmount(() => {
  stopRoadblockRotationTimer();
});
</script>

<template>
  <div class="bg-white dark:bg-background">
    <SiakaSplashLoader />
    <div :class="currentMode === 'casino' ? 'lg:flex' : ''">
      <CasinoSidebar v-if="currentMode === 'casino'" />
      <div class="flex-1 min-w-0">
        <NuxtLayout>
          <NuxtPage />
        </NuxtLayout>
      </div>
    </div>
    <OddsBar class="xl:hidden" />
    <CollectAllModals />
  </div>
</template>
```

`onBeforeMount`, `onMounted` and `onBeforeUnmount` are auto-imported by Nuxt; the explicit `vue` import is dropped. All three are client-only lifecycle hooks, so `performance` is safe.

- [ ] **Step 2: Create `app/layouts/default.vue`**

```bash
git mv src/views/WithSibarAndBetslip.vue app/layouts/default.vue
```

Then, inside the moved file, replace `<router-view />` with `<slot />`, and rewrite any `../` imports as `@/` since the file changed directory depth.

- [ ] **Step 3: Create `app/layouts/auth.vue`**

```bash
git mv src/views/TheAuth.vue app/layouts/auth.vue
```

Apply the same two edits: `<router-view />` → `<slot />`, and `../` imports → `@/`.

- [ ] **Step 4: Delete the Vue entrypoint**

```bash
git rm src/main.js src/App.vue
```

Everything `main.js` did is now config: `createHead` is built in, `createPinia` is `@pinia/nuxt`, `router` is file-based, `mixpanelPlugin` is Task 7, and `VueDatePicker` is registered in Step 5.

- [ ] **Step 5: Register VueDatePicker globally**

`main.js` registered it via `app.component("VueDatePicker", …)`. Create `app/plugins/datepicker.client.js`:

```js
import { VueDatePicker } from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("VueDatePicker", VueDatePicker);
});
```

It is `.client` because the datepicker reads `window` during init.

- [ ] **Step 6: Verify layouts render**

```bash
pnpm dev &
sleep 8
curl -s localhost:5079 | head -40
kill %1
```

Expected: markup from `app.vue` and the default layout, with no `router-view` string remaining.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: convert route wrappers to Nuxt layouts, delete Vue entrypoint

TheAuth and WithSibarAndBetslip were parent routes both mounted at '/';
as layouts they express the same thing without route nesting."
```

---

### Task 9: Per-page SEO composable

**Files:**
- Create: `app/composables/useSeoHead.js`
- Reference: `src/router/index.js` `afterEach` block (lines ~940-1078)
- Reference: `app/composables/useOrganizationSchema.js` (unchanged)

**Interfaces:**
- Consumes: `useOrganizationSchema().combinedSchemas(route, baseUrl)`.
- Produces: `useSeoHead({ title, description, robots })` — call once per page in `<script setup>`. All arguments optional; falls back to the site defaults.

**What this replaces:** the `router.afterEach` hook currently computes title, description, canonical, robots, Open Graph, Twitter and JSON-LD for every route. That logic moves here and runs during SSR, which is the entire point of the migration.

- [ ] **Step 1: Create `app/composables/useSeoHead.js`**

```js
const BASE_URL = "https://naibet.com";
const DEFAULT_TITLE = "Naibet Kenya – Bet on All Sports & Top Odds";
const DEFAULT_DESC =
  "Bet from as low as KSh 10 and win big with Naibet! Enjoy on sports bets, thrilling casino games, huge jackpots, and virtual sports action.";
const OG_IMAGE = `${BASE_URL}/og-image.png`;
const OG_IMAGE_ALT = "Naibet Kenya – bet on all sports with top odds";

const stripQuery = (p) => p.split("?")[0].replace(/\/{2,}/g, "/");
const removeTrailingSlash = (p) =>
  p.length > 1 && p.endsWith("/") ? p.slice(0, -1) : p;
const normalizePath = (p) => removeTrailingSlash(stripQuery(p)).toLowerCase();

// Query params that indicate a faceted or campaign URL we do not want indexed.
const isParamPage = (fullPath) => {
  const q = fullPath.split("?")[1] || "";
  return /\butm_|^page=|[?&]sort=|[?&]session=/.test("?" + q);
};

export function useSeoHead(options = {}) {
  const route = useRoute();

  const title = options.title || DEFAULT_TITLE;
  const description = options.description || DEFAULT_DESC;
  const canonical = `${BASE_URL}${normalizePath(route.path || "/")}`;
  const robots = isParamPage(route.fullPath)
    ? "noindex,follow"
    : options.robots || "index,follow";

  const { combinedSchemas } = useOrganizationSchema();
  const schema = combinedSchemas(route, BASE_URL);

  useHead({
    title,
    meta: [
      { name: "description", content: description },
      { name: "robots", content: robots },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: canonical },
      { property: "og:type", content: "website" },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: OG_IMAGE_ALT },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: OG_IMAGE },
      { name: "twitter:image:alt", content: OG_IMAGE_ALT },
    ],
    link: [{ rel: "canonical", href: canonical }],
    script: [
      { type: "application/ld+json", innerHTML: JSON.stringify(schema) },
    ],
  });
}
```

Two deliberate changes from the router version: `children:` becomes `innerHTML:` (the correct unhead key for inline script content), and the `:sport`/`:name`/`:country` string interpolation is dropped — pages now compute their own titles from real params, which is clearer than regex-replacing placeholders.

- [ ] **Step 2: Verify it compiles by calling it from `app/app.vue` temporarily**

Add `useSeoHead();` to the `<script setup>` block, then:

```bash
pnpm dev &
sleep 8
curl -s localhost:5079 | grep -o 'application/ld+json'
curl -s localhost:5079 | grep -o 'rel="canonical"'
kill %1
```

Expected: both strings found. Remove the temporary call afterwards — pages own it from Task 10.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: add useSeoHead composable for server-rendered SEO

Replaces the client-side router.afterEach hook, whose meta tags and
JSON-LD never reached crawlers."
```

---

### Task 10: The six skeleton pages

**Files:**
- Create: `app/pages/index.vue` (from `src/views/TheLanding.vue`)
- Create: `app/pages/leagues.vue` (from `src/views/LeaguesView.vue`)
- Create: `app/pages/promotions.vue` (from `src/views/ThePromotions.vue`)
- Create: `app/pages/sports/[sport].vue` (from `src/views/SportView.vue`)
- Create: `app/pages/sports/live/[sport].vue` (from `src/views/NewLive3.vue`)
- Create: `app/pages/sports/[sport]/[country]/[league].vue` (from `src/views/CountryView.vue`)
- Create: `app/middleware/tracking.global.js`
- Modify: `nuxt.config.js`
- Delete: `src/router/index.js`

**Interfaces:**
- Consumes: Task 8's layouts, Task 9's `useSeoHead`.
- Produces: six server-rendered routes.

**Route conflict warning:** `app/pages/sports/[sport].vue` and the directory `app/pages/sports/[sport]/` coexist. Nuxt handles this — the file serves `/sports/football` and the directory serves deeper paths — but the param name must be spelled identically in both, or routing silently misbehaves.

- [ ] **Step 1: Move the six views into `app/pages/`**

```bash
mkdir -p app/pages/sports/live "app/pages/sports/[sport]/[country]"
git mv src/views/TheLanding.vue      app/pages/index.vue
git mv src/views/LeaguesView.vue     app/pages/leagues.vue
git mv src/views/ThePromotions.vue   app/pages/promotions.vue
git mv src/views/SportView.vue       "app/pages/sports/[sport].vue"
git mv src/views/NewLive3.vue        "app/pages/sports/live/[sport].vue"
git mv src/views/CountryView.vue     "app/pages/sports/[sport]/[country]/[league].vue"
```

- [ ] **Step 2: Fix relative imports in the nested pages**

`app/pages/index.vue`, `leagues.vue` and `promotions.vue` sit at the same depth as `src/views/`, so their `../` imports still resolve. The three nested pages gained depth and their `../` imports are now broken. Rewrite them as `@/`:

```bash
grep -n 'from "\.\./' "app/pages/sports/[sport].vue" \
  "app/pages/sports/live/[sport].vue" \
  "app/pages/sports/[sport]/[country]/[league].vue"
```

For each hit, change `from "../stores/x"` to `from "@/stores/x"`, `from "../components/y"` to `from "@/components/y"`, and so on. Verify none remain:

```bash
grep -rn 'from "\.\./' app/pages/ || echo "no relative parent imports remain"
```

- [ ] **Step 3: Add `definePageMeta` and `useSeoHead` to each page**

Copy the `meta` values from the deleted router. In `app/pages/index.vue`:

```js
definePageMeta({
  name: "home",
  layout: "default",
});

useSeoHead({
  title: "Best online sports betting in Kenya – Naibet",
  description:
    "Experience the best online sports betting and casino games with Naibet. Fast payouts, live odds, and instant deposits.",
});
```

In `app/pages/sports/[sport].vue`, the title derives from the route param, replacing the router's `:sport` placeholder substitution:

```js
const route = useRoute();

definePageMeta({ name: "sports", layout: "default" });

const sportName = computed(() =>
  String(route.params.sport || "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase()),
);

useSeoHead({
  title: `${sportName.value} Betting in Kenya – Odds & Live Markets | Naibet`,
  description: `Bet on ${sportName.value} at Naibet Kenya. Competitive odds, live markets and instant M-Pesa deposits.`,
});
```

Apply the same param-derived pattern to `sports/live/[sport].vue` (using "Live" in the copy) and to `sports/[sport]/[country]/[league].vue` (using `route.params.country` and `route.params.league`). For `leagues.vue` and `promotions.vue`, copy their literal `meta.title`/`meta.description` from the router before deleting it.

- [ ] **Step 4: Port the router's tracking hook to global middleware**

The old `beforeEach` captured UTM, btag and referral codes on every navigation.

```js
// app/middleware/tracking.global.js
export default defineNuxtRouteMiddleware((to) => {
  const { getUtm, getBtag, getReferralCode } = useUtmStore();
  getUtm(to);
  getBtag(to);
  getReferralCode(to);
});
```

The `requiresAuth` half of `beforeEach` is not ported in Phase 1 — none of these six routes require auth. It lands in Phase 2 alongside the account pages.

- [ ] **Step 5: Add `routeRules` to `nuxt.config.js`**

```js
  routeRules: {
    "/": { ssr: true },
    "/leagues": { ssr: true },
    "/promotions": { ssr: true },
    "/sports/**": { ssr: true },
  },
```

Rules for the prerendered legal pages and the `ssr: false` game/account routes are added as those routes land in Phase 2+.

- [ ] **Step 6: Delete the router**

```bash
git rm src/router/index.js
rmdir src/router 2>/dev/null || true
```

- [ ] **Step 7: Verify all six routes render server-side**

```bash
pnpm build && pnpm preview &
sleep 10
for p in / /leagues /promotions /sports/football /sports/live/football; do
  n=$(curl -s "localhost:3000$p" | wc -c)
  ld=$(curl -s "localhost:3000$p" | grep -c 'application/ld+json')
  printf "%-28s bytes=%-8s jsonld=%s\n" "$p" "$n" "$ld"
done
kill %1
```

Expected: every route returns a large byte count (not a ~1KB empty shell) and `jsonld=1`.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: convert six SEO routes to file-based pages, delete router

Replaces the 1,078-line router with definePageMeta and routeRules.
Titles now derive from real route params instead of regex-substituting
:sport placeholders after navigation."
```

---

### Task 11: SSR hazard fixes

**Files:**
- Modify: `app/composables/useShareToSocials.js:14`
- Modify: `app/stores/app-version.js:18,29-31,46-47`

**Interfaces:**
- Consumes: Task 10's rendering routes.
- Produces: no `window`/`localStorage` access during server render.

**Scope:** only the two files that touch browser globals *outside* client-only lifecycle hooks. The other ~28 files reference them inside event handlers, which SSR never invokes; they are audited when their own route is ported.

- [ ] **Step 1: Fix `useShareToSocials.js`**

`window.location.origin` currently runs in the composable body, so it executes during setup on the server. Make it lazy:

```js
export function useShareToSocials() {
  // Read lazily: the composable body runs during SSR, where window is absent.
  const originUrl = computed(() =>
    import.meta.client ? window.location.origin : "https://naibet.com",
  );
  // …
}
```

Update the body to use `originUrl.value`.

- [ ] **Step 2: Guard `app-version.js`**

Its actions read `localStorage` and `window.location`. Guard each entry point:

```js
    checkVersion() {
      if (import.meta.server) return;
      const url = new URL(window.location.href);
      // …
    },
```

Apply the same early return to every action in the file that touches `localStorage` (lines ~29-31 and ~46-47 at baseline).

- [ ] **Step 3: Verify no SSR crashes across all six routes**

```bash
pnpm build && pnpm preview &
sleep 10
for p in / /leagues /promotions /sports/football /sports/live/football \
         /sports/football/kenya/premier-league; do
  code=$(curl -s -o /dev/null -w "%{http_code}" "localhost:3000$p")
  printf "%-46s %s\n" "$p" "$code"
done
kill %1
```

Expected: `200` for all six. A `500` means a browser global is still reached during render — read the server log for the offending file.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "fix: make useShareToSocials and app-version SSR-safe

Both read window or localStorage outside client-only lifecycle hooks."
```

---

### Task 12: Verification sweep and infrastructure handoff

**Files:**
- Create: `docs/INFRA-HANDOFF.md`
- Modify: `CLAUDE.md`

**Interfaces:**
- Consumes: everything.
- Produces: the four spec §10 exit criteria demonstrated, plus the handoff note.

- [ ] **Step 1: Exit criterion 1 — real markup in the HTML source**

```bash
pnpm build && pnpm preview &
sleep 10
curl -s localhost:3000/ > /tmp/naibet-home.html
grep -c '<h1' /tmp/naibet-home.html
grep -o 'application/ld+json' /tmp/naibet-home.html
grep -o 'rel="canonical"' /tmp/naibet-home.html
wc -c /tmp/naibet-home.html
```

Expected: at least one `<h1>`, the JSON-LD block, a canonical link, and a byte count well above an empty shell. Record the actual numbers in the commit message.

- [ ] **Step 2: Exit criterion 4 — no theme flash**

```bash
grep -o 'data-theme="dark"' /tmp/naibet-home.html
```

Expected: found. If absent, `bodyAttrs` from Task 3 is not reaching the response.

- [ ] **Step 3: Exit criteria 2 and 3 — hydration and session (manual)**

With `pnpm preview` running, in a browser:

1. Open each of the six routes with DevTools console visible. Expected: **zero** `Hydration node mismatch` or `Hydration text mismatch` warnings. Record any that appear — they are Phase 1 blockers, not Phase 2 cleanup.
2. Log in with real credentials. Confirm a session cookie appears in Application → Cookies.
3. Hard-refresh (Cmd-Shift-R). Expected: the header renders logged-in immediately, with no Login/Register flash.

- [ ] **Step 4: Confirm the leftover `src/` tree is empty of live code**

```bash
find src -type f | head -20
find src -type f | wc -l
```

Expected: only unported Phase 2+ views remain (roughly 74 files). Nothing under `src/` should be imported by anything under `app/`:

```bash
grep -rn '"\.\./\.\./src/\|@/\.\./src/' app/ || echo "no app/ -> src/ imports"
```

- [ ] **Step 5: Write `docs/INFRA-HANDOFF.md`**

```markdown
# Infrastructure Handoff — Nuxt 4 SSR

The app is no longer a static bundle. It is a Node server.

## What changed

| | Before | After |
|---|---|---|
| Build output | `dist/` (static) | `.output/` |
| Serve | Nginx static files | `node .output/server/index.mjs` |
| Port | 80 (Nginx) | 3000 (`PORT` overrides) |
| Build command | `pnpm build` | `pnpm build` (unchanged) |
| Env substitution | build-time `sed` in entrypoint | **not needed** |
| Health check | any static path | `GET /version.json` → `{"version":"…"}` |

## Environment variables

All `VITE_*` keys are renamed to `NUXT_PUBLIC_*`, same values. Nuxt reads them
at **server start**, so the image no longer needs rebuilding or `sed`-patching
per environment.

VITE_APP_VERSION            -> NUXT_PUBLIC_APP_VERSION
VITE_MATCHES_URL            -> NUXT_PUBLIC_MATCHES_URL
VITE_INSTANT_URL            -> NUXT_PUBLIC_INSTANT_URL
VITE_AUTH_URL               -> NUXT_PUBLIC_AUTH_URL
VITE_BET_URL                -> NUXT_PUBLIC_BET_URL
VITE_CASINO_URL             -> NUXT_PUBLIC_CASINO_URL
VITE_CMS_URL                -> NUXT_PUBLIC_CMS_URL
VITE_VIRTUAL_URL            -> NUXT_PUBLIC_VIRTUAL_URL
VITE_VIRTUAL_LEAGUES_URL    -> NUXT_PUBLIC_VIRTUAL_LEAGUES_URL
VITE_KIRON_LITE_URL         -> NUXT_PUBLIC_KIRON_LITE_URL
VITE_AFFILIATE_URL          -> NUXT_PUBLIC_AFFILIATE_URL
VITE_AFFILIATE_API_URL      -> NUXT_PUBLIC_AFFILIATE_API_URL
VITE_GENIUS_GAME_TRACKER_URL-> NUXT_PUBLIC_GENIUS_GAME_TRACKER_URL
VITE_ONESIGNAL_APP_ID       -> NUXT_PUBLIC_ONESIGNAL_APP_ID
VITE_DEPOSIT_TAX            -> NUXT_PUBLIC_DEPOSIT_TAX
VITE_WITHDRAW_TAX           -> NUXT_PUBLIC_WITHDRAW_TAX
VITE_AVIATOR_GAME_ID        -> NUXT_PUBLIC_AVIATOR_GAME_ID
VITE_AVIATRIX_GAME_ID       -> NUXT_PUBLIC_AVIATRIX_GAME_ID
VITE_FOOTBALLX_GAME_ID      -> NUXT_PUBLIC_FOOTBALLX_GAME_ID
VITE_HAKI_LEAGUE_GAME_ID    -> NUXT_PUBLIC_HAKI_LEAGUE_GAME_ID
VITE_HAKI_TURBO_GAME_ID     -> NUXT_PUBLIC_HAKI_TURBO_GAME_ID
VITE_KIRON_JACKPOT_GAME_ID  -> NUXT_PUBLIC_KIRON_JACKPOT_GAME_ID
VITE_JETX_GAME_ID           -> NUXT_PUBLIC_JETX_GAME_ID
VITE_VIRTUAL_GAME_ID        -> NUXT_PUBLIC_VIRTUAL_GAME_ID
VITE_CRASH_ROYALE_GAME_ID   -> NUXT_PUBLIC_CRASH_ROYALE_GAME_ID
VITE_VIRTUAL_SPIN_GAME_ID   -> NUXT_PUBLIC_VIRTUAL_SPIN_GAME_ID
VITE_MAESTRO_GAME_ID        -> NUXT_PUBLIC_MAESTRO_GAME_ID
VITE_PAYBILL_NO             -> NUXT_PUBLIC_PAYBILL_NO
VITE_TENANT_CODE            -> NUXT_PUBLIC_TENANT_CODE
VITE_PROPELLER_AID          -> NUXT_PUBLIC_PROPELLER_AID
VITE_PROPELLER_TID          -> NUXT_PUBLIC_PROPELLER_TID
VITE_LIVE_POLL_INTERVAL     -> NUXT_PUBLIC_LIVE_POLL_INTERVAL
VITE_USSD_ACTIVATE_ACCOUNT  -> NUXT_PUBLIC_USSD_ACTIVATE_ACCOUNT

## Notes

- The container must run a Node process; a static file server will not work.
- `.output/` is self-contained — `node_modules` is not needed at runtime.
- Sticky sessions are not required; the session lives in a client cookie.
```

- [ ] **Step 6: Update `CLAUDE.md` for the new structure**

Replace the "Tech Stack", "Path Alias", "Key Directories" and "Deployment" sections to describe Nuxt 4, `app/` as `srcDir`, file-based routing, and `runtimeConfig`. Leave the "Design System" section untouched — it is still accurate.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "docs: record Phase 1 verification and infrastructure handoff

SSR verified on six routes: real markup, JSON-LD and canonical present
in the server response, data-theme emitted, no hydration warnings."
```

---

## Phase 1 Exit Checklist

Do not start Phase 2 until all five are true:

- [ ] `curl` on all six routes returns real markup with JSON-LD, not an empty shell
- [ ] Zero hydration mismatch warnings in the browser console on all six routes
- [ ] A logged-in session survives a hard refresh with no logged-out flash
- [ ] `data-theme="dark"` is present in the server response
- [ ] `pnpm build` completes clean and `.output/` runs under `node`

## Deferred to Phase 2+

Tracked here so they are not lost:

- The `requiresAuth` guard as route middleware (Task 10, Step 4)
- `pages:extend` path rewrite for match details (spec §5.2)
- `/share-bets/:code?` two-file split (spec §5.2)
- `routeRules` for prerendered legal pages and `ssr: false` game/account routes
- The remaining ~74 views under `src/views/`
- Swiper 12→14 visual verification, per route as batches land
