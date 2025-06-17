import type { ReactNode } from "react"

import { Application, type ApplicationProps } from ".."
import { footer } from "../../layout/__storybook__/args/footer"
import { header } from "../../layout/__storybook__/args/header"
import { main, mainCompact } from "../../layout/__storybook__/args/main"
import {
	primarySidebar,
	primarySidebarCompact,
} from "../../layout/__storybook__/args/primary-sidebar"
import {
	secondarySidebar,
	secondarySidebarCompact,
} from "../../layout/__storybook__/args/secondary-sidebar"

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
	(args: ApplicationProps) => {
		let mainProps: ApplicationProps["main"] = withMain
			? { ...(compactMain ? mainCompact : main), ...args.main }
			: undefined

		if (mainChildren && mainProps) {
			mainProps = { ...mainProps, children: mainChildren }
		}

		return (
			<Application
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
