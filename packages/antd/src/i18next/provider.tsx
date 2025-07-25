import {
	type FC,
	type PropsWithChildren,
	createContext,
	useContext,
} from "react"
import { I18nextProvider as I18nextProviderRaw } from "react-i18next"

import type { i18n as I18n } from "i18next"

import { i18next } from "."

const Context = createContext<I18n>(i18next)

export const I18nextProvider: FC<PropsWithChildren<{ instance?: I18n }>> = ({
	instance,
	children,
}) => {
	const contextInstance = useContext(Context)

	if (instance) {
		return <Context.Provider value={instance}>{children}</Context.Provider>
	}

	return (
		<I18nextProviderRaw i18n={contextInstance}>{children}</I18nextProviderRaw>
	)
}
