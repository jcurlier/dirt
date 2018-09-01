// Libraries
require('dotenv').config();
const Web3 = require('web3');
const debug = require('debug')('dirt:ingestor');

// Dirt Libraries
const {Dirt} = require('@dirt/lib');
const database = require('./database');
const provider = require('./provider');

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

process.on('exit', () => console.timeEnd('ingestor')); // eslint-disable-line

const exec = async () => {
  console.time('ingestor'); // eslint-disable-line

  debug(`creating the Dirt client`);
  const client = await Dirt.create(dirtConfiguration);
  debug(`done creating the Dirt client`);

  await database.execute(`DELETE FROM registries`);
  await database.execute(`DELETE FROM items`);

  debug(`getting registry information`);
  const registryDescriptors = [];
  const eumerator = client.Root.getEnumerator();
  while (await eumerator.next()) { // eslint-disable-line
    const registryDescriptor = eumerator.current;
    const {
      name,
      address,
      vote_style: voteStyle,
      timestamp,
    } = registryDescriptor;

    debug(`registry descriptor: ${name} {${address}}`);
    registryDescriptors.push(registryDescriptor);

    // eslint-disable-next-line
    await database.execute(`
      INSERT INTO registries (address, name, votestyle, date)
      VALUES ($1, $2, $3, $4)
    `,
    [
      address,
      name,
      voteStyle,
      new Date(timestamp * 1000),
    ]);
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
    const {name, address} = registry;
    const registryEumerator = registry.getEnumerator();

    while (await registryEumerator.next()) { // eslint-disable-line
      const itemDescriptor = registryEumerator.current;
      const {
        key,
        value,
        owner,
        blockHistory,
        timestamp,
        stake,
      } = itemDescriptor;
      debug(`registry ${name} Item ${key}:${value}}`);

      // eslint-disable-next-line
      await database.execute(`
        INSERT INTO items (key, value, owner, blockHistory, date, stake, registryaddress)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
      `,
      [
        key,
        value,
        owner,
        blockHistory,
        new Date(timestamp * 1000),
        stake.toString(),
        address,
      ]);
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
