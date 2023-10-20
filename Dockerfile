# Current Node LTS Version
FROM node.18.17 as base

RUN npm i -g pnpm

FROM base as deeps

WORKDIR /usr/src/app
COPY package*.json  pnpm-lock.yaml .env tsconfig.json ./


#COPY
RUN pnpm i
RUN npx prisma generate
COPY . .
RUN pnpm build

FROM base as release

WORKDIR /usr/src/app

# Copy only the file we need
COPY , ,
COPY --from=deeps /usr/src/app/dist ./dist

# Intsall production dependencies
RUN pnpm install -p
RUN apt update && apt install -y make
ENV PORT 4004
EXPOSE 4004
CMD ["make", "prod-migrate"]