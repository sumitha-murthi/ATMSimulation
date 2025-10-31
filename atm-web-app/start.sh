#!/bin/bash

echo ""
echo "========================================"
echo "  Smart ATM Simulation - Quick Start"
echo "========================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "[ERROR] Node.js is not installed!"
    echo "Please download and install Node.js from https://nodejs.org/"
    exit 1
fi

echo "[1/4] Checking Node.js version..."
node --version
npm --version
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "[2/4] Installing dependencies... This may take a few minutes..."
    npm install
    if [ $? -ne 0 ]; then
        echo "[ERROR] Failed to install dependencies!"
        exit 1
    fi
else
    echo "[2/4] Dependencies already installed. Skipping..."
fi
echo ""

echo "[3/4] Starting backend server..."
# Start backend in background
npm run server &
BACKEND_PID=$!
sleep 3
echo ""

echo "[4/4] Starting frontend development server..."
# Start frontend in background
npm run dev &
FRONTEND_PID=$!
sleep 5
echo ""

echo "========================================"
echo "  Application Started Successfully!"
echo "========================================"
echo ""
echo "Backend:  http://localhost:5000"
echo "Frontend: http://localhost:3000"
echo ""
echo "Backend PID: $BACKEND_PID"
echo "Frontend PID: $FRONTEND_PID"
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""

# Wait for user interrupt
trap "kill $BACKEND_PID $FRONTEND_PID; exit" INT
wait
