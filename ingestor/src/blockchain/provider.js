// Libraries
const Web3 = require('web3');
const debug = require('debug')('dirt:api:connectors:provider');

const providerCache = require('./providerCache');

// Overwrite sendAsSync
const {HttpProvider} = Web3.providers;
HttpProvider.prototype.sendAsync = new Proxy(HttpProvider.prototype.sendAsync, {
  apply(target, thisArg, argumentsList) {
    const [payload, callback] = argumentsList;

    const cache = providerCache.get(payload);
    if (cache) {
      callback(null, cache);
      return;
    }

    debug('request:', payload);
    Reflect.apply(target, thisArg, [
      payload,
      (error, response) => {
        debug('response:', response);
        providerCache.set(payload, response);
        return callback(error, response);
      },
    ]);
  },
});

const {INFURA_ENDPOINT: endpoint} = process.env;
const provider = new Web3.providers.HttpProvider(endpoint);

module.exports = provider;
