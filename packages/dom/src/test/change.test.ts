import * as assert from "node:assert"
import { describe, it } from "node:test"
import * as timers from "node:timers/promises"

import { JSDOM } from "jsdom"

import * as lib from "../index.js"

const dom = new JSDOM(`<!DOCTYPE html><body><input id="input"/></body>`)
globalThis.document = dom.window.document
globalThis.HTMLInputElement = dom.window.HTMLInputElement
globalThis.Event = dom.window.Event

describe("change", () => {
	it("Changes value and fires `input` event", async () => {
		const input = document.getElementById("input") as HTMLInputElement
		const promise = new Promise<HTMLInputElement>((resolve) => {
			input.addEventListener(
				"input",
				(event) => {
					resolve(event.target as HTMLInputElement)
				},
				{ once: true },
			)
		})
		lib.change(input, "next")
		const target = (await Promise.race([
			promise,
			timers.setTimeout(5000),
		])) as HTMLInputElement
		assert.strictEqual(target.value, "next")
	})
})
