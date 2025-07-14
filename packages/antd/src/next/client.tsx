"use client"

import "@ant-design/v5-patch-for-react-19"
import { type ReactNode, useRef } from "react"

import { AntdRegistry } from "@ant-design/nextjs-registry"
import { useServerInsertedHTML } from "next/navigation"

export function Client({
	reset,
	children,
}: {
	reset?: string
	children?: ReactNode
}) {
	const resetInserted = useRef(false)
	useServerInsertedHTML(() => {
		if (resetInserted.current || !reset) {
			return
		}
		resetInserted.current = true
		return <style>{`@layer antd {${reset}}`}</style>
	})

	return <AntdRegistry layer>{children}</AntdRegistry>
}
