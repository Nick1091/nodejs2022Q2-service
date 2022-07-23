FROM node:lts-alpine
WORKDIR /usr/src/app
COPY package*.json ./
COPY prisma ./prisma/

RUN apk update update
RUN apk add openssl

RUN apk add --no-cache make gcc g++ python3 && \
npm install && \
npm rebuild bcrypt --build-from-source && \
apk del make gcc g++ python3

COPY . .

RUN npm run build

EXPOSE ${PORT}

CMD [ "npm", "run", "start:dev" ]
