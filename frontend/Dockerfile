FROM oven/bun:1 AS base
WORKDIR /usr/src/app

FROM base AS install
RUN mkdir -p /temp/dev
COPY package.json bun.lockb /temp/dev/
RUN cd /temp/dev && bun --bun install --frozen-lockfile

# RUN mkdir -p /temp/prod
# COPY package.json bun.lockb /temp/prod
# RUN cd /temp/prod && bun --bun install --frozen-lockfile --production

FROM base AS prerelease
COPY --from=install /temp/dev/node_modules node_modules
COPY . .

ARG UNTAPPD_ENCODED_ACCESS_KEY

ENV UNTAPPD_ENCODED_ACCESS_KEY=$UNTAPPD_ENCODED_ACCESS_KEY
ENV PUBLIC_API_BASE_URL=https://api.delaneys.dk
ENV DATABASE_URL=http://backend:8080
ENV NODE_ENV=production

RUN bun --bun run build

FROM base AS release
COPY --from=prerelease /usr/src/app/build .

ENTRYPOINT [ "bun", "./build/index.js" ]
