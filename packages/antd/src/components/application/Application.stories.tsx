import type { Meta, StoryObj } from "@storybook/react-vite"
import { Translation } from "react-i18next"

import { Form, Switch } from "antd"

import { Application } from "."
import { argTypes as layoutArgTypes } from "../layout/__storybook__/arg-types"
import { scrollParentDecorator } from "../layout/__storybook__/scroll-parent-decorator"
import { headerDefault } from "./__storybook__/args/header"
import { render } from "./__storybook__/render"

const meta = {
	title: "Components/Application",
	component: Application,
	parameters: {
		layout: "fullscreen",
	},
	tags: ["autodocs"],
	argTypes: {
		header: {
			table: {
				type: {
					summary:
						"React.HTMLAttributes<HTMLDivElement> & { sticky?: boolean; primarySidebarToggler?: false; secondarySidebarToggler?: false; config?: ReactNode | false }",
				},
				defaultValue: {
					summary: "undefined",
				},
			},
		},
		primarySidebar: layoutArgTypes.primarySidebar,
		main: layoutArgTypes.main,
		secondarySidebar: layoutArgTypes.secondarySidebar,
		footer: layoutArgTypes.footer,
		initialState: {
			table: {
				type: {
					summary: 'ApplicationProps["initialState"]',
				},
			},
		},
		antdAppProps: {
			table: {
				type: {
					summary: 'Omit<AppProps, "children">',
				},
			},
		},
	},
	subcomponents: { "Application.ConfigPage": Application.ConfigPage },
	decorators: [scrollParentDecorator],
	render: render(),
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
	parameters: {
		docs: {
			description: {
				story: "There is a component `Application.ConfigPage`.",
			},
		},
	},
	render: render({
		main: {
			children: (
				<Application.ConfigPage
					header={{
						title: (
							<div>
								<Translation ns={"application"}>
									{(t) => t("Settings")}
								</Translation>
							</div>
						),
					}}
				/>
			),
		},
	}),
}

export const CustomConfig: Story = {
	args: {
		header: {
			sticky: true,
		},
		primarySidebar: { sticky: true },
		secondarySidebar: { sticky: true },
		main: { component: "div" },
	},
	parameters: {
		docs: {
			description: {
				story:
					"Custom fields could be provided to configuration form using `header.config` property or children of `Application.ConfigPage` as well as custom form could be used by setting `header.config` to `false` and using `Application.useApplication` to synchronize values.",
			},
		},
	},
	render: render({
		header: {
			...headerDefault,
			config: (
				<Form.Item
					name="custom-field"
					label={"My custom field"}
				>
					<Switch />
				</Form.Item>
			),
		},
		main: {
			children: (
				<Application.ConfigPage
					header={{
						title: (
							<div>
								<Translation ns={"application"}>
									{(t) => t("Settings")}
								</Translation>
							</div>
						),
					}}
				>
					<Form.Item
						name="custom-field"
						label={"My custom field"}
					>
						<Switch />
					</Form.Item>
				</Application.ConfigPage>
			),
		},
	}),
}

export const Rtl: Story = {
	args: {
		header: {
			sticky: true,
		},
		primarySidebar: { sticky: true },
		secondarySidebar: { sticky: true },
		main: { component: "div" },
	},
	parameters: {
		docs: {
			description: {
				story: "Rtl-direction supported via `getConfigProviderProps` property.",
			},
		},
	},
	render: render({
		getConfigProviderProps: (context) => ({
			...Application.defaultProps.getConfigProviderProps(context),
			direction: "rtl",
		}),
	}),
}
