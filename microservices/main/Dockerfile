# ---- Local Image ----
FROM node:20.19.5-alpine as base

RUN apk --no-cache add bash postgresql-client

WORKDIR /app

# Copy package files for better caching
COPY package.json ./
COPY package-lock.json ./
COPY .npmrc ./
# Commented out 2026-07-31. The .npmrc pointed at a private npm registry (Verdaccio) whose
# VM was retired because it performed badly — so the file no longer exists anywhere in the
# repo and this line failed every build with:
#     failed to compute cache key: "/.npmrc": not found
# Packages come straight from npmjs now, so nothing needs it. Restore only if a private
# registry comes back, and commit the .npmrc alongside it.
COPY microservices/main/package.json ./microservices/main/package.json
COPY packages ./packages
COPY turbo.json ./

# Install ALL dependencies (including dev) for build
RUN npm install --workspaces --include-workspace-root

# Copy source code
COPY microservices/main ./microservices/main

# ---- Local (dev) ----
FROM base as local

WORKDIR /app

# ---- Builder (for all builds) ----
FROM base as builder

RUN npm run build:packages

WORKDIR /app/microservices/main

# Build step (TypeScript)
RUN npm run build

# ---- Production Stage ----
FROM node:20.19.5-alpine as production

WORKDIR /app/microservices/main

RUN apk --no-cache add bash postgresql-client

COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/microservices/main /app/microservices/main
COPY --from=builder /app/packages /app/packages
COPY --from=builder /app/package.json /app/
COPY --from=builder /app/turbo.json /app/

# Remove devDependencies
RUN npm prune --omit=dev