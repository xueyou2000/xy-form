import React from "react";
import { ValidateTrigger } from "..";
import { Separator } from "../Form";
import { FormItemState, FormItemValidateFunc, FormMethods, FormProps } from "../interface";
import { FieldValidate } from "../ValidateUtils/FormValidate";
import { ValidateConfig, ValidateResult, FieldConfig } from "../ValidateUtils/ValidateInterface";
import _get from "lodash-es/get";
import _set from "lodash-es/set";
import _merge from "lodash-es/merge";

function throwFieldLose(prop: string) {
    throw new Error(`未找到字段: ${prop}`);
}

export function GetFieldItemState(fieldMapper: React.MutableRefObject<Map<string, FormItemState>>, prop: string) {
    const mapper = fieldMapper.current;
    if (mapper.has(prop)) {
        return mapper.get(prop);
    } else {
        throwFieldLose(prop);
    }
}

/**
 * 获取指定模型对象对应全字段路径的值
 * @description 用于外部验证, onFieldValidate时把参数prop解析到对应验证配置
 * @param model
 * @param fullProp
 */
export function getValueByFullProp<T = any>(model: any, fullProp: string): T {
    return _get(model, fullProp);
}

/**
 * 获取指定模型对象对应全字段路径的所在对象
 * @param model
 * @param fullProp
 */
export function setValueByFullProp(model: any, fullProp: string, value: any): any {
    _set(model, fullProp, value);
}

export function fieldValidateDefault(
    validConfig: ValidateConfig<any>,
    onFieldValidate: FormItemValidateFunc,
    fieldMapper: React.MutableRefObject<Map<string, FormItemState>>,
    prop: string,
    trigger?: ValidateTrigger,
) {
    const state = GetFieldItemState(fieldMapper, prop);
    const configs: FieldConfig[] = validConfig ? getValueByFullProp(validConfig, prop) : [];
    const value = state.getValue();
    const input = state.ref.current;
    const label = state.getLabel();

    if (state.getCanValidate() && onFieldValidate) {
        return onFieldValidate(value, configs, { label, input, trigger });
    } else {
        return Promise.resolve();
    }
}

export default function useFormMethods(props: FormProps, fieldMapper: React.MutableRefObject<Map<string, FormItemState>>): FormMethods {
    const { onFieldValidate = FieldValidate, validConfig, disabled, onFormValidate, onSubmitBefore, onSubmit, onValidateFail } = props;

    function getFieldItemState(prop: string): FormItemState {
        return GetFieldItemState(fieldMapper, prop);
    }

    function getFieldValue(prop: string) {
        const state = getFieldItemState(prop);
        return state.getValue();
    }

    function setFieldValue(prop: string, value: any) {
        const state = getFieldItemState(prop);
        state.setValue(value);
    }

    function getFieldValidateResult(prop: string) {
        const state = getFieldItemState(prop);
        return state.getValidateResult();
    }

    function setFieldValidateResult(prop: string, result: ValidateResult) {
        const state = getFieldItemState(prop);
        state.setValidateResult(result);
    }

    function resetField(prop: string) {
        const state = getFieldItemState(prop);
        state.rest();
    }

    function resetFields() {
        const mapper = fieldMapper.current;
        mapper.forEach((state) => {
            state.rest();
        });
    }

    function validateField(prop: string) {
        const state = getFieldItemState(prop);
        return fieldValidateDefault(validConfig, onFieldValidate, fieldMapper, prop)
            .then(() => {
                state.setValidateResult({ status: true, msg: null });
            })
            .catch((error) => {
                state.setValidateResult({ status: false, msg: error.message });
                return Promise.reject(error);
            });
    }

    function validateFields() {
        if (props.disabled) {
            return Promise.resolve();
        }
        const mapper = fieldMapper.current;
        const promises: Promise<any>[] = [];
        mapper.forEach((state, prop) => {
            promises.push(validateField(prop));
        });
        return Promise.all(promises);
    }

    function getFieldLabel(prop: string) {
        const state = getFieldItemState(prop);
        return state.getLabel();
    }

    function getFieldInput(prop: string) {
        const state = getFieldItemState(prop);
        return state.ref.current;
    }

    function submit(uncaught?: boolean) {
        const data = toData();
        const validateFunc = onFormValidate || validateFields;
        if (disabled) {
            return Promise.reject(new Error("form disabled, can not submit"));
        }

        if (onSubmitBefore) {
            onSubmitBefore(data);
        }
        return validateFunc(fieldMapper)
            .then(() => {
                if (onSubmit) {
                    return onSubmit(data);
                }
            })
            .then(() => {
                if (!uncaught) {
                    return data;
                }
            })
            .catch((error) => {
                if (onValidateFail) {
                    onValidateFail(error, data);
                }
                if (!uncaught) {
                    return Promise.reject(error);
                }
            });
    }

    function toData() {
        const mapper = fieldMapper.current;
        let model: any = {};
        mapper.forEach((state, prop) => {
            const value = getFieldValue(prop);
            _set(model, prop, value);
        });
        return _merge({}, props.defaultModel, model);
    }

    function setModel(model: any) {
        const mapper = fieldMapper.current;
        mapper.forEach((state, prop) => {
            state.setValue(_get(model, prop));
        });
    }

    return {
        getFieldValue,
        setFieldValue,
        getFieldValidateResult,
        resetField,
        resetFields,
        validateField,
        validateFields,
        getFieldInput,
        getFieldLabel,
        setFieldValidateResult,
        toData,
        setModel,
        submit,
    };
}
