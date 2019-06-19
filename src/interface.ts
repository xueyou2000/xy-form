import { ValidateTrigger } from "./ValidateUtils/ValidateTrigger";
import { ValidateResult, ValidateConfig, FieldConfig } from "./ValidateUtils/ValidateInterface";

export type FormItemLabelPosition = "right" | "left" | "top";

export interface ValidateParams {
    label: string;
    input: HTMLElement;
    trigger?: ValidateTrigger;
}

export type FormItemValidateFunc = (value: any, configs: FieldConfig[], params: ValidateParams) => Promise<any>;

export interface FormProps<T = {}> extends Partial<FormContextState> {
    /**
     * 附加类名
     */
    prefixCls?: string;
    /**
     * 根节点的附加类名
     */
    className?: string;
    /**
     * 内联样式
     */
    style?: React.CSSProperties;
    /**
     * 规定当提交表单时向何处发送表单数据
     */
    action?: string;
    /**
     * 表单内容
     */
    children?: React.ReactNode;
    /**
     * 规定在发送表单数据之前如何对其进行编码
     */
    enctype?: "text/plain" | "multipart/form-data" | "application/x-www-form-urlencoded";
    /**
     * 规定用于发送 form-data 的 HTTP 方法
     */
    method?: "post" | "get";
    /**
     * 表单name
     */
    name?: string;
    /**
     * 规定在何处打开 action URL
     */
    target?: "_blank" | "_self" | "_parent" | "_top";
    /**
     * 默认对象
     * @description 用于提供默认值
     */
    defaultModel?: T;
    /**
     * 验证配置
     */
    validConfig?: ValidateConfig<T>;
    /**
     * 获取表单方法
     */
    getFormMethods?: (methods: FormMethods) => void;
    /**
     * 字段值改变事件
     */
    onFieldChange?: (prop: string, value: any) => void;
    /**
     * 字段需要验证事件
     */
    onFieldValidate?: FormItemValidateFunc;
    /**
     * 开始点击提交按钮
     */
    onSubmitBefore?: (data: any) => void;
    /**
     * 表单需要验证事件
     * @description 允许自定义表单验证
     */
    onFormValidate?: (fieldMapper: React.MutableRefObject<Map<string, FormItemState>>) => Promise<any>;
    /**
     * 表单验证失败事件
     */
    onValidateFail?: (error: Error, data: any) => void;
    /**
     * 表单提交事件
     * @description 当验证全部通过后才会调用此事件
     */
    onSubmit?: (data: any) => void;
}

export interface FormMethods {
    /**
     * 设置模型值
     * @description 快速设置整个模型的值
     */
    setModel: <ModelValue>(model: ModelValue) => void;
    /**
     * 获取字段值
     */
    getFieldValue: (prop: string) => any;
    /**
     * 设置字段值
     */
    setFieldValue: (prop: string, value: any) => void;
    /**
     * 获取字段验证结果
     */
    getFieldValidateResult: (prop: string) => ValidateResult;
    /**
     * 设置字段验证结果
     */
    setFieldValidateResult: (prop: string, result: ValidateResult) => void;
    /**
     * 获取字段输入框元素
     */
    getFieldInput: (prop: string) => HTMLElement;
    /**
     * 重置字段到初始值
     */
    resetField: (prop: string) => void;
    /**
     * 重置所有字段到初始值
     */
    resetFields: () => void;
    /**
     * 验证指定字段
     */
    validateField: (prop: string) => Promise<any>;
    /**
     * 验证所有字段
     */
    validateFields: () => Promise<any>;
    /**
     * 获取对应标签
     */
    getFieldLabel: (prop: string) => React.ReactNode;
    /**
     * 表单提交
     */
    submit: <T>(uncaught?: boolean) => Promise<T>;
    /**
     * 获取数据
     */
    toData: () => any;
}

