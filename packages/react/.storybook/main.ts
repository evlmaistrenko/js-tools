import type { StorybookConfig } from "@storybook/react-vite"

import { withoutVitePlugins } from "@storybook/builder-vite"

const config: StorybookConfig = {
	stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
	addons: [
		"@chromatic-com/storybook",
		"@storybook/addon-docs",
		"@storybook/addon-a11y",
		"@storybook/addon-vitest",
	],
	framework: {
		name: "@storybook/react-vite",
		options: {},
	},
	async viteFinal(config) {
		return {
			...config,
			plugins: await withoutVitePlugins(
				[...(config.plugins ?? [])],
				["vite:dts", "vite:lib-inject-css"],
			),
		}
	},
}
export default config
