/**
 * Dirt Connector.
 * @module
 */

// Dirt Libraries
const {Dirt} = require('@dirt/lib');

// Configuration
const {ROOT_ADDRESS: rootAddress, INFURA_ENDPOINT: endpoint} = process.env;

// TODO: how do we know it is a StakableRegistry?
const REGISTRY_DEFAULT_TYPE = 'StakableRegistry';

// Dirt client configuration
const dirtConfiguration = {
  rootAddress,
  trace: false,
  web3: {
    endpoint,
  },
};

let client;

/**
 * Initialize the connector.
 * @function
 */
async function init() {
  client = await Dirt.create(dirtConfiguration);
}

/**
 * Get the registries.
 * @function
 * @returns {[registry]} - List of registries
 */
async function getRegistries() {
  const registryDescriptors = [];

  // TODO: assuming this cannot be set once
  const eumerator = client.Root.getEnumerator();

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
      vote_style: voteStyle,
      timestamp: parseInt(timestamp, 10),
      date: new Date(timestamp * 1000).toUTCString(),
    });
  }

  return registryDescriptors;
}

/**
 * Get items for a given registry.
 * @function
 * @param {registryAddress} address for the registry
 * @returns {[registry]} List of items
 */
async function getRegistryItems(registryAddress) {
  const itemDescriptors = [];

  const registry = await client.getRegistryAtAddress(registryAddress, REGISTRY_DEFAULT_TYPE);
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
      blockHistory,
      timestamp: parseInt(timestamp, 10),
      date: new Date(timestamp * 1000).toUTCString(),
      stake: stake.toString(),
    });
  }

  return itemDescriptors;
}

module.exports = {
  init,
  getRegistries,
  getRegistryItems,
};
