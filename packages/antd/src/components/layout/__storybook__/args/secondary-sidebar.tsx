import { loremIpsumParagraphs } from "../../../../utils/lorem-ipsum-paragraphs"

export const secondarySidebarDefault = {
	"aria-label": "sidebar",
	"children": (
		<div style={{ padding: "1em", textAlign: "center" }}>
			<b>Secondary sidebar</b>
		</div>
	),
}

export const secondarySidebarLong = {
	"aria-label": "sidebar",
	"children": (
		<div style={{ minWidth: 250, padding: "0 1em" }}>
			{loremIpsumParagraphs(10)}
		</div>
	),
}

export const secondarySidebarCompact = {
	"aria-label": "sidebar",
	"children": (
		<div style={{ minWidth: 250, padding: "0 1em" }}>
			{loremIpsumParagraphs(1)}
		</div>
	),
}
