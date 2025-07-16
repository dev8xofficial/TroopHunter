# ---- Base Node Image for Build ----
FROM node:20.12.2-alpine as builder

RUN apk --no-cache add bash postgresql-client

WORKDIR /app

# Copy package files for better caching
COPY package.json ./
COPY package-lock.json ./
COPY .npmrc ./
COPY microservices/users/package.json ./microservices/users/package.json
COPY packages ./packages
COPY turbo.json ./

# Install ALL dependencies (including dev) for build
RUN npm install --workspaces --include-workspace-root

# Copy source code
COPY microservices/users ./microservices/users

WORKDIR /app/microservices/users

# Build step (TypeScript)
RUN npm run build

# Remove devDependencies after build
RUN npm prune --omit=dev

# ---- Production Image ----
FROM node:20.12.2-alpine

WORKDIR /app/microservices/users

COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/microservices/users /app/microservices/users
COPY --from=builder /app/packages /app/packages
COPY --from=builder /app/package.json /app/
COPY --from=builder /app/turbo.json /app/

RUN apk --no-cache add bash postgresql-client

# CMD ["npm", "start"]

