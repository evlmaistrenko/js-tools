import { type ReactNode, useRef } from "react"

import { AntdRegistry } from "@ant-design/nextjs-registry"
import { useServerInsertedHTML } from "next/navigation"

/** Registers CSS-in-JS and meta tags for layout. */
export function Registry({
	metaColorScheme = true,
	children,
}: {
	metaColorScheme?: boolean
	metaViewport?: boolean
	children?: ReactNode
}) {
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
