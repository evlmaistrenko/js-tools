import { WithOverlay as WithOverlayRaw } from "@evlmaistrenko/tools-react"
import type { HTMLAttributes } from "react"

import { theme } from "antd"
import classNames from "classnames"

import classes from "./styles.module.css"

/**
 * [WithOverlay](https://evlmaistrenko.github.io/js-tools/react/storybook/?path=/docs/components-withoverlay--docs)
 * component styled for Ant Design.
 */
export const WithOverlay: typeof WithOverlayRaw = (props) => {
	const {
		token: { colorBgMask },
	} = theme.useToken()

	return (
		<WithOverlayRaw
			{...props}
			style={
				{
					...props.overlayProps?.style,
					"--ant-color-bg-mask": colorBgMask,
				} as HTMLAttributes<HTMLDivElement>["style"]
			}
			overlayProps={{
				...props.overlayProps,
				className: classNames(classes.overlay, props.overlayProps?.className),
			}}
		/>
	)
}
