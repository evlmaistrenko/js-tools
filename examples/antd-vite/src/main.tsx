import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { I18nextProvider } from "react-i18next"
import { BrowserRouter, Outlet, Route, Routes } from "react-router"

import {
	Application,
	ApplicationConfigPage,
	defaultApplicationProps,
} from "@evlmaistrenko/tools-antd"
import "antd/dist/reset.css"

import { Footer } from "./fragments/footer"
import { PrimarySidebar } from "./fragments/primary-sidebar"
import { i18next } from "./i18next"
import { ExamplePage } from "./pages/example-page"

i18next.changeLanguage("ru-RU")

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<BrowserRouter>
			<I18nextProvider i18n={i18next}>
				<Routes>
					<Route
						element={
							<Application
								header={{}}
								primarySidebar={{ children: <PrimarySidebar /> }}
								secondarySidebar={{}}
								main={{ children: <Outlet /> }}
								footer={{ children: <Footer /> }}
								initialState={{
									...defaultApplicationProps.initialState,
									config: {
										...defaultApplicationProps.initialState.config,
										locale: "ru-RU",
									},
								}}
							/>
						}
					>
						<Route
							index
							element={<ExamplePage />}
						/>
						<Route
							path="/settings"
							element={<ApplicationConfigPage />}
						/>
					</Route>
				</Routes>
			</I18nextProvider>
		</BrowserRouter>
	</StrictMode>,
)
