const ApiHelper = require('../src/helpers/apiHelper');
const { config } = require('../config');

/**
 * Fake Store API Tests
 * Run with: npm test
 */

describe('API Layer - CRUD Tests', () => {
  let api;

  beforeAll(() => {
    api = new ApiHelper(config);
    console.log(`Running tests against: ${config.baseURL}`);
  });

  // ==================== GET TESTS ====================
  describe('GET - Posts', () => {
    test('should get all posts', async () => {
      const response = await api.get(config.endpoints.products);
      
      expect(response.status).toBe(200);
      expect(Array.isArray(response.data)).toBe(true);
      expect(response.data.length).toBeGreaterThan(0);
      expect(response.data[0]).toHaveProperty('id');
      expect(response.data[0]).toHaveProperty('title');
      expect(response.data[0]).toHaveProperty('body');
      expect(response.data[0]).toHaveProperty('userId');
    });

    test('should get single post by ID', async () => {
      const response = await api.get(`${config.endpoints.products}/1`);
      
      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty('id', 1);
      expect(response.data).toHaveProperty('title');
      expect(response.data).toHaveProperty('body');
    });

    test('should get posts with query params', async () => {
      const response = await api.get(config.endpoints.productCategories, { _limit: 5 });
      
      expect(response.status).toBe(200);
      expect(Array.isArray(response.data)).toBe(true);
      expect(response.data.length).toBeLessThanOrEqual(5);
    });
  });

  // ==================== POST TESTS ====================
  describe('POST - Posts', () => {
    test('should create a new post', async () => {
      const newPost = {
        title: 'Test Post',
        body: 'Test post body',
        userId: 1
      };

      const response = await api.post(config.endpoints.products, newPost);
      
      expect(response.status).toBe(201);
      expect(response.data).toHaveProperty('id');
      expect(response.data.title).toBe(newPost.title);
      expect(response.data.body).toBe(newPost.body);
    });

    test('should create post with minimal data', async () => {
      const minPost = {
        title: 'Minimal Post',
        body: 'Body',
        userId: 1
      };

      const response = await api.post(config.endpoints.products, minPost);
      
      expect(response.status).toBe(201);
      expect(response.data).toHaveProperty('id');
    });
  });

  // ==================== PUT TESTS ====================
  describe('PUT - Posts', () => {
    test('should update entire post', async () => {
      const updatedPost = {
        id: 1,
        title: 'Updated Post',
        body: 'Updated body content',
        userId: 1
      };

      const response = await api.put(`${config.endpoints.products}/1`, updatedPost);
      
      expect(response.status).toBe(200);
      expect(response.data.title).toBe(updatedPost.title);
      expect(response.data.body).toBe(updatedPost.body);
    });
  });

  // ==================== PATCH TESTS ====================
  describe('PATCH - Posts', () => {
    test('should partially update post', async () => {
      const partialUpdate = {
        title: 'Updated Title Only'
      };

      const response = await api.patch(`${config.endpoints.products}/1`, partialUpdate);
      
      expect(response.status).toBe(200);
      expect(response.data.title).toBe(partialUpdate.title);
    });
  });

  // ==================== DELETE TESTS ====================
  describe('DELETE - Posts', () => {
    test('should delete post', async () => {
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

  // ==================== COMMENTS TESTS ====================
  describe('GET - Comments', () => {
    test('should get all comments', async () => {
      const response = await api.get(config.endpoints.carts);
      
      expect(response.status).toBe(200);
      expect(Array.isArray(response.data)).toBe(true);
    });
  });
});

