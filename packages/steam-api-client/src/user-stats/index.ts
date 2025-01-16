import { ResponseError } from "@evlmaistrenko/tools-fetch"

import type { SteamApiClient } from "../index.js"
import { UserStatsForGame } from "./user-stats-for-game.js"

export class UserStats {
	constructor(private readonly client: SteamApiClient) {}

	GetUserStatsForGame(
		appid: number,
		steamid: string,
		version = "v0002",
	): Promise<{
		playerstats: UserStatsForGame
	}> {
		return fetch(
			`https://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/${version}/?appid=${appid}&key=${this.client.key}&steamid=${steamid}`,
		)
			.then((response) => ResponseError.check(response))
			.then((response) => response.json())
	}
}

export { UserStatsForGame }
