import { Breadcrumb, Typography } from "antd"

export const header = {
	title: <Typography.Title>Page title</Typography.Title>,
	breadcrumbs: (
		<Breadcrumb
			items={[
				{ key: 1, title: "Parent" },
				{ key: 2, title: "Child" },
			]}
		/>
	),
}
