import type { FC } from "react"

import Icon from "@ant-design/icons/lib/components/Icon"

import type { IconProps } from "."

const Outlined = () => (
	<svg
		width="1em"
		height="1em"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path d="M9.23 14.37L8.94 19.14C9.42 19.14 9.64 18.92 9.91 18.67L12.15 16.62L16.97 20.15C17.88 20.66 18.48 20.43 18.73 19.36L21.91 5.5L21.92 5.49C22.22 4.22 21.52 3.68 20.63 4.02L2.54 10.8C1.3 11.28 1.32 11.96 2.32 12.25L7.17 13.62L17.59 7.5C18.1 7.19 18.56 7.36 18.17 7.69L9.23 14.37Z" />
	</svg>
)

const Filled = () => (
	<svg
		width="1em"
		height="1em"
		viewBox="0 0 24 24"
		fill="currentColor"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path d="M9.23 14.37L8.94 19.14C9.42 19.14 9.64 18.92 9.91 18.67L12.15 16.62L16.97 20.15C17.88 20.66 18.48 20.43 18.73 19.36L21.91 5.5L21.92 5.49C22.22 4.22 21.52 3.68 20.63 4.02L2.54 10.8C1.3 11.28 1.32 11.96 2.32 12.25L7.17 13.62L17.59 7.5C18.1 7.19 18.56 7.36 18.17 7.69L9.23 14.37Z" />
	</svg>
)

const TwoTone = () => (
	<svg
		width="1em"
		height="1em"
		viewBox="0 0 24 24"
		fill="#0088cc"
		stroke="currentColor"
		strokeWidth="1.5"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path d="M9.23 14.37L8.94 19.14C9.42 19.14 9.64 18.92 9.91 18.67L12.15 16.62L16.97 20.15C17.88 20.66 18.48 20.43 18.73 19.36L21.91 5.5L21.92 5.49C22.22 4.22 21.52 3.68 20.63 4.02L2.54 10.8C1.3 11.28 1.32 11.96 2.32 12.25L7.17 13.62L17.59 7.5C18.1 7.19 18.56 7.36 18.17 7.69L9.23 14.37Z" />
	</svg>
)

export const TelegramOutlined: FC<IconProps> = (props) => (
	<Icon
		component={Outlined}
		{...props}
	/>
)

export const TelegramFilled: FC<IconProps> = (props) => (
	<Icon
		component={Filled}
		{...props}
	/>
)

export const TelegramTwoTone: FC<IconProps> = (props) => (
	<Icon
		component={TwoTone}
		{...props}
	/>
)
