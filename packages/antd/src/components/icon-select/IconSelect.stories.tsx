import type { Meta, StoryObj } from "@storybook/react-vite"

import { AreaChartOutlined, PieChartOutlined } from "@ant-design/icons"

import { IconSelect } from "."

const meta = {
	title: "Components/IconSelect",
	component: IconSelect,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {
		options: {
			control: false,
		},
	},
} satisfies Meta<typeof IconSelect>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {
		options: [
			{
				label: "Option 1",
				value: "1",
				icon: <AreaChartOutlined />,
			},
			{
				label: "Option 2",
				value: "2",
				icon: <PieChartOutlined />,
			},
		],
	},
}
