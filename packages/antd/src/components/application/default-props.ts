import { theme } from "antd"
import enUS from "antd/es/locale/en_US"

import { type ApplicationProps } from "."
import { i18nextLocales } from "../../i18next"
import { type ApplicationConfig } from "./context"

export const defaultApplicationProps: Pick<
	Required<ApplicationProps<ApplicationConfig>>,
	"initialState" | "getConfigProviderProps"
> = {
	initialState: {
		breakpoint: "xs",
		deviceColorScheme: "light",
		primarySidebarCollapsed: {
			xs: true,
			sm: true,
			md: true,
			lg: false,
			xl: false,
			xxl: false,
		},
		secondarySidebarCollapsed: {
			xs: true,
			sm: true,
			md: true,
			lg: false,
			xl: false,
			xxl: false,
		},
		config: {
			locale: "en-US",
			colorScheme: "device",
			compactTheme: {
				xs: false,
				sm: true,
				md: false,
				lg: false,
				xl: false,
				xxl: false,
			},
		},
	},
	getConfigProviderProps: (context) => {
		let themeAlgorithm = [theme.defaultAlgorithm]
		const colorScheme =
			context.config.values.colorScheme === "device"
				? context.deviceColorScheme
				: context.config.values.colorScheme
		if (colorScheme === "dark") {
			themeAlgorithm = [theme.darkAlgorithm]
		}
		if (context.config.values.compactTheme[context.breakpoint]) {
			themeAlgorithm.push(theme.compactAlgorithm)
		}
		const locale = i18nextLocales.find(
			(l) => l.value === context.config.values.locale,
		)
		return {
			theme: { algorithm: themeAlgorithm },
			locale: locale?.antdLocale ?? enUS,
			direction: locale?.direction ?? "ltr",
		}
	},
} as const
