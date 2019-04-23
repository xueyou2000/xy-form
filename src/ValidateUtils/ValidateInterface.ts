import { IMethodRegister } from "validate-provider";
import { ValidateTrigger } from "./ValidateTrigger";

export interface ValidateResult {
    /**
     * 验证结果
     */
    status: boolean;
    /**
     * 验证失败原因
     */
    msg?: string;
}

export type ValidValue = string | number | null | boolean;

export interface FieldConfig extends IMethodRegister {
    /**
     * 触发事件
     */
    trigger?: ValidateTrigger;
    /**
     * 参数
     */
    params?: any[];
}

/**
 * 验证配置
 * @example var rule: ValidateConfig<PoliceAddDto>;
 */
export type ValidateConfig<T> = { [P in keyof T]?: (T[P]) extends ValidValue ? FieldConfig[] : ValidateConfig<T[P]> };
