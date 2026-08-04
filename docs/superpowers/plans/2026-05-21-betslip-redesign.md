# Betslip Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reskin the Sports betslip in place to match the reference layout (promo boost banner → MULTI BET header with inline share → bet rows → total odds → inline stake stepper → boost-awarded band → possible-win band → REMOVE ALL + PLACE BET) using Emerald Pitch tokens only. No store, composable, or API changes.

**Architecture:** Approach A from the spec — modify the existing component tree under `src/components/` with one new tiny child (`BetslipMultiHeader.vue`) and one retired button (`ShareBetslipButton.vue`). The shared inner `SportsBetslip.vue` re-orders existing children; the desktop sticky panel and the mobile bottom-sheet modal simplify their header bands; the footer (`BetControls.vue`) takes on the new visual hierarchy.

**Tech Stack:** Vue 3 Composition API (`<script setup>`), Pinia (`useBetslipStore`), Tailwind CSS with Emerald Pitch token utilities defined in `src/style.css`, Headless UI Dialog (existing), Heroicons (existing). No tests exist in this project — verification is done via `npx eslint src/<file>`, `pnpm run build`, manual visual check on `pnpm dev` (port 5079), and a token-purity grep.

**Spec reference:** `docs/superpowers/specs/2026-05-21-betslip-redesign-design.md`.

---

## File Structure

**Files to create:**
- `src/components/BetslipMultiHeader.vue` — "MULTI BET (N) / SINGLE BET" row with inline Share pill, hosts the share-bet flow.

**Files to modify:**
- `src/components/SportsBetslip.vue` — slot in `BetslipMultiHeader` between `MultibetBoost` and the list.
- `src/components/MultibetBoost.vue` — full redesign as gold promotional banner with gift icon + two-line copy + thin progress + min-odds sub-line.
- `src/components/BetslipMatchDetails.vue` — row restructure to `[icon][teams … X]` + market + `Your Pick: outcome … odds`.
- `src/components/BetslipBetbuilderDetails.vue` — same row frame, retains `BetBuilderSelections`.
- `src/components/BetControls.vue` — footer stack: TOTAL ODDS row, BET AMOUNT row with inline stepper, BOOST AWARDED band, conditional 1-CUT band, POSSIBLE WIN band, REMOVE ALL + PLACE BET actions.
- `src/components/TheStake.vue` — drop quick-pill row, expose only `−` / input / `+` inline stepper.
- `src/components/BetslipBonus.vue` — full-width gold band (Boost Awarded).
- `src/components/PossibleWin.vue` — dark band, amount in `text-gold-bright`.
- `src/components/OneCutWin.vue` — primary-tint band, replace raw `oklch(...)` with token utilities.
- `src/components/EmptyBetslip.vue` — token sweep, keep `BetslipLoadCode`.
- `src/components/SportsBetslipPanel.vue` — header simplified (drop Clear All).
- `src/components/BetslipModal.vue` — header simplified (drop Clear All).

**Files to delete:**
- `src/components/ShareBetslipButton.vue` — its API call logic is inlined into the new `BetslipMultiHeader.vue`; no other file imports it after Task 9.

**Files unchanged:**
- `src/stores/sports-betslip.js`, `src/composables/useBetslip.js`, `src/composables/useMultibetBonus.js`, `src/composables/useTax.js`, `src/composables/useOneCut.js`, `src/composables/useBetslipLogin.js`, `src/stores/sharebet.js`, `src/components/BetslipLoadCode.vue`, `src/components/BetBuilderSelections.vue`, `src/components/TwoUpIcon.vue`, `src/components/OneCutIcon.vue`, `src/components/TheButtonSpin.vue`, `src/components/TotalOdds.vue`.

---

## Tasks

### Task 1: Create `BetslipMultiHeader.vue`

**Files:**
- Create: `src/components/BetslipMultiHeader.vue`

- [ ] **Step 1: Create the new component file**

Write `src/components/BetslipMultiHeader.vue` with the exact contents:

```vue
<script setup>
import { ShareIcon } from "@heroicons/vue/20/solid";
import { storeToRefs } from "pinia";
import { useBetslipLogin } from "@/composables/useBetslipLogin";
import { useModalTypes } from "@/composables/useModalTypes";
import { useModalStore } from "@/stores/modal";
import { useLoginStore } from "@/stores/login";
import { useShareBetStore } from "@/stores/sharebet";
import { useBetslipStore } from "@/stores/sports-betslip";

const { openLogin } = useBetslipLogin();
const { showNoBetError } = useBetslipStore();
const { betslip, betslipLength } = storeToRefs(useBetslipStore());
const { shareBetslip } = useShareBetStore();
const { pending } = storeToRefs(useShareBetStore());
const { shareBet } = useModalTypes();
const { openModal } = useModalStore();
const { isAuthenticated } = storeToRefs(useLoginStore());

async function onShare() {
  if (!betslip.value.length) {
    showNoBetError();
    return;
  }
  if (!isAuthenticated.value) {
    openLogin();
    return;
  }
  await shareBetslip(betslip.value);
  openModal(shareBet);
}
</script>

<template>
  <div
    v-if="betslipLength > 0"
    class="flex items-center justify-between bg-surface-elevated border-y border-border px-3 py-2"
  >
    <span class="text-xs font-extrabold tracking-wider text-foreground uppercase">
      <template v-if="betslipLength > 1">Multi Bet ({{ betslipLength }})</template>
      <template v-else>Single Bet</template>
    </span>
    <button
      type="button"
      class="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-3 py-1.5 text-xs font-bold text-foreground hover:bg-surface-interactive transition-colors cursor-pointer"
      @click="onShare"
    >
      <TheButtonSpin v-if="pending" />
      <template v-else>
        <ShareIcon class="w-3.5 h-3.5" />
        <span>Share</span>
      </template>
    </button>
  </div>
</template>
```

