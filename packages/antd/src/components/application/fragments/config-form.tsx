import { type FC, type ReactNode, useCallback, useEffect, useRef } from "react"
import { Translation } from "react-i18next"

import { MobileTwoTone, MoonFilled, SunOutlined } from "@ant-design/icons"
import { Divider, Form, type FormProps, Switch } from "antd"
import kz from "svg-country-flags/svg/kz.svg"
import ru from "svg-country-flags/svg/ru.svg"
import us from "svg-country-flags/svg/us.svg"

import { IconSelect } from "../../icon-select"
import type { IconSelectOption } from "../../icon-select"
import { type ApplicationState, useApplication } from "../context"
import classes from "../styles.module.css"

const getFlag = (src: unknown, alt: string) => {
	if (typeof src === "string") {
		if (src.startsWith("data:") || src.endsWith(".svg")) {
			return (
				<img
					className={classes.flag}
					src={src}
					alt={alt}
				/>
			)
		}
		console.error(
			`Failed to render country flag "${alt}": expected a valid image URL or a React component. Please check your bundler configuration (SVG import handling).`,
		)
	}

	const Src = src as FC<Record<string, string>>

	return (
		<Src
			role="img"
			aria-label={alt}
			className={classes.flag}
		/>
	)
}

const languages: IconSelectOption[] = [
	{
		label: "English",
		value: "en-US",
		icon: getFlag(us, "US"),
	},
	{
		label: "Қазақша",
		value: "kk-KZ",
		icon: getFlag(kz, "KZ"),
	},
	{
		label: "Русский",
		value: "ru-RU",
		icon: getFlag(ru, "RU"),
	},
]

const colorSchemes: IconSelectOption[] = [
	{
		label: <Translation ns={"application"}>{(t) => t("Device")}</Translation>,
		value: "device",
		icon: <MobileTwoTone />,
	},
	{
		label: <Translation ns={"application"}>{(t) => t("Light")}</Translation>,
		value: "light",
		icon: <SunOutlined style={{ color: "#C99700" }} />,
	},
	{
		label: <Translation ns={"application"}>{(t) => t("Dark")}</Translation>,
		value: "dark",
		icon: <MoonFilled style={{ color: "#D9D9D9" }} />,
	},
]

export const ConfigForm: FC<{ children?: ReactNode }> = (props) => {
	const [form] = Form.useForm<ApplicationState["config"]>()
	const {
		breakpoint,
		initialState,
		configProviderProps: { direction },
		config: { values, setValues },
	} = useApplication()!
	const orientation = direction === "rtl" ? "right" : "left"
	const onValuesChange = useCallback<
		Required<FormProps<ApplicationState["config"]>>["onValuesChange"]
	>(
		(_, allValues) => {
			setValues(allValues)
		},
		[setValues],
	)
	const formRef = useRef(form)
	formRef.current = form
	useEffect(() => {
		formRef.current.setFieldsValue(values)
	}, [values])

	return (
		<Form<ApplicationState["config"]>
			form={form}
			initialValues={initialState.config}
			onValuesChange={onValuesChange}
		>
			<Divider orientation={orientation}>
				<Translation ns={"application"}>{(t) => t("Common")}</Translation>
			</Divider>
			<Form.Item
				name={"locale"}
				label={
					<Translation ns={"application"}>{(t) => t("Language")}</Translation>
				}
			>
				<IconSelect
					options={languages}
					className={classes.select}
				/>
			</Form.Item>
			<Divider orientation={orientation}>
				<Translation ns={"application"}>{(t) => t("Theme")}</Translation>
			</Divider>
			<Form.Item
				name={"colorScheme"}
				label={
					<Translation ns={"application"}>
						{(t) => t("Color scheme")}
					</Translation>
				}
			>
				<IconSelect
					options={colorSchemes}
					className={classes.select}
				/>
			</Form.Item>
			<Form.Item
				name={["compactTheme", "xs"]}
				label={
					<Translation ns={"application"}>{(t) => t("Compact")}</Translation>
				}
				valuePropName="checked"
				hidden={breakpoint !== "xs"}
			>
				<Switch />
			</Form.Item>
			<Form.Item
				name={["compactTheme", "sm"]}
				label={
					<Translation ns={"application"}>{(t) => t("Compact")}</Translation>
				}
				valuePropName="checked"
				hidden={breakpoint !== "sm"}
			>
				<Switch />
			</Form.Item>
			<Form.Item
				name={["compactTheme", "md"]}
				label={
					<Translation ns={"application"}>{(t) => t("Compact")}</Translation>
				}
				valuePropName="checked"
				hidden={breakpoint !== "md"}
			>
				<Switch />
			</Form.Item>
			<Form.Item
				name={["compactTheme", "lg"]}
				label={
					<Translation ns={"application"}>{(t) => t("Compact")}</Translation>
				}
				valuePropName="checked"
				hidden={breakpoint !== "lg"}
			>
				<Switch />
			</Form.Item>
			<Form.Item
				name={["compactTheme", "xl"]}
				label={
					<Translation ns={"application"}>{(t) => t("Compact")}</Translation>
				}
				valuePropName="checked"
				hidden={breakpoint !== "xl"}
			>
				<Switch />
			</Form.Item>
			<Form.Item
				name={["compactTheme", "xxl"]}
				label={
					<Translation ns={"application"}>{(t) => t("Compact")}</Translation>
				}
				valuePropName="checked"
				hidden={breakpoint !== "xxl"}
			>
				<Switch />
			</Form.Item>
			{props.children}
		</Form>
	)
}
