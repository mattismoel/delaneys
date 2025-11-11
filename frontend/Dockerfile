FROM oven/bun:1 AS base
WORKDIR /usr/src/app

FROM base AS install
RUN mkdir -p /temp/prod
COPY package.json bun.lockb /temp/prod
RUN cd /temp/prod && bun --bun install --frozen-lockfile --production

FROM base AS prerelease
COPY --from=install /temp/dev/node_modules node_modules
COPY . .

RUN bunx --bun sv check --output human-verbose --fail-on-warnings

ENV NODE_ENV=production
RUN bun --bun run build

FROM base AS release
COPY --from=prerelease /usr/src/app/build .

ENTRYPOINT [ "bun", "./build/index.js" ]
