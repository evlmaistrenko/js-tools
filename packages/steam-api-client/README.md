# @evlmaistrenko/tools-steam-api-client

[![NPM Version](https://img.shields.io/npm/v/%40evlmaistrenko%2Ftools-steam-api-client)](https://www.npmjs.com/package/@evlmaistrenko/tools-steam-api-client)

[Steam API](https://steamcommunity.com/dev) client for Javascript.

## Usage

```bash
npm i @evlmaistrenko/tools-steam-api-client
```

```javascript
import { SteamApiClient, openId } from "@evlmaistrenko/tools-steam-api-client";

const client = new SteamApiClient("<your Steam API key>");

// Get user statistics:
await client.ISteamUserStats.GetUserStatsForGame(440, "<users SteamID>");

// Get statistics in Dead by Daylight:
await client.deadByDaylight.getUserStats("<users SteamID>");

// Get url to sign via Steam OpenID:
const url = openid.getUrl("http://localhost:3000");

// Verify OpenID signature and get SteamID:
const steamId = await openId.getSteamUrl("<return url>");
```

## Api docs

- [Typedoc](https://evlmaistrenko.github.io/js-tools/steam-api-client/typedoc/)
- [CHANGELOG.md](./CHANGELOG.md)
