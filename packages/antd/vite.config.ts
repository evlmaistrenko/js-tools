import path from "node:path"

import react from "@vitejs/plugin-react"

import { defineConfig } from "vite"
import dts from "vite-plugin-dts"
import { libInjectCss } from "vite-plugin-lib-inject-css"

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
			external: [
				"react",
				"react-dom",
				"react/jsx-runtime",
				"classnames",
				"antd",
				"@ant-design/icons",
				"@ant-design/icons/lib/components/Icon",
				"lodash",
			],
		},
	},
})
