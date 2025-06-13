import { Card, Typography } from "antd"

import { loremIpsumParagraphs } from "../../../../utils/lorem-ipsum-paragraphs"

const component = "div" as const

export const main = {
	component,
	children: (
		<Card style={{ width: "100%" }}>
			<Typography.Title level={5}>Main</Typography.Title>
			{loremIpsumParagraphs(30)}
		</Card>
	),
}

export const mainCompact = {
	component,
	children: (
		<Card style={{ width: "100%" }}>
			<Typography.Title level={5}>Main</Typography.Title>
			{loremIpsumParagraphs(3)}
		</Card>
	),
}
