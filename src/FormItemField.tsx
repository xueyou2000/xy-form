import classNames from "classnames";
import React, { useContext, useRef, useState } from "react";
import { useMount, useUnmount } from "utils-hooks";
import { FormBlockContext } from "./Context/FormBlockContext";
import { FormContext } from "./Context/FormContext";
import { FormItemContext } from "./Context/FormItemContext";
import { Separator } from "./Form";
import { FormItemFieldProps, FormItemState } from "./interface";
import { ValidateResult } from "./ValidateUtils/ValidateInterface";
import { ValidateTrigger } from "./ValidateUtils/ValidateTrigger";
import _get from "lodash.get";
import { fieldValidateDefault } from "./Hooks/useFormMethods";

function DefaultChangeValue(value: any) {
    // 如果onChange的参数是 event 事件
    if (value && typeof value === "object" && "target" in value) {
        return (value as any).target.value;
    }
    return value;
}

function DefaultSerialization(value: any) {
    return value;
}

export function FormItemField<T = any, NormalizeResult = any>(props: FormItemFieldProps<T, NormalizeResult>) {
    const {
        prop,
        children,
        defaultValue,
        normalize,
        serialization = DefaultSerialization,
        valueKey = "value",
        converValue = DefaultChangeValue,
        disabledValidate,
        onValidate,
    } = props;
    // 是否使用 blockContext, 如果主动提供全名，baseInfo.dateInfo.type 这种，就不需要使用
    const useBlockContext = prop.indexOf(".") === -1 && prop.indexOf("[") === -1;
    const blockContext = useContext(FormBlockContext);
    const formContext = useContext(FormContext);
    const formItemContext = useContext(FormItemContext);
    const parentProp = useBlockContext ? (blockContext.prop ? blockContext.prop + Separator : "") : prop;
    const inputRef = useRef<any>(null);
    const blockContextDefault = blockContext.model && prop in blockContext.model ? blockContext.model[prop] : defaultValue;
    const _defaultValue = formContext.defaultModel ? _get(formContext.defaultModel, prop) : null;
    const initialValue = useRef(serialization(defaultValue || useBlockContext ? blockContextDefault : _defaultValue));

    const disabled = formContext.disabled;
    const label = props.label || formItemContext.label || "";
    const trigger = props.trigger || formContext.trigger;
    const child = React.Children.only(children) as any;
    const [value, setValue] = useState<T>(initialValue.current);
    const [validateResult, setValidateResult] = useState<ValidateResult>({ status: true, msg: null });
    // Tips: 用于validate时这个时候onChange导致的setValue还未更新完毕
    const lastValue = useRef(value);
    const lastValidateResult = useRef(validateResult);
    const itemState = useRef<FormItemState>({
        rest,
        ref: inputRef,
        setValue: changeValue,
        setValidateResult: changeValidateResult,
        getLabel: () => label,
        getValidateResult: () => validateResult,
        getCanValidate: () => !disabled && !disabledValidate,
        getValue: () => (normalize ? normalize(lastValue.current) : lastValue.current),
    });
    // Tips: 由于外部访问时方法都是旧的, 所以需要重新设置
    itemState.current.getLabel = () => label;

    useMount(() => {
        if (!prop) {
            throw new Error("Must assign prop");
        }
        blockContext.add(prop, itemState.current);
    });

    useUnmount(() => {
        blockContext.remove(prop);
    });

    function changeValidateResult(result: ValidateResult) {
        if ((result.status === true && lastValidateResult.current.status !== result.status) || !result.status) {
            lastValidateResult.current = result;
            setValidateResult(result);
            if (onValidate) {
                onValidate(value, result, inputRef.current, normalize);
            }
            if (formItemContext && formItemContext.onValidateChange) {
                formItemContext.onValidateChange(prop, result);
            }
        }
    }

    function changeValue(value: T) {
        const val = serialization(value);
        lastValue.current = val;
        setValue(val);

        // 触发器ValidateTrigger.blur情况下, 改变值则取消验证失败的状态
        if (trigger === ValidateTrigger.blur || trigger === ValidateTrigger.none) {
            changeValidateResult({ status: true, msg: null });
        }

        if (child.props.onChange) {
            child.props.onChange(val);
        }
        blockContext.fieldChange(prop, val);
    }

    function validate(_trigger?: ValidateTrigger) {
        if ((_trigger & trigger) !== 0 && !disabled && !disabledValidate) {
            blockContext
                .fieldValidate(prop, lastValue.current, inputRef.current, _trigger)
                .then(() => {
                    changeValidateResult({ status: true, msg: null });
                })
                .catch((error) => {
                    changeValidateResult({ status: false, msg: error.message });
                });
        }
    }

    function rest() {
        changeValue(initialValue.current);
        changeValidateResult({ status: true, msg: "" });
    }

    function changeHandle(value: T) {
        changeValue(converValue(value));
        validate(ValidateTrigger.change);
    }

    function blurHandle(e: any) {
        if (child.props.onBlur) {
            child.props.onBlur(e);
        }
        validate(ValidateTrigger.blur);
    }

    return child
        ? React.cloneElement(
              child as any,
              Object.assign({}, child.props, {
                  // Tips: 非原生组件没有提供初始值则使用空字符串, 自定义组件使用null, 来确保输入组件是受控的
                  [valueKey]: value === undefined ? (typeof child.type === "string" ? "" : null) : value,
                  key: prop,
                  ref: inputRef,
                  name: child.props.name || parentProp + prop,
                  disabled: "disabled" in child.props ? child.props.disabled : disabled,
                  onBlur: blurHandle,
                  onChange: changeHandle,
                  className: classNames(child.props.className, validateResult.status ? "" : "valid-error"),
              }),
          )
        : null;
}

export default React.memo(FormItemField);
