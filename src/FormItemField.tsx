import classNames from "classnames";
import React, { useContext, useRef, useState } from "react";
import { useMount, useUnmount } from "utils-hooks";
import { FormBlockContext } from "./Context/FormBlockContext";
import { FormContext } from "./Context/FormContext";
import { FormItemFieldProps, FormItemState } from "./interface";
import { ValidateResult } from "./ValidateUtils/ValidateInterface";
import { ValidateTrigger } from "./ValidateUtils/ValidateTrigger";

export function FormItemField<T = any, NormalizeResult = any>(props: FormItemFieldProps<T, NormalizeResult>) {
    const { prop, children, defaultValue, normalize, depends, label, disabledValidate, onValidate } = props;
    const blockContext = useContext(FormBlockContext);
    const formContext = useContext(FormContext);

    const initialValue = useRef(blockContext.model && prop in blockContext.model ? blockContext.model[prop] : defaultValue);
    const disabled = formContext.disabled;
    const trigger = props.trigger || formContext.trigger;
    const child = React.Children.only(children) as any;
    const [value, setValue] = useState<T>(initialValue.current);
    const [validateResult, setValidateResult] = useState<ValidateResult>({ status: true, msg: null });
    // Tips: 用于validate时这个时候onChange导致的setValue还未更新完毕
    const lastValue = useRef(value);

    const itemState: FormItemState = {
        rest,
        setValidateResult,
        setValue: changeValue,
        getValue: () => (normalize ? normalize(lastValue.current) : lastValue.current),
        getLabel: () => label,
        getDepends: () => depends,
        getValidateResult: () => validateResult
    };

    useMount(() => {
        blockContext.add(prop, itemState);
    });

    useUnmount(() => {
        blockContext.remove(prop);
    });

    function changeValidateResult(result: ValidateResult) {
        if (validateResult.status !== result.status) {
            if (onValidate) {
                onValidate(value, result, normalize);
            }
            setValidateResult(result);
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
        if ((_trigger & trigger) !== 0) {
            blockContext
                .fieldValidate(prop, lastValue.current, _trigger)
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
        setValidateResult({ status: true, msg: "" });
    }

    function changeHandle(value: T) {
        let val = value;
        if ("target" in value) {
            val = (value as any).target.value;
        }
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
                  value,
                  key: prop,
                  disabled: disabled,
                  onBlur: blurHandle,
                  onChange: changeHandle,
                  className: classNames(child.props.className, validateResult.status ? "" : "valid-error")
              })
          )
        : null;
}

export default React.memo(FormItemField);
