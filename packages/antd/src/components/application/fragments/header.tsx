import { type FC, type HTMLAttributes, type ReactNode } from "react"

import classNames from "classnames"

import { I18nextProvider } from "../../../i18next/provider"
import { useApplication } from "../context"
import classes from "../styles.module.css"
import { HeaderConfig } from "./header-config"
import { PrimarySidebarToggler } from "./primary-sidebar-toggler"
import { SecondarySidebarToggler } from "./secondary-sidebar-toggler"

export interface ApplicationHeaderProps extends HTMLAttributes<HTMLDivElement> {
	primarySidebarToggler?: false
	secondarySidebarToggler?: false
	config?: ReactNode | false
}

export const Header: FC<ApplicationHeaderProps> = ({
	primarySidebarToggler,
	secondarySidebarToggler,
	config,
	...props
}) => {
	const {
		configProviderProps: { direction },
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
			<I18nextProvider>
				{primarySidebarToggler !== false && <PrimarySidebarToggler />}
			</I18nextProvider>
			<div className={classes.headerChildren}>{props.children}</div>
			<I18nextProvider>
				{config !== false && <HeaderConfig>{config}</HeaderConfig>}
				{secondarySidebarToggler !== false && <SecondarySidebarToggler />}
			</I18nextProvider>
		</div>
	)
}
