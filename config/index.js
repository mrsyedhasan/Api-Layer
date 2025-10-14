/**
 * Configuration Loader
 * Loads config based on CONFIG_FILE environment variable
 */

/**
 * Load configuration from file
 * @param {string} configFile - Config file name (without .js extension)
 * @returns {object} Configuration object
 */
function loadConfig(configFile = 'qa.config') {
  try {
    const config = require(`./${configFile}`);
    console.log(`📋 Using config: ${configFile}`);
    return config;
  } catch (error) {
    console.warn(`⚠️  Config file '${configFile}' not found. Using qa.config as default.`);
    return require('./qa.config');
  }
}

/**
 * Get config based on CONFIG_FILE env variable or default to qa.config
 */
const configFile = process.env.CONFIG_FILE || 'qa.config';
const config = loadConfig(configFile);

module.exports = {
  loadConfig,
  config
};
