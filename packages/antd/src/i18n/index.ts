import { initReactI18next } from "react-i18next"

import { type i18n as I18n, createInstance } from "i18next"

import { i18nResources, ns } from "./resources"

export { i18nResources, type I18nLocales } from "./resources"

/** @since 1.1.0 */
export const i18n: I18n = createInstance() as I18n

/** @since 1.1.0 */
export const i18nInitPromise: Promise<unknown> = i18n
	.use(initReactI18next)
	.init({
		resources: i18nResources,
		lng: "en-US",
		fallbackLng: "en-US",
		ns,
		interpolation: { escapeValue: false },
		initAsync: true,
	})
