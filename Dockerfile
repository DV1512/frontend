# Build stage
FROM oven/bun:latest AS builder

# Set the working directory
WORKDIR /usr/src/app

# Copy the entire project
COPY . .

# Install dependencies using Bun
RUN bun install

# Build the application
RUN bun run build

# Runtime stage using Bun
FROM oven/bun:latest

# Install a modern version of Node.js (v16)
RUN apt-get update && apt-get install -y curl \
    && curl -fsSL https://deb.nodesource.com/setup_16.x | bash - \
    && apt-get install -y nodejs

# Install 'serve' globally using Bun
RUN bun install -g serve

# Set the working directory
WORKDIR /usr/src/app

# Copy the build output from the builder stage
COPY --from=builder /usr/src/app/dist ./dist

# Expose the port
ENV PORT=5173
EXPOSE $PORT

# Serve the built application
CMD ["serve", "-p", "5173", "-s", "dist"]
