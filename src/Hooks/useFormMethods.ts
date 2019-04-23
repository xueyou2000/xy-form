import React, { useRef } from "react";
import { FormItemState, FormProps, FormMethods, FormItemValidateFunc } from "../interface";
import { Separator } from "../Form";
import { FieldValidate } from "../ValidateUtils/FormValidate";
import { ValidateTrigger } from "..";
import { ValidateConfig, FieldConfig } from "../ValidateUtils/ValidateInterface";

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
export function getModelByFullProp<T = any>(model: any, fullProp: string): T {
    let prevModel: any = model;
    let lastValue: T = null;
    const fields = fullProp.split(Separator);
    for (let i = 0; i < fields.length; ++i) {
        const prop = fields[i];
        if (i !== fields.length - 1) {
            if (prop in prevModel) {
                prevModel = prevModel[prop];
            } else {
                console.warn("寻找匹配模型值失败", model, fullProp);
            }
        } else {
            lastValue = prevModel[prop];
        }
    }

    return lastValue;
}

export function fieldValidateDefault(
    validConfig: ValidateConfig<any>,
    onFieldValidate: FormItemValidateFunc,
    fieldMapper: React.MutableRefObject<Map<string, FormItemState>>,
    prop: string,
    setValidateResult?: boolean,
    trigger?: ValidateTrigger
) {
    const state = GetFieldItemState(fieldMapper, prop);
    const configs = getModelByFullProp(validConfig || {}, prop);
    const value = state.getValue();
    const input = state.ref.current;
    const label = state.getLabel();
    if (configs && state.getCanValidate() && onFieldValidate) {
        if (setValidateResult) {
            return onFieldValidate(configs, label, value, input, trigger)
                .then(() => {
                    state.setValidateResult({ status: true, msg: null });
                })
                .catch((error) => {
                    state.setValidateResult({ status: false, msg: error.message });
                    return Promise.reject(error);
                });
        } else {
            return onFieldValidate(configs, label, value, input, trigger);
        }
    } else {
        return Promise.resolve();
    }
}

export default function useFormMethods(props: FormProps, fieldMapper: React.MutableRefObject<Map<string, FormItemState>>): FormMethods {
    const { onFieldValidate = FieldValidate, validConfig } = props;

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
        // const state = getFieldItemState(prop);
        return fieldValidateDefault(validConfig, onFieldValidate, fieldMapper, prop, true);
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

    function toData() {
        const mapper = fieldMapper.current;
        let model: any = {};
        mapper.forEach((state, prop) => {
            const fields = prop.split(Separator);
            spliceDate(model, prop, fields);
        });
        return model;
    }

    function spliceDate(model: any, fullProp: string, fields: string[]) {
        let prevModel: any = model;
        const value = getFieldValue(fullProp);
        for (let i = 0; i < fields.length; ++i) {
            const prop = fields[i];
            if (i === fields.length - 1) {
                prevModel[prop] = value;
            } else {
                if (!(prop in prevModel)) {
                    prevModel[prop] = {};
                }
                prevModel = prevModel[prop];
            }
        }
    }

    return {
        getFieldValue,
        setFieldValue,
        getFieldValidateResult,
        resetField,
        resetFields,
        validateField,
        validateFields,
        getFieldLabel,
        toData
    };
}
