FROM node:20.12.0-alpine3.19

WORKDIR /app

COPY package* .
COPY ./prisma .

RUN cd web && npm install

RUN cd web && npx prisma generate

COPY . .

RUN cd web && npm run build

CMD ["npm", "run", "start"] 