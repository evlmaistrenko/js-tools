import { type ReactNode, memo } from "react"

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
	memo(() => <AreaChartOutlined />),
	memo(() => <PieChartOutlined />),
	memo(() => <BarChartOutlined />),
	memo(() => <TelegramOutlined />),
	memo(() => <RadarChartOutlined />),
]

function getRandomInt(max: number): number {
	return Math.floor(Math.random() * max)
}

function getRandomIcon(): ReactNode {
	const Icon = icons[getRandomInt(icons.length)]
	return <Icon />
}

function getMenuItems(count = 100, prefix = ""): MenuItemType[] {
	return Array.from({ length: count })
		.map((_, key) => ({
			key: prefix + key,
			icon: getRandomIcon(),
			label: loremIpsum({ units: "words", count: getRandomInt(8) }),
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
					padding: "0 var(--evlta-layout-padding-horizontal)",
					textAlign: "center",
				}}
				title="Primary sidebar"
				ellipsis
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
					padding: "0 var(--evlta-layout-padding-horizontal)",
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
