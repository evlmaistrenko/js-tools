import { setTimeout } from "node:timers/promises"

import { ResponseError } from "@evlmaistrenko/tools-fetch"

async function exec(fn, delay = 2000, retries = 10) {
	try {
		await fn()
	} catch (error) {
		if (error instanceof ResponseError && error.response.status !== 429) {
			throw error
		}
		if (retries <= 0) {
			throw error
		}
		await setTimeout(delay)
		return exec(fn, Math.min(delay * 2, 30000), retries - 1)
	}
}

/**
 * Execute a function with retry logic.
 *
 * @param {any} fn Function to execute
 * @param {number} delay Initial delay in milliseconds
 * @param {number} retries Maximum number of retries
 * @returns {() => Promise<void>} A function that executes the provided function with retry logic
 */
export function retry(fn, delay = 2000, retries = 10) {
	return async () => exec(fn, delay, retries)
}
