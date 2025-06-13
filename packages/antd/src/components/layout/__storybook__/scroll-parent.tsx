import type { Decorator } from "@storybook/react-vite"
import { type FC, useState } from "react"

import { Layout } from "antd"

import classes from "./styles.module.css"

// eslint-disable-next-line @typescript-eslint/no-explicit-any, react-refresh/only-export-components
const ScrollParent: FC<{ story: any; context: any }> = ({
	story: Story,
	context,
}) => {
	const [ref, setRef] = useState<HTMLElement | null>(null)
	return (
		<Layout
			ref={setRef}
			className={classes.scrollParent}
		>
			<Story
				args={{
					...context.args,
					scrollParent: ref,
				}}
			/>
		</Layout>
	)
}

export const scrollParent: Decorator = (Story, context) => {
	if (context.viewMode === "docs") {
		return (
			<ScrollParent
				story={Story}
				context={context}
			/>
		)
	}
	return <Story />
}
