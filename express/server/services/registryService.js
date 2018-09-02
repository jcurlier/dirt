// Libraries
const debug = require('debug')('dirt:api:services:registry');

// Dirt Libraries
const dirt = require('../connectors/dirtConnector.js');

/**
 * Registry Service
 * @class
 */
class RegistryService {

  /**
   * Get the registries.
   * @method
   * @returns {[registry]} - List of registries
   */
  async getRegistries() {
    debug('getting registries');
    return dirt.getRegistries();
  }

  /**
   * Get a given registry items.
   * @method
   * @param {registryAddress} address for the registry
   * @returns {[registry]} List of items
   */
  async getRegistryItems(registryAddress) {
    debug('getting registry items');
    return dirt.getRegistryItems(registryAddress);
  }

}

module.exports = new RegistryService();
