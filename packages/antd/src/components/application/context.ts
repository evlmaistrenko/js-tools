import { createContext, useContext } from "react"

import type { Breakpoint, ConfigProviderProps } from "antd"

import type { ApplicationBreakpointState, ApplicationState } from "./state"

export interface ApplicationActions {
	collapsePrimarySidebar: () => void
	expandPrimarySidebar: () => void
	togglePrimarySidebar: () => void
	collapseSecondarySidebar: () => void
	expandSecondarySidebar: () => void
	toggleSecondarySidebar: () => void
}

export interface ApplicationContextValue
	extends ApplicationState,
		ApplicationActions,
		ApplicationBreakpointState {
	layout: HTMLDivElement | null
	hasHeader: boolean
	hasPrimarySidebar: boolean
	hasMain: boolean
	hasSecondarySidebar: boolean
	hasFooter: boolean
	layoutSize: Breakpoint
	config: ConfigProviderProps
}

export const ApplicationContext = createContext<ApplicationContextValue | null>(
	null,
)

export function useApplication(): ApplicationContextValue | null {
	return useContext(ApplicationContext)
}
