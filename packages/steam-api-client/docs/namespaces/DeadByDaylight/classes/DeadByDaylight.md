[**@evlmaistrenko/tools-steam-api-client**](../../../README.md)

---

[@evlmaistrenko/tools-steam-api-client](../../../README.md) / [deadByDaylight](../README.md) / DeadByDaylight

# Class: DeadByDaylight

## Constructors

### new DeadByDaylight()

> **new DeadByDaylight**(`client`): [`DeadByDaylight`](DeadByDaylight.md)

#### Parameters

##### client

[`SteamApiClient`](../../../classes/SteamApiClient.md)

#### Returns

[`DeadByDaylight`](DeadByDaylight.md)

## Properties

### appid

> `readonly` **appid**: `381210` = `381210`

## Methods

### getUserStats()

> **getUserStats**(`steamid`): `Promise`\<[`UserStatsAndAchievements`](../type-aliases/UserStatsAndAchievements.md)\>

Reduces statistics

#### Parameters

##### steamid

`string`

64bit SteamID of the user

#### Returns

`Promise`\<[`UserStatsAndAchievements`](../type-aliases/UserStatsAndAchievements.md)\>

Reduced statistics and achievements
