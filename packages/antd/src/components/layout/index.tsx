import { type WithOverlayProps } from "@evlmaistrenko/tools-react"
import {
	type ElementType,
	type ForwardRefExoticComponent,
	type HTMLAttributes,
	type MouseEventHandler,
	type RefAttributes,
	forwardRef,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react"

import { Layout as AntdLayout, type BackTopProps, FloatButton } from "antd"
import { ConfigContext } from "antd/es/config-provider"
import classNames from "classnames"

import { CssVariables } from "../../utils/css-variables"
import { WithOverlay } from "../with-overlay"
import { type LayoutSidebarProps, Sidebar } from "./sidebar"
import classes from "./styles.module.css"

export interface LayoutProps
	extends Omit<HTMLAttributes<HTMLElement>, "children"> {
	header?: HTMLAttributes<HTMLElement> & {
		sticky?: boolean
	}
	primarySidebar?: LayoutSidebarProps
	main?: HTMLAttributes<HTMLElement> & {
		component?: ElementType
	}
	secondarySidebar?: LayoutSidebarProps
	footer?: React.HTMLAttributes<HTMLElement>
	direction?: "ltr" | "rtl"
	/** Whether to render `FloatButton.BackTop`. */
	backTop?: boolean
	onSidebarsOverlayClick?: MouseEventHandler<HTMLDivElement>
	height?: Required<HTMLAttributes<HTMLDivElement>>["style"]["height"]
}

export type LayoutRef = {
	element: HTMLDivElement | null
	popupContainer: HTMLDivElement | null
	primarySidebar: { overflowed: boolean }
	secondarySidebar: { overflowed: boolean }
}

export type LayoutComponent = ForwardRefExoticComponent<
	LayoutProps & RefAttributes<LayoutRef>
>

/** Application layout based on Ant Design's `Layout`. */
export const Layout: LayoutComponent = forwardRef<LayoutRef, LayoutProps>(
	(
		{
			header,
			header: {
				className: headerClassName,
				sticky: headerSticky = true,
				...headerProps
			} = {},
			primarySidebar,
			primarySidebar: { sticky: primarySidebarSticky = true } = {},
			main: {
				component: MainComponent = AntdLayout.Content,
				className: mainClassName,
				...mainProps
			} = {},
			secondarySidebar,
			secondarySidebar: { sticky: secondarySidebarSticky = true } = {},
			footer,
			direction = "ltr",
			backTop = true,
			onSidebarsOverlayClick,
			...props
		},
		forwardedRef,
	) => {
		const [overflowedSidebars, setOverflowedSidebars] = useState<
			("primary" | "secondary")[]
		>([])
		const setOverflowedSidebar = useCallback(
			(sidebar: "primary" | "secondary", overflowed: boolean) => {
				setOverflowedSidebars((value) => {
					if (overflowed) {
						return [...value, sidebar].filter(
							(value, index, array) => array.indexOf(value) === index,
						)
					} else {
						return value.filter((value) => value !== sidebar)
					}
				})
			},
			[],
		)
		const setPrimarySidebarOverflowed = useCallback(
			(overflowed: boolean) => {
				setOverflowedSidebar("primary", overflowed)
			},
			[setOverflowedSidebar],
		)
		const setSecondarySidebarOverflowed = useCallback(
			(overflowed: boolean) => {
				setOverflowedSidebar("secondary", overflowed)
			},
			[setOverflowedSidebar],
		)

		const overflowedSidebar = overflowedSidebars[overflowedSidebars.length - 1]

		const sidebarsOverlayProps: WithOverlayProps["overlayProps"] = useMemo(
			() => ({ onClick: onSidebarsOverlayClick }),
			[onSidebarsOverlayClick],
		)

		const [element, setElement] = useState<HTMLElement | null>(null)
		const [popupContainer, setPopupContainer] = useState<HTMLElement | null>(
			null,
		)
		const wrappedForwardedRef = useRef(forwardedRef)
		wrappedForwardedRef.current = forwardedRef
		useEffect(() => {
			const value: LayoutRef = {
				element: element as HTMLDivElement | null,
				popupContainer: popupContainer as HTMLDivElement | null,
				primarySidebar: { overflowed: overflowedSidebars.includes("primary") },
				secondarySidebar: {
					overflowed: overflowedSidebars.includes("secondary"),
				},
			}
			const ref = wrappedForwardedRef.current
			if (typeof ref === "function") {
				ref(value)
			} else if (ref) {
				ref.current = value
			}
		}, [element, popupContainer, overflowedSidebars])

		const [scrollLocked, setScrollLocked] = useState(false)
		useEffect(() => {
			let scrollLocked = overflowedSidebars.length > 0
			if (overflowedSidebar === "primary" && !primarySidebarSticky) {
				scrollLocked = false
			}
			if (overflowedSidebar === "secondary" && !secondarySidebarSticky) {
				scrollLocked = false
			}
			setScrollLocked(scrollLocked)
		}, [
			overflowedSidebars,
			overflowedSidebar,
			primarySidebarSticky,
			secondarySidebarSticky,
		])

		const backTopTarget = useCallback<Required<BackTopProps>["target"]>(() => {
			return element ?? window
		}, [element])

		const { getPrefixCls } = useContext(ConfigContext)

		return (
			<CssVariables>
				<AntdLayout
					ref={setElement}
					{...props}
					className={classNames(
						classes.layout,
						classes[direction],
						{ [classes.locked]: scrollLocked },
						props.className,
					)}
				>
					<AntdLayout>
						{!!header && (
							<AntdLayout.Header
								{...headerProps}
								className={classNames(
									classes.header,
									{ [classes.sticky]: headerSticky },
									headerClassName,
								)}
							/>
						)}
						<AntdLayout className={classes.body}>
							{!!primarySidebar && (
								<Sidebar
									{...primarySidebar}
									sticky={primarySidebarSticky}
									withOverlayProps={{
										overlaid: overflowedSidebar === "secondary",
										overlayProps: sidebarsOverlayProps,
									}}
									setOverflowed={setPrimarySidebarOverflowed}
									containerProps={{
										...primarySidebar.containerProps,
										className: classNames(
											classes.sidebarPrimary,
											primarySidebar.containerProps?.className,
										),
									}}
								/>
							)}
							<WithOverlay
								overlaid={overflowedSidebars.length > 0}
								className={classes.mainWrapper}
								overlayProps={sidebarsOverlayProps}
							>
								<AntdLayout className={classes.mainLayout}>
									<MainComponent
										{...mainProps}
										className={classNames(classes.main, mainClassName)}
									/>
								</AntdLayout>
							</WithOverlay>
							{!!secondarySidebar && (
								<Sidebar
									{...secondarySidebar}
									sticky={secondarySidebarSticky}
									withOverlayProps={{
										overlaid: overflowedSidebar === "primary",
										overlayProps: sidebarsOverlayProps,
									}}
									setOverflowed={setSecondarySidebarOverflowed}
									containerProps={{
										...secondarySidebar.containerProps,
										className: classNames(
											classes.sidebarSecondary,
											secondarySidebar.containerProps?.className,
										),
									}}
								/>
							)}
						</AntdLayout>
						{!!footer && (
							<AntdLayout.Footer
								{...footer}
								className={classNames(classes.footer, footer.className)}
							/>
						)}
						{!!backTop && !overflowedSidebar && (
							<FloatButton.BackTop target={backTopTarget} />
						)}
						<div ref={setPopupContainer}>
							<style
								scoped
								dangerouslySetInnerHTML={{
									__html: `.${classes.layout} .${getPrefixCls("drawer")} { overflow: hidden; } .${classes.layout} .${getPrefixCls("drawer-content-wrapper")} { max-width: 70%; }`,
								}}
							/>
						</div>
					</AntdLayout>
				</AntdLayout>
			</CssVariables>
		)
	},
) as LayoutComponent
