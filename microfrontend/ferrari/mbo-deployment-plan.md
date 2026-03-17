# MBO Architecture Deployment Plan — Ferrari Microfrontend

## Overview

This document is the step-by-step plan to deploy the MBO (Multi-Brand / Internal Design System) architecture inside the Ferrari microfrontend. Phases are strictly ordered by dependency — each phase is a prerequisite for the next. The token system (Phase 1) can be merged immediately because it has zero runtime impact until Phase 2 wires up the provider. Phases 3 and 4 can partially overlap once the ThemeProvider is stable. Phase 5 should happen in parallel with Phase 4, writing stories as each component is built rather than after all three are done.

---

## Phase 1 — Token System

> Foundation only — no UI changes, no runtime impact.

### 1.1 Global tokens — `src/shared/styles/tokens/global/`

Create three files exporting raw design primitives with no semantic meaning:

- **`color.tokens.ts`** — raw named palette values (e.g. `gray50: '#F9FAFB'`, `blue600: '#2563EB'`).
- **`spacing.tokens.ts`** — spacing scale from `0` to `96` in steps.
- **`typography.tokens.ts`** — font families, sizes, weights, line heights as raw values.

### 1.2 Semantic tokens — `src/shared/styles/tokens/semantic/semantic.tokens.ts`

Map UI intent to the global raw tokens above. These keys are the stable contracts that never change across brands — only their resolved values do.

Example keys: `colorBgPrimary`, `colorTextMuted`, `borderRadiusPill`, `spacingPageGutter`.

### 1.3 Brand overrides — `src/shared/styles/themes/`

Create one file per brand, each mapping every semantic key to a raw global token value:

- **`ferrari.theme.ts`** — default, matches existing visual identity.
- **`admin.theme.ts`** — start as a clone of Ferrari; differentiate in Phase 4.
- **`client.theme.ts`** — same approach.

### 1.4 Tailwind integration — `tailwind.config.ts`

Extend `theme.extend.colors` with CSS variable references instead of hardcoded hex values. Every Tailwind color class becomes semantic at build time.

```ts
// tailwind.config.ts
colors: {
  primary: 'var(--color-bg-primary)',
  'text-muted': 'var(--color-text-muted)',
  // ...
}
```

### 1.5 CSS variables — `src/shared/styles/globals.css`

Declare the default token set under `:root` (pulling from `ferrari.theme.ts` values), then add override blocks per brand:

```css
:root { --color-bg-primary: #ffffff; /* ... */ }
.theme-admin { --color-bg-primary: #f4f6f8; /* ... */ }
.theme-client { --color-bg-primary: #fafbfc; /* ... */ }
```

---

## Phase 2 — Theme Config Module and ThemeProvider

### 2.1 Theme config module — `src/shared/config/theme/`

- **`tokens.ts`** — define strict TypeScript types: `SemanticColorKey`, `SemanticSpacingKey`, `BrandId` (union of `'ferrari' | 'admin' | 'client'`), and `BrandTokenMap`. Derive `SemanticColorKey` from `keyof typeof semanticTokens` so adding a token automatically exposes it via autocomplete.
- **`brands.ts`** — export a `BRAND_REGISTRY` object keyed by `BrandId`, each entry holding the CSS class name and a display label.
- **`index.ts`** — barrel export for the above.

### 2.2 ThemeProvider — `src/shared/providers/ThemeProvider.tsx`

A client component that:

- Accepts a `brandId: BrandId` prop.
- On mount, reads `BRAND_REGISTRY`, finds the correct CSS class, and applies it to the wrapper element.
- Provides a React context exposing `brandId` and a `useThemeTokens()` hook returning the typed token record for that brand.

### 2.3 Wire into root providers — `src/shared/providers/Providers.tsx`

Wrap children with `<ThemeProvider brandId="ferrari">` as the default. Existing routes keep working with zero visible change.

---

## Phase 3 — App Router Portal Wiring

### 3.1 Admin portal — `src/app/(portals)/admin/layout.tsx`

```tsx
import { ThemeProvider } from '@/shared/providers/ThemeProvider';

export default function AdminLayout({ children }) {
  return <ThemeProvider brandId="admin">{children}</ThemeProvider>;
}
```

### 3.2 Client portal — `src/app/(portals)/client/layout.tsx`

Same pattern with `brandId="client"`.

### 3.3 Agent portal — `src/app/(portals)/agent/layout.tsx`

Agent can share admin or client tokens for now, or get its own `BrandId` later.

### 3.4 Marketing routes — `src/app/(main)/layout.tsx`

No changes. Inherits the `ferrari` brand from the root `Providers.tsx` by default.

### 3.5 Verification checkpoint

Temporarily put a visible token difference (e.g. a background color) in `admin.theme.ts` and load the admin route. If the color changes, the full pipeline from Phase 1 through Phase 3 is confirmed working.

---

## Phase 4 — Component Architecture (Big Three)

### Headless layer philosophy

The headless layer does **not** contain custom-written component logic. Instead, `src/shared/ui/headless/` re-exports or thinly wraps **Radix UI Primitives** — the library already handles accessibility, keyboard navigation, focus management, ARIA attributes, open/close state, and polymorphic rendering. Your only job is to re-export Radix parts with tightened TypeScript types so the rest of the codebase never imports from Radix directly.

This means:
- You write zero interaction logic from scratch.
- Accessibility is handled by Radix, not by your team.
- Upgrading Radix automatically upgrades every component that uses it.
- Shell components stay purely visual — they only apply semantic tokens on top of the headless primitive.

