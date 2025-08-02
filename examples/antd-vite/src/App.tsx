import { Application, defaultApplicationProps } from "@evlmaistrenko/tools-antd"

import { Footer } from "./fragments/footer"
import { PrimarySidebarBase } from "./fragments/primary-sidebar-base"
import { ExamplePage } from "./pages/example-page"

function App() {
	return (
		<Application
			header={{}}
			primarySidebar={{ children: <PrimarySidebarBase /> }}
			secondarySidebar={{}}
			main={{ children: <ExamplePage /> }}
			footer={{ children: <Footer /> }}
			initialState={{
				...defaultApplicationProps.initialState,
				config: {
					...defaultApplicationProps.initialState.config,
					locale: "ru-RU",
				},
			}}
		/>
	)
}

export default App
