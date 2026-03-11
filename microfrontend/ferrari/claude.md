## App Identity
- **Always** treat `microfrontend/ferrari` as a standalone **Next.js 16 App Router microfrontend** using **Feature-Sliced Design (FSD)** for TroopHunter marketing and experience pages.
- **Always** run Ferrari in **App Router mode** under `src/app`, with layouts, route groups, and intercepting routes instead of `pages/`.
- **Always** render core routes as **Client Components** by default (animations, FSD demo) and selectively introduce Server Components only when adding data-fetching-heavy features.
- **Always** treat authentication as delegated to upstream systems or host containers; **never** implement user auth flows directly inside Ferrari without a clear boundary.

## Directory Layout
- **Always** keep the top-level structure as:
  - `src/app` → routing, layouts, error boundaries, loading UI, intercepting modal routes.
  - `src/processes` → cross-feature workflows and orchestration (FSD layer, currently placeholder).
  - `src/features` → end-user capabilities (FSD layer, currently placeholder).
  - `src/entities` → domain models and reusable domain logic (FSD layer, currently placeholder).
  - `src/shared` → cross-cutting building blocks (UI kit, API client, store, config, animations, providers, styles).
- **Always** colocate new feature code under the correct FSD layer instead of `src/app` when it is not purely routing or layout concern.

## Feature Slice Boundaries
- **Always** follow this slice structure template when creating real features:
  - `src/features/<feature-name>/api` → feature-specific API calls built on top of `@/shared/api/client`.
  - `src/features/<feature-name>/model` → feature-specific domain model, state (Redux slice or hooks), and selectors.
  - `src/features/<feature-name>/ui` → feature-level presentational components with no cross-feature side effects.
  - `src/features/<feature-name>/lib` → feature-only utilities and mappers.
  - `src/features/<feature-name>/index.ts` → public API barrel exporting only what other layers may use.
- **Always** let `src/processes` orchestrate multiple features and entities; **never** let a single feature directly coordinate unrelated domains.
- **Always** keep `src/entities` focused on stable domain models and entity-level UI; **never** put feature-specific logic into entities.
- **Always** keep `src/shared` focused on truly cross-cutting utilities, infrastructure, and UI primitives; **never** leak feature-specific logic into shared.

## Routing Conventions
- **Always** define routes exclusively in `src/app` using Next 16 App Router semantics.
- **Always** use:
  - `(main)/[slug]/page.tsx` for primary marketing/detail routes under the main layout.
  - `@modal/(.)preview/[id]/page.tsx` and `@modal/default.tsx` for intercepting modal routes.
  - `api/health/route.ts` for health checks only; **never** put business APIs here.
- **Always** keep `layout.tsx`, `error.tsx`, `not-found.tsx`, and `loading.tsx` minimal and delegate complex UI to FSD layers.
- **Never** import feature or entity code directly into API route handlers; **always** treat app routes and API routes as separate concerns.

## Data Fetching Contract
- **Always** implement HTTP calls through `src/shared/api/client.ts` using the `api` helper and **Zod** schemas from `src/shared/api/schemas.ts`.
- **Always** validate all API responses with Zod before use; **never** consume raw `fetch` JSON results in components or features.
- **Always** treat `ApiError` as the canonical error type for HTTP failures and response validation failures; **never** throw plain strings from API helpers.
- **Always** keep data-fetching orchestration in the model layer of features or in processes; **never** issue API calls directly from dumb UI components.
- **Always** add new HTTP methods or patterns by extending `api` (get/post/put/patch/delete) rather than duplicating `fetch` logic.

## Environment Variables
- **Always** define environment validation in `src/shared/config/env.ts` using `zod` and the `envSchema` object.
- **Always** keep the supported runtime modes as `NODE_ENV ∈ {local, development, staging, production}` and `PORT` defaulting to `3007` for Ferrari.
- **Always** use `NEXT_PUBLIC_ASSET_HOST` for static asset host configuration and keep it optional with a safe default of `''`.
- **Always** import `env` from `@/shared/config/env` instead of reading `process.env` directly in application code.
- **Never** throw on invalid envs in production; **always** rely on the graceful degradation built into `envSchema` parsing and log errors only.

## State Management & Store
- **Always** manage global UI state via Redux Toolkit under `src/shared/store` with slices like `uiSlice`.
- **Always** add new global state via additional slices under `src/shared/store/slices` and wire them into `makeStore` in `src/shared/store/index.ts`.
- **Always** use typed hooks and `AppDispatch`/`RootState` types from the store when interacting with Redux; **never** use untyped `useDispatch` / `useSelector`.
- **Always** keep slice state serializable and UI-centric (e.g. sidebar, modal, theme); **never** store non-serializable values (DOM nodes, class instances) in Redux.

