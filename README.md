# Playing the Field - Full Stack Web App

A modern web application built with Ruby on Rails 8.0 backend and React frontend with TypeScript.

## Tech Stack

- **Backend**: Ruby 3.4.5 + Rails 8.0.2 (API mode)
- **Frontend**: React 18 + TypeScript
- **Database**: PostgreSQL 16
- **Version Manager**: asdf

## Prerequisites

Make sure you have the following installed:
- asdf version manager
- PostgreSQL 16
- Node.js 22.17.1
- Ruby 3.4.5

## Quick Start

1. **Install dependencies** (if using asdf):
   ```bash
   asdf install
   ```

2. **Set up the backend**:
   ```bash
   cd backend
   bundle install
   bundle exec rails db:create db:migrate
   ```

3. **Set up the frontend**:
   ```bash
   cd frontend
   npm install
   ```

4. **Start development servers**:
   ```bash
   ./start-dev.sh
   ```

   Or manually:
   ```bash
   # Terminal 1 - Rails API
   cd backend && bundle exec rails server -p 3001
   
   # Terminal 2 - React app
   cd frontend && npm start
   ```

## Development URLs

- **React App**: http://localhost:3000
- **Rails API**: http://localhost:3001
- **API Health Check**: http://localhost:3001/api/v1/health

## Project Structure

```
├── .tool-versions          # asdf version specifications
├── start-dev.sh           # Development server startup script
├── backend/               # Rails 8.0 API
│   ├── app/controllers/api/v1/  # API controllers
│   ├── config/            # Rails configuration
│   └── ...
└── frontend/              # React + TypeScript app
    ├── src/
    ├── public/
    └── ...
```

## Features

- ✅ Rails 8.0 API backend with CORS configured
- ✅ React frontend with TypeScript
- ✅ API health check endpoint
- ✅ Full stack communication between React and Rails
- ✅ asdf version management
- ✅ Development environment setup script

## API Endpoints

### Health Check
- **GET** `/api/v1/health`
  - Returns API status and version information

## Testing

### Run All Tests
```bash
./run-tests.sh
```

### Run Individual Test Suites

**Rails Tests:**
```bash
cd backend
bundle exec rails test test/controllers/api/v1/health_controller_test.rb
```

**React Tests:**
```bash
cd frontend
npm test
```

### Test Coverage

**Rails Controller Tests:**
- Health endpoint returns correct JSON structure
- Health endpoint returns 200 status
- Health endpoint includes proper timestamp
- Health endpoint validates content type

**React Component Tests:**
- Component renders main heading
- API health check section displays
- Loading state management
- Successful API call handling
- Error state handling
- Correct API endpoint usage
- Tech stack information display

## Development Notes

- Rails API runs on port 3001 to avoid conflicts with React (port 3000)
- CORS is configured to allow requests from http://localhost:3000
- PostgreSQL 16 is required and should be running before starting the Rails server
- Bundle gems are installed to `vendor/bundle` to avoid permission issues
- Tests use method definitions (`def test_method_name`) instead of `test "string"` syntax
- React tests mock fetch API calls for reliable testing