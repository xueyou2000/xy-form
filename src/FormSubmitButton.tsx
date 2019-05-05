import React, { useContext, useState } from "react";
import { FormContext } from "./Context/FormContext";
/**
 * 提交按钮
 */
export default function FormSubmitButton({ children }: { children: React.ReactNode }) {
    const context = useContext(FormContext);
    const [loading, setLoading] = useState(null);

    function clickHande(e: React.MouseEvent<HTMLButtonElement>) {
        setLoading(true);
        context.formMethods
            .submit(true)
            .then(() => {
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
        e.stopPropagation();
        e.preventDefault();
    }

    return React.cloneElement(children as any, { onClick: clickHande, loading });
}
