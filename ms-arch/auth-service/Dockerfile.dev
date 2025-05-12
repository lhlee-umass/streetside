FROM node:23-alpine

# Make this the working directory in the image building
WORKDIR /app

# Install curl for in container testing
RUN apk add --no-cache curl

# Copy only the package.json and package-lock.json files first
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

CMD ["npm", "run", "dev"]
