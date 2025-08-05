# ---- Local Image ----
FROM node:20.12.2-alpine as base

RUN apk --no-cache add bash postgresql-client

WORKDIR /app

# Copy package files for better caching
COPY package.json ./
COPY package-lock.json ./
COPY .npmrc ./
COPY microservices/queues/package.json ./microservices/queues/package.json
COPY packages ./packages
COPY turbo.json ./

# Install ALL dependencies (including dev) for build
RUN npm install --workspaces --include-workspace-root

# Copy source code
COPY microservices/queues ./microservices/queues

# ---- Local Development Stage ----
FROM base as local

WORKDIR /app/microservices/queues

# ---- Builder Stage (for building/staging) ----
FROM base as builder

WORKDIR /app/microservices/queues

# Build step (TypeScript)
RUN npm run build

# ---- Production Stage ----
FROM node:20.12.2-alpine as production

WORKDIR /app/microservices/queues

RUN apk --no-cache add bash postgresql-client

COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/microservices/queues /app/microservices/queues
COPY --from=builder /app/packages /app/packages
COPY --from=builder /app/package.json /app/
COPY --from=builder /app/turbo.json /app/

# Remove devDependencies
RUN npm prune --omit=dev

# Default command for production
# CMD ["npm", "start"]

