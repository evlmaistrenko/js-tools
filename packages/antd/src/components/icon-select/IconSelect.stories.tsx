import type { Meta, StoryObj } from "@storybook/react-vite"

import { AreaChartOutlined, PieChartOutlined } from "@ant-design/icons"
import { Form } from "antd"

import { IconSelect } from "."

const meta = {
	title: "Components/DataEntry/IconSelect",
	component: IconSelect,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {
		options: {
			control: false,
			table: {
				type: {
					summary: "(BaseOptionType & {icon?: ReactNode})[]",
				},
			},
		},
	},
	render: (args) => (
		<Form layout="vertical">
			<Form.Item
				name="icon-select"
				label="Icon select"
			>
				<IconSelect
					{...args}
					style={{ ...args.style, width: 150 }}
				/>
			</Form.Item>
		</Form>
	),
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