- [ ] **Step 2: Lint the new file**

Run: `npx eslint src/components/BetslipMultiHeader.vue`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/BetslipMultiHeader.vue
git commit -m "feat(betslip): add BetslipMultiHeader with inline Share button"
```

---

### Task 2: Redesign `MultibetBoost.vue` as the promo banner

**Files:**
- Modify: `src/components/MultibetBoost.vue`

- [ ] **Step 1: Replace the file with the new design**

Overwrite `src/components/MultibetBoost.vue` with:

```vue
<script setup>
import { computed, toRefs } from "vue";
import { useBetslip } from "@/composables/useBetslip";
import { useMultibetBonus } from "@/composables/useMultibetBonus";
import { useBetslipStore } from "../stores/sports-betslip";

const { calculatePossibleWin } = useBetslip();
const { betslip, stake, betslipLength } = toRefs(useBetslipStore());

const {
  getCurrentBoost,
  getNextBoost,
  getLegsToNextBonus,
  calculateBoostBonus,
} = useMultibetBonus();

const possibleWin = computed(() =>
  calculatePossibleWin(betslip.value, stake.value)
);

const boostAmount = computed(() =>
  Number(calculateBoostBonus(possibleWin.value) || 0).toFixed(2)
);

const atMaxBoost = computed(() => getLegsToNextBonus() === 0);
const progressWidth = computed(() => Math.min(getCurrentBoost() * 2, 100));
</script>

<template>
  <div v-if="betslipLength > 1" class="px-3 pt-3">
    <div
      class="rounded-xl border border-gold-deep bg-gold text-gold-foreground p-4"
    >
      <p class="text-sm font-semibold">
        Your Multibet of <strong class="font-extrabold">{{ betslipLength }}</strong> selections gives you a boost of
        <strong class="font-extrabold tabular-nums">{{ getCurrentBoost() }}%</strong>
        (<span class="tabular-nums">KSH {{ boostAmount }}</span>)
      </p>

      <div class="mt-3 flex items-start gap-2.5">
        <svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="w-5 h-5 shrink-0 mt-0.5"
        >
          <polyline points="20 12 20 22 4 22 4 12" />
          <rect x="2" y="7" width="20" height="5" />
          <line x1="12" y1="22" x2="12" y2="7" />
          <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
          <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
        </svg>
        <div class="min-w-0">
          <p v-if="!atMaxBoost" class="text-base font-extrabold leading-tight">
            Add {{ getLegsToNextBonus() }} more to get a {{ getNextBoost() }}% boost!
          </p>
          <p v-else class="text-base font-extrabold leading-tight">
            Max boost unlocked
          </p>
          <p class="mt-1 text-xs font-medium text-gold-foreground/80">
            1.3 minimum odds per game
          </p>
        </div>
      </div>

      <div class="mt-3 h-1 rounded-full bg-gold-deep/30 overflow-hidden">
        <div
          class="h-full rounded-full bg-gold-foreground transition-all duration-300"
          :style="{ width: progressWidth + '%' }"
        ></div>
      </div>
    </div>
  </div>
</template>
```

- [ ] **Step 2: Lint**

Run: `npx eslint src/components/MultibetBoost.vue`
Expected: no errors.

- [ ] **Step 3: Build**

Run: `pnpm run build`
Expected: build succeeds with no template errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/MultibetBoost.vue
git commit -m "feat(betslip): redesign MultibetBoost as gold promotional banner"
```

---

### Task 3: Restructure `BetslipMatchDetails.vue`

**Files:**
- Modify: `src/components/BetslipMatchDetails.vue`

- [ ] **Step 1: Replace the file**

Overwrite `src/components/BetslipMatchDetails.vue` with:

