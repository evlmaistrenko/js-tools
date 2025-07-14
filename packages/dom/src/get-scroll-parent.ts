/** Scroll axis. */
export type ScrollParentAxis = "vertical" | "horizontal" | "both"

/**
 * Traverses up the DOM tree to find the nearest scrollable parent.
 *
 * @param element The element whose scroll parent to find.
 * @param axis The scroll axis to consider: 'vertical', 'horizontal', or 'both'.
 * @returns Scroll parent of element or `null` if doesn't exists.
 */
export function getScrollParent(
	element: Element | null,
	axis: ScrollParentAxis = "both",
): Element | null {
	while (element) {
		if (isScrollable(element, axis)) return element
		element = element.parentElement
	}
	return null
}

/** Checks if the given element is scrollable along the specified axis. */
function isScrollable(element: Element, axis: ScrollParentAxis): boolean {
	const style = getComputedStyle(element)

	const overflowY = style.overflowY
	const overflowX = style.overflowX

	const canScrollY =
		overflowY === "auto" || overflowY === "scroll" || overflowY === "overlay"

	const canScrollX =
		overflowX === "auto" || overflowX === "scroll" || overflowX === "overlay"

	switch (axis) {
		case "vertical":
			return canScrollY
		case "horizontal":
			return canScrollX
		case "both":
			return canScrollY || canScrollX
	}
}
