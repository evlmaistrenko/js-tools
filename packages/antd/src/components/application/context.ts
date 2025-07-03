import {
	type Dispatch,
	type SetStateAction,
	createContext,
	useContext,
} from "react"

import { type Breakpoint, type ConfigProviderProps } from "antd"

import type { I18nLocale } from "../../i18n"
import type { LayoutRef } from "../layout"

export interface ApplicationConfigProviderProps extends ConfigProviderProps {
	theme: ConfigProviderProps["theme"] & { cssVar: true }
	direction: Required<ConfigProviderProps["direction"]>
}

export interface ApplicationSidebar {
	collapsed: Record<Breakpoint, boolean>
	collapse: () => void
	expand: () => void
	toggle: () => void
}

export interface ApplicationConfigBase {
	locale: string
	colorScheme: "dark" | "device" | "light"
	compactTheme: Record<Breakpoint, boolean>
}

export interface ApplicationConfig extends ApplicationConfigBase {
	locale: I18nLocale
}

export type ApplicationState<
	Config extends ApplicationConfigBase = ApplicationConfig,
> = Pick<
	ApplicationContextValue<Config>,
	"breakpoint" | "deviceColorScheme"
> & {
	primarySidebarCollapsed: ApplicationSidebar["collapsed"]
	secondarySidebarCollapsed: ApplicationSidebar["collapsed"]
	config: Config
}

export interface ApplicationContextValue<
	Config extends ApplicationConfigBase = ApplicationConfig,
> {
	layout: LayoutRef | null
	initialState: ApplicationState<Config>
	breakpoint: Breakpoint
	deviceColorScheme: "dark" | "light" | null
	configProviderProps: ApplicationConfigProviderProps
	primarySidebar: ApplicationSidebar | null
	secondarySidebar: ApplicationSidebar | null
	config: {
		values: Config
		setValues: Dispatch<SetStateAction<Config>>
	}
}

export const ApplicationContext = createContext<ApplicationContextValue | null>(
	null,
)

export function useApplication<
	Config extends ApplicationConfigBase = ApplicationConfig,
>(): ApplicationContextValue<Config> | null {
	return useContext(
		ApplicationContext,
	) as ApplicationContextValue<Config> | null
}
