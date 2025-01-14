import * as assert from "node:assert"
import { describe, it } from "node:test"

import { ResponseError } from "../dist/index.js"

describe("#response-error", () => {
	describe("#check", () => {
		it("Throws if there is an error in response", async () => {
			const response = new Response(null, {
				status: 400,
				statusText: "Bad request",
			})
			await assert.rejects(() => ResponseError.check(response, false))
		})
		it("Does nothing if there is no error in response", async () => {
			const response = new Response(null, {
				status: 200,
				statusText: "Everything fine",
			})
			await ResponseError.check(response, false)
		})
	})

	describe("#parse", () => {
		it("Parses text body", async () => {
			const message = "Something wrong"
			const response = new Response(message, {
				status: 400,
				statusText: "Bad request",
			})
			try {
				await ResponseError.check(response)
			} catch (error) {
				if (!(error instanceof ResponseError)) throw error
				assert.strictEqual(error.parsed?.message, message)
			}
		})
		it("Parses json body", async () => {
			const message = "Something wrong"
			const body = JSON.stringify({ message })
			const response = new Response(body, {
				status: 400,
				statusText: "Bad request",
				headers: {
					"Content-Type": "application/json",
				},
			})
			try {
				await ResponseError.check(response)
			} catch (error) {
				if (!(error instanceof ResponseError)) throw error
				assert.strictEqual(error.parsed?.message, message)
			}
		})
	})
})
