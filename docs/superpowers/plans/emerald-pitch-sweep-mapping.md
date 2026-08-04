# Emerald Pitch Sweep Mapping (apply with role judgement)

Replace the OLD signature with the NEW Tailwind utility / token. Never
introduce a new hex — if no row fits, add a semantic token to src/style.css
instead.

## Backgrounds / surfaces (navy family → surface tokens)
- bg-navy-950 / [#0b1120] / [#0a0f1a]            → bg-surface-deepest
- bg-navy-900 / darkest app bg                    → bg-background
- bg-navy-800 / [#1a2744] / card bg               → bg-card  (or bg-surface-elevated)
- bg-navy-700 / [#1e2d4a]                         → bg-surface-interactive
- bg-navy-600                                     → bg-surface-active

## Borders
- border-navy-800 / [#1e2d4a]                     → border  (or border-subtle)
- border-navy-700                                 → border-strong
- border-navy-950                                 → border-darkest

## Text (navy/grey neutrals)
- text-white on dark / [#fff] as body text        → text-foreground
- text-navy-300 / [#cbd5e1]                        → text-subtle
- text-navy-400 / text-navy-500 / muted greys      → text-muted-foreground
- very-muted secondary text                        → text-text-muted-alt

## Brand green (emerald-* / green-400..600 / one-off greens #36C31F #57cc05)
- fill / bg brand green                            → bg-primary
- text brand green / links / active                → text-primary
- ring / focus green                               → ring-ring
- darker green-700..900 (deep accents)             → text-brand-teal / bg-brand-forest
- success / "won" green                            → text-success / bg-success

## Gold / amber / yellow (#f97316 #ffb002 #FFB002 #FEAF04, *-yellow-*, *-amber-*, gold gradients)
- premium / VIP / boost / jackpot fill             → bg-gold
- premium text / star                              → text-gold
- warning state                                    → text-warning

## Status reds (#f00 #F44336 *-red-* used for error/loss)
- error / loss / destructive bg                    → bg-destructive
- error / loss text                                → text-destructive

## Inline :style="{ color:'#xxxx' }" / JS color literals
- replace literal with var(--token), e.g.
  :style="{ color: 'var(--primary)' }"
- if dynamic, expose a CSS var and reference it.

## Pure neutrals — DO NOT TOUCH (allowed, not brand)
- #fff/#ffffff/#000/#000000/white/black for icons, dividers, pure overlays
- rgba(0,0,0,X) / rgba(255,255,255,X) shadows & scrims
- SVG/flag/illustration literal fills inside <svg> or src/assets
