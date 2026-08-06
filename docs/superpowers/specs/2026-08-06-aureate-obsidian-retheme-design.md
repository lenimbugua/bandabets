# Aureate Obsidian Retheme — Design

**Date:** 2026-08-06
**Status:** Approved
**Source:** `~/Downloads/DESIGN (1).md` (Aureate Obsidian design system)
**Scope:** Layer 1 palette swap in `app/assets/css/style.css`, font swap to Hanken Grotesk, radius-scale retune. Layer 2 semantics untouched; light theme keeps working on the new ramp's lighter steps (user chose "retheme dark, leave light"). Surfaces follow the YAML machine tokens (charcoal cards), not the prose's coffee cards (user decision).

## Palette (layer 1 only)

- **Coffee ramp → charcoal surfaces, neutral on-surface, warm accents kept** (the new YAML retains the existing `#dbc2ad` / `#a28d7a` / `#544434` values verbatim):
  50 `#f6f5f4` (interp) · 100 `#e5e2e1` · 200–400 unchanged · 500 `#353534` · 600 `#2a2a2a` · 700 `#201f1f` · 800 `#1c1b1b` · 900 `#131313` · 950 `#0e0e0e`.
  Mid-tone text steps 450/550/650 stay (still luminance-matched, still warm like their 200–400 neighbours).
- **Gold:** only step 500 changes, `#fa9602` → `#fa9603`; every other step already matches the new YAML.
- **Green → desaturated emerald (tertiary family):**
  50 `#eafaf2` · 100 `#b1f0ce` · 200 `#95d4b3` · 300 `#7dbb9b` · 400 `#57a67f` (interp, win/odds-up) · 500 `#2d6a4f` (prose emerald) · 600 `#1f5c43` (interp) · 700 `#0e5138` · 800 `#044b33` · 900 `#003824` · 950 `#002114`.
- **Tertiary gray → warm taupe (secondary family):**
  50 `#f8f4f0` · 100 `#f1dfd1` · 200 `#d4c4b6` · 300 `#c6b6a8` · 400 `#a89a8c` (interp) · 500 `#7d7164` (interp) · 600 `#61564a` (interp) · 700 `#52473d` · 800 `#50453b` · 900 `#392f25`.
- **Red, betslip green, absolutes, brand-ink:** unchanged (the new YAML's error tokens already exist in the red ramp).

## Typography

Hanken Grotesk replaces Montserrat (display) and Inter (body/odds) in `--font-sans`, `--font-display`, `--font-odds` and the Google Fonts link in `nuxt.config.js` (weights 400–800; Great Vibes dropped — referenced nowhere in `app/`).

## Radius scale

Doc intent: standard controls 8px, containers 16px. Existing markup uses `rounded-sm` for controls and `rounded-xl` for cards, so the scale is retuned in place (no component edits):
`--radius` 0.5rem · xs 0.25 · sm 0.5 · md 0.625 · lg 0.75 · xl 1 · 2xl 1.25 · 3xl 1.5 · 4xl 2. This lands controls on 8px and cards on 16px exactly as the doc specifies, preserving the compressed-scale ordering.

## Out of scope

Spacing/typography scale utilities (`text-display-lg` etc. already exist), component markup changes, light-theme redesign, DESIGN.md replacement.
