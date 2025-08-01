import { useCallback, useEffect } from "react"
import { useTranslation } from "react-i18next"

import { Dropdown, Typography } from "antd"
import classNames from "classnames"

import type { ApplicationHelloPage } from "."
import { i18next, i18nextLocales } from "../../../i18next"
import { Page } from "../../page"
import { type ApplicationConfigBase, useApplication } from "../context"
import classes from "./styles.module.css"

export const ApplicationHelloPageInner: typeof ApplicationHelloPage = ({
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
		const locales = Object.keys(i18next.services.resourceStore.data)
		const preferred = navigator.languages.find((lang) => locales.includes(lang))
		const fallback = navigator.languages.find((lang) =>
			locales.some((locale) => locale.startsWith(lang.split("-")[0])),
		)
		const locale = preferred ?? fallback
		if (locale) setValues((current) => ({ ...current, locale }))
	}, [setValues])

	const { t } = useTranslation("applicationHelloPage")

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
						items: i18nextLocales.map((locale) => {
							return {
								key: locale.value!,
								label: locale.label,
							}
						}),
						onClick: handleClick,
					}}
					className={classes.dropdown}
				>
					{i18nextLocales.find(({ value }) => value === locale)?.label}
				</Dropdown.Button>
			</div>
		</Page>
	)
}
