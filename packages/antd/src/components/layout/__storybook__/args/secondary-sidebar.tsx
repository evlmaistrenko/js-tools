import { Typography } from "antd"

import { loremIpsumParagraphs } from "../../../../utils/lorem-ipsum-paragraphs"

export const secondarySidebar = {
	children: (
		<div style={{ minWidth: 250, padding: "0 1em" }}>
			<Typography.Title
				level={5}
				style={{
					textAlign: "center",
				}}
				title="Secondary sidebar"
				ellipsis
			>
				Secondary sidebar
			</Typography.Title>
			{loremIpsumParagraphs(10)}
		</div>
	),
}

export const secondarySidebarCompact = {
	children: (
		<div style={{ minWidth: 250, padding: "0 1em" }}>
			<Typography.Title
				level={5}
				style={{
					textAlign: "center",
				}}
			>
				Secondary sidebar
			</Typography.Title>
			{loremIpsumParagraphs(1)}
		</div>
	),
}
