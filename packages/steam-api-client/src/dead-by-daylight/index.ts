import type { SteamApiClient } from "../index.js"
import { UserStatsAchievements } from "./user-stats-achievements.js"
import { UserStats } from "./user-stats.js"

export type UserStatsAndAchievements = {
	stats: UserStats
	achievements: UserStatsAchievements
}

export class DeadByDaylight {
	readonly appid = 381210

	constructor(private readonly client: SteamApiClient) {}

	/**
	 * Reduces statistics
	 *
	 * @param steamid 64bit SteamID of the user
	 * @returns Reduced statistics and achievements
	 */
	async getUserStats(steamid: string): Promise<UserStatsAndAchievements> {
		const raw = await this.client.ISteamUserStats.GetUserStatsForGame(
			this.appid,
			steamid,
		)
		const stats = raw.playerstats.stats.reduce((stats, { name, value }) => {
			// @ts-expect-error TypeScript doesn't know the shape of stats
			stats[name] = value
			return stats
		}, {}) as UserStats
		const achievements = raw.playerstats.achievements.reduce(
			(achievements, { name, achieved }) => {
				// @ts-expect-error TypeScript doesn't know the shape of achievements
				achievements[name] = !!achieved
				return achievements
			},
			{},
		) as UserStatsAchievements
		return { stats, achievements }
	}
}

export { UserStats, UserStatsAchievements }
