import { type FC } from "react"

import { I18nextProvider } from "../../../i18next/provider"
import { type PageProps } from "../../page"
import { ApplicationHelloPageInner } from "./inner"

export interface ApplicationHelloPageProps extends Omit<PageProps, "children"> {
	locales?: string[]
	onLocaleChange?: (locale: string) => void
}

export const ApplicationHelloPage: FC<ApplicationHelloPageProps> = (props) => {
	return (
		<I18nextProvider>
			<ApplicationHelloPageInner {...props} />
		</I18nextProvider>
	)
}
