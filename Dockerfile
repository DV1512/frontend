# Build stage
FROM oven/bun:latest AS builder

# Set the working directory
WORKDIR /usr/src/app

# Copy the entire project
COPY . .

# Install dependencies
RUN bun install

# Build the application
RUN bun run build

# Runtime stage using Bun
FROM oven/bun:latest

# Set the working directory
WORKDIR /usr/src/app

# Copy the build output
COPY --from=builder /usr/src/app/dist ./dist

# Expose the port
ENV PORT=4173
EXPOSE $PORT

# Serve the built application
CMD ["bun", "vite", "preview", "--host", "0.0.0.0", "--port", "$PORT"]
