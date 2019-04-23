import React, { useContext, useState } from "react";
import { FormContext } from "./Context/FormContext";
import { FormItemProps } from "./interface";
import classNames from "classnames";
import { ValidateResult } from "./ValidateUtils/ValidateInterface";
import FormItemField from "./FormItemField";

export function FormItem(props: FormItemProps) {
    const { prefixCls = "xy-form-item", className, style, labelPosition, children, ...rest } = props;
    const context = useContext(FormContext);
    const [validateResult, setValidateResult] = useState<ValidateResult>({ status: true, msg: null });
    const classString = classNames(prefixCls, className);
    const _labelPosition = labelPosition || context.labelPosition;
    // TODO: #2 此 FormItem 下的任意一个验证失败， 则显示失败原因， 并设置失败样式

    function renderLabel() {
        if (props.label) {
            const labelStyle: React.CSSProperties = {};
            if (_labelPosition !== "top") {
                labelStyle.width = context.labelWidth;
            }

            return (
                <label className={`${prefixCls}-label`} style={labelStyle}>
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
                {"prop" in props ? <FormItemField {...rest}>{children}</FormItemField> : children}
                {validateResult.status === false && <span className={`${prefixCls}-error-msg`}>{validateResult.msg}</span>}
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
