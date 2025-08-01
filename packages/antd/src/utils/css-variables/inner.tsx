import { type FC, type HTMLAttributes, useContext } from "react"

import { type Breakpoint, theme } from "antd"
import {
	ConfigContext,
	type ConfigProviderProps,
} from "antd/es/config-provider"

export interface CssVariablesProps extends ConfigProviderProps {
	breakpoint?: Breakpoint
	overrides?: boolean
}

export const Inner: FC<CssVariablesProps> = ({
	breakpoint = "xs",
	...props
}) => {
	const { token } = theme.useToken()
	const { getPrefixCls } = useContext(ConfigContext)
	let layoutPaddingHorizontal = `${token.paddingXS}px`
	let layoutPaddingVertical = `${token.paddingXS}px`
	if (breakpoint !== "xs") {
		layoutPaddingHorizontal = `${token.paddingSM}px`
		layoutPaddingVertical = `${token.paddingSM}px`
	}
	let layoutHeaderHeight = `var(--${getPrefixCls("layout-header-height", typeof props.theme?.cssVar === "boolean" ? undefined : props.theme?.cssVar?.prefix)})`
	if (!props.theme?.cssVar) {
		console.warn(
			"In order to properly work component needs `ConfigProvider`'s property `theme.cssVar` to be defined and not to be `false`",
		)
	}
	if (token.Layout?.headerHeight) {
		layoutHeaderHeight =
			typeof token.Layout.headerHeight === "number"
				? `${token.Layout.headerHeight}px`
				: token.Layout.headerHeight
	}

	return (
		<div
			style={
				{
					"--evlta-color-bg-layout": token.colorBgLayout,
					"--evlta-color-bg-container": token.colorBgContainer,
					"--evlta-color-bg-mask": token.colorBgMask,
					"--evlta-layout-height": "100vh",
					"--evlta-layout-padding-horizontal": layoutPaddingHorizontal,
					"--evlta-layout-padding-vertical": layoutPaddingVertical,
					"--evlta-layout-header-height": layoutHeaderHeight,
					"--evlta-motion-duration-slow": token.motionDurationSlow,
					"--evlta-gap": `${token.paddingXS}px`,
					"--evlta-screen-xs": "300px",
					"--evlta-screen-xs-max": `${token.screenXSMax}px`,
					"--evlta-screen-sm-min": `${token.screenSMMin}px`,
					"--evlta-screen-sm-max": `${token.screenSMMax}px`,
					"--evlta-screen-md-min": `${token.screenMDMin}px`,
					"--evlta-screen-md-max": `${token.screenMDMax}px`,
					"--evlta-screen-lg-min": `${token.screenLGMin}px`,
					"--evlta-screen-lg-max": `${token.screenLGMax}px`,
					"--evlta-screen-xl-min": `${token.screenXLMin}px`,
					"--evlta-screen-xl-max": `${token.screenXLMax}px`,
					"--evlta-screen-xxl-min": `${token.screenXXLMin}px`,
					"color": token.colorText,
				} as Required<HTMLAttributes<HTMLDivElement>>["style"]
			}
		>
			{props.children}
		</div>
	)
}
