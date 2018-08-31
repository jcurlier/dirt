# Dirt Registry Service

## Running the Web server

1. Get an Infura API key at [infura.io](infura.io).

2. Set the environment variables

Variable | Description
---- | ----
NODE_ENV | Node environment (for example `development`, `test` or `production`)
INFURA_ENDPOINT | Ropsen Infura endpoint (for example `https://ropsten.infura.io/v3/cc....` (required)
ROOT_ADDRESS | Dirt root address, for example `0xDb1E8F93854cbC9272dA69544Fc62E5d4511c7D1` (required)
PORT | For example, `3001` (default to `3001`)

3. Run docker compose

`docker-compose up --build`

4. Connect to the `api`, default [http://localhost/:3001/](http://localhost/:3001/)

*Tip*: You can use the Insomnia [workspace](./tools/insomnia)

## To Do

### Open

ID | Description
---- | ----
1 | Should the item endpoint be `/registries/:id/items`?
2 | The HTTP provider is [deprecated](https://web3js.readthedocs.io/en/1.0/web3.html#value), as it won’t work for subscriptions.
3 | Productionize (Error Handling, Logging, etc.)

### Closed

ID | Description
---- | ----
1 | `itemAtIndex` would be faster than `Async` enumerator, it doesn't seem to be the recommended `API` (it might also create some issue of concurrency) - *keep using `Enumerator`*
2 | Is the `name` for the `registry` returning the `address`? `fixed in a new release`
3 | How to know which type a registry is, currently assuming `StackableRegistry`? *Use `ChallengeableRegistry`*

