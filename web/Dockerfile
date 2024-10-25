FROM node:20.12.0-alpine3.19

WORKDIR /app

COPY package*.json ./

RUN cd web && npm install

COPY . .

RUN cd web && npx prisma generate

RUN cd web && npm run build

CMD ["npm", "run", "start"] 