# ---- Base for dependencies ----
FROM node:20.19.5-alpine as base

WORKDIR /app

# Copy package files for better caching
COPY package.json ./
COPY package-lock.json ./
COPY microfrontend/ferrari/package.json ./microfrontend/ferrari/package.json
COPY packages ./packages
COPY turbo.json ./

# Install all dependencies (including dev)
RUN npm install --workspaces --include-workspace-root

# Copy source code
COPY microfrontend/ferrari ./microfrontend/ferrari

# ---- Local (dev) ----
FROM base as local

WORKDIR /app

# ---- Builder (for all builds) ----
FROM base as builder

# ---- Production/Staging Stage ----
FROM node:20.19.5-alpine as production

WORKDIR /app/microfrontend/ferrari

COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/microfrontend/ferrari /app/microfrontend/ferrari
COPY --from=builder /app/packages /app/packages
COPY --from=builder /app/package.json /app/
COPY --from=builder /app/turbo.json /app/
