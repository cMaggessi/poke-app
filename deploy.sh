#!/bin/bash

# Stop execution on any error
set -e

# Define the name of the frontend and backend docker images
FRONTEND_IMAGE_NAME="poke-frontend-app"
BACKEND_IMAGE_NAME="poke-backend-app"

# Define ports for frontend and backend
FRONTEND_PORT=3000
BACKEND_PORT=8080

# Echo function for logging
echo_green() {
    echo -e "\e[32m$1\e[0m"
}

# Build Frontend
echo_green "Building frontend..."
cd client
echo_green "Installing NPM packages for frontend..."
npm install
echo_green "Building frontend assets..."
npm run build
echo_green "Building Docker image for frontend..."
docker build -t $FRONTEND_IMAGE_NAME .
cd ..

# Build Backend
echo_green "Building backend..."
cd server
echo_green "Installing NPM packages for backend..."
npm install
echo_green "Building Docker image for backend..."
docker build -t $BACKEND_IMAGE_NAME .
cd ..

# Running Frontend Container
echo_green "Running frontend container..."
docker run -d -p $FRONTEND_PORT:3000 --name $FRONTEND_IMAGE_NAME $FRONTEND_IMAGE_NAME

# Running Backend Container
echo_green "Running backend container..."
docker run -d -p $BACKEND_PORT:8080 --name $BACKEND_IMAGE_NAME $BACKEND_IMAGE_NAME

echo_green "Deployment of containers complete. Frontend running on http://localhost:$FRONTEND_PORT, Backend running on http://localhost:$BACKEND_PORT"

read -p "Press enter to exit..."