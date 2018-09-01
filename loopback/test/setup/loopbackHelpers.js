// Test helpers.
const loopbackApp = async () => new Promise((resolve) => {
  // get a new Loopback server / application.
  const server = require('../../server/server'); // eslint-disable-line

  // listen for the Loopback `booted` event for the server.
  server.on('booted', () => {
    resolve(server);
  });
});

// Set globals.
global.loopbackApp = loopbackApp;
