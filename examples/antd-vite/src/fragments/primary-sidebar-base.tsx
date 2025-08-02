import { type FC } from "react"

import { SettingOutlined } from "@ant-design/icons"
import { Flex, Menu, type MenuProps } from "antd"

export const PrimarySidebarBase: FC<{
	onMenuClick?: MenuProps["onClick"]
	selectedKeys?: MenuProps["selectedKeys"]
}> = ({ onMenuClick, selectedKeys }) => {
	return (
		<Flex
			vertical
			justify="space-between"
			style={{ height: "100%" }}
		>
			<Menu
				mode="inline"
				items={[
					{ key: "/settings", label: "Settings", icon: <SettingOutlined /> },
				]}
				onClick={onMenuClick}
				selectedKeys={selectedKeys}
			/>
		</Flex>
	)
}
