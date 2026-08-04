# Top-Level Casino/Sports Mode Switch — Design

**Date:** 2026-05-18
**Status:** Design approved, pending spec review
**Branch:** `feat/top-mode-switch`

## 1. Goal

Add a persistent top-level switch that categorises the app into **Casino**
(left) and **Sports** (right). Tapping the inactive side routes the user to
that section's home and remembers the choice as the default for future `/`
visits. The switch reflects which section the current route belongs to and
hides itself on auth routes.

## 2. Approach — URL as source of truth (chosen)

The "current mode" is **derived** from the current route via a route→mode
mapping declared in route `meta`. A small Pinia store persists only
`lastMode` — used as the *default* on cross-cutting routes and as the
remembered home for first-load on `/`. The switch component reads
`currentMode` + `showSwitch` from a composable and dispatches `switchTo(...)`
on click.

Why not state-driven: a separate Pinia `currentMode` would drift out of sync
with the URL on deep-link, back/forward, or programmatic navigation. Why not
layout-driven: home `/` (`TheLanding`), cross-cutting routes (profile,
bonus, promos) and auth all use different layouts, so layout is a poor proxy.

Single source of truth (URL) eliminates drift, makes refresh and deep-links
behave correctly, and limits persisted state to one tiny string.

## 3. Locked behavior (from brainstorming)

- **Behavior:** route switch + remembered default
- **Placement/style:** header pill (segmented control), inline in the existing top header
- **Order:** Casino (left) · Sports (right)
- **Cross-cutting policy:** hide on auth routes; show everywhere else (home, profile, bonus, promotions, promotion-details)
- **Route mapping:** see §5

