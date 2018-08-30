// Libraries
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const compression = require('compression');
const helmet = require('helmet');

// Dirt
const registryService = require('./registry.js');

const started = Date.now();

// Middlewares
const app = express();
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('common'));
}
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

module.exports = app;
