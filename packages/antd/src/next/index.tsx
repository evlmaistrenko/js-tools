import fs from "node:fs/promises"
import path from "node:path"

import type { ReactNode } from "react"

import { Client } from "./client"

export interface AntdKitProps {
	/** Path to `reset.css` relative to `process.cwd()`. */
	reset?: string
	children?: ReactNode
}

let resetCached: string | null = null

export async function AntdKit({
	reset = "./public/antd-reset.css",
	children,
}: AntdKitProps) {
	if (!resetCached) {
		resetCached = await fs.readFile(path.resolve(reset), {
			encoding: "utf-8",
		})
	}

	return <Client reset={resetCached}>{children}</Client>
}
