# Carini Group — UI/UX Redesign & Restructuring Plan v3.1

> **Revised:** 2026-05-20 · Re-audited *and stress-tested* against the actual current state of all
> 14 HTML files, `assets/shared.css`, `assets/components.css`, `assets/structures.css`, and `assets/shared.js`.
> v3.1 corrects the migration *sequencing* in v3.0 after verifying that the originally proposed
> "link the new CSS globally, then reconcile" step would have **broken or blanked multiple pages**.
>
> **Scope guarantee:** Visual, structural, and design-system redesign only. No feature, business
> logic, data, or interactive behaviour changes. Where a class must be renamed for consistency, the
> rename is an *identifier-only* change applied in lockstep across HTML, CSS, **and JS** so behaviour
> is byte-for-byte preserved.

---

## 0. The Central Finding: a Migration Stuck Half-Way

A clean semantic design system was already authored, then orphaned. **The half-finished state is itself
the biggest driver of inconsistency**, and naïvely "finishing" it the obvious way is unsafe.

| Discovery | Evidence |
|---|---|
| Semantic component library already exists | `assets/components.css` (btn, card, kpi, badge, input, grid utils) |
| Semantic structural library already exists | `assets/structures.css` (app shell, sidebar, kanban, modal, auth, hero, footer, tables) |
| **Both new files are orphaned — linked by ZERO pages** | All 14 HTML link `assets/shared.css` *only*; nothing references `components.css`/`structures.css` |
| **The new files reference tokens that don't exist** | `--bg-primary`, `--accent-gold`, `--text-tertiary`, `--border-light`, `--space-4`, `--text-xs` → **0** occurrences in `shared.css`. The new CSS is dead code pointing at undefined variables. |
| New CSS class names don't match real markup | `structures.css` uses `.sb-section`/`.sb-badge`; HTML uses `.sb-sec`/`.si-badge`/`.sb-nav`/`.si-icon` |
| One page partially refactored as a "reference" | `investor_portfolio.html` — the only file with no `<style>` block, yet still 164 element `style=""` attrs |

We don't need to *invent* a design system — we need to **finish wiring up the one that exists**.
But (see §1.13) it cannot simply be linked globally: its generic class names collide destructively
with the per-page markup that is currently styled by inline `<style>` blocks.

---

## 1. Complete Problem Analysis

### 1.1 Three competing style layers fighting in the cascade
1. **Element `style=""` attributes** — **937 total** across 14 files (highest specificity, always wins).
2. **Per-page inline `<style>` blocks** — in **13 of 14** files; each redeclares the entire `:root`, resets, and bespoke components (~400–800 lines each).
3. **`assets/shared.css`** — ~2,444 lines / 70 KB, linked everywhere, with **418 `!important`** and **585 `body[data-page="…"]`** override selectors.

The orphaned `components.css`/`structures.css` would form an inert 4th layer.

**Cascade order verified:** in every page the inline `<style>` opens early (e.g. `index.html:11`) and
`<link href="shared.css">` is far below the closing `</style>` (e.g. `index.html:655`). So `shared.css`'s
`:root` wins variable *values*, but each page's inline `<style>` *rules* still win wherever `shared.css`
doesn't override them, and `style=""` beats both — visually unpredictable per page.

### 1.2 Token divergence — same names, different values
| Token | Inline `<style>` (e.g. `index.html`) | `shared.css` (wins values) |
|---|---|---|
| `--success` | `#3fd68a` (neon) | `#1a9e5a` (muted) |
| `--blue` | `#4dc8ff` (neon) | `#1c7ac4` |
| `--danger` | `#f05252` | `#d63030` |
| `--warn` | `#f5a623` | `#c47a10` |
| `--border` | `rgba(212,168,67,0.26)` | `rgba(180,140,50,0.18)` |
| `--radius`/`--r` | `5px` | `8px` |
| `--font-cormorant` | `'Cormorant Garamond'` | `'Playfair Display'` (re-mapped) |

### 1.3 Semantic inversion in live tokens
`shared.css` keeps `--dark:#ffffff`, `--cream:#1a1510`, `--text:#1a1510` — names mean the opposite of
their value. The *new* files were written with intent-based names, but the rename was never finished in `shared.css`.

### 1.4 Typography
- **3 fonts requested, 2 ever used.** 13 pages load **Cormorant Garamond**, but `shared.css` re-maps `--font-cormorant`→Playfair and never imports Cormorant → it is downloaded on every page and **never rendered**.
- **26 duplicate Google Fonts `<link>`s** (2 per page × 13) duplicate the `@import` in `shared.css`.
- No shared type scale.

