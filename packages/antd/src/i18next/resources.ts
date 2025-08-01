export type I18nextResources = {
	application: {
		"Expand menu": string
		"Collapse menu": string
		"Open settings": string
		"Expand sidebar": string
		"Collapse sidebar": string
		"Settings": string
		"Common": string
		"Language": string
		"Theme": string
		"Color scheme": string
		"Compact": string
		"Dark": string
		"Device": string
		"Light": string
	}
	applicationHelloPage: {
		"Welcome!": string
		"Choose your language:": string
	}
}

export const i18nextResources: Record<string, I18nextResources> = {
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
		applicationHelloPage: {
			"Welcome!": "Welcome!",
			"Choose your language:": "Choose your language:",
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
		applicationHelloPage: {
			"Welcome!": "Қош келдіңіз!",
			"Choose your language:": "Тілді таңдаңыз:",
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
		applicationHelloPage: {
			"Welcome!": "Добро пожаловать!",
			"Choose your language:": "Выберите язык:",
		},
	},
} as const

export const ns = ["application", "applicationHelloPage"]
export type I18nextLocales = keyof typeof i18nextResources
