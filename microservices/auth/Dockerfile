# ---- Base Node Image for Build ----
FROM node:20.12.2-alpine as builder

WORKDIR /app

# Copy package files for better caching
COPY package.json ./
COPY microservices/auth/package.json ./microservices/auth/package.json
COPY packages ./packages
COPY turbo.json ./

# Install ALL dependencies (including dev) for build
RUN npm install --workspaces --include-workspace-root

# Copy source code
COPY microservices/auth ./microservices/auth

WORKDIR /app/microservices/auth

# Build step (TypeScript)
RUN npm run build

# Remove devDependencies after build
RUN npm prune --omit=dev

# ---- Production Image ----
FROM node:20.12.2-alpine

WORKDIR /app/microservices/auth

COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/microservices/auth /app/microservices/auth
COPY --from=builder /app/packages /app/packages
COPY --from=builder /app/package.json /app/
COPY --from=builder /app/turbo.json /app/

RUN apk --no-cache add postgresql-client

# CMD ["npm", "start"]

