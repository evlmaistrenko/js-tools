import { type FC, type ReactNode, useCallback, useState } from "react"
import { useTranslation } from "react-i18next"

import { SettingOutlined } from "@ant-design/icons"
import { Button, Drawer } from "antd"

import { useApplication } from "../context"
import { ConfigForm } from "./config-form"

export const HeaderConfig: FC<{ children?: ReactNode }> = ({ children }) => {
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
		<>
			<Button
				icon={<SettingOutlined />}
				type="text"
				onClick={openConfig}
				title={t("Open settings")}
			/>
			<Drawer
				open={configOpen}
				onClose={closeConfig}
				title={t("Settings")}
				placement={direction === "rtl" ? "left" : "right"}
			>
				<ConfigForm>{children}</ConfigForm>
			</Drawer>
		</>
	)
}
