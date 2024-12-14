FROM node:20-alpine AS base

# Phase de construction
FROM base AS builder
RUN apk update && apk add --no-cache libc6-compat curl

WORKDIR /app

RUN npm i -g turbo

COPY . .

RUN turbo prune backend --docker

# Phase d'installation
FROM base AS installer
RUN apk update && apk add --no-cache libc6-compat curl
WORKDIR /app

RUN npm i -g pnpm turbo
RUN pnpm config set store-dir ~/.pnpm-store



COPY --from=builder /app/out/full/ .
COPY --from=builder /app/out/pnpm-lock.yaml .

RUN pnpm install --frozen-lockfile


RUN turbo run build --filter=backend


# Phase d'exécution
FROM base AS runner
WORKDIR /app

RUN npm i -g pnpm turbo
RUN pnpm config set store-dir ~/.pnpm-store


COPY --from=installer /app ./

COPY --from=installer /app/packages/shared/dist ./apps/backend/node_modules/@quentinpiot/shared/dist
COPY --from=installer /app/packages/shared/package.json ./apps/backend/node_modules/@quentinpiot/shared/package.json

EXPOSE 3000

CMD ["node", "apps/backend/dist/main.js"]
