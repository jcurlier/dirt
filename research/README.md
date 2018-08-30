# Research

## Discovery

### Installation

1. `npm install`
2. Set up `.env` (See `.env.sample`)

**Note**: To make it easier to read the log, removed the `console.log` statement from `StaticContractProvider.prototype.get` inside `@dirt/lib`.

### Object models

#### Dirt Client

##### Methods

Method | Description
---- | ----
getRegistryAtAddress |
getContract |
defaultAccount |
load |

##### Properties

Method | Description
---- | ----
configuration |
context |
web3 |
trace |
Root |
Parameters | 
Token |

#### Root Registry

##### Methods

Method | Description
---- | ----
count |
create |
getEnumerator |
has |
init |
item |
itemAtIndex |
unpack |

##### Properties

Property | Description
---- | ----
context |
config |
errorAddresses |
errorSources |
instance |
trace |
addresses |
address |
name |

#### Registry Descriptor

##### Properties

Property | Description
---- | ----
`name` | Example: `'Cryptocurrency Addresses`
`address` | Example: `0xc287b15ba2147d86a98fcbbf13afc874beff3d9e`
`vote_style` | Example: `PUBLIC`
`timestamp` | 

##### Registry Type

- `StakableRegistry`
- `SimpleRegistry`
- `ChallengeableRegistry`

#### Registry

##### Properties

Property | Description
---- | ----
address |
config |
context |
instance |
name |
minimumStake |
trace |

##### Methods

Method | Description
---- | ----
depositBalanceOf |
init |
addItem |
count |
deleteItem |
editItem |
getEnumerator |
has |
item |
itemAtIndex |
unpack |

#### Stakable Registry Item

##### Properties

Property | Description
---- | ----
`origin` |
`key` |
`owner` |
`value` | 
`blockHistory` | 
`timestamp` | 
`TokenValue` | 

### Performance

Action | Time
---- | ----
Create Client | 6s
Get registry descriptor | >500ms each
Get registries | >1s for both
Get registry item | >500ms each
