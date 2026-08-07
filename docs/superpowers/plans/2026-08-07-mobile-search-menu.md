# Mobile Search-Row Menu Button Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** On mobile, move the nav-drawer trigger out of the header's Row 1 into a layout-grid button flexed beside the search bar, using Tabler icons.

**Architecture:** Single-file template edit in `app/components/HeaderLinks.vue`'s mobile (`lg:hidden`) block. No script changes — `drawer`, `search`, and `openModal` are already bound.

**Tech Stack:** Nuxt 4, @nuxt/icon (Tabler), Tailwind 4 semantic tokens.

**Spec:** `docs/superpowers/specs/2026-08-07-mobile-search-menu-design.md`

## Global Constraints

- Only `app/components/HeaderLinks.vue` may change, and only its mobile (`lg:hidden`) block.
- Icons via `<Icon name="tabler:...">` (auto-registered); colors via semantic text tokens; no hard-coded colors.
- Verification = `pnpm build` exit 0 + SSR grep (no test framework).
- Commit on `main` directly (repo's current working mode).

---

### Task 1: Restructure mobile header rows

**Files:**
- Modify: `app/components/HeaderLinks.vue` (mobile block, ~lines 62-115)

**Interfaces:**
- Consumes: existing `openModal(drawer)` binding and `.mt-2` search pill markup.
- Produces: n/a (leaf UI change).

- [ ] **Step 1: Remove the Row-1 hamburger button**

Delete this entire button (keep `<TheLogo />` and the auth cluster):

```html
          <button
            aria-label="Open navigation menu"
            class="flex items-center justify-center w-9 h-9 rounded-lg text-foreground hover:bg-accent transition-colors duration-150"
            @click="openModal(drawer)"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
              <path fill-rule="evenodd" d="M2 3.75A.75.75 0 0 1 2.75 3h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 3.75Zm0 4.167a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Zm0 4.166a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Zm0 4.167a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Z" clip-rule="evenodd" />
            </svg>
          </button>
```

- [ ] **Step 2: Flex the search pill with a new layout-grid menu button**

Replace the current Row 2 (the `<!-- Row 2: Search bar (opens SearchModal) -->` comment through the closing `</button>` of the search pill) with:

```html
      <!-- Row 2: Search bar (opens SearchModal) + menu -->
      <div class="mt-2 flex items-center gap-2">
        <button
          type="button"
          aria-label="Search sport teams, football leagues and games"
          class="flex flex-1 min-w-0 items-center gap-2.5 rounded-full bg-surface-elevated px-4 py-2.5 text-left transition-colors duration-150 hover:bg-accent"
          @click="openModal(search)"
        >
          <Icon name="tabler:search" class="w-5 h-5 shrink-0 text-muted-foreground" />
          <span class="flex-1 truncate text-sm text-muted-foreground">
            Sport Team, Football League, Games
          </span>
          <span class="shrink-0 text-sm font-bold text-selected">Search</span>
        </button>
        <button
          type="button"
          aria-label="Open navigation menu"
          class="flex items-center justify-center w-11 h-11 shrink-0 rounded-full bg-surface-elevated text-foreground transition-colors duration-150 hover:bg-accent"
          @click="openModal(drawer)"
        >
          <Icon name="tabler:layout-grid" class="w-5 h-5" />
        </button>
      </div>
```

(The search pill's `mt-2` moved to the wrapper; `w-full` became `flex-1 min-w-0`; its raw `<svg>` glyph became `tabler:search`. Nothing else about it changed.)

- [ ] **Step 3: Build check**

Run: `pnpm build`
Expected: exit 0.

- [ ] **Step 4: SSR verification**

```bash
pnpm dev &
sleep 15
curl -s http://localhost:5079/ | grep -c "tabler:layout-grid"   # expect >= 1
curl -s http://localhost:5079/ | grep -c "tabler:search"        # expect >= 1
kill %1
```

Also confirm by grep on the file that the mobile block contains no `<svg` and exactly one `openModal(drawer)`.

- [ ] **Step 5: Commit**

```bash
git add app/components/HeaderLinks.vue
git commit -m "feat: move mobile nav trigger beside search using layout-grid icon"
```
