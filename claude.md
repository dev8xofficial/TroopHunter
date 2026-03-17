## Monorepo Identity
- **Always** treat `troophunter` as a Turborepo monorepo hosting multiple microfrontends, microservices, shared packages, and CDNs for the TroopHunter platform.
- **Always** use **Node >= 18** and the root `npm@10.1.0` workspace configuration for all development and CI.
- **Always** treat `microfrontend/ferrari` as the primary Next.js FSD microfrontend covered by this CLAUDE file; **never** assume other microfrontends follow the same conventions without checking their own `claude.md`.

## Workspace Map
- **Always** manage workspaces via root `package.json` `workspaces`: `packages/*`, `microservices/*`, `microfrontend/*`, `cdns/*`.
- **Always** treat `microfrontend/ferrari` as: **Ferrari** – Next.js 16 App Router microfrontend with FSD architecture, Storybook, Tailwind, and shared UI via `@repo/components`.
- **Always** treat `microfrontend/dev8x`, `microfrontend/helloabdul`, `microfrontend/troophunter`, `microfrontend/mustang` as separate Next.js apps with their own ownership and rules.
- **Always** treat `microservices/auth`, `microservices/businesses`, `microservices/countries`, `microservices/queues`, `microservices/users`, `microservices/main` as backend services; **never** import frontend-only code (React, Next) into these.
- **Always** treat `packages/components`, `packages/messages`, `packages/utils`, `packages/validator`, `packages/middlewares`, `packages/services` as shared libraries; **never** bind them to a single app’s domain.
- **Always** treat `packages/eslint-config`, `packages/tsconfig-frontend`, `packages/tsconfig-backend` as shared configuration; **never** duplicate their logic into app-local configs.
- **Always** treat `cdns/*` as Cloudflare Worker / CDN edge projects; **never** import UI components directly into CDN code.

## Global Conventions
- **Always** use `npm` workspaces (not pnpm or yarn) and run repo-wide commands from the root scripts (e.g. `npm run dev`, `npm run build`).
- **Always** validate and load environment variables using the per-app mechanisms (e.g. `microfrontend/ferrari/src/shared/config/env.ts` with `zod`) and **never** access `process.env` ad hoc in feature code.
- **Always** respect TypeScript path aliases defined per project (e.g. in Ferrari: `@/app/*`, `@/processes/*`, `@/features/*`, `@/entities/*`, `@/shared/*`) and **never** use long relative `../../../` chains across layers.
- **Always** expose shared libraries and FSD slices through **barrel files (`index.ts`) only**; **never** deep-import internal files of another slice or package.
- **Never** cross-import directly between feature slices, entities, or processes across different apps or services; always route such dependencies through dedicated shared packages or APIs.
- **Always** keep Docker, Terraform, Ansible, and Kubernetes manifests app-agnostic and environment-specific; **never** hardcode app-local logic into infra definitions.

## Turbo Pipeline
- **Always** use `turbo` tasks defined in `turbo.json`: `build`, `dev`, `lint`, `test`.
- **Always** run **build** via `npm run build` (which runs `turbo build`) and rely on the task graph to build `microfrontend/ferrari` and other workspaces with `dependsOn: ["^build"]`.
- **Always** treat `build` outputs as `.next/**` (excluding `.next/cache/**`) and `dist/**` for caching; **never** place build artifacts outside these directories.
- **Always** use `npm run dev` (which runs `turbo dev`) to run multiple microfrontends concurrently and prefer the root convenience scripts (`start:microfrontend`, `start:microservices`) when working on many apps.
- **Always** run linting through `npm run lint` (which runs `turbo run lint`) so every workspace uses its own ESLint configuration.
- **Always** treat `test` as the canonical task for automated tests and coverage, with outputs cached under `coverage/**`.

## Shared Packages Contract
- **Always** treat `packages/components` as the design system / UI primitives; **never** couple it to a single microfrontend’s routing, data fetching, or local state.
- **Always** treat `packages/messages` as the central place for user-facing copy and message catalogs; **never** duplicate string constants across apps when they belong here.
- **Always** treat `packages/utils` as pure, side-effect-free helpers; **never** reference React, Next.js, or Node-only globals inside it.
- **Always** treat `packages/validator` as the home for reusable validation logic (e.g. Zod schemas, data validators); **never** redefine the same validation in app code.
- **Always** treat `packages/middlewares` as HTTP/microservice middleware only; **never** import frontend or browser-only APIs into it.
- **Always** treat `packages/services` as reusable business logic and integration clients; **never** embed presentation or UI concerns here.
- **Always** let `packages/eslint-config` define the base ESLint configuration; **never** significantly diverge in app-level `.eslintrc` without updating this package.
- **Always** let `packages/tsconfig-frontend` and `packages/tsconfig-backend` define shared TS baselines; **never** fork TS compiler options independently in each workspace unless strictly necessary.

