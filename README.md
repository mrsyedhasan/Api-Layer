# Api-Layer

[![API Tests](https://github.com/mrsyedhasan/Api-Layer/actions/workflows/test.yml/badge.svg)](https://github.com/mrsyedhasan/Api-Layer/actions/workflows/test.yml)
[![Code Coverage](https://github.com/mrsyedhasan/Api-Layer/actions/workflows/coverage.yml/badge.svg)](https://github.com/mrsyedhasan/Api-Layer/actions/workflows/coverage.yml)
[![Scheduled Tests](https://github.com/mrsyedhasan/Api-Layer/actions/workflows/scheduled-tests.yml/badge.svg)](https://github.com/mrsyedhasan/Api-Layer/actions/workflows/scheduled-tests.yml)

API Testing Framework with Axios and Jest for Fake Store API - Reusable templates for all HTTP methods (GET, POST, PUT, PATCH, DELETE).

## Setup

```bash
npm install
```

## Run Tests

```bash
# Run all tests (uses qa.config.js by default)
npm test

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
- ✅ **CI/CD with GitHub Actions** - Automated testing on every push/PR
- ✅ **HTML Test Reports** - Beautiful visual reports with dark theme
- ✅ **Multi-Node Testing** - Tests run on Node 18.x and 20.x
- ✅ **Scheduled Health Checks** - Daily API health monitoring

## API Endpoints

Testing against **Fake Store API** (`https://fakestoreapi.com`):
- Products: `/products`
- Users: `/users`
- Carts: `/carts`
- Auth: `/auth/login`

See `config/qa.config.js` for all available endpoints.

## CI/CD Pipeline

This project includes **GitHub Actions** workflows for automated testing:

### **1. API Tests** (`.github/workflows/test.yml`)
- ✅ Runs on every push and pull request
- ✅ Tests against Node.js 18.x and 20.x
- ✅ Uploads HTML test reports as artifacts
- ✅ Comments on PRs with test results

### **2. Code Coverage** (`.github/workflows/coverage.yml`)
- ✅ Generates coverage reports
- ✅ Uploads coverage artifacts
- ✅ Runs on push to main and PRs

### **3. Scheduled Health Checks** (`.github/workflows/scheduled-tests.yml`)
- ✅ Runs daily at 9 AM UTC
- ✅ Monitors API health
- ✅ Can be triggered manually

**View Workflows:** [Actions Tab](https://github.com/mrsyedhasan/Api-Layer/actions)

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

## Project Structure

```
config/
  ├── qa.config.js          # API configuration and endpoints
  └── index.js              # Config loader

src/helpers/
  └── apiHelper.js          # Reusable API helper with all HTTP methods

tests/
  ├── fakestore.test.js     # Main test file
  ├── templates/            # Reusable test templates
  └── examples/             # Example test files
```

