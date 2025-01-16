import { ResponseError } from "@evlmaistrenko/tools-fetch"

import type { SteamApiClient } from "../index.js"
import { PlayerSummaries } from "./player-summaries.js"

export type PlayersSummaries = {
	response: {
		players: PlayerSummaries[]
	}
}

export class User {
	constructor(private readonly client: SteamApiClient) {}

	GetPlayerSummaries(
		steamids: string | string[],
		version = "v0002",
	): Promise<PlayersSummaries> {
		return fetch(
			`http://api.steampowered.com/ISteamUser/GetPlayerSummaries/${version}/?key=${this.client.key}&steamids=${[steamids].flat().join(",")}`,
		)
			.then((response) => ResponseError.check(response))
			.then((response) => response.json())
	}
}

export { PlayerSummaries }
