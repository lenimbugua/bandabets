# Tabler Icon System Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace all `@heroicons/vue` and `lucide-vue-next` usages with Tabler icons delivered via `@nuxt/icon`, then remove both old dependencies.

**Architecture:** Install the `@nuxt/icon` Nuxt module with the Tabler collection bundled locally (`@iconify-json/tabler`) so SSR never calls the Iconify CDN. A global `customize` hook in `app/app.config.js` rewrites Tabler's `stroke-width="2"` to `1.5`. Migration is a mechanical sweep over ~100 files using the mapping table below, batched into four tasks, each ending in a passing build and a commit.

**Tech Stack:** Nuxt 4 (SSR), `@nuxt/icon`, `@iconify-json/tabler`, pnpm. JavaScript only — no TypeScript.

**Spec:** `docs/superpowers/specs/2026-08-07-tabler-icon-migration-design.md`

## Global Constraints

- No test framework exists. Verification per task = scoped grep proving the batch is clean + `pnpm build` passing.
- Outline icons only; `tabler:*-filled` is allowed ONLY where the code conditionally swaps a solid/outline pair to signal an active/selected state (rule in "Solid → outline policy" below).
- Icon color must come from `currentColor` (existing `text-*` classes). Never add a hard-coded color to an icon.
- Preserve every existing class, event binding, `v-if`/`v-else`, and `aria-*` attribute when swapping a tag. Only the tag name and the import change.
- Do not touch `app/components/icons/`, inline `<svg>` blocks, `app/components/mobile/MobileFooterV2.vue`, or `app/assets/css/style.css` (spec non-goals).
- Commit after every task. Working branch: `feat/tabler-icons` (create from `main` before Task 1: `git checkout -b feat/tabler-icons`).

## Icon Mapping Table

Every migration task uses this table. Left = imported component name in source, right = `name` prop for `<Icon>`.

### Heroicons → Tabler

| Heroicons component | Tabler name |
|---|---|
| ArrowDownOnSquareStackIcon | `tabler:download` |
| ArrowLeftIcon | `tabler:arrow-left` |
| ArrowLongRightIcon | `tabler:arrow-narrow-right` |
| ArrowPathIcon | `tabler:refresh` |
| ArrowRightIcon | `tabler:arrow-right` |
| ArrowTrendingUpIcon | `tabler:trending-up` |
| BanknotesIcon | `tabler:cash-banknote` |
| Bars4Icon | `tabler:menu-2` |
| BellIcon | `tabler:bell` |
| BoltIcon | `tabler:bolt` |
| CalendarDaysIcon | `tabler:calendar-month` |
| CalendarIcon | `tabler:calendar` |
| ChatBubbleLeftRightIcon | `tabler:messages` |
| CheckBadgeIcon | `tabler:rosette-discount-check` |
| CheckCircleIcon | `tabler:circle-check` |
| CheckIcon | `tabler:check` |
| ChevronDownIcon | `tabler:chevron-down` |
| ChevronLeftIcon | `tabler:chevron-left` |
| ChevronRightIcon | `tabler:chevron-right` |
| ChevronUpDownIcon | `tabler:selector` |
| ChevronUpIcon | `tabler:chevron-up` |
| ClipboardDocumentIcon | `tabler:copy` |
| ClipboardDocumentListIcon | `tabler:clipboard-list` |
| ClockIcon | `tabler:clock` |
| CubeIcon | `tabler:box` |
| DevicePhoneMobileIcon | `tabler:device-mobile` |
| DocumentCurrencyDollarIcon | `tabler:file-dollar` |
| DocumentDuplicateIcon | `tabler:files` |
| ExclamationCircleIcon | `tabler:alert-circle` |
| ExclamationTriangleIcon | `tabler:alert-triangle` |
| EyeIcon | `tabler:eye` |
| EyeSlashIcon | `tabler:eye-off` |
| FireIcon | `tabler:flame` |
| FlagIcon | `tabler:flag` |
| GiftIcon | `tabler:gift` |
| GiftTopIcon | `tabler:gift` |
| GlobeAltIcon | `tabler:world` |
| InformationCircleIcon | `tabler:info-circle` |
| LightBulbIcon | `tabler:bulb` |
| LinkIcon | `tabler:link` |
| LockClosedIcon | `tabler:lock` |
| MagnifyingGlassIcon | `tabler:search` |
| PlusIcon | `tabler:plus` |
| PuzzlePieceIcon | `tabler:puzzle` |
| QuestionMarkCircleIcon | `tabler:help-circle` |
| ShareIcon | `tabler:share` |
| ShieldCheckIcon | `tabler:shield-check` |
| SignalIcon | `tabler:broadcast` |
| SparklesIcon | `tabler:sparkles` |
| Squares2X2Icon | `tabler:layout-grid` |
| StarIcon | `tabler:star` |
| TicketIcon | `tabler:ticket` |
| TrophyIcon | `tabler:trophy` |
| UserGroupIcon | `tabler:users-group` |
| UserPlusIcon | `tabler:user-plus` |
| ViewfinderCircleIcon | `tabler:focus-2` |
| WindowIcon | `tabler:app-window` |
| XMarkIcon | `tabler:x` |

