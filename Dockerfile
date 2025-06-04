FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies needed for building
RUN apk add --no-cache libc6-compat

# Copy package files
COPY package*.json ./
COPY scripts ./scripts

# Install dependencies
RUN npm ci

# Copy the rest of the application
COPY . .

# Remove test files before building
RUN find ./src/pages -name "*.test.*" -delete 2>/dev/null || true && \
    find ./src/pages/__tests__ -type f -delete 2>/dev/null || true

# Build the application
RUN npm run build

# Production image
FROM node:18-alpine AS runner

# Install wget for health checks
RUN apk add --no-cache wget

WORKDIR /app

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3007
ENV NEXT_TELEMETRY_DISABLED=1

# Create a non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy necessary files from builder with proper ownership
COPY --from=builder --chown=nextjs:nodejs /app/package*.json ./
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/server.js ./server.js
COPY --from=builder --chown=nextjs:nodejs /app/next-i18next.config.js ./

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 3007

# Add healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=30s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3007/health || exit 1

# Start the application
CMD ["node", "server.js"]
