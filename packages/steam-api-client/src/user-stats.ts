import { ResponseError } from "@evlmaistrenko/tools-fetch"

import type { SteamApiClient } from "./index.js"

export class UserStats {
	constructor(private readonly client: SteamApiClient) {}

	GetUserStatsForGame(
		appid: number,
		steamid: string,
	): Promise<{
		playerstats: {
			steamID: string
			gameName: string
			stats: { name: string; value: number }[]
			achievements: { name: string; achieved: 0 | 1 }[]
		}
	}> {
		return (
			fetch(
				`https://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=${appid}&key=${this.client.key}&steamid=${steamid}`,
			)
				// .then(ResponseError.check)
				.then((response) => response.json())
		)
	}
}
