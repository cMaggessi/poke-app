# Use an official Node.js runtime as a parent image
FROM node:latest



# Define build arguments for environment variables
ARG VITE_POKEMON_BASEURL

# Set environment variables during the build process
ENV VITE_POKEMON_BASEURL=$VITE_POKEMON_BASEURL

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) files
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of your app's source code from your host to your image filesystem.
COPY . .

# Build the application for production
RUN npm run build

# Install a simple http server to serve static content
RUN npm install -g http-server

# Set the directory to serve from
WORKDIR /app/dist

# Tell Docker about the port we'll run on.
EXPOSE 3000

# Define the command to run your app using the http-server
CMD ["http-server", "-p 3000"]
