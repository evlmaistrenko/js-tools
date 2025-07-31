import { theme } from "antd"
import enUS from "antd/es/locale/en_US"
import kkKZ from "antd/es/locale/kk_KZ"
import ruRU from "antd/es/locale/ru_RU"

import { type ApplicationProps } from "."
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
		return {
			theme: { algorithm: themeAlgorithm },
			locale:
				{
					"en-US": enUS,
					"kk-KZ": kkKZ,
					"ru-RU": ruRU,
				}[context.config.values.locale] ?? enUS,
		}
	},
} as const
