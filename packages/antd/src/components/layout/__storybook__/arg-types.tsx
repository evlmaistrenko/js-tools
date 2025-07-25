import type { ArgTypes } from "@storybook/react-vite"

import { type LayoutProps } from ".."

export const argTypes: Partial<ArgTypes<LayoutProps>> = {
	header: {
		table: {
			type: {
				summary: "React.HTMLAttributes<HTMLElement> & { sticky?: boolean }",
			},
			defaultValue: {
				summary: "undefined",
			},
		},
	},
	primarySidebar: {
		table: {
			type: {
				summary: "React.HTMLAttributes<HTMLElement> & { sticky?: boolean }",
			},
			defaultValue: {
				summary: "undefined",
			},
		},
	},
	secondarySidebar: {
		table: {
			type: {
				summary: "React.HTMLAttributes<HTMLElement> & { sticky?: boolean }",
			},
			defaultValue: {
				summary: "undefined",
			},
		},
	},
	main: {
		table: {
			type: {
				summary:
					"React.HTMLAttributes<HTMLElement> & { component?: React.ElementType }",
			},
			defaultValue: {
				summary: "undefined",
			},
		},
	},
	footer: {
		control: false,
		table: {
			type: {
				summary: "React.HTMLAttributes<HTMLElement>",
			},
			defaultValue: {
				summary: "undefined",
			},
		},
	},
	direction: {
		table: {
			type: {
				summary: '"ltr" | "rtl"',
			},
		},
	},
	onSidebarsOverlayClick: {
		control: false,
		table: {
			defaultValue: {
				summary: "undefined",
			},
		},
	},
}
