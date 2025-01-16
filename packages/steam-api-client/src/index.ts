import { DeadByDaylight } from "./dead-by-daylight/index.js"
import { UserStats } from "./user-stats/index.js"
import { User } from "./user/index.js"

/**
 * Typed Steam API client
 *
 * @see [Steam API](https://steamcommunity.com/dev)
 */
export class SteamApiClient {
	constructor(readonly key: string) {}

	/**
	 * Information about user
	 *
	 * @since 1.1.0
	 */
	get user(): User {
		return new User(this)
	}

	/** Users statistics */
	get ISteamUserStats(): UserStats {
		return new UserStats(this)
	}

	/** Shorthands for [Dead by Daylight](https://deadbydaylight.com/) */
	get deadByDaylight(): DeadByDaylight {
		return new DeadByDaylight(this)
	}
}

export * as deadByDaylight from "./dead-by-daylight/index.js"
export * as user from "./user/index.js"
export * as userStats from "./user-stats/index.js"
