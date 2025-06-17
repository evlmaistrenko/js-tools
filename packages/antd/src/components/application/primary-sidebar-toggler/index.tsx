import { useMemo } from "react"

import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons"
import { Button, type ButtonProps, Tooltip, type TooltipProps } from "antd"

import { useApplication } from "../context"

export interface ApplicationPrimarySidebarTogglerProps
	extends Omit<ButtonProps, "title"> {
	/** Tooltip data. */
	tooltip?: {
		/** Tooltip placement. */
		placement?: TooltipProps["placement"]
		/** Hint to expand. */
		collapsedHint?: string
		/** Hint to collapse. */
		expandedHint?: string
	}
}

/** Button that toggles primary sidebar state. */
export const PrimarySidebarToggler: React.FC<
	ApplicationPrimarySidebarTogglerProps
> = ({
	tooltip: { placement: tooltipPlacement, collapsedHint, expandedHint } = {},
	...props
}) => {
	const {
		hasPrimarySidebar,
		primarySidebarCollapsed: collapsed,
		config: { direction },
		togglePrimarySidebar,
	} = useApplication()!
	const icon = useMemo(() => {
		if (collapsed) {
			return direction === "rtl" ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />
		} else {
			return direction === "rtl" ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
		}
	}, [collapsed, direction])

	const hint = useMemo(() => {
		if (collapsed) {
			return collapsedHint ?? "Expand menu"
		} else {
			return expandedHint ?? "Collapse menu"
		}
	}, [collapsedHint, expandedHint, collapsed])

	if (!hasPrimarySidebar) {
		return null
	}

	return (
		<Tooltip
			title={hint}
			placement={tooltipPlacement ?? (direction === "rtl" ? "left" : "right")}
		>
			<Button
				icon={icon}
				onClick={togglePrimarySidebar}
				type="text"
				{...props}
			/>
		</Tooltip>
	)
}

PrimarySidebarToggler.displayName = "Application.PrimarySidebarToggler"
