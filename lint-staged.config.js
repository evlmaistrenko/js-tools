/** @type {import("lint-staged").Configuration} */
export default {
	"*": ["npx --no -- prettier --write --ignore-unknown", "npx --no -- eslint"],
}
