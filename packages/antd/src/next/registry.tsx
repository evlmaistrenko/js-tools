"use client"

import "@ant-design/v5-patch-for-react-19"
import { type ReactNode, useRef } from "react"

import { AntdRegistry } from "@ant-design/nextjs-registry"
import { useServerInsertedHTML } from "next/navigation"

export function Registry({
	metaViewport = true,
	metaColorScheme = true,
	children,
}: {
	metaColorScheme?: boolean
	metaViewport?: boolean
	children?: ReactNode
}) {
	const metaViewportInserted = useRef(false)
	useServerInsertedHTML(() => {
		if (metaViewportInserted.current || !metaViewport) {
			return
		}
		metaViewportInserted.current = true
		return (
			<meta
				name="viewport"
				content="width=device-width, initial-scale=1"
			/>
		)
	})

	const metaColorSchemeInserted = useRef(false)
	useServerInsertedHTML(() => {
		if (metaColorSchemeInserted.current || !metaColorScheme) {
			return
		}
		metaColorSchemeInserted.current = true
		return (
			<meta
				name="color-scheme"
				content="light dark"
			/>
		)
	})

	const resetInserted = useRef(false)
	useServerInsertedHTML(() => {
		if (resetInserted.current) {
			return
		}
		resetInserted.current = true
		return (
			<style
				dangerouslySetInnerHTML={{
					__html: `@layer antd {${process.env.RESET_CSS}}`,
				}}
			/>
		)
	})

	return <AntdRegistry layer>{children}</AntdRegistry>
}
