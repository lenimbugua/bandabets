# Sports Filter Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add visual icons to the sports filter with improved selected state styling, and expand the filter tabs row to 5 tabs with underline-only styling.

**Architecture:** Two-component update: (1) SportsTabs.vue adds vertical icon+text layout with background highlight for selected sports, (2) HighlitsTab.vue expands to 5 filter tabs (HIGHLIGHTS, POPULAR, COUNTRIES, TODAY, UPCOMING) with underline-only styling. Icons leverage existing SportsIcons.vue component and sport data from useSports.js.

**Tech Stack:** Vue 3 Composition API, Tailwind CSS, existing SportsIcons.vue component, headlessui TabGroup

---

## File Structure

**Files to modify:**
- `src/components/SportsTabs.vue` — Add SportsIcons rendering, update layout to vertical (icon above text), implement background highlight for selected state
- `src/components/HighlitsTab.vue` — Expand highlights array to 5 tabs, update styling to underline-only (remove background)

**Files unchanged:**
- `src/composables/useSports.js` — Icon data already includes icon names and colors
- `src/stores/sports-navigation.js` — No state changes needed
- `src/stores/sports-query-params.js` — No state changes needed

---

## Tasks

### Task 1: Update SportsTabs.vue - Import and render SportsIcons

**Files:**
- Modify: `src/components/SportsTabs.vue`

- [ ] **Step 1: Read current SportsTabs.vue to understand structure**

Run: `cat src/components/SportsTabs.vue`

Expected output: See current component with text-only tabs, no icons

- [ ] **Step 2: Update script section to import SportsIcons**

Replace the `<script setup>` section. The component already has all necessary imports and logic; just ensure SportsIcons is imported.

Current imports (keep all of these):
```javascript
import { useScrollToSelected } from "@/composables/useScrollToSelectedSport";
import { useSports } from "@/composables/useSports";
import { Tab, TabGroup, TabList } from "@headlessui/vue";
import { toRefs } from "vue";
import { useSportsStore } from "../stores/sports";
import { useSportsNavigationStore } from "../stores/sports-navigation";
```

Add import for SportsIcons:
```javascript
import SportsIcons from "./SportsIcons.vue";
```

Complete updated script section:
```javascript
import { useScrollToSelected } from "@/composables/useScrollToSelectedSport";
import { useSports } from "@/composables/useSports";
import { Tab, TabGroup, TabList } from "@headlessui/vue";
import { toRefs } from "vue";
import { useSportsStore } from "../stores/sports";
import { useSportsNavigationStore } from "../stores/sports-navigation";
import SportsIcons from "./SportsIcons.vue";

const { selectedSportId } = toRefs(useSportsNavigationStore());
const { setSelectedSportId } = useSportsNavigationStore();
const { elementRefs: sportRefs } = useScrollToSelected(selectedSportId);

const { setViewToDisplay } = useSportsStore();
const { fetchMatches, games } = useSports();

const getMatches = (sportId, name, icon, goToSports) => {
  setViewToDisplay("sport");
  setSelectedSportId(sportId);
  fetchMatches(sportId, name, icon, goToSports);
};
const isSelected = (id) => {
  return selectedSportId.value == id;
};
```

- [ ] **Step 3: Update template to render icons vertically above text**

In the template section, find the Tab div that renders `{{ thisSport.name }}`. Replace the entire div (lines 38-55) with this updated version that includes the icon above the text:

```html
<div
  :ref="(el) => (sportRefs[thisSport.id] = el)"
  :class="[
    'cursor-pointer rounded-md flex flex-col items-center px-2 py-2 text-sm whitespace-nowrap capitalize text-center font-medium',
    'focus:outline-hidden',
    isSelected(thisSport.id)
      ? 'bg-brand-bright/20 text-brand-bright font-semibold'
      : 'dark:text-gray-100/90 text-gray-800',
  ]"
>
  <!-- Icon -->
  <SportsIcons :icon="thisSport.icon" size="h-8 w-8" />
  
  <!-- Sport name -->
  <span class="mt-1">{{ thisSport.name }}</span>
</div>
```

- [ ] **Step 4: Verify changes in browser**

Run: `pnpm dev` (if not already running)

Navigate to the sports page and check:
- Football (and other sports) show icons above their names
- Icons are centered
- No console errors

