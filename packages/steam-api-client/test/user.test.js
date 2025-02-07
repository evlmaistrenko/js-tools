import "dotenv/config"

import * as assert from "node:assert"
import { before, describe, it } from "node:test"

import { SteamApiClient, openId } from "@evlmaistrenko/tools-steam-api-client"

describe("User", () => {
	/** @type {import("@evlmaistrenko/tools-steam-api-client").SteamApiClient} */
	let client

	before(() => {
		client = new SteamApiClient(process.env.STEAM_API_CLIENT_KEY ?? "")
	})

	describe("#GetPlayerSummaries", () => {
		it("Returns user profile", async () => {
			const { response } = await client.user.GetPlayerSummaries(
				await openId.getSteamId(
					process.env.STEAM_API_CLIENT_SIGNED_URL ?? "",
					false,
				),
			)
			assert.strictEqual(typeof response.players[0].personaname, "string")
		})
	})
})
