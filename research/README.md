# Research

This is a playground to get the registries and the registry items; and to investigate with optimization options.

## Discovery

### Installation

1. `npm install`
2. Set up `.env` (See `.env.sample`)

**Note**: To make it easier to read the log, removed the `console.log` statement from `StaticContractProvider.prototype.get` inside `@dirt/lib`.

### Runnning the scripts

#### Base implementation

No cache, using enumerator.

`npm run enum`

Time: around 25s

#### Quicker implmentation

- using `itemAtIndex` with `Promise.all`
- static response for `net_version`
- static response for `RootRegistry` bytecode 

`npm run quick`

Time: around 6s

### Performance findings

#### Base

Action | Time
---- | ----
Create Client | 6s
Get registry descriptor | >500ms each
Get registries | >1s for both
Get registry item | >500ms each
