import type { Meta, StoryObj } from "@storybook/react-vite"

import { Application } from "."
import { scrollParentDecorator } from "../layout/__storybook__/scroll-parent-decorator"
import { render } from "./__storybook__/render"

// const argTypes: Partial<ArgTypes<ApplicationProps>> = {
// 	...layoutArgTypes,
// 	initialBreakpoint: {
// 		control: false,
// 	},
// 	initialState: {
// 		control: false,
// 	},
// }
// // @ts-expect-error Not needed
// delete argTypes.onSidebarsOverlayClick
// // @ts-expect-error Not needed
// delete argTypes.direction

const meta = {
	title: "Components/Application",
	component: Application,
	parameters: {
		layout: "fullscreen",
	},
	tags: ["autodocs"],
	decorators: [scrollParentDecorator],
} satisfies Meta<typeof Application>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {
		header: {
			sticky: true,
		},
		primarySidebar: { sticky: true },
		secondarySidebar: { sticky: true },
		main: { component: "div" },
	},
	//@ts-expect-error foobar
	render: render({ compactMain: false }),
}

export const ConfigPage: Story = {
	args: {
		header: {
			sticky: true,
		},
		primarySidebar: { sticky: true },
		secondarySidebar: { sticky: true },
		main: { component: "div" },
	},
	//@ts-expect-error foobar
	render: render({ mainChildren: <Application.ConfigPage /> }),
}
