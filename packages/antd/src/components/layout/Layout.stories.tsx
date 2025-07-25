import type { Meta, StoryObj } from "@storybook/react-vite"

// import { ConfigProvider } from "antd"
import { Layout } from "."
import { loremIpsumParagraphs } from "../../utils/lorem-ipsum-paragraphs"
import { Page } from "../page"
import { header as pageHeader } from "../page/__storybook__/args/header"
import { argTypes } from "./__storybook__/arg-types"
import { mainLong } from "./__storybook__/args/main"
import { primarySidebarLong } from "./__storybook__/args/primary-sidebar"
import { secondarySidebarLong } from "./__storybook__/args/secondary-sidebar"
import { render } from "./__storybook__/render"

// import { scrollParentDecorator } from "./__storybook__/scroll-parent-decorator"

const meta = {
	title: "Components/Layout",
	component: Layout,
	parameters: {
		layout: "fullscreen",
	},
	tags: ["autodocs"],
	argTypes,
	render: render(),
	// decorators: [scrollParentDecorator],
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
	parameters: {
		docs: {
			description: {
				story:
					"Consists of `header`, `primarySidebar`, `main`, `secondarySidebar` and `footer` parts.",
			},
		},
	},
}

export const StickyParts: Story = {
	args: {},
	parameters: {
		docs: {
			description: {
				story: "Header and sidebars are sticky by default.",
			},
		},
	},
	render: render({
		primarySidebar: primarySidebarLong,
		main: mainLong,
		secondarySidebar: secondarySidebarLong,
	}),
}

export const NotStickyParts: Story = {
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
	render: render({
		primarySidebar: primarySidebarLong,
		main: mainLong,
		secondarySidebar: secondarySidebarLong,
	}),
}

export const OverflowedSidebars: Story = {
	args: {
		primarySidebar: { style: { width: "150%" } },
	},
	parameters: {
		docs: {
			description: {
				story:
					"Sidebars could be overflowed, i.e. when expanded on small screens. This feature uses [ResizeObserver](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver).",
			},
		},
	},
	render: render({ primarySidebar: primarySidebarLong }),
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
	// render: render({
	// 	primarySidebar: primarySidebarLong,
	// 	main: mainLong,
	// 	secondarySidebar: secondarySidebarLong,
	// }),
	// decorators: [
	// 	(Story) => (
	// 		<ConfigProvider direction="rtl">
	// 			<Story />
	// 		</ConfigProvider>
	// 	),
	// ],
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
		header: false,
		secondarySidebar: false,
		footer: false,
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
		main: {
			component: "div",
			children: <Page header={pageHeader}>{loremIpsumParagraphs(5)}</Page>,
		},
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
		footer: false,
		header: false,
		primarySidebar: false,
		secondarySidebar: false,
		main: {
			children: (
				<Page
					header={pageHeader}
					centered="content-only"
				/>
			),
		},
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
		header: false,
		primarySidebar: false,
		secondarySidebar: false,
		main: {
			children: (
				<Page
					header={pageHeader}
					centered
				/>
			),
		},
	}),
}
