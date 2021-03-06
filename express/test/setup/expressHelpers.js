// Libraries
require('dotenv').config();

// Dirt
const app = require('../../server/app');
const dirtConnector = require('../../server/connectors/dirtConnector.js');

// Test helpers.
const expressApp = async () => {
  await dirtConnector.init();
  return app;
};

// Set globals.
global.expressApp = expressApp;
