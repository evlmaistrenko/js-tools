import { type FC } from "react"
import { useTranslation } from "react-i18next"

import { Typography } from "antd"

import { Page, type PageProps } from "../../page"
import { ConfigForm } from "./config-form"

export const ConfigPage: FC<PageProps> = ({ children, ...props }) => {
	const { t } = useTranslation("application")

	return (
		<Page
			header={{ title: <Typography.Title> {t("Settings")}</Typography.Title> }}
			{...props}
		>
			<ConfigForm>{children}</ConfigForm>
		</Page>
	)
}

ConfigPage.displayName = "Application.ConfigPage"