### 1.5 Colour & contrast
- Gold `#c49a2e` on white ≈ **3.3:1 — fails WCAG AA** (needs 4.5:1) for normal text.
- The neon inline palette fails contrast on white where it applies.

### 1.6 Spacing, radius & layout
- Radius `5px` (inline) vs `8px` (`shared.css`); no spacing scale; arbitrary literal padding/margins.

### 1.7 Component duplication
| Pattern | Divergent implementations |
|---|---|
| KPI tiles | `.kpi-tile` vs `.kpi` vs `.metric` |
| Tables | `.data-table` vs raw `table` vs `.tbl` |
| Section cards | `.panel` vs `.s-card` vs `.briefing-card` |
| Sidebar items | `.sb-item` vs `.nav-item` vs `.si-icon`/`.sb-sec` |
| Inputs | `.input-field` vs `.f-input` vs `.form-input` vs bare `<input>` vs inline `<input style>` |

### 1.8 Structural / shell divergence (the 8 portal pages)
| Page | Wrapper | Sidebar | Technique |
|---|---|---|---|
| `phase1_crm_pipeline` | `.app` | `.sb` | CSS Grid |
| `phase2_admin_dashboard` | `.app` | `.sb` | CSS Grid |
| `phase2_deal_room` | `.app` | `.sb` | CSS Grid |
| `investor_portfolio` | none | `.sb` | standalone/fixed |
| `outreach_engine` | none | `.sb` | standalone/fixed |
| `phase3_dashboards` | none | `.sidebar`(`#sidebar`) | `position:fixed` + margin |
| `phase3_ai_generator` | `.page` | **none** | top `<nav>` only |
| `phase0_auth` | `.auth-wrap` | **none** | centered card |

So there are **three** shell archetypes (sidebar-app, topbar-only, centered-auth) and **two** sidebar class names — a single "unify all portals on a sidebar" rule would be wrong for auth and AI generator.

### 1.9 Active rendering bugs (verified)
- **Noise overlay covers modals:** `shared.css:286` sets `body::after{z-index:9999}`. `structures.css` lowered it to `100`, but it isn't linked, so **9999 renders** and sits above modals/toasts.
- **Dual toast systems:** `shared.js` toasts at `z-index:10001/bottom:78px`; pages also ship `#toast` (`.show` class; `structures.css` defines it at `z-index:500/bottom:32px`). `shared.js` defers when a page already defines `window.showToast`, so both coexist with different positions.

### 1.10 Navigation & flow
- `shared.js` injects a global `#cg-nav` bottom bar (14 links: **public** group of 6, **portal** group of 8) — the de-facto site map; **preserve it.**
- No shared public navbar/footer; portal sidebars link inconsistently; no enforced login→role→dashboard routing.

### 1.11 Maintainability
- Brand colour change = editing 14 inline `:root` blocks **plus** `shared.css`. 418 `!important` make `shared.css` edits risky.
- 7 dead automation scripts remain (`_remove_dark_theme.py`, `_fix_light_theme.py`, `_fix_overrides.py`, `_fix_overrides.ps1`, `_fix_portals.ps1`, `_replace_lines.ps1`, `_debug.ps1`).

### 1.12 Must-preserve logic (do NOT alter behaviour)
| Behaviour | Where |
|---|---|
| `show('tab',this)` panel switching | dashboards (62), investor (41), outreach (35), admin (30), deal room, CRM |
| Kanban drag-and-drop | `phase1_crm_pipeline` (`.card[draggable]`, `.dragging`, `.drag-over`, `.col-cards`) |
| Auth role select + reg steps | `phase0_auth` (`.role-opt.selected`, `.rs-dot`, `.auth-tab`) |
| Role-based nav toggling | `phase3_dashboards` (`clientNav`/`agentNav` `style.display`) |
| Global nav / transitions / reveal / toast | `shared.js` (`#cg-nav`, `REVEAL_SELECTOR`, `window.CG.toast`) |

### 1.13 Class-name collisions — why global linking is unsafe *(new in v3.1)*
Generic class names appear **580 times** across the 14 files (`index.html` alone: 117) and are currently
styled by each page's inline `<style>`. The orphaned files reuse those same names with *different*
meaning, so linking them globally overrides per-page rules destructively:

