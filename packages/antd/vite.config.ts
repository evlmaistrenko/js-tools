/// <reference types="vitest/config" />
import path from "node:path"
import { fileURLToPath } from "node:url"

import react from "@vitejs/plugin-react"

import { storybookTest } from "@storybook/addon-vitest/vitest-plugin"
import { defineConfig } from "vite"
import dts from "vite-plugin-dts"
import { libInjectCss } from "vite-plugin-lib-inject-css"

const dirname =
	typeof __dirname !== "undefined"
		? __dirname
		: path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		dts({
			tsconfigPath: "./tsconfig.app.json",
			rollupTypes: true,
		}),
		libInjectCss(),
	],
	build: {
		lib: {
			entry: path.resolve("src/index.ts"),
			fileName: "index",
			cssFileName: "index",
			formats: ["es"],
		},
		rollupOptions: {
			external: (id) => {
				return !id.startsWith(".") && !path.isAbsolute(id)
			},
		},
	},
	test: {
		projects: [
			{
				extends: true,
				plugins: [
					// The plugin will run tests for the stories defined in your Storybook config
					// See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
					storybookTest({
						configDir: path.join(dirname, ".storybook"),
						storybookUrl:
							process.env.ANTD_STORYBOOK_URL ?? "http://localhost:6006",
					}),
				],
				test: {
					name: "storybook",
					browser: {
						enabled: true,
						headless: true,
						provider: "playwright",
						instances: [{ browser: "chromium" }],
					},
					setupFiles: [".storybook/vitest.setup.ts"],
				},
			},
		],
	},
})
