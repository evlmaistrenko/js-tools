import type { ArgTypes, Meta, StoryObj } from "@storybook/react-vite"

import { Application, type ApplicationProps } from "."
import { argTypes as layoutArgTypes } from "../layout/__storybook__/arg-types"
import { scrollParent } from "../layout/__storybook__/scroll-parent"
import { render } from "./__storybook__/render"

const argTypes: Partial<ArgTypes<ApplicationProps>> = {
	...layoutArgTypes,
	initialLayoutSize: {
		control: false,
		table: {
			type: {
				summary: '"xs" | "sm" | "md" | "lg" | "xl" | "xxl"',
			},
		},
	},
	initialState: {
		control: false,
		table: {
			type: {
				summary:
					'Record<"xs" | "sm" | "md" | "lg" | "xl" | "xxl", { primarySidebarCollapsed: boolean; secondarySidebarCollapsed: boolean }>',
			},
		},
	},
}
// @ts-expect-error Not needed
delete argTypes.onSidebarsOverlayClick
// @ts-expect-error Not needed
delete argTypes.direction

const meta = {
	title: "Components/Application",
	component: Application,
	parameters: {
		layout: "fullscreen",
	},
	tags: ["autodocs"],
	argTypes,
	render: render(),
	decorators: [scrollParent],
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
	render: render({ compactMain: false }),
}
