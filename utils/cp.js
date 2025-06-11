import fs from "node:fs/promises"
import path from "node:path"

const files = process.argv.slice(2)
const dest = files.pop()

if (!dest) {
	throw new Error("Destination directory is required.")
}

await Promise.all(
	files.map((src) =>
		fs.copyFile(path.resolve(src), path.resolve(dest, path.basename(src))),
	),
)
