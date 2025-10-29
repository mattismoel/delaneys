FROM oven/bun:1 AS base
WORKDIR /usr/src/app

# ====| INSTALL STAGE |========================================================
# Installs all required packages for building the static website.
# =============================================================================
FROM base AS install
RUN mkdir -p /temp/dev

COPY package.json bun.lockb /temp/dev/
RUN cd /temp/dev && bun install --frozen-lockfile


# ====| BUILD STAGE |==========================================================
# Copies all the resulting node_modules directory from the install stage and
# builds the static website in 'dist'.
# =============================================================================
FROM base AS build
COPY --from=install /temp/dev/node_modules node_modules
COPY . .

ENV VITE_POCKETBASE_URL https://api.prismatheband.com
ENV NODE_ENV=production
RUN bun run build


# ====| RELEASE STAGE |========================================================
# Copies all static build files from the pre-release stage, and serves them.
# =============================================================================
FROM nginx:alpine AS release
COPY --from=build /usr/src/app/dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/nginx.conf
CMD [ "nginx", "-g", "daemon off;" ]
