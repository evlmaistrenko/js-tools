import { DeadByDaylight } from "./dead-by-daylight/index.js"
import { UserStats } from "./user-stats/index.js"
import { User } from "./user/index.js"

/**
 * Steam API client
 *
 * @see [Steam API](https://steamcommunity.com/dev)
 */
export class SteamApiClient {
	constructor(readonly key: string) {}

	/**
	 * Information about user
	 *
	 * @since 1.2.0
	 */
	get ISteamUser(): User {
		return new User(this)
	}

	/**
	 * Alias for `ISteamUser`
	 *
	 * @since 1.1.0
	 */
	get user(): User {
		return this.ISteamUser
	}

	/** Users statistics */
	get ISteamUserStats(): UserStats {
		return new UserStats(this)
	}

	/**
	 * Alias for `ISteamUserStats`
	 *
	 * @since 1.1.0
	 */
	get userStats(): UserStats {
		return this.ISteamUserStats
	}

	/** Shorthands for [Dead by Daylight](https://deadbydaylight.com/) */
	get deadByDaylight(): DeadByDaylight {
		return new DeadByDaylight(this)
	}
}

export * as deadByDaylight from "./dead-by-daylight/index.js"
export * as openId from "./open-id.js"
export * as user from "./user/index.js"
export * as userStats from "./user-stats/index.js"
