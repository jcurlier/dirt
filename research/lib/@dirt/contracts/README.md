# Entity Protocol Smart Contracts 

## Docs

 - [Smart Contracts](doc/contracts.md) - smart contract documeantion
 - [Contract flows](doc/flows.md) - breakdown on contract behavior.
 - [Challenge and voting procedure](doc/challenge.md) - detailed breakdown of current challenge / voting behavior.

##  TODOs

 - See [Upgrades](doc/upgrades.md)

## Development Environment Setup 

 ```sh
cd ./src
npm install

# Optional, to check your environment 
npm run compile
```
 
### Windows specific setup
If you want to run `truffle` directly (installed as a global package) you will need to edit your `PATH_EXT` environment variable and remove `.JS` from the list.

### Required tools

 - node.js v8.8.1 or later *(everything else will be installed vida `npm install`)*

### Recommended tools

 - [Visual Studio Code](http://code.visualstudio.com) - Sweet developer environment!
    - [Solidity Extension](https://marketplace.visualstudio.com/items?itemName=JuanBlanco.solidity) - Solidity language support (not perfect but better than nothing)
 - [Ganache](http://truffleframework.com/ganache/) - Local ethereum network with auto mining 

## Running Web UI
All UI code is under `src/ui`. `npm install` for initial setup. 

 - run `truffle develop --network local` from `./src` 
    - In truffle develop run `compile` followed by `migrate`. 
      - *NOTE:* If you have migration errors run `migrate --reset`
 - run `npm run start` from `./src/ui`
 - Open chrome @ http://localhost:3000


## Metamask 

Don't use metamask against local test net, it will hang on transactions. Right now web-ui is pointing to the test-rpc port directly. 

  - Add local testnet to metamask, Go to Settings -> New RPC URL -> and add  
     "http://localhost:9545"
  - Switch metamask to use this network 
  - From the output from `truffle develop` you will see private keys, import     the first (account 0) private key into metamask 
   - Switch to that account, and reload 'http://localhost:3000'
   - To validate you see the a token balance of *3,000,000*

## Running Tests 
All tests are in `src/tests`, each test targets to test a single contract but may use more than one. For abstract contracts, simple implementations with helper methods can be found under `contracts/test/`.

### Test RPC 
 - Run `npm run develop` in a separate command window
 - Run `npm run test`

 ### Ganache
  - Run ganache
  - run `npm run test_ganache` 