# Use the official Node.js image as the base image
FROM node:18-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application source code to the container
COPY . .

# Build the application
RUN npm run build

# Expose the port your Nest.js application is listening on
EXPOSE 8080

# Command to start your Nest.js application
CMD ["node", "dist/main.js"]