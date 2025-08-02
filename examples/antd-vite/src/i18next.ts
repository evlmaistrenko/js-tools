import { createInstance } from "i18next"

export const i18nextResources = {
	"en-US": {
		demoPage: {
			title: "Демо",
			applicationTitle: "Компонент <code>Application</code>",
			applicationText: `Представляет из себя обертку компонента <code>Layout</code>, 
			позволяющую гибко управлять его состоянием и конфигурацией Ant Design. 
			<code>Layout</code> имеет шапку, подвал, а также одну, две или три колонки.`,
			applicationSettingsTitle: "Настройки",
			applicationSettingsText:
				"На специальной странице или в шапке приложения можно реактивно применить настройки, включая:",
			applicationSettings0:
				"Язык приложения, включая язык в компонентах Ant Design, например в <code>Calendar</code>:",
			applicationSettings1:
				"Компактный режим и цветовая схема, а также её автоматический выбор, исходя из настроек системы.",
			applicationSettings2: "Можно добавить любые другие кастомные поля.",
			spoiler: "Под спойлером просто длинный текст",
			popupTitle: "Всплывающие компоненты",
			popupText:
				"Конфигурация примененная приложением распространяется и на всплывающие компоненты Ant Design:",
			popupMessage: "Всплывающее сообщение",
			popupNotificationTitle: "Всплывающее уведомление",
			popupNotificationText: "Сейчас показывается всплывающее уведомление.",
			popupModalTitle: "Модальное окно",
			documentationTitle: "Документация",
			documentationText:
				"В подвале страницы есть ссылки на подробную документацию.",
		},
		translation: {
			"intro-title": "Example Page",
			"intro":
				"This example shows how to use @evlmaistrenko/tools-antd in a SPA application using Vite. The focus is on the Application component and how other Ant Design's components work within it.",
			"spoiler":
				"This is a long text under the spoiler that will increase the height of the content to show how scrolling works.",
			"popup-components": "Popup components.",
			"message": "This is a message.",
			"notification": "This is a notification.",
			"notification-content": "This is the content of the notification.",
			"modal": "This is a modal.",
			"modal-content": "This is the content of the modal.",
			"i18n": "Ant Design's internationalization.",
		},
	},
	"ru-RU": {
		translation: {
			"intro-title": "Пример страницы",
			"intro":
				"Этот пример показывает использование @evlmaistrenko/tools-antd в SPA-приложении с использованием Vite. Прежде всего уделено внимание компоненту Application, как внутри него работают другие компоненты Ant Design.",
			"spoiler":
				"Под спойлером просто длинный текст, который увеличит высоту контента, чтобы показать как работает скроллинг.",
			"popup-components": "Всплывающие компоненты.",
			"message": "Это сообщение.",
			"notification": "Это уведомление.",
			"notification-content": "Это содержимое уведомления.",
			"modal": "Это модальное окно.",
			"modal-content": "Это содержимое модального окна.",
			"i18n": "Интернационализация Ant Design.",
		},
	},
} as const

export const i18next = createInstance()

i18next.init({
	resources: i18nextResources,
	ns: ["demoPage"],
	lng: "en-US",
	fallbackLng: "en-US",
	interpolation: { escapeValue: false },
	initAsync: false,
	react: { useSuspense: false },
})
