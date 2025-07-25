import { type FC } from "react"

import { I18nextProvider } from "../../../i18next/provider"
import { type PageProps } from "../../page"
import { ConfigPageInner } from "./config-page-inner"

export const ConfigPage: FC<PageProps> = (props) => {
	return (
		<I18nextProvider>
			<ConfigPageInner {...props} />
		</I18nextProvider>
	)
}

ConfigPage.displayName = "Application.ConfigPage"
