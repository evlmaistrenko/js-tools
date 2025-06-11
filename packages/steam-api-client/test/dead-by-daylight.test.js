import "dotenv/config"

import * as assert from "node:assert"
import { before, describe, it } from "node:test"

import { SteamApiClient, openId } from "@evlmaistrenko/tools-steam-api-client"

import { retry } from "./retry.js"

describe("Dead by Daylight", () => {
	/** @type {import("@evlmaistrenko/tools-steam-api-client").SteamApiClient} */
	let client

	before(() => {
		client = new SteamApiClient(process.env.STEAM_API_CLIENT_KEY ?? "")
	})

	describe("#getUserStats", () => {
		it(
			"Returns user statistics and achievements",
			retry(async () => {
				const { stats, achievements } =
					await client.deadByDaylight.getUserStats(
						await openId.getSteamId(
							process.env.STEAM_API_CLIENT_SIGNED_URL ?? "",
							false,
						),
					)
				assert.strictEqual(typeof stats.DBD_AllEscapeThroughHatch, "number")
				assert.strictEqual(typeof achievements.ACH_100_CHAINSAW, "boolean")
			}),
		)
	})
})
