import { type FC, useEffect, useRef } from "react"

import { type Breakpoint, theme } from "antd"
import { throttle } from "lodash"

import { useApplication } from "../context"

export const LayoutSizeSetter: FC<{
	setter: (value: Breakpoint) => void
}> = ({ setter }) => {
	const { layout } = useApplication()!
	const { token } = theme.useToken()
	const tokenRef = useRef(token)

	useEffect(() => {
		if (!layout) return
		const callback = throttle(() => {
			requestAnimationFrame(() => {
				const { width } = layout.getBoundingClientRect()
				const token = tokenRef.current
				if (width <= token.screenXSMax) {
					setter("xs")
				} else if (width <= token.screenSMMax) {
					setter("sm")
				} else if (width <= token.screenMDMax) {
					setter("md")
				} else if (width <= token.screenLGMax) {
					setter("lg")
				} else if (width <= token.screenXLMax) {
					setter("xl")
				} else {
					setter("xxl")
				}
			})
		}, 100)
		callback()
		const observer = new ResizeObserver(callback)
		observer.observe(layout)
		return () => {
			callback.cancel()
			observer.disconnect()
		}
	}, [layout, setter])

	return null
}
