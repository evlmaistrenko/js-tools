export type UserStatsForGame = {
	steamID: string
	gameName: string
	stats: { name: string; value: number }[]
	achievements: { name: string; achieved: 0 | 1 }[]
}
