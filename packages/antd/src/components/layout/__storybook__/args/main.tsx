import { loremIpsumParagraphs } from "../../../../utils/lorem-ipsum-paragraphs"

const component = "div" as const

export const mainDefault = {
	component,
	children: (
		<div style={{ textAlign: "center", width: "100%", padding: "1em" }}>
			<b>Main</b>
		</div>
	),
}

export const mainLong = {
	component,
	children: (
		<div
			style={{ padding: "1em", background: "var(--ant-color-bg-container)" }}
		>
			{loremIpsumParagraphs(30)}
		</div>
	),
}

export const mainCompact = {
	component,
	children: (
		<div
			style={{ padding: "1em", background: "var(--ant-color-bg-container)" }}
		>
			{loremIpsumParagraphs(3)}
		</div>
	),
}
