---
name: BANDA High-Velocity Design System
colors:
  surface: '#1a120a'
  surface-dim: '#1a120a'
  surface-bright: '#42372e'
  surface-container-lowest: '#140d06'
  surface-container-low: '#231a11'
  surface-container: '#271e15'
  surface-container-high: '#32281f'
  surface-container-highest: '#3d3329'
  on-surface: '#f1dfd1'
  on-surface-variant: '#dbc2ad'
  inverse-surface: '#f1dfd1'
  inverse-on-surface: '#392e25'
  outline: '#a28d7a'
  outline-variant: '#544434'
  surface-tint: '#ffb86f'
  primary: '#ffbc77'
  on-primary: '#4a2800'
  primary-container: '#fa9602'
  on-primary-container: '#613700'
  inverse-primary: '#8a5100'
  secondary: '#edbca6'
  on-secondary: '#47291a'
  secondary-container: '#613e2e'
  on-secondary-container: '#dbab95'
  tertiary: '#c9c9c9'
  on-tertiary: '#2f3131'
  tertiary-container: '#adaeae'
  on-tertiary-container: '#404242'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdcbd'
  primary-fixed-dim: '#ffb86f'
  on-primary-fixed: '#2c1600'
  on-primary-fixed-variant: '#693c00'
  secondary-fixed: '#ffdbcc'
  secondary-fixed-dim: '#edbca6'
  on-secondary-fixed: '#2f1407'
  on-secondary-fixed-variant: '#613e2e'
  tertiary-fixed: '#e2e2e2'
  tertiary-fixed-dim: '#c6c6c7'
  on-tertiary-fixed: '#1a1c1c'
  on-tertiary-fixed-variant: '#454747'
  background: '#1a120a'
  on-background: '#f1dfd1'
  surface-variant: '#3d3329'
typography:
  h1:
    fontFamily: Montserrat
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  h1-mobile:
    fontFamily: Montserrat
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  h2:
    fontFamily: Montserrat
    fontSize: 20px
    fontWeight: '700'
    lineHeight: 28px
  odds-display:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 20px
  body-main:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  data-compact:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
  label-caps:
    fontFamily: Inter
    fontSize: 10px
    fontWeight: '700'
    lineHeight: 12px
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 12px
  lg: 16px
  xl: 24px
  gutter: 8px
  margin-mobile: 12px
  margin-desktop: 24px
---

## Brand & Style
This design system is engineered for high-stakes, high-density environments where data speed and visual clarity are paramount. The brand personality is aggressive, prestigious, and energetic, blending the luxury of "Gold" with the grounded intensity of "Coffee." 

The design style is **Modern Corporate with High-Density** influences. It prioritizes information density to ensure users can view maximum betting markets and casino options without excessive scrolling. The aesthetic uses sharp hierarchy, subtle depth, and vibrant status indicators to create a "Live" atmosphere that feels responsive and urgent. 

Targeting a high-frequency user base, the UI evokes a sense of professional-grade tooling—efficient, reliable, and premium.

## Colors
The palette is centered around the "BANDA Gold" (#fa9602), used strictly for primary actions, critical highlights, and winning states. "Coffee" (#2d1306) serves as the core structural color, providing a sophisticated alternative to standard blacks or grays.

**Dark Mode (Default):** Uses a deep "Coffee-Black" for backgrounds to reduce eye strain during long sessions, with surfaces layered in lighter Coffee tones.
**Light Mode:** Flips the hierarchy using White and Light Gray surfaces, maintaining Coffee and Gold for typography and brand accents.

**Functional Accents:**
- **Live:** A high-vibrancy Red for active match states.
- **Win/Up:** A bright Emerald Green for successful bets or increasing odds.
- **Loss/Down:** A muted Rose for decreasing odds or settled losses.

## Typography
The typography system pairs **Montserrat** (headings and promotional display) with **Inter** (UI, tables, odds, and body copy). Montserrat carries the architecture; Inter carries the data, with `tabular-nums` on all numeric displays so odds and money align in columns. 

- **Headings:** Bold weights (700) are used for headers and section titles to provide a strong anchor for the eye amidst dense data.
- **Odds & Data:** Medium weights (500/600) are applied to betting odds and prices. This ensures legibility at small sizes while distinguishing interactive data from static labels.
- **High Density:** Line heights are kept tight (1.2x to 1.4x) to facilitate the "packed" layout requirement. 
- **Caps:** Small uppercase labels are used for secondary metadata (e.g., "MATCH TIME", "MARKET TYPE") to save vertical space.

## Layout & Spacing
This design system employs a **High-Density Fluid Grid**. The base spacing unit is 4px, allowing for granular control over tight data tables and grid layouts.

- **Desktop:** 12-column grid with narrow 8px gutters to maximize horizontal real estate for side-by-side market views.
- **Mobile:** 4-column grid with 12px margins. 
- **Density Rules:** Standard padding for betting "cells" is 8px (sm) horizontally and 4px (xs) vertically. This allows more markets to be visible above the fold. 
- **Reflow:** In desktop view, the "Bet Slip" is pinned to the right as a persistent sidebar, while the left sidebar handles navigation.

## Elevation & Depth
In this high-density environment, depth is primarily conveyed through **Tonal Layering** rather than heavy shadows, to prevent the UI from feeling cluttered.

- **Level 0 (Background):** Deepest Coffee tone.
- **Level 1 (Cards/Containers):** Lighter Coffee surface with a 1px inner stroke (low opacity white) to define edges.
- **Level 2 (Odds/Buttons):** Interactive elements use a subtle gradient or a slightly lifted background color.
- **Focus/Active:** Gold shadows are reserved exclusively for "Win" celebrations or primary call-to-action focus states.
- **Interactions:** Use a 2px elevation shift (subtle drop shadow) only on hover for clickable market cells.

## Shapes
Following the **ROUND_FOUR** (Soft) logic, the shape language uses a conservative corner radius to maximize internal space for text.

- **Standard Elements (Buttons, Inputs):** 4px (0.25rem) radius.
- **Containers (Cards, Modals):** 8px (0.5rem) radius.
- **Small Elements (Tags, Badges):** 2px or 4px radius depending on context.

The 4px radius strikes a balance between professional rigidity and modern approachability, ensuring that table cells and grids align cleanly without excessive "dead air" in the corners.

## Components

### Buttons
- **Primary:** Gold background with Coffee text. Heavy bold weight.
- **Secondary:** Coffee background with 1px Gold border.
- **Ghost:** Transparent background with White or Gold text for utility actions.

### Market Cells (Odds)
- **State - Neutral:** Surface color background, White text for odds.
- **State - Selected:** Gold background, Coffee text.
- **State - Up/Down:** Brief flash of Green/Red background when odds change.

### Inputs
- **Bet Amount:** Compact height (32px), monospace-adjacent numerical entry, Coffee background with White border.

### Chips & Badges
- **Live Badge:** Red background, white text, pulsing dot icon.
- **Sport Category:** Pill-shaped, Coffee background with subtle icon.

### Casino Cards
- **High-Ratio:** 3:4 aspect ratio cards with minimal internal padding. Titles are overlaid on a bottom-third dark gradient to ensure image-to-edge visibility.

### Tables (Data)
- **High-Density Rows:** 32px height, alternating row stripes for legibility. No borders between columns, only subtle horizontal dividers.