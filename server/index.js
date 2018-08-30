// Libraries
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const compression = require('compression');
const helmet = require('helmet');

// Dirt
const dirtConnector = require('./dirt.js');
const registryService = require('./registry');

const port = process.env.PORT || 3001;
const started = Date.now();

// Middlewares
const app = express();
app.use(morgan('common'));
app.use(helmet());
app.use(cors());
app.use(compression());

// Routes
app.get('/', (req, res) => {
  const uptime = Date.now() - started;
  res.json({
    started,
    uptime,
  });
});


app.get('/registries', async (req, res) => {
  const registries = await registryService.getRegistries();
  res.json(registries);
});

app.get('/registries/:registry_address', async (req, res) => {
  const {registry_address: registryAddress} = req.params;
  const registry = await registryService.getRegistryItems(registryAddress);
  res.json(registry);
});

dirtConnector.init().then(() => {
  app.listen(port, () => {
    console.log(`Web server listening on port ${port}...`); // eslint-disable-line
  });
});

module.exports = app;
