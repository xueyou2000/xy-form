import React, { useRef } from "react";
import { FormItemState, FormProps, FormMethods } from "../interface";
import { Separator } from "../Form";

function throwFieldLose(prop: string) {
    throw new Error(`未找到字段: ${prop}`);
}

export default function useFormMethods(props: FormProps, fieldMapper: React.MutableRefObject<Map<string, FormItemState>>): FormMethods {
    const { onFieldValidate } = props;

    function getFieldItemState(prop: string): FormItemState {
        const mapper = fieldMapper.current;
        if (mapper.has(prop)) {
            return mapper.get(prop);
        } else {
            throwFieldLose(prop);
        }
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
        const state = getFieldItemState(prop);
        if (onFieldValidate) {
            return onFieldValidate(prop, state.getValue())
                .then(() => {
                    state.setValidateResult({ status: true, msg: null });
                })
                .catch((error) => {
                    state.setValidateResult({ status: false, msg: error.message });
                });
        } else {
            return Promise.resolve();
        }
    }

    function validateFields() {
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

    function getModelByFullProp<T = any>(model: any, fullProp: string): T {
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

    return {
        getFieldValue,
        setFieldValue,
        getFieldValidateResult,
        resetField,
        resetFields,
        validateField,
        validateFields,
        getFieldLabel,
        toData,
        getModelByFullProp
    };
}