```vue
<script setup>
import { useMatchDetails } from "@/composables/useMatchDetails";
import { useRouter } from "vue-router";
import { useFormatDates } from "../composables/useFormatDates";
import { useSportsIcons } from "../composables/useSportsIcons";
import TwoUpIcon from "./TwoUpIcon.vue";

defineProps({
  item: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
  deleteAnItemFromBetslip: {
    type: Function,
    required: true,
  },
});

const router = useRouter();
const { goToMatchDetails } = useMatchDetails();
const { humanFriendlyDate } = useFormatDates();
const { getSportsIcon } = useSportsIcons();
</script>

<template>
  <div class="px-3 py-2.5">
    <div class="flex items-start gap-2">
      <span class="text-base leading-none mt-0.5 shrink-0" aria-hidden="true">
        {{ getSportsIcon(item.sportBinomen) }}
      </span>

      <div
        class="min-w-0 flex-1 cursor-pointer"
        @click="goToMatchDetails(item, router, item.live)"
      >
        <div class="flex items-center gap-1.5">
          <span class="text-sm font-bold text-foreground truncate">
            {{ item.homeTeam }} &ndash; {{ item.awayTeam }}
          </span>
          <span
            v-if="item.live"
            class="inline-flex items-center rounded-full px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-destructive bg-destructive/10 shrink-0"
          >Live</span>
        </div>

        <p class="mt-1 text-xs text-muted-foreground">
          {{ item.oddType }}
        </p>

        <div class="mt-0.5 flex items-baseline justify-between gap-2">
          <p class="text-xs text-muted-foreground">
            Your Pick:
            <span class="font-bold text-foreground">{{ item.outcomeName }}</span>
          </p>
          <div class="flex items-center gap-1 shrink-0">
            <TwoUpIcon
              v-if="item?.twoGoalUpActive && item?.outcomeName !== 'x'"
            />
            <span class="text-sm font-extrabold text-foreground tabular-nums">
              {{ item.oddValue }}
            </span>
          </div>
        </div>

        <p class="mt-1 text-[10px] text-muted-foreground">
          {{ item.live ? 'Started' : 'Starts' }} {{ humanFriendlyDate(item.startTime) }}
        </p>
      </div>

      <button
        class="shrink-0 w-5 h-5 flex items-center justify-center rounded text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors cursor-pointer"
        :aria-label="'Remove ' + item.homeTeam + ' vs ' + item.awayTeam"
        @click="deleteAnItemFromBetslip(item.customId)"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-3.5 h-3.5">
          <path d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z" />
        </svg>
      </button>
    </div>
  </div>
</template>
```

- [ ] **Step 2: Lint and build**

Run: `npx eslint src/components/BetslipMatchDetails.vue && pnpm run build`
Expected: lint clean, build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/components/BetslipMatchDetails.vue
git commit -m "feat(betslip): restructure match row to icon + teams + Your Pick layout"
```

---

### Task 4: Restructure `BetslipBetbuilderDetails.vue`

**Files:**
- Modify: `src/components/BetslipBetbuilderDetails.vue`

- [ ] **Step 1: Replace the file**

Overwrite `src/components/BetslipBetbuilderDetails.vue` with:

```vue
<script setup>
import { useMatchDetails } from "@/composables/useMatchDetails";
import { useRouter } from "vue-router";
import { useFormatDates } from "../composables/useFormatDates";
import { useSportsIcons } from "../composables/useSportsIcons";
import BetBuilderSelections from "./BetBuilderSelections.vue";
import TwoUpIcon from "./TwoUpIcon.vue";

defineProps({
  item: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
  deleteAnItemFromBetslip: {
    type: Function,
    required: true,
  },
});

const router = useRouter();
const { goToMatchDetails } = useMatchDetails();
const { humanFriendlyDate } = useFormatDates();
const { getSportsIcon } = useSportsIcons();
</script>

<template>
  <div class="px-3 py-2.5">
    <div class="flex items-start gap-2">
      <span class="text-base leading-none mt-0.5 shrink-0" aria-hidden="true">
        {{ getSportsIcon(item.sportBinomen) }}
      </span>

      <div
        class="min-w-0 flex-1 cursor-pointer"
        @click="goToMatchDetails(item, router, item.live)"
      >
        <div class="flex items-center gap-1.5">
          <span class="inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary bg-primary/10 shrink-0">
            Builder
          </span>
          <span class="text-sm font-bold text-foreground truncate">
            {{ item.homeTeam }} &ndash; {{ item.awayTeam }}
          </span>
        </div>

        <BetBuilderSelections class="mt-1 w-full" :selections="item.selections" />

        <div class="mt-1 flex items-center justify-between gap-2">
          <p class="text-[10px] text-muted-foreground">
            Starts {{ humanFriendlyDate(item.startTime) }}
          </p>
          <div class="flex items-center gap-1 shrink-0">
            <TwoUpIcon
              v-if="item?.twoGoalUpActive && item?.outcomeName !== 'x'"
            />
            <span class="text-sm font-extrabold text-foreground tabular-nums">
              {{ item.oddValue }}
            </span>
          </div>
        </div>
      </div>

      <button
        class="shrink-0 w-5 h-5 flex items-center justify-center rounded text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors cursor-pointer"
        :aria-label="'Remove ' + item.homeTeam + ' vs ' + item.awayTeam + ' builder'"
        @click="deleteAnItemFromBetslip(item.customId)"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-3.5 h-3.5">
          <path d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z" />
        </svg>
      </button>
    </div>
  </div>
</template>
```

- [ ] **Step 2: Lint and build**

Run: `npx eslint src/components/BetslipBetbuilderDetails.vue && pnpm run build`
Expected: clean.

- [ ] **Step 3: Commit**

```bash
git add src/components/BetslipBetbuilderDetails.vue
git commit -m "feat(betslip): restructure builder row to match new layout"
```

---

### Task 5: Simplify `TheStake.vue` to inline stepper only

**Files:**
- Modify: `src/components/TheStake.vue`

- [ ] **Step 1: Replace the file**

Overwrite `src/components/TheStake.vue` with:

```vue
<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  setStake: {
    type: Function,
    required: true,
  },
  stake: {
    type: Number,
    required: true,
  },
  totalOdds: {
    type: Number,
    default: 0,
  },
});

const selectedStakeAmount = ref(props.stake);

watch(
  () => props.stake,
  (val) => {
    selectedStakeAmount.value = val;
  }
);

