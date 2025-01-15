import { DeadByDaylight } from "./dead-by-daylight/index.js"
import { UserStats } from "./user-stats.js"

export class SteamApiClient {
	constructor(readonly key: string) {}

	get ISteamUserStats(): UserStats {
		return new UserStats(this)
	}

	get deadByDaylight(): DeadByDaylight {
		return new DeadByDaylight(this)
	}
}

export * as DeadByDaylight from "./dead-by-daylight/index.js"

export { UserStats }