Expected: Icons display correctly with text below them

- [ ] **Step 5: Commit**

```bash
git add src/components/SportsTabs.vue
git commit -m "feat(sports-tabs): add icons above sport names"
```

---

### Task 2: Update SportsTabs.vue - Implement background highlight for selected state

**Files:**
- Modify: `src/components/SportsTabs.vue`

- [ ] **Step 1: Update selected state styling with background highlight**

The styling was already updated in Task 1 Step 3. Now refine it for better appearance. Update the :class binding in the div (keeping the icon rendering from Task 1):

```html
<div
  :ref="(el) => (sportRefs[thisSport.id] = el)"
  :class="[
    'cursor-pointer rounded-md flex flex-col items-center px-3 py-2 text-sm whitespace-nowrap capitalize text-center font-medium transition-all duration-150',
    'focus:outline-hidden',
    isSelected(thisSport.id)
      ? 'bg-brand-bright text-white font-semibold rounded-lg'
      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200',
  ]"
>
  <!-- Icon -->
  <SportsIcons :icon="thisSport.icon" size="h-8 w-8" />
  
  <!-- Sport name -->
  <span class="mt-1">{{ thisSport.name }}</span>
</div>
```

Key changes:
- Selected: `bg-brand-bright text-white` (solid background highlight)
- Unselected: `text-gray-500 dark:text-gray-400` (muted gray)
- Added `transition-all duration-150` for smooth color transitions
- Removed the underline div (the old lines 49-54) — no longer needed with background highlight

- [ ] **Step 2: Remove the old underline div**

Delete the underline div that was after `{{ thisSport.name }}`. The old code had:
```html
<div
  class="w-2/3"
  :class="[
    isSelected(thisSport.id) ? 'border-b-2 border-brand-bright' : '',
  ]"
></div>
```

This is no longer needed since we're using background highlight instead.

Final template structure (inside the Tab):
```html
<div
  :ref="(el) => (sportRefs[thisSport.id] = el)"
  :class="[
    'cursor-pointer rounded-md flex flex-col items-center px-3 py-2 text-sm whitespace-nowrap capitalize text-center font-medium transition-all duration-150',
    'focus:outline-hidden',
    isSelected(thisSport.id)
      ? 'bg-brand-bright text-white font-semibold rounded-lg'
      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200',
  ]"
>
  <SportsIcons :icon="thisSport.icon" size="h-8 w-8" />
  <span class="mt-1">{{ thisSport.name }}</span>
</div>
```

- [ ] **Step 3: Test in browser**

Run: `pnpm dev` (keep running from previous task)

Check:
- Selected sport has bright background with white text
- Unselected sports have muted gray text
- Hover effect on unselected sports works
- Icon colors display correctly (soccer=brand-bright, basketball=orange, etc.)
- Dark mode styling works (text is visible in both light/dark)

Expected: Clean visual hierarchy with selected sport prominently highlighted

- [ ] **Step 4: Commit**

```bash
git add src/components/SportsTabs.vue
git commit -m "feat(sports-tabs): add background highlight for selected state"
```

---

### Task 3: Update HighlitsTab.vue - Expand tabs array to 5 tabs

**Files:**
- Modify: `src/components/HighlitsTab.vue`

- [ ] **Step 1: Read current HighlitsTab.vue**

Run: `cat src/components/HighlitsTab.vue`

Expected: See 3 tabs in highlights array (highlight, upcoming, grid)

- [ ] **Step 2: Update highlights ref array to 5 tabs**

Find this section (around line 11):
```javascript
const highlights = ref([
  {
    name: "highlight",
  },
  {
    name: "upcoming",
  },
  {
    name: "grid",
  },
]);
```

Replace with:
```javascript
const highlights = ref([
  {
    name: "highlights",
    label: "HIGHLIGHTS",
  },
  {
    name: "popular",
    label: "POPULAR",
  },
  {
    name: "countries",
    label: "COUNTRIES",
  },
  {
    name: "today",
    label: "TODAY",
  },
  {
    name: "upcoming",
    label: "UPCOMING",
  },
]);
```

Note: Keep the name values lowercase for backend compatibility, add label for uppercase display

- [ ] **Step 3: Update fetchMatches function to handle new tab names**

