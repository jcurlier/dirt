/**
 * Registry Service.
 * @module
 */

const dirt = require('./dirt.js');

/**
 * Get the registries.
 * @function
 * @returns {[registry]} - List of registries
 */
async function getRegistries() {
  return dirt.getRegistries();
}

/**
 * Get a given registry items.
 * @function
 * @param {registryAddress} address for the registry
 * @returns {[registry]} List of items
 */
async function getRegistryItems(registryAddress) {
  return dirt.getRegistryItems(registryAddress);
}

module.exports = {
  getRegistries,
  getRegistryItems,
};
