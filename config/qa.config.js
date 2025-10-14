/**
 * QA Environment Configuration
 */
module.exports = {
  env: 'qa',
  baseURL: 'https://fakestoreapi.com',
  timeout: 10000,
  retries: 3,
  endpoints: {
    // Products
    products: '/products',
    singleProduct: '/products/:id',
    productCategories: '/products/categories',
    
    // Users
    users: '/users',
    singleUser: '/users/:id',
    
    // Carts
    carts: '/carts',
    singleCart: '/carts/:id',
    userCarts: '/carts/user/:id',
    
    // Auth
    login: '/auth/login'
  },
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
};

