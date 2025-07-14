import { type WithOverlayProps } from "@evlmaistrenko/tools-react"
import {
	type ElementType,
	type ForwardRefExoticComponent,
	type HTMLAttributes,
	type MouseEventHandler,
	type RefAttributes,
	forwardRef,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react"

import { getScrollParent } from "@evlmaistrenko/tools-dom"
import {
	Layout as AntdLayout,
	type BackTopProps,
	FloatButton,
	theme,
} from "antd"
import classNames from "classnames"
import { getTargetScrollBarSize } from "rc-util/es/getScrollBarSize"

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

		const [scrollParent, setScrollParent] = useState<HTMLElement | null>(null)
		// eslint-disable-next-line react-hooks/exhaustive-deps
		useEffect(() => {
			if (!element) return
			setScrollParent(
				() => (getScrollParent(element) ?? document.body) as HTMLElement,
			)
		})

		const { token } = theme.useToken()
		useEffect(() => {
			if (!scrollParent) return
			if (!scrollParent.classList.contains(classes.scrollParent))
				scrollParent.classList.add(classes.scrollParent)
			scrollParent.style.setProperty(
				"scrollbar-color",
				`${token.colorBgLayout} ${token.colorBgContainer}`,
			)
			return () => {
				scrollParent.style.removeProperty("scrollbar-color")
				scrollParent.classList.remove(classes.scrollParent)
			}
		})

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

		const [cssVariables, setCssVariables] = useState<Record<string, string>>({
			"--evlta-layout-scrollbar-width": "0px",
		})
		useEffect(() => {
			if (!scrollParent) return
			let scrollbarWidth = 0
			if (
				(scrollParent === document.body &&
					window.innerWidth - document.documentElement.clientWidth > 0) ||
				scrollParent.scrollHeight > scrollParent.clientHeight
			) {
				scrollbarWidth = getTargetScrollBarSize(scrollParent).width
			}
			setCssVariables((values) => ({
				...values,
				"--evlta-layout-scrollbar-width": `${scrollbarWidth}px`,
			}))
		}, [scrollParent])

		useEffect(() => {
			if (!scrollParent) return
			if (scrollLocked) {
				scrollParent.style.setProperty("overflow-y", "hidden")
			} else {
				scrollParent.style.removeProperty("overflow-y")
			}
			return () => {
				scrollParent.style.removeProperty("overflow-y")
			}
		}, [scrollLocked, scrollParent])

		const backTopTarget = useCallback<Required<BackTopProps>["target"]>(() => {
			return (scrollParent === document.body ? null : scrollParent) ?? window
		}, [scrollParent])

		return (
			<AntdLayout
				ref={setElement}
				{...props}
				style={{ ...cssVariables, ...props.style } as LayoutProps["style"]}
				className={classNames(
					classes.layout,
					classes[direction],
					{ [classes.scrollLocked]: scrollLocked },
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
					<FloatButton.BackTop target={backTopTarget} />
				)}
			</AntdLayout>
		)
	},
) as LayoutComponent
