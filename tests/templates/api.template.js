const ApiHelper = require('../../src/helpers/apiHelper');
const { config } = require('../../config');

/**
 * REUSABLE API TEST TEMPLATE
 * 
 * Instructions:
 * 1. Copy this template for your API tests
 * 2. Update the ENDPOINT constant or use config.endpoints
 * 3. Modify the test data as needed
 * 4. Add/remove tests based on your requirements
 */

describe('API Test Template - All HTTP Methods', () => {
  let api;
  const ENDPOINT = config.endpoints.products; // Use any endpoint from config

  beforeAll(() => {
    // Initialize API helper with config
    api = new ApiHelper(config);
  });

  // ==================== GET TESTS ====================
  describe('GET Request Template', () => {
    
    test('GET - Get all items', async () => {
      const response = await api.get(ENDPOINT);
      
      // Assertions
      expect(response.status).toBe(200);
      expect(response.data).toBeDefined();
      expect(Array.isArray(response.data)).toBe(true);
    });

    test('GET - Get single item by ID', async () => {
      const itemId = 1;
      const response = await api.get(`${ENDPOINT}/${itemId}`);
      
      // Assertions
      expect(response.status).toBe(200);
      expect(response.data).toBeDefined();
      expect(response.data.id).toBe(itemId);
    });

    test('GET - Get with query parameters', async () => {
      const params = { userId: 1, _limit: 5 };
      const response = await api.get(ENDPOINT, params);
      
      // Assertions
      expect(response.status).toBe(200);
      expect(response.data).toBeDefined();
      expect(Array.isArray(response.data)).toBe(true);
    });

    test('GET - Handle non-existent item', async () => {
      const response = await api.get(`${ENDPOINT}/99999`);
      
      // Note: Some APIs return 404, others return 200 with null
      // Fake Store API returns 200, adjust based on your API
      expect([200, 404]).toContain(response.status);
    });
  });

  // ==================== POST TESTS ====================
  describe('POST Request Template', () => {
    
    test('POST - Create new item', async () => {
      const newItem = {
        title: 'Test Product',
        price: 99.99,
        description: 'Test description',
        category: 'electronics'
      };
      
      const response = await api.post(ENDPOINT, newItem);
      
      // Assertions
      expect(response.status).toBe(201);
      expect(response.data).toBeDefined();
      expect(response.data).toHaveProperty('id');
      expect(response.data.title).toBe(newItem.title);
    });

    test('POST - Create with custom headers', async () => {
      const newItem = { title: 'Test', price: 50, category: 'electronics' };
      const customHeaders = { 'X-Custom-Header': 'test-value' };
      
      const response = await api.post(ENDPOINT, newItem, customHeaders);
      
      // Assertions
      expect(response.status).toBe(201);
      expect(response.data).toBeDefined();
    });

    test('POST - Validate response structure', async () => {
      const newItem = { title: 'Test', price: 50 };
      const response = await api.post(ENDPOINT, newItem);
      
      // Assertions
      expect(response.data).toHaveProperty('id');
      expect(response.data).toHaveProperty('title');
    });
  });

  // ==================== PUT TESTS ====================
  describe('PUT Request Template', () => {
    
    test('PUT - Update entire item', async () => {
      const itemId = 1;
      const updatedItem = {
        title: 'Updated Title',
        price: 149.99,
        description: 'Updated description',
        category: 'electronics'
      };
      
      const response = await api.put(`${ENDPOINT}/${itemId}`, updatedItem);
      
      // Assertions
      expect(response.status).toBe(200);
      expect(response.data).toBeDefined();
      expect(response.data.title).toBe(updatedItem.title);
    });

    test('PUT - Replace all fields', async () => {
      const itemId = 1;
      const newData = {
        title: 'Completely New',
        body: 'All new content',
        userId: 2
      };
      
      const response = await api.put(`${ENDPOINT}/${itemId}`, newData);
      
      // Assertions
      expect(response.status).toBe(200);
      expect(response.data.title).toBe(newData.title);
    });

    test('PUT - Handle non-existent item', async () => {
      const response = await api.put(`${ENDPOINT}/99999`, { title: 'Test' });
      
      // Note: Some APIs might return 404, others might create
      expect([200, 201, 404]).toContain(response.status);
    });
  });

  // ==================== PATCH TESTS ====================
  describe('PATCH Request Template', () => {
    
    test('PATCH - Partial update single field', async () => {
      const itemId = 1;
      const partialUpdate = {
        title: 'Only Title Updated'
      };
      
      const response = await api.patch(`${ENDPOINT}/${itemId}`, partialUpdate);
      
      // Assertions
      expect(response.status).toBe(200);
      expect(response.data).toBeDefined();
      expect(response.data.id).toBe(itemId);
      expect(response.data.title).toBe(partialUpdate.title);
    });

    test('PATCH - Partial update multiple fields', async () => {
      const itemId = 1;
      const partialUpdate = {
        title: 'Updated Title',
        price: 99.99
      };
      
      const response = await api.patch(`${ENDPOINT}/${itemId}`, partialUpdate);
      
      // Assertions
      expect(response.status).toBe(200);
      expect(response.data.title).toBe(partialUpdate.title);
      expect(response.data.price).toBe(partialUpdate.price);
    });

    test('PATCH - Handle non-existent item', async () => {
      const response = await api.patch(`${ENDPOINT}/99999`, { title: 'Test' });
      
      // Note: API behavior varies - some return 404, some return 200
      expect([200, 404]).toContain(response.status);
    });
  });

  // ==================== DELETE TESTS ====================
  describe('DELETE Request Template', () => {
    
    test('DELETE - Delete item by ID', async () => {
      const itemId = 1;
      const response = await api.delete(`${ENDPOINT}/${itemId}`);
      
      // Assertions
      expect(response.status).toBe(200);
      expect(response.data).toBeDefined();
    });

    test('DELETE - Verify deletion', async () => {
      const itemId = 1;
      
      // Delete the item
      const deleteResponse = await api.delete(`${ENDPOINT}/${itemId}`);
      expect(deleteResponse.status).toBe(200);
      
      // Note: JSONPlaceholder doesn't actually delete, so this is just an example
      // In real scenarios, you'd verify the item no longer exists
    });

    test('DELETE - Handle non-existent item', async () => {
      const response = await api.delete(`${ENDPOINT}/99999`);
      
      // Assertions (behavior varies by API)
      expect([200, 404]).toContain(response.status);
    });
  });
});

