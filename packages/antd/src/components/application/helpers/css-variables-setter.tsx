import { type FC, useEffect } from "react"

import { theme } from "antd"
import { kebabCase, mapKeys, mapValues } from "lodash"

export const CssVariablesSetter: FC<{
	setter: (value: Record<string, string>) => void
}> = ({ setter }) => {
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
		setter(
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
					(_, key) =>
						`--evlmaistrenko-tools-antd--application-${kebabCase(key)}`,
				),
				(val) => `${val}px`,
			),
		)
	}, [
		setter,
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