The current function uses `resource` to set the layout. Update it to map the new tab names:

```javascript
async function fetchMatches(resource) {
  // Map new tab names to their corresponding resource values
  const resourceMap = {
    highlights: "highlight",
    popular: "grid",
    countries: "countries",
    today: "today",
    upcoming: "upcoming",
  };
  
  const mappedResource = resourceMap[resource] || resource;
  
  setLayout(mappedResource);
  if (mappedResource === "grid") {
    fetchCompetitions();
    return;
  }
  emptyMatches();
  setDay("");
  setResource(mappedResource);
  setCalendarIsPending(true);
  await getMatches();
  setCalendarIsPending(false);
}
```

- [ ] **Step 4: Update isSelected function to work with new names**

The current isSelected checks `layout.value`. Update to handle the resource mapping:

```javascript
function isSelected(tabName) {
  const resourceMap = {
    highlights: "highlight",
    popular: "grid",
    countries: "countries",
    today: "today",
    upcoming: "upcoming",
  };
  
  const mappedName = resourceMap[tabName] || tabName;
  
  if (layout.value) {
    return mappedName === layout.value;
  }
  
  // Default to highlights on first load
  return tabName === "highlights";
}
```

- [ ] **Step 5: Verify changes**

Check the script section has:
- highlights array with 5 items including countries and today
- resourceMap in fetchMatches for name mapping
- Updated isSelected logic

Expected: No errors, array structure is correct

- [ ] **Step 6: Commit**

```bash
git add src/components/HighlitsTab.vue
git commit -m "feat(highlights-tab): expand to 5 filter tabs (highlights, popular, countries, today, upcoming)"
```

---

### Task 4: Update HighlitsTab.vue - Update styling to underline-only

**Files:**
- Modify: `src/components/HighlitsTab.vue`

- [ ] **Step 1: Update TabList styling to remove background**

Find the TabList (around line 58):
```html
<TabList
  aria-label="Match highlight filters"
  class="flex items-center rounded-lg bg-gray-100 dark:bg-white/5 p-0.5"
>
```

Update to remove the background:
```html
<TabList
  aria-label="Match highlight filters"
  class="flex items-center gap-2"
>
```

Rationale: Underline-only style doesn't need a background container

- [ ] **Step 2: Update Tab button styling for underline effect**

Find the button styling (around line 68-75):
```html
<button
  :class="[
    'relative px-3 py-1 text-xs font-medium capitalize rounded-md transition-all duration-150',
    'focus:outline-hidden',
    isSelected(category.name)
      ? 'bg-white dark:bg-white/10 text-brand-bright font-semibold shadow-sm'
      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200',
  ]"
>
  <span v-if="category.name === 'grid'">Popular</span>
  <span v-else>{{ category.name }}</span>
</button>
```

Replace with underline-only styling:
```html
<button
  :class="[
    'relative px-2 py-2 text-xs font-medium uppercase transition-all duration-150 border-b-2',
    'focus:outline-hidden',
    isSelected(category.name)
      ? 'text-brand-bright font-semibold border-brand-bright'
      : 'text-gray-400 dark:text-gray-500 border-transparent hover:text-gray-600 dark:hover:text-gray-400',
  ]"
>
  {{ category.label }}
</button>
```

Key changes:
- No background color
- Border-b-2 for underline effect
- Selected: `border-brand-bright` (visible underline)
- Unselected: `border-transparent` (no underline)
- Changed to use `category.label` for uppercase display
- Removed the conditional render for 'grid' (no longer needed)

- [ ] **Step 3: Verify template structure**

Make sure the template shows all 5 tabs correctly. The v-for should iterate over 5 items now:
```html
<Tab
  v-for="category in highlights"
  :key="category.name"
  as="template"
  @click="fetchMatches(category.name)"
>
```

Expected: 5 tabs render with uppercase labels

- [ ] **Step 4: Test in browser**

Run: `pnpm dev` (keep running)

Check:
- 5 tabs display: HIGHLIGHTS, POPULAR, COUNTRIES, TODAY, UPCOMING
- Selected tab has underline (border-bottom)
- Unselected tabs have no underline
- Tab labels are in uppercase
- Clicking tabs switches the layout/filter
- Dark mode styling works
- No background color on tabs container

