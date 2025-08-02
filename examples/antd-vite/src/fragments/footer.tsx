import { type FC } from "react"

import { Typography, theme } from "antd"

export const Footer: FC = () => {
	const { token } = theme.useToken()

	return (
		<Typography.Text
			type="secondary"
			style={{ display: "block", textAlign: "center", padding: token.padding }}
		>
			@evlmaistrenko/tools-example-antd-vite <br />
			v1.0.0
		</Typography.Text>
	)
}