## Code Style Enforcement
- **Always** use the root `.prettierrc` and `.prettierignore` for formatting rules; **never** add per-app Prettier configs that conflict with the root style.
- **Always** adopt ESLint with TypeScript (`@typescript-eslint/*`) and React/Next plugins in frontend workspaces (e.g. `microfrontend/ferrari`) by extending shared `packages/eslint-config`.
- **Always** fix lint errors before committing and ensure new code passes `npm run lint` and any workspace-local `lint` script.
- **Always** format code before commit using the configured Prettier version; **never** rely on IDE-specific formatting that diverges from Prettier.
- **Always** keep import order, naming conventions, and unused code rules consistent with the shared ESLint config; **never** disable lint rules inline unless strictly necessary and well-justified.




TroopHunter/
┣ .turbo/
┃ ┣ cache/
┃ ┣ cookies/
┃ ┗ daemon/
┣ .vscode/
┃ ┣ launch.json
┃ ┣ PythonImportHelper-v2-Completion.json
┃ ┣ settings.json
┃ ┗ tasks.json
┣ ansible/
┃ ┣ docs/
┃ ┣ inventories/
┃ ┣ playbooks/
┃ ┣ roles/
┃ ┣ .gitignore
┃ ┣ ansible.cfg
┃ ┗ Dockerfile
┣ cdns/
┃ ┣ dev8x/
┃ ┣ helloabdul/
┃ ┣ troophunter/
┃ ┗ HELP.md
┣ ci/
┃ ┣ .gitignore
┃ ┣ Dockerfile
┃ ┣ index.js
┃ ┗ package.json
┣ content/
┃ ┣ all-platforms/
┃ ┣ data/
┃ ┣ dev8x/
┃ ┣ master-dataset/
┃ ┣ menu/
┃ ┗ Profiles prompt/
┣ content-new/
┃ ┣ content-files/
┃ ┣ fiverGigsdata/
┃ ┣ fiverrGigsData/
┃ ┣ master-dataset/
┃ ┣ master-prompt/
┃ ┣ notebook-llm-data/
┃ ┣ profiles-format.json/
┃ ┗ profiles-prompts/
┣ kubernetes/
┃ ┣ cluster-resources/
┃ ┣ docs/
┃ ┣ istio/
┃ ┣ k8s/
┃ ┗ monitoring/
┣ microfrontend/
┃ ┣ dev8x/
┃ ┣ ferrari/
┃ ┣ helloabdul/
┃ ┗ troophunter/
┣ microservices/
┃ ┣ auth/
┃ ┣ businesses/
┃ ┣ countries/
┃ ┣ main/
┃ ┣ queues/
┃ ┗ users/
┣ packages/
┃ ┣ components/
┃ ┣ eslint-config/
┃ ┣ messages/
┃ ┣ middlewares/
┃ ┣ services/
┃ ┣ tsconfig-backend/
┃ ┣ tsconfig-frontend/
┃ ┣ utils/
┃ ┗ validator/
┣ scraper/
┃ ┣ driver/
┃ ┣ logs/
┃ ┣ src/
┃ ┣ tests/
┃ ┣ .gitignore
┃ ┣ config.py
┃ ┣ doc.txt
┃ ┣ main.py
┃ ┣ README.md
┃ ┗ requirements.txt
┣ terraform/
┃ ┣ docs/
┃ ┣ modules/
┃ ┣ .gitignore
┃ ┣ locals.tf
┃ ┣ main.tf
┃ ┣ outputs.tf
┃ ┣ provider.tf
┃ ┣ variables.tf
┃ ┗ versions.tf
┣ .dockerignore
┣ .gitignore
┣ .prettierrc
┣ claude.md
┣ docker-compose.ci.yml
┣ docker-compose.crm.yml
┣ docker-compose.dev.yml
┣ docker-compose.devops.yml
┣ docker-compose.loc.yml
┣ docker-compose.network.yml
┣ docker-compose.pgadmin.yml
┣ docker-compose.prod.yml
┣ docker-compose.stag.yml
┣ package-lock.json
┣ package.json
┗ turbo.json