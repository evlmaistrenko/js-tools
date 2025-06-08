import reactHooks from "eslint-plugin-react-hooks"
import reactRefresh from "eslint-plugin-react-refresh"

import js from "@eslint/js"
import prettier from "eslint-plugin-prettier/recommended"
import storybook from "eslint-plugin-storybook"
import globals from "globals"
import tseslint from "typescript-eslint"

export default tseslint.config(
	{
		extends: [
			js.configs.recommended,
			prettier,
			...tseslint.configs.recommended,
		],
		files: ["**/*.{js,jsx,ts,tsx}"],
		languageOptions: {
			ecmaVersion: 2025,
			globals: {
				...globals.browser,
				...globals.node,
			},
		},
	},
	{
		extends: [js.configs.recommended, ...tseslint.configs.recommended],
		files: ["./packages/react/**/*.{ts,tsx}"],
		languageOptions: {
			ecmaVersion: 2025,
			globals: globals.browser,
		},
		plugins: {
			"react-hooks": reactHooks,
			"react-refresh": reactRefresh,
		},
		rules: {
			...reactHooks.configs.recommended.rules,
			"react-refresh/only-export-components": [
				"warn",
				{ allowConstantExport: true },
			],
		},
	},
	{
		extends: [storybook.configs["flat/recommended"]],
	},
	{
		ignores: [
			"**/dist/",
			"**/docs/",
			"**/node_modules/",
			"**/*.module.css.d.ts",
		],
	},
)
