// Libraries
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const compression = require('compression');
const helmet = require('helmet');
const apicache = require('apicache');

// Dirt
const registryService = require('./services/registry.js');

const cache = apicache
  .options({
    enabled: true,
    statusCodes: {
      include: [200],
    },
  })
  .middleware;

const started = Date.now();

// Middlewares
const app = express();
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('tiny'));
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


app.get('/registries', cache('1 hour'), async (req, res) => {
  const registries = await registryService.getRegistries();
  res.json(registries);
});

app.get('/registries/:registry_address', cache('10 minutes'), async (req, res) => {
  const {registry_address: registryAddress} = req.params;
  const registry = await registryService.getRegistryItems(registryAddress);
  res.json(registry);
});

module.exports = app;
