import type { FC, HTMLAttributes } from "react"

import classNames from "classnames"

import classes from "./styles.module.css"

export interface WithOverlayProps extends HTMLAttributes<HTMLDivElement> {
	/** Whether or not the overlay is visible. */
	overlaid?: boolean
	/** Properties of overlay-node. */
	overlayProps?: Omit<HTMLAttributes<HTMLDivElement>, "children">
}

/** Wrapper component that adds an overlay to its children. */
export const WithOverlay: FC<WithOverlayProps> = ({
	overlaid = false,
	overlayProps,
	children,
	...props
}) => {
	return (
		<div
			{...props}
			className={classNames(
				classes.withOverlay,
				{ [classes.overlaid]: overlaid },
				props.className,
			)}
		>
			{children}
			<div
				{...overlayProps}
				className={classNames(
					classes.overlay,
					{ [classes.clickable]: !!overlayProps?.onClick },
					overlayProps?.className,
				)}
			/>
		</div>
	)
}

export function foo() {}
