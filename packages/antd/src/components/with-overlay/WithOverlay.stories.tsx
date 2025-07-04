import type { Meta, StoryObj } from "@storybook/react-vite"

import { WithOverlay } from "."

const meta = {
	title: "Components/Utilities/WithOverlay",
	component: WithOverlay,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {
		children: {
			table: {
				disable: true,
			},
		},
		overlayProps: {
			control: false,
			table: {
				type: {
					summary: 'Omit<HTMLAttributes<HTMLDivElement>, "children">',
				},
			},
		},
	},
} satisfies Meta<typeof WithOverlay>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {
		overlaid: false,
		children: <div style={{ background: "#ececec", padding: 32 }}>CONTENT</div>,
	},
}
