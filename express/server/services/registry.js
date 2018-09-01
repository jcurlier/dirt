/**
 * Registry Service.
 * @module
 */

// Libraries
const debug = require('debug')('dirt:api:services:registry');

const dirt = require('../connectors/dirt.js');

/**
 * Get the registries.
 * @function
 * @returns {[registry]} - List of registries
 */
async function getRegistries() {
  debug('getting registries');
  return dirt.getRegistries();
}

/**
 * Get a given registry items.
 * @function
 * @param {registryAddress} address for the registry
 * @returns {[registry]} List of items
 */
async function getRegistryItems(registryAddress) {
  debug('getting registry items');
  return dirt.getRegistryItems(registryAddress);
}

module.exports = {
  getRegistries,
  getRegistryItems,
};
