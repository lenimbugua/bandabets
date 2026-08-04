# Top-Level Casino/Sports Mode Switch — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a persistent header-pill mode switch that categorises the app into Casino (left) and Sports (right), routing on click and persisting the last-used mode for default landings.

**Architecture:** Mode is *derived* from the current route via `route.meta.category` (added to all 47 named routes). A tiny Pinia store persists only `lastMode` (used as default on cross-cutting routes and home `/`). A small `useAppMode` composable exposes `currentMode`, `showSwitch`, `switchTo`. A new `<TopModeSwitch />` SFC is inserted once into `HeaderLinks.vue`. Auth's separate `TheAuth` layout naturally skips it.

**Tech Stack:** Vue 3 (Composition API), Pinia + `pinia-plugin-persistedstate` (already configured per CLAUDE.md), Vue Router 4, Tailwind v4 with Emerald Pitch tokens, Vite. No test framework configured — verification is `pnpm run build` + `npx eslint src/` + brand-signature grep + manual smoke walkthrough.

**Source spec:** `docs/superpowers/specs/2026-05-18-top-mode-switch-design.md` (read §4–§9 before starting). Token values and route names come from there.

---

## Conventions for every task

- **No test runner.** "Verification" for code tasks = `pnpm run build` passes + (where applicable) `npx eslint <files>` reports no NEW errors + the brand-signature grep on new files returns **0**.
- **Brand-signature grep helper** is restored in Task 0 at `/tmp/brandgrep.sh` and re-used everywhere.
- **Commit after every task.** Conventional commits, end with the Co-Authored-By trailer used elsewhere in this repo's history. Work from `/Users/leonardmbugua/Desktop/parimaster` on branch `feat/top-mode-switch`.
- **Auto-imports.** Per `CLAUDE.md`: composables under `src/composables/**` and all components are auto-imported by Vite — do NOT add `import` lines for `useAppMode` (composable) or `TopModeSwitch` (component) in consumers.

---

### Task 0: Branch + tooling baseline

**Files:**
- Create / overwrite: `/tmp/brandgrep.sh`

- [ ] **Step 1: Confirm branch + clean working tree**

```bash
cd /Users/leonardmbugua/Desktop/parimaster
git branch --show-current      # must print: feat/top-mode-switch
git status --short             # must be empty
```
Expected: branch `feat/top-mode-switch`, no uncommitted changes. If not on that branch, switch with `git checkout feat/top-mode-switch`. If working tree dirty, STOP and report.

- [ ] **Step 2: (Re)create the brand-signature grep helper**

Write `/tmp/brandgrep.sh` with EXACTLY this content (then `chmod +x`):

```bash
# usage: brandgrep.sh <path-or-file...>
grep -rnE 'oklch\([0-9.]+% [0-9.]+ (2[5-9][0-9]|14[0-2])\)|#0b1120|#1a2744|#1e2d4a|#f97316|\[#[0-9a-fA-F]{3,8}\]|(bg|text|border|from|to|via|ring|fill|stroke)-(navy|emerald)-|(bg|text|border|from|to|via|ring)-green-[0-9]' "$@" --include='*.vue' --include='*.js' --include='*.css' 2>/dev/null | grep -v 'src/style.css' | grep -v 'src/assets/'
```

Run: `chmod +x /tmp/brandgrep.sh && /tmp/brandgrep.sh /Users/leonardmbugua/Desktop/parimaster/src | wc -l | tr -d ' '`
Expected: `0` (the prior rebrand reduced the brand-signature surface to 0 across `src/`). If non-zero, that's pre-existing debt — record the number but proceed.

- [ ] **Step 3: Baseline build**

Run: `pnpm install && pnpm run build`
Expected: build completes (a chunk-size warning is NOT a failure). If it errors, STOP and report.

- [ ] **Step 4: No commit needed** — this task only sets up tooling and verifies state. If `git status` shows any uncommitted changes at this point, something is wrong; STOP and report.

---

### Task 1: Pinia store — `src/stores/app-mode.js`

**Files:**
- Create: `src/stores/app-mode.js`

- [ ] **Step 1: Write the store**

Create `/Users/leonardmbugua/Desktop/parimaster/src/stores/app-mode.js` with EXACTLY this content:

```js
import { defineStore } from "pinia";

export const useAppModeStore = defineStore("app-mode", {
  state: () => ({
    lastMode: "sports", // "casino" | "sports"
  }),
  actions: {
    setLastMode(mode) {
      if (mode !== "casino" && mode !== "sports") return;
      this.lastMode = mode;
    },
  },
  persist: { key: "siakabet:appMode" },
});
```

- [ ] **Step 2: Build**

Run: `pnpm run build`
Expected: PASS.

- [ ] **Step 3: Lint**

Run: `npx eslint src/stores/app-mode.js`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/stores/app-mode.js
git commit -m "feat(app-mode): pinia store with persisted lastMode

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 2: Composable — `src/composables/useAppMode.js`

**Files:**
- Create: `src/composables/useAppMode.js`

- [ ] **Step 1: Write the composable**

Create `/Users/leonardmbugua/Desktop/parimaster/src/composables/useAppMode.js` with EXACTLY this content:

```js
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useAppModeStore } from "@/stores/app-mode";

const SPORTS_HOME = { name: "sports", params: { sport: "soccer" } };
const CASINO_HOME = { name: "casino-home" };

export function useAppMode() {
  const route = useRoute();
  const router = useRouter();
  const store = useAppModeStore();
  const { lastMode } = storeToRefs(store);

  const category = computed(() => route.meta?.category ?? "cross-cutting");

  const currentMode = computed(() => {
    if (category.value === "sports") return "sports";
    if (category.value === "casino") return "casino";
    return lastMode.value; // cross-cutting or unknown
  });

  const showSwitch = computed(() => category.value !== "auth");

  function switchTo(mode) {
    if (mode !== "casino" && mode !== "sports") return;
    store.setLastMode(mode);
    router.push(mode === "casino" ? CASINO_HOME : SPORTS_HOME);
  }

  return { currentMode, showSwitch, switchTo };
}
```

- [ ] **Step 2: Build**

Run: `pnpm run build`
Expected: PASS.

- [ ] **Step 3: Lint**

Run: `npx eslint src/composables/useAppMode.js`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/composables/useAppMode.js
git commit -m "feat(app-mode): useAppMode composable (currentMode/showSwitch/switchTo)

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 3: Annotate `meta.category` on all 47 named routes

**Files:**
- Modify: `src/router/index.js`

- [ ] **Step 1: Apply the category map**

For each route in `src/router/index.js` matching a name in the four lists below, add a `category` field inside that route's `meta:` object. If a route has no `meta:` object yet, create one: `meta: { category: "<value>" }`. If the route already has a `meta:` object, add the `category` key alongside its existing keys; do NOT remove or alter any existing meta keys (e.g. `requiresAuth`, `seo`, etc.).

The route name list is **complete and exclusive** — every named route in the router falls into exactly one bucket.

**`category: "sports"` (6 routes):**
`sports`, `live`, `leagues`, `countries`, `country`, `match-details`

**`category: "casino"` (15 routes):**
`casino-home`, `casino`, `aviator`, `crash`, `popular-games`, `new-games`, `play-crash-games`, `play-virtuals-games`, `play-casino-games`, `virtuals`, `virtual-league`, `pari-league`, `pari-turbo`, `pari-virtual-jackpot`, `playon`

**`category: "auth"` (6 routes):**
`signup`, `login`, `forgot-password`, `reset-password`, `change-password`, `verify-account`

**`category: "cross-cutting"` (20 routes):**
`home`, `bonus`, `profile`, `promotions`, `promotion-details`, `my-bets`, `bet-details`, `share-bets`, `join-affiliate`, `deposit`, `sort-deposit`, `withdraw`, `terms-and-conditions`, `responsible-gambling`, `privacy-policy`, `self-exclusion`, `bet-placed`, `welcome-promotions`, `share-feedback`, `not-found`

Total: 6 + 15 + 6 + 20 = **47**. The file's name declarations were verified at spec time; if you cannot locate a name in the file, STOP and report (do not invent or rename routes). Commented-out routes (e.g. `// name: "home-page"`) are ignored.

- [ ] **Step 2: Verify every named route now has a category**

Run from `/Users/leonardmbugua/Desktop/parimaster`:

```bash
# Count named routes
grep -cE '^\s*name: "' src/router/index.js
```
Expected: `47`. If the count differs, the router file may have changed since the spec was written; STOP and report.

```bash
# Count category annotations
grep -cE 'category: "(sports|casino|auth|cross-cutting)"' src/router/index.js
```
Expected: `47` (one annotation per named route).