Expected: Clean underline-only filter tabs

- [ ] **Step 5: Commit**

```bash
git add src/components/HighlitsTab.vue
git commit -m "feat(highlights-tab): update to underline-only styling with 5 tabs"
```

---

### Task 5: Visual testing and refinement

**Files:**
- Verify: `src/components/SportsTabs.vue`
- Verify: `src/components/HighlitsTab.vue`
- Verify: Both desktop and mobile layouts

- [ ] **Step 1: Test sports row on desktop**

Run: `pnpm dev`

On desktop (1024px+):
- View DesktopSportsLayout
- Check sports icons are visible and properly sized (h-8 w-8)
- Verify selected sport has background highlight
- Verify unselected sports are muted gray
- Check icon colors match sports (Football=blue, Basketball=orange, Tennis=green, etc.)
- Scroll horizontally to see all sports
- Click each sport and verify selection changes

Expected: Clean, readable sports filter with good visual hierarchy

- [ ] **Step 2: Test sports row on mobile**

Resize browser to mobile (< 768px):
- Check icons still display correctly at h-8 w-8 size
- Verify layout is still vertical (icon + text)
- Check horizontal scrolling works
- Verify selected/unselected styling is clear on small screens

Expected: Layout works on mobile without overflow issues

- [ ] **Step 3: Test filter tabs on desktop**

Still on desktop:
- Check all 5 filter tabs display: HIGHLIGHTS, POPULAR, COUNTRIES, TODAY, UPCOMING
- Verify selected tab has underline
- Verify unselected tabs have no underline
- Click each tab and verify selection changes
- Check tab labels are properly aligned

Expected: Underline-only styling is clean and distinct from sports row

- [ ] **Step 4: Test filter tabs on mobile**

Resize to mobile:
- Check all 5 tabs fit or scroll horizontally
- Verify underline styling is visible
- Tap each tab and verify selection works

Expected: Tabs are usable on mobile with good spacing

- [ ] **Step 5: Test dark mode**

Toggle dark mode (if available in the app):
- Sports row: verify text is visible (bright on dark)
- Filter tabs: verify text and underlines are visible
- Icons: verify colors display correctly in dark mode

Expected: All elements are legible in both light and dark modes

- [ ] **Step 6: Verify no console errors**

Open browser DevTools console:

Run: Check for any Vue warnings or errors

Expected: Console is clean, no warnings about missing props or undefined

- [ ] **Step 7: Quick regression check**

Verify other functionality still works:
- Clicking a sport still fetches matches
- Clicking a filter tab still updates the view
- Match list still displays
- Betslip panel still visible and functional

Expected: No regressions in existing features

- [ ] **Step 8: Commit (if any tweaks needed)**

If any small adjustments were made during testing, commit them:

```bash
git add src/components/SportsTabs.vue src/components/HighlitsTab.vue
git commit -m "fix: final styling refinements for sports and filter tabs"
```

---

## Plan Self-Review

**Spec Coverage Check:**
- ✅ Sports row with icons (Task 1-2)
- ✅ Vertical icon + text layout (Task 1, Step 3)
- ✅ Background highlight for selected sports (Task 2)
- ✅ Muted gray for unselected sports (Task 2)
- ✅ 5 filter tabs: HIGHLIGHTS, POPULAR, COUNTRIES, TODAY, UPCOMING (Task 3)
- ✅ Underline-only styling for filter tabs (Task 4)
- ✅ Dark mode support (Task 4, Task 5)
- ✅ Desktop and mobile layouts (Task 5)
- ✅ Existing SportsIcons.vue component reuse (Task 1)
- ✅ Tailwind CSS, no hardcoded colors (all tasks)

**Placeholder Scan:**
- ✅ No "TBD" or "TODO" in steps
- ✅ All code blocks are complete and executable
- ✅ All file paths are exact
- ✅ All commands show expected output

**Type/Name Consistency:**
- ✅ `category.name` and `category.label` used consistently
- ✅ `highlights` array keys match function logic
- ✅ `isSelected` function signature consistent across tasks
- ✅ `resourceMap` values match backend expectations (highlight, grid, etc.)

**No Gaps:**
All spec requirements are addressed. Countries and Today tabs are implemented as new filter options (note: backend integration for filtering logic is out of scope, as stated in spec).
