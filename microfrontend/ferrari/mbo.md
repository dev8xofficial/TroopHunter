# MBO Architecture Plan: Ferrari Microfrontend

**High-Level Understanding:** This document outlines the plan to implement the MBO (Multi-Brand / Internal Design System) model inside the Ferrari microfrontend. It defines where the system will live, how it will be structured, and how it scales to multiple brands/portals—without writing the actual code yet.

Ferrari is currently a Next.js 16 App Router app organized with FSD (Feature-Sliced Design) layers, using Tailwind, basic shared UI components, and Storybook. This is a perfect foundation for MBO, which will primarily live in `src/shared`, with light integration in `src/app` and Storybook.

---

## 1. Conceptual Mapping: MBO → Ferrari FSD

- **Core Logic / Headless primitives:** Maps to `src/shared/ui` (and eventually monorepo packages). These are unstyled or minimally styled wrappers around tools like Radix.
- **Design Tokens (3-tier system):** Maps to `src/shared/styles` and `tailwind.config.ts`. Includes Global (Layer A), Semantic (Layer B), and Brand overrides (Layer C).
- **Theme / Brand orchestration:** Maps to `src/shared/config/theme/*` for token definitions and `src/shared/providers/ThemeProvider.tsx` for runtime switching.
- **Product / Portal layer (per-project branding):** Maps to `src/app` route groups and layouts for each portal, plus optional per-portal slices under `src/features`.
- **AI & DX Guardrails:** Implemented via TypeScript types in `src/shared/config/theme` and strict component props in `src/shared/ui/` that only accept semantic tokens.
- **Monorepo-wide sharing (Future):** Eventually extracts into `packages/components` outside of Ferrari.

---

## 2. Where to Implement Each MBO Layer

### 2.1. Multi-Brand Tokens: A / B / C layers

**a) Layer A – Global (raw) tokens**

- **Folder:** `src/shared/styles/tokens/global/`
- **Files:** `color.tokens.ts`, `spacing.tokens.ts`, `typography.tokens.ts`
- **Role:** Define brand-agnostic raw values (e.g., a palette of grays, blues, radii, spacing scales). These are purely design primitives without semantic meaning.

**b) Layer B – Semantic tokens**

- **Folder:** `src/shared/styles/tokens/semantic/`
- **Files:** `semantic.tokens.ts`
- **Role:** Map UI intent to abstract tokens (e.g., `color-bg-primary`, `border-radius-pill`). These stable contracts never change across brands.

**c) Layer C – Brand-specific overrides**

- **Folder:** `src/shared/styles/themes/`
- **Files:** `ferrari.theme.ts` (default), `admin.theme.ts`, `client.theme.ts`
- **Role:** Map semantic tokens (Layer B) to global raw tokens (Layer A) for each specific brand.

**d) Tailwind + CSS variables integration**

- **Tailwind Config:** Wire the token system into `tailwind.config.ts` (`theme.extend`) so classes point to semantic tokens, not raw hex codes.
- **Globals CSS:** Update `src/shared/styles/globals.css` to define CSS variables under `:root` for the default brand, and `.theme-admin`, `.theme-client`, etc., for overrides.

### 2.2. Theme Configuration & Providers

**a) Add a theme config module**

- **Folder:** `src/shared/config/theme/`
- **Files:** `tokens.ts` (typed structures), `brands.ts` (brand registry), `index.ts` (barrel exports).
- **Role:** Central hub for declaring available brands, semantic token types, and manifest converters.

**b) Add or extend a ThemeProvider**

- **Folder:** `src/shared/providers/`
- **File:** `ThemeProvider.tsx`
- **Role:** Accepts a brand/portal prop, applies the correct CSS variable scope on mount, and provides a React context with the `brandId` and semantic tokens.

**c) Integrate with global Providers**

- **File:** `src/shared/providers/Providers.tsx`
- **Role:** Wrap existing providers (Redux, etc.) with the `ThemeProvider` to ensure route-level brand decisions cascade down.

### 2.3. App Router & Multi-Portal Structure

**a) Introduce route groups for portals**

- **Folders:** `src/app/(portals)/admin/`, `client/`, `agent/`
- **Role:** Each portal gets its own layout that chooses a `brandId` and wraps children with the appropriate theme providers.

**b) Connect brand to portal at layout level**

