/*
 * simple provide cache for research
 */

// Libraries
const debug = require('debug')('dirt:api:connectors:providerCache');

// cache
const cache = {};

// getter for the cache
function get(payload) {
  const {id, method, params} = payload;

  const key = `${method}-${JSON.stringify(params)}`;

  if (cache[key]) {
    debug(`Using cache for ${key}`);
    return {
      jsonrpc: '2.0',
      id,
      result: cache[key],
    };
  }

  debug(`No cache for ${key}`);
  return null;
}

// setter for the cache
function set(payload, response) {
  const {method, params} = payload;
  const {result} = response;

  const key = `${method}-${JSON.stringify(params)}`;

  if (method === 'net_version' || method === 'eth_getCode') {
    debug(`Caching ${key}`);
    cache[key] = result;
  }
}

module.exports = {
  get,
  set,
};
