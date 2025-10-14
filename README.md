# Api-Layer

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

# Watch mode (auto-run on file changes)
npm run test:watch

# Coverage report
npm run test:coverage
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

