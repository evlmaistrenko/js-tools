import { type i18n as I18n, createInstance } from "i18next"

import { i18nextResources, ns } from "./resources"

export { i18nextResources, type I18nextLocales } from "./resources"

export const i18next: I18n = createInstance() as I18n

i18next.init({
	resources: i18nextResources,
	lng: "en-US",
	fallbackLng: "en-US",
	ns,
	interpolation: { escapeValue: false },
	initAsync: false,
	react: { useSuspense: false },
})
