FROM docker.io/library/node:22-alpine AS base
WORKDIR /src
ENV NEXT_TELEMETRY_DISABLED=1

FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci

FROM base AS builder
COPY --from=deps /src/node_modules ./node_modules
COPY . .
RUN npm run build

FROM base AS runner
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
COPY --from=builder --chown=node:node /src/.next/standalone ./
COPY --from=builder --chown=node:node /src/.next/static ./.next/static
COPY --from=builder --chown=node:node /src/public ./public
USER node
EXPOSE 3000
CMD ["node", "server.js"]
