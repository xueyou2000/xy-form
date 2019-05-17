import classNames from "classnames";
import React from "react";
import { FormBlockContext } from "./Context/FormBlockContext";
import { FormContext } from "./Context/FormContext";
import useFormBlockState from "./Hooks/useFormBlockState";
import useFormMethods from "./Hooks/useFormMethods";
import { FormProps } from "./interface";
import { ValidateTrigger } from "./ValidateUtils/ValidateTrigger";

/**
 * 字段分隔符
 */
export const Separator = ".";

export function Form(props: FormProps) {
    const {
        prefixCls = "xy-form",
        className,
        children,
        defaultModel,
        getFormMethods,
        onFieldChange,
        onFieldValidate,
        onSubmitBefore,
        onFormValidate,
        onValidateFail,
        validConfig,
        onSubmit,
        disabled = false,
        trigger = ValidateTrigger.change,
        labelPosition = "right",
        labelWidth = "85px",
        inline = false,
        ...rest
    } = props;
    const [fieldMapper, formBlockContextState] = useFormBlockState(props);
    const formMethods = useFormMethods(props, fieldMapper);
    const classString = classNames(prefixCls, className, {
        [`${prefixCls}--inline`]: inline,
        [`${prefixCls}--label-${labelPosition}`]: !!labelPosition
    });

    if (getFormMethods) {
        getFormMethods(formMethods);
    }

    function submitHandle(event: React.FormEvent<HTMLFormElement>) {
        formMethods.submit(true);
        if (!props.action) {
            event.stopPropagation();
            event.preventDefault();
            return false;
        }
    }

    function restHandle() {
        if (disabled) {
            return;
        }
        formMethods.resetFields();
    }

    return (
        <form {...rest} className={classString} onSubmit={submitHandle} onReset={restHandle} autoComplete="off">
            <FormContext.Provider value={{ disabled, trigger, labelPosition, labelWidth, inline, formMethods }}>
                <FormBlockContext.Provider value={formBlockContextState}>{children}</FormBlockContext.Provider>
            </FormContext.Provider>
        </form>
    );
}

export default React.memo(Form);
