import "i18next"

import { i18nextResources } from "./resources"

declare module "i18next" {
	interface CustomTypeOptions {
		resources: (typeof i18nextResources)["en-US"]
	}
}
