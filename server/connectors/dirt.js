/**
 * Dirt Connector.
 * @module
 */

// Libraries
const Web3 = require('web3');

// Dirt Libraries
const {Dirt} = require('@dirt/lib');
const provider = require('./provider');

// Configuration
const {ROOT_ADDRESS: rootAddress} = process.env;
const instance = new Web3(provider);

// Constants
const REGISTRY_DEFAULT_TYPE = 'ChallengeableRegistry';

// Dirt client configuration
const dirtConfiguration = {
  rootAddress,
  trace: false,
  web3: {
    instance,
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
