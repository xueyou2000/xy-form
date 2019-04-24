import React, { useRef } from "react";
import { useMount } from "utils-hooks";
import { FormBlockContextState, FormItemState, FormProps } from "../interface";
import { FieldValidate } from "../ValidateUtils/FormValidate";
import { ValidateTrigger } from "../ValidateUtils/ValidateTrigger";
import { fieldValidateDefault, setValueByFullProp } from "./useFormMethods";

export default function useFormBlockState(props: FormProps): [React.MutableRefObject<Map<string, FormItemState>>, FormBlockContextState] {
    const { defaultModel, onFieldChange, validConfig, onFieldValidate = FieldValidate } = props;
    const fieldMapper = useRef(new Map<string, FormItemState>());

    function add(prop: string, itemState: FormItemState) {
        const mapper = fieldMapper.current;
        if (mapper.has(prop)) {
            console.warn("存在重复字段", prop);
        }
        mapper.set(prop, itemState);
    }

    function remove(prop: string) {
        const mapper = fieldMapper.current;
        if (mapper.has(prop)) {
            mapper.delete(prop);
        }
    }

    function fieldChange(prop: string, value: any) {
        if (onFieldChange) {
            onFieldChange(prop, value);
        }
        // 尝试同步到模型
        if (defaultModel) {
            setValueByFullProp(defaultModel, prop, value);
        }
    }

    function fieldValidate(prop: string, value: any, input: HTMLElement, trigger?: ValidateTrigger) {
        return fieldValidateDefault(validConfig, onFieldValidate, fieldMapper, prop, trigger);
    }

    return [fieldMapper, { model: defaultModel, prop: "", add, remove, fieldChange, fieldValidate }];
}
