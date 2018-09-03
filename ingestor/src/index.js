/**
 * Ingestor.
 * This is a prelimiary implementation of a full replace.
 * @module
 */

// Libraries
require('dotenv').config();
const debug = require('debug')('dirt:ingestor');

// Dirt Libraries
const database = require('./database/postgresConnector');
const dirt = require('./blockchain/dirtConnector');

process.on('exit', () => console.timeEnd('ingestor')); // eslint-disable-line

const exec = async () => {
  console.time('ingestor'); // eslint-disable-line

  debug(`creating the Dirt client`);
  await dirt.init();
  debug(`done creating the Dirt client`);

  debug(`clearing the database`);
  await database.execute(`DELETE FROM registries`);
  await database.execute(`DELETE FROM items`);

  debug(`getting registies information`);
  const registryDescriptors = await dirt.getRegistries();
  registryDescriptors.forEach(async (registryDescriptor) => {
    const {
      name,
      address,
      votestyle,
      date,
    } = registryDescriptor;
    debug(`registry descriptor: ${name} {${address}}`);

    // eslint-disable-next-line
    await database.execute(`
      INSERT INTO registries (address, name, votestyle, date)
      VALUES ($1, $2, $3, $4)
    `,
    [
      address,
      name,
      votestyle,
      date,
    ]);

    const registryItems = await dirt.getRegistryItems(address);
    registryItems.forEach(async (registryItem) => {
      const {
        key,
        value,
        owner,
        blockhistory,
        date: itemDate,
        stake,
      } = registryItem;
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
        blockhistory,
        itemDate,
        stake.toString(),
        address,
      ]);
    });
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
