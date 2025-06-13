import type { WithOverlayProps } from "@evlmaistrenko/tools-react"
import type {
	ElementType,
	ForwardRefExoticComponent,
	HTMLAttributes,
	MouseEventHandler,
	RefAttributes,
} from "react"
import { forwardRef, useCallback, useEffect, useMemo, useState } from "react"

import { Layout as AntdLayout, FloatButton } from "antd"
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
	/** Using for disable scrolling when sidebars overflowed horizontally and for `FloatBButton.BackTop`. */
	scrollParent?: HTMLElement
	/** Whether to render `FloatBButton.BackTop`. */
	backTop?: boolean
	onSidebarsOverlayClick?: MouseEventHandler<HTMLDivElement>
}

export type LayoutComponent = ForwardRefExoticComponent<
	LayoutProps & RefAttributes<HTMLDivElement>
>

/**
 * Application layout based on Ant Design's `Layout`.
 *
 * ⚠️ To properly work must be in `ConfigProvider` context with `theme.cssVar: true`.
 */
export const Layout: LayoutComponent = forwardRef<HTMLElement, LayoutProps>(
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
			scrollParent,
			backTop = true,
			onSidebarsOverlayClick,
			...props
		},
		ref,
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
		useEffect(() => {
			const container = scrollParent ?? document.documentElement
			if (overflowedSidebar === "primary" && !primarySidebarSticky) return
			if (overflowedSidebar === "secondary" && !secondarySidebarSticky) return
			const clean = () => {
				container.style.setProperty("overflow", "")
				container.style.setProperty("scrollbar-gutter", "")
			}
			if (overflowedSidebars.length > 0) {
				container.style.setProperty("overflow", "hidden")
				container.style.setProperty("scrollbar-gutter", "stable")
			} else {
				clean()
			}
			return clean
		}, [
			overflowedSidebars,
			scrollParent,
			primarySidebarSticky,
			secondarySidebarSticky,
			overflowedSidebar,
		])

		const sidebarsOverlayProps: WithOverlayProps["overlayProps"] = useMemo(
			() => ({ onClick: onSidebarsOverlayClick }),
			[onSidebarsOverlayClick],
		)

		return (
			<AntdLayout
				ref={ref}
				{...props}
				className={classNames(classes.layout, props.className)}
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
									classes[direction],
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
									classes[direction],
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
					<FloatButton.BackTop target={() => scrollParent ?? window} />
				)}
			</AntdLayout>
		)
	},
) as LayoutComponent
