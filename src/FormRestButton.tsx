import React, { useContext } from "react";
import { FormContext } from "./Context/FormContext";
/**
 * 重置按钮
 */
export default function FormRestButton({ children }: { children: React.ReactNode }) {
    const context = useContext(FormContext);

    function clickHande(e: React.MouseEvent<HTMLButtonElement>) {
        context.formMethods.resetFields();
        e.stopPropagation();
        e.preventDefault();
    }

    return React.cloneElement(children as any, { onClick: clickHande });
}
