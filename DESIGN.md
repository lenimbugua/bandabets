---
name: Naibet Core Design System
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#50434e'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#82727f'
  outline-variant: '#d4c1d0'
  surface-tint: '#923899'
  primary: '#6f1378'
  on-primary: '#ffffff'
  primary-container: '#8a3192'
  on-primary-container: '#ffb6fe'
  inverse-primary: '#fea9ff'
  secondary: '#0e6e08'
  on-secondary: '#ffffff'
  secondary-container: '#9cf986'
  on-secondary-container: '#187411'
  tertiary: '#364154'
  on-tertiary: '#ffffff'
  tertiary-container: '#4d586c'
  on-tertiary-container: '#c3cee6'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffd6fb'
  primary-fixed-dim: '#fea9ff'
  on-primary-fixed: '#36003d'
  on-primary-fixed-variant: '#761c7f'
  secondary-fixed: '#9cf986'
  secondary-fixed-dim: '#81dc6d'
  on-secondary-fixed: '#002200'
  on-secondary-fixed-variant: '#005300'
  tertiary-fixed: '#d8e3fb'
  tertiary-fixed-dim: '#bcc7de'
  on-tertiary-fixed: '#111c2d'
  on-tertiary-fixed-variant: '#3c475a'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  display-lg:
    fontFamily: Montserrat
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Montserrat
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Montserrat
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  headline-md:
    fontFamily: Montserrat
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 48px
  container-max: 1280px
  gutter: 24px
---

## Brand & Style

This design system is built on the principles of **Modern Corporate Precision**. It bridges the high-stakes energy of professional betting with the sobriety and security of a fintech platform. The aesthetic is clean, high-contrast, and "premium-utilitarian," prioritizing clarity of information and structural integrity.

The brand personality is authoritative yet vibrant. By balancing a deep, saturated purple with a high-visibility lime green against a backdrop of sophisticated charcoals, the UI communicates a sense of "elite performance." The visual mood is focused and reliable, designed to instill confidence during complex transactional workflows.

## Colors

The color palette is anchored by the signature **Naibet Purple** (Primary) and **Action Green** (Secondary). 

- **Primary Purple (#8A3192):** Used for primary brand moments, active states, and key navigational elements.
- **Secondary Green (#63BC52):** Reserved for "Success" states, confirmation actions, and positive financial indicators.
- **Deep Charcoal (#121826):** Serves as the high-contrast foundation for text and structural borders, providing a premium feel.
- **Slate Grays (#64748B):** Utilized for secondary information, metadata, and iconography to maintain a balanced hierarchy.
- **Off-White (#F8FAFC):** The primary background surface, ensuring the interface feels airy and modern rather than clinical.

## Typography

The typographic system utilizes a dual-font approach to maximize readability while maintaining a distinctive character.

**Montserrat** is used for headings and display text. Its geometric precision and wide stance lend an air of confidence and modernity to the platform's architecture.

**Inter** is the workhorse for all body copy, inputs, and data tables. It is chosen for its exceptional legibility at small sizes and its neutral, systematic feel which is essential for dense financial or betting data.

Key hierarchy is achieved through weight variance—using SemiBold and Bold for "Actionable" items and Medium for "Instructional" content.

## Layout & Spacing

This design system employs a **12-column fluid grid** for desktop and a **4-column grid** for mobile. The layout philosophy is centered on "Information Density Control."

- **Desktop:** 12 columns, 24px gutters, and 48px side margins. Content is housed in a centered container with a max-width of 1280px to maintain readability on ultra-wide monitors.
- **Mobile:** 4 columns, 16px gutters, and 16px side margins. 
- **Spacing Scale:** A strict 8px linear scale is used for all internal component spacing (padding/margins) to ensure mathematical harmony and visual rhythm. Use 4px for tight groupings like icon-and-label pairs.

## Elevation & Depth

To maintain a professional and "flat-plus" aesthetic, depth is conveyed through **Tonal Layers** and **Micro-Shadows**.

1.  **Level 0 (Background):** #F8FAFC (Off-White).
2.  **Level 1 (Cards/Containers):** Pure White (#FFFFFF) with a 1px border in #E2E8F0. No shadow.
3.  **Level 2 (Hover/Active):** Pure White with a "Soft Slate" shadow: `0px 4px 12px rgba(15, 23, 42, 0.08)`.
4.  **Level 3 (Modals/Popovers):** Pure White with a pronounced "Elevated" shadow: `0px 12px 32px rgba(15, 23, 42, 0.12)`.

This system avoids heavy blurs or skeuomorphism, relying instead on crisp lines and subtle value shifts to define hierarchy.

## Shapes

The design system uses a **Soft (0.25rem / 4px)** base roundedness. 

This specific radius provides a "professional-modern" feel—it is more approachable than sharp 90-degree corners but avoids the playfulness of fully rounded UI. 

- **Standard Elements (Inputs, Buttons, Cards):** 4px radius.
- **Large Elements (Modals, Large Sections):** 8px radius (`rounded-lg`).
- **Interactive Indicators (Pills, Badges):** Full roundedness (999px) for status chips.

## Components

### Buttons
- **Primary:** Solid #8A3192 (Purple) with White text. Bold weight.
- **Secondary:** Outlined 1px #8A3192 with Purple text.
- **Success/Bet:** Solid #63BC52 (Green) with Deep Charcoal (#121826) text for maximum legibility and contrast during "win" states.

### Input Fields
- **Default:** White background, 1px #CBD5E1 border, 4px corner radius.
- **Focus:** 1px #8A3192 border with a subtle 2px Purple glow at 10% opacity.
- **Labels:** Inter Medium, 12px, #64748B (Slate Gray).

### Cards & Lists
- Cards use a 1px #E2E8F0 border. List items should have a 1px bottom border for clear separation in data-heavy views.
- Active list items (e.g., a selected betting market) use a 4px left-accent bar in Primary Purple.

### Chips & Badges
- **Status Badges:** Small, uppercase, bold. Use light tinted backgrounds (e.g., 10% Green background for "Won" with 100% Green text).