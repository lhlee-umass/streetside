FROM node:23-alpine

WORKDIR /app

# Install curl for in container testing
RUN apk add --no-cache curl

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD ["npm", "start"]
