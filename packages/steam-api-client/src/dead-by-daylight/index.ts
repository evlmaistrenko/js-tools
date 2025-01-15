import type { SteamApiClient } from "../index.js"
import { UserStatsAchievements } from "./user-stats-achievements.js"
import { UserStats } from "./user-stats.js"

export class DeadByDaylight {
	readonly appid = 381210

	constructor(private readonly client: SteamApiClient) {}

	async getUserStats(steamid: string): Promise<{
		stats: UserStats
		achievements: UserStatsAchievements
	}> {
		const raw = await this.client.ISteamUserStats.GetUserStatsForGame(
			this.appid,
			steamid,
		)
		const stats = raw.playerstats.stats.reduce((stats, { name, value }) => {
			// @ts-ignore
			stats[name] = value
			return stats
		}, {}) as UserStats
		const achievements = raw.playerstats.achievements.reduce(
			(achievements, { name, achieved }) => {
				// @ts-ignore
				achievements[name] = !!achieved
				return achievements
			},
			{},
		) as UserStatsAchievements
		return { stats, achievements }
	}
}

export { UserStats, UserStatsAchievements }
