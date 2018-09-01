// Libraries
require('dotenv').config();
const debug = require('debug')('dirt:research:enum');

// Dirt Libraries
const {Dirt} = require('@dirt/lib');

// Configuration
const {ROOT_ADDRESS: rootAddress, INFURA_ENDPOINT: endpoint} = process.env;

// Dirt client configuration
const dirtConfiguration = {
  rootAddress,
  trace: false,
  web3: {
    endpoint,
  },
};

process.on('exit', () => console.timeEnd('enum')); // eslint-disable-line

const exec = async () => {
  console.time('enum'); // eslint-disable-line

  debug(`creating the Dirt client`);
  const client = await Dirt.create(dirtConfiguration);
  debug(`done creating the Dirt client`);

  debug(`getting registry information`);
  const registryDescriptors = [];
  const eumerator = client.Root.getEnumerator();
  while (await eumerator.next()) { // eslint-disable-line
    const registryDescriptor = eumerator.current;
    const {
      name,
      address,
      // vote_style: voteStyle,
      // timestamp,
    } = registryDescriptor;

    debug(`registry descriptor: ${name} {${address}}`);
    registryDescriptors.push(registryDescriptor);
  }
  debug(`done getting registry information`);

  debug(`getting the registries`);
  const registries = await Promise.all(
    registryDescriptors.map(
      descriptor => client.getRegistryAtAddress(descriptor.address, 'ChallengeableRegistry'),
    ),
  );
  debug(`done getting the registries`);

  debug(`getting the registry items`);
  registries.forEach(async (registry) => {
    const {name} = registry;
    const registryEumerator = registry.getEnumerator();

    while (await registryEumerator.next()) { // eslint-disable-line
      const itemDescriptor = registryEumerator.current;
      const {
        key,
        // owner,
        value,
        // blockHistory,
        // timestamp,
        // stake,
      } = itemDescriptor;
      debug(`registry ${name} Item ${key}:${value}}`);
    }
  });
};

const guard = async (callback) => {
  try {
    await callback();
  } catch (error) {
    console.log(error); // eslint-disable-line
  }
};

guard(async () => exec());
