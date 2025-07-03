import "i18next"

import { i18nResources } from "./resources"

declare module "i18next" {
	interface CustomTypeOptions {
		resources: (typeof i18nResources)["en-US"]
	}
}
