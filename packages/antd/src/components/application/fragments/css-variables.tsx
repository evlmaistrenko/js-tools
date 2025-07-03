import { type Dispatch, type FC, type SetStateAction, useEffect } from "react"

import { theme } from "antd"
import { kebabCase, mapKeys, mapValues } from "lodash"

export const CssVariables: FC<{
	set: Dispatch<SetStateAction<Record<string, string>>>
}> = ({ set }) => {
	const {
		token: {
			screenXSMax,
			screenSMMin,
			screenSMMax,
			screenMDMin,
			screenMDMax,
			screenLGMin,
			screenLGMax,
			screenXLMin,
			screenXLMax,
			screenXXLMin,
		},
	} = theme.useToken()
	const screenXSMin = 300

	useEffect(() => {
		set(
			mapValues(
				mapKeys(
					{
						screenXSMin,
						screenXSMax,
						screenSMMin,
						screenSMMax,
						screenMDMin,
						screenMDMax,
						screenLGMin,
						screenLGMax,
						screenXLMin,
						screenXLMax,
						screenXXLMin,
					},
					(_, key) => `--evlta-application-${kebabCase(key)}`,
				),
				(val) => `${val}px`,
			),
		)
	}, [
		set,
		screenXSMin,
		screenXSMax,
		screenSMMin,
		screenSMMax,
		screenMDMin,
		screenMDMax,
		screenLGMin,
		screenLGMax,
		screenXLMin,
		screenXLMax,
		screenXXLMin,
	])

	return null
}
