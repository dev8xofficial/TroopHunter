# ---- Base for dependencies ----
FROM node:20.12.2-alpine as base

RUN apk --no-cache add bash postgresql-client

WORKDIR /app

# Copy package files for better caching
COPY package.json ./
COPY package-lock.json ./
COPY .npmrc ./
COPY microfrontend/troophunter/package.json ./microfrontend/troophunter/package.json
COPY microfrontend/troophunter-landing/package.json ./microfrontend/troophunter-landing/package.json
COPY packages ./packages
COPY turbo.json ./

# Install all dependencies (including dev)
RUN npm install --workspaces --include-workspace-root

# Copy source code
COPY microfrontend/troophunter ./microfrontend/troophunter
COPY microfrontend/troophunter-landing ./microfrontend/troophunter-landing
COPY microfrontend/troophunter-landing/start.sh /app/start.sh
RUN chmod +x /app/start.sh

# ---- Local (dev) ----
FROM base as local

WORKDIR /app

CMD ["npm", "run", "dev"]

# ---- Builder (for all builds) ----
FROM base as builder

WORKDIR /app/microfrontend/troophunter

# Build step (TypeScript)
RUN npm run build

# ---- Production Stage ----
FROM node:20.12.2-alpine as production

WORKDIR /app/microfrontend/troophunter-landing

RUN apk --no-cache add bash postgresql-client

COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/microfrontend/troophunter /app/microfrontend/troophunter
COPY --from=builder /app/microfrontend/troophunter-landing /app/microfrontend/troophunter-landing
COPY --from=builder /app/packages /app/packages
COPY --from=builder /app/package.json /app/
COPY --from=builder /app/turbo.json /app/

# Set your production CMD here if needed
# CMD ["npm", "start"]