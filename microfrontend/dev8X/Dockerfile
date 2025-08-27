# ---- Base for dependencies ----
FROM node:20.12.2-alpine as base

WORKDIR /app

# Copy package files for better caching
COPY package.json ./
COPY package-lock.json ./
COPY .npmrc ./
COPY microfrontend/dev8x/package.json ./microfrontend/dev8x/package.json
COPY packages ./packages
COPY turbo.json ./

# Install all dependencies (including dev)
RUN npm install --workspaces --include-workspace-root

# Copy source code
COPY microfrontend/dev8x ./microfrontend/dev8x

# ---- Local (dev) ----
FROM base as local

WORKDIR /app

# ---- Builder (for all builds) ----
FROM base as builder

RUN npm run build:packages

WORKDIR /app/microfrontend/dev8x

# Build step (TypeScript)
RUN npm run build

# ---- Production Stage ----
FROM node:20.12.2-alpine as production

WORKDIR /app/microfrontend/dev8x

COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/microfrontend/dev8x /app/microfrontend/dev8x
COPY --from=builder /app/packages /app/packages
COPY --from=builder /app/package.json /app/
COPY --from=builder /app/turbo.json /app/