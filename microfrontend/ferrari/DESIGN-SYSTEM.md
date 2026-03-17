## Ferrari MBO Design System

This microfrontend uses **MBO (Multi-Brand / Internal Design System)** to render the same UI primitives across multiple brands/portals.

### The three token layers

- **Layer A — Global tokens (primitives)**  
  Raw values with no semantic meaning.  
  Location: `src/shared/styles/tokens/global/`

- **Layer B — Semantic tokens (contracts)**  
  Stable keys representing UI intent. These keys should not change across brands.  
  Location: `src/shared/styles/tokens/semantic/semantic.tokens.ts`

- **Layer C — Brand themes (overrides)**  
  One map per brand that resolves every semantic token to a concrete value.  
  Location: `src/shared/styles/themes/`

### Theme switching

- `ThemeProvider` applies a brand CSS class (`theme-ferrari`, `theme-admin`, `theme-client`) which controls semantic CSS variables in `src/shared/styles/globals.css`.
- For runtime token access in JS, use `useThemeTokens()` from `src/shared/config/theme`.

### Adding a new brand

- Add a new `BrandId` in `src/shared/config/theme/tokens.ts`.
- Add the brand to `BRAND_REGISTRY` in `src/shared/config/theme/brands.ts` (CSS class + label).
- Create a theme file in `src/shared/styles/themes/<brand>.theme.ts` that maps every semantic token key.
- Add a CSS variable override block in `src/shared/styles/globals.css` for `.theme-<brand>`.

### Adding a new component

- If the component has interaction/accessibility requirements, map it to a Radix primitive and create/re-export it from `src/shared/ui/headless/`.
- Implement the visual component in `src/shared/ui/<ComponentName>/` using **only semantic CSS variables**.
- Add Storybook stories under `src/*.stories.tsx` that can be viewed under all brands via the toolbar.

### Non-negotiable rule

**No raw values in shell components**: shared UI primitives (`src/shared/ui/*`) must not hardcode colors (hex/rgb), spacing, or typography. They must use semantic CSS variables (or Tailwind aliases backed by those variables).