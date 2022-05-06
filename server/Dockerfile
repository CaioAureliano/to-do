# syntax=docker/dockerfile:1

FROM node:16.14.2 AS base

WORKDIR /server

# builder
FROM base AS builder

COPY package*.json babel.config.json ./

RUN npm install

COPY ./src ./src

RUN npm run build

RUN npm prune --production

# release
FROM base as release

COPY --from=builder /server/node_modules ./node_modules
COPY --from=builder /server/package*.json .
COPY --from=builder /server/build ./build

CMD ["npm", "start"]