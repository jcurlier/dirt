// Libraries
const debug = require('debug')('dirt:api:connectors:providercache');

/**
 * Cache for the provider payload/result.
 * @class
 */
class ProviderCache {

  /**
   * Constructor for the ProviderCache.
   * @constructor
   */
  constructor() {
    this.cache = {};
  }

  /**
   * Build the cache key.
   * @param {object} payload
   * @returns {string} cache key
   */
  buildKey(payload) {
    const {method, params} = payload;
    return `${method}-${JSON.stringify(params)}`;
  }

  /**
   * Returns the cache entry for the payload.
   * @param {object} payload
   * @returns {string} result (null when no cache)
   */
  get(payload) {
    const {id} = payload;
    const key = this.buildKey(payload);

    if (this.cache[key]) {
      debug(`using cached (memory-cache) for ${key}`);
      return {
        jsonrpc: '2.0',
        id, // ensure to put the id of the payload in the result
        result: this.cache[key],
      };
    }

    debug(`no cache for ${key}`);
    return null;
  }

  /**
   * Sets a cache entry.
   * @param {object} payload
   * @returns {string} result (null when no cache)
   */
  set(payload, response) {
    const {method} = payload;
    const {result} = response;
    const key = this.buildKey(payload);

    if (method === 'net_version' || method === 'eth_getCode') {
      debug(`adding cache entry for ${key}`);
      this.cache[key] = result;
    }
  }

}

module.exports = new ProviderCache();
