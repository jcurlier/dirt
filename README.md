# Dirt Registry Service

## Running the Web server

1. Set the environment variables

Variable | Description
---- | ----
NODE_ENV | Node environment (for example `development`, `test` or `production`)
INFURA_ENDPOINT | Ropsen Infura endpoint (for example `https://ropsten.infura.io/v3/cc....` (required)
ROOT_ADDRESS | Dirt root address, for example `0xDb1E8F93854cbC9272dA69544Fc62E5d4511c7D1` (required)
PORT | For example, `3001` (default to `3001`)


Action | Time
---- | ----
Server initialization | 6s
Get registries | 3s for 2 registries
Get registry items | > 7s for 10 items

## Performance

Action | Time
---- | ----
Server initialization | 6s
Get registries | 3s for 2 registries
Get registry items | > 7s for 10 items

## Caching strategy

- Browser (ETag, etc.)
- Service
- Connector

## To Do

ID | Description
---- | ----
1 | Should the item endpoint be `/registries/:id/items`?
2 | `itemAtIndex` would be faster than `Async` enumerator, it doesn't seem to be the recommended `API` (it might also create some issue of concurrency)
3 | Is the name for the `registry` returning the `address`?
4 | How to know which type a registry is, currently assuming `StackableRegistry`?
5 | Productinize (Error Handling, Logging, etc.)

