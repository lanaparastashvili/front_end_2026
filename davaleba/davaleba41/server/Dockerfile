FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

RUN npx prisma generate
RUN npx prisma db push

COPY . .

EXPOSE 5000

CMD ["npm", "start"]
