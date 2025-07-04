import { type FC, useEffect, useRef } from "react"

import { type Breakpoint, theme } from "antd"
import { throttle } from "lodash"

import { useApplication } from "../context"

export const CurrentBreakpoint: FC<{
	set: (value: Breakpoint) => void
}> = ({ set }) => {
	const { layout } = useApplication()!
	const { token } = theme.useToken()
	const tokenRef = useRef(token)

	useEffect(() => {
		if (!layout?.element) return
		const callback = throttle(() => {
			requestAnimationFrame(() => {
				if (!layout?.element) return
				const { width } = layout.element.getBoundingClientRect()
				const token = tokenRef.current
				if (width <= token.screenXSMax) {
					set("xs")
				} else if (width <= token.screenSMMax) {
					set("sm")
				} else if (width <= token.screenMDMax) {
					set("md")
				} else if (width <= token.screenLGMax) {
					set("lg")
				} else if (width <= token.screenXLMax) {
					set("xl")
				} else {
					set("xxl")
				}
			})
		}, 100)
		callback()
		const observer = new ResizeObserver(callback)
		observer.observe(layout.element)
		return () => {
			callback.cancel()
			observer.disconnect()
		}
	}, [layout, set])

	return null
}
