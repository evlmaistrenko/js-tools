/** Represents error of `fetch` response */
export abstract class ResponseErrorBase<TParsed> extends Error {
	constructor(
		/** Corresponded response */
		readonly response: Response,
	) {
		super(`${response.status}. ${response.statusText}`)
	}

	/**
	 * Checks response for errors
	 *
	 * @example
	 * 	await fetch("<some-url>").then((error) => ResponseError.check(error))
	 *
	 * @param response Response to check
	 * @param parse Whether to parse response body
	 * @returns Response
	 */
	static async check(response: Response, parse = true): Promise<Response> {
		if (response.ok) return response
		// @ts-expect-error Use `this` to allow extending this class
		const error = new this(response)
		if (parse) {
			await (error.parse as () => Promise<void>)()
		}
		throw error
	}

	/** Store for parsed response body */
	protected parsedValue?: TParsed

	/** Parsed response body. In general available only after executing `this.parse` */
	get parsed() {
		return this.parsedValue
	}

	/** Parses response body */
	protected abstract parse(): Promise<void>
}

/** Implementation with some basic parsing */
export class ResponseError extends ResponseErrorBase<{ message?: string }> {
	/** Parses text or json body */
	protected async parse() {
		const text = await this.response.text()
		let message = text
		if (
			/application\/json/.test(this.response.headers.get("Content-Type") ?? "")
		) {
			const json = JSON.parse(text)
			message = json?.error?.message ?? json?.message ?? text
		}
		this.parsedValue = { message }
	}
}
