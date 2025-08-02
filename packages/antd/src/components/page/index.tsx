import {
	type ElementType,
	type HTMLAttributes,
	type ReactNode,
	useMemo,
} from "react"

import { Empty } from "antd"
import classNames from "classnames"

import { CssVariables } from "../../utils/css-variables"
import classes from "./styles.module.css"

export interface PageProps extends HTMLAttributes<HTMLElement> {
	/** Structured header or custom `ReactNode`. */
	header?:
		| { title: ReactNode; breadcrumbs?: ReactNode }
		| { title?: ReactNode; breadcrumbs: ReactNode }
		| React.ReactNode
	/** Whether to center content. */
	centered?: boolean | "content-only"
	/** Custom root element. */
	component?: ElementType
}

/** Page container with title, breadcrumbs or custom header. */
export const Page: React.FC<PageProps> = ({
	header,
	centered,
	component: Component = "section",
	...props
}) => {
	const headerNode = useMemo(() => {
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
		<CssVariables>
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
		</CssVariables>
	)
}