- [ ] **Step 3: Build**

Run: `pnpm run build`
Expected: PASS.

- [ ] **Step 4: Lint**

Run: `npx eslint src/router/index.js`
Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add src/router/index.js
git commit -m "feat(router): annotate meta.category on all 47 named routes

6 sports + 15 casino + 6 auth + 20 cross-cutting. Drives the new
top-level Casino/Sports mode switch.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 4: Component — `src/components/TopModeSwitch.vue`

**Files:**
- Create: `src/components/TopModeSwitch.vue`

- [ ] **Step 1: Write the component**

Create `/Users/leonardmbugua/Desktop/parimaster/src/components/TopModeSwitch.vue` with EXACTLY this content (note: no manual `import` for `useAppMode` — composables are auto-imported by Vite per `CLAUDE.md`):

```vue
<script setup>
const { currentMode, showSwitch, switchTo } = useAppMode();
</script>

<template>
  <div
    v-if="showSwitch"
    class="inline-flex items-center bg-card border border-border rounded-full p-0.5 text-xs font-semibold select-none"
    role="tablist"
    aria-label="Section mode"
  >
    <button
      type="button"
      role="tab"
      :aria-selected="currentMode === 'casino'"
      class="px-3 py-1.5 rounded-full transition-colors"
      :class="currentMode === 'casino'
        ? 'bg-primary text-primary-foreground'
        : 'text-muted-foreground hover:text-foreground'"
      @click="switchTo('casino')"
    >Casino</button>
    <button
      type="button"
      role="tab"
      :aria-selected="currentMode === 'sports'"
      class="px-3 py-1.5 rounded-full transition-colors"
      :class="currentMode === 'sports'
        ? 'bg-primary text-primary-foreground'
        : 'text-muted-foreground hover:text-foreground'"
      @click="switchTo('sports')"
    >Sports</button>
  </div>
</template>
```

- [ ] **Step 2: Build**

Run: `pnpm run build`
Expected: PASS.

- [ ] **Step 3: Lint**

Run: `npx eslint src/components/TopModeSwitch.vue`
Expected: no errors.

- [ ] **Step 4: Brand-signature check on the new component**

Run: `/tmp/brandgrep.sh src/components/TopModeSwitch.vue | wc -l | tr -d ' '`
Expected: `0` (component uses only token utilities).

- [ ] **Step 5: Commit**