- **`.content` is default-hidden and overloaded.** `structures.css` and several pages define `.content{display:none}` / `.content.active{display:block}` for tab panels. But `.content` is also used as a *generic wrapper* on public pages — **59 uses across 10 files**, including `international_hub`(5), `phase3_property_search`(5), `neighbourhood_hub`(2), `lead_capture`(1). Linking `structures.css` globally would set those wrappers to `display:none` and **blank the page**.
- **`.card` is overloaded.** In CRM/`structures.css`, `.card` is a *draggable kanban lead card* (gold left-bar, `.dragging`/`.drag-over`). In `index.html` it's a static module card. Global `structures.css` would graft drag styling onto static cards.
- **`.panel`, `.metric`, `.nav-item`, `.sidebar`, `.btn`** similarly differ page-to-page.

**Implication:** the v3.0 "Phase 2 = link globally, then reconcile" step is wrong. Reconciliation
must come *first* (define one taxonomy, resolve overloads), and adoption must be **per-page atomic**.

### 1.14 JS-generated markup *(new in v3.1)*
Much of the DOM is built in **JS template literals**, not static HTML — e.g. kanban cards at
`phase1_crm_pipeline.html:1375` (`` `<div class="card" draggable="true" id="card-${lead.id}">` ``).
Static-HTML edits never reach these nodes, and any class rename or structural change **must also be
applied inside the JS template strings** or the rendered DOM diverges from the stylesheet.

### 1.15 JS-driven dynamic inline styles — must NOT be stripped *(new in v3.1)*
**39 occurrences across 8 files** (admin 13, CRM 9, AI generator 6, auth 4) set styles dynamically:
`element.style.display = …` for role nav (`phase3_dashboards.html:2711`), progress-bar `style="width:${…}"`,
chart sizing, etc. Phase 4's inline-style purge must **exclude** any `style=""` that is JS-written or
contains `${…}`, and must preserve any element whose `.style` is read/written by JS.

### 1.16 shared.js ↔ class-taxonomy coupling *(new in v3.1)*
`shared.js` `REVEAL_SELECTOR` hard-codes `.module-card, .panel, .s-card, .listing-card, .tool-panel,
.qopt, .role-opt, .card, [data-reveal]`. If migration renames any of these (e.g. generic `.card`→`.module-card`),
`REVEAL_SELECTOR` must be updated in lockstep or those elements lose (or gain) the scroll-reveal animation.

### 1.17 Bare / element-selector inputs *(new in v3.1)*
Several pages (e.g. `phase3_ai_generator`) use unclassed `<input>` styled only by `shared.css`'s element
selector. Unifying onto `.input-field` requires *adding* the class to bare inputs — it won't apply automatically.

### 1.18 Out of scope (explicitly noted)
`data-theme="light"` is hard-set on `<html>` with no dark-mode toggle; there are no print/RTL styles.
These are intentionally **out of scope** unless requested, but recorded so they aren't mistaken for gaps.

---

## 2. Target Architecture & Strategy

**Finish the existing migration — but reconcile the taxonomy first, then migrate page-by-page.**

Final per-page load order:
```
shared.css     → tokens + base reset + (shrinking) page overrides
structures.css → layout shells (app, sidebar, topbar, hero, kanban, modal, auth, footer, tables)
components.css → reusable components (btn, card-base, kpi, badge, input, grid utils)
```

1. **Single token source.** Add the semantic tokens the new files expect to `shared.css :root`
   (canonical light values); keep legacy names (`--dark`, `--cream`, `--gold`, `--border`, `--r`) as
   **aliases** (`--gold: var(--accent-gold)`) so nothing breaks during migration.
2. **One canonical palette** — the muted professional set, not the neon inline set.
3. **Typography** — Playfair (headings) + DM Sans (body); **remove Cormorant** (never rendered); one type scale + spacing scale.
4. **One taxonomy, overloads resolved (before any global link):**
   - Kanban lead card stays `.card`; **generic static cards → `.module-card`/`.card-base`** (and update `REVEAL_SELECTOR`).
   - Tab-panel `.content` keeps `display:none`; **generic content wrappers → `.page-content`** (no hidden default) before adopting `structures.css`.
   - Sidebar taxonomy unified (`.sb-sec`/`.si-badge`/`.sb-nav`/`.si-icon` ↔ `structures.css`) — pick one, apply to HTML+CSS+JS.
5. **Three shell archetypes, not one:** sidebar-app (6 pages), topbar-only (AI generator), centered-auth (auth). Unify *within* each archetype.
6. **Fix live bugs:** noise overlay z-index; single toast system.
7. **Connect the flow:** shared public navbar/footer + mocked auth role routing.

