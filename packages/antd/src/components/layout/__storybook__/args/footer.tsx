import { Typography } from "antd"
import { loremIpsum } from "lorem-ipsum"

export const footer = {
	children: (
		<div style={{ textAlign: "center" }}>
			<Typography.Title level={5}>Footer</Typography.Title>
			<Typography.Paragraph>
				{loremIpsum({ count: 1, units: "sentences" })}
			</Typography.Paragraph>
		</div>
	),
}
