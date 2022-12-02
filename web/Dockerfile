FROM node:lts-slim AS base
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
RUN npm run clean \
 && npm run build

FROM node:lts-alpine AS development
ENV NODE_ENV=development
WORKDIR /app
COPY --from=base ./app/src ./src
COPY --from=base ./app/package*.json ./
COPY --from=base ./app/tsconfig*.json ./
COPY --from=base ./app/vite.config.ts ./
COPY --from=base ./app/index.html ./
RUN npm install
CMD [ "npm", "run", "dev" ]
EXPOSE 3000 4000

FROM node:lts-slim AS production
WORKDIR /app
COPY --from=base ./app/dist ./dist
COPY --from=base ./app/package*.json ./
COPY --from=base ./app/*config*.{json,ts} ./
COPY --from=base ./app/index.html ./
RUN npm install
CMD [ "npm", "run", "preview"]
EXPOSE 4173
