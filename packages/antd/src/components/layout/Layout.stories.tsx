import type { Meta, StoryObj } from "@storybook/react-vite"

import { ConfigProvider } from "antd"

import { Layout } from "."
import { loremIpsumParagraphs } from "../../utils/lorem-ipsum-paragraphs"
import { Page } from "../page"
import { header as pageHeader } from "../page/__storybook__/args/header"
import { argTypes } from "./__storybook__/arg-types"
import { render } from "./__storybook__/render"
import { scrollParent } from "./__storybook__/scroll-parent"

const meta = {
	title: "Components/Layout",
	component: Layout,
	parameters: {
		layout: "fullscreen",
	},
	tags: ["autodocs"],
	argTypes,
	render: render(),
	decorators: [scrollParent],
} satisfies Meta<typeof Layout>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {
		header: { sticky: true },
		primarySidebar: { sticky: true },
		secondarySidebar: { sticky: true },
		main: { component: "div" },
		direction: "ltr",
	},
	render: render({ compactMain: false }),
}

export const LongContent: Story = {
	args: {},
	render: render({ compact: false }),
}

export const NotSticky: Story = {
	args: {
		header: { sticky: false },
		primarySidebar: { sticky: false },
		secondarySidebar: { sticky: false },
	},
	parameters: {
		docs: {
			description: {
				story: "Header and sidebars could be not sticky.",
			},
		},
	},
	render: render({ compact: false }),
}

export const OverflowedSidebars: Story = {
	args: {
		primarySidebar: { style: { width: "150%" } },
	},
	parameters: {
		docs: {
			description: {
				story:
					"Sidebars could be overflowed (i.e. when expanded on small screens).",
			},
		},
	},
	render: render({ compact: false }),
}

export const Rtl: Story = {
	args: {
		direction: "rtl",
	},
	parameters: {
		docs: {
			description: {
				story: "Rtl-direction supported.",
			},
		},
	},
	decorators: [
		(Story) => (
			<ConfigProvider direction="rtl">
				<Story />
			</ConfigProvider>
		),
	],
}

export const WithoutSomeParts: Story = {
	args: {},
	parameters: {
		docs: {
			description: {
				story: "Could be used without some parts.",
			},
		},
	},
	render: render({
		withHeader: false,
		withSecondarySidebar: false,
		withFooter: false,
	}),
}

export const WithPage: Story = {
	args: {},
	parameters: {
		docs: {
			description: {
				story: "Using `Page` component.",
			},
		},
	},
	render: render({
		mainChildren: <Page header={pageHeader}>{loremIpsumParagraphs(5)}</Page>,
	}),
}

export const WithOnlyPage: Story = {
	args: {},
	parameters: {
		docs: {
			description: {
				story: "Using `Page` without other parts.",
			},
		},
	},
	render: render({
		withFooter: false,
		withHeader: false,
		withPrimarySidebar: false,
		withSecondarySidebar: false,
		mainChildren: (
			<Page
				header={pageHeader}
				centered
			/>
		),
	}),
}

export const WithPageAndSomeParts: Story = {
	args: {},
	parameters: {
		docs: {
			description: {
				story: "Using `Page` with some parts.",
			},
		},
	},
	render: render({
		withHeader: false,
		withPrimarySidebar: false,
		withSecondarySidebar: false,
		mainChildren: (
			<Page
				header={pageHeader}
				centered
			/>
		),
	}),
}
