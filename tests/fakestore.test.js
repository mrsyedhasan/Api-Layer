const ApiHelper = require('../src/helpers/apiHelper');
const { config } = require('../config');

/**
 * Fake Store API Tests
 * Run with: npm test
 */

describe('Fake Store API - CRUD Tests', () => {
  let api;

  beforeAll(() => {
    api = new ApiHelper(config);
    console.log(`Running tests against: ${config.baseURL}`);
  });

  // ==================== GET TESTS ====================
  describe('GET - Products', () => {
    test('should get all products', async () => {
      const response = await api.get(config.endpoints.products);
      
      expect(response.status).toBe(200);
      expect(Array.isArray(response.data)).toBe(true);
      expect(response.data.length).toBeGreaterThan(0);
      expect(response.data[0]).toHaveProperty('id');
      expect(response.data[0]).toHaveProperty('title');
      expect(response.data[0]).toHaveProperty('price');
      expect(response.data[0]).toHaveProperty('category');
    });

    test('should get single product by ID', async () => {
      const response = await api.get(`${config.endpoints.products}/1`);
      
      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty('id', 1);
      expect(response.data).toHaveProperty('title');
      expect(response.data).toHaveProperty('price');
    });

    test('should get all categories', async () => {
      const response = await api.get(config.endpoints.productCategories);
      
      expect(response.status).toBe(200);
      expect(Array.isArray(response.data)).toBe(true);
      expect(response.data).toContain('electronics');
    });

    test('should get products by category', async () => {
      const response = await api.get(`${config.endpoints.products}/category/electronics`);
      
      expect(response.status).toBe(200);
      expect(Array.isArray(response.data)).toBe(true);
      if (response.data.length > 0) {
        expect(response.data[0].category).toBe('electronics');
      }
    });
  });

  // ==================== POST TESTS ====================
  describe('POST - Products', () => {
    test('should create a new product', async () => {
      const newProduct = {
        title: 'Test Product',
        price: 99.99,
        description: 'Test product description',
        image: 'https://i.pravatar.cc',
        category: 'electronics'
      };

      const response = await api.post(config.endpoints.products, newProduct);
      
      expect(response.status).toBe(201);
      expect(response.data).toHaveProperty('id');
      expect(response.data.title).toBe(newProduct.title);
      expect(response.data.price).toBe(newProduct.price);
    });

    test('should create product with minimal data', async () => {
      const minProduct = {
        title: 'Minimal Product',
        price: 50
      };

      const response = await api.post(config.endpoints.products, minProduct);
      
      expect(response.status).toBe(201);
      expect(response.data).toHaveProperty('id');
    });
  });

  // ==================== PUT TESTS ====================
  describe('PUT - Products', () => {
    test('should update entire product', async () => {
      const updatedProduct = {
        title: 'Updated Product',
        price: 149.99,
        description: 'Updated description',
        image: 'https://i.pravatar.cc',
        category: 'electronics'
      };

      const response = await api.put(`${config.endpoints.products}/1`, updatedProduct);
      
      expect(response.status).toBe(200);
      expect(response.data.title).toBe(updatedProduct.title);
      expect(response.data.price).toBe(updatedProduct.price);
    });
  });

  // ==================== PATCH TESTS ====================
  describe('PATCH - Products', () => {
    test('should partially update product', async () => {
      const partialUpdate = {
        price: 199.99
      };

      const response = await api.patch(`${config.endpoints.products}/1`, partialUpdate);
      
      expect(response.status).toBe(200);
      expect(response.data.price).toBe(partialUpdate.price);
    });
  });

  // ==================== DELETE TESTS ====================
  describe('DELETE - Products', () => {
    test('should delete product', async () => {
      const response = await api.delete(`${config.endpoints.products}/1`);
      
      expect(response.status).toBe(200);
    });
  });

  // ==================== USERS TESTS ====================
  describe('GET - Users', () => {
    test('should get all users', async () => {
      const response = await api.get(config.endpoints.users);
      
      expect(response.status).toBe(200);
      expect(Array.isArray(response.data)).toBe(true);
    });
  });

  // ==================== CARTS TESTS ====================
  describe('GET - Carts', () => {
    test('should get all carts', async () => {
      const response = await api.get(config.endpoints.carts);
      
      expect(response.status).toBe(200);
      expect(Array.isArray(response.data)).toBe(true);
    });
  });
});

