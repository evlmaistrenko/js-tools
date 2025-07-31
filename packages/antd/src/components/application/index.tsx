import { usePrefersColorScheme } from "@evlmaistrenko/tools-react"
import {
	type FC,
	type ReactElement,
	type RefAttributes,
	forwardRef,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react"

import {
	App,
	type AppProps,
	ConfigProvider,
	type ConfigProviderProps,
} from "antd"
import { SiderContext, type SiderContextProps } from "antd/es/layout/Sider"
import classNames from "classnames"
import { omit, pick } from "lodash"

import { i18next } from "../../i18next"
import { I18nextProvider } from "../../i18next/provider"
import { CssVariables } from "../../utils/css-variables"
import { Layout, type LayoutProps, type LayoutRef } from "../layout"
import {
	type ApplicationConfig,
	type ApplicationConfigBase,
	ApplicationContext,
	type ApplicationContextValue,
	type ApplicationSidebar,
	type ApplicationState,
} from "./context"
import { defaultApplicationProps } from "./default-props"
import { CurrentBreakpoint } from "./fragments/current-breakpoint"
import { type ApplicationHeaderProps, Header } from "./fragments/header"
import classes from "./styles.module.css"

export interface ApplicationProps<
	Config extends ApplicationConfigBase = ApplicationConfig,
> extends Omit<LayoutProps, "header" | "onSidebarsOverlayClick" | "direction"> {
	header?: LayoutProps["header"] & ApplicationHeaderProps
	initialState?: ApplicationState
	getConfigProviderProps?: (
		context: Omit<ApplicationContextValue<Config>, "configProviderProps">,
	) => ConfigProviderProps
	antdAppProps?: Omit<AppProps, "children">
}

export type ApplicationComponent = (<
	Config extends ApplicationConfigBase = ApplicationConfig,
>(
	props: ApplicationProps<Config> &
		RefAttributes<ApplicationContextValue<Config>>,
) => ReactElement) & {
	displayName?: FC["displayName"]
}

/**
 * Component that wraps `Layout` by `ConfigProvider`, `App` and `I18nextProvider`. Some features:
 *
 * - Reactive theme, language switch
 * - Collapsible sidebars
 * - Sticky header and sidebars
 *
 * See complete documentation
 * [here](https://evlmaistrenko.github.io/js-tools/antd/typedoc/variables/Application.html).
 */
export const Application: ApplicationComponent = forwardRef<
	ApplicationContextValue,
	ApplicationProps
>(
	(
		{
			initialState: initialStateRaw = defaultApplicationProps.initialState,
			getConfigProviderProps:
				getConfigProviderPropsRaw = defaultApplicationProps.getConfigProviderProps,
			antdAppProps,
			...props
		},
		forwardedRef,
	) => {
		const [layout, setLayout] = useState<LayoutRef | null>(null)
		const [initialState] = useState(initialStateRaw)
		const [breakpoint, setBreakpoint] = useState(initialState.breakpoint)
		const deviceColorScheme = usePrefersColorScheme(
			initialState.deviceColorScheme,
		)
		const hasPrimarySidebar = !!props.primarySidebar
		const hasSecondarySidebar = !!props.secondarySidebar
		const [primarySidebarCollapsed, setPrimarySidebarCollapsed] = useState(
			initialState.primarySidebarCollapsed,
		)
		const [secondarySidebarCollapsed, setSecondarySidebarCollapsed] = useState(
			initialState.secondarySidebarCollapsed,
		)
		const primarySidebar = useMemo<ApplicationSidebar | null>(() => {
			if (!hasPrimarySidebar) {
				return null
			}
			const result: ApplicationSidebar = {
				collapsed: primarySidebarCollapsed,
				collapse() {
					setPrimarySidebarCollapsed((value) => ({
						...value,
						[breakpoint]: true,
					}))
				},
				expand() {
					if (layout?.secondarySidebar.overflowed) {
						setSecondarySidebarCollapsed((value) => ({
							...value,
							[breakpoint]: true,
						}))
					}
					setPrimarySidebarCollapsed((value) => ({
						...value,
						[breakpoint]: false,
					}))
				},
				toggle() {
					if (primarySidebarCollapsed[breakpoint]) {
						this.expand()
					} else {
						this.collapse()
					}
				},
			}
			result.toggle = result.toggle.bind(result)
			return result
		}, [layout, breakpoint, hasPrimarySidebar, primarySidebarCollapsed])
		const secondarySidebar = useMemo<ApplicationSidebar | null>(() => {
			if (!hasSecondarySidebar) {
				return null
			}
			const result: ApplicationSidebar = {
				collapsed: secondarySidebarCollapsed,
				collapse() {
					setSecondarySidebarCollapsed((value) => ({
						...value,
						[breakpoint]: true,
					}))
				},
				expand() {
					if (layout?.primarySidebar.overflowed) {
						setPrimarySidebarCollapsed((value) => ({
							...value,
							[breakpoint]: true,
						}))
					}
					setSecondarySidebarCollapsed((value) => ({
						...value,
						[breakpoint]: false,
					}))
				},
				toggle() {
					if (secondarySidebarCollapsed[breakpoint]) {
						this.expand()
					} else {
						this.collapse()
					}
				},
			}
			result.toggle = result.toggle.bind(result)
			return result
		}, [layout, breakpoint, hasSecondarySidebar, secondarySidebarCollapsed])
		const [config, setConfig] = useState(initialState.config)

		const getConfigProviderProps = useRef(getConfigProviderPropsRaw)
		getConfigProviderProps.current = getConfigProviderPropsRaw
		const contextValue = useMemo<ApplicationContextValue>(() => {
			const value: Omit<ApplicationContextValue, "configProviderProps"> = {
				layout,
				breakpoint,
				deviceColorScheme,
				initialState,
				primarySidebar,
				secondarySidebar,
				config: {
					values: config,
					setValues: setConfig,
				},
			}
			const configProviderProps = getConfigProviderProps.current(value)
			return {
				...value,
				configProviderProps: {
					getPopupContainer() {
						return layout?.popupContainer ?? document.body
					},
					direction: "ltr",
					...configProviderProps,
					theme: {
						cssVar: true,
						...configProviderProps.theme,
					},
				},
			}
		}, [
			layout,
			breakpoint,
			deviceColorScheme,
			initialState,
			primarySidebar,
			secondarySidebar,
			config,
		])

		{
			const wrappedForwardedRef = useRef(forwardedRef)
			wrappedForwardedRef.current = forwardedRef
			useEffect(() => {
				const forwardedRef = wrappedForwardedRef.current
				if (typeof forwardedRef === "function") {
					forwardedRef(contextValue)
				} else if (forwardedRef) {
					forwardedRef.current = contextValue
				}
			}, [contextValue])

			const primarySidebarCollapsed =
				contextValue.primarySidebar?.collapsed[breakpoint]
			const secondarySidebarCollapsed =
				contextValue.secondarySidebar?.collapsed[breakpoint]
			const primarySidebarContextValue = useMemo<SiderContextProps>(
				() => ({
					siderCollapsed: primarySidebarCollapsed,
				}),
				[primarySidebarCollapsed],
			)
			const secondarySidebarContextValue = useMemo<SiderContextProps>(
				() => ({
					siderCollapsed: secondarySidebarCollapsed,
				}),
				[secondarySidebarCollapsed],
			)

			const collapsePrimarySidebar = contextValue.primarySidebar?.collapse
			const collapseSecondarySidebar = contextValue.secondarySidebar?.collapse
			const onSidebarsOverlayClick = useCallback<
				Required<LayoutProps>["onSidebarsOverlayClick"]
			>(() => {
				if (layout?.primarySidebar.overflowed) {
					collapsePrimarySidebar?.()
				}
				if (layout?.secondarySidebar.overflowed) {
					collapseSecondarySidebar?.()
				}
			}, [layout, collapsePrimarySidebar, collapseSecondarySidebar])

			const locale = contextValue.config.values.locale
			const i18nextInstance = useMemo(
				() =>
					i18next.cloneInstance({
						lng: locale,
					}),
				[locale],
			)

			return (
				<ConfigProvider {...contextValue.configProviderProps}>
					<CssVariables
						{...contextValue.configProviderProps}
						overrides
					>
						<ApplicationContext.Provider value={contextValue}>
							<App {...antdAppProps}>
								<I18nextProvider instance={i18nextInstance}>
									<Layout
										ref={setLayout}
										{...props}
										className={classNames(
											// classes.layout,
											classes[breakpoint],
											props.className,
										)}
										header={
											props.header
												? {
														...omit(props.header, [
															"primarySidebarToggler",
															"secondarySidebarToggler",
															"config",
														]),
														children: (
															<Header
																{...pick(props.header, [
																	"primarySidebarToggler",
																	"secondarySidebarToggler",
																	"config",
																])}
															>
																{props.header.children}
															</Header>
														),
													}
												: undefined
										}
										primarySidebar={
											contextValue.primarySidebar
												? {
														...props.primarySidebar,
														containerProps: {
															...props.primarySidebar?.containerProps,
															className: classNames(
																classes.primarySidebar,
																classes[breakpoint],
																{
																	[classes.collapsed]: primarySidebarCollapsed,
																	[classes.expanded]: !primarySidebarCollapsed,
																},
																props.primarySidebar?.containerProps?.className,
															),
														},
														children: (
															<SiderContext.Provider
																value={primarySidebarContextValue}
															>
																{props.primarySidebar?.children}
															</SiderContext.Provider>
														),
													}
												: undefined
										}
										secondarySidebar={
											contextValue.secondarySidebar
												? {
														...props.secondarySidebar,
														containerProps: {
															...props.secondarySidebar?.containerProps,
															className: classNames(
																classes.secondarySidebar,
																classes[breakpoint],
																{
																	[classes.collapsed]:
																		secondarySidebarCollapsed,
																	[classes.expanded]:
																		!secondarySidebarCollapsed,
																},
																props.secondarySidebar?.containerProps
																	?.className,
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
										direction={
											contextValue.configProviderProps.direction ?? "ltr"
										}
									/>
									<CurrentBreakpoint set={setBreakpoint} />
								</I18nextProvider>
							</App>
						</ApplicationContext.Provider>
					</CssVariables>
				</ConfigProvider>
			)
		}
	},
) as ApplicationComponent