`TraashIcon` appears only in a commented-out import in `app/components/community-bets/BookedBetslipDetails.vue` — delete the commented line, nothing to map.

### Lucide → Tabler

| Lucide component | Tabler name |
|---|---|
| ArrowRight | `tabler:arrow-right` |
| Bell | `tabler:bell` |
| Check | `tabler:check` |
| ChevronLeft | `tabler:chevron-left` |
| ChevronRight | `tabler:chevron-right` |
| Clock | `tabler:clock` |
| Copy | `tabler:copy` |
| Crown | `tabler:crown` |
| Flame | `tabler:flame` |
| Gamepad2 | `tabler:device-gamepad-2` |
| Gem | `tabler:diamond` |
| Gift | `tabler:gift` |
| Home | `tabler:home` |
| Lock | `tabler:lock` |
| Plane | `tabler:plane` |
| Rocket | `tabler:rocket` |
| Share2 | `tabler:share` |
| Sparkles | `tabler:sparkles` |
| Swords | `tabler:swords` |
| TrendingUp | `tabler:trending-up` |
| Trophy | `tabler:trophy` |
| User | `tabler:user` |
| Users | `tabler:users` |
| Wallet | `tabler:wallet` |
| Zap | `tabler:bolt` |

## Transformation Recipe

Applied identically in every migration task.

**Simple usage — before:**

```vue
<script setup>
import { ChevronDownIcon } from "@heroicons/vue/20/solid";
import { XMarkIcon, ClockIcon } from "@heroicons/vue/24/outline";
</script>

<template>
  <XMarkIcon class="w-5 h-5 text-muted-foreground" @click="close" />
  <ChevronDownIcon v-if="open" class="w-4 h-4" aria-hidden="true" />
</template>
```

**After:**

```vue
<template>
  <Icon name="tabler:x" class="w-5 h-5 text-muted-foreground" @click="close" />
  <Icon name="tabler:chevron-down" v-if="open" class="w-4 h-4" aria-hidden="true" />
</template>
```

Rules:
1. Delete the icon import specifiers. If an import statement becomes empty, delete the whole statement. If `<script setup>` becomes empty, delete the block. Never delete non-icon specifiers from a mixed import.
2. Replace `<SomeIcon .../>` with `<Icon name="tabler:..." .../>` per the mapping table, keeping all other attributes verbatim.
3. **Dynamic usage:** where icons are stored in data (e.g. `{ icon: ClockIcon }`) and rendered via `<component :is="item.icon">`, replace the stored value with the Tabler name string (`{ icon: "tabler:clock" }`) and the render site with `<Icon :name="item.icon">`.
4. Unused-icon imports (imported but never used in the template or data): just delete the import.

## Solid → outline policy

All `20/solid`, `24/solid`, and `16/solid` imports map to the same (outline) Tabler names in the table. **Exception:** if a file imports the *same* icon in both solid and outline and conditionally renders one or the other (an active/favorite/selected toggle), the branch that rendered solid becomes the `-filled` Tabler variant (e.g. `tabler:star-filled`); the outline branch keeps the table name. When in doubt, use outline.

---

### Task 1: Install and configure @nuxt/icon with Tabler

**Files:**
- Modify: `package.json` (via pnpm), `nuxt.config.js` (modules array)
- Create: `app/app.config.js`

**Interfaces:**
- Produces: globally auto-registered `<Icon name="tabler:...">` component, 1.5 stroke width, used by every later task.

- [ ] **Step 1: Install packages**

```bash
pnpm add @nuxt/icon && pnpm add -D @iconify-json/tabler
```

- [ ] **Step 2: Verify every mapped Tabler name exists in the installed collection**