## 4. Pinia store — `src/stores/app-mode.js` (new)

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
  persist: { key: "siakabet:appMode" }, // pinia-plugin-persistedstate (already configured)
});
```

- Single field, single action — no `currentMode` state (derived elsewhere).
- Persisted via the project's existing `pinia-plugin-persistedstate`
  configuration (see other stores using `persist`).

## 5. Route meta annotation — `src/router/index.js`

Add `meta.category: "sports" | "casino" | "cross-cutting" | "auth"` to every
named route. Routes without an explicit category default to `"cross-cutting"`
at runtime (composable fallback in §6), so omissions degrade safely.

The router has **47 named routes** (verified during spec drafting). Every
one is categorised below — no omissions, no inventions.

**`sports` (6):** `sports`, `live`, `leagues`, `countries`, `country`,
`match-details`

**`casino` (15):** `casino-home`, `casino`, `aviator`, `crash`,
`popular-games`, `new-games`, `play-crash-games`, `play-virtuals-games`,
`play-casino-games`, `virtuals`, `virtual-league`, `pari-league`,
`pari-turbo`, `pari-virtual-jackpot`, `playon`

**`auth` (6):** `signup`, `login`, `forgot-password`, `reset-password`,
`change-password`, `verify-account`

**`cross-cutting` (20):** `home`, `bonus`, `profile`, `promotions`,
`promotion-details`, `my-bets`, `bet-details`, `share-bets`,
`join-affiliate`, `deposit`, `sort-deposit`, `withdraw`,
`terms-and-conditions`, `responsible-gambling`, `privacy-policy`,
`self-exclusion`, `bet-placed`, `welcome-promotions`, `share-feedback`,
`not-found`

Totals: 6 + 15 + 6 + 20 = **47** ✓

If a route exists but is not annotated, the composable falls back to
`cross-cutting` (graceful degradation — switch highlight reflects
`lastMode`). The implementer must NOT add, rename, or restructure routes
in this change.

## 6. Composable — `src/composables/useAppMode.js` (new)

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
    // cross-cutting or unknown → reflect remembered choice
    return lastMode.value;
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

- The Sports home descriptor mirrors `HeaderLinks.vue`'s existing
  `goToSports()` (`{ name: "sports", params: { sport: "soccer" } }`).
- The Casino home descriptor is `{ name: "casino-home" }` — confirmed
  present in the existing router (referenced by `HeaderLinks.vue`).
- Vite auto-imports all `composables/**` (per `CLAUDE.md`), so the composable
  is callable from any SFC without an `import` statement.

## 7. Component — `src/components/TopModeSwitch.vue` (new)

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

- Uses only Emerald Pitch tokens (`bg-card`, `border-border`, `bg-primary`,
  `text-primary-foreground`, `text-muted-foreground`, `text-foreground`) —
  no hardcoded colors.
- Single, focused responsibility (~30 LOC); registered by `unplugin-vue-components`'
  auto-registration (no manual import in HeaderLinks).
- `role="tablist"`/`role="tab"` provide the right semantics; the buttons
  carry `aria-selected` so screen readers announce state.

## 8. Integration — `src/components/HeaderLinks.vue`

Insert `<TopModeSwitch />` into the existing top header layout — between
the brand/logo cluster on the left and the search/profile cluster on the
right. The exact template line depends on `HeaderLinks.vue`'s current
structure; the implementer places it in the central slot.

**Responsive behaviour:** keep text labels at every breakpoint (the pill is
~140px wide — fits at 360px alongside the logo and balance chip in tests).
The implementer must verify no overflow at 360px viewport width during
manual smoke. If overflow is observed, an icon-only collapse at `<sm` is
acceptable as a follow-up *outside this spec* — do not preempt it.

`HeaderLinks` is mounted by the layouts used for Sports / Casino /
cross-cutting routes. `TheAuth` layout uses a different header, so auth
routes will not render `HeaderLinks` and therefore will not render the
switch. The `showSwitch` guard inside the component is belt-and-braces.

No other components, layouts, or stores are touched.

## 9. Acceptance criteria

1. **Visible.** The switch renders inside the top header on every route
   whose `meta.category` is `sports`, `casino`, or `cross-cutting`. It does
   NOT render on `auth` routes.
2. **Reflects route.** On `/sports/*` → Sports is highlighted. On
   `/casino-home`, `/aviator`, `/virtuals`, `/crash`, `/playon`, `/kiron-lite`
   → Casino is highlighted. On cross-cutting routes (`/`, `/profile`,
   `/bonus`, `/promotions`, `/promotion-details/:name`) the highlight
   reflects `lastMode`.
3. **Routes on click.** Tapping the inactive side calls `router.push` to
   that mode's home (`{ name: "casino-home" }` or
   `{ name: "sports", params: { sport: "soccer" } }`).
4. **Persists.** Clicking the switch writes `lastMode` to
   `localStorage["siakabet:appMode"]` (via pinia-plugin-persistedstate).
   After a full reload on a cross-cutting route, the highlight matches the
   last clicked side.
5. **Tokenised.** No hardcoded colors anywhere in the new files; only
   Emerald Pitch token utilities (verified by the project's
   brand-signature grep returning 0 hits on the new files).
6. **No regressions.** `pnpm run build` passes; `npx eslint src/`
   reports no NEW errors. Existing routes/behaviour unchanged.

## 10. Out of scope

- Filtering Home/Promos/Bonus content by current mode.
- Restructuring the bottom navigation per mode.
- Adding, renaming, or removing routes.
- Theme variation between modes.
- A separate mobile/desktop component split (the same single component
  serves both; responsive tweaks are layout-only).
- Mode-scoped deep-link parsing (e.g. `/sports/...` vs `/casino/...`
  prefixing). The route names are the contract; URLs stay as they are.

## 11. Verification (for the plan)

- **Build:** `pnpm run build` → PASS.
- **Lint:** `npx eslint src/components/TopModeSwitch.vue
  src/composables/useAppMode.js src/stores/app-mode.js src/router/index.js
  src/components/HeaderLinks.vue` → no errors.
- **Brand-signature grep** on new/changed files → 0 hits (uses the
  established `/tmp/brandgrep.sh` from the prior re-theme plan; recreate
  via that plan's helper script if missing).
- **Manual smoke (dark + light theme):** Walk `/`, `/sports/soccer`,
  `/sports/live/soccer`, `/casino-home`, `/aviator`, `/bonus`,
  `/profile`, `/login`. Confirm: switch present on all except `/login`;
  highlight reflects route per §9.2; clicking flips highlight and
  navigates; reloading on `/` lands you in your last mode's home.

## 12. Risks & mitigations

| Risk | Mitigation |
|---|---|
| A route lacks `meta.category` | Composable falls back to `cross-cutting`; highlight uses `lastMode`. No crash. Add meta later. |
| Concurrent tabs in different modes | URL drives each tab's highlight; only `lastMode` write races (last-write-wins — acceptable). |
| `casino-home` route name differs from current router | Verify during implementation: the existing `HeaderLinks.vue` already uses `router.push({ name: "casino-home", query: { category: ... } })`, so the name is established. |
| Header overflow at 360px viewport | The pill is ~140px; if it crowds the balance chip, collapse to icons-only at `sm:` breakpoint. Implementer to verify. |
| `pinia-plugin-persistedstate` not registered for new store | The project's main Pinia setup (`src/main.js` / equivalent) already registers the plugin globally (multiple stores use `persist:`); the new store inherits this. |

## 13. Implementation order (for the plan)

1. Create `src/stores/app-mode.js`.
2. Create `src/composables/useAppMode.js`.
3. Annotate route `meta.category` in `src/router/index.js`.
4. Create `src/components/TopModeSwitch.vue`.
5. Insert `<TopModeSwitch />` into `src/components/HeaderLinks.vue`.
6. Verification pass: build + eslint + brand-signature grep + manual smoke per §11.
