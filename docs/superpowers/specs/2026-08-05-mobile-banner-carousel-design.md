# Mobile Banner Carousel (Peek Slides) — Design

**Date:** 2026-08-05
**Status:** Approved (user supplied exact reference)
**Scope:** Section 3 of the mobile landing restructure. `app/components/TheBanner.vue` + its wrappers in `MobileSportsLayout.vue` and `casino-home.vue`. Desktop rendering unchanged. No color/token changes. New 3:1 artwork will replace current images later — layout must not depend on current image sizes.

## Target behavior (from reference)

- Active slide inset 12px from the left, next slide peeking on the right and running to the very screen edge, ~12px gap between slides.
- Slides keep their rounded corners and 3:1 aspect; height derives from slide width (not container width).
- No overlay arrows on mobile — the peek affords swiping; autoplay + loop stay.

## Implementation

- `TheBanner.vue`:
  - Move `aspect-[3/1]` from the outer frame onto each slide button; drop the outer frame's `overflow-hidden`.
  - Swiper `breakpoints`: `{ 0: { slidesPerView: 1.1 }, 1024: { slidesPerView: 1 } }`, `spaceBetween: 12` everywhere — desktop stays a full-width single slide.
  - Swiper element gets `max-lg:overflow-visible!` so the next slide is visible outside the padded box below `lg`; at `lg+` Swiper's default `overflow: hidden` applies as before.
  - Prev/next overlay arrows become `hidden lg:flex`.
- `MobileSportsLayout.vue`: banner wrapper becomes a full-width `overflow-hidden` clip (at screen edge) around an `mx-3` inset box, with `pt-3` breathing room under the tabs bar. The old `rounded-xl overflow-hidden` wrapper goes away (slides are rounded themselves).
- `casino-home.vue`: wrap `<TheBanner>` in an `overflow-hidden` div so overflowing peek slides clip at the container instead of causing horizontal page scroll (clips 12px shy of the screen edge there — acceptable off-landing).
