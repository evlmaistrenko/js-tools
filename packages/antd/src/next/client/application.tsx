import { type FC, useEffect, useState } from "react"

import { usePathname, useRouter } from "next/navigation"

import {
	type ApplicationProps,
	Application as Base,
} from "../../components/application"
import type {
	ApplicationConfigBase,
	ApplicationContextValue,
} from "../../components/application/context"
import { i18next } from "../../i18next"

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ""

export const Application: FC<ApplicationProps<ApplicationConfigBase>> = ({
	...props
}) => {
	const [ref, setRef] =
		useState<ApplicationContextValue<ApplicationConfigBase> | null>()
	const locale = ref?.config.values.locale
	const router = useRouter()
	const pathname = usePathname()
	useEffect(() => {
		if (!locale) return
		const url = new URL(window.location.href)
		const currentLocale = pathname
			.replace(basePath, "")
			.split("/")
			.filter(Boolean)[0]
		const locales = Object.keys(i18next.services.resourceStore.data)
		if (!locales.includes(currentLocale)) return
		if (locale !== currentLocale) {
			document.documentElement.lang = locale
			router.replace(
				`${pathname.replace(
					new RegExp(`/${currentLocale}(/|$)`),
					`/${locale}$1`,
				)}${url.search}${url.hash}`,
			)
		}
	}, [locale, router, pathname])

	return (
		<Base
			{...props}
			ref={setRef}
		/>
	)
}