function updateStake(amount) {
  const safe = Math.max(0, Number(amount) || 0);
  selectedStakeAmount.value = safe;
  props.setStake(safe);
}
</script>

<template>
  <div class="flex items-center gap-1 rounded-md border border-border bg-card overflow-hidden">
    <button
      type="button"
      aria-label="Decrease stake"
      class="w-9 h-9 flex items-center justify-center text-foreground hover:bg-surface-interactive transition-colors cursor-pointer"
      @click="updateStake(Math.max(0, Number(selectedStakeAmount) - 10))"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-3.5 h-3.5">
        <path d="M3.75 7.25a.75.75 0 0 0 0 1.5h8.5a.75.75 0 0 0 0-1.5h-8.5Z" />
      </svg>
    </button>
    <input
      v-model="selectedStakeAmount"
      type="number"
      inputmode="numeric"
      aria-label="Stake amount in KES"
      class="w-20 h-9 text-center text-sm font-bold text-foreground bg-transparent tabular-nums focus:outline-none stake-input"
      required
      @input="updateStake(selectedStakeAmount)"
    />
    <button
      type="button"
      aria-label="Increase stake"
      class="w-9 h-9 flex items-center justify-center text-foreground hover:bg-surface-interactive transition-colors cursor-pointer"
      @click="updateStake(Number(selectedStakeAmount) + 10)"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-3.5 h-3.5">
        <path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z" />
      </svg>
    </button>
  </div>
</template>

<style scoped>
.stake-input::-webkit-outer-spin-button,
.stake-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.stake-input[type="number"] {
  -moz-appearance: textfield;
}
</style>
```

- [ ] **Step 2: Lint and build**

Run: `npx eslint src/components/TheStake.vue && pnpm run build`
Expected: clean.

- [ ] **Step 3: Commit**

```bash
git add src/components/TheStake.vue
git commit -m "feat(betslip): reduce TheStake to inline -/input/+ stepper"
```

---

### Task 6: Restyle `BetslipBonus.vue` as full-width gold band

**Files:**
- Modify: `src/components/BetslipBonus.vue`

- [ ] **Step 1: Replace the file**

Overwrite `src/components/BetslipBonus.vue` with:

```vue
<script setup>
import { computed, toRefs } from "vue";
import { useBetslip } from "@/composables/useBetslip";
import { useMultibetBonus } from "@/composables/useMultibetBonus";
import { useBetslipStore } from "../stores/sports-betslip";
import formatStuff from "../utilities/format-stuff";

const { formattedNumber } = formatStuff();
const { calculatePossibleWin } = useBetslip();
const { betslip, stake } = toRefs(useBetslipStore());
const { calculateBoostBonus, getCurrentBoost } = useMultibetBonus();

const amount = computed(() =>
  calculateBoostBonus(calculatePossibleWin(betslip.value, stake.value))
);

const visible = computed(() => getCurrentBoost() > 0);
</script>

<template>
  <div
    v-if="visible"
    class="flex items-center justify-between bg-gold text-gold-foreground px-3 py-2 text-xs font-extrabold uppercase tracking-wider"
  >
    <span>Boost Awarded</span>
    <span class="tabular-nums">KSH {{ formattedNumber(amount) }}</span>
  </div>
</template>
```

- [ ] **Step 2: Lint and build**

Run: `npx eslint src/components/BetslipBonus.vue && pnpm run build`
Expected: clean.

- [ ] **Step 3: Commit**

```bash
git add src/components/BetslipBonus.vue
git commit -m "feat(betslip): restyle BetslipBonus as full-width gold band"
```

---

### Task 7: Restyle `PossibleWin.vue` as dark band with gold amount

**Files:**
- Modify: `src/components/PossibleWin.vue`

- [ ] **Step 1: Replace the file**

Overwrite `src/components/PossibleWin.vue` with:

```vue
<script setup>
import { ref } from "vue";
import formatStuff from "../utilities/format-stuff";

const { formattedNumber } = formatStuff();

defineProps({
  totalOdds: {
    type: Number,
    default: 0,
  },
  possibleWin: {
    type: Number,
    default: 0,
  },
  stake: {
    type: Number,
    default: 0,
  },
});

const showTax = ref(false);
</script>

<template>
  <div
    class="flex items-center justify-between bg-surface-deepest px-3 py-3 cursor-pointer"
    role="button"
    aria-label="Toggle tax details"
    tabindex="0"
    @click="showTax = !showTax"
  >
    <span class="text-xs font-extrabold uppercase tracking-wider text-foreground">
      Possible Win
    </span>
    <span class="text-lg font-extrabold text-gold-bright tabular-nums">
      KSH {{ formattedNumber(possibleWin) }}
    </span>
  </div>
</template>
```

- [ ] **Step 2: Lint and build**

Run: `npx eslint src/components/PossibleWin.vue && pnpm run build`
Expected: clean.

- [ ] **Step 3: Commit**

```bash
git add src/components/PossibleWin.vue
git commit -m "feat(betslip): restyle PossibleWin as dark band with gold amount"
```

---

### Task 8: Restyle `OneCutWin.vue` as primary-tint band (drop raw oklch)

**Files:**
- Modify: `src/components/OneCutWin.vue`

- [ ] **Step 1: Replace the file**

Overwrite `src/components/OneCutWin.vue` with:

```vue
<script setup>
import { useOneCut } from "../composables/useOneCut";
import formatStuff from "../utilities/format-stuff";
import OneCutIcon from "./OneCutIcon.vue";

