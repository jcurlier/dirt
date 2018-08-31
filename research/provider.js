// Libraries
const Web3 = require('web3');
const debug = require('debug')('dirt:research:provider');

// Overwrite sendAsSync
const {HttpProvider} = Web3.providers;
HttpProvider.prototype.sendAsync = new Proxy(HttpProvider.prototype.sendAsync, {
  apply(target, thisArg, argumentsList) {
    const [payload, callback] = argumentsList;
    const {id, method} = payload;

    debug('request:', payload);

    if (method === 'net_version') {
      callback(null, {jsonrpc: '2.0', id, result: '3'});
      return;
    }

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

/*
{ jsonrpc: '2.0', id: 1, method: 'net_version', params: [] }
{ jsonrpc: '2.0', id: 1, result: '3' }
 */