- **Files:** `src/app/(portals)/*/layout.tsx`
- **Role:** Set the brand manifest used by the `ThemeProvider` and pass config to FSD processes/features if required.

**c) Keep existing marketing routes**

- **Strategy:** Leave `src/app/(main)` as is, conceptually treating it as the "Ferrari marketing brand" using the default theme.

### 2.4. Component Architecture: Headless + Shells + Slots

**a) Define "headless" primitives**

- **Folder:** `src/shared/ui/headless/`
- **Files:** `button-headless.tsx`, `input-headless.tsx`
- **Role:** Handle logic, accessibility, and interactions (conceptually wrapping Radix UI).

**b) Define brand-aware "shell" components**

- **Folder:** `src/shared/ui/`
- **Files:** `Button/`, `Input/`, `Card/`
- **Role:** Combine headless primitives with semantic token props. Block arbitrary Tailwind classes in favor of semantic variants.

**c) Support "slot & plug" composition**

- **Strategy:** For complex components (like Cards), expose slots as props/children. The shell manages layout, but visuals strictly come from tokens.

**d) Define the "Big Three"**

- **Strategy:** Refactor the existing `Button`, and create new `Input` and `Card` components to prove the architecture across at least two themes.

### 2.5. Storybook & Visual Regression

**a) Multi-theme stories**

- **Files:** `src/Button.stories.tsx` (and new stories)
- **Role:** Render components under multiple themes (Ferrari, admin, client) using Storybook globals or decorators to switch brands.

**b) Future: Visual regression**

- **Strategy:** Tooling like Chromatic or Percy will eventually plug into this pipeline to test snapshot changes across all brands.

### 2.6. AI-First / TypeScript Guardrails

**a) Strong typing for tokens**

- **Strategy:** Define strict types (`SemanticColorKey`, `BrandId`) in `tokens.ts`. Component props must accept these typed tokens, not raw strings.

**b) Restrict arbitrary styling**

- **Strategy:** Discourage exposing arbitrary `className` or `style` props on shared primitives.

**c) ThemeProvider context**

- **Strategy:** Expose a `useThemeTokens` hook that returns only allowed tokens to enforce correct autocomplete for AI and developers.

---

## 3. How This Fits Ferrari’s Overall Architecture

- **FSD Alignment:** `src/shared` becomes the true home for multi-brand design tokens and UI primitives. `src/features`, `entities`, and `processes` remain purely functional and domain-focused.
- **Microfrontend Future:** Once stable, UI primitives and tokens can move to a shared package (e.g., `packages/components`). Other microfrontends will import these and supply their own Layer C themes.
- **Monorepo Integration:** Turborepo will treat the design system as a core asset. Ferrari will eventually transition from the origin of the system to a consumer of `@repo/components`.

---

## 4. Step-by-Step Implementation Roadmap

1.  **Define the token system folders:** Create `tokens/global/`, `tokens/semantic/`, and `themes/` under `src/shared/styles`. Decide on naming conventions.
2.  **Connect tokens to Tailwind & CSS:** Update `tailwind.config.ts` to use semantic token names. Update `globals.css` to declare CSS variables for default and override themes.
3.  **Introduce theme config and ThemeProvider:** Add token types and brand registries to `src/shared/config/theme`. Create the `ThemeProvider` and integrate it into `Providers.tsx`.
4.  **Wire themes into the App Router:** Create `(portals)` route groups in `src/app`. Assign specific brands in their respective layouts while keeping `(main)` as the default Ferrari brand.
5.  **Define the first components (Big Three):** Create headless wrappers for Button, Input, and Card. Build their styled shells using strict semantic token props.
6.  **Storybook validation:** Configure Storybook to switch brands and build stories for the Big Three components across multiple themes to verify visual separation.
7.  **Hardening for AI & juniors:** Lock down TypeScript definitions. Restrict generic styling props. Draft a `claude.md` or `DESIGN-SYSTEM.md` document outlining usage rules.
8.  **Extraction (Future):** Move tokens, config, and shared UI into a monorepo package like `packages/components` for cross-app consumption.

---

## 5. Summary

- **Where to implement:** Primarily in `src/shared` (tokens, themes, UI, providers) with light touches in `src/app` routing and Storybook.
- **What to add:** Token folders, theme configuration, a ThemeProvider, headless/shell components, and portal-specific route layouts.
- **How it fits:** Enhances FSD by isolating visual primitives, setting up a clear path for future extraction into a shared microfrontend asset.
