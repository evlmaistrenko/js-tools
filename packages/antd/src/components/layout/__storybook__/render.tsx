import type { ReactNode } from "react"

import { Layout, type LayoutProps } from ".."
import { footer } from "./args/footer"
import { header } from "./args/header"
import { main, mainCompact } from "./args/main"
import { primarySidebar, primarySidebarCompact } from "./args/primary-sidebar"
import {
	secondarySidebar,
	secondarySidebarCompact,
} from "./args/secondary-sidebar"

export const render =
	({
		withHeader = true,
		withPrimarySidebar = true,
		withSecondarySidebar = true,
		withMain = true,
		withFooter = true,
		compact = true,
		compactMain = compact,
		mainChildren,
	}: {
		withHeader?: boolean
		withPrimarySidebar?: boolean
		withSecondarySidebar?: boolean
		withMain?: boolean
		withFooter?: boolean
		compact?: boolean
		compactMain?: boolean
		mainChildren?: ReactNode
	} = {}) =>
	(args: LayoutProps) => {
		let mainProps: LayoutProps["main"] = withMain
			? { ...(compactMain ? mainCompact : main), ...args.main }
			: undefined

		if (mainChildren && mainProps) {
			mainProps = { ...mainProps, children: mainChildren }
		}

		return (
			<Layout
				{...args}
				header={withHeader ? { ...header, ...args.header } : undefined}
				primarySidebar={
					withPrimarySidebar
						? {
								...(compact ? primarySidebarCompact : primarySidebar),
								...args.primarySidebar,
							}
						: undefined
				}
				secondarySidebar={
					withSecondarySidebar
						? {
								...(compact ? secondarySidebarCompact : secondarySidebar),
								...args.secondarySidebar,
							}
						: undefined
				}
				main={mainProps}
				footer={withFooter ? { ...footer, ...args.footer } : undefined}
			/>
		)
	}
