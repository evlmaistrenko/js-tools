import { useCallback, useEffect, useRef, useState } from "react"

import classes from "./styles.module.css"

/** Scroll axis to check for scrollability. */
export type ScrollParentAxis = "vertical" | "horizontal" | "both"

/**
 * A fallback function that returns a DOM Element if no scroll parent is found. Should never return
 * `window`, only Elements like `document.documentElement`.
 */
export type ScrollParentFallback = () => Element | null

/** Checks if the given element is scrollable along the specified axis. */
function isScrollable(el: Element, axis: ScrollParentAxis): boolean {
	const style = getComputedStyle(el)

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

/** Traverses up the DOM tree to find the nearest scrollable parent. */
function findScrollParent(
	el: Element | null,
	axis: ScrollParentAxis,
): Element | null {
	while (el) {
		if (isScrollable(el, axis)) return el
		el = el.parentElement
	}
	return null
}

/**
 * React hook that returns the nearest scrollable parent of a given element along a specified axis, or a
 * fallback element if none is found.
 *
 * @since 1.2.0
 * @param element The element whose scroll parent to find.
 * @param axis The scroll axis to consider: 'vertical', 'horizontal', or 'both'.
 * @param fallback A function that returns a fallback DOM Element (never `window`).
 */
export function useScrollParent(
	element: HTMLElement | null,
	axis: ScrollParentAxis = "vertical",
	fallback: ScrollParentFallback = () =>
		typeof document !== "undefined" ? document.documentElement : null,
): {
	/** DOM element that is scrollable */
	element: Element | null
	/** Function to lock scrolling on the scroll parent */
	lockScroll: () => void
	/** Function to unlock scrolling on the scroll parent */
	unlockScroll: () => void
} {
	const [scrollParent, setScrollParent] = useState<Element | null>(null)

	const fallbackRef = useRef(fallback)
	fallbackRef.current = fallback
	useEffect(() => {
		if (!element) {
			setScrollParent(null)
			return
		}
		const scrollParent =
			findScrollParent(element, axis) ?? fallbackRef.current()
		setScrollParent(scrollParent)
	}, [element, axis])

	useEffect(() => {
		if (!scrollParent?.classList.contains(classes.scrollParent))
			scrollParent?.classList.add(classes.scrollParent)
	})

	let lockedClassName: string
	if (axis === "vertical") {
		lockedClassName = classes.lockedVertically
	} else if (axis === "horizontal") {
		lockedClassName = classes.lockedHorizontally
	} else {
		lockedClassName = classes.lockedBoth
	}
	const lockScroll = useCallback(() => {
		if (!scrollParent) {
			return
		}
		scrollParent.classList.add(lockedClassName)
	}, [scrollParent, lockedClassName])
	const unlockScroll = useCallback(() => {
		if (!scrollParent) {
			return
		}
		scrollParent.classList.remove(lockedClassName)
	}, [scrollParent, lockedClassName])

	return {
		element: scrollParent,
		lockScroll,
		unlockScroll,
	}
}
