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
import { i18nextLocales } from "../../i18next"

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ""

/**
 * Application component that wraps the base application with additional functionality such as locale
 * handling.
 *
 * @remarks
 *   This component is used to ensure that the application is rendered with the correct locale based on the
 *   user's preferences and the available locales. Not intended for nested usage: this component should
 *   not be nested within another instance of itself.
 */
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
		const locales = i18nextLocales.map((locale) => locale.value)
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