const { formattedNumber } = formatStuff();
const {
  buildLegsMessage,
  oneCutAmout,
  isOneCutQualified,
  oneCutRatio,
} = useOneCut();
</script>

<template>
  <div
    v-if="isOneCutQualified()"
    class="flex items-center justify-between bg-primary/15 px-3 py-2 text-xs font-extrabold uppercase tracking-wider text-foreground"
  >
    <div class="flex items-center gap-2 text-primary">
      <OneCutIcon class="w-4 h-4" />
      <span>1-Cut</span>
      <span class="rounded bg-primary/15 px-1.5 py-0.5 text-[10px]">
        {{ oneCutRatio() }}
      </span>
    </div>
    <span class="tabular-nums text-foreground">
      KSH {{ formattedNumber(oneCutAmout()) }}
    </span>
  </div>
  <div
    v-else-if="buildLegsMessage()"
    class="flex items-center justify-between bg-primary/8 px-3 py-2 text-[11px] font-semibold text-muted-foreground"
  >
    <div class="flex items-center gap-2 text-primary">
      <OneCutIcon class="w-4 h-4" />
      <span>1-Cut</span>
    </div>
    <span>{{ buildLegsMessage() }}</span>
  </div>
</template>
```

- [ ] **Step 2: Lint and build**

Run: `npx eslint src/components/OneCutWin.vue && pnpm run build`
Expected: clean.

- [ ] **Step 3: Commit**

```bash
git add src/components/OneCutWin.vue
git commit -m "feat(betslip): restyle OneCutWin as primary-tint band, drop raw oklch"
```

---

### Task 9: Restructure `BetControls.vue` footer

**Files:**
- Modify: `src/components/BetControls.vue`

- [ ] **Step 1: Replace the file**

Overwrite `src/components/BetControls.vue` with:

```vue
<script setup>
import { useBetslipLogin } from "@/composables/useBetslipLogin.js";
import { useModalTypes } from "@/composables/useModalTypes";
import { useModalStore } from "@/stores/modal";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { useLoginStore } from "../stores/login.js";
import { useBetslipStore } from "../stores/sports-betslip.js";
import formatStuff from "../utilities/format-stuff";
import BetslipBonus from "./BetslipBonus.vue";
import OneCutWin from "./OneCutWin.vue";
import PossibleWin from "./PossibleWin.vue";
import TheStake from "./TheStake.vue";

const { formattedNumber } = formatStuff();

const {
  placeBet,
  removeDeactivatedMatches,
  showNoBetError,
  setStake,
  clearBetslip,
} = useBetslipStore();

const { isAuthenticated } = storeToRefs(useLoginStore());
const { betslip, betslipLength, stake, pending, possibleWin, totalOdds } =
  storeToRefs(useBetslipStore());

const { openLogin } = useBetslipLogin();

const betslipHasDeactivatedItems = computed(() =>
  betslip.value.some((item) => item.status !== 1)
);

function afterPlaceBetAction() {
  const { closeModal, openModal } = useModalStore();
  const { betPlaceStatus } = useModalTypes();
  closeModal();
  openModal(betPlaceStatus);
}

async function bet() {
  if (stake.value <= 0) return;
  if (!betslip.value.length) {
    showNoBetError();
    return;
  }
  placeBet(afterPlaceBetAction);
}
</script>

<template>
  <form class="w-full bg-card border-t border-border" @submit.prevent="bet">
    <div class="px-3 py-2 flex items-center justify-between border-b border-border">
      <span class="text-xs font-extrabold uppercase tracking-wider text-muted-foreground">
        Total Odds:
      </span>
      <span class="text-sm font-extrabold text-foreground tabular-nums">
        {{ formattedNumber(totalOdds) }}
      </span>
    </div>

    <div class="px-3 py-2 flex items-center justify-between border-b border-border">
      <span class="text-xs font-extrabold uppercase tracking-wider text-muted-foreground">
        Bet Amount (KSH):
      </span>
      <TheStake :set-stake :stake :total-odds />
    </div>

    <BetslipBonus />
    <OneCutWin />
    <PossibleWin :possible-win :stake :total-odds />

    <div class="grid grid-cols-2 gap-2 p-3 bg-surface-elevated border-t border-border">
      <button
        type="button"
        :disabled="pending || betslipLength === 0"
        class="rounded-lg bg-surface-interactive text-muted-foreground hover:bg-destructive/10 hover:text-destructive disabled:opacity-50 disabled:cursor-not-allowed font-extrabold uppercase tracking-wider text-xs py-2.5 transition-colors cursor-pointer"
        @click="clearBetslip"
      >
        Remove All
      </button>

      <button
        v-if="betslipHasDeactivatedItems"
        type="button"
        class="rounded-lg bg-destructive/15 text-destructive font-extrabold uppercase tracking-wider text-xs py-2.5 hover:bg-destructive/25 transition-colors cursor-pointer"
        @click="removeDeactivatedMatches"
      >
        <TheButtonSpin v-if="pending" />
        <span v-else>Remove Deactivated</span>
      </button>
      <button
        v-else-if="!isAuthenticated"
        type="button"
        class="rounded-lg bg-primary text-primary-foreground font-extrabold uppercase tracking-wider text-xs py-2.5 hover:opacity-90 transition-opacity cursor-pointer"
        @click="openLogin"
      >
        Login to Place Bet
      </button>
      <button
        v-else
        type="submit"
        :disabled="pending"
        class="rounded-lg bg-primary text-primary-foreground font-extrabold uppercase tracking-wider text-xs py-2.5 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity cursor-pointer"
      >
        <TheButtonSpin v-if="pending" />
        <span v-else>Place Bet</span>
      </button>
    </div>
  </form>
