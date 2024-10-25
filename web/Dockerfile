FROM node:20.12.0-alpine3.19

COPY . /app

WORKDIR /app/web

RUN npm ci && \
    npx prisma generate && \
    npm run build

CMD npm run start 