---

## 3. Phased Roadmap

> Every phase is independently shippable and visually verifiable. No phase changes behaviour or data.
> Migration is **per-page atomic** (Phase 4) to avoid the broken intermediate states global linking would cause.

### Phase 0 — Discovery & safety net *(0.5 day)*
- **0.1** Freeze the protected-names list (§1.12) and the JS-generated-markup map (§1.14): kanban template, dashboards role nav, any `innerHTML`/template strings that emit styled classes.
- **0.2** Settle the open decisions in §5.
- **0.3** Capture a before/after screenshot baseline of all 14 pages at 5 breakpoints; re-shoot after each page migrates.

### Phase 1 — Token unification in `shared.css` *(1.5 days)*
- **1.1** Add semantic tokens to `:root` with canonical values; alias legacy names to them.
- **1.2** Collapse divergent colour values to the one canonical palette.
- **1.3** Remove Cormorant; add a single type scale (`--text-xs … --text-2xl`) + spacing scale (`--space-1 … --space-8`).
- **1.4** Unify radius (`--radius-sm/--radius/--radius-lg`).
- *Outcome:* `components.css`/`structures.css` now resolve against real tokens (but are still not linked).

### Phase 2 — Taxonomy & collision resolution *(1 day)* — **MUST precede any global link**
- **2.1** Author the canonical class map (§2.4): `.card` (kanban) vs `.module-card`/`.card-base` (generic); `.content` (tab-panel) vs `.page-content` (generic wrapper); unified sidebar classes; `.input-field` for inputs.
- **2.2** Reconcile `structures.css`/`components.css` to that map (rename their selectors where they currently mismatch the chosen names).
- **2.3** Update `shared.js` `REVEAL_SELECTOR` to match the final card/panel class names (§1.16).
- **2.4** Document, per page, which generic `.content`/`.card`/`.panel` instances must be renamed before that page adopts the new CSS.

### Phase 3 — Reference page hardening *(0.5 day)*
- **3.1** Bring `investor_portfolio.html` fully onto the new system (link the 3 stylesheets for this page; remove its remaining 164 element `style=""`; apply the taxonomy). Use it as the proven template and checklist for Phase 4.

### Phase 4 — Per-page atomic migration *(4 days, file-by-file)*
For **each** page, in one atomic change, then verify before moving on:
- **4.a** Rename that page's overloaded generic classes (`.content`→`.page-content`, generic `.card`→`.module-card`, etc.) **in HTML and in any JS template strings** (§1.14).
- **4.b** Add `<link>`s for `structures.css` + `components.css` after `shared.css`.
- **4.c** Delete the page's inline `<style>` block and its duplicate Google Fonts `<link>`s (§1.4).
- **4.d** Replace element `style=""` with utility/component classes — **excluding** JS-driven/`${…}` dynamic styles (§1.15).
- **4.e** Verify: render at 5 breakpoints; exercise the page's JS (tabs, drag, role switch, modals, toasts).
- *Order (least→most risky):* international → neighbourhood → lead_capture → boutique → index → property_search → ai_generator → auth → deal_room → crm → outreach → admin → dashboards.
- *Rationale:* per-page atomicity means a page is never in the half-styled state that simultaneous global-link-then-strip would create, and the neon-vs-muted token split (§1.2) is resolved the instant a page's inline `:root` is removed.

### Phase 5 — Shell unification *(1.5 days)*
- **5.1** Sidebar-app archetype: standardize the 6 sidebar pages on `.app` Grid + one sidebar class; migrate dashboards (`.sidebar`/fixed), investor, outreach onto it.
- **5.2** Keep the topbar-only (AI generator) and centered-auth (auth) archetypes; standardize their topbar/card, **don't force a sidebar**.
- **5.3** Add one responsive sidebar toggle (<960px) in `shared.js` — additive, no behaviour change. Verify it doesn't conflict with `body{padding-bottom:72px}` + `#cg-nav`.

### Phase 6 — Component standardization *(1.5 days)*
- KPI tiles → one `.kpi-tile`; tables → `.data-table`; cards → `.card-base`/`.card-interactive`; **add `.input-field` to bare inputs** (§1.17); badges → `.badge-*`. Standardize hover to `translateY(-2px)+shadow`.

### Phase 7 — Flow connection & routing *(0.5 day)*
- **7.1** Shared public navbar + footer across the 6 public pages with correct `href`s.
- **7.2** "Sign In" CTAs → `phase0_auth.html`.
- **7.3** Mock auth routing (additive demo wiring, no logic removed): Admin→`phase2_admin_dashboard`, Agent→`phase1_crm_pipeline`, Client→`phase3_dashboards`, Investor→`investor_portfolio`.

