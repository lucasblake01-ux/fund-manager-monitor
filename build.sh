#!/bin/bash
set -e

echo "Building Fund Manager Monitor..."

# Install backend dependencies
echo "Installing Python dependencies..."
cd backend
pip install -r requirements.txt
cd ..

# Install frontend dependencies and build
echo "Building frontend..."
cd frontend
npm install
npm run build
cd ..

# Copy frontend build to backend static folder
echo "Copying frontend build to backend..."
mkdir -p backend/static
cp -r frontend/dist/* backend/static/

echo "Build complete!"
