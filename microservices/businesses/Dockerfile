# Use an official Node.js runtime as a parent image
FROM node:20.12.2 as development

# Install the PostgreSQL client tools
RUN apt-get update && \
    apt-get install -y postgresql-client iputils-ping curl

WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY microservices/businesses/package.json ./microservices/businesses/package.json
COPY packages ./packages
COPY package.json ./
COPY turbo.json ./

RUN [ -d "node_modules" ] || npm install
# WORKDIR /app/businesses
# RUN [ -d "node_modules" ] || npm install

WORKDIR /app
COPY microservices/businesses ./microservices/businesses
WORKDIR /app/microservices/businesses

EXPOSE 50009

# ---- Second Stage ----
FROM development as builder
WORKDIR /app
RUN rm -rf node_modules
RUN npm ci --only=production
WORKDIR /app/microservices/businesses
RUN rm -rf node_modules
RUN npm ci --only=production
EXPOSE 50009

# ---- Final Stage ----
FROM alpine:latest as production
# RUN apk --no-cache add nodejs ca-certificates bash  # Install bash
RUN apk --no-cache add nodejs npm ca-certificates bash postgresql-client
WORKDIR /app
COPY --from=builder /app ./
WORKDIR /app/microservices/businesses

