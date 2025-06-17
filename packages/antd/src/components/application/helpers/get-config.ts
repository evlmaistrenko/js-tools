import type { ConfigProviderProps } from "antd"

// import type { ApplicationContextValue } from "../context"

export function getConfig(): ConfigProviderProps {
	return {
		direction: "ltr",
	}
}
