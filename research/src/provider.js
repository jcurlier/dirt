/**
 * Hook for the provider to cache.
 * @module
 */

// Libraries
const Web3 = require('web3');
const debug = require('debug')('dirt:research:provider');
const providerCache = require('./cache');

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
      (error, result) => {
        debug('response:', result);
        return callback(error, result);
      },
    ]);
  },
});

const {INFURA_ENDPOINT: endpoint} = process.env;
const provider = new Web3.providers.HttpProvider(endpoint);

module.exports = provider;
