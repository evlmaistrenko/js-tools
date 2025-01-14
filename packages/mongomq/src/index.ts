import * as timers from "node:timers/promises"

import { Collection, WithId } from "mongodb"

/** Message */
export type MessageDocument<TPayload> = {
	/** Payload */
	payload: TPayload
	/** Tells to delay receiving by consumers to some date */
	delayedTo?: Date
	/** When added to queue */
	publishedAt: Date
	/** When received by consumer */
	receivedAt?: Date
	/** When consumed */
	consumedAt?: Date
}

/**
 * Queue of messages
 *
 * @example
 * 	import { collection } from "<yourDatabase>"
 *
 * 	const queue = new Queue(collection)
 */
export class Queue<TPayload = any> {
	constructor(
		protected readonly collection: Collection<MessageDocument<TPayload>>,
	) {}

	/**
	 * Publishes massage to queue
	 *
	 * @example
	 * 	await queue.publish({ some: "value" })
	 *
	 * @param payload Payload of message
	 * @param delayedTo If you need to defer receiving to some date
	 */
	async publish(payload: TPayload, delayedTo?: Date): Promise<void> {
		await this.collection.insertOne({
			payload,
			...(delayedTo && { delayedTo }),
			publishedAt: new Date(),
		})
	}

	/**
	 * Receives messages from queue
	 *
	 * @example
	 * 	for await (let consume of queue.messages())
	 * 		consume(async (message) => {
	 * 			// do something with `message.payload`
	 * 		}).catch((error) => {
	 * 			// process `error`
	 * 		})
	 *
	 * @param concurrency Maximum number of concurrently considering messages
	 */
	async *messages(
		concurrency = Infinity,
	): AsyncGenerator<
		(
			callback: (
				message: WithId<MessageDocument<TPayload>>,
			) => Promise<void> | void,
		) => Promise<void>
	> {
		const stream = this.collection.watch()
		try {
			let concurrentCount = 0

			do {
				let message: Awaited<
					ReturnType<typeof this.collection.findOneAndUpdate>
				> = null
				do {
					if (concurrentCount >= concurrency) {
						if (message) {
							await this.collection.updateOne(
								{ _id: message._id },
								{ $unset: { receivedAt: true } },
							)
						}
						break
					}
					if (message) {
						concurrentCount++
						yield ((message) => async (callback) => {
							try {
								await callback(message)
							} finally {
								concurrentCount--
								await this.collection.updateOne(
									{ _id: message._id },
									{ $set: { consumedAt: new Date() } },
								)
							}
						})(message)
					}
				} while (
					(message = await this.collection.findOneAndUpdate(
						{
							receivedAt: { $exists: false },
							$or: [
								{ delayedTo: { $exists: false } },
								{ delayedTo: { $lte: new Date() } },
							],
						},
						{
							$set: {
								receivedAt: new Date(),
							},
						},
						{
							sort: { publishedAt: 1 },
						},
					))
				)

				const streamTrigger = Promise.withResolvers<void>()
				if (stream.closed) throw new Error("ChangeStream unexpectedly closed")
				const streamListeners = {
					change: () => streamTrigger.resolve(),
					error: streamTrigger.reject,
					closed: () =>
						streamTrigger.reject(new Error("ChangeStream unexpectedly closed")),
					end: () =>
						streamTrigger.reject(new Error("ChangeStream unexpectedly end")),
				}
				stream
					.once("change", streamListeners.change)
					.once("error", streamListeners.error)
					.once("closed", streamListeners.closed)
					.once("end", streamListeners.end)

				const delayedTrigger = Promise.withResolvers<void>()
				const { delayedTo } =
					(await this.collection.findOne(
						{
							receivedAt: { $exists: false },
						},
						{ sort: { delayedTo: 1 } },
					)) ?? {}
				if (delayedTo) {
					timers
						.setTimeout(+new Date() - +delayedTo)
						.then(() => delayedTrigger.resolve())
				}

				await Promise.race([
					streamTrigger.promise,
					delayedTrigger.promise,
				]).finally(() => {
					stream
						.off("change", streamListeners.change)
						.off("error", streamListeners.error)
						.off("closed", streamListeners.closed)
						.off("end", streamListeners.end)
				})
			} while (true)
		} finally {
			await stream.close()
		}
	}
}
