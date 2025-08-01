import type { ComponentProps, ReactNode } from "react"

import classNames from "classnames"
import kz from "svg-country-flags/svg/kz.svg"
import ru from "svg-country-flags/svg/ru.svg"
import us from "svg-country-flags/svg/us.svg"

import { i18next } from "."
import type { IconSelectOption } from "../components/icon-select"
import type { I18nextResources } from "./resources"
import classes from "./styles.module.css"

const renderFlag = (src: string | ComponentProps<"img">, alt?: string) => {
	if (typeof src === "string") {
		return (
			<img
				className={classes.flag}
				src={src}
				alt={alt}
			/>
		)
	}

	return (
		<img
			{...src}
			className={classNames(classes.flag, src.className)}
			alt={alt ?? src.alt}
		/>
	)
}

/**
 * Array of locales metadata.
 *
 * @remarks
 *   The locales array can be mutated (i.e. removing locales), but changes are expected to be made before
 *   the first render, as there is no reactive behavior to update the UI automatically.
 */
export const i18nextLocales: (IconSelectOption<string> & {
	label?: string
	continueLabel?: string
})[] = [
	{
		label: "English",
		continueLabel: "Continue in English",
		value: "en-US",
		icon: renderFlag(us, "US"),
	},
	{
		label: "Қазақша",
		continueLabel: "Қазақ тілінде жалғастыру",
		value: "kk-KZ",
		icon: renderFlag(kz, "KZ"),
	},
	{
		label: "Русский",
		continueLabel: "Продолжить на русском",
		value: "ru-RU",
		icon: renderFlag(ru, "RU"),
	},
]

export interface AddI18nextOptions {
	/** Locale code. */
	locale: string
	/** Language title. */
	label?: string
	/** "continue in <language>" text. */
	continueLabel?: string
	/** Flag represents country. */
	flag?: string | ComponentProps<"img">
	/** Icon representing the country. Makes sense only if flag is not set. */
	icon?: ReactNode
	/** Resources for the locale. */
	resources: I18nextResources
}

/**
 * Adds a new locale to the `i18next` instance and its metadata.
 *
 * @remarks
 *   This function mutates the `i18nextLocales` array and the i18next resource bundles. It does not provide
 *   reactive updates for UI components. Therefore, new locales should be added before any rendering
 *   occurs, as changes will not automatically propagate to already rendered components.
 * @param options - Options for the new locale, including language code, metadata, and translation
 *   resources.
 * @throws If a locale with the same code already exists, an exception will be thrown.
 */
export function addI18nextLocale(options: AddI18nextOptions) {
	if (i18nextLocales.some((l) => l.value === options.locale)) {
		throw new Error(`Locale ${options.locale} already exists`)
	}
	i18nextLocales.push({
		label: options.label ?? options.locale,
		value: options.locale,
		icon: options.flag ? renderFlag(options.flag) : options.icon,
		continueLabel: options.continueLabel,
	})
	Object.entries(options.resources).forEach(([ns, resources]) => {
		i18next.addResourceBundle(options.locale, ns, resources, true, true)
	})
}
