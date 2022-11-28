FROM node:lts-alpine AS base
WORKDIR /app
COPY package*.json .
COPY prisma/ ./prisma/
RUN npm install
COPY . .
RUN npm run clean
RUN npm run build


FROM node:lts-alpine AS production
WORKDIR /app
COPY --from=base ./app/build ./build
COPY --from=base ./app/prisma ./prisma
COPY --from=base ./app/package*.json ./
COPY --from=base ./app/tsconfig.json ./
COPY --from=base ./app/.env ./
RUN npm install --omit=dev
CMD [ "npm", "run", "start" ]
EXPOSE 3001
