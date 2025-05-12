FROM node:23-alpine

WORKDIR /app

# Install curl for in container testing
RUN apk add --no-cache curl

# Add environment variable for JWT secret
ENV JWT_SECRET=supersecretkey

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD ["npm", "start"]