</template>
```

- [ ] **Step 2: Lint and build**

Run: `npx eslint src/components/BetControls.vue && pnpm run build`
Expected: clean.

- [ ] **Step 3: Commit**

```bash
git add src/components/BetControls.vue
git commit -m "feat(betslip): restructure BetControls footer with bands and Remove All"
```

---

### Task 10: Update `SportsBetslip.vue` to host `BetslipMultiHeader`

**Files:**
- Modify: `src/components/SportsBetslip.vue`

- [ ] **Step 1: Replace the file**

Overwrite `src/components/SportsBetslip.vue` with:

```vue
<script setup>
import { storeToRefs } from "pinia";
import { useBetslipStore } from "../stores/sports-betslip.js";
import BetslipMatchDetails from "./BetslipMatchDetails.vue";
import BetslipMultiHeader from "./BetslipMultiHeader.vue";
import EmptyBetslip from "./EmptyBetslip.vue";
import MultibetBoost from "./MultibetBoost.vue";

const { betslip, betslipLength } = storeToRefs(useBetslipStore());
const { deleteAnItemFromBetslip } = useBetslipStore();

function showStatusBar(deviation, status) {
  if (status !== 1) return true;
  if (typeof deviation === "undefined") return false;
  if (deviation !== 0) return true;
  return false;
}

function getDeviationCssClass(prevOddValue, currentOddValue) {
  const deviation = currentOddValue - prevOddValue;
  if (deviation > 0) return "bg-primary/10 text-primary";
  if (deviation < 0) return "bg-destructive/10 text-destructive";
  return "";
}
</script>

<template>
  <EmptyBetslip v-if="betslipLength === 0" />
  <div v-else class="w-full flex flex-col min-h-0 flex-1">
    <MultibetBoost />
    <BetslipMultiHeader />

    <div class="flex-1 min-h-0 overflow-y-auto scrollbar-hide">
      <div
        v-for="(item, index) in betslip"
        :key="item.customId"
        :class="[
          'border-b border-border',
          item.status !== 1 ? 'opacity-60' : '',
        ]"
      >
        <BetslipBetbuilderDetails
          v-if="item.isBetBuilder"
          :item
          :index
          :delete-an-item-from-betslip="deleteAnItemFromBetslip"
        />
        <BetslipMatchDetails
          v-else
          :item
          :index
          :delete-an-item-from-betslip="deleteAnItemFromBetslip"
        />
        <div v-if="showStatusBar(item.deviation, item.status)" class="w-full">
          <div
            v-if="item.status !== 1"
            class="w-full text-[10px] font-medium px-3 py-1 bg-destructive/10 text-destructive"
          >
            Odds for this match have been deactivated
          </div>
          <div
            v-else
            :class="getDeviationCssClass(item.prevOddValue, item.oddValue)"
            class="w-full text-[10px] font-medium px-3 py-1"
          >
            Odds {{ item.oddValue > item.prevOddValue ? 'boosted' : 'dropped' }} from {{ item.prevOddValue }} to
            {{ item.oddValue }}
          </div>
        </div>
      </div>
    </div>

    <div class="shrink-0">
      <BetControls />
    </div>
  </div>
</template>
```

- [ ] **Step 2: Lint and build**

Run: `npx eslint src/components/SportsBetslip.vue && pnpm run build`
Expected: clean.

- [ ] **Step 3: Commit**

```bash
git add src/components/SportsBetslip.vue
git commit -m "feat(betslip): slot BetslipMultiHeader into SportsBetslip"
```

---

### Task 11: Simplify `SportsBetslipPanel.vue` header (drop Clear All)

**Files:**
- Modify: `src/components/SportsBetslipPanel.vue`

- [ ] **Step 1: Replace the file**

Overwrite `src/components/SportsBetslipPanel.vue` with:

```vue
<script setup>
import SportsBetslip from "./SportsBetslip.vue";
import { storeToRefs } from "pinia";
import { useBetslipStore } from "../stores/sports-betslip.js";

const { betslipLength } = storeToRefs(useBetslipStore());
</script>

<template>
  <div class="relative w-84 h-full">
    <div class="w-full sticky top-14 h-[calc(100vh-4rem)] flex flex-col rounded-xl bg-card border border-border overflow-hidden" data-fly-target="betslip">
      <div class="flex items-center justify-between px-3 py-2.5 bg-surface-deepest">
        <span class="flex items-center gap-2 text-sm font-extrabold uppercase tracking-wider text-foreground">
          Betslip
          <span
            v-if="betslipLength > 0"
            class="inline-flex items-center justify-center min-w-5 h-5 px-1.5 text-[10px] font-bold text-primary-foreground bg-primary rounded-full tabular-nums"
          >
            {{ betslipLength }}
          </span>
        </span>
      </div>

      <div class="flex-1 flex flex-col min-h-0">
        <SportsBetslip />
      </div>
    </div>
  </div>
