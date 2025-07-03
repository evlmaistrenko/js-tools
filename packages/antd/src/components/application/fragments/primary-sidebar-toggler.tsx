import { type FC, useMemo } from "react"
import { useTranslation } from "react-i18next"

import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons"
import { Button, Tooltip } from "antd"

import { useApplication } from "../context"

/** Button that toggles primary sidebar state. */
export const PrimarySidebarToggler: FC = () => {
	const {
		primarySidebar,
		breakpoint,
		configProviderProps: { direction },
	} = useApplication()!

	const collapsed = primarySidebar?.collapsed[breakpoint]

	const icon = useMemo(() => {
		if (collapsed) {
			return direction === "rtl" ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />
		} else {
			return direction === "rtl" ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
		}
	}, [collapsed, direction])

	const { t } = useTranslation("application")
	const collapsedHint = t("Expand menu")
	const expandedHint = t("Collapse menu")
	const hint = useMemo(() => {
		if (collapsed) {
			return collapsedHint
		} else {
			return expandedHint
		}
	}, [collapsedHint, expandedHint, collapsed])

	if (!primarySidebar) {
		return null
	}

	return (
		<Tooltip
			title={hint}
			placement={direction === "rtl" ? "left" : "right"}
			trigger={"contextMenu"}
		>
			<Button
				icon={icon}
				onClick={primarySidebar.toggle}
				type="text"
				title={hint}
			/>
		</Tooltip>
	)
}
