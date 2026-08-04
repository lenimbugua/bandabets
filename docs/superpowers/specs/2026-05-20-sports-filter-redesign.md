# Sports Filter Tab Redesign

**Date:** May 20, 2026  
**Scope:** Vue 3 component updates for sports betting UI  
**Files Modified:** `SportsTabs.vue`, `HighlitsTab.vue`  
**Applies to:** Desktop and mobile layouts

## Overview

Redesign the sports filter system to include visual icons and improved visual hierarchy, matching the reference design. Two-row filter system: a sports row with icons and background highlights for selected states, and a filter tabs row with underline-style selection.

## Design Specifications

### 1. Sports Row (SportsTabs.vue)

**Purpose:** Allow users to filter matches by sport category with visual icons for quick recognition.

**Layout & Structure:**
- Horizontal scrollable layout (existing behavior maintained)
- Each sport button contains: icon (top, stacked vertically) + sport name (bottom)
- Icon size: h-8 w-8 or h-10 w-10 (to be determined during implementation)
- Sport names: capitalized, centered below icons
- "Sports" label and divider remain at the beginning of the row

**Selected State Styling:**
- Background: rounded highlight with primary/brand color background
- Text color: bright white or high-contrast color
- Icon: inherits the color from SportsIcons.vue (maintains existing sport color scheme)
- Border radius: rounded (rounded-md or similar)
- Padding: adjusted for vertical icon + text layout

**Unselected State Styling:**
- Background: transparent
- Text color: muted gray (`text-gray-500 dark:text-gray-400`)
- Icon color: muted gray (matches text)
- No background or border

**Spacing:**
- Padding per sport button: px-3 py-2 (adjusted as needed for icon + text)
- Gap between sports: gap-2 or gap-3
- Maintains scrollbar-hide on container for clean appearance

**Icons:**
- Use existing `SportsIcons.vue` component
- Icon data already present in `useSports.js` with `icon` and `iconColor` properties
- Render icon conditionally based on sport type

### 2. Filter Tabs Row (HighlitsTab.vue)

**Purpose:** Allow users to filter matches by view mode: highlights, popularity, geography, timing.

**Tab Labels:**
- HIGHLIGHTS (new name, replaces "highlight")
- POPULAR (existing "grid" renamed)
- COUNTRIES (new tab)
- TODAY (new tab)
- UPCOMING (existing "upcoming")

**Layout:**
- Horizontal scrollable layout (existing behavior)
- Text-only labels in all uppercase
- Maintains overflow-x-auto scrollbar-hide

**Selected State Styling:**
- Text color: bright/bold (`text-brand-bright` or equivalent)
- Bottom border: solid underline (like current sports tabs style)
- No background color
- Font weight: semibold or bold

**Unselected State Styling:**
- Text color: muted gray (`text-gray-400 dark:text-gray-500`)
- No underline or background
- Font weight: regular or medium

**Spacing & Sizing:**
- Padding: px-3 py-1.5 (or similar to current)
- Gap between tabs: appropriate for text-only layout
- Responsive: tabs remain scrollable on all screen sizes

### 3. Visual Hierarchy & Dark Mode

**Light Mode:**
- Sports row: muted gray text for unselected, bright primary color background for selected
- Filter tabs row: muted gray text for unselected, bright underline for selected

**Dark Mode:**
- Sports row: lighter muted gray for unselected, same background highlight for selected
- Filter tabs row: lighter muted gray for unselected, bright underline for selected
- Use existing dark mode classes and `[data-theme="dark"]` selectors

### 4. Responsive Behavior

**Desktop (1024px+):**
- Icons and text render normally
- Horizontal scrolling if needed
- Uses DesktopSportsLayout

**Mobile (<768px):**
- Same layout as desktop (vertical icon stacking)
- Horizontal scrolling enabled
- Icon sizes may remain consistent or scale down slightly
- Uses MobileSportsLayout

**Tablet (768px - 1023px):**
- Consistent with desktop behavior

## Implementation Details

### Component Changes

**SportsTabs.vue:**
1. Import `SportsIcons` component
2. Modify template to render icon + text in vertical stack for each sport
3. Update selected state styling to include background highlight
4. Update unselected state styling to muted gray
5. Adjust spacing and padding for new layout

**HighlitsTab.vue:**
1. Update highlights array to include all 5 tabs: HIGHLIGHTS, POPULAR, COUNTRIES, TODAY, UPCOMING
2. Update template labels to render all uppercase
3. Remove background styling from tab container (or keep it minimal)
4. Update selected state to show underline-only
5. Update unselected state styling to muted gray

### Data & State

- Sport icons and colors already exist in `useSports.js`
- Sports navigation store (`useSportsNavigationStore`) remains unchanged
- Filter state management in `useSportsQueryParamsStore` remains unchanged
- New filter tabs (COUNTRIES, TODAY) may require backend integration for filtering logic (out of scope for UI redesign)

### Styling Approach

- Use Tailwind CSS classes for all styling
- Leverage existing color tokens (brand-bright, primary, gray-500, etc.)
- Use dark mode selectors `dark:` where needed
- No hardcoded colors (use Tailwind tokens only)

## Testing Checklist

- [ ] Sports icons render correctly for all sport types
- [ ] Selected sport shows background highlight
- [ ] Unselected sports show muted gray text
- [ ] Filter tabs display all 5 labels correctly
- [ ] Selected filter tab shows underline
- [ ] Horizontal scrolling works on both rows
- [ ] Dark mode styling applies correctly
- [ ] Mobile and desktop layouts render identically
- [ ] Icon colors match sport identity (soccer=brand-bright, basketball=orange, etc.)
- [ ] No text overflow or layout issues on narrow screens

## Out of Scope

- Backend filtering logic for COUNTRIES and TODAY tabs
- Icon library expansion or custom icons
- Animation or transition effects
- Changes to other sports-related components (sidebar, betslip, etc.)

## Notes

- Existing component behavior (click handlers, navigation, match fetching) remains unchanged
- Only visual styling and icon additions are in scope
- Reference design shows standard UI patterns (vertical icon stacks, underline tabs, background highlights)
