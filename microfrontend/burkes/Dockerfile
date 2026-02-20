# ---- Base for dependencies ----
FROM node:20.19.5-alpine as base

WORKDIR /app

# Copy package files for better caching
COPY package.json ./
COPY package-lock.json ./
# COPY .npmrc ./
COPY microfrontend/burkes/package.json ./microfrontend/burkes/package.json
# COPY packages ./packages
COPY turbo.json ./

# Install all dependencies (including dev)
RUN npm install --workspaces --include-workspace-root

# Copy source code
COPY microfrontend/burkes ./microfrontend/burkes

# ---- Local (dev) ----
FROM base as local

WORKDIR /app

# ---- Builder (for all builds) ----
FROM base as builder

# RUN npm run build:packages

# WORKDIR /app/microfrontend/burkes

# # Build step (TypeScript)
# ARG NODE_ENV
# RUN sh -c "npm run build:${NODE_ENV}"

# ---- Production/Staging Stage ----
FROM node:20.19.5-alpine as production

WORKDIR /app/microfrontend/burkes

COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/microfrontend/burkes /app/microfrontend/burkes
# COPY --from=builder /app/packages /app/packages
COPY --from=builder /app/package.json /app/
COPY --from=builder /app/turbo.json /app/