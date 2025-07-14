"use client"

import "@ant-design/v5-patch-for-react-19"
import { type ReactNode, useRef } from "react"

import { AntdRegistry } from "@ant-design/nextjs-registry"
import { useServerInsertedHTML } from "next/navigation"

export function Registry({ children }: { children?: ReactNode }) {
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
