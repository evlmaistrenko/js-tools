[**@evlmaistrenko/tools-steam-api-client**](../../../README.md)

---

[@evlmaistrenko/tools-steam-api-client](../../../README.md) / [user](../README.md) / PlayerSummaries

# Type Alias: PlayerSummaries

> **PlayerSummaries**: `object`

## Type declaration

### avatar

> **avatar**: `string`

The full URL of the player's 32x32px avatar. If the user hasn't configured an avatar, this will be
the default ? avatar.

### avatarfull

> **avatarfull**: `string`

The full URL of the player's 184x184px avatar. If the user hasn't configured an avatar, this will be
the default ? avatar.

### avatarhash

> **avatarhash**: `string`

### avatarmedium

> **avatarmedium**: `string`

The full URL of the player's 64x64px avatar. If the user hasn't configured an avatar, this will be
the default ? avatar.

### ~~cityid?~~

> `optional` **cityid**: `unknown`

This value will be removed in a future update (see loccityid)

#### Deprecated

### commentpermission?

> `optional` **commentpermission**: `1`

If set, indicates the profile allows public comments.

### communityvisibilitystate

> **communityvisibilitystate**: `1` \| `3`

This represents whether the profile is visible or not, and if it is visible, why you are allowed to
see it. Note that because this WebAPI does not use authentication, there are only two possible
values returned: 1 - the profile is not visible to you (Private, Friends Only, etc), 3 - the profile
is "Public", and the data is visible. Mike Blaszczak's post on Steam forums says, "The community
visibility state this API returns is different than the privacy state. It's the effective visibility
state from the account making the request to the account being viewed given the requesting account's
relationship to the viewed account."

### gameextrainfo?

> `optional` **gameextrainfo**: `string`

If the user is currently in-game, this will be the name of the game they are playing. This may be
the name of a non-Steam game shortcut.

### gameid?

> `optional` **gameid**: `number`

If the user is currently in-game, this value will be returned and set to the gameid of that game.

### gameserverip?

> `optional` **gameserverip**: `string`

The ip and port of the game server the user is currently playing on, if they are playing on-line in
a game using Steam matchmaking. Otherwise will be set to "0.0.0.0:0".

### lastlogoff

> **lastlogoff**: `number`

The last time the user was online, in unix time.

### loccityid?

> `optional` **loccityid**: `number`

- An internal code indicating the user's city of residence. A future update will provide this data in
  a more useful way.
- Steam_location gem/package makes player location data readable for output.
- - An updated readable list can be found at quer's steam location
- Getting locstatecode and loccityid, can now be done from
  https://steamcommunity.com/actions/QueryLocations/<loccountrycode>/<locstatecode>/

### loccountrycode?

> `optional` **loccountrycode**: `string`

If set on the user's Steam Community profile, The user's country of residence, 2-character ISO
country code

### locstatecode?

> `optional` **locstatecode**: `string`

If set on the user's Steam Community profile, The user's state of residence

### personaname

> **personaname**: `string`

The player's persona name (display name)

### personastate

> **personastate**: `0` \| `1` \| `2` \| `3` \| `4` \| `5` \| `6`

The user's current status. 0 - Offline, 1 - Online, 2 - Busy, 3 - Away, 4 - Snooze, 5 - looking to
trade, 6 - looking to play. If the player's profile is private, this will always be "0", except is
the user has set their status to looking to trade or looking to play, because a bug makes those
status appear even if the profile is private.

### personastateflags?

> `optional` **personastateflags**: `unknown`

### primaryclanid?

> `optional` **primaryclanid**: `string`

The player's primary group, as configured in their Steam Community profile.

### profilestate?

> `optional` **profilestate**: `1`

If set, indicates the user has a community profile configured (will be set to '1')

### profileurl

> **profileurl**: `string`

The full URL of the player's Steam Community profile.

### realname?

> `optional` **realname**: `string`

The player's "Real Name", if they have set it.

### steamid

> **steamid**: `string`

64bit SteamID of the user

### timecreated?

> `optional` **timecreated**: `number`

The time the player's account was created.
