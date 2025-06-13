import type { ComponentProps, FC } from "react"
import { useEffect, useRef } from "react"

import classNames from "classnames"

import { WithOverlay } from "../with-overlay"
import classes from "./styles.module.css"

export interface LayoutSidebarProps extends ComponentProps<"aside"> {
	sticky?: boolean
	containerProps?: ComponentProps<"div">
}

export const Sidebar: FC<
	LayoutSidebarProps & {
		setOverflowed?: (overflowed: boolean) => void
		overlaid?: boolean
	}
> = ({ sticky, containerProps, setOverflowed, overlaid, ...props }) => {
	const ref = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const container = ref.current
		if (!container || !setOverflowed) return
		const element = container.children[0] as HTMLElement
		let applicable = true
		let prev: boolean | null = null
		const callback = () =>
			requestAnimationFrame(() => {
				if (!applicable || !container) return
				const next = container.clientWidth < element.offsetWidth
				if (next === prev) return
				prev = next
				setOverflowed?.(next)
			})
		const observer = new ResizeObserver(callback)
		callback()
		observer.observe(container)
		observer.observe(element)
		return () => {
			applicable = false
			observer.disconnect()
		}
	}, [setOverflowed])

	return (
		<div
			{...containerProps}
			ref={ref}
			className={classNames(
				classes.sidebar,
				{
					[classes.sticky]: sticky,
					[classes.overlaid]: overlaid,
				},
				containerProps?.className,
			)}
		>
			<aside {...props}>
				<WithOverlay overlaid={overlaid}>
					<div>{props.children}</div>
				</WithOverlay>
			</aside>
		</div>
	)
}