</template>
```

- [ ] **Step 2: Lint and build**

Run: `npx eslint src/components/SportsBetslipPanel.vue && pnpm run build`
Expected: clean.

- [ ] **Step 3: Commit**

```bash
git add src/components/SportsBetslipPanel.vue
git commit -m "feat(betslip): simplify panel header, drop Clear All link"
```

---

### Task 12: Simplify `BetslipModal.vue` header (drop Clear All)

**Files:**
- Modify: `src/components/BetslipModal.vue`

- [ ] **Step 1: Replace the file**

Overwrite `src/components/BetslipModal.vue` with:

```vue
<script setup>
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { XMarkIcon } from "@heroicons/vue/24/outline";
import { storeToRefs } from "pinia";
import { computed, ref } from "vue";
import { useModalStore } from "@/stores/modal";
import { useModalTypes } from "@/composables/useModalTypes";

const { betslip, instantBetslip } = useModalTypes();

const { showModal, modalType } = storeToRefs(useModalStore());
const { closeModal } = useModalStore();
const closeButtonRef = ref(null);

const showBetslip = computed(() => {
  return (
    (modalType.value === betslip || modalType.value === instantBetslip) &&
    showModal.value
  );
});
</script>

<template>
  <TransitionRoot appear :show="showBetslip" as="template">
    <Dialog
      as="div"
      class="relative z-50"
      :initial-focus="closeButtonRef"
      @close="closeModal"
    >
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/50" />
      </TransitionChild>
      <div class="fixed z-50 inset-0 flex flex-col justify-end">
        <div class="flex flex-col mt-auto sm:items-center text-center max-h-dvh">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 translate-y-8"
            enter-to="opacity-100 translate-y-0"
            leave="duration-200 ease-in"
            leave-from="opacity-100 translate-y-0"
            leave-to="opacity-0 translate-y-8"
          >
            <DialogPanel
              class="w-full max-w-4xl max-h-[92dvh] sm:max-h-[80dvh] bg-card transform overflow-hidden text-left align-middle shadow-xl transition-all rounded-t-2xl sm:rounded-t-xl flex flex-col"
            >
              <div class="flex justify-center pt-2 pb-1 sm:hidden">
                <div class="w-10 h-1 rounded-full bg-border"></div>
              </div>
              <div
                class="flex items-center justify-between px-4 py-2.5 sm:py-3 bg-surface-deepest shrink-0"
              >
                <DialogTitle class="text-sm font-extrabold uppercase tracking-wider text-foreground">
                  <slot name="title">Betslip</slot>
                </DialogTitle>
                <button
                  ref="closeButtonRef"
                  class="p-1 rounded-lg text-muted-foreground hover:text-foreground transition-colors cursor-pointer outline-hidden"
                  aria-label="Close betslip"
                  @click="closeModal"
                >
                  <XMarkIcon class="w-5 h-5" />
                </button>
              </div>
              <div class="flex-1 min-h-0 overflow-y-auto">
                <slot />
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
```

- [ ] **Step 2: Lint and build**

Run: `npx eslint src/components/BetslipModal.vue && pnpm run build`
Expected: clean.

- [ ] **Step 3: Commit**

```bash
git add src/components/BetslipModal.vue
git commit -m "feat(betslip): simplify modal header, drop Clear All link"
```

---

### Task 13: Light token sweep on `EmptyBetslip.vue`

**Files:**
- Modify: `src/components/EmptyBetslip.vue`

- [ ] **Step 1: Replace the file**

Overwrite `src/components/EmptyBetslip.vue` with:

```vue
<script setup>
import BetslipLoadCode from "./BetslipLoadCode.vue";
import BetControls from "./BetControls.vue";
</script>

<template>
  <div class="flex flex-col flex-1 min-h-0">
    <div class="flex-1">
      <div class="flex flex-col items-center justify-center pt-10 pb-6 px-5">
        <div class="relative w-14 h-14 mb-4">
          <div class="absolute inset-0 rounded-full border-2 border-dashed border-border animate-[spin_20s_linear_infinite]"></div>
          <div class="absolute inset-2 rounded-full bg-surface-interactive flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              class="w-5 h-5 text-muted-foreground"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </div>
        </div>

        <h3 class="text-sm font-bold text-foreground mb-1">
          No selections yet
        </h3>
        <p class="text-xs text-muted-foreground text-center leading-relaxed max-w-44">
          Tap any odds to start building your betslip
        </p>
      </div>

      <div class="mx-4 border-t border-border"></div>

      <BetslipLoadCode />
    </div>

    <div class="shrink-0">
      <BetControls />
    </div>
  </div>
