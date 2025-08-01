import { WithOverlay as WithOverlayRaw } from "@evlmaistrenko/tools-react"

import classNames from "classnames"

import { CssVariables } from "../../utils/css-variables"
import classes from "./styles.module.css"

/**
 * [WithOverlay](https://evlmaistrenko.github.io/js-tools/react/storybook/?path=/docs/components-withoverlay--docs)
 * component styled for Ant Design.
 */
export const WithOverlay: typeof WithOverlayRaw = (props) => {
	return (
		<CssVariables>
			<WithOverlayRaw
				{...props}
				overlayProps={{
					...props.overlayProps,
					className: classNames(classes.overlay, props.overlayProps?.className),
				}}
			/>
		</CssVariables>
	)
}
