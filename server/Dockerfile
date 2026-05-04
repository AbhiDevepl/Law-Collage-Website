# Stage 1: Dependencies
FROM node:18-alpine AS builder
WORKDIR /app

# Install dependencies needed for node-gyp (if any native modules are used like bcrypt)
RUN apk add --no-cache python3 make g++

COPY package.json package-lock.json* ./
RUN npm ci --only=production

# Stage 2: Production Server
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 expressjs

# Copy dependencies
COPY --from=builder --chown=expressjs:nodejs /app/node_modules ./node_modules

# Copy source code
COPY --chown=expressjs:nodejs . .

USER expressjs

EXPOSE 5000
ENV PORT=5000

# Start Express server
CMD ["node", "server.js"]
