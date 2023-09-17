# Use an official Node.js runtime as a parent image
FROM node:20.6.1 as development

# Install the PostgreSQL client tools
RUN apt-get update && \
    apt-get install -y postgresql-client iputils-ping curl

WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY backend/package.json ./backend/package.json
COPY packages ./packages
COPY package.json ./
COPY lerna.json ./

RUN [ -d "node_modules" ] || npm run install:workspace
WORKDIR /app/backend
RUN [ -d "node_modules" ] || npm install

WORKDIR /app
COPY backend ./backend
WORKDIR /app/backend

EXPOSE 50003

# ---- Second Stage ----
FROM development as builder
WORKDIR /app
RUN rm -rf node_modules
RUN npm ci --only=production
WORKDIR /app/backend
RUN rm -rf node_modules
RUN npm ci --only=production
EXPOSE 50003

# ---- Final Stage ----
FROM alpine:latest as production
# RUN apk --no-cache add nodejs ca-certificates bash  # Install bash
RUN apk --no-cache add nodejs npm ca-certificates bash postgresql-client
WORKDIR /app
COPY --from=builder /app ./
WORKDIR /app/backend

