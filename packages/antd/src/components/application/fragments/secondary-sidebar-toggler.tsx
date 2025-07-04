import { type FC, useMemo } from "react"
import { useTranslation } from "react-i18next"

import { LeftOutlined, RightOutlined } from "@ant-design/icons"
import { Button, Tooltip } from "antd"

import { useApplication } from "../context"

/** Button that toggles secondary sidebar state. */
export const SecondarySidebarToggler: FC = () => {
	const {
		breakpoint,
		secondarySidebar,
		configProviderProps: { direction },
	} = useApplication()!

	const collapsed = secondarySidebar?.collapsed[breakpoint]

	const icon = useMemo(() => {
		if (collapsed) {
			return direction === "rtl" ? <RightOutlined /> : <LeftOutlined />
		} else {
			return direction === "rtl" ? <LeftOutlined /> : <RightOutlined />
		}
	}, [collapsed, direction])

	const { t } = useTranslation("application")
	const collapsedHint = t("Expand sidebar")
	const expandedHint = t("Collapse sidebar")
	const hint = useMemo(() => {
		if (collapsed) {
			return collapsedHint
		} else {
			return expandedHint
		}
	}, [collapsedHint, expandedHint, collapsed])

	if (!secondarySidebar) {
		return null
	}

	return (
		<Tooltip
			trigger={"contextMenu"}
			title={hint}
			placement={direction === "rtl" ? "right" : "left"}
		>
			<Button
				icon={icon}
				onClick={secondarySidebar.toggle}
				type="text"
				title={hint}
			/>
		</Tooltip>
	)
}
