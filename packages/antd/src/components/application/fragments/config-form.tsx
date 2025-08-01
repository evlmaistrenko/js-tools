import { type FC, type ReactNode, useCallback, useEffect, useRef } from "react"
import { Translation, useTranslation } from "react-i18next"

import { MobileTwoTone, MoonFilled, SunOutlined } from "@ant-design/icons"
import { Divider, Form, type FormProps, Switch } from "antd"

import { i18nextLocales } from "../../../i18next"
import { IconSelect } from "../../icon-select"
import type { IconSelectOption } from "../../icon-select"
import { type ApplicationState, useApplication } from "../context"
import classes from "../styles.module.css"

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
	const { t } = useTranslation("application")

	return (
		<Form<ApplicationState["config"]>
			form={form}
			initialValues={initialState.config}
			onValuesChange={onValuesChange}
		>
			<Divider orientation={orientation}>{t("Common")}</Divider>
			<Form.Item
				name={"locale"}
				label={t("Language")}
			>
				<IconSelect
					options={i18nextLocales.map((locale) => ({
						label: locale.label,
						value: locale.value,
						icon: locale.icon,
					}))}
					className={classes.select}
				/>
			</Form.Item>
			<Divider orientation={orientation}>{t("Theme")}</Divider>
			<Form.Item
				name={"colorScheme"}
				label={t("Color scheme")}
			>
				<IconSelect
					options={colorSchemes}
					className={classes.select}
				/>
			</Form.Item>
			<Form.Item
				name={["compactTheme", "xs"]}
				label={t("Compact")}
				valuePropName="checked"
				hidden={breakpoint !== "xs"}
			>
				<Switch />
			</Form.Item>
			<Form.Item
				name={["compactTheme", "sm"]}
				label={t("Compact")}
				valuePropName="checked"
				hidden={breakpoint !== "sm"}
			>
				<Switch />
			</Form.Item>
			<Form.Item
				name={["compactTheme", "md"]}
				label={t("Compact")}
				valuePropName="checked"
				hidden={breakpoint !== "md"}
			>
				<Switch />
			</Form.Item>
			<Form.Item
				name={["compactTheme", "lg"]}
				label={t("Compact")}
				valuePropName="checked"
				hidden={breakpoint !== "lg"}
			>
				<Switch />
			</Form.Item>
			<Form.Item
				name={["compactTheme", "xl"]}
				label={t("Compact")}
				valuePropName="checked"
				hidden={breakpoint !== "xl"}
			>
				<Switch />
			</Form.Item>
			<Form.Item
				name={["compactTheme", "xxl"]}
				label={t("Compact")}
				valuePropName="checked"
				hidden={breakpoint !== "xxl"}
			>
				<Switch />
			</Form.Item>
			{props.children}
		</Form>
	)
}