```bash
node -e '
const t = require("@iconify-json/tabler/icons.json");
const names = ["download","arrow-left","arrow-narrow-right","refresh","arrow-right","trending-up","cash-banknote","menu-2","bell","bolt","calendar-month","calendar","messages","rosette-discount-check","circle-check","check","chevron-down","chevron-left","chevron-right","selector","chevron-up","copy","clipboard-list","clock","box","device-mobile","file-dollar","files","alert-circle","alert-triangle","eye","eye-off","flame","flag","gift","world","info-circle","bulb","link","lock","search","plus","puzzle","help-circle","share","shield-check","broadcast","sparkles","layout-grid","star","ticket","trophy","users-group","user-plus","focus-2","app-window","x","crown","device-gamepad-2","diamond","home","plane","rocket","swords","user","users","wallet","star-filled"];
const missing = names.filter(n => !t.icons[n] && !(t.aliases && t.aliases[n]));
console.log(missing.length ? "MISSING: " + missing.join(", ") : "ALL " + names.length + " NAMES OK");'
```

Expected: `ALL 68 NAMES OK`. If any name prints as MISSING, find the current Tabler name (`node -e 'const t=require("@iconify-json/tabler/icons.json"); console.log(Object.keys(t.icons).filter(k=>k.includes("<fragment>")))'`), and update the mapping table in this plan file before proceeding.

- [ ] **Step 3: Register the module in `nuxt.config.js`**

In the `modules` array add `"@nuxt/icon"`, and add a top-level `icon` key to the config object:

```js
  modules: [
    "@pinia/nuxt",
    "pinia-plugin-persistedstate/nuxt",
    "@vueuse/nuxt",
    "@nuxt/eslint",
    "@nuxt/icon",
  ],
  icon: {
    serverBundle: { collections: ["tabler"] },
    fallbackToApi: false,
  },
```

`fallbackToApi: false` guarantees no runtime `api.iconify.design` calls (spec requirement for restricted GKE egress).

- [ ] **Step 4: Create `app/app.config.js` with the stroke-width standard**

```js
export default defineAppConfig({
  icon: {
    customize: (content) =>
      content.replace(/stroke-width="2"/g, 'stroke-width="1.5"'),
  },
});
```

- [ ] **Step 5: Verify the dev server boots with the module installed**

```bash
pnpm dev &
sleep 15
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:5079/
kill %1
```

Expected: `200`. No page uses `<Icon>` yet, so the stroke-width hook cannot be verified here — that verification is Task 2 Step 3, which runs as soon as the first migrated components exist. This step only proves the module and app config introduce no boot/module-resolution errors.

- [ ] **Step 6: Build check**

```bash
pnpm build
```

Expected: exits 0.

- [ ] **Step 7: Commit**

```bash
git add package.json pnpm-lock.yaml nuxt.config.js app/app.config.js
git commit -m "feat: add @nuxt/icon with locally bundled Tabler collection"
```

---

### Task 2: Migrate flat components A–L (27 files)

**Files (Modify):** `app/components/` — `AviatorContent.vue`, `BetBuilder.vue`, `BetBuilderCompetition.vue`, `BetNowButton.vue`, `BetPlaceError.vue`, `BetPlaceSuccess.vue`, `BetPlaced.vue`, `BetslipModal.vue`, `CalendarDropdown.vue`, `CalendarPopover.vue`, `CancelBet.vue`, `CasinoCategories.vue`, `CasinoSearch.vue`, `ChangeEventMatches.vue`, `ChatModal.vue`, `ConfirmRemoveSlip.vue`, `CustomerSupportModal.vue`, `DepositModal.vue`, `EmptyState.vue`, `FreebetContent.vue`, `GeniusGameTrackerModal.vue`, `HoursTab.vue`, `InsufficientBalanceModal.vue`, `LeagueCard.vue`, `LeagueMatchCard.vue`, `LiveMatchesPreviewDesktop.vue`, `LoginModal.vue`

**Interfaces:**
- Consumes: `<Icon>` component and stroke config from Task 1; mapping table and transformation recipe from this plan's header.

- [ ] **Step 1: Apply the transformation recipe to each of the 27 files**

For each file: open it, find every `@heroicons/vue` import, replace usages per the mapping table and recipe rules 1–4, applying the solid → outline policy.

- [ ] **Step 2: Verify the batch is clean**

```bash
grep -l "@heroicons/vue" app/components/*.vue | awk -F/ '$3 <= "LoginModal.vue"' | wc -l
```

