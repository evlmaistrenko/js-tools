import {
	type ReactElement,
	type ReactNode,
	type RefAttributes,
	forwardRef,
	useMemo,
} from "react"

import { Flex, Select, type SelectProps } from "antd"
import classNames from "classnames"
import type { BaseSelectRef } from "rc-select"
import type { BaseOptionType } from "rc-select/lib/Select"

import classes from "./styles.module.css"

export interface IconSelectOption<ValueType = unknown> extends BaseOptionType {
	icon?: ReactNode
	value?: ValueType
}

const renderOption =
	(options?: IconSelectOption[]) => (option: IconSelectOption) => (
		<Flex justify="space-between">
			<span>{option.label ?? option.data.label}</span>
			{option.data?.icon ??
				options?.find(({ value }) => value === option.value)?.icon}
		</Flex>
	)

export type IconSelectComponent = (<
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	ValueType = any,
	OptionType extends IconSelectOption<ValueType> = IconSelectOption<ValueType>,
>(
	props: SelectProps<ValueType, OptionType> & RefAttributes<BaseSelectRef>,
) => ReactElement) & {
	displayName?: string
}

/** Select based on Ant Design's `Select` component and supports icons in options. */
export const IconSelect: IconSelectComponent = forwardRef<
	BaseSelectRef,
	SelectProps
>((props, forwardedRef) => {
	const options = props.options
	const render = useMemo(() => renderOption(options), [options])
	return (
		<Select
			optionRender={render}
			labelRender={render}
			{...props}
			className={classNames(classes.select, props.className)}
			ref={forwardedRef}
		/>
	)
}) as IconSelectComponent
