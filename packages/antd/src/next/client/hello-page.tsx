import { type FC, useCallback } from "react"

import { useRouter } from "next/navigation"

import {
	ApplicationHelloPage,
	type ApplicationHelloPageProps,
} from "../../components/application/hello-page"

export const HelloPage: FC<
	Omit<ApplicationHelloPageProps, "onLocaleChange">
> = (props) => {
	const router = useRouter()
	const onLocaleChange = useCallback<
		Required<ApplicationHelloPageProps>["onLocaleChange"]
	>(
		(locale) => {
			router.push(`/${locale}`)
		},
		[router],
	)

	return (
		<ApplicationHelloPage
			onLocaleChange={onLocaleChange}
			{...props}
		/>
	)
}
