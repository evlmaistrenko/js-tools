import { useCallback, useEffect } from "react"
import { useTranslation } from "react-i18next"

import { Dropdown, Typography } from "antd"
import classNames from "classnames"

import type { ApplicationHelloPage } from "."
import { i18next } from "../../../i18next"
import { Page } from "../../page"
import { type ApplicationConfigBase, useApplication } from "../context"
import classes from "./styles.module.css"

export const ApplicationHelloPageInner: typeof ApplicationHelloPage = ({
	locales = Object.keys(i18next.services.resourceStore.data),
	onLocaleChange,
	...props
}) => {
	const {
		config: {
			values: { locale },
			setValues,
		},
	} = useApplication<ApplicationConfigBase>()!

	const handleClick = useCallback(
		(event: object) => {
			if ("target" in event) {
				onLocaleChange?.(locale)
			} else if ("key" in event) {
				onLocaleChange?.(event.key as string)
			}
		},
		[onLocaleChange, locale],
	)

	useEffect(() => {
		const preferred = navigator.languages.find((lang) =>
			i18next.languages.includes(lang),
		)
		const fallback = navigator.languages.find((lang) =>
			i18next.languages.some((locale) => locale.startsWith(lang.split("-")[0])),
		)
		const locale = preferred ?? fallback
		if (locale) setValues((current) => ({ ...current, locale }))
	}, [setValues])

	const { t } = useTranslation("application-hello")

	return (
		<Page
			header={<Typography.Title>{t("Welcome!")}</Typography.Title>}
			{...props}
			className={classNames(classes.helloPage, props.className)}
		>
			<div className={classes.card}>
				<Typography.Paragraph className={classes.title}>
					{t("Choose your language:")}
				</Typography.Paragraph>
				<Dropdown.Button
					type="primary"
					onClick={handleClick}
					menu={{
						items: locales.map((locale) => ({
							key: locale,
							// @ts-expect-error `locale` is a key for `t`
							label: t(locale),
						})),
						onClick: handleClick,
					}}
					className={classes.dropdown}
				>
					{
						// @ts-expect-error `locale` is a key for `t`
						t(locale)
					}
				</Dropdown.Button>
			</div>
		</Page>
	)
}