**Radix packages for the Big Three:**

| Component | Radix package |
|-----------|--------------|
| Button | `@radix-ui/react-slot` (for `asChild` polymorphic rendering) |
| Input | `@radix-ui/react-label` + `@radix-ui/react-form` (optional) |
| Card | No Radix primitive needed — pure layout, uses Radix `Slot` for composition |

As the system grows beyond the Big Three, map each new component to its Radix primitive before writing any shell code. Examples: `Dialog` → `@radix-ui/react-dialog`, `Select` → `@radix-ui/react-select`, `Checkbox` → `@radix-ui/react-checkbox`, `Tooltip` → `@radix-ui/react-tooltip`.

---

### 4.1 Headless re-exports — `src/shared/ui/headless/`

**`button-headless.tsx`** — re-exports Radix `Slot` and defines the typed props contract:

```tsx
import { Slot } from '@radix-ui/react-slot';

export interface ButtonHeadlessProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

export const ButtonHeadless = React.forwardRef<
  HTMLButtonElement,
  ButtonHeadlessProps
>(({ asChild, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button';
  return <Comp ref={ref} {...props} />;
});
ButtonHeadless.displayName = 'ButtonHeadless';
```

No styling. No Tailwind classes. Only the props contract and the `asChild` delegation to Radix `Slot`.

**`input-headless.tsx`** — re-exports `@radix-ui/react-label` alongside a typed native input wrapper, binding label and input via a shared `id` prop. Radix `Label` handles the correct `for` association and click delegation automatically.

**`index.ts`** — barrel exporting all headless primitives. Feature code and shell components import from here, never directly from `@radix-ui/*`.

---

### 4.2 Button shell — `src/shared/ui/Button/Button.tsx`

Wraps `ButtonHeadless` and applies semantic token classes:

```tsx
import { ButtonHeadless, ButtonHeadlessProps } from '@/shared/ui/headless';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHeadlessProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:   'bg-[var(--color-btn-primary-bg)] text-[var(--color-btn-primary-text)]',
  secondary: 'bg-[var(--color-btn-secondary-bg)] text-[var(--color-btn-secondary-text)]',
  ghost:     'bg-transparent text-[var(--color-btn-ghost-text)]',
};
```

- Does **not** accept a raw `className` prop for visual overrides — only `variant` and `size`.
- All color values point to CSS variables, not raw hex. Switching brands changes the variables; the component code stays the same.
- Export from `src/shared/ui/Button/index.ts`.

### 4.3 Input shell — `src/shared/ui/Input/Input.tsx`

Wraps `InputHeadless` (which composes Radix `Label` + native input). Accepts `size` and `state` props (`'default' | 'error' | 'disabled'`). Maps state to semantic token classes for border and ring colors. No raw className override.

### 4.4 Card shell — `src/shared/ui/Card/Card.tsx`

No Radix primitive is needed for Card — it is a pure layout component. Uses Radix `Slot` for the compound slot/plug pattern:

```tsx
<Card>
  <Card.Header />
  <Card.Body />
  <Card.Footer />
</Card>
```

Visual treatment (shadow, border, padding, radius) comes entirely from semantic token CSS variables. No raw values inline.

---

## Phase 5 — Storybook and TypeScript Guardrails

### 5.1 Multi-brand stories

Update `src/Button.stories.tsx` and create `Input.stories.tsx`, `Card.stories.tsx`. Each story file renders components under all three brands using:

- A global `brand` Storybook parameter.
- A decorator that wraps the story in the correct `ThemeProvider`.
- A Storybook 8 toolbar item so reviewers can flip brands without reloading.

### 5.2 TypeScript guardrails

- `SemanticColorKey` must be derived from `keyof typeof semanticTokens` — no manually maintained union.
- Shell component props must only accept typed token keys, not raw strings or arbitrary `className`.
- Export `useThemeTokens` from `src/shared/config/theme/index.ts` as the official hook for feature code that needs token values at runtime (e.g. passing a color to a chart library).

### 5.3 Documentation — `DESIGN-SYSTEM.md` (Ferrari root)

A short reference document covering:

- What MBO is and the three token layers.
- How to add a new brand.
- How to add a new component.
- The one rule to never break: **no raw values in shell components**.

---

## Dependency Order and Risks

| Phase | Depends on | Can overlap with |
|-------|-----------|-----------------|
| 1 — Token system | Nothing | — |
| 2 — ThemeProvider | Phase 1 | — |
| 3 — Portal wiring | Phase 2 | — |
| 4 — Big Three components | Phase 3 | Phase 5 |
| 5 — Storybook + guardrails | Phase 4 (partial) | Phase 4 |

### Key risk: hardcoded Tailwind utilities

Before Phase 3 goes live, audit `src/shared/ui/` for any existing components using hardcoded Tailwind color utilities (e.g. `bg-blue-600`) instead of semantic CSS variable-backed classes. These will not respond to theme switching. Resolve before enabling the ThemeProvider in portal layouts.

### Future extraction path

Once the system is stable in Ferrari, the token files and `src/shared/ui/` primitives can be moved to `packages/components` in the monorepo. Other microfrontends will import the shared primitives and supply their own Layer C theme files. Turborepo treats the package as a core build dependency across the workspace.

---

*Follows Ferrari FSD conventions. All new code belongs in `src/shared` unless it is routing (src/app) or feature-specific (src/features).*

