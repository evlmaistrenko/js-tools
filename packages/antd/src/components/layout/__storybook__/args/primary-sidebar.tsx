import type { ReactNode } from "react"

import {
	AreaChartOutlined,
	BarChartOutlined,
	PieChartOutlined,
	RadarChartOutlined,
} from "@ant-design/icons"
import { Menu, Typography } from "antd"
import type { MenuItemType } from "antd/es/menu/interface"
import { loremIpsum } from "lorem-ipsum"

import { TelegramOutlined } from "../../../../icons"

const icons = [
	<AreaChartOutlined />,
	<PieChartOutlined />,
	<BarChartOutlined />,
	<TelegramOutlined />,
	<RadarChartOutlined />,
]

function getRandomInt(max: number): number {
	return Math.floor(Math.random() * max)
}

function getRandomIcon(): ReactNode {
	return icons[getRandomInt(icons.length)]
}

function getMenuItems(count = 100, prefix = ""): MenuItemType[] {
	return Array.from({ length: count })
		.map((_, key) => ({
			key: prefix + key,
			icon: getRandomIcon(),
			label: loremIpsum({ units: "words", count: getRandomInt(15) }),
			children:
				prefix === "" && key % 5 === 0 ? getMenuItems(3, key + "_") : undefined,
		}))
		.map((item) => {
			let label = item.label
			label = label.charAt(0).toUpperCase() + label.slice(1)
			return { ...item, label, title: label }
		})
}

export const primarySidebar = {
	children: (
		<>
			<Typography.Title
				level={5}
				style={{
					padding:
						"0 var(--evlmaistrenko-tools-antd--layout-padding-horizontal)",
					textAlign: "center",
				}}
			>
				Primary sidebar
			</Typography.Title>
			<Menu
				mode="inline"
				items={getMenuItems(50)}
			/>
		</>
	),
}

export const primarySidebarCompact = {
	children: (
		<>
			<Typography.Title
				level={5}
				style={{
					padding:
						"0 var(--evlmaistrenko-tools-antd--layout-padding-horizontal)",
					textAlign: "center",
				}}
				title="Primary sidebar"
				ellipsis
			>
				Primary sidebar
			</Typography.Title>
			<Menu
				mode="inline"
				items={getMenuItems(7)}
			/>
		</>
	),
}
