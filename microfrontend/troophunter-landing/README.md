# Suggested File Structure

website/
┣ .next/ # Next.js build output
┣ components/ # Reusable UI components
┃ ┣ common/ # Common components used across the app
┃ ┃ ┣ Button.tsx
┃ ┃ ┣ Input.tsx
┃ ┃ ┗ Modal.tsx
┃ ┣ layout/ # Layout components for different page structures
┃ ┃ ┣ AuthLayout.tsx
┃ ┃ ┣ DefaultLayout.tsx
┃ ┃ ┗ SettingsLayout.tsx
┃ ┣ forms/ # Form components and related utilities
┃ ┃ ┗ LoginForm.tsx
┃ ┣ modals/ # Components for modals
┃ ┃ ┗ VideoModal.tsx
┃ ┣ header/ # Header components
┃ ┃ ┗ Header.tsx
┃ ┗ ... # Other component folders
┣ pages/ # Next.js pages
┃ ┣ api/ # API routes
┃ ┃ ┗ hello.ts
┃ ┣ auth/ # Authentication related pages
┃ ┃ ┣ signin.tsx
┃ ┃ ┣ signup.tsx
┃ ┃ ┗ verify.tsx
┃ ┣ settings/ # Settings related pages
┃ ┃ ┣ profile.tsx
┃ ┃ ┗ security.tsx
┃ ┣ leads/ # Leads related pages
┃ ┃ ┣ index.tsx
┃ ┃ ┗ detail.tsx
┃ ┣ index.tsx # Home page
┃ ┗ \_app.tsx # Custom App component
┣ public/ # Static assets like images and fonts
┃ ┣ images/
┃ ┗ favicon.ico
┣ styles/ # Global and component-specific styles
┃ ┣ globals.css
┃ ┗ tailwind.config.js
┣ utils/ # Utility functions and helpers
┃ ┣ api.ts
┃ ┗ formatDate.ts
┣ lib/ # Libraries and third-party integrations
┃ ┣ auth.ts
┃ ┗ analytics.ts
┣ hooks/ # Custom React hooks
┃ ┣ useAuth.ts
┃ ┗ useFetch.ts
┣ services/ # Business logic and API service layers
┃ ┣ authService.ts
┃ ┣ leadService.ts
┃ ┗ settingsService.ts
┣ store/ # State management (Redux, Zustand, etc.)
┃ ┣ actions/
┃ ┃ ┣ authActions.ts
┃ ┃ ┗ leadActions.ts
┃ ┣ reducers/
┃ ┃ ┣ authReducer.ts
┃ ┃ ┗ leadReducer.ts
┃ ┣ sagas/ # Side effects management (if using Redux Saga)
┃ ┃ ┣ authSaga.ts
┃ ┃ ┗ leadSaga.ts
┃ ┣ index.ts # Combine reducers and create store
┃ ┗ persistConfig.ts # Persistence configuration for state management
┣ types/ # TypeScript types and interfaces
┃ ┣ auth.d.ts
┃ ┣ lead.d.ts
┃ ┗ settings.d.ts
┣ .dockerignore
┣ .eslintrc.json # ESLint configuration
┣ .gitignore
┣ .prettierignore
┣ .prettierrc # Prettier configuration
┣ README.md
┣ next-env.d.ts # Next.js TypeScript definitions
┣ next.config.js # Next.js configuration
┣ package.json
┣ postcss.config.js
┣ tailwind.config.js # TailwindCSS configuration
┣ tsconfig.json # TypeScript configuration
┗ vite.config.ts # Vite configuration (if using Vite)
