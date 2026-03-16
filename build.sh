#!/bin/bash
set -e

echo "Building Fund Manager Monitor..."

# Install backend dependencies
echo "Installing Python dependencies..."
cd backend
pip install -r requirements.txt
cd ..

# Check if Node.js is available
if command -v node &> /dev/null; then
    echo "Node.js found, building frontend..."
    cd frontend
    npm install --legacy-peer-deps
    npm run build
    cd ..

    # Copy frontend build to backend static folder
    echo "Copying frontend build to backend..."
    mkdir -p backend/static
    cp -r frontend/dist/* backend/static/
    echo "Frontend build complete!"
else
    echo "Node.js not found, skipping frontend build..."
    echo "Backend API will be available at /api/v1"
fi

echo "Build complete!"
