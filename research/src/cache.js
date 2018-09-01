/*
 * simple provide cache for research
 */

// Libraries
const {contracts: {RootRegistry}} = require('@dirt/contracts');

const {ROOT_ADDRESS: rootAddress} = process.env;

// cache
const contractCodeCache = {
  [rootAddress]: RootRegistry.deployedBytecode,
};

// getter for
function get(payload) {
  const {id, method, params} = payload;

  if (method === 'net_version') {
    return {
      jsonrpc: '2.0',
      id,
      result: '3',
    };
  }

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
