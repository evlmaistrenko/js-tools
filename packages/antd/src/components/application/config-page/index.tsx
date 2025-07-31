import { type FC } from "react"

import { I18nextProvider } from "../../../i18next/provider"
import { type PageProps } from "../../page"
import { ConfigPageInner } from "./inner"

export const ApplicationConfigPage: FC<PageProps> = (props) => {
	return (
		<I18nextProvider>
			<ConfigPageInner {...props} />
		</I18nextProvider>
	)
}
