import React, { useRef } from "react";
import { useMount } from "utils-hooks";
import { FormBlockContextState, FormItemState, FormProps } from "../interface";
import { ValidateTrigger } from "../ValidateUtils/ValidateTrigger";

export default function useFormBlockState(props: FormProps): [React.MutableRefObject<Map<string, FormItemState>>, FormBlockContextState] {
    const { defaultModel, onFieldChange, onFieldValidate } = props;
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

    function fieldValidate(prop: string, value: any, trigger?: ValidateTrigger) {
        if (onFieldValidate) {
            return onFieldValidate(prop, value, trigger);
        } else {
            return Promise.resolve();
        }
    }

    useMount(() => {
        // TODO: #1 遍历所有字段, 监听对应依赖
    });

    return [fieldMapper, { model: defaultModel, prop: "", add, remove, fieldChange, fieldValidate }];
}