</template>
```

- [ ] **Step 2: Lint and build**

Run: `npx eslint src/components/EmptyBetslip.vue && pnpm run build`
Expected: clean.

- [ ] **Step 3: Commit**

```bash
git add src/components/EmptyBetslip.vue
git commit -m "feat(betslip): token sweep EmptyBetslip"
```

---

### Task 14: Retire `ShareBetslipButton.vue`

**Files:**
- Delete: `src/components/ShareBetslipButton.vue`

- [ ] **Step 1: Confirm no remaining imports**

Run: `grep -rn "ShareBetslipButton" /Users/leonardmbugua/Desktop/parimaster/src --include="*.vue" --include="*.js"`
Expected: no results. (The `BetControls.vue` import was removed in Task 9; Pinia auto-import does not pick up Vue components.)

If the grep finds any usage, stop and report. Otherwise proceed.

- [ ] **Step 2: Delete the file**

Run: `git rm src/components/ShareBetslipButton.vue`

- [ ] **Step 3: Build**

Run: `pnpm run build`
Expected: build succeeds; no unresolved component reference.

- [ ] **Step 4: Commit**

```bash
git commit -m "chore(betslip): remove ShareBetslipButton (now inlined in BetslipMultiHeader)"
```

---

### Task 15: Final verification sweep

**Files:**
- Read-only verification across all touched files.

- [ ] **Step 1: Token-purity grep on touched files**

Run:

```bash
grep -nE "oklch\\(|#[0-9a-fA-F]{3,8}\\b|rgb\\(|rgba\\(|brand-bright|red-500|red-400|blue-500|gray-[0-9]{2,3}|white/[0-9]+" \
  src/components/SportsBetslipPanel.vue \
  src/components/BetslipModal.vue \
  src/components/SportsBetslip.vue \
  src/components/MultibetBoost.vue \
  src/components/BetslipMultiHeader.vue \
  src/components/BetslipMatchDetails.vue \
  src/components/BetslipBetbuilderDetails.vue \
  src/components/BetControls.vue \
  src/components/TheStake.vue \
  src/components/BetslipBonus.vue \
  src/components/PossibleWin.vue \
  src/components/OneCutWin.vue \
  src/components/EmptyBetslip.vue
```

Expected: no matches except `bg-black/50` inside `BetslipModal.vue` (the dialog backdrop — acceptable, it's not a brand color). If any other match appears, replace it with the appropriate token (`bg-card`, `text-foreground`, `bg-primary`, `text-destructive`, etc.) and commit a follow-up.

- [ ] **Step 2: ESLint over `src/`**

Run: `npx eslint src/`
Expected: clean (or only pre-existing warnings unrelated to betslip files).

- [ ] **Step 3: Production build**

Run: `pnpm run build`
Expected: build succeeds end-to-end.

- [ ] **Step 4: Manual visual check on the dev server**

Start the dev server in a background terminal: `pnpm dev` (listens on port 5079). Open `http://localhost:5079/` and verify the following flows:

| Surface | Steps | Expected |
|---|---|---|
| Desktop empty betslip | Resize window ≥ 1024px width; navigate to sports; observe sticky panel on the right. | "BETSLIP" header bar in `bg-surface-deepest`, no Clear All link. Empty state with token-coloured spinner. Disabled `PLACE BET` at the bottom. |
| Desktop single bet | Click one odds button. | `SINGLE BET` row appears with `Share` pill on right; row shows sport icon + teams + Your Pick + odds; footer shows TOTAL ODDS row + BET AMOUNT stepper + POSSIBLE WIN band + `REMOVE ALL` + `PLACE BET`. |
| Desktop multi-bet, < 3 legs | Click 2 different odds across 2 different matches. | Promo banner reads `Add 1 more to get a 3% boost!` with gift icon; Boost Awarded band hidden; `MULTI BET (2)` row visible. |
| Desktop multi-bet, ≥ 3 legs at min odds | Click 3 different odds (≥ 1.30 each) across 3 matches. | Promo banner shows boost %; Boost Awarded band visible in gold below stepper; Possible Win amount shown in `text-gold-bright`. |
| Deactivated path | Simulate by editing the betslip in devtools to set one `status = 0`. | Per-row red status bar visible; bottom `PLACE BET` replaced by `REMOVE DEACTIVATED` (destructive variant). |
| Remove All | Click `REMOVE ALL` with any number of bets. | Betslip clears; empty state returns. |
| Mobile modal | Resize window < 1024px width and trigger the betslip (footer bar). | Same internal layout in the bottom-sheet modal; drag handle visible; `bg-surface-deepest` header with close button and no Clear All. |
| Login fallback | Log out. With one bet, click `LOGIN TO PLACE BET`. | Existing login flow opens. After login, the queued place-bet fires per `setAfterLoginAction`. |
| Share | Click the inline `Share` pill in the multi-header while logged in. | Existing share-bet modal opens (logic untouched). |

If any of these flows misbehaves, file a follow-up task before declaring the plan complete.

- [ ] **Step 5: Commit any cleanups discovered during the sweep**

If steps 1–4 surfaced fixes, stage them and commit:

```bash
git add -A
git commit -m "chore(betslip): post-redesign cleanups discovered during verification sweep"
```

Otherwise this step is a no-op.

---

## Out of scope (re-stated from spec)

- No store / composable / API changes.
- No booking-code load while a slip is in progress (no `⋮` menu).
- No per-leg min-odds (1.30) warning UI.
- No new analytics events.
- No tax-toggle preference.

## Acceptance summary

The redesign is done when:
1. All 15 tasks above are committed.
2. The token-purity grep in Task 15 returns nothing brand-coloured outside the documented `bg-black/50` exception.
3. `pnpm run build` and `npx eslint src/` both pass.
4. The desktop sticky panel and mobile bottom-sheet modal both render the new layout end to end, with Share moved inline, REMOVE ALL in the footer, gold boost banner, gold Boost Awarded band, dark Possible Win band, and the inline `−`/input/`+` stake stepper.
