import "dotenv/config"

import * as assert from "node:assert"
import { describe, it } from "node:test"

import { openId } from "@evlmaistrenko/tools-steam-api-client"

describe("OpenID", () => {
	describe("getUrl", () => {
		it("Returns URL", () => {
			assert.strictEqual(
				openId.getUrl(
					"http://localhost:3000/",
					"http://localhost:3000/",
				) instanceof URL,
				true,
			)
		})
	})

	describe("getSteamId", () => {
		it("Returns SteamID", async () => {
			const url = new URL(process.env.STEAM_API_CLIENT_SIGNED_URL ?? "")
			assert.strictEqual(
				await openId.getSteamId(url, !!url.searchParams.get("openid.signed")),
				url.searchParams.get("openid.claimed_id")?.split("/").pop(),
			)
		})
	})
})
