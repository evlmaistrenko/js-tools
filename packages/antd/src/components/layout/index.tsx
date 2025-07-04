import type { WithOverlayProps } from "@evlmaistrenko/tools-react"
import { useScrollParent } from "@evlmaistrenko/tools-react"
import type {
	ElementType,
	ForwardRefExoticComponent,
	HTMLAttributes,
	MouseEventHandler,
	RefAttributes,
} from "react"
import {
	forwardRef,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react"

import { Layout as AntdLayout, FloatButton, theme } from "antd"
import classNames from "classnames"

import { WithOverlay } from "../with-overlay"
import type { LayoutSidebarProps } from "./sidebar"
import { Sidebar } from "./sidebar"
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
}

export type LayoutRef = {
	element: HTMLDivElement | null
	primarySidebar: { overflowed: boolean }
	secondarySidebar: { overflowed: boolean }
}

export type LayoutComponent = ForwardRefExoticComponent<
	LayoutProps & RefAttributes<LayoutRef>
>

/**
 * Application layout based on Ant Design's `Layout`.
 *
 * ⚠️ To properly work must be in `ConfigProvider` context with `theme.cssVar: true`.
 *
 * @since 1.1.0
 */
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
		const wrappedForwardedRef = useRef(forwardedRef)
		wrappedForwardedRef.current = forwardedRef
		useEffect(() => {
			const value: LayoutRef = {
				element: element as HTMLDivElement | null,
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
		}, [element, overflowedSidebars])

		const {
			element: scrollParent,
			lockScroll,
			unlockScroll,
		} = useScrollParent(element, "vertical")
		const { token } = theme.useToken()
		useEffect(() => {
			if (!scrollParent) return
			const element = scrollParent as HTMLElement
			if (!element.classList.contains(classes.scrollParent))
				element.classList.add(classes.scrollParent)
			element.style.setProperty("--ant-layout-body-bg", token.colorBgLayout)
			element.style.setProperty(
				"--ant-color-bg-container",
				token.colorBgContainer,
			)
		})

		useEffect(() => {
			if (overflowedSidebar === "primary" && !primarySidebarSticky) return
			if (overflowedSidebar === "secondary" && !secondarySidebarSticky) return
			if (overflowedSidebars.length > 0) {
				lockScroll()
			} else {
				unlockScroll()
			}
			return unlockScroll
		}, [
			overflowedSidebars,
			primarySidebarSticky,
			secondarySidebarSticky,
			overflowedSidebar,
			lockScroll,
			unlockScroll,
		])

		return (
			<AntdLayout
				ref={setElement}
				{...props}
				className={classNames(
					classes.layout,
					classes[direction],
					props.className,
				)}
			>
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
				<AntdLayout className={classNames(classes.body, classes[direction])}>
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
						className={classNames(classes.main)}
						overlayProps={sidebarsOverlayProps}
					>
						<AntdLayout className={classes.mainLayout}>
							<MainComponent
								{...mainProps}
								className={classNames(classes.mainLayoutInner, mainClassName)}
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
					<FloatButton.BackTop
						target={() =>
							(scrollParent !== document.documentElement
								? (scrollParent as HTMLElement)
								: null) ?? window
						}
					/>
				)}
			</AntdLayout>
		)
	},
) as LayoutComponent
