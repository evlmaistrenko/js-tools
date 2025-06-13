import React from "react"

import { Empty } from "antd"
import classNames from "classnames"

import classes from "./styles.module.css"

export interface LayoutPageProps extends React.HTMLAttributes<HTMLElement> {
	/** Structured header or custom `ReactNode`. */
	header?:
		| { title: React.ReactNode; breadcrumbs?: React.ReactNode }
		| { title?: React.ReactNode; breadcrumbs: React.ReactNode }
		| React.ReactNode
	/** Whether to center content. */
	centered?: boolean | "content-only"
	/** Custom root element. */
	component?: React.ElementType
}

/**
 * Page container with title, breadcrumbs or custom header. Content could be centered i.e. for page with
 * login form.
 */
export const Page: React.FC<LayoutPageProps> = ({
	header,
	centered,
	component: Component = "section",
	...props
}) => {
	const headerNode = React.useMemo(() => {
		if (
			typeof header === "object" &&
			header !== null &&
			("title" in header || "breadcrumbs" in header)
		) {
			return (
				<header className={classes.pageHeader}>
					{!!header.title && (
						<div className={classes.pageTitle}>{header.title}</div>
					)}
					{!!header.breadcrumbs && (
						<div className={classes.pageBreadcrumbs}>{header.breadcrumbs}</div>
					)}
				</header>
			)
		} else {
			return header
		}
	}, [header])

	return (
		<Component
			{...props}
			className={classNames(
				classes.page,
				{
					[classes.pageCentered]: centered === true,
					[classes.pageCenteredContentOnly]: centered === "content-only",
				},
				props.className,
			)}
		>
			{headerNode}
			<div className={classes.pageContentContainer}>
				<div className={classes.pageContent}>
					{props.children ?? <Empty className={classes.pageEmpty} />}
				</div>
			</div>
		</Component>
	)
}

Page.displayName = "Layout.Page"
