FROM node:25-alpine AS base
WORKDIR /usr/src/app

FROM base AS builder

COPY pacakge*.json ./
RUN npm ci
COPY . .
RUN npm run build
RUN npm prune --production

FROM base AS release
COPY --from=builder /usr/src/app/build ./build
COPY --from=builder /usr/src/app/node_modules .

ARG UNTAPPD_ENCODED_ACCESS_KEY
ENV UNTAPPD_ENCODED_ACCESS_KEY=$UNTAPPD_ENCODED_ACCESS_KEY

ENV PUBLIC_API_BASE_URL=https://api.delaneys.dk
ENV DATABASE_URL=http://backend:8080
ENV UNTAPPD_LOCATION_ID=44148
ENV UNTAPPD_MENU_ID=198848

ENV NODE_ENV=production

ENTRYPOINT [ "node", "build" ]
