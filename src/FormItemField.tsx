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

function DefaultChangeValue(value: any) {
    // 如果onChange的参数是 event 事件
    if (value && typeof value === "object" && "target" in value) {
        return (value as any).target.value;
    }
    return value;
}

export function FormItemField<T = any, NormalizeResult = any>(props: FormItemFieldProps<T, NormalizeResult>) {
    const { prop, children, defaultValue, normalize, valueKey = "value", converValue = DefaultChangeValue, disabledValidate, onValidate } = props;
    const blockContext = useContext(FormBlockContext);
    const formContext = useContext(FormContext);
    const formItemContext = useContext(FormItemContext);
    const parentProp = blockContext.prop ? blockContext.prop + Separator : "";
    const inputRef = useRef<any>();
    const initialValue = useRef(defaultValue || (blockContext.model && prop in blockContext.model ? blockContext.model[prop] : defaultValue));

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
        getValue: () => (normalize ? normalize(lastValue.current) : lastValue.current)
    });
    // Tips: 由于外部访问时方法都是旧的, 所以需要重新设置
    itemState.current.getLabel = () => label;

    useMount(() => {
        blockContext.add(prop, itemState.current);
    });

    useUnmount(() => {
        blockContext.remove(prop);
    });

    function changeValidateResult(result: ValidateResult) {
        if (lastValidateResult.current.status !== result.status) {
            lastValidateResult.current = result;
            if (onValidate) {
                onValidate(value, result, inputRef.current, normalize);
            }
            setValidateResult(result);
            if (formItemContext && formItemContext.onValidateChange) {
                formItemContext.onValidateChange(prop, result);
            }
        }
    }

    function changeValue(value: T) {
        lastValue.current = value;
        setValue(value);
        if (child.props.onChange) {
            child.props.onChange(value);
        }
        blockContext.fieldChange(prop, value);
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
        let val = converValue(value);
        changeValue(val);
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
                  name: parentProp + prop,
                  disabled: disabled,
                  onBlur: blurHandle,
                  onChange: changeHandle,
                  className: classNames(child.props.className, validateResult.status ? "" : "valid-error")
              })
          )
        : null;
}

export default React.memo(FormItemField);
