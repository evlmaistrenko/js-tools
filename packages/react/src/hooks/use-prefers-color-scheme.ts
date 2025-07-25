import { useEffect, useState } from "react"

/** Returns preferred color scheme. */
export function usePrefersColorScheme(
	initialState: "dark" | "light" | null = null,
): "dark" | "light" | null {
	const [value, setValue] = useState(initialState)
	useEffect(() => {
		const mediaQuery = matchMedia("(prefers-color-scheme: dark)")
		setValue(mediaQuery.matches ? "dark" : "light")
		const handleChange = (event: MediaQueryListEvent) =>
			setValue(event.matches ? "dark" : "light")
		mediaQuery.addEventListener("change", handleChange)
		return () => mediaQuery.removeEventListener("change", handleChange)
	}, [])
	return value
}
