FROM node:alpine
WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma
COPY .env ./
COPY tsconfig.json ./
RUN npm install
COPY . .
RUN npx prisma generate && npm run build
EXPOSE ${PORT}
CMD [ "npm", "run", "start:prisma:dev" ]
