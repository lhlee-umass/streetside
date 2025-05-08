# Dockerfile for the messages service
FROM node:23-alpine

WORKDIR /app

RUN apk add --no-cache curl

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]
