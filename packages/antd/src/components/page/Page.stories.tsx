import type { Meta, StoryObj } from "@storybook/react-vite"

import { Button, Layout, Result } from "antd"

import { Page } from "."
import { loremIpsumParagraphs } from "../../utils/lorem-ipsum-paragraphs"
import { header } from "./__storybook__/args/header"

const meta = {
	title: "Components/Page",
	component: Page,
	parameters: {
		layout: "fullscreen",
	},
	tags: ["autodocs"],
	argTypes: {
		header: {
			control: false,
			table: {
				type: {
					summary:
						"{ title: React.ReactNode; breadcrumbs?: React.ReactNode } | { title?: React.ReactNode; breadcrumbs: React.ReactNode } | React.ReactNode",
				},
			},
		},
		centered: {
			control: false,
			table: {
				type: {
					summary: '"true" | "content-only"',
				},
			},
		},
		component: {
			control: false,
		},
	},
	decorators: [
		(Story: React.FC) => (
			<Layout style={{ minHeight: 600, height: "100%" }}>
				<Story />
			</Layout>
		),
	],
} satisfies Meta<typeof Page>

export default meta

type Story = StoryObj<typeof meta>

export const StructuredHeader: Story = {
	args: {
		header,
	},
	render: (args) => {
		return <Page {...args}>{loremIpsumParagraphs(3)}</Page>
	},
}

export const CustomHeader: Story = {
	args: {
		header: <h1>Custom header</h1>,
	},
}

export const Centered: Story = {
	args: {
		header,
		centered: true,
	},
}

export const CenteredContentOnly: Story = {
	args: {
		header,
		centered: "content-only",
	},
}

export const ErrorPage: Story = {
	args: {
		centered: true,
	},
	render: (args) => {
		return (
			<Page {...args}>
				<Result
					status="404"
					title="404"
					subTitle="Sorry, the page you visited does not exist."
					extra={<Button type="primary">Back Home</Button>}
				/>
			</Page>
		)
	},
}
