# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Architecture Overview

This is a **monorepo full-stack application** with Rails 8.0 API backend and React TypeScript frontend, featuring Rails 8.0's new authentication system.

### Key Components
- **Backend**: Rails 8.0.2 in API mode (port 3001) with Rails 8.0 authentication
- **Frontend**: React 18 + TypeScript (port 3000) 
- **Database**: PostgreSQL 16
- **Authentication**: Rails 8.0 built-in authentication with session-based auth
- **CI/CD**: GitHub Actions with comprehensive testing pipeline

### Authentication Architecture
The application uses **Rails 8.0's built-in authentication system**:
- `Authentication` concern provides session management (compatible with ActionController::API)
- Session-based authentication with secure cookies
- Controllers can use `allow_unauthenticated_access` to bypass auth requirements
- User model with `has_secure_password` and email normalization
- Password reset functionality via email tokens

## Development Commands

### Environment Setup
```bash
# Full environment setup (uses asdf for version management)
asdf install

# Backend setup
cd backend && bundle install
bundle exec rails db:create db:migrate

# Frontend setup  
cd frontend && npm install
```

### Development Servers
```bash
# Start both servers (recommended)
./start-dev.sh

# Or start individually:
cd backend && bundle exec rails server -p 3001
cd frontend && npm start
```

### Testing
```bash
# Run all tests
./run-tests.sh

# Rails tests
cd backend && bundle exec rails test
cd backend && bundle exec rails test test/controllers/api/v1/health_controller_test.rb

# React tests  
cd frontend && npm test
cd frontend && CI=true npm test -- --watchAll=false
```

### Code Quality
```bash
# Rails linting and security
cd backend && bundle exec rubocop
cd backend && bundle exec rubocop -A  # Auto-fix violations
cd backend && brakeman --no-pager     # Security scan

# React linting (using react-scripts ESLint config)
cd frontend && npx eslint "src/**/*.{ts,tsx,js,jsx}"
```

### Database Operations
```bash
cd backend
bundle exec rails db:migrate
bundle exec rails db:rollback
bundle exec rails db:reset
bundle exec rails console
```

## Project Structure

```
├── .github/workflows/ci.yml    # CI pipeline (Rails + React + linting)
├── start-dev.sh               # Development server startup script
├── run-tests.sh               # Test runner for both stacks
├── backend/                   # Rails 8.0 API
│   ├── app/controllers/concerns/authentication.rb  # Rails 8.0 auth system
│   ├── app/models/user.rb     # User model with has_secure_password
│   ├── app/models/session.rb  # Session tracking
│   └── app/controllers/api/v1/ # Versioned API controllers
└── frontend/                  # React + TypeScript
    └── src/App.tsx           # Main app with API integration
```

## API Architecture

### Routes Structure
- **Authentication**: `/session`, `/passwords/:token`
- **API**: `/api/v1/*` (versioned API endpoints)
- **Health**: `/api/v1/health` (unauthenticated)
- **Rails Health**: `/up` (for load balancers)

### Authentication Flow
1. All controllers inherit from `ApplicationController` which includes `Authentication` concern
2. Controllers requiring authentication automatically redirect to login
3. Use `allow_unauthenticated_access` for public endpoints
4. Sessions track user_agent and ip_address for security

## Development Notes

### Rails Specifics
- **API-only mode**: No views, uses `ActionController::API`
- **CORS configured**: Allows `localhost:3000` for development
- **Database**: Uses PostgreSQL with connection pooling
- **Authentication**: Rails 8.0 system with API compatibility fixes

### React Specifics  
- **API Integration**: Fetch-based communication with Rails API
- **Testing**: Uses React Testing Library with mocked fetch calls
- **TypeScript**: Strict mode enabled with comprehensive typing

### CI/CD Pipeline
The GitHub Actions workflow runs:
1. **Backend tests**: Rails tests with PostgreSQL service
2. **Frontend tests**: React tests with coverage
3. **Linting**: RuboCop (Rails) and ESLint (React) - **strict mode** (failures block merges)
4. **Security**: Brakeman security scanning
5. **Integration**: API endpoint verification

### Testing Patterns
- **Rails**: Uses `test/` directory with method-based test definitions
- **React**: Jest + React Testing Library with fetch mocking
- **Integration**: API calls tested against actual Rails endpoints

### Common Pitfalls
- Rails authentication concern needs `helper_method :authenticated? if respond_to?(:helper_method)` for API compatibility
- React tests should avoid multiple assertions in `waitFor` callbacks (ESLint rule)
- PostgreSQL must be running before starting Rails server
- Use `allow_unauthenticated_access` for API endpoints that don't require auth