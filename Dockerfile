# Use Node.js as base image
FROM node:18-alpine AS base

# Set working directory
WORKDIR /app

# Install dependencies with legacy-peer-deps flag
FROM base AS deps
COPY package.json package-lock.json* ./
# Using the legacy-peer-deps flag to handle React 19 dependency issues
RUN npm install --legacy-peer-deps

# Rebuild the source code only when needed
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Build with the same flag to ensure consistency
RUN npm run build --legacy-peer-deps || npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

# Create a non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
