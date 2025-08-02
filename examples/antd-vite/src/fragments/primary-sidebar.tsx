import { useLocation, useNavigate } from "react-router"

import { PrimarySidebarBase } from "./primary-sidebar-base"

export const PrimarySidebar = () => {
	const navigate = useNavigate()
	console.log(useLocation())
	return (
		<PrimarySidebarBase
			onMenuClick={(item) => {
				navigate(item.key)
			}}
		/>
	)
}
