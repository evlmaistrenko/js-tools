[**@evlmaistrenko/tools-steam-api-client**](../README.md)

---

[@evlmaistrenko/tools-steam-api-client](../README.md) / UserStats

# Class: UserStats

## Constructors

### new UserStats()

> **new UserStats**(`client`): [`UserStats`](UserStats.md)

#### Parameters

##### client

[`SteamApiClient`](SteamApiClient.md)

#### Returns

[`UserStats`](UserStats.md)

## Methods

### GetUserStatsForGame()

> **GetUserStatsForGame**(`appid`, `steamid`): `Promise`\<\{ `playerstats`: \{ `achievements`: `object`[]; `gameName`: `string`; `stats`: `object`[]; `steamID`: `string`; \}; \}\>

#### Parameters

##### appid

`number`

##### steamid

`string`

#### Returns

`Promise`\<\{ `playerstats`: \{ `achievements`: `object`[]; `gameName`: `string`; `stats`: `object`[]; `steamID`: `string`; \}; \}\>
