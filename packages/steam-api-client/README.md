# @evlmaistrenko/tools-steam-api-client

[![NPM Version](https://img.shields.io/npm/v/%40evlmaistrenko%2Ftools-steam-api-client)](https://www.npmjs.com/package/@evlmaistrenko/tools-steam-api-client)

[Steam API](https://steamcommunity.com/dev) client for Javascript.

## Usage

```bash
npm i @evlmaistrenko/tools-steam-api-client
```

```javascript
import { SteamApiClient } from "@evlmaistrenko/tools-steam-api-client";

const client = new SteamApiClient("<your Steam API key>");

// Get user statistics:
await client.ISteamUserStats.GetUserStatsForGame(440, "<users SteamID>");

// Get statistics in Dead by Daylight:
await client.deadByDaylight.userStats("<users SteamID>");
```

## Api docs

See [here](./docs/README.md).
