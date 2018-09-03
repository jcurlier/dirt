// Libraries
const Web3 = require('web3');
const debug = require('debug')('dirt:api:connectors:dirt');

// Dirt Libraries
const {Dirt} = require('@dirt/lib');
const provider = require('./provider');

// Constants
const REGISTRY_DEFAULT_TYPE = 'ChallengeableRegistry';

/**
 * Dirt Connector,
 * connects to the Blockchain through the Dirt client.
 * @class
 */
class DirtConnector {

  /**
   * Initialize the connector.
   * @method
   */
  async init() {
    debug('initializing the Dirt connector');

    // Configuration
    const {ROOT_ADDRESS: rootAddress} = process.env;
    const instance = new Web3(provider);

    // Dirt client configuration
    const dirtConfiguration = {
      rootAddress,
      trace: false,
      web3: {
        instance,
      },
    };

    debug('creating the Dirt connector');
    this.client = await Dirt.create(dirtConfiguration);
  }

  /**
   * Get the registries.
   * @method
   * @returns {[registry]} - List of registries
   */
  async getRegistries() {
    const registryDescriptors = [];

    debug('getting the registries');
    // TODO: assuming this cannot be set once
    const eumerator = this.client.Root.getEnumerator();

    // TODO: this is going to be slow
    while (await eumerator.next()) { // eslint-disable-line
      const registryDescriptor = eumerator.current;
      const {
        name,
        address,
        vote_style: voteStyle,
        timestamp,
      } = registryDescriptor;

      registryDescriptors.push({
        name,
        address,
        votestyle: voteStyle,
        date: new Date(timestamp * 1000).toUTCString(),
      });
    }

    return registryDescriptors;
  }

  /**
   * Get items for a given registry.
   * @method
   * @param {registryAddress} address for the registry
   * @returns {[registry]} List of items
   */
  async getRegistryItems(registryAddress) {
    const itemDescriptors = [];

    debug('getting the registry');
    const registry = await this.client.getRegistryAtAddress(
      registryAddress,
      REGISTRY_DEFAULT_TYPE,
    );

    debug('getting the registry items');
    const registryEumerator = registry.getEnumerator();
    // TODO: this is going to be slow
    while (await registryEumerator.next()) { // eslint-disable-line
      const itemDescriptor = registryEumerator.current;
      const {
        key,
        owner,
        value,
        blockHistory,
        timestamp,
        stake,
      } = itemDescriptor;

      itemDescriptors.push({
        key,
        owner,
        value,
        blockhistory: blockHistory,
        date: new Date(timestamp * 1000).toUTCString(),
        stake: stake.toString(),
      });
    }

    return itemDescriptors;
  }

}

module.exports = new DirtConnector();
