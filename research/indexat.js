// Libraries
require('dotenv').config();
const debug = require('debug')('dirt:research:indexat');

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

process.on('exit', () => console.timeEnd('indexat')); // eslint-disable-line

const exec = async () => {
  console.time('indexat'); // eslint-disable-line

  debug(`Creating the Dirt client`);
  const client = await Dirt.create(dirtConfiguration);
  debug(`Done creating the Dirt client`);

  debug(`Getting the registries`);
  const count = await client.Root.count();
  const registryPromises = [];
  for (let i = 0; i < count; i++) {
    registryPromises.push(client.Root.itemAtIndex(i));
  }

  const registryDescriptors = await Promise.all(registryPromises);
  registryDescriptors.forEach(
    ({name, address}) => debug(`Registry descriptor: ${name} {${address}}`),
  );
  debug(`Done getting the registries`);

  debug(`Getting the registry items`);
  const itemPromises = [];
  registryDescriptors.forEach((descriptor) => {
    return client.getRegistryAtAddress(descriptor.address, 'StakableRegistry')
      .then(async (registry) => {
        const itemsCount = await registry.count();
        for (let j = 0; j < itemsCount; j++) {
          itemPromises.push(registry.itemAtIndex(j).then(({key, value}) => {
            debug(`Registry ${descriptor.name} Item ${key}:${value}}`);
          }));
        }
      });
  });
  await Promise.all(itemPromises);
};

const guard = async (callback) => {
  try {
    await callback();
  } catch (error) {
    console.log(error); // eslint-disable-line
  }
};

guard(async () => exec());
