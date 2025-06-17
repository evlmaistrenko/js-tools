import type { FC, HTMLAttributes } from "react"

import classNames from "classnames"

import { useApplication } from "../context"
import {
	type ApplicationPrimarySidebarTogglerProps,
	PrimarySidebarToggler,
} from "../primary-sidebar-toggler"
import {
	type ApplicationSecondarySidebarTogglerProps,
	SecondarySidebarToggler,
} from "../secondary-sidebar-toggler"
import classes from "../styles.module.css"

export interface ApplicationHeaderProps extends HTMLAttributes<HTMLDivElement> {
	primarySidebarToggler?: ApplicationPrimarySidebarTogglerProps
	secondarySidebarToggler?: ApplicationSecondarySidebarTogglerProps
}

export const Header: FC<ApplicationHeaderProps> = ({
	primarySidebarToggler,
	secondarySidebarToggler,
	...props
}) => {
	const {
		config: { direction },
	} = useApplication()!
	return (
		<div
			{...props}
			className={classNames(
				classes.header,
				classes[direction!],
				props.className,
			)}
		>
			<PrimarySidebarToggler {...primarySidebarToggler} />
			<div className={classes.headerChildren}>{props.children}</div>
			<SecondarySidebarToggler {...secondarySidebarToggler} />
		</div>
	)
}
