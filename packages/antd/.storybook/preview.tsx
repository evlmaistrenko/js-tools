import "@ant-design/v5-patch-for-react-19"
import type { Preview } from "@storybook/react-vite"

import { ConfigProvider } from "antd"
import "antd/dist/reset.css"

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},

		a11y: {
			// 'todo' - show a11y violations in the test UI only
			// 'error' - fail CI on a11y violations
			// 'off' - skip a11y checks entirely
			test: "todo",
		},
	},
}

export default preview

export const decorators = [
	(Story: React.FC) => {
		return (
			<ConfigProvider theme={{ cssVar: true }}>
				<Story />
			</ConfigProvider>
		)
	},
]
