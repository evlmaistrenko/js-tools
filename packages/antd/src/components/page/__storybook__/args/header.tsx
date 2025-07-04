import { Breadcrumb } from "antd"

export const header = {
	title: <div>Page title</div>,
	breadcrumbs: (
		<Breadcrumb
			items={[
				{ key: 1, title: "Parent" },
				{ key: 2, title: "Child" },
			]}
		/>
	),
}
