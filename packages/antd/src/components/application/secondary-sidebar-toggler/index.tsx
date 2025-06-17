import { useMemo } from "react"

import { LeftOutlined, RightOutlined } from "@ant-design/icons"
import { Button, type ButtonProps, Tooltip, type TooltipProps } from "antd"

import { useApplication } from "../context"

export interface ApplicationSecondarySidebarTogglerProps
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

/** Button that toggles secondary sidebar state. */
export const SecondarySidebarToggler: React.FC<
	ApplicationSecondarySidebarTogglerProps
> = ({
	tooltip: { placement: tooltipPlacement, collapsedHint, expandedHint } = {},
	...props
}) => {
	const {
		hasSecondarySidebar,
		secondarySidebarCollapsed,
		toggleSecondarySidebar,
		config: { direction },
	} = useApplication()!

	const icon = useMemo(() => {
		if (secondarySidebarCollapsed) {
			return direction === "rtl" ? <RightOutlined /> : <LeftOutlined />
		} else {
			return direction === "rtl" ? <LeftOutlined /> : <RightOutlined />
		}
	}, [secondarySidebarCollapsed, direction])

	const hint = useMemo(() => {
		if (secondarySidebarCollapsed) {
			return collapsedHint ?? "Expand sidebar"
		} else {
			return expandedHint ?? "Collapse sidebar"
		}
	}, [secondarySidebarCollapsed, collapsedHint, expandedHint])

	if (!hasSecondarySidebar) {
		return null
	}

	return (
		<Tooltip
			title={hint}
			placement={tooltipPlacement ?? (direction === "rtl" ? "right" : "left")}
		>
			<Button
				icon={icon}
				onClick={toggleSecondarySidebar}
				type="text"
				{...props}
			/>
		</Tooltip>
	)
}

SecondarySidebarToggler.displayName = "Application.SecondarySidebarToggler"
