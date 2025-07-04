FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# --- Add Build-time Arguments ---
# These arguments are passed from docker-compose.yml
ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY
ARG NEXT_PUBLIC_ADSENSE_CLIENT_ID
ARG NEXT_PUBLIC_ADSENSE_PUBLISHER_ID
ARG NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
ARG NEXT_PUBLIC_SITE_URL
ARG NEXT_PUBLIC_RECAPTCHA_SITE_KEY

# --- Expose Arguments as Environment Variables for the Build ---
ENV NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=$NEXT_PUBLIC_SUPABASE_ANON_KEY
ENV NEXT_PUBLIC_ADSENSE_CLIENT_ID=$NEXT_PUBLIC_ADSENSE_CLIENT_ID
ENV NEXT_PUBLIC_ADSENSE_PUBLISHER_ID=$NEXT_PUBLIC_ADSENSE_PUBLISHER_ID
ENV NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=$NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_RECAPTCHA_SITE_KEY=$NEXT_PUBLIC_RECAPTCHA_SITE_KEY

# --- DEBUG: Print Build-Time Environment Variables ---
RUN echo "--- Verifying Build-Time Environment Variables ---" && \
    printenv | grep NEXT_PUBLIC_SUPABASE_URL && \
    printenv | grep NEXT_PUBLIC_SUPABASE_ANON_KEY && \
    echo "--- End Verification ---"

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

# Apply deployment fix for prerender-manifest.json after build
RUN echo "🔧 Applying post-build deployment fixes..." && \
    if [ ! -f ".next/prerender-manifest.json" ]; then \
        echo "📝 Creating missing prerender-manifest.json..."; \
        if [ -f ".next/prerender-manifest.js" ]; then \
            echo "Extracting from JS file..."; \
            PREVIEW_CONFIG=$(grep -o '{"preview":{"previewModeId":"[^"]*","previewModeSigningKey":"[^"]*","previewModeEncryptionKey":"[^"]*"}}' .next/prerender-manifest.js 2>/dev/null || echo '{"preview":{"previewModeId":"prod-preview-id","previewModeSigningKey":"prod-preview-signing-key","previewModeEncryptionKey":"prod-preview-encryption-key"}}'); \
            echo "{\"version\":3,\"routes\":{},\"dynamicRoutes\":{},\"notFoundRoutes\":[],\"preview\":$(echo $PREVIEW_CONFIG | sed 's/.*"preview":\([^}]*}\).*/\1/')}" > .next/prerender-manifest.json; \
        else \
            echo '{"version":3,"routes":{},"dynamicRoutes":{},"notFoundRoutes":[],"preview":{"previewModeId":"prod-preview-id","previewModeSigningKey":"prod-preview-signing-key","previewModeEncryptionKey":"prod-preview-encryption-key"}}' > .next/prerender-manifest.json; \
        fi; \
        echo "✅ Created prerender-manifest.json"; \
    fi && \
    echo "🔍 Verifying required files..." && \
    ls -la .next/prerender-manifest.json .next/build-manifest.json .next/routes-manifest.json && \
    echo "✅ BUILD_ID check skipped (optional in newer Next.js versions)" && \
    echo "🎉 All required files are present!"

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

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 3007

# Add healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=30s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3007/api/health-check || exit 1

# Start the application
CMD ["npm", "start"]
