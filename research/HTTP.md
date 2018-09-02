# HTTP Log Discovery

## Actions

### Create Dirt client

ID | Method | Parameters | Response
---- | ---- | ---- | ----
1 | `net_version` | | 3
2 | `eth_getCode` | `0xDb1E8F93854cbC9272dA69544Fc62E5d4511c7D1` | `0x6080604052...`
3 | `net_version` | | 3
4 | `eth_call` | `{"to":"0xDb1E8F93854cbC9272dA69544Fc62E5d4511c7D1","data":"0xfa721d32"}` | `"0x000000000000000000000000fcc43e885f832d56f054ac4fc5dd2847402079df`
5 | `net_version` | | 3
6 | `eth_getCode` | `0xfcc43e885f832d56f054ac4fc5dd2847402079df` | `0x6080604052600...`
7 | `net_version` | | 3
8 | `eth_call` | `{"to":"0xfcc43e885f832d56f054ac4fc5dd2847402079df","data":"0x791b6d6000..."}` | `"0x000000000000000000000000c083dbcc3f92d43fff0437ae58291514807b0a71`
9 | `net_version` | | 3
10 | `eth_getCode` | `0xc083dbcc3f92d43fff0437ae58291514807b0a71` | `0x6080604052600436106100f05763ff...`
11 | `net_version` | | 3
12 | `eth_call` | `{"to":"0xc083dbcc3f92d43fff0437ae58291514807b0a71","data":"0x06fdde03"}` | `"0x000000000...`
13 | `net_version` | | 3
14 | `eth_call` | `{"to":"0xc083dbcc3f92d43fff0437ae58291514807b0a71","data":"0x95d89b41"}` | `"0x000000000...`
15 | `net_version` | | 3
16 | `eth_call` | `{"to":"0xc083dbcc3f92d43fff0437ae58291514807b0a71","data":"0x313ce567"}` | `"0x000000000...`
17 | `net_version` | | 3
18 | `eth_call` | `{"to":"0xc083dbcc3f92d43fff0437ae58291514807b0a71","data":"0x18160ddd"}` | `"0x000000000...`

### Getting registry descriptor

ID | Method | Parameters | Response
---- | ---- | ---- | ----
19 | `net_version` | | 3
20 | `eth_call` | `{"to":"0xDb1E8F93854cbC9272dA69544Fc62E5d4511c7D1","data":"0x7749cf23"}` | `"0x000000000...`
21 | `net_version` | | 3
22 | `eth_call` | `{"to":"0xDb1E8F93854cbC9272dA69544Fc62E5d4511c7D1","data":"0x1b26aafd0000000000000000000000000000000000000000000000000000000000000000"}` | `"0x000000000...`
23 | `net_version` | | 3
24 | `eth_call` | `{"to":"0xDb1E8F93854cbC9272dA69544Fc62E5d4511c7D1","data":"0x1b26aafd0000000000000000000000000000000000000000000000000000000000000001"}` | `"0x000000000...`

### Getting registry

ID | Method | Parameters | Response
---- | ---- | ---- | ----
25 | `net_version` | | 3
26 | `eth_getCode` | `0xc287b15ba2147d86a98fcbbf13afc874beff3d9e` | `x6080604052600436106100ed5763....`
27 | `net_version` | | 3
28 | `eth_call` | `{"to":"0xc287b15ba2147d86a98fcbbf13afc874beff3d9e","data":"0xa8d6e68e"}` | `0x000000000000000....`
29 | `net_version` | | 3
30 | `eth_getCode` | `0x0c09614c65251147262c1c6827cd48db5ed423c1` | `0x6080604052600436106....`
31 | `net_version` | | 3
32 | `eth_call` | `{"to":"0x0c09614c65251147262c1c6827cd48db5ed423c1","data":"0xa8d6e68e"}` | `0x000000000000000....`

### Get enumerators

Only one item: `Registry:0xc287b15ba2147d86a98fcbbf13afc874beff3d9e Item:OmiseGO:0xd26114cd6EE289AccF82350c8d8487fedB8A0C07}`

ID | Method | Parameters | Response
---- | ---- | ---- | ----
33 | `net_version` | | 3
34 | `net_version` | | 3
35 | `eth_call` | `{"to":"0xc287b15ba2147d86a98fcbbf13afc874beff3d9e","data":"0x7749cf23"}` | `0x00000000000000000000...`
36 | `eth_call` | `{"to":"0x0c09614c65251147262c1c6827cd48db5ed423c1","data":"0x7749cf23"}` | `0x00000000000...`

### Getting registry item

Only one item: `Registry:0xc287b15ba2147d86a98fcbbf13afc874beff3d9e Item:OmiseGO:0xd26114cd6EE289AccF82350c8d8487fedB8A0C07}`

37 | `net_version` | | 3
38 | `eth_call` | `{"to":"0xc287b15ba2147d86a98fcbbf13afc874beff3d9e","data":"0x2c9c5e5e0000000000000000000000000000000000000000000000000000000000000000"}` | `0x0000000000000000...`

## API Description

Name | Description
---- | ----
[net_version](https://infura.io/docs/api/get/net_version) | Returns the current network id.
[eth_call](https://infura.io/docs/api/post/eth_call) | Executes a new message call immediately without creating a transaction on the block chain.
[eth_getCode](https://infura.io/docs/api/get/eth_getCode) | Returns code at a given address.
