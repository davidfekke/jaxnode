FROM node:20-alpine AS deps
WORKDIR /src
COPY package.json package-lock.json ./
RUN npm ci

FROM node:20-alpine AS builder
WORKDIR /src
COPY --from=deps /src/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /src
ENV NODE_ENV=production
COPY --from=deps /src/node_modules ./node_modules
COPY --from=builder /src/.next ./.next
COPY package.json ./
COPY public ./public
COPY data ./data
EXPOSE 3000
CMD ["npm", "start"]