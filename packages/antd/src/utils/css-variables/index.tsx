import { type FC, createContext, useContext } from "react"

import { Layout } from "antd"

import { type CssVariablesProps, Inner } from "./inner"
import classes from "./style.module.css"

const Context = createContext<boolean>(false)

/** Provides css-variables witch components need. */
export const CssVariables: FC<CssVariablesProps> = (props) => {
	if (useContext(Context) && props.overrides !== true) {
		return <>{props.children}</>
	}

	return (
		<Context.Provider value={true}>
			<Layout className={classes.cssVariables}>
				<Inner {...props} />
			</Layout>
		</Context.Provider>
	)
}
