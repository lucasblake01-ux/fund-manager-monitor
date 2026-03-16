#!/bin/bash

echo "==================================="
echo "Fund Manager Monitor - Dev Setup"
echo "==================================="

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if running from project root
if [ ! -f "package.json" ]; then
    echo "Error: Please run this script from the project root directory"
    exit 1
fi

echo -e "${YELLOW}Setting up backend...${NC}"

# Backend setup
cd backend

# Check for Python
if ! command -v python3 &> /dev/null; then
    echo "Error: Python 3 is required but not installed"
    exit 1
fi

# Create virtual environment
if [ ! -d "venv" ]; then
    echo "Creating Python virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment and install dependencies
echo "Installing Python dependencies..."
source venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt

# Copy environment file
if [ ! -f ".env" ]; then
    echo "Creating .env file..."
    cp .env.example .env
fi

echo -e "${GREEN}Backend setup complete!${NC}"

cd ..

echo -e "${YELLOW}Setting up frontend...${NC}"

# Frontend setup
cd frontend

# Check for Node.js
if ! command -v node &> /dev/null; then
    echo "Error: Node.js is required but not installed"
    exit 1
fi

# Install dependencies
echo "Installing Node.js dependencies..."
npm install

# Copy environment file
if [ ! -f ".env" ]; then
    echo "Creating .env file..."
    cp .env.example .env
fi

echo -e "${GREEN}Frontend setup complete!${NC}"

cd ..

# Root dependencies
echo -e "${YELLOW}Installing root dependencies...${NC}"
npm install

echo ""
echo -e "${GREEN}==================================="
echo "Setup Complete!"
echo "===================================${NC}"
echo ""
echo "To start the application:"
echo "  npm run dev"
echo ""
echo "This will start both:"
echo "  - Backend API:  http://localhost:8000"
echo "  - Frontend UI:  http://localhost:3000"
echo ""
echo "API Documentation: http://localhost:8000/docs"
echo ""
