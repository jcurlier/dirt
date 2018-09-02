/**
 * Test cache module for the quick test.
 * @module
 */

// Libraries
const {contracts: {RootRegistry}} = require('@dirt/contracts');

const {ROOT_ADDRESS: rootAddress} = process.env;

// contract cache (put the code)
const contractCodeCache = {
  [rootAddress]: RootRegistry.deployedBytecode,
};

// getter for the cache
function get(payload) {
  const {id, method, params} = payload;

  // net version is always the same?
  if (method === 'net_version') {
    return {
      jsonrpc: '2.0',
      id,
      result: '3',
    };
  }

  // code is always the same?
  if (method === 'eth_getCode') {
    const [address] = params;
    if (contractCodeCache[address]) {
      return {
        jsonrpc: '2.0',
        id,
        result: contractCodeCache[address],
      };
    }
  }

  return null;
}

module.exports = {
  get,
};
