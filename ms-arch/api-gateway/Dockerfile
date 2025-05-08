# Use lightweight Node.js image
FROM node:23-alpine

# Set working directory inside the container
WORKDIR /app

# Install autocannon globally
RUN npm install -g autocannon

# Copy package files and install dependencies
COPY package*.json ./

RUN npm install

# Copy source code
COPY . .

# Run
RUN npm run build

CMD ["npm", "start"]