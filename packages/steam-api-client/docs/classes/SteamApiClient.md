[**@evlmaistrenko/tools-steam-api-client**](../README.md)

---

[@evlmaistrenko/tools-steam-api-client](../README.md) / SteamApiClient

# Class: SteamApiClient

Typed Steam API client

## See

[Steam API](https://steamcommunity.com/dev)

## Constructors

### new SteamApiClient()

> **new SteamApiClient**(`key`): [`SteamApiClient`](SteamApiClient.md)

#### Parameters

##### key

`string`

#### Returns

[`SteamApiClient`](SteamApiClient.md)

## Properties

### key

> `readonly` **key**: `string`

## Accessors

### deadByDaylight

#### Get Signature

> **get** **deadByDaylight**(): [`DeadByDaylight`](../namespaces/deadByDaylight/classes/DeadByDaylight.md)

Shorthands for [Dead by Daylight](https://deadbydaylight.com/)

##### Returns

[`DeadByDaylight`](../namespaces/deadByDaylight/classes/DeadByDaylight.md)

---

### ISteamUser

#### Get Signature

> **get** **ISteamUser**(): [`User`](../namespaces/user/classes/User.md)

Information about user

##### Since

1.2.0

##### Returns

[`User`](../namespaces/user/classes/User.md)

---

### ISteamUserStats

#### Get Signature

> **get** **ISteamUserStats**(): [`UserStats`](../namespaces/userStats/classes/UserStats.md)

Users statistics

##### Returns

[`UserStats`](../namespaces/userStats/classes/UserStats.md)

---

### user

#### Get Signature

> **get** **user**(): [`User`](../namespaces/user/classes/User.md)

Alias for `ISteamUser`

##### Since

1.1.0

##### Returns

[`User`](../namespaces/user/classes/User.md)

---

### userStats

#### Get Signature

> **get** **userStats**(): [`UserStats`](../namespaces/userStats/classes/UserStats.md)

Alias for `ISteamUserStats`

##### Since

1.1.0

##### Returns

[`UserStats`](../namespaces/userStats/classes/UserStats.md)
