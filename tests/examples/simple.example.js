const ApiHelper = require('../../src/helpers/apiHelper');
const { config } = require('../../config');

/**
 * SIMPLE EXAMPLE - Basic API Test
 * This shows the minimal setup needed for API testing
 */

describe('Simple API Example', () => {
  let api;

  beforeAll(() => {
    // Step 1: Initialize API Helper with config
    api = new ApiHelper(config);
  });

  // GET Example
  test('GET - Fetch products', async () => {
    const response = await api.get(config.endpoints.products);
    
    expect(response.status).toBe(200);
    expect(Array.isArray(response.data)).toBe(true);
  });

  // POST Example
  test('POST - Create a product', async () => {
    const response = await api.post(config.endpoints.products, {
      title: 'New Product',
      price: 29.99,
      description: 'Product description',
      category: 'electronics'
    });
    
    expect(response.status).toBe(201);
    expect(response.data.title).toBe('New Product');
  });

  // PUT Example
  test('PUT - Update a product', async () => {
    const response = await api.put(`${config.endpoints.products}/1`, {
      title: 'Updated Product',
      price: 39.99,
      description: 'Updated description',
      category: 'electronics'
    });
    
    expect(response.status).toBe(200);
    expect(response.data.title).toBe('Updated Product');
  });

  // PATCH Example
  test('PATCH - Partial update', async () => {
    const response = await api.patch(`${config.endpoints.products}/1`, {
      price: 49.99
    });
    
    expect(response.status).toBe(200);
    expect(response.data.price).toBe(49.99);
  });

  // DELETE Example
  test('DELETE - Remove a product', async () => {
    const response = await api.delete(`${config.endpoints.products}/1`);
    
    expect(response.status).toBe(200);
  });
});

