import { Typography } from "antd"
import { loremIpsum } from "lorem-ipsum"

export const loremIpsumParagraphs = (count = 1) => {
	return Array.from({ length: count }).map((_, key) => (
		<Typography.Paragraph key={key}>
			{loremIpsum({ count: 1, units: "paragraphs" })}
		</Typography.Paragraph>
	))
}
