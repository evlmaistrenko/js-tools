import fs from "node:fs/promises"
import path from "node:path"

if (
	JSON.parse(
		await fs.readFile(path.resolve("package.json"), { encoding: "utf-8" }),
	).dependencies.next
)
	await fs
		.copyFile(
			path.resolve("node_modules/antd/dist/reset.css"),
			path.resolve("public/antd-reset.css"),
		)
		.catch((error) => {
			console.warn(error)
		})
