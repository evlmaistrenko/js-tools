[**@evlmaistrenko/tools-steam-api-client**](../../../README.md)

---

[@evlmaistrenko/tools-steam-api-client](../../../README.md) / [userStats](../README.md) / UserStats

# Class: UserStats

## Constructors

### new UserStats()

> **new UserStats**(`client`): [`UserStats`](UserStats.md)

#### Parameters

##### client

[`SteamApiClient`](../../../classes/SteamApiClient.md)

#### Returns

[`UserStats`](UserStats.md)

## Methods

### GetUserStatsForGame()

> **GetUserStatsForGame**(`appid`, `steamid`, `version`): `Promise`\<\{ `playerstats`: [`UserStatsForGame`](../type-aliases/UserStatsForGame.md); \}\>

#### Parameters

##### appid

`number`

##### steamid

`string`

##### version

`string` = `"v0002"`

#### Returns

`Promise`\<\{ `playerstats`: [`UserStatsForGame`](../type-aliases/UserStatsForGame.md); \}\>
