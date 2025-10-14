/**
 * QA Environment Configuration
 */
module.exports = {
  env: 'qa',
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 10000,
  retries: 3,
  endpoints: {
    // Posts (similar to products for testing)
    products: '/posts',
    singleProduct: '/posts/:id',
    productCategories: '/posts',
    
    // Users
    users: '/users',
    singleUser: '/users/:id',
    
    // Comments (similar to carts for testing)
    carts: '/comments',
    singleCart: '/comments/:id',
    userCarts: '/comments',
    
    // Todos
    todos: '/todos'
  },
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
};

