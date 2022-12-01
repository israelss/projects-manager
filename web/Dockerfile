FROM node:lts-slim AS base
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
RUN npm run clean
RUN npm run build

FROM node:lts-slim AS production
WORKDIR /app
COPY --from=base ./app/dist ./dist
COPY --from=base ./app/package*.json ./
COPY --from=base ./app/*config*.{json,ts} ./
COPY --from=base ./app/index.html ./
RUN npm install
CMD [ "npm", "run", "preview"]
EXPOSE 4173
