#!/bin/bash

echo "Running Full Stack Tests..."

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Change to project root directory
cd ~/src/playing_the_field

# Run Rails tests
echo -e "${BLUE}🧪 Running Rails Controller Tests...${NC}"
cd backend
bundle exec rails test test/controllers/api/v1/health_controller_test.rb
RAILS_EXIT_CODE=$?

echo ""

# Run React tests
echo -e "${BLUE}🧪 Running React Component Tests...${NC}"
cd ../frontend
CI=true npm test -- --watchAll=false --verbose
REACT_EXIT_CODE=$?

cd ..

echo ""
echo "📊 Test Results Summary:"
echo "========================"

if [ $RAILS_EXIT_CODE -eq 0 ]; then
    echo -e "Rails Tests: ${GREEN}✅ PASSED${NC}"
else
    echo -e "Rails Tests: ${RED}❌ FAILED${NC}"
fi

if [ $REACT_EXIT_CODE -eq 0 ]; then
    echo -e "React Tests: ${GREEN}✅ PASSED${NC}"
else
    echo -e "React Tests: ${RED}❌ FAILED${NC}"
fi

# Exit with error if any test suite failed
if [ $RAILS_EXIT_CODE -ne 0 ] || [ $REACT_EXIT_CODE -ne 0 ]; then
    echo ""
    echo -e "${RED}Some tests failed. Please check the output above.${NC}"
    exit 1
else
    echo ""
    echo -e "${GREEN}🎉 All tests passed!${NC}"
    exit 0
fi