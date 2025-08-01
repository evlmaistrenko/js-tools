import { type FC, useCallback } from "react"

import { useRouter } from "next/navigation"

import {
	type ApplicationHelloPageProps,
	ApplicationHelloPage as Base,
} from "../../components/application/hello-page"

export const ApplicationHelloPage: FC<
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
		<Base
			onLocaleChange={onLocaleChange}
			{...props}
		/>
	)
}
