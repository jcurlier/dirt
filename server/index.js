// Libraries
require('dotenv').config();

// Dirt
const dirtConnector = require('./dirt.js');
const app = require('./app');

const port = process.env.PORT || 3001;

dirtConnector.init().then(() => {
  app.listen(port, () => {
    console.log(`Web server listening on port ${port}...`); // eslint-disable-line
  });
});
