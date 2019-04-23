import React, { useContext, useState, useRef } from "react";
import { FormContext } from "./Context/FormContext";
import { FormItemProps, FormItemFailResult } from "./interface";
import classNames from "classnames";
import { ValidateResult } from "./ValidateUtils/ValidateInterface";
import FormItemField from "./FormItemField";
import { FormItemContext } from "./Context/FormItemContext";

export function FormItem(props: FormItemProps) {
    const { prefixCls = "xy-form-item", className, style, labelPosition, children, ...rest } = props;
    const context = useContext(FormContext);
    const [failValidateResult, setFailValidateResult] = useState<FormItemFailResult[]>([]);
    const classString = classNames(prefixCls, className);
    const _labelPosition = labelPosition || context.labelPosition;
    const labelRef = useRef();
    const labelElement = labelRef.current as HTMLElement;
    const label = labelElement ? labelElement.textContent || labelElement.innerText : typeof props.label === "string" ? props.label : null;

    function validateChangeHandle(prop: string, validateResult: ValidateResult) {
        const i = failValidateResult.findIndex((x) => x.prop === prop);
        if (validateResult.status) {
            if (i !== -1) {
                // 清除上一次验证失败
                setFailValidateResult(failValidateResult.filter((x) => x.prop !== prop));
            }
        } else {
            if (i !== -1) {
                failValidateResult[i].msg = validateResult.msg;
                setFailValidateResult(failValidateResult);
            } else {
                setFailValidateResult([...failValidateResult, { prop, ...validateResult }]);
            }
        }
    }

    function renderLabel() {
        if (props.label) {
            const labelStyle: React.CSSProperties = {};
            if (_labelPosition !== "top") {
                labelStyle.width = context.labelWidth;
            }

            return (
                <label className={`${prefixCls}-label`} style={labelStyle} ref={labelRef}>
                    {props.label}
                </label>
            );
        } else {
            return null;
        }
    }

    function renderContent() {
        const contentStyle: React.CSSProperties = {};
        if (props.label && !context.inline && _labelPosition !== "top") {
            contentStyle.marginLeft = context.labelWidth;
        }

        return (
            <div className={`${prefixCls}-content`} style={contentStyle}>
                <FormItemContext.Provider value={{ onValidateChange: validateChangeHandle, label }}>{"prop" in props ? <FormItemField {...rest as any}>{children}</FormItemField> : children}</FormItemContext.Provider>
                {failValidateResult.length > 0 && <span className={`${prefixCls}-error-msg`}>{failValidateResult.map((x, i) => x.msg + `${i === failValidateResult.length - 1 ? "" : ","}`)}</span>}
            </div>
        );
    }

    return (
        <div className={classString} style={style}>
            {renderLabel()}
            {renderContent()}
        </div>
    );
}

export default React.memo(FormItem);
