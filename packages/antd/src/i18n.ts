import { initReactI18next } from "react-i18next"

import { type i18n as I18n, createInstance } from "i18next"

import resources from "./locales.json"

export const i18n: I18n = createInstance()

export type I18nLocale = "en-US" | "kk-KZ" | "ru-RU"

export type I18nNs = "application"

i18n.use(initReactI18next).init({
	resources,
	lng: "en-US",
	fallbackLng: "en-US",
	ns: ["application"],
	interpolation: { escapeValue: false },
})
