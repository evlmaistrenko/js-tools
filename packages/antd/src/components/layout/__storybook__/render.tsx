import { Layout, type LayoutProps } from ".."
import { footerDefault } from "../../layout/__storybook__/args/footer"
import { headerDefault } from "./args/header"
import { mainDefault } from "./args/main"
import { primarySidebarDefault } from "./args/primary-sidebar"
import { secondarySidebarDefault } from "./args/secondary-sidebar"

interface RenderArgs
	extends Omit<
		LayoutProps,
		"header" | "primarySidebar" | "main" | "secondarySidebar" | "footer"
	> {
	header?: LayoutProps["header"] | false
	primarySidebar?: LayoutProps["primarySidebar"] | false
	main?: LayoutProps["main"] | false
	secondarySidebar?: LayoutProps["secondarySidebar"] | false
	footer?: LayoutProps["footer"] | false
}

export const render =
	({
		header = headerDefault,
		primarySidebar = primarySidebarDefault,
		main = mainDefault,
		secondarySidebar = secondarySidebarDefault,
		footer = footerDefault,
		...renderArgs
	}: RenderArgs = {}) =>
	(args: LayoutProps) => {
		return (
			<Layout
				{...renderArgs}
				{...args}
				header={header !== false ? { ...header, ...args.header } : undefined}
				primarySidebar={
					primarySidebar !== false
						? {
								...primarySidebar,
								...args.primarySidebar,
							}
						: undefined
				}
				main={main !== false ? { ...main, ...args.main } : undefined}
				secondarySidebar={
					secondarySidebar !== false
						? {
								...secondarySidebar,
								...args.secondarySidebar,
							}
						: undefined
				}
				footer={footer !== false ? { ...footer, ...args.footer } : undefined}
			/>
		)
	}
