export const i18nResources = {
	"en-US": {
		application: {
			"Expand menu": "Expand menu",
			"Collapse menu": "Collapse menu",
			"Open settings": "Open settings",
			"Expand sidebar": "Expand sidebar",
			"Collapse sidebar": "Collapse sidebar",
			"Settings": "Settings",
			"Common": "Common",
			"Language": "Language",
			"Theme": "Theme",
			"Color scheme": "Color scheme",
			"Compact": "Compact",
			"Dark": "Dark",
			"Device": "Device",
			"Light": "Light",
		},
	},
	"kk-KZ": {
		application: {
			"Expand menu": "Мәзірді кеңейту",
			"Collapse menu": "Мәзірді бүктеу",
			"Open settings": "Баптауларды ашу",
			"Expand sidebar": "Бүйірлік панельді кеңейту",
			"Collapse sidebar": "Бүйірлік панельді бүктеу",
			"Settings": "Баптаулар",
			"Common": "Жалпы",
			"Language": "Тіл",
			"Theme": "Тақырып",
			"Color scheme": "Түстік схема",
			"Compact": "Ықшам",
			"Dark": "Қараңғы",
			"Device": "Құрылғыға сәйкес",
			"Light": "Жарық",
		},
	},
	"ru-RU": {
		application: {
			"Expand menu": "Развернуть меню",
			"Collapse menu": "Свернуть меню",
			"Open settings": "Открыть настройки",
			"Expand sidebar": "Развернуть боковую панель",
			"Collapse sidebar": "Свернуть боковую панель",
			"Settings": "Настройки",
			"Common": "Общие",
			"Language": "Язык",
			"Theme": "Тема",
			"Color scheme": "Цветовая схема",
			"Compact": "Компактная",
			"Dark": "Тёмная",
			"Device": "Как на устройстве",
			"Light": "Светлая",
		},
	},
} as const

export const ns = ["application"]
export type I18nLocales = keyof typeof i18nResources
