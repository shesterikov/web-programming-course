FROM node:24-alpine AS deps
WORKDIR /app
COPY package*.json ./

RUN npm ci --only=production --ignore-scripts
FROM node:24-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --ignore-scripts
COPY . .

RUN npm run build
FROM node:24-alpine AS runner
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./


ENV NODE_ENV=production \
    PORT=4200

# HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
#   CMD node -e "require('http').get('http://localhost:4200/health/live', r => process.exit(r.statusCode === 200 ? 0 : 1))"

EXPOSE 4200

# Graceful shutdown signal handling
CMD ["node", "dist/main"]