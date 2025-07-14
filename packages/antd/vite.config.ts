/// <reference types="vitest/config" />
import path from "node:path"
import { fileURLToPath } from "node:url"

import react from "@vitejs/plugin-react"

import { storybookTest } from "@storybook/addon-vitest/vitest-plugin"
import * as csso from "csso"
import fs from "fs/promises"
import { createRequire } from "module"
import preserveDirectives from "rollup-preserve-directives"
import { defineConfig } from "vite"
import dts from "vite-plugin-dts"
import { libInjectCss } from "vite-plugin-lib-inject-css"

const require = createRequire(import.meta.url)

const dirname =
	typeof __dirname !== "undefined"
		? __dirname
		: path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
	define: {
		"process.env.RESET_CSS": JSON.stringify(
			csso.minify(
				await fs.readFile(require.resolve("antd/dist/reset.css"), {
					encoding: "utf-8",
				}),
			).css,
		),
	},
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
			entry: {
				"index": path.resolve("src/index.ts"),
				"i18next": path.resolve("src/i18next/index.ts"),
				"next": path.resolve("src/next/index.ts"),
				"next-registry": path.resolve("src/next/registry.tsx"),
			},
			fileName: (_, name) => `${name}.js`,
			cssFileName: "index",
			formats: ["es"],
		},
		rollupOptions: {
			plugins: [preserveDirectives()],
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
