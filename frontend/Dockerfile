FROM node:25-alpine AS base
WORKDIR /usr/src/app

FROM base AS builder

COPY package.json package-lock.json ./
RUN npm ci
COPY . .

RUN npm run build

FROM base AS release
COPY --from=builder /usr/src/app/build ./build
COPY --from=builder /usr/src/app/node_modules ./node_modules

ENV NODE_ENV=production

ENV BODY_SIZE_LIMIT=5M
ENTRYPOINT [ "node", "build" ]
