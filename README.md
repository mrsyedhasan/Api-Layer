# Api-Layer

API Testing Framework with Axios and Jest - Reusable templates for all HTTP methods (GET, POST, PUT, PATCH, DELETE).

## Setup

```bash
npm install
```

## Run Tests

```bash
npm test
```

## Quick Start

```javascript
const ApiHelper = require('./src/helpers/apiHelper');

describe('My API Tests', () => {
  let api;

  beforeAll(() => {
    api = new ApiHelper('https://your-api.com');
  });

  test('GET request', async () => {
    const response = await api.get('/endpoint');
    expect(response.status).toBe(200);
  });

  test('POST request', async () => {
    const response = await api.post('/endpoint', { data: 'value' });
    expect(response.status).toBe(201);
  });
});
```

**See more examples:**
- `tests/examples/simple.example.test.js` - Quick examples for all methods
- `tests/templates/api.template.test.js` - Complete template with all test scenarios

## Features

- ✅ Reusable `ApiHelper` class for all HTTP methods (GET, POST, PUT, PATCH, DELETE)
- ✅ Consistent response format with status, data, headers, and error handling
- ✅ Ready-to-use templates for common API test scenarios
- ✅ Built with Axios and Jest

## Structure

- `src/helpers/apiHelper.js` - Reusable API helper with all HTTP methods
- `tests/templates/` - Reusable test templates
- `tests/examples/` - Example test files

