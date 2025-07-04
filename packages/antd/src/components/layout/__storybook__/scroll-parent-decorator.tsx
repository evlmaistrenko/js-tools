import type { Decorator } from "@storybook/react-vite"

import classes from "./styles.module.css"

export const scrollParentDecorator: Decorator = (Story, context) => {
	if (context.viewMode === "docs") {
		return (
			<div className={classes.scrollParent}>
				<Story {...context.args} />
			</div>
		)
	}
	return <Story />
}
