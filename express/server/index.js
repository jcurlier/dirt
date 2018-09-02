// Libraries
require('dotenv').config();

// Dirt Libraries
const dirtConnector = require('./connectors/dirtConnector.js');
const app = require('./app');

// Configuration
const port = process.env.PORT || 3001;

// Initializing the Dirt connector and then the server.
dirtConnector.init().then(() => {
  app.listen(port, () => {
    console.log(`Web server listening on port ${port}...`); // eslint-disable-line
  });
});
