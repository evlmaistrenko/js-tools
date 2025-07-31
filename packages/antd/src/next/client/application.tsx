import type { FC } from "react"

import {
	type ApplicationProps,
	Application as Base,
} from "../../components/application"

export const Application: FC<ApplicationProps> = (props) => {
	return <Base {...props} />
}
