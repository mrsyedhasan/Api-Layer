const ApiHelper = require('../../src/helpers/apiHelper');

/**
 * SIMPLE EXAMPLE - Basic API Test
 * This shows the minimal setup needed for API testing
 */

describe('Simple API Example', () => {
  let api;

  beforeAll(() => {
    // Step 1: Initialize API Helper with your base URL
    api = new ApiHelper('https://jsonplaceholder.typicode.com');
  });

  // GET Example
  test('GET - Fetch users', async () => {
    const response = await api.get('/users');
    
    expect(response.status).toBe(200);
    expect(Array.isArray(response.data)).toBe(true);
  });

  // POST Example
  test('POST - Create a post', async () => {
    const response = await api.post('/posts', {
      title: 'My Post',
      body: 'Post content',
      userId: 1
    });
    
    expect(response.status).toBe(201);
    expect(response.data.title).toBe('My Post');
  });

  // PUT Example
  test('PUT - Update a post', async () => {
    const response = await api.put('/posts/1', {
      title: 'Updated Post',
      body: 'Updated content',
      userId: 1
    });
    
    expect(response.status).toBe(200);
    expect(response.data.title).toBe('Updated Post');
  });

  // PATCH Example
  test('PATCH - Partial update', async () => {
    const response = await api.patch('/posts/1', {
      title: 'New Title Only'
    });
    
    expect(response.status).toBe(200);
    expect(response.data.title).toBe('New Title Only');
  });

  // DELETE Example
  test('DELETE - Remove a post', async () => {
    const response = await api.delete('/posts/1');
    
    expect(response.status).toBe(200);
  });
});

