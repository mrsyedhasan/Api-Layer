const axios = require('axios');

/**
 * API Helper - Reusable HTTP methods for API testing
 */
class ApiHelper {
  constructor(config) {
    // Accept either a config object or baseURL string for backward compatibility
    if (typeof config === 'string') {
      this.config = {
        baseURL: config,
        timeout: 10000,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      };
    } else {
      this.config = config;
    }

    this.client = axios.create({
      baseURL: this.config.baseURL,
      timeout: this.config.timeout || 10000,
      headers: this.config.headers || {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
  }

  /**
   * GET request
   * @param {string} endpoint - API endpoint
   * @param {object} params - Query parameters
   * @param {object} headers - Additional headers
   * @returns {Promise} Response data
   */
  async get(endpoint, params = {}, headers = {}) {
    try {
      const response = await this.client.get(endpoint, { params, headers });
      return {
        status: response.status,
        data: response.data,
        headers: response.headers
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * POST request
   * @param {string} endpoint - API endpoint
   * @param {object} body - Request body
   * @param {object} headers - Additional headers
   * @returns {Promise} Response data
   */
  async post(endpoint, body = {}, headers = {}) {
    try {
      const response = await this.client.post(endpoint, body, { headers });
      return {
        status: response.status,
        data: response.data,
        headers: response.headers
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * PUT request
   * @param {string} endpoint - API endpoint
   * @param {object} body - Request body
   * @param {object} headers - Additional headers
   * @returns {Promise} Response data
   */
  async put(endpoint, body = {}, headers = {}) {
    try {
      const response = await this.client.put(endpoint, body, { headers });
      return {
        status: response.status,
        data: response.data,
        headers: response.headers
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * PATCH request
   * @param {string} endpoint - API endpoint
   * @param {object} body - Request body
   * @param {object} headers - Additional headers
   * @returns {Promise} Response data
   */
  async patch(endpoint, body = {}, headers = {}) {
    try {
      const response = await this.client.patch(endpoint, body, { headers });
      return {
        status: response.status,
        data: response.data,
        headers: response.headers
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * DELETE request
   * @param {string} endpoint - API endpoint
   * @param {object} headers - Additional headers
   * @returns {Promise} Response data
   */
  async delete(endpoint, headers = {}) {
    try {
      const response = await this.client.delete(endpoint, { headers });
      return {
        status: response.status,
        data: response.data,
        headers: response.headers
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Handle errors
   * @param {Error} error - Error object
   * @returns {object} Formatted error response
   */
  handleError(error) {
    if (error.response) {
      return {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers,
        error: error.response.data?.message || error.message
      };
    } else if (error.request) {
      return {
        status: 0,
        data: null,
        error: 'No response received from server'
      };
    } else {
      return {
        status: 0,
        data: null,
        error: error.message
      };
    }
  }
}

module.exports = ApiHelper;
