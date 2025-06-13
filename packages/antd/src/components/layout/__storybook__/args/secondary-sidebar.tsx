import { Typography } from "antd"

import { loremIpsumParagraphs } from "../../../../utils/lorem-ipsum-paragraphs"

export const secondarySidebar = {
	children: (
		<>
			<Typography.Title
				level={5}
				style={{
					textAlign: "center",
				}}
			>
				Secondary sidebar
			</Typography.Title>
			{loremIpsumParagraphs(10)}
		</>
	),
}

export const secondarySidebarCompact = {
	children: (
		<>
			<Typography.Title
				level={5}
				style={{
					textAlign: "center",
				}}
			>
				Secondary sidebar
			</Typography.Title>
			{loremIpsumParagraphs(1)}
		</>
	),
}
