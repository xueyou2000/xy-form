import React, { useContext } from "react";
import { FormBlockContext } from "./Context/FormBlockContext";
import { Separator } from "./Form";
import { FormArrayBlockProps, FormItemState } from "./interface";
import { ValidateTrigger } from "./ValidateUtils/ValidateTrigger";

export function FormArrayBlock({ index = 0, children }: FormArrayBlockProps) {
    const context = useContext(FormBlockContext);

    const model = context.model ? context.model[index] : null;
    // const parentProp = context.prop ? context.prop + Separator : "";
    const currentProp = `[${index}]`;

    function spliceProp(fieldProp: string) {
        return `[${index}]${fieldProp}`;
    }

    function add(fieldProp: string, itemState: FormItemState) {
        context.add(spliceProp(fieldProp), itemState);
    }

    function remove(fieldProp: string) {
        context.remove(spliceProp(fieldProp));
    }

    function fieldChange(fieldProp: string, value: any) {
        context.fieldChange(spliceProp(fieldProp), value);
    }

    function fieldValidate(fieldProp: string, value: any, input: HTMLElement, trigger?: ValidateTrigger) {
        return context.fieldValidate(spliceProp(fieldProp), value, input, trigger);
    }

    return <FormBlockContext.Provider value={{ model, prop: currentProp, add, remove, fieldChange, fieldValidate }}>{children}</FormBlockContext.Provider>;
}

export default React.memo(FormArrayBlock);
