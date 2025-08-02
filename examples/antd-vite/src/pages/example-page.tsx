import { type FC } from "react"
import { Trans, useTranslation } from "react-i18next"

import {
	EllipsisOutlined,
	MoonFilled,
	TranslationOutlined,
} from "@ant-design/icons"
import { Page } from "@evlmaistrenko/tools-antd"
import {
	App,
	Button,
	Calendar,
	Card,
	Flex,
	List,
	Space,
	Typography,
	theme,
} from "antd"
import { loremIpsum } from "lorem-ipsum"

export const ExamplePage: FC = () => {
	const { message, modal, notification } = App.useApp()
	const { t } = useTranslation("demoPage", {})
	const { token } = theme.useToken()

	return (
		<Page
			header={{
				title: <Typography.Title>{t("title")}</Typography.Title>,
			}}
		>
			<Typography.Title level={2}>
				<Trans
					i18nKey={"applicationTitle"}
					components={{
						code: (
							<Typography.Text
								style={{ fontSize: "1em" }}
								code
							/>
						),
					}}
				/>
			</Typography.Title>
			<Typography.Paragraph>
				<Trans
					i18nKey={"applicationText"}
					components={{
						code: <Typography.Text code />,
					}}
				/>
			</Typography.Paragraph>
			<Typography.Title level={3}>
				{t("applicationSettingsTitle")}
			</Typography.Title>
			<Typography.Paragraph>
				{t("applicationSettingsText")}
			</Typography.Paragraph>
			<List
				dataSource={[
					{
						key: "i18n",
						text: (
							<Trans
								i18nKey={"applicationSettings0"}
								components={{
									code: <Typography.Text code />,
								}}
							/>
						),
						icon: (
							<TranslationOutlined
								style={{
									color: token.colorPrimary,
								}}
							/>
						),
					},
					{
						key: "theme",
						text: t("applicationSettings1"),
						icon: <MoonFilled />,
					},
					{
						key: "custom",
						text: t("applicationSettings2"),
						icon: (
							<EllipsisOutlined
								style={{
									color: token.colorSuccess,
								}}
							/>
						),
					},
				]}
				split={false}
				renderItem={(item) => (
					<List.Item>
						<div>
							<Flex
								gap={10}
								align="baseline"
							>
								{item.icon}
								<span>{item.text}</span>
							</Flex>
							{item.key === "i18n" && (
								<Card
									style={{ margin: "1em", maxWidth: 400 }}
									styles={{ body: { padding: 0 } }}
								>
									<Calendar fullscreen={false} />
								</Card>
							)}
						</div>
					</List.Item>
				)}
			/>
			<Typography.Title level={3}>{t("popupTitle")}</Typography.Title>
			<Typography.Paragraph>{t("popupText")}</Typography.Paragraph>
			<Space wrap>
				<Button
					onClick={() => message.info(t("popupMessage"))}
					type={"primary"}
				>
					Message
				</Button>
				<Button
					onClick={() =>
						notification.info({
							message: t("popupNotificationTitle"),
							description: t("popupNotificationText"),
						})
					}
					type={"primary"}
				>
					Notification
				</Button>
				<Button
					onClick={() => {
						modal.info({
							title: t("popupModalTitle"),
							content: (
								<>
									<Typography.Paragraph>
										{loremIpsum({ count: 1, units: "paragraphs" })}
									</Typography.Paragraph>
									<Typography.Paragraph>
										{loremIpsum({ count: 1, units: "paragraphs" })}
									</Typography.Paragraph>
									<Typography.Paragraph>
										{loremIpsum({ count: 1, units: "paragraphs" })}
									</Typography.Paragraph>
								</>
							),
							width: 600,
							maskClosable: true,
						})
					}}
					type={"primary"}
				>
					Modal
				</Button>
			</Space>
			<Typography.Title
				level={2}
				style={{ marginTop: token.marginLG }}
			>
				{t("documentationTitle")}
			</Typography.Title>
			<Typography.Paragraph>{t("documentationText")}</Typography.Paragraph>
		</Page>
	)
}
