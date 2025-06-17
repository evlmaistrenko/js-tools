import { type FC, useCallback, useMemo, useRef, useState } from "react"

import {
	App,
	type Breakpoint,
	ConfigProvider,
	type ConfigProviderProps,
} from "antd"
import { SiderContext, type SiderContextProps } from "antd/es/layout/Sider"
import classNames from "classnames"

import { Layout, type LayoutProps } from "../layout"
import { ApplicationContext, type ApplicationContextValue } from "./context"
import { CssVariablesSetter } from "./helpers/css-variables-setter"
import { getConfig as defaultGetConfig } from "./helpers/get-config"
import { LayoutSizeSetter } from "./helpers/layout-size-setter"
import {
	type ApplicationState,
	initialState as defaultInitialState,
} from "./state"
import classes from "./styles.module.css"

export interface ApplicationProps
	extends Omit<LayoutProps, "onSidebarsOverlayClick" | "direction"> {
	initialLayoutSize?: Breakpoint
	initialState?: ApplicationState
	getConfig?: (
		context: Omit<ApplicationContextValue, "config">,
	) => ConfigProviderProps
}

export const Application: FC<ApplicationProps> = ({
	initialLayoutSize = "xs",
	initialState: initialStateRaw = defaultInitialState,
	getConfig: getConfigRaw = defaultGetConfig,
	...props
}) => {
	const [layout, setLayout] = useState<HTMLDivElement | null>(null)
	const [layoutSize, setLayoutSize] = useState<Breakpoint>(initialLayoutSize)
	const hasHeader = !!props.header
	const hasPrimarySidebar = !!props.primarySidebar
	const hasMain = !!props.main
	const hasSecondarySidebar = !!props.secondarySidebar
	const hasFooter = !!props.footer
	const [initialState] = useState(initialStateRaw)
	const [state, setState] = useState<ApplicationState>(initialState)
	const primarySidebarCollapsed = state[layoutSize].primarySidebarCollapsed
	const secondarySidebarCollapsed = state[layoutSize].secondarySidebarCollapsed

	const collapsePrimarySidebar = useCallback(() => {
		setState((current) => ({
			...current,
			[layoutSize]: { ...current[layoutSize], primarySidebarCollapsed: true },
		}))
	}, [layoutSize])
	const expandPrimarySidebar = useCallback(() => {
		setState((current) => ({
			...current,
			[layoutSize]: { ...current[layoutSize], primarySidebarCollapsed: false },
		}))
	}, [layoutSize])
	const togglePrimarySidebar = useCallback(() => {
		if (primarySidebarCollapsed) {
			expandPrimarySidebar()
		} else {
			collapsePrimarySidebar()
		}
	}, [primarySidebarCollapsed, collapsePrimarySidebar, expandPrimarySidebar])
	const collapseSecondarySidebar = useCallback(() => {
		setState((current) => ({
			...current,
			[layoutSize]: { ...current[layoutSize], secondarySidebarCollapsed: true },
		}))
	}, [layoutSize])
	const expandSecondarySidebar = useCallback(() => {
		setState((current) => ({
			...current,
			[layoutSize]: {
				...current[layoutSize],
				secondarySidebarCollapsed: false,
			},
		}))
	}, [layoutSize])
	const toggleSecondarySidebar = useCallback(() => {
		if (secondarySidebarCollapsed) {
			expandSecondarySidebar()
		} else {
			collapseSecondarySidebar()
		}
	}, [
		secondarySidebarCollapsed,
		collapseSecondarySidebar,
		expandSecondarySidebar,
	])

	const getConfigRef = useRef(getConfigRaw)
	getConfigRef.current = getConfigRaw
	const contextValue: ApplicationContextValue = useMemo(() => {
		const value: ApplicationContextValue = {
			layout,
			hasHeader,
			hasPrimarySidebar,
			hasMain,
			hasSecondarySidebar,
			hasFooter,
			layoutSize,
			config: {},
			primarySidebarCollapsed,
			secondarySidebarCollapsed,
			collapsePrimarySidebar,
			expandPrimarySidebar,
			togglePrimarySidebar,
			collapseSecondarySidebar,
			expandSecondarySidebar,
			toggleSecondarySidebar,
			...state,
		}
		value.config = getConfigRef.current(value)
		return value
	}, [
		layout,
		hasHeader,
		hasPrimarySidebar,
		hasMain,
		hasSecondarySidebar,
		hasFooter,
		layoutSize,
		state,
		primarySidebarCollapsed,
		secondarySidebarCollapsed,
		collapsePrimarySidebar,
		expandPrimarySidebar,
		togglePrimarySidebar,
		collapseSecondarySidebar,
		expandSecondarySidebar,
		toggleSecondarySidebar,
	])

	const [cssVariables, setCssVariables] = useState<Record<string, string>>({})

	const primarySidebarContextValue: SiderContextProps = useMemo(
		() => ({
			siderCollapsed: primarySidebarCollapsed,
		}),
		[primarySidebarCollapsed],
	)
	const secondarySidebarContextValue: SiderContextProps = useMemo(
		() => ({
			siderCollapsed: secondarySidebarCollapsed,
		}),
		[secondarySidebarCollapsed],
	)

	const onSidebarsOverlayClick: LayoutProps["onSidebarsOverlayClick"] =
		useCallback(() => {
			if (!primarySidebarCollapsed) {
				collapsePrimarySidebar()
			}
			if (!secondarySidebarCollapsed) {
				collapseSecondarySidebar()
			}
		}, [
			collapsePrimarySidebar,
			collapseSecondarySidebar,
			primarySidebarCollapsed,
			secondarySidebarCollapsed,
		])

	return (
		<ConfigProvider>
			<ApplicationContext.Provider value={contextValue}>
				<App>
					<Layout
						ref={setLayout}
						{...props}
						className={classNames(props.className)}
						style={{ ...cssVariables, ...props.style }}
						primarySidebar={
							hasPrimarySidebar
								? {
										...props.primarySidebar,
										containerProps: {
											...props.primarySidebar?.containerProps,
											className: classNames(
												classes.primarySidebar,
												classes[layoutSize],
												{
													[classes.collapsed]: primarySidebarCollapsed,
													[classes.expanded]: !primarySidebarCollapsed,
												},
												props.primarySidebar?.containerProps?.className,
											),
										},
										children: (
											<SiderContext.Provider value={primarySidebarContextValue}>
												{props.primarySidebar?.children}
											</SiderContext.Provider>
										),
									}
								: undefined
						}
						secondarySidebar={
							hasSecondarySidebar
								? {
										...props.secondarySidebar,
										containerProps: {
											...props.secondarySidebar?.containerProps,
											className: classNames(
												classes.secondarySidebar,
												classes[layoutSize],
												{
													[classes.collapsed]: secondarySidebarCollapsed,
													[classes.expanded]: !secondarySidebarCollapsed,
												},
												props.secondarySidebar?.containerProps?.className,
											),
										},
										children: (
											<SiderContext.Provider
												value={secondarySidebarContextValue}
											>
												{props.secondarySidebar?.children}
											</SiderContext.Provider>
										),
									}
								: undefined
						}
						onSidebarsOverlayClick={onSidebarsOverlayClick}
						direction={contextValue.config.direction}
					/>
					<LayoutSizeSetter setter={setLayoutSize} />
					<CssVariablesSetter setter={setCssVariables} />
				</App>
			</ApplicationContext.Provider>
		</ConfigProvider>
	)
}
