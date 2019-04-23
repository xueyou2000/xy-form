import React, { useRef } from "react";
import { FormBlockContextState, FormItemState, FormProps } from "../interface";
import { FieldValidate } from "../ValidateUtils/FormValidate";
import { ValidateTrigger } from "../ValidateUtils/ValidateTrigger";
import { fieldValidateDefault, GetFieldItemState } from "./useFormMethods";

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
        mapper.delete(prop);
    }

    function fieldChange(prop: string, value: any) {
        if (onFieldChange) {
            onFieldChange(prop, value);
        }
    }

    function fieldValidate(prop: string, value: any, input: HTMLElement, trigger?: ValidateTrigger) {
        // const state = GetFieldItemState(fieldMapper, prop);
        return fieldValidateDefault(validConfig, onFieldValidate, fieldMapper, prop, false, trigger);
    }

    return [fieldMapper, { model: defaultModel, prop: "", add, remove, fieldChange, fieldValidate }];
}
