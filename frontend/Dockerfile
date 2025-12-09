# syntax=docker.io/docker/dockerfile:1

FROM node:18-alpine AS base

FROM base AS deps

RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json yarn.lock* ./
RUN yarn --frozen-lockfile

FROM base AS builder

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1

ARG OPENAI_API_KEY
ENV OPENAI_API_KEY=$OPENAI_API_KEY

ARG NODE_ENV
ENV NODE_ENV=$NODE_ENV

ARG AUTH_SECRET
ENV AUTH_SECRET=$AUTH_SECRET

ARG AUTH_TRUST_HOST
ENV AUTH_TRUST_HOST=$AUTH_TRUST_HOST

ARG AUTH_URL
ENV AUTH_URL=$AUTH_URL

ARG BASE_DIR
ENV BASE_DIR=$BASE_DIR

ARG PASSWD_FILE
ENV PASSWD_FILE=$PASSWD_FILE

ARG DOCKER_SOCKET
ENV DOCKER_SOCKET=$DOCKER_SOCKET

ARG CONTAINER_NAME
ENV CONTAINER_NAME=$CONTAINER_NAME

RUN yarn run build

FROM base AS runner

WORKDIR /app

RUN apk add --no-cache docker

ENV NODE_ENV=production

ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=builder /app/public ./public

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

ENV PORT=3000

ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]