### Phase 8 — QA, accessibility & cleanup *(1.5 days)*
- **8.1** Fix noise overlay z-index in `shared.css` (9999→below modals); consolidate to a single toast (route page `showToast`→`CG.toast`, retire the duplicate `#toast`).
- **8.2** WCAG AA: darken gold for text (≥`#9a7a1e`) or restrict gold to tinted backgrounds; add focus outlines + `aria-label`s. **Optional (needs sign-off, §5):** make `onclick` `<div>` tabs/role options keyboard-operable via `role`/`tabindex`/`keydown` — additive only.
- **8.3** Responsive QA at 375/768/960/1180/1440px.
- **8.4** Purge `!important` where specificity now allows; remove dead `body[data-page]` overrides made redundant by the components.
- **8.5** Delete the 7 dead automation scripts.

---

## 4. Risks & Mitigation

| Risk | Severity | Mitigation |
|---|---|---|
| Global-linking the new CSS blanks pages via `.content{display:none}` | 🔴 High | Phase 2 taxonomy + Phase 4 per-page atomic adoption; rename generic `.content`→`.page-content` first |
| Generic `.card`/`.panel` corrupted by kanban/structural styles | 🔴 High | Phase 2 overload resolution before any link |
| Class rename misses JS-generated markup | 🔴 High | §1.14 map; rename in JS template strings in the same change |
| Stripping a JS-driven dynamic `style=""` breaks charts/progress/role-nav | 🔴 High | §1.15 — exclude `${…}` and `.style`-targeted elements from Phase 4.d |
| Breaking kanban drag / auth wizard / `show()` tabs / role nav | 🔴 High | §1.12 protected list; identifier-only renames in lockstep |
| `REVEAL_SELECTOR` out of sync after card rename → lost/extra reveals | 🟡 Med | Phase 2.3 updates `shared.js` with the rename |
| Token aliases create a mixed palette on a page mid-migration | 🟡 Med | Per-page atomicity removes inline `:root` and adopts components together |
| Forcing a sidebar onto auth / AI generator | 🟡 Med | §1.8 three archetypes; Phase 5.2 |
| Cormorant removal changes a heading that actually used it | 🟢 Low | It's re-mapped to Playfair already; visually a no-op |
| Dual toast / noise overlay regressions | 🟢 Low | Phase 8.1 |

---

## 5. Decisions Needed Before Phase 1
1. **Card taxonomy:** keep `.card` for kanban and rename generic cards to `.module-card`/`.card-base` (recommended — avoids touching drag JS), or rename the kanban card and update its drag selectors?
2. **`.content` wrappers:** rename generic content wrappers to `.page-content` (recommended), or scope the hidden-default rule so it can't hit them?
3. **Sidebar taxonomy:** rename markup to match `structures.css` (`.sb-section`/`.sb-badge`), or adjust the CSS to existing markup (`.sb-sec`/`.si-badge`)?
4. **Auth page:** keep light (consistent) or restore dark luxury?
5. **Public hero:** light-modern (current `shared.css`) or dark-luxury (original boutique)?
6. **Bottom `#cg-nav`:** keep as a demo aid, or hide behind a toggle for a more "real product" feel?
7. **Keyboard a11y for `onclick` divs (§8.2):** in scope (additive) or defer?

---

## 6. Timeline
```
Phase 0  Discovery & decisions        0.5d
Phase 1  Token unification            1.5d   ← makes the orphaned CSS resolvable
Phase 2  Taxonomy & collision resolve 1.0d   ← MUST precede any global link
Phase 3  Reference page hardening     0.5d
Phase 4  Per-page atomic migration    4.0d   ← inline <style>, fonts, element styles, class renames
Phase 5  Shell unification (3 types)  1.5d
Phase 6  Component standardization    1.5d
Phase 7  Flow & routing               0.5d
Phase 8  QA / a11y / cleanup          1.5d
                                     ──────
                                     12.5d
```

> **Defining insight:** the project isn't missing a design system — it has one that was authored but
> never connected, and whose generic class names *collide* with the markup they were meant to replace.
> Phases 1–2 make that system resolvable and collision-free; Phases 3–4 migrate the pages onto it one
> at a time (never leaving a page half-styled); Phases 5–8 unify structure, flow, and quality — all
> without altering a single feature, data value, or interactive behaviour.
</content>
