import { Typography } from "antd"
import { loremIpsum } from "lorem-ipsum"

export const footerDefault = {
	children: (
		<div style={{ textAlign: "center" }}>
			<div style={{ textAlign: "center", padding: "1em" }}>
				<b>Footer</b>
			</div>
			<Typography.Paragraph>
				{loremIpsum({ count: 1, units: "sentences" })}
			</Typography.Paragraph>
		</div>
	),
}
