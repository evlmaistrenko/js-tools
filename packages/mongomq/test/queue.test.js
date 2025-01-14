import "dotenv/config"

import * as assert from "node:assert"
import { after, beforeEach, describe, it } from "node:test"
import * as timers from "node:timers/promises"

import { Queue } from "@evlmaistrenko/tools-mongomq"
import _ from "lodash"
import { MongoClient } from "mongodb"

describe("#Queue", () => {
	/**
	 * @type {import("mongodb").Collection<
	 * 	import("@evlmaistrenko/tools-mongomq").MessageDocument<{ uid: number }>
	 * >}
	 */
	let collection
	/** @type {import("@evlmaistrenko/tools-mongomq").Queue<{ uid: number }>} */
	let queue
	/** @type {import("mongodb").MongoClient} */
	let client
	/** @type {import("mongodb").Db} */
	let db

	beforeEach(async (test) => {
		if (!client) {
			client = new MongoClient(process.env.MONGODB_URL ?? "")
			await client.connect()

			db = client.db(`mongomqTest_${+new Date()}`)
		}
		collection = db.collection(
			_.camelCase(test.name.replace(/ /g, "_")).replace(/\W/g, ""),
		)
		queue = new Queue(collection)
	})

	after(async () => {
		await db.dropDatabase()
		await client.close()
	})

	describe("#publish", () => {
		it("Publishes", async () => {
			{
				await queue.publish({ uid: 0 })
				const message = await collection.findOne({})
				assert.strictEqual(message?.payload.uid, 0)
				assert.strictEqual(message?.delayedTo, undefined)
				assert.strictEqual(typeof message?.publishedAt.toISOString(), "string")
				assert.strictEqual(message?.receivedAt, undefined)
				assert.strictEqual(message?.consumedAt, undefined)
			}

			{
				await queue.publish({ uid: 1 }, new Date())
				const message = await collection.findOne({ "payload.uid": 1 })
				assert.strictEqual(message?.payload.uid, 1)
				assert.strictEqual(typeof message?.delayedTo?.toISOString(), "string")
				assert.strictEqual(typeof message?.publishedAt.toISOString(), "string")
				assert.strictEqual(message?.receivedAt, undefined)
				assert.strictEqual(message?.consumedAt, undefined)
			}
		})
	})

	describe("#messages", () => {
		it("Iterates", async () => {
			const length = 10
			await Promise.all(
				Array.from({ length }).map((_element, index) =>
					queue.publish({ uid: index }),
				),
			)
			let count = 0
			const fns = []
			for await (const consume of queue.messages()) {
				fns.push(consume)
				if (++count >= length) break
			}
			assert.strictEqual(
				await collection.countDocuments({ receivedAt: { $exists: false } }),
				0,
			)
			assert.strictEqual(count, length)
			await Promise.all(fns.map((fn) => fn(() => {})))
			assert.strictEqual(
				await collection.countDocuments({ consumedAt: { $exists: false } }),
				0,
			)
		})

		it("Properly works with delayed messages", async () => {
			const length = 10
			await Promise.all(
				Array.from({ length }).map((_element, index) =>
					queue.publish({ uid: index }, new Date(+new Date() + 1000 * index)),
				),
			)
			const promises = []
			for await (const consume of queue.messages()) {
				promises.push(
					consume(async (message) => {
						if (message.delayedTo && +new Date() < +message.delayedTo)
							throw new Error("Delayed message received too soon")
					}),
				)
				if (promises.length >= length) break
			}
			await Promise.all(promises)
		})

		it("Iterates with finite concurrency", async () => {
			const length = 10
			await Promise.all(
				Array.from({ length }).map((_element, index) =>
					queue.publish({ uid: index }),
				),
			)

			const promises = []
			const concurrency = 2
			let concurrentCount = 0
			for await (const consume of queue.messages(concurrency)) {
				concurrentCount++
				promises.push(
					consume(async () => {
						assert.strictEqual(concurrentCount > concurrency, false)
						await timers.setTimeout(1000)
						concurrentCount--
					}),
				)
				if (promises.length >= length) break
			}
			await Promise.all(promises)
		})
	})
})
