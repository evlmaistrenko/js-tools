import assert from "node:assert/strict"
import { beforeEach, describe, it } from "node:test"

import { JSDOM } from "jsdom"

import { getScrollParent } from "../get-scroll-parent.js"

let window: Window
let document: Document

beforeEach(() => {
	const dom = new JSDOM(`<!DOCTYPE html><html><body></body></html>`)
	window = dom.window as unknown as Window
	document = window.document as unknown as Document
	globalThis.window = window as Window & typeof globalThis
	globalThis.document = document
	globalThis.getComputedStyle = window.getComputedStyle.bind(window)
})

describe("getScrollParent", () => {
	it("returns null if no scrollable parent exists", () => {
		const el = document.createElement("div")
		document.body.appendChild(el)

		assert.equal(getScrollParent(el), null)
	})

	it("returns the element itself if it is scrollable", () => {
		const scrollable = document.createElement("div")
		scrollable.style.overflowY = "auto"
		document.body.appendChild(scrollable)

		assert.equal(getScrollParent(scrollable), scrollable)
	})

	it("skips non-scrollable parents and finds a scrollable ancestor", () => {
		const root = document.createElement("div")
		const mid = document.createElement("div")
		const scrollable = document.createElement("div")

		root.appendChild(mid)
		mid.appendChild(scrollable)

		scrollable.style.overflowY = "scroll"
		document.body.appendChild(root)

		const target = document.createElement("div")
		scrollable.appendChild(target)

		assert.equal(getScrollParent(target, "vertical"), scrollable)
	})

	it("detects horizontal scroll parent", () => {
		const scrollable = document.createElement("div")
		scrollable.style.overflowX = "scroll"

		const child = document.createElement("div")
		scrollable.appendChild(child)
		document.body.appendChild(scrollable)

		assert.equal(getScrollParent(child, "horizontal"), scrollable)
	})

	it("returns null if element is null", () => {
		assert.equal(getScrollParent(null), null)
	})
})
