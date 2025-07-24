#!/bin/bash

# Start development servers for Rails + React app
# Make sure PostgreSQL is running first

echo "Starting Rails + React Development Environment..."

# Check if PostgreSQL is running
if ! brew services list | grep -q "postgresql@16.*started"; then
    echo "Starting PostgreSQL..."
    brew services start postgresql@16
    sleep 2
fi

# Function to kill background processes on exit
cleanup() {
    echo "Shutting down servers..."
    kill $RAILS_PID $REACT_PID 2>/dev/null
    exit 0
}

trap cleanup EXIT

# Start Rails server in background
echo "Starting Rails API server on port 3001..."
cd backend && bundle exec rails server -p 3001 &
RAILS_PID=$!

# Give Rails time to start
sleep 3

# Start React development server in background
echo "Starting React development server on port 3000..."
cd ../frontend && npm start &
REACT_PID=$!

echo "Development servers started!"
echo "Rails API: http://localhost:3001"
echo "React App: http://localhost:3000"
echo "Press Ctrl+C to stop both servers"

# Wait for user input
wait