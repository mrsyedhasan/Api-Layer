# Api-Layer

API Testing Framework with Axios and Jest - Reusable templates for all HTTP methods (GET, POST, PUT, PATCH, DELETE). Supports multiple APIs including Fake Store API and DummyJSON.

[![API Tests](https://github.com/mrsyedhasan/Api-Layer/workflows/API%20Tests/badge.svg)](https://github.com/mrsyedhasan/Api-Layer/actions)

## Setup

```bash
npm install
```

## Run Tests

```bash
# Run all tests (uses qa.config.js by default)
npm test

# Run specific test suites
npm run test:dummy           # DummyJSON tests only (CI/CD friendly)
npm run test:fakestore       # Fake Store API tests only (local only)

# Run tests with specific config file
npm run test:qa              # Uses qa.config.js
CONFIG_FILE=staging.config npm test   # Uses staging.config.js (if you create it)

# Run tests and open HTML report
npm run test:report

# Watch mode (auto-run on file changes)
npm run test:watch

# Coverage report
npm run test:coverage
```

## Test Reports

Every test run automatically generates an **HTML report** at `test-results/test-report.html`.

**Features:**
- 📊 Visual test summary with pass/fail stats
- ⏱️ Execution time for each test
- 📝 Console logs captured
- 🎨 Dark theme UI
- 📱 Mobile responsive

**Open the report:**
```bash
open test-results/test-report.html
# or
npm run test:report  # Runs tests + opens report
```

## Quick Start

```javascript
const ApiHelper = require('./src/helpers/apiHelper');
const { config } = require('./config');

describe('My API Tests', () => {
  let api;

  beforeAll(() => {
    api = new ApiHelper(config);
  });

  test('GET request', async () => {
    const response = await api.get(config.endpoints.products);
    expect(response.status).toBe(200);
  });

  test('POST request', async () => {
    const response = await api.post(config.endpoints.products, {
      title: 'New Product',
      price: 99.99,
      category: 'electronics'
    });
    expect(response.status).toBe(200);
  });
});
```

**Files:**
- `tests/fakestore.test.js` - Main test suite (runs with `npm test`)
- `tests/examples/simple.example.js` - Quick reference examples (not executed)
- `tests/templates/api.template.js` - Full template to copy for new tests (not executed)

## Features

- ✅ Reusable `ApiHelper` class for all HTTP methods (GET, POST, PUT, PATCH, DELETE)
- ✅ Centralized config for API endpoints and settings
- ✅ Consistent response format with status, data, headers, and error handling
- ✅ Ready-to-use templates for common API test scenarios
- ✅ Built with Axios and Jest
- ✅ **HTML Test Reports** - Beautiful visual reports with dark theme

## API Endpoints

Testing against **Fake Store API** (`https://fakestoreapi.com`):
- Products: `/products`
- Users: `/users`
- Carts: `/carts`
- Auth: `/auth/login`

See `config/qa.config.js` for all available endpoints.

## Adding New Environments

1. Create a new config file (e.g., `config/staging.config.js`):
```javascript
module.exports = {
  env: 'staging',
  baseURL: 'https://your-api.com',
  timeout: 10000,
  endpoints: {
    products: '/products'
  },
  headers: {
    'Content-Type': 'application/json'
  }
};
```

2. Run tests with your config:
```bash
CONFIG_FILE=staging.config npm test
```

3. (Optional) Add a script to `package.json`:
```json
"test:staging": "CONFIG_FILE=staging.config jest --verbose"
```

## CI/CD Pipeline

This project includes GitHub Actions workflows for automated testing:

### 🚀 **Automated Testing**
- **Triggers**: Push to main/develop, Pull Requests, Daily scheduled runs
- **Node Versions**: 18.x, 20.x
- **Test Strategy**: 
  - ✅ **DummyJSON Tests**: Run in CI (no rate limiting)
  - ⏭️ **Fake Store Tests**: Skipped in CI (rate limiting issues)

### 📊 **CI/CD Features**
- **Test Reports**: HTML reports uploaded as artifacts
- **PR Comments**: Automatic test results posted to PRs
- **Daily Health Checks**: Scheduled runs to monitor API health
- **Multi-Node Testing**: Tests run on Node 18.x and 20.x

### 🔧 **Local vs CI Testing**
```bash
# Local development (both APIs)
npm test                    # All tests (DummyJSON + Fake Store)

# CI/CD environment (DummyJSON only)
CI=true npm test            # DummyJSON tests only, Fake Store skipped

# Specific API testing
npm run test:dummy          # DummyJSON only
npm run test:fakestore      # Fake Store only (local)
```

### 📁 **Workflow Files**
- `.github/workflows/api-tests.yml` - Main CI/CD pipeline

## Project Structure

```
config/
  ├── qa.config.js          # API configuration (Fake Store + DummyJSON)
  └── index.js              # Config loader

src/helpers/
  └── apiHelper.js          # Reusable API helper with all HTTP methods

tests/
  ├── fakestore.test.js     # Fake Store API tests (local only)
  └── dummyjson.test.js     # DummyJSON API tests (CI/CD friendly)

.github/workflows/
  └── api-tests.yml         # GitHub Actions CI/CD pipeline

test-results/
  └── test-report.html      # Generated HTML test report

jest.config.js              # Jest configuration with HTML reporting
package.json                # Dependencies and scripts
README.md                   # This file
```

