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