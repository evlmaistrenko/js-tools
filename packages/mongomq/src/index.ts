import * as timers from "node:timers/promises"

import { ChangeStream, Collection, WithId } from "mongodb"

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
 * Callback passing to `consume` function
 *
 * @since 1.1.1
 */
export type ConsumeCallback<TPayload> = (
	/** Message-document */
	message: WithId<MessageDocument<TPayload>>,
) => Promise<void> | void

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
		protected readonly messagesCollection: Collection<
			MessageDocument<TPayload>
		>,
	) {}

	/**
	 * ChangeStream of `messagesCollection`
	 *
	 * @since 1.1.1
	 */
	protected messagesStream?: ChangeStream<MessageDocument<TPayload>>
	/**
	 * Promises with resolvers for `messagesStream` events
	 *
	 * @since 1.1.1
	 */
	protected messagesStreamTriggers: PromiseWithResolvers<void>[] = []
	/**
	 * How many `messages` generator iterating at this time
	 *
	 * @since 1.1.1
	 */
	protected messagesStreamConsumersCount = 0

	/**
	 * Closes `messagesStream` if there is no `messages` generators iterating
	 *
	 * @since 1.1.1
	 */
	protected async closeMessagesStream() {
		if (this.messagesStreamConsumersCount > 0) return
		await this.messagesStream?.close()
	}

	/**
	 * Promise that resolves when `change` event fired
	 *
	 * @since 1.1.1
	 */
	protected get messagesTrigger(): Promise<void> {
		if (!this.messagesStream || this.messagesStream.closed) {
			this.messagesStream = this.messagesCollection.watch()
			const listener = (error?: Error) => {
				let trigger: ReturnType<typeof this.messagesStreamTriggers.shift>
				while ((trigger = this.messagesStreamTriggers.shift())) {
					if (error) trigger.reject(error)
					else trigger.resolve()
				}
			}
			this.messagesStream
				.on("change", () => listener())
				.on("error", listener)
				.on("closed", () =>
					listener(new Error("`messagesStream` unexpectedly closed")),
				)
				.on("end", () =>
					listener(new Error("`messagesStream` unexpectedly end")),
				)
		}
		const result = Promise.withResolvers<void>()
		this.messagesStreamTriggers.push(result)
		return result.promise
	}

	/**
	 * Promise that resolves when closest delayed message is ready to consume
	 *
	 * @since 1.1.1
	 */
	protected get delayedMessagesTrigger(): Promise<void> {
		const result = Promise.withResolvers<void>()
		this.messagesCollection
			.findOne(
				{
					delayedTo: { $exists: true },
					receivedAt: { $exists: false },
				},
				{ sort: { delayedTo: 1 } },
			)
			.then((message) => {
				if (message?.delayedTo)
					timers
						.setTimeout(+new Date() - +message.delayedTo)
						.then(() => result.resolve())
			})
			.catch(result.reject)
		return result.promise
	}

	/**
	 * Creates indexes for `messagesCollection`
	 *
	 * @since 1.1.1
	 */
	protected async createMessagesIndexes() {
		await Promise.all([
			this.messagesCollection.createIndex({ delayedTo: 1, receivedAt: 1 }),
			this.messagesCollection.createIndex({ publishedAt: 1 }),
			this.messagesCollection.createIndex({ delayedTo: 1 }),
		])
	}

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
		await this.messagesCollection.insertOne({
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
	): AsyncGenerator<(callback: ConsumeCallback<TPayload>) => Promise<void>> {
		await this.createMessagesIndexes()
		this.messagesStreamConsumersCount++
		let concurrentCount = 0
		try {
			do {
				let message: Awaited<
					ReturnType<typeof this.messagesCollection.findOneAndUpdate>
				> = null
				do {
					if (message) {
						concurrentCount++
						yield ((message) => async (callback) => {
							try {
								await callback(message)
							} finally {
								concurrentCount--
								await this.messagesCollection.updateOne(
									{ _id: message._id },
									{ $set: { consumedAt: new Date() } },
								)
							}
						})(message)
					}
					if (concurrentCount >= concurrency) break
				} while (
					(message = await this.messagesCollection.findOneAndUpdate(
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
				await Promise.race([this.messagesTrigger, this.delayedMessagesTrigger])
			} while (true)
		} finally {
			this.messagesStreamConsumersCount--
			await this.closeMessagesStream()
		}
	}
}
