import type { Breakpoint } from "antd"

export type ApplicationBreakpointState = {
	primarySidebarCollapsed: boolean
	secondarySidebarCollapsed: boolean
}

export type ApplicationState = Record<Breakpoint, ApplicationBreakpointState>

export const initialState: ApplicationState = {
	xs: {
		primarySidebarCollapsed: true,
		secondarySidebarCollapsed: true,
	},
	sm: {
		primarySidebarCollapsed: true,
		secondarySidebarCollapsed: true,
	},
	md: {
		primarySidebarCollapsed: true,
		secondarySidebarCollapsed: false,
	},
	lg: {
		primarySidebarCollapsed: false,
		secondarySidebarCollapsed: false,
	},
	xl: {
		primarySidebarCollapsed: false,
		secondarySidebarCollapsed: false,
	},
	xxl: {
		primarySidebarCollapsed: false,
		secondarySidebarCollapsed: false,
	},
}
