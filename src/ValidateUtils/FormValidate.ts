import * as methods from "validate-methods";
import { ValidateProvider, ValidateMethodError } from "validate-provider";
import { ValidateRunnerAll, ValidateRunnerElement } from "validate-runner";
import { FormValidateLocal } from "./FormValidateLocal";
import { FieldConfig } from "./ValidateInterface";
import { ValidateTrigger } from "./ValidateTrigger";

export class ValidateError extends ValidateMethodError {
    /**
     * 验证元素
     */
    public input: HTMLElement;
    /**
     * 触发事件
     */
    public trigger?: ValidateTrigger;

    /**
     * 构造函数
     * @param value
     * @param params
     * @param message
     * @param validName
     * @param input
     * @param trigger
     */
    constructor(value: any, params: any[], message: string, validName: string, input: HTMLElement, trigger?: ValidateTrigger) {
        super(value, params, message, validName);
        this.input = input;
        this.trigger = trigger;
    }
}

/**
 * 表单字段验证
 * @description {0}-{99}是格式化对应参数, {{VALUE}}是当前值 {{NAME}}是当前字段中文名称
 * @param configs   验证配置集合
 * @param value 值
 * @param input 输入框dom
 * @param trigger   触发事件
 */
export function FieldValidate(configs: FieldConfig[], label: string, value: any, input: HTMLElement, trigger?: ValidateTrigger) {
    const provider = new ValidateProvider();
    const runner = new ValidateRunnerAll(provider);
    configs.forEach((config) => {
        if (!config.trigger || !trigger || (config.trigger && trigger && (trigger & config.trigger) !== 0)) {
            if (config.method || config.name in methods) {
                let msg = config.errMsg || FormValidateLocal[config.name] || "{{NAME}}验证失败";
                msg = msg.replace(/{{NAME}}/g, String(label));
                provider.addByMethodRegister({
                    name: config.name,
                    method: config.method || methods[config.name],
                    errMsg: msg,
                    format: config.format
                });
                runner.add(new ValidateRunnerElement(config.name, value, ...[...(config.params || []), input]));
            }
        }
    });

    return runner.execute().catch((error: ValidateMethodError) => {
        return Promise.reject(new ValidateError(value, error.params, error.message, error.validName, input, trigger));
    });
}
