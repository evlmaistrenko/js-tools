import {
	type FC,
	type HTMLAttributes,
	type ReactNode,
	useCallback,
	useState,
} from "react"
import { useTranslation } from "react-i18next"

import { SettingOutlined } from "@ant-design/icons"
import { Button, Drawer, Tooltip } from "antd"
import classNames from "classnames"

import { useApplication } from "../context"
import classes from "../styles.module.css"
import { ConfigForm } from "./config-form"
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
	const [configOpen, setConfigOpen] = useState(false)
	const openConfig = useCallback(() => {
		setConfigOpen(true)
	}, [])
	const closeConfig = useCallback(() => {
		setConfigOpen(false)
	}, [])
	const { t } = useTranslation("application")

	return (
		<div
			{...props}
			className={classNames(
				classes.header,
				classes[direction!],
				props.className,
			)}
		>
			{primarySidebarToggler !== false && <PrimarySidebarToggler />}
			<div className={classes.headerChildren}>{props.children}</div>
			{config !== false && (
				<>
					<Tooltip
						trigger={"contextMenu"}
						title={t("Open settings")}
					>
						<Button
							icon={<SettingOutlined />}
							type="text"
							onClick={openConfig}
							title={t("Open settings")}
						/>
					</Tooltip>
					<Drawer
						open={configOpen}
						onClose={closeConfig}
						title={t("Settings")}
						placement={direction === "rtl" ? "left" : "right"}
					>
						<ConfigForm>{config}</ConfigForm>
					</Drawer>
				</>
			)}
			{secondarySidebarToggler !== false && <SecondarySidebarToggler />}
		</div>
	)
}