export interface FormContextState {
    /**
     * 是否禁用表单
     */
    disabled: boolean;
    /**
     * 默认触发事件
     */
    trigger: ValidateTrigger;
    /**
     * 标签对齐位置
     */
    labelPosition: FormItemLabelPosition;
    /**
     * 标签宽度
     */
    labelWidth: string;
    /**
     * 是否内联模式
     */
    inline: boolean;
    /**
     * 表单方法
     */
    formMethods: FormMethods;
}

export interface FormItemFieldProps<T = any, NormalizeResult = any> {
    /**
     * 代理字段名
     */
    prop: string;
    /**
     * 代理值的key
     * @description 默认代理value
     */
    valueKey?: string;
    /**
     * 如何从onChange转换值
     */
    converValue?: Function;
    /**
     * 中文标签名
     * @description 用于验证提示
     */
    label?: string;
    /**
     * 代理输入组件
     */
    children?: React.ReactNode;
    /**
     * 默认触发事件
     */
    trigger?: ValidateTrigger;
    /**
     * 默认值
     */
    defaultValue?: T;
    /**
     * 规范化函数
     * @description 比如绑定的是 Date 类型，form 最后同步时可以是日期字符串
     */
    normalize?: (value: T) => NormalizeResult;
    /**
     * 是否禁用验证
     */
    disabledValidate?: boolean;
    /**
     * 执行验证事件
     */
    onValidate?: (value: T, validateResult: ValidateResult, input: HTMLElement, normalize?: (value: T) => NormalizeResult) => void;
}

export interface FormItemState {
    /**
     * 获取字段值
     */
    getValue: () => any;
    /**
     * 设置字段值
     */
    setValue: (value: any) => void;
    /**
     * 获取验证结果
     */
    getValidateResult: () => ValidateResult;
    /**
     * 设置验证结果
     */
    setValidateResult: (result: ValidateResult) => void;
    /**
     * 获取是否可以验证
     */
    getCanValidate: () => boolean;
    /**
     * 获取dom
     */
    ref: React.MutableRefObject<HTMLElement>;
    /**
     * 重置到初始值
     */
    rest: () => void;
    /**
     * 获取标签
     */
    getLabel: () => string;
}

export interface FormItemContextState {
    /**
     * 验证结果改变
     */
    onValidateChange: (prop: string, validateResult: ValidateResult) => void;
    /**
     * 标签中文名称
     */
    label?: string;
}

export interface FormBlockProps {
    /**
     * 字段域名称
     * @description 为空则为根字段域
     */
    prop?: string;
    /**
     * 内容
     */
    children?: React.ReactNode;
}

export interface FormBlockContextState {
    /**
     * 当前字段域的模型
     * @description 用于设置默认值
     */
    model?: any;
    /**
     * 当前字段域的名称
     */
    prop?: string;
    /**
     * 添加字段
     */
    add?: (prop: string, itemState: FormItemState) => void;
    /**
     * 移除字段
     */
    remove?: (prop: string) => void;
    /**
     * 字段值改变事件
     */
    fieldChange?: (prop: string, value: any) => void;
    /**
     * 字段需要验证事件
     */
    fieldValidate?: (prop: string, value: any, input: HTMLElement, trigger?: ValidateTrigger) => Promise<any>;
}

export interface FormItemProps<T = any, NormalizeResult = any> extends Pick<Partial<FormItemFieldProps<T, NormalizeResult>>, Exclude<keyof Partial<FormItemFieldProps<T, NormalizeResult>>, "label">> {
    /**
     * 标签名称
     */
    label?: React.ReactNode;
    /**
     * 附加类名
     */
    prefixCls?: string;
    /**
     * 根节点的附加类名
     */
    className?: string;
    /**
     * 内联样式
     */
    style?: React.CSSProperties;
    /**
     * 标签对齐位置
     */
    labelPosition?: FormItemLabelPosition;
    /**
     * 内容
     */
    children?: React.ReactNode;
}

export interface FormItemFailResult extends ValidateResult {
    prop: string;
}