Expected: `0`. (Files M–Z still match — that's Task 3.)

- [ ] **Step 3: Verify stroke customization renders (first real `<Icon>` usages now exist)**

```bash
pnpm dev &
sleep 15
curl -s http://localhost:5079/ > /tmp/ssr.html
grep -o "stroke-width[^ ]*1.5" /tmp/ssr.html | head -3
kill %1
```

Expected: at least one `stroke-width...1.5` match (icons render as CSS masks with the SVG data-URI inline; encoding may pad the match — any hit containing both `stroke-width` and `1.5` counts). If matches show `stroke-width` with `2` only: the customize hook isn't applying — check that the file is `app/app.config.js` (Nuxt 4 `srcDir` is `app/`) and consult the installed `@nuxt/icon` README for the current `customize` signature before proceeding.

- [ ] **Step 4: Build check**

```bash
pnpm build
```

Expected: exits 0.

- [ ] **Step 5: Commit**

```bash
git add -A app/components
git commit -m "refactor: migrate flat components A-L to Tabler icons"
```

---

### Task 3: Migrate flat components M–Z (27 files)

**Files (Modify):** `app/components/` — `MainCategories.vue`, `MainCategoryIcons.vue`, `MarketSort.vue`, `MatchDetails.vue`, `MatchDetailsMatch.vue`, `MultibetBoostModal.vue`, `NotAuthenicated.vue`, `NotificationModal.vue`, `OneCutModal.vue`, `OneCutStripLevel.vue`, `RoadBlockModal.vue`, `SearchModal.vue`, `ShareAnIdea.vue`, `ShareBetslipButton.vue`, `SortByTimeAndLeague.vue`, `SportsIconsModal.vue`, `TheBets.vue`, `TheDepositBar.vue`, `TheDrawer.vue`, `TheLeagues.vue`, `ThePromos.vue`, `TransparentHeader.vue`, `TwoUpModal.vue`, `VerifyAccount.vue`, `ViewMatch.vue`, `WelcomeGiftStrip.vue`, `WithdrawFunds.vue`

**Interfaces:**
- Consumes: `<Icon>` component from Task 1; mapping table and transformation recipe from this plan's header.

- [ ] **Step 1: Apply the transformation recipe to each of the 27 files**

Same procedure as Task 2 Step 1: per file, replace `@heroicons/vue` imports and usages using the mapping table, recipe rules 1–4, and the solid → outline policy.

- [ ] **Step 2: Verify no flat component imports heroicons anymore**

```bash
grep -l "@heroicons/vue" app/components/*.vue | wc -l
```

Expected: `0`.

- [ ] **Step 3: Build check**

```bash
pnpm build
```

Expected: exits 0.

- [ ] **Step 4: Commit**

```bash
git add -A app/components
git commit -m "refactor: migrate flat components M-Z to Tabler icons"
```

---

### Task 4: Migrate feature subdirectories and pages (35 files)

**Files (Modify):**
- `app/components/affiliate/` — `AffiliateCall.vue`, `AffiliateCopyToClipboard.vue`, `AffiliateFAQs.vue`, `MyEarnings.vue`, `ShareButton.vue`, `SocialconsModal.vue`
- `app/components/cashout/PartialCashout.vue`
- `app/components/community-bets/` — `BookedBetPreviewModal.vue`, `BookedBetsFAQs.vue`, `BookedBetslipDetails.vue` (also delete the commented `TraashIcon` import line), `CategoryPagination.vue`, `CopyCode.vue`, `LoadCode.vue`, `SelectionsCard.vue`, `ShareBetModal.vue`, `SocialsIcons.vue`
- `app/components/festive/` — `InviteFriendModal.vue`, `InviteFriends.vue`
- `app/components/games-links/SportsGamesVertical.vue`
- `app/components/haki-league/` — `LeagueEmptySlip.vue`, `chat/ChatTopBar.vue`
- `app/components/leaderboard/` — `LeaderboardStatsBar.vue`, `TheLeaderboard.vue`
- `app/components/live/` — `CompetitionsCard.vue`, `LiveSortByMenu.vue`
- `app/components/mobile/` — `LiveMatchesPreview.vue`, `SportsFilterBar.vue`
- `app/components/new-league/ChatButton.vue`
- `app/components/profile/ProfileIcons.vue`
- `app/components/promo-strip/HakiLeaguePromoStrip.vue`
- `app/components/promos/` — `LeaderboardPromo.vue`, `PromoIndex.vue`, `PromotionDetails.vue`
- `app/pages/` — `aviator.vue`, `casino-home.vue`

**Interfaces:**
- Consumes: `<Icon>` component from Task 1; mapping table and transformation recipe from this plan's header.

- [ ] **Step 1: Apply the transformation recipe to each of the 35 files**

Same procedure: per file, replace `@heroicons/vue` imports and usages using the mapping table, recipe rules 1–4, and the solid → outline policy.

- [ ] **Step 2: Verify heroicons is fully gone from the app**

```bash
grep -rn "@heroicons/vue" app/ | wc -l
```

Expected: `0`.

- [ ] **Step 3: Build check**

```bash
pnpm build
```

Expected: exits 0.

- [ ] **Step 4: Commit**

```bash
git add -A app
git commit -m "refactor: migrate feature components and pages to Tabler icons"
```

---

### Task 5: Migrate Lucide files (11 files)

**Files (Modify):** `app/components/NewGames.vue`, `app/components/AllGames.vue`, `app/components/AllGames2.vue`, `app/components/bonus/BonusHeader.vue`, `app/components/bonus/BonusCard.vue`, `app/components/bonus/ReferralSection.vue`, `app/components/bonus/BottomNav.vue`, `app/components/bonus/MissionsSection.vue`, `app/components/bonus/PromoBanner.vue`, `app/components/bonus/DailyRewards.vue`, `app/pages/bonus.vue`

**Interfaces:**
- Consumes: `<Icon>` component from Task 1; Lucide section of the mapping table; transformation recipe rules 1–4.

- [ ] **Step 1: Apply the transformation recipe to each of the 11 files**

Identical mechanics to the heroicons tasks, using the **Lucide → Tabler** table. Lucide components have no Icon suffix (`<Wallet />` → `<Icon name="tabler:wallet" />`). Watch for dynamic usage (recipe rule 3) — bonus components commonly store icons in arrays like `{ icon: Gift }`.

- [ ] **Step 2: Verify lucide is fully gone**

```bash
grep -rn "lucide-vue-next" app/ | wc -l
```

Expected: `0`.

- [ ] **Step 3: Build check**

```bash
pnpm build
```

Expected: exits 0.

- [ ] **Step 4: Commit**

```bash
git add -A app
git commit -m "refactor: migrate bonus/games components from Lucide to Tabler icons"
```

---

### Task 6: Remove old dependencies and final verification

**Files:**
- Modify: `package.json`, `pnpm-lock.yaml` (via pnpm)

**Interfaces:**
- Consumes: Tasks 2–5 having removed every import of both packages.

- [ ] **Step 1: Prove zero remaining imports anywhere (including server/)**

```bash
grep -rn "@heroicons/vue\|lucide-vue-next" app/ server/ nuxt.config.js | wc -l
```

Expected: `0`. If not 0, fix the stragglers with the transformation recipe before continuing.

- [ ] **Step 2: Remove the packages**

```bash
pnpm remove @heroicons/vue lucide-vue-next
```

- [ ] **Step 3: Build check**

```bash
pnpm build
```

Expected: exits 0.

- [ ] **Step 4: Commit**

```bash
git add package.json pnpm-lock.yaml
git commit -m "chore: remove @heroicons/vue and lucide-vue-next"
```

---

### Task 7: Visual smoke pass

**Files:** none modified (verification only; fixes found here are applied to whichever file is wrong, using the recipe).

**Interfaces:**
- Consumes: the fully migrated app from Tasks 1–6.

- [ ] **Step 1: Start the dev server**

```bash
pnpm dev
```

- [ ] **Step 2: Check high-traffic screens for blank icons**

Visit each of: `/` (home), a sports listing page, the betslip (add a selection), `/bonus`, and the profile/account area — at mobile viewport width and desktop. A wrong Tabler name renders as an **empty box/blank span**; that is the failure signature to look for. Use browser tools if available in the session; otherwise SSR-grep each route:

```bash
for r in / /bonus /casino-home; do
  curl -s "http://localhost:5079$r" | grep -o 'tabler:[a-z0-9-]*' | sort -u
done
```

Any icon name printed here that is NOT in the mapping table's right-hand column indicates a typo introduced during migration — fix it against the table.

- [ ] **Step 3: Confirm no Iconify CDN dependency**

```bash
curl -s http://localhost:5079/ | grep -c "api.iconify.design"
```

Expected: `0`.

- [ ] **Step 4: Fix anything found, rebuild, commit**

If Steps 2–3 surfaced fixes:

```bash
pnpm build
git add -A app
git commit -m "fix: correct icon names found in visual smoke pass"
```

If nothing was found, no commit — the migration is complete.
