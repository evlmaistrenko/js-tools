import { App, Button, DatePicker, Form, Space } from "antd"
import FormItem from "antd/es/form/FormItem"

import { loremIpsumParagraphs } from "../../../utils/lorem-ipsum-paragraphs"

export const Main: React.FC<{ paragraphs?: number }> = ({
	paragraphs = 30,
}) => {
	const { message, modal, notification } = App.useApp()
	return (
		<div
			style={{ padding: "1em", background: "var(--ant-color-bg-container)" }}
		>
			{loremIpsumParagraphs(5)}
			<Space
				style={{ width: "100%" }}
				direction="vertical"
				size="large"
			>
				<Space wrap>
					<Button
						onClick={() => message.info("This is a message")}
						type={"primary"}
					>
						Show message
					</Button>
					<Button
						onClick={() =>
							notification.info({
								message: "This is a notification",
								description: "This is a content of the notification.",
							})
						}
						type={"primary"}
					>
						Show notification
					</Button>
					<Button
						onClick={() => {
							modal.confirm({
								title: "This is a modal",
								content: <>{loremIpsumParagraphs(10)}</>,
								width: 600,
							})
						}}
						type={"primary"}
					>
						Open modal
					</Button>
				</Space>
				<Form>
					<FormItem name="date">
						<DatePicker />
					</FormItem>
				</Form>
			</Space>
			{paragraphs > 0 && loremIpsumParagraphs(paragraphs)}
		</div>
	)
}
