/**
 * DummyJSON API Tests
 * Testing against https://dummyjson.com
 */
const ApiHelper = require('../src/helpers/apiHelper');
const config = require('../config');

describe('DummyJSON API - CRUD Tests', () => {
  let apiHelper;

  beforeAll(() => {
    // Use baseURL2 (DummyJSON) for these tests
    apiHelper = new ApiHelper({
      baseURL: config.baseURL2,
      timeout: config.timeout,
      headers: config.headers
    });
  });

  describe('GET - Products', () => {
    test('should get all products', async () => {
      const response = await apiHelper.get(config.dummyEndpoints.products);
      
      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty('products');
      expect(response.data.products).toBeInstanceOf(Array);
      expect(response.data.products.length).toBeGreaterThan(0);
      
      // Check product structure
      const firstProduct = response.data.products[0];
      expect(firstProduct).toHaveProperty('id');
      expect(firstProduct).toHaveProperty('title');
      expect(firstProduct).toHaveProperty('price');
      expect(firstProduct).toHaveProperty('category');
    });

    test('should get single product', async () => {
      const productId = 1;
      const response = await apiHelper.get(`/products/${productId}`);
      
      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty('id', productId);
      expect(response.data).toHaveProperty('title');
      expect(response.data).toHaveProperty('price');
      expect(response.data).toHaveProperty('category');
      expect(response.data).toHaveProperty('description');
    });

    test('should get product categories', async () => {
      const response = await apiHelper.get(config.dummyEndpoints.productCategories);
      
      expect(response.status).toBe(200);
      expect(response.data).toBeInstanceOf(Array);
      expect(response.data.length).toBeGreaterThan(0);
      
      // Check category structure (DummyJSON returns objects with name, slug, url)
      const firstCategory = response.data[0];
      expect(firstCategory).toHaveProperty('name');
      expect(firstCategory).toHaveProperty('slug');
      expect(firstCategory).toHaveProperty('url');
    });

    test('should handle non-existent product ID', async () => {
      const response = await apiHelper.get('/products/999999');
      
      expect(response.status).toBe(404);
      expect(response.data).toHaveProperty('message');
    });
  });

  describe('GET - Users', () => {
    test('should get all users', async () => {
      const response = await apiHelper.get(config.dummyEndpoints.users);
      
      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty('users');
      expect(response.data.users).toBeInstanceOf(Array);
      expect(response.data.users.length).toBeGreaterThan(0);
      
      // Check user structure
      const firstUser = response.data.users[0];
      expect(firstUser).toHaveProperty('id');
      expect(firstUser).toHaveProperty('firstName');
      expect(firstUser).toHaveProperty('lastName');
      expect(firstUser).toHaveProperty('email');
    });

    test('should get single user', async () => {
      const userId = 1;
      const response = await apiHelper.get(`/users/${userId}`);
      
      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty('id', userId);
      expect(response.data).toHaveProperty('firstName');
      expect(response.data).toHaveProperty('lastName');
      expect(response.data).toHaveProperty('email');
    });
  });

  describe('GET - Carts', () => {
    test('should get all carts', async () => {
      const response = await apiHelper.get(config.dummyEndpoints.carts);
      
      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty('carts');
      expect(response.data.carts).toBeInstanceOf(Array);
      expect(response.data.carts.length).toBeGreaterThan(0);
      
      // Check cart structure
      const firstCart = response.data.carts[0];
      expect(firstCart).toHaveProperty('id');
      expect(firstCart).toHaveProperty('userId');
      expect(firstCart).toHaveProperty('products');
    });

    test('should get single cart', async () => {
      const cartId = 1;
      const response = await apiHelper.get(`/carts/${cartId}`);
      
      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty('id', cartId);
      expect(response.data).toHaveProperty('userId');
      expect(response.data).toHaveProperty('products');
    });
  });

  describe('GET - Posts', () => {
    test('should get all posts', async () => {
      const response = await apiHelper.get(config.dummyEndpoints.posts);
      
      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty('posts');
      expect(response.data.posts).toBeInstanceOf(Array);
      expect(response.data.posts.length).toBeGreaterThan(0);
      
      // Check post structure
      const firstPost = response.data.posts[0];
      expect(firstPost).toHaveProperty('id');
      expect(firstPost).toHaveProperty('title');
      expect(firstPost).toHaveProperty('body');
      expect(firstPost).toHaveProperty('userId');
      expect(firstPost).toHaveProperty('tags');
    });

    test('should get single post', async () => {
      const postId = 1;
      const response = await apiHelper.get(`/posts/${postId}`);
      
      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty('id', postId);
      expect(response.data).toHaveProperty('title');
      expect(response.data).toHaveProperty('body');
      expect(response.data).toHaveProperty('userId');
    });
  });

  describe('POST - Products', () => {
    test('should create a new product', async () => {
      const newProduct = {
        title: 'Test Product',
        description: 'A test product for API testing',
        price: 99.99,
        category: 'electronics'
      };

      const response = await apiHelper.post('/products/add', newProduct);
      
      expect(response.status).toBe(201);
      expect(response.data).toHaveProperty('id');
      expect(response.data.title).toBe(newProduct.title);
      expect(response.data.price).toBe(newProduct.price);
    });
  });

  describe('PUT - Products', () => {
    test('should update a product', async () => {
      const productId = 1;
      const updatedProduct = {
        title: 'Updated Product Title',
        price: 199.99
      };

      const response = await apiHelper.put(`/products/${productId}`, updatedProduct);
      
      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty('id', productId);
      expect(response.data.title).toBe(updatedProduct.title);
      expect(response.data.price).toBe(updatedProduct.price);
    });
  });

  describe('PATCH - Products', () => {
    test('should partially update a product', async () => {
      const productId = 2;
      const partialUpdate = {
        price: 299.99
      };

      const response = await apiHelper.patch(`/products/${productId}`, partialUpdate);
      
      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty('id', productId);
      expect(response.data.price).toBe(partialUpdate.price);
    });
  });

  describe('DELETE - Products', () => {
    test('should delete a product', async () => {
      const productId = 1;
      const response = await apiHelper.delete(`/products/${productId}`);
      
      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty('id', productId);
      expect(response.data).toHaveProperty('isDeleted', true);
    });
  });
});