## Styling, Animations & UI
- **Always** use Tailwind CSS via `globals.css` and `tailwind.config.ts` for layout and styling, with CSS variables for Ferrari-specific colors.
- **Always** use `framer-motion` and `gsap` helpers from `src/shared/lib/animations` to implement complex motion; **never** sprinkle ad-hoc inline animation logic across components.
- **Always** add new reusable UI primitives under `src/shared/ui/<ComponentName>` with an `index.ts` barrel.
- **Always** keep these primitives presentation-only; **never** tie them to Redux, routing, or API calls.

## Storybook & DX
- **Always** run Storybook via the `storybook` and `build-storybook` scripts from `package.json`.
- **Always** colocate component stories alongside shared UI primitives (e.g. `src/Button.stories.tsx`), using Storybook 8 conventions.
- **Always** ensure Storybook stories consume components only through their public barrels; **never** import deep internal paths from features or entities.

## Environment Files & Deployment
- **Always** keep per-environment `.env.local`, `.env.development`, `.env.staging`, `.env.production` files at the Ferrari root, and load them with `dotenv-cli` via the npm scripts.
- **Always** use `next.config.ts` `assetPrefix` and rewrites to serve fonts, favicon, robots, and sitemap from `NEXT_PUBLIC_ASSET_HOST` in non-local environments.
- **Always** ensure Docker builds respect `NODE_ENV` and env files; **never** bake secrets directly into Docker images or source code.

# File Structure
ferrari/
┣ .storybook/
┃ ┣ main.ts
┃ ┗ preview.ts
┣ src/
┃ ┣ app/
┃ ┃ ┣ (main)/
┃ ┃ ┃ ┣ [slug]/
┃ ┃ ┃ ┃ ┗ page.tsx
┃ ┃ ┃ ┗ layout.tsx
┃ ┃ ┣ @modal/
┃ ┃ ┃ ┣ (.)preview/
┃ ┃ ┃ ┃ ┗ [id]/
┃ ┃ ┃ ┗ default.tsx
┃ ┃ ┣ api/
┃ ┃ ┃ ┗ health/
┃ ┃ ┃   ┗ route.ts
┃ ┃ ┣ error.tsx
┃ ┃ ┣ layout.tsx
┃ ┃ ┣ loading.tsx
┃ ┃ ┣ not-found.tsx
┃ ┃ ┗ page.tsx
┃ ┣ entities/
┃ ┃ ┗ README.md
┃ ┣ features/
┃ ┃ ┗ README.md
┃ ┣ processes/
┃ ┃ ┗ README.md
┃ ┣ shared/
┃ ┃ ┣ api/
┃ ┃ ┃ ┣ client.ts
┃ ┃ ┃ ┗ schemas.ts
┃ ┃ ┣ config/
┃ ┃ ┃ ┗ env.ts
┃ ┃ ┣ lib/
┃ ┃ ┃ ┣ animations/
┃ ┃ ┃ ┃ ┣ gsap.ts
┃ ┃ ┃ ┃ ┣ index.ts
┃ ┃ ┃ ┃ ┗ motion.ts
┃ ┃ ┃ ┣ hooks/
┃ ┃ ┃ ┃ ┣ index.ts
┃ ┃ ┃ ┃ ┗ useBreakpoint.ts
┃ ┃ ┃ ┗ utils/
┃ ┃ ┃   ┗ index.ts
┃ ┃ ┣ providers/
┃ ┃ ┃ ┣ AnimationProvider.tsx
┃ ┃ ┃ ┣ LenisProvider.tsx
┃ ┃ ┃ ┗ Providers.tsx
┃ ┃ ┣ store/
┃ ┃ ┃ ┣ slices/
┃ ┃ ┃ ┃ ┗ uiSlice.ts
┃ ┃ ┃ ┣ hooks.ts
┃ ┃ ┃ ┣ index.ts
┃ ┃ ┃ ┗ provider.tsx
┃ ┃ ┣ styles/
┃ ┃ ┃ ┗ globals.css
┃ ┃ ┗ ui/
┃ ┃   ┗ Button/
┃ ┃ ┃   ┣ Button.tsx
┃ ┃ ┃   ┗ index.ts
┃ ┗ Button.stories.tsx
┣ .env.development
┣ .env.local
┣ .env.production
┣ .env.staging
┣ .gitignore
┣ .prettierignore
┣ .prettierrc
┣ babel.config.js
┣ claude.md
┣ directory-files.md
┣ Dockerfile
┣ next-env.d.ts
┣ next.config.ts
┣ package.json
┣ postcss.config.mjs
┣ tailwind.config.ts
┗ tsconfig.json