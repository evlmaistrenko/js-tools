/**
 * Changes input's value and fires `input` event (React's `onChange`).
 *
 * @example
 * 	input.addEventListener("input", (event) => {
 * 		// Use `event.target.value`.
 * 	})
 * 	change(input, "new value")
 *
 * @param input Input
 * @param value New value
 */
export function change(input: HTMLInputElement, value: string): void {
	const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
		HTMLInputElement.prototype,
		"value",
	)?.set
	if (nativeInputValueSetter) {
		nativeInputValueSetter.call(input, value)
	}
	const event = new Event("input", { bubbles: true })
	input.dispatchEvent(event)
}