```bash
git add src/components/TopModeSwitch.vue
git commit -m "feat(top-mode-switch): TopModeSwitch.vue segmented header pill

Casino-first, hidden when route.meta.category === 'auth'. Tokenised
(bg-card/border/bg-primary/text-primary-foreground/text-muted-foreground).

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 5: Insert `<TopModeSwitch />` into `HeaderLinks.vue`

**Files:**
- Modify: `src/components/HeaderLinks.vue`

- [ ] **Step 1: Locate the central slot in the header template**

Open `/Users/leonardmbugua/Desktop/parimaster/src/components/HeaderLinks.vue`. In the `<template>`, find the existing top-row container — the element that holds the brand/logo cluster on the left and the search/profile cluster on the right. (Patterns to look for: a flex row with `<TheLogo />` near the start and `<HeaderProfile />` / `<SearchIcon />` near the end.)

Insert `<TopModeSwitch />` as a sibling element BETWEEN the logo cluster and the search/profile cluster. Add `class="mx-auto"` if the row uses `justify-between` and you want the pill centred; otherwise place it directly after the logo cluster and let the flex layout do the rest.

Concretely: somewhere in the existing template add a new line:

```vue
<TopModeSwitch class="mx-auto" />
```

The `mx-auto` is a hint, not a requirement — if the existing layout already places elements with `justify-between` or `gap-*`, position the switch where it sits visually between logo and profile cluster. Do not add new wrapper divs; insert as a direct sibling.

- [ ] **Step 2: Verify the component does NOT need a manual import**

Per `CLAUDE.md`, components under `src/components/**` are auto-registered by `unplugin-vue-components`. Confirm there is no `import TopModeSwitch from "..."` line added in the `<script setup>` block.

- [ ] **Step 3: Build**

Run: `pnpm run build`
Expected: PASS. If the build complains it can't resolve `TopModeSwitch`, the auto-resolver may need a fresh dev run; try `pnpm run build` again, and only if that still fails, add `import TopModeSwitch from "./TopModeSwitch.vue";` to the `<script setup>` block.

- [ ] **Step 4: Lint**

Run: `npx eslint src/components/HeaderLinks.vue`
Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add src/components/HeaderLinks.vue
git commit -m "feat(top-mode-switch): mount TopModeSwitch in HeaderLinks

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 6: Verification pass (build, lint, brand grep, manual smoke)

**Files:** none (verification only).

- [ ] **Step 1: Full build + lint clean**

```bash
cd /Users/leonardmbugua/Desktop/parimaster
pnpm run build                # PASS
npx eslint src/                # no NEW errors (pre-existing debt is OK)
```

- [ ] **Step 2: Brand-signature grep on new files = 0**

```bash
/tmp/brandgrep.sh src/stores/app-mode.js src/composables/useAppMode.js src/components/TopModeSwitch.vue | wc -l | tr -d ' '
```
Expected: `0`.

- [ ] **Step 3: Manual smoke (dark + light themes)**

Run: `pnpm dev` (port 5079) and walk these routes in BOTH dark and light themes:

| URL | Expected switch state |
|---|---|
| `/` | Visible. Highlight reflects `lastMode` (initially Sports). |
| `/sports/soccer` | Visible. Sports highlighted. |
| `/sports/live/soccer` | Visible. Sports highlighted. |
| `/casino-home` | Visible. Casino highlighted. |
| `/aviator` | Visible. Casino highlighted. |
| `/bonus` | Visible. Highlight = `lastMode`. |
| `/profile` | Visible. Highlight = `lastMode`. |
| `/login` (open auth modal/page) | **Hidden** (no switch rendered). |

Also verify the click-and-persist flow:

1. Land on `/sports/soccer` (Sports highlighted).
2. Click "Casino" — URL navigates to `/casino-home`, Casino highlighted.
3. Open DevTools → Application → Local Storage; confirm `siakabet:appMode` exists with value containing `"lastMode":"casino"`.
4. Hard-reload the app and navigate to `/` — switch shows Casino highlighted (because lastMode is casino).
5. Click "Sports" on `/` — URL navigates to `/sports/soccer`, Sports highlighted, localStorage updates.

If any of the above fails, STOP and report which step + URL + observed vs expected.

- [ ] **Step 4: Mobile-width sanity (Chrome DevTools device toolbar @ 360px)**

In DevTools toggle the device toolbar to 360px wide. Walk `/sports/soccer`. Confirm the header does NOT overflow horizontally and the switch pill remains visible (no horizontal scroll on the header row). If it overflows, file a follow-up note (icon-only collapse at `<sm` is allowed per spec §8 but is OUT of scope for this PR).

- [ ] **Step 5: Final commit (optional — only if anything changed during verification)**

If Steps 1–4 produced no code edits, there is nothing to commit. If a regression was found and fixed in this task, commit it with a `fix(top-mode-switch): ...` message + Co-Authored-By trailer.

```bash
git status --short            # should be empty
git log --oneline main..HEAD  # should show 5 commits: store, composable, router, component, integration
```

---

## Self-review notes

- **Spec coverage:**
  - §4 store → T1. §5 router meta (all 47 routes) → T3. §6 composable → T2. §7 component → T4. §8 integration → T5. §9 acceptance criteria → T6 verification. §10 out-of-scope honored (no content filter, no bottom-nav change, no new routes, no theme variation). §11 verification → T6. §12 risks (fallback, multi-tab, casino-home name, overflow, persisted plugin) covered by composable design (T2) and verification (T6). §13 implementation order matches T1–T6.
- **Placeholder scan:** no TBD/TODO; every code step shows complete code; integration step (T5) describes the locator pattern concretely with a literal insertion line rather than "add it somewhere appropriate"; manual-smoke matrix in T6 lists exact URLs and exact expected states (no "test thoroughly").
- **Type/name consistency:** `useAppModeStore` (T1) is used in `useAppMode` (T2). `setLastMode` (T1 action) is the only mutator used by `switchTo` (T2). Persistence key `siakabet:appMode` is used identically in T1 and T6 verification. Route name `casino-home` and the Sports descriptor `{ name: "sports", params: { sport: "soccer" } }` are identical in T2 and T6. Categories `sports`/`casino`/`auth`/`cross-cutting` are spelled identically across T2, T3, T6.
- **Coverage math:** 6 sports + 15 casino + 6 auth + 20 cross-cutting = 47 in T3. T3 Step 2 verifies the count matches.
