import { Application, type ApplicationProps } from ".."
import { footerDefault } from "../../layout/__storybook__/args/footer"
import { primarySidebarCompact } from "../../layout/__storybook__/args/primary-sidebar"
import { secondarySidebarCompact } from "../../layout/__storybook__/args/secondary-sidebar"
import { headerDefault } from "./args/header"
import { feedbackMain } from "./args/main"

interface RenderArgs
	extends Omit<
		ApplicationProps,
		"header" | "primarySidebar" | "main" | "secondarySidebar" | "footer"
	> {
	header?: ApplicationProps["header"] | false
	primarySidebar?: ApplicationProps["primarySidebar"] | false
	main?: ApplicationProps["main"] | false
	secondarySidebar?: ApplicationProps["secondarySidebar"] | false
	footer?: ApplicationProps["footer"] | false
}

export const render =
	({
		header = headerDefault,
		primarySidebar = primarySidebarCompact,
		main = feedbackMain,
		secondarySidebar = secondarySidebarCompact,
		footer = footerDefault,
		...renderArgs
	}: RenderArgs = {}) =>
	(
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		args: ApplicationProps<any>,
	) => {
		return (
			<Application
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
