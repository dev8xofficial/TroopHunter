# FROM node:20.12.2

# WORKDIR /app
# COPY crm ./crm
# COPY packages ./packages
# COPY package.json .
# COPY lerna.json .
# RUN [ -d "node_modules" ] || npm run install:workspace

# WORKDIR /app/crm
# RUN [ -d "node_modules" ] || npm install

# # Use an official Node.js runtime as a parent image
# # FROM node:20.12.2

# # Set the working directory in the container
# # WORKDIR /app/crm
# # COPY ../crm .
# # RUN ls -la /app
# # RUN ls -la /app/crm

# # Copy package.json and package-lock.json to the working directory
# # COPY package*.json ./

# # Install project dependencies

# # Copy the rest of the application code to the working directory
# # COPY . .

# # Expose the port your application runs on (e.g., 3000)
# EXPOSE 5173

# # Define the command to run your application
# CMD ["npm", "run", "dev"]


# Use an official Node.js runtime as a parent image
FROM node:20.12.2 as development

# Install the PostgreSQL client tools
RUN apt-get update && \
    apt-get install -y postgresql-client iputils-ping curl

WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY microfrontend/troophunter/package.json ./microfrontend/troophunter/package.json
COPY microfrontend/troophunter-landing/package.json ./microfrontend/troophunter-landing/package.json
COPY packages ./packages
COPY package.json ./
COPY turbo.json ./

RUN [ -d "node_modules" ] || npm run install:workspace
# WORKDIR /app/crm
# RUN [ -d "node_modules" ] || npm install

WORKDIR /app
COPY microfrontend/troophunter ./microfrontend/troophunter
COPY microfrontend/troophunter-landing ./microfrontend/troophunter-landing
WORKDIR /app

EXPOSE 3000
CMD ["npm", "run", "dev"]

# ---- Second Stage ----
FROM development as builder
WORKDIR /app
RUN rm -rf node_modules
RUN npm ci --only=production
WORKDIR /app
RUN rm -rf node_modules
RUN npm ci --only=production
EXPOSE 3000
CMD ["npm", "run", "dev"]

# ---- Final Stage ----
FROM alpine:latest as production
# RUN apk --no-cache add nodejs ca-certificates bash  # Install bash
RUN apk --no-cache add nodejs npm ca-certificates bash postgresql-client
WORKDIR /app
COPY --from=builder /app ./
WORKDIR /app
CMD ["npm", "run", "dev"]

